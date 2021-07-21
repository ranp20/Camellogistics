<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');
	//if(isset($_POST)){
		//if(isset($_POST['next_maritimo'])){
            $gast_portuario_aduana=array();
			$user_id=$_POST['user_cotizacion_id'];
            


          
			
            $result = $conexion->query("SELECT ct.contenedor_tipo,cm.cantidad_contenedores
            FROM tbl_detail_cotizacion_maritima cm
            inner join tbl_aq_contenedor_tipo ct on ct.contenedor_tipo_id=cm.contenedor_tipo_id
            where cm.user_cotizacion_id=$user_id;");	
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {                
                    //$cotizacion= $row['puerto_origen'].'->'.$row['puerto_destino'].''.$row['contenedor_tipo'];
                    $cotizacion[]= $row;
                }
            }
            //echo $cotizacion;
					
	
			
			echo json_encode($cotizacion);
		//}
	//}
?>
