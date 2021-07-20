<?php 
	session_start();
	if(!isset($_SESSION['admin'])){
		header("Location: ../");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/header-index.php'; ?>
	<title>Admin - Dashboard</title>
</head>
<body>
	<header>
		<h2>Dashboard de administrador</h2>
		<a href="../controllers/prcss_logout-adm.php">CERRAR SESIÓN</a>
	</header>
	<main>
		<h3>MAIN DE ADMINISTRADOR</h3>
	</main>
</body>
</html>