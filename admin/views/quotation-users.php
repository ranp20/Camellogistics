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
	<div id="cUIMessageValid-adm"></div>
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
							          <td class='cont-btn-generate-pdf'>
							          	<a class='btn-generate-pdf' href='#' data-id='{$value['id_gencode']}' data-codequote='{$value['code_quote']}'>
							          		<span>Exportar </span>
							          		<svg aria-hidden='true' focusable='false' data-prefix='fal' data-icon='file-pdf' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' class='svg-inline--fa fa-file-pdf fa-w-12 fa-3x'><path d='M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-22-171.2c-13.5-13.3-55-9.2-73.7-6.7-21.2-12.8-35.2-30.4-45.1-56.6 4.3-18 12-47.2 6.4-64.9-4.4-28.1-39.7-24.7-44.6-6.8-5 18.3-.3 44.4 8.4 77.8-11.9 28.4-29.7 66.9-42.1 88.6-20.8 10.7-54.1 29.3-58.8 52.4-3.5 16.8 22.9 39.4 53.1 6.4 9.1-9.9 19.3-24.8 31.3-45.5 26.7-8.8 56.1-19.8 82-24 21.9 12 47.6 19.9 64.6 19.9 27.7.1 28.9-30.2 18.5-40.6zm-229.2 89c5.9-15.9 28.6-34.4 35.5-40.8-22.1 35.3-35.5 41.5-35.5 40.8zM180 175.5c8.7 0 7.8 37.5 2.1 47.6-5.2-16.3-5-47.6-2.1-47.6zm-28.4 159.3c11.3-19.8 21-43.2 28.8-63.7 9.7 17.7 22.1 31.7 35.1 41.5-24.3 4.7-45.4 15.1-63.9 22.2zm153.4-5.9s-5.8 7-43.5-9.1c41-3 47.7 6.4 43.5 9.1z' class=''></path></svg>
							          	</a>
							          </td>
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