"use strict"

//Manejo de filtros
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




//Manejo de paginacion
const numBtns = document.querySelectorAll(".pag-btn.num");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function setActivePage(index) {
    numBtns.forEach(b => b.classList.remove("active"));
    numBtns[index].classList.add("active");
}

numBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        setActivePage(i);
    });
});

prevBtn.addEventListener("click", () => {
    let activeIndex = [...numBtns].findIndex(b => b.classList.contains("active"));
    if (activeIndex > 0) {
        setActivePage(activeIndex - 1);
    }
});

nextBtn.addEventListener("click", () => {
    let activeIndex = [...numBtns].findIndex(b => b.classList.contains("active"));
    if (activeIndex < numBtns.length - 1) {
        setActivePage(activeIndex + 1);
    }
});

