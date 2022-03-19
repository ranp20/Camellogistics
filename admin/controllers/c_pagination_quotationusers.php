<?php 
$cant_por_pagina = 10;
require_once '../../models/db/connection.php';
class Pagination_quotationusers extends Connection{
	function buscar( $que = NULL, $pagina = 1 ){
		global $cant_por_pagina;
		$where = "";
		$sql = "";

		$inicio = ($pagina - 1) * $cant_por_pagina;

		if(is_null($que)){
			$where = "";
			$sql = "SELECT * FROM tbl_quotation_user ORDER BY id DESC LIMIT $inicio, $cant_por_pagina";
		}else{
			$search = addslashes($que);
			$where = " WHERE u_login LIKE '%$search%' OR
											 f_type_container LIKE '%$search%' OR
											 u_n_document LIKE '%$search%' ";
			$sql = "SELECT * FROM tbl_quotation_user $where ORDER BY id DESC LIMIT $inicio, $cant_por_pagina";
		}
		
		$registros = [];
		$stm = $this->con->prepare($sql);
		$stm->execute();
		
		while($r = $stm->fetchAll(PDO::FETCH_ASSOC)){
			$registros[] = $r;
		}

		$sql2 = "SELECT COUNT(*) AS CANTIDAD FROM tbl_quotation_user $where";
		$stm2 = $this->con->prepare($sql2);
		$stm2->execute();
		$array = $stm2->fetchAll(PDO::FETCH_ASSOC);
		$paginas = ceil($array[0]['CANTIDAD'] / $cant_por_pagina);

		return [ 'resultados' => $registros, 'paginas' => $paginas, 'actual' => $pagina ];
	}
}