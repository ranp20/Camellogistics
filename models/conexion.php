<?php

class Conexion{

	public static function conectar(){

		//$link = new PDO("mysql:host=localhost;dbname=bd_camel","root","");
		$link = new PDO("mysql:host=localhost;dbname=db_camellogistics","root","");
		return $link;

	}

}

?>