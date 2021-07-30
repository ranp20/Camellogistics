<?php 
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
				<section class="cont-dashCamel--cHSettings" id="cont-dashCamel--cHSettings">
					<div class="cont-dashCamel--cHSettings--cTitle">
						<h2 class="cont-dashCamel--cHSettings--cTitle--title">Ajustes de Home</h2>
					</div>
					<div class="cont-dashCamel--cHSettings--cLinks">
						<ul class="cont-dashCamel--cHSettings--cLinks--m">
							<li class="cont-dashCamel--cHSettings--cLinks--m--item">
								<a href="#" class="cont-dashCamel--cHSettings--cLinks--m--link">
									<span>BANNERS</span>
								</a>
							</li>
							<li class="cont-dashCamel--cHSettings--cLinks--m--item">
								<a href="#" class="cont-dashCamel--cHSettings--cLinks--m--link">
									<span>BANNERS</span>
								</a>
							</li>
							<li class="cont-dashCamel--cHSettings--cLinks--m--item">
								<a href="#" class="cont-dashCamel--cHSettings--cLinks--m--link">
									<span>BANNERS</span>
								</a>
							</li>
						</ul>
					</div>
				</section>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
</body>
</html>