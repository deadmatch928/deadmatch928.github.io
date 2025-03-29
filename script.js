document.addEventListener("DOMContentLoaded", function () {
    const switchModo = document.getElementById("modoSwitch");
    const body = document.body;
    const calculadoraContainer = document.getElementById("calculadora-container");
    const botones = document.querySelectorAll(".calc-btn");

    // Modo oscuro
    if (switchModo) {
        if (localStorage.getItem("modo") === "oscuro") {
            body.classList.add("dark-mode");
            switchModo.checked = true;
        }

        switchModo.addEventListener("change", function () {
            body.classList.toggle("dark-mode", this.checked);
            localStorage.setItem("modo", this.checked ? "oscuro" : "claro");
        });
    }

    // Definición de ejercicios
    const ejercicios = {
        molaridad: generarFormulario("Cálculo de Molaridad", ["Moles de soluto", "Litros de solución"], "calcularMolaridad"),
        normalidad: generarFormulario("Cálculo de Normalidad", ["Equivalentes de soluto", "Litros de solución"], "calcularNormalidad"),
        molalidad: generarFormulario("Cálculo de Molalidad", ["Moles de soluto", "Kilogramos de solvente"], "calcularMolalidad"),
    };

    // Mensaje inicial
    calculadoraContainer.innerHTML = `
        <h2>Bienvenido a la Calculadora de Concentraciones</h2>
        <p>Seleccione alguna de las opciones del superior, cada una hace diferentes tipos de cálculos.</p>
    `;

    // Evento para cambiar dinámicamente el contenido
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const tipo = this.getAttribute("data-calculo");
            calculadoraContainer.innerHTML = ejercicios[tipo];
        });
    });
});

// Función para generar formularios dinámicamente
function generarFormulario(titulo, etiquetas, funcion) {
    return `
        <h2>${titulo}</h2>
        ${etiquetas.map((label, index) => `
            <label>${label}:</label>
            <input type="number" id="input${index}" placeholder="Ingrese ${label.toLowerCase()}">
        `).join('')}
        <button onclick="${funcion}()">Calcular</button>
        <p id="resultado"></p>
    `;
}

// Función genérica para cálculos
function calcularConcentracion(id1, id2, unidad) {
    let valor1 = parseFloat(document.getElementById(id1).value);
    let valor2 = parseFloat(document.getElementById(id2).value);

    if (!isNaN(valor1) && !isNaN(valor2) && valor2 > 0) {
        document.getElementById("resultado").innerText = `${unidad}: ${(valor1 / valor2).toFixed(2)}`;
    } else {
        document.getElementById("resultado").innerText = "Ingrese valores válidos.";
    }
}

// Funciones específicas usando la función genérica
function calcularMolaridad() {
    calcularConcentracion("input0", "input1", "Molaridad");
}

function calcularNormalidad() {
    calcularConcentracion("input0", "input1", "Normalidad");
}

function calcularMolalidad() {
    calcularConcentracion("input0", "input1", "Molalidad");
}
