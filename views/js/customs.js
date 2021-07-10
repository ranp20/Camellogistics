/************************** MOSTRAR EL LISTADO DE TIPOS DE CONTENEDORES **************************/
$(document).on("click", "#val-typecontainerflete", function(){
	$("#cont-containOptsContainers").toggleClass("show");
});
/************************** MOSTRAR EL LISTADO DE - CONTENEDOR (LCL) **************************/
$(document).on("click", "#cont-CompartidoLCL_item", function(){
	var tipocontainer = $(this).find("div").find("p").find("span").text();
	$("#val-typecontainerflete").text(tipocontainer.toLowerCase());
	$("#val-typecontainerflete").attr("typecontainer", tipocontainer.toLowerCase());

	$("#cont-containOptsContainers").addClass("activeItem");
	$("#cont-fillDatabyContain").addClass("show");
	$("#cont-fillDatabyContain").html(`
		<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
			<label for="">BULTOS</label>
			<input type="number" value="1" placeholder="Ingrese nro. de bultos">
		</div>
		<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
			<label for="">PESO</label>
			<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl--twocontrols">
				<input type="number" value="1" placeholder="Ingrese peso">
				<select name="" id="valinput-peso">
					<option value="1">Kilogramos</option>
					<option value="2">Libras</option>
					<option value="3">Toneladas</option>
				</select>
			</div>
		</div>
		<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl">
			<label for="">VOLUMEN</label>
			<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cControl--twocontrols">
				<input type="number" value="1" placeholder="Ingrese volumen">
				<select name="" id="valinput-volumen">
					<option value="1">Metros cúbicos</option>
					<option value="2">Pies cúbicos</option>
				</select>
			</div>
		</div>
		<a href="#" class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--linkModalDatas">AYUDA - CALCULA VOLUMEN (m3) AQUÍ</a>
		<div class="c-CalculatorStep--form--contStep--cStepSelects--item--selContaineropts--filldatacontainer--cbtnsActs">
			<a href="#">VOLVER</a>
			<button type="button">GUARDAR</button>
		</div>
	`);
});
/************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN **************************/
$(document).on("keyup", "#input-vallistorigin", function(){	$("#list-originCountriesandPort").addClass("show");});
$(document).on("blur", "#input-vallistorigin", function(){ $("#list-originCountriesandPort").removeClass("show");});
/************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - DESTINO **************************/
$(document).on("keyup", "#input-vallistdestiny", function(){	$("#list-destinyCountriesandPort").addClass("show");});
$(document).on("blur", "#input-vallistdestiny", function(){ $("#list-destinyCountriesandPort").removeClass("show");});