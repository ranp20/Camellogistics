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
	<title>Admin - Productos</title>
	<!-- INCLUIR SWEETALERTS2 -->
	<link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.min.css">
	<script type="text/javascript" src="../node_modules/sweetalert2/dist/sweetalert2.all.min.js"></script>
	<!-- INCLUIR DATATABLES -->
	<link rel="stylesheet" type="text/css" href="<?= $urlCli; ?>views/js/plugins/DataTables/datatables.min.css">
	<script type="text/javascript" charset="utf8" src="<?= $urlCli; ?>views/js/plugins/DataTables/datatables.min.js"></script>
</head>
<body>
	<div id="dash-contT">
		<?php require_once 'includes/adm-sidebar-left.php'; ?>
		<main id="main-dashCamel">
			<?php require_once 'includes/adm-header-top.php'; ?>
			<div class="cont-dashCamel">
				<div class="box-window-border">
					<div class="cont-dashCamel__addtitle">
						<h2 class="cont-dashCamel__addtitle--title">PRODUCTOS</h2>
						<button type="button" href="#" id="add-regulator" class="cont-dashCamel__addtitle--btn-add" data-toggle="modal" data-target="#addproductModal"><span class="cont-dashCamel__addtitle--btn-add__hidden">Agregar&nbsp;</span>+</button>
					</div>
					<div class="contain-table-responsive">
						<table id="tbl_products" class="cont-dashCamel__list-results" cellpadding="0" width="100%">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nombre</th>
									<th>Regula</th>
									<th>Reguladores</th>
									<th>M. Adicional</th>
									<th>Ad-valoren</th>
									<th>Impuesto Selecctivo</th>
									<th>ANTIDUMPING</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
									
							</tbody>
						</table>
					</div>
					<!-- MODAL - AGREGAR NUEVO ITEM -->
					<div class="modal fade bootstrapmodal-custom" id="addproductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog" role="document">
					    <div class="modal-content">
					      <div class="modal-header">
					        <h5 class="modal-title" id="exampleModalLabel">AGREGAR PRODUCTO</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body">
					      	<div class="cont-modalbootstrap">
						        <form id="form-add-product" method="POST" class="cont-modalbootstrap__form" autocomplete="false">
						        	<div class="cont-modalbootstrap__form--control">
						        		<label for="nameProduct" class="cont-modalbootstrap__form--control__label">Nombre del Producto</label>
						        		<input id="nameProduct" class="cont-modalbootstrap__form--control__input" name="nameProduct" type="text" maxlength="300" placeholder="Ingrese el nombre del producto">
						        		<span id="msgErrNounNameProduct"></span>
						        	</div>
						        	<div class="cont-modalbootstrap__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrap__form__cControlSwitch__label">Reguladores</span>
						        		<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_regulated" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_regulated" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__label" id="txt-chck_regulated">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsRegulatorsMore"></div>
						        	<div class="cont-modalbootstrap__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrap__form__cControlSwitch__label">Monto adicional</span>
						        		<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_ammadditional" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_ammadditional" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__label" id="txt-chck_ammadditional">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsAmountAdditionalMore"></div>
						        	<div class="cont-modalbootstrap__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrap__form__cControlSwitch__label">Impuesto adicional</span>
						        		<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_taxadditional" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_taxadditional" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__label" id="txt-chck_taxadditional">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsTaxationAdditionalsMore"></div>
								      <div class="cont-modalbootstrap__footer">
								        <button type="button" class="cont-modalbootstrap__footer--btncancel" data-dismiss="modal">CANCELAR</button>
								        <button type="submit" class="cont-modalbootstrap__footer--btnadd" id="btnadd-product">GUARDAR</button>
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
					        <h5 class="modal-title" id="update-modal-label">ACTUALIZAR PRODUCTO</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body cont-total-update-items">
					      	<div class="cont-modalbootstrapupdate">
						        <form id="form-update-product" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false">
						        	<span>
						        		<span>
						        			<span>
									        	<input type="text" id="idupdate-product">
									        	<input type="text" id="required_regsoptupdate">
									        	<input type="text" id="required_ammadditionalupdate">
									        	<input type="text" id="required_taxadditionalupdate">
						        			</span>
						        		</span>
						        	</span>
						        	<div class="cont-modalbootstrapupdate__form--control">
						        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del producto</label>
						        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="300" placeholder="Ingrese el nombre del producto">
						        		<span id="msgErrNounNameProductUpdate"></span>
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form--controlRadios">
						        		<p class="cont-modalbootstrapupdate__form--controlRadios--title">Reguladores</p>
						        		<div class="cont-modalbootstrapupdate__form--controlRadios--c">
							        		<label for="required-regupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="required-regupdate" name="sel-reornotregupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakespan"></span>
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">SI</span>
							        		</label>
							        		<label for="noun-required-regupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="noun-required-regupdate" name="sel-reornotregupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakespan"></span>
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">NO</span>
							        		</label>
						        		</div>
						        		<span id="msgErrNounWithOrNotRegulator"></span>
						        	</div>
						        	<div id="sel-optsRegulatorsMoreUpdate">
						       	    <div class="cont-modalbootstrapupdate__form--controlSelect">
									        <label for="" class="cont-modalbootstrapupdate__form--controlSelect--label">Regulador 1</label>
									        <div class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect" id="btn-FakeListRegulatorOneUpdate">
									          <span class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSelRegOneUpdate">Selecciona un regulador</span>
									          <input type="text" readonly id="SelectedItem-inputfakeselRegOneUpdate">
									          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
									          <path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
									          </svg>
									        </div>
									        <ul class="cont-modalbootstrapupdate__form--controlSelect--m" id="c-listitems-regulatorOneUpdate"></ul>
									        <span id="msgErrNounReguladorOneUpdate"></span>
									      </div>
									      <div class="cont-modalbootstrapupdate__form--controlSelect">
									        <label for="" class="cont-modalbootstrapupdate__form--controlSelect--label">Regulador 2</label>
									        <div class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect" id="btn-FakeListRegulatorTwoUpdate">
									          <span class="cont-modalbootstrapupdate__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSelRegTwoUpdate">Selecciona un regulador</span>
									          <input type="text" readonly id="SelectedItem-inputfakeselRegTwoUpdate">
									          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
									          <path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
									          </svg>
									        </div>
									        <ul class="cont-modalbootstrapupdate__form--controlSelect--m" id="c-listitems-regulatorTwoUpdate"></ul>
									        <span id="msgErrNounReguladorTwoUpdate"></span>
									      </div>
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form--controlRadios">
						        		<p class="cont-modalbootstrapupdate__form--controlRadios--title">Monto adicional del Producto</p>
						        		<div class="cont-modalbootstrapupdate__form--controlRadios--c">
							        		<label for="required-amountadditionalupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="required-amountadditionalupdate" name="sel-addornotaddupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">SI</span>
							        		</label>
							        		<label for="noun-required-amountadditionalupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="noun-required-amountadditionalupdate" name="sel-addornotaddupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">NO</span>
							        		</label>
						        		</div>
						        		<span id="msgErrNounWithOrNotAmountAdditional"></span>
						        	</div>
						        	<div id="sel-optsAmountAdditionalMoreUpdate"></div>
						        	<div class="cont-modalbootstrapupdate__form--controlRadios">
						        		<p class="cont-modalbootstrapupdate__form--controlRadios--title">Impuesto adicional del Producto</p>
						        		<div class="cont-modalbootstrapupdate__form--controlRadios--c">
							        		<label for="required-taxadditionalupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="required-taxadditionalupdate" name="sel-taxornottax" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">SI</span>
							        		</label>
							        		<label for="noun-required-taxadditionalupdate" class="cont-modalbootstrapupdate__form--controlRadios--c--control">
							        			<input type="radio" id="noun-required-taxadditionalupdate" name="sel-taxornottax" class="cont-modalbootstrapupdate__form--controlRadios--c--control--input">
							        			<span class="cont-modalbootstrapupdate__form--controlRadios--c--control--fakelabel">NO</span>
							        		</label>
						        		</div>
						        		<span id="msgErrNounWithOrNotAmountAdditional"></span>
						        	</div>
						        	<div id="sel-optsTaxationAdditionalsMoreUpdate"></div>
								      <div class="cont-modalbootstrapupdate__footer">
								        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
								        <button type="submit" class="cont-modalbootstrapupdate__footer--btnupdate" id="btnupdate-product">GUARDAR</button>
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
					        <h5 class="modal-title" id="delete-modal-label">ELIMINAR PRODUCTO</h5>
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div class="modal-body cont-total-update-items">
						      <h2 class="text-message-modalAlt">¿Seguro que desea eliminar este registro?</h2>
					      	<div class="cont-modalbootstrapupdate">
						        <form id="form-delete-product" method="POST" class="cont-modalbootstrapupdate__form" autocomplete="false">
						        	<input type="hidden" id="iddelete-product">
								      <div class="cont-modalbootstrapupdate__footer">
								        <button type="button" class="cont-modalbootstrapupdate__footer--btncancel" data-dismiss="modal">CANCELAR</button>
								        <button type="submit" class="cont-modalbootstrapupdate__footer--btndelete" id="btndelete-product">ELIMINAR</button>
								      </div>
						        </form>
					      	</div>
					      </div>
					    </div>
					  </div>
					</div>
				<!-- FIN MODALS-->	
				</div>
			</div>
		</main>
	</div>
	<script src="<?= $url ?>js/main.js"></script>
	<script src="<?= $url ?>js/actions_pages/products.js"></script>
</body>
</html>