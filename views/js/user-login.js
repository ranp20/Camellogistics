/************************** ABRIR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-showLoginForm", function(){
	$("#cnt-modalFormSessLoginorRegister").addClass("show");
	$(".cnt-modalFormSessLoginorRegister--c").addClass("show");
});
/************************** CERRAR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-closeiconFormLoginorRegister", function(){$("#cnt-modalFormSessLoginorRegister").removeClass("show");});
$(document).on("click", "#btn-closeTwoFormLoginorRegister", function(){$("#cnt-modalFormSessLoginorRegister").removeClass("show");});
let containerMLoginorRegister = document.querySelector("#cnt-modalFormSessLoginorRegister");
containerMLoginorRegister.addEventListener("click", e => {
	if(e.target === containerMLoginorRegister) containerMLoginorRegister.classList.remove("show");
});