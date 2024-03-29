<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	<title>Cotizacion de cliente - Plantilla 2</title>
</head>
<style>
  .h-18{height:18px!important}.pt-05{padding-top:.5rem}.pt-02{padding-top:.2rem}.h-28{height:28px!important}.h-25{height:25px!important}.h-32{height:32px!important}.text-red{color:red!important}#cont_quotationpdf{max-width:726px;width:auto;margin-left:auto;margin-right:auto;background-color:#fff}#four_sectionlist{margin:4px 0 0 0}#five_sectionlist{margin:4px 0 0 0}#title_quoteservices{margin:5px 0 10px 0;border:0 red dashed;height:15px}#title_code_cot{height:38px;line-height:1.5}#prefix_money_serv_camel2{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#ammount_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;min-width:102px;max-width:110px;width:110px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#title_serv_ulti_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:140px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#title_serv_ulti_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:192px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:6px 0 0 0}#cnt_img_money_camel1{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel1 img{max-width:22px;height:22px}#cnt_img_money_camel2{max-width:22px;width:22px;height:22px;display:inline-block;border:0 red dashed;vertical-align:top;padding:5px 0 0 0}#cnt_img_money_camel2 img{max-width:22px;height:22px}#title_serv_first_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:210px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#title_serv_first_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:210px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#ammount_serv_first_camel1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:102px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#ammount_serv_first_camel2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:102px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:2px 0 0 0}#marc_fill1{display:block;max-width:794px;width:100%;height:auto;position:relative;border:0 #fff dashed;margin:0 0 5px 0}.marc_fill{display:block;max-width:794px;width:100%;height:auto;border:0 #fff dashed;position:relative;margin:5px 0 0 0}#marc_fill2{font-family:Sans-serif;font-weight:400;font-size:8pt;display:block;max-width:794px;width:auto;height:auto;position:relative;border:0 #fff dashed;padding:6px 0 0 0;color:#757171}.c_quotationpdf__cTop--cLogo{display:inline-block;max-width:160px;border:0 #fff dashed;max-height:74px;height:74px;vertical-align:top}#logo{max-width:160px;width:auto;height:auto;display:inline-block;position:relative;margin:0}#marc_cab{max-width:350px;width:100%;max-height:74px;height:74px;font-family:Sans-serif;display:inline-block;position:relative;vertical-align:top;margin:0 0 0 208px;padding:5px 0 0 0}#marc_cab_izq{font-family:Sans-serif;font-weight:700;font-size:14pt;width:155px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_cab_der{font-family:Sans-serif;font-weight:700;font-size:14pt;width:186px;height:70px;border:0 #fff dashed;color:#404040;display:inline-block;position:relative;margin:0;vertical-align:top;text-align:center}#corr_cot{font-family:Sans-serif;font-weight:700;font-size:19pt;width:auto;height:38px;line-height:1.2;border:0 red dashed;color:#07376e;display:block;position:relative;margin:0}#fech_cot{font-family:Sans-serif;font-weight:700;font-size:11pt;width:auto;height:auto;border:0 red dashed;color:#757171;display:block;position:relative;margin:0;padding:5px 0 0 0}#marc_dat1{font-family:Sans-serif;font-weight:700;font-size:9pt;width:429px;height:50px;border:1px #07376e solid;border-radius:8px;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 14px}#marc_dat2{font-family:Sans-serif;font-weight:700;font-size:9pt;width:250px;height:50px;border:1px #07376e solid;border-radius:8px;display:inline-block;position:relative;margin:0;vertical-align:top;padding:1px 5px}#marc_dat1_izq{width:90px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat11_izq{width:94px;height:50px;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat2_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der1{width:144px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_der{width:210px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat1_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_dpt1_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat1_derr1{width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_demp_datt1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc2_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp2_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3{font-family:Sans-serif;font-weight:700;font-size:9pt;width:695px;height:80px;border:1px #07376e solid;border-radius:10px;display:inline-block;position:relative;margin:0;padding:1px 14px}#marc_dat3_izq{width:125px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_cent{width:5px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_dpt3_dat1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_demp3_dat1{width:auto;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc3_dat2{width:53px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_der{width:280px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_derr1{width:55px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_dat3_cent1{width:45px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_por3_dat1{width:45px;height:15px;font-weight:400;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_derr11{width:145px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_tpor3_dat1{width:auto;height:15px;font-weight:400;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_dat3_dollar{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_imp{width:360px;height:auto;font-family:Sans-serif;font-weight:400;text-align:center;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_ser_log{width:360px;height:auto;font-family:Sans-serif;font-weight:400;text-align:center;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_imp{width:330px;height:450px;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px;vertical-align:top}#marc_det_er_log{width:360px;height:460px;font-family:Sans-serif;font-weight:400;border:0 red dashed;color:#07376e;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_1er_log{width:340px;height:362px;font-family:Sans-serif;font-weight:400;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:14px 5px 14px 14px}#marc_det_inf1_log{width:340px;height:22px;font-family:Sans-serif;font-weight:400;text-align:center;border:1px #07376e solid;border-radius:9px;display:block;position:relative;margin:4px 0 0 0;padding:8px 5px 8px 14px}#marc_det_inf2_log{width:340px;height:22px;text-align:center;border:1px #07376e solid;border-radius:9px;display:block;position:relative;margin:4px 0 0 0;padding:8px 5px 8px 14px}#marc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:105px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_imp1{width:auto;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_porc_det_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:40px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_porc_det_imp1{width:40px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_imp1{width:40px;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_usd_tot_imp1{width:auto;height:15px;border:0 red dashed;text-align:right;color:#757171;display:block;position:relative;margin:0}#marc_det_tot_imp1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:115px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_serv1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:227px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_serv1{width:227px;height:15px;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_det_ser1{font-family: Sans-serif;font-weight: 400;font-size: 9pt;width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_usd_det_ser1{width:10px;height:auto;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_tot_ser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:85px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_tot_ser{width:auto;height:15px;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_det_serinf_serv1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:175px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}.item_marc_det_serinf_serv1{width:auto;height:15px;text-align:left;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}#marc_usd_detinf1_ser1{width:10px;height:auto;border:0 red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_totinf1_ser{font-family:Sans-serif;font-weight:400;font-size:9pt;width:138px;height:auto;border:1px red dashed;color:#757171;display:inline-block;position:relative;margin:0;vertical-align:top}#marc_det_cuentas{font-family:Sans-serif;font-weight:400;font-size:9pt;width:340px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 14px;vertical-align:top}#marc_des_monto{font-family:Sans-serif;font-weight:400;font-size:9pt;width:348px;height:28px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:8px 5px 8px 5px;vertical-align:top}.item_marc_tot_ser11{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.item_marc_usd_det_ser11{width:auto;height:auto;font-size:15pt;text-align:right;border:0 red dashed;color:#757171;display:block;position:relative;margin:0}.marc_num_cuentas1{font-family:Sans-serif;font-weight:400;font-size:9pt;width:330px;height:87px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top}.marc_num_cuentas2{font-family:Sans-serif;font-weight:400;font-size:9pt;width:330px;height:87px;text-align:center;border:1px #07376e solid;border-radius:9px;display:inline-block;position:relative;margin:0;padding:5px 14px 5px 14px;vertical-align:top}.cuad_tit_cuent1{font-family:Sans-serif;font-size:9pt;width:auto;height:15px;color:#757171;text-align:left;border:0 red dashed;display:block;position:relative;margin:0}.text-fw-bold{font-weight:700}#cont_conditionspdf{max-width: 726px;width: auto;;margin-left: auto;margin-right: auto;background-color: #fff;}#marc_border{width: auto;min-height: 400px;max-height: 1123px;height: auto;border: 1px solid #717171;padding: 14px;}#title_border{font-family: Sans-serif;font-weight: 700;font-size: 9pt;color: #757171;margin-bottom: 1rem;}.c_listconditions_m{font-family: Sans-serif;font-weight: 700;font-size: 9pt;color: #757171;padding: 0 0 0 17px;}.text-black{color: #404040;}.c_center{max-width: 726px;width: auto;margin-left: auto;margin-right: auto;text-align: center;}.c_inf_block{display: block;margin: 0;padding: 0;}.c_inf_inlineblock{display: inline-block;}.c_inf_inlineblock_i{display: inline-block;}
</style>
<body>
	<div id="cont_quotationpdf">
		<div id="marc_fill1">
			<div class="c_quotationpdf__cTop--cLogo">
	    	<img id="logo"  src="../vendor/dompdf/logotipo-camel.png" alt="" class="c_quotationpdf__cTop--cLogo--img" width="100" height="100">
			</div>
	    <div id="marc_cab">
	      <div id="marc_cab_izq">
          <div id="title_code_cot">COTIZACIÓN</div>
          <div id="title_fech_cot">FECHA</div>
	      </div>
	      <div id="marc_cab_der">
	        <div id="corr_cot">CT 000000</div>
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
	        <div class="item_demp_dat1">1070346201</div>
	        <div class="item_demp_dat1">SERVICIO MARÍTIMO</div>
	        <div class="item_demp_dat1">LIMA - SAN JUAN DE LURIGANCHO</div>
	      </div>
	      <div id="marc_dat1_derr1">
	        <div class="item_demp_datt1">Ruc / DNI</div>
	        <div class="item_demp_datt1">10702366301</div>
	      </div>
	    </div>
	    <div id="marc_dat2">
	    	<div id="marc_dat11_izq">
	    		<div class="item_marc2_dat1">Telefono</div>
	      	<div class="item_marc2_dat1">P. Arancela</div>
          <div class="item_marc2_dat1">Ente Regulador</div>
	    	</div>
	    	<div id="marc_dat2_cent">
		      <div class="item_dpt1_dat1">:</div>
		      <div class="item_dpt1_dat1">:</div>
          <div class="item_dpt1_dat1">:</div>
	    	</div>
	    	<div id="marc_dat1_der1">
		      <div class="item_demp2_dat1">-</div>
		      <div class="item_demp2_dat1">-</div>
          <div class="item_demp2_dat1">-</div>
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
	        <div class="item_demp3_dat1">32 días</div>
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
	        <div class="item_tpor3_dat1">45000</div>
	        <div class="item_tpor3_dat1">180</div>
	        <div class="item_tpor3_dat1">112.03</div>
	        <div class="item_tpor3_dat1">45292.03</div>
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill" id="title_quoteservices">
	    <div id="marc_imp">IMPUESTOS</div>
	    <div id="marc_ser_log">ADUANAS CAMEL LOGISTICS</div>
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
	          <div class="item_marc_det_serv1 text-red">Visto bueno</div>
	          <div class="item_marc_det_serv1 text-red">Emision de BL / EWB</div>
	          <div class="item_marc_det_serv1 text-red">Almacen Referencial</div>
	          <div class="item_marc_det_serv1">Transporte interno</div>
	          <div class="item_marc_det_serv1">Previo y Aforo Físico</div>
	          <div class="item_marc_det_serv1 text-red">THC</div>
	          <div class="item_marc_det_serv1 text-red">Devolucion de contenedores</div>
	          <div class="item_marc_det_serv1 h-32">FICHA TÉCNICA Y CERTIFICADO DE CONFORMIDAD</div>
	          <div class="item_marc_det_serv1">Consolidación</div>
	          <div class="item_marc_det_serv1 text-red">Handling</div>
	          <div class="item_marc_det_serv1">Comision de Agencia </div>
	          <div class="item_marc_det_serv1">Gastos Operativos</div>
	        </div>
	        <div id="marc_usd_det_ser1">
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1 h-28 pt-05">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1 text-red">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="marc_tot_ser">
	          <div class="item_marc_tot_ser text-red">100</div>
	          <div class="item_marc_tot_ser text-red">-</div>
	          <div class="item_marc_tot_ser text-red">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser text-red">100</div>
	          <div class="item_marc_tot_ser text-red">100</div>
	          <div class="item_marc_tot_ser h-25 pt-05">100</div>
	          <div class="item_marc_tot_ser">100</div>
	          <div class="item_marc_tot_ser text-red">100</div>
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
          <img src="../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
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
          <img src="../vendor/dompdf/Imagen1.png" alt="" width="100" height="100">
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
	    <div class="marc_num_cuentas1">
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP SOLES</strong></div>
				<div class="cuad_tit_cuent1">191-2412689-0-94</div>
				<div class="cuad_tit_cuent1"><span class="text-fw-bold">CCI.</span> 00219100241268909456</div>
				<div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP DOLARES</strong></div>
				<div class="cuad_tit_cuent1">191-2403408-1-57</div>
				<div class="cuad_tit_cuent1"><span class="text-fw-bold">CCI.</span> 00219100240340815750</div>
	    </div>
	    <div class="marc_num_cuentas2">
        </br>
	      <div class="cuad_tit_cuent1">Son:</div>
	      <div class="cuad_tit_cuent1"><!--DOS MIL SETECIENTOS SETENTA Y NUEVE--></div>
	      <div class="cuad_tit_cuent1"><!--28/100 DOLARES--></div>
	    </div>
	  </div>
	  <div id="marc_fill2">
	  	<div class="c_center">
	  		<div class="c_inf_block">Av. Dos de Mayo 1545 Of. 318 San Isidro - Lima</div>
		    <div class="c_inf_block">Email: info@camel.com.pe / Telf: 989 874 368</div>
		    <div class="c_inf_block">www.camel.com.pe</div>
	  	</div>
	  </div>
	</div>
	<div id="cont_conditionspdf">
		<div id="marc_border">
			<div id="title_border">Condiciones de servicio:</div>
			<div id="c_listconditions">
				<ul class="c_listconditions_m">
					<li class="c_listconditions_m_item">
						<div>El cliente debe contar con su póliza de seguro para evitar contingencias con la seguridad en el traslado de sus mercancías, NO es responsabilidad de la agencia de aduana y/o carga en caso ocurriesen robos o asaltos durante el transporte local e internacional de dichas mercancía, adicional a la póliza de seguro se recomienda que el cliente contrate una custodia policial y/o los candados inteligentes de Prosegur para los traslados locales.
	Esta proforma tiene una validez de 15 días calendarios, posterior a ello el cliente debe solicitar por escrito la renovación o confirmación de las tarifas brindadas.
	Se recomienda realizar el abono de los impuestos en soles, de lo contrario se generara una diferencia por tipo cambiario (banco y sunat) que será asumida por el cliente.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>El transporte interno es valido desde los almacenes donde se encuentra la mercadería  hasta la dirección donde especifica la cotización y no incluye  costo de estiba.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div class="text-black">En caso Caida en canal ROJO se cobrara un adicionalmene USD 50.00 + IGV.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div class="text-black">No incluye servicio de cuadrilla, montacargas, resguardo policial.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Los costos del almacén referencial está sujeto a facturas de terceros.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Los demás precios que son los servicios de camel son estables y no variaran de acuerdo a esta cotización.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Los pagos de impuestos de importación son derechos directamente del importador y los montos se aplican de acuerdo a la DUA emitida por la ADUANA.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Almacenaje: 21 días libre para LCL; 14 días libre para FCL.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Validez de la cotización 7 días contadas a partir de la fecha de su emisión.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Tarifa aplicada por tonelada / metro cúbico.</div>
					</li>
					<li class="c_listconditions_m_item">
						<div>Tarifa expresada en USD.</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</body>
</html>