<script>

function mostrar(id) {
	if (id == "con_completo") {
		console.log("contenedor completo");
		$('#list_cont_completo').css({'display':'block'});
		$('#list_cont_compartido').css({'display':'none'});
		$('#contenedor_marco').css({'height':'1510px'});
	}
	if (id == "con_compartido") {
		console.log("contenedor compartido");
		$('#list_cont_compartido').css({'display':'block'});
		$('#list_cont_completo').css({'display':'none'});
	}

	
}

    
</script>
<div class="cajacalc">
    <form id="frm_cotizacion" method="POST" action="views/modules/act_maritimo.php">
	<div id="fase1">
	<h2>1. Seleccione</h2>

	<div id="flete_maritimo">
		<input type="hidden" id="text_tipo_flete" name="text_tipo_flete">
	</div>

	<div id="flete_aereo">
		<input type="hidden" id="text_flete_aereo" name="text_flete_aereo">
	</div>

	<div id="cbo_ruta">
		<h2>2. Origen  -  Destino</h2>
		<select id="puertos_orig" name="puertos_orig">
			<option value="indice">Pais, Ciudad o Puerto</option>
				<?php
					$vistapuertoOrig = new MvcController();
					$vistapuertoOrig -> vistaPuertosOrigController();
				?>
		</select>                
		<select id="puertos_dest" name="puertos_dest">
			<option value="">Pais, Ciudad o Puerto</option>
		</select>
	</div>
	<div id="t_envio">
		<h2>3. Tipo de envio</h2>
		<select id="tip_contenedor" name="tip_contenedor"  onChange="mostrar(this.value);">
			<option value="">Elija una Opcion</option>
			<option value="con_completo">Contenedor Completo (FCL)</option>
			<!--<option value="con_compartido">Contenedor Compartido (LCL)</option>-->
		</select>
		
		<div id="list_cont_completo">
			<div class="rell_spi">
			</div>
			
			<div class="standard_containt1">
				<div id="detail_cont_selc1"></div>
				<div id="detail_cont_selc2"></div>
				<div id="detail_cont_selc3"></div>
				<div id="detail_cont_selc4"></div>
			</div> 
			<div class="standard_containt2">
				<h5><div id="detail_cont_selc1t"></div></h5>
				<input type="hidden" id="tot_pre_cont" name="tot_pre_cont" value="">
			</div>
		</div>
	</div>


	
    <div align="center">
		<div id="estimar" class="button">Estimar</div>
		<center><input type="submit" id="next_maritimo" rel_user_it='' name="next_maritimo" class="button" value="Siguiente"></center>
	</div>

	</div>

	<div id="fase2">
		
		<h2>Detalles</h2>

		<div id="marc_det_flete">
			
		</div>

		<h2>Elije una opcion</h2>
		<div id="marc_opc_serv">
			<div id="opc_si_servicio">
				OPCION 1<br>
				AGREGAR SERVICIOS
			</div>
			<div id="opc_no_servicio">
				OPCION 2<br>
				NO AGREGAR SERVICIOS
			</div>
		</div>	

		<div id="marc_serv_flete">
			<div class="mc_check">
				<input type="checkbox" id="gast_portuario_aduana">
			</div>
			<div class="mc_des_check">
				Gastos portuarios y de Almacenamiento Aduanero  
			</div>
			<div class="mc_check">
				<input type="checkbox" id="perm_aduana">
			</div>
			<div class="mc_des_check">
				Cálculo de impuestos y permisos de aduana 
			</div>
			
			<div class="mc_check"></div>
			<div class="mc_des_check">
				<div id="marc_permisos_aduana">
					<div class="item_per_tit">
						Tu Producto NO APARECE elegir CARGA GENERAL.
					</div>
					<div class="item_per">
						<select id="">
							<option value="1">ADITIVOS ALIMENTICIOS</option>  
							<option value="2">AGRICULTURA (FRUTAS Y VEGETALES)</option>
						</select>
					</div>
					<div class="item_per_tit">
					Ingresar valor exacto, SIN DECIMALES
					</div>
					<div class="item_per">
					<input type="number" name="" id="">
					</div>
					<div class="item_per_tit">
					¿Ha realizado importaciones previamente ?
					</div>
					<div class="item_per">
						<select id="">
							<option value="NO">NO</option>
							<option value="SI">SI</option>
						</select>
					</div>
				</div>
			</div>

			
			
			<div class="mc_check">
				<input type="checkbox" id="gast_trans_dom">
			</div>
			<div class="mc_des_check">
				Transporte a domicilio 
			</div>


			<div class="mc_check"></div>
			<div class="mc_des_check">
				<div id="marc_trans_domicilio">
					<div class="item_per">
						<select id="">
							<option value="1">Seleccione Origen</option>  
							<option value="1">Lima</option>  
						</select>
					</div>
					<div class="item_per">
						<select id="">
							<option value="1">Seleccione Destino</option>
							<option value="2">Barranco</option>
							<option value="3">Ate Vitarte</option>
						</select>
					</div>
				</div>
			</div>


			<div class="mc_check">
				<input type="checkbox" id="gast_seg_merc">
			</div>
			<div class="mc_des_check">
				Seguro de mercancia 
			</div>
		</div>


		<h2>Ingrese sus datos</h2>

		<div id="marc_datos_user">
			<div class="mc_tit">
				Ingreser su RUC 
			</div>
			<div class="mc_input">
				<input type="text" name="txtruc" id="txtruc">
			</div>
			<div class="mc_tit">
				Ingreser su numero de celular
			</div>
			<div class="mc_input">
				<input type="text" name="txtcel" id="txtcel">
			</div>
			<div class="mc_tit">
				Ingrese su correo elcetronico
			</div>
			<div class="mc_input">
				<input type="text" name="txtemail" id="txtemail">
			</div>
		</div>
		<div align="center">
			<div id="dowload_cotizacion" class="button">Descargar Cotizacion</div>
		</div>


	</div>
	<div id="fase3">
	

	
	</div>


</form>
<script>
    $(document).ready(function () {
		$("input[type='number']").inputSpinner();	
        $("#puertos_orig").on('change', function () {
			
			$("#puertos_orig option:selected").each(function () {
				var puerto_origen_id = $(this).val();
				$.post("views/modules/puertoDest.php", { puerto_origen_id: puerto_origen_id }, function(data) {
					$("#puertos_dest").html(data);
				});			
			});
		 });

		 $("#puertos_dest").on('change', function () {
		
			$("#puertos_dest option:selected").each(function () {
				var puerto_destino_id = $(this).val()
				let puerto_origen_id = $("#puertos_orig").val();
				let vigencia_desde = $("#vigencia_desde").val();
				let vigencia_hasta = $("#vigencia_hasta").val();

				$.post("views/modules/contPuert.php", {puerto_origen_id: puerto_origen_id,puerto_destino_id:puerto_destino_id }, function(data) {
					$(".rell_spi").html(data);
				});			
			});
		 });
		
	

    });
</script>

