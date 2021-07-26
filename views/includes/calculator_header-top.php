<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<nav class="c-HtopbarCalculator" id="c-CalculatorHTop-camel">
  <div class="c-HtopbarCalculator--c">
    <div class="c-HtopbarCalculator--c--cLogo">
      <a href="./">
        <img src="<?= $url ?>assets/img/logotipo-camel.png" alt="logo_camel">
      </a>
    </div>
    <button class="c-HtopbarCalculator--c--btnMobileNavbar" type="button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="c-HtopbarCalculator--c--cMenu">
      <div class="c-HtopbarCalculator--c--cMenu--cTopinfo"></div>
      <div class="c-HtopbarCalculator--c--cMenu--cBottominfo">
        <ul class="c-HtopbarCalculator--c--cMenu--cBottominfo--m">
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="calculadora" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-home fa-w-18 fa-3x"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" class=""></path></svg>
              <span>Cotiza tu flete</span>
            </a>
          </li>
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="#" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="briefcase" class="svg-inline--fa fa-briefcase fa-w-16 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path></svg>
              <span>Importaciones grupales</span>
            </a>
          </li>
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="#" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" class="svg-inline--fa fa-newspaper fa-w-18 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path></svg>
              <span>Talleres</span>
            </a>
          </li>
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="#" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="newspaper" class="svg-inline--fa fa-newspaper fa-w-18 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"></path></svg>
              <span>Servicios</span>
            </a>
          </li>
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="#" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="money-check" class="svg-inline--fa fa-money-check fa-w-20 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M0 448c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V128H0v320zm448-208c0-8.84 7.16-16 16-16h96c8.84 0 16 7.16 16 16v32c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-32zm0 120c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H456c-4.42 0-8-3.58-8-8v-16zM64 264c0-4.42 3.58-8 8-8h304c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm0 96c0-4.42 3.58-8 8-8h176c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zM624 32H16C7.16 32 0 39.16 0 48v48h640V48c0-8.84-7.16-16-16-16z"></path></svg>
              <span>Aprende a ahorrar</span>
            </a>
          </li>
          <li class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--item">
            <a href="#" class="c-HtopbarCalculator--c--cMenu--cBottominfo--m--link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone" class="svg-inline--fa fa-phone fa-w-16 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>
              <span>Contacto</span>
            </a>
          </li>
        </ul>
        <div class="c-HtopbarCalculator--c--cMenu--cBottominfo--cBtnSessU">
          <span>&nbsp;&nbsp;-&nbsp;</span>
          <a href="javascript:void(0);" id="btn-showLoginForm" class="c-HtopbarCalculator--c--cMenu--cBottominfo--cBtnSessU--btn">Iniciar sesión</a>
        </div>
      </div>
    </div>
  </div>
</nav>