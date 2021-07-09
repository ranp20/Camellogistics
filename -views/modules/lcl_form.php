<?php
session_start();

//$conexion = new mysqli('localhost', 'root', '', 'bd_camel');
$conexion = new mysqli('localhost', 'calculadorademo_camel', '_qH-KB[g{+=T','calculadorademo_camel');
$puerto_origen_id = $_POST['puerto_origen_id'];
$puerto_destino_id = $_POST['puerto_destino_id'];
$id_lcl = $_SESSION['id_lcl'];


if($puerto_origen_id!=="" && $puerto_destino_id!==""){
 $sql = "SELECT * FROM tbl_aq_carga_lcl_detail WHERE puerto_origen_id = $puerto_origen_id and puerto_destino_id = $puerto_destino_id and carga_lcl_id = $id_lcl";
$rst = $conexion->query($sql);
$id = $rst->fetch_assoc()['carga_lcl_detail_id'];
//$id = $rst->fetch_assoc()['total_5'];
}
?>
<div id="list_cont_compartido">
<input type="hidden" name="carga_lcl_detail_id" id="carga_lcl_detail_id" value="<?=$id?>">
<!--<input type="text" name="carga_lcl_detail_idx" id="carga_lcl_detail_idx" value="<?=$id?>">-->
	<div class="standard_containtlcl">
		BULTOS
		<div class="num_standard_comp">
			<input type="number" name="txtnum_bultos" min=0 value="0">
		</div>
	</div>

	<div class="standard_containtlcl">
		PESO
		<div id="num_peso_containt">
			<input type="number" name="txtnum_peso" min=0 value="0">
		</div>
		<div id="num_peso_containt1">
			<select id="medidas_pesos" name="medidas_pesos" class="est_select">
				<option value="Kilogramos">Kilogramos</option>
				<option value="Libras">Libras</option>
				<option value="Toneladas">Toneladas</option>
			</select>
		</div>
	</div>

	<div class="standard_containtlcl">
		VOLUMEN
		<div id="num_peso_containt">
			<input type="number" name="txtnum_volumen" min=0 value="0">
		</div>
		<div id="num_peso_containt1">
			<select id="medidas_mets" name="medidas_mets" class="est_select">
				<option value="MtsCubicos">Metros Cúbicos</option>
				<option value="PiesCubicos">Pies Cúbicos</option>
			</select>
		</div>
	</div>
	<div align="center">
		<div id="add-lcl-btn" class="button">Guardar</div>
		<input type="hidden" id="tot_pre_cont" name="tot_pre_cont" value="">
	</div>
</div>

<script>
	$("input[type='number']").inputSpinner();
</script>