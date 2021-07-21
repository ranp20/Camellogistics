<?php
// require_once "conexion.php";
// class Datos extends Conexion{
// 	/************************** REGISTRO DE USUARIOS - MODELO **************************/
// 	public function registroUsuarioModel($datosModel, $tabla){
// 		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla (usuario, password, email) VALUES (:usuario,:password,:email)");	
// 		$stmt->bindParam(":usuario", $datosModel["usuario"], PDO::PARAM_STR);
// 		$stmt->bindParam(":password", $datosModel["password"], PDO::PARAM_STR);
// 		$stmt->bindParam(":email", $datosModel["email"], PDO::PARAM_STR);
// 		if($stmt->execute()){
// 			return "success";
// 		}
// 		else{
// 			return "error";
// 		}
// 		$stmt->null;
// 	}
// 	/************************** INGRESO DE USUARIOS - MODELO **************************/
// 	public function ingresoUsuarioModel($datosModel, $tabla){
// 		$stmt = Conexion::conectar()->prepare("SELECT usuario, password FROM $tabla WHERE usuario = :usuario");	
// 		$stmt->bindParam(":usuario", $datosModel["usuario"], PDO::PARAM_STR);
// 		$stmt->execute();
// 		return $stmt->fetch();
// 		$stmt->null;
// 	}
// 	/************************** VISTA DE USUARIOS - MODELO **************************/
// 	public function vistaUsuariosModel($tabla){
// 		$stmt = Conexion::conectar()->prepare("SELECT id, usuario, password, email FROM $tabla");	
// 		$stmt->execute();
// 		return $stmt->fetchAll();
// 		$stmt->null;
// 	}
// 	/************************** EDITAR USUARIO - MODELO **************************/
// 	public function editarUsuarioModel($datosModel, $tabla){
// 		$stmt = Conexion::conectar()->prepare("SELECT id, usuario, password, email FROM $tabla WHERE id = :id");
// 		$stmt->bindParam(":id", $datosModel, PDO::PARAM_INT);	
// 		$stmt->execute();
// 		return $stmt->fetch();
// 		$stmt->null;
// 	}
// 	/************************** ACTUALIZAR USUARIO - MODELO **************************/
// 	public function actualizarUsuarioModel($datosModel, $tabla){
// 		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET usuario = :usuario, password = :password, email = :email WHERE id = :id");
// 		$stmt->bindParam(":usuario", $datosModel["usuario"], PDO::PARAM_STR);
// 		$stmt->bindParam(":password", $datosModel["password"], PDO::PARAM_STR);
// 		$stmt->bindParam(":email", $datosModel["email"], PDO::PARAM_STR);
// 		$stmt->bindParam(":id", $datosModel["id"], PDO::PARAM_INT);
// 		if($stmt->execute()){
// 			return "success";
// 		}else{
// 			return "error";
// 		}
// 		$stmt->null;
// 	}
// 	/************************** ELIMINAR USUARIO **************************/
// 	public function borrarUsuarioModel($datosModel, $tabla){
// 		$stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");
// 		$stmt->bindParam(":id", $datosModel, PDO::PARAM_INT);
// 		if($stmt->execute()){
// 			return "success";
// 		}else{
// 			return "error";
// 		}
// 		$stmt->null;
// 	}
// 	/************************** VISTA PUERTO ORIGEN **************************/
// 	public static  function vistaPuertosOrigModel($tabla){
// 		$stmt = Conexion::conectar()->prepare("SELECT p.puerto_id,CONCAT(p.puerto,' - ',ps.pais) AS puerto_origen,ct.puerto_origen_id FROM tbl_aq_carga_fcl_detail ct inner JOIN tbl_aq_puertos p on p.puerto_id=ct.puerto_origen_id inner JOIN tbl_aq_paises ps on ps.pais_id=p.pais_id GROUP BY ct.puerto_origen_id");	
// 		$stmt->execute();
// 		return $stmt->fetchAll();
// 		$stmt->null;
// 	}
// }