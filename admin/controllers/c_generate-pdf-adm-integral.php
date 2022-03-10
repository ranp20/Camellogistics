<?php
// OJO: El método con AJAX de Jquery, no funciona y/o no devuelve el PDF si dentro del HTML se pasa un array...
require_once '../../vendor/autoload.php';
use Dompdf\Dompdf;
ob_start(); //CARGA EN MEMORIA UN ARCHIVO
//include(dirname('_FILE_').'/c_pdfquotation.php'); //INCLUIR LA PLANTILLA DE LA COTIZACIÓN, DEVOLVER DE LA RUTA PADRE, PARA COMPARTIR INFO.
require_once '../../models/quotation-user.php';
$quotebyidcode = new Quotation_user();
$listbyidcode = $quotebyidcode->get_by_idcodegenrand($_POST['id_codegenrand']);
//print_r($_POST);
print_r($listbyidcode);

//VARIABLES A USAR EN EL MOSTRADO DE INFORMACIÓN DENTRO DEL PDF
$u_nameenterprise = $listbyidcode[0]['u_enterprise'];
$u_ndocument = $listbyidcode[0]['u_n_document'];
$u_telephone = $listbyidcode[0]['u_telephone'];
$f_typecontainer = $listbyidcode[0]['f_type_container'];
$f_fob = $listbyidcode[0]['f_fob'];
$f_flete = $listbyidcode[0]['f_flete'];
$f_insurance = $listbyidcode[0]['f_insurance'];
$f_cif = $listbyidcode[0]['f_cif'];

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
	#cont_quotationpdf{max-width:726px;width:auto;max-height:1123px;margin-left:auto;margin-right:auto;background-color:#fff}#four_sectionlist{margin:4px 0 0 0}#five_sectionlist{margin:4px 0 0 0}#title_quoteservices{margin:5px 0 10px 0;border:0 red dashed;height:15px}#title_code_cot{height:38px;line-height:1.5}#prefix_money_serv_camel2{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;min-width:102px;max-width:110px;width:110px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#title_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:140px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#title_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:192px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#cnt_img_money_camel1{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel1 img{max-width:22px;height:22px}#cnt_img_money_camel2{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel2 img{max-width:22px;height:22px}#title_serv_first_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:210px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#title_serv_first_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:210px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#ammount_serv_first_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:102px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#ammount_serv_first_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:102px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#marc_fill1{display:block;max-width:794px;width:100%;height:auto;position:relative;border:0 #fff dashed;margin:0 0 5px 0}.marc_fill{display:block;max-width:794px;width:100%;height:auto;border:0 #fff dashed;position:relative;margin:5px 0 0 0}#marc_fill2{font-family:Sans-serif;font-weight:400;font-size:8pt;display:block;max-width:794px;width:auto;height:auto;position:relative;border:0 #fff dashed;padding:6px 0 0 0;color:#757171}.c_quotationpdf__cTop--cLogo{display:inline-block;max-width:160px;border:0 #fff dashed;max-height:74px;height:74px;vertical-align:top}#logo{max-width:160px;width:auto;height:auto;display:inline-block;position:relative;margin:0}#marc_cab{max-width:350px;width:100%;max-height:74px;height:74px;font-family:Sans-serif;display:inline-block;position:relative;vertical-align:top;margin:0 0 0 208px;padding:5px 0 0 0}#marc_cab_izq{font-family:Sans-serif;font-weight:700;font-size:14pt;width:155px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_cab_der{font-family:Sans-serif;font-weight:700;font-size:14pt;width:186px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top;text-align:center}#corr_cot{font-family:Sans-serif;font-weight:700;font-size:19pt;width:auto;height:38px;line-height:1.2;border:0 red dashed;color:#07376e;display:block;position:relative;margin:0}#fech_cot{font-family:Sans-serif;font-weight:700;font-size:11pt;width:auto;height:auto;border:0 red dashed;color:#757171;display:block;position:relative;margin:0;padding:5px 0 0 0}#marc_dat1{font-family:Sans-serif;font-weight:700;font-size:9pt;width:429px;height:50px;border:1px #07376e solid;border-radius:8px;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 14px}#marc_dat2{font-family:Sans-serif;font-weight:700;font-size:9pt;width:250px;height:50px;border:1px #07376e solid;border-radius:8px;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 5px}#marc_dat1_izq{width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat11_izq{width:70px;height:30px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat2_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der1{width:161px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der{width:190px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt1_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat1_derr1{width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_demp_datt1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc2_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp2_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3{font-family:Sans-serif;font-weight:700;font-size:9pt;width:695px;height:80px;border:1px #07376e solid;border-radius:10px;display:inline-block;position:relative;margin:0;padding:1px 14px}#marc_dat3_izq{width:125px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_dpt3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp3_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc3_dat2{width:53px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_der{width:262px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_derr1{width:55px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_cent1{width:45px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_por3_dat1{width:45px;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_derr11{width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_tpor3_dat1{width:auto;height:15px;font-weight:400;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_dollar{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_imp{width:360px;height:auto;font-family:Sans-serif;font-weight:400;text-align:center;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_ser_log{width:360px;height:auto;font-family:Sans-serif;font-weight:400;text-align:center;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_imp{width:330px;height:450px;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px;vertical-align:top}#marc_det_er_log{width:360px;height:460px;font-family:Sans-serif;font-weight:400;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_1er_log{width:340px;height:362px;font-family:Sans-serif;font-weight:400;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px 5px 14px 14px}#marc_det_inf1_log{width:340px;height:22px;font-family:Sans-serif;font-weight:400;text-align:center;border:1px #07376e solid;border-radius:9px;display:block;position:relative;margin:4px 0 0 0;padding:8px 5px 8px 14px}#marc_det_inf2_log{width:340px;height:22px;text-align:center;border:1px #07376e solid;border-radius:9px;display:block;position:relative;margin:4px 0 0 0;padding:8px 5px 8px 14px}#marc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_imp1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_porc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:40px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_porc_det_imp1{width:40px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_imp1{width:40px;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_usd_tot_imp1{width:auto;height:15px;border:0 red dashed;text-align:right;color:#757171;display:block;position:relative;margin:0}#marc_det_tot_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:115px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_serv1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:227px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_serv1{width:227px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_det_ser1{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_usd_det_ser1{width:10px;height:auto;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_tot_ser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:85px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_tot_ser{width:auto;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_det_serinf_serv1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:175px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_serinf_serv1{width:auto;height:15px;text-align:left;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_detinf1_ser1{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_totinf1_ser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:138px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_cuentas{font-family:Sans-serif;font-weight:400;font-size:9pt;width:340px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 14px;vertical-align:top}#marc_des_monto{font-family:Sans-serif;font-weight:400;font-size:9pt;width:348px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 5px;vertical-align:top}.item_marc_tot_ser11{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_ser11{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.marc_num_cuentas{font-family:Sans-serif;font-weight:400;font-size:9pt;width:330px;height:87px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top}.cuad_tit_cuent1{font-family:Sans-serif;font-size:9pt;width:auto;height:15px;color:#757171;text-align:left;border:0 red dashed;display:block;position:relative;margin:0}
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
	        <div id="fech_cot">21/09/2021</div>
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
	        <div class="item_demp_dat1">SERVICIO MARÍTIMO</div>
	        <div class="item_demp_dat1">polancoranp2019@gmail.com</div>
	      </div>
	      <div id="marc_dat1_derr1">
	        <div class="item_demp_datt1">Ruc / DNI</div>
	        <div class="item_demp_datt1"><?php echo $u_ndocument; ?></div>
	      </div>
	    </div>
	    <div id="marc_dat2">
	    	<div id="marc_dat11_izq">
	    		<div class="item_marc2_dat1">Telefono</div>
	      	<div class="item_marc2_dat1">P. Arancela</div>
	    	</div>
	    	<div id="marc_dat2_cent">
		      <div class="item_dpt1_dat1">:</div>
		      <div class="item_dpt1_dat1">:</div>
	    	</div>
	    	<div id="marc_dat1_der1">
		      <div class="item_demp2_dat1"><?php echo $u_telephone; ?></div>
		      <div class="item_demp2_dat1">polancoranp2019@gmail.com</div>
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
	        <div class="item_demp3_dat1">ADUANAS</div>
	        <div class="item_demp3_dat1">CARGA GENERAL</div>
	        <div class="item_demp3_dat1">FOB - QINGDAO - CHINA</div>
	        <div class="item_demp3_dat1">3000kg/1.08CBM</div>
	        <div class="item_demp3_dat1">polancoranp2019@gmail.com</div>
	      </div>
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
	        <div class="item_tpor3_dat1"><?php echo $f_fob; ?></div>
	        <div class="item_tpor3_dat1"><?php echo $f_flete; ?></div>
	        <div class="item_tpor3_dat1"><?php echo $f_insurance; ?></div>
	        <div class="item_tpor3_dat1"><?php echo $f_cif; ?></div>
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill" id="title_quoteservices">
	    <div id="marc_imp">IMPUESTOS</div>
	    <div id="marc_ser_log">SERVICIOS CAMEL LOGISTICS</div>
	  </div>
	  <div class="marc_fill" id="three_sectionlist">
	    <div id="marc_det_imp">
	      <div id="marc_det_imp1">
	        <div class="item_marc_det_imp1">I.G.V</div>
	        <div class="item_marc_det_imp1">I.P.M.</div>
	        <div class="item_marc_det_imp1">Percepción</div>
	        <div class="item_marc_det_imp1">Ad-Valoren</div>
	        <div class="item_marc_det_imp1">Impuesto selectivo</div>
          <div class="item_marc_det_imp1">ANTIDUMPING</div>
	      </div>
	      <div id="marc_porc_det_imp1">
	        <div class="item_marc_porc_det_imp1">16%</div>
	        <div class="item_marc_porc_det_imp1">2.00%</div>
	        <div class="item_marc_porc_det_imp1">3.5%    </div>
	        <div class="item_marc_porc_det_imp1">0.0%</div>
	        <div class="item_marc_porc_det_imp1">0%</div>
          <div class="item_marc_porc_det_imp1">0%</div>
	      </div>
	      <div id="marc_porc_det_imp1">
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
          <div class="item_marc_usd_det_imp1">$</div>
	      </div>
	      <div id="marc_det_tot_imp1">
	        <div class="item_usd_tot_imp1">133.05</div>
	        <div class="item_usd_tot_imp1">16.66</div>
	        <div class="item_usd_tot_imp1">34.40</div>
	        <div class="item_usd_tot_imp1">93.50</div>
	        <div class="item_usd_tot_imp1">23.20</div>
          <div class="item_usd_tot_imp1">17.40</div>
	      </div>
	    </div>
	    <div id="marc_det_er_log">
	      <div id="marc_det_1er_log">
	        <div id="marc_det_serv1">
	          <div class="item_marc_det_serv1">Flete Internacional (no esta afecto a IGV)</div>
	          <div class="item_marc_det_serv1">Pickup , ADUANAS ORIGEN</div>
	          <div class="item_marc_det_serv1">Emision de BL / EWB</div>
	          <div class="item_marc_det_serv1">Handling</div>
	          <div class="item_marc_det_serv1">visto bueno</div>
	          <div class="item_marc_det_serv1">Descarga</div>
	          <div class="item_marc_det_serv1">* Almacen Referencial</div>
	          <div class="item_marc_det_serv1">Transporte interno</div>
	          <div class="item_marc_det_serv1">Previo</div>
	          <div class="item_marc_det_serv1">Gremios maritimos</div>
	          <div class="item_marc_det_serv1">THC</div>
	          <div class="item_marc_det_serv1">* Devolucion de contenedores</div>
	          <div class="item_marc_det_serv1">CERTIFICADO DE INSPECCION Y</div>
	          <div class="item_marc_det_serv1">FICHA TECNICA</div>
	          <div class="item_marc_det_serv1">Consolidación</div>
	           <div class="item_marc_det_serv1">Aforo fisico</div>
	          <div class="item_marc_det_serv1">Comision de Agencia </div>
	          <div class="item_marc_det_serv1">Gastos Operativos</div>
	        </div>
	        <div id="marc_usd_det_ser1">
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="marc_tot_ser">
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser"> -</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser">-</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	        </div>
	      </div>
	      <div id="marc_det_inf1_log">
	        <div id="title_serv_first_camel1">
	          <div class="item_marc_det_serinf_serv1">Total Servicios Camel Logistics</div>
	        </div>
	        <div id="marc_usd_detinf1_ser1">
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="ammount_serv_first_camel1">
	          <div class="item_marc_tot_ser">100</div>
	        </div>
	      </div>
	      <div id="marc_det_inf2_log">
	        <div id="title_serv_first_camel2">
	          <div class="item_marc_det_serinf_serv1">I.G.V Servicios Camel Logistics</div>
	        </div>
	        <div id="marc_usd_detinf1_ser1">
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="ammount_serv_first_camel2">
	          <div class="item_marc_tot_ser">100</div>
	        </div>     
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill" id="four_sectionlist">
	    <div id="marc_det_cuentas">
        <div id="cnt_img_money_camel1">
          <img src="../../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
        </div>
	      <div id="title_serv_ulti_camel1">
	        <div class="item_marc_det_serinf_serv1">Total Impuestos a Pagar</div>
	      </div>
	      <div id="prefix_money_serv_camel2">
		      <div class="item_marc_usd_det_ser11"><strong>$</strong></div>
	      </div>
	      <div id="ammount_serv_ulti_camel1">
	        <div class="item_marc_tot_ser11"><strong>1,563.27</strong></div>
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
	        <div class="item_marc_usd_det_ser11"><strong>$</strong></div>
	      </div>
	      <div id="ammount_serv_ulti_camel2">
	        <div class="item_marc_tot_ser11"><strong>1,125.72</strong></div>
	      </div>     
	    </div>
	  </div>
	  <div class="marc_fill" id="five_sectionlist">
	    <div class="marc_num_cuentas">
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP SOLES</strong></div>
	      <div class="cuad_tit_cuent1">191-2412689-0-94</div>
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP DOLARES</strong></div>
	      <div class="cuad_tit_cuent1">191-2403408-1-57</div>
	    </div>
	    <div class="marc_num_cuentas">
        </br>
	      <div class="cuad_tit_cuent1">Son:</div>
	      <div class="cuad_tit_cuent1"><!--DOS MIL SETECIENTOS SETENTA Y NUEVE--></div>
	      <div class="cuad_tit_cuent1"><!--28/100 DOLARES--></div>
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