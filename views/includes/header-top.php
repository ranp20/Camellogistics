<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<nav class="c-Htopbar" id="c-HTop-camel">
  <div class="c-Htopbar--c">
    <div class="c-Htopbar--c--cLogo">
      <a href="./">
        <img src="<?= $url ?>assets/img/logotipo-camel.png" alt="logo_camel">
      </a>
    </div>
    <button class="c-Htopbar--c--btnMobileNavbar" type="button">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="c-Htopbar--c--cMenu">
      <ul class="c-Htopbar--c--cMenu--m">
        <li class="c-Htopbar--c--cMenu--m--item">
          <a href="./" class="c-Htopbar--c--cMenu--m--link">Inicio</a>
        </li>
        <li class="c-Htopbar--c--cMenu--m--item">
          <a href="marketplace-logistico" class="c-Htopbar--c--cMenu--m--link">Marketplace Logístico</a>
        </li>
      </ul>
    </div>
  </div>
</nav>