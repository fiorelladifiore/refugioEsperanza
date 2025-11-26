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


//Manejo de editar

// Selección de componentes del panel
const panel = document.getElementById("panelEditar");
const cerrarPanel = document.getElementById("cerrarPanel");
const imgEditar = document.getElementById("imgEditar");
const inputNombre = document.getElementById("inputNombre");
const inputEdad = document.getElementById("inputEdad");

let tarjetaActual = null;

// Abrir panel desde icono EDITAR
document.querySelectorAll(".icono-accion[alt='editar']").forEach((icono) => {
    icono.addEventListener("click", () => {

        tarjetaActual = icono.closest(".elem-grilla");

        const img = tarjetaActual.querySelector("img").src;
        const nombre = tarjetaActual.querySelector("h3").textContent;
        const edad = tarjetaActual.querySelector(".adoptar-p").textContent.replace("Edad: ", "");

        imgEditar.src = img;
        inputNombre.value = nombre;
        inputEdad.value = edad;

        panel.classList.add("activo");
    });
});

// Cerrar panel
cerrarPanel.addEventListener("click", () => {
    panel.classList.remove("activo");
});

// Guardar cambios (solo cambia texto en pantalla por ahora)
document.getElementById("guardarCambios").addEventListener("click", () => {
    if (tarjetaActual) {
        tarjetaActual.querySelector("h3").textContent = inputNombre.value;
        tarjetaActual.querySelector(".adoptar-p").textContent = "Edad: " + inputEdad.value;
    }
    panel.classList.remove("activo");
});

const inputFoto = document.getElementById("inputFoto");

// Cuando el usuario selecciona una nueva foto dentro del panel
inputFoto.addEventListener("change", () => {
    const file = inputFoto.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const nuevaImagen = e.target.result;

        // Solo cambia la imagen del panel
        imgEditar.src = nuevaImagen;

        // No tocar la imagen del icono editar
        // No actualizar la imagen de la tarjeta (a menos que tú quieras)
    };

    reader.readAsDataURL(file);
});

