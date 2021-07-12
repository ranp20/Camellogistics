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
		<div class="cnt-modalFormCalculator--c--cListCalculate" id="cont-tableCalculation-data">
			<table class="cnt-modalFormCalculator--c--cListCalculate--table">
				<thead>
					<tr>
						<th></th>
						<th>Item</th>
						<th>Bultos</th>
						<th>Peso</th>
						<th>Volumen</th>
					</tr>
				</thead>
				<tbody id="table-ListCalculation-data">
					
				</tbody>
			</table>
		</div>
		<div class="cnt-modalFormCalculator--c--cNoteDesc">
			<p><b>Nota:</b> Los valores de Peso y Volumen serán convertidos automáticamente a Kilogramos y Metros respectivamente.</p>
		</div>
		<div class="cnt-modalFormCalculator--c--cSumTotalCalculate">
			<h3>TOTAL</h3>
			<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c">
				<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl">
					<label for="" class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--label">BULTOS</label>
					<input type="number" id="b-valTotalPackages" disabled class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--input" placeholder="bultos">
				</div>
				<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl">
					<label for="" class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--label">PESO</label>
					<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon">
						<input type="number" id="b-valTotalWeight" disabled class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon--input" placeholder="peso">
						<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon--cmassUnitPrefix">
							<span>Kg</span>
						</div>
					</div>
				</div>
				<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl">
					<label for="" class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--label">VOLUMEN</label>
					<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon">
						<input type="number" id="b-valTotalVolume" disabled class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon--input" placeholder="volumen">
						<div class="cnt-modalFormCalculator--c--cSumTotalCalculate--c--cControl--inputandIcon--ccmcPrefix">
							<span>M³</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cnt-modalFormCalculator--c--cBtnsActionsModalCalc">
			<button type="button" class="cnt-modalFormCalculator--c--cBtnsActionsModalCalc--btnCancel">VOLVER</button>
			<button type="button" class="cnt-modalFormCalculator--c--cBtnsActionsModalCalc--btnAccept">AGREGAR CÁLCULO</button>
		</div>
	</div>
</section>