// ========= ABRIR EL SIDEBARLEFT - MOBILE (INICIO, MARKETPLACE) ========= //
$(document).on("click", "#btn-m-mobile-header", function(){
	$(".c-Htopbar--c--cMenu").toggleClass("show");
});
// ========= CERRAR EL SIDEBARLEFT - MOBILE (INICIO, MARKETPLACE) ========= //
let containerSidebarLeft = document.querySelector("#c-mMobile-backdrop");
containerSidebarLeft.addEventListener("click", (e) => {
	if(e.target === containerSidebarLeft){
		document.querySelector(".c-Htopbar--c--cMenu").classList.remove("show");
	}
});
// ========= CERRAR EL SIDEBARLEFT - MOBILE (INICIO, MARKETPLACE) ========= //
document.querySelector("#btn-sidebarl-close").addEventListener("click", (e) => {
	document.querySelector(".c-Htopbar--c--cMenu").classList.remove("show");
});