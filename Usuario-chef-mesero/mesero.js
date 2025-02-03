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

// Cargar las órdenes listas cada 5 segundos
setInterval(cargarOrdenesListas, 5000);
cargarOrdenesListas();