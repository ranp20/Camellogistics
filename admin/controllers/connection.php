<?php
// CONFIGURACIÓN - SERVIDOR (SERVIDOR TEMPORAL)
/*
$servidor = "207.7.82.106";
$dbname = "grupopdg_camellogistics_db";
$usuario = "grupopdg_camellogistics_user";
$password = "A%,Q?%#U]N~K";
$charset = "utf8";
*/
// CONFIGURACIÓN - LOCALHOST
$servidor = "localhost";
$dbname = "db_camellogistics";
$usuario = "root";
$password = "";
$charset = "utf8";

try {
  $con = new PDO("mysql:host=$servidor;dbname=$dbname",$usuario,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES $charset"));
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
  echo "La conexión ha fallado: " . $e->getMessage();
}