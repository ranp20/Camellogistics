<?php
session_start();
$html = '';
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');

$con_compartido = $_POST['con_compartido'];

$fecha_actual = date('Y-m-d');

$sql = "SELECT * FROM tbl_aq_carga_lcl WHERE vigencia_desde<=$fecha_actual and vigencia_hasta >= $fecha_actual ";
$rst = $conexion->query($sql);
// print_r($rst);
if( $rst->num_rows > 0 ){
    $id_lcl = $rst->fetch_assoc()['carga_lcl_id'];
}else{
    $sql = "SELECT * FROM tbl_aq_carga_lcl WHERE vigencia_hasta = (Select max(vigencia_hasta) FROM tbl_aq_carga_lcl)";
    $rst = $conexion->query($sql);
    $id_lcl = $rst->fetch_assoc()['carga_lcl_id'];
}
$_SESSION['id_lcl'] = $id_lcl;

$result = $conexion->query("SELECT p.puerto_id,CONCAT(p.puerto,' - ',ps.pais) AS puerto_origen,ct.puerto_origen_id
FROM tbl_aq_carga_lcl_detail ct
inner JOIN tbl_aq_puertos p on p.puerto_id=ct.puerto_origen_id
inner JOIN tbl_aq_paises ps on ps.pais_id=p.pais_id
WHERE ct.carga_lcl_id = $id_lcl
");	
if ($result->num_rows > 0) {
    $html .= '<option value="0">Pais, Ciudad o Puerto</option>';
    while ($row = $result->fetch_assoc()) {                
        $html .= '<option value="'.$row['puerto_origen_id'].'">'.$row['puerto_origen'].'</option>';
    }
}
echo $html;
?>