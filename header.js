function toggleMenu() {
    const nav = document.getElementById("myTopnav");
    nav.classList.toggle("responsive");
  
    const menuItems = ["DYR I NØD", "ADOPTION", "VI KÆMPER FOR", "BLIV MEDLEM", "BLIV FRIVILLIG"];
    for (let i = 0; i < menuItems.length; i++) {
      console.log("Menu punkt: " + menuItems[i]);
    }
  }
  
  // Dropdown-toggle på klik (ikke hover)
  document.addEventListener("DOMContentLoaded", () => {
    const dropdownLinks = document.querySelectorAll(".dropdown > a");
    dropdownLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        document.querySelectorAll(".dropdown").forEach(drop => {
          if (drop !== link.parentElement) {
            drop.classList.remove("open");
          }
        });
  
        const dropdown = link.parentElement;
        dropdown.classList.toggle("open");
      });
    });
  });
  