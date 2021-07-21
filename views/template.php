<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Calculadora de Envíos | Camel</title>
  <?php require_once 'includes/header-links.php'; ?>
</head>
<body>
  <?php require_once 'api_whatsapp.php'; ?>
  <?php require_once 'includes/header-top.php'; ?>
	<?php require_once 'hero-image.php';?>
  <?php require_once 'includes/footer.php'; ?>
  <script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="views/js/input-spinner.js"></script>
</body>
</html>