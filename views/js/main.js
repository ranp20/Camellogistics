$(() => {
	let cTopBar_m = document.querySelector(".c-Htopbar--c--cMenu"), cMobile_m = document.querySelector(".c-Htopbar--c--cMenu--Mmobile--m"),	btnOpen_mobile = document.querySelector("#btn-m-mobile-header"), btnClose_mobile = document.querySelector("#btn-sidebarl-close"),	cTopBarBackdrop_m = document.querySelector("#c-mMobile-backdrop");
	// ------------ ABRIR EL SIDEBARLEFT - MOBILE LANDINGPAGE
	btnOpen_mobile.addEventListener("click", function(){cTopBar_m.classList.toggle("show");});
	// ------------ CERRAR EL SIDEBARLEFT - MOBILE LANDINGPAGE
	cTopBar_m.addEventListener("click", (e) => {if(e.target === cTopBar_m){	cTopBar_m.classList.remove("show");}});
	btnClose_mobile.addEventListener("click", (e) => {cTopBar_m.classList.remove("show");});
	// ------------ CERRAR EL SIDEBAR CUANDO SE SELECCIONA UN ELEMENTO
	cMobile_m.addEventListener("click", (e) => {if(e.target.matches('a')){cTopBar_m.classList.remove('show');}else{return false;}});
});
// ------------ ITEM SELECCIONADO DEL MENÚ MOBILE
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
if(filename == "marketplace-logistico" || filename == "fquotationgenerateaduanas" || filename == "fquotationgenerate"){
	$('.c-Htopbar--c--cMenu--m--item a').eq(1).add($('.c-Htopbar--c--cMenu--Mmobile--m--item a').eq(1)).addClass("active");
}else if(filename == ""){
	$('.c-Htopbar--c--cMenu--m--item a').eq(0).add($('.c-Htopbar--c--cMenu--Mmobile--m--item a').eq(0)).addClass("active");
}else{
	$(".c-Htopbar--c--cMenu--m--item a").removeClass("active");
	$('.c-Htopbar--c--cMenu--m--item a[href="' + filename + '"]').addClass("active");
}