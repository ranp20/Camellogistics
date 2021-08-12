/************************** SHOW INPUT EMAIL AND HIDDEN COTENT BUTTONS OPTIONS DOWNLOAD **************************/
$(document).on("click","#btn-requireDownloadQuotaion",function(){$("#cnt-modalFormLoginyRegister").add($(".cnt-modalFormLoginyRegister--c")).addClass("show");});
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