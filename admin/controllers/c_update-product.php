<?php 
require_once '../../models/db/connection.php';
class Update_Product extends Connection{
	function update(){
		$arr_product = [
			"name" => $_POST['name'],
			"sel_regulated" => $_POST['sel_regulated'],
			"sel_taxadditional" => $_POST['sel_taxadditional'],
			"sel_fichatecycertconform" => $_POST['sel_fichatecycertconform'],
			"id_regulatorone" => (isset($_POST['id_regulatorone'])) ? $_POST['id_regulatorone'] : 0,
			"id_regulator_two" => (isset($_POST['id_regulatortwo'])) ? $_POST['id_regulatortwo'] : 0,
			"ad_valoren" => (isset($_POST['ad_valoren']) && $_POST['ad_valoren'] != "" && $_POST['ad_valoren'] != "undefined") ? $_POST['ad_valoren'] : 0,
			"impuesto_selectivo" => (isset($_POST['impuesto_selectivo']) && $_POST['impuesto_selectivo'] != "" && $_POST['impuesto_selectivo'] != "undefined") ? $_POST['impuesto_selectivo'] : 0,
			"antidumping" => (isset($_POST['antidumping']) && $_POST['antidumping'] != "" && $_POST['antidumping'] != "undefined") ? $_POST['antidumping'] : 0,
			"fichatecycertconform" => (isset($_POST['fichatecycertconform']) && $_POST['fichatecycertconform'] != "" && $_POST['fichatecycertconform'] != "undefined") ? $_POST['fichatecycertconform'] : 0,
			"id" => $_POST['id']
		];
		try{
			$sql = "CALL sp_update_product(:name, :sel_regulated, :sel_taxadditional, :sel_fichatecycertconform, :id_regulatorone, :id_regulator_two, :ad_valoren, :impuesto_selectivo, :antidumping, :fichatecycertconform, :id)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_product as $key => $value){
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$product = new Update_Product();
echo $product->update();