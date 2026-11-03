# Finanzas · app

Página de la app Finanzas: reparte los gastos de las tarjetas de crédito (Banco Popular, Visa BAC y Walmart Amex) entre personas y calcula lo que cada una debe poner. Se publica con GitHub Pages desde `main`.

Este repositorio es público y solo tiene la página: `index.html`, `config.js`, `manifest.webmanifest`, `sw.js` e `icons/`. No tiene datos.

- Los datos y la seguridad viven en Supabase. Cada tabla tiene RLS: sin sesión y sin perfil activo no se ve nada.
- `config.js` lleva la URL del proyecto y la llave publishable, que es pública por diseño. La llave secreta (service_role) nunca va aquí.
- Los estados de cuenta en PDF se leen en el navegador y no se suben a ningún lado.

Las migraciones, los respaldos y la operación están en el repositorio privado `Finanzas`.
