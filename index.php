<?php 

  //COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
  
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";

  // function setInterval($f, $milliseconds)
  // {
  //   $seconds=(int)$milliseconds/1000;
  //   while(true)
  //   {
  //     $f();
  //     sleep($seconds);
  //   }
  // }
  // setInterval(function(){
  //   echo "hi!\n";
  // }, 1000);
    
  //echo date('d-m-Y H:i:s');
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Agente de Aduana y carga internacional, fletes marítimos y aéreos</title>
  <?php require_once 'views/includes/header-links.php'; ?>
</head>
<body>
  <?php require_once 'views/api_whatsapp.php'; ?>
  <?php require_once 'views/includes/header-top.php'; ?>
	<?php require_once 'views/hero-image.php';?>
  <?php require_once 'views/includes/footer.php'; ?>
  <?php require_once 'views/includes/form-login-user.php'; ?>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script src="<?= $url ?>js/user-login.js"></script>
  <script type="text/javascript" src="views/js/input-spinner.js"></script>
</body>
</html>