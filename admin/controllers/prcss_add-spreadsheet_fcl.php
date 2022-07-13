<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'connection.php';
$r = "";
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
			require 'c_delete_rate_fcl.php';
			$rateidfcl = new List_Ids_rateFCL();
			$listids = $rateidfcl->list();

			if(!empty($listids)){
				/************************** ELIMINAR TODOS LOS REGISTRO Y SETEAR EL AUTO_INCREMENT=1; **************************/
				$del_fcl = new Delete_Rate_FCL();
				$del_all_fcl = $del_fcl->delete();
				
				if($del_all_fcl == "true"){
					//echo "No hay datos en la tabla";
					for ($i = 6; $i < $numberrows; $i++){
						$countryOrigin = $archivoExcel->getActiveSheet()->getCell('A'.$i)->getCalculatedValue();
						$portOrigin = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
						$portDestiny = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
						$container = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
						$amount_general = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
						$totalamount_general = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
						$amount_imo = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
						$totalamount_imo = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
						$amount_refrigerado = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
						$totalamount_refrigerado = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
						$naviera = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
						//$validez = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
						$cooloder = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
						
						if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $container != "" || $totalamount_general != ""){

							/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
							$sql = "INSERT INTO tbl_rate_fcl(
							country_origin,
							port_origin,
							port_destiny,
							container,
							monto_general,
							total_general,
							monto_imo,
							total_imo,
							monto_refrigerado,
							total_refrigerado,
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
							'".$amount_general."', 
							'".$totalamount_general."', 
							'".$amount_imo."', 
							'".$totalamount_imo."', 
							'".$amount_refrigerado."', 
							'".$totalamount_refrigerado."', 
							'".$naviera."',
							'".$cooloder."',
							'".$_POST['validdesdefcl']."', 
							'".$_POST['validhastafcl']."', 
							".$_POST['utilityfcl'].")";
							$result = $con_u->prepare($sql);
							$result->execute();

							if($result == true){
								$r = array(
									'res' => 'inserted'
								);
							}else{
								$r = array(
									'res' => 'false'
								);
							}
						}
					}

					/************************** ENVIAR LA HOJA DE CÁLCULO A GUARDAR **************************/
					$file_name = $_FILES['spreadsheetfcl']['name'];
					$file_parts = pathinfo($file_name);
					$file_dirname = $file_parts['filename'];
					$date_current = date("d-m-Y");
					$file_extension = $file_parts['extension'];
					$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
					$file_origin = $_FILES['spreadsheetfcl']['tmp_name'];
					$file_folder = "../views/assets/spreadsheets/fcl/";


					if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
						$sql = "CALL sp_add_spreadsheet_rate_fcl(:spreadsheet)";
						$stm = $con_u->prepare($sql);
						$stm->bindValue(":spreadsheet", $file_name);
						$stm->execute();
						if($stm == true){
							$r = array(
								'res' => 'inserted'
							);
						}else{
							$r = array(
								'res' => 'false'
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
					$result = $con_u->prepare($sql);
					$result->execute();

					if($result == true){
						$r = array(
							'res' => 'inserted'
						);
					}else{
						$r = array(
							'res' => 'false'
						);
					}
				}else{
					$r = array(
						'res' => 'false'
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
					$amount_general = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$totalamount_general = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$amount_imo = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					$totalamount_imo = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$amount_refrigerado = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					$totalamount_refrigerado = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
					$naviera = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
					//$validez = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
					
					if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $container != "" || $totalamount_general != ""){

						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_fcl(
						country_origin,
						port_origin,
						port_destiny,
						container,
						monto_general,
						total_general,
						monto_imo,
						total_imo,
						monto_refrigerado,
						total_refrigerado,
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
						'".$amount_general."', 
						'".$totalamount_general."', 
						'".$amount_imo."', 
						'".$totalamount_imo."', 
						'".$amount_refrigerado."', 
						'".$totalamount_refrigerado."', 
						'".$naviera."',
						'".$cooloder."',
						'".$_POST['validdesdefcl']."', 
						'".$_POST['validhastafcl']."', 
						".$_POST['utilityfcl'].")";
						$result = $con_u->prepare($sql);
						$result->execute();

						if($result == true){
							$r = array(
								'res' => 'inserted'
							);
						}else{
							$r = array(
								'res' => 'false'
							);
						}
					}
				}

				/************************** ENVIAR LA HOJA DE CÁLCULO A GUARDAR **************************/
				$file_name = $_FILES['spreadsheetfcl']['name'];
				$file_parts = pathinfo($file_name);
				$file_dirname = $file_parts['filename'];
				$date_current = date("d-m-Y");
				$file_extension = $file_parts['extension'];
				$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
				$file_origin = $_FILES['spreadsheetfcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/fcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_fcl(:spreadsheet)";
					$stm = $con_u->prepare($sql);
					$stm->bindValue(":spreadsheet", $file_name);
					$stm->execute();
					if($stm == true){
						$r = array(
							'res' => 'inserted'
						);
					}else{
						$r = array(
							'res' => 'false'
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
				$result = $con_u->prepare($sql);
				$result->execute();

				if($result == true){
					$r = array(
						'res' => 'inserted'
					);
				}else{
					$r = array(
						'res' => 'false'
					);
				}
			}
		}else{			
			$r = array(
				'res' => 'false'
			);
		}
	}else{
		$r = array(
			'res' => 'false'
		);
	}
}else{
	$r = array(
		'res' => 'false'
	);
}
die(json_encode($r));