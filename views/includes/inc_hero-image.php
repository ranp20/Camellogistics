<?php 
  require_once 'models/banners.php';
  $banners = new Banners();
  $get_banner_p = $banners->get_banner_p();
  
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $urlpathImages =  $actual_link . "/Camellogistics/admin/";
  $pathbannerp = $urlpathImages."views/assets/img/banner_principal/".$get_banner_p[0]['photo'];
?>
<header class="h-heroImage-init mtop-headertop" id="h-heroImage-init" style="background-image: url(<?= $pathbannerp; ?>);">
  <div class="h-heroImage-init--c box-containerredux">
    <div class="h-heroImage-init--c--cTitle">Welcome To Our Studio!</div>
    <div class="h-heroImage-init--c--cDesc">It's Nice To Meet You</div>
    <a class="h-heroImage-init--c--btngoToServices" href="#services">Tell Me More</a>
  </div>
</header>