import { updateCartCount } from './main.js';

const products = [
  { id: 1, name: "Kit Solaire Domestique 500W", category: "Solaire", price: 150000, image: "https://images.unsplash.com/photo-1584277261846-c6a1672dd979?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Idéal pour l'éclairage et la TV." },
  { id: 2, name: "Batterie Solaire Gel 12V 100Ah", category: "Solaire", price: 85000, image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Batterie longue durée sans entretien." },
  { id: 3, name: "Kit Vidéosurveillance 4 Caméras HD", category: "Sécurité", price: 120000, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Système complet avec enregistreur." },
  { id: 4, name: "Pompe Immergée Solaire 24V", category: "Pompage", price: 95000, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Pour puits et forages profonds." },
  { id: 5, name: "Lampadaire Solaire Tout-en-un", category: "Solaire", price: 45000, image: "https://images.unsplash.com/photo-1621501103258-3e440b8a1c93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Éclairage public autonome avec détecteur." },
  { id: 6, name: "Système de Contrôle d'Accès Biométrique", category: "Sécurité", price: 75000, image: "https://images.unsplash.com/photo-1555864326-5bc22fa6f8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Accès sécurisé par empreinte digitale." },
  { id: 7, name: "Onduleur Solaire 3KVA Hybride", category: "Solaire", price: 185000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Onduleur hybride compatible réseau et batterie." },
  { id: 8, name: "Panneau Solaire Monocristallin 400W", category: "Solaire", price: 110000, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", description: "Rendement élevé, résistant aux conditions tropicales." }
];

function renderProducts() {
  const shopGrid = document.getElementById('shop-grid');
  if (!shopGrid) return;
  
  shopGrid.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <span class="product-category">${product.category}</span>
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${product.price.toLocaleString('fr-CM')} FCFA</span>
          <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
            <i data-lucide="shopping-cart" style="width: 16px;"></i> Ajouter
          </button>
        </div>
      </div>
    `;
    shopGrid.appendChild(card);
  });
  
  if (window.lucide) {
    lucide.createIcons();
  }
  
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      addToCart(id);
    });
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  let cart = [];
  const cartStr = localStorage.getItem('sapres_cart');
  if (cartStr) {
    cart = JSON.parse(cartStr);
  }
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('sapres_cart', JSON.stringify(cart));
  updateCartCount();
  
  // Show toast or alert
  alert(\`\${product.name} ajouté au panier !\`);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
