<?php
// $conexion = new mysqli('localhost', 'root', '', 'pdg_camel');
require_once('conexion.php');
			$tipo_flete=$_POST['tipo_flete'];
            $puerto_origen_id=$_POST['puerto_origen_id'];
            $puerto_destino_id=$_POST['puerto_destino_id'];
            $bultos=$_POST['bultos'];
            $peso=$_POST['peso'];
            $peso_simb=$_POST['peso_simb'];
            $volumen=$_POST['volumen'];
            $volumen_simb=$_POST['volumen_simb'];
            $carga_lcl_detail_id=$_POST['carga_lcl_detail_id'];

            
            $consulta="SELECT * from tbl_aq_carga_lcl_detail aq1 where aq1.carga_lcl_detail_id=$carga_lcl_detail_id and aq1.puerto_origen_id=$puerto_origen_id and aq1.puerto_destino_id=$puerto_destino_id ";
            $result = $conexion->query($consulta);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {  
                    $total_5= $row['total_5'];
                    $total_15= $row['total_15'];
                   $total_mayor_15 = $row['total_mayor15'];
                }
            }
            //$valor_flete_lcl=0;
            $peso_tonelada=0;

            if ($peso_simb=="Kilogramos"){
                $peso_decimal=$peso/1000; 
            
               
                $volumen_1=5.0;
                $volumen_2=15.0;
                
            }
                if($peso_decimal<$volumen){
                    if($volumen<=$volumen_1){
                        $valor_flete_lcl=$volumen*$total_5;
                    }
                }else if($peso_decimal>$volumen){
                    if($volumen<=$volumen_1){
                        $valor_flete_lcl=$peso_decimal*$total_5;
                    }
                }


                if($peso_decimal<$volumen){
                    if($volumen<=$volumen_2){
                        $valor_flete_lcl=$volumen*$total_15;
                    }
                }elseif($peso_decimal>$volumen){
                    if($volumen<=$volumen_2){
                        $valor_flete_lcl=$peso_decimal*$total_15;
                    }
                }

                if($peso_decimal<$volumen){
                    if($peso_decimal>$volumen_2){
                        $valor_flete_lcl=$peso_decimal*$total_mayor_15;
                    }
                }elseif($peso_decimal>$volumen){
                    if($peso_decimal>$volumen_2){
                        $valor_flete_lcl=$peso_decimal*$total_mayor_15;
                    }
                }

               
            if ($peso_simb=="Toneladas"){
                $peso_tonelada=($peso*1000)/1000; 

                $volumen_1=5.0;
                $volumen_2=15.0;
                
            }
                if($peso_tonelada<$volumen){
                    if($volumen<=$volumen_1){
                        $valor_flete_lcl=$volumen*$total_5;
                    }
                }else if($peso_tonelada>$volumen){
                    if($volumen<=$volumen_1){
                        $valor_flete_lcl=$peso_tonelada*$total_5;
                    }
                }


                if($peso_tonelada<$volumen){
                    if($volumen<=$volumen_2){
                        $valor_flete_lcl=$volumen*$total_15;
                    }
                }elseif($peso_tonelada>$volumen){
                    if($volumen<=$volumen_2){
                        $valor_flete_lcl=$peso_tonelada*$total_15;
                    }
                }

                if($peso_tonelada<$volumen){
                    if($peso_tonelada>$volumen_2){
                        $valor_flete_lcl=$peso_tonelada*$total_mayor_15;
                    }
                }elseif($peso_tonelada>$volumen){
                    if($peso_tonelada>$volumen_2){
                        $valor_flete_lcl=$peso_tonelada*$total_mayor_15;
                    }
                }
              
            
           

               

               
               
            
           

            $consulta = "INSERT INTO tbl_user_cotizacion_lcl( servicio_1, servicio_2, servicio_3, servicio_4, tipo_producto_id, valor_producto, trans_origen, trans_destino, nombre_rz_social, ruc, celular, correo) VALUES ('','','','','','','','','','','','')";
            $ej_consulta = $conexion->query($consulta);

            
            $user_cotizacion_lcl_id = $conexion->insert_id;
            
           
           
            $consulta = "INSERT INTO tbl_cotizacion_lcl_detail(tipo_flete, puerto_origen_id, puerto_destino_id, bultos, peso, peso_simb, volumen, volumen_simb,valor_total,carga_lcl_detail_id,user_cotizacion_lcl_id) VALUES ('$tipo_flete',$puerto_origen_id,$puerto_destino_id,$bultos,$peso,'$peso_simb',$volumen,'$volumen_simb',$valor_flete_lcl,$carga_lcl_detail_id,$user_cotizacion_lcl_id)";
            $ej_consulta = $conexion->query($consulta);
            
            $result = $conexion->query("SELECT * from tbl_cotizacion_lcl_detail lcl
            inner join tbl_aq_carga_lcl_detail aq1 on aq1.carga_lcl_detail_id=lcl.carga_lcl_detail_id where lcl.lcl_detail_id=last_insert_id()");
            
           
            if ($result->num_rows > 0) {
               
                $cotizacion = $result->fetch_assoc();
            }
           

			echo json_encode($cotizacion);

?>
