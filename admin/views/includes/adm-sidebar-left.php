<?php
$admname = $_SESSION['admin_camel']['username'];
?>
<div class="nav-dashCamel">
	<nav class="nav-dashCamel--sidenav" id="nav-dashCamel">
		<div class="nav-dashCamel--sidenav--c">
			<span id="closebtnToggSideNav_icon">
		  	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="35px" height="35px"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
		  </span>
			<div class="nav-dashCamel--sidenav--c--cLogo">
				<img src="<?= $url;?>assets/img/utilities/logotipo-camellogistics.png" alt="icon_camellogistics_adm" class="nav-dashCamel--sidenav--c--cLogo--img" width="100" height="100">
			</div>
			<div class="nav-dashCamel--sidenav--c--cUserInfo">
				<div class="nav-dashCamel--sidenav--c--cUserInfo--cAvatar">
					<img src="<?= $url;?>assets/img/utilities/user-pro-default.png" alt="icon_useradmin_adm" class="nav-dashCamel--sidenav--c--cUserInfo--cAvatar--img" width="100" height="100">
				</div>
				<div class="nav-dashCamel--sidenav--c--cUserInfo--cInfo">
					<h3 class="nav-dashCamel--sidenav--c--cUserInfo--cInfo--title"><?= $admname; ?></h3>
					<p class="nav-dashCamel--sidenav--c--cUserInfo--cInfo--desc">Administrador</p>
				</div>
			</div>
			<div class="nav-dashCamel--sidenav--c--cList">
				<ul class="nav-dashCamel--sidenav--c--cList--m">
					<!--<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="dashboard" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="tachometer-alt-slowest" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-tachometer-alt-slowest fa-w-18 fa-3x"><path fill="currentColor" d="M128 184c0-13.26 10.74-24 24-24s24 10.74 24 24-10.74 24-24 24-24-10.74-24-24zm160-32c13.26 0 24-10.74 24-24s-10.74-24-24-24-24 10.74-24 24 10.74 24 24 24zm288 168c0 52.8-14.25 102.26-39.06 144.8-5.61 9.62-16.3 15.2-27.44 15.2h-443c-11.14 0-21.83-5.58-27.44-15.2C14.25 422.26 0 372.8 0 320 0 160.94 128.94 32 288 32s288 128.94 288 288zm-32 0c0-141.16-114.84-256-256-256S32 178.84 32 320c0 45.26 12 89.75 34.7 128.68l442.8-.68C532 409.75 544 365.26 544 320zm-192 32c0 35.35-28.65 64-64 64-33.41 0-60.53-25.7-63.43-58.35l-131.2-21.87c-8.72-1.45-14.62-9.69-13.16-18.41s9.88-14.64 18.41-13.16l130.97 21.83C239.56 303.66 261.91 288 288 288c35.35 0 64 28.65 64 64zm-32 0c0-17.67-14.33-32-32-32s-32 14.33-32 32 14.33 32 32 32 32-14.33 32-32zm160-56c-13.26 0-24 10.74-24 24s10.74 24 24 24 24-10.74 24-24-10.74-24-24-24zm-56-136c-13.26 0-24 10.74-24 24s10.74 24 24 24 24-10.74 24-24-10.74-24-24-24z" class=""></path></svg>
							<span>Tablero de instrumentos</span>
						</a>
					</li>-->
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="quotation-users" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="address-book" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-address-book fa-w-14 fa-3x"><path fill="currentColor" d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h288c35.3 0 64-28.7 64-64v-32h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-52 288c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h288c17.6 0 32 14.4 32 32v384zM208 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C100.2 326.1 96 339 96 352.9V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-7 2.1-13.8 6-19.6 5.6-8.3 15.8-13.2 27.3-13.2 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 11.5 0 21.7 5 27.3 13.2 3.9 5.8 6 12.6 6 19.6V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-13.9-4.2-26.8-11.4-37.5-12.3-18-32.9-27.4-54-27.4z" class=""></path></svg>
							<span>Cotizaciones del Usuario</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="precios-fcl" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hand-holding-usd" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-hand-holding-usd fa-w-18 fa-3x"><path fill="currentColor" d="M256.7 135.7l56.4 16.1c8.8 2.5 14.9 10.6 14.9 19.7 0 11.3-9.2 20.5-20.5 20.5h-36.9c-8.2 0-16.1-2.6-22.6-7.3-3-2.2-7.2-1.5-9.8 1.2l-11.4 11.4c-3.5 3.5-2.9 9.2 1 12.2 12.3 9.4 27.2 14.5 42.9 14.5h1.4v24c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-24h1.4c22.8 0 44.3-13.6 51.7-35.2 10.1-29.6-7.3-59.8-35.1-67.8L263 104.1c-8.8-2.5-14.9-10.6-14.9-19.7 0-11.3 9.2-20.5 20.5-20.5h36.9c8.2 0 16.1 2.6 22.6 7.3 3 2.2 7.2 1.5 9.8-1.2l11.4-11.4c3.5-3.5 2.9-9.2-1-12.2C336 37.1 321.1 32 305.4 32H304V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h-3.5c-30.6 0-55.1 26.3-52.2 57.5 2 22.1 19 40.1 40.4 46.2zm301.6 197.9c-19.7-17.7-49.4-17.6-69.9-1.2l-61.6 49.3c-1.9 1.5-4.2 2.3-6.7 2.3h-41.6c4.6-9.6 6.5-20.7 4.8-32.3-4-27.9-29.6-47.7-57.8-47.7H181.3c-20.8 0-41 6.7-57.6 19.2L85.3 352H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88l46.9-35.2c11.1-8.3 24.6-12.8 38.4-12.8H328c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88c-8.8 0-16 7.2-16 16s7.2 16 16 16h180.2c9.7 0 19.1-3.3 26.7-9.3l61.6-49.2c7.7-6.1 20-7.6 28.4 0 10.1 9.1 9.3 24.5-.9 32.6l-100.8 80.7c-7.6 6.1-17 9.3-26.7 9.3H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h400.5c17 0 33.4-5.8 46.6-16.4L556 415c12.2-9.8 19.5-24.4 20-40s-6-30.8-17.7-41.4z" class=""></path></svg>
							<span>Precios - FCL</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="precios-lcl" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hands-usd" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-hands-usd fa-w-20 fa-3x"><path fill="currentColor" d="M640 144c0-26.8-21.9-48.4-48.8-48-26 .4-47.2 23.7-47.2 49.7v137.1l-62 73.3c-7.1 8.4-20.1-1.7-13.6-10.7l28.6-39.3c13.4-18.5 13.1-44.6-2.5-61.3-25.5-27.4-60.6-15.3-74.5 3.9l-42.4 58.4C361 329.3 352 356.3 352 384v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V384c0-20.6 6.8-41.1 19.5-58l42.4-58.4c5.3-7.3 15.3-8.7 22.4-3.5 7.8 5.6 8.3 15.8 3.5 22.3l-30.6 42.2c-.2.3-.4.5-.5.8-26.1 39.7 33.9 86.7 70.8 42.4l64.6-77.5V144.6c0-22.3 32-21.7 32-.7v170.4c0 3.6-1.2 7.2-3.5 10L497.6 458c-9.5 11.9-15.5 29.2-17.1 45.2-.5 4.8 3.2 8.7 8 8.7h16c4 0 7.5-2.9 8-6.9 1.2-9.6 4.6-20.2 10.1-27l107-133.7c6.8-8.5 10.5-19.1 10.5-30L640 144zM220 248.8c-14-19.2-49.1-31.4-74.5-3.9-15.6 16.8-15.9 42.8-2.5 61.3l28.6 39.3c6.5 8.9-6.5 19.1-13.6 10.7l-62-73.3V145.8c0-26-21.2-49.3-47.2-49.7C21.9 95.6 0 117.2 0 144v170.4c0 10.9 3.7 21.5 10.5 30l107 133.7c5.4 6.8 8.9 17.5 10.1 27 .5 4 4 6.9 8 6.9h16c4.8 0 8.5-3.9 8-8.7-1.6-16-7.5-33.3-17.1-45.2l-107-133.7c-2.3-2.8-3.5-6.4-3.5-10V144c0-21 32-21.6 32 .7v149.7l64.6 77.5c36.9 44.2 96.8-2.7 70.8-42.4-.2-.3-.4-.5-.5-.8l-30.6-42.2c-4.7-6.5-4.2-16.7 3.5-22.3 7-5.1 17.1-3.8 22.4 3.5l42.4 58.4c12.7 16.9 19.5 37.4 19.5 58v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-120c0-27.7-9-54.6-25.6-76.8L220 248.8zm169.1-60c10.1-29.6-7.3-59.8-35.1-67.8l-59.1-16.9c-8.8-2.5-14.9-10.6-14.9-19.7 0-11.3 9.2-20.5 20.5-20.5h36.9c8.2 0 16.1 2.6 22.6 7.3 3 2.2 7.2 1.5 9.8-1.2l11.4-11.4c3.5-3.5 2.9-9.2-1-12.2C368 37.1 353.1 32 337.4 32H336V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h-3.5c-30.6 0-55.1 26.3-52.2 57.5 2.1 22.2 19.1 40.1 40.5 46.2l56.4 16.1c8.8 2.5 14.9 10.6 14.9 19.7 0 11.3-9.2 20.5-20.5 20.5h-36.9c-8.2 0-16.1-2.6-22.6-7.3-3-2.2-7.2-1.5-9.8 1.2l-11.4 11.4c-3.5 3.5-2.9 9.2 1 12.2 12.3 9.4 27.2 14.5 42.9 14.5h1.4v24c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-24h1.4c22.6 0 44.1-13.6 51.5-35.2z" class=""></path></svg>
							<span>Precios - LCL</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="tarifas-fcl" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cube" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-cube fa-w-16 fa-3x"><path fill="currentColor" d="M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 34.2l224 84v.3l-224 97.1-224-97.1v-.3l224-84zM32 153.4l208 90.1v224.7l-208-104V153.4zm240 314.8V243.5l208-90.1v210.9L272 468.2z" class=""></path></svg>
							<span>Tarifa FCL</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="tarifas-lcl" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="cubes" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-cubes fa-w-16 fa-3x"><path fill="currentColor" d="M384 215.1V102.5c0-15-9.3-28.4-23.4-33.7l-92-34.5c-8.1-3.1-17.1-3.1-25.3 0l-92 34.5c-14.1 5.3-23.4 18.7-23.4 33.7v112.6L23.4 254.4C9.3 259.6 0 273.1 0 288.1v106.6c0 13.6 7.7 26.1 19.9 32.2l98.6 49.3c10.1 5.1 22.1 5.1 32.2 0L256 423.6l105.3 52.6c10.1 5.1 22.1 5.1 32.2 0l98.6-49.3c12.2-6.1 19.9-18.6 19.9-32.2V288.1c0-15-9.3-28.4-23.4-33.7L384 215.1zm-116 34.8V152l92-31.7v97.6l-92 32zM152 94.2l104-39 104 39v.2L256 131 152 94.3v-.1zm0 26.1l92 31.7v97.9l-92-32v-97.6zm-30 329.4l-96.8-48.4V308l96.8 39.3v102.4zM25.2 280.8v-.2l109.4-41 108.1 40.5v1.2l-108.1 43.9-109.4-44.4zm122 66.5l95.5-38.8V402l-95.5 47.8V347.3zm217.6 102.4L269.3 402v-93.4l95.5 38.8v102.3zm122-48.4L390 449.7V347.3l96.8-39.3v93.3zm0-120.5l-109.4 44.4-108.1-43.9v-1.2l108.1-40.5 109.4 41v.2z" class=""></path></svg>
							<span>Tarifa LCL</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="tarifas-lcl-transporte" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="truck" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-truck fa-w-20 fa-3x"><path fill="currentColor" d="M632 384h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H49.4C22.2 32 0 52.9 0 78.6v290.8C0 395.1 22.2 416 49.4 416h16.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM460.1 160c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c.8.8 1.1 1.9 1.8 2.8H416v-96h44.1zM144 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm63.6-96C193 364.7 170 352 144 352s-49 12.7-63.6 32h-31c-9.6 0-17.4-6.5-17.4-14.6V78.6C32 70.5 39.8 64 49.4 64h317.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6zM496 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-128c-26.1 0-49 12.7-63.6 32H416v-96h160v96h-16.4c-14.6-19.3-37.5-32-63.6-32z" class=""></path></svg>
							<span>Tarifa LCL - Transporte Interno</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="seguro" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shield-check" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-shield-check fa-w-16 fa-3x"><path fill="currentColor" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM262.2 478.8c-4 1.6-8.4 1.6-12.3 0C152 440 48 304 48 128c0-6.5 3.9-12.3 9.8-14.8l192-80c3.9-1.6 8.4-1.6 12.3 0l192 80c6 2.5 9.9 8.3 9.8 14.8.1 176-103.9 312-201.7 350.8zm136.2-325c-4.7-4.7-12.3-4.7-17-.1L218 315.8l-69-69.5c-4.7-4.7-12.3-4.7-17-.1l-8.5 8.5c-4.7 4.7-4.7 12.3-.1 17l85.9 86.6c4.7 4.7 12.3 4.7 17 .1l180.5-179c4.7-4.7 4.7-12.3.1-17z" class=""></path></svg>
							<span>Seguro</span>
						</a>
					</li>
					<!-- <li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="mercancia" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m589.85 197.68c-0.17969-1.0508-0.46094-2.082-0.83984-3.0781v-0.44922l-56-137.54c-1.2305-3.1562-3.3867-5.8672-6.1836-7.7773-2.8008-1.9062-6.1094-2.9258-9.4961-2.918h-334.6c-3.3398-0.003906-6.6055 0.99219-9.3789 2.8594-2.7734 1.8633-4.9297 4.5156-6.1875 7.6094l-56 137.54v0.44922c-0.37891 1-0.66016 2.0312-0.83984 3.082v1.3438 1.457 296.8-0.003906c0 4.457 1.7695 8.7305 4.9219 11.879 3.1484 3.1523 7.4219 4.9219 11.879 4.9219h446.21c4.457 0 8.7305-1.7695 11.879-4.9219 3.1523-3.1484 4.9219-7.4219 4.9219-11.879v-296.8-1.457c0-0.5-0.22656-0.66797-0.28125-1.1172zm-41.496-14h-181.55v-104.16h139.21zm-354.37-104.16h139.21v104.16h-181.55zm362.54 400.96h-413v-263.2h413z"/><path d="m264.6 273.28h170.8v33.602h-170.8z"/></g></svg>
							<span>Mercancía</span>
						</a>
					</li> -->
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="otros-valores" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m98.406 534.64h503.19c4.4844 0 8.1172-3.6289 8.1172-8.1172 0-4.4844-3.6289-8.1172-8.1172-8.1172h-58.824v-247.41l28.09 21.551c3.5508 2.7344 8.6406 2.0625 11.375-1.4883l25.797-33.559c2.7266-3.5508 2.0703-8.6484-1.4883-11.383l-48.418-37.215-0.003906-135.26h20.242c4.4844 0 8.1172-3.6289 8.1172-8.1172v-32.043c0-4.4844-3.6289-8.1172-8.1172-8.1172l-110.63 0.003906c-4.4844 0-8.1172 3.6289-8.1172 8.1172v32.043c0 4.4844 3.6289 8.1172 8.1172 8.1172h20.242v81.34l-133.07-102.28c-2.918-2.2344-6.9766-2.2344-9.8906 0l-251.55 193.41c-3.5508 2.7344-4.2148 7.832-1.4883 11.383l25.789 33.559c1.3164 1.7031 3.25 2.8203 5.3828 3.0977 2.2031 0.30859 4.2969-0.30078 6-1.6094l28.09-21.613-0.003906 247.48h-58.824c-4.4844 0-8.1172 3.6289-8.1172 8.1172 0 4.4844 3.6289 8.1133 8.1172 8.1133zm377.44-493.04h94.402v15.812h-94.402zm28.359 32.043h37.688v122.76c-0.81641-0.625-40.105-30.805-37.688-28.945zm-335.27 173.52c-2.7656-1.3477-6.0859-1.0312-8.5273 0.84766l-34.715 26.719-15.898-20.688 240.16-184.66c76.562 58.844 168.21 129.28 240.26 184.65l-15.906 20.703-34.715-26.637c-2.4492-1.8867-5.7539-2.2109-8.5273-0.83984-2.7734 1.3633-4.5273 4.1836-4.5273 7.2773v263.88h-353.08v-263.96c0-3.0938-1.7578-5.9141-4.5312-7.2852z"/><path d="m313.98 328.7h-40.867c0 46.48 19.645 68.309 70.176 72.375v30.566h14.352v-30.566c51.469-2.8203 69.25-38.379 69.25-67.066 0-7.7969-0.30469-27.762-17.156-43.672-7.7969-7.4922-22.77-15.289-52.094-24.648v-58.328c12.164 0 23.711 3.4297 25.578 32.129h40.246c-4.0508-55.523-42.43-62.695-65.82-65.188v-20.281h-14.352v20.281c-44.281 0.62109-65.504 30.871-65.504 64.883 0 43.039 34.938 55.203 65.504 63.32v65.504c-24.016-4.3711-27.445-17.477-29.312-39.309zm43.66-20.902c12.484 3.4414 27.457 11.543 27.457 29.641 0 24.016-17.156 29.945-27.457 30.566zm-40.551-76.109c0-10.285 7.7969-23.391 26.199-24.332v53.973c-12.164-2.8164-26.199-9.3594-26.199-29.641z"/></g></svg>
							<span>Otros valores</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="impuestos" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="badge-percent" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-badge-percent fa-w-16 fa-3x"><path fill="currentColor" d="M349.66 173.65l-11.31-11.31c-3.12-3.12-8.19-3.12-11.31 0l-164.7 164.69c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l164.69-164.69c3.13-3.12 3.13-8.18.01-11.31zM240 192c0-26.47-21.53-48-48-48s-48 21.53-48 48 21.53 48 48 48 48-21.53 48-48zm-64 0c0-8.83 7.19-16 16-16s16 7.17 16 16-7.19 16-16 16-16-7.17-16-16zm144 80c-26.47 0-48 21.53-48 48s21.53 48 48 48 48-21.53 48-48-21.53-48-48-48zm0 64c-8.81 0-16-7.17-16-16s7.19-16 16-16 16 7.17 16 16-7.19 16-16 16zm192-80c0-35.5-19.4-68.2-49.6-85.5 9.1-33.6-.3-70.4-25.4-95.5s-61.9-34.5-95.5-25.4C324.2 19.4 291.5 0 256 0s-68.2 19.4-85.5 49.6c-33.6-9.1-70.4.3-95.5 25.4s-34.5 61.9-25.4 95.5C19.4 187.8 0 220.5 0 256s19.4 68.2 49.6 85.5c-9.1 33.6.3 70.4 25.4 95.5 26.5 26.5 63.4 34.1 95.5 25.4 17.4 30.2 50 49.6 85.5 49.6s68.1-19.4 85.5-49.6c32.7 8.9 69.4.7 95.5-25.4 25.1-25.1 34.5-61.9 25.4-95.5 30.2-17.3 49.6-50 49.6-85.5zm-91.1 68.3c5.3 11.8 29.5 54.1-6.5 90.1-28.9 28.9-57.5 21.3-90.1 6.5C319.7 433 307 480 256 480c-52.1 0-64.7-49.5-68.3-59.1-32.6 14.8-61.3 22.2-90.1-6.5-36.8-36.7-10.9-80.5-6.5-90.1C79 319.7 32 307 32 256c0-52.1 49.5-64.7 59.1-68.3-5.3-11.8-29.5-54.1 6.5-90.1 36.8-36.9 80.8-10.7 90.1-6.5C192.3 79 205 32 256 32c52.1 0 64.7 49.5 68.3 59.1 11.8-5.3 54.1-29.5 90.1 6.5 36.8 36.7 10.9 80.5 6.5 90.1C433 192.3 480 205 480 256c0 52.1-49.5 64.7-59.1 68.3z" class=""></path></svg>
							<span>Impuestos</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="reguladores" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="balance-scale-left" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-balance-scale-left fa-w-20 fa-3x"><path fill="currentColor" d="M634.4 247.09L525.35 71.12C522.18 66.38 517.09 64 512 64s-10.18 2.38-13.35 7.12L389.6 247.09c-3.87 5.78-6.09 12.72-5.51 19.64C389.56 332.4 444.74 384 512 384s122.44-51.6 127.91-117.27c.58-6.92-1.64-13.86-5.51-19.64zM512 352c-41.58 0-77.55-27.13-90.78-64h181.2C589 325.23 553.28 352 512 352zm-90.27-96l90.31-145.76L602.98 256H421.73zM536 480H336V125.74c22.29-5.77 39.71-23.13 45.62-45.36l148.29-49.62c4.19-1.4 6.45-5.94 5.05-10.12l-5.08-15.17c-1.4-4.19-5.94-6.45-10.12-5.05L381.34 46.73C373.77 19.83 349.32 0 320 0c-35.35 0-64 28.65-64 64 0 8.21 1.67 15.98 4.54 23.15l-150.45 50.34c-4.19 1.4-6.45 5.94-5.05 10.12l5.08 15.17c1.4 4.19 5.94 6.45 10.12 5.05l160.45-53.68c6.82 5.36 14.67 9.34 23.32 11.58V504c0 4.42 3.58 8 8 8h224c4.42 0 8-3.58 8-8v-16c-.01-4.42-3.59-8-8.01-8zM288 64c0-17.64 14.36-32 32-32s32 14.36 32 32-14.36 32-32 32-32-14.36-32-32zM141.35 199.12c-3.17-4.75-8.26-7.12-13.35-7.12s-10.18 2.38-13.35 7.12L5.6 375.09c-3.87 5.78-6.09 12.72-5.51 19.64C5.56 460.4 60.74 512 128 512s122.44-51.6 127.91-117.27c.58-6.92-1.64-13.86-5.51-19.64L141.35 199.12zM128 480c-41.58 0-77.55-27.13-90.78-64h181.2C205 453.23 169.28 480 128 480zm-90.27-96l90.31-145.76L218.98 384H37.73z" class=""></path></svg>
							<span>Reguladores</span>
						</a>
					</li>
					<li class="nav-dashCamel--sidenav--c--cList--m--item">
						<a href="productos" class="nav-dashCamel--sidenav--c--cList--m--link">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="dolly-flatbed-alt" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-dolly-flatbed-alt fa-w-20 fa-3x"><path fill="currentColor" d="M208 352h384c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16h-48V80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16zM416 96h96v96h-96V96zm0 128h160v96H416v-96zM224 96h160v224H224V96zm408 320H128V8c0-4.4-3.6-8-8-8H8C3.6 0 0 3.6 0 8v16c0 4.4 3.6 8 8 8h88v408c0 4.4 3.6 8 8 8h58.9c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H451c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-424 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm288 0c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" class=""></path></svg>
							<span>Productos</span>
						</a>
					</li>
				</ul>
				<ul class="nav-dashCamel--sidenav--c--cList--mOthers">
					<li class="nav-dashCamel--sidenav--c--cList--mOthers--item">
						<a href="ajustes" class="nav-dashCamel--sidenav--c--cList--mOthers--link">
							<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="desktop" width="35px" height="35px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-desktop fa-w-18 fa-3x"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v288c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-6 336H54c-3.3 0-6-2.7-6-6V54c0-3.3 2.7-6 6-6h468c3.3 0 6 2.7 6 6v276c0 3.3-2.7 6-6 6zm-42 152c0 13.3-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h98.7l18.6-55.8c1.6-4.9 6.2-8.2 11.4-8.2h78.7c5.2 0 9.8 3.3 11.4 8.2l18.6 55.8H456c13.3 0 24 10.7 24 24z" class=""></path></svg>
							<span>Ajustes del Home</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>