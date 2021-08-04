<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Pasos de cotización</title>
  <?php require_once 'includes/header-links.php'; ?>
  <link rel="stylesheet" href="<?= $url ?>js/fullpage/fullpage.min.css">
</head>
<body>
  <?php require_once 'includes/header-top.php'; ?>
  <main class="cont-MainCamelLog" id="cont-MainCamelLog">
    <div class="cont-MainCamelLog--c ptop-headertop" id="cont-MainCamelLog--cStartQuoteRequest">
      <input type="hidden" id="ipt-vportidOrigin" value="<?= $_POST['v-iptportoriginpost']; ?>">
      <input type="hidden" id="ipt-vportidcountryOrigin" value="<?= $_POST['v-iptcountryportoriginpost']; ?>">
      <input type="hidden" id="ipt-vportidDestiny" value="<?= $_POST['v-iptportdestinypost']; ?>">
      <input type="hidden" id="ipt-vportidcountryDestiny" value="<?= $_POST['v-iptcountryportdestinypost']; ?>">
      <section class="cont-MainCamelLog--c--contResumeCalc" id="id-resumeLeftQuoteCamel">
        <div class="cont-MainCamelLog--c--contResumeCalc--item">
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
              <span>ORIGEN</span>
            </div>
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cDescMap">
              <span>Qingdao</span>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
              <span>DESTINO</span>
            </div>
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cDescMap">
              <span>Callao</span>
            </div>
          </div>
        </div>
        <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-chargeload"></div>
        <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-typecontainer"></div>
        <div class="cont-MainCamelLog--c--contResumeCalc--item" data-advlevel="d-quantitycontainer"></div>
      </section>
      <section class="cont-MainCamelLog--c--contSteps" id="fullpage">
        <!-- PASO #1 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-typeoperation" data-transportquote>
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Qué tipo de operación vas a realizar?</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeOperationItems">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="#step-chargeload" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="<?= $url ?>assets/img/steps/export.png" alt="">
                  </div>
                  <p>Exportación</p>
                </a>
              </li>
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="#step-chargeload" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="<?= $url ?>assets/img/steps/import.png" alt="">
                  </div>
                  <p>Importación</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- PASO #2 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload" data-transportquote></div>
        <!-- PASO #3 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-qcontainers" data-transportquote></div>
        <!-- PASO #4 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargedata" data-transportquote></div>
        <!-- PASO #5 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-merchandisedata" data-transportquote></div>
        <!-- PASO #6 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-insuremerchandise" data-transportquote></div>
        <!-- PASO #7 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-customsclearance" data-transportquote></div>
        <!-- PASO #8 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-requirespickup" data-transportquote></div>
        <!-- PASO #9 -->
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-pickuplocation" data-transportquote></div>
      </section>
    </div>
  </main>
  <?php require_once 'includes/form-calculator-flete.php'; ?>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="<?= $url ?>js/fullpage/scrolloverflow.min.js"></script>
  <script type="text/javascript" src="<?= $url ?>js/fullpage/fullpage.min.js"></script>
  <script src="<?= $url ?>js/startquoterequest.js"></script>
</body>
</html>