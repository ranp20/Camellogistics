<!-- <script>

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
    </select>
	
	<div id="list_cont_completo">
		<div class="standard_containt">
		</div>	
	</div>
	
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

 -->