<?php 
	require_once '../vendor/autoload.php';

	use Dompdf\Dompdf;
	//use Dompdf\Options;

	ob_start(); //CARGA EN MEMORIA UN ARCHIVO
	include(dirname('_FILE_').'/c_pdfquotation.php');
	$html = ob_get_clean(); //CARGAR LO QUE CONTIENE EN ESTE ARCHIVO AL SIGUIENTE

	//$basePath = "/views/assets/img/logos/";

	$dompdf = new Dompdf();//INSTANCIAR EL OBJETO PARA DOMPDF
	$options = $dompdf->getOptions();
	//$options->setIsRemoteEnabled(true);
	//$dompdf->setBasePath()->setBasePath($basePath);
	$dompdf->set_option("isRemoteEnabled", TRUE);
	$dompdf->loadHtml($html);//CARGA EL CONTENIDO HTML PARA PDF
	$dompdf->setPaper('letter','portrait'); //TAMAÑO O FORMATO DE HOJA
	$dompdf->render(); //LEER EL HTML Y CONVERTIR A PDF
	$dompdf->stream('cotizacion_ga', array('Attachment'=>0)); //VISUALIZAR EN EL NAVEGADOR
	exit(0);