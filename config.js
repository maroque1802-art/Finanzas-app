/* Finanzas · configuración de conexión
 *
 * La llave publishable (antes "anon") es PÚBLICA por diseño: va dentro de la
 * aplicación y cualquiera que abra la página puede verla. Lo que protege los
 * datos son el login y las políticas RLS de Supabase, que deciden en la base
 * qué filas ve cada usuario.
 *
 * La llave secreta (service_role) salta todas las políticas. NUNCA va en este
 * archivo ni en ningún archivo del navegador.
 */
const CONFIG = {
  SUPABASE_URL: 'https://axeujbcvauqeitjkndar.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_XI7WV420ZuBTjWdU3BVpYw_FNS2jMgI'
};
