let carrito = [];
let restauranteActual = '';
let seccionAnterior = 'restaurantes'; // Para manejar la flecha de volver

// Función para mostrar la sección de platos de un restaurante
function verPlatos(restaurante) {
    restauranteActual = restaurante;
    seccionAnterior = 'restaurantes';
    document.querySelector('.restaurantes').style.display = 'none';
    document.querySelector('.platos').style.display = 'block';
    reiniciarCantidad();
}

// Función para volver a la sección de restaurantes
function volverARestaurantes() {
    // Ocultar todas las secciones excepto el carrusel de restaurantes
    document.querySelector('.platos').style.display = 'none';
    document.querySelector('.detalle-plato').style.display = 'none';
    document.querySelector('.carrito').style.display = 'none';
    document.querySelector('.carrusel-restaurantes').style.display = 'block';

    // Reiniciar la cantidad a 1
    reiniciarCantidad();
}

// Función para volver a la sección anterior
function volverAAnterior() {
    if (seccionAnterior === 'restaurantes') {
        volverARestaurantes();
    } else if (seccionAnterior === 'platos') {
        volverAPlatos();
    }
}

// Función para mostrar el detalle de un plato
function verDetalle(plato, precio, tiempoPromedio) {
    seccionAnterior = 'platos';
    document.querySelector('.platos').style.display = 'none';
    document.querySelector('.detalle-plato').style.display = 'block';
    document.getElementById('nombre-plato').innerText = plato;
    document.getElementById('descripcion-plato').innerText = `Descripción del ${plato}`;
    document.getElementById('precio-plato').innerText = `Precio: $${precio.toFixed(2)}`;
    document.getElementById('tiempo-promedio-plato').innerText = `Tiempo promedio: ${tiempoPromedio} min`;
    document.getElementById('detalle-plato').dataset.tiempoPromedio = tiempoPromedio;

    // Generar el nombre de la imagen en función del nombre del plato
    let imagenSrc = `img/${plato.toLowerCase().replace(/\s+/g, '-')}.jpg`;

    // Asignar la imagen al plato
    document.getElementById("imagen-plato").src = imagenSrc;
    document.getElementById("imagen-plato").alt = `Imagen de ${plato}`;

    reiniciarCantidad();
}

// Función para volver a la sección de platos
function volverAPlatos() {
    document.querySelector('.detalle-plato').style.display = 'none';
    document.querySelector('.carrito').style.display = 'none';
    document.querySelector('.platos').style.display = 'block';
    reiniciarCantidad();
}

// Función para reiniciar la cantidad a 1
function reiniciarCantidad() {
    document.getElementById('cantidad').value = 1;
}

// Función para agregar un plato al carrito
function agregarAlCarrito() {
    const plato = document.getElementById('nombre-plato').innerText;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precioTexto = document.getElementById('precio-plato').innerText;
    const precio = parseFloat(precioTexto.replace('Precio: $', ''));
    const tiempoPromedio = parseInt(document.getElementById('detalle-plato').dataset.tiempoPromedio);

    const item = {
        plato,
        cantidad,
        precio,
        tiempoPromedio,
        restaurante: restauranteActual
    };

    carrito.push(item);
    alert(`${cantidad} ${plato}(s) agregado(s) al carrito.`);
    volverAPlatos();
}

// Función para mostrar el carrito
function verCarrito() {
    document.querySelector('.platos').style.display = 'none';
    document.querySelector('.detalle-plato').style.display = 'none';
    document.querySelector('.carrito').style.display = 'block';

    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    let tiempoMaximo = 0;
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${item.cantidad} x ${item.plato} - $${(item.cantidad * item.precio).toFixed(2)} (${item.tiempoPromedio} min)`;
        
        // Botón para eliminar un elemento del carrito
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'Eliminar';
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(botonEliminar);

        listaCarrito.appendChild(li);

        // Calcular el tiempo máximo
        if (item.tiempoPromedio > tiempoMaximo) {
            tiempoMaximo = item.tiempoPromedio;
        }
    });

    // Calcular el tiempo estimado con la nueva fórmula
    const numeroProductos = carrito.length;
    let tiempoEstimado = tiempoMaximo + 5; // Tiempo máximo + 5 minutos
    if (numeroProductos > 1) {
        tiempoEstimado += (numeroProductos - 1) * 1; // +1 minuto por cada producto extra
    }

    // Mostrar el tiempo estimado de preparación
    document.getElementById('tiempo-promedio-total').innerText = `Tiempo estimado de preparación: ${tiempoEstimado} min`;
}

// Función para eliminar un elemento del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    verCarrito();
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    verCarrito();
}

function verPlatos(restaurante) {
    restauranteActual = restaurante;
    document.querySelector('.carrusel-restaurantes').style.display = 'none';
    document.querySelector('.platos').style.display = 'block';
}
// Función para confirmar la orden
async function hacerOrden() {
    const mesa = document.getElementById('mesa').value;
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Calcular el tiempo máximo de preparación
    const tiempoMaximo = carrito.reduce((max, item) => Math.max(max, item.tiempoPromedio), 0);

    // Calcular el tiempo estimado con la nueva fórmula
    const numeroProductos = carrito.length;
    let tiempoEstimado = tiempoMaximo + 5; // Tiempo máximo + 5 minutos
    if (numeroProductos > 1) {
        tiempoEstimado += (numeroProductos - 1) * 1; // +1 minuto por cada producto extra
    }

    const orden = {
        mesa: parseInt(mesa),
        items: carrito,
        estado: "Ordenado",
        tiempoEstimado: tiempoEstimado,
        tiempoRestante: tiempoEstimado,
        timestamp: new Date().toISOString()
    };

    // Enviar la orden al servidor
    try {
        const response = await fetch('http://localhost:3000/ordenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orden)
        });

        if (response.ok) {
            alert('Orden confirmada. Gracias por su compra.');
            carrito = [];
            volverARestaurantes();
        } else {
            alert('Error al enviar la orden.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar la orden.');
    }


}