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

//Filtro aplicado

document.getElementById("btnBuscar").addEventListener("click", () => {

// Mostrar mensaje "Cambios guardados"
        const msgF = document.getElementById("mensajeFiltros");
        msgF.classList.add("activo");

        // Ocultar después de 2.5 segundos
        setTimeout(() => {
            msgF.classList.remove("activo");
        }, 2500);
});



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
const btnGuardar = document.getElementById("guardarCambios");

let tarjetaActual = null;

// Abrir panel desde icono EDITAR
document.querySelectorAll(".icono-accion[alt='editar']").forEach((icono) => {
    icono.addEventListener("click", () => {

        tarjetaActual = icono.closest(".elem-grilla");

        const nombre = tarjetaActual.querySelector("h3").textContent;
        const edad = tarjetaActual.querySelector(".adoptar-p").textContent.replace("Edad: ", "");

        inputNombre.value = nombre;
        inputEdad.value = edad;

        panel.classList.add("activo");
    });
});


if (panel && cerrarPanel && btnGuardar) {

    // Cerrar panel
    cerrarPanel.addEventListener("click", () => {
        panel.classList.remove("activo");
    });

    // Guardar cambios
    btnGuardar.addEventListener("click", () => {
        if (tarjetaActual) {
            tarjetaActual.querySelector("h3").textContent = inputNombre.value;
            tarjetaActual.querySelector(".adoptar-p").textContent =
                "Edad: " + inputEdad.value;
        }
        panel.classList.remove("activo");

        // Mostrar mensaje "Cambios guardados"
        const msg = document.getElementById("mensajeGuardado");
        msg.classList.add("activo");

        // Ocultar después de 2.5 segundos
        setTimeout(() => {
            msg.classList.remove("activo");
        }, 2500);
    });
}


const inputFoto = document.getElementById("inputFoto");

// Cuando el usuario selecciona una nueva foto dentro del panel

if (inputFoto) {
    inputFoto.addEventListener("change", () => {
        const file = inputFoto.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const nuevaImagen = e.target.result;

            // Solo cambia la imagen dentro del panel
            imgEditar.src = nuevaImagen;
        };

        reader.readAsDataURL(file);
    });
}





//Manejo de panel de edicion historias


// Abrir panel de edición
document.querySelectorAll(".icono-hist").forEach(icono => {
    icono.addEventListener("click", function () {

        // buscamos la imagen asociada
        const img = this.closest(".hist-img-cont").querySelector(".historias-img");

        // ponemos la imagen en el panel
        document.getElementById("editPreview").src = img.src;

        // mostramos el panel
        document.getElementById("editPanel").style.display = "flex";
    });
});



const cerrarEditPanel = document.getElementById("cerrarEditPanel");
const editPanel = document.getElementById("editPanel");
const editFileInput = document.getElementById("editFileInput");
const editPreview = document.getElementById("editPreview");

// Cerrar panel
if (cerrarEditPanel && editPanel) {
    cerrarEditPanel.addEventListener("click", () => {
        editPanel.style.display = "none";
    });
}

// Cuando el usuario elige una nueva imagen
if (editFileInput && editPreview) {
    editFileInput.addEventListener("change", function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                editPreview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}


//Limpiar Filtros

document.addEventListener("DOMContentLoaded", () => {

    const checkboxes = document.querySelectorAll(".check-real");
    const btnLimpiar = document.getElementById("btnLimpiarFiltros");

    // Función para actualizar visibilidad del botón
    function actualizarBotonLimpiar() {
        const algunoSeleccionado = Array.from(checkboxes).some(ch => ch.checked);

        btnLimpiar.style.display = algunoSeleccionado ? "block" : "none";
    }

    // Escuchar cambios en todos los checkboxes
    checkboxes.forEach(ch => {
        ch.addEventListener("change", actualizarBotonLimpiar);
    });

    // Acción limpiar filtros
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
        checkboxes.forEach(ch => {
            ch.checked = false;
        });

        actualizarBotonLimpiar(); // Ocultar botón
        actualizarContador(); 

    });
    }
    

});
