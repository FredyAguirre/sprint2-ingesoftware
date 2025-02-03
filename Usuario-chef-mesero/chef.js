let ordenEditando = null;
let platoEditando = null;

// Función para abrir el modal de edición de tiempo de una orden
function abrirModalEditarTiempo(ordenId) {
    ordenEditando = ordenId;
    const modal = document.getElementById('editar-tiempo-modal');
    modal.style.display = 'flex';
}

// Función para abrir el modal de edición de tiempo promedio de un plato
function abrirModalEditarTiempoPromedio(plato) {
    platoEditando = plato;
    const modal = document.getElementById('editar-tiempo-promedio-modal');
    modal.style.display = 'flex';
}

// Función para cerrar cualquier modal
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Función para aumentar el tiempo de una orden específica
function aumentarTiempoOrden(minutos) {
    const inputTiempo = document.getElementById('tiempo-orden');
    inputTiempo.value = parseInt(inputTiempo.value) + minutos;
}

// Función para guardar el tiempo de una orden específica
async function guardarTiempoOrden() {
    const nuevoTiempo = parseInt(document.getElementById('tiempo-orden').value);
    if (ordenEditando && nuevoTiempo > 0) {
        await fetch(`http://localhost:3000/ordenes/${ordenEditando}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tiempoRestante: nuevoTiempo })
        });
        cerrarModal('editar-tiempo-modal');
        cargarOrdenes();
    }
}

// Función para guardar el tiempo promedio de un plato
async function guardarTiempoPromedioPlato() {
    const nuevoTiempo = parseInt(document.getElementById('tiempo-promedio-plato').value);
    if (platoEditando && nuevoTiempo > 0) {
        // Aquí debes implementar la lógica para guardar el tiempo promedio del plato en la base de datos
        console.log(`Tiempo promedio de ${platoEditando} actualizado a ${nuevoTiempo} minutos.`);
        cerrarModal('editar-tiempo-promedio-modal');
    }
}

// Función para cargar las órdenes
async function cargarOrdenes() {
    const response = await fetch('http://localhost:3000/ordenes');
    const ordenes = await response.json();
    const container = document.getElementById('ordenes-container');
    container.innerHTML = '';

    ordenes.forEach(orden => {
        const ordenDiv = document.createElement('div');
        ordenDiv.className = 'orden';
        ordenDiv.innerHTML = `
            <h3>Mesa ${orden.mesa}</h3>
            <ul>
                ${orden.items.map(item => `
                    <li>
                        ${item.cantidad}x ${item.plato}
                        <button class="editar-tiempo-promedio-btn" onclick="abrirModalEditarTiempoPromedio('${item.plato}')">Editar Tiempo Promedio</button>
                    </li>
                `).join('')}
            </ul>
            <p>Tiempo restante: <span class="tiempo" id="tiempo-${orden.id}">${orden.tiempoRestante}</span> min</p>
            <button onclick="cambiarEstado('${orden.id}', 'En Preparación')">En Preparación</button>
            <button onclick="abrirModalEditarTiempo('${orden.id}')">Editar Tiempo de la Orden</button>
            <button onclick="cambiarEstado('${orden.id}', 'Listo')">Listo</button>
        `;
        container.appendChild(ordenDiv);
    });

    // Iniciar temporizadores
    ordenes.forEach(orden => {
        if (orden.estado === 'En Preparación' && orden.tiempoRestante > 0) {
            iniciarTemporizador(orden.id, orden.tiempoRestante);
        }
    });
}

// Función para iniciar el temporizador
function iniciarTemporizador(ordenId, tiempoRestante) {
    const intervalo = setInterval(async () => {
        const tiempoElement = document.getElementById(`tiempo-${ordenId}`);
        if (tiempoRestante > 0) {
            tiempoRestante--;
            tiempoElement.innerText = tiempoRestante;

            // Actualizar el tiempo en la base de datos
            await fetch(`http://localhost:3000/ordenes/${ordenId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tiempoRestante })
            });
        } else {
            clearInterval(intervalo);
        }
    }, 60000); // Actualizar cada minuto
}

// Función para cambiar el estado de la orden
async function cambiarEstado(id, estado) {
    await fetch(`http://localhost:3000/ordenes/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado })
    });

    if (estado === 'Listo') {
        alert('Orden marcada como lista. El mesero ha sido notificado.');
    }

    // Recargar las órdenes en la pantalla del chef
    cargarOrdenes();
}

// Función para cargar las órdenes
async function cargarOrdenes() {
    const response = await fetch('http://localhost:3000/ordenes');
    const ordenes = await response.json();
    const container = document.getElementById('ordenes-container');
    container.innerHTML = '';

    // Filtrar solo las órdenes que no están en estado "Listo" o "Entregado"
    const ordenesPendientes = ordenes.filter(orden => orden.estado !== 'Listo' && orden.estado !== 'Entregado');

    ordenesPendientes.forEach(orden => {
        const ordenDiv = document.createElement('div');
        ordenDiv.className = 'orden';
        ordenDiv.innerHTML = `
            <h3>Mesa ${orden.mesa}</h3>
            <ul>
                ${orden.items.map(item => `<li>${item.cantidad}x ${item.plato}</li>`).join('')}
            </ul>
            <p>Tiempo restante: <span class="tiempo" id="tiempo-${orden.id}">${orden.tiempoRestante}</span> min</p>
            <button onclick="cambiarEstado('${orden.id}', 'En Preparación')">En Preparación</button>
            <button onclick="abrirModalEditarTiempo('${orden.id}')">Editar Tiempo</button>
            <button onclick="cambiarEstado('${orden.id}', 'Listo')">Listo</button>
        `;
        container.appendChild(ordenDiv);
    });

    // Iniciar temporizadores
    ordenesPendientes.forEach(orden => {
        if (orden.estado === 'En Preparación' && orden.tiempoRestante > 0) {
            iniciarTemporizador(orden.id, orden.tiempoRestante);
        }
    });
}

// Cargar órdenes cada 5 segundos
setInterval(cargarOrdenes, 5000);
cargarOrdenes();