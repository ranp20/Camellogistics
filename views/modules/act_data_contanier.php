<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');
			$user_id=$_POST['user_cotizacion_id'];
           
            $result = $conexion->query("SELECT co.importacion_estado,co.servicio_estado,cm.cantidad_contenedores,ct.contenedor_tipo,co.user_cotizacion_id,cm.sub_total_containers,cm.tipo_flete,cm.contenedor_tipo_id,co.servicios_1,co.servicios_2,co.servicios_3,co.servicios_4,co.tipo_producto_id,co.valor_producto,co.trans_origen,co.trans_destino,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
            FROM tbl_user_cotizacion co
            inner join tbl_detail_cotizacion_maritima cm on cm.user_cotizacion_id=co.user_cotizacion_id
            inner join tbl_aq_puertos tpu on tpu.puerto_id=cm.puerto_origen_id
            inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=cm.puerto_destino_id
            inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
            inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
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
