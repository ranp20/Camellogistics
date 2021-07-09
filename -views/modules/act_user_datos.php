<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
            $gast_portuario_aduana=array();
			$user_id=$_POST['user_cotizacion_id'];
            /*$servicio_estado=$_POST['servicio_estado'];*/
            $gast_portuario_aduana=$_POST['servicios_1'];
            $perm_aduana=$_POST['servicios_2'];
            $gast_trans_dom=$_POST['servicios_3'];
            $gast_seg_merc=$_POST['servicios_4'];

            $tipo_producto_id=$_POST['tipo_producto_id'];
            $valor_producto=$_POST['valor_producto'];
            $importacion_estado=$_POST['importacion_estado'];
            $trans_origen=$_POST['trans_origen'];
            $trans_destino=$_POST['trans_destino'];

            /*$ruc=$_POST['ruc'];
            $celular=$_POST['celular'];
            $correo=$_POST['correo'];*/


          
			
            $consulta="UPDATE tbl_user_cotizacion SET servicios_1='$gast_portuario_aduana',servicios_2=$perm_aduana,servicios_3=$gast_trans_dom,servicios_4=$gast_seg_merc,tipo_producto_id=$tipo_producto_id,valor_producto=$valor_producto,importacion_estado='$importacion_estado',trans_origen=$trans_origen,trans_destino=$trans_destino WHERE user_cotizacion_id=$user_id";
            
            $ej_consulta=$conexion->query($consulta);
            
            $result = $conexion->query("SELECT reg.regulador,tp.name,fclc.vigencia_desde,fclc.vigencia_hasta,co.importacion_estado,co.servicio_estado,cm.cantidad_contenedores,ct.contenedor_tipo,co.user_cotizacion_id,cm.sub_total_containers,cm.tipo_flete,cm.contenedor_tipo_id,co.servicios_1,co.servicios_2,co.servicios_3,co.servicios_4,co.tipo_producto_id,co.valor_producto,co.trans_origen,co.trans_destino,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
            FROM tbl_user_cotizacion co
            inner join tbl_detail_cotizacion_maritima cm on cm.user_cotizacion_id=co.user_cotizacion_id
            inner join tbl_aq_puertos tpu on tpu.puerto_id=cm.puerto_origen_id
            inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=cm.puerto_destino_id
            inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
            inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
            inner join tbl_aq_contenedor_tipo ct on ct.contenedor_tipo_id=cm.contenedor_tipo_id
            inner join tbl_aq_carga_fcl_detail fcld on fcld.contenedor_tipo_id=ct.contenedor_tipo_id
            inner join tbl_aq_carga_fcl fclc on fclc.carga_fcl_id=fcld.carga_fcl_id
            left join tbl_tipo_productos tp on tp.tipo_producto_id=co.tipo_producto_id
            left join tbl_regulador reg on reg.regulador_id=tp.regulador_id
            where cm.user_cotizacion_id=$user_id
            group by ct.contenedor_tipo_id");
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
