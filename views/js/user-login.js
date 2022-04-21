/************************** ABRIR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#s-formLoginOrRegister", function() {
  $("#cnt-modalFormSessLoginorRegister").addClass("show");
  $(".cnt-modalFormSessLoginorRegister--c").addClass("show");
});
/************************** CERRAR EL MODAL DE LOGIN/REGISTER **************************/
$(document).on("click", "#btn-closeiconFormLoginorRegister", function() {
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
$(document).on("click", "#btn-closeTwoFormLoginorRegister", function() {
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
  if (e.target === containerMLoginorRegister) {
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
$(document).on("input keyup", "#u-username", function(e) {
  if (e.target.value != "") {
    $("#mssg_alertcontrol_usr").text("");
  } else {
    $("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");
  }
});
$(document).on("input keyup", "#u-password", function(e) {
  if (e.target.value != "") {
    $("#mssg_alertcontrol_pass").text("");
  } else {
    $("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");
  }
});
$(document).on("input keyup", "#u-passwordtwo", function(e) {
  if (e.target.value != "") {
    $("#mssg_alertcontrol_passrepeat").text("");
    if (e.target.value != $("#u-password").val()) {
      $("#mssg_alertcontrol_passrepeat").css({
        'color': 'red'
      });
      $("#mssg_alertcontrol_passrepeat").text("Las contraseñas deben coincidir");
    } else if (e.target.value == $("#u-password").val()) {
      $("#mssg_alertcontrol_passrepeat").css({
        'color': 'green'
      });
      $("#mssg_alertcontrol_passrepeat").text("Las contraseñas coinciden");
    } else {
      $("#mssg_alertcontrol_passrepeat").css({
        'color': 'red'
      });
      $("#mssg_alertcontrol_passrepeat").text("");
    }
  } else {
    $("#mssg_alertcontrol_passrepeat").text("Debes repetir la contraseña");
  }
});
$(document).on("blur", "#u-passwordtwo", function() {
  $("#mssg_alertcontrol_passrepeat").text("");
});
/************************** CAMBIAR LOS BOTONES SEGÚN SEA LA OCASIÓN **************************/
$(document).on("click", "#btn-ChangeR", function() {
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
$(document).on("click", "#btn-ChangeIS", function() {
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
$(document).on("submit", "#c-formLoginU_Camel", function(e) {
  e.preventDefault();
  ($("#u-username").val() != 0 && $("#u-username").val() != "") ? $("#mssg_alertcontrol_usr").text(""): $("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");
  ($("#u-password").val() != 0 && $("#u-password").val() != "") ? $("#mssg_alertcontrol_pass").text(""): $("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");
  if ($("#u-username").val() != 0 && $("#u-username").val() != "" && $("#u-password").val() != 0 && $("#u-password").val() != "") {
    var form = $(this).serializeArray();
    $.ajax({
      url: "controllers/prcss_login-user.php",
      method: "POST",
      dataType: 'JSON',
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: form
    }).done((e) => {
      console.log(e);
      if (e.response == "true") {
        console.log('Usuario correcto');
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val(e.received.username);
        /************************** ASIGNAR A LA VARIABLE DE SESIÓN LOCAL **************************/
        var sessstorage_loguser = {
          'username': e.received.username
        }
        sessionStorage.setItem("sess_usercli", JSON.stringify(sessstorage_loguser));
        sessionStorage.setItem("sess_valuser", 1);
        // ============== MOSTRAR EL NOMBRE/CORREO DEL USUARIO - DESKTOP ============== //
        $("#s-loginsessuser-active-mb").html(`
					<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
            <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${e.received.username}</span>
          </a>
          <ul class='c-Htopbar--c--cMenu--m--item--subm'>
            <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
              <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
              	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        				<span>Cerrar sesión</span>
              </a>
            </li>
          </ul>
				`);
        // ============== MOSTRAR EL NOMBRE/CORREO DEL USUARIO - MOBILE ============== //
        $("#s-loginsessuser-active-ms").html(`
					<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
            <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${e.received.username}</span>
          </a>
          <ul class='c-Htopbar--c--cMenu--m--item--subm'>
            <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
              <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
              	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        				<span>Cerrar sesión</span>
              </a>
            </li>
          </ul>
				`);
        /************************** MOSTRAR EL LOADER PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--cloader">
						<span class="c-mssgloadSendAction--cloader--loader"></span>
					</div>
        `)
        /************************** QUITAR EL LOADER **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--cloader").remove();
        }, 1000);
        $("#cnt-modalFormSessLoginorRegister").removeClass("show");
        $('#c-formLoginU_Camel')[0].reset();
      } else if (e.response == "error_email") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
		      <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Email Inválido</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">El correo electrónico ingresado no es válido.</p>
							</div>
						</div>
					</div>
		    `)
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      } else {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
		      <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Atención!</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">Los datos del usuario no coinciden y/o no existen.</p>
							</div>
						</div>
					</div>
		    `)
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      }
    });
  } else {
    /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
    $("#s-mssgloadSendAction").html(`
      <div class="c-mssgloadSendAction--contalert">
				<div class="c-mssgloadSendAction--contalert--c">
					<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
					<div class="c-mssgloadSendAction--contalert--c--cmssg">
						<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Atención!</h1>
						<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">Debes completar los campos requeridos.</p>
					</div>
				</div>
			</div>
    `)
    /************************** CERRAR EL MODAL **************************/
    setTimeout(function() {
      $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
    }, 6500);
    $("#btncloseModalLorR").on("click", function() {
      $(this).parent().parent().remove();
    });
  }
});
/************************** REGISTRO DEL USUARIO **************************/
$(document).on("submit", "#c-formRegisterU_Camel", function(e) {
  e.preventDefault();
  ($("#u-username").val() != 0 && $("#u-username").val() != "") ? $("#mssg_alertcontrol_usr").text(""): $("#mssg_alertcontrol_usr").text("Debes ingresar un usuario");
  ($("#u-password").val() != 0 && $("#u-password").val() != "") ? $("#mssg_alertcontrol_pass").text(""): $("#mssg_alertcontrol_pass").text("Debes ingresar una contraseña");
  ($("#u-passwordtwo").val() != 0 && $("#u-passwordtwo").val() != "") ? $("#mssg_alertcontrol_passrepeat").text(""): $("#mssg_alertcontrol_passrepeat").text("Debes repetir la contraseña");
  if ($("#u-username").val() != 0 && $("#u-username").val() != "" && $("#u-password").val() != 0 && $("#u-password").val() != "" && $("#u-passwordtwo").val() != 0 && $("#u-passwordtwo").val() != "" && $("#u-passwordtwo").val() == $("#u-password").val()) {
    var form = $(this).serializeArray();
    $.ajax({
      url: 'controllers/prcss_add-user.php',
      method: 'POST',
      dataType: 'JSON',
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: form
    }).done((e) => {
      if (e.response == "true") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val(e.received.username);
        /************************** ASIGNAR A LA VARIABLE DE SESIÓN LOCAL **************************/
        var sessstorage_loguser = {
          'username': e.received.username
        }
        sessionStorage.setItem("sess_usercli", JSON.stringify(sessstorage_loguser));
        sessionStorage.setItem("sess_valuser", 1);
        // ============== MOSTRAR EL NOMBRE/CORREO DEL USUARIO - DESKTOP ============== //
        $("#s-loginsessuser-active-mb").html(`
					<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
            <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${e.received.username}</span>
          </a>
          <ul class='c-Htopbar--c--cMenu--m--item--subm'>
            <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
              <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
              	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        				<span>Cerrar sesión</span>
              </a>
            </li>
          </ul>
				`);
        // ============== MOSTRAR EL NOMBRE/CORREO DEL USUARIO - MOBILE ============== //
        $("#s-loginsessuser-active-ms").html(`
					<a href='javascript:void(0);' class='c-Htopbar--c--cMenu--m--link'>
            <span id='namUser_validSess' class='c-Htopbar--c--cMenu--m--link--sessUser'>${e.received.username}</span>
          </a>
          <ul class='c-Htopbar--c--cMenu--m--item--subm'>
            <li class='c-Htopbar--c--cMenu--m--item--subm--subitem'>
              <a href='logout' class='c-Htopbar--c--cMenu--m--item--subm--sublink'>
              	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24"><path d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"/></svg>
        				<span>Cerrar sesión</span>
              </a>
            </li>
          </ul>
				`);
        /************************** MOSTRAR EL LOADER PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--cloader">
						<span class="c-mssgloadSendAction--cloader--loader"></span>
					</div>
        `);
        /************************** QUITAR EL LOADER **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--cloader").remove();
        }, 1000);
        $("#cnt-modalFormSessLoginorRegister").removeClass("show");
        $('#c-formRegisterU_Camel')[0].reset();
      } else if (e.response == "equals") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title"><b>Atención!</b></h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">El usuario ingresado <b>ya se encuentra registrado, por favor inicie sesión.</b></p>
							</div>
						</div>
					</div>
        `);
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      } else if (e.response == "errinsert") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Lo sentimos</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">Hubo un error al insertar el registro.</p>
							</div>
						</div>
					</div>
        `);
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      } else if (e.response == "error_email") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Email Inválido</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">El correo electrónico ingresado no es válido.</p>
							</div>
						</div>
					</div>
        `);
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      } else if (e.response == "error_pass") {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Contraseña Inválida</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">La contraseña solo puede contener letras y números.</p>
							</div>
						</div>
					</div>
        `);
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      } else {
        /************************** AGREGAR AL CONTROL DE VALIDACIÓN **************************/
        $("#s_useregin-sistem").val("");
        /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
        $("#s-mssgloadSendAction").html(`
          <div class="c-mssgloadSendAction--contalert">
						<div class="c-mssgloadSendAction--contalert--c">
							<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
							<div class="c-mssgloadSendAction--contalert--c--cmssg">
								<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Error!</h1>
								<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">Lo sentimos, hubo un error al procesar el formulario.</p>
							</div>
						</div>
					</div>
        `);
        /************************** CERRAR EL MODAL **************************/
        setTimeout(function() {
          $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
        }, 6500);
        $("#btncloseModalLorR").on("click", function() {
          $(this).parent().parent().remove();
        });
      }
    });
  } else {
    /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
    $("#s-mssgloadSendAction").html(`
      <div class="c-mssgloadSendAction--contalert">
				<div class="c-mssgloadSendAction--contalert--c">
					<span class="c-mssgloadSendAction--contalert--c--close" id="btncloseModalLorR"></span>
					<div class="c-mssgloadSendAction--contalert--c--cmssg">
						<h1 class="c-mssgloadSendAction--contalert--c--cmssg--title">Atención!</h1>
						<p class="c-mssgloadSendAction--contalert--c--cmssg--desc">Debes completar los campos requeridos.</p>
					</div>
				</div>
			</div>
    `);
    /************************** CERRAR EL MODAL **************************/
    setTimeout(function() {
      $("#s-mssgloadSendAction .c-mssgloadSendAction--contalert").remove();
    }, 6500);
    $("#btncloseModalLorR").on("click", function() {
      $(this).parent().parent().remove();
    });
  }
});