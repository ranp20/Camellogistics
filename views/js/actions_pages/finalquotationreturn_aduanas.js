// ------------ PREGUNTAR SI DESEA ABANDONAR LA PÁGINA - INPUTS
window.onbeforeunload = function(e){
  e.returnValue = "Es posible que no se guarden los cambios que ha hecho";
};
// ------------ DEJAR EN 2 DECIMALES POR DEFECTO 
function myRound(num, dec){
  var exp = Math.pow(10, dec || 2); // 2 decimales por defecto
  return parseInt(num * exp, 10) / exp;
}
// ------------ FUNCIÓN - LIMITAR A 2 DECIMALES SIN REDONDEO 
function twodecimals(n){
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
// ------------ RETORNAR - PRIMERA LETRA EN MAYÚSCULA 
function firstToUppercase(e){
  return e.charAt(0).toUpperCase() + e.slice(1);
}
// ------------ ENCRIPTAR DATOS DE INPUTS
function encryptValuesIpts(valueipt){
	let ciphertext = CryptoJS.AES.encrypt(valueipt, 'CML_KEYSYSTEM').toString();
	return ciphertext;
}
// ------------ DESENCRIPTAR DATOS DE INPUTS
function decryptValuesIpts(valueipt){
	let bytes  = CryptoJS.AES.decrypt(valueipt, 'CML_KEYSYSTEM');
	let originalText = bytes.toString(CryptoJS.enc.Utf8);
	return originalText;
}
// ------------ CERRAR EL MODAL DE REGISTRO PRE-DESCARGA DE COTIZACIÓN
$(document).on("click", "#btn-closeiconForm", function(){$("#cnt-modalFormLoginyRegister").removeClass("show");});
let containFormDownload = document.querySelector("#cnt-modalFormLoginyRegister");
containFormDownload.addEventListener("click", e => {if(e.target === containFormDownload){containFormDownload.classList.remove("show");};
});
$("#btn-scrollingtTtB").on("click", function(){$("body, html").animate({scrollTop: '1000'}, 350);}); //BOTÓN DE IR HACIA ABAJO
$(document).ready(function(){
	/* ENCRIPTACIÓN DE INPUTS */
	var encrypt_v_idgencoderand = $("#v_idgencoderand").val(encryptValuesIpts($("#v_idgencoderand").val()));
	var encrypt_v_loadtypecharge = $("#v_loadtypecharge").val(encryptValuesIpts($("#v_loadtypecharge").val()));
	var encrypt_portOriginName = $("#v_fportorigname").val(encryptValuesIpts( $("#v_fportorigname").val()));
	var encrypt_portDestinyName = $("#v_fportdestiname").val(encryptValuesIpts( $("#v_fportdestiname").val()));
	var encrypt_v_typeserviceinit = $("#v_typeserviceinit").val(encryptValuesIpts( $("#v_typeserviceinit").val()));
	var encrypt_v_fnamecategprod = $("#v_fnamecategprod").val(encryptValuesIpts( $("#v_fnamecategprod").val()));
	var encrypt_v_freqregsprod = $("#v_freqregsprod").val(encryptValuesIpts($("#v_freqregsprod").val()));
	var encrypt_v_ftaproxtransbycont = $("#v_ftaproxtransbycont").val(encryptValuesIpts( $("#v_ftaproxtransbycont").val()));
	var encrypt_v_floadTypeTranport = $("#v_floadTypeTranport").val(encryptValuesIpts( $("#v_floadTypeTranport").val()));
	var encrypt_val_ftotvalofdownload = $("#v_ftotvalofdownload").val(encryptValuesIpts( $("#v_ftotvalofdownload").val()));
	var encrypt_val_ftotalfleteprod = $("#v_ftotalfleteprod").val(encryptValuesIpts( $("#v_ftotalfleteprod").val()));
	var encrypt_val_ftotalvalfobprod = $("#v_ftotvalProdquot").val(encryptValuesIpts( $("#v_ftotvalProdquot").val()));
	var encrypt_val_plcpickuprateprov = $("#v-plcpickuprateprov").val(encryptValuesIpts($("#v-plcpickuprateprov").val()));
	var encrypt_v_validdesde = $("#v_datevaliddesde").val(encryptValuesIpts($("#v_datevaliddesde").val()));
	var encrypt_v_validhasta = $("#v_datevalidhasta").val(encryptValuesIpts($("#v_datevalidhasta").val()));
	var encrypt_v_freqinsusel = $("#v_freqinsusel").val(encryptValuesIpts($("#v_freqinsusel").val()));
	var encrypt_v_frqexplinsur = $("#v_frqexplinsur").val(encryptValuesIpts($("#v_frqexplinsur").val()));
	var encrypt_v_fprevimports = $("#v_fprevimports").val(encryptValuesIpts($("#v_fprevimports").val()));
	var encrypt_v_floadtypeope = $("#v_floadtypeope").val(encryptValuesIpts($("#v_floadtypeope").val()));
	var encrypt_v_fpckgcontquant = $("#v_fpckgcontquant").val(encryptValuesIpts($("#v_fpckgcontquant").val()));
	var encrypt_v_ftcomparweacbm = $("#v_ftcomparweacbm").val(encryptValuesIpts($("#v_ftcomparweacbm").val()));
	var encrypt_v_fplctopckloc = $("#v_fplctopckloc").val(encryptValuesIpts($("#v_fplctopckloc").val()));
	var encrypt_v_frselinsmerch = $("#v_frselinsmerch").val(encryptValuesIpts($("#v_frselinsmerch").val()));
	var encrypt_v_foptgnfquotevl = $("#v_foptgnfquotevl").val(encryptValuesIpts($("#v_foptgnfquotevl").val()));
	var encrypt_v_fquaprcataadd = $("#v_fquaprcataadd").val(encryptValuesIpts($("#v_fquaprcataadd").val()));
	var encrypt_v_fatthxyaonepcatg = $("#v_fatthxyaonepcatg").val(encryptValuesIpts($("#v_fatthxyaonepcatg").val()));
	var encrypt_v_fatthxyatwopcatg = $("#v_fatthxyatwopcatg").val(encryptValuesIpts($("#v_fatthxyatwopcatg").val()));
	var encrypt_v_fatthxyathreepcatg = $("#v_fatthxyathreepcatg").val(encryptValuesIpts($("#v_fatthxyathreepcatg").val()));
	var encrypt_v_fficycertminpcatg = $("#v_fficycertminpcatg").val(encryptValuesIpts($("#v_fficycertminpcatg").val()));
	var encrypt_v_fficycertmaxpcatg = $("#v_fficycertmaxpcatg").val(encryptValuesIpts($("#v_fficycertmaxpcatg").val()));
	var encrypt_v_fficycertquantpcatg = $("#v_fficycertquantpcatg").val(encryptValuesIpts($("#v_fficycertquantpcatg").val()));
	var encrypt_v_fficycertvloprtnpcatg = $("#v_fficycertvloprtnpcatg").val(encryptValuesIpts($("#v_fficycertvloprtnpcatg").val()));
	/* DESENCRIPTACIÓN DE INPUTS */
	// ------------ VALORES DE CAJAS DE TEXTO - TEXTO
	var v_idgencoderand = decryptValuesIpts(encrypt_v_idgencoderand.val());
	var v_loadtypecharge = decryptValuesIpts(encrypt_v_loadtypecharge.val());
	var portOriginName = decryptValuesIpts(encrypt_portOriginName.val());
	var portDestinyName = decryptValuesIpts(encrypt_portDestinyName.val());
	var v_typeserviceinit = decryptValuesIpts(encrypt_v_typeserviceinit.val()); // TIPO DE SERVICIO
	var v_fnamecategprod = decryptValuesIpts(encrypt_v_fnamecategprod.val()); // NOMBRE DEL PRODUCTO
	var v_freqregsprod = decryptValuesIpts(encrypt_v_freqregsprod.val()); // REGULADORES DEL PRODUCTO
	var v_ftaproxtransbycont = decryptValuesIpts(encrypt_v_ftaproxtransbycont.val()); // TIEMPO DE TRÁNSITO
	var v_floadTypeTranport = decryptValuesIpts(encrypt_v_floadTypeTranport.val()); // TIPO DE TRANSPORTE
	var v_validdesde = decryptValuesIpts(encrypt_v_validdesde.val());
	var v_validhasta = decryptValuesIpts(encrypt_v_validhasta.val());
	var v_freqinsusel = decryptValuesIpts(encrypt_v_freqinsusel.val());
	var v_frqexplinsur = decryptValuesIpts(encrypt_v_frqexplinsur.val()); // SEGURO EXPLÍCITO
	var v_fprevimports = decryptValuesIpts(encrypt_v_fprevimports.val());
	var v_floadtypeope = decryptValuesIpts(encrypt_v_floadtypeope.val());
	var v_fpckgcontquant = decryptValuesIpts(encrypt_v_fpckgcontquant.val()); // CANTIDAD DE CONTENEDORES/CANTIDAD DE BULTOS
	var v_ftcomparweacbm = decryptValuesIpts(encrypt_v_ftcomparweacbm.val());
	var v_fplctopckloc = decryptValuesIpts(encrypt_v_fplctopckloc.val()); // TRANSPORTE A DISTRITO
	var v_frselinsmerch = decryptValuesIpts(encrypt_v_frselinsmerch.val());
	var v_foptgnfquotevl = decryptValuesIpts(encrypt_v_foptgnfquotevl.val());
	var v_fquaprcataadd = decryptValuesIpts(encrypt_v_fquaprcataadd.val()); // CANTIDAD DE PRODUCTOS X CANTIDAD
	var v_fatthxyaonepcatg = decryptValuesIpts(encrypt_v_fatthxyaonepcatg.val()); // AD-VALOREN
	var v_fatthxyatwopcatg = decryptValuesIpts(encrypt_v_fatthxyatwopcatg.val()); // IMPUESTO SELECTIVO
	var v_fatthxyathreepcatg = decryptValuesIpts(encrypt_v_fatthxyathreepcatg.val()); // ANTIDUMPING
	var v_fficycertminpcatg = decryptValuesIpts(encrypt_v_fficycertminpcatg.val()); // VALOR MENOR A X CANTIDAD (CERTIFICADO DE CONFOMIDAD)
	var v_fficycertmaxpcatg = decryptValuesIpts(encrypt_v_fficycertmaxpcatg.val()); // VALOR MAYOR A X CANTIDAD (CERTIFICADO DE CONFOMIDAD)
	var v_fficycertquantpcatg = decryptValuesIpts(encrypt_v_fficycertquantpcatg.val()); // CANTIDAD X (CERTIFICADO DE CONFOMIDAD)
	var v_fficycertvloprtnpcatg = decryptValuesIpts(encrypt_v_fficycertvloprtnpcatg.val()); // VALOR ASIGNADO VALIDADO X CANTIDAD
	// ------------ VALORES DE CAJAS DE TEXTO - CÁLCULO
	var val_ftotvalofdownload = decryptValuesIpts(encrypt_val_ftotvalofdownload.val());
	var val_ftotalfleteprod = decryptValuesIpts(encrypt_val_ftotalfleteprod.val()); // FLETE
	var val_ftotalvalfobprod = decryptValuesIpts(encrypt_val_ftotalvalfobprod.val()); // VALOR FOB
	var val_plcpickuprateprov = decryptValuesIpts(encrypt_val_plcpickuprateprov.val()); // TRANSPORTE INTERNO
	// ------------ ENCRIPTACIÓN DE INFO. DE USUARIO
	var encrypt_sessuser_username = $("#s_useregin-sistem").val(encryptValuesIpts($("#s_useregin-sistem").val()));
	// ------------ DESENCRIPTACIÓN DE INFO. DE USUARIO
	var decrypt_sessuser_username = decryptValuesIpts(encrypt_sessuser_username.val());
	// ------------ VALIDAR SI EXISTE UN USUARIO, DE LO CONTRARIO ASIGNAR EL USUARIO POR DEFECTO 
	if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){
		let sessval_loginuser = { username: 'Invitado' };
		let obj_sessval_loginuser = JSON.stringify(sessval_loginuser);
    let encrypt_sessval_loginuser = encryptValuesIpts(obj_sessval_loginuser);
    sessionStorage.setItem("sess_usercli", encrypt_sessval_loginuser);
    sessionStorage.setItem("sess_valuser", 0);
    let get_username_local = sessionStorage.getItem("sess_usercli");
    // ------------ DESENCRIPTACIÓN DE INFO. DE USUARIO
		let decrypt_sess_userinfo = JSON.parse(decryptValuesIpts(get_username_local));
		let decrypt_sess_userinfo_username = decryptValuesIpts(decrypt_sess_userinfo.username);
		// ------------ ACTUALIZAR EL HEADER TOP 
		$("#s-loginsessuser-active").html(`
		<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
      <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${decrypt_sess_userinfo_username}</span>
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
			data: { 'u-username' : decrypt_sess_userinfo_username, 'u-typeorder' : sessionStorage.getItem("sess_valuser")}
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
		let sessval_loginuser = { username: $("#s_useregin-sistem").val() };
		let obj_sessval_loginuser = JSON.stringify(sessval_loginuser);
    let encrypt_sessval_loginuser = encryptValuesIpts(obj_sessval_loginuser);
    sessionStorage.setItem("sess_usercli", encrypt_sessval_loginuser);
    sessionStorage.setItem("sess_valuser", 1);
    let get_username_local = sessionStorage.getItem("sess_usercli");
    // ------------ DESENCRIPTACIÓN DE INFO. DE USUARIO
		let decrypt_sess_userinfo = JSON.parse(decryptValuesIpts(get_username_local));
		let decrypt_sess_userinfo_username = decryptValuesIpts(decrypt_sess_userinfo.username);
		// ------------ ACTUALIZAR EL HEADER TOP 
		$("#s-loginsessuser-active").html(`
		<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
      <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${decrypt_sess_userinfo_username}</span>
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
	// ------------ CÁLCULOS DE SEGURO
	var initvalinsurance = 0;
	var finalinsurance = 0;
	var finalRoundinsurance = 0;
	var final_expinsure = "";
	// ------------ CÁLCULO DE IMPUESTOS 
	var partInteger_Tax = 0;
	var partDecimal_Tax = 0;
	var partFinalDecimal_Tax = 0;
	// ------------ CÁLCULO SERVICIOS IGV 18%
	var fval_com_agencia = 0;
	var fvalfinal_com_agencia = 0;
	var fvalfinal_gas_operativos = 0;
	var val_defaultmin = 0;
	// ------------ VARIABLES PARA LOS TOTALES A IMPRIMIR 
	var sumTotalServices = 0;
	var sumTotalbyIGV = 0;
	var sumTotalFinalFleteandIGV = 0;
	var sumbyCIF = 0;
	var final_sumCIF = 0;
	// ------------ LISTAR LOS VALORES PARA LOS CÁLCULOS 
	var partInteger = 0;
	var partDecimal = 0;
	var partFinalDecimal = 0;
	var receivedAd_valoren = parseFloat(v_fatthxyaonepcatg); //AD-VALOREN
	var receivedI_selectivo = parseFloat(v_fatthxyatwopcatg); //IMPUESTO SELECTIVO
	var received_antidumping = parseFloat(v_fatthxyathreepcatg); //ANTIDUMPING
	var receivedfob = val_ftotalvalfobprod; //VALOR FOB
	var receiveddownload = val_ftotvalofdownload; //VALOR DE DESCARGA
	var cutefobofpriceusd = receivedfob.split(" USD");
  var cutewithoutofpricefob = cutefobofpriceusd[0].replace(/\./g, '');
	var totaltransport = parseFloat(val_plcpickuprateprov); //TOTAL TRANSPORTE
	var totalimportprev = v_fprevimports; // IMPORTACIÓN PREVIA
	var totflete = parseFloat(val_ftotalfleteprod); //TOTAL - SOLO FLETE
  var totalfinalvaluefob = parseFloat(twodecimals(cutewithoutofpricefob)); //TOTAL DE VALOR FOB
  var totalfinalvaluedownload = parseFloat(twodecimals(receiveddownload)); //TOTAL DE VALOR DE DESCARGA
	var totalftecycertconform = parseFloat(v_fficycertvloprtnpcatg); // VALOR DE REFERENCIA FICHA T. Y CERTIFICADO DE CONFORMIDAD
  var totalfirstoperfycert = totalftecycertconform * parseInt(v_fquaprcataadd); // TOTAL FICHA T. Y CERTIFICADO DE CONFORMIDAD
  // ------------ VALORES DE TEXTO
  var txt_quantityprod = "";
	// ------------ LISTAR LOS VALORES DE SEGURO
	$.ajax({
    url: "controllers/list_insurancevalues.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
  	var r = JSON.parse(e);
  	var insure_min25000 = parseFloat(r[0].data_value); //FOB MENOR A 25000
  	var insure_max25000 = parseFloat(r[1].data_value); //FOB MAYOR A 25000
  	var insure_default = parseFloat(r[2].data_value); //SIN FOB/VALOR POR DEFECTO
  	var insureconvert_max25000 = insure_max25000 / 100;
  	var insureconvert_default = insure_default / 100;
    
  	// ------------ LISTAR EL VALOR FIJO DEL FOB
  	$.ajax({
	    url: "controllers/list_merchandisevalues.php",
	    method: "POST",
	    datatype: "JSON",
	    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
	  }).done((e) => {
	  	if(e != ""){
	  		var r = JSON.parse(e);
	  		var merchandiseValFixed = parseFloat(r[0].data_value); // VALOR FIJO (FOB)

	  		// VALIDACIÓN SEGURO EXPLÍCITO
	  		if(v_freqinsusel == "SI" && v_frqexplinsur != 0 && v_frqexplinsur > 0){
	  			final_expinsure = "SI";
	  			finalRoundinsurance = parseFloat(twodecimals(v_frqexplinsur));
	  		}else{
	  			final_expinsure = "NO";
		  		if(totalfinalvaluefob > merchandiseValFixed){
			      finalinsurance = totalfinalvaluefob * insureconvert_default; //ES MAYOR A (FOB)
			      initvalinsurance = insure_default;
			      finalRoundinsurance = myRound(finalinsurance);
			    }else{
			      finalinsurance = totalfinalvaluefob * insureconvert_default; //ES MENOR A (FOB)
			      initvalinsurance = insure_default;
			      finalRoundinsurance = myRound(finalinsurance);
			    }
	  		}

		    // VALOR TOTAL - CIF
		  	sumbyCIF = totalfinalvaluefob + totflete + finalRoundinsurance; //CIF FINAL
		  	final_sumCIF = parseFloat(twodecimals(sumbyCIF));

		  	$.ajax({
			    url: "controllers/c_list_validation_comisionagencia.php",
			    method: "POST",
			    datatype: "JSON",
			    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
			  }).done((e) => {
			  	if(e != "" && e != "[]"){
			  		var rcomagencia = JSON.parse(e);
			  		var comagencia_monto = parseFloat(rcomagencia[0].com_agencia_ammnt_value);
			  		var comagencia_porcentaje = parseFloat(rcomagencia[0].com_agencia_ammnt_percent);
			  		var comagencia_porcentaje_cvrt = comagencia_porcentaje / 100;
			  		val_defaultmin = comagencia_porcentaje_cvrt;

			  		// ------------ LISTAR SERVICIOS PARA CALCULO CON IGV 18% - FCL y LCL 
					  $.ajax({
					    url: "controllers/list_quotation_values_calcservs_fcl_and_lcl-aduanas.php",
					    method: "POST",
					    datatype: "JSON",
					    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
					  }).done((e) => {
					  	var rqfclandlcl = JSON.parse(e);
					  	var com_agencia_fcl = parseFloat(rqfclandlcl[0].com_agencia_fcl);
					  	var com_agencia_lcl = parseFloat(rqfclandlcl[0].com_agencia_lcl);
					  	var gas_operativos_fcl = parseFloat(rqfclandlcl[0].gas_operativos_fcl);
					  	var gas_operativos_lcl = parseFloat(rqfclandlcl[0].gas_operativos_lcl);

					  	if(v_loadtypecharge == "FCL"){
					  		fvalfinal_gas_operativos = gas_operativos_fcl;
					  		if(final_sumCIF > comagencia_monto){
					  			fval_com_agencia = final_sumCIF * val_defaultmin;
					  			fvalfinal_com_agencia = myRound(fval_com_agencia);
					  		}else{
					  			fvalfinal_com_agencia = com_agencia_fcl;
					  		}
					  		// SUMAR TODOS LOS SERVICIOS - FCL
			  	 			var totalServiciosTODOS = fvalfinal_com_agencia+fvalfinal_gas_operativos+totalfirstoperfycert;
			  	 			sumTotalServices = totaltransport + totalServiciosTODOS; // VALOR TOTAL - SERVICIOS
			  	 			sumTotalbyIGV = (totaltransport + totalServiciosTODOS) * (18 / 100); // VALOR TOTAL - SERVICIOS + IGV 18%
			  	 			sumTotalFinalFleteandIGV = sumTotalServices + sumTotalbyIGV; // VALOR TOTAL FINAL DE LA COTIZACIÓN
					  	}else if(v_loadtypecharge == "LCL"){
					  		fvalfinal_gas_operativos = gas_operativos_lcl;
					  		if(final_sumCIF > comagencia_monto){
					  			fval_com_agencia = final_sumCIF * val_defaultmin;
					  			fvalfinal_com_agencia = myRound(fval_com_agencia);
					  		}else{
					  			fvalfinal_com_agencia = com_agencia_fcl;
					  		}
					  		// SUMAR TODOS LOS SERVICIOS - LCL
			  	 			var totalServiciosTODOS = fvalfinal_com_agencia+fvalfinal_gas_operativos+totalfirstoperfycert;
			  	 			sumTotalServices = totaltransport + totalServiciosTODOS; // VALOR TOTAL - SERVICIOS
			  	 			sumTotalbyIGV = (totaltransport + totalServiciosTODOS) * (18 / 100); // VALOR TOTAL - SERVICIOS + IGV 18%
			  	 			sumTotalFinalFleteandIGV = sumTotalServices + sumTotalbyIGV; // VALOR TOTAL FINAL DE LA COTIZACIÓN
					  	}else{
					  		console.log('Lo sentimos, hubo un error al procesar la información.');
					  	}

							// ------------ LIMPIAR EL VALOR E IMPRIMIR EN EL TOTAL DEL SERVICIOS 
							var totalNotround = twodecimals(sumTotalServices);
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
						    
						    if(totalimportprev == "SI" || totalimportprev == "SÍ"){
							    convert_Percepcion = res_Percepcion_YES / 100; /// 3.50
							    percepcion_notfilter = restaxvalues[2].data_value;
						    }else if(totalimportprev == "NO"){
									convert_Percepcion = res_Percepcion_NO / 100;///10
						    	percepcion_notfilter = restaxvalues[2].data_value_two;
						    }else{
						    	percepcion_notfilter = 0;
						    }

						    // ------------ CALCULAR AD-VALOREN 
						    var val_Ad_valoren = final_sumCIF * convert_Ad_Valoren;
						    var twodecimal_Ad_valoren = twodecimals(val_Ad_valoren);
						    var finalval_Ad_valoren = parseFloat(twodecimal_Ad_valoren);
								// ------------ CALCULAR IMPUESTO SELECTIVO 
								var val_i_selectivo = final_sumCIF * convert_I_selectivo;
								var twodecimal_i_selectivo = twodecimals(val_i_selectivo);
								var finalval_i_selectivo = parseFloat(twodecimal_i_selectivo);
								// ------------ CALCULAR ANTIDUMPING 
								var val_antidumping = final_sumCIF * convert_antidumping;
								var twodecimal_antidumping = twodecimals(val_antidumping);
								var finalval_antidumping = parseFloat(twodecimal_antidumping);
						    // ------------ CALCULAR IGV 
								var val_IGV = ( final_sumCIF + finalval_Ad_valoren ) * convert_IGV;
								var twodecimal_IGV = twodecimals(val_IGV);
								var finalval_IGV = parseFloat(twodecimal_IGV);
								// ------------ CALCULAR IPM 
								var val_IPM = ( final_sumCIF + finalval_Ad_valoren) * convert_IPM;
								var twodecimal_IPM = twodecimals(val_IPM);
								var finalval_IPM = parseFloat(twodecimal_IPM);
								// ------------ CALCULAR PERCEPCIÓN 
								var val_Percepcion = ( final_sumCIF + finalval_Ad_valoren + finalval_IGV + finalval_IPM ) * convert_Percepcion;
								var twodecimal_percepcion = twodecimals(val_Percepcion);
								var finalval_percepcion = parseFloat(twodecimal_percepcion);

								// ------------ CALCULO FINAL DE IMPUESTOS 
								var val_FinalTax = finalval_IGV + finalval_IPM + finalval_percepcion + finalval_Ad_valoren + finalval_i_selectivo + finalval_antidumping;

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
						  	// ------------ VALIDAR EL VALOR DEL USUARIO 
								var user_sessquote = "";
								
								// ------------ INSERTAR EN LA TABLA DE COTIZACIONES 
								if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null || $("#s_useregin-sistem").val() == 'null'){

									user_sessquote = decrypt_sessuser_username;

									var formdata = new FormData();
									formdata.append("id_codegenrand", v_idgencoderand);
									formdata.append("u_login", user_sessquote);
									formdata.append("f_typetransendinitid", transsendinitbyid);
									formdata.append("f_type_op", v_floadtypeope);
									formdata.append("f_type_serv", v_typeserviceinit);
									formdata.append("f_type_transp", v_floadTypeTranport);
									formdata.append("f_type_cont", v_loadtypecharge);
									formdata.append("f_optgenfquot", v_foptgnfquotevl);
									formdata.append("f_expinsurance", final_expinsure);
									formdata.append("u_n_document", "No especificado");
									formdata.append("u_enterprise", "No especificado");
									formdata.append("u_telephone", "No especificado");
									formdata.append("u_service", "No especificado");
									formdata.append("u_cont", v_fnamecategprod);
									formdata.append("u_regs", v_freqregsprod);
									formdata.append("f_origen", portOriginName);
									formdata.append("f_destiny", portDestinyName);
									formdata.append("f_desc_w_v", v_fpckgcontquant);
									formdata.append("f_weight_v", v_ftcomparweacbm);
									formdata.append("f_quantity_prod", v_fquaprcataadd);
									formdata.append("f_translocation", v_fplctopckloc);
									formdata.append("f_time_transit", v_ftaproxtransbycont);
									formdata.append("f_fob", totalfinalvaluefob);
									formdata.append("f_flete", totflete);
									formdata.append("f_insurance", initvalinsurance);
									formdata.append("f_cif", final_sumCIF);
									formdata.append("f_v_IGV", restaxvalues[0].data_value);
									formdata.append("f_v_IPM", restaxvalues[1].data_value);
									formdata.append("f_importadoprev", v_fprevimports);
									formdata.append("f_v_percepcion", percepcion_notfilter);
									formdata.append("f_v_ad_valoren", v_fatthxyaonepcatg);
									formdata.append("f_v_impuesto_selectivo", v_fatthxyatwopcatg);
									formdata.append("f_v_antidumping", v_fatthxyathreepcatg);
									formdata.append("f_v_amm_comagency", comagencia_monto);
									formdata.append("f_v_percent_comagency", comagencia_porcentaje);
									formdata.append("f_IGV", finalval_IGV);
									formdata.append("f_IPM", finalval_IPM);
									formdata.append("f_percepcion", finalval_percepcion);
									formdata.append("f_ad_valoren", finalval_Ad_valoren);
									formdata.append("f_impuesto_selectivo", finalval_i_selectivo);
									formdata.append("f_antidumping", finalval_antidumping);
									formdata.append("f_transporte_interno", totaltransport);
									formdata.append("f_comision_agencia", fvalfinal_com_agencia);
									formdata.append("f_gastos_operativos", fvalfinal_gas_operativos);
									formdata.append("f_fichatecnicaycertconform", totalftecycertconform);
									formdata.append("f_totalinsurance", finalRoundinsurance);
									formdata.append("f_totalfichatecycertiform", totalfirstoperfycert);
									formdata.append("f_totalservices", totalNotround);
									formdata.append("f_totalservicesIGV18", totalNotRountByIGV);
									formdata.append("f_totalimpuestos", twodecimals_FinalTax);
									formdata.append("f_totalwithIGV", totalNotRoundFinal);
									formdata.append("f_validdesde", v_validdesde);
									formdata.append("f_validhasta", v_validhasta);

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
												if(v_fquaprcataadd != "" && v_fquaprcataadd != 0){
													if(parseInt(v_fquaprcataadd) > 1){
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDADES";
													}else{
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDAD";
													}
												}else{
													txt_quantityprod = "";
												}

												var objDataTxtWhatsapp = {
													id: $("#v_gencodexxx").text() + " - " + v_loadtypecharge,
													typeservice : v_typeserviceinit.toUpperCase(),
													tcontainer : v_floadTypeTranport.toUpperCase(),
													containtflete : v_fpckgcontquant,
													quantityprod: txt_quantityprod,
													tservices: totalNotround,
													tfob: totalfinalvaluefob,
													tranportflete : v_fplctopckloc
												}

												// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
												var wlinebreak = "%0D%0A";
												var whatsappMessage = `Saludos,%20me%20gustaría%20cotizar:${wlinebreak}
												--------------------------------------${wlinebreak}
												ID:%20${objDataTxtWhatsapp.id}${wlinebreak}
												Tipo%20Flete:%20${objDataTxtWhatsapp.typeservice}${wlinebreak}
												Tipo%20Contenedor:%20${objDataTxtWhatsapp.tcontainer}${wlinebreak}
												Contenido%20Flete:%20${objDataTxtWhatsapp.containtflete}${objDataTxtWhatsapp.quantityprod}${wlinebreak}
												Valor%20Flete:%20${objDataTxtWhatsapp.tservices}${wlinebreak}
												Gastos:%20${objDataTxtWhatsapp.tfob}${wlinebreak}
												Transporte:%20${objDataTxtWhatsapp.tranportflete}${wlinebreak}
												Impuestos Aproximados:%20${twodecimals_FinalTax}`;
												// whatsappMessage = window.encodeURIComponent(whatsappMessage);
												$("#d-link-messagecontact").attr("href", `https://api.whatsapp.com/send?phone=51989874368&text=${whatsappMessage}`);
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
												if(v_fquaprcataadd != "" && v_fquaprcataadd != 0){
													if(parseInt(v_fquaprcataadd) > 1){
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDADES";
													}else{
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDAD";
													}
												}else{
													txt_quantityprod = "";
												}

												var objDataTxtWhatsapp = {
													id: $("#v_gencodexxx").text() + " - " + v_loadtypecharge,
													typeservice : v_typeserviceinit.toUpperCase(),
													tcontainer : v_floadTypeTranport.toUpperCase(),
													containtflete : v_fpckgcontquant,
													quantityprod: txt_quantityprod,
													tservices: totalNotround,
													tfob: totalfinalvaluefob,
													tranportflete : v_fplctopckloc
												}

												// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
												var wlinebreak = "%0D%0A";
												var whatsappMessage = `Saludos,%20me%20gustaría%20cotizar:${wlinebreak}
												--------------------------------------${wlinebreak}
												ID:%20${objDataTxtWhatsapp.id}${wlinebreak}
												Tipo%20Flete:%20${objDataTxtWhatsapp.typeservice}${wlinebreak}
												Tipo%20Contenedor:%20${objDataTxtWhatsapp.tcontainer}${wlinebreak}
												Contenido%20Flete:%20${objDataTxtWhatsapp.containtflete}${objDataTxtWhatsapp.quantityprod}${wlinebreak}
												Valor%20Flete:%20${objDataTxtWhatsapp.tservices}${wlinebreak}
												Gastos:%20${objDataTxtWhatsapp.tfob}${wlinebreak}
												Transporte:%20${objDataTxtWhatsapp.tranportflete}${wlinebreak}
												Impuestos Aproximados:%20${twodecimals_FinalTax}`;
												// whatsappMessage = window.encodeURIComponent(whatsappMessage);
												$("#d-link-messagecontact").attr("href", `https://api.whatsapp.com/send?phone=51989874368&text=${whatsappMessage}`);
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

									user_sessquote = decrypt_sessuser_username;

									var formdata = new FormData();
									formdata.append("id_codegenrand", v_idgencoderand);
									formdata.append("u_login", user_sessquote);
									formdata.append("f_typetransendinitid", transsendinitbyid);
									formdata.append("f_type_op", v_floadtypeope);
									formdata.append("f_type_serv", v_typeserviceinit);
									formdata.append("f_type_transp", v_floadTypeTranport);
									formdata.append("f_type_cont", v_loadtypecharge);
									formdata.append("f_optgenfquot", v_foptgnfquotevl);
									formdata.append("f_expinsurance", final_expinsure);
									formdata.append("u_n_document", "No especificado");
									formdata.append("u_enterprise", "No especificado");
									formdata.append("u_telephone", "No especificado");
									formdata.append("u_service", "No especificado");
									formdata.append("u_cont", v_fnamecategprod);
									formdata.append("u_regs", v_freqregsprod);
									formdata.append("f_origen", portOriginName);
									formdata.append("f_destiny", portDestinyName);
									formdata.append("f_desc_w_v", v_fpckgcontquant);
									formdata.append("f_weight_v", v_ftcomparweacbm);
									formdata.append("f_quantity_prod", v_fquaprcataadd);
									formdata.append("f_translocation", v_fplctopckloc);
									formdata.append("f_time_transit", v_ftaproxtransbycont);
									formdata.append("f_fob", totalfinalvaluefob);
									formdata.append("f_flete", totflete);
									formdata.append("f_insurance", initvalinsurance);
									formdata.append("f_cif", final_sumCIF);
									formdata.append("f_v_IGV", restaxvalues[0].data_value);
									formdata.append("f_v_IPM", restaxvalues[1].data_value);
									formdata.append("f_importadoprev", v_fprevimports);
									formdata.append("f_v_percepcion", percepcion_notfilter);
									formdata.append("f_v_ad_valoren", v_fatthxyaonepcatg);
									formdata.append("f_v_impuesto_selectivo", v_fatthxyatwopcatg);
									formdata.append("f_v_antidumping", v_fatthxyathreepcatg);
									formdata.append("f_v_amm_comagency", comagencia_monto);
									formdata.append("f_v_percent_comagency", comagencia_porcentaje);
									formdata.append("f_IGV", finalval_IGV);
									formdata.append("f_IPM", finalval_IPM);
									formdata.append("f_percepcion", finalval_percepcion);
									formdata.append("f_ad_valoren", finalval_Ad_valoren);
									formdata.append("f_impuesto_selectivo", finalval_i_selectivo);
									formdata.append("f_antidumping", finalval_antidumping);
									formdata.append("f_transporte_interno", totaltransport);
									formdata.append("f_comision_agencia", fvalfinal_com_agencia);
									formdata.append("f_gastos_operativos", fvalfinal_gas_operativos);
									formdata.append("f_fichatecnicaycertconform", totalftecycertconform);
									formdata.append("f_totalinsurance", finalRoundinsurance);
									formdata.append("f_totalfichatecycertiform", totalfirstoperfycert);
									formdata.append("f_totalservices", totalNotround);
									formdata.append("f_totalservicesIGV18", totalNotRountByIGV);
									formdata.append("f_totalimpuestos", twodecimals_FinalTax);
									formdata.append("f_totalwithIGV", totalNotRoundFinal);
									formdata.append("f_validdesde", v_validdesde);
									formdata.append("f_validhasta", v_validhasta);

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
												if(v_fquaprcataadd != "" && v_fquaprcataadd != 0){
													if(parseInt(v_fquaprcataadd) > 1){
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDADES";
													}else{
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDAD";
													}
												}else{
													txt_quantityprod = "";
												}

												var objDataTxtWhatsapp = {
													id: $("#v_gencodexxx").text() + " - " + v_loadtypecharge,
													typeservice : v_typeserviceinit.toUpperCase(),
													tcontainer : v_floadTypeTranport.toUpperCase(),
													containtflete : v_fpckgcontquant,
													quantityprod: txt_quantityprod,
													tservices: totalNotround,
													tfob: totalfinalvaluefob,
													tranportflete : v_fplctopckloc
												}

												// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
												var wlinebreak = "%0D%0A";
												var whatsappMessage = `Saludos,%20me%20gustaría%20cotizar:${wlinebreak}
												--------------------------------------${wlinebreak}
												ID:%20${objDataTxtWhatsapp.id}${wlinebreak}
												Tipo%20Flete:%20${objDataTxtWhatsapp.typeservice}${wlinebreak}
												Tipo%20Contenedor:%20${objDataTxtWhatsapp.tcontainer}${wlinebreak}
												Contenido%20Flete:%20${objDataTxtWhatsapp.containtflete}${objDataTxtWhatsapp.quantityprod}${wlinebreak}
												Valor%20Flete:%20${objDataTxtWhatsapp.tservices}${wlinebreak}
												Gastos:%20${objDataTxtWhatsapp.tfob}${wlinebreak}
												Transporte:%20${objDataTxtWhatsapp.tranportflete}${wlinebreak}
												Impuestos Aproximados:%20${twodecimals_FinalTax}`;
												// whatsappMessage = window.encodeURIComponent(whatsappMessage);
												$("#d-link-messagecontact").attr("href", `https://api.whatsapp.com/send?phone=51989874368&text=${whatsappMessage}`);
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
												if(v_fquaprcataadd != "" && v_fquaprcataadd != 0){
													if(parseInt(v_fquaprcataadd) > 1){
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDADES";
													}else{
														txt_quantityprod = "%20/%20"+v_fquaprcataadd+"%20UNIDAD";
													}
												}else{
													txt_quantityprod = "";
												}

												var objDataTxtWhatsapp = {
													id: $("#v_gencodexxx").text() + " - " + v_loadtypecharge,
													typeservice : v_typeserviceinit.toUpperCase(),
													tcontainer : v_floadTypeTranport.toUpperCase(),
													containtflete : v_fpckgcontquant,
													quantityprod: txt_quantityprod,
													tservices: totalNotround,
													tfob: totalfinalvaluefob,
													tranportflete : v_fplctopckloc
												}

												// ------------ AÑADIR LOS DATOS AL ENLACE DE WHATSAPP 
												var wlinebreak = "%0D%0A";
												var whatsappMessage = `Saludos,%20me%20gustaría%20cotizar:${wlinebreak}
												--------------------------------------${wlinebreak}
												ID:%20${objDataTxtWhatsapp.id}${wlinebreak}
												Tipo%20Flete:%20${objDataTxtWhatsapp.typeservice}${wlinebreak}
												Tipo%20Contenedor:%20${objDataTxtWhatsapp.tcontainer}${wlinebreak}
												Contenido%20Flete:%20${objDataTxtWhatsapp.containtflete}${objDataTxtWhatsapp.quantityprod}${wlinebreak}
												Valor%20Flete:%20${objDataTxtWhatsapp.tservices}${wlinebreak}
												Gastos:%20${objDataTxtWhatsapp.tfob}${wlinebreak}
												Transporte:%20${objDataTxtWhatsapp.tranportflete}${wlinebreak}
												Impuestos Aproximados:%20${twodecimals_FinalTax}`;
												// whatsappMessage = window.encodeURIComponent(whatsappMessage);
												$("#d-link-messagecontact").attr("href", `https://api.whatsapp.com/send?phone=51989874368&text=${whatsappMessage}`);
											}else{
												console.log('Es aquí el error');
												Swal.fire({
										      title: 'Error!',
										      html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
										      icon: 'error',
										      confirmButtonText: 'Aceptar'
										    });
											}
										}else{
											console.log('Es aquí el error');
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

			  	}else{
			  		console.log('Lo sentimos, hubo un error al procesar la información.');
			  	}
			  });
	  	}else{
	  		console.log('Lo sentimos hubo un error al procesar la información');
	  	}
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
			user_sessquote = decrypt_sessuser_username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", v_idgencoderand);
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
					if(rpdf.res == "exists"){
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
								id_codegenrand : v_idgencoderand, 
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
			user_sessquote = decrypt_sessuser_username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", v_idgencoderand);
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
					if(rpdf.res == "exists"){
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
								id_codegenrand : v_idgencoderand, 
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
			user_sessquote = decrypt_sessuser_username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", v_idgencoderand);
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
					if(rpdf.res == "exists"){
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
								id_codegenrand : v_idgencoderand, 
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
			user_sessquote = decrypt_sessuser_username;
			var formdata = new FormData();
			formdata.append("id_codegenrand", v_idgencoderand);
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
					if(rpdf.res == "exists"){
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
								id_codegenrand : v_idgencoderand, 
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
			formdata.append("id_gencoderand", v_idgencoderand);
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
					    //VALIDAR LA INFORMACIÓN DEL USUARIO...
							user_sessquote = decrypt_sessuser_username;
							var formdata = new FormData();
							formdata.append("id_codegenrand", v_idgencoderand);
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
									if(rpdf.res == "exists"){
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
												id_codegenrand : v_idgencoderand, 
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
					  });
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