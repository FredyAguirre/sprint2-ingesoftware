<?php include "db.php"; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reportes Financieros</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
        }
        .container-fluid {
            display: flex;
            flex: 1;
        }
        .sidebar {
            width: 250px;
            background-color: #f8f9fa;
            height: 100vh;
            padding-top: 20px;
            position: fixed;
        }
        .sidebar a {
            padding: 10px 20px;
            text-decoration: none;
            color: #000;
            display: block;
            font-size: 18px;
        }
        .sidebar a:hover {
            background-color: #007bff;
            color: white;
        }
        .content {
            margin-left: 250px;
            padding: 20px;
            flex: 1;
        }
        .navbar-custom {
            background-color: #343a40;
        }
        .navbar-custom .navbar-brand,
        .navbar-custom .navbar-text {
            color: white;
        }
        @media (max-width: 768px) {
            .sidebar {
                width: 100%;
                position: relative;
            }
            .content {
                margin-left: 0;
            }
        }
        .table-container {
            margin-top: 20px;
        }
        .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    </style>
    <style>
        #financialChart {
            max-width: 100%;
            height: 300px !important;
        }  
</style>
</head>
<body class="bg-light">
<nav class="navbar navbar-expand-lg navbar-custom">
    <a class="navbar-brand" href="#">Panel de Administración</a>
</nav>
<div class="container-fluid">
    <div class="sidebar">
        <a href="../index.php">Administrar Platos</a>
        <a href="../admin_usuarios.php">Administrar Usuarios</a>
        <a href="../reportes_financieros/Financiera.php">Reportes</a>
    </div>
</div>
<div class="container mt-5">
    <h2 class="text-center mb-4">Reportes Financieros</h2>
    <div class="card mb-4">
        <div class="card-header">Filtrar Transacciones</div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <label for="fechaInicio">Fecha Inicio:</label>
                    <input type="date" id="fechaInicio" class="form-control">
                </div>
                <div class="col-md-3">
                    <label for="fechaFin">Fecha Fin:</label>
                    <input type="date" id="fechaFin" class="form-control">
                </div>
                <div class="col-md-3">
                    <label for="tipo">Tipo:</label>
                    <select id="tipo" class="form-control">
                        <option value="">Todos</option>
                        <option value="ingreso"> Ingresos</option>
                        <option value="gasto"> Gastos</option>
                    </select>
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button id="filtrar" class="btn btn-primary w-100">Filtrar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-header"> Transacciones Recientes</div>
        <div class="card-body">
            <table class="table table-striped display nowrap" id="transactionTable" style="width:100%">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Método de Pago</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <div class="card mb-4">
        <div class="card-header"> Resumen Financiero</div>
        <div class="card-body">
            <canvas id="financialChart"></canvas>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js"></script>
<script>
$(document).ready(function () {
    let table = $('#transactionTable').DataTable({
        ajax: {
            url: 'get_transacciones.php',
            dataSrc: ''
        },
        columns: [
            { data: 'fecha' },
            { data: 'descripcion' },
            { data: 'tipo', render: function (data) {
                return data === 'ingreso' ? 'Ingreso' : 'Gasto';
            }},
            { data: 'monto', render: function (data) {
                return `$${parseFloat(data).toFixed(2)}`;
            }},
            { data: 'metodo_pago' }
        ],
        dom: 'Bfrtip',
        buttons: ['excelHtml5', 'pdfHtml5']
    });

    // Filtros
    $('#filtrar').click(function () {
        let fechaInicio = $('#fechaInicio').val();
        let fechaFin = $('#fechaFin').val();
        let tipo = $('#tipo').val();

        $('#transactionTable').DataTable().ajax.url(`get_transacciones.php?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&tipo=${tipo}`).load();
    });
//grafica
    fetch("get_resumen.php")
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('financialChart').getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Ingresos', 'Gastos', 'Ganancia Neta'],
                    datasets: [{
                        label: 'Monto en USD',
                        data: [data.ingresos, data.gastos, data.ganancia_neta],
                        backgroundColor: ['#28a745', '#dc3545', '#007bff'],
                        borderColor: ['#218838', '#c82333', '#0056b3'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error al obtener resumen financiero:", error));
});
</script>
</body>
</html>
