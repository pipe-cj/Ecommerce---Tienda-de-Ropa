// Smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.scrollBehavior = 'smooth';
  
  const headerTop = document.querySelector('.header-top');
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  // Hacer clicable el logo/brand del header y footer para ir al inicio
  const headerBrand = document.querySelector('.header-brand');
  const footerBrand = document.querySelector('.footer-brand');
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (headerBrand) {
    headerBrand.style.cursor = 'pointer';
    headerBrand.addEventListener('click', scrollToTop);
  }
  
  if (footerBrand) {
    footerBrand.style.cursor = 'pointer';
    footerBrand.addEventListener('click', scrollToTop);
  }
  let lastScrollTop = 0;
  
  // Detectar dirección del scroll
  window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // Scrolling DOWN - ocultar navbar
      headerTop.classList.add('hide-header');
    } else {
      // Scrolling UP - mostrar navbar
      headerTop.classList.remove('hide-header');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  
  // Menú toggle
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
      });
    });
  }
  
  // Intersection Observer para animaciones de scroll
  const sections = document.querySelectorAll('.category-section, .page-description, .features, .pricing, .contact-form');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });

  // ===== LÓGICA DEL CARRITO =====
  const cart = [];
  
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartClose = document.getElementById('cart-close');
  const cartItems = document.getElementById('cart-items');
  const addToCartButtons = document.querySelectorAll('.btn-plan[data-product-id]');
  const cartCount = document.getElementById('cart-count');
  
  // Cargar carrito desde localStorage
  function loadCart() {
    const savedCart = localStorage.getItem('ecommerce-cart');
    if (savedCart) {
      cart.length = 0;
      cart.push(...JSON.parse(savedCart));
      updateCartUI();
    }
  }
  
  // Guardar carrito en localStorage
  function saveCart() {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
  }
  
  // Actualizar la interfaz del carrito
  function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
      document.querySelector('.btn-checkout').disabled = true;
    } else {
      cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">$${item.price.toLocaleString('es-CL')}</p>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" onclick="decrementQuantity(${item.id})">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="incrementQuantity(${item.id})">+</button>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
          </div>
        `;
        cartItems.appendChild(itemElement);
      });
      document.querySelector('.btn-checkout').disabled = false;
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.total-amount').textContent = `$${total.toLocaleString('es-CL')}`;
    
    saveCart();
  }
  
  // Agregar producto al carrito
  function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
      });
    }
    
    updateCartUI();
    openCart();
    showCartNotification(`${productName} agregado al carrito`);
  }
  
  // Funciones globales para manejar cantidad
  window.incrementQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.quantity += 1;
      updateCartUI();
    }
  };
  
  window.decrementQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      updateCartUI();
    }
  };
  
  window.removeFromCart = function(productId) {
    const index = cart.findIndex(i => i.id === productId);
    if (index > -1) {
      const itemName = cart[index].name;
      cart.splice(index, 1);
      updateCartUI();
      showCartNotification(`${itemName} eliminado del carrito`);
    }
  };
  
  // Abrir carrito
  function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Cerrar carrito
  function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Mostrar notificación
  function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #000000;
      color: #ffffff;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 1001;
      font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      animation: slideInUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutDown 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Event listeners
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }
  
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  
  // Cerrar carrito al hacer click afuera
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      closeCart();
    }
  });
  
  // Agregar event listeners a los botones
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      const productName = this.getAttribute('data-product-name');
      const productPrice = parseInt(this.getAttribute('data-product-price'));
      
      addToCart(productId, productName, productPrice);
    });
  });
  
  // ===== LÓGICA DE CLICK EN IMÁGENES DE PRODUCTOS =====
  const productImageContainers = document.querySelectorAll('.product-image-container');
  productImageContainers.forEach(container => {
    container.addEventListener('click', function() {
      const productSlug = this.getAttribute('data-product-slug');
      if (productSlug) {
        // Redirigir a la página del producto
        window.location.href = `${productSlug}.html`;
      }
    });
  });
  
  // Botón de checkout
  const checkoutBtn = document.querySelector('.btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        alert('Gracias por tu compra. Total: $' + 
          cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('es-CL'));
        cart.length = 0;
        updateCartUI();
        closeCart();
      }
    });
  }
  
  // Cargar carrito al iniciar
  loadCart();
});