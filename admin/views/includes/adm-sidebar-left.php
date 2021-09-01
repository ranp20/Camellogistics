<?php
	$admname = $_SESSION['admin_camel']['username'];
?>
<nav id="nav-dashCamel" class="nav-dashCamel">
	<div class="nav-dashCamel--c">
		<div class="nav-dashCamel--c--cLogo">
			<img src="<?= $url ?>assets/img/utilities/logotipo-camellogistics.png" alt="" class="nav-dashCamel--c--cLogo--img">
		</div>
		<div class="nav-dashCamel--c--cUserInfo">
			<div class="nav-dashCamel--c--cUserInfo--cAvatar">
				<img src="<?= $url ?>assets/img/utilities/user-pro-default.png" alt="" class="nav-dashCamel--c--cUserInfo--cAvatar--img">
			</div>
			<div class="nav-dashCamel--c--cUserInfo--cInfo">
				<h3 class="nav-dashCamel--c--cUserInfo--cInfo--title"><?= $admname; ?></h3>
				<p class="nav-dashCamel--c--cUserInfo--cInfo--desc">Administrador</p>
			</div>
		</div>
		<div class="nav-dashCamel--c--cList">
			<ul class="nav-dashCamel--c--cList--m">
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="dashboard" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="tachometer-alt-slowest" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-tachometer-alt-slowest fa-w-18 fa-3x"><path fill="currentColor" d="M128 184c0-13.26 10.74-24 24-24s24 10.74 24 24-10.74 24-24 24-24-10.74-24-24zm160-32c13.26 0 24-10.74 24-24s-10.74-24-24-24-24 10.74-24 24 10.74 24 24 24zm288 168c0 52.8-14.25 102.26-39.06 144.8-5.61 9.62-16.3 15.2-27.44 15.2h-443c-11.14 0-21.83-5.58-27.44-15.2C14.25 422.26 0 372.8 0 320 0 160.94 128.94 32 288 32s288 128.94 288 288zm-32 0c0-141.16-114.84-256-256-256S32 178.84 32 320c0 45.26 12 89.75 34.7 128.68l442.8-.68C532 409.75 544 365.26 544 320zm-192 32c0 35.35-28.65 64-64 64-33.41 0-60.53-25.7-63.43-58.35l-131.2-21.87c-8.72-1.45-14.62-9.69-13.16-18.41s9.88-14.64 18.41-13.16l130.97 21.83C239.56 303.66 261.91 288 288 288c35.35 0 64 28.65 64 64zm-32 0c0-17.67-14.33-32-32-32s-32 14.33-32 32 14.33 32 32 32 32-14.33 32-32zm160-56c-13.26 0-24 10.74-24 24s10.74 24 24 24 24-10.74 24-24-10.74-24-24-24zm-56-136c-13.26 0-24 10.74-24 24s10.74 24 24 24 24-10.74 24-24-10.74-24-24-24z" class=""></path></svg>
						<span>Tablero de instrumentos</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="precios-fcl" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hand-holding-usd" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-hand-holding-usd fa-w-18 fa-3x"><path fill="currentColor" d="M256.7 135.7l56.4 16.1c8.8 2.5 14.9 10.6 14.9 19.7 0 11.3-9.2 20.5-20.5 20.5h-36.9c-8.2 0-16.1-2.6-22.6-7.3-3-2.2-7.2-1.5-9.8 1.2l-11.4 11.4c-3.5 3.5-2.9 9.2 1 12.2 12.3 9.4 27.2 14.5 42.9 14.5h1.4v24c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-24h1.4c22.8 0 44.3-13.6 51.7-35.2 10.1-29.6-7.3-59.8-35.1-67.8L263 104.1c-8.8-2.5-14.9-10.6-14.9-19.7 0-11.3 9.2-20.5 20.5-20.5h36.9c8.2 0 16.1 2.6 22.6 7.3 3 2.2 7.2 1.5 9.8-1.2l11.4-11.4c3.5-3.5 2.9-9.2-1-12.2C336 37.1 321.1 32 305.4 32H304V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h-3.5c-30.6 0-55.1 26.3-52.2 57.5 2 22.1 19 40.1 40.4 46.2zm301.6 197.9c-19.7-17.7-49.4-17.6-69.9-1.2l-61.6 49.3c-1.9 1.5-4.2 2.3-6.7 2.3h-41.6c4.6-9.6 6.5-20.7 4.8-32.3-4-27.9-29.6-47.7-57.8-47.7H181.3c-20.8 0-41 6.7-57.6 19.2L85.3 352H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h88l46.9-35.2c11.1-8.3 24.6-12.8 38.4-12.8H328c13.3 0 24 10.7 24 24s-10.7 24-24 24h-88c-8.8 0-16 7.2-16 16s7.2 16 16 16h180.2c9.7 0 19.1-3.3 26.7-9.3l61.6-49.2c7.7-6.1 20-7.6 28.4 0 10.1 9.1 9.3 24.5-.9 32.6l-100.8 80.7c-7.6 6.1-17 9.3-26.7 9.3H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h400.5c17 0 33.4-5.8 46.6-16.4L556 415c12.2-9.8 19.5-24.4 20-40s-6-30.8-17.7-41.4z" class=""></path></svg>
						<span>Precios - FCL</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="precios-lcl" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="hands-usd" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-hands-usd fa-w-20 fa-3x"><path fill="currentColor" d="M640 144c0-26.8-21.9-48.4-48.8-48-26 .4-47.2 23.7-47.2 49.7v137.1l-62 73.3c-7.1 8.4-20.1-1.7-13.6-10.7l28.6-39.3c13.4-18.5 13.1-44.6-2.5-61.3-25.5-27.4-60.6-15.3-74.5 3.9l-42.4 58.4C361 329.3 352 356.3 352 384v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V384c0-20.6 6.8-41.1 19.5-58l42.4-58.4c5.3-7.3 15.3-8.7 22.4-3.5 7.8 5.6 8.3 15.8 3.5 22.3l-30.6 42.2c-.2.3-.4.5-.5.8-26.1 39.7 33.9 86.7 70.8 42.4l64.6-77.5V144.6c0-22.3 32-21.7 32-.7v170.4c0 3.6-1.2 7.2-3.5 10L497.6 458c-9.5 11.9-15.5 29.2-17.1 45.2-.5 4.8 3.2 8.7 8 8.7h16c4 0 7.5-2.9 8-6.9 1.2-9.6 4.6-20.2 10.1-27l107-133.7c6.8-8.5 10.5-19.1 10.5-30L640 144zM220 248.8c-14-19.2-49.1-31.4-74.5-3.9-15.6 16.8-15.9 42.8-2.5 61.3l28.6 39.3c6.5 8.9-6.5 19.1-13.6 10.7l-62-73.3V145.8c0-26-21.2-49.3-47.2-49.7C21.9 95.6 0 117.2 0 144v170.4c0 10.9 3.7 21.5 10.5 30l107 133.7c5.4 6.8 8.9 17.5 10.1 27 .5 4 4 6.9 8 6.9h16c4.8 0 8.5-3.9 8-8.7-1.6-16-7.5-33.3-17.1-45.2l-107-133.7c-2.3-2.8-3.5-6.4-3.5-10V144c0-21 32-21.6 32 .7v149.7l64.6 77.5c36.9 44.2 96.8-2.7 70.8-42.4-.2-.3-.4-.5-.5-.8l-30.6-42.2c-4.7-6.5-4.2-16.7 3.5-22.3 7-5.1 17.1-3.8 22.4 3.5l42.4 58.4c12.7 16.9 19.5 37.4 19.5 58v120c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-120c0-27.7-9-54.6-25.6-76.8L220 248.8zm169.1-60c10.1-29.6-7.3-59.8-35.1-67.8l-59.1-16.9c-8.8-2.5-14.9-10.6-14.9-19.7 0-11.3 9.2-20.5 20.5-20.5h36.9c8.2 0 16.1 2.6 22.6 7.3 3 2.2 7.2 1.5 9.8-1.2l11.4-11.4c3.5-3.5 2.9-9.2-1-12.2C368 37.1 353.1 32 337.4 32H336V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v24h-3.5c-30.6 0-55.1 26.3-52.2 57.5 2.1 22.2 19.1 40.1 40.5 46.2l56.4 16.1c8.8 2.5 14.9 10.6 14.9 19.7 0 11.3-9.2 20.5-20.5 20.5h-36.9c-8.2 0-16.1-2.6-22.6-7.3-3-2.2-7.2-1.5-9.8 1.2l-11.4 11.4c-3.5 3.5-2.9 9.2 1 12.2 12.3 9.4 27.2 14.5 42.9 14.5h1.4v24c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-24h1.4c22.6 0 44.1-13.6 51.5-35.2z" class=""></path></svg>
						<span>Precios - LCL</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="tarifas-fcl" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-cube fa-w-16 fa-3x"><path fill="currentColor" d="M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 34.2l224 84v.3l-224 97.1-224-97.1v-.3l224-84zM32 153.4l208 90.1v224.7l-208-104V153.4zm240 314.8V243.5l208-90.1v210.9L272 468.2z" class=""></path></svg>
						<span>Tarifa FCL</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="tarifas-lcl" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="cubes" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-cubes fa-w-16 fa-3x"><path fill="currentColor" d="M384 215.1V102.5c0-15-9.3-28.4-23.4-33.7l-92-34.5c-8.1-3.1-17.1-3.1-25.3 0l-92 34.5c-14.1 5.3-23.4 18.7-23.4 33.7v112.6L23.4 254.4C9.3 259.6 0 273.1 0 288.1v106.6c0 13.6 7.7 26.1 19.9 32.2l98.6 49.3c10.1 5.1 22.1 5.1 32.2 0L256 423.6l105.3 52.6c10.1 5.1 22.1 5.1 32.2 0l98.6-49.3c12.2-6.1 19.9-18.6 19.9-32.2V288.1c0-15-9.3-28.4-23.4-33.7L384 215.1zm-116 34.8V152l92-31.7v97.6l-92 32zM152 94.2l104-39 104 39v.2L256 131 152 94.3v-.1zm0 26.1l92 31.7v97.9l-92-32v-97.6zm-30 329.4l-96.8-48.4V308l96.8 39.3v102.4zM25.2 280.8v-.2l109.4-41 108.1 40.5v1.2l-108.1 43.9-109.4-44.4zm122 66.5l95.5-38.8V402l-95.5 47.8V347.3zm217.6 102.4L269.3 402v-93.4l95.5 38.8v102.3zm122-48.4L390 449.7V347.3l96.8-39.3v93.3zm0-120.5l-109.4 44.4-108.1-43.9v-1.2l108.1-40.5 109.4 41v.2z" class=""></path></svg>
						<span>Tarifa LCL</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="tarifas-lcl-transporte" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="truck" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-truck fa-w-20 fa-3x"><path fill="currentColor" d="M632 384h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H49.4C22.2 32 0 52.9 0 78.6v290.8C0 395.1 22.2 416 49.4 416h16.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM460.1 160c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c.8.8 1.1 1.9 1.8 2.8H416v-96h44.1zM144 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm63.6-96C193 364.7 170 352 144 352s-49 12.7-63.6 32h-31c-9.6 0-17.4-6.5-17.4-14.6V78.6C32 70.5 39.8 64 49.4 64h317.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6zM496 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-128c-26.1 0-49 12.7-63.6 32H416v-96h160v96h-16.4c-14.6-19.3-37.5-32-63.6-32z" class=""></path></svg>
						<span>Tarifa LCL - Transporte Interno</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="seguro" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shield-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-shield-check fa-w-16 fa-3x"><path fill="currentColor" d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM262.2 478.8c-4 1.6-8.4 1.6-12.3 0C152 440 48 304 48 128c0-6.5 3.9-12.3 9.8-14.8l192-80c3.9-1.6 8.4-1.6 12.3 0l192 80c6 2.5 9.9 8.3 9.8 14.8.1 176-103.9 312-201.7 350.8zm136.2-325c-4.7-4.7-12.3-4.7-17-.1L218 315.8l-69-69.5c-4.7-4.7-12.3-4.7-17-.1l-8.5 8.5c-4.7 4.7-4.7 12.3-.1 17l85.9 86.6c4.7 4.7 12.3 4.7 17 .1l180.5-179c4.7-4.7 4.7-12.3.1-17z" class=""></path></svg>
						<span>Seguro</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="reguladores" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="balance-scale-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-balance-scale-left fa-w-20 fa-3x"><path fill="currentColor" d="M634.4 247.09L525.35 71.12C522.18 66.38 517.09 64 512 64s-10.18 2.38-13.35 7.12L389.6 247.09c-3.87 5.78-6.09 12.72-5.51 19.64C389.56 332.4 444.74 384 512 384s122.44-51.6 127.91-117.27c.58-6.92-1.64-13.86-5.51-19.64zM512 352c-41.58 0-77.55-27.13-90.78-64h181.2C589 325.23 553.28 352 512 352zm-90.27-96l90.31-145.76L602.98 256H421.73zM536 480H336V125.74c22.29-5.77 39.71-23.13 45.62-45.36l148.29-49.62c4.19-1.4 6.45-5.94 5.05-10.12l-5.08-15.17c-1.4-4.19-5.94-6.45-10.12-5.05L381.34 46.73C373.77 19.83 349.32 0 320 0c-35.35 0-64 28.65-64 64 0 8.21 1.67 15.98 4.54 23.15l-150.45 50.34c-4.19 1.4-6.45 5.94-5.05 10.12l5.08 15.17c1.4 4.19 5.94 6.45 10.12 5.05l160.45-53.68c6.82 5.36 14.67 9.34 23.32 11.58V504c0 4.42 3.58 8 8 8h224c4.42 0 8-3.58 8-8v-16c-.01-4.42-3.59-8-8.01-8zM288 64c0-17.64 14.36-32 32-32s32 14.36 32 32-14.36 32-32 32-32-14.36-32-32zM141.35 199.12c-3.17-4.75-8.26-7.12-13.35-7.12s-10.18 2.38-13.35 7.12L5.6 375.09c-3.87 5.78-6.09 12.72-5.51 19.64C5.56 460.4 60.74 512 128 512s122.44-51.6 127.91-117.27c.58-6.92-1.64-13.86-5.51-19.64L141.35 199.12zM128 480c-41.58 0-77.55-27.13-90.78-64h181.2C205 453.23 169.28 480 128 480zm-90.27-96l90.31-145.76L218.98 384H37.73z" class=""></path></svg>
						<span>Reguladores</span>
					</a>
				</li>
				<li class="nav-dashCamel--c--cList--m--item">
					<a href="productos" class="nav-dashCamel--c--cList--m--link">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="dolly-flatbed-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-dolly-flatbed-alt fa-w-20 fa-3x"><path fill="currentColor" d="M208 352h384c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16h-48V80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16zM416 96h96v96h-96V96zm0 128h160v96H416v-96zM224 96h160v224H224V96zm408 320H128V8c0-4.4-3.6-8-8-8H8C3.6 0 0 3.6 0 8v16c0 4.4 3.6 8 8 8h88v408c0 4.4 3.6 8 8 8h58.9c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H451c-1.8 5-2.9 10.4-2.9 16 0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1.2-11-2.9-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm-424 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm288 0c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" class=""></path></svg>
						<span>Productos</span>
					</a>
				</li>
			</ul>
			<ul class="nav-dashCamel--c--cList--mOthers">
				<li class="nav-dashCamel--c--cList--mOthers--item">
					<a href="ajustes-del-home" class="nav-dashCamel--c--cList--mOthers--link">
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="desktop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-desktop fa-w-18 fa-3x"><path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v288c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-6 336H54c-3.3 0-6-2.7-6-6V54c0-3.3 2.7-6 6-6h468c3.3 0 6 2.7 6 6v276c0 3.3-2.7 6-6 6zm-42 152c0 13.3-10.7 24-24 24H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h98.7l18.6-55.8c1.6-4.9 6.2-8.2 11.4-8.2h78.7c5.2 0 9.8 3.3 11.4 8.2l18.6 55.8H456c13.3 0 24 10.7 24 24z" class=""></path></svg>
						<span>Ajustes del Home</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>