function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-links");
  
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Gestion sous-menus
  const subMenuToggles = document.querySelectorAll(".has-submenu");
  subMenuToggles.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.classList.toggle("open");
      const subMenu = item.querySelector("ul");
      if (subMenu) {
        subMenu.style.maxHeight = subMenu.style.maxHeight ? null : subMenu.scrollHeight + "px";
      }
    });
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener("click", function(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("show");
      subMenuToggles.forEach(item => {
        item.classList.remove("open");
        const subMenu = item.querySelector("ul");
        if (subMenu) subMenu.style.maxHeight = null;
      });
    }
  });
}
