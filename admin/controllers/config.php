<?php 
require_once '../../models/db/connection.php';
class List_Settings extends Connection{
	function list(){
		return function ($namekey){
			$registros = [];
			$sql = "SELECT setting_value FROM tbl_settings WHERE setting_name = :setting_name LIMIT 1";
			$stm = $this->con->prepare($sql);
			$stm->bindValue(":setting_name", $namekey);
			$stm->execute();
			$data = $stm->fetchAll(PDO::FETCH_ASSOC);
			$res = [];
			foreach ($data as $key => $value) {
				$res = $value;
			}
			return $res;
		};
	}
}