<?php 
require_once '../../models/db/connection.php';
class Add_Products extends Connection{	
	function add(){
		$arr_product = [
			"name" => $_POST['name'],
			"sel_regulated" => $_POST['sel_regulated'],
			"sel_ammadditional" => $_POST['sel_ammadditional'],
			"sel_taxadditional" => $_POST['sel_taxadditional'],
			"id_regulator" => (isset($_POST['id_regulatorone'])) ? $_POST['id_regulatorone'] : 0,
			"id_regulator_two" => (isset($_POST['id_regulatortwo'])) ? $_POST['id_regulatortwo'] : 0,
			"amount_additional" => (isset($_POST['amount_additional']) && $_POST['amount_additional'] != "" && $_POST['amount_additional'] != "undefined") ? $_POST['amount_additional'] : 0,
			"ad_valoren" => (isset($_POST['ad_valoren']) && $_POST['ad_valoren'] != "" && $_POST['ad_valoren'] != "undefined") ? $_POST['ad_valoren'] : 0,
			"impuesto_selectivo" => (isset($_POST['impuesto_selectivo']) && $_POST['impuesto_selectivo'] != "" && $_POST['impuesto_selectivo'] != "undefined") ? $_POST['impuesto_selectivo'] : 0,
			"antidumping" => (isset($_POST['antidumping']) && $_POST['antidumping'] != "" && $_POST['antidumping'] != "undefined") ? $_POST['antidumping'] : 0
		];
		try{
			$sql = "CALL sp_add_product(:name, :sel_regulated, :sel_ammadditional, :sel_taxadditional, :id_regulator, :id_regulator_two, :amount_additional, :ad_valoren, :impuesto_selectivo, :antidumping)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_product as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->rowCount() > 0 ? "true" : "false";

		}catch(PDOException $err){
			return $err->getMessage();
		}
	}
}
$products = new Add_Products();
echo $products->add();