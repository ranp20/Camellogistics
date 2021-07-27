/************************** ABRIR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-showLoginForm", function(){
	$("#cnt-modalFormSessLoginorRegister").addClass("show");
	$(".cnt-modalFormSessLoginorRegister--c").addClass("show");
});
/************************** CERRAR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-closeiconFormLoginorRegister", function(){
	$("#cnt-modalFormSessLoginorRegister").removeClass("show");
	$("#c-formLoginorRegisterU").html(`
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
			<input type="text" id="u-user" name="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="21">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
			<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
			<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
			<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
			<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
		</div>
	`);
});
$(document).on("click", "#btn-closeTwoFormLoginorRegister", function(){
	$("#cnt-modalFormSessLoginorRegister").removeClass("show");
	$("#c-formLoginorRegisterU").html(`
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
			<input type="text" id="u-user" name="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="21">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
			<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
			<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
			<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
			<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
		</div>
	`);
});
let containerMLoginorRegister = document.querySelector("#cnt-modalFormSessLoginorRegister");
containerMLoginorRegister.addEventListener("click", e => {
	if(e.target === containerMLoginorRegister){
		containerMLoginorRegister.classList.remove("show");
		$("#c-formLoginorRegisterU").html(`
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
				<input type="text" id="u-user" name="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="21">
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña">
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
			</div>
		`);	
	}
});
/************************** CAMBIAR LOS BOTONES SEGÚN SEA LA OCASIÓN **************************/
$(document).on("click", "#btn-ChangeR", function(){
	$("#c-formLoginorRegisterU").html(`
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">EMAIL</label>
			<input type="email" id="u-user" name="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Email" maxlength="21">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
			<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-passwordtwo" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONFIRMAR CONTRASEÑA</label>
			<input type="password" id="u-passwordtwo" name="u-passwordtwo" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Confirmar contraseña">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
			<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Regístrate</button>
			<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
			<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeIS">Iniciar Sesión</a>
		</div>
	`);
});
$(document).on("click", "#btn-ChangeIS", function(){
	$("#c-formLoginorRegisterU").html(`
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
			<input type="text" id="u-user" name="u-user" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="21">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
			<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
			<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña">
		</div>
		<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
			<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
			<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
			<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
		</div>
	`);
});