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
                    <span>30201 - <?= $_POST['loadTypeCharge']; ?></span>
                  </p>
                </div>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation">
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Transporte</span>
                      <span><?= ($_POST['idtypetransportsendinit'] == 1) ? "MARÍTIMO" : "No Especificado"; ?></span>
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
                      <?php 

                        $templateQq = "";
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
                          $templateQq.="<p>
                            <span>{$withoutcomaStr}</span>
                          </p>
                          ";
                        }else{
                          if($_POST['val-iptPackagesNInterface'] > 1){
                            $textpackages = "Bultos";
                            $templateQq.="<p>
                              <span></span>
                              <span>{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³</span>
                            </p>
                            ";
                          }else{
                            $textpackages = "Bulto";
                            $templateQq.="<p>
                              <span></span>
                              <span>{$_POST['val-iptPackagesNInterface']} {$textpackages} de {$_POST['val-iptWeightNInterface']} Kg y {$_POST['val-iptVolumeNInterface']} M³</span>
                            </p>
                            ";
                          }
                        }
                      }else{
                        echo "<span>No especificado</span>";
                      }

                      echo $templateQq;
                      ?>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Gasto Portuario y Almacenamiento aduanero</span>
                      <span><?= ($_POST['opt-genfquotation'] == "not-moreOpts") ? "NO" : "SÍ"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Tipo de Producto</span>
                      <span><?= (isset($_POST['val-categProdquot'])) ? $_POST['val-categProdquot'] : "No especificado"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Impuestos</span>
                      <span>
                        <?php 
                          if(!isset($_POST['val-prevImports'])){
                            echo "No especificado";
                          }else if($_POST['val-prevImports'] == "NO"){
                            echo "Primer importación";
                          }else{
                            echo "Importado previamente";
                          }
                        ?>
                      </span>
                    </div>
                  </li>
                </ul>
                <ul class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Valor de Mercancía</span>
                      <span><?= (isset($_POST['val-valProdquot'])) ? $_POST['val-valProdquot'] : "No especificado"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Impuesto de Aduana</span>
                      <span><?= ($_POST['opt-genfquotation'] == "y-moreOpts") ? "SÍ" : "NO"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Transporte a Domicilio</span>
                      <span><?= (isset($_POST['plc-pickuploc'])) ? $_POST['plc-pickuploc'] : "NO"; ?></span>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cDetailsQuotation--m--item--info">
                      <span>Seguro de Mercancía</span>
                      <span>
                        <?php 
                          if(!isset($_POST['res-insuremerch'])){
                            echo "No especificado";
                          }else if($_POST['res-insuremerch'] == "NO"){
                            echo "NO";
                          }else{
                            echo "SÍ";
                          }
                        ?>
                      </span>
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
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact">
                <a href="#" class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact--link">
                  <span class="c-FinalQuotation--contStep--cQuotation--cTop--c--cWhatsappContact--link--cImg">
                    <img src="<?= $url ?>assets/img/utilities/whatsapp.svg" alt="">
                  </span>
                  <h3>CONTACTAR A LA AGENCIA DE ADUANA</h3>
                </a>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cTop--c--cValidTimeQuotation">
                <p>Validez de tarifa: 12 Jul - 31 Jul</p>
              </div>
            </div>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cBottom">
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c">
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails">
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise">
                  <img src="views/assets/img/logos/logotipo-camel.png" alt="">
                  <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cImgInfoEnterprise--info">
                    <h3>SERVICIO LOGÍSTICO</h3>
                    <span>Valor FIJO</span>
                  </div>
                </div>
                <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn">
                  <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include">
                    <p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--title">Incluye</p>
                    <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m">
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item">
                        <span>FLETE MARÍTIMO</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item">
                        <span>HANDLING Y MANEJO DESTINO</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item">
                        <span>VISTOS BUENOS</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item">
                        <span>DESCARGA</span>
                      </li>
                    </ul>
                  </div>
                  <div class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude">
                    <p class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--title">No incluye</p>
                    <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m">
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item">
                        <span>ALMACEN ADUANERO</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item">
                        <span>HONORARIOS DE AGENCIA DE ADUANA</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item">
                        <span>TRANSPORTE A FÁBRICA IMPORTADOR</span>
                      </li>
                      <li class="c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item">
                        <span>SEGURO DE MERCANCÍA</span>
                      </li>
                    </ul>
                  </div>
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
            <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst">
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop">
                <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cImg">
                      <img src="views/assets/img/utilities/SUNAT.png" alt="">
                    </div>
                    <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cInfo">
                      <h3>IMPUESTOS DE ADUANA</h3>
                      <h4>Valor <b>VARIABLE</b> según descripción de producto</h4>
                    </div>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item">
                    <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cTop--m--item--cInfo">
                      <span>BAJO</span>
                      <p>1.739,<sup>00</sup>USD</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom">
                <ul class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m">
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m--item">
                    <h3>TOTALES (incluye IGV)</h3>
                  </li>
                  <li class="c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst--cBottom--m--item">
                    <p>3.580,<sup>00</sup>USD</p>
                  </li>
                </ul>
              </div>
            </div>
            <a href="javascript:void(0);" class="c-FinalQuotation--contStep--cQuotation--cBottom--cBtnMoveToDown" id="btn-scrollingtTtB">
              <span class="c-FinalQuotation--contStep--cQuotation--cBottom--cBtnMoveToDown--cIcon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 62.5" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M48.677,11.975c-1.363-1.369-3.58-1.374-4.949-0.01L25,30.616L6.272,11.964c-1.369-1.363-3.584-1.359-4.95,0.01  c-1.364,1.37-1.359,3.585,0.01,4.95l21.185,21.099c0.001,0,0.001,0.001,0.002,0.002c0.001,0.001,0.001,0.001,0.002,0.002  l0.008,0.008c0.081,0.08,0.173,0.141,0.259,0.211c0.095,0.078,0.185,0.166,0.286,0.232c0.118,0.078,0.246,0.134,0.371,0.196  c0.08,0.039,0.155,0.091,0.236,0.124c0.161,0.065,0.328,0.106,0.495,0.147c0.052,0.012,0.101,0.035,0.153,0.045  c0.221,0.043,0.445,0.064,0.669,0.064s0.448-0.021,0.669-0.064c0.06-0.012,0.116-0.037,0.176-0.052  c0.159-0.04,0.319-0.078,0.473-0.141c0.073-0.029,0.14-0.076,0.211-0.11c0.134-0.065,0.271-0.126,0.397-0.21  c0.08-0.053,0.149-0.124,0.226-0.185c0.107-0.084,0.22-0.16,0.318-0.259l21.197-21.111C50.037,15.56,50.041,13.344,48.677,11.975z"/></svg>
              </span>
            </a>
          </div>
          <div class="c-FinalQuotation--contStep--cQuotation--cBtnDownload">
            <button type="button" class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn">
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--cIcon">
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
              </span>
              <span class="c-FinalQuotation--contStep--cQuotation--cBtnDownload--btn--text">DESCARGA TU PRESUPUESTO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script src="<?= $url ?>js/finalquotationreturn.js"></script>
</body>
</html>