// main.js - Global logic

// Update cart count on all pages
export function updateCartCount() {
  const cartStr = localStorage.getItem('sapres_cart');
  let count = 0;
  if (cartStr) {
    const cart = JSON.parse(cartStr);
    count = cart.reduce((acc, item) => acc + item.quantity, 0);
  }
  const countEls = document.querySelectorAll('.cart-count');
  countEls.forEach(el => {
    el.textContent = count;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
