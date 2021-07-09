/************************** TROZO DE VANILLA JS **************************/
let containFormDownload = document.querySelector("#cnt-modalFormLoginyRegister");
containFormDownload.addEventListener("click", e => {
	if(e.target === containFormDownload) containFormDownload.classList.remove("show");
});
/************************** SHOW INPUT EMAIL AND HIDDEN COTENT BUTTONS OPTIONS DOWNLOAD **************************/
$(document).on("click", "#btn-closeiconForm", function(){
	$("#cnt-modalFormLoginyRegister").removeClass("show");
});
$(document).on("click", "#link-showaddEmailUser", function(){
	$("#control-inputaddEmail").addClass("show");
	$("#cont-btnsDownloadOptions").addClass("hidden");
});