<?php
$html = '';
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');

$puerto_origen_id = $_POST['puerto_origen_id'];
$puerto_destino_id = $_POST['puerto_destino_id']; 
/*$vigencia_desde=$_POST['vigencia_desde'];
$vigencia_hasta=$_POST['vigencia_hasta'];*/

$result = $conexion->query("SELECT ta.puerto_origen_id, ct.contenedor_tipo,ct.contenedor_tipo_id,ta.total,ta.carga_fcl_detail_id FROM tbl_aq_carga_fcl_detail ta inner join tbl_aq_contenedor_tipo ct on ct.contenedor_tipo_id=ta.contenedor_tipo_id where ta.puerto_destino_id=$puerto_destino_id and ta.puerto_origen_id=$puerto_origen_id GROUP BY ct.contenedor_tipo_id");


if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {                
        
        $html .= '<div class="standard_containt">'.$row['contenedor_tipo'].'<div class="num_standard"><input id="txtnum_'.$row['contenedor_tipo_id'].'" type="number" class="monto" name="txtnum_co[]" min=0 value=0><input id="txtnumc_'.$row['contenedor_tipo_id'].'" type="hidden" name="txtnumc_'.$row['contenedor_tipo_id'].'" class="precio" min=0 value="'.$row['total'].'"><input type="hidden" id="tip_cont_id" name="tip_cont_id[]" value="'.$row['contenedor_tipo_id'].'"><input type="hidden" id="tex_tarifa_id" name="tex_tarifa_id" value="'.$row['carga_fcl_detail_id'].'"></div></div>';
    }
}
echo $html;
?>
<script>
$("input[type='number']").inputSpinner();
</script>
