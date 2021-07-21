<?php
$html = '';
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
// $conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
    require_once('conexion.php');

$pais_id = $_POST['puerto_origen_id'];
 
//$result = $conexion->query("SELECT p.puerto_id,CONCAT(p.puerto,' - ',ps.pais) AS puerto_destino,ct.puerto_destino_id FROM tbl_aq_carga_fcl_detail ct inner JOIN tbl_aq_puertos p on p.puerto_id=ct.puerto_destino_id inner JOIN tbl_aq_paises ps on ps.pais_id=p.pais_id WHERE puerto_origen_id= $pais_id GROUP BY ct.puerto_destino_id");
$result = $conexion->query("SELECT p.puerto_id,CONCAT(p.puerto,' - ',ps.pais) AS puerto_destino,ct.puerto_destino_id FROM tbl_aq_carga_fcl_detail ct inner JOIN tbl_aq_puertos p on p.puerto_id=ct.puerto_destino_id
inner JOIN tbl_aq_paises ps on ps.pais_id=p.pais_id inner join tbl_aq_carga_lcl_detail lcl on lcl.puerto_destino_id=p.puerto_id WHERE ct.puerto_origen_id=$pais_id or lcl.puerto_origen_id=$pais_id GROUP BY ct.puerto_destino_id");
if ($result->num_rows > 0) {
    $html .= '<option value="0">Pais, Ciudad o Puerto</option>';
    while ($row = $result->fetch_assoc()) {                
        $html .= '<option value="'.$row['puerto_destino_id'].'">'.$row['puerto_destino'].'</option>';
    }
}
echo $html;
?>