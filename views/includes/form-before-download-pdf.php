<section id="cnt-modalFormLoginyRegister" class="cnt-modalFormLoginyRegister">
	<div class="cnt-modalFormLoginyRegister--c">
    <span class="cnt-modalFormLoginyRegister--c--close" id="btn-closeiconForm"></span>
		<div class="cnt-modalFormLoginyRegister--c--cTitle">
			<span>Descarga tu oferta</span>
			<h2>Ingresando los siguientes datos</h2>
		</div>
		<div class="cnt-modalFormLoginyRegister--c--cForm">
			<form method="POST" id="btn-gen_formDataUserQuotation">
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="n_document_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Ingresa tu DNI / RUC 10 / RUC 20 <span class="control-spanrequired">*</span></label>
					<input type="number" id="n_document_cli" name="n_document_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el número de documento" maxlength="21">
					<span id="msg-nounNumberDoc"></span>
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="name_enterprise_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Nombre de la empresa - (Opcional)</label>
					<input type="text" id="name_enterprise_cli" name="name_enterprise_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el nombre de la empresa">
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="telephone_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Número de teléfono - (Opcional)</label>
					<input type="number" id="telephone_cli" name="telephone_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el número de teléfono" maxlength="11">
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cControl">
					<label for="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Ingresa tu Email <span class="control-spanrequired">*</span></label>
					<input type="email" id="email_cli" name="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el correo electrónico">
					<span id="msg-nounValidEmail"></span>
					<button type="submit" id="btn-reg_AccountbeforeDownload">DESCARGAR COTIZACIÓN</button>
				</div>
				<!--<div class="cnt-modalFormLoginyRegister--c--cForm--cControl" id="control-inputaddEmail">
					<label for="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--label">Ingresa tu Email <span class="control-spanrequired">*</span></label>
					<input type="email" id="email_cli" name="email_cli" class="cnt-modalFormLoginyRegister--c--cForm--cControl--input" placeholder="Ingrese el correo electrónico">
					<span id="msg-nounValidEmail"></span>
					<button type="submit" id="btn-reg_AccountbeforeDownload">DESCARGAR COTIZACIÓN</button>
				</div>
				<div class="cnt-modalFormLoginyRegister--c--cForm--cBtnsDownloadPdf" id="cont-btnsDownloadOptions">
					<span>Opciones de descarga:</span>
					<a href="" class="cnt-modalFormLoginyRegister--c--cForm--cBtnsDownloadPdf--linkGmailAccess">
						<img src="" alt="">
						<span>GMAIL, SOLO CON UN CLICK</span>
					</a>
					<p>o con tu <a href="#" id="link-showaddEmailUser">correo electrónico</a></p>
				</div>-->
			</form>
		</div>
	</div>
</section>