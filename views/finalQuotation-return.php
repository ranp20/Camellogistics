<?php 
  if(!isset($_POST) || $_POST == []){
    header("Location: marketplace-logistico");
  }

?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Tu Cotización</title>
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
    <div class="cont-MainCamelLog--c ptop-headertop" id="cont-MainCamelLog--cStartQuoteRequest">
      <h1>MOSTRAR LOS DATOS DEVUELTOS DESDE CONTROLADORES DE CALCULO DE COTIZACIÓN...</h1>
      <?php print_r($_POST); ?>
    </div>
  </main>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
</body>
</html>