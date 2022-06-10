$(document).on("click", "#btn-closeiconForm", function(){$("#cnt-modalFormLoginyRegister").removeClass("show");});
// ------------ TROZO DE VANILLA JS
let containFormDownload = document.querySelector("#cnt-modalFormLoginyRegister");
containFormDownload.addEventListener("click", e => {
	if(e.target === containFormDownload) containFormDownload.classList.remove("show");
});