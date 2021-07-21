<?php

require_once 'models/content-views.php';

class MvcController{
	/************************** LLAMADA - PLANTILLA PRINCIPAL **************************/
	public function PageInit(){
		include "views/template.php";
	}
	/************************** LLAMADA - HEROIMAGES Y CONTENIDO PRINCIPAL EN LA VISTA INICIAL **************************/
	// public static function ViewPageInit(){
	// 	$host = $_SERVER["HTTP_HOST"];
 //    $url= $_SERVER["REQUEST_URI"];
 //    $hostURL = "http://" . $host . $url;
			// $url = "http://foobar.com/foo/bar/1?baz=qux#fragment/foo";
			// $lastSegment = basename(parse_url($url, PHP_URL_PATH));
 //    if($url == "/Camellogistics/calculadora"){
 //    	$view = $url;
 //    }else{
 //    	$view = "index.php";
 //    }

 //    $callView = ContentViews::viewContent($view);
 //    include $callView;

	// }
	/************************** ENLACES DEL HEADERTOP  **************************/
	// public static function enlacesPaginasController(){
	// 	if(isset( $_GET['action'])){
	// 		$enlaces = $_GET['action'];
	// 	}
	// 	else{
	// 		$enlaces = "index";
	// 	}
	// 	$respuesta = Paginas::enlacesPaginasModel($enlaces);
	// 	include $respuesta;
	// }
	/************************** REGISTRO DE USUARIOS **************************/
	// public function registroUsuarioController(){
	// 	if(isset($_POST["usuarioRegistro"])){
	// 		$datosController = array( "usuario"=>$_POST["usuarioRegistro"], 
	// 							      "password"=>$_POST["passwordRegistro"],
	// 							      "email"=>$_POST["emailRegistro"]);
	// 		$respuesta = Datos::registroUsuarioModel($datosController, "usuarios");
	// 		if($respuesta == "success"){
	// 			header("location:index.php?action=ok");
	// 		}
	// 		else{
	// 			header("location:index.php");
	// 		}
	// 	}
	// }
	/************************** VALIDACIÓN DE INGRESO DE USUARIOS **************************/
	// public function ingresoUsuarioController(){
	// 	if(isset($_POST["usuarioIngreso"])){
	// 		$datosController = array( 
	// 			"usuario"=>$_POST["usuarioIngreso"], 
	// 			"password"=>$_POST["passwordIngreso"]
	// 		);
	// 		$respuesta = Datos::ingresoUsuarioModel($datosController, "usuarios");
	// 		if($respuesta["usuario"] == $_POST["usuarioIngreso"] && $respuesta["password"] == $_POST["passwordIngreso"]){
	// 			session_start();
	// 			$_SESSION["validar"] = true;
	// 			header("location:index.php?action=usuarios");
	// 		}
	// 		else{
	// 			header("location:index.php?action=fallo");
	// 		}
	// 	}	
	// }
	/************************** VISTA DE USUARIOS **************************/
	// public function vistaUsuariosController(){
	// 	$respuesta = Datos::vistaUsuariosModel("usuarios");
	// 	foreach($respuesta as $row => $item){
	// 	echo'<tr>
	// 			<td>'.$item["usuario"].'</td>
	// 			<td>'.$item["password"].'</td>
	// 			<td>'.$item["email"].'</td>
	// 			<td><a href="index.php?action=editar&id='.$item["id"].'"><button>Editar</button></a></td>
	// 			<td><a href="index.php?action=usuarios&idBorrar='.$item["id"].'"><button>Borrar</button></a></td>
	// 		</tr>';
	// 	}
	// }
	/************************** EDITAR USUARIOS **************************/
	// public function editarUsuarioController(){
	// 	$datosController = $_GET["id"];
	// 	$respuesta = Datos::editarUsuarioModel($datosController, "usuarios");
	// 	echo'<input type="hidden" value="'.$respuesta["id"].'" name="idEditar">
	// 		 <input type="text" value="'.$respuesta["usuario"].'" name="usuarioEditar" required>
	// 		 <input type="text" value="'.$respuesta["password"].'" name="passwordEditar" required>
	// 		 <input type="email" value="'.$respuesta["email"].'" name="emailEditar" required>
	// 		 <input type="submit" value="Actualizar">';
	// }
	/************************** ACTUALIZAR USUARIOS **************************/
	// public function actualizarUsuarioController(){
	// 	if(isset($_POST["usuarioEditar"])){
	// 		$datosController = array( 
	// 												"id"=>$_POST["idEditar"],
	// 						          	"usuario"=>$_POST["usuarioEditar"],
	// 			                  "password"=>$_POST["passwordEditar"],
	// 			                  "email"=>$_POST["emailEditar"]
	// 			                );
	// 		$respuesta = Datos::actualizarUsuarioModel($datosController, "usuarios");
	// 		if($respuesta == "success"){
	// 			header("location:index.php?action=cambio");
	// 		}
	// 		else{
	// 			echo "error";
	// 		}
	// 	}
	// }
	/************************** ELIMINAR USUARIOS **************************/
	// public function borrarUsuarioController(){
	// 	if(isset($_GET["idBorrar"])){
	// 		$datosController = $_GET["idBorrar"];
	// 		$respuesta = Datos::borrarUsuarioModel($datosController, "usuarios");
	// 		if($respuesta == "success"){
	// 			header("location:index.php?action=usuarios");
	// 		}
	// 	}
	// }
	/************************** VISTA DE PUERTOS DE ORIGEN **************************/
	// public static function vistaPuertosOrigController(){
	// 	$respuesta = Datos::vistaPuertosOrigModel("tbl_aq_contenedor_tarifas");
	// 	#El constructor foreach proporciona un modo sencillo de iterar sobre arrays. foreach funciona sólo sobre arrays y objetos, y emitirá un error al intentar usarlo con una variable de un tipo diferente de datos o una variable no inicializada.
	// 	foreach($respuesta as $row => $item){
	// 	echo'<option value='.$item["puerto_origen_id"].'>'.$item["puerto_origen"].'</option>';
	// 	}
	// }
}