// Archivo JavaScript con lógica de la aplicación
/* Utilidades comunes — solo educativo */
// Declaración de una constante o función flecha
const App = (()=>{
// Declaración de una constante o función flecha
  const CLP = new Intl.NumberFormat('es-CL',{ style:'currency', currency:'CLP' });
// Declaración de una constante o función flecha
  const qs = s=>document.querySelector(s);

// Definición de una función
  function load(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch{ return fallback; }
  }
// Definición de una función
  function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

// Definición de una función
  function getCurrentUser(){
// Declaración de una constante o función flecha
    const email = load('lup_currentUser', null);
    if(!email) return null;
// Declaración de una constante o función flecha
    const users = load('lup_users', []);
    return users.find(u=>u.email===email) || null;
  }
// Definición de una función
  function setCurrentUser(email){ save('lup_currentUser', email); }

// Definición de una función
  function updateUser(updated){
// Declaración de una constante o función flecha
    const users = load('lup_users', []);
// Declaración de una constante o función flecha
    const idx = users.findIndex(u=>u.email===updated.email);
    if(idx>=0){ users[idx]=updated; save('lup_users', users); }
  }

// Definición de una función
  function formatCLP(n){ return CLP.format(n||0); }

// Definición de una función
  function toast(msg, variant='success'){
    // Toast simple con alert para principiantes
// Declaración de una constante o función flecha
    const el = document.createElement('div');
    el.className = `alert alert-${variant} position-fixed top-0 start-50 translate-middle-x mt-3 shadow`;
    el.style.zIndex = 2000; el.textContent = msg; document.body.appendChild(el);
    setTimeout(()=>el.remove(), 2000);
  }

// Definición de una función
  function levelFromPoints(points){
    if(points>=500) return 'Gold';
    if(points>=200) return 'Silver';
    return 'Bronze';
  }

// Definición de una función
  function injectWhatsApp(){
    if(document.querySelector('.whatsapp-fab')) return;
// Declaración de una constante o función flecha
    const wrap = document.createElement('div');
    wrap.className = 'whatsapp-fab';
    wrap.innerHTML = `<a href="https://wa.me/56912345678?text=Hola%20Level-Up%20Gamer%20👋" target="_blank"><i class="bi bi-whatsapp"></i> Soporte</a>`;
    document.body.appendChild(wrap);
  }

// Definición de una función
  function updateNavCartCount(){
// Declaración de una constante o función flecha
    const el = document.getElementById('navCartCount'); if(!el) return;
// Declaración de una constante o función flecha
    const count = (JSON.parse(localStorage.getItem('lup_cart')||'[]')).reduce((a,b)=>a+b.qty,0);
    if(count>0){ el.textContent = count; el.classList.remove('d-none'); } else { el.classList.add('d-none'); }
  }

// Definición de una función
  function initNavbar(){
    updateNavCartCount();
// Declaración de una constante o función flecha
    const navAuth = document.getElementById('navAuth'); if(!navAuth) return;
// Declaración de una constante o función flecha
    const user = getCurrentUser();
    if(user){
      navAuth.innerHTML = `<div class="dropdown">
        <button class="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">${user.name||user.email}</button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
          <li><a class="dropdown-item" href="profile.html">Perfil</a></li>
          <li><a class="dropdown-item" href="#" id="navLogout">Cerrar sesión</a></li>
        </ul></div>`;
      setTimeout(()=>{
// Declaración de una constante o función flecha
        const b = document.getElementById('navLogout'); if(b) b.addEventListener('click', (e)=>{ e.preventDefault(); localStorage.removeItem('lup_currentUser'); location.reload(); });
      });
    }
  }

  return { load, save, formatCLP, getCurrentUser, setCurrentUser, updateUser, toast, levelFromPoints, injectWhatsApp, updateNavCartCount, initNavbar };
})();