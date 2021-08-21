<?php 
	
	//COMPRIMIR ARCHIVOS DE TEXTO...
  (substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
  
	session_start();
	if(!isset($_SESSION['admin_camel'])){
		header("Location: ../");
	}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<?php require_once 'includes/adm-header-index.php'; ?>
	<title>Admin - Tarifas LCL</title>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle">
						<h2 class="cont-dashCamel__addtitle--title">TARIFAS LCL</h2>
						<button type="button" href="#" id="add-spreadsheetlcl" class="cont-dashCamel__addtitle--btn-add" data-toggle="modal" data-target="#addspreadsheetlclModal">
							<span class="cont-dashCamel__addtitle--btn-add__hidden">Importar&nbsp;</span>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 55 81.25" enable-background="new 0 0 55 65" xml:space="preserve"><path d="M55,22C55,22,55,22,55,22c0-0.2-0.1-0.4-0.2-0.6c0,0,0-0.1-0.1-0.1c-0.1-0.2-0.2-0.4-0.4-0.5l-20-20  c-0.2-0.2-0.3-0.3-0.5-0.4c0,0-0.1-0.1-0.1-0.1C33.4,0.2,33.2,0.1,33,0c0,0,0,0,0,0c-0.2,0-0.3,0-0.5,0h-25C3.4,0,0,3.4,0,7.5v50  C0,61.6,3.4,65,7.5,65h40c4.1,0,7.5-3.4,7.5-7.5v-35C55,22.3,55,22.2,55,22z M46.5,20h-9c-1.4,0-2.5-1.1-2.5-2.5v-9l5.7,5.7L46.5,20  z M24,51v-7h7v7H24z M14,51v-7h7v7H14z M41,41h-7v-7h7V41z M31,41h-7v-7h7V41z M14,34h7v7h-7V34z M24,31v-8h7v8H24z M14,23h7v8h-7  V23z M34,44h7v7h-7V44z M41,31h-7v-6.9c1,0.6,2.2,0.9,3.5,0.9H41V31z M47.5,60h-40C6.1,60,5,58.9,5,57.5v-50C5,6.1,6.1,5,7.5,5H30v6  H12.5c-0.8,0-1.5,0.7-1.5,1.5v40c0,0.8,0.7,1.5,1.5,1.5h30c0.8,0,1.5-0.7,1.5-1.5V25h6v32.5C50,58.9,48.9,60,47.5,60z"/></svg>
							</span>
						</button>
					</div>
					<!--<div class="cont-dashCamel__inputsearch-table">
						<input type="text" class="cont-dashCamel__inputsearch-table--input" name="searchbannerp" id="searchbannerp" maxlength="200" placeholder="Buscar reguladores...">
					</div>-->
					<div class="contain-table-responsive">
						<table class="cont-dashCamel__list-results">
							<thead>
								<tr>
									<th class='center'>Item</th>
									<th class='center'>Utilidad</th>
									<th class='center'>Vigencia desde</th>
									<th class='center'>Vigencia Hasta</th>
									<th></th>
								</tr>
							</thead>
							<tbody id="tbl_utilities_rate_lcl">
									
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
					<div class="modal fade bootstrapmodal-custom" id="addspreadsheetlclModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">IMPORTAR EXCEL</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body">
					      	<div class="cont-modalbootstrap">
						        <form id="form-add-spreadsheetlcl" method="POST" class="cont-modalbootstrap__form" autocomplete="false" enctype="multipart/form-data">
							        <div class="cont-modalbootstrap__form--control">
						        		<label for="spreadsheetlcl">Hoja de cálculo</label>
						        		<input id="spreadsheetlcl" name="spreadsheetlcl" class="cont-modalbootstrap__form--control__input-photo spreadsheetlcl" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" required/>
						        	</div>
						        	<div class="cont-modalbootstrap__form--control">
						        		<label for="utilitylcl" class="cont-modalbootstrap__form--control__label">Utilidad</label>
						        		<input id="utilitylcl" class="cont-modalbootstrap__form--control__input" name="utilitylcl" type="number" maxlength="200" required placeholder="Ingrese un valor de utilidad">
						        	</div>
						        	<div class="cont-group-form-controls">
							        	<div class="cont-modalbootstrap__form--control cont-group-form-controls__control">
							        		<label for="validdesdelcl" class="cont-modalbootstrap__form--control__label">Válido Desde</label>
							        		<input id="validdesdelcl" class="cont-modalbootstrap__form--control__input" name="validdesdelcl" type="date" required placeholder="Selecciona una fecha">
							        	</div>
							        	<div class="cont-modalbootstrap__form--control cont-group-form-controls__control">
							        		<label for="validhastalcl" class="cont-modalbootstrap__form--control__label">Válido Hasta</label>
							        		<input id="validhastalcl" class="cont-modalbootstrap__form--control__input" name="validhastalcl" type="date" required placeholder="Selecciona una fecha">
							        	</div>
						        	</div>
								      <div class="cont-modalbootstrap__footer">
								        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
								        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-spreadsheetlcl">
								        	<span>GUARDAR</span>
								        	<span class="cont-modalbootstrap__footer--btnadd--cpreloader">
								        		<span></span>
								        	</span>
								        </button>
								      </div>
						        </form>
					      	</div>
					      </div>
					    </div>
					  </div>
					</div>
					<!-- MODAL - EDITAR ITEM -->
					<!--<div class="modal fade bootstrapmodalupdate-custom" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
					</div>-->
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
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/rate_lcl.js"></script>
</body>
</html>