<?php
require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

/************************** ABRIENDO CONEXIÓN SECUNDARIA - USANDO MYSQLI **************************/
require_once 'connection.php';

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

			if(!empty($listids_general) || !empty($listids_imo) || !empty($listids_refri)){
				$ilistid_general = 0;
				$arrupdated_general = [];
				$ilistid_imo = 0;
				$arrupdated_imo = [];
				$ilistid_refrigerado = 0;
				$arrupdated_refrigerado = [];

				/************************** RECORRER - VALORES DE CARGA GENERAL **************************/
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
						
						array_push($arrupdated_general, 
											[
												$zona, 
												$de_1_a_1000,	
												$total_1_a_1000,	
												$de_1001_a_2000,	
												$total_1001_a_2000,	
												$de_2001_a_3000, 
												$total_2001_a_3000,
												$de_3001_a_4000,
												$total_3001_a_4000,
												$de_4001_a_5000,
												$total_4001_a_5000,
												$de_5001_a_7000,
												$total_5001_a_7000, 
												$de_20st_40nor,
												$total_20st_40nor
											]);

					}
				}
				/************************** RECORRER LOS IDs Y ACTUALIZAR LOS REGISTROS PREVIOS **************************/
				while ($ilistid_general < count($arrupdated_general)) {
					/************************** ACTUALIZAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
					$sql = "UPDATE tbl_rate_lcl_transport_general SET
					zona = '".$arrupdated_general[$ilistid_general][0]."', 
					1_a_1000 = '".$arrupdated_general[$ilistid_general][1]."', 
					total_1_a_1000 = '".$arrupdated_general[$ilistid_general][2]."', 
					1001_a_2000 = '".$arrupdated_general[$ilistid_general][3]."', 
					total_1001_a_2000 = '".$arrupdated_general[$ilistid_general][4]."', 
					2001_a_3000 = '".$arrupdated_general[$ilistid_general][5]."', 
					total_2001_a_3000 = '".$arrupdated_general[$ilistid_general][6]."', 
					3001_a_4000 = '".$arrupdated_general[$ilistid_general][7]."', 
					total_3001_a_4000 = '".$arrupdated_general[$ilistid_general][8]."', 
					4001_a_5000 = '".$arrupdated_general[$ilistid_general][9]."', 
					total_4001_a_5000 = '".$arrupdated_general[$ilistid_general][10]."', 
					5001_a_7000 = '".$arrupdated_general[$ilistid_general][11]."', 
					total_5001_a_7000 = '".$arrupdated_general[$ilistid_general][12]."', 
					20st_40nor = '".$arrupdated_general[$ilistid_general][13]."', 
					total_20st_40nor = '".$arrupdated_general[$ilistid_general][14]."', 
					utility = ".$_POST['utilitylcltransport']." WHERE id = ".$listids_general[$ilistid_general]['id']."";
					$result = $con->prepare($sql);
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
					$ilistid_general++;
				}

				/************************** RECORRER - VALORES DE CARGA IMO **************************/
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
						
						array_push($arrupdated_imo, 
											[
												$imo_zona, 
												$imo_de_1_a_1000,	
												$imo_total_1_a_1000,	
												$imo_de_1001_a_2000,	
												$imo_total_1001_a_2000,	
												$imo_de_2001_a_3000, 
												$imo_total_2001_a_3000,
												$imo_de_3001_a_4000,
												$imo_total_3001_a_4000,
												$imo_de_4001_a_5000,
												$imo_total_4001_a_5000,
												$imo_de_5001_a_7000,
												$imo_total_5001_a_7000, 
												$imo_de_20st_40nor,
												$imo_total_20st_40nor
											]);

					}
				}
				/************************** RECORRER LOS IDs Y ACTUALIZAR LOS REGISTROS PREVIOS **************************/
				while ($ilistid_imo < count($arrupdated_imo)) {
					/************************** ACTUALIZAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
					$sql = "UPDATE tbl_rate_lcl_transport_imo SET
					zona = '".$arrupdated_imo[$ilistid_imo][0]."', 
					1_a_1000 = '".$arrupdated_imo[$ilistid_imo][1]."', 
					total_1_a_1000 = '".$arrupdated_imo[$ilistid_imo][2]."', 
					1001_a_2000 = '".$arrupdated_imo[$ilistid_imo][3]."', 
					total_1001_a_2000 = '".$arrupdated_imo[$ilistid_imo][4]."', 
					2001_a_3000 = '".$arrupdated_imo[$ilistid_imo][5]."', 
					total_2001_a_3000 = '".$arrupdated_imo[$ilistid_imo][6]."', 
					3001_a_4000 = '".$arrupdated_imo[$ilistid_imo][7]."', 
					total_3001_a_4000 = '".$arrupdated_imo[$ilistid_imo][8]."', 
					4001_a_5000 = '".$arrupdated_imo[$ilistid_imo][9]."', 
					total_4001_a_5000 = '".$arrupdated_imo[$ilistid_imo][10]."', 
					5001_a_7000 = '".$arrupdated_imo[$ilistid_imo][11]."', 
					total_5001_a_7000 = '".$arrupdated_imo[$ilistid_imo][12]."', 
					20st_40nor = '".$arrupdated_imo[$ilistid_imo][13]."', 
					total_20st_40nor = '".$arrupdated_imo[$ilistid_imo][14]."', 
					utility = ".$_POST['utilitylcltransport']." WHERE id = ".$listids_imo[$ilistid_imo]['id']."";
					$result = $con->prepare($sql);
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
					$ilistid_imo++;
				}

				/************************** RECORRER - VALORES DE CARGA REFRIGERADO **************************/
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
						
						array_push($arrupdated_refrigerado, 
											[
												$refr_zona, 
												$refr_de_1_a_1000,	
												$refr_total_1_a_1000,	
												$refr_de_1001_a_2000,	
												$refr_total_1001_a_2000,	
												$refr_de_2001_a_3000, 
												$refr_total_2001_a_3000,
												$refr_de_3001_a_4000,
												$refr_total_3001_a_4000,
												$refr_de_4001_a_5000,
												$refr_total_4001_a_5000,
												$refr_de_5001_a_7000,
												$refr_total_5001_a_7000, 
												$refr_de_20st_40nor,
												$refr_total_20st_40nor
											]);

					}
				}
				/************************** RECORRER LOS IDs Y ACTUALIZAR LOS REGISTROS PREVIOS **************************/
				while ($ilistid_refrigerado < count($arrupdated_refrigerado)) {
					/************************** ACTUALIZAR LA INFORMACIÓN DE LA HOJA DE CÁLCULO **************************/
					$sql = "UPDATE tbl_rate_lcl_transport_refrigerado SET
					zona = '".$arrupdated_refrigerado[$ilistid_refrigerado][0]."', 
					1_a_1000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][1]."', 
					total_1_a_1000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][2]."', 
					1001_a_2000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][3]."', 
					total_1001_a_2000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][4]."', 
					2001_a_3000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][5]."', 
					total_2001_a_3000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][6]."', 
					3001_a_4000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][7]."', 
					total_3001_a_4000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][8]."', 
					4001_a_5000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][9]."', 
					total_4001_a_5000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][10]."', 
					5001_a_7000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][11]."', 
					total_5001_a_7000 = '".$arrupdated_refrigerado[$ilistid_refrigerado][12]."', 
					20st_40nor = '".$arrupdated_refrigerado[$ilistid_refrigerado][13]."', 
					total_20st_40nor = '".$arrupdated_refrigerado[$ilistid_refrigerado][14]."', 
					utility = ".$_POST['utilitylcltransport']." WHERE id = ".$listids_refri[$ilistid_refrigerado]['id']."";
					$result = $con->prepare($sql);
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
					$ilistid_refrigerado++;
				}

				//************************* ENVIAR LA HOJA DE CÁLCULO A GUARDAR *************************
				$file_name = $_FILES['spreadsheetlcltransport']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetlcltransport']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl_transporte/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_lcl_transport(:spreadsheet)";
					$stm = $con->prepare($sql);
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
				$sql = "INSERT INTO tbl_utility_rate_lcl_transport(utility)	VALUES (".$_POST['utilitylcltransport'].")";
				$result = $con->prepare($sql);
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
						$result = $con->prepare($sql);
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
						$result = $con->prepare($sql);
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
						$result = $con->prepare($sql);
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
				$file_name = $_FILES['spreadsheetlcltransport']['name'];
				$file_lowercase = strtolower($file_name);
				$file_origin = $_FILES['spreadsheetlcltransport']['tmp_name'];
				$file_folder = "../views/assets/spreadsheets/lcl_transporte/";

				if(move_uploaded_file($file_origin, $file_folder . $file_lowercase)){
					$sql = "CALL sp_add_spreadsheet_rate_lcl_transport(:spreadsheet)";
					$stm = $con->prepare($sql);
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
				$sql = "INSERT INTO tbl_utility_rate_lcl_transport(utility)	VALUES (".$_POST['utilitylcltransport'].")";
				$result = $con->prepare($sql);
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