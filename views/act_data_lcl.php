<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');
			$user_id=$_POST['user_cotizacion_lcl_id'];
           
            $result = $conexion->query("SELECT cm.bultos,co.user_cotizacion_lcl_id,cm.peso,cm.peso_simb,cm.volumen,cm.volumen_simb,cm.tipo_flete,cm.peso_simb,co.servicio_1,co.servicio_2,co.servicio_3,co.servicio_4,co.tipo_producto_id,co.valor_producto,co.trans_origen,co.trans_destino,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
            FROM tbl_user_cotizacion_lcl co
            inner join tbl_cotizacion_lcl_detail cm on cm.user_cotizacion_lcl_id=co.user_cotizacion_lcl_id
            inner join tbl_aq_puertos tpu on tpu.puerto_id=cm.puerto_origen_id
            inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=cm.puerto_destino_id
            inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
            inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
            /*inner join tbl_aq_contenedor_tipo ct on ct.contenedor_tipo_id=cm.contenedor_tipo_id*/
            where cm.user_cotizacion_lcl_id=$user_id;");	
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
