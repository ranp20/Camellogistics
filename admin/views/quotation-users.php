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
	<title>Admin - Cotización de Usuarios</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle" style="padding-top: .85rem;padding-bottom: .85rem;">
						<h2 class="cont-dashCamel__addtitle--title">COTIZACIONES DE USUARIOS</h2>
					</div>
					<div class="cont-dashCamel__inputsearch-table">
						<input type="text" class="cont-dashCamel__inputsearch-table--input" name="search_quotationusers" id="search_quotationusers" maxlength="200" placeholder="Buscar cotizaciones...">
					</div>
					<div class="contain-table-responsive">
						<table class="cont-dashCamel__list-results">
							<thead>
								<tr>
									<th>ID</th>
									<th>Código</th>
									<th>Email</th>
									<th>T. Operación</th>
									<th>T. Transporte</th>
									<th>T. Container</th>
									<th>Nº Documento</th>
									<th>Empresa</th>
									<th>Teléfono</th>
									<th>T. Servicio</th>
								</tr>
							</thead>
							<tbody id="tbl_quotationusers"></tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/quotation-users.js"></script>
</body>
</html>