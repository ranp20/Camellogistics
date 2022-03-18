<?php
	//COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../admin");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Seguro</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle">
						<h2 class="cont-dashCamel__addtitle--title">Configuración de Seguro</h2>
					</div>
					<div class="cont-dashCamel__cControlsList">
						<div class="cont-dashCamel__cControlsList--cC">
							<table class="cont-dashCamel__cControlsList--cC--cTable">
								<tbody id="tbl_insurancevalues"></tbody>
							</table>
						</div>
						<!--<div class="cont-dashCamel__cControlsList--cActionsBtns">
							<a href="#" class="cont-dashCamel__cControlsList--cActionsBtns--btn">AGREGAR VALOR</a>
							<a href="#" class="cont-dashCamel__cControlsList--cActionsBtns--btn">ACTUALIZAR</a>
						</div>-->
					</div>
					<!-- MODAL - EDITAR ITEM -->
					<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR VALOR</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body cont-total-update-items">
					      	<div class="cont-modalbootstrapupdate">
						        <form id="form-update-insurancevalues" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false">
						        	<input type="hidden" id="idupdate-insurancevalues">
						        	<div class="cont-modalbootstrapupdate__form--control">
						        		<label for="dataname-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del Seguro</label>
						        		<input id="dataname-update" class="cont-modalbootstrapupdate__form--control__input" name="dataname-update" type="text" maxlength="300" placeholder="Ingrese el nombre del valor">
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form--control">
						        		<label for="datavalue-update" class="cont-modalbootstrapupdate__form--control__label complete">Porcentaje del Seguro (%)</label>
						        		<input id="datavalue-update" class="cont-modalbootstrapupdate__form--control__input" name="datavalue-update" type="number" maxlength="300" placeholder="Ingrese el precio del seguro">
						        	</div>
								      <div class="cont-modalbootstrapupdate__footer">
								        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
								        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-insurancevalues">GUARDAR</button>
								      </div>
						        </form>
					      	</div>
					      </div>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/insurance-settings.js"></script>
</body>
</html>