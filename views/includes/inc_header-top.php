<?php 
  $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $url =  $actual_link . "/Camellogistics/views/";
  $sess_user = 0;
  if(isset($_SESSION['user_camel'])){
    $sess_user = $_SESSION['user_camel']['username'];
  }else{
    $sess_user = "";
  }
?>
<nav class="c-Htopbar" id="c-HTop-camel">
  <div class="c-Htopbar--c">
    <div class="c-Htopbar--c--cLogo">
      <a href="./">
        <img src="<?= $url ?>assets/img/logos/logotipo-camel.png" alt="logo_camel" width="100" height="100" decoding="async">
        <span>
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <input type="hidden" id="s_useregin-sistem" value="<?php echo $sess_user;?>">
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </a>
    </div>
    <button type="button" class="c-Htopbar--c--btnMobileNavbar" id="btn-m-mobile-header" title="Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="c-Htopbar--c--cMenu">
      <div class="c-Htopbar--c--cMenu--Mmobile" id="c-mMobile-backdrop">
        <div id="btn-sidebarl-close">
          <div id="btn-sidebarl-close--btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul class="c-Htopbar--c--cMenu--Mmobile--m">
          <li class="c-Htopbar--c--cMenu--Mmobile--m--item">
            <a href="./" class="c-Htopbar--c--cMenu--Mmobile--m--link">Inicio</a>
          </li>
          <li class="c-Htopbar--c--cMenu--Mmobile--m--item">
            <a href="marketplace-logistico" class="c-Htopbar--c--cMenu--Mmobile--m--link">Marketplace Logístico</a>
          </li>
          <li class="c-Htopbar--c--cMenu--Mmobile--m--item" id="s-loginsessuser-active-mb">
            <?php
              if(isset($_SESSION['user_camel'])){
                echo "
                  <a href='javascript:void(0);' class='c-Htopbar--c--cMenu--Mmobile--m--link'>
                    <span class='c-Htopbar--c--cMenu--Mmobile--m--link--sessUser'>{$_SESSION['user_camel']['username']}</span>
                  </a>
                  <ul class='c-Htopbar--c--cMenu--Mmobile--m--item--subm'>
                    <li class='c-Htopbar--c--cMenu--Mmobile--m--item--subm--subitem'>
                      <a href='logout' class='c-Htopbar--c--cMenu--Mmobile--m--item--subm--sublink'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#fff' viewBox='0 0 24 24'><path d='M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z'/></svg>
                        <span>Cerrar sesión</span>
                      </a>
                    </li>
                  </ul>";
              }else{
                echo "
                  <a href='javascript:void(0);' class='c-Htopbar--c--cMenu--Mmobile--m--link' id='s-formLoginOrRegister'>
                    <span>Log in</span>
                  </a>";
              }
            ?>
          </li>
        </ul>
      </div>
      <ul class="c-Htopbar--c--cMenu--m">
        <li class="c-Htopbar--c--cMenu--m--item">
          <a href="./" class="c-Htopbar--c--cMenu--m--link">Inicio</a>
        </li>
        <li class="c-Htopbar--c--cMenu--m--item">
          <a href="marketplace-logistico" class="c-Htopbar--c--cMenu--m--link">Marketplace Logístico</a>
        </li>
        <li class="c-Htopbar--c--cMenu--m--item" id="s-loginsessuser-active-ms">
          <?php 
            if(isset($_SESSION['user_camel'])){
              echo "
                <a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
                  <span class='c-Htopbar--c--cMenu--m--link--sessUser'>{$_SESSION['user_camel']['username']}</span>
                </a>
                <ul class='c-Htopbar--c--cMenu--m--item--subm'>
                  <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
                    <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#fff' viewBox='0 0 24 24'><path d='M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z'/></svg>
                      <span>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>";
            }else{
              echo "
                <a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link' id='s-formLoginOrRegister'>
                  <span>Log in</span>
                </a>";
            }
          ?>
        </li>
      </ul>
    </div>
  </div>
</nav>