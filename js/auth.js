// Archivo JavaScript con lógica de la aplicación
/* Registro / Login educativo con localStorage */
// Declaración de una constante o función flecha
const Auth = (()=>{
// Declaración de una constante o función flecha
  const USERS_KEY = 'lup_users';

// Definición de una función
  function calculateAge(dateStr){
// Declaración de una constante o función flecha
    const d = new Date(dateStr); const t = new Date();
    let age = t.getFullYear() - d.getFullYear();
// Declaración de una constante o función flecha
    const m = t.getMonth() - d.getMonth();
    if(m<0 || (m===0 && t.getDate()<d.getDate())) age--;
    return age;
  }

// Definición de una función
  function register({ name, email, password, birthdate, phone, referredBy }){
// Declaración de una constante o función flecha
    const users = App.load(USERS_KEY, []);
    if(users.some(u=>u.email===email)){ App.toast('Email ya registrado', 'warning'); return false; }

    if(calculateAge(birthdate) < 18){ App.toast('Debes ser mayor de 18 años', 'warning'); return false; }

// Declaración de una constante o función flecha
    const isDuoc = /@duoc\.cl$/i.test(email);
// Declaración de una constante o función flecha
    const user = { name, email, password, birthdate, phone, isDuoc, points:0, referredBy: referredBy||null };
    users.push(user); App.save(USERS_KEY, users); App.save('lup_currentUser', email);

    // Puntos por referido (al padrino)
    if(referredBy){
// Declaración de una constante o función flecha
      const idx = users.findIndex(u=>u.email===referredBy);
      if(idx>=0){ users[idx].points = (users[idx].points||0) + 200; App.save(USERS_KEY, users); }
    }
    return true;
  }

// Definición de una función
  function login(email, password){
// Declaración de una constante o función flecha
    const users = App.load(USERS_KEY, []);
// Declaración de una constante o función flecha
    const u = users.find(u=>u.email===email && u.password===password);
    if(u){ App.save('lup_currentUser', email); return true; }
    return false;
  }

  return { register, login };
})();