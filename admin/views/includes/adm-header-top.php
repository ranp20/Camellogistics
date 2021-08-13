<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $urlAdmin =  $actual_link . "/Camellogistics/admin/";
?>
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
			<div class="h-dashCamel--c--cClock--timeclock" id="dash-timeclock-detail"></div>
		</div>
		<div class="h-dashCamel--c--cCBtnWebPage">
			<a href="../" class="h-dashCamel--c--cCBtnWebPage--link" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"></path></svg>
			</a>
		</div>
		<div class="h-dashCamel--c--cUserMobile">
			<div class="h-dashCamel--c--cUserMobile--linkcont" id="btn-sessuserAdm">
				<img src="<?= $url ?>assets/img/utilities/user-pro-default.png" alt="">
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
				<img src="<?= $url ?>assets/img/utilities/user-pro-default.png" alt="">
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

		const weekdays = ["Domingo","Lunes","Martes","Miércoles","Jueves","viernes","Sábado"];
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
</script>