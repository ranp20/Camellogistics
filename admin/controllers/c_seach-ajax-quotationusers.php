<?php 
require_once 'c_pagination_quotationusers.php';
$funct_pagquotationusers = new Pagination_quotationusers();
$nombre = $_POST['nombre'];
if(empty($nombre)) $nombre = NULL;
$numero = $_POST['numero'];
$respuesta = $funct_pagquotationusers->buscar($nombre,$numero);
echo json_encode( $respuesta );