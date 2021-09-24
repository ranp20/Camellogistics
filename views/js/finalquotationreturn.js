/************************** GENERAR EL PDF **************************/
function generatePDF(nameuser){
	$url = "controllers/c_generate-pdf.php?user="+nameuser;
	window.open($url, "cotizacion_pdf");
}
/************************** CALCULAR Y MOSTRAR EL RESUMEN DE COTIZACIÓN - INTERFAZ DE PRESENTACIÓN DE COTIZACIÓN **************************/
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
$(document).ready(function(){
	$("#btn-scrollingtTtB").on("click", function(){$("body, html").animate({scrollTop: '500'}, 350);}); //BOTÓN DE IR HACIA ABAJO
	$("#v_validratedate").text(localStorage.getItem("key_validaterate")); //LISTAR LA FECHA DE VALIDEZ DE LA TARIFA SELECCIONADA
	/************************** LISTAR LOS VALORES PARA LOS CÁLCULOS **************************/
	var partInteger = 0;
	var partDecimal = 0;
	var partFinalDecimal = 0;
	var receivedAd_valoren = parseFloat(localStorage.getItem("key_v-valuestaxOnebyigv")); //AD-VALOREN
	var receivedI_selectivo = parseFloat(localStorage.getItem("key_v-valuestaxTwobyigv")); //IMPUESTO SELECTIVO
	var received_antidumping = parseFloat(localStorage.getItem("key_v-valuestaxThreebyigv")); //ANTIDUMPING
	var receivedfob = localStorage.getItem("key_v-valueproduct"); //VALOR FOB DESDE LOCALSTORAGE
	var receiveddownload = localStorage.getItem("key_v-valbytotaldownload"); //VALOR DE DESCARGA DESDE LOCALSTORAGE
	var cutefobofpriceusd = receivedfob.split(" USD");
  var cutewithoutofpricefob = cutefobofpriceusd[0].replace(/\./g, '');
	var totflete = parseFloat(localStorage.getItem("key_v-totalflette")); //TOTAL - SOLO FLETE
	var totalamountadditional = parseFloat(localStorage.getItem("key_v-totalammountadditional")); //MONTO ADICIONAL
	var totaltransport = parseFloat(localStorage.getItem("key_v-valuetransport")); //TOTAL TRANSPORTE
	var totalinsurance = parseFloat(localStorage.getItem("key_v-valueinsurance")); //TOTAL SEGURO
	var totalimportprev = parseFloat(localStorage.getItem("key_v-valuestaxationimport")); //TOTAL IMPORTACIÓN PREVIA
	var totalvaluesquotation =  parseFloat(localStorage.getItem("key_v-valuesquotation")); //TOTAL SUMA DE VALORES DE COTIZACIÓN
	var totalvaluesquotationbyIGV =  parseFloat(localStorage.getItem("key_v-valuesquotationbyigv")); //TOTAL SUMA DE VALORES DE COTIZACIÓN IGV
  var totalfinalvaluefob = parseFloat(twodecimals(cutewithoutofpricefob)); //TOTAL DE VALOR FOB
  var totalfinalvaluedownload = parseFloat(twodecimals(receiveddownload)); //TOTAL DE VALOR DE DESCARGA

  // console.log('FOB: '+totalfinalvaluefob);
  // console.log('FLETE: '+totflete);
  // console.log('SEGURO: '+totalinsurance);
	/************************** TOTALES PARA LA COTIZACIÓN **************************/
	var sumTotalFirstFlete = totflete + totalamountadditional + totalimportprev + totaltransport + totalinsurance + totalvaluesquotation + totalfinalvaluedownload; //FLETE FINAL
	var sumTotalbyIGV = (totaltransport + totalamountadditional + totalvaluesquotationbyIGV) * (18 / 100); //IGV (DEBAJO DEL FLETE FINAL)
	var sumTotalFinalFleteandIGV = sumTotalFirstFlete + sumTotalbyIGV; //VALOR TOTAL FINAL DE LA COTIZACIÓN
	var sumbyCIF = totalfinalvaluefob + totflete + totalinsurance; //CIF FINAL

	var totalNotround = twodecimals(sumTotalFirstFlete);
	var n = Math.abs(totalNotround);
	partInteger = Math.trunc(n);
	var separate_point = partInteger.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
	partDecimal = totalNotround.toString().split('.');

	if(partDecimal[1] == undefined || partDecimal[1] == 'undefined' || partDecimal[1] == ""){
		partFinalDecimal = '00';
	}else	if(partDecimal[1].length < 2){
		partFinalDecimal = partDecimal[1]+'0';
	}else{
		partFinalDecimal = partDecimal[1];
	}
	
	/************************** IMPRIMIR EL TOTAL DEL FLETE **************************/
	$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);
	/************************** IMPRIMIR EL TOTAL ENTRE EL IGV **************************/
	var totalNotRountByIGV = twodecimals(sumTotalbyIGV);
	var n_byIGV = Math.abs(totalNotRountByIGV);
	var partInteger_byIGV = Math.trunc(n_byIGV);
	var separate_point_byIGV = partInteger_byIGV.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
	var part_decimalbyIGV = totalNotRountByIGV.toString().split('.');
	var partFinal_decimal_byIGV = 0;

	if(part_decimalbyIGV[1] == undefined || part_decimalbyIGV[1] == 'undefined' || part_decimalbyIGV[1] == ""){
		partFinal_decimal_byIGV = '00';
	}else	if(part_decimalbyIGV[1].length < 2){
		partFinal_decimal_byIGV = part_decimalbyIGV[1]+'0';
	}else{
		partFinal_decimal_byIGV = part_decimalbyIGV[1];
	}

	$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separate_point_byIGV},${partFinal_decimal_byIGV} USD</span>`);
	/************************** IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV **************************/
	var partInteger_FTotal = 0;
	var partDecimal_FTotal = 0;
	var partFinalDecimal_FTotal = 0;
	var totalNotRoundFinal = twodecimals(sumTotalFinalFleteandIGV);
	var n_ftotal = Math.abs(totalNotRoundFinal);
	partInteger_FTotal = Math.trunc(n_ftotal);
	var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
	partDecimal_FTotal = totalNotRoundFinal.toString().split('.');

	if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){
		partFinalDecimal_FTotal = partDecimal_FTotal[1]+'00';
	}else	if(partDecimal_FTotal[1].length < 2){
		partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
	}else{
		partFinalDecimal_FTotal = partDecimal_FTotal[1];
	}
	$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

	/************************** CÁLCULO DE IMPUESTOS **************************/
	var partInteger_Tax = 0;
	var partDecimal_Tax = 0;
	var partFinalDecimal_Tax = 0;
	/************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
  $.ajax({
    url: "controllers/list_taxation_values_byquotation.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    var restaxvalues = JSON.parse(e);
    var res_IGV = parseFloat(restaxvalues[0].data_value);
    var res_IPM = parseFloat(restaxvalues[1].data_value);

    /************************** VALORES - DE PORCENTAJES A DECIMALES **************************/
    var convert_IGV = res_IGV / 100; //VALOR I.G.V.
    var convert_IPM = res_IPM / 100; //VALOR I.P.M.
    var convert_Percepcion = totalimportprev / 100; //VALOR PERCEPCIÓN
    var convert_Ad_Valoren = receivedAd_valoren / 100; //VALOR AD-VALOREN DE PRODUCTO
    var convert_I_selectivo = receivedI_selectivo / 100; //VALOR IMPUESTO SELECTIVO DE PROUCTO
    var convert_antidumping = received_antidumping / 100;

    // console.log('IGV: '+convert_IGV);
    // console.log('IPM: '+convert_IPM);
    // console.log('Percepción: '+convert_Percepcion);
    // console.log('Ad-Valoren: '+convert_Ad_Valoren);
    // console.log('Impuesto selectivo: '+convert_I_selectivo);
    // console.log('ANTIDUMPING: '+convert_antidumping);

    /************************** CALCULAR AD-VALOREN **************************/
    var val_Ad_valoren = sumbyCIF * convert_Ad_Valoren;
    var twodecimal_Ad_valoren = twodecimals(val_Ad_valoren);
    var finalval_Ad_valoren = parseFloat(twodecimal_Ad_valoren);
		/************************** CALCULAR IMPUESTO SELECTIVO **************************/
		var val_i_selectivo = sumbyCIF * convert_I_selectivo;
		var twodecimal_i_selectivo = twodecimals(val_i_selectivo);
		var finalval_i_selectivo = parseFloat(twodecimal_i_selectivo);
		/************************** CALCULAR ANTIDUMPING **************************/
		var val_antidumping = sumbyCIF * convert_antidumping;
		var twodecimal_antidumping = twodecimals(val_antidumping);
		var finalval_antidumping = parseFloat(twodecimal_antidumping);
    /************************** CALCULAR IGV **************************/
		var val_IGV = ( sumbyCIF + finalval_Ad_valoren ) * convert_IGV;
		var twodecimal_IGV = twodecimals(val_IGV);
		var finalval_IGV = parseFloat(twodecimal_IGV);
		/************************** CALCULAR IPM **************************/
		var val_IPM = ( sumbyCIF + finalval_Ad_valoren) * convert_IPM;
		var twodecimal_IPM = twodecimals(val_IPM);
		var finalval_IPM = parseFloat(twodecimal_IPM);
		/************************** CALCULAR PERCEPCIÓN **************************/
		var val_Percepcion = ( sumbyCIF + finalval_Ad_valoren + finalval_IGV + finalval_IPM ) * convert_Percepcion;
		var twodecimal_percepcion = twodecimals(val_Percepcion);
		var finalval_percepcion = parseFloat(twodecimal_percepcion);

		/************************** CALCULO FINAL DE IMPUESTOS **************************/
		var val_FinalTax = finalval_IGV + finalval_IPM + finalval_percepcion + finalval_Ad_valoren + finalval_i_selectivo + finalval_antidumping;

		var twodecimals_FinalTax = twodecimals(val_FinalTax);
		var finalval_FinalTax = parseFloat(twodecimals_FinalTax);
		var n_tax = Math.abs(finalval_FinalTax);
		partInteger_Tax = Math.trunc(n_tax);
		var separate_point_Tax = partInteger_Tax.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
		partDecimal_Tax = finalval_FinalTax.toString().split('.');
		if(partDecimal_Tax[1] == undefined || partDecimal_Tax[1] == 'undefined' || partDecimal_Tax[1] == ""){
			partFinalDecimal_Tax = partDecimal_Tax[1]+'00';
		}else	if(partDecimal_Tax[1].length < 2){
			partFinalDecimal_Tax = partDecimal_Tax[1]+'0';
		}else{
			partFinalDecimal_Tax = partDecimal_Tax[1];
		}

		/************************** IMPRESIÓN DE LOS VALORES **************************/
		if(document.querySelector(".c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst").contains(document.querySelector("#taxval_quotefinal"))){			
			$("#taxval_quotefinal").html(`<span>${separate_point_Tax},<sup>${partFinalDecimal_Tax}</sup> USD</span>`);
		}else{
			//console.log("No existe el elemento");
		}
    /************************** VALIDAR SI EXISTE UN USUARIO AL ABRIR EL MODAL - PRIMER BOTÓN **************************/
    $(document).on("click","#btn-requireDownloadQuotaion_one",function(e){
			e.preventDefault();	
			/************************** VALIDAR SI YA EXISTE UN USUARIO O REGISTRAR **************************/
			if($("#s_useregin-sistem").val() == "" || 
				 $("#s_useregin-sistem").val() == undefined || 
				 $("#s_useregin-sistem").val() == 'undefined' || 
				 $("#s_useregin-sistem").val() == null ||
				 $("#s_useregin-sistem").val() == 'null'){

			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			console.log('Por favor, rellene sus datos.');

			}else if($("#s_useregin-sistem").val() != "" || 
							 $("#s_useregin-sistem").val() != undefined || 
							 $("#s_useregin-sistem").val() != 'undefined' || 
							 $("#s_useregin-sistem").val() != null ||
							 $("#s_useregin-sistem").val() != 'null'){
				
    		/************************** ENVIAR UN AJAX PARA ALMACENAR LA COTIZACIÓN **************************/
				var userNameReg = $("#s_useregin-sistem").val();
				$.ajax({
					url: 'controllers/c_finalvalidateuser.php',
					method: 'POST',
					datatype: "JSON",
		    	contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					async: true,
					data: {userName: userNameReg}
				}).done( function(e){
					var queryresult = JSON.parse(e);
					if(queryresult.response == "true"){
						console.log("El usuario existe");
						generatePDF(queryresult.username);
					}else{
						console.log("El usuario NO existe");
					}
				});
			}else{
				$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
				console.log('Hubo un error al generar el PDF');
			}
		});
		/************************** VALIDAR SI EXISTE UN USUARIO AL ABRIR EL MODAL - SEGUNDO BOTÓN **************************/
		$(document).on("click","#btn-requireDownloadQuotaion_two",function(e){
			e.preventDefault();
			/************************** VALIDAR SI YA EXISTE UN USUARIO O REGISTRAR **************************/
			if($("#s_useregin-sistem").val() == "" || 
				 $("#s_useregin-sistem").val() == undefined || 
				 $("#s_useregin-sistem").val() == 'undefined' || 
				 $("#s_useregin-sistem").val() == null ||
				 $("#s_useregin-sistem").val() == 'null'){

			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			console.log('Por favor, rellene sus datos.');

			}else if($("#s_useregin-sistem").val() != "" || 
							 $("#s_useregin-sistem").val() != undefined || 
							 $("#s_useregin-sistem").val() != 'undefined' || 
							 $("#s_useregin-sistem").val() != null ||
							 $("#s_useregin-sistem").val() != 'null'){
				
				/************************** ENVIAR UN AJAX PARA ALMACENAR LA COTIZACIÓN **************************/
				var userNameReg = $("#s_useregin-sistem").val();
				$.ajax({
					url: 'controllers/c_finalvalidateuser.php',
					method: 'POST',
					datatype: "JSON",
		    	contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					async: true,
					data: {userName: userNameReg}
				}).done( function(e){
					var queryresult = JSON.parse(e);
					if(queryresult.response == "true"){
						console.log("El usuario existe");
						generatePDF(queryresult.username);
					}else{
						console.log("El usuario NO existe");
					}
				});
			}else{
				$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
				console.log('Hubo un error al generar el PDF');
			}
		});
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
	
	/************************** VALIDAR CUADRO DE TEXTO DE DOCUMENTO DE IDENTIDAD **************************/
	$(document).on("input keyup keypress blur change","#n_document_cli",function(e){
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    return false;
	  }else{
	    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
	      return false;
	    }else{
				if(e.target.value != 0 || e.target.value != ""){
					console.log('Contiene información');
					$("#msg-nounNumberDoc").text("");
				}else{
					console.log('NO contiene información');
					$("#msg-nounNumberDoc").text("Debes completar este campo");
				}
	    }
	  }
	});
	/************************** VALIDAR NOMBRE DE LA EMPRESA **************************/
	$(document).on("input keyup keypress blur change","#name_enterprise_cli",function(e){
    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
      return false;
    }else{
			if(e.target.value != 0 || e.target.value != ""){
				console.log('Contiene información');
				$("#msg-nounNameEnterpriseReg").text("");
			}else{
				console.log('NO contiene información');
				$("#msg-nounNameEnterpriseReg").text("Debes completar este campo");
			}
    }
	});
	/************************** VALIDAR NÚMERO DE TELÉFONO **************************/
	$(document).on("input keyup keypress blur change","#telephone_cli",function(e){
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    return false;
	  }else{
	    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
	      return false;
	    }else{
				if(e.target.value != 0 || e.target.value != ""){
					console.log('Contiene información');
					$("#msg-nounNumberorTelephoneNumb").text("");
				}else{
					console.log('NO contiene información');
					$("#msg-nounNumberorTelephoneNumb").text("Debes completar este campo");
				}
	    }
	  }
	});
	/************************** VALIDAR EMAIL DEL USUARIO **************************/
	$(document).on("input keyup keypress blur change","#email_cli",function(e){
    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
      return false;
    }else{
			if(e.target.value != 0 || e.target.value != ""){
				console.log('Contiene información');
				$("#msg-nounValidEmail").text("");
			}else{
				console.log('NO contiene información');
				$("#msg-nounValidEmail").text("Debes completar este campo");
			}
    }
	});

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