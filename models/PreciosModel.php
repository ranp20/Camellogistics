<?php
require_once ('conexion.php');
class PreciosModel extends Conexion{
    public static function get_by( $key ){
         $sql = "SELECT * FROM tbl_config WHERE config_key = '$key'";
        $stmt = Conexion::conectar()->prepare( $sql );	
		$stmt->execute();

		return $stmt->fetch(PDO::FETCH_OBJ);

		$stmt->null;
    }
}