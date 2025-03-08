<?php
include "db.php";
$fechaInicio = isset($_GET['fechaInicio']) ? trim($_GET['fechaInicio']) : '';
$fechaFin = isset($_GET['fechaFin']) ? trim($_GET['fechaFin']) : '';
$tipo = isset($_GET['tipo']) ? trim($_GET['tipo']) : '';
$sql = "SELECT fecha, descripcion, tipo, monto, metodo_pago FROM transacciones_financieras WHERE 1=1";
if (!empty($fechaInicio) && !empty($fechaFin)) {
    $sql .= " AND fecha BETWEEN '$fechaInicio' AND '$fechaFin'";
} elseif (!empty($fechaInicio)) {
    $sql .= " AND fecha = '$fechaInicio'";
} elseif (!empty($fechaFin)) {
    $sql .= " AND fecha = '$fechaFin'";
}
if (!empty($tipo)) {
    $sql .= " AND tipo = '$tipo'";
}
$result = $conn->query($sql);
$transacciones = [];
while ($row = $result->fetch_assoc()) {
    $transacciones[] = $row;
}
echo json_encode($transacciones);
?>
