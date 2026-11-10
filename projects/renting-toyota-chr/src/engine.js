/* Motor de cálculo: TCO, VPN, anualidades, entrada y benchmark de compra. */
(function (global) {
  "use strict";

  const D = global.CHR_DATA;

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  function annuityFactor(months, annualRatePct) {
    const r = annualRatePct / 100 / 12;
    if (!r) return months;
    return (1 - Math.pow(1 + r, -months)) / r;
  }

  function npv(flows, annualRatePct) {
    const r = annualRatePct / 100 / 12;
    return flows.reduce((acc, f) => acc + f.amount / Math.pow(1 + r, f.t), 0);
  }

  function energyCostPer100(version, state) {
    const v = D.VERSIONS[version];
    return v.consumo * state.fuel + v.electrico * state.electricity;
  }

  function cuotaAtKm(offer, km) {
    const factor = clamp(1 + 0.05 * (km - offer.kmBase) / 5000, 0.5, 2.5);
    return offer.cuota * factor;
  }

  /* Devuelve la entrada y la cuota ajustadas al modo de entrada.
     - published: tal como se publica.
     - zero: la entrada se financia al tipo de entrada y se reparte en la cuota.
     - custom: se aporta una entrada distinta; la diferencia se reparte al mismo tipo. */
  function entryAdjusted(offer, state) {
    if (state.entryMode === "zero") {
      if (offer.entrada <= 0) {
        return { entrada: 0, cuota: offer.cuota, entryComponent: 0 };
      }
      const af = annuityFactor(offer.meses, state.entryRate);
      const extra = offer.entrada / af;
      return { entrada: 0, cuota: offer.cuota + extra, entryComponent: extra };
    }
    if (state.entryMode === "custom") {
      const af = annuityFactor(offer.meses, state.entryRate);
      const delta = offer.entrada - state.customEntry;
      const extra = delta / af;
      return {
        entrada: state.customEntry,
        cuota: Math.max(0, offer.cuota + extra),
        entryComponent: extra
      };
    }
    return { entrada: offer.entrada, cuota: offer.cuota, entryComponent: 0 };
  }

  function offerBadge(offer, state) {
    if (offer.tipo === "estimado") {
      return {
        label: "Estimado",
        tone: "estimate",
        title: "Incluye una estimación propia de cuota o de plazo; no es una oferta publicada."
      };
    }
    if (state.entryMode !== "published") {
      return {
        label: "Entrada simulada",
        tone: "mixed",
        title:
          "La cuota publicada se ha recalculado para el modo de entrada elegido. No es la oferta original del proveedor."
      };
    }
    if (offer.kmBase !== state.km) {
      return {
        label: "Real " + Math.round(offer.kmBase / 1000) + "k · km est.",
        tone: "mixed",
        title:
          "Precio real publicado a " +
          offer.kmBase.toLocaleString("es-ES") +
          " km/año. El kilometraje seleccionado se estima con +5 % por cada 5.000 km."
      };
    }
    return {
      label: "Real",
      tone: "real",
      title: "Precio publicado para el plazo y kilometraje seleccionados."
    };
  }

  function offerMetrics(offer, state) {
    const n = offer.meses;
    const af = annuityFactor(n, state.discount);
    const adj = entryAdjusted(offer, state);
    const baseCuotaKm = cuotaAtKm(offer, state.km);
    const cuotaFinal = baseCuotaKm + adj.entryComponent;

    const energyYear = (state.km * energyCostPer100(offer.version, state)) / 100;
    const tiresYear = offer.incluye.neumaticos ? 0 : state.km * state.tireKm;
    const insuranceYear = offer.incluye.seguro ? 0 : state.insurance;
    const maintenanceYear = offer.incluye.mantenimiento ? 0 : state.maintenance;
    const taxYear = offer.incluye.impuestos ? 0 : state.tax;
    const franchiseYear =
      offer.franquicia && offer.franquicia > 0 ? state.franchiseProvision : 0;
    const itvUnits = offer.incluye.itv ? 0 : Math.max(0, Math.ceil((n - 36) / 12));
    const itvTotal = itvUnits * state.itv;

    const extrasYear =
      tiresYear + insuranceYear + maintenanceYear + taxYear + franchiseYear;

    const flows = [{ t: 0, amount: adj.entrada }];
    const extraFlows = [];
    const energyFlows = [];
    for (let m = 1; m <= n; m++) {
      const itvMonth = !offer.incluye.itv && m > 36 ? state.itv / 12 : 0;
      const extraMonth = extrasYear / 12 + itvMonth;
      const energyMonth = energyYear / 12;
      extraFlows.push({ t: m, amount: extraMonth });
      energyFlows.push({ t: m, amount: energyMonth });
      flows.push({ t: m, amount: cuotaFinal + extraMonth + energyMonth });
    }

    const pv = npv(flows, state.discount);
    const pvExtras = npv(extraFlows, state.discount);
    const pvEnergy = npv(energyFlows, state.discount);
    const totalEq = pv / af;
    const nominalTotal = flows.reduce((s, f) => s + f.amount, 0);
    const nominalMonthly = nominalTotal / n;

    const components = {
      entrada: adj.entrada / af,
      cuota: cuotaFinal,
      extras: pvExtras / af,
      energia: pvEnergy / af
    };

    return {
      ...offer,
      entradaAjustada: adj.entrada,
      cuotaAjustada: cuotaFinal,
      cuotaBaseKm: baseCuotaKm,
      entryComponent: adj.entryComponent,
      meses: n,
      af,
      pv,
      totalEq,
      nominalTotal,
      nominalMonthly,
      components,
      energyYear,
      tiresYear,
      insuranceYear,
      maintenanceYear,
      taxYear,
      franchiseYear,
      itvTotal,
      kmEstimado: offer.kmBase !== state.km,
      badge: offerBadge(offer, state),
      categoria: "renting"
    };
  }

  function residualPct(months, state) {
    let pct;
    if (months <= 48) {
      pct = state.residual3 + ((state.residual4 - state.residual3) * (months - 36)) / 12;
    } else {
      pct = state.residual4 + ((state.residual5 - state.residual4) * (months - 48)) / 12;
    }
    return clamp(pct, 0, 100);
  }

  function runningMonthly(version, state, month) {
    const energy = (state.km * energyCostPer100(version, state)) / 100 / 12;
    const insurance = state.insurance / 12;
    const maintenance = state.maintenance / 12;
    const tires = (state.km * state.tireKm) / 12;
    const tax = state.tax / 12;
    const itv = month > 36 ? state.itv / 12 : 0;
    return {
      total: energy + insurance + maintenance + tires + tax + itv,
      energy,
      insurance,
      maintenance,
      tires,
      tax,
      itv
    };
  }

  function purchaseCashMetrics(version, state) {
    const n = state.horizon;
    const pvp = D.VERSIONS[version].pvp;
    const af = annuityFactor(n, state.discount);
    const residual = (pvp * residualPct(n, state)) / 100;

    const flows = [{ t: 0, amount: pvp }];
    const runningFlows = [];
    for (let m = 1; m <= n; m++) {
      const r = runningMonthly(version, state, m);
      runningFlows.push({ t: m, amount: r.total });
      flows.push({ t: m, amount: r.total });
    }
    flows.push({ t: n, amount: -residual });

    const pv = npv(flows, state.discount);
    const pvRunning = npv(runningFlows, state.discount);
    const pvResidual = residual / Math.pow(1 + state.discount / 100 / 12, n);
    const totalEq = pv / af;
    const nominalTotal = pvp + runningFlows.reduce((s, f) => s + f.amount, 0) - residual;

    return {
      id: "buy-cash-" + version,
      categoria: "compra",
      modo: "contado",
      version,
      meses: n,
      pvp,
      residual,
      residualPct: residualPct(n, state),
      af,
      pv,
      totalEq,
      nominalTotal,
      nominalMonthly: nominalTotal / n,
      components: {
        capital: pvp / af,
        uso: pvRunning / af,
        residual: -pvResidual / af
      },
      badge: { label: "Benchmark", tone: "benchmark", title: "Compra al contado con valor residual estimado." }
    };
  }

  function purchaseFinanceMetrics(version, state) {
    const f = D.FINANCE[version];
    if (!f) return null;
    const n = f.meses;
    const pvp = D.VERSIONS[version].pvp;
    const af = annuityFactor(n, state.discount);
    const residual = (pvp * residualPct(n, state)) / 100;

    const flows = [{ t: 0, amount: f.entrada }];
    const runningFlows = [];
    for (let m = 1; m <= n; m++) {
      const r = runningMonthly(version, state, m);
      runningFlows.push({ t: m, amount: r.total });
      flows.push({ t: m, amount: f.cuota + r.total });
    }
    flows.push({ t: n, amount: f.ultima - residual });

    const pv = npv(flows, state.discount);
    const pvRunning = npv(runningFlows, state.discount);
    const pvUltima = f.ultima / Math.pow(1 + state.discount / 100 / 12, n);
    const pvResidual = residual / Math.pow(1 + state.discount / 100 / 12, n);
    const totalEq = pv / af;
    const nominalTotal =
      f.entrada + n * f.cuota + f.ultima + runningFlows.reduce((s, f2) => s + f2.amount, 0) - residual;

    return {
      id: "buy-finance-" + version,
      categoria: "compra",
      modo: "financiada",
      version,
      meses: n,
      pvp,
      residual,
      residualPct: residualPct(n, state),
      af,
      pv,
      totalEq,
      nominalTotal,
      nominalMonthly: nominalTotal / n,
      finance: f,
      components: {
        entrada: f.entrada / af,
        cuotas: f.cuota,
        ultima: pvUltima / af,
        uso: pvRunning / af,
        residual: -pvResidual / af
      },
      badge: {
        label: "Benchmark 48m",
        tone: "benchmark",
        title: "Compra financiada Toyota Easy Plus a 48 meses, con valor residual estimado."
      }
    };
  }

  function offerList(state) {
    return D.OFFERS.filter(
      (o) => o.meses === state.horizon && (state.includeEstimates || o.tipo === "real")
    ).map((o) => offerMetrics(o, state));
  }

  function bestOffer(offers, state, version) {
    const filtered = offers.filter((o) => !version || o.version === version);
    if (!filtered.length) return null;
    return filtered.slice().sort((a, b) => a.totalEq - b.totalEq)[0];
  }

  function bestOfferForHorizon(state, version, horizon) {
    const s = { ...state, horizon };
    const list = D.OFFERS.filter(
      (o) => o.meses === horizon && (s.includeEstimates || o.tipo === "real")
    )
      .map((o) => offerMetrics(o, s))
      .filter((o) => !version || o.version === version);
    if (!list.length) return null;
    return list.sort((a, b) => a.totalEq - b.totalEq)[0];
  }

  function purchaseForHorizon(state, version, horizon, mode) {
    const s = { ...state, horizon };
    return mode === "finance"
      ? purchaseFinanceMetrics(version, s)
      : purchaseCashMetrics(version, s);
  }

  function fmtEuro(value, decimals) {
    const d = decimals === undefined ? 0 : decimals;
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: d,
      maximumFractionDigits: d,
      useGrouping: "always"
    }).format(value);
  }

  function fmtNum(value, decimals) {
    const d = decimals === undefined ? 0 : decimals;
    return new Intl.NumberFormat("es-ES", {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
      useGrouping: "always"
    }).format(value);
  }

  function fmtPct(value, decimals) {
    return fmtNum(value, decimals === undefined ? 1 : decimals) + " %";
  }

  global.CHR_ENGINE = {
    clamp,
    annuityFactor,
    npv,
    energyCostPer100,
    cuotaAtKm,
    entryAdjusted,
    offerBadge,
    offerMetrics,
    residualPct,
    runningMonthly,
    purchaseCashMetrics,
    purchaseFinanceMetrics,
    offerList,
    bestOffer,
    bestOfferForHorizon,
    purchaseForHorizon,
    fmtEuro,
    fmtNum,
    fmtPct
  };
})(typeof window !== "undefined" ? window : globalThis);
