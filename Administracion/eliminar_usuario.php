<?php
include 'conexion.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Eliminar usuario
    $sql = "DELETE FROM usuarios WHERE id = $id";

    if ($conexion->query($sql) === TRUE) {
        echo "Usuario eliminado correctamente.";
        header("Location: admin_usuarios.php");  // Redirige a la página de administración
    } else {
        echo "Error al eliminar usuario: " . $conexion->error;
    }
} else {
    echo "ID no válido.";
}
?>
