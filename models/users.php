<?php
require_once 'db/connection.php';
class Users extends Connection
{
  private $users = "tbl_users";
  function __construct()
  {
    parent::__construct();
  }
  /************************** VALIDAR EL USUARIO **************************/
  function verify_email($username){
    try{
      $sql = "SELECT * FROM {$this->users} WHERE username = :username";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(':username', $username);
      $stm->execute();
      return $stm->rowCount() > 0 ? 'true' : 'false';
    }catch(PDOEXception $e){
      return $e->getMessage();
    }
  }
  /************************** LISTAR - USERS **************************/
  function get_users($username){
    try{
      $sql = "SELECT * FROM {$this->users} WHERE username = :username";
      $stm = $this->con->prepare($sql);
      $stm->bindValue(':username', $username);
      $stm->execute();
      return $stm->fetchAll(PDO::FETCH_ASSOC);
    }catch(PDOException $e){
      return $e->getMessage();
    }
  }
}