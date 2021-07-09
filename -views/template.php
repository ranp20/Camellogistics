<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
		<title>Calculadora de Envíos | Camel</title>
		<meta name="description" content="¡Calcula el costo de tu importación en 4 simples pasos!" />
		<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
		<meta property="og:locale" content="es_ES" />
		<meta property="og:type" content="article" />
		<meta property="og:title" content="Calculadora de Envíos | Camel" />
		<meta property="og:description" content="¡Calcula el costo de tu importación en 4 simples pasos!" />
		<meta property="og:site_name" content="Camel" />

        <link rel="icon" type="image/x-icon" href="views/img/favicon-camel.png" />
        <!-- Font Awesome icons (free version)-->
        <script src="https://use.fontawesome.com/releases/v5.15.3/js/all.js" crossorigin="anonymous"></script>
        <!-- Google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="views/css/styles.css" rel="stylesheet" />
		<!--<link href="views/css/stylecalc.css" rel="stylesheet" />-->
		<link href="views/css/camel.css" rel="stylesheet" />
    </head>
    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="views/assets/img/logotipo-camel.png" alt="..." style="width: 135px; height: 60px;" /></a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars ml-1"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav text-uppercase ml-auto">
                        <!--<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Services</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">About</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Team</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#contact">Contact</a></li>-->
						<?php include "modules/navegacion.php"; ?>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
       

			<?php 
				$mvc = new MvcController();
				$mvc -> enlacesPaginasController();
			?>

        <!-- Footer-->
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-left">
                        Copyright &copy; Camel
                        <!-- This script automatically adds the current year to your website footer-->
                        <!-- (credit: https://updateyourfooter.com/)-->
                        <script>
                            document.write(new Date().getFullYear());
                        </script>
                    </div>
                    <div class="col-lg-4 my-3 my-lg-0">
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <div class="col-lg-4 text-lg-right">
                        <a class="mr-3" href="#!">Politicas de Privacidad</a>
                        
                    </div>
                </div>
            </div>
        </footer>
        <!-- Portfolio Modals-->
        <!-- Modal 1-->
        <?php 
        $precios = new PreciosController;
        ?>
        <script>
        
        var emision_bl_ewb = <?php echo $precios->show_precio('emision_bl_ewb')->value; ?>;
        var almacen_referencial = <?php echo $precios->show_precio('almacen_referencial')->value; ?>;
        var devolucion_contenedores = <?php echo $precios->show_precio('devolucion_contenedores')->value;?>;
        var gremios_maritimos = <?php echo $precios->show_precio('gremios_maritimos')->value; ?>;
        var thc = <?php echo $precios->show_precio('thc')->value; ?>;
        var visto_bueno = <?php echo $precios->show_precio('visto_bueno')->value; ?>;
        var comision_agencia = <?php echo $precios->show_precio('comision_agencia')->value; ?>;
        var gastos_operativos = <?php echo $precios->show_precio('gastos_operativos')->value; ?>;
        // console.log( emision_bl_ewb );
        </script>
        <!-- Bootstrap core JS-->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Third party plugin JS-->
        <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>-->
        <!-- Contact form JS-->
        <!--<script src="assets/mail/jqBootstrapValidation.js"></script>
        <script src="assets/mail/contact_me.js"></script>-->
        <!-- Core theme JS-->
		<script src="views/js/jquery-3.5.1.min.js"></script>
        <script src="views/js/calculadora.js"></script>
		<script type="text/javascript" src="views/js/input-spinner.js"></script>

    </body>
</html>
