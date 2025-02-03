<?php include 'conexion.php';?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrar Usuarios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
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
        .section {
            margin-bottom: 40px;
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
        .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>

<!-- Barra superior -->
<nav class="navbar navbar-expand-lg navbar-custom">
    <a class="navbar-brand" href="#">Panel de Administración</a>
    <div class="navbar-text">Bienvenido, Administrador</div>
</nav>

<!-- Contenedor de la barra lateral y contenido -->
<div class="container-fluid">
    <!-- Menú lateral -->
    <div class="sidebar">
        <a href="index.php">Administrar Platos</a>
        <a href="admin_usuarios.php">Administrar Usuarios</a>
    </div>

    <!-- Contenido principal -->
    <div class="content">
        <!-- Sección: Administrar Usuarios -->
        <div class="section">
        <h1 class="text-center mb-4">Administrar Usuarios</h1>
            
            <!-- Barra de Búsqueda y Botones -->
            <div class="d-flex justify-content-between mb-3">
                <a href="formulario_usuario.php" class="btn btn-primary mb-3">Agregar Usuario</a>
                <input type="text" id="searchInput" class="form-control w-50" placeholder="Buscar usuarios...">
                <button class="btn btn-info ms-2" onclick="filterTable()">Filtrar</button>
            </div>
            
            <!-- Tabla -->
            <table id="usuariosTable" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Configuración de paginación
                    $items_per_page = 10;
                    $current_page = isset($_GET['page']) ? $_GET['page'] : 1;
                    $offset = ($current_page - 1) * $items_per_page;

                    // Consulta con límite para la paginación
                    $sql_usuarios = "SELECT * FROM usuarios LIMIT $offset, $items_per_page";
                    $resultado_usuarios = $conexion->query($sql_usuarios);
                    while ($fila_usuarios = $resultado_usuarios->fetch_assoc()) {
                        echo "<tr>
                                <td>{$fila_usuarios['nombre']}</td>
                                <td>{$fila_usuarios['cedula']}</td>
                                <td>{$fila_usuarios['telefono']}</td>
                                <td>{$fila_usuarios['direccion']}</td>
                                <td>{$fila_usuarios['rol']}</td>
                                <td>
                                    <a href='editar_usuario.php?id={$fila_usuarios['id']}' class='btn btn-warning btn-sm'>Editar</a>
                                    <a href='eliminar_usuario.php?id={$fila_usuarios['id']}' class='btn btn-danger btn-sm' onclick='return confirm(\"¿Estás seguro?\")'>Eliminar</a>
                                </td>
                            </tr>";
                    }
                    ?>
                </tbody>
            </table>

            <!-- Paginación -->
            <div class="pagination-container">
                <?php
                // Obtener el total de usuarios para calcular el número de páginas
                $sql_total_usuarios = "SELECT COUNT(*) AS total FROM usuarios";
                $result_total_usuarios = $conexion->query($sql_total_usuarios);
                $total_usuarios = $result_total_usuarios->fetch_assoc()['total'];
                $total_pages = ceil($total_usuarios / $items_per_page);

                // Mostrar los enlaces de paginación
                for ($i = 1; $i <= $total_pages; $i++) {
                    echo "<a href='admin_usuarios.php?page=$i' class='btn btn-secondary btn-sm mx-1'>$i</a>";
                }
                ?>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
// Función para filtrar la tabla
function filterTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var table = document.getElementById("usuariosTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td");
        var found = false;
        
        // Revisar si alguno de los valores de la fila contiene el texto de búsqueda
        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                var textValue = td[j].textContent || td[j].innerText;
                if (textValue.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        // Mostrar/ocultar la fila dependiendo si encontró el texto
        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Para permitir la búsqueda en tiempo real mientras el usuario escribe
document.getElementById("searchInput").addEventListener("keyup", filterTable);
</script>
</body>
</html>
