<section id="cnt-modalFormSessLoginorRegister" class="cnt-modalFormSessLoginorRegister">
	<div class="cnt-modalFormSessLoginorRegister--c">
    <span class="cnt-modalFormSessLoginorRegister--c--close" id="btn-closeiconFormLoginorRegister"></span>
		<div class="cnt-modalFormSessLoginorRegister--c--cTitle">
			<h2>Iniciar Sesión</h2>
			<span>
        <span>
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <span>
                      <span>
                        <span>
                          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="s_useregin-sistem" value="<?php echo $sess_user;?>">
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>
		</div>
		<div id="c-formLoginorRegisterU">
			<form method="POST" class="cnt-modalFormSessLoginorRegister--c--cForm" id="c-formLoginU_Camel">
				<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
					<label for="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">USUARIO</label>
					<input type="text" id="u-username" name="u-username" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Usuario" maxlength="80">
					<span id="mssg_alertcontrol_usr"></span>
				</div>
				<div class="cnt-modalFormSessLoginorRegister--c--cForm--cControl">
					<label for="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--label">CONTRASEÑA</label>
					<input type="password" autocomplete="true" id="u-password" name="u-password" class="cnt-modalFormSessLoginorRegister--c--cForm--cControl--input" placeholder="Contraseña" maxlength="80">
					<span id="mssg_alertcontrol_pass"></span>
				</div>
				<div class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions" id="cont-btnsLoginorRegisterOptions">
					<button type="submit" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--action">Iniciar Sesión</button>
					<span>&nbsp;&nbsp;o&nbsp;&nbsp;</span>
					<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--cForm--cBtnsLoginorRegisterOptions--link" id="btn-ChangeR">Regístrate</a>
				</div>
			</form>
		</div>
		<a href="javascript:void(0);" class="cnt-modalFormSessLoginorRegister--c--btnReturnorBack" id="btn-closeTwoFormLoginorRegister">Volver</a>
	</div>
</section>
<div id="s-mssgloadSendAction" class="c-mssgloadSendAction"></div>