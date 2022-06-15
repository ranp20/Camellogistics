// ------------ DEJAR EN 2 DECIMALES POR DEFECTO 
function myRound(num, dec){
  var exp = Math.pow(10, dec || 2); // 2 decimales por defecto
  return parseInt(num * exp, 10) / exp;
}
// ------------ FUNCIÓN - LIMITAR A DOS DECIMALES SIN REDONDEO 
function twodecimals(n){
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
// ------------ RETORNAR - PRIMERA LETRA EN MAYÚSCULA 
function firstToUppercase(e){
  return e.charAt(0).toUpperCase() + e.slice(1);
}
$("#btn-scrollingtTtB").on("click", function(){$("body, html").animate({scrollTop: '500'}, 350);}); //BOTÓN DE IR HACIA ABAJO
$(document).ready(function(){
	// ------------ VALIDAR SI EXISTE UN USUARIO, DE LO CONTRARIO ASIGNAR EL USUARIO POR DEFECTO 
	if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){
		sessval_loginuser = { username: 'Invitado' }
    sessionStorage.setItem("sess_usercli", JSON.stringify(sessval_loginuser));
    sessionStorage.setItem("sess_valuser", 0);
    var s_username_local = JSON.parse(sessionStorage.getItem("sess_usercli"));
		// ------------ ACTUALIZAR EL HEADER TOP 
		$("#s-loginsessuser-active").html(`
		<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
      <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${s_username_local.username}</span>
    </a>
    <ul class='c-Htopbar--c--cMenu--m--item--subm'>
      <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
        <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
      		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        	<span>Cerrar sesión</span>
        </a>
      </li>
    </ul>`);
		$.ajax({
			url: 'controllers/prcss_login-user.php',
			method: 'POST',
			dataType: 'JSON',
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			data: { 'u-username' : s_username_local.username, 'u-typeorder' : sessionStorage.getItem("sess_valuser")}
		}).done((e) => {
			// ------------ MOSTRAR EL NOMBRE/CORREO DEL USUARIO 
			$("#s-loginsessuser-active").html(`
			<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
        <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${e.received.username}</span>
      </a>
      <ul class='c-Htopbar--c--cMenu--m--item--subm'>
        <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
          <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
          	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
    				<span>Cerrar sesión</span>
          </a>
        </li>
      </ul>`);
		});
	}else{
		sessval_loginuser = { username: $("#s_useregin-sistem").val() }
    sessionStorage.setItem("sess_usercli", JSON.stringify(sessval_loginuser));
    sessionStorage.setItem("sess_valuser", 1);
    var s_username_local = JSON.parse(sessionStorage.getItem("sess_usercli"));
		// ------------ ACTUALIZAR EL HEADER TOP 
		$("#s-loginsessuser-active").html(`
		<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
      <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${s_username_local.username}</span>
    </a>
    <ul class='c-Htopbar--c--cMenu--m--item--subm'>
      <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
        <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
      		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        	<span>Cerrar sesión</span>
        </a>
      </li>
    </ul>`);
	}
	// ------------ VALORES PARA LAS VALIDACIONES 
	// ------------ VALORES DE TEXTO
	var v_loadtypecharge = $("#v_loadtypecharge").val();
	var portOriginName = $("#v_fportorigname").val();
	var portDestinyName = $("#v_fportdestiname").val();
	var v_typeserviceinit = $("#v_typeserviceinit").val();
	var v_fnamecategprod = $("#v_fnamecategprod").val();
	var v_ftaproxtransbycont = $("#v_ftaproxtransbycont").val();
	var v_floadTypeTranport = $("#v_floadTypeTranport").val();
	// ------------ VALORES PARA EL CÁLCULO
	var val_ftotvalofdownload = $("#v_ftotvalofdownload").val();
	var val_ftotalfleteprod = $("#v_ftotalfleteprod").val();
	var val_plcpickuprateprov = $("#v-plcpickuprateprov").val();
	// ------------ CÁLCULO DE IMPUESTOS 
	var partInteger_Tax = 0;
	var partDecimal_Tax = 0;
	var partFinalDecimal_Tax = 0;
	// ------------ VARIABLES PARA LOS TOTALES A IMPRIMIR 
	var sumTotalFirstFlete = 0;
	var sumTotalbyIGV = 0;
	var sumTotalFinalFleteandIGV = 0;
	var sumbyCIF = 0;
	// ------------ LISTAR LOS VALORES PARA LOS CÁLCULOS 
	var partInteger = 0;
	var partDecimal = 0;
	var partFinalDecimal = 0;
	var receivedAd_valoren = parseFloat(localStorage.getItem("key_v-valuestaxOnebyigv")); //AD-VALOREN
	var receivedI_selectivo = parseFloat(localStorage.getItem("key_v-valuestaxTwobyigv")); //IMPUESTO SELECTIVO
	var received_antidumping = parseFloat(localStorage.getItem("key_v-valuestaxThreebyigv")); //ANTIDUMPING
	var receivedfob = localStorage.getItem("key_v-valueproduct"); //VALOR FOB DESDE LOCALSTORAGE
	var receiveddownload = val_ftotvalofdownload; //VALOR DE DESCARGA DESDE LOCALSTORAGE
	var cutefobofpriceusd = receivedfob.split(" USD");
  var cutewithoutofpricefob = cutefobofpriceusd[0].replace(/\./g, '');
	var totflete = parseFloat(val_ftotalfleteprod); //TOTAL - SOLO FLETE
	var totalamountadditional = parseFloat(localStorage.getItem("key_v-totalammountadditional")); //MONTO ADICIONAL
	var totaltransport = parseFloat(val_plcpickuprateprov); //TOTAL TRANSPORTE
	var totalinsurance = parseFloat(localStorage.getItem("key_v-valueinsurance")); //TOTAL SEGURO
	var totalimportprev = $("#v_previmports").text(); //TOTAL IMPORTACIÓN PREVIA
	var totalvaluesquotation =  parseFloat(localStorage.getItem("key_v-valuesquotation")); //TOTAL SUMA DE VALORES DE COTIZACIÓN
	var totalvaluesquotationbyIGV =  parseFloat(localStorage.getItem("key_v-valuesquotationbyigv")); //TOTAL SUMA DE VALORES DE COTIZACIÓN IGV
  var totalfinalvaluefob = parseFloat(twodecimals(cutewithoutofpricefob)); //TOTAL DE VALOR FOB
  var totalfinalvaluedownload = parseFloat(twodecimals(receiveddownload)); //TOTAL DE VALOR DE DESCARGA

	// LLAMAR A LOS VALORES DE SEGURO, METER LOS VALORES DENTRO DEL AJAX DE TAXATION O CREAR VARIABLES GLOBALES Y USARLAS
	$.ajax({
    url: "controllers/list_insurancevalues.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
  	var rinsurance = JSON.parse(e);
  	var insure_min25000 = parseFloat(rinsurance[0].data_value); //FOB MENOR A 25000
  	var insure_max25000 = parseFloat(rinsurance[1].data_value); //FOB MAYOR A 25000
  	var insure_default = parseFloat(rinsurance[2].data_value); //SIN FOB/VALOR POR DEFECTO

  	if($("#v_insurancemerch").text() != "NO"){
			// ------------ TOTALES A IMPRIMIR - CON SEGURO 
			sumTotalFirstFlete = totflete + totalamountadditional + totaltransport + totalinsurance + totalvaluesquotation + totalfinalvaluedownload; //FLETE FINAL
			sumTotalbyIGV = (totaltransport + totalamountadditional + totalvaluesquotationbyIGV) * (18 / 100); //IGV (DEBAJO DEL FLETE FINAL)
			sumTotalFinalFleteandIGV = sumTotalFirstFlete + sumTotalbyIGV; //VALOR TOTAL FINAL DE LA COTIZACIÓN
			sumbyCIF = totalfinalvaluefob + totflete + totalinsurance; //CIF FINAL

  	}else{
  		// ------------ TOTALES A IMPRIMIR - SIN SEGURO 
			sumTotalFirstFlete = totflete + totalamountadditional + totaltransport + totalvaluesquotation + totalfinalvaluedownload; //FLETE FINAL
			sumTotalbyIGV = (totaltransport + totalamountadditional + totalvaluesquotationbyIGV) * (18 / 100); //IGV (DEBAJO DEL FLETE FINAL)
			sumTotalFinalFleteandIGV = sumTotalFirstFlete + sumTotalbyIGV; //VALOR TOTAL FINAL DE LA COTIZACIÓN
			sumbyCIF = totalfinalvaluefob + totflete + totalinsurance; //CIF FINAL
  	}
		
		console.log('Totaltarifatrans: '+totaltransport);
		console.log('Totalmontoadicional: '+totalamountadditional);
		console.log('TotalvalorIGV: '+totalvaluesquotationbyIGV);

		// ------------ LIMPIAR EL VALOR E IMPRIMIR EN EL TOTAL DEL SERVICIOS 
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
		$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);
		// ------------ IMPRIMIR EL TOTAL DE SERVICIOS ENTRE EL IGV 18% 
		console.log(sumTotalbyIGV);
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
		// ------------ IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV 
		var partInteger_FTotal = 0;
		var partDecimal_FTotal = 0;
		var partFinalDecimal_FTotal = 0;
		var totalNotRoundFinal = twodecimals(sumTotalFinalFleteandIGV);
		var n_ftotal = Math.abs(totalNotRoundFinal);
		partInteger_FTotal = Math.trunc(n_ftotal);
		var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
		partDecimal_FTotal = totalNotRoundFinal.toString().split('.');
		if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){
			partFinalDecimal_FTotal = '00';
		}else	if(partDecimal_FTotal[1].length < 2){
			partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
		}else{
			partFinalDecimal_FTotal = partDecimal_FTotal[1];
		}
		$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

		// ------------ LISTAR SERVICIOS PARA CALCULO CON IGV - FCL 
	  $.ajax({
	    url: "controllers/list_taxation_values_byquotation.php",
	    method: "POST",
	    datatype: "JSON",
	    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	  }).done((e) => {
	    var restaxvalues = JSON.parse(e);
	  	
	    var res_IGV = parseFloat(restaxvalues[0].data_value);
	    var res_IPM = parseFloat(restaxvalues[1].data_value);
	    var res_Percepcion_YES = parseFloat(restaxvalues[2].data_value);
	    var res_Percepcion_NO = parseFloat(restaxvalues[2].data_value_two);

	    // ------------ VALORES - DE PORCENTAJES A DECIMALES 
	    var percepcion_notfilter = "";
	    var convert_IGV = res_IGV / 100; //VALOR I.G.V.
	    var convert_IPM = res_IPM / 100; //VALOR I.P.M.
	    var convert_Percepcion = 0; //VALOR PERCEPCIÓN
	    var convert_Ad_Valoren = receivedAd_valoren / 100; //VALOR AD-VALOREN DE PRODUCTO
	    var convert_I_selectivo = receivedI_selectivo / 100; //VALOR IMPUESTO SELECTIVO DE PROUCTO
	    var convert_antidumping = received_antidumping / 100; //VALOR ANTIDUMPING

	    if(totalimportprev != "NO"){
		    convert_Percepcion = res_Percepcion_YES / 100; /// 3.50
		    percepcion_notfilter = restaxvalues[2].data_value;
	    }else{
	    	convert_Percepcion = res_Percepcion_NO / 100;///10
	    	percepcion_notfilter = restaxvalues[2].data_value_two;
	    }

	    // ------------ CALCULAR AD-VALOREN 
	    var val_Ad_valoren = sumbyCIF * convert_Ad_Valoren;
	    var twodecimal_Ad_valoren = twodecimals(val_Ad_valoren);
	    var finalval_Ad_valoren = parseFloat(twodecimal_Ad_valoren);
			// ------------ CALCULAR IMPUESTO SELECTIVO 
			var val_i_selectivo = sumbyCIF * convert_I_selectivo;
			var twodecimal_i_selectivo = twodecimals(val_i_selectivo);
			var finalval_i_selectivo = parseFloat(twodecimal_i_selectivo);
			// ------------ CALCULAR ANTIDUMPING 
			var val_antidumping = sumbyCIF * convert_antidumping;
			var twodecimal_antidumping = twodecimals(val_antidumping);
			var finalval_antidumping = parseFloat(twodecimal_antidumping);
	    // ------------ CALCULAR IGV 
			var val_IGV = ( sumbyCIF + finalval_Ad_valoren ) * convert_IGV;
			var twodecimal_IGV = twodecimals(val_IGV);
			var finalval_IGV = parseFloat(twodecimal_IGV);
			// ------------ CALCULAR IPM 
			var val_IPM = ( sumbyCIF + finalval_Ad_valoren) * convert_IPM;
			var twodecimal_IPM = twodecimals(val_IPM);
			var finalval_IPM = parseFloat(twodecimal_IPM);
			// ------------ CALCULAR PERCEPCIÓN 
			var val_Percepcion = ( sumbyCIF + finalval_Ad_valoren + finalval_IGV + finalval_IPM ) * convert_Percepcion;
			var twodecimal_percepcion = twodecimals(val_Percepcion);
			var finalval_percepcion = parseFloat(twodecimal_percepcion);

			// ------------ CALCULO FINAL DE IMPUESTOS 
			var val_FinalTax = finalval_IGV + finalval_IPM + finalval_percepcion + finalval_Ad_valoren + finalval_i_selectivo + finalval_antidumping + totalinsurance;

			var twodecimals_FinalTax = twodecimals(val_FinalTax);
			var finalval_FinalTax = parseFloat(twodecimals_FinalTax);
			var n_tax = Math.abs(finalval_FinalTax);
			partInteger_Tax = Math.trunc(n_tax);
			var separate_point_Tax = partInteger_Tax.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
			partDecimal_Tax = finalval_FinalTax.toString().split('.');
			if(partDecimal_Tax[1] == undefined || partDecimal_Tax[1] == 'undefined' || partDecimal_Tax[1] == ""){
				partFinalDecimal_Tax = '00';
			}else	if(partDecimal_Tax[1].length < 2){
				partFinalDecimal_Tax = partDecimal_Tax[1]+'0';
			}else{
				partFinalDecimal_Tax = partDecimal_Tax[1];
			}

			// ------------ IMPRESIÓN DE LOS VALORES 
			if(document.querySelector(".c-FinalQuotation--contStep--cQuotation--cBottom--cAduanaImpst").contains(document.querySelector("#taxval_quotefinal"))){			
				$("#taxval_quotefinal").html(`<span>${separate_point_Tax},<sup>${partFinalDecimal_Tax}</sup> USD</span>`);
			}else{
				//console.log("No existe el elemento");
			}

			// ------------ VALIDAR EL VALOR DE TRANSPORTE DE INICIO 
			var inittranpsendid = $("#v_typetranspsendinitid").val();
			var transsendinitbyid = "";
			if(inittranpsendid == 0){
				transsendinitbyid = "S-ADU";
			}else if(inittranpsendid == 1){
				transsendinitbyid = "T-MAR";
			}else if(inittranpsendid == 2){
				transsendinitbyid = "T-AER";
			}else{
				console.log('Inv-ID');
			}

			// ------------ LISTAR SERVICIOS PARA CALCULO CON IGV - FCL 
		  $.ajax({
		    url: "controllers/list_quotation_values_calcservs_fcl_and_lcl.php",
		    method: "POST",
		    datatype: "JSON",
		    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
		  }).done((e) => {
		  	var rqfclandlcl = JSON.parse(e);
		  	var com_agencia_fcl = parseFloat(rqfclandlcl[0].com_agencia_fcl);
		  	var com_agencia_lcl = parseFloat(rqfclandlcl[0].com_agencia_lcl);
		  	var gas_operativos_fcl = parseFloat(rqfclandlcl[0].gas_operativos_fcl);
		  	var gas_operativos_lcl = parseFloat(rqfclandlcl[0].gas_operativos_lcl);

		  	var fval_com_agencia = 0;
		  	var fvalfinal_com_agencia = 0;
		  	var fvalfinal_gas_operativos = 0;
		  	var val_defaultmin = 0.4 / 100;
		  	if(v_loadtypecharge == "FCL"){
		  		fvalfinal_gas_operativos = gas_operativos_fcl;
		  		if(sumbyCIF > 35000){
		  			fval_com_agencia = sumbyCIF * val_defaultmin;
		  			fvalfinal_com_agencia = myRound(fval_com_agencia);
		  		}else{
		  			fvalfinal_com_agencia = com_agencia_fcl;
		  		}
		  	}else{
		  		fvalfinal_gas_operativos = gas_operativos_lcl;
		  		if(sumbyCIF > 35000){
		  			fval_com_agencia = sumbyCIF * val_defaultmin;
		  			fvalfinal_com_agencia = myRound(fval_com_agencia);
		  		}else{
		  			fvalfinal_com_agencia = com_agencia_fcl;
		  		}
		  	}

		  	// ------------ VALIDAR EL VALOR DEL USUARIO 
				var user_sessquote = "";
				
				// ------------ INSERTAR EN LA TABLA DE COTIZACIONES 
				if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){

					user_sessquote = s_username_local.username;

					var igv_calculate = convert_IGV * sumbyCIF;
					var ipm_calculate = sumbyCIF * convert_IPM;
					var impuestosel_calculate = 0;
					var igvcalc_twodeci = myRound(igv_calculate);
					var ipmcalc_twodeci = myRound(ipm_calculate);
					var percepcion_calculate = (sumbyCIF + igvcalc_twodeci + ipmcalc_twodeci + impuestosel_calculate) * convert_Percepcion;
					var percepcioncalc_twodeci = myRound(percepcion_calculate);

					var formdata = new FormData();
					formdata.append("id_codegenrand", $("#v_idgencoderand").val());
					formdata.append("u_login", user_sessquote);
					formdata.append("f_typetransendinitid", transsendinitbyid);
					formdata.append("f_type_op", v_typeserviceinit);
					formdata.append("f_type_transp", v_floadTypeTranport);
					formdata.append("f_type_cont", v_loadtypecharge);
					formdata.append("u_n_document", "No especificado");
					formdata.append("u_enterprise", "No especificado");
					formdata.append("u_telephone", "No especificado");
					formdata.append("u_service", "No especificado");
					formdata.append("u_cont", v_fnamecategprod);
					formdata.append("f_origen", portOriginName);
					formdata.append("f_destiny", portDestinyName);
					formdata.append("f_weight_v", "No especificado");
					formdata.append("f_time_transit", v_ftaproxtransbycont);
					formdata.append("f_fob", totalfinalvaluefob);
					formdata.append("f_flete", totflete);
					formdata.append("f_insurance", totalinsurance);
					formdata.append("f_cif", sumbyCIF);
					formdata.append("f_v_IGV", restaxvalues[0].data_value);
					formdata.append("f_v_IPM", restaxvalues[1].data_value);
					formdata.append("f_v_percepcion", percepcion_notfilter);
					formdata.append("f_IGV", igvcalc_twodeci);
					formdata.append("f_IPM", ipmcalc_twodeci);
					formdata.append("f_percepcion", percepcioncalc_twodeci);
					formdata.append("f_comision_agencia", fvalfinal_com_agencia);
					formdata.append("f_gastos_operativos", fvalfinal_gas_operativos);
					formdata.append("f_totalservices", totalNotround);
					formdata.append("f_totalservicesIGV18", totalNotRountByIGV);
					formdata.append("f_totalimpuestos", twodecimals_FinalTax);
					formdata.append("f_totalwithIGV", totalNotRoundFinal);
					formdata.append("f_validdesde", $("#v_datevaliddesde").val());
					formdata.append("f_validhasta", $("#v_datevalidhasta").val());
					formdata.append("f_transporte_interno", $("#v-plcpickuprateprov").val());

					$.ajax({
						url: 'controllers/prcss_add-quotation-user.php',
						method: 'POST',
						datatype: "JSON",
						data: formdata,
						contentType: false,
			      cache: false,
			      processData: false
					}).done((e) => {
						if(e != ""){
							var r = JSON.parse(e);
							// --------------- TOTALES EN RE-MOSTRADO DE INFORMACÍON...
					  	var partFinalDecimal = 0;
					  	var partFinalDecimal_FTotal = 0;
							if(r.res == "non_existent"){
								// --------------- IMPRIMIR EL CÓDIGO AUTOGENERADO DE LA COTIZACIÓN
						  	$("#v_gencodexxx").text(r.received[0].code_quote);
						  	// --------------- IMPRIMIR LA VALIDEZ DE LA COTIZACIÓN
						  	if(r.received[0].f_validdesde == 0 || r.received[0].f_validhasta == 0 || r.received[0].f_validdesde == "0000-00-00 00:00:00" || r.received[0].f_validhasta == "0000-00-00 00:00:00"){
						  		$("#v_validratedate").text('No especificado');
						  	}else{
							  	var convertOneDATE =  new Date(Date.parse(r.received[0].f_validdesde.replace(/-/g, '/')));
							    var convertTwoDATE =  new Date(Date.parse(r.received[0].f_validhasta.replace(/[-]/g,'/')));
							    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
							    var options = { year: 'numeric', month: 'long', day: 'numeric' };
							    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
							    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
							    var separateDateValidDesde = convertDateValidDesde.split(" ");
							    var separateDateValidHasta = convertDateValidHasta.split(" ");
							    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
							    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);
							    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
							    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
							    $("#v_validratedate").text(val_dateValidDesde+" - "+val_dateValidHasta);
						  	}

						  	// --------------- IMPRIMIR EL TOTAL - SERVICIOS
						  	var n = Math.abs(r.received[0].f_totalservices);
								partInteger = Math.trunc(n);
								var separate_point = partInteger.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal = totalNotround.toString().split('.');
								if(partDecimal[1] == undefined || partDecimal[1] == 'undefined' || partDecimal[1] == ""){partFinalDecimal = '00';
								}else	if(partDecimal[1].length < 2){partFinalDecimal = partDecimal[1]+'0';
								}else{partFinalDecimal = partDecimal[1];}
								$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);

								// --------------- IMPRIMIR EL TOTAL ENTRE EL IGV
								var n_byIGV = Math.abs(r.received[0].f_totalservicesIGV18);
								var partInteger_byIGV = Math.trunc(n_byIGV);
								var separate_point_byIGV = partInteger_byIGV.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								var part_decimalbyIGV = totalNotRountByIGV.toString().split('.');
								var partFinal_decimal_byIGV = 0;
								if(part_decimalbyIGV[1] == undefined || part_decimalbyIGV[1] == 'undefined' || part_decimalbyIGV[1] == ""){partFinal_decimal_byIGV = '00';
								}else	if(part_decimalbyIGV[1].length < 2){partFinal_decimal_byIGV = part_decimalbyIGV[1]+'0';
								}else{partFinal_decimal_byIGV = part_decimalbyIGV[1];}
								$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separate_point_byIGV},${partFinal_decimal_byIGV} USD</span>`);

								// ---------------- IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV
								var n_ftotal = Math.abs(r.received[0].f_totalwithIGV);
								partInteger_FTotal = Math.trunc(n_ftotal);
								var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal_FTotal = totalNotRoundFinal.toString().split('.');
								if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){partFinalDecimal_FTotal = '00';
								}else	if(partDecimal_FTotal[1].length < 2){partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
								}else{partFinalDecimal_FTotal = partDecimal_FTotal[1];}
								$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

								// --------------- LISTAR DATOS PARA ENVIAR POR WHATSAPP
								var idcodequote = $("#v_gencodexxx").text() + " - " + $("#v_loadtypecharge").val(), 
										typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
										fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
										contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
										valormercanciaFlete = $("#m-second-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
										seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

								var objDataTxtWhatsapp = {
									id: idcodequote,
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

								// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
								$("#d-link-messagecontact").attr("href", 
							`https://api.whatsapp.com/send?phone=51989874368&text=Saludos,%20me%20gustaría%20cotizar%20
								ID:${objDataTxtWhatsapp.id},%20
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
								ImpuestoAprox:%20${twodecimals_FinalTax}`);
							}else if(r.res == "already_exists"){
						  	// --------------- IMPRIMIR EL CÓDIGO AUTOGENERADO DE LA COTIZACIÓN
						  	$("#v_gencodexxx").text(r.received[0].code_quote);
						  	// --------------- IMPRIMIR LA VALIDEZ DE LA COTIZACIÓN
						  	if(r.received[0].f_validdesde == 0 || r.received[0].f_validhasta == 0 || r.received[0].f_validdesde == "0000-00-00 00:00:00" || r.received[0].f_validhasta == "0000-00-00 00:00:00"){
						  		$("#v_validratedate").text('No especificado');
						  	}else{
							  	var convertOneDATE =  new Date(Date.parse(r.received[0].f_validdesde.replace(/-/g, '/')));
							    var convertTwoDATE =  new Date(Date.parse(r.received[0].f_validhasta.replace(/[-]/g,'/')));
							    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
							    var options = { year: 'numeric', month: 'long', day: 'numeric' };
							    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
							    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
							    var separateDateValidDesde = convertDateValidDesde.split(" ");
							    var separateDateValidHasta = convertDateValidHasta.split(" ");
							    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
							    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);
							    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
							    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
							    $("#v_validratedate").text(val_dateValidDesde+" - "+val_dateValidHasta);
						  	}

						  	// --------------- IMPRIMIR EL TOTAL - SERVICIOS
						  	var n = Math.abs(r.received[0].f_totalservices);
								partInteger = Math.trunc(n);
								var separate_point = partInteger.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal = totalNotround.toString().split('.');
								if(partDecimal[1] == undefined || partDecimal[1] == 'undefined' || partDecimal[1] == ""){partFinalDecimal = '00';
								}else	if(partDecimal[1].length < 2){partFinalDecimal = partDecimal[1]+'0';
								}else{partFinalDecimal = partDecimal[1];}
								$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);

								// --------------- IMPRIMIR EL TOTAL ENTRE EL IGV
								var n_byIGV = Math.abs(r.received[0].f_totalservicesIGV18);
								var partInteger_byIGV = Math.trunc(n_byIGV);
								var separate_point_byIGV = partInteger_byIGV.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								var part_decimalbyIGV = totalNotRountByIGV.toString().split('.');
								var partFinal_decimal_byIGV = 0;
								if(part_decimalbyIGV[1] == undefined || part_decimalbyIGV[1] == 'undefined' || part_decimalbyIGV[1] == ""){partFinal_decimal_byIGV = '00';
								}else	if(part_decimalbyIGV[1].length < 2){partFinal_decimal_byIGV = part_decimalbyIGV[1]+'0';
								}else{partFinal_decimal_byIGV = part_decimalbyIGV[1];}
								$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separate_point_byIGV},${partFinal_decimal_byIGV} USD</span>`);

								// ---------------- IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV
								var n_ftotal = Math.abs(r.received[0].f_totalwithIGV);
								partInteger_FTotal = Math.trunc(n_ftotal);
								var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal_FTotal = totalNotRoundFinal.toString().split('.');
								if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){partFinalDecimal_FTotal = '00';
								}else	if(partDecimal_FTotal[1].length < 2){partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
								}else{partFinalDecimal_FTotal = partDecimal_FTotal[1];}
								$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

								// --------------- LISTAR DATOS PARA ENVIAR POR WHATSAPP
								var idcodequote = $("#v_gencodexxx").text() + " - " + $("#v_loadtypecharge").val(), 
										typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
										fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
										contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
										valormercanciaFlete = $("#m-second-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
										seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

								var objDataTxtWhatsapp = {
									id: idcodequote,
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

								// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
								$("#d-link-messagecontact").attr("href", 
							`https://api.whatsapp.com/send?phone=51989874368&text=Saludos,%20me%20gustaría%20cotizar%20
								ID:${objDataTxtWhatsapp.id},%20
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
								ImpuestoAprox:%20${twodecimals_FinalTax}`);
							}else{
								Swal.fire({
						      title: 'Error!',
						      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
						      icon: 'error',
						      confirmButtonText: 'Aceptar'
						    });
							}
						}else{
							Swal.fire({
					      title: 'Error!',
					      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
					      icon: 'error',
					      confirmButtonText: 'Aceptar'
					    });
						}
					});
				}else if($("#s_useregin-sistem").val() != "" || $("#s_useregin-sistem").val() != undefined || $("#s_useregin-sistem").val() != 'undefined' || $("#s_useregin-sistem").val() != null || $("#s_useregin-sistem").val() != 'null'){

					var igv_calculate = convert_IGV * sumbyCIF;
					var ipm_calculate = sumbyCIF * convert_IPM;
					var impuestosel_calculate = 0;
					var igvcalc_twodeci = myRound(igv_calculate);
					var ipmcalc_twodeci = myRound(ipm_calculate);
					var percepcion_calculate = (sumbyCIF + igvcalc_twodeci + ipmcalc_twodeci + impuestosel_calculate) * convert_Percepcion;
					var percepcioncalc_twodeci = myRound(percepcion_calculate);

					var formdata = new FormData();
					formdata.append("id_codegenrand", $("#v_idgencoderand").val());
					formdata.append("u_login", $("#s_useregin-sistem").val());
					formdata.append("f_typetransendinitid", transsendinitbyid);
					formdata.append("f_type_op", v_typeserviceinit);
					formdata.append("f_type_transp", v_floadTypeTranport);
					formdata.append("f_type_cont", v_loadtypecharge);
					formdata.append("u_n_document", "No especificado");
					formdata.append("u_enterprise", "No especificado");
					formdata.append("u_telephone", "No especificado");
					formdata.append("u_service", "No especificado");
					formdata.append("u_cont", v_fnamecategprod);
					formdata.append("f_origen", portOriginName);
					formdata.append("f_destiny", portDestinyName);
					formdata.append("f_weight_v", "No especificado");
					formdata.append("f_time_transit", v_ftaproxtransbycont);
					formdata.append("f_fob", totalfinalvaluefob);
					formdata.append("f_flete", totflete);
					formdata.append("f_insurance", totalinsurance);
					formdata.append("f_cif", sumbyCIF);
					formdata.append("f_v_IGV", restaxvalues[0].data_value);
					formdata.append("f_v_IPM", restaxvalues[1].data_value);
					formdata.append("f_v_percepcion", percepcion_notfilter);
					formdata.append("f_IGV", igvcalc_twodeci);
					formdata.append("f_IPM", ipmcalc_twodeci);
					formdata.append("f_percepcion", percepcioncalc_twodeci);
					formdata.append("f_comision_agencia", fvalfinal_com_agencia);
					formdata.append("f_gastos_operativos", fvalfinal_gas_operativos);
					formdata.append("f_totalservices", totalNotround);
					formdata.append("f_totalservicesIGV18", totalNotRountByIGV);
					formdata.append("f_totalimpuestos", twodecimals_FinalTax);
					formdata.append("f_totalwithIGV", totalNotRoundFinal);
					formdata.append("f_validdesde", $("#v_datevaliddesde").val());
					formdata.append("f_validhasta", $("#v_datevalidhasta").val());
					formdata.append("f_transporte_interno", $("#v-plcpickuprateprov").val());

					$.ajax({
						url: 'controllers/prcss_add-quotation-user.php',
						method: 'POST',
						datatype: "JSON",
						data: formdata,
						contentType: false,
			      cache: false,
			      processData: false
					}).done((e) => {
						if(e != ""){
							var r = JSON.parse(e);
							// --------------- TOTALES EN RE-MOSTRADO DE INFORMACÍON...
					  	var partFinalDecimal = 0;
					  	var partFinalDecimal_FTotal = 0;
							if(r.res == "non_existent"){
								// --------------- IMPRIMIR EL CÓDIGO AUTOGENERADO DE LA COTIZACIÓN
						  	$("#v_gencodexxx").text(r.received[0].code_quote);
						  	// --------------- IMPRIMIR LA VALIDEZ DE LA COTIZACIÓN
						  	if(r.received[0].f_validdesde == 0 || r.received[0].f_validhasta == 0 || r.received[0].f_validdesde == "0000-00-00 00:00:00" || r.received[0].f_validhasta == "0000-00-00 00:00:00"){
						  		$("#v_validratedate").text('No especificado');
						  	}else{
							  	var convertOneDATE =  new Date(Date.parse(r.received[0].f_validdesde.replace(/-/g, '/')));
							    var convertTwoDATE =  new Date(Date.parse(r.received[0].f_validhasta.replace(/[-]/g,'/')));
							    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
							    var options = { year: 'numeric', month: 'long', day: 'numeric' };
							    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
							    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
							    var separateDateValidDesde = convertDateValidDesde.split(" ");
							    var separateDateValidHasta = convertDateValidHasta.split(" ");
							    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
							    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);
							    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
							    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
							    $("#v_validratedate").text(val_dateValidDesde+" - "+val_dateValidHasta);
						  	}

						  	// --------------- IMPRIMIR EL TOTAL - SERVICIOS
						  	var n = Math.abs(r.received[0].f_totalservices);
								partInteger = Math.trunc(n);
								var separate_point = partInteger.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal = totalNotround.toString().split('.');
								if(partDecimal[1] == undefined || partDecimal[1] == 'undefined' || partDecimal[1] == ""){partFinalDecimal = '00';
								}else	if(partDecimal[1].length < 2){partFinalDecimal = partDecimal[1]+'0';
								}else{partFinalDecimal = partDecimal[1];}
								$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);

								// --------------- IMPRIMIR EL TOTAL ENTRE EL IGV
								var n_byIGV = Math.abs(r.received[0].f_totalservicesIGV18);
								var partInteger_byIGV = Math.trunc(n_byIGV);
								var separate_point_byIGV = partInteger_byIGV.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								var part_decimalbyIGV = totalNotRountByIGV.toString().split('.');
								var partFinal_decimal_byIGV = 0;
								if(part_decimalbyIGV[1] == undefined || part_decimalbyIGV[1] == 'undefined' || part_decimalbyIGV[1] == ""){partFinal_decimal_byIGV = '00';
								}else	if(part_decimalbyIGV[1].length < 2){partFinal_decimal_byIGV = part_decimalbyIGV[1]+'0';
								}else{partFinal_decimal_byIGV = part_decimalbyIGV[1];}
								$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separate_point_byIGV},${partFinal_decimal_byIGV} USD</span>`);

								// ---------------- IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV
								var n_ftotal = Math.abs(r.received[0].f_totalwithIGV);
								partInteger_FTotal = Math.trunc(n_ftotal);
								var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal_FTotal = totalNotRoundFinal.toString().split('.');
								if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){partFinalDecimal_FTotal = '00';
								}else	if(partDecimal_FTotal[1].length < 2){partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
								}else{partFinalDecimal_FTotal = partDecimal_FTotal[1];}
								$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

								// --------------- LISTAR DATOS PARA ENVIAR POR WHATSAPP
								var idcodequote = $("#v_gencodexxx").text() + " - " + $("#v_loadtypecharge").val(), 
										typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
										fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
										contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
										valormercanciaFlete = $("#m-second-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
										seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

								var objDataTxtWhatsapp = {
									id: idcodequote,
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

								// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
								$("#d-link-messagecontact").attr("href", 
							`https://api.whatsapp.com/send?phone=51989874368&text=Saludos,%20me%20gustaría%20cotizar%20
								ID:${objDataTxtWhatsapp.id},%20
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
								ImpuestoAprox:%20${twodecimals_FinalTax}`);
							}else if(r.res == "already_exists"){
						  	// --------------- IMPRIMIR EL CÓDIGO AUTOGENERADO DE LA COTIZACIÓN
						  	$("#v_gencodexxx").text(r.received[0].code_quote);
						  	// --------------- IMPRIMIR LA VALIDEZ DE LA COTIZACIÓN
						  	if(r.received[0].f_validdesde == 0 || r.received[0].f_validhasta == 0 || r.received[0].f_validdesde == "0000-00-00 00:00:00" || r.received[0].f_validhasta == "0000-00-00 00:00:00"){
						  		$("#v_validratedate").text('No especificado');
						  	}else{
							  	var convertOneDATE =  new Date(Date.parse(r.received[0].f_validdesde.replace(/-/g, '/')));
							    var convertTwoDATE =  new Date(Date.parse(r.received[0].f_validhasta.replace(/[-]/g,'/')));
							    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
							    var options = { year: 'numeric', month: 'long', day: 'numeric' };
							    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
							    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
							    var separateDateValidDesde = convertDateValidDesde.split(" ");
							    var separateDateValidHasta = convertDateValidHasta.split(" ");
							    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
							    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);
							    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
							    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
							    $("#v_validratedate").text(val_dateValidDesde+" - "+val_dateValidHasta);
						  	}

						  	// --------------- IMPRIMIR EL TOTAL - SERVICIOS
						  	var n = Math.abs(r.received[0].f_totalservices);
								partInteger = Math.trunc(n);
								var separate_point = partInteger.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal = totalNotround.toString().split('.');
								if(partDecimal[1] == undefined || partDecimal[1] == 'undefined' || partDecimal[1] == ""){partFinalDecimal = '00';
								}else	if(partDecimal[1].length < 2){partFinalDecimal = partDecimal[1]+'0';
								}else{partFinalDecimal = partDecimal[1];}
								$("#intdecval-quotefinal").html(`<span>${separate_point},<sup>${partFinalDecimal}</sup> USD</span>`);

								// --------------- IMPRIMIR EL TOTAL ENTRE EL IGV
								var n_byIGV = Math.abs(r.received[0].f_totalservicesIGV18);
								var partInteger_byIGV = Math.trunc(n_byIGV);
								var separate_point_byIGV = partInteger_byIGV.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								var part_decimalbyIGV = totalNotRountByIGV.toString().split('.');
								var partFinal_decimal_byIGV = 0;
								if(part_decimalbyIGV[1] == undefined || part_decimalbyIGV[1] == 'undefined' || part_decimalbyIGV[1] == ""){partFinal_decimal_byIGV = '00';
								}else	if(part_decimalbyIGV[1].length < 2){partFinal_decimal_byIGV = part_decimalbyIGV[1]+'0';
								}else{partFinal_decimal_byIGV = part_decimalbyIGV[1];}
								$("#igvval-quotefinal").html(`<span>+ IGV 18% </span><span>${separate_point_byIGV},${partFinal_decimal_byIGV} USD</span>`);

								// ---------------- IMPRIMIR EL ÚLTIMO VALOR - SUMA DEL TOTAL DE FLETE Y EL TOTAL ENTRE EL IGV
								var n_ftotal = Math.abs(r.received[0].f_totalwithIGV);
								partInteger_FTotal = Math.trunc(n_ftotal);
								var separate_point_FTotal = partInteger_FTotal.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
								partDecimal_FTotal = totalNotRoundFinal.toString().split('.');
								if(partDecimal_FTotal[1] == undefined || partDecimal_FTotal[1] == 'undefined' || partDecimal_FTotal[1] == ""){partFinalDecimal_FTotal = '00';
								}else	if(partDecimal_FTotal[1].length < 2){partFinalDecimal_FTotal = partDecimal_FTotal[1]+'0';
								}else{partFinalDecimal_FTotal = partDecimal_FTotal[1];}
								$("#totalval_quoteFinal").html(`<span>${separate_point_FTotal},<sup>${partFinalDecimal_FTotal}</sup> USD</span>`);

								// --------------- LISTAR DATOS PARA ENVIAR POR WHATSAPP
								var idcodequote = $("#v_gencodexxx").text() + " - " + $("#v_loadtypecharge").val(), 
										typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
										fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
										contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
										valormercanciaFlete = $("#m-second-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
										impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
										transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
										seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

								var objDataTxtWhatsapp = {
									id: idcodequote,
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

								// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
								$("#d-link-messagecontact").attr("href", 
							`https://api.whatsapp.com/send?phone=51989874368&text=Saludos,%20me%20gustaría%20cotizar%20
								ID:${objDataTxtWhatsapp.id},%20
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
								ImpuestoAprox:%20${twodecimals_FinalTax}`);
							}else{
								Swal.fire({
						      title: 'Error!',
						      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
						      icon: 'error',
						      confirmButtonText: 'Aceptar'
						    });
							}
						}else{
							Swal.fire({
					      title: 'Error!',
					      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
					      icon: 'error',
					      confirmButtonText: 'Aceptar'
					    });
						}
					});
				}else{
					window.location.href = "marketplace-logistico";
				}
		  });
	  });
  });
  // ------------ VALIDAR SI EXISTE UN USUARIO AL ABRIR EL MODAL - PRIMER BOTÓN 
  $(document).on("click","#btn-requireDownloadQuotaion_one",function(e){
		e.preventDefault();	
		if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){
			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			console.log('Por favor, rellene sus datos.');
		}else if($("#s_useregin-sistem").val() == 'Invitado'){
			$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
				<div class="cont-loader--loader">
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
				</div>
				<p>Validando la información...</p>
			</div>`);
			//VALIDAR LA INFORMACIÓN DEL USUARIO...
			user_sessquote = s_username_local.username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", $("#v_idgencoderand").val());
			formdata.append("code_quote", $("#v_gencodexxx").text());
			formdata.append("u_login", user_sessquote);

			$.ajax({
				url: 'controllers/c_validation_by_idcodegenrand.php',
				method: 'POST',
				datatype: 'JSON',
				data: formdata,
				contentType: false,
        cache: false,
        processData: false
			}).done((e) => {
				if(e != ""){
					var rpdf = JSON.parse(e);
					if(rpdf.res != "notexists"){
						//generatePDF(queryresult.username);
						$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
							<div class="cont-loader--loader">
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
							</div>
							<p>Preparando cotización...</p>
						</div>`);

						$.ajax({
							type: 'POST',
							url: 'controllers/c_generate-pdf-aduanas.php',
							data: {
								id_codegenrand : $("#v_idgencoderand").val(), 
								code_quote : $("#v_gencodexxx").text(),
								u_login : user_sessquote
							},
							xhrFields: {
					      responseType: 'blob' // to avoid binary data being mangled on charset conversion
					    },
					    success: function(blob, status, xhr) {
				        // check for a filename
				        var filename = "";
				        var disposition = xhr.getResponseHeader('Content-Disposition');
				        if (disposition && disposition.indexOf('attachment') !== -1) {
			            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			            var matches = filenameRegex.exec(disposition);
			            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
				        }

				        if (typeof window.navigator.msSaveBlob !== 'undefined') {
			            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
			            window.navigator.msSaveBlob(blob, filename);
				        } else {
			            var URL = window.URL || window.webkitURL;
			            var downloadUrl = URL.createObjectURL(blob);

			            if (filename) {
		                // use HTML5 a[download] attribute to specify filename
		                var a = document.createElement("a");
		                // safari doesn't support this yet
		                if (typeof a.download === 'undefined') {
		                  window.location.href = downloadUrl;
		                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                    $("#cUIMessageValid-user").html("");
		                }
			            } else {
			              window.location.href = downloadUrl;
			            }

			            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
				        }
					    }
						});
					}else if(rpdf.res == "notexists"){
						$("#cUIMessageValid-user").html("");
						$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
						console.log("El usuario aún NO registró sus datos");
					}else{
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
					}
				}else{
					$("#cUIMessageValid-user").html("");
					Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
				}
			});
		}else if($("#s_useregin-sistem").val() != "" || $("#s_useregin-sistem").val() != undefined || $("#s_useregin-sistem").val() != 'undefined' || $("#s_useregin-sistem").val() != null || $("#s_useregin-sistem").val() != 'null' || $("#s_useregin-sistem").val() != 'Invitado'){
			$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
				<div class="cont-loader--loader">
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
				</div>
				<p>Validando la información...</p>
			</div>`);
			//VALIDAR LA INFORMACIÓN DEL USUARIO...
			user_sessquote = s_username_local.username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", $("#v_idgencoderand").val());
			formdata.append("code_quote", $("#v_gencodexxx").text());
			formdata.append("u_login", user_sessquote);

			$.ajax({
				url: 'controllers/c_validation_by_idcodegenrand.php',
				method: 'POST',
				datatype: 'JSON',
				data: formdata,
				contentType: false,
        cache: false,
        processData: false
			}).done((e) => {
				if(e != ""){
					var rpdf = JSON.parse(e);
					if(rpdf.res != "notexists"){
						//generatePDF(queryresult.username);
						$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
							<div class="cont-loader--loader">
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
							</div>
							<p>Preparando cotización...</p>
						</div>`);

						$.ajax({
							type: 'POST',
							url: 'controllers/c_generate-pdf-aduanas.php',
							data: {
								id_codegenrand : $("#v_idgencoderand").val(), 
								code_quote : $("#v_gencodexxx").text(),
								u_login : user_sessquote
							},
							xhrFields: {
					      responseType: 'blob' // to avoid binary data being mangled on charset conversion
					    },
					    success: function(blob, status, xhr) {
				        // check for a filename
				        var filename = "";
				        var disposition = xhr.getResponseHeader('Content-Disposition');
				        if (disposition && disposition.indexOf('attachment') !== -1) {
			            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			            var matches = filenameRegex.exec(disposition);
			            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
				        }

				        if (typeof window.navigator.msSaveBlob !== 'undefined') {
			            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
			            window.navigator.msSaveBlob(blob, filename);
				        } else {
			            var URL = window.URL || window.webkitURL;
			            var downloadUrl = URL.createObjectURL(blob);

			            if (filename) {
		                // use HTML5 a[download] attribute to specify filename
		                var a = document.createElement("a");
		                // safari doesn't support this yet
		                if (typeof a.download === 'undefined') {
		                  window.location.href = downloadUrl;
		                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                    $("#cUIMessageValid-user").html("");
		                }
			            } else {
			              window.location.href = downloadUrl;
			            }

			            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
				        }
					    }
						});
					}else if(rpdf.res == "notexists"){
						$("#cUIMessageValid-user").html("");
						$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
						console.log("El usuario aún NO registró sus datos");
					}else{
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
					}
				}else{
					$("#cUIMessageValid-user").html("");
					Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
				}
			});
		}else{
			$("#cUIMessageValid-user").html("");
			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			Swal.fire({
	      title: 'Error!',
	      html: `<span class='font-w-300'>Lo sentimos, hubo un error al validar la información.</span>`,
	      icon: 'error',
	      confirmButtonText: 'Aceptar'
	    });
		}
	});
	// ------------ VALIDAR SI EXISTE UN USUARIO AL ABRIR EL MODAL - SEGUNDO BOTÓN 
	$(document).on("click","#btn-requireDownloadQuotaion_two",function(e){
		e.preventDefault();
		if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){
			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			console.log('Por favor, rellene sus datos.');
		}else if($("#s_useregin-sistem").val() == "Invitado"){
			$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
				<div class="cont-loader--loader">
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
				</div>
				<p>Validando la información...</p>
			</div>`);
			//VALIDAR LA INFORMACIÓN DEL USUARIO...
			user_sessquote = s_username_local.username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", $("#v_idgencoderand").val());
			formdata.append("code_quote", $("#v_gencodexxx").text());
			formdata.append("u_login", user_sessquote);

			$.ajax({
				url: 'controllers/c_validation_by_idcodegenrand.php',
				method: 'POST',
				datatype: 'JSON',
				data: formdata,
				contentType: false,
        cache: false,
        processData: false
			}).done((e) => {
				if(e != ""){
					var rpdf = JSON.parse(e);
					if(rpdf.res != "notexists"){
						//generatePDF(queryresult.username);
						$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
							<div class="cont-loader--loader">
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
							</div>
							<p>Preparando cotización...</p>
						</div>`);

						$.ajax({
							type: 'POST',
							url: 'controllers/c_generate-pdf-aduanas.php',
							data: {
								id_codegenrand : $("#v_idgencoderand").val(), 
								code_quote : $("#v_gencodexxx").text(),
								u_login : user_sessquote
							},
							xhrFields: {
					      responseType: 'blob' // to avoid binary data being mangled on charset conversion
					    },
					    success: function(blob, status, xhr) {
				        // check for a filename
				        var filename = "";
				        var disposition = xhr.getResponseHeader('Content-Disposition');
				        if (disposition && disposition.indexOf('attachment') !== -1) {
			            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			            var matches = filenameRegex.exec(disposition);
			            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
				        }

				        if (typeof window.navigator.msSaveBlob !== 'undefined') {
			            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
			            window.navigator.msSaveBlob(blob, filename);
				        } else {
			            var URL = window.URL || window.webkitURL;
			            var downloadUrl = URL.createObjectURL(blob);

			            if (filename) {
		                // use HTML5 a[download] attribute to specify filename
		                var a = document.createElement("a");
		                // safari doesn't support this yet
		                if (typeof a.download === 'undefined') {
		                  window.location.href = downloadUrl;
		                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                    $("#cUIMessageValid-user").html("");
		                }
			            } else {
			              window.location.href = downloadUrl;
			            }

			            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
				        }
					    }
						});
					}else if(rpdf.res == "notexists"){
						$("#cUIMessageValid-user").html("");
						$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
						console.log("El usuario aún NO registró sus datos");
					}else{
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
					}
				}else{
					$("#cUIMessageValid-user").html("");
					Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
				}
			});
		}else if($("#s_useregin-sistem").val() != "" || $("#s_useregin-sistem").val() != undefined || $("#s_useregin-sistem").val() != 'undefined' || $("#s_useregin-sistem").val() != null || $("#s_useregin-sistem").val() != 'null'){
			$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
				<div class="cont-loader--loader">
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
				</div>
				<p>Validando la información...</p>
			</div>`);
			//VALIDAR LA INFORMACIÓN DEL USUARIO...
			user_sessquote = s_username_local.username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", $("#v_idgencoderand").val());
			formdata.append("code_quote", $("#v_gencodexxx").text());
			formdata.append("u_login", user_sessquote);

			$.ajax({
				url: 'controllers/c_validation_by_idcodegenrand.php',
				method: 'POST',
				datatype: 'JSON',
				data: formdata,
				contentType: false,
        cache: false,
        processData: false
			}).done((e) => {
				if(e != ""){
					var rpdf = JSON.parse(e);
					if(rpdf.res != "notexists"){
						//generatePDF(queryresult.username);
						$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
							<div class="cont-loader--loader">
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
								<span class="cont-loader--loader--circle"></span>
							</div>
							<p>Preparando cotización...</p>
						</div>`);

						$.ajax({
							type: 'POST',
							url: 'controllers/c_generate-pdf-aduanas.php',
							data: {
								id_codegenrand : $("#v_idgencoderand").val(), 
								code_quote : $("#v_gencodexxx").text(),
								u_login : user_sessquote
							},
							xhrFields: {
					      responseType: 'blob' // to avoid binary data being mangled on charset conversion
					    },
					    success: function(blob, status, xhr) {
				        // check for a filename
				        var filename = "";
				        var disposition = xhr.getResponseHeader('Content-Disposition');
				        if (disposition && disposition.indexOf('attachment') !== -1) {
			            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			            var matches = filenameRegex.exec(disposition);
			            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
				        }

				        if (typeof window.navigator.msSaveBlob !== 'undefined') {
			            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
			            window.navigator.msSaveBlob(blob, filename);
				        } else {
			            var URL = window.URL || window.webkitURL;
			            var downloadUrl = URL.createObjectURL(blob);

			            if (filename) {
		                // use HTML5 a[download] attribute to specify filename
		                var a = document.createElement("a");
		                // safari doesn't support this yet
		                if (typeof a.download === 'undefined') {
		                  window.location.href = downloadUrl;
		                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                    $("#cUIMessageValid-user").html("");
		                }
			            } else {
			              window.location.href = downloadUrl;
			            }

			            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
				        }
					    }
						});
					}else if(rpdf.res == "notexists"){
						$("#cUIMessageValid-user").html("");
						$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
						console.log("El usuario aún NO registró sus datos");
					}else{
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
					}
				}else{
					$("#cUIMessageValid-user").html("");
					Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
				}
			});
		}else{
			$("#cUIMessageValid-user").html("");
			$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
			Swal.fire({
	      title: 'Error!',
	      html: `<span class='font-w-300'>Lo sentimos, hubo un error al validar la información.</span>`,
	      icon: 'error',
	      confirmButtonText: 'Aceptar'
	    });
		}
	});
	// ------------ VALIDAR CUADRO DE TEXTO DE DOCUMENTO DE IDENTIDAD 
	$(document).on("input keyup keypress blur change","#n_document_cli",function(e){
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    return false;
	  }else{
	    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
	      return false;
	    }else{
				if(e.target.value != 0 || e.target.value != ""){
					$("#msg-nounNumberDoc").text("");
				}else{
					$("#msg-nounNumberDoc").text("Ingrese un número de documento");
				}
	    }
	  }
	});
	// ------------ VALIDAR NOMBRE DE LA EMPRESA 
	$(document).on("input keyup keypress blur change","#name_enterprise_cli",function(e){
    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
      return false;
    }else{
			if(e.target.value != 0 || e.target.value != ""){
				$("#msg-nounNameEnterpriseReg").text("");
			}else{
				$("#msg-nounNameEnterpriseReg").text("Debes completar este campo");
			}
    }
	});
	// ------------ VALIDAR NÚMERO DE TELÉFONO 
	$(document).on("input keyup keypress blur change","#telephone_cli",function(e){
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    return false;
	  }else{
	    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
	      return false;
	    }else{
				if(e.target.value != 0 || e.target.value != ""){
					$("#msg-nounNumberorTelephoneNumb").text("");
				}else{
					$("#msg-nounNumberorTelephoneNumb").text("Debes completar este campo");
				}
	    }
	  }
	});
	// ------------ VALIDAR EMAIL DEL 
	$(document).on("input keyup keypress blur change","#email_cli",function(e){
    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
      return false;
    }else{
			if(e.target.value != 0 || e.target.value != ""){
				$("#msg-nounValidEmail").text("");
			}else{
				$("#msg-nounValidEmail").text("Ingrese un correo electrónico");
			}
    }
	});
	// ------------ FORMULARIO DE DATOS DEL USUARIO - ANTES DE DESCARGAR SU COTIZACIÓN 
	$(document).on("submit","#btngen_formDataUserQuotation",function(e){
		e.preventDefault();
		($("#n_document_cli").val() != "" || $("#n_document_cli").val() != 0) ? $("#msg-nounNumberDoc").text("") : $("#msg-nounNumberDoc").text("Ingrese un número de documento");
		($("#msg-nounValidEmail").val() != "" || $("#msg-nounValidEmail").val() != 0) ? $("#msg-nounValidEmail").text("") : $("#msg-nounValidEmail").text("Ingrese un correo electrónico");

		if($("#n_document_cli").val() != "" || $("#n_document_cli").val() != 0 &&	$("#name_enterprise_cli").val() != "" || $("#name_enterprise_cli").val() != 0 && $("#telephone_cli").val() != "" || $("#telephone_cli").val() != 0 && $("#msg-nounValidEmail").val() != "" || $("#msg-nounValidEmail").val() != 0){
			$("#cUIMessageValid-user").html(`<div id="msgAlertpreloader">
				<div class="cont-loader--loader">
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
					<span class="cont-loader--loader--circle"></span>
				</div>
				<p>Procesando...</p>
			</div>`);
			var formdata = new FormData();
			formdata.append("id_gencoderand", $("#v_idgencoderand").val());
			formdata.append("code_quote", $("#v_gencodexxx").text());
			formdata.append("ndoc_cli", $("#n_document_cli").val());
			formdata.append("name_enterprise_cli", $("#name_enterprise_cli").val());
			formdata.append("telephone_cli", $("#telephone_cli").val());
			$.ajax({
				url: 'controllers/prcss_update-quotation-user.php',
				method: 'POST',
				datatype: 'JSON',
				data: formdata,
				contentType: false,
        cache: false,
        processData: false
			}).done((e) => {
				if(e != ""){
					var r = JSON.parse(e);
					if(r.res == "upd_quote"){
						$("#cUIMessageValid-user").html("");
						$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).removeClass("show");
						Swal.fire({
				      title: '',
				      html: `<div class="alertSwal">
					            <div class="alertSwal__cTitle">
					              <h3>¡Éxito!</h3>
					            </div>
					            <div class="alertSwal__cText">
					              <p>Proceda a descargar su cotización.</strong></p>
					            </div>
					            <button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">Aceptar</button>
					          </div>`,
				      icon: 'success',
				      showCancelButton: false,
					    showConfirmButton: false,
					    confirmButtonColor: '#3085d6',
					    confirmButtonText: 'Aceptar',
					    allowOutsideClick: false,
					    allowEscapeKey:false,
					    allowEnterKey:true
				    });
				    $(document).on('click', '.SwalBtn1', function() {
					    swal.clickConfirm();
					  });
						/*
						var formdata = new FormData();
						formdata.append("id_gencoderand", $("#v_idgencoderand").val());
						formdata.append("code_quote", $("#v_gencodexxx").text());
						formdata.append("ndoc_cli", $("#n_document_cli").val());
						formdata.append("name_enterprise_cli", $("#name_enterprise_cli").val());
						formdata.append("telephone_cli", $("#telephone_cli").val());
						formdata.append("email", $("#email_cli").val());

						$.ajax({
							url: 'controllers/c_add_unlogged_user.php',
							method: 'POST',
							datatype: 'JSON',
							data: formdata,
							contentType: false,
			        cache: false,
			        processData: false
						}).done((upd) => {
							if(upd == "true"){
								console.log('Cotización guardada en unlogged');
							}else{
								$("#cUIMessageValid-user").html("");
								Swal.fire({
						      title: 'Error!',
						      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
						      icon: 'error',
						      confirmButtonText: 'Aceptar'
						    });
							}
						});
						*/
					}else if(r.res == "already_update"){
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Atención!',
				      html: `<span class='font-w-300'>Esta cotización ya se actualizó con la información del usuario.</span>`,
				      icon: 'warning',
				      confirmButtonText: 'Aceptar'
				    });
					}else{
						$("#cUIMessageValid-user").html("");
						Swal.fire({
				      title: 'Error!',
				      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
				      icon: 'error',
				      confirmButtonText: 'Aceptar'
				    });
					}
				}else{
					$("#cUIMessageValid-user").html("");
					Swal.fire({
			      title: 'Error!',
			      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
			      icon: 'error',
			      confirmButtonText: 'Aceptar'
			    });
				}
			});
		}else{
			$("#cUIMessageValid-user").html("");
			Swal.fire({
		    title: '',
		    html: `<div class="alertSwal">
		            <div class="alertSwal__cTitle">
		              <h3>¡Atención!</h3>
		            </div>
		            <div class="alertSwal__cText">
		              <p>Debes completar los campos requeridos.</p>
		            </div>
		            <button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">Aceptar</button>
		          </div>`,
		    icon: 'warning',
		    showCancelButton: false,
		    showConfirmButton: false,
		    confirmButtonColor: '#3085d6',
		    confirmButtonText: 'Aceptar',
		    allowOutsideClick: false,
		    allowEscapeKey:false,
		    allowEnterKey:true
		  });
		  $(document).on('click', '.SwalBtn1', function() {
		    swal.clickConfirm();
		  });
		}
	});
});