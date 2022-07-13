<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'connection.php';
$r = "";
if(isset($_FILES) && isset($_POST)){
	if($_FILES['spreadsheetlcltransport']['error'] == 0){
		if($_FILES['spreadsheetlcltransport']['type'] === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){

			$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
			$inputFileName = $_FILES['spreadsheetlcltransport']['tmp_name'];
			$archivoExcel = IOFactory::load($inputFileName);
			$archivoExcel->setActiveSheetIndex(2); // CARGAR LA HOJA DE CÁLCULO QUE QUEREMOS...
			$numberrows = $archivoExcel->setActiveSheetIndex(2)->getHighestRow(); // OBTENER EL NÚMERO DE FILAS DE LA HOJA ACTUAL...

			/************************** COMPROBAR SI EXISTE INFORMACIÓN EN LA TABLA **************************/
			require 'c_list_id_rate_lcl_transport_general.php';
			$rateidlcl_general = new List_Ids_rateLCLTransport_general();
			$listids_general = $rateidlcl_general->list();
			require 'c_list_id_rate_lcl_transport_imo.php';
			$rateidlcl_imo = new List_Ids_rateLCLTransport_imo();
			$listids_imo = $rateidlcl_imo->list();
			require 'c_list_id_rate_lcl_transport_refrig.php';
			$rateidlcl_refri = new List_Ids_rateLCLTransport_refri();
			$listids_refri = $rateidlcl_refri->list();
			// ------------ LLAMAR A LAS CLASES DE ELIMINACIÓN
			require 'c_delete_rate_lcl_transport_general.php';
			require 'c_delete_rate_lcl_transport_imo.php';
			require 'c_delete_rate_lcl_transport_refrigerado.php';

			if(!empty($listids_general) || !empty($listids_imo) || !empty($listids_refri)){
				/************************** ELIMINAR TODOS LOS REGISTRO Y SETEAR EL AUTO_INCREMENT=1; **************************/
				$del_lcl_trans_general = new Delete_Rate_LCL_transport_general();
				$del_all_lcl_general = $del_lcl_trans_general->delete();
				$del_lcl_trans_imo = new Delete_Rate_LCL_transport_imo();
				$del_all_lcl_imo = $del_lcl_trans_imo->delete();
				$del_lcl_trans_refrigerado = new Delete_Rate_LCL_transport_refrigerado();
				$del_all_lcl_refrigerado = $del_lcl_trans_refrigerado->delete();

				if($del_all_lcl_general == "true" && $del_all_lcl_imo == "true" && $del_all_lcl_refrigerado == "true"){
					//echo "Aún no existen datos";
					for ($i = 3; $i < $numberrows; $i++){					
						$zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
						$de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
						$total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
						$de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
						$total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
						$de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
						$total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
						$de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
						$total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
						$de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
						$total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
						$de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
						$total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('N'.$i)->getCalculatedValue();
						$de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('O'.$i)->getCalculatedValue();
						$total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('P'.$i)->getCalculatedValue();
					
						if($de_1_a_1000 != "" || $total_1_a_1000 != "" || $de_1001_a_2000 != "" || $total_1001_a_2000 != ""){
							
							/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
							$sql = "INSERT INTO tbl_rate_lcl_transport_general(
							zona, 
							1_a_1000, 
							total_1_a_1000, 
							1001_a_2000, 
							total_1001_a_2000, 
							2001_a_3000, 
							total_2001_a_3000, 
							3001_a_4000, 
							total_3001_a_4000, 
							4001_a_5000, 
							total_4001_a_5000, 
							5001_a_7000, 
							total_5001_a_7000,
							20st_40nor,
							total_20st_40nor,
							utility) 
							VALUES 
							('".$zona."', 
							'".$de_1_a_1000."', 
							'".$total_1_a_1000."',
							'".$de_1001_a_2000."', 
							'".$total_1001_a_2000."', 
							'".$de_2001_a_3000."', 
							'".$total_2001_a_3000."',
							'".$de_3001_a_4000."', 
							'".$total_3001_a_4000."',
							'".$de_4001_a_5000."', 
							'".$total_4001_a_5000."',
							'".$de_5001_a_7000."', 
							'".$total_5001_a_7000."',
							'".$de_20st_40nor."', 
							'".$total_20st_40nor."',
							".$_POST['utilitylcltransport'].")";
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

					for ($i = 3; $i < $numberrows; $i++){
						$imo_zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
						$imo_de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('R'.$i)->getCalculatedValue();
						$imo_total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('S'.$i)->getCalculatedValue();
						$imo_de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('T'.$i)->getCalculatedValue();
						$imo_total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('U'.$i)->getCalculatedValue();
						$imo_de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('V'.$i)->getCalculatedValue();
						$imo_total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('W'.$i)->getCalculatedValue();
						$imo_de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('X'.$i)->getCalculatedValue();
						$imo_total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('Y'.$i)->getCalculatedValue();
						$imo_de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('Z'.$i)->getCalculatedValue();
						$imo_total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AA'.$i)->getCalculatedValue();
						$imo_de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AB'.$i)->getCalculatedValue();
						$imo_total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AC'.$i)->getCalculatedValue();
						$imo_de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AD'.$i)->getCalculatedValue();
						$imo_total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AE'.$i)->getCalculatedValue();
					
						if($imo_de_1_a_1000 != "" || $imo_total_1_a_1000 != "" || $imo_de_1001_a_2000 != "" || $imo_total_1001_a_2000 != ""){
							/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
							$sql = "INSERT INTO tbl_rate_lcl_transport_imo(
							zona, 
							1_a_1000, 
							total_1_a_1000, 
							1001_a_2000, 
							total_1001_a_2000, 
							2001_a_3000, 
							total_2001_a_3000, 
							3001_a_4000, 
							total_3001_a_4000, 
							4001_a_5000, 
							total_4001_a_5000, 
							5001_a_7000, 
							total_5001_a_7000,
							20st_40nor,
							total_20st_40nor,
							utility) 
							VALUES 
							('".$imo_zona."', 
							'".$imo_de_1_a_1000."', 
							'".$imo_total_1_a_1000."',
							'".$imo_de_1001_a_2000."', 
							'".$imo_total_1001_a_2000."', 
							'".$imo_de_2001_a_3000."', 
							'".$imo_total_2001_a_3000."',
							'".$imo_de_3001_a_4000."', 
							'".$imo_total_3001_a_4000."',
							'".$imo_de_4001_a_5000."', 
							'".$imo_total_4001_a_5000."',
							'".$imo_de_5001_a_7000."', 
							'".$imo_total_5001_a_7000."',
							'".$imo_de_20st_40nor."', 
							'".$imo_total_20st_40nor."',
							".$_POST['utilitylcltransport'].")";
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

					for ($i = 3; $i < $numberrows; $i++){
						$refr_zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
						$refr_de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('AG'.$i)->getCalculatedValue();
						$refr_total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('AH'.$i)->getCalculatedValue();
						$refr_de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('AI'.$i)->getCalculatedValue();
						$refr_total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('AJ'.$i)->getCalculatedValue();
						$refr_de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('AK'.$i)->getCalculatedValue();
						$refr_total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('AL'.$i)->getCalculatedValue();
						$refr_de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('AM'.$i)->getCalculatedValue();
						$refr_total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('AN'.$i)->getCalculatedValue();
						$refr_de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AO'.$i)->getCalculatedValue();
						$refr_total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AP'.$i)->getCalculatedValue();
						$refr_de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AQ'.$i)->getCalculatedValue();
						$refr_total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AR'.$i)->getCalculatedValue();
						$refr_de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AS'.$i)->getCalculatedValue();
						$refr_total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AT'.$i)->getCalculatedValue();
					
						if($refr_de_1_a_1000 != "" || $refr_total_1_a_1000 != "" || $refr_de_1001_a_2000 != "" || $refr_total_1001_a_2000 != ""){
							/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
							$sql = "INSERT INTO tbl_rate_lcl_transport_refrigerado(
							zona, 
							1_a_1000, 
							total_1_a_1000, 
							1001_a_2000, 
							total_1001_a_2000, 
							2001_a_3000, 
							total_2001_a_3000, 
							3001_a_4000, 
							total_3001_a_4000, 
							4001_a_5000, 
							total_4001_a_5000, 
							5001_a_7000, 
							total_5001_a_7000,
							20st_40nor,
							total_20st_40nor,
							utility) 
							VALUES 
							('".$refr_zona."', 
							'".$refr_de_1_a_1000."', 
							'".$refr_total_1_a_1000."',
							'".$refr_de_1001_a_2000."', 
							'".$refr_total_1001_a_2000."', 
							'".$refr_de_2001_a_3000."', 
							'".$refr_total_2001_a_3000."',
							'".$refr_de_3001_a_4000."', 
							'".$refr_total_3001_a_4000."',
							'".$refr_de_4001_a_5000."', 
							'".$refr_total_4001_a_5000."',
							'".$refr_de_5001_a_7000."', 
							'".$refr_total_5001_a_7000."',
							'".$refr_de_20st_40nor."', 
							'".$refr_total_20st_40nor."',
							".$_POST['utilitylcltransport'].")";
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
					$file_name = $_FILES['spreadsheetlcltransport']['name'];
					$file_parts = pathinfo($file_name);
					$file_dirname = $file_parts['filename'];
					$date_current = date("d-m-Y");
					$file_extension = $file_parts['extension'];
					$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
					$file_origin = $_FILES['spreadsheetlcltransport']['tmp_name'];
					$file_folder = "../views/assets/spreadsheets/lcl_transporte/";

					if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
						$sql = "CALL sp_add_spreadsheet_rate_lcl_transport(:spreadsheet)";
						$stm = $con_u->prepare($sql);
						$stm->bindValue(":spreadsheet", $file_lowercase);
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
					$sql = "INSERT INTO tbl_utility_rate_lcl_transport(utility)	VALUES (".$_POST['utilitylcltransport'].")";
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
			}else{
				//echo "Aún no existen datos";
				for ($i = 3; $i < $numberrows; $i++){					
					$zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('C'.$i)->getCalculatedValue();
					$total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('D'.$i)->getCalculatedValue();
					$de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('E'.$i)->getCalculatedValue();
					$total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('F'.$i)->getCalculatedValue();
					$de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('G'.$i)->getCalculatedValue();
					$total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('H'.$i)->getCalculatedValue();
					$de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('I'.$i)->getCalculatedValue();
					$total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('J'.$i)->getCalculatedValue();
					$de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('K'.$i)->getCalculatedValue();
					$total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('L'.$i)->getCalculatedValue();
					$de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('M'.$i)->getCalculatedValue();
					$total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('N'.$i)->getCalculatedValue();
					$de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('O'.$i)->getCalculatedValue();
					$total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('P'.$i)->getCalculatedValue();
				
					if($de_1_a_1000 != "" || $total_1_a_1000 != "" || $de_1001_a_2000 != "" || $total_1001_a_2000 != ""){
						
						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_lcl_transport_general(
						zona, 
						1_a_1000, 
						total_1_a_1000, 
						1001_a_2000, 
						total_1001_a_2000, 
						2001_a_3000, 
						total_2001_a_3000, 
						3001_a_4000, 
						total_3001_a_4000, 
						4001_a_5000, 
						total_4001_a_5000, 
						5001_a_7000, 
						total_5001_a_7000,
						20st_40nor,
						total_20st_40nor,
						utility) 
						VALUES 
						('".$zona."', 
						'".$de_1_a_1000."', 
						'".$total_1_a_1000."',
						'".$de_1001_a_2000."', 
						'".$total_1001_a_2000."', 
						'".$de_2001_a_3000."', 
						'".$total_2001_a_3000."',
						'".$de_3001_a_4000."', 
						'".$total_3001_a_4000."',
						'".$de_4001_a_5000."', 
						'".$total_4001_a_5000."',
						'".$de_5001_a_7000."', 
						'".$total_5001_a_7000."',
						'".$de_20st_40nor."', 
						'".$total_20st_40nor."',
						".$_POST['utilitylcltransport'].")";
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

				for ($i = 3; $i < $numberrows; $i++){
					$imo_zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$imo_de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('R'.$i)->getCalculatedValue();
					$imo_total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('S'.$i)->getCalculatedValue();
					$imo_de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('T'.$i)->getCalculatedValue();
					$imo_total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('U'.$i)->getCalculatedValue();
					$imo_de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('V'.$i)->getCalculatedValue();
					$imo_total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('W'.$i)->getCalculatedValue();
					$imo_de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('X'.$i)->getCalculatedValue();
					$imo_total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('Y'.$i)->getCalculatedValue();
					$imo_de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('Z'.$i)->getCalculatedValue();
					$imo_total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AA'.$i)->getCalculatedValue();
					$imo_de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AB'.$i)->getCalculatedValue();
					$imo_total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AC'.$i)->getCalculatedValue();
					$imo_de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AD'.$i)->getCalculatedValue();
					$imo_total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AE'.$i)->getCalculatedValue();
				
					if($imo_de_1_a_1000 != "" || $imo_total_1_a_1000 != "" || $imo_de_1001_a_2000 != "" || $imo_total_1001_a_2000 != ""){
						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_lcl_transport_imo(
						zona, 
						1_a_1000, 
						total_1_a_1000, 
						1001_a_2000, 
						total_1001_a_2000, 
						2001_a_3000, 
						total_2001_a_3000, 
						3001_a_4000, 
						total_3001_a_4000, 
						4001_a_5000, 
						total_4001_a_5000, 
						5001_a_7000, 
						total_5001_a_7000,
						20st_40nor,
						total_20st_40nor,
						utility) 
						VALUES 
						('".$imo_zona."', 
						'".$imo_de_1_a_1000."', 
						'".$imo_total_1_a_1000."',
						'".$imo_de_1001_a_2000."', 
						'".$imo_total_1001_a_2000."', 
						'".$imo_de_2001_a_3000."', 
						'".$imo_total_2001_a_3000."',
						'".$imo_de_3001_a_4000."', 
						'".$imo_total_3001_a_4000."',
						'".$imo_de_4001_a_5000."', 
						'".$imo_total_4001_a_5000."',
						'".$imo_de_5001_a_7000."', 
						'".$imo_total_5001_a_7000."',
						'".$imo_de_20st_40nor."', 
						'".$imo_total_20st_40nor."',
						".$_POST['utilitylcltransport'].")";
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

				for ($i = 3; $i < $numberrows; $i++){
					$refr_zona = $archivoExcel->getActiveSheet()->getCell('B'.$i)->getCalculatedValue();
					$refr_de_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('AG'.$i)->getCalculatedValue();
					$refr_total_1_a_1000 = $archivoExcel->getActiveSheet()->getCell('AH'.$i)->getCalculatedValue();
					$refr_de_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('AI'.$i)->getCalculatedValue();
					$refr_total_1001_a_2000 = $archivoExcel->getActiveSheet()->getCell('AJ'.$i)->getCalculatedValue();
					$refr_de_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('AK'.$i)->getCalculatedValue();
					$refr_total_2001_a_3000 = $archivoExcel->getActiveSheet()->getCell('AL'.$i)->getCalculatedValue();
					$refr_de_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('AM'.$i)->getCalculatedValue();
					$refr_total_3001_a_4000 = $archivoExcel->getActiveSheet()->getCell('AN'.$i)->getCalculatedValue();
					$refr_de_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AO'.$i)->getCalculatedValue();
					$refr_total_4001_a_5000 = $archivoExcel->getActiveSheet()->getCell('AP'.$i)->getCalculatedValue();
					$refr_de_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AQ'.$i)->getCalculatedValue();
					$refr_total_5001_a_7000 = $archivoExcel->getActiveSheet()->getCell('AR'.$i)->getCalculatedValue();
					$refr_de_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AS'.$i)->getCalculatedValue();
					$refr_total_20st_40nor = $archivoExcel->getActiveSheet()->getCell('AT'.$i)->getCalculatedValue();
				
					if($refr_de_1_a_1000 != "" || $refr_total_1_a_1000 != "" || $refr_de_1001_a_2000 != "" || $refr_total_1001_a_2000 != ""){
						/************************** INSERTAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
						$sql = "INSERT INTO tbl_rate_lcl_transport_refrigerado(
						zona, 
						1_a_1000, 
						total_1_a_1000, 
						1001_a_2000, 
						total_1001_a_2000, 
						2001_a_3000, 
						total_2001_a_3000, 
						3001_a_4000, 
						total_3001_a_4000, 
						4001_a_5000, 
						total_4001_a_5000, 
						5001_a_7000, 
						total_5001_a_7000,
						20st_40nor,
						total_20st_40nor,
						utility) 
						VALUES 
						('".$refr_zona."', 
						'".$refr_de_1_a_1000."', 
						'".$refr_total_1_a_1000."',
						'".$refr_de_1001_a_2000."', 
						'".$refr_total_1001_a_2000."', 
						'".$refr_de_2001_a_3000."', 
						'".$refr_total_2001_a_3000."',
						'".$refr_de_3001_a_4000."', 
						'".$refr_total_3001_a_4000."',
						'".$refr_de_4001_a_5000."', 
						'".$refr_total_4001_a_5000."',
						'".$refr_de_5001_a_7000."', 
						'".$refr_total_5001_a_7000."',
						'".$refr_de_20st_40nor."', 
						'".$refr_total_20st_40nor."',
						".$_POST['utilitylcltransport'].")";
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
				$file_name = $_FILES['spreadsheetlcltransport']['name'];
				$file_parts = pathinfo($file_name);
				$file_dirname = $file_parts['filename'];
				$date_current = date("d-m-Y");
				$file_extension = $file_parts['extension'];
				$file_lowercase = strtolower($file_dirname) . "_" . $date_current . "." . $file_extension;
				$file_origin = $_FILES['spreadsheetlcltransport']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl_transporte/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_lcl_transport(:spreadsheet)";
					$stm = $con_u->prepare($sql);
					$stm->bindValue(":spreadsheet", $file_lowercase);
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
				$sql = "INSERT INTO tbl_utility_rate_lcl_transport(utility)	VALUES (".$_POST['utilitylcltransport'].")";
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