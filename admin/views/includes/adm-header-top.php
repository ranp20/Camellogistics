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
		<div class="h-dashCamel--c--cUser">
			<div class="h-dashCamel--c--cUser--linkcont" id="btn-sessuserAdm">
				<img src="<?= $url ?>assets/img/utilities/user_default.png" alt="">
				<span><?= $admname; ?></span>
			</div>
			<ul class="h-dashCamel--c--cUser--m" id="list-opts-sessuser">
				<li class="h-dashCamel--c--cUser--m--item">
					<a href="controllers/prcss_logout-adm.php" class="h-dashCamel--c--cUser--m--link">CERRAR SESIÓN</a>
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