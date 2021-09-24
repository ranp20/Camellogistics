<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
<meta name="description" content=""/>
<meta name="author" content=""/>
<meta name="description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
<meta property="og:locale" content="es_ES"/>
<meta property="og:type" content="article"/>
<meta property="og:title" content="Calculadora de Envíos | Camel Logistics"/>
<meta property="og:description" content="¡Calcula el costo de tu importación en 4 simples pasos!"/>
<meta property="og:site_name" content="Camel Logistics"/>
<link rel="icon" type="image/x-icon" href="views/img/favicon-camel.png"/>
<link rel="stylesheet" href="<?= $url ?>css/styles.css">
<link rel="stylesheet" href="<?= $url ?>assets/css/styles.css">
<link rel="stylesheet" href="<?= $url ?>css/camel.css">