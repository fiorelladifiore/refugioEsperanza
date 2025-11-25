"use strict"

const btnFiltros = document.getElementById("btnFiltros");
const menuFiltros = document.getElementById("menuFiltros");
const icono = document.querySelector(".icono-filtros");

btnFiltros.addEventListener("click", () => {
    menuFiltros.classList.toggle("activo");
});





const checkboxes = document.querySelectorAll('.menu-filtros input[type="checkbox"]');
const contador = document.getElementById("contador-filtros");

function actualizarContador() {
    const seleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
    contador.textContent = seleccionados;
}

// Cada vez que se selecciona o des-selecciona un filtro:
checkboxes.forEach(cb => cb.addEventListener("change", actualizarContador));
