<?php
$pathbannerp = $url_admin."views/assets/img/banner_principal/".$g_setting("home_banner_principal")['setting_value'];
?>
<header class="h-heroImage-init" id="h-heroImage-init" style="background-image: url(<?= $pathbannerp; ?>);">
  <div class="h-heroImage-init--c box-containerredux">
    <div class="h-heroImage-init--c--cTitle">Welcome To Our Studio!</div>
    <div class="h-heroImage-init--c--cDesc">It's Nice To Meet You</div>
    <a class="h-heroImage-init--c--btngoToServices" href="#services">Tell Me More</a>
  </div>
</header>