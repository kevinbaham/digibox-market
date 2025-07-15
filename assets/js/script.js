// ---------------------------
// MENU MOBILE
// ---------------------------
function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  menu.classList.toggle('show');
}

// GESTION DU SOUS-MENU SUR MOBILE
document.querySelectorAll('.has-submenu > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    }
  });
});

// ---------------------------
// PANIER
// ---------------------------
let panier = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, prix) {
  panier.push({ product, prix: Number(prix) });
  localStorage.setItem('cart', JSON.stringify(panier));
  updateCart();
  openCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalEl = document.getElementById('total-amount');

  if (!cartItems || !totalEl) return;

  cartItems.innerHTML = '';
  let total = 0;

  panier.forEach((item, index) => {
    total += item.prix;
    const li = document.createElement('li');
    li.innerHTML = `${item.product} - ${item.prix} FCFA 
      <button onclick="removeFromCart(${index})" style="
        margin-left:10px;background:#e11d48;color:#fff;
        border:none;padding:3px 8px;border-radius:4px;cursor:pointer;">×</button>`;
    cartItems.appendChild(li);
  });

  totalEl.innerText = `${total} FCFA`;
}

function removeFromCart(index) {
  panier.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(panier));
  updateCart();
}

function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
  updateCart();
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// ---------------------------
// PAIEMENT AVEC CINETPAY
// ---------------------------
function payNow() {
  if (panier.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const total = panier.reduce((somme, item) => somme + item.prix, 0);

  // Initialiser CinetPay
  CinetPay.setConfig({
    apikey: '19028667686ed56d2e3fc6.96881271',
    site_id: '105901553',
    notify_url: 'https://digibox-market.netlify.app/#',
    return_url: 'https://digibox-market.netlify.app/success.html',
    mode: 'PRODUCTION'
  });

  // Générer un ID unique de transaction
  const transactionId = Math.floor(Math.random() * 100000000).toString();

  CinetPay.getCheckout({
    transaction_id: transactionId,
    amount: total,
    currency: 'XOF',
    channels: 'ALL',
    description: 'Paiement DigiBox Market',
    customer_name: "Client",
    customer_surname: "",
    customer_email: "client@example.com",
    customer_phone_number: "+22899999999",
    customer_address: "Adresse",
    customer_city: "Lomé",
    customer_country: "TG",
    customer_state: "TG",
    customer_zip_code: "0000"
  });

  CinetPay.waitResponse(function(data) {
    if (data.status === "REFUSED") {
      alert("⛔ Paiement refusé. Veuillez réessayer.");
    } else if (data.status === "ACCEPTED") {
      alert("✅ Paiement validé !");
      localStorage.setItem("digibox_paid", true);
      panier = [];
      localStorage.removeItem("cart");
      updateCart();
      window.location.href = "telechargement.html";
    }
  });

  CinetPay.onError(function(data) {
    console.error("Erreur CinetPay:", data);
    alert("Erreur pendant le paiement. Réessayez.");
  });
}

// ---------------------------
// INIT ON LOAD
// ---------------------------
document.addEventListener('DOMContentLoaded', updateCart);
// Gestion du panier
let cart = [];

// Ouvrir/fermer le panier
function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
  updateCartDisplay();
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// Ajouter au panier
function addToCart(productName, price) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
  showCartNotification();
}

// Mettre à jour l'affichage du panier
function updateCartDisplay() {
  const cartItemsElement = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  const totalItemsElement = document.getElementById('totalItems');
  
  // Vider le panier visuel
  cartItemsElement.innerHTML = '';
  
  let total = 0;
  let itemCount = 0;
  
  // Remplir avec les articles actuels
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;
    
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">${item.price} FCFA x ${item.quantity}</span>
      </div>
      <div class="cart-item-actions">
        <button onclick="changeQuantity('${item.name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity('${item.name}', 1)">+</button>
        <button class="remove-btn" onclick="removeItem('${item.name}')">×</button>
      </div>
      <div class="cart-item-total">${itemTotal} FCFA</div>
    `;
    
    cartItemsElement.appendChild(itemElement);
  });
  
  // Mettre à jour les totaux
  totalAmountElement.textContent = `${total} FCFA`;
  totalItemsElement.textContent = itemCount;
  
  // Activer/désactiver le bouton de paiement
  document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

// Modifier la quantité d'un article
function changeQuantity(productName, change) {
  const item = cart.find(item => item.name === productName);
  if (item) {
    item.quantity += change;
    
    // Supprimer si quantité <= 0
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.name !== productName);
    }
    
    updateCartDisplay();
  }
}

// Supprimer un article
function removeItem(productName) {
  cart = cart.filter(item => item.name !== productName);
  updateCartDisplay();
}

// Notification d'ajout au panier
function showCartNotification() {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = 'Produit ajouté au panier !';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 2000);
}

// Paiement
function payNow() {
  if (cart.length === 0) return;
  
  // Ici vous intégrerez votre solution de paiement (CinetPay, etc.)
  alert(`Paiement en cours pour ${document.getElementById('totalAmount').textContent}`);
  
  // Après paiement réussi :
  cart = [];
  updateCartDisplay();
  closeCart();
}

// Fermer le panier en cliquant à l'extérieur
window.onclick = function(event) {
  if (event.target === document.getElementById('cartModal')) {
    closeCart();
  }
};