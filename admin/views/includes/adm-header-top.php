<?php 
$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
// CONFIGURACIÓN LOCALHOST
$urlAdmin =  $actual_link . "/Camellogistics/admin/";
// CONFIGURACIÓN SERVIDOR
/*
$urlAdmin =  $actual_link . "/admin/";
*/
?>
<header id="h-dashCamel" class="h-dashCamel">
	<div class="h-dashCamel--c">
		<div id="icon-togglemenuMobile">
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="h-dashCamel--c--cTitle">
			<h2>CAMELLOGISTICS</h2>
		</div>
		<div class="h-dashCamel--c--cClock">
			<div class="h-dashCamel--c--cClock--timeclock" id="dash-timeclock-detail"></div>
		</div>
		<div class="h-dashCamel--c--cFullScreen">
			<a href="javascript:void(0);" class="h-dashCamel--c--cFullScreen__link" title="Pantalla completa" id="btn-Toggfullscreen">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path></svg>
			</a>
		</div>
		<div class="h-dashCamel--c--cCBtnWebPage">
			<a href="../" class="h-dashCamel--c--cCBtnWebPage--link" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"></path></svg>
			</a>
		</div>
		<div class="h-dashCamel--c--cUserMobile">
			<div class="h-dashCamel--c--cUserMobile--linkcont" id="btn-sessuserAdm">
				<img src="<?= $url;?>assets/img/utilities/user-pro-default.png" alt="">
				<span><?= $admname; ?></span>
			</div>
			<ul class="h-dashCamel--c--cUserMobile--m" id="list-opts-sessuser">
				<li class="h-dashCamel--c--cUserMobile--m--item">
					<a href="controllers/prcss_logout-adm.php" class="h-dashCamel--c--cUserMobile--m--link">CERRAR SESIÓN</a>
				</li>
			</ul>
		</div>
		<div class="h-dashCamel--c--cUserDesktop">
			<div class="h-dashCamel--c--cUserDesktop--linkcont" id="btn-sessuserAdm">
				<img src="<?= $url;?>assets/img/utilities/user-pro-default.png" alt="">
				<span><?= $admname; ?></span>
			</div>
			<ul class="h-dashCamel--c--cUserDesktop--m" id="list-opts-sessuser">
				<li class="h-dashCamel--c--cUserDesktop--m--item">
					<a href="<?= $urlAdmin ?>controllers/prcss_logout-adm.php" class="h-dashCamel--c--cUserDesktop--m--link">CERRAR SESIÓN</a>
				</li>
			</ul>
		</div>
	</div>
</header>
<script type="text/javascript">
	function refreshTime(){
		let currentDate = new Date(),
				year = currentDate.getFullYear(),
				month = currentDate.getMonth(),
				day = parseInt(currentDate.toDateString().slice(8, -5)),
				weekday = currentDate.getDay(),
				hours = currentDate.getHours(),
				minutes = currentDate.getMinutes(),
				seconds = currentDate.getSeconds();

		const weekdays = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

		if(day < 10){
			day = "0" + day;
		}

		if(minutes < 10){
			minutes = "0" + minutes;
		}

		if(seconds < 10){
			seconds = "0" + seconds;
		}
		
		document.querySelector('#dash-timeclock-detail').textContent = weekdays[weekday] + ", " + 
																																day + " de " + 
																																months[month] + " del " + 
																																year + " - " + 
																																hours + " : " +
																																minutes + " : " +
																																seconds;
	}

	setInterval(refreshTime, 1000);


  /* Get into full screen */
	function GoInFullscreen(element) {
		if(element.requestFullscreen)
			element.requestFullscreen();
		else if(element.mozRequestFullScreen)
			element.mozRequestFullScreen();
		else if(element.webkitRequestFullscreen)
			element.webkitRequestFullscreen();
		else if(element.msRequestFullscreen)
			element.msRequestFullscreen();
	}

	/* Get out of full screen */
	function GoOutFullscreen() {
		if(document.exitFullscreen)
			document.exitFullscreen();
		else if(document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if(document.webkitExitFullscreen)
			document.webkitExitFullscreen();
		else if(document.msExitFullscreen)
			document.msExitFullscreen();
	}

	/* Is currently in full screen or not */
	function IsFullScreenCurrently() {
		var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
		
		// If no element is in full-screen
		if(full_screen_element === null)
			return false;
		else
			return true;
	}

	$("#btn-Toggfullscreen").on('click', function() {
		if(IsFullScreenCurrently())
			GoOutFullscreen();
		else
			GoInFullscreen($("body").get(0));
	});

	$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
		if(IsFullScreenCurrently()) {
			console.log("Estás en modo pantalla completa");
			document.querySelector("body").classList.add("Mod-fullscreen");
		}
		else {
			console.log("Saliste del modo pantalla completa");
			document.querySelector("body").classList.remove("Mod-fullscreen");
		}
	});
</script>