<?php
include 'conexion.php';

$id = $_GET['id'];

if ($id) {
    $sql = "DELETE FROM platos WHERE id = $id";
    if ($conexion->query($sql)) {
        header('Location: index.php');
    } else {
        echo "Error: " . $conexion->error;
    }
}
?>
