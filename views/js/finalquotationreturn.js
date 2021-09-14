/*============================================================================================================
=            CALCULAR Y MOSTRAR EL RESUMEN DE COTIZACIÓN - INTERFAZ DE PRESENTACIÓN DE COTIZACIÓN            =
============================================================================================================*/
/************************** DEJAR EN 2 DECIMALES POR DEFECTO **************************/
function myRound(num, dec){
  var exp = Math.pow(10, dec || 2); // 2 decimales por defecto
  return parseInt(num * exp, 10) / exp;
}
/************************** FUNCIÓN - LIMITAR A DOS DECIMALES SIN REDONDEO **************************/
function twodecimals(n) {
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
$(document).ready(() => {
	/************************** IR HACIA ABAJO **************************/
	$("#btn-scrollingtTtB").on("click", function(){$("body, html").animate({scrollTop: '500'}, 350);});
	/************************** LISTAR LAS FECHAS DE LA VALIDEZ DE LA TARIFA **************************/
	$("#v_validratedate").text(localStorage.getItem("key_validaterate"));

	/*=================================================================================================
	=            													1. VALORES DE COTIZACIÓN            																=
	==================================================================================================*/
	/************************** LISTAR LOS VALORES DEL FLETE REAL **************************/
	var partInteger = 0;
	var partDecimal = 0;
	var partFinalDecimal = 0;
	var totflete = parseFloat(localStorage.getItem("key_v-totalflette"));
	var totalamountadditional = parseFloat(localStorage.getItem("key_v-totalammountadditional"));
	var totaltransport = parseFloat(localStorage.getItem("key_v-valuetransport"));
	var totalinsurance = parseFloat(localStorage.getItem("key_v-valueinsurance"));
	var totalimportprev = parseFloat(localStorage.getItem("key_v-valuestaxationimport"));
	var totalvaluesquotation =  parseFloat(localStorage.getItem("key_v-valuesquotation"));
	var totalvaluesquotationbyIGV =  parseFloat(localStorage.getItem("key_v-valuesquotationbyigv"));

	var sumTotalFirstFlete = totflete + totalamountadditional + totalimportprev + totaltransport + totalinsurance + totalvaluesquotation; //FLETE FINAL
	var sumTotalbyIGV = (totaltransport + totalamountadditional + totalvaluesquotationbyIGV) * (18 / 100);
	//console.log(sumTotalFirstFlete);
	//console.log(sumTotalbyIGV);
	var totalNotround = twodecimals(sumTotalFirstFlete);
	var n = Math.abs(totalNotround);
	partInteger = Math.trunc(n);
	//partDecimal = totalNotround.toString().substr(-2);
	partDecimal = totalNotround.toString().split('.');
	//console.log(partInteger);
	//console.log(partDecimal);
	if(partDecimal[1].length < 1){
		partFinalDecimal = partDecimal[1]+'00';
	}else	if(partDecimal[1].length < 2){
		partFinalDecimal = partDecimal[1]+'0';
	}else{
		partFinalDecimal = partDecimal[1];
	}
	// 1. IMPRIMIR EL PRIMER VALOR - VALOR FINAL DEL FLETE...
	$("#intdecval-quotefinal").html(`<span>${partInteger},<sup>${partFinalDecimal}</sup> USD</span>`);
	// 2. IMRPIMIR EL SEGUNDO VALOR - VALOR CALCULADO CON IGV MENOS 2 ITEMS...
	var totalNotRountByIGV = twodecimals(sumTotalbyIGV);
	var separatebyIGV = totalNotRountByIGV.toString().split('.');
	$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separatebyIGV.join(',')} USD</span>`);
	// 3. IMRPIMIR EL TERCER VALOR - VALOR TOTAL DE IMPUESTOS...
	/************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
  $.ajax({
    url: "controllers/list_taxation_values_byquotation.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    var restaxvalues = JSON.parse(e);
    console.log(restaxvalues);
	
		var totalNotRoundTaxation = 0;
		var partIntegerTaxation = 0;
		var separateTaxation = 0;
  });


	/************************** CARGAR LOS VALORES E INCLUIRLOS EN EL TEXTO PARA EL BOTÓN DE WHATSAPP **************************/
	var typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
			typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
			fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
			fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
			contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
			valormercanciaFlete = $("#m-second-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
			impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
			transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
			seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

	var objDataTxtWhatsapp = {
		tservice : typeFleteService,
		tcontainer : typeFleteContainer,
		fportorigin : fleteportOrigin,
		fportdestiny : fleteportDestiny,
		containtflete : contentFlete,
		valmercanciaflete: valormercanciaFlete,
		impuestosflete : impuestosFlete,
		tranportflete : transportFlete,
		seguroflete : seguroFlete
	}

	/************************** AÑADIR LOS DATOS AL ENLACE DE WHATSAPP **************************/
	$("#d-link-messagecontact").attr("href", 
`https://api.whatsapp.com/send?phone=51951488317&text=Saludos,%20me%20gustaría%20cotizar%20
	ID:31798-LCL,%20
	Tipo%20Flete:%20${objDataTxtWhatsapp.tservice},%20
	Tipo%20Contenedor:%20${objDataTxtWhatsapp.tcontainer},%20
	Flete%20Origen:%20${objDataTxtWhatsapp.fportorigin},%20
	Flete%20Destino:%20${objDataTxtWhatsapp.fportdestiny},%20
	Contenido%20Flete:%20${objDataTxtWhatsapp.containtflete},%20
	Valor%20Flete:%202136,%20
	gastos:%20${objDataTxtWhatsapp.valmercanciaflete},%20
	Impuestos:%20${objDataTxtWhatsapp.impuestosflete},%20
	Transporte:%20${objDataTxtWhatsapp.tranportflete},%20
	Seguro:%20${objDataTxtWhatsapp.seguroflete},%20
	ImpuestoAprox:%2010.279`);
	
	/************************** FORMULARIO DE DATOS DEL USUARIO - ANTES DE DESCARGAR SU COTIZACIÓN **************************/
	$(document).on("submit","#btn-gen_formDataUserQuotation",function(e){
		e.preventDefault();

		($("#n_document_cli").val() != "" || $("#n_document_cli").val() != 0) ? $("#msg-nounNumberDoc").text("") : $("#msg-nounNumberDoc").text("Ingrese un número de documento");
		($("#msg-nounValidEmail").val() != "" || $("#msg-nounValidEmail").val() != 0) ? $("#msg-nounValidEmail").text("") : $("#msg-nounValidEmail").text("Ingrese un correo electrónico");

		if($("#n_document_cli").val() != "" || $("#n_document_cli").val() != 0 &&
			 $("#msg-nounValidEmail").val() != "" || $("#msg-nounValidEmail").val() != 0){

			$.ajax({
				url: "controllers/c_generate-pdf.php",
		    method: "POST",
		    datatype: "JSON",
		    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		    data: objDataTxtWhatsapp,
			}).done((res) =>{
				console.log(res);
			});

		}else{
			console.log('Debes completar los campos requeridos');
		}
	});

});