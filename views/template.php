<!DOCTYPE html>
<html lang="es">
<head>
  <title>Calculadora de Envíos | Camel</title>
  <?php require_once 'modules/includes/header-links.php'; ?>
</head>
<body id="page-top">
  <?php require_once 'modules/api_whatsapp.php'; ?>
  <?php require_once 'modules/includes/header-top.php'; ?>
	<?php 
		$mvc = new MvcController();
		$mvc -> enlacesPaginasController();
	?>
  <?php //require_once 'modules/includes/footer.php'; ?>
  <?php $precios = new PreciosController; ?>
  <script type="text/javascript">
    var emision_bl_ewb = <?php echo $precios->show_precio('emision_bl_ewb')->value; ?>;
    var almacen_referencial = <?php echo $precios->show_precio('almacen_referencial')->value; ?>;
    var devolucion_contenedores = <?php echo $precios->show_precio('devolucion_contenedores')->value ?>;
    var gremios_maritimos = <?php echo $precios->show_precio('gremios_maritimos')->value; ?>;
    var thc = <?php echo $precios->show_precio('thc')->value; ?>;
    var visto_bueno = <?php echo $precios->show_precio('visto_bueno')->value; ?>;
    var comision_agencia = <?php echo $precios->show_precio('comision_agencia')->value; ?>;
    var gastos_operativos = <?php echo $precios->show_precio('gastos_operativos')->value; ?>;
  </script>
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="views/js/jquery-3.5.1.min.js"></script>
  <script src="views/js/calculadora.js"></script>
  <script type="text/javascript" src="views/js/input-spinner.js"></script>
</body>
</html>