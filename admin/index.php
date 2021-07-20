<?php 
	session_start();
	if(isset($_SESSION['admin'])){
		header("Location: views/dashboard.php");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'views/includes/header-index.php'; ?>
	<title>Login - CamelLogistics</title>
</head>
<body>
	<div id="cMessage-user"></div>
	<main class="c-LoginAdm">
		<div class="c-LoginAdm--cLoginF box-m">
			<div class="c-LoginAdm--cLoginF--cLogo">
				<img src="views/assets/img/utilities/logotipo-camellogistics.png" alt="">
			</div>
			<div class="c-LoginAdm--cLoginF--cForm">
				<div class="c-LoginAdm--cLoginF--cForm--cTitle">
					<h2 class="c-LoginAdm--cLoginF--cForm--cTitle--title">INICIAR SESIÓN</h2>
				</div>
				<form method="POST" class="c-LoginAdm--cLoginF--cForm--form" id="c-formvalidLoginAdm">
					<div class="c-LoginAdm--cLoginF--cForm--form--cControl">
						<input type="email" name="adm-log-email" id="adm-log-email" class="c-LoginAdm--cLoginF--cForm--form--cControl--input" placeholder="Email" maxlength="200">
						<div class="c-LoginAdm--cLoginF--cForm--form--cControl--cIcon">
							<img src="views/assets/img/svg/icon-user-login.svg" alt="">
						</div>
					</div>
					<div class="c-LoginAdm--cLoginF--cForm--form--cControl">
						<input type="password" name="adm-log-pass" id="adm-log-pass" class="c-LoginAdm--cLoginF--cForm--form--cControl--input" placeholder="Contraseña" maxlength="100">
						<div class="c-LoginAdm--cLoginF--cForm--form--cControl--cIcon">
							<img src="views/assets/img/svg/icon-lock-login.svg" alt="">
						</div>
					</div>
					<button type="submit" class="c-LoginAdm--cLoginF--cForm--form--btnLoginAdm">
						<span>ACCEDER</span>
						<img src="views/assets/img/svg/icon-arrow-intranet-login.svg" alt="">
					</button>
				</form>
			</div>
			<div class="c-LoginAdm--cLoginF--cBottInfo">
				<small class="c-LoginAdm--cLoginF--cBottInfo--desc">
					<span>&copy;</span>
					<span>2020 - 2021</span>
					<span>&nbsp;-&nbsp;</span>
					<span>Versión 1.0</span>
				</small>
			</div>
		</div>
		<div class="c-LoginAdm--cBcImage"></div>
	</main>
	<script src="views/js/actions_pages/adm-login.js"></script>
</body>
</html>