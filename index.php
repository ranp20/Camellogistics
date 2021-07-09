<?php

require_once "models/enlaces.php";
require_once "models/crud.php";
require_once "controllers/controller.php";
require_once "controllers/Precios.php";
require_once "models/PreciosModel.php";

$mvc = new MvcController();
$mvc -> pagina();

?>