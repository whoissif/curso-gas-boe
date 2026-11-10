/* UI, estado, gráficos SVG e interacciones. */
(function () {
  "use strict";

  var D = window.CHR_DATA;
  var E = window.CHR_ENGINE;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var fmtE = E.fmtEuro;
  var fmtN = E.fmtNum;

  var state = Object.assign({}, D.DEFAULTS);
  var selectedId = null;
  var sort = { key: "eq", dir: 1 };
  var renderTimer = null;

  function scheduleRender() {
    if (renderTimer) clearTimeout(renderTimer);
    renderTimer = setTimeout(function () {
      renderTimer = null;
      render();
    }, 90);
  }

  var COMP_COLORS = {
    entrada: "#f59e0b",
    cuota: "#22d3ee",
    extras: "#a78bfa",
    energia: "#34d399"
  };
  var COMP_LABELS = {
    entrada: "Entrada",
    cuota: "Cuota",
    extras: "Extras no incluidos",
    energia: "Energía"
  };

  function versionColor(v) {
    return (D.VERSIONS[v] && D.VERSIONS[v].color) || "#22d3ee";
  }

  /* ------------------------------------------------------------
     Datos derivados
     ------------------------------------------------------------ */

  function offers() {
    return E.offerList(state).sort(function (a, b) { return a.totalEq - b.totalEq; });
  }
  function cashM() {
    return E.purchaseCashMetrics(state.benchmarkVersion, state);
  }
  function finM() {
    return state.horizon === 48
      ? E.purchaseFinanceMetrics(state.benchmarkVersion, state)
      : null;
  }
  function selectedOffer(list) {
    var l = list || offers();
    for (var i = 0; i < l.length; i++) if (l[i].id === selectedId) return l[i];
    return l[0] || null;
  }
  function bestAt(h) {
    var s = Object.assign({}, state, { horizon: h });
    var l = E.offerList(s).sort(function (a, b) { return a.totalEq - b.totalEq; });
    return l[0] || null;
  }

  /* ------------------------------------------------------------
     Animación de cifras
     ------------------------------------------------------------ */

  function setMoney(node, value, dec, prefix) {
    if (!node) return;
    dec = dec === undefined ? 0 : dec;
    prefix = prefix || "";
    var from = Number(node.getAttribute("data-v") || 0);
    node.setAttribute("data-v", String(value));
    if (Math.abs(from - value) < 0.005) {
      node.textContent = prefix + fmtE(Math.abs(value), dec);
      return;
    }
    var t0 = performance.now();
    var dur = 620;
    function step(t) {
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      node.textContent = prefix + fmtE(Math.abs(from + (value - from) * e), dec);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function kpiValue(sel, value, unit, prefix) {
    var box = $(sel);
    if (!box) return;
    var v = box.querySelector(".v");
    var small = box.querySelector("small");
    if (value == null) {
      v.textContent = "—";
      v.removeAttribute("data-v");
      if (small) small.textContent = "";
      return;
    }
    setMoney(v, value, 0, prefix);
    if (small) small.textContent = unit || "";
  }

  /* ------------------------------------------------------------
     KPIs
     ------------------------------------------------------------ */

  function renderKpis(list) {
    var best = list[0] || null;
    var cash = cashM();
    var fin = finM();

    if (best) {
      kpiValue("#kpi1-value", best.totalEq, "/mes equivalente");
      $("#kpi1-name").innerHTML =
        "<b>" + esc(best.proveedor) + "</b> · " + esc(best.version) + " " + esc(best.acabado);
      $("#kpi1-foot").textContent =
        best.meses + " meses · entrada " + fmtE(best.entradaAjustada) +
        " · cuota " + fmtE(best.cuotaAjustada, 0);
      var k1 = $("#kpi1-value").closest(".kpi");
      if (k1) k1.setAttribute("data-accent", "cyan");
    }

    kpiValue("#kpi2-value", cash.totalEq, "/mes equivalente");
    $("#kpi2-name").innerHTML =
      "<b>Compra al contado</b> · " + esc(cash.version) + " Advance";
    $("#kpi2-foot").textContent =
      "PVP " + fmtE(cash.pvp) + " · residual " + fmtN(cash.residualPct, 0) + " %";

    if (fin) {
      kpiValue("#kpi3-value", fin.totalEq, "/mes equivalente");
      $("#kpi3-name").innerHTML =
        "<b>Toyota Easy Plus</b> · " + esc(fin.version) + " Advance";
      $("#kpi3-foot").textContent =
        "Entrada " + fmtE(fin.finance.entrada) + " · TAE " + fmtN(fin.finance.tae, 2) + " %";
      var k3 = $("#kpi3-value").closest(".kpi");
      if (k3) k3.setAttribute("data-accent", "amber");
    } else {
      kpiValue("#kpi3-value", null);
      $("#kpi3-name").innerHTML = "<b>Compra financiada</b> · solo a 48 meses";
      $("#kpi3-foot").textContent =
        "La promoción Easy Plus se publica únicamente a 48 meses.";
    }

    var diff = cash.totalEq - (best ? best.totalEq : 0);
    var k4 = $("#kpi4-value").closest(".kpi");
    if (best && Math.abs(diff) >= 0.5) {
      var rentingWins = diff > 0;
      kpiValue("#kpi4-value", Math.abs(diff), "/mes", rentingWins ? "−" : "+");
      $("#kpi4-name").innerHTML = rentingWins
        ? "<b>Gana el renting</b> frente a la compra al contado"
        : "<b>Gana la compra</b> frente al mejor renting";
      $("#kpi4-foot").innerHTML = rentingWins
        ? '<span class="down">Ahorro de ' + fmtE(Math.abs(diff) * best.meses) +
          " en el periodo</span>"
        : '<span class="up">Sobrecoste de ' + fmtE(Math.abs(diff) * best.meses) +
          " en el periodo</span>";
      if (k4) k4.setAttribute("data-accent", rentingWins ? "emerald" : "violet");
    } else {
      var v4 = $("#kpi4-value .v");
      if (v4) { v4.textContent = "≈"; v4.removeAttribute("data-v"); }
      var s4 = $("#kpi4-value small");
      if (s4) s4.textContent = "";
      $("#kpi4-name").textContent = "Empate técnico";
      $("#kpi4-foot").textContent = "Diferencia inferior a 1 €/mes.";
    }
  }

  /* ------------------------------------------------------------
     Ranking
     ------------------------------------------------------------ */

  function barSegs(o, max) {
    var order = ["entrada", "cuota", "extras", "energia"];
    return order
      .map(function (k) {
        var w = (o.components[k] / max) * 100;
        return (
          '<span class="bar-seg seg-' + k + '" data-w="' + w.toFixed(2) +
          '" style="width:0"></span>'
        );
      })
      .join("");
  }

  function renderRanking(list) {
    var cash = cashM();
    var fin = finM();
    var max = Math.max.apply(
      null,
      list.map(function (o) { return o.totalEq; }).concat([cash.totalEq, fin ? fin.totalEq : 0])
    );

    var html = "";
    list.forEach(function (o, i) {
      var sel = o.id === selectedId;
      html +=
        '<button class="rank-row' + (sel ? " is-sel" : "") + '" data-id="' + o.id +
        '" style="--d:' + i * 45 + 'ms" aria-pressed="' + sel + '">' +
        '<span class="rank-pos">' + (i + 1) + "</span>" +
        '<span class="rank-body">' +
        '<span class="rank-line">' +
        '<span class="rank-name">' + esc(o.proveedor) +
        ' <span class="ver">· ' + esc(o.version) + "</span></span>" +
        '<span class="rank-val">' + fmtE(o.totalEq) + "<small>/mes eq.</small></span>" +
        "</span>" +
        '<span class="bar">' + barSegs(o, max) + "</span>" +
        '<span class="rank-line rank-meta">' +
        "<span>" + o.meses + " m · " + fmtN(state.km) + " km/año · entrada " +
        fmtE(o.entradaAjustada) + " · cuota " + fmtE(o.cuotaAjustada, 0) + "</span>" +
        '<span class="badge ' + o.badge.tone + '" title="' + esc(o.badge.title) + '">' +
        esc(o.badge.label) + "</span>" +
        "</span></span></button>";
    });

    html +=
      '<div class="rank-row is-bench" style="--d:' + list.length * 45 + 'ms">' +
      '<span class="rank-pos">·</span>' +
      '<span class="rank-body">' +
      '<span class="rank-line">' +
      '<span class="rank-name">Compra al contado <span class="ver">· ' +
      esc(cash.version) + "</span></span>" +
      '<span class="rank-val">' + fmtE(cash.totalEq) + "<small>/mes eq.</small></span>" +
      "</span>" +
      '<span class="bar"><span class="bar-seg seg-bench" data-w="' +
      ((cash.totalEq / max) * 100).toFixed(2) + '" style="width:0"></span></span>' +
      '<span class="rank-line rank-meta"><span>PVP ' + fmtE(cash.pvp) +
      " · residual " + fmtN(cash.residualPct, 0) + " % · " + cash.meses + " meses</span>" +
      '<span class="badge benchmark">Benchmark</span></span>' +
      "</span></div>";

    if (fin) {
      html +=
        '<div class="rank-row is-bench" style="--d:' + (list.length + 1) * 45 + 'ms">' +
        '<span class="rank-pos">·</span>' +
        '<span class="rank-body">' +
        '<span class="rank-line">' +
        '<span class="rank-name">Compra financiada <span class="ver">· Easy Plus ' +
        esc(fin.version) + "</span></span>" +
        '<span class="rank-val">' + fmtE(fin.totalEq) + "<small>/mes eq.</small></span>" +
        "</span>" +
        '<span class="bar"><span class="bar-seg seg-bench" data-w="' +
        ((fin.totalEq / max) * 100).toFixed(2) + '" style="width:0"></span></span>' +
        '<span class="rank-line rank-meta"><span>Entrada ' + fmtE(fin.finance.entrada) +
        " · TAE " + fmtN(fin.finance.tae, 2) + " % · última cuota " +
        fmtE(fin.finance.ultima) + "</span>" +
        '<span class="badge benchmark">Benchmark</span></span>' +
        "</span></div>";
    }

    if (list.length <= 1) {
      html += '<div class="rank-note">A este plazo solo hay ' +
        (list.length ? "una oferta publicada" : "ninguna oferta") +
        " con los filtros actuales. El resto de proveedores no publica este plazo para el C-HR.</div>";
    }

    $("#rank-list").innerHTML = html;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $$("#rank-list .bar-seg").forEach(function (s) {
          s.style.width = s.getAttribute("data-w") + "%";
        });
      });
    });

    $$("#rank-list .rank-row[data-id]").forEach(function (row) {
      row.addEventListener("click", function () {
        selectOffer(row.getAttribute("data-id"));
      });
    });
  }

  function selectOffer(id) {
    selectedId = id;
    $$("#rank-list .rank-row").forEach(function (r) {
      var on = r.getAttribute("data-id") === id;
      r.classList.toggle("is-sel", on);
      r.setAttribute("aria-pressed", String(on));
    });
    $$("#table-body tr").forEach(function (r) {
      r.classList.toggle("is-sel", r.getAttribute("data-id") === id);
    });
    var list = offers();
    renderFlow(list);
    renderDonut(list);
  }

  /* ------------------------------------------------------------
     Scatter: cuota nominal vs coste equivalente
     ------------------------------------------------------------ */

  function niceTicks(min, max, count) {
    var span = max - min || 1;
    var raw = span / count;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    var start = Math.floor(min / step) * step;
    var out = [];
    for (var v = start; v <= max + step * 0.5; v += step) {
      if (v >= min - step * 0.5) out.push(Math.round(v * 100) / 100);
    }
    return out;
  }

  function renderScatter(list) {
    var W = 760, H = 380, P = { l: 62, r: 20, t: 20, b: 48 };
    if (!list.length) { $("#scatter").innerHTML = ""; return; }
    var cash = cashM();
    var xs = list.map(function (o) { return o.cuotaAjustada; });
    var ys = list.map(function (o) { return o.totalEq; }).concat([cash.totalEq]);

    var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
    var padX = (xmax - xmin) * 0.14 || 40;
    xmin -= padX; xmax += padX;
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var padY = (ymax - ymin) * 0.18 || 40;
    ymin -= padY; ymax += padY;

    var sx = function (v) { return P.l + ((v - xmin) / (xmax - xmin)) * (W - P.l - P.r); };
    var sy = function (v) { return H - P.b - ((v - ymin) / (ymax - ymin)) * (H - P.t - P.b); };

    var xt = niceTicks(xmin, xmax, 5);
    var yt = niceTicks(ymin, ymax, 5);
    var g = "";

    yt.forEach(function (v) {
      g += '<line class="grid-line" x1="' + P.l + '" y1="' + sy(v) + '" x2="' + (W - P.r) +
        '" y2="' + sy(v) + '"/>' +
        '<text x="' + (P.l - 10) + '" y="' + (sy(v) + 3.5) + '" text-anchor="end">' +
        fmtN(v, 0) + "</text>";
    });
    xt.forEach(function (v) {
      g += '<text x="' + sx(v) + '" y="' + (H - P.b + 18) + '" text-anchor="middle">' +
        fmtN(v, 0) + "</text>";
    });

    g += '<line class="axis-line" x1="' + P.l + '" y1="' + (H - P.b) + '" x2="' + (W - P.r) +
      '" y2="' + (H - P.b) + '"/>' +
      '<line class="axis-line" x1="' + P.l + '" y1="' + P.t + '" x2="' + P.l + '" y2="' +
      (H - P.b) + '"/>';

    g += '<text class="axis-title" x="' + (P.l + (W - P.l - P.r) / 2) + '" y="' + (H - 8) +
      '" text-anchor="middle">Cuota nominal (€/mes, IVA incluido)</text>';
    g += '<text class="axis-title" transform="translate(14 ' + (P.t + (H - P.t - P.b) / 2) +
      ') rotate(-90)" text-anchor="middle">Coste total equivalente (€/mes)</text>';

    /* Referencia: compra al contado */
    var yc = sy(cash.totalEq);
    g += '<line x1="' + P.l + '" y1="' + yc + '" x2="' + (W - P.r) + '" y2="' + yc +
      '" stroke="#a78bfa" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.75"/>' +
      '<text class="lbl-muted" x="' + (W - P.r) + '" y="' + (yc - 7) +
      '" text-anchor="end" fill="#c4b5fd">Compra al contado · ' + fmtE(cash.totalEq) + "/mes</text>";

    list.forEach(function (o) {
      var r = 6 + Math.min(9, Math.sqrt(o.entradaAjustada) / 13);
      var cx = sx(o.cuotaAjustada), cy = sy(o.totalEq);
      var tip = [
        o.proveedor + " · " + o.version,
        "Cuota nominal: " + fmtE(o.cuotaAjustada, 0) + "/mes",
        "Coste equivalente: " + fmtE(o.totalEq, 0) + "/mes",
        "Entrada: " + fmtE(o.entradaAjustada)
      ].join("|");
      g += '<g class="pt" data-tip="' + esc(tip) + '" data-id="' + o.id + '">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r.toFixed(1) + '" fill="' +
        versionColor(o.version) + '" fill-opacity="0.82" stroke="#06080c" stroke-width="2"/>' +
        "</g>";
    });

    $("#scatter").innerHTML =
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Relación entre cuota nominal y coste total equivalente">' +
      "<title>Cuota nominal frente a coste total equivalente</title>" + g + "</svg>";

    $$("#scatter .pt").forEach(function (p) {
      p.addEventListener("click", function () { selectOffer(p.getAttribute("data-id")); });
    });
  }

  /* ------------------------------------------------------------
     Flujo de caja acumulado
     ------------------------------------------------------------ */

  function cumOffer(o, n) {
    var extras = o.tiresYear + o.insuranceYear + o.maintenanceYear + o.taxYear + o.franchiseYear;
    var pts = [{ m: 0, v: o.entradaAjustada }];
    var acc = o.entradaAjustada;
    for (var m = 1; m <= n; m++) {
      var itv = !o.incluye.itv && m > 36 ? state.itv / 12 : 0;
      acc += o.cuotaAjustada + extras / 12 + o.energyYear / 12 + itv;
      pts.push({ m: m, v: acc });
    }
    return pts;
  }

  function cumCash(p, n) {
    var pts = [{ m: 0, v: p.pvp }];
    var acc = p.pvp;
    for (var m = 1; m <= n; m++) {
      acc += E.runningMonthly(p.version, state, m).total;
      pts.push({ m: m, v: acc });
    }
    return pts;
  }

  function cumFinance(p, n) {
    var f = p.finance;
    var pts = [{ m: 0, v: f.entrada }];
    var acc = f.entrada;
    for (var m = 1; m <= n; m++) {
      acc += f.cuota + E.runningMonthly(p.version, state, m).total;
      if (m === n) acc += f.ultima;
      pts.push({ m: m, v: acc });
    }
    return pts;
  }

  function renderFlow(list) {
    var W = 760, H = 310, P = { l: 64, r: 22, t: 18, b: 42 };
    var n = state.horizon;
    var best = selectedOffer(list);
    var cash = cashM();
    var fin = finM();
    var series = [];

    if (best) {
      series.push({
        name: best.proveedor + " · " + best.version,
        color: versionColor(best.version),
        pts: cumOffer(best, n),
        kind: "rent"
      });
    }
    series.push({
      name: "Compra al contado",
      color: "#a78bfa",
      pts: cumCash(cash, n),
      kind: "cash",
      residual: cash.residual
    });
    if (fin) {
      series.push({
        name: "Compra financiada",
        color: "#f59e0b",
        pts: cumFinance(fin, n),
        kind: "fin"
      });
    }

    var maxV = 0;
    series.forEach(function (s) {
      s.pts.forEach(function (p) { if (p.v > maxV) maxV = p.v; });
    });
    maxV *= 1.06;

    var sx = function (m) { return P.l + (m / n) * (W - P.l - P.r); };
    var sy = function (v) { return H - P.b - (v / maxV) * (H - P.t - P.b); };

    var yt = niceTicks(0, maxV, 5);
    var g = "";
    yt.forEach(function (v) {
      g += '<line class="grid-line" x1="' + P.l + '" y1="' + sy(v) + '" x2="' + (W - P.r) +
        '" y2="' + sy(v) + '"/>' +
        '<text x="' + (P.l - 10) + '" y="' + (sy(v) + 3.5) + '" text-anchor="end">' +
        fmtN(v / 1000, 0) + "k</text>";
    });
    var stepM = n / 4;
    for (var i = 0; i <= 4; i++) {
      var m = Math.round(stepM * i);
      g += '<text x="' + sx(m) + '" y="' + (H - P.b + 18) + '" text-anchor="middle">' +
        m + " m</text>";
    }
    g += '<line class="axis-line" x1="' + P.l + '" y1="' + (H - P.b) + '" x2="' + (W - P.r) +
      '" y2="' + (H - P.b) + '"/>';
    g += '<text class="axis-title" x="' + (P.l - 10) + '" y="' + (P.t - 4) +
      '" text-anchor="end">€</text>';

    series.forEach(function (s, idx) {
      var d = s.pts.map(function (p, k) {
        return (k === 0 ? "M" : "L") + sx(p.m).toFixed(1) + " " + sy(p.v).toFixed(1);
      }).join(" ");
      g += '<path class="line" d="' + d + '" stroke="' + s.color +
        '" pathLength="1" style="animation-delay:' + idx * 0.12 + 's"/>';
      var last = s.pts[s.pts.length - 1];
      g += '<circle class="dot-end" cx="' + sx(last.m) + '" cy="' + sy(last.v) +
        '" r="4" fill="' + s.color + '" stroke="#06080c" stroke-width="2"/>';

      if (s.kind === "cash" && s.residual > 0) {
        var net = last.v - s.residual;
        g += '<line x1="' + sx(n) + '" y1="' + sy(last.v) + '" x2="' + sx(n) + '" y2="' +
          sy(net) + '" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.8"/>' +
          '<circle cx="' + sx(n) + '" cy="' + sy(net) +
          '" r="4.5" fill="#06080c" stroke="#a78bfa" stroke-width="2"/>' +
          '<text class="lbl-muted" x="' + (sx(n) - 8) + '" y="' + (sy(net) + 4) +
          '" text-anchor="end" fill="#c4b5fd">neto ' + fmtE(net) + "</text>";
      }
    });

    $("#flow").innerHTML =
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Flujo de caja acumulado">' +
      "<title>Desembolso acumulado mes a mes</title>" + g + "</svg>";

    $("#flow-legend").innerHTML = series
      .map(function (s) {
        return '<span><i style="background:' + s.color + '"></i>' + esc(s.name) + "</span>";
      })
      .join("");

    var rentEnd = series[0] && series[0].kind === "rent" ? series[0].pts[series[0].pts.length - 1].v : 0;
    $("#flow-note").innerHTML =
      "Desembolso nominal acumulado, sin descontar. En la compra, el punto hueco resta el valor " +
      "residual estimado (" + fmtE(cash.residual) + ") para mostrar el coste neto si se vende al final. " +
      "El renting no recupera nada: al terminar el contrato no hay coche.";
    void rentEnd;
  }

  /* ------------------------------------------------------------
     Donut de desglose
     ------------------------------------------------------------ */

  function renderDonut(list) {
    var o = selectedOffer(list);
    if (!o) return;
    var order = ["entrada", "cuota", "extras", "energia"];
    var total = o.totalEq;
    var acc = 0;
    var segs = "";
    var legend = "";

    order.forEach(function (k) {
      var val = o.components[k];
      if (val <= 0.5) return;
      var len = (val / total) * 100;
      segs +=
        '<circle cx="90" cy="90" r="64" fill="none" stroke="' + COMP_COLORS[k] +
        '" stroke-width="20" pathLength="100" stroke-dasharray="' + len.toFixed(2) +
        " " + (100 - len).toFixed(2) + '" stroke-dashoffset="' + (-acc).toFixed(2) +
        '" stroke-linecap="butt"/>';
      acc += len;
      legend +=
        '<div class="dl-row"><i style="background:' + COMP_COLORS[k] + '"></i>' +
        '<span class="dl-name">' + COMP_LABELS[k] + "</span>" +
        '<span class="dl-val">' + fmtE(val) + " <small>" + fmtN((val / total) * 100, 0) +
        " %</small></span></div>";
    });

    var svg =
      '<svg viewBox="0 0 180 180" role="img" aria-label="Desglose del coste equivalente">' +
      '<g transform="rotate(-90 90 90)">' +
      '<circle cx="90" cy="90" r="64" fill="none" stroke="rgba(148,163,184,0.12)" stroke-width="20"/>' +
      segs + "</g>" +
      '<text x="90" y="86" text-anchor="middle" fill="#e9eef6" font-size="21" font-weight="700">' +
      fmtE(total, 0) + "</text>" +
      '<text x="90" y="104" text-anchor="middle" fill="#64748b" font-size="10">/ mes equivalente</text>' +
      "</svg>";

    $("#donut").innerHTML = svg;
    $("#donut-legend").innerHTML = legend;

    var extrasTotal =
      o.tiresYear + o.insuranceYear + o.maintenanceYear + o.taxYear +
      o.franchiseYear + o.itvTotal / (o.meses / 12);
    $("#donut-stats").innerHTML =
      '<div class="ds"><span>Cuota real</span><b>' + fmtE(o.cuotaAjustada, 0) + "/mes</b></div>" +
      '<div class="ds"><span>Entrada</span><b>' + fmtE(o.entradaAjustada) + "</b></div>" +
      '<div class="ds"><span>Costes no cubiertos</span><b>' + fmtE(extrasTotal) + "/año</b></div>" +
      '<div class="ds"><span>Energía</span><b>' + fmtE(o.energyYear) + "/año</b></div>" +
      '<div class="ds wide"><span>Total nominal</span><b>' + fmtE(o.nominalTotal) + "</b></div>";

    $("#donut-title").textContent = o.proveedor + " · " + o.version + " · " + o.meses + " meses";
    $("#donut-sub").textContent =
      "Cuota " + fmtE(o.cuotaAjustada, 0) + " + entrada " + fmtE(o.entradaAjustada) +
      " + costes no cubiertos y energía, normalizados con VPN al " + fmtN(state.discount, 1) + " %.";
  }

  /* ------------------------------------------------------------
     Comparativa por plazo
     ------------------------------------------------------------ */

  function renderHorizonCards() {
    var html = "";
    [36, 48, 60].forEach(function (h) {
      var s = Object.assign({}, state, { horizon: h });
      var list = E.offerList(s).sort(function (a, b) { return a.totalEq - b.totalEq; });
      var best = list[0] || null;
      var cash = E.purchaseCashMetrics(state.benchmarkVersion, s);
      var fin = h === 48 ? E.purchaseFinanceMetrics(state.benchmarkVersion, s) : null;
      var diff = best ? cash.totalEq - best.totalEq : 0;
      var rentWins = diff > 0;

      html += '<div class="hz' + (h === state.horizon ? " is-current" : "") + '">' +
        '<div class="hz-top"><span class="hz-title">' + h + " meses</span>" +
        (best ? '<span class="hz-win ' + (rentWins ? "rent" : "buy") + '">' +
          (rentWins ? "Renting" : "Compra") + "</span>" : "") + "</div>";

      if (best) {
        html += '<div class="hz-rows">' +
          '<div class="hz-row"><span>Mejor renting · ' + esc(best.proveedor) + " " +
          esc(best.version) + "</span><b>" + fmtE(best.totalEq) + "</b></div>" +
          '<div class="hz-row"><span>Compra al contado · ' + esc(cash.version) +
          "</span><b>" + fmtE(cash.totalEq) + "</b></div>" +
          (fin
            ? '<div class="hz-row"><span>Compra financiada</span><b>' + fmtE(fin.totalEq) +
              "</b></div>"
            : '<div class="hz-row"><span>Compra financiada</span><b>—</b></div>') +
          "</div>" +
          '<div class="hz-delta">' +
          (Math.abs(diff) < 0.5
            ? "Empate técnico"
            : "Diferencia: <b>" + fmtE(Math.abs(diff)) + "/mes</b> a favor " +
              (rentWins ? "del renting" : "de la compra") + " · <b>" +
              fmtE(Math.abs(diff) * h) + "</b> en total") +
          "</div>";
      } else {
        html += '<div class="hz-delta">Sin ofertas para este plazo con los filtros actuales.</div>';
      }
      html += "</div>";
    });
    $("#horizon-grid").innerHTML = html;
  }

  /* ------------------------------------------------------------
     Curva de cruce
     ------------------------------------------------------------ */

  function rentingAt(h) {
    var pts = [];
    [36, 48, 60].forEach(function (hh) {
      var b = bestAt(hh);
      if (b) pts.push({ h: hh, v: b.totalEq, o: b });
    });
    if (!pts.length) return null;
    if (h <= pts[0].h) return { h: h, v: pts[0].v, o: pts[0].o };
    for (var i = 0; i < pts.length - 1; i++) {
      if (h >= pts[i].h && h <= pts[i + 1].h) {
        var k = (h - pts[i].h) / (pts[i + 1].h - pts[i].h);
        return {
          h: h,
          v: pts[i].v + (pts[i + 1].v - pts[i].v) * k,
          o: k < 0.5 ? pts[i].o : pts[i + 1].o
        };
      }
    }
    var last = pts[pts.length - 1];
    return { h: h, v: last.v, o: last.o };
  }

  function renderCrossover() {
    var W = 760, H = 300, P = { l: 62, r: 22, t: 22, b: 44 };
    var hs = [];
    for (var h = 36; h <= 60; h += 2) hs.push(h);

    var rent = hs.map(function (h) { return { h: h, v: rentingAt(h).v }; });
    var cashPts = hs.map(function (h) {
      return { h: h, v: E.purchaseCashMetrics(state.benchmarkVersion, Object.assign({}, state, { horizon: h })).totalEq };
    });

    var all = rent.concat(cashPts).map(function (p) { return p.v; });
    var ymin = Math.min.apply(null, all), ymax = Math.max.apply(null, all);
    var pad = (ymax - ymin) * 0.25 || 30;
    ymin -= pad; ymax += pad;

    var sx = function (h) { return P.l + ((h - 36) / 24) * (W - P.l - P.r); };
    var sy = function (v) { return H - P.b - ((v - ymin) / (ymax - ymin)) * (H - P.t - P.b); };

    var g = "";
    niceTicks(ymin, ymax, 4).forEach(function (v) {
      g += '<line class="grid-line" x1="' + P.l + '" y1="' + sy(v) + '" x2="' + (W - P.r) +
        '" y2="' + sy(v) + '"/>' +
        '<text x="' + (P.l - 10) + '" y="' + (sy(v) + 3.5) + '" text-anchor="end">' +
        fmtN(v, 0) + "</text>";
    });
    [36, 42, 48, 54, 60].forEach(function (h) {
      g += '<text x="' + sx(h) + '" y="' + (H - P.b + 18) + '" text-anchor="middle">' +
        h + " m</text>";
    });
    g += '<line class="axis-line" x1="' + P.l + '" y1="' + (H - P.b) + '" x2="' + (W - P.r) +
      '" y2="' + (H - P.b) + '"/>';

    var path = function (pts) {
      return pts.map(function (p, i) {
        return (i === 0 ? "M" : "L") + sx(p.h).toFixed(1) + " " + sy(p.v).toFixed(1);
      }).join(" ");
    };

    g += '<path class="line" d="' + path(rent) +
      '" stroke="#22d3ee" pathLength="1" style="animation:none;stroke-dashoffset:0;stroke-dasharray:6 5;opacity:.9"/>';
    g += '<path class="line" d="' + path(cashPts) +
      '" stroke="#a78bfa" pathLength="1" style="animation-delay:.1s"/>';

    /* Cruce */
    var cross = null;
    for (var i = 0; i < hs.length - 1; i++) {
      var d0 = cashPts[i].v - rent[i].v;
      var d1 = cashPts[i + 1].v - rent[i + 1].v;
      if (d0 * d1 <= 0 && d0 !== d1) {
        var k = d0 / (d0 - d1);
        cross = {
          h: hs[i] + (hs[i + 1] - hs[i]) * k,
          v: rent[i].v + (rent[i + 1].v - rent[i].v) * k
        };
        break;
      }
    }

    if (cross) {
      g += '<line x1="' + sx(cross.h) + '" y1="' + sy(cross.v) + '" x2="' + sx(cross.h) +
        '" y2="' + (H - P.b) + '" stroke="#e9eef6" stroke-width="1" stroke-dasharray="3 4" opacity="0.4"/>' +
        '<circle cx="' + sx(cross.h) + '" cy="' + sy(cross.v) + '" r="6" fill="#06080c" stroke="#e9eef6" stroke-width="2.5"/>' +
        '<text class="lbl" x="' + (sx(cross.h) + 12) + '" y="' + (sy(cross.v) - 10) + '">Cruce ≈ ' +
        fmtN(cross.h, 0) + " meses</text>";
    }

    g += '<text class="lbl" x="' + (W - P.r) + '" y="' + (sy(rent[rent.length - 1].v) - 10) +
      '" text-anchor="end" fill="#67e8f9">Mejor renting</text>';
    g += '<text class="lbl" x="' + (W - P.r) + '" y="' + (sy(cashPts[cashPts.length - 1].v) + 20) +
      '" text-anchor="end" fill="#c4b5fd">Compra al contado</text>';

    $("#crossover").innerHTML =
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Punto de cruce entre renting y compra">' +
      "<title>Coste equivalente según el plazo</title>" + g + "</svg>";

    $("#crossover-note").innerHTML = cross
      ? "Con los supuestos actuales, el renting sale más barato hasta los <b>" +
        fmtN(cross.h, 0) + " meses</b>; a partir de ahí la compra al contado acumula menos coste. " +
        "La línea de renting interpola la mejor oferta disponible a 36, 48 y 60 meses."
      : "Con los supuestos actuales no se detecta un cruce entre 36 y 60 meses.";
  }

  /* ------------------------------------------------------------
     Tabla
     ------------------------------------------------------------ */

  function tableRows(list) {
    var rows = list.map(function (o) {
      return {
        id: o.id,
        name: o.proveedor,
        version: o.version,
        months: o.meses,
        entrada: o.entradaAjustada,
        cuota: o.cuotaAjustada,
        nominal: o.nominalTotal,
        eq: o.totalEq,
        badge: o.badge,
        cat: "renting"
      };
    });
    var c = cashM();
    rows.push({
      id: c.id,
      name: "Compra al contado",
      version: c.version,
      months: c.meses,
      entrada: c.pvp,
      cuota: null,
      nominal: c.nominalTotal,
      eq: c.totalEq,
      badge: c.badge,
      cat: "compra"
    });
    var f = finM();
    if (f) {
      rows.push({
        id: f.id,
        name: "Toyota Easy Plus",
        version: f.version,
        months: f.meses,
        entrada: f.finance.entrada,
        cuota: f.finance.cuota,
        nominal: f.nominalTotal,
        eq: f.totalEq,
        badge: f.badge,
        cat: "compra"
      });
    }
    return rows;
  }

  function renderTable(list) {
    var rows = tableRows(list);
    rows.sort(function (a, b) {
      var x = a[sort.key], y = b[sort.key];
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      if (typeof x === "string") return x.localeCompare(y, "es") * sort.dir;
      return (x - y) * sort.dir;
    });

    var html = rows.map(function (r) {
      var sel = r.id === selectedId;
      return '<tr class="' + (sel ? "is-sel " : "") + (r.cat === "compra" ? "bench" : "") +
        '" data-id="' + r.id + '">' +
        '<td><span class="t-name">' + esc(r.name) + "</span></td>" +
        '<td><span class="t-ver">' + esc(r.version) + "</span></td>" +
        "<td>" + r.months + " m</td>" +
        "<td>" + fmtE(r.entrada) + "</td>" +
        "<td>" + (r.cuota == null ? "—" : fmtE(r.cuota, 0)) + "</td>" +
        "<td>" + fmtE(r.nominal) + "</td>" +
        "<td><strong>" + fmtE(r.eq) + "</strong></td>" +
        '<td><span class="badge ' + r.badge.tone + '">' + esc(r.badge.label) + "</span></td>" +
        "</tr>";
    }).join("");

    $("#table-body").innerHTML = html;

    $$("#table-body tr").forEach(function (tr) {
      var id = tr.getAttribute("data-id");
      if (!id || id.indexOf("buy-") === 0) return;
      tr.addEventListener("click", function () { selectOffer(id); });
    });

    $$("#offer-table thead th").forEach(function (th) {
      th.classList.toggle("is-sorted", th.getAttribute("data-sort") === sort.key);
      var arrow = th.querySelector(".arrow");
      if (arrow) {
        arrow.textContent = th.getAttribute("data-sort") === sort.key
          ? (sort.dir === 1 ? "▲" : "▼")
          : "↕";
      }
    });
  }

  /* ------------------------------------------------------------
     Veredicto
     ------------------------------------------------------------ */

  function renderVerdict(list) {
    var best = list[0];
    var cash = cashM();
    var fin = finM();
    if (!best) {
      $("#verdict").innerHTML = '<p class="v-kicker">Sin datos</p><h3>No hay ofertas para este plazo con los filtros actuales.</h3>';
      return;
    }
    var diff = cash.totalEq - best.totalEq;
    var rentingWins = diff > 0;
    var html = '<p class="v-kicker">Conclusión para ' + state.horizon + " meses y " +
      fmtN(state.km) + " km/año</p>";

    html += "<h3>" + (rentingWins ? "El renting es la opción más barata" : "La compra al contado es la opción más barata") +
      " con los supuestos actuales</h3>";

    html += "<p>El mejor renting es <strong>" + esc(best.proveedor) + " · " +
      esc(best.version) + " " + esc(best.acabado) + "</strong> con <strong>" +
      fmtE(best.totalEq) + "/mes equivalente</strong> (cuota " + fmtE(best.cuotaAjustada, 0) +
      " + entrada " + fmtE(best.entradaAjustada) + " + costes no cubiertos). La compra al contado del " +
      esc(cash.version) + " cuesta <strong>" + fmtE(cash.totalEq) + "/mes</strong> incluyendo PVP, uso y valor residual. " +
      "La diferencia es de <strong>" + fmtE(Math.abs(diff)) + "/mes</strong> (" +
      fmtE(Math.abs(diff) * state.horizon) + " en todo el periodo) a favor " +
      (rentingWins ? "del renting" : "de la compra") + ".</p>";

    if (fin) {
      html += "<p>La compra financiada con Toyota Easy Plus sale a <strong>" +
        fmtE(fin.totalEq) + "/mes</strong>, " + (fin.totalEq > cash.totalEq ? "más cara" : "más barata") +
        " que pagar al contado. El interés y la última cuota pesan más que el ahorro de no inmovilizar el capital.</p>";
    }

    if (Math.abs(diff) <= 20) {
      html += "<p>La diferencia es tan pequeña que cae dentro del margen de error de las estimaciones " +
        "de kilometraje y de cuota. A este plazo, renting y compra al contado están prácticamente empatados: " +
        "la decisión real depende de si prefieres no inmovilizar capital o quedarte el coche al final.</p>";
    }

    html += "<p>El renting incluye seguro, mantenimiento e impuestos, pero no combustible; la compra soporta " +
      "seguro, mantenimiento, neumáticos, ITV e impuesto de circulación. El cálculo iguala ambas opciones con " +
      "el mismo uso y un coste de oportunidad del " + fmtN(state.discount, 1) + " % anual.</p>";

    $("#verdict").innerHTML = html;
  }

  /* ------------------------------------------------------------
     Supuestos
     ------------------------------------------------------------ */

  var ASSUMP = [
    {
      title: "Energía",
      items: [
        { key: "fuel", label: "Gasolina", min: 1.2, max: 2.2, step: 0.01, dec: 2, suffix: " €/l" },
        { key: "electricity", label: "Electricidad", min: 0.1, max: 0.35, step: 0.005, dec: 3, suffix: " €/kWh" }
      ]
    },
    {
      title: "Uso y propiedad",
      items: [
        { key: "insurance", label: "Seguro anual (compra)", min: 400, max: 1200, step: 25, dec: 0, suffix: " €" },
        { key: "maintenance", label: "Mantenimiento anual (compra)", min: 150, max: 800, step: 25, dec: 0, suffix: " €" },
        { key: "tireKm", label: "Neumáticos por km", min: 0, max: 0.03, step: 0.0005, dec: 4, suffix: " €/km" },
        { key: "itv", label: "ITV", min: 0, max: 120, step: 5, dec: 0, suffix: " €" },
        { key: "tax", label: "Impuesto de circulación", min: 0, max: 250, step: 10, dec: 0, suffix: " €" },
        { key: "franchiseProvision", label: "Provisión franquicia", min: 0, max: 600, step: 25, dec: 0, suffix: " €/año" }
      ]
    },
    {
      title: "Valor residual",
      items: [
        { key: "residual3", label: "A 3 años", min: 30, max: 80, step: 1, dec: 0, suffix: " %" },
        { key: "residual4", label: "A 4 años", min: 25, max: 75, step: 1, dec: 0, suffix: " %" },
        { key: "residual5", label: "A 5 años", min: 20, max: 70, step: 1, dec: 0, suffix: " %" }
      ]
    },
    {
      title: "Descuento y financiación",
      items: [
        { key: "discount", label: "Tasa de descuento (VPN)", min: 0, max: 8, step: 0.5, dec: 1, suffix: " %" },
        { key: "entryRate", label: "Tipo al financiar la entrada", min: 0, max: 15, step: 0.25, dec: 2, suffix: " % TIN" }
      ]
    }
  ];

  function paintRange(el) {
    var min = parseFloat(el.min) || 0;
    var max = parseFloat(el.max) || 100;
    var v = parseFloat(el.value);
    el.style.setProperty("--p", (((v - min) / (max - min)) * 100).toFixed(1) + "%");
  }

  function renderAssumptions() {
    var html = '<div class="assump-grid">';
    ASSUMP.forEach(function (grp) {
      html += '<div class="assump-group"><h4>' + esc(grp.title) + "</h4>";
      grp.items.forEach(function (it) {
        html += '<div class="slider">' +
          '<div class="slider-top"><label for="a-' + it.key + '">' + esc(it.label) + "</label>" +
          '<output id="o-' + it.key + '"></output></div>' +
          '<input type="range" id="a-' + it.key + '" data-key="' + it.key + '" min="' + it.min +
          '" max="' + it.max + '" step="' + it.step + '" value="' + state[it.key] + '">' +
          "</div>";
      });
      html += "</div>";
    });
    html += "</div>";
    $("#assumptions").innerHTML = html;

    $$("#assumptions input[type=range]").forEach(function (el) {
      var key = el.getAttribute("data-key");
      var item = null;
      ASSUMP.forEach(function (g) {
        g.items.forEach(function (i) { if (i.key === key) item = i; });
      });
      var out = $("#o-" + key);
      function sync() {
        out.textContent = fmtN(state[key], item.dec) + item.suffix;
        el.value = state[key];
        paintRange(el);
      }
      el.addEventListener("input", function () {
        state[key] = parseFloat(el.value);
        sync();
        scheduleRender();
      });
      sync();
    });
  }

  /* ------------------------------------------------------------
     Controles
     ------------------------------------------------------------ */

  function updateControls() {
    $$("[data-horizon]").forEach(function (b) {
      b.classList.toggle("is-on", +b.getAttribute("data-horizon") === state.horizon);
    });
    $$("[data-entry]").forEach(function (b) {
      b.classList.toggle("is-on", b.getAttribute("data-entry") === state.entryMode);
    });
    $("#custom-wrap").style.display = state.entryMode === "custom" ? "flex" : "none";
    var ce = $("#customEntry");
    if (ce) {
      ce.value = state.customEntry;
      $("#customEntry-out").textContent = fmtE(state.customEntry);
      paintRange(ce);
    }
    var km = $("#km");
    km.value = state.km;
    $("#km-out").textContent = fmtN(state.km) + " km";
    paintRange(km);
    $("#estimates").checked = state.includeEstimates;
    $("#estimates-label").textContent = state.includeEstimates ? "Con estimaciones" : "Solo reales";
  }

  function bind() {
    $$("[data-horizon]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.horizon = +b.getAttribute("data-horizon");
        render();
      });
    });
    $$("[data-entry]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.entryMode = b.getAttribute("data-entry");
        render();
      });
    });
    $("#km").addEventListener("input", function (e) {
      state.km = +e.target.value;
      scheduleRender();
    });
    $("#customEntry").addEventListener("input", function (e) {
      state.customEntry = +e.target.value;
      scheduleRender();
    });
    $("#estimates").addEventListener("change", function (e) {
      state.includeEstimates = e.target.checked;
      render();
    });
    $("#reset").addEventListener("click", function () {
      Object.keys(D.DEFAULTS).forEach(function (k) { state[k] = D.DEFAULTS[k]; });
      renderAssumptions();
      render();
    });
    $("#csv").addEventListener("click", exportCsv);

    $$("#offer-table thead th[data-sort]").forEach(function (th) {
      th.addEventListener("click", function () {
        var key = th.getAttribute("data-sort");
        if (sort.key === key) sort.dir *= -1;
        else { sort.key = key; sort.dir = 1; }
        renderTable(offers());
      });
    });

    /* Tooltip global */
    var tip = $("#tip");
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest && e.target.closest("[data-tip]");
      if (!t) return;
      var parts = t.getAttribute("data-tip").split("|");
      tip.innerHTML = "<b>" + esc(parts[0]) + "</b>" +
        parts.slice(1).map(function (p) { return "<div>" + esc(p) + "</div>"; }).join("");
      tip.classList.add("on");
    });
    document.addEventListener("mousemove", function (e) {
      if (!tip.classList.contains("on")) return;
      var x = e.clientX, y = e.clientY;
      var w = tip.offsetWidth, h = tip.offsetHeight;
      x = Math.max(w / 2 + 8, Math.min(window.innerWidth - w / 2 - 8, x));
      y = Math.max(h + 12, y);
      tip.style.left = x + "px";
      tip.style.top = y + "px";
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest && e.target.closest("[data-tip]");
      if (t) tip.classList.remove("on");
    });
  }

  function exportCsv() {
    var rows = tableRows(offers());
    var head = ["Proveedor", "Version", "Meses", "Entrada", "Cuota", "Total nominal", "Coste equivalente", "Tipo"];
    var lines = [head.join(";")];
    rows.forEach(function (r) {
      lines.push([
        r.name, r.version, r.months,
        r.entrada.toFixed(2),
        r.cuota == null ? "" : r.cuota.toFixed(2),
        r.nominal.toFixed(2),
        r.eq.toFixed(2),
        r.badge.label
      ].join(";"));
    });
    var blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "renting-toyota-chr-" + state.horizon + "m.csv";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* ------------------------------------------------------------
     Render global
     ------------------------------------------------------------ */

  function render() {
    var list = offers();
    if (!list.some(function (o) { return o.id === selectedId; })) {
      selectedId = list[0] ? list[0].id : null;
    }
    renderKpis(list);
    renderRanking(list);
    renderScatter(list);
    renderFlow(list);
    renderDonut(list);
    renderHorizonCards();
    renderCrossover();
    renderTable(list);
    renderVerdict(list);
    updateControls();
  }

  function init() {
    renderAssumptions();
    bind();

    var nReal = D.OFFERS.filter(function (o) { return o.tipo === "real"; }).length;
    var nEst = D.OFFERS.length - nReal;
    $("#hero-facts").innerHTML =
      '<span class="fact"><b>' + D.OFFERS.length + "</b> ofertas analizadas</span>" +
      '<span class="fact"><b>' + nReal + "</b> reales · <b>" + nEst + "</b> estimadas</span>" +
      '<span class="fact">Plazos <b>36 / 48 / 60</b> meses</span>' +
      '<span class="fact">Referencia <b>15.000 km/año</b></span>' +
      '<span class="fact">Precios <b>IVA incluido</b></span>' +
      '<span class="fact">Datos a <b>' + D.META.fecha + "</b></span>";

    var byType = { "Oferta oficial": "oficial", "Financiación": "fin", "Oferta real": "real", "Referencia de mercado": "real", "Descartada": "desc" };
    $("#sources").innerHTML = D.SOURCES.map(function (s) {
      return '<article class="src">' +
        '<div class="src-top"><span class="src-type ' + (byType[s.tipo] || "") + '">' + esc(s.tipo) + "</span>" +
        '<span class="src-date">' + esc(s.fecha) + "</span></div>" +
        "<h4>" + esc(s.nombre) + "</h4>" +
        "<p>" + esc(s.detalle) + "</p>" +
        '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url) + "</a>" +
        "</article>";
    }).join("");

    $("#market").innerHTML = D.MARKET.map(function (m) {
      return '<div class="dl-row market"><span class="dl-name"><b style="color:var(--txt)">' +
        esc(m.etiqueta) + "</b><br><span style=\"color:var(--dim);font-size:.72rem\">" +
        esc(m.detalle) + "</span></span><span class=\"dl-val\">" + esc(m.valor) + "</span></div>";
    }).join("");

    $("#discarded").innerHTML = D.DISCARDED.map(function (d) {
      return '<div class="note"><h4>' + esc(d.nombre) + "</h4><p>" + esc(d.motivo) + "</p></div>";
    }).join("");

    $("#meta-date").textContent = D.META.fecha;
    $("#meta-vigencia").textContent = D.META.vigencia;

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
