<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<nav class="c-HtopbarCalculator" id="c-HTop-camel">
  <div class="c-HtopbarCalculator--c">
    <div class="c-HtopbarCalculator--c--cLogo">
      <a href="calculadora">
        <img src="<?= $url ?>assets/img/logotipo-camel.png" alt="logo_camel">
      </a>
    </div>
    <button class="c-HtopbarCalculator--c--btnMobileNavbar" type="button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="c-HtopbarCalculator--c--cMenu">
      <ul class="c-HtopbarCalculator--c--cMenu--m">
        <li class="c-HtopbarCalculator--c--cMenu--m--item">
          <a href="calculadora" class="c-HtopbarCalculator--c--cMenu--m--link">
            
            <span>Inicio</span>
          </a>
        </li>
        <li class="c-HtopbarCalculator--c--cMenu--m--item">
          <a href="calculadora" class="c-HtopbarCalculator--c--cMenu--m--link">Calculadora de fletes</a>
        </li>
      </ul>
    </div>
  </div>
</nav>