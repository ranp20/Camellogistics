<?php
require_once 'db/connection.php';
class Banners extends Connection
{
  private $banner_principal = "tbl_banner_principal";

  function __construct()
  {
    parent::__construct();
  }
  // -------------- LISTAR - BANNER PRINCIPAL
  function get_banner_p(){
    try{
      $sql = "SELECT * FROM {$this->banner_principal}";
      $stm = $this->con->prepare($sql);
      $stm->execute();
      return $stm->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
}