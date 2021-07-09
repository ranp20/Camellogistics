<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Plantilla</title>
	<link rel=StyleSheet href="views/css/camel.css" type="text/css">
</head>
<div class="cabecera"></div>
<body>

<?php include "modules/navegacion.php"; ?>


<section>

<?php 

$mvc = new MvcController();
$mvc -> enlacesPaginasController();

 ?>

</section>
	
</body>

</html>