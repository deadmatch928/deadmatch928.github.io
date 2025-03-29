//modo oscuro
document.addEventListener("DOMContentLoaded", function () {
    const switchModo = document.getElementById("modoSwitch");
    const body = document.body;

    // Verifica si el usuario ya tenía activado el modo oscuro
    if (localStorage.getItem("modo") === "oscuro") {
        body.classList.add("dark-mode");
        switchModo.checked = true;
    }

    switchModo.addEventListener("change", function () {
        if (this.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("modo", "oscuro");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("modo", "claro");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const calculadoraContainer = document.getElementById("calculadora-container");
    const botones = document.querySelectorAll(".calc-btn");

    calculadoraContainer.innerHTML = `
        <h2>Bienvenido a la Calculadora de Concentraciones</h2>
        <p>Seleccione alguna de las opciones del superior, cada una hace diferentes tipos de calculos.</p>
    `

    const ejercicios = {
        molaridad: `
            <h2>Cálculo de Molaridad</h2>
            <label>Moles de soluto:</label>
            <input type="number" id="moles" placeholder="Ingrese moles">
            <label>Litros de solución:</label>
            <input type="number" id="litros" placeholder="Ingrese litros">
            <button onclick="calcularMolaridad()">Calcular</button>
            <p id="resultado"></p>
        `,
        normalidad: `
            <h2>Cálculo de Normalidad</h2>
            <label>Equivalentes de soluto:</label>
            <input type="number" id="equivalentes" placeholder="Ingrese equivalentes">
            <label>Litros de solución:</label>
            <input type="number" id="litrosNormalidad" placeholder="Ingrese litros">
            <button onclick="calcularNormalidad()">Calcular</button>
            <p id="resultado"></p>
        `,
        molalidad: `
            <h2>Cálculo de Molalidad</h2>
            <label>Moles de soluto:</label>
            <input type="number" id="molesMolalidad" placeholder="Ingrese moles">
            <label>Kilogramos de solvente:</label>
            <input type="number" id="kgSolvente" placeholder="Ingrese kg">
            <button onclick="calcularMolalidad()">Calcular</button>
            <p id="resultado"></p>
        `
    };

    // Evento para cambiar el contenido dinámicamente
    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const tipo = this.getAttribute("data-calculo");
            calculadoraContainer.innerHTML = ejercicios[tipo];
        });
    });
});

// Funciones de cálculo
function calcularMolaridad() {
    let moles = parseFloat(document.getElementById("moles").value);
    let litros = parseFloat(document.getElementById("litros").value);
    if (!isNaN(moles) && !isNaN(litros) && litros > 0) {
        document.getElementById("resultado").innerText = `Molaridad: ${(moles / litros).toFixed(2)} M`;
    } else {
        document.getElementById("resultado").innerText = "Ingrese valores válidos.";
    }
}

function calcularNormalidad() {
    let equivalentes = parseFloat(document.getElementById("equivalentes").value);
    let litros = parseFloat(document.getElementById("litrosNormalidad").value);
    if (!isNaN(equivalentes) && !isNaN(litros) && litros > 0) {
        document.getElementById("resultado").innerText = `Normalidad: ${(equivalentes / litros).toFixed(2)} N`;
    } else {
        document.getElementById("resultado").innerText = "Ingrese valores válidos.";
    }
}

function calcularMolalidad() {
    let moles = parseFloat(document.getElementById("molesMolalidad").value);
    let kg = parseFloat(document.getElementById("kgSolvente").value);
    if (!isNaN(moles) && !isNaN(kg) && kg > 0) {
        document.getElementById("resultado").innerText = `Molalidad: ${(moles / kg).toFixed(2)} m`;
    } else {
        document.getElementById("resultado").innerText = "Ingrese valores válidos.";
    }
}
