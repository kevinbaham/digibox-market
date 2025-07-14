// MENU MOBILE BURGER
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});
function toggleMenu() {
  document.getElementById("mainMenu").classList.toggle("show");
}

// Gestion des sous-menus mobiles
document.querySelectorAll(".has-submenu > a").forEach(item => {
  item.addEventListener("click", function(e){
    if(window.innerWidth < 768){
      e.preventDefault();
      this.parentElement.classList.toggle("open");
    }
  });
});

// OUVERTURE SOUS-MENU MOBILE
const hasSubmenus = document.querySelectorAll(".has-submenu");

hasSubmenus.forEach(item => {
  item.addEventListener("click", (e) => {
    if(window.innerWidth < 768){
      e.preventDefault();
      item.classList.toggle("open");
    }
  });
});

// PANIER EXEMPLE
let cart = [];
function addToCart(product, price){
  cart.push({product, price});
  updateCart();
}
function updateCart(){
  let list = document.getElementById("cartItems");
  let total = document.getElementById("cartTotal");
  list.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.product} - ${item.price} FCFA`;
    list.appendChild(li);
    sum += parseInt(item.price);
  });
  total.innerText = sum;
}
function openCart(){
  document.getElementById("cartModal").style.display = "block";
}
function closeCart(){
  document.getElementById("cartModal").style.display = "none";
}
function payNow(){
  alert("Redirection vers le paiement...");
  window.location.href = "paiement.html";
}
document.addEventListener('DOMContentLoaded', () => {
  // Toggle le menu burger principal
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('show');
  });

  // Gérer l'ouverture des sous-menus au clic
  document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Toggle menu burger
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('show');
  });

  // Toggle sous-menu
  document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    });
  });
});
