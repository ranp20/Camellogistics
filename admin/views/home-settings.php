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
	<title>Admin - Ajustes de Inicio</title>
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
								<a href="banner-principal" class="cont-dashCamel--cHSettings--cLinks--m--link">
									<span class="cont-dashCamel--cHSettings--cLinks--m--link--cIcon">
										<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-image fa-w-16 fa-3x"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z" class=""></path></svg>
									</span>
									<span class="cont-dashCamel--cHSettings--cLinks--m--link--text">BANNER PRINCIPAL</span>
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