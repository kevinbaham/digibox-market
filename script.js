// === AUTO-SAVE & LOADING ===
function saveField(id) {
  const el = document.getElementById(id);
  if (el) localStorage.setItem('cv_' + id, el.value);
}
function loadFields() {
  ['prenom','nom','email','telephone','objectif','experience','diplomes','langues','reseaux'].forEach(id=>{
    const el = document.getElementById(id);
    if (el && localStorage.getItem('cv_' + id)) {
      el.value = localStorage.getItem('cv_' + id);
    }
  });
  if (document.getElementById('colorTheme')) {
    document.getElementById('colorTheme').value = localStorage.getItem('cv_theme') || '#2563eb';
  }
}
document.addEventListener('DOMContentLoaded', loadFields);

// === PREVIEW CV ===
function previewCV() {
  const cv = document.getElementById('cv-preview');
  const prenom = document.getElementById('prenom').value;
  const nom = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const tel = document.getElementById('telephone').value;
  const objectif = document.getElementById('objectif').value;
  const exp = document.getElementById('experience').value;
  const dipl = document.getElementById('diplomes').value;
  const comp = (document.getElementById('competences').value || '').split(',');
  const langues = document.getElementById('langues').value;
  const reseaux = document.getElementById('reseaux').value;
  const theme = document.getElementById('colorTheme').value;

  localStorage.setItem('cv_theme', theme);

  cv.innerHTML = `
    <h2 style="border-bottom:3px solid ${theme}; padding-bottom:6px;">${prenom} ${nom}</h2>
    <p><strong>Email:</strong> ${email} | <strong>Tél:</strong> ${tel}</p>
    <h3>Objectif</h3><p>${objectif}</p>
    <h3>Expériences</h3><p>${exp}</p>
    <h3>Diplômes</h3><p>${dipl}</p>
    <h3>Compétences</h3><ul>${comp.map(c=>`<li>${c.trim()}</li>`).join('')}</ul>
    <h3>Langues</h3><p>${langues}</p>
    <h3>Réseaux</h3><p>${reseaux}</p>
  `;
  cv.style.border = `3px solid ${theme}`;
  drawSkillsChart();
}

// === THEME DYNAMIQUE ===
function updateTheme() {
  localStorage.setItem('cv_theme', document.getElementById('colorTheme').value);
  previewCV();
}

// === IA OBJECTIF SIMULÉ ===
function generateAIObjective() {
  const objectif = "Développeur passionné, orienté résultats, prêt à relever les défis techniques.";
  document.getElementById('objectif').value = objectif;
  saveField('objectif');
  previewCV();
}

// === CHART DE COMPÉTENCES SIMULÉ ===
function drawSkillsChart() {
  const chart = document.getElementById('skillsChart');
  if (!chart) return;
  chart.innerHTML = `
    <svg width="100%" height="150">
      <rect x="10" y="100" width="30" height="40" fill="#2563eb"></rect>
      <rect x="50" y="80" width="30" height="60" fill="#16a34a"></rect>
      <rect x="90" y="60" width="30" height="80" fill="#e11d48"></rect>
      <rect x="130" y="90" width="30" height="50" fill="#7e22ce"></rect>
    </svg>`;
}

// === EXPORT JSON ===
function exportJSON() {
  const data = {
    prenom: document.getElementById('prenom').value,
    nom: document.getElementById('nom').value,
    email: document.getElementById('email').value,
    telephone: document.getElementById('telephone').value,
    objectif: document.getElementById('objectif').value,
    experience: document.getElementById('experience').value,
    diplomes: document.getElementById('diplomes').value,
    competences: (document.getElementById('competences').value || '').split(','),
    langues: document.getElementById('langues').value,
    reseaux: document.getElementById('reseaux').value,
    theme: document.getElementById('colorTheme').value
  };
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "CV.json";
  a.click();
}

// === MULTI-STEPS ===
let currentStep = 0;
function showStep(step) {
  document.querySelectorAll('.step').forEach((el, i) => {
    el.style.display = (i === step) ? 'block' : 'none';
  });
}
function nextStep() { if(currentStep < 3) showStep(++currentStep); }
function prevStep() { if(currentStep > 0) showStep(--currentStep); }

document.addEventListener('DOMContentLoaded', () => showStep(0));

// === PANIER / PAIEMENT ===
let panier = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, prix) {
  panier.push({ product, prix: Number(prix) });
  localStorage.setItem('cart', JSON.stringify(panier));
  updateCart();
  openCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  if (!cartItems) return;
  cartItems.innerHTML = '';
  panier.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.product} - ${item.prix} FCFA 
    <button onclick="removeFromCart(${index})" style="margin-left:10px;background:#e11d48;color:#fff;border:none;padding:3px 8px;border-radius:4px;cursor:pointer;">×</button>`;
    cartItems.appendChild(li);
  });
  calculerMontantTotal();
}

function removeFromCart(index) {
  panier.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(panier));
  updateCart();
}

function calculerMontantTotal() {
  let total = panier.reduce((somme, item) => somme + item.prix, 0);
  const totalEl = document.getElementById('total-amount');
  if (totalEl) totalEl.innerText = `${total} FCFA`;
  return total;
}

function payNow() {
  if (panier.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  localStorage.setItem("digibox_paid", true);
  panier = [];
  localStorage.removeItem("cart");
  updateCart();
  alert("✅ Paiement simulé réussi !");
  window.location.href = "telechargement.html";
}

function openCart() {
  document.getElementById('cartModal').style.display = 'block';
  updateCart();
}
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', updateCart);

// === MENU MOBILE & SOUS-MENU
function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  menu.classList.toggle('show');
}
document.querySelectorAll('.has-submenu > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});
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