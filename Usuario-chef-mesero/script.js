let carrito = [];
let restauranteActual = '';
let seccionAnterior = 'restaurantes'; // Para manejar la flecha de volver
let calificacionActual = 0;

// Función para mostrar la sección de platos de un restaurante
function verPlatos(restaurante) {
    restauranteActual = restaurante;
    seccionAnterior = 'restaurantes';
    document.querySelector('.carrusel-restaurantes').style.display = 'none';
    document.querySelector('.platos').style.display = 'block';
    reiniciarCantidad();
}

// Función para volver a la sección de restaurantes
function volverARestaurantes() {
    // Ocultar todas las secciones excepto el carrusel de restaurantes
    document.querySelector('.platos').style.display = 'none';
    document.querySelector('.detalle-plato').style.display = 'none';
    document.querySelector('.carrito').style.display = 'none';
    document.querySelector('.metodos-pago').style.display = 'none';
    document.querySelector('.formulario-pago').style.display = 'none';
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

    // Cargar las reseñas del plato
    cargarReseñas();
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

// Función para mostrar los métodos de pago
function mostrarMetodosPago() {
    const mesa = document.getElementById('mesa').value;
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Ocultar la sección del carrito y mostrar la sección de métodos de pago
    document.querySelector('.carrito').style.display = 'none';
    document.querySelector('.metodos-pago').style.display = 'block';
}

// Función para mostrar el formulario de pago según el método seleccionado
function mostrarFormularioPago(metodo) {
    document.querySelector('.metodos-pago').style.display = 'none';
    document.querySelector('.formulario-pago').style.display = 'block';
    document.getElementById('titulo-formulario-pago').innerText = `Pagar con ${metodo.charAt(0).toUpperCase() + metodo.slice(1)}`;
}

// Función para volver a la sección de métodos de pago
function volverAMetodosPago() {
    document.querySelector('.formulario-pago').style.display = 'none';
    document.querySelector('.metodos-pago').style.display = 'block';
}

// Función para volver a la sección del carrito
function volverACarrito() {
    document.querySelector('.metodos-pago').style.display = 'none';
    document.querySelector('.carrito').style.display = 'block';
}

// Función para pagar en caja
function pagarEnCaja() {
    confirmarOrden();
}

// Función para confirmar el pago
function confirmarPago() {
    const confirmacion = confirm('¿Estás seguro de que deseas confirmar el pago?');
    if (confirmacion) {
        confirmarOrden();
    }
}

// Función para confirmar la orden y enviarla al servidor
async function confirmarOrden() {
    const mesa = document.getElementById('mesa').value;
    const informacionExtra = document.getElementById('informacion-extra').value;

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
        informacionExtra: informacionExtra, // Agregar la información adicional
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
            document.getElementById('informacion-extra').value = ''; // Limpiar el campo de información adicional
            volverARestaurantes();
        } else {
            alert('Error al enviar la orden.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar la orden.');
    }
}

// Función para calificar con estrellas
function calificar(puntaje) {
    calificacionActual = puntaje;
    const estrellas = document.querySelectorAll('.calificacion span');
    estrellas.forEach((estrella, index) => {
        if (index < puntaje) {
            estrella.classList.add('seleccionada');
        } else {
            estrella.classList.remove('seleccionada');
        }
    });
}

// Función para enviar una reseña
async function enviarReseña() {
    const plato = document.getElementById('nombre-plato').innerText;
    const comentario = document.getElementById('comentario-reseña').value;

    if (calificacionActual === 0) {
        alert('Por favor, selecciona una calificación.');
        return;
    }

    if (comentario.trim() === '') {
        alert('Por favor, escribe un comentario.');
        return;
    }

    const reseña = {
        plato,
        calificacion: calificacionActual,
        comentario,
        fecha: new Date().toISOString()
    };

    // Enviar la reseña al servidor
    try {
        const response = await fetch('http://localhost:3001/reseñas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reseña)
        });

        if (response.ok) {
            alert('Reseña enviada con éxito.');
            cargarReseñas();
            document.getElementById('comentario-reseña').value = ''; // Limpiar el campo de comentario
            calificacionActual = 0;
            document.querySelectorAll('.calificacion span').forEach(estrella => {
                estrella.classList.remove('seleccionada');
            });
        } else {
            alert('Error al enviar la reseña.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar la reseña.');
    }
}

// Función para cargar las reseñas existentes
async function cargarReseñas() {
    const plato = document.getElementById('nombre-plato').innerText;
    const response = await fetch(`http://localhost:3001/reseñas?plato=${plato}`);
    const reseñas = await response.json();
    const listaReseñas = document.getElementById('lista-reseñas');
    listaReseñas.innerHTML = '';

    reseñas.forEach(reseña => {
        const divReseña = document.createElement('div');
        divReseña.className = 'reseña';
        divReseña.innerHTML = `
            <div class="calificacion">
                ${'★'.repeat(reseña.calificacion)}${'☆'.repeat(5 - reseña.calificacion)}
            </div>
            <div class="comentario">${reseña.comentario}</div>
            <div class="fecha">${new Date(reseña.fecha).toLocaleDateString()}</div>
        `;
        listaReseñas.appendChild(divReseña);
    });
}

// Función para llamar al mesero
async function llamarAlMesero() {
    const mesa = document.getElementById('mesa').value;
    if (!mesa) {
        alert('Por favor, ingresa el número de mesa.');
        return;
    }

    const solicitud = {
        mesa: parseInt(mesa),
        mensaje: `Solicitud de ayuda en mesa ${mesa}`,
        timestamp: new Date().toISOString()
    };

    // Enviar la solicitud al servidor
    try {
        const response = await fetch('http://localhost:3001/solicitudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });

        if (response.ok) {
            alert('El mesero ha sido notificado. ¡Pronto estará contigo!');
        } else {
            alert('Error al enviar la solicitud.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar la solicitud.');
    }
}