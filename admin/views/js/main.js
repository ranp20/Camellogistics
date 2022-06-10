$(() => {
	let btnOpen_m = document.querySelector("#icon-togglemenuMobile");
	let btnClose_m = document.querySelector("#closebtnToggSideNav_icon");
	let mSideBarLBackdop_m = document.querySelector(".nav-dashCamel");
	let mContainRight = document.querySelector("#main-dashCamel");
	// ------------ TOGGLE MENU - DESKTOP
	btnOpen_m.addEventListener("click", function(){
		mSideBarLBackdop_m.classList.toggle("active");
		mContainRight.classList.toggle("show");
	});
	btnClose_m.addEventListener("click", function(){
		mSideBarLBackdop_m.classList.remove("active");
		mContainRight.classList.remove("show");
	});
	mSideBarLBackdop_m.addEventListener("click", function(e){
		if(e.target === mSideBarLBackdop_m){
			mSideBarLBackdop_m.classList.remove("active");
		}
	});
});
// ------------ SHOW/HIDDEN BUTTON USER
$(document).on("click", "#btn-sessuserAdm", function(e){
	e.preventDefault();
	$("#list-opts-sessuser").toggleClass("show");
});
// ------------ ITEM SELECCIONADO DEL MENÚ EN CADA PÁGINA - SIDEBARLEFT
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
if(filename == "ajustes-del-home" || filename == "banner-principal"){
	$(".nav-dashCamel--sidenav--c--cList--m--item a").removeClass("active");
	$(".nav-dashCamel--sidenav--c--cList--mOthers--item a").eq(0).addClass('active');
}else{
	$(".nav-dashCamel--sidenav--c--cList--m--item a").removeClass("active");
	$('.nav-dashCamel--sidenav--c--cList--m--item a[href="' + filename + '"]').addClass("active");
}