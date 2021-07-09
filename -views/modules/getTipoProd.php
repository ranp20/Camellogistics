<?php
$html = '';
//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');

//$pais_id = $_POST['puerto_origen_id'];
 
$result = $conexion->query("SELECT * FROM tbl_tipo_productos");	
if ($result->num_rows > 0) {
    //$html .= '<option value="0">Seleccione, Producto</option>';
    while ($row = $result->fetch_assoc()) {                
        $html .= '<option value="'.$row['tipo_producto_id'].'">'.$row['name'].'</option>';
    }
}
echo $html;
?>