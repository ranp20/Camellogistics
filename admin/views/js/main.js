/************************** BOTÓN DE HAMBURGUESA - MOBILE **************************/
$(document).on("click", "#icon-togglemenuMobile", function(){
	if(!document.querySelector(".nav-dashCamel").classList.contains("show")){
		$(".nav-dashCamel").addClass("show");
		$(".nav-dashCamel--c").addClass("show");
		$(this).addClass("position");
	}else{
		$(".nav-dashCamel").removeClass("show");
		$(".nav-dashCamel--c").removeClass("show");
		$(this).removeClass("position");
	}
});
/************************** CERRAR EL SIDEBARLEFT - MOBILE **************************/
let containerSidebarLeft = document.querySelector("#nav-dashCamel");
containerSidebarLeft.addEventListener("click", (e) => {
	if(e.target === containerSidebarLeft){
		containerSidebarLeft.classList.remove("show");
		document.querySelector("#icon-togglemenuMobile").classList.remove("position");
	} 
});
/************************** BOTÓN DE HAMBURGUESA - DESKTOP **************************/
$(document).on("click", "#icon-togglemenuDesktop", function(){
	if(!document.querySelector("#dash-contT").classList.contains("hiddenLeft")){
		$("#dash-contT").addClass("hiddenLeft");
		$(".nav-dashCamel").addClass("hidden");
		$(".nav-dashCamel--c").addClass("hidden");
	}else{
		$("#dash-contT").removeClass("hiddenLeft");
		$(".nav-dashCamel").removeClass("hidden");
		$(".nav-dashCamel--c").removeClass("hidden");
	}
});
