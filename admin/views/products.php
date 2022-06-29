<?php
//COMPRIMIR ARCHIVOS DE TEXTO...
(substr_count($_SERVER["HTTP_ACCEPT_ENCODING"], "gzip")) ? ob_start("ob_gzhandler") : ob_start();
session_start();
if(!isset($_SESSION['admin_camel'])){
	header("Location: ../admin");
}
require_once '../controllers/config.php';
$settings = new List_Settings();
$adm_config = $settings->list();
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
							<tbody></tbody>
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
						        	<div class="cont-modalbootstrap__form__cControlSwitch mgt-05rem">
						        		<span for="" class="cont-modalbootstrap__form__cControlSwitch__label">FICHA TÉCNICA Y CERTIFICADO DE CONFORMIDAD</span>
						        		<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_fichatecycertconform" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__input" data-fichatecycertconform="<?php
										          if(isset($adm_config('quotation_ammountcerticonformvalidation')['setting_value'])){
											          $ammountcifvalidation = $adm_config('quotation_ammountcerticonformvalidation')['setting_value'];
											          if($ammountcifvalidation != ""){
											          	echo number_format($adm_config('quotation_ammountcerticonformvalidation')['setting_value'],2);
											          }else{
											          	echo "";
											          }
									          	}else{
									          		echo "";
									          	}
										        	?>" data-fichatecycertconformsend="" name="activation" value="NO">
						        					<label for="chck_fichatecycertconform" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrap__form__cControlSwitch__cSwitch__label" id="txt-chck_fichatecycertconform">NO</label>
						        		</div>
						        	</div>
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
									        	<input type="hidden" id="idupdate-product">
									        	<input type="hidden" id="required_regsoptupdate">
									        	<input type="hidden" id="required_ammadditionalupdate">
									        	<input type="hidden" id="required_taxadditionalupdate">
									        	<input type="hidden" id="required_sel_fichatecycertconform">
									        	<input type="hidden" id="required_idregulatorupdate">
									        	<input type="hidden" id="required_regulatorupdate">
									        	<input type="hidden" id="required_idregulator_twoupdate">
									        	<input type="hidden" id="required_regulator_twoupdate">
									        	<input type="hidden" id="required_ammountadditinalupdate">
									        	<input type="hidden" id="required_advalorenupdate">
									        	<input type="hidden" id="required_impuestoselectivoupdate">
									        	<input type="hidden" id="required_antidumpingupdate">
									        	<input type="hidden" id="required_fichatecycertconform">
						        			</span>
						        		</span>
						        	</span>
						        	<div class="cont-modalbootstrapupdate__form--control">
						        		<label for="name-update" class="cont-modalbootstrapupdate__form--control__label complete">Nombre del producto</label>
						        		<input id="name-update" class="cont-modalbootstrapupdate__form--control__input" name="name-update" type="text" maxlength="300" placeholder="Ingrese el nombre del producto">
						        		<span id="msgErrNounNameProductUpdate"></span>
						        	</div>
						        	<div class="cont-modalbootstrapupdate__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrapupdate__form__cControlSwitch__label">Reguladores</span>
						        		<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_regulated-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_regulated-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__label" id="txt-chck_regulated-update">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsRegulatorsMoreUpdate"></div>
						        	<div class="cont-modalbootstrapupdate__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrapupdate__form__cControlSwitch__label">Monto adicional</span>
						        		<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_ammadditional-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_ammadditional-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__label" id="txt-chck_ammadditional-update">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsAmountAdditionalMoreUpdate"></div>
						        	<div class="cont-modalbootstrapupdate__form__cControlSwitch">
						        		<span for="" class="cont-modalbootstrapupdate__form__cControlSwitch__label">Impuesto adicional</span>
						        		<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_taxadditional-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__input" name="activation" value="NO">
						        					<label for="chck_taxadditional-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__label" id="txt-chck_taxadditional-update">NO</label>
						        		</div>
						        	</div>
						        	<div id="sel-optsTaxationAdditionalsMoreUpdate"></div>
						        	<div class="cont-modalbootstrapupdate__form__cControlSwitch mgt-05rem">
						        		<span for="" class="cont-modalbootstrapupdate__form__cControlSwitch__label">FICHA TÉCNICA Y CERTIFICADO DE CONFORMIDAD</span>
						        		<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch">
						        			<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c">
						        				<div class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont">
						        					<input type="checkbox" id="chck_fichatecycertconform-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__input" data-fichatecycertconform="<?php
										          if(isset($adm_config('quotation_ammountcerticonformvalidation')['setting_value'])){
											          $ammountcifvalidation = $adm_config('quotation_ammountcerticonformvalidation')['setting_value'];
											          if($ammountcifvalidation != ""){
											          	echo number_format($adm_config('quotation_ammountcerticonformvalidation')['setting_value'],2);
											          }else{
											          	echo "";
											          }
									          	}else{
									          		echo "";
									          	}
										        	?>" data-fichatecycertconformsend="" name="activation" value="NO">
						        					<label for="chck_fichatecycertconform-update" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__c__chckCont__label"></label>
						        				</div>
						        			</div>
						        			<label for="" class="cont-modalbootstrapupdate__form__cControlSwitch__cSwitch__label" id="txt-chck_fichatecycertconform-update">NO</label>
						        		</div>
						        	</div>
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