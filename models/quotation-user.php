<?php
require_once 'db/connection.php';
class Quotation_user extends Connection
{
  private $table = "tbl_quotation_user";

  function __construct()
  {
    parent::__construct();
  }

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
}