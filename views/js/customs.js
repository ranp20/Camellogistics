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
});