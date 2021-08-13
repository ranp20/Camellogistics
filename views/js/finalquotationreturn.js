/*============================================================================================================
=            CALCULAR Y MOSTRAR EL RESUMEN DE COTIZACIÓN - INTERFAZ DE PRESENTACIÓN DE COTIZACIÓN            =
============================================================================================================*/
$(document).ready(() => {
	/************************** IR HACIA ABAJO **************************/
	$("#btn-scrollingtTtB").on("click", function(){
		$("body, html").animate({
			scrollTop: '300'
		}, 300);
	});
	/************************** CARGAR LOS VALORES E INCLUIRLOS EN EL TEXTO PARA EL BOTÓN DE WHATSAPP **************************/
	var typeFleteService = $("#m-first-listresume").find("li:first-child").find("div").find("span:nth-child(2)").text(),
			typeFleteContainer = $("#m-first-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
			fleteportOrigin = $("#v-listportsOandD").find("span:first-child").text(),
			fleteportDestiny = $("#v-listportsOandD").find("span:last-child").text(),
			contentFlete = $("#m-first-listresume").find("li:nth-child(3)").find("div").find("p").find("span").text(),
			impuestosFlete = $("#m-second-listresume").find("li:nth-child(2)").find("div").find("span:nth-child(2)").text(),
			transportFlete = $("#m-second-listresume").find("li:nth-child(3)").find("div").find("span:nth-child(2)").text();
			seguroFlete = $("#m-second-listresume").find("li:nth-child(4)").find("div").find("span:nth-child(2)").text();

	var objDataTxtWhatsapp = {
		tservice : typeFleteService,
		tcontainer : typeFleteContainer,
		fportorigin : fleteportOrigin,
		fportdestiny : fleteportDestiny,
		containtflete : contentFlete,
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
	gastos:%20SI,%20
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