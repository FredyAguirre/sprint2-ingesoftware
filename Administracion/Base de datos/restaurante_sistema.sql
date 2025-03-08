-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2025 at 05:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurante_sistema`
--

-- --------------------------------------------------------

--
-- Table structure for table `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ingredientes` text DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `descripcion`, `ingredientes`, `imagen_url`, `creado_en`) VALUES
(1, 'Pizza Margarita', 'Pizza clásica con tomate, queso mozzarella y albahaca.', 'ss', 'imagenes/images.jpg', '2025-01-27 21:50:52'),
(6, 'Tacos de Carne Asada', 'Tacos con carne asada, cebolla, cilantro y salsa', 'Carne asada, cebolla, cilantro, salsa roja, tortillas de maíz', 'imagenes/carne-asada-tacos1.jpg', '2025-02-03 01:55:17'),
(7, 'Enchiladas Verdes', 'Tortillas rellenas de pollo bañadas en salsa verde', 'Pollo, tortillas de maíz, salsa verde, crema, queso fresco', 'imagenes/450_1000.jpg', '2025-02-03 01:55:17'),
(8, 'Pozole Rojo', 'Sopa tradicional de maíz con carne de cerdo', 'Maíz hominy, carne de cerdo, chile, cebolla, rábanos', 'imagenes/pozole-rojo-1.jpg', '2025-02-03 01:55:17'),
(11, 'Sopes', 'Pequeñas tortillas gruesas con frijoles, carne, y salsa', 'Tortillas de maíz, frijoles, carne de res o pollo, lechuga, salsa', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(12, 'Tacos al Pastor', 'Tacos con cerdo adobado, piña, cebolla y cilantro', 'Cerdo adobado, piña, cebolla, cilantro, tortillas de maíz', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(13, 'Quesadillas de Flor de Calabaza', 'Tortillas rellenas de flor de calabaza y queso', 'Flor de calabaza, queso Oaxaca, tortillas de maíz', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(14, 'Chiles en Nogada', 'Chiles poblanos rellenos de picadillo con salsa de nuez', 'Chile poblano, carne molida, frutas, nuez, granada', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(15, 'Ceviche de Camarón', 'Camarones marinados en limón con tomate, cebolla y cilantro', 'Camarón, limón, tomate, cebolla, cilantro, aguacate', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(16, 'Torta de Cochinita Pibil', 'Torta con carne de cerdo adobada y cebolla morada', 'Carne de cerdo, achiote, cebolla morada, pan bolillo', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(17, 'Tamales de Elote', 'Tamales dulces hechos con maíz tierno', 'Maíz tierno, azúcar, mantequilla, hojas de maíz', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(18, 'Sopa de Lima', 'Sopa de pollo con un toque cítrico de lima', 'Pollo, lima, cebolla, cilantro, tortilla frita', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(19, 'Fajitas de Res', 'Tiras de carne de res acompañadas de verduras y tortillas', 'Carne de res, pimientos, cebolla, tortillas de harina', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(20, 'Pescado a la Veracruzana', 'Pescado cocinado con tomate, aceitunas y alcaparras', 'Pescado, tomate, aceitunas, alcaparras, cebolla', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(21, 'Tostadas de Atún', 'Tostadas de maíz con atún, aguacate y salsa picante', 'Atún, tostadas de maíz, aguacate, salsa picante', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(22, 'Arroz a la Mexicana', 'Arroz preparado con tomate, cebolla y chiles', 'Arroz, tomate, cebolla, chiles, ajo', 'https://via.placeholder.com/100', '2025-02-03 01:55:17'),
(24, 'desafsdfg', 'sdgshsdh', 'sdhshfsdfhsf', '', '2025-02-03 05:51:15'),
(25, 'desafsdfg', 'sdgshsdh', 'sdhshfsdfhsf', '', '2025-02-03 05:52:10');

-- --------------------------------------------------------

--
-- Table structure for table `transacciones_financieras`
--

CREATE TABLE `transacciones_financieras` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo` enum('ingreso','gasto') NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transacciones_financieras`
--

INSERT INTO `transacciones_financieras` (`id`, `fecha`, `descripcion`, `tipo`, `monto`, `metodo_pago`) VALUES
(15, '2025-03-10', 'Venta de bandeja paisa', 'ingreso', 32000.00, 'efectivo'),
(16, '2025-03-10', 'Venta de ajiaco', 'ingreso', 28000.00, 'tarjeta'),
(17, '2025-03-10', 'Venta de sancocho trifásico', 'ingreso', 35000.00, 'transferencia'),
(18, '2025-03-10', 'Venta de lechona', 'ingreso', 40000.00, 'tarjeta'),
(19, '2025-03-10', 'Venta de arepas rellenas', 'ingreso', 15000.00, 'efectivo'),
(20, '2025-03-11', 'Compra de carne para bandeja paisa', 'gasto', 120000.00, 'transferencia'),
(21, '2025-03-12', 'Pago de nómina a cocineros', 'gasto', 2800000.00, 'transferencia'),
(22, '2025-03-13', 'Compra de ingredientes para salsas', 'gasto', 50000.00, 'efectivo'),
(23, '2025-03-14', 'Compra de verduras frescas', 'gasto', 70000.00, 'tarjeta'),
(24, '2025-03-15', 'Pago de servicio de gas', 'gasto', 250000.00, 'transferencia');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` text NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `cedula`, `telefono`, `direccion`, `rol`) VALUES
(3, 'Carlos Martínez', '123456789', '3001234567', 'fdfgff', 'Administrador'),
(4, 'Ana Gómez', '987654321', '3007654321', 'Avenida 456, Medellín', 'Cajero'),
(5, 'Luis Pérez', '1122334455', '3101122334', 'Calle 789, Cali', 'Mesero'),
(6, 'Marta Sánchez', '2233445566', '3202233445', 'Carrera 123, Barranquilla', 'Chef'),
(7, 'Jorge Ruiz', '3344556677', '3303344556', 'Calle 101, Cartagena', 'Mesero'),
(8, 'Patricia López', '4455667788', '3404455667', 'Avenida 202, Bucaramanga', 'Cajero'),
(10, 'Laura Ramírez', '6677889900', '3606677889', 'Calle 404, Armenia', 'Chef'),
(11, 'David González', '7788990011', '3707788990', 'Avenida 505, Pereira', 'Cajero'),
(12, 'María Rodríguez', '8899001122', '3808899001', 'Calle 606, Manizales', 'Mesero'),
(13, 'Carlos Martínez', '1122334455', '9876543210', 'Calle Falsa 123', 'Administrador'),
(14, 'Laura Gómez', '2233445566', '9876543211', 'Avenida Siempre Viva 456', 'Cajero'),
(15, 'Pedro Fernández', '3344556677', '9876543212', 'Calle 1, Sector 2', 'Mesero'),
(16, 'Ana Ruiz', '4455667788', '9876543213', 'Avenida Principal 789', 'Chef'),
(17, 'José García', '5566778899', '9876543214', 'Calle 9, Barrio 3', 'Administrador'),
(18, 'Luis Pérez', '6677889900', '9876543215', 'Avenida Libertad 101', 'Mesero'),
(19, 'Martina Díaz', '7788990011', '9876543216', 'Calle Independencia 202', 'Cajero'),
(20, 'David Sánchez', '8899001122', '9876543217', 'Calle del Sol 303', 'Chef'),
(21, 'Isabel Torres', '9900112233', '9876543218', 'Calle Nueva 404', 'Administrador'),
(22, 'Rafael López', '1011122233', '9876543219', 'Avenida Central 505', 'Mesero');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `platos`
--
ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transacciones_financieras`
--
ALTER TABLE `transacciones_financieras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `transacciones_financieras`
--
ALTER TABLE `transacciones_financieras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
