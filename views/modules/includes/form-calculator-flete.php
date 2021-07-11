<section id="cnt-modalFormCalculator" class="cnt-modalFormCalculator">
	<div class="cnt-modalFormCalculator--c">
    <span class="cnt-modalFormCalculator--c--close" id="btn-closeiconFormCalculator"></span>
		<div class="cnt-modalFormCalculator--c--cTitle">
			<h2>CALCULADORA VOLUMÉTRICA</h2>
		</div>
		<form method="POST" class="cnt-modalFormCalculator--c--cForm">
			<div class="cnt-modalFormCalculator--c--cForm--cTop">
				<div class="cnt-modalFormCalculator--c--cForm--cTop--control">
					<label for="val-Lengthselitem" class="cnt-modalFormCalculator--c--cForm--cTop--control--label">UNIDAD DE LONGITUD</label>
					<select name="" id="val-Lengthselitem" class="cnt-modalFormCalculator--c--cForm--cTop--control--select"></select>
					<span id="msgNounLengthvalue"></span>
				</div>
				<div class="cnt-modalFormCalculator--c--cForm--cTop--control">
					<label for="val-UnitWeightselitem" class="cnt-modalFormCalculator--c--cForm--cTop--control--label">UNIDAD DE PESO</label>
					<select name="" id="val-UnitWeightselitem" class="cnt-modalFormCalculator--c--cForm--cTop--control--select"></select>
					<span id="msgNounUnitWeightvalue"></span>
				</div>
				<div class="cnt-modalFormCalculator--c--cForm--cTop--control">
					<label for="" class="cnt-modalFormCalculator--c--cForm--cTop--control--label">NRO DE BULTOS</label>
					<input type="number" id="val-NroPackagestselitem" class="cnt-modalFormCalculator--c--cForm--cTop--control--input" placeholder="BULTOS" min="1">
					<span id="msgNounNroPackagesvalue"></span>
				</div>
			</div>
			<div class="cnt-modalFormCalculator--c--cForm--cBottom">
				<div class="cnt-modalFormCalculator--c--cForm--cBottom--cTitle">
					<h3>MEDIDAS POR CADA BULTO</h3>
				</div>
				<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls">
					<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control">
						<label for="" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--label">LARGO</label>
						<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c">
							<input type="number" id="val-Longinputitem" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--input" placeholder="LARGO">
							<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong">
								<span></span>
							</div>
						</div>
						<span id="msgNounLongvalue"></span>
					</div>
					<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control">
						<label for="" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--label">ANCHO</label>
						<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c">
							<input type="number" id="val-Widthinputitem" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--input" placeholder="ANCHO">
							<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong">
								<span></span>
							</div>
						</div>
						<span id="msgNounWidthvalue"></span>
					</div>
					<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control">
						<label for="" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--label">ALTO</label>
						<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c">
							<input type="number" id="val-Heightinputitem" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--input" placeholder="ALTO">
							<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong">
								<span></span>
							</div>
						</div>
						<span id="msgNounHeightvalue"></span>
					</div>
					<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control">
						<label for="" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--label">PESO</label>
						<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c">
							<input type="number" id="val-Weightinputitem" class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--input" placeholder="PESO">
							<div class="cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight">
								<span></span>
							</div>
						</div>
						<span id="msgNounWeightvalue"></span>
					</div>
				</div>
				<button type="submit" id="btn-addCalculateFleteModal" class="cnt-modalFormCalculator--c--cForm--cBottom--btnAddModal">CALCULAR</button>
			</div>
		</form>
		<div class="cnt-modalFormCalculator--c--cListCalculate">
			<table class="cnt-modalFormCalculator--c--cListCalculate--table">
				<thead>
					<tr>
						<th>--</th>
						<th>Item</th>
						<th>Bultos</th>
						<th>Peso</th>
						<th>Volumen</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<a href="#">
								<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px"><path d="M32,63.68a30.09,30.09,0,0,1-12.06-2.5,30.91,30.91,0,0,1-9.83-6.8A31.68,31.68,0,0,1,3.49,44.31a32.52,32.52,0,0,1,0-24.62A31.68,31.68,0,0,1,10.11,9.62a30.91,30.91,0,0,1,9.83-6.8,30.34,30.34,0,0,1,24.12,0,30.91,30.91,0,0,1,9.83,6.8,31.68,31.68,0,0,1,6.62,10.07,32.52,32.52,0,0,1,0,24.62,31.68,31.68,0,0,1-6.62,10.07,30.91,30.91,0,0,1-9.83,6.8A30.09,30.09,0,0,1,32,63.68ZM32,4.52C17.26,4.52,5.27,16.85,5.27,32S17.26,59.48,32,59.48,58.73,47.15,58.73,32,46.74,4.52,32,4.52Z"/><path d="M35.71,32.06,47,20.73A2.63,2.63,0,1,0,43.32,17L32,28.35,20.68,17A2.63,2.63,0,0,0,17,20.73L28.29,32.06,17,43.38a2.63,2.63,0,0,0,3.72,3.72L32,35.77,43.32,47.1A2.63,2.63,0,0,0,47,43.38Z"/></svg>
							</a>
						</td>
						<td>1</td>
						<td>1</td>
						<td>300kg</td>
						<td>1.08 M³</td>
					</tr>
					<tr>
						<td>
							<a href="#">
								<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px"><path d="M32,63.68a30.09,30.09,0,0,1-12.06-2.5,30.91,30.91,0,0,1-9.83-6.8A31.68,31.68,0,0,1,3.49,44.31a32.52,32.52,0,0,1,0-24.62A31.68,31.68,0,0,1,10.11,9.62a30.91,30.91,0,0,1,9.83-6.8,30.34,30.34,0,0,1,24.12,0,30.91,30.91,0,0,1,9.83,6.8,31.68,31.68,0,0,1,6.62,10.07,32.52,32.52,0,0,1,0,24.62,31.68,31.68,0,0,1-6.62,10.07,30.91,30.91,0,0,1-9.83,6.8A30.09,30.09,0,0,1,32,63.68ZM32,4.52C17.26,4.52,5.27,16.85,5.27,32S17.26,59.48,32,59.48,58.73,47.15,58.73,32,46.74,4.52,32,4.52Z"/><path d="M35.71,32.06,47,20.73A2.63,2.63,0,1,0,43.32,17L32,28.35,20.68,17A2.63,2.63,0,0,0,17,20.73L28.29,32.06,17,43.38a2.63,2.63,0,0,0,3.72,3.72L32,35.77,43.32,47.1A2.63,2.63,0,0,0,47,43.38Z"/></svg>
							</a>
						</td>
						<td>1</td>
						<td>1</td>
						<td>300kg</td>
						<td>1080000 M³</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>