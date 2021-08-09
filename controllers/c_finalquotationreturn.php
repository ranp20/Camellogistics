<?php 	
if(isset($_POST)){
	header("Location: quotationgenerate");
	return $_POST;
}else{
	echo "Error. Lo sentimo hubo un error al calcular la cotización";
}