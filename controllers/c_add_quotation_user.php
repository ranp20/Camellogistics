<?php 
require_once 'c_list_ultimate_codegen.php';
require_once '../models/db/connection.php';
class Add_Quotation_User extends Connection{
	function add(){

		$codegen_auto = new List_ultimate_codegen();
		$ulti_codegenauto = $codegen_auto->list();

		$arr_userquotation = [
			'id_codegenrand' => $_POST['id_codegenrand'],
			'codegenerate' => $ulti_codegenauto[0]['res'],
			'u_login' => $_POST['u_login'],
			'f_type_op' => $_POST['f_type_op'],
			'f_type_transp' => $_POST['f_type_transp'],
			'f_type_cont' => $_POST['f_type_cont'],
			'u_n_document' => $_POST['u_n_document'],
			'u_enterprise' => $_POST['u_enterprise'],
			'u_telephone' => $_POST['u_telephone'],
			'u_service' => $_POST['u_service'],
			'u_cont' => $_POST['u_cont'],
			'f_origen' => (isset($_POST['f_origen']) || $_POST['f_origen'] == "") ? "No especificado" : $_POST['f_origen'],
			'f_weight_v' => $_POST['f_weight_v'],
			'f_time_trans' => (isset($_POST['f_time_trans']) || $_POST['f_time_trans'] == "") ? "No especificado" : $_POST['f_time_trans'],
			'f_fob' => $_POST['f_fob'],
			'f_flete' => $_POST['f_flete'],
			'f_insurance' => $_POST['f_insurance'],
			'f_cif' => $_POST['f_cif'],

			'f_percepcion' => 0,
			'f_ad_valoren' => 0,
			'f_impuesto_selectivo' => 0,
			'f_IGV' => 0,
			'f_IPM' => 0,
			'f_emision_BL' => 0,
			'f_handling' => 0,
			'f_visto_bueno' => 0,
			'f_desconsolidacion' => 0,
			'f_almacen_referencial' => 0,
			'f_transporte_interno' => 0,
			'f_aforo_fisico_y_previo' => 0,
			'f_gremios_maritimos' => 0,
			'f_THC' => 0,
			'f_devolucion_contenedores' => 0,
			'f_derechos_embarque' => 0,
			'f_consolidacion' => 0,
			'f_bohe_o_inspeccion' => 0,
			'f_comision_agencia' => 0,
			'f_gastos_operativos' => 0,
			'f_estiba' => 0,

			'f_totalservices' => $_POST['f_totalservices'],
			'f_totalservicesIGV18' => $_POST['f_totalservicesIGV18'],
			'f_totalimpuestos' => $_POST['f_totalimpuestos'],
			'f_totalwithIGV' => $_POST['f_totalwithIGV'],
			'f_validdesde' => $_POST['f_validdesde'],
			'f_validhasta' => $_POST['f_validhasta']
		];

		try{
			$sql = "CALL sp_add_quotation_user(
			:id_codegenrand,
			:codegenerate,
			:u_login, 
			:f_type_op, 
			:f_type_transp, 
			:f_type_cont, 
			:u_n_document,
			:u_enterprise, 
			:u_telephone, 
			:u_service, 
			:u_cont, 
			:f_origen, 
			:f_weight_v, 
			:f_time_trans, 
			:f_fob, 
			:f_flete, 
			:f_insurance, 
			:f_cif,

			:f_percepcion,
			:f_ad_valoren,
			:f_impuesto_selectivo,
			:f_IGV,
			:f_IPM,
			:f_emision_BL,
			:f_handling,
			:f_visto_bueno,
			:f_desconsolidacion,
			:f_almacen_referencial,
			:f_transporte_interno,
			:f_aforo_fisico_y_previo,
			:f_gremios_maritimos,
			:f_THC,
			:f_devolucion_contenedores,
			:f_derechos_embarque,
			:f_consolidacion,
			:f_bohe_o_inspeccion,
			:f_comision_agencia,
			:f_gastos_operativos,
			:f_estiba,

			:f_totalservices,
			:f_totalservicesIGV18,
			:f_totalimpuestos,
			:f_totalwithIGV,
			:f_validdesde,
			:f_validhasta
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