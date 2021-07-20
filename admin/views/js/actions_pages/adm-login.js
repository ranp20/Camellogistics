$(document).on("submit", "#c-formvalidLoginAdm", function(e){
	e.preventDefault();
	var frm = $(this).serializeArray();

	$.ajax({
		url: 'controllers/prcss_login-adm.php',
		type: 'POST',
		data: { loginadm : frm}
	}).done( (e) => {
		var res = JSON.parse(e);

		if(res.response == "true"){
			$("#cMessage-user").html(`<div id="msgAlertLoginSuccess">
													<div class="cont-loader--loader">
														<span class="cont-loader--loader--circle"></span>
														<span class="cont-loader--loader--circle"></span>
														<span class="cont-loader--loader--circle"></span>
														<span class="cont-loader--loader--circle"></span>
													</div>
													<p>Cargando...</p>
												</div>
												`);

			setTimeout(function(){
				window.location.replace("views/dashboard.php");
			}, 500);
		}else{
			$("#cMessage-user").html(`<div id="msgAlertLoginErr">
												<div class="msgAlertLoginErr--c">
													<span class="msgAlertLoginErr--c--close" id="btnCloseErr"></span>
													<h3 class="msgAlertLoginErr--c--title">¡Error!</h3>
													<p class="msgAlertLoginErr--c--desc">Lo sentimos, los datos no son correctos o no existen</p>
												</div>
											</div>
											`);
		
			setTimeout(function(){
				$('#msgAlertLoginErr').addClass('disabled');
			}, 4500);

			/* CERRAR EL MENSAJE DE ERROR */
			let containermodal = document.querySelector('#msgAlertLoginErr');
			containermodal.addEventListener('click', e => {
				if(e.target === containermodal)	containermodal.classList.add('disabled');
			});

			document.querySelector("#btnCloseErr").addEventListener("click", function(){
				document.querySelector("#msgAlertLoginErr").classList.add("disabled");
			});
		}
	});
});