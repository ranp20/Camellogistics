<?php 

	//COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();

	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Precios</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle">
						<h2 class="cont-dashCamel__addtitle--title">Configuración de precios</h2>
						<!--<button type="button" href="#" id="add-regulator" class="cont-dashCamel__addtitle--btn-add" data-toggle="modal" data-target="#addproductModal"><span class="cont-dashCamel__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>-->
					</div>
					<div class="cont-dashCamel__cControlsList">
						<div class="cont-dashCamel__cControlsList--cC">
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Emisión de BL/EWB<span>*</span></label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Handling<span>*</span></label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Visto Bueno</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Desconsolidación<span>*</span></label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Almacén referencial</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Transporte interno</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Aforo Físico y previo</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Gremios marítimos</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">THC</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Devolución de contenedores</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Derechos de Embarque</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Consolidación</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Bohe e Inspección</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Comisión de Agencia</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Gastos Operativos</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
							<div class="cont-dashCamel__cControlsList--cC--cControl">
								<label for="" class="cont-dashCamel__cControlsList--cC--cControl--label">Estiba</label>
								<input type="number" id="" name="" class="cont-dashCamel__cControlsList--cC--cControl--input">
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
</body>
</html>