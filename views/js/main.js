$(() => {
	let cTopBar_m = document.querySelector(".c-Htopbar--c--cMenu");
	let btnOpen_mobile = document.querySelector("#btn-m-mobile-header");
	let btnClose_mobile = document.querySelector("#btn-sidebarl-close");
	let cTopBarBackdrop_m = document.querySelector("#c-mMobile-backdrop");
	// ------------ ABRIR EL SIDEBARLEFT - MOBILE LANDINGPAGE
	btnOpen_mobile.addEventListener("click", function(){cTopBar_m.classList.toggle("show");});
	// ------------ CERRAR EL SIDEBARLEFT - MOBILE LANDINGPAGE
	cTopBarBackdrop_m.addEventListener("click", (e) => {if(e.target === cTopBarBackdrop_m){	cTopBar_m.classList.remove("show");	}	});
	btnClose_mobile.addEventListener("click", (e) => {cTopBar_m.classList.remove("show");});
});