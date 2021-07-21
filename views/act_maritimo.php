<?php
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');
//if(isset($_POST)){
//if(isset($_POST['next_maritimo'])){
$html = '';
$contenedor_id = array();
$t_flete = $_POST['text_tipo_flete'];
$sub_total_containers = $_POST['tot_pre_cont'];
$puerto_origen_id = $_POST['puertos_orig'];
$puerto_destino_id = $_POST['puertos_dest'];
$datos_cont['contenedor_tipo_id'] = $_POST['tip_cont_id'];
$datos_cont['cantidad_contenedores'] = $_POST['txtnum_co'];

//$user_id=1;
if ($_POST['tip_contenedor'] == 'con_completo') {


    // fcl
    $consulta = "INSERT INTO tbl_user_cotizacion(servicio_estado,servicios_1, servicios_2, servicios_3, servicios_4, tipo_producto_id, valor_producto, importacion_estado, trans_origen, trans_destino, ruc, celular, correo) VALUES ('','','','','','','','','','','','','')";
    $ej_consulta = $conexion->query($consulta);

    $result = $conexion->query("SELECT * FROM tbl_user_cotizacion ucot WHERE ucot.user_cotizacion_id=last_insert_id();");
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            //$cotizacion= $row['puerto_origen'].'->'.$row['puerto_destino'].''.$row['contenedor_tipo'];
            $user_cotizacion_id = $row['user_cotizacion_id'];
        }
    }
    //echo $cotizacion;



    //echo json_encode($user_cotizacion_id);


    for ($i = 0; $i < count($datos_cont['contenedor_tipo_id']); $i++) {
        //if($_POST['txtnum_'.$datos_cont['contenedor_tipo_id'][$i]]>0){
        if ($_POST['txtnum_co'][$i] > 0) {
            $consulta = "INSERT INTO tbl_detail_cotizacion_maritima(tipo_flete,puerto_origen_id,puerto_destino_id,contenedor_tipo_id,cantidad_contenedores,sub_total_containers,user_cotizacion_id) VALUES ('$t_flete','$puerto_origen_id','$puerto_destino_id','" . $datos_cont['contenedor_tipo_id'][$i] . "'," . $datos_cont['cantidad_contenedores'][$i] . ",$sub_total_containers,$user_cotizacion_id)";
            $ej_consulta = $conexion->query($consulta);
        }
        /*echo "<pre>";
			print_r($_POST['tip_cont_id']);
			echo "</pre>";
            die(); */
    }

    $result = $conexion->query("SELECT dmat.cantidad_contenedores,dmat.cot_maritima_id,dmat.tipo_flete,dmat.user_cotizacion_id,dmat.puerto_origen_id,dmat.puerto_destino_id,cti.contenedor_tipo,concat(tpu.puerto,'-',tpa.pais) as puerto_origen,concat(tpu1.puerto,'-',tpa1.pais) as puerto_destino
            FROM tbl_detail_cotizacion_maritima dmat
            inner join tbl_aq_contenedor_tipo cti on cti.contenedor_tipo_id=dmat.contenedor_tipo_id
            inner join tbl_aq_puertos tpu on tpu.puerto_id=dmat.puerto_origen_id
            inner join tbl_aq_puertos tpu1 on tpu1.puerto_id=dmat.puerto_destino_id
            inner join tbl_aq_paises tpa on tpa.pais_id=tpu.pais_id
            inner join tbl_aq_paises tpa1 on tpa1.pais_id=tpu1.pais_id
            WHERE  dmat.user_cotizacion_id=$user_cotizacion_id;");
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            //$cotizacion= $row['puerto_origen'].'->'.$row['puerto_destino'].''.$row['contenedor_tipo'];
            $cotizacion[] = $row;
        }
    }
    //echo $cotizacion;

}elseif( $_POST['tip_contenedor'] == 'con_compartido' ){
    $bultos = $_POST['bultos'];
}

echo json_encode($cotizacion);
		//}
	//}
