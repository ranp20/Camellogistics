<script>

function mostrar(id) {
	if (id == "con_completo") {
		console.log("contenedor completo");
		$('#list_cont_completo').css({'display':'block'});
		$('#list_cont_compartido').css({'display':'none'});
	}
	if (id == "con_compartido") {
		console.log("contenedor compartido");
		$('#list_cont_compartido').css({'display':'block'});
		$('#list_cont_completo').css({'display':'none'});
	}

	$("input[name=txtnum_20_std]").change(function(){
		console.log($('input[name=txtnum_20_std]').val());
		if($("input[name=txtnum_20_std]").val()==0){
			$('#detail_cont_selc1').html(' ');
		}else{
			$('#detail_cont_selc1').html($('input[name=txtnum_20_std]').val()+' * '+'20 STANDARD ,' );
		}
	});

	$("input[name=txtnum_40_std]").change(function(){
		console.log($('input[name=txtnum_40_std]').val());
		if($("input[name=txtnum_40_std]").val()==0){
			$('#detail_cont_selc2').html(' ');
		}else{
			$('#detail_cont_selc2').html($('input[name=txtnum_40_std]').val()+' * '+'40 STANDARD ,' );
		}
	});

	$("input[name=txtnum_40_hc]").change(function(){
		console.log($('input[name=txtnum_40_hc]').val());
		if($("input[name=txtnum_40_hc]").val()==0){
			$('#detail_cont_selc3').html(' ');
		}else{
			$('#detail_cont_selc3').html($('input[name=txtnum_40_hc]').val()+' * '+'40 HC ,' );
		}
	});

	$("input[name=txtnum_40_norm]").change(function(){
		console.log($('input[name=txtnum_40_norm]').val());
		if($("input[name=txtnum_40_norm]").val()==0){
			$('#detail_cont_selc4').html(' ');
		}else{
			$('#detail_cont_selc4').html($('input[name=txtnum_40_norm]').val()+' * '+'40 NOR ' );
		}	
	});
}

    
</script>
<div class="cajacalc">
    <form id="frm_contactenos" >
	<h2>1. Origen  -  Destino</h2>
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
	<h2>2. Tipo de envio</h2>
    <select id="tip_contenedor" name="tip_contenedor"  onChange="mostrar(this.value);">
		<option value="">Elija una Opcion</option>
        <option value="con_completo">Contenedor Completo (FCL)</option>
        <!--<option value="con_compartido">Contenedor Compartido (LCL)</option>-->
    </select>
	
	<div id="list_cont_completo">
		<div class="standard_containt">
		<!--20' STANDARD
			<div class="num_standard">
				<input id="txtnum_20_std" type="number" name="txtnum_20_std" min=0 value="0">
			</div>-->
		</div>	

		<!--
		<div class="standard_containt">
			40' STANDARD
			<div class="num_standard">
				<input type="number" name="txtnum_40_std" min=0 value="0">
			</div>
		</div>  

		<div class="standard_containt">
			40' HC
			<div class="num_standard1">
				<input type="number" name="txtnum_40_hc" min=0 value="0">
			</div>
		</div>  
		<div class="standard_containt">
			40' NOR
			<div class="num_standard1">
				<input type="number" name="txtnum_40_norm" min=0 value="0">
			</div>
		</div>
		<div class="standard_containt1">
			<div id="detail_cont_selc1"></div>
			<div id="detail_cont_selc2"></div>
			<div id="detail_cont_selc3"></div>
			<div id="detail_cont_selc4"></div>
		</div>    
		-->
	</div>
	


	<!--<div id="list_cont_compartido">
		<div class="standard_containt">
		BULTOS
			<div class="num_standard_comp">
				<input type="number" name="txtnum_bultos" min=0 value="0">
			</div>
		</div>	

		<div class="standard_containt">
			PESO
			<div id="num_peso_containt">
				<input type="number" name="txtnum_peso" min=0 value="0">
			</div>
			<div id="num_peso_containt1">
				<select id="medidas_pesos" class="est_select">
					<option value="Kilogramos">Kilogramos</option>
					<option value="Libras">Libras</option>
					<option value="Toneladas">Toneladas</option>
				</select>
			</div>
		</div>  

		<div class="standard_containt">
			VOLUMEN
			<div id="num_peso_containt">
				<input type="number" name="txtnum_peso" min=0 value="0">
			</div>
			<div id="num_peso_containt1">
				<select id="medidas_mets" class="est_select">
					<option value="MtsCubicos">Metros Cúbicos</option>
					<option value="PiesCubicos">Pies Cúbicos</option>
				</select>
			</div>
		</div>
		
	</div>	-->
    
    <!--<select id="districts" name="districts">
        <option value="">NO HA SELECCIONADO UNA PROVINCIA</option>
    </select>-->
    
    <!--<h2>3. ¿Qué envías?</h2><div id="radios">
        <div class="cajandaud">
            <input type="radio" name="type" id="sobres" value="SOBRE" checked>
            <label for="sobres" class="material-icons">
                <p class="qoutnua">Sobres</p>
                <span><img src="views/img/20std.png" alt="box" style="width: 50px;height: 50px;"></span>
            </label>
        </div>
        <div class="cajandaud">
            <input type="radio" name="type" id="paquetes" value="PAQUETE"><label for="paquetes" class="material-icons">
                <p class="qoutnua">Paquetes</p>
                <span><img src="https://www.olva.pe/wp-content/uploads/2017/08/cajadea.png" alt="box" style="width: 50px;height: 50px;"></span>
            </label>
        </div>
    </div>
    <h2>4. ¿Cuánto Pesa?</h2>
    <input id="weight" name="weight" type="number" step="any" min="1" value="1" placeholder="Ingrese el Peso">
    <span id="gr-type" hidden>GRAMOS (GR)</span>
    <select id="unit" name="unit">
        <option value="KG">KILOGRAMOS (KG)</option>
        <option value="GR">GRAMOS (GR)</option>
    </select>
    <div id="alert"></div>
    <div id="measures">
        <div class="separnta"></div>
        <h2 class="titut">5. ¿Y cuánto mide?</h2>
        <span class="mimimi" data-tooltip="El costo de un envío puede ser afectado si la cantidad de espacio que éste ocupa es mayor que su peso real. A esto se le llama Peso Volumen. PV=(Largo * Ancho * Alto ) / 6000" data-tooltip-position="right"></span>
        <span class="mimimi2" data-tooltip="El costo de un envío puede ser afectado si la cantidad de espacio que éste ocupa es mayor que su peso real. A esto se le llama Peso Volumen. PV=(Largo * Ancho * Alto ) / 6000" data-tooltip-position="bottom"></span>
        <div class="separnta"></div>
        <div class="divmed" align="center">
            <img class="imgbox" src="https://www.olva.pe/nuevcalc/assets/images/misc/ancho.png" alt="ancho-caja">
            <input class="medan" id="width" name="width" type="number" step="0.01" min="1" value="" placeholder="Ingrese el Ancho (cm)">
        </div>
        <div class="divmed" align="center">
            <img class="imgbox" src="https://www.olva.pe/nuevcalc/assets/images/misc/largo.png" alt="largo-caja">
            <input class="medla" id="large" name="large" type="number" step="0.01" min="1" value="" placeholder="Ingrese el Largo (cm)">
        </div>
        <div class="divmed" align="center">
            <img class="imgbox" src="https://www.olva.pe/nuevcalc/assets/images/misc/alto.png" alt="alto-caja">
            <input class="medal" id="height" name="height" type="number" step="0.01" min="1" value="" placeholder="Ingrese el Alto (cm)">
        </div>
        <div id="alert2"></div>
    </div>
    <div class="separnta"></div>
    <div class="col-md-6">
        <span id="price-label" class="font-size-20 grey-800">5. PRECIO ESTIMADO: </span>  <span id="result" class="font-weight-600 grey-800 font-size-30">S/.0.00</span>
    </div>-->
    <div align="center"><button id="doAction" class="button"  onClick="ga('send', 'event', 'Micro-CalculaEnvio-Estimar', 'click', 'Calculadora-Estimar', true);" disabled>Estimar</button></div>

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
				var puerto_origen_id = $(this).val();
				$.post("views/modules/contPuert.php", { puerto_origen_id: puerto_origen_id }, function(data) {
					$(".standard_containt").html(data);
				});			
			});
		 });
		
    });
</script>

