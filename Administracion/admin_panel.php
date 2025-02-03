<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administración</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <!-- Barra Superior -->
    <nav class="navbar navbar-dark bg-dark px-3">
        <button class="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
            ☰ Menú
        </button>
        <span class="navbar-text text-light">Panel de Administración</span>
    </nav>

    <!-- Menú Lateral -->
    <div class="offcanvas offcanvas-start bg-dark text-white" tabindex="-1" id="sidebar">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title">Menú</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" onclick="mostrarSeccion('platos')">🍽 Administrar Platos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" onclick="mostrarSeccion('empleados')">👥 Administrar Empleados</a>
                </li>
            </ul>
        </div>
    </div>

    <!-- Contenedor de Secciones -->
    <div class="container mt-4">
        <!-- CRUD de Platos -->
        <div id="platos" class="seccion">
            <h2>Administrar Platos</h2>
            <button class="btn btn-primary mb-3">➕ Agregar Plato</button>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Ingredientes</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ejemplo</td>
                        <td>Descripción de prueba</td>
                        <td>Ingrediente 1, Ingrediente 2</td>
                        <td><img src="https://via.placeholder.com/50" class="img-thumbnail"></td>
                        <td>
                            <button class="btn btn-warning btn-sm">✏ Editar</button>
                            <button class="btn btn-danger btn-sm">🗑 Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- CRUD de Empleados (Por implementar) -->
        <div id="empleados" class="seccion d-none">
            <h2>Administrar Empleados</h2>
            <p>Página en construcción...</p>
        </div>
    </div>

    <script>
        function mostrarSeccion(seccion) {
            document.querySelectorAll('.seccion').forEach(s => s.classList.add('d-none'));
            document.getElementById(seccion).classList.remove('d-none');
        }
    </script>
</body>
</html>
