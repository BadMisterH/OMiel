document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const mainNav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".overlay");
  const closeMenu = document.querySelector(".close-menu");

  burgerMenu.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.style.overflow = mainNav.classList.contains("open") ? "hidden" : "";
  });

  overlay.addEventListener("click", () => {
    mainNav.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  closeMenu.addEventListener("click", () => {
    mainNav.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});
