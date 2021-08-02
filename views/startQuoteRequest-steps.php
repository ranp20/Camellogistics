<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Pasos de cotización</title>
  <?php require_once 'includes/header-links.php'; ?>
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
      </section>
      <section class="cont-MainCamelLog--c--contSteps" id="id-stepRightQuoteCamel">
        <div class="cont-MainCamelLog--c--contSteps--item">
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Qué tipo de operación vas a realizar?</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeOperationItems">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="<?= $url ?>assets/img/steps/export.png" alt="">
                  </div>
                  <p>Exportación</p>
                </a>
              </li>
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="<?= $url ?>assets/img/steps/import.png" alt="">
                  </div>
                  <p>Importación</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-01" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-02" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-03" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-04" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-05" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-06" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-07" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-08" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-09" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item" data-level="step-chargeload-10" data-transportquote></div>
      </section>
    </div>
  </main>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script src="<?= $url ?>js/startquoterequest.js"></script>
</body>
</html>