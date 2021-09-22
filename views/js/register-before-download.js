/************************** GENERAR EL PDF **************************/
function generatePDF(nameuser){
	$url = "controllers/c_generate-pdf.php?user="+nameuser;
	window.open($url, "cotizacion_pdf");
}
/************************** SHOW INPUT EMAIL AND HIDDEN COTENT BUTTONS OPTIONS DOWNLOAD **************************/
$(document).on("click","#btn-requireDownloadQuotaion_one",function(e){
	e.preventDefault();
	$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");
	
	/************************** VALIDAR SI YA EXISTE UN USUARIO O REGISTRAR **************************/
	if($("#s_useregin-sistem").val() != "" || 
		 $("#s_useregin-sistem").val() != undefined || 
		 $("#s_useregin-sistem").val() != 'undefined' || 
		 $("#s_useregin-sistem").val() != null ||
		 $("#s_useregin-sistem").val() != 'null'){

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

	}else if($("#s_useregin-sistem").val() == "" || 
					 $("#s_useregin-sistem").val() == undefined || 
					 $("#s_useregin-sistem").val() == 'undefined' || 
					 $("#s_useregin-sistem").val() == null ||
					 $("#s_useregin-sistem").val() == 'null'){
		console.log('Por favor, rellene sus datos.');
	}else{
		console.log('Hubo un error al generar el PDF');
	}
});
$(document).on("click","#btn-requireDownloadQuotaion_two",function(){$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");});
$(document).on("click", "#btn-closeiconForm", function(){$("#cnt-modalFormLoginyRegister").removeClass("show");});
/************************** TROZO DE VANILLA JS **************************/
let containFormDownload = document.querySelector("#cnt-modalFormLoginyRegister");
containFormDownload.addEventListener("click", e => {
	if(e.target === containFormDownload) containFormDownload.classList.remove("show");
});
/************************** MOSTRAR/OCULTAR EL INPUT DE EMAIL **************************/
$(document).on("click", "#link-showaddEmailUser", function(){
	$("#control-inputaddEmail").addClass("show");
	$("#cont-btnsDownloadOptions").addClass("hidden");
});