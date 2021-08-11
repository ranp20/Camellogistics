<?php 
  
  //COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();

?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Marketplace Logístico</title>
  <?php require_once 'includes/header-links.php'; ?>
</head>
<body>
  <?php require_once 'api_whatsapp.php'; ?>
  <?php require_once 'includes/header-top.php'; ?>
  <main class="cont-MainCamelLog box-container mtop-headertop" id="cont-MainCamelLog">
    <div class="cont-MainCamelLog--c" id="cont-MainCamelLog--cMarketplaceLogistics">
      <section class="cont-MainCamelLog--c--cTop">
        <div class="cont-MainCamelLog--c--cTop--cTitle">
          <h3 class="cont-MainCamelLog--c--cTop--cTitle--title">La herramienta Web gratuita para gestionar la contratación de transporte de carga internacional y despachos de aduana.</h3>
          <p class="cont-MainCamelLog--c--cTop--cTitle--desc">Solicita, recibe, compara y gestiona presupuestos de Agente Aduaneros y Freight Forwardersen todo el mundo desde una única plataforma.</p>
        </div>
        <div class="cont-MainCamelLog--c--cTop--cImg">
          <ul class="cont-MainCamelLog--c--cTop--cImg--m">
            <li class="cont-MainCamelLog--c--cTop--cImg--m--item">
              <img src="views/assets/img/utilities/p1.png" alt="" loading="lazy">
            </li>
          </ul>
        </div>
      </section>
      <section class="cont-MainCamelLog--c--cOptionsMarket">
        <form action="startQuoteRequest" class="cont-MainCamelLog--c--cOptionsMarket--f" method="POST" id="f-cOptionsMarkLogistic">
          <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont">
            <ul class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m" id="c-cOptionsMarket">
              <a href="#" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--link">
                <li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--item">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="landmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-landmark fa-w-18 fa-3x"><path fill="currentColor" d="M48 160h480c8.84 0 16-7.16 16-16v-36.91c0-6.67-4.14-12.64-10.38-14.98L299.24 2.04C295.62.68 291.81 0 288 0s-7.62.68-11.24 2.04L42.38 92.11A16.001 16.001 0 0 0 32 107.09V144c0 8.84 7.16 16 16 16zM288 49.14L451.58 112H124.42L288 49.14zM560 464h-16v-64c0-17.67-16.37-32-36.57-32H480V192h-48v176h-64V192h-48v176h-64V192h-48v176h-64V192H96v176H68.57C48.37 368 32 382.33 32 400v64H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h544c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-64 0H80v-48h416v48z" class=""></path></svg>
                  <span>Despacho de aduanas</span>
                </li>
              </a>
              <a href="#" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--link">
                <li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--item">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="ship" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-ship fa-w-20 fa-3x"><path fill="currentColor" d="M484.843 379.396l74.163-62.753c28.358-23.994 19.811-69.847-15.304-82.002L488 215.359V88c0-13.255-10.745-24-24-24h-48V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-48c-13.255 0-24 10.745-24 24v127.359L96.299 234.64c-35.103 12.151-43.671 58-15.304 82.002l74.163 62.753C131.794 430.787 84.576 464 12 464c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12 61.682 0 114.334-17.015 157.164-66.492C175.604 483.207 208.493 512 248 512h144c39.507 0 72.396-28.793 78.836-66.492C513.949 495.312 566.824 512 628 512c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12-71.98 0-119.548-32.672-143.157-84.604zM264 40h112v24H264V40zm-64 72h240v86.744l-104.299-36.103a48 48 0 0 0-31.403 0L200 198.744V112zm224 320c0 17.673-14.327 32-32 32H248c-17.673 0-32-14.327-32-32v-64l-104-88 208-72 208 72-104 88v64z" class=""></path></svg>
                  <span>Transporte Marítimo</span>
                </li>
              </a>
              <a href="#" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--link">
                <li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--m--item">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-plane fa-w-18 fa-3x"><path fill="currentColor" d="M239.57 48l100.57 176H456c26.03 0 62.87 19.73 71.1 32-8.23 12.27-45.07 32-71.1 32H340.14L239.57 464h-37.14l50.29-176H136l-36 48H58.68L82 256l-23.32-80H100l36 48h116.72L202.43 48h37.14m18.57-48h-98.13c-10.63 0-18.3 10.17-15.38 20.39L189.08 176H160l-31.2-41.6c-3.02-4.03-7.77-6.4-12.8-6.4H16.01C5.6 128-2.04 137.78.49 147.88L32 256 .49 364.12C-2.04 374.22 5.6 384 16.01 384H116c5.04 0 9.78-2.37 12.8-6.4L160 336h29.08l-44.46 155.6C141.7 501.82 149.37 512 160 512h98.13c5.74 0 11.04-3.08 13.89-8.06L368 336h88c44.18 0 120-35.82 120-80 0-44.19-75.82-80-120-80h-88L272.03 8.06A15.998 15.998 0 0 0 258.14 0z" class=""></path></svg>
                  <span>Transporte Aéreo</span>
                </li>
              </a>
            </ul>
            <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem" id="c-cTabsItem">
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl">
                  <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control">
                    <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                      <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-map-marker-alt fa-w-12 fa-3x"><path fill="currentColor" d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" class=""></path></svg>
                      </div>
                      <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput">
                        <input type="text" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Ciudad, puerto o aeropuerto donde realizar el despacho de aduanas" maxlength="180">
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--link" data-typeselsp="Despacho de aduanas" data-indselsp="0">
                    <span>Solicitar Presupuesto</span>
                  </button>
                </div>
              </div>              
            </div>
          </div>
        </form>
      </section>
    </div>
  </main>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script src="<?= $url ?>js/marketplace-logistic.js"></script>
</body>
</html>