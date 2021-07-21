<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');

            $gast_portuario_aduana=array();
			$user_id=$_POST['user_cotizacion_lcl_id'];
            $gast_portuario_aduana=$_POST['servicio_1'];
            $perm_aduana=$_POST['servicio_2'];
            $gast_trans_dom=$_POST['servicio_3'];
            $gast_seg_merc=$_POST['servicio_4'];
            $tipo_producto_id=$_POST['tipo_producto_id'];
            $valor_producto=$_POST['valor_producto'];
            $trans_origen=$_POST['trans_origen'];
            $trans_destino=$_POST['trans_destino'];

            /*$ruc=$_POST['ruc'];
            $celular=$_POST['celular'];
            $correo=$_POST['correo'];*/


          
			
            $consulta="UPDATE tbl_user_cotizacion_lcl SET servicio_1='$gast_portuario_aduana',servicio_2=$perm_aduana,servicio_3=$gast_trans_dom,servicio_4=$gast_seg_merc,tipo_producto_id=$tipo_producto_id,valor_producto=$valor_producto,trans_origen=$trans_origen,trans_destino=$trans_destino WHERE user_cotizacion_lcl_id=$user_id";
            
            $ej_consulta=$conexion->query($consulta);
            $sql = "SELECT cm.valor_total,reg.regulador,tp.name,cm.tipo_flete,cm.bultos,co.user_cotizacion_lcl_id,cm.peso,cm.peso_simb,cm.volumen,cm.volumen_simb,co.servicio_1,co.servicio_2,co.servicio_3,co.servicio_4,co.tipo_producto_id,co.valor_producto,co.trans_origen,co.trans_destino,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
            FROM tbl_user_cotizacion_lcl co
            inner join tbl_cotizacion_lcl_detail cm on cm.user_cotizacion_lcl_id=co.user_cotizacion_lcl_id
            inner join tbl_aq_puertos tpu on tpu.puerto_id=cm.puerto_origen_id
            inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=cm.puerto_destino_id
            inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
            inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
            left join tbl_tipo_productos tp on tp.tipo_producto_id=co.tipo_producto_id
            left join tbl_regulador reg on reg.regulador_id=tp.regulador_id
            where cm.user_cotizacion_lcl_id=$user_id"; 
            $result = $conexion->query($sql);
            
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
