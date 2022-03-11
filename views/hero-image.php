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
<section class="page-section" id="services">
  <div class="container">
    <div class="text-center">
      <h2 class="section-heading text-uppercase">Services</h2>
      <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
    </div>
    <div class="row text-center">
      <div class="col-md-4">
        <span class="fa-stack fa-4x">
            <i class="fas fa-circle fa-stack-2x text-primary"></i>
            <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
        </span>
        <h4 class="my-3">E-Commerce</h4>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
      </div>
      <div class="col-md-4">
        <span class="fa-stack fa-4x">
            <i class="fas fa-circle fa-stack-2x text-primary"></i>
            <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
        </span>
        <h4 class="my-3">Responsive Design</h4>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
      </div>
      <div class="col-md-4">
        <span class="fa-stack fa-4x">
            <i class="fas fa-circle fa-stack-2x text-primary"></i>
            <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
        </span>
        <h4 class="my-3">Web Security</h4>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
      </div>
    </div>
  </div>
</section>
<section class="page-section" id="about">
  <div class="container">
    <div class="text-center">
      <h2 class="section-heading text-uppercase">About</h2>
      <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
    </div>
    <ul class="timeline">
      <li>
        <div class="timeline-image"><img class="rounded-circle img-fluid" src="views/assets/img/logos/logotipo-camel.png" alt="..." /></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h4>2009-2011</h4>
            <h4 class="subheading">Our Humble Beginnings</h4>
          </div>
          <div class="timeline-body">
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
          </div>
        </div>
      </li>
      <li class="timeline-inverted">
        <div class="timeline-image"><img class="rounded-circle img-fluid" src="views/assets/img/logos/logotipo-camel.png" alt="..." /></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h4>March 2011</h4>
            <h4 class="subheading">An Agency is Born</h4>
          </div>
          <div class="timeline-body">
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
          </div>
        </div>
      </li>
      <li>
        <div class="timeline-image"><img class="rounded-circle img-fluid" src="views/assets/img/logos/logotipo-camel.png" alt="..." /></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h4>December 2015</h4>
            <h4 class="subheading">Transition to Full Service</h4>
          </div>
          <div class="timeline-body">
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
          </div>
        </div>
      </li>
      <li class="timeline-inverted">
        <div class="timeline-image"><img class="rounded-circle img-fluid" src="views/assets/img/logos/logotipo-camel.png" alt="..." /></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h4>July 2020</h4>
            <h4 class="subheading">Phase Two Expansion</h4>
          </div>
          <div class="timeline-body"><p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p></div>
        </div>
      </li>
      <li class="timeline-inverted">
        <div class="timeline-image">
          <h4>
              Be Part
              <br />
              Of Our
              <br />
              Story!
          </h4>
        </div>
      </li>
    </ul>
  </div>
</section>