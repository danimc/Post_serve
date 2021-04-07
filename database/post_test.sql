-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-03-2021 a las 22:57:42
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `post_serve`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`admin`@`%` PROCEDURE `sp-historial` (`post` INT)  BEGIN
SELECT 
    h.id,
    CONCAT('el usuario ',
            u.nombre,
            ' ',
            h.movimiento,
            ' el post ',
            h.post,
            ' el ',
            h.fecha) AS msg,
    u.nombre,
    h.movimiento,
    h.post,
    h.fecha
FROM
    `tb-historial` h
        LEFT JOIN
    `tb-usuarios` u ON u.id = h.usuario
WHERE
    h.post = post;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb-historial`
--

CREATE TABLE `tb-historial` (
  `id` int(11) NOT NULL,
  `post` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `movimiento` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb-posts`
--

CREATE TABLE `tb-posts` (
  `id` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `mensaje` text NOT NULL,
  `creador` int(11) DEFAULT NULL,
  `fecha_creado` datetime DEFAULT NULL,
  `estatus` tinyint(4) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb-reviews`
--

CREATE TABLE `tb-reviews` (
  `id` int(11) NOT NULL,
  `post` int(11) DEFAULT NULL,
  `calificacion` float DEFAULT NULL,
  `usuario` int(11) NOT NULL,
  `mensaje` varchar(200) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb-roles`
--

CREATE TABLE `tb-roles` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `rol` varchar(25) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb-roles`
--

INSERT INTO `tb-roles` (`id`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMINISTRADOR', '2021-03-26 04:40:56', NULL),
(2, 'MODERADOR', '2021-03-26 04:40:56', NULL),
(3, 'EDITOR', '2021-03-26 04:40:56', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb-usuarios`
--

CREATE TABLE `tb-usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `rol` tinyint(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb-usuarios`
--

INSERT INTO `tb-usuarios` (`id`, `nombre`, `email`, `estado`, `rol`, `createdAt`, `updatedAt`, `password`) VALUES
(1, 'Admin', 'daniel_k310a@hotmail.com', 1, 1, '2021-03-27 21:53:50', '2021-03-26 05:57:57', '$2a$10$um4na7jJgQHF7zbuNExzDeePhBuxajtVffegPB5VCWSg9pnf7RGyi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb-historial`
--
ALTER TABLE `tb-historial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb-posts`
--
ALTER TABLE `tb-posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb-reviews`
--
ALTER TABLE `tb-reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb-roles`
--
ALTER TABLE `tb-roles`
  ADD UNIQUE KEY `id_rol` (`id`);

--
-- Indices de la tabla `tb-usuarios`
--
ALTER TABLE `tb-usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `un_email` (`email`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb-historial`
--
ALTER TABLE `tb-historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tb-posts`
--
ALTER TABLE `tb-posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tb-reviews`
--
ALTER TABLE `tb-reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tb-usuarios`
--
ALTER TABLE `tb-usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
