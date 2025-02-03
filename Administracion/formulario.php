<?php
include 'conexion.php';

$id = isset($_GET['id']) ? $_GET['id'] : '';
$nombre = '';
$descripcion = '';
$ingredientes = '';
$imagen_url = '';

if ($id) {
    // Obtener datos del plato para editar
    $sql = "SELECT * FROM platos WHERE id = $id";
    $resultado = $conexion->query($sql);
    if ($fila = $resultado->fetch_assoc()) {
        $nombre = $fila['nombre'];
        $descripcion = $fila['descripcion'];
        $ingredientes = $fila['ingredientes'];
        $imagen_url = $fila['imagen_url'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $ingredientes = $_POST['ingredientes'];

    // Manejar subida de imagen
    if ($_FILES['imagen']['name']) {
        $ruta = 'imagenes/' . basename($_FILES['imagen']['name']);
        move_uploaded_file($_FILES['imagen']['tmp_name'], $ruta);
        $imagen_url = $ruta;
    }

    if ($id) {
        // Actualizar registro
        $sql = "UPDATE platos SET nombre='$nombre', descripcion='$descripcion', ingredientes='$ingredientes', imagen_url='$imagen_url' WHERE id=$id";
    } else {
        // Insertar nuevo registro
        $sql = "INSERT INTO platos (nombre, descripcion, ingredientes, imagen_url) VALUES ('$nombre', '$descripcion', '$ingredientes', '$imagen_url')";
    }

    if ($conexion->query($sql)) {
        header('Location: index.php');
    } else {
        echo "Error: " . $conexion->error;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Plato</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h1 class="text-center"><?php echo $id ? 'Editar' : 'Agregar'; ?> Plato</h1>
    <form action="" method="POST" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" name="nombre" class="form-control" value="<?php echo $nombre; ?>" required>
        </div>
        <div class="mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea name="descripcion" class="form-control" rows="3"><?php echo $descripcion; ?></textarea>
        </div>
        <div class="mb-3">
            <label for="ingredientes" class="form-label">Ingredientes</label>
            <textarea name="ingredientes" class="form-control" rows="3"><?php echo $ingredientes; ?></textarea>
        </div>
        <div class="mb-3">
            <label for="imagen" class="form-label">Imagen</label>
            <input type="file" name="imagen" class="form-control">
            <?php if ($imagen_url): ?>
                <img src="<?php echo $imagen_url; ?>" alt="Imagen actual" class="mt-2" style="width: 150px;">
            <?php endif; ?>
        </div>
        <button type="submit" class="btn btn-success">Guardar</button>
        <a href="index.php" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
</body>
</html>
