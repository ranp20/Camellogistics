<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_POST) || $_POST == []){
  header("Location: marketplace-logistico");
}else{
  if(!isset($_SESSION['user_camel'])){
    $_SESSION['user_camel'] = array('username' => "Invitado");
  }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Descarga tu Cotización</title>
  <?php require_once 'includes/inc_header-links.php';?>
  <!-- INCLUIR SWEET ALERT 2 -->
  <link rel="stylesheet" href="node_modules/sweetalert2/dist/sweetalert2.min.css">
  <script type="text/javascript" src="node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
  <!-- INCLUIR CRYPTO-JS -->
  <script type="text/javascript" src="node_modules/crypto-js/crypto-js.js"></script>
</head>
<body>
  <div id="cUIMessageValid-user"></div>
  <?php require_once 'includes/inc_header-top.php'; ?>
  <main class="cont-MainCamelLog" id="cont-MainCamelLog">
    <div class="cont-MainCamelLog--c" id="cont-MainCamelLog--cFinalDownloadQuoteReturn">
      <div class="box-container">
        <div class="c-FinalQuotation--contStep--cQuotation">
          <div class="c-FinalQuotation--contStep--cQuotation--cBtnDownload">
            <a href="javascript:void(0);" class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn" id="btn-requireDownloadQuotaion_one" title="Descarga tu presupuesto">
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--cIcon">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
              </span>
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--text">DESCARGA TU PRESUPUESTO</span>
            </a>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cTop">
            <p class="c-FinalQuotation--contStep--cQuotation--cTop--title">Resumen de carga</p>
            
            <div class="c-FinalQuotation--contStep--cQuotation--cTop--c">
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo">
                <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo">
                  <?php
                    if($_POST['idtypetransportsendinit'] == 1){
                      echo "<img src='{$url}assets/img/utilities/fleteMaritimo.png' alt='fletemaritimoicon_camel' width='100' height='100'>";
                    }else if($_POST['idtypetransportsendinit'] == 2){
                      echo "<img src='{$url}assets/img/utilities/fleteAereo.png' alt='fleteaereoicon_camel' width='100' height='100'>";
                    }else{
                      echo "<img src='{$url}assets/img/logos/logotipo-camel.png' alt='icon_camellogistics' width='100' height='100'>";
                    }
                  ?>
                  <?php 

                    if(isset($_POST['val-originPortSend']) && isset($_POST['val-destinyPortSend'])){
                      echo "
                        <p class='c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo--info' id='v-listportsOandD'>
                          <span>".strtoupper($_POST['val-originPortSend'])."</span>
                          <span>&#8594;</span>
                          <span>".strtoupper($_POST['val-destinyPortSend'])."</span>
                        </p>
                      ";
                    }else{
                      echo "<p class='c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo--info'>
                        <span><b>DESPACHO DE ADUANAS</b></span>
                      </p>";
                    }
                  ?>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cCodeQuotation">
                  <p>
                    <span>ID:&nbsp;</span>
                    <span>
                      <span id="v_gencodexxx"><?= (isset($_POST['ipt-vcodgeneratex']) && $_POST['ipt-vcodgeneratex'] != "") ? $_POST['ipt-vcodgeneratex'] : ""; ?></span>
                      <span> - </span>
                      <span><?= $_POST['loadTypeCharge']; ?></span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation">
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m" id="m-first-listresume">
                  <?php 
                    $t_05 = "";
                    if(isset($_POST['idtypetransportsendinit'])){
                      if($_POST['idtypetransportsendinit'] == 1){
                        $t_05 = "MARÍTIMO";
                        echo "<li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Transporte</span>
                            <span>{$t_05}</span>
                          </div>
                        </li>";
                      }else if($_POST['idtypetransportsendinit'] == 2){
                        $t_05 = "AÉREO";
                        echo "<li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Transporte</span>
                            <span>{$t_05}</span>
                          </div>
                        </li>";
                      }else{
                        $t_05 = "DESPACHO DE ADUANAS";
                        echo "<li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Transporte</span>
                            <span>{$t_05}</span>
                          </div>
                        </li>";
                      }
                    }else{
                      echo "<li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                        <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                          <span>Transporte</span>
                          <span>No especificado</span>
                        </div>
                      </li>";
                    }
                  ?>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo de Transporte</span>
                      <span><?= (isset($_POST['loadTypeTranport'])) ? strtoupper($_POST['loadTypeTranport']) : "No especificado"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo de Contenedor</span>
                      <span><?= ($_POST['loadTypeCharge'] == "FCL") ? "CONTENEDOR COMPLETO": "CONTENEDOR COMPARTIDO"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Cantidad</span>
                      <?php 

                        $templateQq = "";
                        $tmpjoinLCL = "";
                        $textpackages = "";
                        $textContain20Std = "";
                        $textContain40Std = "";
                        $textContain40HC = "";
                        $textContain40Nor = "";
                        $textcompleteContains = "";

                      if(isset($_POST['loadTypeCharge'])){
                        if($_POST['loadTypeCharge'] == "FCL"){
  (isset($_POST['loadTypeContainer20']) && isset($_POST['loadQContainer20']) && $_POST['loadQContainer20'] != 0) ? $textContain20Std = $_POST['loadQContainer20']."x".$_POST['loadTypeContainer20'].", " : "";
  (isset($_POST['loadTypeContainer40']) && isset($_POST['loadQContainer40']) && $_POST['loadQContainer40'] != 0) ? $textContain40Std = $_POST['loadQContainer40']."x".$_POST['loadTypeContainer40'].", " : "";
  (isset($_POST['loadTypeContainer40hq']) && isset($_POST['loadQContainer40hq']) && $_POST['loadQContainer40hq'] != 0) ? $textContain40HC = $_POST['loadQContainer40hq']."x".$_POST['loadTypeContainer40hq'].", " : "";
  (isset($_POST['loadTypeContainer40nor']) && isset($_POST['loadQContainer40nor']) && $_POST['loadQContainer40nor'] != 0) ? $textContain40Nor = $_POST['loadQContainer40nor']."x".$_POST['loadTypeContainer40nor'].", " : "";
                          
                        $textcompleteContains = $textContain20Std.$textContain40Std.$textContain40HC.$textContain40Nor;

                        $withoutcomaStr = substr(trim($textcompleteContains), 0, -1);
                          $templateQq="<p><span>{$withoutcomaStr}</span></p>";
                        }else{
                          if($_POST['val-iptPackagesNInterface'] > 1){
                            $textpackages = "Bultos";
                            $tmpjoinLCL = "{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³";
                            $templateQq="<p><span>$tmpjoinLCL</span></p>";
                          }else{
                            $textpackages = "Bulto";
                            $tmpjoinLCL = "{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³";
                            $templateQq="<p><span>$tmpjoinLCL</span></p>";
                          }
                        }
                      }else{
                        echo "<span>No especificado</span>";
                      }
                      echo $templateQq;
                      ?>
                    </div>
                  </li>
                  <!-- GASTOS PORTUARIOS Y ALMACENAMIENTO ADUANERO -->
                  <?php 
                    if(isset($_POST['opt-genfquotation'])){
                      $t_01 = ($_POST['opt-genfquotation'] == 'not-moreOpts') ? 'NO' : 'SÍ';
                      echo "
                        <li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Gasto Portuario y Almacenamiento aduanero</span>
                            <span>". $t_01 ."</span>
                          </div>
                        </li>
                      ";
                    }
                  ?>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo de Producto</span>
                      <span>
                        <?= (isset($_POST['val-categProdquot'])) ? $_POST['val-categProdquot'] : "No especificado"; ?>
                        <?= (isset($_POST['val-quantityProdsAmmAdd']) && $_POST['val-quantityProdsAmmAdd'] != 0 && $_POST['val-quantityProdsAmmAdd'] != "") ? " x ".$_POST['val-quantityProdsAmmAdd'] : ""; ?>
                        </span>
                    </div>
                  </li>
                  <?php 
                    if(isset($_POST['val-prevImports'])){
                      $t_04 = ($_POST['val-prevImports'] == "NO") ? "Primera importación" : "Importado previamente";
                      echo "
                        <li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Impuestos</span>
                            <span id='v_previmports'>".$t_04."</span>
                          </div>
                        </li>
                      ";
                    }
                  ?>
                </ul>
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m" id="m-second-listresume">
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Valor de Mercancía</span>
                      <span><?= (isset($_POST['val-valProdquot']) && $_POST['val-valProdquot'] != 0 && $_POST['val-valProdquot'] != null) ? $_POST['val-valProdquot'] . " USD" : "No especificado"; ?></span>
                    </div>
                  </li>
                  <?php 
                    if(isset($_POST['opt-genfquotation'])){
                      $t_02 = ($_POST['opt-genfquotation'] == "y-moreOpts") ? "SÍ" : "NO"; 
                      echo "
                        <li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Impuesto de Aduana</span>
                            <span>".$t_02."</span>
                          </div>
                        </li>
                      ";
                    }
                  ?>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Transporte a Domicilio</span>
                      <span><?= (isset($_POST['plc-pickuploc'])) ? $_POST['plc-pickuploc'] : "NO"; ?></span>
                    </div>
                  </li>
                  <!-- SEGURO DE MERCANCÍA -->
                  <?php 
                    if(isset($_POST['res-insuremerch'])){
                      $t_03 = ($_POST['res-insuremerch'] == "NO") ? "NO" : "SÍ";
                      echo "
                        <li class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info'>
                            <span>Seguro de Mercancía</span>
                            <span id='v_insurancemerch'>".$t_03."</span>
                          </div>
                        </li>
                      ";
                    }
                  ?>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Permiso Gubernamental Adicional</span>
                      <span><?= (isset($_POST['val-reqPermisoProdquot']) && $_POST['val-reqPermisoProdquot'] != "NO REQUIERE") ? $_POST['val-reqPermisoProdquot'] : "No Requiere"; ?></span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDudeInfo">
                <!--<p>¿Dudas? - <a href="#">Click Aquí</a></p>-->
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact">
                <a href="javascript:void(0);" target="_blank" class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact--link" id="d-link-messagecontact" title="Enviar por whatsapp">
                  <span class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact--link--cImg">
                    <img src="<?= $url; ?>assets/img/utilities/whatsapp.svg" alt="icon_whatsapp" width="100" height="100">
                  </span>
                  <h3>CONTACTAR A LA AGENCIA DE ADUANA</h3>
                </a>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cValidTimeQuotation">
                <p>
                  <span>Validez de tarifa: </span>
                  <span id="v_validratedate"><?= (!isset($_POST['val_validateratequote']) || $_POST['val_validateratequote'] == "") ? "No especificado" : $_POST['val_validateratequote'];?></span>
                </p>
              </div>
            </div>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cBottom">
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c">
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails">
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--cCharactsInfovals">
                  <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--cCharactsInfovals--cfgdinv">
                    <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--cCharactsInfovals--cfgdinv--cvpsndcrr">
                      <span>
                        <span>
                          <span>
                            <span>
                              <input type="hidden" autocomplete="off" placeholder="" spellcheck="false" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="" class="non-visvalipt h-alternative-shwnon" value="">
                            </span>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise">
                  <img src="views/assets/img/logos/logotipo-camel.png" alt="icon_camellogistics-bottom" width="100" height="100">
                  <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise--info">
                    <h3>SERVICIO LOGÍSTICO</h3>
                    <span>Valor FIJO</span>
                  </div>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn">
<?php
//VARIABLES DE ITEMS...
$tipotranporte = "";
$handling = "HANDLING Y MANEJO DESTINO";
$vistobueno = "VISTOS BUENOS";
$descarga = "DESCARGA";
$almacenaduanero = "ALMACEN ADUANERO";
//$honorarios = "HONORARIOS DE AGENCIA DE ADUANA";
$transportefabrica = "TRANSPORTE A FÁBRICA IMPORTADOR";
$seguromercancia = "SEGURO DE MERCANCÍA";
//ARRAYS - INCLUYE Y NO INCLUYE...
$arr_include = [];
$arr_notinclude = [];

/************************** TIPO DE SERVICIO **************************/
if($_POST['idtypetransportsendinit'] == 1){$tipotranporte = "FLETE MARÍTIMO";array_push($arr_include, $tipotranporte);
}else if($_POST['idtypetransportsendinit'] == 2){$tipotranporte = "FLETE AÉREO";array_push($arr_include, $tipotranporte);
}else{$tipotranporte = "SERVICIO ADUANERO";array_push($arr_include, $tipotranporte);}

/************************** HANDLING Y MANEJO DESTINO **************************/
if($_POST['loadTypeCharge'] == "FCL" || $_POST['loadTypeCharge'] == "LCL"){array_push($arr_include, $handling);
}else{array_push($arr_include, $handling);}

/************************** VISTOS BUENOS **************************/
if(isset($_POST['opt-genfquotation'])){
  if($_POST['opt-genfquotation'] == "y-moreOpts"){array_push($arr_include, $vistobueno, $descarga);
  }else{array_push($arr_include, $vistobueno, $descarga);}
}

/************************** ALMACEN ADUANERO **************************/
if(isset($_POST['val-categProdquot']) && $_POST['val-categProdquot'] != "" && $_POST['val-valProdquot']){array_push($arr_include, $almacenaduanero);
}else{array_push($arr_notinclude, $almacenaduanero);}

/************************** TRANSPORTE A FÁBRICA IMPORTADOR/TRANSPORTE INTERNO **************************/
if(isset($_POST['opt-reqtransport']) && $_POST['opt-reqtransport'] != "NO"){array_push($arr_include, $transportefabrica);
}else{array_push($arr_notinclude, $transportefabrica);}

/************************** SEGURO DE MERCANCÍA **************************/
if(isset($_POST['res-insuremerch']) && $_POST['res-insuremerch'] != "NO"){array_push($arr_include, $seguromercancia);
}else{array_push($arr_notinclude, $seguromercancia);}

//print_r($arr_include);
//print_r($arr_notinclude);

$template_incserv = "";
$template_notincserv = "";

if(empty($arr_include) || count($arr_include) == 0){
  $template_incserv = "";
}else{

  $template_incserv .="
    <div class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include'>
      <p class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--title'>Incluye</p>
      <ul class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m'>";
  foreach($arr_include as $value){
    $template_incserv .= "<li class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item'>
            <span>{$value}</span>
          </li>";
  }
  $template_incserv .="
      </ul>
    </div>
  ";
}

if(empty($arr_notinclude) || count($arr_notinclude) == 0){
  $template_notincserv = "";
}else{
  $template_notincserv .="
    <div class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude'>
      <p class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--title'>No incluye</p>
      <ul class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m'>";
  foreach($arr_notinclude as $value){
    $template_notincserv .= "<li class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item'>
            <span>{$value}</span>
          </li>";
  }
  $template_notincserv .="
      </ul>
    </div>
  ";
}

echo $template_incserv.$template_notincserv;
?>

                </div>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--QuantityQuotation">
                <h1 id="intdecval-quotefinal"></h1>
                <p id="igvval-quotefinal"></p>
              </div>
            </div>
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cMsgNote">
              <p>NOTA: Los conceptos están sujetos a IGV, excepto al flete internacional.</p>
            </div>
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst">
              <?php 
                // if(isset($_POST['opt-genfquotation']) && $_POST['opt-genfquotation'] == 'y-moreOpts'){
                  echo "
                    <div class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop'>
                      <ul class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m'>
                        <li class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cImg'>
                            <img src='views/assets/img/utilities/SUNAT.png' alt='icon_camellogistics_sunat' width='100' height='100'>
                          </div>
                          <div class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cInfo'>
                            <h3>IMPUESTOS DE ADUANA</h3>
                            <h4>Valor <b>VARIABLE</b> según descripción de producto</h4>
                          </div>
                        </li>
                        <li class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item'>
                          <div class='c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cInfo'>
                            <span>APROX.</span>
                            <p id='taxval_quotefinal'></p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ";
                // }else{
                //   echo "";
                // }
              ?>
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom">
                <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m--item">
                    <h3>TOTALES (incluye IGV)</h3>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m--item">
                    <p id="totalval_quoteFinal"></p>
                  </li>
                </ul>
              </div>
            </div>
            <a href="javascript:void(0);" class="c-FinalQuotation--contStep--cQuotation--cBottom--cBtnMoveToDown" id="btn-scrollingtTtB" title="bajar">
              <span class="c-FinalQuotation--contStep--cQuotation--cBottom--cBtnMoveToDown--cIcon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 62.5" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M48.677,11.975c-1.363-1.369-3.58-1.374-4.949-0.01L25,30.616L6.272,11.964c-1.369-1.363-3.584-1.359-4.95,0.01  c-1.364,1.37-1.359,3.585,0.01,4.95l21.185,21.099c0.001,0,0.001,0.001,0.002,0.002c0.001,0.001,0.001,0.001,0.002,0.002  l0.008,0.008c0.081,0.08,0.173,0.141,0.259,0.211c0.095,0.078,0.185,0.166,0.286,0.232c0.118,0.078,0.246,0.134,0.371,0.196  c0.08,0.039,0.155,0.091,0.236,0.124c0.161,0.065,0.328,0.106,0.495,0.147c0.052,0.012,0.101,0.035,0.153,0.045  c0.221,0.043,0.445,0.064,0.669,0.064s0.448-0.021,0.669-0.064c0.06-0.012,0.116-0.037,0.176-0.052  c0.159-0.04,0.319-0.078,0.473-0.141c0.073-0.029,0.14-0.076,0.211-0.11c0.134-0.065,0.271-0.126,0.397-0.21  c0.08-0.053,0.149-0.124,0.226-0.185c0.107-0.084,0.22-0.16,0.318-0.259l21.197-21.111C50.037,15.56,50.041,13.344,48.677,11.975z"/></svg>
              </span>
            </a>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cBtnDownload">
            <a href="javascript:void(0);" class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn" id="btn-requireDownloadQuotaion_two" title="Descarga tu presupuesto">
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--cIcon">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
              </span>
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--text">DESCARGA TU PRESUPUESTO</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
<div>
<div>
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typeserviceinit" value="<?php echo $_POST['val-typeoptselectininit'];?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_datevaliddesde" value="<?= (isset($_POST['val-datevaliddesde']) && $_POST['val-datevaliddesde'] != "") ? $_POST['val-datevaliddesde'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_datevalidhasta" value="<?= (isset($_POST['val-datevalidhasta']) && $_POST['val-datevalidhasta'] != "") ? $_POST['val-datevalidhasta'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_idgencoderand" value="<?php echo $_POST['ipt-vidcodgenrand'];?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_loadtypecharge" value="<?php echo $_POST['loadTypeCharge'];?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v-plcpickuprateprov" value="<?= (isset($_POST['plc-pickuprate']) && $_POST['plc-pickuprate'] != "") ? $_POST['plc-pickuprate'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typetranspsendinitid" value="<?php echo $_POST['idtypetransportsendinit'];?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fportorigname" value="<?= (isset($_POST['val-originPortSend']) && $_POST['val-originPortSend'] != "") ? $_POST['val-originPortSend'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fportdestiname" value="<?= (isset($_POST['val-destinyPortSend']) && $_POST['val-destinyPortSend'] != "") ? $_POST['val-destinyPortSend'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fnamecategprod" value="<?= (isset($_POST['val-categProdquot']) && $_POST['val-categProdquot'] != "") ? $_POST['val-categProdquot'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_freqregsprod" value="<?= (isset($_POST['val-reqPermisoProdquot']) && $_POST['val-reqPermisoProdquot'] != "") ? $_POST['val-reqPermisoProdquot'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_ftaproxtransbycont" value="<?= (isset($_POST['val-timeaproxtransbycont']) && $_POST['val-timeaproxtransbycont'] != "") ? $_POST['val-timeaproxtransbycont'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_ftotvalProdquot" value="<?= (isset($_POST['val-valProdquot']) && $_POST['val-valProdquot'] != 0 && $_POST['val-valProdquot'] != null) ? $_POST['val-valProdquot'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_ftotvalofdownload" value="<?= (isset($_POST['val_ftotvalofdownload']) && $_POST['val_ftotvalofdownload'] != "") ? $_POST['val_ftotvalofdownload'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_floadTypeTranport" value="<?= (isset($_POST['loadTypeTranport']) && $_POST['loadTypeTranport'] != "") ? $_POST['loadTypeTranport'] : "No seleccionado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fquaprcataadd" value="<?= (isset($_POST['val-quantityProdsAmmAdd']) && $_POST['val-quantityProdsAmmAdd'] != "") ? $_POST['val-quantityProdsAmmAdd'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fatthxyaonepcatg" value="<?= (isset($_POST['val-ammtthxvaonepcatg']) && $_POST['val-ammtthxvaonepcatg'] != "") ? $_POST['val-ammtthxvaonepcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fatthxyatwopcatg" value="<?= (isset($_POST['val-ammtthxvatwopcatg']) && $_POST['val-ammtthxvatwopcatg'] != "") ? $_POST['val-ammtthxvatwopcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fatthxyathreepcatg" value="<?= (isset($_POST['val-ammtthxvathreepcatg']) && $_POST['val-ammtthxvathreepcatg'] != "") ? $_POST['val-ammtthxvathreepcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fficycertminpcatg" value="<?= (isset($_POST['val-fficycert_minpcatg']) && $_POST['val-fficycert_minpcatg'] != "") ? $_POST['val-fficycert_minpcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fficycertmaxpcatg" value="<?= (isset($_POST['val-fficycert_maxpcatg']) && $_POST['val-fficycert_maxpcatg'] != "") ? $_POST['val-fficycert_maxpcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fficycertquantpcatg" value="<?= (isset($_POST['val-fficycert_quantitypcatg']) && $_POST['val-fficycert_quantitypcatg'] != "") ? $_POST['val-fficycert_quantitypcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fficycertvloprtnpcatg" value="<?= (isset($_POST['val-fficycertvloprtnpcatg']) && $_POST['val-fficycertvloprtnpcatg'] != "") ? $_POST['val-fficycertvloprtnpcatg'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_ftotalfleteprod" value="<?= (isset($_POST['val_valfleteprod']) && $_POST['val_valfleteprod'] != "") ? $_POST['val_valfleteprod'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_freqinsusel" value="<?= (isset($_POST['val-freqinsusel']) && $_POST['val-freqinsusel'] != "") ? $_POST['val-freqinsusel'] : "NO";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_frqexplinsur" value="<?= (isset($_POST['val-rqexplicitinsurance']) && $_POST['val-rqexplicitinsurance'] != "") ? $_POST['val-rqexplicitinsurance'] : 0;?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fprevimports" value="<?= (isset($_POST['val-prevImports']) && $_POST['val-prevImports'] != "") ? $_POST['val-prevImports'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_floadtypeope" value="<?= (isset($_POST['val_loadTypeOpe']) && $_POST['val_loadTypeOpe'] != "") ? $_POST['val_loadTypeOpe'] : "Importación";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_foptgnfquotevl" value="<?= (isset($_POST['opt-genfquotation']) && $_POST['opt-genfquotation'] != "") ? $_POST['opt-genfquotation'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_frselinsmerch" value="<?= (isset($_POST['res-insuremerch']) && $_POST['res-insuremerch'] != "") ? $_POST['res-insuremerch'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fplctopckloc" value="<?= (isset($_POST['plc-pickuploc']) && $_POST['plc-pickuploc'] != "") ? $_POST['plc-pickuploc'] : "No especificado";?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_fpckgcontquant" value="<?php if(isset($_POST['loadTypeCharge']) && $_POST['loadTypeCharge'] != ""){
  $templateQq = "";
  $tmpjoinLCL = "";
  $textpackages = "";
  $textContain20Std = "";
  $textContain40Std = "";
  $textContain40HC = "";
  $textContain40Nor = "";
  $textcompleteContains = "";

  if($_POST['loadTypeCharge'] == "FCL"){
(isset($_POST['loadTypeContainer20']) && isset($_POST['loadQContainer20']) && $_POST['loadQContainer20'] != 0) ? $textContain20Std = $_POST['loadQContainer20']."x".$_POST['loadTypeContainer20'].", " : "";
(isset($_POST['loadTypeContainer40']) && isset($_POST['loadQContainer40']) && $_POST['loadQContainer40'] != 0) ? $textContain40Std = $_POST['loadQContainer40']."x".$_POST['loadTypeContainer40'].", " : "";
(isset($_POST['loadTypeContainer40hq']) && isset($_POST['loadQContainer40hq']) && $_POST['loadQContainer40hq'] != 0) ? $textContain40HC = $_POST['loadQContainer40hq']."x".$_POST['loadTypeContainer40hq'].", " : "";
(isset($_POST['loadTypeContainer40nor']) && isset($_POST['loadQContainer40nor']) && $_POST['loadQContainer40nor'] != 0) ? $textContain40Nor = $_POST['loadQContainer40nor']."x".$_POST['loadTypeContainer40nor'].", " : "";
    
  $textcompleteContains = $textContain20Std.$textContain40Std.$textContain40HC.$textContain40Nor;

  $withoutcomaStr = substr(trim($textcompleteContains), 0, -1);
  echo $withoutcomaStr;
  }else{
    if($_POST['val-iptPackagesNInterface'] > 1){
      $textpackages = "Bultos";
      $tmpjoinLCL = "{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³";
      echo $tmpjoinLCL;
    }else{
      $textpackages = "Bulto";
      $templateQq = "{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³";
      echo $templateQq;
    }
  }
}else{
  echo "<span>No especificado</span>";
}
?>">
<input tabindex="-1" placeholder="phdr-whidipts" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_ftcomparweacbm" value="<?php if(isset($_POST['loadTypeCharge']) && $_POST['loadTypeCharge'] != ""){
  if($_POST['loadTypeCharge'] == "FCL"){
    $removapostrophe = preg_replace("/'/","",$withoutcomaStr);
    echo strtoupper($removapostrophe);
  }else if($_POST['loadTypeCharge'] == "LCL"){
    $maxWeight = floatval(preg_replace("/[^-0-9\.]/","",$_POST['val_maxtotalweight']));
    $maxVolumen = floatval(preg_replace("/[^-0-9\.]/","",$_POST['val-iptVolumeNInterface']));
    $convertWeight = $maxWeight / 1000;
    if($convertWeight > $maxVolumen){
      echo $maxWeight." Kg";
    }else{
      echo $maxVolumen." CBM";
    }
  }else{
    echo "No especificado";
  }
}else{ echo "0"; }?>">
</div>
</div>
  <?php require_once 'includes/inc_form-login-user.php'; ?>
  <?php require_once 'includes/inc_form-before-download-pdf.php'; ?>
  <script type="text/javascript" src="<?= $url;?>js/actions_pages/user-login.js"></script>
  <script type="text/javascript" src="<?= $url;?>js/actions_pages/finalquotationreturn_aduanas.js"></script>
  <script type="text/javascript" src="<?= $url;?>js/main.js"></script>
</body>
</html>