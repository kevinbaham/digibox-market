// script.js

// Crée un loader en overlay lors de la validation de paiement
function validerPaiement() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(255,255,255,0.8)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 1000;
  overlay.innerHTML = `<div class="loader"></div>`;
  document.body.appendChild(overlay);

  // Simule la validation du paiement après 2 secondes
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const produit = urlParams.get('produit') || "Produit";
    const prix = urlParams.get('prix') || "Prix";

    const token = btoa(produit + ":" + prix);
    window.location.href = "telechargement.html?token=" + encodeURIComponent(token);
  }, 2000);
}

// Ajout du style pour le loader
const style = document.createElement('style');
style.textContent = `
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #2563eb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);

// Vérifie si le paiement est validé avant téléchargement/export
function checkPayment(){
  if(!localStorage.getItem("digibox_paid")){
    alert("Merci d'effectuer le paiement avant de télécharger ou exporter le PDF.");
    window.location.href = "paiement.html";
    return false;
  }
  return true;
}

// Panier interactif
let cart = [];

function openCart(){
  updateCart();
  document.getElementById('cartModal').style.display = 'flex';
}

function closeCart(){
  document.getElementById('cartModal').style.display = 'none';
}

function addToCart(name, price){
  cart.push({name, price});
  alert(`${name} ajouté au panier !`);
}

function updateCart(){
  let cartList = document.getElementById('cartItems');
  let total = 0;
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    let li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} FCFA 
      <button onclick="removeFromCart(${index})" style="
      background:#e11d48; color:white; border:none; 
      margin-left:10px; padding:2px 8px; border-radius:4px;
      cursor:pointer;">✖</button>`;
    cartList.appendChild(li);
    total += item.price;
  });
  document.getElementById('cartTotal').innerText = total;
}

function removeFromCart(index){
  cart.splice(index, 1);
  updateCart();
}

function payNow(){
  if(cart.length == 0){
    alert("Votre panier est vide !");
    return;
  }
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  if(confirm(`Confirmer le paiement de ${total} FCFA ?`)){
    localStorage.setItem("digibox_paid", true);
    alert("Paiement validé ! Vous pouvez maintenant télécharger vos produits.");
    cart = [];
    updateCart();
    closeCart();
  }
}
