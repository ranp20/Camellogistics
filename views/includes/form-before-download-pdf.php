<section id="cnt-modalFormLoginyRegister" class="cnt-modalFormLoginyRegister">
	<div class="cnt-modalFormLoginyRegister--c">
    <span class="cnt-modalFormLoginyRegister--c--close" id="btn-closeiconForm"></span>
		<div class="cnt-modalFormLoginyRegister--c--cTitle">
			<span>Descarga tu oferta</span>
			<h2>Ingresando los siguientes datos</h2>
		</div>
		<div class="cnt-modalFormLoginyRegister--c--cForm">
			<form id="btngen_formDataUserQuotation" method="POST">
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="n_document_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Ingresa tu DNI / RUC 10 / RUC 20 <span class="control-spanrequired">*</span></label>
					<input type="text" id="n_document_cli" name="n_document_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el número de documento" maxlength="11" required autocomplete="off" spellcheck="false">
					<span id="msg-nounNumberDoc"></span>
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="name_enterprise_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Nombre de la empresa <span class="control-spanrequired">*</span></label>
					<input type="text" id="name_enterprise_cli" name="name_enterprise_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el nombre de la empresa" maxlength="50" required autocomplete="off" spellcheck="false">
					<span id="msg-nounNameEnterpriseReg"></span>
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="telephone_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Número de teléfono <span class="control-spanrequired">*</span></label>
					<input type="number" id="telephone_cli" name="telephone_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el número de teléfono" maxlength="9" required autocomplete="off" spellcheck="false">
					<span id="msg-nounNumberorTelephoneNumb"></span>
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Ingresa tu Email <span class="control-spanrequired">*</span></label>
					<input type="email" id="email_cli" name="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el correo electrónico" maxlength="50" required autocomplete="off" spellcheck="false">
					<span id="msg-nounValidEmail"></span>
					<button type="submit" id="btn-reg_AccountbeforeDownload">DESCARGAR COTIZACIÓN</button>
				</div>
			</form>
		</div>
	</div>
</section>