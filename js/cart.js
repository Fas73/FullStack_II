// Archivo JavaScript con lógica de la aplicación
/* Carrito y checkout simulado */
// Declaración de una constante o función flecha
const Cart = (()=>{
// Definición de una función
  function get(){ return JSON.parse(localStorage.getItem('lup_cart')||'[]'); }
// Definición de una función
  function save(items){ localStorage.setItem('lup_cart', JSON.stringify(items)); }

// Definición de una función
  function add(code, qty){
// Declaración de una constante o función flecha
    const items = get();
// Declaración de una constante o función flecha
    const p = PRODUCTS.find(x=>x.code===code);
    if(!p) return;
// Declaración de una constante o función flecha
    const i = items.findIndex(x=>x.code===code);
    if(i>=0) items[i].qty += qty; else items.push({ code:p.code, name:p.name, price:p.price, qty });
    save(items);
  }
// Definición de una función
  function remove(code){ save(get().filter(x=>x.code!==code)); }
// Definición de una función
// Declaración de una constante o función flecha
  function setQty(code, qty){ const items = get(); const it = items.find(x=>x.code===code); if(it){ it.qty = Math.max(1, qty|0); save(items);} }

// Definición de una función
  function getDetailed(){
// Declaración de una constante o función flecha
    const items = get();
// Declaración de una constante o función flecha
    const subtotal = items.reduce((a,b)=>a + (b.price*b.qty), 0);
    return { items, subtotal };
  }

// Definición de una función
  function checkout({ duocDiscount, pointsUsed, subtotal, total, pointsEarned }){
    // Actualizar puntos del usuario
// Declaración de una constante o función flecha
    const user = App.getCurrentUser();
    if(user){
      user.points = Math.max(0, (user.points||0) - (pointsUsed||0) + (pointsEarned||0));
      App.updateUser(user);
    }
    // Guardar orden
// Declaración de una constante o función flecha
    const orders = App.load('lup_orders', []);
// Declaración de una constante o función flecha
    const id = String(Date.now());
// Declaración de una constante o función flecha
    const items = get();
    orders.push({ id, items, subtotal, duocDiscount, pointsUsed, total, pointsEarned, date:new Date().toISOString(), userEmail: user?user.email:null });
    App.save('lup_orders', orders);
    // Vaciar carrito
    save([]);
  }

  return { add, remove, setQty, getDetailed };
})();