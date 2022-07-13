<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'connection.php';
$r = "";
if(isset($_FILES) && isset($_POST)){
	if($_FILES['spreadsheetlcl']['error'] == 0){
		if($_FILES['spreadsheetlcl']['type'] === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){

			$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
			$inputFileName = $_FILES['spreadsheetlcl']['tmp_name'];
			$archivoExcel = IOFactory::load($inputFileName);
			$archivoExcel->setActiveSheetIndex(0); // CARGAR LA HOJA DE CÁLCULO QUE QUEREMOS...
			$numberrows = $archivoExcel->setActiveSheetIndex(0)->getHighestRow(); // OBTENER EL NÚMERO DE FILAS DE LA HOJA ACTUAL...

			/************************** COMPROBAR SI EXISTE INFORMACIÓN EN LA TABLA **************************/
			require 'c_list_id_rate_lcl.php';
			require 'c_delete_rate_lcl.php';
			$rateidlcl = new List_Ids_rateLCL();
			$listids = $rateidlcl->list();

			if(!empty($listids)){
				/************************** ELIMINAR TODOS LOS REGISTRO Y SETEAR EL AUTO_INCREMENT=1; **************************/
				$del_lcl = new Delete_Rate_LCL();
				$del_all_lcl = $del_lcl->delete();

				if($del_all_lcl == "true"){

					//echo "No hay datos en la tabla";
					for ($i = 6; $i < $numberrows; $i++){
						$countryOrigin = $archivoExcel->getActiveSheet()->getCell('A'.$i)->getCalculatedValue();
						$portOrigin = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
						$portDestiny = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
						$max5cbm = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
						$total5cbm = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
						$max15cbm = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
						$total15cbm = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
						$amount_imo = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
						$total_imo = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
						$amount_refrigerado = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
						$total_refrigerado = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
						$frecuencies = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
						$ttaprox = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
						$cooloder = $archivoExcel->getActiveSheet()->getCell('N'.$i)->getCalculatedValue();
						
						if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $max5cbm != "" || $total5cbm != ""){

							/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
							$sql = "INSERT INTO tbl_rate_lcl(
							country_origin, 
							port_origin, 
							port_destiny, 
							hasta5cbm, 
							total5cbm, 
							hasta15cbm, 
							total15cbm, 
							amount_imo,
							total_imo,
							amount_refrigerado,
							total_refrigerado,
							frecuencia, 
							tt_aprox, 
							cooloder, 
							validdesde, 
							validhasta, 
							utility) 
							VALUES 
							('".$countryOrigin."', 
							'".$portOrigin."', 
							'".$portDestiny."',
							'".$max5cbm."', 
							'".$total5cbm."', 
							'".$max15cbm."', 
							'".$total15cbm."',
							'".$amount_imo."',
							'".$total_imo."',
							'".$amount_refrigerado."',
							'".$total_refrigerado."',
							'".$frecuencies."', 
							'".$ttaprox."', 
							'".$cooloder."', 
							'".$_POST['validdesdelcl']."', 
							'".$_POST['validhastalcl']."', 
							".$_POST['utilitylcl'].")";
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
					$file_name = $_FILES['spreadsheetlcl']['name'];
					$file_parts = pathinfo($file_name);
					$file_dirname = $file_parts['filename'];
					$date_current = date("d-m-Y");
					$file_extension = $file_parts['extension'];
					$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
					$file_origin = $_FILES['spreadsheetlcl']['tmp_name'];
					$file_folder = "../views/assets/spreadsheets/lcl/";

					if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
						$sql = "CALL sp_add_spreadsheet_rate_lcl(:spreadsheet)";
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
					$sql = "INSERT INTO tbl_utility_rate_lcl(
					utility,
					val_desde,
					val_hasta)
					VALUES 
					(".$_POST['utilitylcl'].",
					'".$_POST['validdesdelcl']."', 
					'".$_POST['validhastalcl']."')";
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
					$max5cbm = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$total5cbm = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$max15cbm = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$total15cbm = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					$amount_imo = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$total_imo = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					$amount_refrigerado = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
					$total_refrigerado = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
					$frecuencies = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
					$ttaprox = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('N'.$i)->getCalculatedValue();
					
					if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $max5cbm != "" || $total5cbm != ""){

						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_lcl(
						country_origin, 
						port_origin, 
						port_destiny, 
						hasta5cbm, 
						total5cbm, 
						hasta15cbm, 
						total15cbm, 
						amount_imo,
						total_imo,
						amount_refrigerado,
						total_refrigerado,
						frecuencia, 
						tt_aprox, 
						cooloder, 
						validdesde, 
						validhasta, 
						utility) 
						VALUES 
						('".$countryOrigin."', 
						'".$portOrigin."', 
						'".$portDestiny."',
						'".$max5cbm."', 
						'".$total5cbm."', 
						'".$max15cbm."', 
						'".$total15cbm."',
						'".$amount_imo."',
						'".$total_imo."',
						'".$amount_refrigerado."',
						'".$total_refrigerado."',
						'".$frecuencies."', 
						'".$ttaprox."', 
						'".$cooloder."', 
						'".$_POST['validdesdelcl']."', 
						'".$_POST['validhastalcl']."', 
						".$_POST['utilitylcl'].")";
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
				$file_name = $_FILES['spreadsheetlcl']['name'];
				$file_parts = pathinfo($file_name);
				$file_dirname = $file_parts['filename'];
				$date_current = date("d-m-Y");
				$file_extension = $file_parts['extension'];
				$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
				$file_origin = $_FILES['spreadsheetlcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_lcl(:spreadsheet)";
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
				$sql = "INSERT INTO tbl_utility_rate_lcl(
				utility,
				val_desde,
				val_hasta)
				VALUES 
				(".$_POST['utilitylcl'].",
				'".$_POST['validdesdelcl']."', 
				'".$_POST['validhastalcl']."')";
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