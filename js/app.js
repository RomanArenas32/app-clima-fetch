const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const contenedor = document.querySelector(".contenedor");

window.addEventListener('load', () => {
    formulario.addEventListener('submit', solicitarClima);
});

function solicitarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad.trim() == "" || pais.trim() == "") {
        mostrarMensaje('Hubo un error. Ambos campos son obligatorios');
        return
    }
    consultarApiClima(ciudad, pais);
}

function mostrarMensaje(mensaje) {
    const mensajeAlerta = document.createElement('div');
    mensajeAlerta.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-8', 'py-8', 'rounded', 'relative', 'w-80', 'mx-auto', 'text-center');
    mensajeAlerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      </br>
      <span>${mensaje}</span>
    `;

    contenedor.appendChild(mensajeAlerta);

    setTimeout(() => {
        mensajeAlerta.remove();
    }, 2000);
}

function consultarApiClima(ciudad, pais) {

    const Api_Key = `286d15f487a41373f770d9a24be18974`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${Api_Key}`

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();
            if (datos.cod === "404") {
                mostrarMensaje('Ciudad no encontrada');
                return;
            }
            else {
                mostrarDatosDeLaApi(datos)
            }
        })
}

function mostrarDatosDeLaApi(datos) {
    console.log(datos)
    const { main: { humidity, temp, temp_max, temp_min } } = datos;
    tempActual = (temp - 273.15).toFixed(1); // Trunca a 1 decimal
    tempMaxima = (temp_max - 273.15).toFixed(1); // Trunca a 1 decimal
    tempMinima = (temp_min - 273.15).toFixed(1); // Trunca a 1 decimal

    const actual = document.createElement('p');
    actual.classList.add('text-lg', 'font-semibold', 'text-blue-500', 'mb-4');
    actual.innerHTML = `
        ACTUAL: ${tempActual} °
        <br>
        MIN: ${tempMinima}
        <br>
        MAX: ${tempMaxima}
        <br>
        HUMEDAD: ${humidity} %
    `;


    const resultadoDiv = document.createElement('div');
    resultadoDiv.appendChild(actual);
    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle')

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);
}