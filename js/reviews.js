// Archivo JavaScript con lógica de la aplicación
/* Reseñas por producto (solo usuarios logueados) */
// Declaración de una constante o función flecha
const Reviews = (()=>{
// Definición de una función
  function key(code){ return `lup_reviews:${code}`; }
// Definición de una función
  function list(code){ return App.load(key(code), []); }
// Definición de una función
  function add(code, { userEmail, rating, comment }){
// Declaración de una constante o función flecha
    const arr = list(code);
    arr.push({ userEmail, rating, comment, date:new Date().toISOString() });
    App.save(key(code), arr);
  }
  return { list, add };
})();