// Función para cargar las órdenes listas
async function cargarOrdenesListas() {
    const response = await fetch('http://localhost:3000/ordenes?estado=Listo');
    const ordenes = await response.json();
    const container = document.getElementById('ordenes-listasy');
    container.innerHTML = '';

    ordenes.forEach(orden => {
        const ordenDiv = document.createElement('div');
        ordenDiv.className = 'orden-lista';
        ordenDiv.innerHTML = `
            <h3>Mesa ${orden.mesa}</h3>
            <ul>
                ${orden.items.map(item => `<li>${item.cantidad}x ${item.plato}</li>`).join('')}
            </ul>
            <button onclick="marcarComoEntregada('${orden.id}')">Entregado</button>
        `;
        container.appendChild(ordenDiv);
    });
}

// Función para cargar las solicitudes de ayuda
async function cargarSolicitudesAyuda() {
    const response = await fetch('http://localhost:3001/solicitudes');
    const solicitudes = await response.json();
    const container = document.getElementById('solicitudes-ayuda');
    container.innerHTML = '';

    solicitudes.forEach(solicitud => {
        const solicitudDiv = document.createElement('div');
        solicitudDiv.className = 'solicitud';
        solicitudDiv.innerHTML = `
            <h3>Mesa ${solicitud.mesa}</h3>
            <p>${solicitud.mensaje}</p>
            <p>${new Date(solicitud.timestamp).toLocaleTimeString()}</p>
            <button onclick="marcarUrgenciaAtendida('${solicitud.id}')">Urgencia Atendida</button>
        `;
        container.appendChild(solicitudDiv);
    });
}

// Función para marcar una orden como entregada
async function marcarComoEntregada(ordenId) {
    await fetch(`http://localhost:3000/ordenes/${ordenId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'Entregado' })
    });
    cargarOrdenesListas(); // Recargar las órdenes listas
}

// Función para marcar una urgencia como atendida
async function marcarUrgenciaAtendida(solicitudId) {
    try {
        const response = await fetch(`http://localhost:3001/solicitudes/${solicitudId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Urgencia marcada como atendida.');
            cargarSolicitudesAyuda(); // Recargar las solicitudes
        } else {
            alert('Error al marcar la urgencia como atendida.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al marcar la urgencia como atendida.');
    }
}

// Cargar las órdenes listas y las solicitudes de ayuda cada 5 segundos
setInterval(() => {
    cargarOrdenesListas();
    cargarSolicitudesAyuda();
}, 5000);

// Cargar las órdenes y solicitudes al iniciar la página
cargarOrdenesListas();
cargarSolicitudesAyuda();