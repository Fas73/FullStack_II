// ---------------------------------------------
// 1) LISTA DE PRODUCTOS DISPONIBLES EN LA TIENDA
// ---------------------------------------------
// Cada producto tiene: código, categoría, nombre, precio, descripción, imagen, fabricante y distribuidor.
const PRODUCTS = [
  { code: 'JM001', category: 'Juegos de Mesa', name: 'Catan', price: 29990, description: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.', img: 'img/catan.png', manufacturer: 'Kosmos', distributor: 'Devir Chile' },
  { code: 'JM002', category: 'Juegos de Mesa', name: 'Carcassonne', price: 24990, description: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.', img: 'img/carcassonne.png', manufacturer: 'Hans im Glück', distributor: 'Devir Chile' },
  { code: 'AC001', category: 'Accesorios', name: 'Controlador Inalámbrico Xbox Series X', price: 59990, description: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.', img: 'img/joystick.png', manufacturer: 'Microsoft', distributor: 'Microsoft Store' },
  { code: 'AC002', category: 'Accesorios', name: 'Auriculares Gamer HyperX Cloud II', price: 79990, description: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.', img: 'img/auriculares.png', manufacturer: 'HyperX', distributor: 'Kingston Technology' },
  { code: 'CO001', category: 'Consolas', name: 'PlayStation 5', price: 549990, description: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.', img: 'img/playstation.png', manufacturer: 'Sony', distributor: 'Sony Store' },
  { code: 'CG001', category: 'Computadores Gamers', name: 'PC Gamer ASUS ROG Strix', price: 1299990, description: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.', img: 'img/pcgamer.png', manufacturer: 'ASUS', distributor: 'ASUS Chile' },
  { code: 'SG001', category: 'Sillas Gamers', name: 'Silla Gamer Secretlab Titan', price: 349990, description: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.', img: 'img/silla.png', manufacturer: 'Secretlab', distributor: 'Secretlab Store' },
  { code: 'MS001', category: 'Mouse', name: 'Mouse Gamer Logitech G502 HERO', price: 49990, description: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.', img: 'img/mouse.png', manufacturer: 'Logitech', distributor: 'Logitech Chile' },
  { code: 'MP001', category: 'Mousepad', name: 'Mousepad Razer Goliathus Extended Chroma', price: 29990, description: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.', img: 'img/mousepad.png', manufacturer: 'Razer', distributor: 'Razer Store' },
  { code: 'PP001', category: 'Poleras Personalizadas', name: 'Polera Gamer Personalizada "Level‑Up"', price: 14990, description: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.', img: 'img/polera.png', manufacturer: 'Level-Up', distributor: 'Level-Up Store' },
  { code: 'ST001', category: 'Servicios', name: 'Servicio Técnico Especializado', price: 19990, description: 'Diagnóstico y reparación de consolas, PC y accesorios por técnicos certificados.', img: 'img/servicioTecnico.png', manufacturer: 'Level-Up', distributor: 'Level-Up Service' }
];

// ---------------------------------------------
// 2) ESTADO DEL CARRITO Y USUARIOS (LOCALSTORAGE)
// ---------------------------------------------
// El carrito y los usuarios se guardan en el navegador para que no se pierdan al recargar la página.
let CART = JSON.parse(localStorage.getItem('cart') || '[]'); // Carrito de compras
let USERS = JSON.parse(localStorage.getItem('users') || '[]'); // Usuarios registrados

// ---------------------------------------------
// 3) OBJETO PRINCIPAL DE LA APP: FUNCIONES DEL SITIO
// ---------------------------------------------
const App = {

  // ---------------------------------------------
  // Muestra las categorías en la página principal
  // ---------------------------------------------
  showCategories: function (containerId) {
    // Obtiene todas las categorías únicas de los productos
    const cats = [...new Set(PRODUCTS.map(p => p.category))];
    const cont = document.getElementById(containerId);

    // Por cada categoría, crea una tarjeta y la agrega al contenedor
    cats.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'col-6 col-md-3';
      div.innerHTML = `<div class='card-dark p-3 text-center'>${cat}</div>`;
      cont.appendChild(div);
    });
  },

  // ---------------------------------------------
  // Muestra el catálogo de productos en la tienda
  // ---------------------------------------------
  renderCatalog: function (containerId, products = PRODUCTS) {
    const cont = document.getElementById(containerId);
    cont.innerHTML = ''; // Limpia el contenido anterior

    // Por cada producto, crea una tarjeta con su información y botón de agregar
    products.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-lg-3';
      col.innerHTML = `
      <div class='card card-dark h-100'>
        <img src='${p.img}' class='card-img-top' alt='${p.name}'>
        <div class='card-body d-flex flex-column'>
          <h5>${p.name}</h5>
          <p class='small text-secondary'>${p.description}</p>
          <span class='fw-bold mt-auto'>$${p.price.toLocaleString('es-CL')}</span>
          <button class='btn btn-primary mt-2' onclick='App.addToCart("${p.code}")'>Agregar</button>
        </div>
      </div>`;
      cont.appendChild(col);
    });
  },

  // ---------------------------------------------
  // Agrega un producto al carrito
  // ---------------------------------------------
  addToCart: function (code) {
    // Busca el producto por su código
    const item = PRODUCTS.find(p => p.code === code);
    CART.push(item); // Lo agrega al carrito
    localStorage.setItem('cart', JSON.stringify(CART)); // Guarda el carrito
    alert(item.name + ' agregado al carrito'); // Muestra mensaje
  },

  // ---------------------------------------------
  // Muestra el contenido del carrito en la página
  // ---------------------------------------------
  renderCart: function () {
    const cont = document.getElementById('cartItems');
    cont.innerHTML = '';
    let total = 0;
    const userEmail = localStorage.getItem('user') || '';
    const hasDuocDiscount = userEmail.endsWith('@duocuc.cl');
    const user = USERS.find(u => u.email === userEmail);
    let redeemedDiscount = user && user.redeemedDiscount;

    // Si el carrito está vacío, muestra mensaje y total $0
    if (CART.length === 0) {
      cont.innerHTML = `<p class="text-center text-secondary">No hay productos en el carrito.</p>`;
      document.getElementById('cartTotal').textContent = '$0';
      return;
    }

    // Si hay productos, los muestra uno por uno
    CART.forEach((item, i) => {
      let price = item.price;
      if (hasDuocDiscount) price = Math.round(price * 0.8); // Aplica descuento Duoc
      total += price;
      cont.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>${item.name} - $${price.toLocaleString('es-CL')}${hasDuocDiscount ? ' <span class="badge bg-success">Descuento Duoc</span>' : ''}</span>
          <button class="btn btn-sm btn-danger" onclick='App.removeFromCart(${i})'>x</button>
        </div>`;
    });

    // Si el usuario canjeó puntos, aplica 10% de descuento extra
    if (redeemedDiscount) {
      total = Math.round(total * 0.9);
    }

    // Muestra el total final
    document.getElementById('cartTotal').textContent = '$' + total.toLocaleString('es-CL');
  },

  // ---------------------------------------------
  // Elimina un producto del carrito por su posición
  // ---------------------------------------------
  removeFromCart: function (i) {
    CART.splice(i, 1); // Elimina el producto
    localStorage.setItem('cart', JSON.stringify(CART)); // Guarda el cambio
    App.renderCart(); // Actualiza la vista
  },

  // ---------------------------------------------
  // Simula el pago y vacía el carrito
  // ---------------------------------------------
  checkout: function () {
    alert('Pago simulado. Gracias por tu compra!');
    CART = []; // Vacía el carrito
    localStorage.removeItem('cart'); // Elimina del navegador
    App.renderCart(); // Actualiza la vista
  },

  // ---------------------------------------------
  // REGISTRO DE USUARIO NUEVO
  // ---------------------------------------------
  register: function (e) {
    e.preventDefault(); // Evita que el formulario recargue la página
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    const age = parseInt(document.getElementById('regAge').value, 10);
    const referral = document.getElementById('regReferral').value.trim().toUpperCase();

    // Solo mayores de 18 años pueden registrarse
    if (age < 18) {
      alert('Debes ser mayor de 18 años para registrarte.');
      return;
    }
    // No permite correos repetidos
    if (USERS.find(u => u.email === email)) {
      alert('Este correo ya está registrado.');
      return;
    }

    // Si el usuario ingresa un código de referido válido, recibe puntos
    let levelUpPoints = 0;
    let referralDiscount = 0;
    if (referral) {
      const found = REFERRAL_CODES.find(r => r.code === referral);
      if (found) {
        levelUpPoints = found.discount;
        referralDiscount = found.discount;
      }
    }

    // Guarda el usuario en la lista
    USERS.push({ email, pass, age, levelUpPoints, referralDiscount });
    localStorage.setItem('users', JSON.stringify(USERS));
    alert('Registro exitoso. Ahora puedes iniciar sesión. Puntos LevelUp: ' + levelUpPoints);
    window.location.href = 'login.html'; // Redirige al login
  },

  // ---------------------------------------------
  // LOGIN DE USUARIO
  // ---------------------------------------------
  login: function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;

    // Busca el usuario en la lista
    const user = USERS.find(u => u.email === email && u.pass === pass);
    if (user) {
      localStorage.setItem('user', email);
      alert('Login exitoso!');
      window.location.href = 'index.html';
    } else if (email === 'test@duoc.cl' && pass === '1234') {
      // Usuario de prueba
      localStorage.setItem('user', email);
      alert('Login exitoso!');
      window.location.href = 'index.html';
    } else {
      alert('Credenciales inválidas');
    }
  },

  // ---------------------------------------------
  // Inicializa los filtros del catálogo
  // ---------------------------------------------
  initCatalogFilters: function () {
    // Obtiene categorías únicas
    const categories = [...new Set(PRODUCTS.map(p => p.category))];
    const catSelect = document.getElementById('filterCategory');
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      catSelect.appendChild(opt);
    });

    // Obtiene fabricantes únicos
    const manufacturers = [...new Set(PRODUCTS.map(p => p.manufacturer))];
    const manSelect = document.getElementById('filterManufacturer');
    manufacturers.forEach(man => {
      const opt = document.createElement('option');
      opt.value = man;
      opt.textContent = man;
      manSelect.appendChild(opt);
    });

    // Función para filtrar productos según selección
    function filterAndRender() {
      const cat = catSelect.value;
      const man = manSelect.value;
      let filtered = PRODUCTS;
      if (cat) filtered = filtered.filter(p => p.category === cat);
      if (man) filtered = filtered.filter(p => p.manufacturer === man);
      App.renderCatalog('productGrid', filtered);
    }

    // Cuando el usuario cambia los filtros, actualiza el catálogo
    catSelect.onchange = filterAndRender;
    manSelect.onchange = filterAndRender;

    // Muestra todos los productos al inicio
    App.renderCatalog('productGrid', PRODUCTS);
  },

  // ---------------------------------------------
  // Obtiene el nivel y puntos del usuario
  // ---------------------------------------------
  getUserLevel: function (email) {
    const user = USERS.find(u => u.email === email);
    if (!user) return { level: 0, points: 0 };
    // Cada 50 puntos sube de nivel
    const level = Math.floor(user.levelUpPoints / 50) + 1;
    return { level, points: user.levelUpPoints };
  },

  // ---------------------------------------------
  // Muestra el nivel y puntos del usuario actual
  // ---------------------------------------------
  showUserLevel: function () {
    const email = localStorage.getItem('user');
    if (!email) return;
    const { level, points } = App.getUserLevel(email);
    alert(`Tu nivel: ${level}\nPuntos LevelUp: ${points}`);
  },

  // ---------------------------------------------
  // Canjea puntos por descuento en el carrito
  // ---------------------------------------------
  redeemPointsForDiscount: function () {
    const email = localStorage.getItem('user');
    if (!email) return;
    const user = USERS.find(u => u.email === email);
    if (!user || user.levelUpPoints < 50) {
      alert('Necesitas al menos 50 puntos para canjear un descuento.');
      return;
    }
    // Canjea 50 puntos por 10% de descuento
    user.levelUpPoints -= 50;
    user.redeemedDiscount = true;
    localStorage.setItem('users', JSON.stringify(USERS));
    alert('¡Has canjeado 50 puntos por 10% de descuento en tu compra!');
    App.renderCart();
  }
};

// ---------------------------------------------
// 4) CÓDIGOS DE REFERIDO PARA REGISTRO
// ---------------------------------------------
// Si el usuario ingresa uno de estos códigos al registrarse, recibe puntos extra.
const REFERRAL_CODES = [
  { code: 'REF10', discount: 10 },
  { code: 'REF20', discount: 20 },
  { code: 'REF30', discount: 30 },
  { code: 'REF40', discount: 40 },
  { code: 'REF50', discount: 50 },
  { code: 'REF60', discount: 60 },
  { code: 'REF70', discount: 70 },
  { code: 'REF80', discount: 80 },
  { code: 'REF90', discount: 90 },
  { code: 'REF100', discount: 100 }
];

// ---------------------------------------------
// FIN DEL SCRIPT PRINCIPAL
// ---------------------------------------------