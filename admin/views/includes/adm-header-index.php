<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/admin/views/";
?>
<meta charset="utf-8" />
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="description" content=""/>
<meta name="author" content=""/>
<meta name="description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta property="og:locale" content="es_ES"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="Calculadora de Envíos | Camel"/>
<meta property="og:description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta property="og:site_name" content="Camel"/>
<link rel="icon" type="image/x-icon" href="<?= $url ?>assets/img/utilities/favicon-camel.png"/>
<link rel="stylesheet" href="<?= $url ?>assets/css/styles.min.css">
<!-- JQUERY -->
<script src="<?= $url ?>js/jquery-3.6.0.min.js"></script>
<!-- BOOTSTRAP UNCOMPRESSED -->
<link rel="stylesheet" href="<?php echo $url ?>js/bootstrap/css/bootstrap.min.css">
<script src="<?php echo $url ?>js/bootstrap/js/bootstrap.min.js"></script>
<!-- GOOGLE FONTS -->
<!-- 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
 -->