<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'conexion.php';

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
			$rateidlcl = new List_Ids_rateLCL();
			$listids = $rateidlcl->list();

			if(!empty($listids)){

				$ilistid = 0;
				$arrupdated = [];

				for ($i = 6; $i < $numberrows; $i++){
					$countryOrigin = $archivoExcel->getActiveSheet()->getCell('A'.$i)->getCalculatedValue();
					$portOrigin = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$portDestiny = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
					$max5cbm = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$total5cbm = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$max15cbm = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$total15cbm = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					$frecuencies = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$ttaprox = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
				
					if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $max5cbm != "" || $total5cbm != ""){
						
						array_push($arrupdated, 
						[$countryOrigin, $portOrigin,	$portDestiny,	$max5cbm,	$total5cbm,	$max15cbm, $total15cbm, $frecuencies, $ttaprox, $cooloder]);

					}
				}

				/************************** RECORRER LOS IDs Y ACTUALIZAR LOS REGISTROS PREVIOS **************************/
				while ($ilistid < count($arrupdated)) {
					/************************** ACTUALIZAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
					$sql = "UPDATE tbl_rate_lcl SET
					country_origin = '".$arrupdated[$ilistid][0]."', 
					port_origin = '".$arrupdated[$ilistid][1]."', 
					port_destiny = '".$arrupdated[$ilistid][2]."', 
					hasta5cbm = '".$arrupdated[$ilistid][3]."', 
					total5cbm = '".$arrupdated[$ilistid][4]."', 
					hasta15cbm = '".$arrupdated[$ilistid][5]."', 
					total15cbm = '".$arrupdated[$ilistid][6]."', 
					frecuencia = '".$arrupdated[$ilistid][7]."', 
					tt_aprox = '".$arrupdated[$ilistid][8]."', 
					cooloder = '".$arrupdated[$ilistid][9]."', 
					validdesde = '".$_POST['validdesdelcl']."', 
					validhasta = '".$_POST['validhastalcl']."',
					utility = ".$_POST['utilitylcl']." WHERE id = ".$listids[$ilistid]['id']."";
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
				$file_name = $_FILES['spreadsheetlcl']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetlcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL tbl_add_spreadsheet_rate_lcl(:spreadsheet)";
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
				$sql = "INSERT INTO tbl_utility_rate_lcl(
				utility,
				val_desde,
				val_hasta)
				VALUES 
				(".$_POST['utilitylcl'].",
				'".$_POST['validdesdelcl']."', 
				'".$_POST['validhastalcl']."')";
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
					$max5cbm = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$total5cbm = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$max15cbm = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$total15cbm = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					$frecuencies = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$ttaprox = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					$cooloder = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
					
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
						'".$frecuencies."', 
						'".$ttaprox."', 
						'".$cooloder."', 
						'".$_POST['validdesdelcl']."', 
						'".$_POST['validhastalcl']."', 
						".$_POST['utilitylcl'].")";
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
				$file_name = $_FILES['spreadsheetlcl']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetlcl']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL tbl_add_spreadsheet_rate_lcl(:spreadsheet)";
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
				$sql = "INSERT INTO tbl_utility_rate_lcl(
				utility,
				val_desde,
				val_hasta)
				VALUES 
				(".$_POST['utilitylcl'].",
				'".$_POST['validdesdelcl']."', 
				'".$_POST['validhastalcl']."')";
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