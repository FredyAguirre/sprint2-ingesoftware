<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "restaurante_sistema";
$conn = new mysqli($host, $user, $password, $database);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
