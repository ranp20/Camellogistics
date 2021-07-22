<?php 
	session_start();
	if(isset($_SESSION['admin'])){
		header("Location: dashboard");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'views/includes/adm-header-index.php'; ?>
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
						<div class="c-LoginAdm--cLoginF--cForm--form--cControl--cIcon" id="icon-passControladm">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			         class="cAccount__cont--fAccount--form--controls--cIcon--pass">
			         <path
			             d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
			     	</svg>
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