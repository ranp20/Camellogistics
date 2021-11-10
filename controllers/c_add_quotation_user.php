<?php 
require_once '../models/db/connection.php';
class Add_Quotation_User extends Connection{
	function add(){

		$arr_userquotation = [
			'codegenerate' => $_POST['codegenerate'],
			'u_login' => $_POST['u_login'],
			'f_type_op' => $_POST['f_type_op'],
			'f_type_transp' => $_POST['f_type_transp'],
			'f_type_cont' => $_POST['f_type_cont'],
			'u_entreprise' => $_POST['u_entreprise'],
			'u_telephone' => $_POST['u_telephone'],
			'u_service' => $_POST['u_service'],
			'u_cont' => $_POST['u_cont'],
			'f_origen' => $_POST['f_origen'],
			'f_weight_v' => $_POST['f_weight_v'],
			'f_time_trans' => $_POST['f_time_trans'],
			'f_fob' => $_POST['f_fob'],
			'f_flete' => $_POST['f_flete'],
			'f_insurance' => $_POST['f_insurance'],
			'f_cif' => $_POST['f_cif']
		];

		try{
			$sql = "CALL sp_add_quotation_user(
			:codegenerate,
			:u_login, 
			:f_type_op, 
			:f_type_transp, 
			:f_type_cont, 
			:u_entreprise, 
			:u_telephone, 
			:u_service, 
			:u_cont, 
			:f_origen, 
			:f_weight_v, 
			:f_time_trans, 
			:f_fob, 
			:f_flete, 
			:f_insurance, 
			:f_cif
			)";
			$stm = $this->con->prepare($sql);
			foreach ($arr_userquotation as $key => $value) {
				$stm->bindValue($key, $value);
			}
			$stm->execute();

			$data = $stm->fetchAll(PDO::FETCH_ASSOC);
			$res = json_encode($data);
			return $res;

		}catch(PDOException $e){
			return $e->getMessage();
		}
	}
}
$add_quotationuser = new Add_Quotation_User();
echo $add_quotationuser->add();