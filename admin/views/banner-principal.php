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
	<title>Admin - Banner principal</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="cont-dashCamel__addtitle">
					<h2 class="cont-dashCamel__addtitle--title">BANNER PRINCIPAL</h2>
					<!--<button type="button" href="#" id="add-bannerp" class="cont-dashCamel__addtitle--btn-add" data-toggle="modal" data-target="#addbannerpModal"><span class="cont-dashCamel__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>-->
				</div>
				<!--<div class="cont-dashCamel__inputsearch-table">
					<input type="text" class="cont-dashCamel__inputsearch-table--input" name="searchbannerp" id="searchbannerp" maxlength="200" placeholder="Buscar reguladores...">
				</div>-->
				<div class="contain-table-responsive">
					<table class="cont-dashCamel__list-results">
						<thead>
							<tr>
								<th>ID</th>
								<th>Banner</th>
								<th></th>
								<!--<th></th>-->
							</tr>
						</thead>
						<tbody id="tbl_banner_p">
								
						</tbody>
					</table>
				</div>
				<!-- <div class="container-fluid">
			    <div class="row">
			      <div class="col-xs-12">
			        <h2 class="text-center mb-4"> Listado de Usuarios </h2>
			        <div id="loader" class="text-center"> <img src="<?= $url ?>assets/img/utilities/loader.gif"></div>
			        <div class="outer_div"></div>
			      </div>
			    </div>
			  </div> -->
				<!-- MODAL - AGREGAR NUEVO ITEM -->
				<!-- <div class="modal fade bootstrapmodal-custom" id="addregulatorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
					        <form id="form-add-regulator" method="POST" class="cont-modalbootstrap__form" autocomplete="false">
					        	<div class="cont-modalbootstrap__form--control">
					        		<label for="name" class="cont-modalbootstrap__form--control__label">Nombre del Regulador</label>
					        		<input id="name" class="cont-modalbootstrap__form--control__input" name="name" type="text" maxlength="200" required placeholder="Ingrese el nombre del regulador">
					        	</div>
							      <div class="cont-modalbootstrap__footer">
							        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-regulator">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div> -->
				<!-- MODAL - EDITAR ITEM -->
				<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR BANNER PRINCIPAL</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
				      	<div class="cont-modalbootstrapupdate">
					        <form id="form-update-banner-p" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false">
					        	<input type="hidden" id="idupdate-banner-p">
					        	<div class="cont-modalbootstrapupdate__form--control">
					        		<label for="imagen">Banner principal</label>
					        		<input id="images" class="cont-modalbootstrapupdate__form--control__input-photo images-update" name="imagen[]" type="file" accept="img/*">
					        	</div>
					        	<div class="cont-modalbootstrapupdate__form--cpreviewImage" id="c-previewImg">
					        		<img src="" alt="">
					        	</div>
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-banner-p">GUARDAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>
				<!-- MODAL - ELIMINAR ITEM -->
				<!--<div class="modal fade bootstrapmodaldelete-custom" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="delete-modal-label">ELIMINAR BANNER PRINCIPAL</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body cont-total-update-items">
					      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
				      	<div class="cont-modalbootstrapupdate">
					        <form id="form-delete-banner-principal" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false">
					        	<input type="text" id="iddelete-banner-principal">
							      <div class="cont-modalbootstrapupdate__footer">
							        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
							        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-banner-principal">ELIMINAR</button>
							      </div>
					        </form>
				      	</div>
				      </div>
				    </div>
				  </div>
				</div>-->
				<!-- FIN MODALS-->
			</div>
		</main>
	</div>
	<script type="text/javascript" src="<?= $url ?>js/main.js"></script>
	<script type="text/javascript" src="<?= $url ?>js/actions_pages/banner-principal.js"></script>
</body>
</html>