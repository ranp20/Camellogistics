<?php
// OJO: El método con AJAX de Jquery, no funciona y/o no devuelve el PDF si dentro del HTML se pasa un array...
require_once '../../vendor/autoload.php';
use Dompdf\Dompdf;
ob_start(); //CARGA EN MEMORIA UN ARCHIVO
//include(dirname('_FILE_').'/c_pdfquotation.php'); //INCLUIR LA PLANTILLA DE LA COTIZACIÓN, DEVOLVER DE LA RUTA PADRE, PARA COMPARTIR INFO.
require_once '../../models/quotation-user.php';
$quotebyidcode = new Quotation_user();
$listbyidcode = $quotebyidcode->get_by_idcodegenrand($_POST['id_codegenrand']);
function cambiaf_mysql($date){
  $originalDate = $date;
	$newDate = date("d/m/Y", strtotime($originalDate));
	return $newDate;
}
function addTwoDecimals($number){
	$output_final = "";
	if($number != "0" || $number != 0){
		$output_num = explode(".", $number);
		if(!isset($output_num[1]) || $output_num[1] == "undefined" || $output_num[1] == ""){
			$output_final = number_format($number).".00";
		}else	if(isset($output_num[1]) && strlen($output_num[1]) < 2){
			$output_final = number_format($output_num[0]).".".$output_num[1]."0";
		}else{
			$output_final = number_format($output_num[0]).".".$output_num[1];
		}
	}else{
		$output_final = $number;
	}
	return $output_final;
}
function addTwoDecimalsOrGuion($number){
	$output_final = "";
	if($number != "0" || $number != 0){
		$output_num = explode(".", $number);
		if(!isset($output_num[1]) || $output_num[1] == "undefined" || $output_num[1] == ""){
			$output_final = number_format($number).".00";
		}else	if(isset($output_num[1]) && strlen($output_num[1]) < 2){
			$output_final = number_format($output_num[0]).".".$output_num[1]."0";
		}else{
			$output_final = number_format($output_num[0]).".".$output_num[1];
		}
	}else{
		$output_final = "-";
	}
	return $output_final;
}
function maxcharacters($string, $maxletters){
	$output_strg = "";
	if(strlen($string) > $maxletters){
		$output_strg = substr($string, 0, $maxletters) . "...";
	}else{
		$output_strg = $string;
	}
	return $output_strg;
}
//VARIABLES A USAR EN EL MOSTRADO DE INFORMACIÓN DENTRO DEL PDF
$creation_date = $listbyidcode[0]['creation_date'];
$u_nameenterprise = $listbyidcode[0]['u_enterprise'];
$u_ndocument = $listbyidcode[0]['u_n_document'];
$u_telephone = $listbyidcode[0]['u_telephone'];
$u_contain = $listbyidcode[0]['u_contain'];
$f_origen = strtoupper($listbyidcode[0]['f_origen']);
$f_destiny = strtoupper($listbyidcode[0]['f_destiny']);
$f_typetransendinitid = "";
if($listbyidcode[0]['f_typetransendinitid'] == "S-ADU"){
	$f_typetransendinitid = "ADUANAS";
}else if($listbyidcode[0]['f_typetransendinitid'] == "T-MAR"){
	if($listbyidcode[0]['f_optgenfquotation'] == "y-moreOpts"){
		$f_typetransendinitid = "Flete internacional";
	}else{
		$f_typetransendinitid = "FLETE INTERNACIONAL";
	}
}else{
	$f_typetransendinitid = "FLETE INTERNACIONAL";
}
$f_type_operation = strtoupper($listbyidcode[0]['f_type_service']);
$f_typecontainer = $listbyidcode[0]['f_type_container'];
$f_optgenfquotation = $listbyidcode[0]['f_optgenfquotation'];
$f_selinsuremerch = $listbyidcode[0]['f_selinsuremerch'];
$f_desc_weightvolumen = $listbyidcode[0]['f_desc_weightvolumen'];
$f_weight_volume = ($listbyidcode[0]['f_weight_volume'] == "No especificado" || $listbyidcode[0]['f_weight_volume'] == "") ? 0 : $listbyidcode[0]['f_weight_volume'];
$f_transit_location = $listbyidcode[0]['f_transit_location'];
$f_time_transit = $listbyidcode[0]['f_time_transit'];
$f_fob = $listbyidcode[0]['f_fob'];
$f_flete = $listbyidcode[0]['f_flete'];
$f_insurance = $listbyidcode[0]['f_insurance'];
$f_totalinsurance = $listbyidcode[0]['f_totalinsurance'];
$f_cif = $listbyidcode[0]['f_cif'];
// VALORES PARA CALCULAR LOS IMPUESTOS...
$f_v_IGV = $listbyidcode[0]['f_v_IGV'];
$f_v_IPM = $listbyidcode[0]['f_v_IPM'];
$f_v_percepcion = $listbyidcode[0]['f_v_percepcion'];
$f_v_ad_valoren = $listbyidcode[0]['f_v_ad_valoren'];
$f_v_impuesto_selectivo = $listbyidcode[0]['f_v_impuesto_selectivo'];
$f_v_antidumping = $listbyidcode[0]['f_v_antidumping'];
// VALORES CALCULADOS DE IMPUESTOS
$f_IGV = $listbyidcode[0]['f_IGV'];
$f_IPM = $listbyidcode[0]['f_IPM'];
// VALORES DE SERVICIOS - FCL/LCL
$f_emision_BL = $listbyidcode[0]['f_emision_BL'];
$f_visto_bueno = $listbyidcode[0]['f_visto_bueno'];
$f_almacen_referencial = $listbyidcode[0]['f_almacen_referencial'];
$f_gremios_maritimos = $listbyidcode[0]['f_gremios_maritimos'];
$f_THC = $listbyidcode[0]['f_THC'];
$f_devolucion_contenedores = $listbyidcode[0]['f_devolucion_contenedores'];
$f_handling = $listbyidcode[0]['f_handling'];
$f_descarga = $listbyidcode[0]['f_descarga'];
$f_comision_agencia = $listbyidcode[0]['f_comision_agencia'];
$f_gastos_operativos = $listbyidcode[0]['f_gastos_operativos'];
// VALORES IMPUESTOS
$f_percepcion = $listbyidcode[0]['f_percepcion'];
$f_ad_valoren = $listbyidcode[0]['f_ad_valoren'];
$f_impuesto_selectivo = $listbyidcode[0]['f_impuesto_selectivo'];
$f_antidumping = $listbyidcode[0]['f_antidumping'];
$f_totalimpuestos = $listbyidcode[0]['f_totalimpuestos'];
// VALORES CALCULADOS DE SERVICIOS
$f_transporte_interno = $listbyidcode[0]['f_transporte_interno'];
$f_fichatecnicaycertconform = $listbyidcode[0]['f_fichatecnicaycertconform'];
$f_totalinsurance = $listbyidcode[0]['f_totalinsurance'];
$f_total_services = $listbyidcode[0]['f_totalservices'];
$f_totalservicesIGV18 = $listbyidcode[0]['f_totalservicesIGV18'];
$f_totalwithIGV = $listbyidcode[0]['f_totalwithIGV'];
//NOMBRE DE LA COTIZACIÓN
$name_quotation = "Presupuesto-".$_POST['code_quote']."-".$f_typecontainer;
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title><?php echo $name_quotation; ?></title>
</head>
<style>
  .pt-02{padding-top:.2rem!important}.pt-05{padding-top:.5rem!important}.pt-06{padding-top:.6rem!important}.pt-07{padding-top:.7rem!important}.h-15{height:15px!important}.h-18{height:18px!important}.h-28{height:28px!important}.h-25{height:25px!important}.h-32{height:32px!important}.text-red{color:red!important}.text-fw-bold{font-weight:700}#cont_quotationpdf{max-width:726px;width:auto;max-height:1123px;margin-left:auto;margin-right:auto;background-color:#fff}#marc_det_fillcomplete{width:auto;padding:0;margin:0}#four_sectionlist{margin:4px 0 0 0}#five_sectionlist{margin:4px 0 0 0}#title_quoteservices{margin:5px 0 10px 0;border:0 red dashed;height:15px}#title_code_cot{height:38px;line-height:1.5}#prefix_money_serv_camel2{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;min-width:102px;max-width:110px;width:110px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#title_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:140px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#title_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:192px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#cnt_img_money_camel1{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel1 img{max-width:22px;height:22px}#cnt_img_money_camel2{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel2 img{max-width:22px;height:22px}#title_serv_first_uniquecamel{font-family:Sans-serif;font-weight:400;font-size:9pt;width:500px;height:30px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:10px 0 0 0}#ammount_serv_first_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:140px;height:30px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:10px 0 0 0;text-align:right}#marc_fill1{display:block;max-width:794px;width:100%;height:auto;position:relative;border:0 #fff dashed;margin:0 0 5px 0}.marc_fill{display:block;max-width:794px;width:100%;height:auto;border:0 #fff dashed;position:relative;margin:5px 0 0 0}#marc_fill2{font-family:Sans-serif;font-weight:400;font-size:8pt;display:block;max-width:794px;width:auto;height:auto;position:relative;border:0 #fff dashed;padding:6px 0 0 0;color:#757171}.c_quotationpdf__cTop--cLogo{display:inline-block;max-width:160px;border:0 #fff dashed;max-height:74px;height:74px;vertical-align:top}#logo{max-width:160px;width:auto;height:auto;display:inline-block;position:relative;margin:0}#marc_cab{max-width:350px;width:100%;max-height:74px;height:74px;font-family:Sans-serif;display:inline-block;position:relative;vertical-align:top;margin:0 0 0 208px;padding:5px 0 0 0}#marc_cab_izq{font-family:Sans-serif;font-weight:700;font-size:14pt;width:155px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_cab_der{font-family:Sans-serif;font-weight:700;font-size:14pt;width:186px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top;text-align:center}#corr_cot{font-family:Sans-serif;font-weight:700;font-size:19pt;width:auto;height:38px;line-height:1.2;border:0 red dashed;color:#07376e;display:block;position:relative;margin:0}#fech_cot{font-family:Sans-serif;font-weight:700;font-size:11pt;width:auto;height:auto;border:0 red dashed;color:#757171;display:block;position:relative;margin:0;padding:5px 0 0 0}#marc_dat1{font-family:Sans-serif;font-weight:700;font-size:9pt;width:429px;height:50px;border:1px #07376e solid;border-radius:8px;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 14px}#marc_dat2{font-family:Sans-serif;font-weight:700;font-size:9pt;width:250px;height:50px;border:1px #07376e solid;border-radius:8px;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 5px}#marc_dat1_izq{width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat11_izq{width:70px;height:30px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat2_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der1{width:161px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der{width:190px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt1_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat1_derr1{width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_demp_datt1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc2_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp2_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3{font-family:Sans-serif;font-weight:700;font-size:9pt;width:695px;height:80px;border:1px #07376e solid;border-radius:10px;display:inline-block;position:relative;margin:0;padding:1px 14px}#marc_dat3_izq{width:125px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_dpt3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp3_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc3_dat2{width:53px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_der{width:262px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_derr1{width:55px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_cent1{width:45px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_por3_dat1{width:45px;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_derr11{width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_tpor3_dat1{width:auto;height:15px;font-weight:400;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_dollar{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_fillcomplete{width:100%;height:auto;font-family:Sans-serif;font-weight:400;text-align:center;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_imp{width:330px;height:450px;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px;vertical-align:top}#marc_det_er_log_unique{width:auto;height:63px;font-family:Sans-serif;font-weight:400;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_unique_log{width:703px;height:362px;font-family:Sans-serif;font-weight:400;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px 5px 14px 14px}#marc_det_inf1_log_unique{width:703px;height:40px;font-family:Sans-serif;font-weight:400;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:4px 0 0 0;padding:8px 8px 8px 14px}#cnt_img_money_uniquecamel{max-width:28px;width:28px;height:28px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0;margin:0 .5rem 0 0}#cnt_img_money_uniquecamel img{max-width:28px;height:28px}#marc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_imp1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_porc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:40px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_porc_det_imp1{width:40px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_imp1{width:40px;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_usd_tot_imp1{width:auto;height:15px;border:0 red dashed;text-align:right;color:#757171;display:block;position:relative;margin:0}#marc_det_tot_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:115px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_uniqueserv{font-family:Sans-serif;font-weight:400;font-size:9pt;width:542px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_uniqueserv{width:490px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_det_uniqueser{font-family: Sans-serif;font-weight: 400;font-size: 9pt;width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_usd_det_uniqueseronly{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_tot_uniqueser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:138px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_tot_uniqueser{width:auto;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_det_serinf_serv1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:175px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_serinf_serv1{width:auto;height:15px;text-align:left;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_detinf1_ser1{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_usd_detinf1_uniqueser{width:10px;height:30px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_totinf1_ser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:138px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_cuentas{font-family:Sans-serif;font-weight:400;font-size:9pt;width:340px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 14px;vertical-align:top}#marc_des_monto{font-family:Sans-serif;font-weight:400;font-size:9pt;width:348px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 5px;vertical-align:top}.item_marc_tot_ser1{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_uniqueser{width:auto;height:auto;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.marc_num_cuentas1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:330px;height:144px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top}.marc_num_cuentas2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:330px;height:87px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top}.cuad_tit_cuent1{font-family:Sans-serif;font-size:9pt;width:auto;height:15px;color:#757171;text-align:left;border:0 red dashed;display:block;position:relative;margin:0}.height-by-two{height:25px;margin-top:7px;}.marc_moreofone{font-family:Sans-serif;font-weight:400;font-size:9pt;width:359px;height:156px;text-align:center;border:none;border-radius:9px;display:inline-block;position:relative;margin:0;padding:0;vertical-align:top;}.marc_medium{font-family:Sans-serif;font-weight:400;font-size:9pt;width:335px;height:20px;text-align:center;border:1px #07376e solid;border-radius:5px;display:block;position:relative;margin:0;padding:8px 8px 8px 14px;vertical-align:top;}.marc_medium_1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:329px;height:60px;text-align:center;border:1px #07376e solid;border-radius:5px;display:block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top;}#title_igv_only_flete{font-family:Sans-serif;font-weight:400;font-size:9pt;width:192px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:3px 0 0 0;}.item_igv_only_flete{width:auto;height:auto;font-size:10pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0;}.item_igv_total_only_flete{width:auto;height:auto;font-size:10pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0;}#ammount_total_igv_only_flete{font-family:Sans-serif;font-weight:400;font-size:9pt;min-width:125px;max-width:125px;width:125px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;}#ammount_total_proform_only_flete{font-family:Sans-serif;font-weight:400;font-size:9pt;min-width:125px;max-width:125px;width:125px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;}#title_proform_only_flete{font-family:Sans-serif;font-weight:400;font-size:9pt;width:192px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:3px 0 0 0;}#marc_usd_proform_only_flete{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;}.mt-4px{margin-top:4px;}
</style>
<body>
	<div id="cont_quotationpdf">
		<div id="marc_fill1">
			<div class="c_quotationpdf__cTop--cLogo">
	    	<img id="logo"  src="../../vendor/dompdf/logotipo-camel.png" alt="" class="c_quotationpdf__cTop--cLogo--img" width="100" height="100">
			</div>
	    <div id="marc_cab">
	      <div id="marc_cab_izq">
          <div id="title_code_cot">COTIZACIÓN</div>
          <div id="title_fech_cot">FECHA</div>
	      </div>
	      <div id="marc_cab_der">
	        <div id="corr_cot"><?php echo $_POST['code_quote']; ?></div>
	        <div id="fech_cot"><?php echo cambiaf_mysql($creation_date); ?></div>
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill">
	    <div id="marc_dat1">
	      <div id="marc_dat1_izq">
	        <div class="item_marc_dat1">Empresa</div>
	        <div class="item_marc_dat1">Atención</div>
	        <div class="item_marc_dat1">Direccion</div>
	      </div>
	      <div id="marc_dat1_cent">
	        <div class="item_dpt_dat1">:</div>
	        <div class="item_dpt_dat1">:</div>
	        <div class="item_dpt_dat1">:</div>
	      </div>
	      <div id="marc_dat1_der">
	        <div class="item_demp_dat1"><?php echo $u_nameenterprise; ?></div>
	        <div class="item_demp_dat1"><?php echo $f_type_operation; ?></div>
	        <div class="item_demp_dat1"><?php echo $f_transit_location;?></div>
	      </div>
	      <div id="marc_dat1_derr1">
	        <div class="item_demp_datt1">Ruc / DNI</div>
	        <div class="item_demp_datt1"><?php echo $u_ndocument; ?></div>
	      </div>
	    </div>
	    <div id="marc_dat2">
	    	<div id="marc_dat11_izq">
	    		<div class="item_marc2_dat1">Telefono</div>
	    	</div>
	    	<div id="marc_dat2_cent">
		      <div class="item_dpt1_dat1">:</div>
	    	</div>
	    	<div id="marc_dat1_der1">
		      <div class="item_demp2_dat1"><?php echo $u_telephone; ?></div>
	    	</div>
	  	</div>
		</div>
	  <div class="marc_fill" id="two_sectionlist">
	    <div id="marc_dat3">
	      <div id="marc_dat3_izq">
	        <div class="item_marc3_dat1">Servicio</div>
	        <div class="item_marc3_dat1">Contenido</div>
	        <div class="item_marc3_dat1">Origen</div>
	        <div class="item_marc3_dat1">Peso/Volumen</div>
	        <div class="item_marc3_dat1">Tiempo de Transito</div>
	      </div>
	      <div id="marc_dat3_cent">
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	      </div>
	      <div id="marc_dat3_der">
	        <div class="item_demp3_dat1"><?php echo $f_typetransendinitid; ?></div>
	        <div class="item_demp3_dat1"><?php echo maxcharacters($u_contain, 32); ?></div>
	        <div class="item_demp3_dat1">FOB - <?php echo $f_origen; ?></div>
	        <div class="item_demp3_dat1"><?php echo $f_desc_weightvolumen; ?></div>
	        <div class="item_demp3_dat1"><?php echo $f_time_transit; ?></div>
	      </div>
	      <!--
        <div id="marc_dat3_derr1">
	        <div class="item_marc3_dat2">FOB</div>
	        <div class="item_marc3_dat2">FLETE</div>
	        <div class="item_marc3_dat2">SEGURO</div>
	        <div class="item_marc3_dat2">CIF</div>
	      </div>
	      <div id="marc_dat3_cent">
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	      </div>
	      <div id="marc_dat3_cent1">
	        <div class="item_por3_dat1"></div>
	        <div class="item_por3_dat1"></div>
	        <div class="item_por3_dat1">1.00 %</div>
	        <div class="item_por3_dat1"></div>
	      </div>
	      <div id="marc_dat3_dollar">
	        <div class="item_dpt3_dat1">$</div>
        	<div class="item_dpt3_dat1">$</div>
	        <div class="item_dpt3_dat1">$</div>
	        <div class="item_dpt3_dat1">$</div>
	      </div>
        <div id="marc_dat3_derr11">
	        <div class="item_tpor3_dat1">45000</div>
	        <div class="item_tpor3_dat1">180</div>
	        <div class="item_tpor3_dat1">112.03</div>
	        <div class="item_tpor3_dat1">45292.03</div>
	      </div>
      -->
	    </div>
	  </div>
	  <div class="marc_fill" id="title_quoteservices">
      <div id="marc_fillcomplete">FLETE CAMEL LOGISTICS</div>
	  </div>
	  <div class="marc_fill" id="three_sectionlist">
      <div id="marc_det_fillcomplete">
        <div id="marc_det_unique_log">
          <div id="marc_det_uniqueserv">
            <div class="item_marc_det_uniqueserv h-18">Flete Internacional <strong>(no esta efecto a IGV)</strong></div>
            <?php
            	if($f_optgenfquotation == "not-moreOpts" && $f_selinsuremerch == "SI"){
            		echo "<div class='item_marc_det_uniqueserv h-18'>Seguro Internacional (no esta afecto a IGV)</div>";
            	}
            ?>
            <div class="item_marc_det_uniqueserv h-18">PICKUP (no esta efecto a IGV)</div>
            <div class="item_marc_det_uniqueserv h-18">Emisión de BL</div>
            <div class="item_marc_det_uniqueserv h-18">Handling</div>
            <div class="item_marc_det_uniqueserv h-18">THC</div>
          </div>
          <div id="marc_usd_det_uniqueser">
            <div class="item_marc_usd_det_uniqueser h-15 pt-02 text-fw-bold">$</div>
            <?php
            	if($f_optgenfquotation == "not-moreOpts" && $f_selinsuremerch == "SI"){
            		echo "<div class='item_marc_usd_det_uniqueser h-15 pt-02'>$</div>";
            	}
            ?>
            <div class="item_marc_usd_det_uniqueser h-15 pt-02 text-fw-bold">$</div>
            <div class="item_marc_usd_det_uniqueser h-15 pt-02">$</div>
            <div class="item_marc_usd_det_uniqueser h-15 pt-02">$</div>
            <div class="item_marc_usd_det_uniqueser h-15 pt-02">$</div>
          </div>
          <div id="marc_tot_uniqueser">
            <div class="item_marc_tot_uniqueser pt-02 text-fw-bold"><?php echo addTwoDecimalsOrGuion($f_flete); ?></div>
            <?php
            	if($f_optgenfquotation == "not-moreOpts" && $f_selinsuremerch == "SI"){
            		$insurance = addTwoDecimalsOrGuion($f_totalinsurance);
            		echo "<div class='item_marc_tot_uniqueser pt-02'>{$insurance}</div>";
            	}
            ?>
            <div class="item_marc_tot_uniqueser pt-02 text-fw-bold">-</div>
            <div class="item_marc_tot_uniqueser pt-02"><?php echo addTwoDecimalsOrGuion($f_emision_BL); ?></div>
            <div class="item_marc_tot_uniqueser pt-02"><?php echo addTwoDecimalsOrGuion($f_handling); ?></div>
            <div class="item_marc_tot_uniqueser pt-02"><?php echo addTwoDecimalsOrGuion($f_THC); ?></div>
          </div>
        </div>
      </div>
	    <!--
      <div id="marc_det_er_log_unique">
	      <div id="marc_det_inf1_log_unique">
	        <div id="cnt_img_money_uniquecamel">
            <img src="../../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
          </div>
          <div id="title_serv_first_uniquecamel" class="pt-07">
	          <div class="item_marc_det_serinf_serv1">Total Servicios Camel Logistics</div>
	        </div>
	        <div id="marc_usd_detinf1_uniqueser" class="pt-06">
	          <div class="item_marc_usd_det_uniqueser">$</div>
	        </div>
	        <div id="ammount_serv_first_camel1" class="pt-07">
	          <div class="item_marc_tot_ser">100</div>
	        </div>
	      </div>
	    </div>
    -->
	  </div>
	  <!-- <div class="marc_fill" id="four_sectionlist">
	     <div id="marc_det_cuentas">
        <div id="cnt_img_money_camel1">
          <img src="../../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
        </div>
	      <div id="title_serv_ulti_camel1">
	        <div class="item_marc_det_serinf_serv1">Total Impuestos a Pagar</div>
	      </div>
	      <div id="prefix_money_serv_camel2">
		      <div class="item_marc_usd_det_uniqueseronly"><strong>$</strong></div>
	      </div>
	      <div id="ammount_serv_ulti_camel1">
	        <div class="item_marc_tot_ser1"><strong>1,563.27</strong></div>
	      </div>        
	    </div>
	    <div id="marc_des_monto">
        <div id="cnt_img_money_camel2">
          <img src="../../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
        </div>
	      <div id="title_serv_ulti_camel2">
	        <div class="item_marc_det_serinf_serv1">Total Proforma Camel Logistics</div>
	      </div>
	      <div id="marc_usd_detinf1_ser1">
	        <div class="item_marc_usd_det_uniqueseronly"><strong>$</strong></div>
	      </div>
	      <div id="ammount_serv_ulti_camel2">
	        <div class="item_marc_tot_ser1"><strong>1,125.72</strong></div>
	      </div>     
	    </div>
	  </div> -->
	  <div class="marc_fill" id="five_sectionlist">
	    <div class="marc_num_cuentas1">
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP SOLES</strong></div>
	      <div class="cuad_tit_cuent1">191-2412689-0-94</div>
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP DOLARES</strong></div>
	      <div class="cuad_tit_cuent1">191-2403408-1-57</div>
	    </div>
	    <div class="marc_moreofone">
		    <div class="marc_medium">
		    	<div id="title_igv_only_flete">
		        <div class="item_marc_det_serinf_serv1">I.G.V Servicios Camel Logistics</div>
		      </div>
		      <div id="marc_usd_detinf1_ser1">
		        <div class="item_igv_only_flete">$</div>
		      </div>
		      <div id="ammount_total_igv_only_flete">
		        <div class="item_igv_total_only_flete"><?php echo addTwoDecimalsOrGuion($f_totalservicesIGV18); ?></div>
		      </div>
		    </div>
		    <div class="marc_medium mt-4px">
		    	<div id="title_proform_only_flete">
		        <div class="item_marc_det_serinf_serv1">Total Proforma</div>
		      </div>
		      <div id="marc_usd_proform_only_flete">
		        <div class="item_marc_usd_det_uniqueseronly"><strong>$</strong></div>
		      </div>
		      <div id="ammount_total_proform_only_flete">
		        <div class="item_marc_tot_ser1"><strong><?php echo addTwoDecimalsOrGuion($f_totalwithIGV); ?></strong></div>
		      </div>
		    </div>
		    <div class="marc_medium_1 mt-4px">
	        </br>
		      <div class="cuad_tit_cuent1">Son:</div>
		      <div class="cuad_tit_cuent1"><!--DOS MIL SETECIENTOS SETENTA Y NUEVE--></div>
		      <div class="cuad_tit_cuent1"><!--28/100 DOLARES--></div>
		    </div>
	    </div>
	  </div>
	  <div id="marc_fill2">
	    <center>Av. Dos de Mayo 1545 Of. 318 San Isidro - Lima<br>
	      Email. info@camel.com.pe / Telf. 989 874 368<br>
	      www.camel.com.pe
	    </center>
	  </div>
	</div>
</body>
</html>
<?php
	$html = ob_get_clean(); //CARGAR LO QUE CONTIENE EN ESTE ARCHIVO AL SIGUIENTE
	$dompdf = new Dompdf();//INSTANCIAR EL OBJETO PARA DOMPDF
	$options = $dompdf->getOptions(); //INTANCIAR A LAS OPCIONES DE CONFIGURACIÓN
	$dompdf->set_option("isRemoteEnabled", TRUE); //SETEAR LAS RUTAS REMOTAS CON VALOR VERDADERO
	$dompdf->loadHtml($html);//CARGA EL CONTENIDO HTML PARA PDF
	$dompdf->setPaper('letter','portrait'); //TAMAÑO O FORMATO DE HOJA - CARTA VERTICAL
	$dompdf->render(); //LEER EL HTML Y CONVERTIR A PDF
	$dompdf->stream($name_quotation, array('Attachment' => true)); //VISUALIZAR EN EL NAVEGADOR
	exit(0);
?>