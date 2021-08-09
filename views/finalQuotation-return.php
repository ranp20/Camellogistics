<?php 
  if(!isset($_POST) || $_POST == []){
    header("Location: marketplace-logistico");
  }

?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Descarga tu Cotización</title>
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
    <div class="cont-MainCamelLog--c ptop-headertop" id="cont-MainCamelLog--cFinalDownloadQuoteReturn">
      <div class="box-container">
        <div class="c-FinalQuotation--contStep--cQuotation">
          <div class="c-FinalQuotation--contStep--cQuotation--cTop">
            <p class="c-FinalQuotation--contStep--cQuotation--cTop--title">Resumen de carga</p>
            <div class="c-FinalQuotation--contStep--cQuotation--cTop--c">
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo">
                <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo">
                  <img src="views/assets/img/logos/logotipo-camel.png" alt="">
                  <p class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cImgInfo--info">
                    <span><?= strtoupper($_POST['val-originPortSend']); ?></span>
                    <span>&#8594;</span>
                    <span><?= strtoupper($_POST['val-destinyPortSend']); ?></span>
                  </p>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--nOriginDestinyInfo--cCodeQuotation">
                  <p>
                    <span>ID:&nbsp;</span>
                    <span>30201 - LCL</span>
                  </p>
                </div>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation">
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Transporte</span>
                      <span>MARÍTIMO</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo</span>
                      <span><?= ($_POST['loadTypeCharge'] == "FCL") ? "CONTENEDOR COMPLETO": "CONTENEDOR COMPARTIDO"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Cantidad</span>
                      <span>1 Bulto de 300kg y 1.08 M³</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Gasto Portuario y Almacenamiento aduanero</span>
                      <span>NO</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo de Producto</span>
                      <span>AGRICULTURA(FRUTAS Y VEGETALES)</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Impuestos</span>
                      <span>Primera importación</span>
                    </div>
                  </li>
                </ul>
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Valor de Mercancía</span>
                      <span>45 000 USD</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Impuesto de Aduana</span>
                      <span>NO</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Transporte a Domicilio</span>
                      <span>NO</span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Seguro de Mercancía</span>
                      <span>NO</span>
                    </div>
                  </li>
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
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cValidTimeQuotation">
                <p>Validez de tarifa: 12 Jul - 31 Jul</p>
              </div>
            </div>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cBottom">
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise">
              <img src="views/assets/img/logos/logotipo-camel.png" alt="">
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise--info">
                <h3>SERVICIO LOGÍSTICO</h3>
                <span>Valor FIJO</span>
              </div>
            </div>
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c">
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails">
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include">
                  <p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--title">Incluye</p>
                  <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m">
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
                      <span>FLETE MARÍTIMO</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
                      <span>HANDLING Y MANEJO DESTINO</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
                      <span>VISTOS BUENOS</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--include--m--item">
                      <span>DESCARGA</span>
                    </li>
                  </ul>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude">
                  <p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--title">No incluye</p>
                  <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m">
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
                      <span>ALMACEN ADUANERO</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
                      <span>HONORARIOS DE AGENCIA DE ADUANA</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
                      <span>TRANSPORTE A FÁBRICA IMPORTADOR</span>
                    </li>
                    <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--notinclude--m--item">
                      <span>SEGURO DE MERCANCÍA</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--QuantityQuotation">
                <h1>
                  <span>930,<sup>00</sup> USD</span>
                </h1>
                <p>+ IGV 18% 59 USD</p>
              </div>
            </div>
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cMsgNote">
              <p>NOTA: Los conceptos están sujetos a IGV, excepto al flete internacional.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
</body>
</html>