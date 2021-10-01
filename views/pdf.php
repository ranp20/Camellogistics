<?php
  require_once('conexion.php');
  require '../vendor/autoload.php';
  $user_id=$_GET['ID'];

  $result = $conexion->query("SELECT co.celular,co.correo,co.ruc,co.fecha_creation,co.user_cotizacion_id,cm.sub_total_containers,cm.tipo_flete,cm.contenedor_tipo_id,co.servicios_1,co.servicios_2,co.servicios_3,co.servicios_4,co.tipo_producto_id,co.valor_producto,co.trans_origen,co.trans_destino,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
          FROM tbl_user_cotizacion co
          inner join tbl_detail_cotizacion_maritima cm on cm.user_cotizacion_id=co.user_cotizacion_id
          inner join tbl_aq_puertos tpu on tpu.puerto_id=cm.puerto_origen_id
          inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=cm.puerto_destino_id
          inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
          inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
          where cm.user_cotizacion_id=$user_id;");	
          if ($result->num_rows > 0) {
              while ($row = $result->fetch_assoc()) {       
                  $cotizacion_id= $row['user_cotizacion_id']; 
                  $puerto_origen= $row['puerto_origen'];
                  $fecha_cot=$row['fecha_creation'];
                  $ruc=$row['ruc'];
                  $correo=$row['correo'];
                  $sub_total_containers=$row['sub_total_containers'];
                  $tipo_flete=$row['tipo_flete'];
                  $puerto_origen=$row['puerto_origen'];
                  $celular=$row['celular'];
                  $tipo_producto_id=$row['tipo_producto_id'];
                  $valor_producto=$row['valor_producto'];
                  $servicios_4=$row['servicios_4'];
                  
              }
          }
          $val_seguro=0;
          if($servicios_4==4){
              if($valor_producto>15000){
                  $val_seguro=$valor_producto*0.01;
              }                    
              else{
                  $val_seguro=60;
              }    
          }
          $cif=( $valor_producto+$sub_total_containers+$val_seguro);
          $igv=$cif*0.16;
          $ipm=$cif*0.02;
          $percepcion=($cif+$igv+$ipm)*0.035;

          $total_impuestos=($igv+$ipm+$percepcion);

          /* check 1 seleccionado */
          $servicios_1=0;
          if($servicios_1==1){
              $BLEWB=90;
              $handling=0;
              $visto_bueno=330;
              $descarga=0;
              $almacen_referencial=500;
              $gremios_mar=250;
              $thc=90;
              $dev_contenedores=220;
              $com_agencia=140;
              $gastos_operativos=45;
          }else if($servicios_1==0){
              $BLEWB=0;
              $handling=0;
              $visto_bueno=0;
              $descarga=0;
              $almacen_referencial=0;
              $gremios_mar=0;
              $thc=0;
              $dev_contenedores=0;
              $com_agencia=0;
              $gastos_operativos=0;
          }
          /*************************/
          
          
          $total_servicios_camel=($sub_total_containers+$BLEWB+ $handling+$visto_bueno+$descarga+$almacen_referencial+$gremios_mar+$thc+$dev_contenedores+$com_agencia+$gastos_operativos);

          $igv_ser_camel=($total_servicios_camel-$sub_total_containers)*0.18;

          $tot_prof_camel=$total_servicios_camel+$igv_ser_camel;

          

 $html='
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cotizacion</title>
      <style>
          #marc_fill1{
              display: block;
              width: 730px;
              height: auto;
              border: 0px #FF0000 dashed;
              position: relative;
              margin: -20px 0px 0px 0px;
          }
          .marc_fill{
              display: block;
              width: 730px;
              height: auto;
              border: 1px #FFFFFF dashed;
              position: relative;
              margin: 0px 0px 0px 0px;
          }
          #marc_fill2{
              font-family:Sans-serif;
              font-weight: normal;
              font-size: 8pt;
              display: block;
              width: 730px;
              height: auto;
              border: 1px #FFFFFF dashed;
              position: relative;
              margin: -20px 0px 0px 0px;
          }
          #logo{
              width:250px;
              height:110px;
              border:0px #FF0000 dashed;
              display:inline-block;
              position: relative;
              margin: 20px 0px 0px 0px;
          }
          #marc_cab{
              width:350px;
              height:120px;
              border:0px #FF0000 dashed;
              display:inline-block;
              position: relative;
              margin: 20px 0px 0px 100px;
          }
          #marc_cab_izq{
              font-family:Sans-serif;
              font-weight: bold;
              font-size: 14pt;
              width:170px;
              height:120px;
              border:0px #FF0000 dashed;
              color:#404040;
              display:inline-block;
              position: relative;
              margin: 10px 0px 0px 0px;
          }
          #marc_cab_der{
              font-family:Sans-serif;
              font-weight: bold;
              font-size: 14pt;
              width:170px;
              height:120px;
              border:0px #FF0000 dashed;
              color:#404040;
              display:inline-block;
              position: relative;
              margin: 10px 0px 0px 0px;
          }
          #corr_cot{
              font-family:Sans-serif;
              font-weight: bold;
              font-size: 19pt;
              width:170px;
              height:40px;
              border:0px #FF0000 dashed;
              color:#07376E;
              display:inline-block;
              position: relative;
              margin: 10px 0px 0px 0px;
          }
          #fech_cot{
              font-family:Sans-serif;
              font-weight: bold;
              font-size: 11pt;
              width:90px;
              height:20px;
              border:0px #FF0000 dashed;
              color:#757171;
              display:inline-block;
              position: relative;
              margin: 40px 0px 0px -130px;
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
  </head>
  <body>
      <div id="marc_fill1">
          <img id="logo" src="http://localhost/Camellogistics/views/img/logotipo-camel.png">
          <div id="marc_cab">
              <div id="marc_cab_izq">
              <br>
                 COTIZACION<br><br>
                  FECHA
              </div>
              <div id="marc_cab_der">
                  <div id="corr_cot">CT 000000'.$cotizacion_id.'</div>
                  <div id="fech_cot">'.$fecha_cot.'</div>
              </div>
          </div>
      </div>
      <div class="marc_fill">
          <div id="marc_dat1">
              <div id="marc_dat1_izq">
                  <div class="item_marc_dat1">
                      Empresa
                  </div>
                  <div class="item_marc_dat1">
                      Atención
                  </div>
                  <div class="item_marc_dat1">
                      Direccion
                  </div>
              </div>
              <div id="marc_dat1_cent">
                  <div class="item_dpt_dat1">
                      :
                  </div>
                  <div class="item_dpt_dat1">
                      :
                  </div>
                  <div class="item_dpt_dat1">
                      :
                  </div>
              </div>
              <div id="marc_dat1_der">
                  <div class="item_demp_dat1">
                      '.$ruc.'
                  </div>
                  <div class="item_demp_dat1">
                  </div>
                  <div class="item_demp_dat1">
                      '.$correo.'
                  </div>
              </div>
              <div id="marc_dat1_derr1">
                  <div class="item_demp_datt1">
                      Ruc / DN
                  </div>
                  <div class="item_demp_datt1">
                      '.$ruc.'
                  </div>
              </div>
              
          </div>
          <div id="marc_dat2">
          <div id="marc_dat11_izq">
          <div class="item_marc2_dat1">
              Telefono
          </div>
          <div class="item_marc2_dat1">
              P. Arancela
          </div>
          
      </div>
      <div id="marc_dat2_cent">
          <div class="item_dpt1_dat1">
              :
          </div>
          <div class="item_dpt1_dat1">
              :
          </div>
          
      </div>
      <div id="marc_dat1_der1">
          <div class="item_demp2_dat1">
              '.$celular.'
          </div>
          <div class="item_demp2_dat1">
              '.$correo.'
          </div>
      </div>
  </div>
</div>

      <div class="marc_fill">
          <div id="marc_dat3">
              <div id="marc_dat3_izq">
                  <div class="item_marc3_dat1">
                      Servicio
                  </div>
                  <div class="item_marc3_dat1">
                      Contenido
                  </div>
                  <div class="item_marc3_dat1">
                      Origen
                  </div>
                  <div class="item_marc3_dat1">
                      Peso/Volumen
                  </div>
                  <div class="item_marc3_dat1">
                      Tiempo de Transit
                  </div>
              </div>
              <div id="marc_dat3_cent">
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
              </div>
              <div id="marc_dat3_der">
                  <div class="item_demp3_dat1">
                      '.$tipo_flete.'
                  </div>
                  <div class="item_demp3_dat1">
                      '.$tipo_producto_id.'
                  </div>
                  <div class="item_demp3_dat1">
                      '.$puerto_origen.'
                  </div>
                  <div class="item_demp3_dat1">
                  </div>
                  <div class="item_demp3_dat1">
                      '.$correo.'
                  </div>
              </div>
              <div id="marc_dat3_derr1">
                  <div class="item_marc3_dat2">
                      FOB
                  </div>
                  <div class="item_marc3_dat2">
                      FLETE
                  </div>
                  <div class="item_marc3_dat2">
                      SEGURO
                  </div>
                  <div class="item_marc3_dat2">
                      CIF
                  </div>
              </div>
              <div id="marc_dat3_cent">
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      :
                  </div>
                  <div class="item_dpt3_dat1">
                      
                  </div>
              </div>
              <div id="marc_dat3_cent1">
                  <div class="item_por3_dat1">
                      
                  </div>
                  <div class="item_por3_dat1">
                      
                  </div>
                  <div class="item_por3_dat1">
                      1.00 %
                  </div>
                  <div class="item_por3_dat1">
                      
                  </div>
                  <div class="item_por3_dat1">
                      
                  </div>
              </div>
              <div id="marc_dat3_cent">
                  <div class="item_dpt3_dat1">
                      $
                  <div class="item_dpt3_dat1">
                      $
                  </div>
                  <div class="item_dpt3_dat1">
                      $
                  </div>
                  <div class="item_dpt3_dat1">
                      $
                  </div>
                  <div class="item_dpt3_dat1">
                      
                  </div>
              </div>
              <div id="marc_dat3_derr11">
                  <div class="item_tpor3_dat1">
                      '.number_format($valor_producto, 2,'.',',').'
                  </div>
                  <div class="item_tpor3_dat1">
                      '.number_format($sub_total_containers, 2,'.',',').'
                  </div>
                  <div class="item_tpor3_dat1">
                      '.number_format($val_seguro, 2,'.',',').'
                  </div>
                  <div class="item_tpor3_dat1">
                      '.number_format($cif, 2,'.',',').'
                  </div>
                 
              </div>
          </div>
      </div>

      <div class="marc_fill">
          <div id="marc_imp">IMPUESTOS</div>
          <div id="marc_ser_log">SERVICIOS CAMEL LOGISTICS</div>

      </div>
      <div class="marc_fill">
          <div id="marc_det_imp">
              <div id="marc_det_imp1">
                  <div class="item_marc_det_imp1">
                      I.G.V
                  </div>
                  <div class="item_marc_det_imp1">
                      I.P.M.
                  </div>
                  <div class="item_marc_det_imp1">
                      Percepción
                  </div>
                  <div class="item_marc_det_imp1">
                      Ad-Valoren
                  </div>
                  <div class="item_marc_det_imp1">
                      Impuesto selectivo
                  </div>
              </div>
              <div id="marc_porc_det_imp1">
                  <div class="item_marc_porc_det_imp1">
                      16%
                  </div>
                  <div class="item_marc_porc_det_imp1">
                      2.00%
                  </div>
                  <div class="item_marc_porc_det_imp1">
                      3.5%    
                  </div>
                  <div class="item_marc_porc_det_imp1">
                      0.0%
                  </div>
                  <div class="item_marc_porc_det_imp1">
                      0%
                  </div>
              </div>
              <div id="marc_porc_det_imp1">
                  <div class="item_marc_usd_det_imp1">
                      $
                  </div>
                  <div class="item_marc_usd_det_imp1">
                      $
                  </div>
                  <div class="item_marc_usd_det_imp1">
                      $    
                  </div>
                  <div class="item_marc_usd_det_imp1">
                      $
                  </div>
                  <div class="item_marc_usd_det_imp1">
                      $                        
                  </div>
              </div>
              <div id="marc_det_tot_imp1">
                  <div class="item_usd_tot_imp1">
                      '.number_format($igv, 2,'.',',').'
                  </div>
                  <div class="item_usd_tot_imp1">
                      '.number_format($ipm, 2,'.',',').'
                  </div>
                  <div class="item_usd_tot_imp1">
                      '.number_format($percepcion, 2,'.',',').'
                  </div>
                  <div class="item_usd_tot_imp1">
                     
                  </div>
                  <div class="item_usd_tot_imp1">
                      
                  </div>
              </div>
          </div>
          <div id="marc_det_er_log">
              <div id="marc_det_1er_log">
                  <div id="marc_det_serv1">
                      <div class="item_marc_det_serv1">
                          Flete Internacional (no esta afecto a IGV)
                      </div>
                      <div class="item_marc_det_serv1">
                          Pickup , ADUANAS ORIGEN
                      </div>
                      <div class="item_marc_det_serv1">
                          Emision de BL / EWB
                      </div>
                      <div class="item_marc_det_serv1">
                          Handling
                      </div>
                      <div class="item_marc_det_serv1">
                          visto bueno
                      </div>
                      <div class="item_marc_det_serv1">
                          Descarga
                      </div>
                      <div class="item_marc_det_serv1">
                          * Almacen Referencial
                      </div>
                      <div class="item_marc_det_serv1">
                          Transporte interno
                      </div>
                      <div class="item_marc_det_serv1">
                          Previo
                      </div>
                      <div class="item_marc_det_serv1">
                          Gremios maritimos
                      </div>
                      <div class="item_marc_det_serv1">
                          THC
                      </div>
                      <div class="item_marc_det_serv1">
                          * Devolucion de contenedores
                      </div>
                      <div class="item_marc_det_serv1">
                          CERTIFICADO DE INSPECCION Y
                      </div>
                      <div class="item_marc_det_serv1">
                          FICHA TECNICA
                      </div>
                      <div class="item_marc_det_serv1">
                          Consolidación
                      </div>
                       <div class="item_marc_det_serv1">
                          Aforo fisico
                      </div>
                      <div class="item_marc_det_serv1">
                          Comision de Agencia 
                      </div>
                      <div class="item_marc_det_serv1">
                          Gastos Operativos
                      </div>
                  </div>
                  <div id="marc_usd_det_ser1">
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                  </div>
                  <div id="marc_tot_ser">
                      <div class="item_marc_tot_ser">
                          '.number_format($sub_total_containers, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($BLEWB, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($handling, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($visto_bueno, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($descarga, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($almacen_referencial, 2,'.',',').'
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser"> 
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($gremios_mar, 2,'.',',').'   
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($thc, 2,'.',',').'   
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($dev_contenedores, 2,'.',',').' 
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          -
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($com_agencia, 2,'.',',').' 
                      </div>
                      <div class="item_marc_tot_ser">
                          '.number_format($gastos_operativos, 2,'.',',').'
                      </div>
                  </div>
              </div>
              <div id="marc_det_inf1_log">
                  <div id="marc_det_serinf_serv1">
                      <div class="item_marc_det_serinf_serv1">
                          Total Servicios Camel Logistics
                      </div>
                  </div>
                  <div id="marc_usd_detinf1_ser1">
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                  </div>
                  <div id="marc_totinf1_ser">
                      <div class="item_marc_tot_ser">
                          '.number_format($total_servicios_camel, 2,'.',',').'
                      </div>
                  </div>     
              </div>
              <div id="marc_det_inf2_log">
                  <div id="marc_det_serinf_serv1">
                      <div class="item_marc_det_serinf_serv1">
                          I.G.V Servicios Camel Logistics
                      </div>
                  </div>
                  <div id="marc_usd_detinf1_ser1">
                      <div class="item_marc_usd_det_ser1">
                          $
                      </div>
                  </div>
                  <div id="marc_totinf1_ser">
                      <div class="item_marc_tot_ser">
                          '.number_format($igv_ser_camel, 2,'.',',').'
                      </div>
                  </div>     
              </div>
          </div>
      </div>
      <div class="marc_fill">
          <div id="marc_det_cuentas">
              <div id="marc_det_serinf_serv1">
                  <div class="item_marc_det_serinf_serv1">
                      Total Impuestos a Pagar
                  </div>
              </div>
              <div id="marc_usd_detinf1_ser1">
                  <div class="item_marc_usd_det_ser11">
                      <strong>$</strong>
                  </div>
              </div>
              <div id="marc_totinf1_ser">
                  <div class="item_marc_tot_ser11">
                      <strong>'.number_format($total_impuestos, 2,'.',',').'</strong>
                  </div>
              </div>        
          </div>
          <div id="marc_des_monto">
              <div id="marc_det_serinf_serv1">
                  <div class="item_marc_det_serinf_serv1">
                      Total Proforma Camel Logistics
                  </div>
              </div>
              <div id="marc_usd_detinf1_ser1">
                  <div class="item_marc_usd_det_ser11">
                      <strong>$</strong>
                  </div>
              </div>
              <div id="marc_totinf1_ser">
                  <div class="item_marc_tot_ser11">
                      <strong>'.number_format($tot_prof_camel, 2,'.',',').'</strong>
                  </div>
              </div>     
          </div>
      </div>

      <div class="marc_fill">
          <div class="marc_num_cuentas">
              <div class="cuad_tit_cuent1">
                  <strong>CUENTAS CORRIENTES BCP SOLES</strong>
              </div>
              <div class="cuad_tit_cuent1">
                  191-2412689-0-94
              </div>
              <div class="cuad_tit_cuent1">
                  <strong>CUENTAS CORRIENTES BCP DOLARES</strong>
              </div>
              <div class="cuad_tit_cuent1">
                  191-2403408-1-57
              </div>
          </div>
          <div class="marc_num_cuentas">
              <br>
              <div class="cuad_tit_cuent1">
                  Son:
              </div>
              <div class="cuad_tit_cuent1">
                  <!--DOS MIL SETECIENTOS SETENTA Y NUEVE-->
              </div>
              <div class="cuad_tit_cuent1">
                  <!--28/100 DOLARES-->
              </div>

          </div>
      </div>
      <div id="marc_fill2">
          <center>
              Av. Dos de Mayo 1545 Of. 318 San Isidro - Lima<br>
              Email. info@camel.com.pe / Telf. 989 874 368<br>
              www.camel.com.pe
          </center>
      </div>

      

  </body>
  </html>

';

use Dompdf\Dompdf;
$dompdf=new Dompdf(array('enable_remote' => true));
$dompdf->loadHtml($html);
$dompdf->render();
$dompdf->stream("documento.pdf",array('Attachment'=>'0'))
?>