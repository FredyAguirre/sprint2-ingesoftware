<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $ingredientes = $_POST['ingredientes'];

    $sql = "INSERT INTO platos (nombre, descripcion, ingredientes) VALUES ('$nombre', '$descripcion', '$ingredientes')";
    if ($conn->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<form method="POST">
    <input type="text" name="nombre" placeholder="Nombre del Plato" required>
    <input type="text" name="descripcion" placeholder="Descripción" required>
    <input type="text" name="ingredientes" placeholder="Ingredientes" required>
    <button type="submit">Agregar</button>
</form>
