// ==========================
// NAVBAR / MENÚ HAMBURGUESA
// ==========================

// Selección de elementos del DOM
let burger = document.querySelector(".burger");
let mainMenu = document.querySelector("#main-menu");
let newsletter = document.querySelector(".link-newsletter");

// Evento: click en el botón hamburguesa
burger.addEventListener("click", function () {
    // Alternamos clase visual del botón (para animación a X)
    burger.classList.toggle("is-open");

    // Abrimos/cerramos el contenedor del menú
    let isOpen = mainMenu.classList.contains("menu-open");
    if (isOpen) {
        mainMenu.classList.remove("menu-open");
        burger.setAttribute("aria-expanded", "false");
    } else {
        mainMenu.classList.add("menu-open");
        burger.setAttribute("aria-expanded", "true");
    }
});

// Cerrar menú al hacer click en un enlace (en móvil)
mainMenu.addEventListener("click", function (event) {
    let target = event.target;
    if (target.tagName.toLowerCase() === "a" && mainMenu.classList.contains("menu-open")) {
        mainMenu.classList.remove("menu-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
    }
});

// (Opcional) Pequeño gesto visual en Newsletter: rotar chevron con focus/blur
newsletter.addEventListener("focus", function(){ /* ya lo hace :hover en CSS, nada extra */ });
newsletter.addEventListener("blur", function(){ /* placeholder por si lo necesitas */ });
