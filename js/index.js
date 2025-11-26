"use strict"

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {

    const btnAdoptar = document.getElementById("btnAdoptar");
    const btnAyudar = document.getElementById("btnAyudar");

    // Redirección al hacer clic
    btnAdoptar.addEventListener("click", () => {
        window.location.href = "adoptar.html";
    });

    btnAyudar.addEventListener("click", () => {
        window.location.href = "ayudar.html";
    });
});
