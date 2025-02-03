<?php
include 'conexion.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Obtener datos del usuario
    $sql = "SELECT * FROM usuarios WHERE id = $id";
    $resultado = $conexion->query($sql);
    $usuario = $resultado->fetch_assoc();

    if (!$usuario) {
        die("Usuario no encontrado.");
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $cedula = $_POST['cedula'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $rol = $_POST['rol'];

    // Actualizar usuario
    $sql_update = "UPDATE usuarios SET nombre='$nombre', cedula='$cedula', telefono='$telefono', direccion='$direccion', rol='$rol' WHERE id = $id";

    if ($conexion->query($sql_update) === TRUE) {
        echo "Usuario actualizado correctamente.";
        header("Location: admin_usuarios.php");  // Redirige a la página de administración
    } else {
        echo "Error al actualizar usuario: " . $conexion->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h1>Editar Usuario</h1>
    <form method="POST">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" name="nombre" value="<?php echo $usuario['nombre']; ?>" required>
        </div>
        <div class="mb-3">
            <label for="cedula" class="form-label">Cédula</label>
            <input type="text" class="form-control" id="cedula" name="cedula" value="<?php echo $usuario['cedula']; ?>" required>
        </div>
        <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="telefono" name="telefono" value="<?php echo $usuario['telefono']; ?>" required>
        </div>
        <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <textarea class="form-control" id="direccion" name="direccion" required><?php echo $usuario['direccion']; ?></textarea>
        </div>
        <div class="mb-3">
            <label for="rol" class="form-label">Rol</label>
            <select class="form-select" id="rol" name="rol" required>
                <option value="Cajero" <?php echo ($usuario['rol'] == 'Cajero') ? 'selected' : ''; ?>>Cajero</option>
                <option value="Mesero" <?php echo ($usuario['rol'] == 'Mesero') ? 'selected' : ''; ?>>Mesero</option>
                <option value="Chef" <?php echo ($usuario['rol'] == 'Chef') ? 'selected' : ''; ?>>Chef</option>
                <option value="Administrador" <?php echo ($usuario['rol'] == 'Administrador') ? 'selected' : ''; ?>>Administrador</option>
            </select>
        </div>
        <button type="submit" class="btn btn-success">Actualizar</button>
        <a href="admin_usuarios.php" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
</body>
</html>
