<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
$url         = $actual_link . "/Camellogistics/views/";
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Camel Logistics | Agente de Aduana y carga internacional, fletes marítimos y aéreos</title>
  <?php require_once 'views/includes/header-links.php';?>
</head>
<body>
  <?php require_once 'views/includes/api_whatsapp.php';?>
  <?php require_once 'views/includes/header-top.php';?>
  <?php require_once 'views/includes/hero-image.php';?>
  <?php require_once 'views/includes/footer.php';?>
  <?php require_once 'views/includes/form-login-user.php';?>
  <script type="text/javascript" src="<?=$url;?>js/main.js"></script>
  <script type="text/javascript" src="<?=$url;?>js/user-login.js"></script>
</body>
</html>
