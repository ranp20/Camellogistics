<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
?>
<nav class="c-Htopbar" id="c-HTop-camel">
  <div class="c-Htopbar--c">
    <div class="c-Htopbar--c--cLogo">
      <a href="index.php">
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
          <a href="index.php" class="c-Htopbar--c--cMenu--m--link">Inicio</a>
        </li>
        <li class="c-Htopbar--c--cMenu--m--item">
          <a href="index.php?action=calculadora" class="c-Htopbar--c--cMenu--m--link">Fletes</a>
        </li>
      </ul>
    </div>
  </div>
</nav>