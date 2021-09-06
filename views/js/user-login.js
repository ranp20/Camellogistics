/************************** ABRIR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#s-formLoginOrRegister", function(){
	$("#cnt-modalFormSessLoginorRegister").addClass("show");
	$(".cnt-modalFormSessLoginorRegister--c").addClass("show");
});
/************************** CERRAR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-closeiconFormLoginorRegister", function(){
	$("#cnt-modalFormSessLoginorRegister").removeClass("show");
	$("#c-formLoginorRegisterU").html(`
		<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formLoginU_Camel">
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
				<input type="text" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="80">
				<span id="mssg_alertcontrol_usr"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
				<span id="mssg_alertcontrol_pass"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
			</div>
		</form>
	`);
});
$(document).on("click", "#btn-closeTwoFormLoginorRegister", function(){
	$("#cnt-modalFormSessLoginorRegister").removeClass("show");
	$("#c-formLoginorRegisterU").html(`
		<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formLoginU_Camel">
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
				<input type="text" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="80">
				<span id="mssg_alertcontrol_usr"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
				<span id="mssg_alertcontrol_pass"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
			</div>
		</form>
	`);
});
let containerMLoginorRegister = document.querySelector("#cnt-modalFormSessLoginorRegister");
containerMLoginorRegister.addEventListener("click", e => {
	if(e.target === containerMLoginorRegister){
		containerMLoginorRegister.classList.remove("show");
		$("#c-formLoginorRegisterU").html(`
			<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formLoginU_Camel">
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
				<input type="text" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="80">
				<span id="mssg_alertcontrol_usr"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
				<span id="mssg_alertcontrol_pass"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
			</div>
		</form>
		`);	
	}
});
/************************** VALIDAR LOS CAMPOS DE TEXTO **************************/
$(document).on("input keyup","#u-username",function(e){
	if(e.target.value != ""){$("#mssg_alertcontrol_usr").text("");}else{$("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");}
});
$(document).on("input keyup","#u-password",function(e){
	if(e.target.value != ""){$("#mssg_alertcontrol_pass").text("");}else{$("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");}
});
$(document).on("input keyup","#u-passwordtwo",function(e){
	if(e.target.value != ""){$("#mssg_alertcontrol_passrepeat").text("");}else{$("#mssg_alertcontrol_passrepeat").text("Debes repetir la contraseña");}
});
/************************** CAMBIAR LOS BOTONES SEGÚN SEA LA OCASIÓN **************************/
$(document).on("click", "#btn-ChangeR", function(){
	$("#c-formLoginorRegisterU").html(`
		<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formRegisterU_Camel">
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">EMAIL</label>
				<input type="email" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Email" maxlength="80">
				<span id="mssg_alertcontrol_usr"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
				<span id="mssg_alertcontrol_pass"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-passwordtwo" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONFIRMAR CONTRASEÑA</label>
				<input type="password" id="u-passwordtwo" name="u-passwordtwo" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Confirmar contraseña" maxlength="80">
				<span id="mssg_alertcontrol_passrepeat"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Regístrate</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeIS">Iniciar Sesión</a>
			</div>
		</form>
	`);
});
$(document).on("click", "#btn-ChangeIS", function(){
	$("#c-formLoginorRegisterU").html(`
		<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formLoginU_Camel">
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
				<input type="text" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="80">
				<span id="mssg_alertcontrol_usr"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
				<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
				<input type="password" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
				<span id="mssg_alertcontrol_pass"></span>
			</div>
			<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
				<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
				<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
				<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
			</div>
		</form>
	`);
});
/************************** INICIO DE SESIÓN DEL USUARIO **************************/
$(document).on("submit","#c-formLoginU_Camel",function(e){
	e.preventDefault();
	($("#u-username").val() != 0 && $("#u-username").val() != "") ? $("#mssg_alertcontrol_usr").text("") : $("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");
	($("#u-password").val() != 0 && $("#u-password").val() != "") ? $("#mssg_alertcontrol_pass").text("") : $("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");

	if($("#u-username").val() != 0 && $("#u-username").val() != "" &&
		 $("#u-password").val() != 0 && $("#u-password").val() != ""){
		alert("Inicio de sesión exitoso");
	}else{
		alert("Atención! completar los campos requeridos");
	}
});
/************************** REGISTRO DEL USUARIO **************************/
$(document).on("submit","#c-formRegisterU_Camel",function(e){
	e.preventDefault();	
	($("#u-username").val() != 0 && $("#u-username").val() != "") ? $("#mssg_alertcontrol_usr").text("") : $("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");
	($("#u-password").val() != 0 && $("#u-password").val() != "") ? $("#mssg_alertcontrol_pass").text("") : $("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");
	($("#u-passwordtwo").val() != 0 && $("#u-passwordtwo").val() != "") ? $("#mssg_alertcontrol_passrepeat").text("") : $("#mssg_alertcontrol_passrepeat").text("Debes repetir la contraseña");

	if($("#u-username").val() != 0 && $("#u-username").val() != "" &&
		 $("#u-password").val() != 0 && $("#u-password").val() != "" &&
		 $("#u-passwordtwo").val() != 0 && $("#u-passwordtwo").val() != ""){
		alert("Datos registrados correctamente");
	}else{
		alert("Atención! completar los campos requeridos");
	}
});