<?php 	
	//COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../");
	}

	require_once '../controllers/c_pagination_quotationusers.php';
	$pagination_qusers = new Pagination_quotationusers();
	$quotation_users = $pagination_qusers->buscar();

	require_once '../controllers/c_paginatelinks_function.php';
	$currpage = 1;
	$totalpages = $quotation_users['paginas'];
	$adjacents = 3;
	
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Cotización de Usuarios</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle" style="padding-top: .85rem;padding-bottom: .85rem;">
						<h2 class="cont-dashCamel__addtitle--title">COTIZACIONES DE USUARIOS</h2>
					</div>
					<div class="cont-dashCamel__inputsearch-table">
						<input type="text" class="cont-dashCamel__inputsearch-table--input" name="search_quotationusers" id="search_quotationusers" maxlength="200" placeholder="Buscar cotizaciones...">
					</div>
					<div class="contain-table-responsive">
						<table class="cont-dashCamel__list-results">
							<thead>
								<tr>
									<th>ID</th>
									<th>Código</th>
									<th>Email</th>
									<th>T. Operación</th>
									<th>T. Transporte</th>
									<th>T. Container</th>
									<th>Nº Documento</th>
									<th>Empresa</th>
									<th>Teléfono</th>
									<th>T. Servicio</th>
								</tr>
							</thead>
							<tbody id="tbl_quotationusers">
								<?php
								$template_qusers = "";
								if(isset($quotation_users['resultados'])){
									foreach ($quotation_users['resultados'][0] as $value){
										$template_qusers .= "
							        <tr id='{$value['id']}'>
							          <td class='center'>{$value['id']}</td>
							          <td>{$value['code_quote']}</td>
							          <td>{$value['u_login']}</td>
							          <td>{$value['f_type_operation']}</td>
							          <td>{$value['f_type_transport']}</td>
							          <td>{$value['f_type_container']}</td>
							          <td>{$value['u_n_document']}</td>
							          <td>{$value['u_enterprise']}</td>
							          <td>{$value['u_telephone']}</td>
							          <td>{$value['u_service']}</td>
							        </tr>
							        ";
							      }
								}else{
									$template_qusers .= "
										<tr>
						          <td colspan='7'>
						            <div class='msg-non-results-res'>
						              <img src='../admin/views/assets/img/utilities/icon-sad-face.svg' alt='' class='msg-non-results-res__icon'>
						              <h3 class='msg-non-results-res__title'>No se encontraron resultados...</h3>
						            </div>
						          </td>
						        </tr>
									";
								}
								echo $template_qusers;
								?>
							</tbody>
						</table>
					</div>
					<div id="cont_listpagination" class="cont_listpagination">
						<?php echo paginate($currpage, $totalpages, $adjacents);?>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/quotation-users.js"></script>
</body>
</html>