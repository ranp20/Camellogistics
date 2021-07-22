<?php 
	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../");
	}
	$admname = $_SESSION['admin_camel']['email'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Dashboard</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="cont-dashCamel--cTop">
					<div class="cont-dashCamel--cTop--cTitle">
						<h2 class="cont-dashCamel--cTop--cTitle--title">REGULADORES</h2>
					</div>
					<div class="cont-dashCamel--cTop--cSearchInput">
						<input type="text">
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
</body>
</html>