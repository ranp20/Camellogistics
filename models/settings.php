<?php
require_once 'db/connection.php';
class Settings_all extends Connection{
	private $table = "tbl_settings";

	function __construct(){
		parent::__construct();
	}

	function get_config(){
		return function ($namekey){
			try{
				$sql = "SELECT setting_value FROM {$this->table} WHERE setting_name = :setting_name LIMIT 1";
				$stm = $this->con->prepare($sql);
				$stm->bindValue(":setting_name", $namekey);
				$stm->execute();
				$data = $stm->fetchAll(PDO::FETCH_ASSOC);
				$res = [];
				foreach ($data as $key => $value) {
					$res = $value;
				}
				return $res;
			}catch(PDOException $e){
				return $e->getMessage();
			}
		};
	}
}