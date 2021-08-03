<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Pasos de cotización</title>
  <?php require_once 'includes/header-links.php'; ?>
  <link rel="stylesheet" href="<?= $url ?>js/fullpage/fullpage.min.css">
  <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.css">-->
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
        <!------------------------------------------------- PASO #1 ------------------------------------------------>
        <div class="cont-MainCamelLog--c--contSteps--item section">
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
        <!------------------------------------------------- PASO #2 ------------------------------------------------>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload" data-transportquote>
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/fcl.png" alt="">
                  </div>
                  <p>FCL</p>
                </a>
              </li>
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/lcl.png" alt="">
                  </div>
                  <p>LCL</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!------------------------------------------------- PASO #3 ------------------------------------------------>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-qcontainers" data-transportquote>
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Contenedores</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg">
                  <img src="views/assets/img/steps/20.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
                  <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">20'</label>
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                    <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
                  </div>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg">
                  <img src="views/assets/img/steps/40.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
                  <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">40'</label>
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                    <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
                  </div>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg">
                  <img src="views/assets/img/steps/40-hc.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
                  <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">40' HQ</label>
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                    <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch">
              <label for="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch" switch-CFreeze="NO">
                <input type="checkbox" id="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch--chck">
              </label>
              <span>¿Necesitas contenedores refrigerados?</span>
            </div>
          </div>
        </div>
        <!------------------------------------------------- PASO #4 ------------------------------------------------>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargedata" data-transportquote>
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Dimensiones de carga</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
                <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">BULTOS</label>
                <input type="number" id="val-iptPackagesNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input">
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
                <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">PESO (KG)</label>
                <input type="text" id="val-iptWeightNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="11">
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
                <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">VOLUMEN (M³)</label>
                <input type="number" id="val-iptVolumeNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="13">
              </div>
              <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cBtnModalCalculator" id="link-showModalCalcVolum">
                <span>AYUDA - ¡CALCULAR VOLUMEN (M³) AQUÍ!</span>
              </a>
            </div>
          </div>
        </div>
        <!------------------------------------------------- PASO #5 ------------------------------------------------>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-merchandisedata" data-transportquote>
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Mercancía</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
                  <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CATEGORÍA</label>
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                    <input type="text" id="ipt-valNameTypeProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" autocomplete="off">
                    <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m" id="m-listAllNamTypeProds"></ul>
                  </div>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
                  <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">VALOR</label>
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                    <input type="text" id="ipt-valPriceProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-04" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-05" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-06" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-07" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-08" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-09" data-transportquote></div>
        <div class="cont-MainCamelLog--c--contSteps--item section" data-anchor="step-chargeload-10" data-transportquote></div>
      </section>
    </div>
  </main>
  <?php require_once 'includes/form-calculator-flete.php'; ?>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="<?= $url ?>js/fullpage/fullpage.min.js"></script>
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.js"></script>-->
  <script src="<?= $url ?>js/startquoterequest.js"></script>
</body>
</html>