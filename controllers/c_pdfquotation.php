<?php 
	$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	<title>Cotizacion de cliente</title>
</head>
<style>
	#cont_quotationpdf{
		max-width: 794px;
		width: auto;
		max-height: 1123px;
		margin-left: auto;
		margin-right: auto;
		background-color: #ddd;
	}
	.c_quotationpdf__cTop--cLogo{
		display: inline-block;
		max-width: 13.5rem;
	}
	/*.reset_st_p{
		margin: 0;
		padding: 0;
	}
	.reset_st_hs{
		margin: 0;
		padding: 0;
	}
	.c-grey{
		color: #777;
	}
	.remove_space-thead{
		padding: 0;
		margin: 0;
		line-height: 0;
	}
	.c_quotationpdf__cTop{
		width: 100%;
	}
	.c_quotationpdf__cTop--cLogo{
		max-width: 13.5rem;
	}
	.c_quotationpdf__cTop--cLogo--img{
		max-width: 11rem;
		width: auto;
		height: auto;
	}
	.c_quotationpdf__cTop--cCodeDate--secL p{
		font-weight: 600;
	}
	.c_quotationpdf__cTop--cCodeDate--secR{
		text-align: center;
	}
	.c_quotationpdf__contwogroup{
		width: 100%;
		margin-top: 0.5rem;
		position: relative;
	}
	.c_quotationpdf__contwogroup--sec{
		display: inline-block;
		border: thin solid red;
		border-radius: .4rem;
		vertical-align: top;
	}
	.c_quotationpdf__contwogroup--sec:first-child{
		width: 68%;
	}
	.c_quotationpdf__contwogroup--sec:nth-child(2){
		width: 30%;
	}
	.c_quotationpdf__contwogroup--sec:first-child table{
		width: 100%;
	}
	.c_quotationpdf__contwogroup--sec:nth-child(2) table{
		width: 100%;
	}*/
	/************************** STYLES BY PDF - COPY **************************/
	#title_quoteservices{
		margin: 20px 0 0 0;
	}
	#marc_fill1{
    display: block;
    max-width: 794px;
    width: 100%;
    height: auto;
    position: relative;
	}
	.marc_fill{
    display: block;
    max-width: 794px;
    width: 100%;
    height: auto;
    border: 1px #FFFFFF dashed;
    position: relative;
	}
	#marc_fill2{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 8pt;
    display: block;
    max-width: 794px;
    width: auto;
    height: auto;
    border: 1px #FFFFFF dashed;
    position: relative;
	}
	#logo{
		max-width: 11rem;
    width:auto;
    height:auto;
    border:0px #FF0000 dashed;
    display:inline-block;
    position: relative;
    margin: 20px 0px 0px 0px;
	}
	#marc_cab{
    max-width: 350px;
    width: 100%;
    height: auto;
    border: 0px #FF0000 dashed;
    display: inline-block;
    position: relative;
    margin: 0 0px 0px 100px;
	}
	#marc_cab_izq{
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 14pt;
    width: 170px;
    height: auto;
    border: 0px #FF0000 dashed;
    color: #404040;
    display: inline-block;
    position: relative;
    margin: 0;
	}
	#marc_cab_der{
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 14pt;
    width: 170px;
    height: auto;
    border: 0px #FF0000 dashed;
    color: #404040;
    display: inline-block;
    position: relative;
    margin: 0;
	}
	#corr_cot{
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 19pt;
    width: 170px;
    height: auto;
    border: 0px #FF0000 dashed;
    color: #07376E;
    display: inline-block;
    position: relative;
    margin: 0;
	}
	#fech_cot{
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 11pt;
    width: 90px;
    height: auto;
    border: 0px #FF0000 dashed;
    color: #757171;
    display: inline-block;
    position: relative;
    margin: 0;
	}
	#marc_dat1{
    font-family:Sans-serif;
    font-weight: bold;
    font-size: 9pt;
    width:490px;
    height:50px;
    border: 1px #07376E solid;
    border-radius:8px;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;  
	}
	#marc_dat2{
    font-family:Sans-serif;
    font-weight: bold;
    font-size: 9pt;
    width:225px;
    height:50px;
    border: 1px #07376E solid;
    border-radius:8px;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	#marc_dat1_izq{
    width:125px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_dat11_izq{
    width:80px;
    height:30px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: -20px 0px 0px 0px;
	}
	.item_marc_dat1{
    width:100px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 20px;
	}
	#marc_dat1_cent{
    width:10px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}

	.item_dpt_dat1{
    width:5px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_dpt1_dat1{
    width:5px;
    height:5px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: -24px 0px 0px 40px;
	}
	#marc_dat1_der{
    width:200px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_dat1_der1{
    width:100px;
    height:30px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: -20px 0px 0px 30px;
	}
	.item_demp_dat1{
    width:200px;
    height:10px;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_dat1_derr1{
    width:120px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 7px 0px 0px 0px;
	}
	.item_demp_datt1{
    width:100px;
    height:10px;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_marc2_dat1{
    width:85px;
    height:15px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 0px 0px 0px 10px;
	}
	#marc_dat2_cent{
    width:15px;
    height:50px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 20px 0px 0px -35px;
	}
	.item_demp2_dat1{
    width:100px;
    height:10px;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_dat3{
    font-family:Sans-serif;
    font-weight: bold;
    font-size: 9pt;
    width:720px;
    height:80px;
    border: 1px #07376E solid;
    border-radius:10px;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_dat3_izq{
    width:125px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	.item_marc3_dat1{
    width:110px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 20px;
	}
	#marc_dat3_cent{
    width:10px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	.item_dpt3_dat1{
    width:5px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_demp3_dat1{
    width:250px;
    height:10px;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_marc3_dat2{
    width:53px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_dat3_der{
    width:250px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	#marc_dat3_derr1{
    width:55px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	#marc_dat3_cent1{
    width:45px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 0px;
	}
	.item_por3_dat1{
    width:45px;
    height:10px;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_dat3_derr11{
    width:145px;
    height:42px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: -5px 0px 0px 10px;
	}
	.item_tpor3_dat1{
    width:145px;
    height:10px;
    font-weight: normal;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: -4px 0px 7px 0px;
	}
	#marc_imp{
    width:360px;
    height:15px;
    font-family:Sans-serif;
    font-weight: normal;
    text-align:center;
    border: 0px #FF0000 dashed;
    color:#07376E;
    display:inline-block;
    position: relative;
    margin: -10px 0px 0px 0px;
	}
	#marc_ser_log{
    width:360px;
    height:15px;
    font-family:Sans-serif;
    font-weight: normal;
    text-align:center;
    border: 0px #FF0000 dashed;
    color:#07376E;
    display:inline-block;
    position: relative;
    margin: -10px 0px 0px 0px;
	}
	#marc_det_imp{
    width:360px;
    height:460px;
    border: 1px #07376E solid;
    border-radius:9px;
    display:inline-block;
    position: relative;
    margin: 50px 0px 0px 0px;
	}
	#marc_det_er_log{
    width:360px;
    height:460px;
    font-family:Sans-serif;
    font-weight: normal;
    border: 0px #FF0000 dashed;
    color:#07376E;
    display:inline-block;
    position: relative;
    margin: 50px 0px 0px 0px;
	}
	#marc_det_1er_log{
    width:360px;
    height:366px;
    font-family:Sans-serif;
    font-weight: normal;
    border: 1px #07376E solid;
    border-radius:9px;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_det_inf1_log{
    width:360px;
    height:40px;
    font-family:Sans-serif;
    font-weight: normal;
    text-align:center;
    border: 1px #07376E solid;
    border-radius:9px;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_det_inf2_log{
    width:360px;
    height:40px;
    text-align:center;
    border: 1px #07376E solid;
    border-radius:9px;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_det_imp1{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:115px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 25px 0px 0px 20px;
	}
	.item_marc_det_imp1{
    width:110px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_porc_det_imp1{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:40px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 25px 0px 0px 0px;
	}
	.item_marc_porc_det_imp1{
    width:40px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_marc_usd_det_imp1{
    width:40px;
    height:10px;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_usd_tot_imp1{
    width:110px;
    height:10px;
    border: 0px #FF0000 dashed;
    text-align:right;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_det_tot_imp1{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:115px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 25px 0px 0px 0px;
	}
	#marc_det_serv1{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:227px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 45px 0px 0px 20px;
	}
	.item_marc_det_serv1{
    width:227px;
    height:10px;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_usd_det_ser1{
    width:10px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 42px 0px 0px 0px;
	}
	.item_marc_usd_det_ser1{
    width:10px;
    height:10px;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_tot_ser{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:80px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 45px 0px 0px 0px;
	}
	.item_marc_tot_ser{
    width:80px;
    height:10px;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	} 
	#marc_det_serinf_serv1{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:227px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 5px 0px 0px 20px;
	}
	.item_marc_det_serinf_serv1{
    width:227px;
    height:10px;
    text-align:left;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	#marc_usd_detinf1_ser1{
    width:10px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_totinf1_ser{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:80px;
    height:auto;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:inline-block;
    position: relative;
    margin: 0px 0px 0px 0px;
	}
	#marc_det_cuentas{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:360px;
    height:40px;
    text-align:center;
    border: 1px #07376E solid;
    border-radius:9px;
    display:inline-block;
    position: relative;
    margin: -25px 0px 0px 0px;
	} 
	#marc_des_monto{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:360px;
    height:40px;
    text-align:center;
    border: 1px #07376E solid;
    border-radius:9px;
    display:inline-block;
    position: relative;
    margin: -25px 0px 0px 0px;
	}
	.item_marc_tot_ser11{
    width:80px;
    height:10px;
    font-size: 19pt;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin: 4px 0px 0px 0px;
	}
	.item_marc_usd_det_ser11{
    width:10px;
    height:10px;
    text-align:right;
    border: 0px #FF0000 dashed;
    color:#757171;
    display:block;
    position: relative;
    margin:20px 0px -10px -55px;
	}
	.marc_num_cuentas{
    font-family:Sans-serif;
    font-weight: normal;
    font-size: 9pt;
    width:360px;
    height:87px;
    text-align:center;
    border: 1px #07376E solid;
    border-radius:9px;
    display:inline-block;
    position: relative;
    margin: -6px 0px 0px 0px;
	}
	.cuad_tit_cuent1{
    font-family:Sans-serif;
    font-size: 9pt;
    width:280px;
    height:10px;
    color:#757171;
    text-align:left;
    border: 0px #FF0000 dashed;
    display:block;
    position: relative;
    margin: 5px 0px 0px 15px;
	}
</style>
<body>
	<!-- <div id="cont_quotationpdf" class="c_quotationpdf">
		<table class="c_quotationpdf__cTop" border="1">
			<thead>
				<tr class="remove_space-thead">
					<th>&nbsp;</th>
					<th colspan="2">&nbsp;</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td rowspan="2">
						<div class="c_quotationpdf__cTop--cLogo">
							<img src="../vendor/dompdf/logotipo-camel.png" alt="" class="c_quotationpdf__cTop--cLogo--img" width="100" height="100">
						</div>
					</td>
					<td>
						<div class="c_quotationpdf__cTop--cCodeDate--secL">
							<h3 class="reset_st_hs">COTIZACIÓN</h3>
						</div>
					</td>
					<td>
						<div class="c_quotationpdf__cTop--cCodeDate--secR">
							<h2 class="reset_st_hs">A000905</h2>
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="c_quotationpdf__cTop--cCodeDate--secL">
							<h3 class="reset_st_hs">FECHA</h3>
						</div>
					</td>
					<td>
						<div class="c_quotationpdf__cTop--cCodeDate--secR">
							<p class="reset_st_p c-grey">21/09/2021</p>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="c_quotationpdf__contwogroup">
			<div class="c_quotationpdf__contwogroup--sec">
				<table border="1">
					<thead>
						<tr class="remove_space-thead">
							<th colspan="6">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Empresa</td>
							<td>:</td>
							<td class="c-grey">-</td>
							<td>Ruc/DNI</td>
							<td>:</td>
							<td class="c-grey">0</td>
						</tr>
						<tr>
							<td>Atención</td>
							<td>:</td>
							<td class="c-grey" colspan="4">-</td>
						</tr>
						<tr>
							<td>Dirección</td>
							<td>:</td>
							<td class="c-grey" colspan="4">-</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="c_quotationpdf__contwogroup--sec">
				<table border="1">
					<thead>
						<tr class="remove_space-thead">
							<th colspan="3">&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Teléfono</td>	
							<td>:</td>
							<td class="c-grey">0</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div> -->
	<div id="cont_quotationpdf">
		<div id="marc_fill1">
			<div class="c_quotationpdf__cTop--cLogo">
	    	<img id="logo"  src="../vendor/dompdf/logotipo-camel.png" alt="" class="c_quotationpdf__cTop--cLogo--img" width="100" height="100">
			</div>
	    <div id="marc_cab">
	      <div id="marc_cab_izq">
	      	<br>COTIZACION<br><br>FECHA
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
	        <div class="item_demp_dat1">'.$ruc.'</div>
	        <div class="item_demp_dat1"></div>
	        <div class="item_demp_dat1">'.$correo.'</div>
	      </div>
	      <div id="marc_dat1_derr1">
	        <div class="item_demp_datt1">Ruc / DNI</div>
	        <div class="item_demp_datt1">'.$ruc.'</div>
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
		      <div class="item_demp2_dat1">'.$celular.'</div>
		      <div class="item_demp2_dat1">'.$correo.'</div>
	    	</div>
	  	</div>
		</div>
	  <div class="marc_fill">
	    <div id="marc_dat3">
	      <div id="marc_dat3_izq">
	        <div class="item_marc3_dat1">Servicio</div>
	        <div class="item_marc3_dat1">Contenido</div>
	        <div class="item_marc3_dat1">Origen</div>
	        <div class="item_marc3_dat1">Peso/Volumen</div>
	        <div class="item_marc3_dat1">Tiempo de Transit</div>
	      </div>
	      <div id="marc_dat3_cent">
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	        <div class="item_dpt3_dat1">:</div>
	      </div>
	      <div id="marc_dat3_der">
	        <div class="item_demp3_dat1">'.$tipo_flete.'</div>
	        <div class="item_demp3_dat1">'.$tipo_producto_id.'</div>
	        <div class="item_demp3_dat1">'.$puerto_origen.'</div>
	        <div class="item_demp3_dat1"></div>
	        <div class="item_demp3_dat1">'.$correo.'</div>
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
	        <div class="item_dpt3_dat1"></div>
	      </div>
	      <div id="marc_dat3_cent1">
	        <div class="item_por3_dat1"></div>
	        <div class="item_por3_dat1"></div>
	        <div class="item_por3_dat1">1.00 %</div>
	        <div class="item_por3_dat1"></div>
	        <div class="item_por3_dat1"></div>
	      </div>
	      <div id="marc_dat3_cent">
	        <div class="item_dpt3_dat1">$
	        	<div class="item_dpt3_dat1">$</div>
		        <div class="item_dpt3_dat1">$</div>
		        <div class="item_dpt3_dat1">$</div>
		        <div class="item_dpt3_dat1"></div>
	      	</div>
	      <div id="marc_dat3_derr11">
	        <div class="item_tpor3_dat1">100</div>
	        <div class="item_tpor3_dat1">100</div>
	        <div class="item_tpor3_dat1">100</div>
	        <div class="item_tpor3_dat1">100</div>
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill" id="title_quoteservices">
	    <div id="marc_imp">IMPUESTOS</div>
	    <div id="marc_ser_log">SERVICIOS CAMEL LOGISTICS</div>
	  </div>
	  <div class="marc_fill">
	    <div id="marc_det_imp">
	      <div id="marc_det_imp1">
	        <div class="item_marc_det_imp1">I.G.V</div>
	        <div class="item_marc_det_imp1">I.P.M.</div>
	        <div class="item_marc_det_imp1">Percepción</div>
	        <div class="item_marc_det_imp1">Ad-Valoren</div>
	        <div class="item_marc_det_imp1">Impuesto selectivo</div>
	      </div>
	      <div id="marc_porc_det_imp1">
	        <div class="item_marc_porc_det_imp1">16%</div>
	        <div class="item_marc_porc_det_imp1">2.00%</div>
	        <div class="item_marc_porc_det_imp1">3.5%    </div>
	        <div class="item_marc_porc_det_imp1">0.0%</div>
	        <div class="item_marc_porc_det_imp1">0%</div>
	      </div>
	      <div id="marc_porc_det_imp1">
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	        <div class="item_marc_usd_det_imp1">$</div>
	      </div>
	      <div id="marc_det_tot_imp1">
	        <div class="item_usd_tot_imp1">100</div>
	        <div class="item_usd_tot_imp1">100</div>
	        <div class="item_usd_tot_imp1">100</div>
	        <div class="item_usd_tot_imp1"></div>
	        <div class="item_usd_tot_imp1"></div>
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
	        <div id="marc_det_serinf_serv1">
	          <div class="item_marc_det_serinf_serv1">Total Servicios Camel Logistics</div>
	        </div>
	        <div id="marc_usd_detinf1_ser1">
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="marc_totinf1_ser">
	          <div class="item_marc_tot_ser">100</div>
	        </div>
	      </div>
	      <div id="marc_det_inf2_log">
	        <div id="marc_det_serinf_serv1">
	          <div class="item_marc_det_serinf_serv1">I.G.V Servicios Camel Logistics</div>
	        </div>
	        <div id="marc_usd_detinf1_ser1">
	          <div class="item_marc_usd_det_ser1">$</div>
	        </div>
	        <div id="marc_totinf1_ser">
	          <div class="item_marc_tot_ser">100</div>
	        </div>     
	      </div>
	    </div>
	  </div>
	  <div class="marc_fill">
	    <div id="marc_det_cuentas">
	      <div id="marc_det_serinf_serv1">
	        <div class="item_marc_det_serinf_serv1">Total Impuestos a Pagar</div>
	      </div>
	      <div id="marc_usd_detinf1_ser1">
		      <div class="item_marc_usd_det_ser11"><strong>$</strong></div>
	      </div>
	      <div id="marc_totinf1_ser">
	        <div class="item_marc_tot_ser11"><strong>100</strong></div>
	      </div>        
	    </div>
	    <div id="marc_des_monto">
	      <div id="marc_det_serinf_serv1">
	        <div class="item_marc_det_serinf_serv1">Total Proforma Camel Logistics</div>
	      </div>
	      <div id="marc_usd_detinf1_ser1">
	        <div class="item_marc_usd_det_ser11"><strong>$</strong></div>
	      </div>
	      <div id="marc_totinf1_ser">
	        <div class="item_marc_tot_ser11"><strong>100</strong></div>
	      </div>     
	    </div>
	  </div>
	  <div class="marc_fill">
	    <div class="marc_num_cuentas">
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP SOLES</strong></div>
	      <div class="cuad_tit_cuent1">191-2412689-0-94</div>
	      <div class="cuad_tit_cuent1"><strong>CUENTAS CORRIENTES BCP DOLARES</strong></div>
	      <div class="cuad_tit_cuent1">191-2403408-1-57</div>
	    </div>
	    <div class="marc_num_cuentas">
	      <br>
	      <div class="cuad_tit_cuent1">Son:</div>
	      <div class="cuad_tit_cuent1"><!--DOS MIL SETECIENTOS SETENTA Y NUEVE--></div>
	      <div class="cuad_tit_cuent1"><!--28/100 DOLARES--></div>
	    </div>
	  </div>
	  <div id="marc_fill2">
	    <center>
	      Av. Dos de Mayo 1545 Of. 318 San Isidro - Lima<br>
	      Email. info@camel.com.pe / Telf. 989 874 368<br>
	      www.camel.com.pe
	    </center>
	  </div>
	</div>
</body>
</html>