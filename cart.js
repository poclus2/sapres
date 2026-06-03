import { updateCartCount } from './main.js';

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const cartTotalEl = document.getElementById('cart-total');
  if (!cartContainer) return;
  
  let cart = [];
  const cartStr = localStorage.getItem('sapres_cart');
  if (cartStr) {
    cart = JSON.parse(cartStr);
  }
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-cart"><p>Votre panier est vide.</p><a href="/shop.html" class="btn btn-primary" style="margin-top:1rem;">Retour à la boutique</a></div>';
    cartTotalEl.textContent = '0 FCFA';
    return;
  }
  
  let html = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-img">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="cart-price">${item.price.toLocaleString('fr-CM')} FCFA</p>
        </div>
        <div class="cart-actions">
          <div class="quantity-controls">
            <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
          </div>
          <button class="btn btn-outline remove-btn" data-id="${item.id}"><i data-lucide="trash-2" style="width:16px;"></i></button>
        </div>
      </div>
    `;
  });
  
  cartContainer.innerHTML = html;
  cartTotalEl.textContent = \`\${total.toLocaleString('fr-CM')} FCFA\`;
  
  if (window.lucide) {
    lucide.createIcons();
  }
  
  // Attach events
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      const action = e.currentTarget.getAttribute('data-action');
      updateQuantity(id, action);
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      removeItem(id);
    });
  });
}

function updateQuantity(id, action) {
  let cart = JSON.parse(localStorage.getItem('sapres_cart'));
  const item = cart.find(i => i.id === id);
  if (item) {
    if (action === 'plus') {
      item.quantity += 1;
    } else if (action === 'minus' && item.quantity > 1) {
      item.quantity -= 1;
    }
    localStorage.setItem('sapres_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem('sapres_cart'));
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('sapres_cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
