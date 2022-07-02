$(() => {
	let btnOpen_m = document.querySelector("#icon-togglemenuMobile"),	btnClose_m = document.querySelector("#closebtnToggSideNav_icon"),	mSideBarLBackdop_m = document.querySelector(".nav-dashCamel"), btn_sessuser = document.querySelector("#btn-sessuserAdm"),	c_sessuser_m = document.querySelector("#list-opts-sessuser"), mContainRight = document.querySelector("#main-dashCamel");
	// ------------ TOGGLE MENU - DESKTOP
	btnOpen_m.addEventListener("click", function(){mSideBarLBackdop_m.classList.toggle("active");mContainRight.classList.toggle("active");});
	btnClose_m.addEventListener("click", function(){mSideBarLBackdop_m.classList.remove("active");mContainRight.classList.remove("active");});
	mSideBarLBackdop_m.addEventListener("click", function(e){if(e.target === mSideBarLBackdop_m){mSideBarLBackdop_m.classList.remove("active");}});
	// ------------ TOGGLE MENU - USUARIO
	btn_sessuser.addEventListener("click", function(){c_sessuser_m.classList.toggle("show");});
});
// ------------ ITEM SELECCIONADO DEL MENÚ EN CADA PÁGINA - SIDEBARLEFT
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
if(filename == "ajustes" || filename == "banner-principal"){
	$(".nav-dashCamel--sidenav--c--cList--m--item a").removeClass("active");
	$(".nav-dashCamel--sidenav--c--cList--mOthers--item a").eq(0).addClass('active');
}else{
	$(".nav-dashCamel--sidenav--c--cList--m--item a").removeClass("active");
	$('.nav-dashCamel--sidenav--c--cList--m--item a[href="' + filename + '"]').addClass("active");
}