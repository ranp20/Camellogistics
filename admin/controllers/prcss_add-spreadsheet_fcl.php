<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'connection.php';

if(isset($_FILES) && isset($_POST)){
	if($_FILES['spreadsheetfcl']['error'] == 0){
		if($_FILES['spreadsheetfcl']['type'] === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){

			$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
			$inputFileName = $_FILES['spreadsheetfcl']['tmp_name'];
			$archivoExcel = IOFactory::load($inputFileName);
			$archivoExcel->setActiveSheetIndex(1); // CARGAR LA HOJA DE CÁLCULO QUE QUEREMOS...
			$numberrows = $archivoExcel->setActiveSheetIndex(1)->getHighestRow(); // OBTENER EL NÚMERO DE FILAS DE LA HOJA ACTUAL...

			/************************** COMPROBAR SI EXISTE INFORMACIÓN EN LA TABLA **************************/
			require 'c_list_id_rate_fcl.php';
			$rateidfcl = new List_Ids_rateFCL();
			$listids = $rateidfcl->list();

			if(!empty($listids)){

				$ilistid = 0;
				$arrupdated = [];

				for ($i = 6; $i < $numberrows; $i++){
					$countryOrigin = $archivoExcel->getActiveSheet()->getCell('A'.$i)->getCalculatedValue();
					$portOrigin = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$portDestiny = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
					$container = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$amount = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$totalamount = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$naviera = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					//$validez = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
				
					if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $container != "" || $totalamount != ""){
						
						array_push($arrupdated, 
						[$countryOrigin, $portOrigin,	$portDestiny,	$container,	$amount,	$totalamount, $naviera, $cooloder]);

					}
				}

				/************************** RECORRER LOS IDs Y ACTUALIZAR LOS REGISTROS PREVIOS **************************/
				while ($ilistid < count($arrupdated)) {
					/************************** ACTUALIZAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
					$sql = "UPDATE tbl_rate_fcl SET
					country_origin = '".$arrupdated[$ilistid][0]."', 
					port_origin = '".$arrupdated[$ilistid][1]."', 
					port_destiny = '".$arrupdated[$ilistid][2]."', 
					container = '".$arrupdated[$ilistid][3]."', 
					monto = '".$arrupdated[$ilistid][4]."', 
					total = '".$arrupdated[$ilistid][5]."', 
					naviera = '".$arrupdated[$ilistid][6]."', 
					cooloder = '".$arrupdated[$ilistid][7]."', 
					validdesde = '".$_POST['validdesdefcl']."', 
					validhasta = '".$_POST['validhastafcl']."',
					utility = ".$_POST['utilityfcl']." WHERE id = ".$listids[$ilistid]['id']."";
					$result = $conexion->prepare($sql);
					$result->execute();

					if($result == true){
						$res = array(
							'response' => 'updated'
						);
					}else{
						$res = array(
							'response' => 'false'
						);
					}
					$ilistid++;
				}

				/************************** ENVIAR LA HOJA DE CÁLCULO A GUARDAR **************************/
				$file_name = $_FILES['spreadsheetfcl']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetfcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/fcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_fcl(:spreadsheet)";
					$stm = $conexion->prepare($sql);
					$stm->bindValue(":spreadsheet", $file_name);
					$stm->execute();
					if($stm == true){
						$res = array(
							'response' => 'updated'
						);
					}else{
						$res = array(
							'response' => 'false'
						);
					}
					
				}else{
					echo "Error fatal";
				}

				/************************** AGREGAR A LA TABLA - LÍNEA DE TIEMPO DE CAMBIOS EN UTILIDAD  **************************/
				$sql = "INSERT INTO tbl_utility_rate_fcl(
				utility,
				val_desde,
				val_hasta)
				VALUES 
				(".$_POST['utilityfcl'].",
				'".$_POST['validdesdefcl']."', 
				'".$_POST['validhastafcl']."')";
				$result = $conexion->prepare($sql);
				$result->execute();

				if($result == true){
					$res = array(
						'response' => 'updated'
					);
				}else{
					$res = array(
						'response' => 'false'
					);
				}

				//echo "Existen datos en la tabla";
			}else{
	
				//echo "No hay datos en la tabla";
				for ($i = 6; $i < $numberrows; $i++){
					$countryOrigin = $archivoExcel->getActiveSheet()->getCell('A'.$i)->getCalculatedValue();
					$portOrigin = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$portDestiny = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
					$container = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$amount = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$totalamount = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$naviera = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					//$validez = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					
					if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $container != "" || $totalamount != ""){

						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_fcl(
						country_origin, 
						port_origin, 
						port_destiny, 
						container, 
						monto, 
						total, 
						naviera, 
						cooloder, 
						validdesde, 
						validhasta, 
						utility) 
						VALUES 
						('".$countryOrigin."', 
						'".$portOrigin."', 
						'".$portDestiny."',
						'".$container."', 
						'".$amount."', 
						'".$totalamount."', 
						'".$naviera."',
						'".$cooloder."',
						'".$_POST['validdesdefcl']."', 
						'".$_POST['validhastafcl']."', 
						".$_POST['utilityfcl'].")";
						$result = $conexion->prepare($sql);
						$result->execute();

						if($result == true){
							$res = array(
								'response' => 'inserted'
							);
						}else{
							$res = array(
								'response' => 'false'
							);
						}
					}
				}


				/************************** ENVIAR LA HOJA DE CÁLCULO A GUARDAR **************************/
				$file_name = $_FILES['spreadsheetfcl']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetfcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/fcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_fcl(:spreadsheet)";
					$stm = $conexion->prepare($sql);
					$stm->bindValue(":spreadsheet", $file_name);
					$stm->execute();
					if($stm == true){
						$res = array(
							'response' => 'inserted'
						);
					}else{
						$res = array(
							'response' => 'false'
						);
					}
					
				}else{
					echo "Error fatal";
				}


				/************************** AGREGAR A LA TABLA - LÍNEA DE TIEMPO DE CAMBIOS EN UTILIDAD  **************************/
				$sql = "INSERT INTO tbl_utility_rate_fcl(
				utility,
				val_desde,
				val_hasta)
				VALUES 
				(".$_POST['utilityfcl'].",
				'".$_POST['validdesdefcl']."', 
				'".$_POST['validhastafcl']."')";
				$result = $conexion->prepare($sql);
				$result->execute();

				if($result == true){
					$res = array(
						'response' => 'inserted'
					);
				}else{
					$res = array(
						'response' => 'false'
					);
				}
			}

		}else{			
			$res = array(
				'response' => 'false'
			);
		}
	}else{
		$res = array(
			'response' => 'false'
		);
	}
}else{
	$res = array(
		'response' => 'false'
	);
}
die(json_encode($res));