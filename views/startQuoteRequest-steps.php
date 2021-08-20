<?php 
  
  //COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();

  if(!isset($_POST) || $_POST == [] && !isset($_POST['v_iptportoriginpost']) || !is_numeric($_POST['v_iptportoriginpost']) && 
     !isset($_POST['v_iptcountryportoriginpost']) || !is_numeric($_POST['v_iptcountryportoriginpost']) &&
     !isset($_POST['v_iptportdestinypost']) || !is_numeric($_POST['v_iptportdestinypost']) &&
     !isset($_POST['v_iptcountryportdestinypost']) || !is_numeric($_POST['v_iptcountryportdestinypost'])){
    header("Location: marketplace-logistico");
  }

  echo "<input type='hidden' name='port-norigin' id='val-port-norigin' value='".$_POST['ipt-valNamePortOrigin']."'>";
  
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Pasos de cotización</title>
  <?php require_once 'includes/header-links.php'; ?>
  <link rel="stylesheet" href="<?= $url ?>js/fullpage/fullpage.min.css">
</head>
<body>
  <nav class="c-Htopbar" id="c-HTopQuotation-camel">
    <div class="c-Htopbar--c">
      <div class="c-Htopbar--c--cLogo">
        <a href="./">
          <img src="<?= $url ?>assets/img/logos/logotipo-camel.png" alt="logo_camel">
        </a>
      </div>
    </div>
  </nav>
  <main class="cont-MainCamelLog" id="cont-MainCamelLog">
    <!--<div class="cont-MainCamelLog--cFinalQuoteResult ptop-headertop" id="cont-MainCamelLog--cFinalQuotationResult"></div>-->
    <div class="cont-MainCamelLog--c ptop-headertop" id="cont-MainCamelLog--cStartQuoteRequest">
      <form action="fquotationgenerate" method="POST" id="f-expquotationFrmClient">
        <input type="hidden" id="ipt-vtypetranspinit" value="<?= $_POST['v_typetranspinit']; ?>">
        <input type="hidden" id="ipt-vportidOrigin" value="<?= $_POST['v_iptportoriginpost']; ?>">
        <input type="hidden" id="ipt-vportidcountryOrigin" value="<?= $_POST['v_iptcountryportoriginpost']; ?>">
        <input type="hidden" id="ipt-vportidDestiny" value="<?= $_POST['v_iptportdestinypost']; ?>">
        <input type="hidden" id="ipt-vportidcountryDestiny" value="<?= $_POST['v_iptcountryportdestinypost']; ?>">
        <section class="cont-MainCamelLog--c--contResumeCalc" id="id-resumeLeftQuoteCamel">
          <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-typetransportnumb"></div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-firstChargeLoad"></div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-chargeload"></div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-typecontainer">
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
              <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
                <span>TRANSPORTE</span>
              </div>
              <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft" data-merchandise="rsm-typecharge">
                <img src="" alt="">
                <span></span>
              </div>
              <div>
                <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft" data-merchandise="rsm-qcontainer">
                  <div data-merchandisetype="rsm-qcontainer20">
                    <img src="" alt="">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype="rsm-qcontainer40">
                    <img src="" alt="">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype="rsm-qcontainer40hq">
                    <img src="" alt="">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div data-merchandisetype="rsm-qcontainer40nor">
                    <img src="" alt="">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft" data-merchandise="rsm-totpackages">
                <span></span>
                <span></span>
              </div>
              <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft" data-merchandise="rsm-totweight">
                <span></span>
                <span></span>
              </div>
              <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft" data-merchandise="rsm-totvolume">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-reqspeacialservs">
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
              <span></span>
            </div>
          </div>
        </section>
        <section class="cont-MainCamelLog--c--contSteps" id="fullpage">
          <!-- PASO #1 -->
          <div class="cont-MainCamelLog--c--contSteps--item active section" data-anchor="step-typeoperation" data-transportquote>
            <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
              <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Qué tipo de operación vas a realizar?</h3>
              <span>
                <input type="hidden" value="" id="loadTypeOpe" name="loadTypeOpe">
              </span>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep">
              <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeOperationItems">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="<?= $url ?>assets/img/steps/export.png" alt="">
                    </div>
                    <p>Exportación</p>
                  </li>
                </a>
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="<?= $url ?>assets/img/steps/import.png" alt="">
                    </div>
                    <p>Importación</p>
                  </li>
                </a>
              </ul>
            </div>
          </div>
          <!-- PASO #2 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload" data-transportquote></div>
          <!-- PASO #3 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-qcontainers" data-transportquote></div>
          <!-- PASO #3.5 o 4.5 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-integservorfleteinte" data-transportquote></div>
          <!-- PASO #4 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargedata" data-transportquote></div>
          <!-- PASO #5 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-merchandisedata" data-transportquote></div>
          <!-- PASO #6 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-insuremerchandise" data-transportquote></div>
          <!-- PASO #7 -->
          <!--<div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-customsclearance" data-transportquote></div>-->
          <!-- PASO #8 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-requirespickup" data-transportquote></div>
          <!-- PASO #9 -->
          <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-pickuplocation" data-transportquote></div>
        </section>
      </form>
    </div>
  </main>
  <?php require_once 'includes/form-calculator-flete.php'; ?>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="<?= $url ?>js/fullpage/scrolloverflow.min.js"></script>
  <script type="text/javascript" src="<?= $url ?>js/fullpage/fullpage.min.js"></script>
  <script src="<?= $url ?>js/startquoterequest.js"></script>
</body>
</html>