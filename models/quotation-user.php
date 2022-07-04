<?php
require_once 'db/connection.php';
class Quotation_user extends Connection
{
  private $table = "tbl_quotation_user";

  function __construct()
  {
    parent::__construct();
  }

  // -------------- LISTAR COTIZACIÓN POR ID DE CÓDIGO RANDOM
  function get_by_idcodegenrand($id_codegenrand){
    try{
      $sql = "CALL sp_list_quotation_by_codegenrand(:id_gencode)";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(":id_gencode",$id_codegenrand);
      $stm->execute();
      return $stm->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
  // -------------- VALIDAR SI EXISTE LA COTIZACIÓN
  function valid_exist_quotation($id_gencode, $codegenerate){
    try{
      $sql = "CALL sp_validateexists_quotation_user(:id_gencode, :codegenerate)";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(":id_gencode",$id_gencode);
      $stm->bindValue(":codegenerate",$codegenerate);
      $stm->execute();
      return $stm->fetch(PDO::FETCH_ASSOC);
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
  // -------------- GUARDAR LA INFORMACIÓN
  function add_quotation_user($arr_userquotation){
    try{
      $sql = "CALL sp_add_quotation_user(
      :id_codegenrand,
      :codegenerate,
      :u_login,
      :f_typetransendinitid,
      :f_type_op,
      :f_type_serv, 
      :f_type_transp, 
      :f_type_cont,
      :f_optgenfquot, 
      :u_n_document,
      :u_enterprise, 
      :u_telephone, 
      :u_service, 
      :u_cont, 
      :u_regs,
      :f_origen,
      :f_destiny, 
      :f_desc_w_v,
      :f_weight_v, 
      :f_translocation,
      :f_time_transit, 
      :f_fob, 
      :f_flete, 
      :f_insurance, 
      :f_cif,
      :f_v_IGV,
      :f_v_IPM,
      :f_importadoprev,
      :f_v_percepcion,
      :f_v_ad_valoren,
      :f_v_impuesto_selectivo,
      :f_v_antidumping,
      :f_percepcion,
      :f_ad_valoren,
      :f_impuesto_selectivo,
      :f_antidumping,
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
      :f_descarga,
      :f_derechos_embarque,
      :f_consolidacion,
      :f_bohe_o_inspeccion,
      :f_comision_agencia,
      :f_gastos_operativos,
      :f_estiba,
      :f_fichatecnicaycertconform,
      :f_totalinsurance,
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
      return $stm->rowCount() > 0 ? 'true' : 'false';
    }catch(PDOException $e){
      return $e->getMessage();
    }
  }
  // -------------- VALIDAR SI EXISTE LA COTIZACIÓN
  function valid_updatequotation($id_gencode, $codegenerate){
    try{
      $sql = "CALL sp_checkifupdated_userquotation(:id_gencode, :codegenerate)";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(":id_gencode",$id_gencode);
      $stm->bindValue(":codegenerate",$codegenerate);
      $stm->execute();
      return $stm->fetch(PDO::FETCH_ASSOC);
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
  // -------------- ACTUALIZAR LA COTIZACIÓN CON LOS DATOS DEL USUARIO
  function update_quotation_user($arr_updquotation){
    try{
      $sql = "CALL sp_onlyupdatequote_withoutvalidating(:id_gencoderand,:code_quote,:ndoc_cli,:name_enterprise_cli,:telephone_cli)";
      $stm = $this->con->prepare($sql);
      foreach($arr_updquotation as $key => $value){
        $stm->bindValue($key,$value);
      }
      $stm->execute();
      return $stm->rowCount() > 0 ? 'true' : 'false';
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
}