<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<meta charset="UTF-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover">
<meta name="description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta name="theme-color" content="#B58440">
<meta name="author" content="R@np-2021"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta name="twitter.card" content="summary">
<meta property="og:locale" content="es_ES"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Camel Logistics"/>
<meta property="og:url" name="twitter.url" content="https://localhost/Camellogistics">
<meta property="og:title" name="twitter.title" content="Calculadora de Envíos | Camel Logistics"/>
<meta property="og:description" name="twitter.description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta property="og:image" name="twitter.image" content="<?= $url; ?>assets/img/logos/logotipo-camel.png"/>
<link rel="icon" type="image/x-icon" href="views/img/favicon-camel.png"/>
<link rel="stylesheet" href="<?= $url; ?>css/styles.css">
<link rel="stylesheet" href="<?= $url; ?>assets/css/styles.min.css">
<link rel="stylesheet" href="<?= $url; ?>css/camel.css">
<script type="text/javascript" src="<?= $url; ?>js/jquery-3.6.0.min.js"></script>