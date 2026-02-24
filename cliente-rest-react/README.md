# Cliente React - Consulta de Acciones

Scaffolding mínimo para el cliente SPA que consulta un gateway (Spring) y muestra históricos de acciones.

Pasos rápidos:
1. Copiar archivos.
2. Crear `.env` con `REACT_APP_API_BASE_URL`.
3. `npm install`
4. `npm start`

El cliente hace GET a: `${REACT_APP_API_BASE_URL}/stocks?symbol=...&type=...`
Envía también header `X-User` si el usuario está seteado.