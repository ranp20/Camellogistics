<?php
$html = '';
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');

$con_completo = $_POST['con_completo'];
 
$result = $conexion->query("SELECT p.puerto_id,CONCAT(p.puerto,' - ',ps.pais) AS puerto_origen,ct.puerto_origen_id
FROM tbl_aq_carga_fcl_detail ct
inner JOIN tbl_aq_puertos p on p.puerto_id=ct.puerto_origen_id
inner JOIN tbl_aq_paises ps on ps.pais_id=p.pais_id GROUP BY ct.puerto_origen_id");	
if ($result->num_rows > 0) {
    //$html .= '<option value="0">Pais, Ciudad o Puerto</option>';
    while ($row = $result->fetch_assoc()) {                
        $html .= '<option value="'.$row['puerto_origen_id'].'">'.$row['puerto_origen'].'</option>';
    }
}
echo $html;
?>