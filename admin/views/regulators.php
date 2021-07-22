<?php 
	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../");
	}
	$admname = $_SESSION['admin_camel']['email'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Dashboard</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="cont-dashCamel__addtitle">
					<h2 class="cont-dashCamel__addtitle--title">REGULADORES</h2>
					<button type="button" href="#" id="add-regulator" class="cont-dashCamel__addtitle--btn-add" data-toggle="modal" data-target="#addregulatorModal"><span class="cont-dashCamel__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>
				</div>
				<div class="cont-dashCamel__inputsearch-table">
					<input type="text" class="cont-dashCamel__inputsearch-table--input" name="searchregulators" id="searchregulators" maxlength="100" placeholder="Buscar bancos...">
				</div>
				<div class="contain-table-responsive">
					<table class="cont-dashCamel__list-results">
						<thead>
							<tr>
								<th>ID</th>
								<th>Nombre</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody id="tbl_regulators">
								
						</tbody>
					</table>
				</div>
				<!-- MODAL - AGREGAR NUEVO ITEM -->
				<div class="modal fade bootstrapmodal-custom" id="addregulatorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">AGREGAR REGULADOR</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				      	<div class="cont-modalbootstrap">
					        <form action="" id="form-add-regulator" method="POST" class="cont-modalbootstrap__form" autocomplete="false" enctype="multipart/form-data">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="name" class="cont-modalbootstrap__form--control__label">Nombre del Regulador</label>
					        		<input id="name" class="cont-modalbootstrap__form--control__input" name="name" type="text" maxlength="80" required placeholder="Ingrese el nombre del regulador">
					        	</div>
							      <div class="cont-modalbootstrap__footer">
							        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="button" class="cont-modalbootstrap__footer--btnadd" id="btnadd-regulator" type="submit">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- MODAL - EDITAR ITEM -->
				<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR REGULADOR</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-update-regulator" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="idupdate-regulator">
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del Regulador</label>
					        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="36" placeholder="Ingrese el nombre del país">
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-regulator">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- MODAL - ELIMINAR ITEM -->
				<div class="modal fade bootstrapmodaldelete-custom" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="delete-modal-label">ELIMINAR REGULADOR</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
					      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
				      	<div class="cont-modalbootstrapupdate">
					        <form action="" id="form-delete-regulator" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false" enctype="multipart/form-data">
					        	<input type="hidden" id="iddelete-regulator">
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-regulator">ELIMINAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- FIN MODALS-->
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/regulators.js"></script>
</body>
</html>