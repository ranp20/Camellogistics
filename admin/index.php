<?php 
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(isset($_SESSION['admin_camel'])){
	header("Location: quotation-users");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'views/includes/adm-header-index.php';?>
	<title>Login - CamelLogistics</title>
</head>
<body class="c_body-loginAdm">
	<div id="cMessage-user"></div>
	<main class="c-LoginAdm">
		<div class="c-LoginAdm--cLoginF box-small">
			<div class="c-LoginAdm--cLoginF--cLogo">
				<img src="views/assets/img/utilities/logotipo-camellogistics.png" alt="icon_camellogistics_admin" width="100" height="100">
			</div>
			<div class="c-LoginAdm--cLoginF--cForm">
				<div class="c-LoginAdm--cLoginF--cForm--cTitle">
					<h2 class="c-LoginAdm--cLoginF--cForm--cTitle--title">INICIAR SESIÓN</h2>
				</div>
				<form method="POST" class="c-LoginAdm--cLoginF--cForm--form" id="c-formvalidLoginAdm">
					<div class="c-LoginAdm--cLoginF--cForm--form--cControl">
						<?php
							$tmp_email = "";
							if(count($_COOKIE) > 0){
								if(isset($_COOKIE['adm-email'])){
									$tmp_email = "<input type='email' name='adm-log-email' id='adm-log-email' class='c-LoginAdm--cLoginF--cForm--form--cControl--input_chkset' placeholder='Email' maxlength='200' required autocomplete='off' spellcheck='false' value='". json_decode($_COOKIE['adm-email'], true) ."'>";
								}else{
									$tmp_email = "<input type='email' name='adm-log-email' id='adm-log-email' class='c-LoginAdm--cLoginF--cForm--form--cControl--input' placeholder='Email' maxlength='200' required autocomplete='off' spellcheck='false'>";
								}
							}else{
								$tmp_email = "<input type='email' name='adm-log-email' id='adm-log-email' class='c-LoginAdm--cLoginF--cForm--form--cControl--input' placeholder='Email' maxlength='200' required autocomplete='off' spellcheck='false'>";
							}
							echo $tmp_email;
						?>
						<div class="c-LoginAdm--cLoginF--cForm--form--cControl--cIcon">
							<img src="views/assets/img/svg/icon-user-login.svg" alt="icon_userintranet_admin" width="100" height="100">
						</div>
					</div>
					<div class="c-LoginAdm--cLoginF--cForm--form--cControl">
						<?php
							$tmp_pass = "";
							if(count($_COOKIE) > 0){
								if(isset($_COOKIE['adm-password'])){
									$tmp_pass = "<input type='password' name='adm-log-pass' id='adm-log-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--input_chkset' placeholder='Contraseña' maxlength='100' required autocomplete='off' spellcheck='false' value='". json_decode($_COOKIE['adm-password'], true) ."'>";
								}else{
									$tmp_pass = "<input type='password' name='adm-log-pass' id='adm-log-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--input' placeholder='Contraseña' maxlength='100' required autocomplete='off' spellcheck='false'>";
								}
							}else{
								$tmp_pass = "<input type='password' name='adm-log-pass' id='adm-log-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--input' placeholder='Contraseña' maxlength='100' required autocomplete='off' spellcheck='false'>";
							}
							echo $tmp_pass;
						?>
						<div class="c-LoginAdm--cLoginF--cForm--form--cControl--cIcon" id="icon-passControladm">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			         class="cAccount__cont--fAccount--form--controls--cIcon--pass">
			         <path
			             d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
			     	</svg>
						</div>
					</div>
					<?php
							$tmp_chkrempass = "";
							if(count($_COOKIE) > 0){
								if(isset($_COOKIE['adm-email']) && isset($_COOKIE['adm-password'])){
									$tmp_chkrempass = "";
								}else{
									$tmp_chkrempass = "
										<div class='c-LoginAdm--cLoginF--cForm--form--cControl flx-justify-end'>
											<div class='c-LoginAdm--cLoginF--cForm--form--cControl--cSpanText'>
												<span>Recordar contraseña</span>
											</div>
											<div class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk'>
												<input type='checkbox' name='adm-remem-pass' id='adm-remem-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk--input' placeholder='Recordar contraseña'>											
												<label for='adm-remem-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk--cLabeltext'>
												</label>
											</div>
										</div>
									";
								}
							}else{
								$tmp_chkrempass = "
										<div class='c-LoginAdm--cLoginF--cForm--form--cControl flx-justify-end'>
											<div class='c-LoginAdm--cLoginF--cForm--form--cControl--cSpanText'>
												<span>Recordar contraseña</span>
											</div>
											<div class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk'>
												<input type='checkbox' name='adm-remem-pass' id='adm-remem-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk--input' placeholder='Recordar contraseña'>											
												<label for='adm-remem-pass' class='c-LoginAdm--cLoginF--cForm--form--cControl--cIptChk--cLabeltext'>
												</label>
											</div>
										</div>
									";
							}
							echo $tmp_chkrempass;
					?>
					<button type="submit" class="c-LoginAdm--cLoginF--cForm--form--btnLoginAdm">
						<span>ACCEDER</span>
						<img src="views/assets/img/svg/icon-arrow-intranet-login.svg" alt="icon_intranet_admin" width="100" height="100">
						<span></span>
					</button>
				</form>
			</div>
			<div class="c-LoginAdm--cLoginF--cBottInfo">
				<small class="c-LoginAdm--cLoginF--cBottInfo--desc">
					<span>&copy;</span>
					<span>2020 - <?php echo date("Y"); ?></span>
					<span>&nbsp;-&nbsp;</span>
					<span>Versión 1.0</span>
				</small>
			</div>
		</div>
		<div class="c-LoginAdm--cBcImage"></div>
	</main>
	<script type="text/javascript" src="<?= $url;?>js/actions_pages/adm-login.js"></script>
</body>
</html>