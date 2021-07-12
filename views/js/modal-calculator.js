$(function(){
	list_measurement_units();
	list_mass_units();
	list_Calculation_data()
});
/************************** SHOW/HIDDEN MODAL CALCULATOR **************************/
$(document).on("click", "#Add-fromcalculatorModal", function(){
	$("#cnt-modalFormCalculator").addClass("show");
	$(".cnt-modalFormCalculator--c").addClass("show");
});
/************************** CLOSE MODAL FORM FOR THE CALCULATOR **************************/
$(document).on("click", "#btn-closeiconFormCalculator", function(){
	$("#cnt-modalFormCalculator").removeClass("show");
});
/************************** CARGAR - UNIDADES DE MEDIDA **************************/
function list_measurement_units(){
	$.ajax({
    url: "controllers/list_measurement_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);

    if(response.length == 0){
      template = `
        <option value="">No se encontraron resultados</option>
      `;
      $("#val-Lengthselitem").html(template);
      setTimeout(function(){
        $("#val-Lengthselitem").removeClass("show");
      }, 1000);
    }else{

      $("#val-Lengthselitem").append(`
      	<option value="0">Elige una opción</option>
      `);
      response.forEach(e => {
	      $("#val-Lengthselitem").append(`
	        <option value="${e.id}" prefixunit="${e.prefix}">${e.unit}</option>
	      `);
      });
    }
  });
}
/************************** VALIDAR SI SE SELECCIONÓ UN DATO VÁLIDO - UNIDAD DE LONGITUD **************************/
$("#val-Lengthselitem").on("change", function(){
	if($("#val-Lengthselitem").val() != 0){
		$("#msgNounLengthvalue").css({"display":"none"});
		$("#msgNounLengthvalue").text("");
	}else{
		$("#msgNounLengthvalue").css({"display":"block"});
		$("#msgNounLengthvalue").text("Campo requerido");
		$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong").find("span").text("");
	}

	/************************** FIJAR EL PREFIJO PARA LAS UNIDADES DE MEDIDA **************************/
	var prefixunit = $("#val-Lengthselitem option:selected").attr("prefixunit");
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong").find("span").text(prefixunit);
});
/************************** CARGAR - UNIDADES DE MEDIDA **************************/
function list_mass_units(){
	$.ajax({
    url: "controllers/list_mass_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    if(response.length == 0){
      template = `
        <option value="">No se encontraron resultados</option>
      `;
      $("#val-UnitWeightselitem").html(template);
      setTimeout(function(){
        $("#val-UnitWeightselitem").removeClass("show");
      }, 1000);
    }else{

      $("#val-UnitWeightselitem").append(`
      	<option value="0">Elige una opción</option>
      `);
      response.forEach(e => {
	      $("#val-UnitWeightselitem").append(`
	        <option value="${e.id}" prefixunitWeight="${e.prefix}">${e.unit}</option>
	      `);
      });
    }
  });
}
/************************** VALIDAR SI SE SELECCIONÓ UN DATO VÁLIDO - UNIDAD DE PESO **************************/
$("#val-UnitWeightselitem").on("change", function(){
	if($(this).val() != 0){
		$("#msgNounUnitWeightvalue").css({"display":"none"});
		$("#msgNounUnitWeightvalue").text("");
	}else{
		$("#msgNounUnitWeightvalue").css({"display":"block"});
		$("#msgNounUnitWeightvalue").text("Campo requerido");
		$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").text("");
	}
	/************************** FIJAR EL PREFIJO PARA LAS UNIDADES DE PESO **************************/
	var prefixunitWeight = $("#val-UnitWeightselitem option:selected").attr("prefixunitWeight");
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").text(prefixunitWeight);
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").attr("id-UnitWeight", $("#val-UnitWeightselitem option:selected").val());
});
/************************** VALIDAR SI CONTIENE UN VALOR - NRO DE BULTOS **************************/
$(document).on("keyup", "#val-NroPackagestselitem", function(){	($(this).val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - LARGO **************************/
$(document).on("keyup", "#val-Longinputitem", function(){	($(this).val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ANCHO **************************/
$(document).on("keyup", "#val-Widthinputitem", function(){	($(this).val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ALTO **************************/
$(document).on("keyup", "#val-Heightinputitem", function(){	($(this).val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - PESO **************************/
$(document).on("keyup", "#val-Weightinputitem", function(){	($(this).val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");});

/************************** CREAR OBJETO PARA ALMACENAR LOS CÁLCULOS EN LA TABLA DEL MODAL **************************/
var calculateDataUser = [];
var calculateTotal = [];
/************************** FUNCIÓN PARA AGREGAR DATOS AL OBJETO DE CÁLCULO **************************/
function addCalculationData(cpackages, cweight, ctotal, cprefix){
	var listobjCalcData = {
		packages: cpackages,
		weight: cweight,
		total: ctotal,
		prefix: cprefix
	};
	calculateDataUser.push(listobjCalcData);
}
/************************** CALCULAR Y AGREGAR EL VALOR DEBAJO DEL BOTÓN CALCULAR **************************/
$(document).on("click", "#btn-addCalculateFleteModal", function(e){
	e.preventDefault();
	($("#val-Lengthselitem").val() != 0) ? $("#msgNounLengthvalue").text("") : $("#msgNounLengthvalue").text("Campo requerido");
	($("#val-UnitWeightselitem").val() != 0) ? $("#msgNounUnitWeightvalue").text("") : $("#msgNounUnitWeightvalue").text("Campo requerido");
	($("#val-NroPackagestselitem").val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");
	($("#val-Longinputitem").val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");
	($("#val-Widthinputitem").val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");
	($("#val-Heightinputitem").val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");
	($("#val-Weightinputitem").val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");

	if($("#val-Lengthselitem").val() != 0 && 
		 $("#val-UnitWeightselitem").val() != 0 &&
		 $("#val-NroPackagestselitem").val() != "" &&
		 $("#val-Longinputitem").val() != "" &&
		 $("#val-Widthinputitem").val() != "" &&
		 $("#val-Heightinputitem").val() != "" &&
		 $("#val-Weightinputitem").val() != ""){

		var typeUnitLong = $("#val-Lengthselitem").val();
		var typeUnitMass = $("#val-UnitWeightselitem").val();
		var numberPackages = $("#val-NroPackagestselitem").val();
		var valueLong = $("#val-Longinputitem").val();
		var valueWidth = $("#val-Widthinputitem").val();
		var valueHeight = $("#val-Heightinputitem").val();
		var valueWeight = $("#val-Weightinputitem").val();
		var valDividirUnitLong = 0;
		var total = 0;

		if(typeUnitLong == 1){
			valDividirUnitLong = 1000000; // UN MILLÓN - CENTÍMETROS
			total = (valueLong * valueWidth * valueHeight / valDividirUnitLong) * numberPackages;
		}else if(typeUnitLong == 5){
			valDividirUnitLong = 1; // UN MILLÓN - CENTÍMETROS
			total = (valueLong * valueWidth * valueHeight / valDividirUnitLong) * numberPackages;
		}else{
			console.log('Se seleccionó Oro valor');
		}

		// var ObjDataCalculator = {
		// 	typeSend: $("#val-typecontainerflete").attr("typecontainer"),
		// 	unitLong: $("#val-Lengthselitem").val(),
		// 	unitMass: $("#val-UnitWeightselitem").val(),
		// 	nroPackages: $("#val-NroPackagestselitem").val(),
		// 	valLong: $("#val-Longinputitem").val(),
		// 	valWidth: $("#val-Widthinputitem").val(),
		// 	valHeight: $("#val-Heightinputitem").val(),
		// 	valWeight: $("#val-Weightinputitem").val(),
		// 	placeOrigin: $("#input-vallistorigin").val(),
		// 	placeDestiny: $("#input-vallistdestiny").val()
		// };

		/************************** AGREGAR Y SUMAR A LOS TOTALES **************************/
		var ObjDataAddTable = {
			nroPackagesResult: $("#val-NroPackagestselitem").val(),
			valWeightResult: $("#val-Weightinputitem").val(),
			valTotalResult: total,
			valIdPrefixResult: $("#val-Weightinputitem").siblings("div").find("span").text()
		};

		addCalculationData(ObjDataAddTable.nroPackagesResult, ObjDataAddTable.valWeightResult, ObjDataAddTable.valTotalResult, ObjDataAddTable.valIdPrefixResult);
		list_Calculation_data();

		var listBultosSum = calculateDataUser;
		var totalPackages = 0;
		var totalWeight = 0;
		var totalVolume = 0;

		for (var i = 0; i < listBultosSum.length; i++) {
			totalPackages += parseFloat(listBultosSum[i].packages);
			totalWeight += parseFloat(listBultosSum[i].weight);
			totalVolume += parseFloat(listBultosSum[i].total);
			Add_Calculation_Total(totalPackages, totalWeight, totalVolume);
			list_Calculation_Total();
		}

		/************************** LIMPIAR LOS CONTROLES **************************/
		$("#f-formCalcModalSendInfo")[0].reset();

	}else{
		console.log('Información incompleta');
	}
});
/************************** REUNIR TODOS LOS TOTALES **************************/
function Add_Calculation_Total(totalPacks, totalWeight, totalVolume){
	listObjCalcTotal = {
		packagesTotal: totalPacks,
		weightTotal: totalWeight,
		volumeTotal: totalVolume
	};
	calculateTotal.push(listObjCalcTotal);
}
/************************** SUMAR TODOS LOS TOTALES Y MOSTRARLOS **************************/
function list_Calculation_Total(){
	listCalcTotal	= calculateTotal;
	for (var i = 0; i < listCalcTotal.length; i++) {
		$("#b-valTotalPackages").val(listCalcTotal[i].packagesTotal++);
		$("#b-valTotalWeight").val(listCalcTotal[i].weightTotal++);
		$("#b-valTotalVolume").val(listCalcTotal[i].volumeTotal++);
	}
}
/************************** LISTAR TODOS LOS CALCULOS PREVIOS **************************/
function list_Calculation_data(){
	
	var listCalc = calculateDataUser;
	$("#table-ListCalculation-data").html("");
	if(listCalc.length == 0){
		$("#table-ListCalculation-data").append(`
      <tr>
      	<td colspan="5" class="td-anyresults_table">
        	<div class="td-anyresults_table--c">
        		<span>No se encontraron resultados</span>
        	</div>
      	</td>
      </tr>
		`);
	}else{
		for (var i = 0; i < listCalc.length; i++) {
			var contador = i + 1;

			var valvolumen = listCalc[i].total;
	  	var valdecimalTwo  = listCalc[i].total - Math.trunc(listCalc[i].total);
	  	var valdecimalvalidation = valdecimalTwo.toFixed(2);
	  	var valvolumenfinal = 0;
	  	if(valdecimalvalidation == 0.00){
	  		valvolumenfinal = parseFloat(listCalc[i].total).toFixed(0);
	  	}else{
				valvolumenfinal = parseFloat(listCalc[i].total).toFixed(2);
	  	}

			$("#table-ListCalculation-data").append(`
				<tr id="tritem-${contador}">
					<td>
						<a href="#" class="del-calculation-item">
							<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px"><path d="M32,63.68a30.09,30.09,0,0,1-12.06-2.5,30.91,30.91,0,0,1-9.83-6.8A31.68,31.68,0,0,1,3.49,44.31a32.52,32.52,0,0,1,0-24.62A31.68,31.68,0,0,1,10.11,9.62a30.91,30.91,0,0,1,9.83-6.8,30.34,30.34,0,0,1,24.12,0,30.91,30.91,0,0,1,9.83,6.8,31.68,31.68,0,0,1,6.62,10.07,32.52,32.52,0,0,1,0,24.62,31.68,31.68,0,0,1-6.62,10.07,30.91,30.91,0,0,1-9.83,6.8A30.09,30.09,0,0,1,32,63.68ZM32,4.52C17.26,4.52,5.27,16.85,5.27,32S17.26,59.48,32,59.48,58.73,47.15,58.73,32,46.74,4.52,32,4.52Z"/><path d="M35.71,32.06,47,20.73A2.63,2.63,0,1,0,43.32,17L32,28.35,20.68,17A2.63,2.63,0,0,0,17,20.73L28.29,32.06,17,43.38a2.63,2.63,0,0,0,3.72,3.72L32,35.77,43.32,47.1A2.63,2.63,0,0,0,47,43.38Z"/></svg>
						</a>
					</td>
					<td>${contador}</td>
					<td>${listCalc[i].packages}</td>
					<td><span>${listCalc[i].weight}</span> <span>${listCalc[i].prefix}</span></td>
					<td><span>${valvolumenfinal}</span> <span>M³</span></td>
				</tr>
			`);
		}
	}
}
/************************** ELIMINAR UN CÁLCULO **************************/
$(document).on("click", ".del-calculation-item", function(e){
	e.preventDefault();

 	var delListCalc = calculateDataUser;
 	var delListCalcTotal = calculateTotal;
	var thisid = $(this).parent().parent();

	$.each(thisid, function(i, v){
		/************************** ELIMINAR VALORES DEL TOTAL *************************/
		var restPackages = $(this).find("td").eq(2).text();
		var restWeight = $(this).find("td").eq(3).find("span:first-child").text();
		var restVolume = $(this).find("td").eq(4).find("span:first-child").text();

		/************************** OBTENER EL VALOR DE LOS CONTROLES *************************/
		var valTotalResultPackages = $("#b-valTotalPackages").val();
		var valTotalResultWeight = $("#b-valTotalWeight").val();
		var valTotalResultVolume = $("#b-valTotalVolume").val();

		/************************** RESTAR A LOS TOTALES *************************/
		valTotalResultPackages = valTotalResultPackages - parseFloat(restPackages);
		valTotalResultWeight = valTotalResultWeight - parseFloat(restWeight);
		valTotalResultVolume = valTotalResultVolume - parseFloat(restVolume);

		/************************** VALIDACIÓN DE DECIMALES ANTES DE FIJAR EL VALOR **************************/
  	var valdecimalTwoFinal  = valTotalResultVolume - Math.trunc(valTotalResultVolume);
  	var valdecimalvalidationFinal = valdecimalTwoFinal.toFixed(2);
  	var valTotalvolumenfinal = 0;
  	if(valdecimalvalidationFinal == 0.00){
  		valTotalvolumenfinal = parseFloat(valTotalResultVolume).toFixed(0);
  	}else{
			valTotalvolumenfinal = parseFloat(valTotalResultVolume).toFixed(2);
  	}

		$("#b-valTotalPackages").val(valTotalResultPackages);
		$("#b-valTotalWeight").val(valTotalResultWeight);
		$("#b-valTotalVolume").val(valTotalvolumenfinal);
		
		/************************** ELIMINAR FILA **************************/
		$(this).remove();
		delListCalc.splice($(this), 1);
	});

	if(delListCalc.length == 0){
		list_Calculation_data();
	}else{
		list_Calculation_data();
	}
});
/************************** CERRAR EL MODAL SIN GUARDAR LOS CAMBIOS **************************/
$(document).on("click", "#btn-CancelCalcValueToCalculator", function(e){
	e.preventDefault();
	$("#cnt-modalFormCalculator").removeClass("show");
	$(".cnt-modalFormCalculator--c").removeClass("show");
});
/************************** AGREGAR LOS VALORES AL PRIMER MODAL **************************/
$(document).on("click", "#btn-addCalcValueToCalculator", function(e){
	e.preventDefault();

	($("#val-Lengthselitem").val() != 0) ? $("#msgNounLengthvalue").text("") : $("#msgNounLengthvalue").text("Campo requerido");
	($("#val-UnitWeightselitem").val() != 0) ? $("#msgNounUnitWeightvalue").text("") : $("#msgNounUnitWeightvalue").text("Campo requerido");
	($("#val-NroPackagestselitem").val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");
	($("#val-Longinputitem").val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");
	($("#val-Widthinputitem").val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");
	($("#val-Heightinputitem").val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");
	($("#val-Weightinputitem").val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");

	if($("#b-valTotalPackages").val() != "" &&
		 $("#b-valTotalWeight").val() != "" &&
		 $("#b-valTotalVolume").val() != ""){

		/************************** OCULTAR Y LIMPIAR EL MODAL **************************/
		$("#cnt-modalFormCalculator").removeClass("show");
		$(".cnt-modalFormCalculator--c").removeClass("show");
		$("#detail-CalcToModalAssoc").addClass("show");
		$("#msgNounLengthvalue").text("");
		$("#msgNounUnitWeightvalue").text("");
		$("#msgNounNroPackagesvalue").text("");
		$("#msgNounLongvalue").text("");
		$("#msgNounWidthvalue").text("");
		$("#msgNounHeightvalue").text("");
		$("#msgNounWeightvalue").text("");

		/************************** OBTENER LOS VALORES DE LOS TOTALES **************************/
		var valCalculadoPackages = $("#b-valTotalPackages").val();
		var valCalculadoWeight = $("#b-valTotalWeight").val();
		var valCalculadoVolume = $("#b-valTotalVolume").val();
		/************************** DEVOLVER LOS VALORES AL PRIMER MODAL **************************/
		$("#val-CalcPacksRequestModal").val(valCalculadoPackages);
		$("#val-CalcWeightRequestModal").val(valCalculadoWeight);
		$("#val-CalcVolumeRequestModal").val(valCalculadoVolume);
		/************************** FIJAR LOS VALORES EN EL SMALL **************************/
		$("#small-valPCalcReqModal").text(valCalculadoPackages);
		$("#small-valWCalcReqModal").text(valCalculadoWeight);
		$("#small-valVCalcReqModal").text(valCalculadoVolume);
	}else{
		console.log('No hay registros a fijar');
	}
});