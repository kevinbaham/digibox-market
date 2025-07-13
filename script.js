console.log("DigiBox Market en cours...");

document.addEventListener('DOMContentLoaded', () => {
  fetch("menu.html")
    .then(res => res.text())
    .then(html => document.getElementById("menu-container").innerHTML = html)
    .catch(err => console.error(err));
});
