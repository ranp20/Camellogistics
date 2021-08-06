$(() => {
  hiddenAllNextSteps();
  /************************** LISTAR LOS PUERTOS DE ORIGEN Y DE DESTINO DE ACUERDO AL ID RECIBIDO POR POST **************************/
	listPortOriginandDestiny();
	/************************** LISTAR LAS UNIDADES DE MEDIDA EN EL MODAL **************************/
	list_measurement_units();
	list_mass_units();
	/************************** LISTAR LOS TIPOS DE PRODUCTOS **************************/
	listProductsUser();
	/************************** LISTAR LOS DISTRITOS DE ACUERDO AL PAÍS DE DESTINO **************************/
	listDistricsByCountry();
});
/************************** RECOGER LAS VARIABLES RECIBIDAS POR POST **************************/
var ipt_idPortOrigin = $("#ipt-vportidOrigin").val(),
		ipt_idPortcountryOrigin = $("#ipt-vportidcountryOrigin").val(),
		ipt_idPortDestiny = $("#ipt-vportidDestiny").val(),
		ipt_idPortcountryDestiny = $("#ipt-vportidcountryDestiny").val();


/************************** VARIABLES GLOBALES A USAR EN EL RESUMEN DE PROCESO **************************/
var v_TypeOp = ""; // 1. TIPO DE OPERACIÓN

var v_TypeChargeImgSrc = ""; // 2. TIPO DE CARGA - NOMBRE
var v_TypeChargeName = ""; // 2. TIPO CARGA - IMAGEN

var v_QContainersImgSrc20 = ""; // 3. CANTIDAD DE CONTENEDORES - IMAGEN 20'
var v_QContainersName20 = ""; // 3. CANTIDAD DE CONTENEDORES - NOMBRE 20'
var v_QContainersValue20 = 0; // 3. CANTIDAD DE CONTENEDORES - VALOR 20'
var v_QContainersImgSrc40 = ""; // 3. CANTIDAD DE CONTENEDORES - IMAGEN 40'
var v_QContainersName40 = ""; // 3. CANTIDAD DE CONTENEDORES - NOMBRE 40'
var v_QContainersValue40 = 0; // 3. CANTIDAD DE CONTENEDORES - VALOR 40'
var v_QContainersImgSrc40_hq = ""; // 3. CANTIDAD DE CONTENEDORES - IMAGEN 40-hq'
var v_QContainersName40_hq = ""; // 3. CANTIDAD DE CONTENEDORES - NOMBRE 40-hq'
var v_QContainersValue40_hq = 0; // 3. CANTIDAD DE CONTENEDORES - VALOR 40-hq'

var v_ValQuantityPackages = 0; // 4. CANTIDAD DE BULTOS
var v_ValTotalWeight = 0; // 4. PESO TOTAL
var v_ValTotalVolume = 0; // 4. VOLUMEN TOTAL

/************************** PLUGIN - FULLPAGE.JS **************************/
const sectionsSteps = new fullpage('#fullpage', {
  anchors:['step-typeoperation',
  				 'step-chargeload', 
  				 'step-qcontainers',
           'step-integservorfleteinte',
  				 'step-chargedata',
  				 'step-merchandisedata',
  				 'step-insuremerchandise',
  				 'step-customsclearance',
  				 'step-requirespickup',
  				 'step-pickuplocation'],
  verticalCentered: false,
  scrollingSpeed: 400,
  autoScrolling: true,
  keyboardScrolling: false,
  //fixedElements: '#id-resumeLeftQuoteCamel',
  normalScrollElements: '#id-resumeLeftQuoteCamel, #m-listAllNamTypeProds',
  //lockAnchors: true,
  loopTop: false,
  loopBottom: false,
});
/************************** OCULTAR LOS DEMÁS PASOS **************************/
function hiddenAllNextSteps(){
  sectionsSteps.setKeyboardScrolling(false);
}
/************************** LISTAR EL PUERTO DE ORIGEN Y EL PUERTO DE DESTINO **************************/
function listPortOriginandDestiny(){
  var tempOriginDestiny = "";
	$.ajax({
		url: "controllers/list_puertoOriginByIds.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {idpaisportOrigin : ipt_idPortcountryOrigin, idportOrigin : ipt_idPortOrigin},
	}).done((e) => {
    var result = JSON.parse(e);
		$.each(result, function(i, e){

      tempOriginDestiny += `
        <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
            <span>ORIGEN</span>
          </div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cDescMap">
            <span>${e.nom_puerto} - ${e.nom_pais}</span>
          </div>
        </div>
      `;
    });

    $.ajax({
      url: "controllers/list_puertoDestinyByIds.php",
      method: "POST",
      datatype: "JSON",
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: {idpaisportDestiny : ipt_idPortcountryDestiny, idportDestiny : ipt_idPortDestiny},
    }).done((e) => {
      var result2 = JSON.parse(e);
      $.each(result2, function(i, e){

        tempOriginDestiny += `
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
              <span>DESTINO</span>
            </div>
            <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cDescMap">
              <span>${e.nom_puerto} - ${e.nom_pais}</span>
            </div>
          </div>
        `;
      });
      $("#id-resumeLeftQuoteCamel .cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-firstChargeLoad]").html(tempOriginDestiny);
    });
	});
}
/*=======================================================================================
=            									2. ELEGIR EL TIPO DE OPERACIÓN            									=
=========================================================================================*/
$(document).on("click", "#list-typeOperationItems li", function(){
	$(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").addClass("show");
	
	var tTypeOperation = $(this).index();
	if(tTypeOperation == 0){
    /************************** ASIGNAR A LA VARIABLE BLOBAL **************************/
    v_TypeOp = $(this).find("a").find("p").text();
    /************************** VALOR DEL TIPO DE OPERACIÓN **************************/
    $("#loadTypeOpe").val(v_TypeOp);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
		sectionsSteps.moveTo('step-chargeload', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
        <span>
          <input type="hidden" value="" id="loadTypeCharge" name="loadTypeCharge">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/fcl.png" alt="">
              </div>
              <p>FCL</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/lcl.png" alt="">
              </div>
              <p>LCL</p>
            </a>
          </li>
        </ul>
      </div>
		`);
		$(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
				<div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIcon">
          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
        </div>
				<span>`+v_TypeOp+`</span>
			</div>
		`);
	}else{
    /************************** ASIGNAR A LA VARIABLE BLOBAL **************************/
    v_TypeOp = $(this).find("a").find("p").text();
    /************************** VALOR DEL TIPO DE OPERACIÓN **************************/
    $("#loadTypeOpe").val(v_TypeOp);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
		sectionsSteps.moveTo('step-chargeload', 1);
		$(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
        <span>
          <input type="hidden" value="" id="loadTypeCharge" name="loadTypeCharge">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/fcl.png" alt="">
              </div>
              <p>FCL</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/lcl.png" alt="">
              </div>
              <p>LCL</p>
            </a>
          </li>
        </ul>
      </div>
		`);
		$(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
				<div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIcon">
          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
        </div>
				<span>`+v_TypeOp+`</span>
			</div>
		`);
	}
});
/*=======================================================================================
=            									3. ELEGIR EL TIPO DE CARGA            									  =
=========================================================================================*/
$(document).on("click", "#list-typeChargeLoadItems li", function(){
	$(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").addClass("show");
	var tTypeChargeLoad = $(this).index();
	if(tTypeChargeLoad == 0){
    /************************** ASGINAR A LAS VARIABLES GLOBALES **************************/
    v_TypeChargeImgSrc = $(this).find("a").find("div").find("img").attr("src");
    v_TypeChargeName = $(this).find("a").find("p").text();
    /************************** VALOR DEL TIPO DE CARGA **************************/
    $("#loadTypeCharge").val(v_TypeChargeName);
    /************************** ASIGNAR AL RESUMEN DEL LISTADO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("img").attr("src", v_TypeChargeImgSrc);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("span").text(v_TypeChargeName);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
		sectionsSteps.moveTo('step-qcontainers', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Contenedores</h3>
        <span>
          <input type="hidden" value="" id="loadTypeContainer20" name="loadTypeContainer20">
          <input type="hidden" value="0" id="loadQContainer20" name="loadQContainer20">
          <input type="hidden" value="" id="loadTypeContainer40" name="loadTypeContainer40">
          <input type="hidden" value="0" id="loadQContainer40" name="loadQContainer40">
          <input type="hidden" value="" id="loadTypeContainer40hq" name="loadTypeContainer40hq">
          <input type="hidden" value="0" id="loadQContainer40hq" name="loadQContainer40hq">
          <input type="hidden" value="" id="loadTypeContainer40nor" name="loadTypeContainer40nor">
          <input type="hidden" value="0" id="loadQContainer40nor" name="loadQContainer40nor">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip20">
              <img src="views/assets/img/steps/20.png" alt="">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle--title">20' STANDARD</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cImg">
                  <img src="views/assets/img/steps/20std.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont">
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont--item">
                    <span>PESO MAX. PERMITIDO</span>
                    <span>26 TONELADAS</span>
                  </p>
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont--item">
                    <span>VOL. MAX. CARGABLE</span>
                    <span>33 M³</span>
                  </p>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cMediumText">
                  <span>MEDIDAS INTERNAS CONTENEDOR</span>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB">
                  <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>LARGO</p>
                      <span>5.89 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>ANCHO</p>
                      <span>2.35 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>ALTO</p>
                      <span>2.38 MTS</span>
                    </li>
                  </ul>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cNote">
                  <span><b>NOTA: </b>El peso máximo permitido variará de acuerdo a las normativas establecidas de cada naviera.</span>
                </div>
              </div>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">20'</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control" id="c-incdecBtns20">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                <input type="number" id="ipt-qvalContainer20" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40">
              <img src="views/assets/img/steps/40.png" alt="">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle--title">40' STANDARD</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cImg">
                  <img src="views/assets/img/steps/40std.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont">
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont--item">
                    <span>PESO MAX. PERMITIDO</span>
                    <span>26 TONELADAS</span>
                  </p>
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailCont--item">
                    <span>VOL. MAX. CARGABLE</span>
                    <span>67 M³</span>
                  </p>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cMediumText">
                  <span>MEDIDAS INTERNAS CONTENEDOR</span>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB">
                  <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>LARGO</p>
                      <span>12.03 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>ANCHO</p>
                      <span>2.35 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cDetailsB--m--item">
                      <p>ALTO</p>
                      <span>2.38 MTS</span>
                    </li>
                  </ul>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cNote">
                  <span><b>NOTA: </b>El peso máximo permitido variará de acuerdo a las normativas establecidas de cada naviera.</span>
                </div>
              </div>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">40'</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control" id="c-incdecBtns40">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40-hq">
              <img src="views/assets/img/steps/40-hc.png" alt="">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle--title">40' HQ</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cImg">
                  <img src="views/assets/img/steps/40hq.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont">
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont--item">
                    <span>PESO MAX. PERMITIDO</span>
                    <span>26 TONELADAS</span>
                  </p>
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont--item">
                    <span>VOL. MAX. CARGABLE</span>
                    <span>76 M³</span>
                  </p>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cMediumText">
                  <span>MEDIDAS INTERNAS CONTENEDOR</span>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB">
                  <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>LARGO</p>
                      <span>12.03 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>ANCHO</p>
                      <span>2.35 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>ALTO</p>
                      <span>2.69 MTS</span>
                    </li>
                  </ul>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cNote">
                  <span><b>NOTA: </b>El peso máximo permitido variará de acuerdo a las normativas establecidas de cada naviera.</span>
                </div>
              </div>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">40' HQ</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control" id="c-incdecBtns40-hc">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40-nor">
              <img src="views/assets/img/steps/40-hc.png" alt="">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle--title">40' NOR</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cImg">
                  <img src="views/assets/img/steps/40nor.png" alt="">
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont">
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont--item">
                    <span>PESO MAX. PERMITIDO</span>
                    <span>26 TONELADAS</span>
                  </p>
                  <p class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailCont--item">
                    <span>VOL. MAX. CARGABLE</span>
                    <span>48 M³</span>
                  </p>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cMediumText">
                  <span>MEDIDAS INTERNAS CONTENEDOR</span>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB">
                  <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>LARGO</p>
                      <span>12.03 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>ANCHO</p>
                      <span>2.35 MTS</span>
                    </li>
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cDetailsB--m--item">
                      <p>ALTO</p>
                      <span>2.38 MTS</span>
                    </li>
                  </ul>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cNote">
                  <span><b>NOTA: </b>Es un contenedor con un equipo de refrigeración interno que está apagado, el cual se utiliza para cargas de menor volumen ya qu tienes 10 M³ menos que el 40 ST debido al equipo que tiene internamente.</span>
                </div>
              </div>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--label">40' NOR</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control" id="c-incdecBtns40-nor">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">-</button>
                <input type="number" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch">
          <label for="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch" switch-CFreeze="NO">
            <input type="checkbox" id="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch--chck">
          </label>
          <span>¿Necesitas contenedores refrigerados?</span>
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep">
        <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepToSelOptResultExp">
          <span>Seguir</span>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "/><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "/></g></g></svg>
        </button>
      </div>
		`);

	}else{
    /************************** ASGINAR A LAS VARIABLES GLOBALES **************************/
    v_TypeChargeImgSrc = $(this).find("a").find("div").find("img").attr("src");
    v_TypeChargeName = $(this).find("a").find("p").text();
    /************************** VALOR DEL TIPO DE CARGA **************************/
    $("#loadTypeCharge").val(v_TypeChargeName);
    /************************** ASIGNAR AL RESUMEN DEL LISTADO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("img").attr("src", v_TypeChargeImgSrc);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("span").text(v_TypeChargeName);
    
    /************************** OCULTAR - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
    /************************** OCULTAR - CONTENEDORES **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").removeClass("show");

		$(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").addClass("show");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-chargedata', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Dimensiones de carga</h3>
        <span>
          <input type="hidden" value="" id="loadQPackages" name="loadQPackages">
          <input type="hidden" value="" id="loadTotWeight" name="loadTotWeight">
          <input type="hidden" value="" id="loadTotVolume" name="loadTotVolume">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">BULTOS</label>
            <input type="number" id="val-iptPackagesNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input">
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">PESO (KG)</label>
            <input type="text" id="val-iptWeightNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="11">
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">VOLUMEN (M³)</label>
            <input type="number" id="val-iptVolumeNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="13">
          </div>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cBtnModalCalculator" id="link-showModalCalcVolum">
            <span>AYUDA - ¡CALCULAR VOLUMEN (M³) AQUÍ!</span>
          </a>
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep">
        <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTochargedata">
          <span>Seguir</span>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "/><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "/></g></g></svg>
        </button>
      </div>
    `); 
	}
});
/*========================================================================================
=                          4. AÑADIR LA CANTIDAD DE CONTENEDORES                         =
=========================================================================================*/
/************************** INCREMENTAR/DECREMENTAR INPUTS **************************/
/************************** PRIMER INPUT **************************/
$(document).on("click", "#c-incdecBtns20 button", function(){
  var tindBtn = $(this).index();
  var input20 = $(this).parent().find("input").val();
  var newValipt20 = $(this).parent().find("input").val();
  var val20inputhidden = $("#loadQContainer20").val();
  var val20inputhiddenNew = $("#loadQContainer20").val();
  if(tindBtn == 2){
    newValipt20 = parseInt(input20) + 1;
    $(this).parent().find("input").val(newValipt20);
    

    /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
    v_QContainersName20 = $(this).parent().parent().find("label").text();
    v_QContainersImgSrc20 = $(this).parent().parent().parent().find("div").find("img").attr("src");
    v_QContainersValue20 = newValipt20;

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
    $("#loadTypeContainer20").val(v_QContainersName20);
    val20inputhiddenNew = parseInt(val20inputhidden) + 1;
    $("#loadQContainer20").val(val20inputhiddenNew);

    return v_QContainersName20;
    return v_QContainersImgSrc20;

  }else if(tindBtn == 0){
    if(input20 > 0){
      newValipt20 = parseInt(input20) - 1;
      $(this).parent().find("input").val(newValipt20);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      val20inputhiddenNew = parseInt(val20inputhidden) - 1;
      $("#loadQContainer20").val(val20inputhiddenNew);
    }else{
      newValipt20 = 0;
      $(this).parent().find("input").val(newValipt20);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      $("#loadTypeContainer20").val("");
      val20inputhiddenNew = 0;
      $("#loadQContainer20").val(0);
    }
  }else{
    console.log('Sin acción');
  }
});
/************************** SEGUNDO INPUT **************************/
$(document).on("click", "#c-incdecBtns40 button", function(){
  var tindBtn = $(this).index();
  var input40 = $(this).parent().find("input").val();
  var newValipt40 = $(this).parent().find("input").val();
  var val40inputhidden = $("#loadQContainer40").val();
  var val40inputhiddenNew = $("#loadQContainer40").val();
  if(tindBtn == 2){
    newValipt40 = parseInt(input40) + 1;
    $(this).parent().find("input").val(newValipt40);

    /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
    v_QContainersName40 = $(this).parent().parent().find("label").text();
    v_QContainersImgSrc40 = $(this).parent().parent().parent().find("div").find("img").attr("src");
    v_QContainersValue40 = $(this).parent().find("input").val(newValipt40);

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
    $("#loadTypeContainer40").val(v_QContainersName40);
    val40inputhiddenNew = parseInt(val40inputhidden) + 1;
    $("#loadQContainer40").val(val40inputhiddenNew);

  }else if(tindBtn == 0){
    if(input40 > 0){
      newValipt40 = parseInt(input40) - 1;
      $(this).parent().find("input").val(newValipt40);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      val40inputhiddenNew = parseInt(val40inputhidden) - 1;
      $("#loadQContainer40").val(val40inputhiddenNew);
    }else{
      newValipt40 = 0;
      $(this).parent().find("input").val(newValipt40);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      $("#loadTypeContainer40").val("");
      val40inputhiddenNew = 0;
      $("#loadQContainer40").val(0);
    }
  }else{
    console.log('Sin acción');
  }
});
/************************** TERCERO INPUT **************************/
$(document).on("click", "#c-incdecBtns40-hc button", function(){
  var tindBtn = $(this).index();
  var input40_hq = $(this).parent().find("input").val();
  var newValipt40_hq = $(this).parent().find("input").val();
  var val40hqinputhidden = $("#loadQContainer40hq").val();
  var val40hqinputhiddenNew = $("#loadQContainer40hq").val();
  if(tindBtn == 2){
    newValipt40_hq = parseInt(input40_hq) + 1;
    $(this).parent().find("input").val(newValipt40_hq);
    /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
    v_QContainersName40_hq = $(this).parent().parent().find("label").text();
    v_QContainersImgSrc40_hq = $(this).parent().parent().parent().find("div").find("img").attr("src");
    v_QContainersValue40_hq = $(this).parent().find("input").val(newValipt40_hq);

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
    $("#loadTypeContainer40hq").val(v_QContainersName40_hq);
    val40hqinputhiddenNew = parseInt(val40hqinputhidden) + 1;
    $("#loadQContainer40hq").val(val40hqinputhiddenNew);

  }else if(tindBtn == 0){
    if(input40_hq > 0){
      newValipt40_hq = parseInt(input40_hq) - 1;
      $(this).parent().find("input").val(newValipt40_hq);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      val40hqinputhiddenNew = parseInt(val40hqinputhidden) - 1;
      $("#loadQContainer40hq").val(val40hqinputhiddenNew);
    }else{
      newValipt40_hq = 0;
      $(this).parent().find("input").val(newValipt40_hq);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      $("#loadTypeContainer40hq").val("");
      val40hqinputhiddenNew = 0;
      $("#loadQContainer40hq").val(0);
    }
  }else{
    console.log('Sin acción');
  }
});
/************************** TERCERO INPUT **************************/
$(document).on("click", "#c-incdecBtns40-nor button", function(){
  var tindBtn = $(this).index();
  var input40_nor = $(this).parent().find("input").val();
  var newValipt40_nor = $(this).parent().find("input").val();
  var val40norinputhidden = $("#loadQContainer40nor").val();
  var val40norinputhiddenNew = $("#loadQContainer40nor").val();
  if(tindBtn == 2){
    newValipt40_nor = parseInt(input40_nor) + 1;
    $(this).parent().find("input").val(newValipt40_nor);
    /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
    v_QContainersName40_nor = $(this).parent().parent().find("label").text();
    v_QContainersImgSrc40_nor = $(this).parent().parent().parent().find("div").find("img").attr("src");
    v_QContainersValue40_nor = $(this).parent().find("input").val(newValipt40_nor);

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
    $("#loadTypeContainer40nor").val(v_QContainersName40_nor);
    val40norinputhiddenNew = parseInt(val40norinputhidden) + 1;
    $("#loadQContainer40nor").val(val40norinputhiddenNew);

  }else if(tindBtn == 0){
    if(input40_nor > 0){
      newValipt40_nor = parseInt(input40_nor) - 1;
      $(this).parent().find("input").val(newValipt40_nor);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      val40norinputhiddenNew = parseInt(val40norinputhidden) - 1;
      $("#loadQContainer40nor").val(val40norinputhiddenNew);
    }else{
      newValipt40_nor = 0;
      $(this).parent().find("input").val(newValipt40_nor);
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
      $("#loadTypeContainer40nor").val("");
      val40norinputhiddenNew = 0;
      $("#loadQContainer40nor").val(0);
    }
  }else{
    console.log('Sin acción');
  }
});
/************************** SWITCH DE CONTENEDORES REFRIGERADOS **************************/
$(document).on("click", "#chck-containerfreeze", function(){
  if($(this).is(":checked")){
    $(this).parent().addClass("active");
    $(this).parent().attr("switch-CFreeze", "SÍ");
  }else{
    $(this).parent().removeClass("active");
    $(this).parent().attr("switch-CFreeze", "NO");
  }
});
/************************** VALIDAR EL BOTÓN DE PASO SIGUIENTE - DESDE CONTENEDORES **************************/
$(document).on("click", "#btn-NextStepToSelOptResultExp", function(){
  if($("#c-incdecBtns20").find("input").val() != 0 && $("#c-incdecBtns20").find("input").val() != "" || 
     $("#c-incdecBtns40").find("input").val() != 0 && $("#c-incdecBtns40").find("input").val() != "" ||
     $("#c-incdecBtns40-hc").find("input").val() != 0 && $("#c-incdecBtns40-hc").find("input").val() != "" ||
     $("#c-incdecBtns40-nor").find("input").val() != 0 && $("#c-incdecBtns40-nor").find("input").val() != ""){
    
    /************************** ASIGNAR AL RESUMEN DEL LISTADO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-qcontainer]").find("img").attr("src", v_QContainersImgSrc20);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-qcontainer]").find("p").find("span").eq(0).text(v_QContainersValue20);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-qcontainer]").find("p").find("span").eq(2).text(v_QContainersName20);
    

    /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
    sectionsSteps.moveTo('step-integservorfleteinte', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
        <span>
          <input type="hidden" value="" id="opt-genfquotation" name="opt-genfquotation">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mOpts" id="list-SelOptionResultExp">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--mOpts--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--mOpts--cardItem">
              <h3>Opción 1</h3>
              <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--mOpts--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--mOpts--cardItem">
              <h3>Opción 2</h3>
              <p>NO AGREGAR SERVICIOS <b>"SOLO DESEEO FLETE"</b></p>
            </a>
          </li>
        </ul>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
    `);

  }else{
    alert("No se ha añadido nigún contenedor. Por favor añade al menos un contenedor o selecciona LCL como tipo de carga.");
  }  
});
/************************** VALIDAR DE ACUERDO A LA OPCIÓN SELECCIONADA - ELIGE UNA OPCIÓN **************************/
$(document).on("click", "#list-SelOptionResultExp li", function(){
  var tItemSelOptExp = $(this).index();
  if(tItemSelOptExp == 0){
    $(this).addClass("selected");
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - ELIGE UNA OPCIÓN **************************/
    $("#opt-genfquotation").val("y-moreOpts");

    /************************** OCULTAR - DIMENSIONES DE CARGA **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html("");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").addClass("show");
    sectionsSteps.moveTo('step-merchandisedata', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Mercancía</h3>
        <span>
          <input type="hidden" value="" id="val-categProdquot" name="val-categProdquot">
          <input type="hidden" value="" id="val-valProdquot" name="val-valProdquot">
          <input type="hidden" value="NO" id="val-prevImports" name="val-prevImports">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CATEGORÍA</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valNameTypeProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" autocomplete="off">
                <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m" id="m-listAllNamTypeProds"></ul>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">VALOR</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valPriceProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom">
            <label for="chck-importpreview" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom--cSwitch" switch-CFreeze="NO">
              <input type="checkbox" id="chck-importpreview" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom--cSwitch--chck">
            </label>
            <span>¿Has realizado importaciones previamente?</span>
          </div>
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep">
        <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTomerchandisedata">
          <span>Seguir</span>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "/><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "/></g></g></svg>
        </button>
      </div>
    `);
  }else{
    $(this).addClass("selected");
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - ELIGE UNA OPCIÓN **************************/
    $("#opt-genfquotation").val("not-moreOpts");
    /************************** OCULTAR - CONTENEDORES **************************/
    // $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").removeClass("show");
    // $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").html("");
    /************************** OCULTAR - DIMENSIONES DE CARGA **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html("");
    /************************** OCULTAR - DATOS DE MERCANCÍA **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html("");
    /************************** MOSTRAR EL BOTÓN DE CALCULAR COTIZACIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html(`
      <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTomerchandisedata">
        <span>CALCULAR COTIZACIÓN</span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "></polygon><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "></polygon></g></g></svg>
      </button>
    `);
  }
});
/*========================================================================================
=           	 						5. AGREGAR LAS DIMENSIONES DE LA CARGA            						 =
=========================================================================================*/
/************************** RESPETAR EL MAX-LENGHT DEL INPUT **************************/
$(document).on("keyup keypress blur change", "#val-iptWeightNInterface", function(e){
	if ($(this).val().length >= parseInt($(this).attr('maxlength')) && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }
  let value = e.target.value;
  e.target.value = value.replace(/[^A-Z\d-]/g, "");
  $(this).val(function(i, v) {
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });
});
$(document).on("keyup keypress blur change", "#val-iptVolumeNInterface", function(e){
  if($(this).val().length >= parseInt($(this).attr('maxlength'))){
    return false;
  }
});
/************************** MOSTRAR EL MODAL DE LA CALCULADORA VOLUMÉTRICA **************************/
$(document).on("click","#link-showModalCalcVolum",function(){$("#cnt-modalFormCalculator").add($(".cnt-modalFormCalculator--c")).addClass("show");});
/************************** CERRAR EL MODAL DE LA CALCULADORA VOLUMÉTRICA **************************/
$(document).on("click","#btn-closeiconFormCalculator",function(){$("#cnt-modalFormCalculator").removeClass("show");});
$(document).on("click","#btn-CancelCalcValueToCalculator",function(){$("#cnt-modalFormCalculator").removeClass("show");});
let contModalCalcVolum = document.querySelector("#cnt-modalFormCalculator");
contModalCalcVolum.addEventListener("click", e => {	if(e.target === contModalCalcVolum) contModalCalcVolum.classList.remove("show");});
/************************** CARGAR - UNIDADES DE MEDIDA **************************/
function list_measurement_units(){
	$.ajax({
    url: "controllers/list_measurement_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);

    if(response.length == 0){
      template = `
        <option value="">No se encontraron resultados</option>
      `;
      $("#val-Lengthselitem").html(template);
      setTimeout(function(){
        $("#val-Lengthselitem").removeClass("show");
      }, 1000);
    }else{

      $("#val-Lengthselitem").append(`
      	<option value="0">Elige una opción</option>
      `);
      response.forEach(e => {
	      $("#val-Lengthselitem").append(`
	        <option value="${e.id}" prefixunit="${e.prefix}">${e.unit}</option>
	      `);
      });
    }
  });
}
/************************** VALIDAR SI SE SELECCIONÓ UN DATO VÁLIDO - UNIDAD DE LONGITUD **************************/
$("#val-Lengthselitem").on("change", function(){
	if($("#val-Lengthselitem").val() != 0){
		$("#msgNounLengthvalue").css({"display":"none"});
		$("#msgNounLengthvalue").text("");
	}else{
		$("#msgNounLengthvalue").css({"display":"block"});
		$("#msgNounLengthvalue").text("Campo requerido");
		$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong").find("span").text("");
	}

	/************************** FIJAR EL PREFIJO PARA LAS UNIDADES DE MEDIDA **************************/
	var prefixunit = $("#val-Lengthselitem option:selected").attr("prefixunit");
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixLong").find("span").text(prefixunit);
});
/************************** CARGAR - UNIDADES DE MEDIDA **************************/
function list_mass_units(){
	$.ajax({
    url: "controllers/list_mass_units.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    if(response.length == 0){
      template = `
        <option value="">No se encontraron resultados</option>
      `;
      $("#val-UnitWeightselitem").html(template);
      setTimeout(function(){
        $("#val-UnitWeightselitem").removeClass("show");
      }, 1000);
    }else{

      $("#val-UnitWeightselitem").append(`
      	<option value="0">Elige una opción</option>
      `);
      response.forEach(e => {
	      $("#val-UnitWeightselitem").append(`
	        <option value="${e.id}" prefixunitWeight="${e.prefix}">${e.unit}</option>
	      `);
      });
    }
  });
}
/************************** VALIDAR SI SE SELECCIONÓ UN DATO VÁLIDO - UNIDAD DE PESO **************************/
$("#val-UnitWeightselitem").on("change", function(){
	if($(this).val() != 0){
		$("#msgNounUnitWeightvalue").css({"display":"none"});
		$("#msgNounUnitWeightvalue").text("");
	}else{
		$("#msgNounUnitWeightvalue").css({"display":"block"});
		$("#msgNounUnitWeightvalue").text("Campo requerido");
		$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").text("");
	}
	/************************** FIJAR EL PREFIJO PARA LAS UNIDADES DE PESO **************************/
	var prefixunitWeight = $("#val-UnitWeightselitem option:selected").attr("prefixunitWeight");
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").text(prefixunitWeight);
	$(".cnt-modalFormCalculator--c--cForm--cBottom--cControls--control--c--cPrefixWeight").find("span").attr("id-UnitWeight", $("#val-UnitWeightselitem option:selected").val());
});
/************************** VALIDAR SI CONTIENE UN VALOR - NRO DE BULTOS **************************/
$(document).on("keyup", "#val-NroPackagestselitem", function(){	($(this).val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - LARGO **************************/
$(document).on("keyup", "#val-Longinputitem", function(){	($(this).val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ANCHO **************************/
$(document).on("keyup", "#val-Widthinputitem", function(){	($(this).val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ALTO **************************/
$(document).on("keyup", "#val-Heightinputitem", function(){	($(this).val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - PESO **************************/
$(document).on("keyup", "#val-Weightinputitem", function(){	($(this).val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");});

/************************** CREAR OBJETO PARA ALMACENAR LOS CÁLCULOS EN LA TABLA DEL MODAL **************************/
var calculateDataUser = [];
var calculateTotal = [];
/************************** FUNCIÓN PARA AGREGAR DATOS AL OBJETO DE CÁLCULO **************************/
function addCalculationData(cpackages, cweight, ctotal, cprefix){
	var listobjCalcData = {
		packages: cpackages,
		weight: cweight,
		total: ctotal,
		prefix: cprefix
	};
	calculateDataUser.push(listobjCalcData);
}
/************************** CALCULAR Y AGREGAR EL VALOR DEBAJO DEL BOTÓN CALCULAR **************************/
$(document).on("click", "#btn-addCalculateFleteModal", function(e){
	e.preventDefault();
	($("#val-Lengthselitem").val() != 0) ? $("#msgNounLengthvalue").text("") : $("#msgNounLengthvalue").text("Campo requerido");
	($("#val-UnitWeightselitem").val() != 0) ? $("#msgNounUnitWeightvalue").text("") : $("#msgNounUnitWeightvalue").text("Campo requerido");
	($("#val-NroPackagestselitem").val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");
	($("#val-Longinputitem").val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");
	($("#val-Widthinputitem").val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");
	($("#val-Heightinputitem").val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");
	($("#val-Weightinputitem").val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");

	if($("#val-Lengthselitem").val() != 0 && 
		 $("#val-UnitWeightselitem").val() != 0 &&
		 $("#val-NroPackagestselitem").val() != "" &&
		 $("#val-Longinputitem").val() != "" &&
		 $("#val-Widthinputitem").val() != "" &&
		 $("#val-Heightinputitem").val() != "" &&
		 $("#val-Weightinputitem").val() != ""){

		var typeUnitLong = $("#val-Lengthselitem").val();
		var typeUnitMass = $("#val-UnitWeightselitem").val();
		var numberPackages = $("#val-NroPackagestselitem").val();
		var valueLong = $("#val-Longinputitem").val();
		var valueWidth = $("#val-Widthinputitem").val();
		var valueHeight = $("#val-Heightinputitem").val();
		var valueWeight = $("#val-Weightinputitem").val();
		var valDividirUnitLong = 0;
		var total = 0;

		if(typeUnitLong == 1){
			valDividirUnitLong = 1000000; // UN MILLÓN - CENTÍMETROS
			total = (valueLong * valueWidth * valueHeight / valDividirUnitLong) * numberPackages;
		}else if(typeUnitLong == 5){
			valDividirUnitLong = 1; // UN MILLÓN - CENTÍMETROS
			total = (valueLong * valueWidth * valueHeight / valDividirUnitLong) * numberPackages;
		}else{
			console.log('Se seleccionó Oro valor');
		}

		// var ObjDataCalculator = {
		// 	typeSend: $("#val-typecontainerflete").attr("typecontainer"),
		// 	unitLong: $("#val-Lengthselitem").val(),
		// 	unitMass: $("#val-UnitWeightselitem").val(),
		// 	nroPackages: $("#val-NroPackagestselitem").val(),
		// 	valLong: $("#val-Longinputitem").val(),
		// 	valWidth: $("#val-Widthinputitem").val(),
		// 	valHeight: $("#val-Heightinputitem").val(),
		// 	valWeight: $("#val-Weightinputitem").val(),
		// 	placeOrigin: $("#input-vallistorigin").val(),
		// 	placeDestiny: $("#input-vallistdestiny").val()
		// };

		/************************** AGREGAR Y SUMAR A LOS TOTALES **************************/
		var ObjDataAddTable = {
			nroPackagesResult: $("#val-NroPackagestselitem").val(),
			valWeightResult: $("#val-Weightinputitem").val(),
			valTotalResult: total,
			valIdPrefixResult: $("#val-Weightinputitem").siblings("div").find("span").text()
		};

		addCalculationData(ObjDataAddTable.nroPackagesResult, ObjDataAddTable.valWeightResult, ObjDataAddTable.valTotalResult, ObjDataAddTable.valIdPrefixResult);
		list_Calculation_data();

		var listBultosSum = calculateDataUser;
		var totalPackages = 0;
		var totalWeight = 0;
		var totalVolume = 0;

		for (var i = 0; i < listBultosSum.length; i++) {
			totalPackages += parseFloat(listBultosSum[i].packages);
			totalWeight += parseFloat(listBultosSum[i].weight);
			totalVolume += parseFloat(listBultosSum[i].total);
			Add_Calculation_Total(totalPackages, totalWeight, totalVolume);
			list_Calculation_Total();
		}

		/************************** LIMPIAR LOS CONTROLES **************************/
		$("#f-formCalcModalSendInfo")[0].reset();

	}else{
		console.log('Información incompleta');
	}
});
/************************** REUNIR TODOS LOS TOTALES **************************/
function Add_Calculation_Total(totalPacks, totalWeight, totalVolume){
	listObjCalcTotal = {
		packagesTotal: totalPacks,
		weightTotal: totalWeight,
		volumeTotal: totalVolume
	};
	calculateTotal.push(listObjCalcTotal);
}
/************************** SUMAR TODOS LOS TOTALES Y MOSTRARLOS **************************/
function list_Calculation_Total(){
	listCalcTotal	= calculateTotal;
	for (var i = 0; i < listCalcTotal.length; i++) {
		$("#b-valTotalPackages").val(listCalcTotal[i].packagesTotal++);
		$("#b-valTotalWeight").val(listCalcTotal[i].weightTotal++);
		$("#b-valTotalVolume").val(listCalcTotal[i].volumeTotal++);
	}
}
/************************** LISTAR TODOS LOS CALCULOS PREVIOS **************************/
function list_Calculation_data(){
	
	var listCalc = calculateDataUser;
	$("#table-ListCalculation-data").html("");
	if(listCalc.length == 0){
		$("#table-ListCalculation-data").append(`
      <tr>
      	<td colspan="5" class="td-anyresults_table">
        	<div class="td-anyresults_table--c">
        		<span>No se encontraron resultados</span>
        	</div>
      	</td>
      </tr>
		`);
	}else{
		for (var i = 0; i < listCalc.length; i++) {
			var contador = i + 1;

			var valvolumen = listCalc[i].total;
	  	var valdecimalTwo  = listCalc[i].total - Math.trunc(listCalc[i].total);
	  	var valdecimalvalidation = valdecimalTwo.toFixed(2);
	  	var valvolumenfinal = 0;
	  	if(valdecimalvalidation == 0.00){
	  		valvolumenfinal = parseFloat(listCalc[i].total).toFixed(0);
	  	}else{
				valvolumenfinal = parseFloat(listCalc[i].total).toFixed(2);
	  	}

			$("#table-ListCalculation-data").append(`
				<tr id="tritem-${contador}">
					<td>
						<a href="#" class="del-calculation-item">
							<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px"><path d="M32,63.68a30.09,30.09,0,0,1-12.06-2.5,30.91,30.91,0,0,1-9.83-6.8A31.68,31.68,0,0,1,3.49,44.31a32.52,32.52,0,0,1,0-24.62A31.68,31.68,0,0,1,10.11,9.62a30.91,30.91,0,0,1,9.83-6.8,30.34,30.34,0,0,1,24.12,0,30.91,30.91,0,0,1,9.83,6.8,31.68,31.68,0,0,1,6.62,10.07,32.52,32.52,0,0,1,0,24.62,31.68,31.68,0,0,1-6.62,10.07,30.91,30.91,0,0,1-9.83,6.8A30.09,30.09,0,0,1,32,63.68ZM32,4.52C17.26,4.52,5.27,16.85,5.27,32S17.26,59.48,32,59.48,58.73,47.15,58.73,32,46.74,4.52,32,4.52Z"/><path d="M35.71,32.06,47,20.73A2.63,2.63,0,1,0,43.32,17L32,28.35,20.68,17A2.63,2.63,0,0,0,17,20.73L28.29,32.06,17,43.38a2.63,2.63,0,0,0,3.72,3.72L32,35.77,43.32,47.1A2.63,2.63,0,0,0,47,43.38Z"/></svg>
						</a>
					</td>
					<td>${contador}</td>
					<td>${listCalc[i].packages}</td>
					<td><span>${listCalc[i].weight}</span> <span>${listCalc[i].prefix}</span></td>
					<td><span>${valvolumenfinal}</span> <span>M³</span></td>
				</tr>
			`);
		}
	}
}
/************************** ELIMINAR UN CÁLCULO **************************/
$(document).on("click", ".del-calculation-item", function(e){
	e.preventDefault();

 	var delListCalc = calculateDataUser;
 	var delListCalcTotal = calculateTotal;
	var thisid = $(this).parent().parent();
	
	$.each(thisid, function(i, v){
		/************************** OBTENER VALORES DE LAS COLUMNAS *************************/
		var restPackages = $(this).find("td").eq(2).text();
		var restWeight = $(this).find("td").eq(3).find("span:first-child").text();
		var restVolume = $(this).find("td").eq(4).find("span:first-child").text();

		/************************** OBTENER EL VALOR DE LOS CONTROLES *************************/
		var valTotalResultPackages = $("#b-valTotalPackages").val();
		var valTotalResultWeight = $("#b-valTotalWeight").val();
		var valTotalResultVolume = $("#b-valTotalVolume").val();

		/************************** RESTAR A LOS TOTALES *************************/
		valTotalResultPackages = valTotalResultPackages - parseFloat(restPackages);
		valTotalResultWeight = valTotalResultWeight - parseFloat(restWeight);
		valTotalResultVolume = valTotalResultVolume - parseFloat(restVolume);

		/************************** VALIDACIÓN DE DECIMALES ANTES DE FIJAR EL VALOR **************************/
  	var valdecimalTwoFinal  = valTotalResultVolume - Math.trunc(valTotalResultVolume);
  	var valdecimalvalidationFinal = valdecimalTwoFinal.toFixed(2);
  	var valTotalvolumenfinal = 0;
  	if(valdecimalvalidationFinal == 0.00){
  		valTotalvolumenfinal = parseFloat(valTotalResultVolume).toFixed(0);
  	}else{
			valTotalvolumenfinal = parseFloat(valTotalResultVolume).toFixed(2);
  	}

  	/************************** DEVOLVER LA RESTA A LOS INPUTS DE TOTALES **************************/
		$("#b-valTotalPackages").val(valTotalResultPackages);
		$("#b-valTotalWeight").val(valTotalResultWeight);
		$("#b-valTotalVolume").val(valTotalvolumenfinal);
		
		/************************** ELIMINAR FILA **************************/
		$(this).remove();
		delListCalc.splice($(this), 1);
	});

	if(delListCalc.length == 0){
		list_Calculation_data();
		/************************** RELLENAR LOS INPUT DE TOTALES CON 0 **************************/
		$("#b-valTotalPackages").val(0);
		$("#b-valTotalWeight").val(0);
		$("#b-valTotalVolume").val(0);
	}else{
		list_Calculation_data();
	}
});
/************************** CERRAR EL MODAL SIN GUARDAR LOS CAMBIOS **************************/
$(document).on("click", "#btn-CancelCalcValueToCalculator", function(e){
	e.preventDefault();
	$("#cnt-modalFormCalculator").removeClass("show");
	$(".cnt-modalFormCalculator--c").removeClass("show");
});
/************************** AGREGAR LOS VALORES AL PRIMER MODAL **************************/
$(document).on("click", "#btn-addCalcValueToCalculator", function(e){
	e.preventDefault();

	($("#val-Lengthselitem").val() != 0) ? $("#msgNounLengthvalue").text("") : $("#msgNounLengthvalue").text("Campo requerido");
	($("#val-UnitWeightselitem").val() != 0) ? $("#msgNounUnitWeightvalue").text("") : $("#msgNounUnitWeightvalue").text("Campo requerido");
	($("#val-NroPackagestselitem").val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");
	($("#val-Longinputitem").val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");
	($("#val-Widthinputitem").val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");
	($("#val-Heightinputitem").val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");
	($("#val-Weightinputitem").val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");

	if($("#b-valTotalPackages").val() != "" && $("#b-valTotalPackages").val() != 0 &&
		 $("#b-valTotalWeight").val() != "" && $("#b-valTotalWeight").val() != 0 &&
		 $("#b-valTotalVolume").val() != "" && $("#b-valTotalVolume").val() != 0){

		/************************** OBTENER LOS VALORES DE LOS TOTALES **************************/
		var valCalculadoPackages = $("#b-valTotalPackages").val();
		var valCalculadoWeight = $("#b-valTotalWeight").val();
		var valCalculadoVolume = $("#b-valTotalVolume").val();
		var valCalculadoWeightPrefix = $("#b-valTotalWeight").parent().find("div").find("span").text();
		var valCalculadoVolumePrefix = $("#b-valTotalVolume").parent().find("div").find("span").text();
		/************************** DEVOLVER LOS VALORES A LAS CAJAS DE TEXTO ANTERIOR **************************/
		$("#val-iptPackagesNInterface").val(valCalculadoPackages);
		$("#val-iptWeightNInterface").val(valCalculadoWeight);
		$("#val-iptVolumeNInterface").val(valCalculadoVolume);
		
		/************************** SOBREESCRIBIR VALORES DEL LOCALSTORAGE **************************/
		localStorage.setItem("tot_packages", valCalculadoPackages);
		localStorage.setItem("tot_weight", valCalculadoWeight);
		localStorage.setItem("tot_volume", valCalculadoVolume);

		/************************** OCULTAR Y LIMPIAR EL MODAL **************************/
		$("#cnt-modalFormCalculator").removeClass("show");
		$(".cnt-modalFormCalculator--c").removeClass("show");
		$("#detail-CalcToModalAssoc").addClass("show");
		$("#msgNounLengthvalue").text("");
		$("#msgNounUnitWeightvalue").text("");
		$("#msgNounNroPackagesvalue").text("");
		$("#msgNounLongvalue").text("");
		$("#msgNounWidthvalue").text("");
		$("#msgNounHeightvalue").text("");
		$("#msgNounWeightvalue").text("");
	}else{
		console.log('No hay registros a fijar');
	}
});
/************************** VALIDAR EL BOTÓN DE PASO SIGUIENTE DESDE - DIMENSIONES DE CARGA **************************/
$(document).on("click", "#btn-NextStepTochargedata", function(){
  if($("#val-iptPackagesNInterface").val() != 0 && $("#val-iptPackagesNInterface").val() != "" &&
     $("#val-iptWeightNInterface").val() != 0 && $("#val-iptWeightNInterface").val() != "" &&
     $("#val-iptVolumeNInterface").val() != 0 && $("#val-iptVolumeNInterface").val() != ""){

    /************************** ASIGNAR A LAS VARIABLES GLOBALES **************************/
    v_ValQuantityPackages = $("#val-iptPackagesNInterface").val();
    v_ValTotalWeight = $("#val-iptWeightNInterface").val();
    v_ValTotalVolume = $("#val-iptVolumeNInterface").val();

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").addClass("show");
    sectionsSteps.moveTo('step-merchandisedata', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Mercancía</h3>
        <span>
          <input type="hidden" value="" id="val-categProdquot" name="val-categProdquot">
          <input type="hidden" value="" id="val-valProdquot" name="val-valProdquot">
          <input type="hidden" value="NO" id="val-prevImports" name="val-prevImports">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CATEGORÍA</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valNameTypeProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" autocomplete="off">
                <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m" id="m-listAllNamTypeProds"></ul>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">VALOR</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valPriceProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom">
            <label for="chck-importpreview" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom--cSwitch" switch-CFreeze="NO">
              <input type="checkbox" id="chck-importpreview" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cBottom--cSwitch--chck">
            </label>
            <span>¿Has realizado importaciones previamente?</span>
          </div>
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep">
        <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTomerchandisedata">
          <span>Seguir</span>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "/><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "/></g></g></svg>
        </button>
      </div>
    `);

    /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");
  }else{
    alert("Por favor, rellena todos los campos relativos a las dimensiones de carga.");
  }
});
/*=====================================================================================
=            							6. AGREGAR LOS DATOS DE MERCANCÍA            								=
======================================================================================*/
/************************** LISTAR LOS TIPOS DE PRODUCTOS **************************/
function listProductsUser(searchVal){
  $.ajax({
    url: "controllers/list_products.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";
    if(response.length == 0){
      template = `
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item">
          <p>No encontado</p>
          <small><span>Regulador: </span><span>NO REQUIERE</span></small>
        </li>
      `;
      $("#m-listAllNamTypeProds").html(template);
      setTimeout(function(){
        $("#m-listAllNamTypeProds").removeClass("show");
      }, 4500);
    }else{
      response.forEach(e => {
      var nounRegOne = "";
      var nounRegTwo = "";
      var nounOneAndTwoRegs = "";

      (e.reguladorOne == null || e.reguladorOne == "") ? nounRegOne = "NO REQUIERE" : nounRegOne = e.reguladorOne;
      (e.reguladorTwo == null || e.reguladorTwo == "") ? nounRegTwo = "NO REQUIERE" : nounRegTwo = e.reguladorTwo;
      if(e.reguladorOne == null || e.reguladorOne == "" && e.reguladorTwo == null || e.reguladorTwo == ""){
        nounOneAndTwoRegs = "NO REQUIERE";
      }else if(e.reguladorOne == null || e.reguladorOne == ""){
        nounOneAndTwoRegs = ""+ e.reguladorTwo;
      }else if(e.reguladorTwo == null || e.reguladorTwo == ""){
        nounOneAndTwoRegs = ""+ e.reguladorOne;
      }else{
        nounOneAndTwoRegs = e.reguladorOne + " / " + e.reguladorTwo;
      }
      template += `
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item" id="${e.id_prod}">
          <p>${e.name_prod}</p>
          <small>
            <span>Regulador: </span>
            <span>${nounOneAndTwoRegs}</span>
          </small>
        </li>
      `;
      });
      $("#m-listAllNamTypeProds").html(template);
    }
  });
}
/************************** MOSTRAR EL LISTADO DE TIPOS DE PRODUCTOS **************************/
$(document).on("focus", "#ipt-valNameTypeProdNInterface", function(){
	$("#m-listAllNamTypeProds").addClass("show");
  listProductsUser();
});
$(document).on("keyup", "#ipt-valNameTypeProdNInterface", function(){
  $("#m-listAllNamTypeProds").addClass("show");
  var searchVal = $(this).val();
  if(searchVal != ""){
   	$("#ipt-valNameTypeProdNInterface").attr("idproduct", "");
    listProductsUser(searchVal);
  }else{
    setTimeout(function(){
      $("#m-listAllNamTypeProds").removeClass("show");
    }, 4500);
    listProductsUser();
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - TIPOS DE PRODUCTOS **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllNamTypeProds").removeClass("show");
  $("#ipt-valNameTypeProdNInterface").attr("idproduct", $(this).attr("id"));
  $("#ipt-valNameTypeProdNInterface").val($(this).find("p").text());
  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
  $("#val-categProdquot").val($(this).find("p").text());
});
/************************** VALIDAR INPUT - VALOR DE PRODUCTO IMPORTADO **************************/
$(document).on("input", "#ipt-valPriceProdNInterface", function(e){
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }else{
    /************************** LIMITAR EL MÁXMIMO DE CARACTERES **************************/
    if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
      return false;
    }
  }

  let value = e.target.value;
  e.target.value = value.replace(/[^A-Z\d-]/g, "");
  $(this).val(function(i, v) {
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".") + " USD";
  });
  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
  $("#val-valProdquot").val($(this).val());
});
/************************** VALIDAR SI CONTIENE ALGÚN VALOR NULO O 0 **************************/
$(document).on("keyup", "#ipt-valPriceProdNInterface", function(){
  if($(this).val() == "" || $(this).val() == 0 || $(this).val() == " USD" || $(this).val() == ".00" || $(this).val() == 0.00){
    $("#MsgItemValueProdRequired").text("Ingrese valor exacto, SIN DECIMALES");
    $(this).val("");
  }else{
    $("#MsgItemValueProdRequired").text("");
  }
});
/************************** SWITCH DE IMPORTACIONES PREVIAS **************************/
$(document).on("click", "#chck-importpreview", function(){
	if($(this).is(":checked")){
		$(this).parent().addClass("active");
		$(this).parent().attr("switch-CFreeze", "SÍ");
    var yesImportPrev = $(this).parent().attr("switch-CFreeze");
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
    $("#val-prevImports").val(yesImportPrev);
	}else{
		$(this).parent().removeClass("active");
		$(this).parent().attr("switch-CFreeze", "NO");
    var notImportPrev = $(this).parent().attr("switch-CFreeze");
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
    $("#val-prevImports").val(notImportPrev);
	}
});
/************************** VALIDAR EL BOTÓN DE PASOS SIGUIENTES DESDE - MERCANCÍA **************************/
$(document).on("click", "#btn-NextStepTomerchandisedata", function(){
  if($("#ipt-valNameTypeProdNInterface").val() != "" && $("#ipt-valNameTypeProdNInterface").val() != 0 &&
     $("#ipt-valNameTypeProdNInterface").attr("idproduct") &&
     $("#ipt-valPriceProdNInterface").val() != "" && $("#ipt-valPriceProdNInterface").val() != 0){

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
    $("#val-categProdquot").val($("#ipt-valNameTypeProdNInterface").val());
    $("#val-valProdquot").val($("#ipt-valPriceProdNInterface").val());
    $("#val-prevImports").val($("#chck-importpreview").parent().attr("switch-CFreeze"));

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").addClass("show");
    sectionsSteps.moveTo('step-insuremerchandise', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Quieres asegurar la mercancía?</h3>
        <span>
          <input type="hidden" value="" id="res-insuremerch" name="res-insuremerch">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-insuremerchandise">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/insurance.png" alt="">
              </div>
              <p>SÍ</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-insurance.png" alt="">
              </div>
              <p>NO</p>
            </a>
          </li>
        </ul>
      </div>
    `);

  }else{
    alert("Por favor, elige el tio de mercancía y su valor");
  }
});
/*===================================================================================
=                     7. AGREGAR O NO SEGURO DE MERCANCÍA                           =
====================================================================================*/
$(document).on("click", "#list-insuremerchandise li", function(){
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-customsclearance]").addClass("show");
  var tinsuremerchandise = $(this).index();
  if(tinsuremerchandise == 0){

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - QUIERES ASEGURAR LA MERCANCÍA **************************/
    $("#res-insuremerch").val("SI");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-customsclearance', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-customsclearance]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas despacho de aduanas?</h3>
        <span>
          <input type="hidden" value="" id="res-requireclearance" name="res-requireclearance">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-customsclearance">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/customs-clearance.png" alt="">
              </div>
              <p>SÍ</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-customs-clearance.png" alt="">
              </div>
              <p>NO</p>
            </a>
          </li>
        </ul>
      </div>
    `);
  }else{
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - QUIERES ASEGURAR LA MERCANCÍA **************************/
    $("#res-insuremerch").val("NO");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-customsclearance', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-customsclearance]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas despacho de aduanas?</h3>
        <span>
          <input type="hidden" value="" id="res-requireclearance" name="res-requireclearance">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-customsclearance">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/customs-clearance.png" alt="">
              </div>
              <p>SÍ</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-customs-clearance.png" alt="">
              </div>
              <p>NO</p>
            </a>
          </li>
        </ul>
      </div>
    `);
  }
});
/*===================================================================================
=                     8. AGREGAR DESPACHO DE ADUANAS                                =
====================================================================================*/
$(document).on("click", "#list-customsclearance li", function(){
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").addClass("show");
  var tcustomsclearance = $(this).index();
  if(tcustomsclearance == 0){
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - NECESITAS DESPACHO DE ADUANAS **************************/
    $("#res-requireclearance").val("SI");

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-requirespickup', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas Transporte?</h3>
        <span>
          <input type="hidden" value="" id="opt-reqtransport" name="opt-reqtransport">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-requirespickup">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/inland-trans.png" alt="">
              </div>
              <p>SÍ</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-inland-trans.png" alt="">
              </div>
              <p>NO</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
    `);
  }else{
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - NECESITAS DESPACHO DE ADUANAS **************************/
    $("#res-requireclearance").val("NO");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-requirespickup', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas Transporte?</h3>
        <span>
          <input type="hidden" value="" id="opt-reqtransport" name="opt-reqtransport">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-requirespickup">
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/inland-trans.png" alt="">
              </div>
              <p>SÍ</p>
            </a>
          </li>
          <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-inland-trans.png" alt="">
              </div>
              <p>NO</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
    `);
  }
});
/*===================================================================================
=                     9. AGREGAR - RECOGIDA                                         =
====================================================================================*/
$(document).on("click", "#list-requirespickup li", function(){
  var trequirespickup = $(this).index();
  if(trequirespickup == 0){
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - NECESITAS TRANSPORTE **************************/
    $("#opt-reqtransport").val("SI")

    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").addClass("show");
    sectionsSteps.moveTo('step-pickuplocation', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Recogida - Ubicación</h3>
        <span>
          <input type="hidden" value="" id="plc-pickuploc" name="plc-pickuploc">
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--label">DISTRITO</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange">
                <input type="text" id="ipt-valDistricByCountryNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--input" autocomplete="off">
                <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m" id="m-listAllDistricsByCountry"></ul>
              </div>
            </div>
          </div>
          <!--<div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cBottom">
            <label for="chck-insuremerchandise" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cBottom--cSwitch" switch-CFreeze="NO">
              <input type="checkbox" id="chck-insuremerchandise" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cBottom--cSwitch--chck">
            </label>
            <span>¿Quieres asegurar la mercancía?</span>
          </div>-->
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
    `);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html("");
  }else{
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - NECESITAS TRANSPORTE **************************/
    $("#opt-reqtransport").val("NO")
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").html("");
    /************************** MOSTRAR EL BOTÓN DE COTIZACIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html(`
      <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTomerchandisedata">
        <span>CALCULAR COTIZACIÓN</span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "></polygon><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "></polygon></g></g></svg>
      </button>
    `);
  }
});
/*===================================================================================
=	            				10. AGREGAR DATOS DE UBICACIÓN - RECOGIDA            					=
====================================================================================*/
/************************** SWITCH DE AGREGAR SEGURO **************************/
// $(document).on("click", "#chck-insuremerchandise", function(){
// 	if($(this).is(":checked")){
// 		$(this).parent().addClass("active");
// 		$(this).parent().attr("switch-CFreeze", "SÍ");
// 	}else{
// 		$(this).parent().removeClass("active");
// 		$(this).parent().attr("switch-CFreeze", "NO");
// 	}
// });
/************************** LISTAR LOS DISTRITOS POR ID DE PAÍS **************************/
function listDistricsByCountry(searchVal){
  $.ajax({
    url: "controllers/list_districs.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal, idpaisdestiny : ipt_idPortcountryDestiny},
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";
    if(response.length == 0){
      template = `
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--anyresult">
          <p>No encontado</p>
        </li>
      `;
      $("#m-listAllDistricsByCountry").html(template);
      setTimeout(function(){
        $("#m-listAllDistricsByCountry").removeClass("show");
      }, 4500);
    }else{
      response.forEach(e => {
      template += `
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.id_province}">
           <span>${e.distric}</span>
         </li>
      `;
      });
      $("#m-listAllDistricsByCountry").html(template);
    }
  });
}
/************************** MOSTRAR EL LISTADO DE DISTRITO POR PAÍS DE DESTINO **************************/
$(document).on("focus", "#ipt-valDistricByCountryNInterface", function(){
	$("#m-listAllDistricsByCountry").addClass("show");listDistricsByCountry();
	sectionsSteps.setAutoScrolling(false);
});
$(document).on("blur", "#ipt-valDistricByCountryNInterface", function(){
	sectionsSteps.setAutoScrolling(true);
});
$(document).on("keyup", "#ipt-valDistricByCountryNInterface", function(){
  $("#m-listAllDistricsByCountry").addClass("show");
  var searchVal = $(this).val();
  if(searchVal != ""){
   	$("#ipt-valDistricByCountryNInterface").attr("iddistrict", ""); 
    listDistricsByCountry(searchVal);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html("");
  }else{
    listDistricsByCountry();
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - DISTRITO POR PAÍS DE DESTINO **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllDistricsByCountry").removeClass("show");
  $("#ipt-valDistricByCountryNInterface").attr("iddistrict", $(this).attr("id"));
  $("#ipt-valDistricByCountryNInterface").val($(this).find("span").text());

  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - RECOGIDA UBICACIÓN **************************/
  $("#plc-pickuploc").val($(this).find("span").text());

  /************************** MOSTRAR EL BOTÓN DE COTIZACIÓN **************************/
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html(`
    <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepTopickuplocation">
      <span>CALCULAR COTIZACIÓN</span>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "></polygon><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "></polygon></g></g></svg>
    </button>
  `);
});