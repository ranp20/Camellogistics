<?php
session_start();
require_once '../../models/regulators.php';
$regulator = new Regulator();
$filter = (isset($_REQUEST['action'])&& $_REQUEST['action'] !=NULL) ? $_REQUEST['action'] : '';

if($filter == 'filter'){

	//VARIABLES DE PAGINACIÓN...
	$page = (isset($_REQUEST['page']) && !empty($_REQUEST['page'])) ? $_REQUEST['page'] : 1;
	$per_page = 16; //CANTIDAD DE REGISTROS A MOSTRAR POR PÁGINA...
	$adjacents  = 3; //brecha entre páginas después de varios adyacentes
	$offset = ($page - 1) * $per_page;

	$count_query = $regulator->get_count_regulators($filter);

	if ($row = $count_query){
		$numrows = $row[0]['numrows'];
	}
	
	$total_pages = ceil($numrows/$per_page);

	$resultpags = array(
		"offset" => $offset,
		"per_page" => $per_page
	);

	$res = json_encode($resultpags);
	echo $res;
	$regulators = $regulator->get_limit_regulators($offset, $per_page);

	/*********************** FUNCIÓN - ESTRUCTURA DE PAGINACIÓN *********************/
	function paginate($page, $tpages, $adjacents) {
		$prevlabel = "&lsaquo; Anterior";
		$nextlabel = "Siguiente &rsaquo;";
		$out = '<ul class="pagination pagination-large">';
		
		/*********************** PÁGINA ANTERIOR ************************/
		if($page==1) {
			$out.= "<li class='disabled'><span><a>$prevlabel</a></span></li>";
		} else if($page==2) {
			$out.= "<li><span><a href='javascript:void(0);' onclick='load(1)'>$prevlabel</a></span></li>";
		}else {
			$out.= "<li><span><a href='javascript:void(0);' onclick='load(".($page-1).")'>$prevlabel</a></span></li>";
		}
		
		/*********************** PRIMERA PÁGINA ************************/
		if($page>($adjacents+1)) {
			$out.= "<li><a href='javascript:void(0);' onclick='load(1)'>1</a></li>";
		}

		/*********************** INTERVALOS ************************/
		if($page>($adjacents+2)) {
			$out.= "<li><a>...</a></li>";
		}

		/*********************** PÁGINAS ************************/
		$pmin = ($page>$adjacents) ? ($page-$adjacents) : 1;
		$pmax = ($page<($tpages-$adjacents)) ? ($page+$adjacents) : $tpages;
		for($i=$pmin; $i<=$pmax; $i++) {
			if($i==$page) {
				$out.= "<li class='active'><a>$i</a></li>";
			}else if($i==1) {
				$out.= "<li><a href='javascript:void(0);' onclick='load(1)'>$i</a></li>";
			}else {
				$out.= "<li><a href='javascript:void(0);' onclick='load(".$i.")'>$i</a></li>";
			}
		}

		/*********************** INTERVALOS ************************/
		if($page<($tpages-$adjacents-1)) {
			$out.= "<li><a>...</a></li>";
		}

		/*********************** ÚLTIMA PÁGINA ************************/
		if($page<($tpages-$adjacents)) {
			$out.= "<li><a href='javascript:void(0);' onclick='load($tpages)'>$tpages</a></li>";
		}

		/*********************** SIGUIENTE PÁGINA ************************/
		if($page<$tpages) {
			$out.= "<li><span><a href='javascript:void(0);' onclick='load(".($page+1).")'>$nextlabel</a></span></li>";
		}else {
			$out.= "<li class='disabled'><span><a>$nextlabel</a></span></li>";
		}
		
		$out.= "</ul>";
		return $out;
	}

	if ($numrows>0){

?>
	<table class="table table-bordered">
		<thead>
			<tr>
			  <th>Id</th>
			  <th>Nombre</th>
			  <th>--</th>
			  <th>--</th>
			</tr>
		</thead>
		<tbody>
		<?php 
			foreach ($regulators as $key => $value){
				echo "
					<tr>
						<td>{$value['id']}</td>
						<td>{$value['name']}</td>
						<td class='cont-btn-update'>
	            <a class='btn-update-regulator' data-toggle='modal' data-target='#updateModal'  href='#' 
	              data-id='{$value['id']}'
	              data-name='{$value['name']}'
	              >Editar</a>
	          </td>
	          <td class='cont-btn-delete' id='cont-btn-delete'>
	            <a class='btn-delete-regulator' data-toggle='modal' data-target='#deleteModal' href='#'
	              data-id='{$value['id']}'
	              >Eliminar</a>
	          </td>
					</tr>
				";
			}
		 ?>
		</tbody>
	</table>
	<div class="content_pagination">
		<?= paginate($page, $total_pages, $adjacents);?>
	</div>	
		<?php
	} else {
		?>
	<div class="alert alert-warning alert-dismissable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <h4>Aviso!!!</h4> No hay datos para mostrar
  </div>
		<?php
	}
}
?>