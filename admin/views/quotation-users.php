<?php 	
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['admin_camel'])){
	header("Location: ../admin");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Cotización de Usuarios</title>
	<!-- INCLUIR PUSH.JS -->
<!-- 	<script type="text/javascript" charset="utf8" src="<?= $urlCli; ?>views/js/plugins/push.js/push.min.js"></script> -->
	<!-- INCLUIR SWEETALERTS2 -->
	<link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="../node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
	<!-- INCLUIR DATATABLES -->
	<link rel="stylesheet" type="text/css" href="<?= $urlCli; ?>views/js/plugins/DataTables/datatables.min.css">
	<script type="text/javascript" charset="utf8" src="<?= $urlCli; ?>views/js/plugins/DataTables/datatables.min.js"></script>
</head>
<body>
	<div id="cUIMessageValid-adm"></div>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle" style="padding-top: .85rem;padding-bottom: .85rem;">
						<h2 class="cont-dashCamel__addtitle--title">COTIZACIONES DE USUARIOS</h2>
					</div>
					<div class="contain-table-responsive">
						<table id="tbl_quotationusers" class="cont-dashCamel__list-results" cellpadding="0" width="100%">
							<thead>
								<tr>
									<th>ID</th>
									<th>Cod.</th>
									<th>Email</th>
									<th>T. Operación</th>
									<th>T. Transporte</th>
									<th>T. Container</th>
									<th>Nº Documento</th>
									<th>Empresa</th>
									<th>Teléfono</th>
									<!-- <th>T. Servicio</th> -->
									<th></th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script type="text/javascript" src="<?= $url;?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url;?>js/actions_pages/quotation-users.js"></script>
</body>
</html>