<?php

require_once "conexion.php";
class Puertos extends Conexion{
    public function puertosDestinos($puertoOrigen, $tabla){

		$stmt = Conexion::conectar()->prepare("SELECT FROM $tabla WHERE usuario = :usuario");	
		$stmt->bindParam(":usuario", $datosModel["usuario"], PDO::PARAM_STR);
		$stmt->execute();

		#fetch(): Obtiene una fila de un conjunto de resultados asociado al objeto PDOStatement. 
		return $stmt->fetch();

		$stmt->null;

	}
}