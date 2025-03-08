
<?php

$conexion=new mysqli("localhost", "root", "", "restaurante_sistema");
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$sql = "SELECT tipo, SUM(monto) AS total FROM transacciones_financieras GROUP BY tipo";
$resultado=$conexion->query($sql);
$data = [
    'ingresos' => 0,
    'gastos' => 0
];

while ($fila=$resultado->fetch_assoc()) {
    if ($fila['tipo'] ==='ingreso') {
        $data['ingresos']=(float) $fila['total'];
    } elseif ($fila['tipo']=== 'gasto') {
        $data['gastos'] = (float) $fila['total'];
    }
}
$data['ganancia_neta']=$data['ingresos'] - $data['gastos'];
header('Content-Type: application/json');
echo json_encode($data);
$conexion->close();
?>
