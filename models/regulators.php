<?php
require_once 'db/connection.php';
class Regulator extends Connection
{
  private $table = "tbl_regulators";

  public function __construct()
  {
    parent::__construct();
  }

  // -------------- DEVOLVER NÚMERO TOTAL DE REGISTROS
  public function get_count_regulators()
  {
    try {
      $sql = "SELECT count(*) as numrows FROM {$this->table}";
      $stm = $this->con->prepare($sql);
      $stm->execute();
      return $stm->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOEXception $e) {
      return $e->getMessage();
    }
  }
  // -------------- LIMITAR EL NÚMERO DE REGISTROS POR VISTA
  public function get_limit_regulators($offset, $per_page)
  {
    try {
      $sql = "CALL sp_limit_Regulators(:offset, :per_page)";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(":offset", $offset);
      $stm->bindValue(":per_page", $per_page);
      $stm->execute();
      return $stm->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOEXception $e) {
      return $e->getMessage();
    }
  }
}
