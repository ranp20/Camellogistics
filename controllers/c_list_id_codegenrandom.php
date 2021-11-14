<?php 
require_once '../models/db/connection.php';
class List_id_codegenrandom extends Connection{
	function list(){

		$format = 'xxxxxxxxxxxxxxxxxy';

	  return preg_replace_callback('/[xy]/', function($match) {
	    $pattern = '1234567890';
	 
	    if($match[0] === 'x'){
	      return substr($pattern, mt_rand(0, strlen($pattern)), 1);
	    }else{
	      return substr(date('y'), -2);
	    }
	  }, "CML-".$format);
	}
}
$idcodegenrandom = new List_id_codegenrandom();
echo $idcodegenrandom->list();