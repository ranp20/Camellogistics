<?php

$servidor = "localhost";
$usuario = "root";
$password = "";
 
try {
  $conexion = new PDO("mysql:host=$servidor;
                      dbname=db_camellogistics", 
                      $usuario, $password, 
                      array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));      
  $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
	echo "La conexión ha fallado: " . $e->getMessage();
}