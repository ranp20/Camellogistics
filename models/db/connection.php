<?php 
	
class Connection{

	// CONFIGURACIÓN - SERVIDOR (SERVIDOR TEMPORAL)
  /*
  protected $con = null;
	private $host = "207.7.82.106";
	private $dbname = "grupopdg_camellogistics_db";
	private $username = "grupopdg_camellogistics_user";
	private $password = "A%,Q?%#U]N~K";
	private $charset = "utf8";
  */  

  // CONFIGURACIÓN - LOCALHOST
	protected $con = null;
	// private $host = "localhost";
	private $host = "127.0.0.1:3309";
	private $dbname = "db_camellogistics";
	private $username = "root";
	private $password = "";
	private $charset = "utf8";

	public function __construct(){
		try{

			$this->con = new PDO("mysql:host={$this->host}; dbname={$this->dbname}; charset={$this->charset}", $this->username, $this->password);
			$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		}catch(PDOException $err){
			echo "Error al conectar con la base de datos: ".$this->$dbname;
			die($err->getMessage());
		}
	}

	public function close(){
		if($this->con != null) $this->con = null;
	}
}