<?php 

// print_r($_POST);
// exit();

require '../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
$inputFileName = 'TARIFARIO_CAMEL_LOGISTIC.xlsx';
$archivoExcel = IOFactory::load($inputFileName);
$sheetExcel = $archivoExcel->getSheet(0);

echo '<table border="1" cellpadding="8">';
foreach ($sheetExcel->getRowIterator(6) as $row){

	$countryOrigin = $sheetExcel->getCellByColumnAndRow(1, $row->getRowIndex());
	$portOrigin = $sheetExcel->getCellByColumnAndRow(2, $row->getRowIndex());
	$portDestiny = $sheetExcel->getCellByColumnAndRow(3, $row->getRowIndex());
	$max5cbm = $sheetExcel->getCellByColumnAndRow(4, $row->getRowIndex());
	$total5cbm = $sheetExcel->getCellByColumnAndRow(5, $row->getRowIndex());
	$max15cbm = $sheetExcel->getCellByColumnAndRow(6, $row->getRowIndex());
	$total15cbm = $sheetExcel->getCellByColumnAndRow(7, $row->getRowIndex());
	$frecuencies = $sheetExcel->getCellByColumnAndRow(8, $row->getRowIndex());
	$ttaprox = $sheetExcel->getCellByColumnAndRow(9, $row->getRowIndex());
	$cooloder = $sheetExcel->getCellByColumnAndRow(10, $row->getRowIndex());
	$valdesde = $sheetExcel->getCellByColumnAndRow(11, $row->getRowIndex());
	$valhasta = $sheetExcel->getCellByColumnAndRow(12, $row->getRowIndex());

	if($countryOrigin != "" || $portOrigin != "" || $portDestiny != "" || $max5cbm != "" || $total5cbm != ""){
		echo '<tr>
						<td>'.$countryOrigin.'</td>
						<td>'.$portOrigin.'</td>
						<td>'.$portDestiny.'</td>
						<td>'.$max5cbm->getCalculatedValue().'</td>
						<td>'.$total5cbm->getCalculatedValue().'</td>
						<td>'.$max15cbm->getCalculatedValue().'</td>
						<td>'.$total15cbm->getCalculatedValue().'</td>
						<td>'.$frecuencies->getCalculatedValue().'</td>
						<td>'.$ttaprox->getCalculatedValue().'</td>
						<td>'.$cooloder->getCalculatedValue().'</td>
						<td>'.$valdesde->getFormattedValue().'</td>
						<td>'.$valhasta->getFormattedValue().'</td>
					</tr>';
	}
}
echo '</table>';