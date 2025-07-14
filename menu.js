function toggleMenu() {
  document.getElementById('menu-links').classList.toggle('show');
}
function toggleMenu() {
  const menu = document.getElementById('mainMenu');
  menu.classList.toggle('show');
}
document.querySelectorAll('.has-submenu > a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    this.parentElement.classList.toggle('open');
  });
});
