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

  // --------- ENVÍO DEL FORMULARIO POR MAILTO (SIN 404) ----------
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita recargar la página o hacer POST que termina en 404

      const nombre = document.getElementById("nombre")?.value.trim() || "";
      const correo = document.getElementById("correo")?.value.trim() || "";
      const tipoConsulta = document.getElementById("tipo-consulta")?.value || "";
      const mensaje = document.getElementById("mensaje")?.value.trim() || "";

      // Construimos el cuerpo del correo
      const subject = "Nueva consulta desde la web - Alcira Trigueros";
      const bodyLines = [
        "Has recibido una nueva consulta desde el formulario de la página web:",
        "",
        `Nombre: ${nombre}`,
        `Correo: ${correo}`,
        `Tipo de consulta: ${tipoConsulta}`,
        "",
        "Mensaje:",
        mensaje,
        "",
        "—",
        "Este mensaje fue generado desde el formulario de contacto del sitio web.",
      ];

      const body = encodeURIComponent(bodyLines.join("\n"));

      const mailtoLink =
        "mailto:abogada@alciratrigueroslegalinmobila.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;

      // Abrimos el cliente de correo del usuario
      window.location.href = mailtoLink;

      // Opcional: limpiar el formulario después de generar el mailto
      contactForm.reset();
    });
  }
});
