document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = mainNav.querySelectorAll("a[href^='#']");

  // Menú hamburguesa
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      body.classList.toggle("nav-open");
      navToggle.classList.toggle("is-open");
    });
  }

  // Cerrar menú al hacer clic en un enlace (móvil)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        navToggle.classList.remove("is-open");
      }
    });
  });

  // Scroll suave con ajuste por header fijo
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const elementRect = targetElement.getBoundingClientRect();
      const offsetPosition = elementRect.top + window.pageYOffset - (headerHeight + 8);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  // Año dinámico en el footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
});
