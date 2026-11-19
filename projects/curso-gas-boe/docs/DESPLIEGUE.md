# Despliegue del curso en GitHub + Vercel

## Resumen de la configuración

| Ajuste | Valor |
| --- | --- |
| Repositorio | Workspace principal, rama `main` |
| Root Directory en Vercel | `projects/curso-gas-boe` |
| Framework | Vite |
| Install Command | `pnpm install --frozen-lockfile` |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Node.js | 22.x (ver `.nvmrc` y `engines.node`) |

No hacen falta `rewrites`: la app es una sola página sin router.

## 1. Validación local

```powershell
cd projects/curso-gas-boe
pnpm install --frozen-lockfile
pnpm test; pnpm build; pnpm lint
```

## 2. Publicar en GitHub

```powershell
gh auth login --web --scopes repo --git-protocol https
git add -A
git commit -m "feat(curso-gas): configurar despliegue en Vercel"
gh repo create curso-gas-boe --public --source=. --remote=origin --push
```

Si el nombre ya está ocupado, cambia `curso-gas-boe` por otro disponible. El repo contiene todo el workspace; Vercel solo compila el subdirectorio indicado.

## 3. Importar en Vercel

1. Entrar en `https://vercel.com/new` e importar el repositorio creado.
2. En **Configure Project**, pulsar **Edit** junto a **Root Directory** y elegir `projects/curso-gas-boe`.
3. Ajustar:
   - **Framework Preset**: Vite.
   - **Node.js Version**: 22.x.
   - **Install Command**: `pnpm install --frozen-lockfile`.
   - **Build Command**: `pnpm build`.
   - **Output Directory**: `dist`.
4. No hay variables de entorno ni secretos que configurar.
5. Pulsar **Deploy**.

## 4. Verificación

- Abrir la URL que muestra Vercel y comprobar que carga «Gas Sin Misterio».
- Probar navegación, buscador, un test y el examen.
- Confirmar que no hay errores en la consola del navegador.

Cada push a `main` genera un despliegue automático.

## Notas

- El PDF del BOE es documento público; no se incluyen credenciales en el repositorio.
- `packageManager` fija pnpm 12.16.1. Si Vercel tuviera problemas con Corepack, se puede fijar la versión de pnpm en los ajustes del proyecto.
