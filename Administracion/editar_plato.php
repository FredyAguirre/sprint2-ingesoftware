<?php
include 'conexion.php';

$id = $_GET['id'];
$sql = "SELECT * FROM platos WHERE id=$id";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $ingredientes = $_POST['ingredientes'];

    $sql = "UPDATE platos SET nombre='$nombre', descripcion='$descripcion', ingredientes='$ingredientes' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<form method="POST">
    <input type="text" name="nombre" value="<?= $row['nombre'] ?>" required>
    <input type="text" name="descripcion" value="<?= $row['descripcion'] ?>" required>
    <input type="text" name="ingredientes" value="<?= $row['ingredientes'] ?>" required>
    <button type="submit">Actualizar</button>
</form>
