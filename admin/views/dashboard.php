<?php 
	session_start();
	if(!isset($_SESSION['admin'])){
		header("Location: ../");
	}

	$admname = $_SESSION['admin']['email'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/header-index.php'; ?>
	<title>Admin - Dashboard</title>
</head>
<body>
	<div id="dash-contT">
		<nav id="nav-dashCamel" class="nav-dashCamel">
			<div class="nav-dashCamel--c">
				<div class="nav-dashCamel--c--cLogo">
					<img src="assets/img/utilities/logotipo-camellogistics.png" alt="" class="nav-dashCamel--c--cLogo--img">
				</div>
				<div class="nav-dashCamel--c--cUserInfo">
					<div class="nav-dashCamel--c--cUserInfo--cAvatar">
						<img src="assets/img/utilities/logotipo-camellogistics.png" alt="" class="nav-dashCamel--c--cUserInfo--cAvatar--img">
					</div>
					<div class="nav-dashCamel--c--cUserInfo--cInfo">
						<h3 class="nav-dashCamel--c--cUserInfo--cInfo--title"><?= $admname; ?></h3>
						<p class="nav-dashCamel--c--cUserInfo--cInfo--desc">Administrador</p>
					</div>
				</div>
				<div class="nav-dashCamel--c--cList">
					<ul class="nav-dashCamel--c--cList--m">
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Tablero de instrumentos</a>
						</li>
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Calendario</a>
						</li>
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Configuración de precios</a>
						</li>
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Tarifas transporte</a>
						</li>
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Tarifa FCL</a>
						</li>
						<li class="nav-dashCamel--c--cList--m--item">
							<a href="#" class="nav-dashCamel--c--cList--m--link">Tarifa LCL</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<main id="main-dashCamel">
			<header id="h-dashCamel" class="h-dashCamel">
				<div class="h-dashCamel--c">
					<div id="icon-togglemenuMobile">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div id="icon-togglemenuDesktop">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="h-dashCamel--c--cTitle">
						<h2>CAMELLOGISTICS</h2>
					</div>
					<div class="h-dashCamel--c--cClock">
						<div class="h-dashCamel--c--cClock--timeclock" id="dash-timeclock-detail">Miércoles, 21 de Julio del 2021 - 18 : 55 : 35</div>
					</div>
					<div class="h-dashCamel--c--cUser">
						<a href="" class="h-dashCamel--c--cUser--linkcont">
							<img src="assets/img/utilities/user_default.png" alt="">
							<span><?= $admname; ?></span>
						</a>
						<ul class="h-dashCamel--c--cUser--m">
							<li class="h-dashCamel--c--cUser--m--item">
								<a href="../controllers/prcss_logout-adm.php" class="h-dashCamel--c--cUser--m--link">CERRAR SESIÓN</a>
							</li>
						</ul>
					</div>
				</div>
			</header>
			<div class="cont-dashCamel">
				<h2>DASHBOARD PARA CAMELLOGISTICS</h2>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
</body>
</html>