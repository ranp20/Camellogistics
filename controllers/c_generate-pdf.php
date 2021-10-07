<?php
	require_once '../vendor/autoload.php';
	use Dompdf\Dompdf;
	ob_start(); //CARGA EN MEMORIA UN ARCHIVO
	include(dirname('_FILE_').'/c_pdfquotation.php'); //INCLUIR LA PLANTILLA DE LA COTIZACIÓN, DEVOLVER DE LA RUTA PADRE, PARA COMPARTIR INFO.
	$html = ob_get_clean(); //CARGAR LO QUE CONTIENE EN ESTE ARCHIVO AL SIGUIENTE
	$dompdf = new Dompdf();//INSTANCIAR EL OBJETO PARA DOMPDF
	$options = $dompdf->getOptions(); //INTANCIAR A LAS OPCIONES DE CONFIGURACIÓN
	$dompdf->set_option("isRemoteEnabled", TRUE); //SETEAR LAS RUTAS REMOTAS CON VALOR VERDADERO
	$dompdf->loadHtml($html);//CARGA EL CONTENIDO HTML PARA PDF
	$dompdf->setPaper('letter','portrait'); //TAMAÑO O FORMATO DE HOJA - CARTA VERTICAL
	$dompdf->render(); //LEER EL HTML Y CONVERTIR A PDF
	$dompdf->stream('cotizacion_ga', array('Attachment' => true)); //VISUALIZAR EN EL NAVEGADOR
	exit(0);