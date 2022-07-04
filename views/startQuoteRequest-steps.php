<?php   
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
// CONFIGURACIÓN LOCALHOST
$url = $actual_link . "/Camellogistics/views/";
// CONFIGURACIÓN SERVIDOR
/*
$url = $actual_link . "/views/";
*/
//VARIABLES DE USO EN EL PROCESO...
$portOriginPOST = "";
$portCountryOriginPOST = "";
$portDestinyPOST = "";
$portCountryDestinyPOST = "";
$sections_qresumeandsteps = "";
$script_qbysteps = "";
$val_name_service = (!isset($_POST['v_typeserviceinpinit'])) ? 'No especificado' : $_POST['v_typeserviceinpinit'];

if(isset($_POST) && $_POST != [] && isset($_POST['v_typetranspinit'])){
  if($_POST['v_typetranspinit'] == 0){

    $portOriginPOST = "";
    $portCountryOriginPOST = "";
    $portDestinyPOST = "";
    $portCountryDestinyPOST = "";
    $sections_qresumeandsteps = "
      <form action='fquotationgenerateaduanas' method='POST' id='f-expquotationFrmClient'>
        <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vtypetranspinit' value='{$_POST['v_typetranspinit']}'>
        <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vidcodgenrand' name='ipt-vidcodgenrand' value=''>
        <section class='cont-MainCamelLog--c--contResumeCalc' id='id-resumeLeftQuoteCamel'>
          <!--<div class='cont-MainCamelLog--c--contResumeCalc--c_ibybtnclose'><span id='btn-close-resmobile'><span></span></span></div>-->
          <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typetransportnumb'></div>
          <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typeserviceinit'>
            <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep'>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag'>
                <span id='v_typeoptselectininit'>{$val_name_service}</span>
                <div>
                  <span>
                    <span>
                      <input type='hidden' id='val-typeoptselectininit' name='val-typeoptselectininit' value='{$val_name_service}' class='n-val-sd'>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-chargeload'></div>
          <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typecontainer'>
            <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep'>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag'>
                <span>DIMENSIONES</span>
              </div>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-typecharge'>
                <img src='' alt=''>
                <span></span>
              </div>
              <div>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-qcontainer'>
                  <div data-merchandisetype='rsm-qcontainer20'>
                    <img src='' alt=''>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype='rsm-qcontainer40'>
                    <img src='' alt=''>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype='rsm-qcontainer40hq'>
                    <img src='' alt=''>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype='rsm-qcontainer40nor'>
                    <img src='' alt=''>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totpackages'>
                <span></span>
                <span></span>
              </div>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totweight'>
                <span></span>
                <span></span>
              </div>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totvolume'>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typetransportcharge'></div>
        </section>
        <section class='cont-MainCamelLog--c--contSteps' id='fullpage'>
          <!-- PASO #1 -->
          <div class='cont-MainCamelLog--c--contSteps--item active section' data-anchor='step-typeoperation' data-transportquote>
            <div class='cont-MainCamelLog--c--contSteps--item--cTitle'>
              <h3 class='cont-MainCamelLog--c--contSteps--item--cTitle--title'>¿Qué tipo de operación vas a realizar?</h3>
              <span>
                <span>
                  <input tabindex='-1' placeholder='' type='hidden' width='0' height='0' autocomplete='off' spellcheck='false' f-hidden='aria-hidden' class='non-visvalipt h-alternative-shwnon s-fkeynone-step' type='hidden' id='val_loadTypeOpe' name='val_loadTypeOpe' class='n-val-sd'>
                </span>
              </span>
            </div>
            <div class='cont-MainCamelLog--c--contSteps--item--cStep'>
              <ul class='cont-MainCamelLog--c--contSteps--item--cStep--m' id='list-typeOperationItems'>
                <li class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem'>
                  <a href='javascript:void(0);' class='cont-MainCamelLog--c--contSteps--item--cStep--m--item'>
                    <div class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg'>
                      <img src='{$url}assets/img/steps/export.png' alt='' loading='lazy' width='100' height='100'>
                    </div>
                    <p>Exportación</p>
                  </a>
                </li>
                <li class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem'>
                  <a href='javascript:void(0);' class='cont-MainCamelLog--c--contSteps--item--cStep--m--item'>
                    <div class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg'>
                      <img src='{$url}assets/img/steps/import.png' alt='' loading='lazy' width='100' height='100'>
                    </div>
                    <p>Importación</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- PASO #2 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-chargeload' data-transportquote></div>
          <!-- PASO #3 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-qcontainers' data-transportquote></div>
          <!-- PASO #3 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-chargedata' data-transportquote></div>
          <!-- PASO #4 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-merchandisedata' data-transportquote></div>
          <!-- PASO #5 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-requirespickup' data-transportquote></div>
          <!-- PASO #6 -->
          <!--<div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-fletevaldata' data-transportquote></div>-->
          <!-- PASO #7 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-typetransport' data-transportquote></div>
          <!-- PASO #8 -->
          <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-pickuplocation' data-transportquote></div>
        </section>
        <section id='cnt-modalFormReqInsurance' class='cnt-modalFormReqInsurance'>
          <div class='cnt-modalFormReqInsurance--c'>
            <span class='cnt-modalFormReqInsurance--c--close' id='btn-closeiconFormNotInsurance'></span>
            <div class='cnt-modalFormReqInsurance--c--cTitle'>
              <h2>SEGURO</h2>
              <span>
                <span>
                  <input type='hidden' value='' id='val-rqexplicitinsurance' name='val-rqexplicitinsurance' class='n-val-sd'>
                </span>
              </span>
            </div>
            <div class='cnt-modalFormReqInsurance--c--cForm' id='f-formResolModalNotInsurance'>
              <div class='cnt-modalFormReqInsurance--c--cForm--cControl'>
                <label for='v_valtoreqinsurance' class='cnt-modalFormReqInsurance--c--cForm--cControl--label'>VALOR</label>
                <div class='cnt-modalFormReqInsurance--c--cForm--cControl--cListChangeWIcon'>
                  <div class='cnt-modalFormReqInsurance--c--cForm--cControl--cListChangeWIcon--cIcon'>
                    <svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125' x='0px' y='0px' width='21px' height='21px'><title>dollar</title><path d='M44.38354,5V15.697c-10.549,2.19025-18.11077,10.34265-18.11077,19.681,0,10.004,7.56927,16.77643,22.49676,20.1286C62.49225,58.587,62.49225,63.167,62.49225,64.67181c0,4.88868-5.7204,9.019-12.49115,9.019-6.77191,0-12.49335-4.13031-12.49335-9.019V63.57428h-11.235v1.09753c0,9.33838,7.56176,17.48975,18.11077,19.67951V95h11.235V84.35132C66.1665,82.161,73.72723,74.0097,73.72723,64.67181c0-10.004-7.56823-16.77636-22.49566-20.12854-13.72382-3.08044-13.72382-7.6604-13.72382-9.16528,0-4.88971,5.72144-9.02057,12.49335-9.02057,6.77075,0,12.49115,4.13086,12.49115,9.02057v1.0976h11.235V35.378c0-9.33838-7.56073-17.49078-18.10864-19.681V5Z'></path></svg>
                  </div>
                  <input type='text' id='v_valtoreqinsurance' data-valformat='withcomedecimal' class='cnt-modalFormReqInsurance--c--cForm--cControl--cListChangeWIcon--input' placeholder='Ingresa el valor del FOB' maxlength='13' autocomplete='off'>
                </div>
                <span id='mssg_alertcontrol_usr'></span>
              </div>
              <div class='cnt-modalFormReqInsurance--c--cForm--cBtnResolNotInsurance' id='ct-modcontbtnchangipt'></div>
            </div>
          </div>
        </section>
      </form>
    ";

    $script_qbysteps = "<script src='{$url}js/actions_pages/startquoterequest_aduanas.js'></script>";
  }else if($_POST['v_typetranspinit'] == 1){
    if(isset($_POST['v_iptportoriginpost']) && is_numeric($_POST['v_iptportoriginpost']) && 
       isset($_POST['v_iptcountryportoriginpost']) && is_numeric($_POST['v_iptcountryportoriginpost']) &&
       isset($_POST['v_iptportdestinypost']) && is_numeric($_POST['v_iptportdestinypost']) &&
       isset($_POST['v_iptcountryportdestinypost']) && is_numeric($_POST['v_iptcountryportdestinypost'])){

      $portOriginPOST = $_POST['v_iptportoriginpost'];
      $portCountryOriginPOST = $_POST['v_iptcountryportoriginpost'];
      $portDestinyPOST = $_POST['v_iptportdestinypost'];
      $portCountryDestinyPOST = $_POST['v_iptcountryportdestinypost'];

      $sections_qresumeandsteps = "
        <form action='fquotationgenerate' method='POST' id='f-expquotationFrmClient'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='val-port-norigin' name='port-norigin' value='{$_POST['ipt-valNamePortOrigin']}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='val-typeoptselectininit' name='val-typeoptselectininit' value='{$val_name_service}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vtypetranspinit' value='{$_POST['v_typetranspinit']}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vportidOrigin' value='{$portOriginPOST}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vportidcountryOrigin' value='{$portCountryOriginPOST}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vportidDestiny' value='{$portDestinyPOST}'>
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vportidcountryDestiny' value='{$portCountryDestinyPOST}'>
          <!--<input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vcodgeneratex' name='ipt-vcodgeneratex' value=''>-->
          <input type='hidden' class='cont-MainCamelLog--c--ctrbysend' id='ipt-vidcodgenrand' name='ipt-vidcodgenrand' value=''>
          <section class='cont-MainCamelLog--c--contResumeCalc' id='id-resumeLeftQuoteCamel'>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typetransportnumb'></div>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-firstChargeLoad'></div>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-chargeload'></div>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typetransportcharge'></div>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-typecontainer'>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep'>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag'>
                  <span>TRANSPORTE</span>
                </div>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-typecharge'>
                  <img src='' alt=''>
                  <span></span>
                </div>
                <div>
                  <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-qcontainer'>
                    <div data-merchandisetype='rsm-qcontainer20'>
                      <img src='' alt=''>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div data-merchandisetype='rsm-qcontainer40'>
                      <img src='' alt=''>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div data-merchandisetype='rsm-qcontainer40hq'>
                      <img src='' alt=''>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div data-merchandisetype='rsm-qcontainer40nor'>
                      <img src='' alt=''>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totpackages'>
                  <span></span>
                  <span></span>
                </div>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totweight'>
                  <span></span>
                  <span></span>
                </div>
                <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft' data-merchandise='rsm-totvolume'>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div class='cont-MainCamelLog--c--contResumeCalc--item' data-advlevel='d-reqspeacialservs'>
              <div class='cont-MainCamelLog--c--contResumeCalc--item--cardStep'>
                <span></span>
              </div>
            </div>
          </section>
          <section class='cont-MainCamelLog--c--contSteps' id='fullpage'>
            <!-- PASO #1 -->
            <div class='cont-MainCamelLog--c--contSteps--item active section' data-anchor='step-typeoperation' data-transportquote>
              <div class='cont-MainCamelLog--c--contSteps--item--cTitle'>
                <h3 class='cont-MainCamelLog--c--contSteps--item--cTitle--title'>¿Qué tipo de operación vas a realizar?</h3>
                <span>
                  <span>
                    <input tabindex='-1' placeholder='' type='hidden' width='0' height='0' autocomplete='off' spellcheck='false' f-hidden='aria-hidden' class='non-visvalipt h-alternative-shwnon s-fkeynone-step' type='hidden' id='val_loadTypeOpe' name='val_loadTypeOpe' class='n-val-sd'>
                  </span>
                </span>
              </div>
              <div class='cont-MainCamelLog--c--contSteps--item--cStep'>
                <ul class='cont-MainCamelLog--c--contSteps--item--cStep--m' id='list-typeOperationItems'>
                  <li class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem'>
                    <a href='javascript:void(0);' class='cont-MainCamelLog--c--contSteps--item--cStep--m--item'>
                      <div class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg'>
                        <img src='{$url}assets/img/steps/export.png' alt='' loading='lazy' width='100' height='100'>
                      </div>
                      <p>Exportación</p>
                    </a>
                  </li>
                  <li class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem'>
                    <a href='javascript:void(0);' class='cont-MainCamelLog--c--contSteps--item--cStep--m--item'>
                      <div class='cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg'>
                        <img src='{$url}assets/img/steps/import.png' alt='' loading='lazy' width='100' height='100'>
                      </div>
                      <p>Importación</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- PASO #1.5 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-typetransport' data-transportquote></div>
            <!-- PASO #2 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-chargeload' data-transportquote></div>
            <!-- PASO #3 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-qcontainers' data-transportquote></div>
            <!-- PASO #3.5 o 4.5 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-integservorfleteinte' data-transportquote></div>
            <!-- PASO #4 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-chargedata' data-transportquote></div>
            <!-- PASO #5 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-merchandisedata' data-transportquote></div>
            <!-- PASO #6 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-insuremerchandise' data-transportquote></div>
            <!-- PASO #7 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-requirespickup' data-transportquote></div>
            <!-- PASO #8 -->
            <div class='cont-MainCamelLog--c--contSteps--item section' data-anchor='step-pickuplocation' data-transportquote></div>
          </section>
          <section id='cnt-modalFormNotInsurance' class='cnt-modalFormNotInsurance'>
            <div class='cnt-modalFormNotInsurance--c'>
              <span class='cnt-modalFormNotInsurance--c--close' id='btn-closeiconFormNotInsurance'></span>
              <div class='cnt-modalFormNotInsurance--c--cTitle'>
                <h2>Mercancía</h2>
              </div>
              <div class='cnt-modalFormNotInsurance--c--cForm' id='f-formResolModalNotInsurance'>
                <div class='cnt-modalFormNotInsurance--c--cForm--cControl'>
                  <label for='v_valtofobnotinsurance' class='cnt-modalFormNotInsurance--c--cForm--cControl--label'>VALOR</label>
                  <div class='cnt-modalFormNotInsurance--c--cForm--cControl--cListChangeWIcon'>
                    <div class='cnt-modalFormNotInsurance--c--cForm--cControl--cListChangeWIcon--cIcon'>
                      <svg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125' x='0px' y='0px' width='21px' height='21px'><title>dollar</title><path d='M44.38354,5V15.697c-10.549,2.19025-18.11077,10.34265-18.11077,19.681,0,10.004,7.56927,16.77643,22.49676,20.1286C62.49225,58.587,62.49225,63.167,62.49225,64.67181c0,4.88868-5.7204,9.019-12.49115,9.019-6.77191,0-12.49335-4.13031-12.49335-9.019V63.57428h-11.235v1.09753c0,9.33838,7.56176,17.48975,18.11077,19.67951V95h11.235V84.35132C66.1665,82.161,73.72723,74.0097,73.72723,64.67181c0-10.004-7.56823-16.77636-22.49566-20.12854-13.72382-3.08044-13.72382-7.6604-13.72382-9.16528,0-4.88971,5.72144-9.02057,12.49335-9.02057,6.77075,0,12.49115,4.13086,12.49115,9.02057v1.0976h11.235V35.378c0-9.33838-7.56073-17.49078-18.10864-19.681V5Z'></path></svg>
                    </div>
                    <input type='text' id='v_valtofobnotinsurance' name='v_valtofobnotinsurance' class='cnt-modalFormNotInsurance--c--cForm--cControl--cListChangeWIcon--input' placeholder='Ingresa el valor del FOB' maxlength='13' autocomplete='off'>
                  </div>
                  <span id='mssg_alertcontrol_usr'></span>
                </div>
                <div class='cnt-modalFormNotInsurance--c--cForm--cBtnResolNotInsurance' id='ct-modcontbtnchangipt'></div>
              </div>
            </div>
          </section>
        </form>
      ";

      $script_qbysteps = "<script src='{$url}js/actions_pages/startquoterequest_maritimo.js'></script>";
    }else{
      header("Location: ./marketplace-logistico");
    }
  }else if($_POST['v_typetranspinit'] == 2){
    header("Location: ./marketplace-logistico");
  }else{
    header("Location: ./marketplace-logistico");
  }
}else{
  header("Location: ./marketplace-logistico");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <?php require_once 'includes/inc_header-links.php';?>
  <title>Camel Logistics | Pasos de cotización</title>
  <!-- INCLUIR BOOTSTRAP -->
  <link rel="stylesheet" href="<?php echo $url;?>js/plugins/bootstrap/css/bootstrap.min.css">
  <script type="text/javascript" src="<?php echo $url;?>js/plugins/bootstrap/js/bootstrap.min.js"></script>
  <!-- INLCUIR FULLPAGE.JS -->
  <!-- <link rel="stylesheet" href="node_modules/fullpage.js/dist/fullpage.min.css"> -->
  <link rel="stylesheet" href="<?php echo $url;?>js/plugins/fullpage/fullpage.min.css">
</head>
<body>
  <div id="idMessageSteps-prcss" class="cntMessageSteps-prcss"></div>
  <nav class="c-Htopbar" id="c-HTopQuotation-camel">
    <div class="c-Htopbar--c">
      <div class="c-Htopbar--c--cLogo">
        <a href="./">
          <img src="<?= $url ?>assets/img/logos/logotipo-camel.png" alt="logo_camel" width="100" height="100" decoding="async">
        </a>
      </div>
      <button class="c-Htopbar--c--btnMobileNavbar" id="btn-resume-mobile-header" type="button" title="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
  <main class="cont-MainCamelLog" id="cont-MainCamelLog">
    <div class="cont-MainCamelLog--c ptop-headertop" id="cont-MainCamelLog--cStartQuoteRequest">
      <?php echo $sections_qresumeandsteps;?>
    </div>
  </main>
  <?php require_once 'includes/inc_form-calculator-flete.php';?>
  <div id="msgLoaderPage_start"></div>
  <!-- 
  <script type="text/javascript" src="node_modules/fullpage.js/dist/fullpage.min.js"></script>
  <script type="text/javascript" src="node_modules/fullpage.js/vendors/easings.min.js"></script>
  <script type="text/javascript" src="node_modules/fullpage.js/dist/fullpage.extensions.min.js"></script>
  -->
  <script type="text/javascript" src="<?php echo $url;?>js/plugins/fullpage/fullpage.min.js"></script>
  <script type="text/javascript" src="<?php echo $url;?>js/plugins/fullpage/scrolloverflow.min.js"></script>
  <?php echo $script_qbysteps;?>
</body>
</html>