<?php 
require_once '../../models/db/connection.php';
class Login_Adm extends Connection{
	function Login(){

		$arr_logiadm = [
			"email" => $_POST['loginadm'][0]['value'],
			"password" => $_POST['loginadm'][1]['value']
		];

		try{
			$sql = "SELECT * FROM tbl_admin WHERE email = :email AND password = :password";
			$stm = $this->con->prepare($sql);
			foreach ($arr_logiadm as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}