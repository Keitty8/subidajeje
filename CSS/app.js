let imagenes = [
    {
        "url": "/imagen/modelopiso1.png",
        "nombre": "Imagen 1",
        "descripcion": "precio"
    },
    {
        "url": "/imagen/modelopiso2.png",
        "nombre": "Imagen 2",
        "descripcion": "Hola a todos este es el proyecto02 y fue desarrollado para un video de youtube. Si te gusta el contenido dale like y suscribete"
    },
    {
        "url": "/imagen/modelopiso3.png",
        "nombre": "Imagen 3",
        "descripcion": "Este proyecto, es el 03 y fue desarrollado para un video de youtube. Si te gusta el contenido dale like y suscribete"
    }
];

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('imagen');
let texto = document.getElementById('texto');
let puntos = document.getElementById('puntos');
let actual = 0;

function actualizarCarrusel() {
    imagen.src = imagenes[actual].url;
    texto.innerHTML = `
        <h3>${imagenes[actual].nombre}</h3>
        <p>${imagenes[actual].descripcion}</p>
    `;
    posicionCarrusel();
}

function posicionCarrusel() {
    puntos.innerHTML = "";
    for (let i = 0; i < imagenes.length; i++) {
        let punto = document.createElement('p');
        punto.textContent = '.';
        if (i === actual) {
            punto.classList.add('active');
        }
        puntos.appendChild(punto);
    }
}

atras.addEventListener('click', function () {
    actual = (actual - 1 + imagenes.length) > imagenes.length ? imagenes.length - 1 : (actual - 1 + imagenes.length) % imagenes.length;
    actualizarCarrusel();
});

adelante.addEventListener('click', function () {
    actual = (actual + 1) % imagenes.length;
    actualizarCarrusel();
});

// Inicializar el carrusel
actualizarCarrusel();
