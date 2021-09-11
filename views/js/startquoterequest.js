$(() => {
  ChangesSibblingsLinks();
  hiddenAllNextSteps();
  /************************** LISTAR LOS PUERTOS DE ORIGEN Y DE DESTINO DE ACUERDO AL ID RECIBIDO POR POST **************************/
	listPortOriginandDestiny();
	/************************** LISTAR LAS UNIDADES DE MEDIDA EN EL MODAL **************************/
	list_measurement_units();
	list_mass_units();
	/************************** LISTAR LOS TIPOS DE PRODUCTOS **************************/
	listProductsUser();
	/************************** LISTAR LOS DISTRITOS DE ACUERDO AL PAÍS DE DESTINO **************************/
	listrateLCLTransport();
});
////OTRAS TAREAS - MEJORA DE UI Y UX
/* - Mostrar al inicio solo los pasos a usar antes de cada elección, luego ir añadiendo o quitando de acuerdo a los elementos seleccionados
*/

/************************** RECOGER LAS VARIABLES RECIBIDAS POR POST **************************/
var ipt_idTypeTransport = $("#ipt-vtypetranspinit").val(),
    ipt_idPortOrigin = $("#ipt-vportidOrigin").val(),
		ipt_idPortcountryOrigin = $("#ipt-vportidcountryOrigin").val(),
		ipt_idPortDestiny = $("#ipt-vportidDestiny").val(),
		ipt_idPortcountryDestiny = $("#ipt-vportidcountryDestiny").val();

/*===============================================================
=            LISTAR LAS TARIFAS DEL PUERTO DE ORIGEN            =
===============================================================*/
/************************** VALORES PARA CALCULAR EL FLETE - SIN IGV **************************/
var rate_5cbm = 0,
    rate_15cbm = 0,
    twodecimal_rate_5cbm = 0,
    twodecimal_rate_15cbm = 0;

var nameOrigin = $("#val-port-norigin").val();
var arrPortOrigin = nameOrigin.split(', ');

/************************** CAMBIAR/REMOVER EL ESTADO ENTRE OPCIONES **************************/
function ChangesSibblingsLinks(){
  $(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--m a", function(){
    $(this).addClass("active").siblings().removeClass("active");
  });
}
/************************** REDONDEAR A 2 DECIMALES - ALTERNATIVA .toFixed(2) **************************/
function roundToTwo(num){    
  return +(Math.round(num + "e+2")  + "e-2");
}
/************************** FUNCIÓN - LIMITAR A DOS DECIMALES SIN REDONDEO **************************/
function twodecimals(n) {
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
/************************** RETORNAR - PRIMERA LETRA EN MAYÚSCULA **************************/
function firstToUppercase(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
/************************** PLUGIN - FULLPAGE.JS **************************/
const sectionsSteps = new fullpage('#fullpage', {
  anchors:['step-typeoperation',
           'step-typetransport',
  				 'step-chargeload', 
  				 'step-qcontainers',
  				 'step-chargedata',
           'step-integservorfleteinte',
  				 'step-merchandisedata',
  				 'step-insuremerchandise',
  				 'step-requirespickup',
  				 'step-pickuplocation'],
  verticalCentered: false,
  scrollingSpeed: 500,
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
/************************** ASIGNAR EL ID DEL TIPO DE TRANSPORTE **************************/
$(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typetransportnumb]").html(`
  <input type="hidden" id="idtypetransportsendinit" name="idtypetransportsendinit" value="${ipt_idTypeTransport}">
`);
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
		/************************** LISTAR LOS NOMBRES - PUERTO DE ORIGEN **************************/
    $.each(result, function(i, e){
      tempOriginDestiny += `
        <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cNameFlag">
            <span>ORIGEN</span>
          </div>
          <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cDescMap">
            <span>${e.nom_puerto} - ${e.nom_pais}</span>
            <input type="hidden" id="val-originPortSend" name="val-originPortSend" value="${e.nom_puerto} - ${e.nom_pais}" class="n-val-sd">
          </div>
        </div>
      `;
    });
    /************************** LISTAR LOS NOMBRES - PUERTO DE DESTINO **************************/
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
              <input type="hidden" id="val-destinyPortSend" name="val-destinyPortSend" value="${e.nom_puerto} - ${e.nom_pais}" class="n-val-sd">
            </div>
          </div>
        `;
      });
      $("#id-resumeLeftQuoteCamel .cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-firstChargeLoad]").html(tempOriginDestiny);
    });
	});
}
/*====================================================================================
=                         2. ELEGIR EL TIPO DE OPERACIÓN                             =
====================================================================================*/
$(document).on("click", "#list-typeOperationItems a", function(){
  var tTypeOperation = $(this).index();
  if(tTypeOperation == 0){
    localStorage.setItem("key_v-totalflette", 0);
    $(this).removeClass("active");
    $(this).css({
      "opacity" : "0.5",
      "border" : "unset"
    });
    //alert("Esta opción aún no está disponible. Por favor, pase a elegir IMPORTACIÓN");
    /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
    $("#idMessageSteps-prcss").html(`
      <div class="cntMessageSteps-prcss--cont">
        <div class="cntMessageSteps-prcss--cont--c">
          <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
          <h3 class="cntMessageSteps-prcss--cont--c--title">No disponible</h3>
          <p class="cntMessageSteps-prcss--cont--c--text">Esta opción aún no esta disponible. Por favor, pase a elegir <b>IMPORTACIÓN.</b></p>
        </div>
      </div>
    `)
    /************************** CERRAR EL MODAL **************************/
    setTimeout(function(){
      $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
    }, 6500)
    $("#btnclose-modalMessage").on("click", function(){
      $(this).parent().parent().remove();
    });
    /************************** OCULTAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").removeClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("");
    /************************** OCULTAR TODOS LOS PASOS ABIERTOS EN CASO SE VUELVA HASTA ESTE PASO **************************/
    /************************** OCULTAR LOS OTROS PASOS AJENOS A ESTA ELECCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").html("");
  }else{
    localStorage.setItem("key_v-totalflette", 0);
    localStorage.setItem("key_typeOp", $(this).find("li").find("p").text());
    /************************** ASIGNAR A LA VARIABLE BLOBAL **************************/
    v_TypeOp = $(this).find("li").find("p").text();
    /************************** VALOR DEL TIPO DE OPERACIÓN **************************/
    $("#loadTypeOpe").val(v_TypeOp);
    /************************** OCULTAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").removeClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("");
    
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").addClass("show");
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-typetransport', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de Transporte</h3>
        <span>
          <span>
            <input type="hidden" id="loadTypeTranport" name="loadTypeTranport" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeTransporteSelectItems">
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/type_transport_06.png" alt="" loading="lazy" width="100" height="100">
              </div>
              <p>GENERAL</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/type_transport_03.png" alt="" loading="lazy" width="100" height="100">
              </div>
              <p>IMO</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/type_transport_05.png" alt="" loading="lazy" width="100" height="100">
              </div>
              <p>REFRIGERADO</p>
            </li>
          </a>
        </ul>
      </div>
    `);
    /************************** MOSTRAR EN EL RESUMEN - LADO IZQUIERDO **************************/
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
/*==============================================================================================
=            2.5. ELEGIR EL TIPO DE TRANSPORTE DE CARGA: GENERAL, IMO O REGRIGERADO            =
==============================================================================================*/
$(document).on("click","#list-typeTransporteSelectItems a",function(){
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").addClass("show");
  var ttypeTransport = $(this).index();
  if(ttypeTransport == 0){
    /************************** RESETEAR EL VALOR FINAL DEL FLETE, SI SE REGRESA HASTA ESTE PUNTO **************************/
    localStorage.setItem("key_v-totalflette", 0);
    /************************** AGREGAR A LA VARIABLE LOCAL **************************/
    localStorage.setItem("key_typeTransp", "General");
    /************************** ASIGNAR AL VALOR DEL INPUT DE ENVÍO POST **************************/
    $("#loadTypeTranport").val("general");
    /************************** MOSTRAR EN EL RESUMEN - LADO IZQUIERDO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typetransportcharge]").html(`
      <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
        <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon">
           <img class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon--icon" loading="lazy" src="views/assets/img/steps/type_transport_06.png">
         </div>
        <span>T. GENERAL</span>
      </div>
    `);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-chargeload', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").html(`
     <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
        <span>
          <span>
            <input type="hidden" id="loadTypeCharge" name="loadTypeCharge" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/fcl.png" alt="" loading="lazy">
              </div>
              <p>FCL</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/lcl.png" alt="" loading="lazy">
              </div>
              <p>LCL</p>
            </li>
          </a>
        </ul>
      </div>
    `);
  }else if(ttypeTransport == 1){
    /************************** RESETEAR EL VALOR FINAL DEL FLETE, SI SE REGRESA HASTA ESTE PUNTO **************************/
    localStorage.setItem("key_v-totalflette", 0);
    /************************** AGREGAR A LA VARIABLE LOCAL **************************/
    localStorage.setItem("key_typeTransp", "Imo");
    /************************** ASIGNAR AL VALOR DEL INPUT DE ENVÍO POST **************************/
    $("#loadTypeTranport").val("imo");
    /************************** MOSTRAR EN EL RESUMEN - LADO IZQUIERDO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typetransportcharge]").html(`
      <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
        <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon">
           <img class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon--icon" loading="lazy" src="views/assets/img/steps/type_transport_03.png">
         </div>
        <span>T. IMO</span>
      </div>
    `);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-chargeload', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").html(`
     <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
        <span>
          <span>
            <input type="hidden" id="loadTypeCharge" name="loadTypeCharge" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/fcl.png" alt="" loading="lazy">
              </div>
              <p>FCL</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/lcl.png" alt="" loading="lazy">
              </div>
              <p>LCL</p>
            </li>
          </a>
        </ul>
      </div>
    `);
  }else{
    /************************** RESETEAR EL VALOR FINAL DEL FLETE, SI SE REGRESA HASTA ESTE PUNTO **************************/
    localStorage.setItem("key_v-totalflette", 0);
    /************************** AGREGAR A LA VARIABLE LOCAL **************************/
    localStorage.setItem("key_typeTransp", "Refrigerado");
    /************************** ASIGNAR AL VALOR DEL INPUT DE ENVÍO POST **************************/
    $("#loadTypeTranport").val("refrigerado");
    /************************** MOSTRAR EN EL RESUMEN - LADO IZQUIERDO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typetransportcharge]").html(`
      <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep">
        <div class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon">
           <img class="cont-MainCamelLog--c--contResumeCalc--item--cardStep--cImgIcon--icon" loading="lazy" src="views/assets/img/steps/type_transport_05.png">
         </div>
        <span>T. REFRIGERADO</span>
      </div>
    `);
    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    sectionsSteps.moveTo('step-chargeload', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").html(`
     <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Tipo de carga</h3>
        <span>
          <span>
            <input type="hidden" id="loadTypeCharge" name="loadTypeCharge" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/fcl.png" alt="" loading="lazy">
              </div>
              <p>FCL</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/lcl.png" alt="" loading="lazy">
              </div>
              <p>LCL</p>
            </li>
          </a>
        </ul>
      </div>
    `);
  }
});
/*=======================================================================================
=            									3. ELEGIR EL TIPO DE CARGA            									  =
=========================================================================================*/
$(document).on("click", "#list-typeChargeLoadItems a", function(){
	var tTypeChargeLoad = $(this).index();
	if(tTypeChargeLoad == 0){
    localStorage.setItem("key_v-totalflette", 0);
    localStorage.setItem("key_typeChrg", $(this).find("li").find("p").text());
    /************************** ASIGNAR A LAS VARIABLES GLOBALES **************************/
    v_TypeChargeImgSrc = $(this).find("li").find("div").find("img").attr("src");
    v_TypeChargeName = $(this).find("li").find("p").text();
    /************************** VALOR DEL TIPO DE CARGA **************************/
    $("#loadTypeCharge").val(v_TypeChargeName);
    /************************** OCULTAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").removeClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("");
    /************************** ASIGNAR AL RESUMEN DEL LISTADO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("img").attr("src", v_TypeChargeImgSrc);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("span").text(v_TypeChargeName);
    /************************** LIMPIAR EL LISTADO DE RESUMEN IZQUIERDO - DIMENSIONES DE CARGA **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:nth-child(2)").text("");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:nth-child(2)").text("");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:nth-child(2)").text("");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:first-child").text("");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:first-child").text("");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:first-child").text("");
    
    /************************** OCULTAR LOS OTROS PASOS AJENOS A ESTA ELECCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation]").html("");

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
	  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").addClass("show");
		sectionsSteps.moveTo('step-qcontainers', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-qcontainers]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Contenedores</h3>
        <span>
          <span>
            <input type="hidden" value="" id="loadTypeContainer20" name="loadTypeContainer20" class="n-val-sd">
            <input type="hidden" value="0" id="loadQContainer20" name="loadQContainer20" class="n-val-sd">
            <input type="hidden" value="" id="loadTypeContainer40" name="loadTypeContainer40" class="n-val-sd">
            <input type="hidden" value="0" id="loadQContainer40" name="loadQContainer40" class="n-val-sd">
            <input type="hidden" value="" id="loadTypeContainer40hq" name="loadTypeContainer40hq" class="n-val-sd">
            <input type="hidden" value="0" id="loadQContainer40hq" name="loadQContainer40hq" class="n-val-sd">
            <input type="hidden" value="" id="loadTypeContainer40nor" name="loadTypeContainer40nor" class="n-val-sd">
            <input type="hidden" value="0" id="loadQContainer40nor" name="loadQContainer40nor" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems" id="list-mIptsItemsContainers">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip20">
              <img src="views/assets/img/steps/20.png" alt="" loading="lazy">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle--title">20' STANDARD</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cImg">
                  <img src="views/assets/img/steps/20std.png" alt="" loading="lazy">
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
                <input type="number" id="ipt-qvalContainer20ST" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40">
              <img src="views/assets/img/steps/40.png" alt="" loading="lazy">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cTitle--title">40' STANDARD</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipR--cImg">
                  <img src="views/assets/img/steps/40std.png" alt="" loading="lazy">
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
                <input type="number" id="ipt-qvalContainer40ST" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40-hq">
              <img src="views/assets/img/steps/40-hc.png" alt="" loading="lazy">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle--title">40' HQ</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cImg">
                  <img src="views/assets/img/steps/40hq.png" alt="" loading="lazy">
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
                <input type="number" id="ipt-qvalContainer40HQ" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg" id="info-tooltip40-nor">
              <img src="views/assets/img/steps/40-hc.png" alt="" loading="lazy">
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle">
                  <h3 class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cTitle--title">40' NOR</h3>
                </div>
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cImg--ctooltipL--cImg">
                  <img src="views/assets/img/steps/40nor.png" alt="" loading="lazy">
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
                <input type="number" id="ipt-qvalContainer40NOR" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--input" maxlength="16" value="0" min="0" max="50">
                <button type="button" class="cont-MainCamelLog--c--contSteps--item--cStep--mIptsItems--item--cC--control--btn">+</button>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch">
          <label for="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch" switch-CFreeze="NO">
            <input type="checkbox" id="chck-containerfreeze" class="cont-MainCamelLog--c--contSteps--item--cStep--cBtnSwitch--cSwitch--chck">
          </label>
          <span>¿Necesitas contenedores refrigerados?</span>
        </div>-->
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep">
        <button type="button" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btn" id="btn-NextStepToSelOptResultExp">
          <span>Seguir</span>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><g><polygon points="19.318,43.363 19.318,61.189 49.497,95 79.675,61.189 79.675,43.363 49.497,77.174   "/><polygon points="50.504,38.811 20.326,5 20.326,24.872 49.497,60.537 79.675,24.872 80.682,5   "/></g></g></svg>
        </button>
      </div>
		`);
    

	}else{
    localStorage.setItem("key_v-totalflette", 0);
    localStorage.setItem("key_typeChrg", $(this).find("li").find("p").text());
    /************************** ASIGNAR A LAS VARIABLES GLOBALES **************************/
    v_TypeChargeImgSrc = $(this).find("li").find("div").find("img").attr("src");
    v_TypeChargeName = $(this).find("li").find("p").text();
    /************************** LIMPIAR EL LISTADO DE RESUMEN IZQUIERDO - CONTENEDORES **************************/
    /** LIMIPIAR 20' **/
    $("div[data-merchandisetype=rsm-qcontainer20]").find("img").attr("src", "");
    $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(0).text("");
    $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(1).text("");
    $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(2).text("");
    /** LIMIPIAR 40' **/
    $("div[data-merchandisetype=rsm-qcontainer40]").find("img").attr("src", "");
    $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(0).text("");
    $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(1).text("");
    $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(2).text("");
    /** LIMIPIAR 40hq **/
    $("div[data-merchandisetype=rsm-qcontainer40hq]").find("img").attr("src", "");
    $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(0).text("");
    $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(1).text("");
    $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(2).text("");
    /** LIMIPIAR 40nor **/
    $("div[data-merchandisetype=rsm-qcontainer40nor]").find("img").attr("src", "");
    $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(0).text("");
    $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(1).text("");
    $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(2).text("");
    /************************** VALOR DEL TIPO DE CARGA **************************/
    $("#loadTypeCharge").val(v_TypeChargeName);
    /************************** OCULTAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").removeClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("");
    /************************** ASIGNAR AL RESUMEN DEL LISTADO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("img").attr("src", v_TypeChargeImgSrc);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("span").text(v_TypeChargeName);
    
    /************************** OCULTAR - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
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
          <span>
            <input type="text" id="n_packscompare_ultstep" class="n-val-sd" disabled>
            <input type="text" id="n_weightcompare_ultstep" class="n-val-sd" disabled>
            <input type="text" id="n_volumecompare_ultstep" class="n-val-sd" disabled>
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="val-iptPackagesNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">BULTOS</label>
            <input type="number" id="val-iptPackagesNInterface" name="val-iptPackagesNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input">
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="val-iptWeightNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">PESO (KG)</label>
            <input type="text" id="val-iptWeightNInterface" name="val-iptWeightNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="11">
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl">
            <label for="val-iptVolumeNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--label">VOLUMEN (M³)</label>
            <input type="text" id="val-iptVolumeNInterface" name="val-iptVolumeNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControls--cControl--input" maxlength="13">
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
  /************************** LISTAR LA TARIFA DEL PUERTO DE ORIGEN - FCL **************************/
  $.ajax({
    url: "controllers/list_rateByPortOriginFCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {nameportOrigin : arrPortOrigin[0], typetransport: $("#loadTypeTranport").val(), container : "20ST"},
  }).done((e) => {
    var totalFCL = JSON.parse(e);
    //console.log(totalFCL);
    var totalSend20ST = 0;
    var total20ST = 0;

    /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
    var validdesde_final = totalFCL[0].validdesde;
    var validhasta_final = totalFCL[0].validhasta;
    var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
    var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
    var separateDateValidDesde = convertDateValidDesde.split(" ");
    var separateDateValidHasta = convertDateValidHasta.split(" ");
    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
    /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

    /************************** VALIDAR SI OTRO CONTROL TIENE ALGÚN VALOR **************************/
    if($("#ipt-qvalContainer40ST").val() > 0 || $("#ipt-qvalContainer40HQ").val() > 0 || $("#ipt-qvalContainer40NOR").val() > 0){
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">Un solo tipo</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor, elija <b>un solo tipo de contenedor.</b></p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });

      $("#ipt-qvalContainer20ST").val(0);
      total20ST = 0;
      totalSend20ST = 0;
    }else{
      
      total20ST = 0;
      totalSend20ST = 0;

      if(tindBtn == 2){
        newValipt20 = parseInt(input20) + 1;
        $(this).parent().find("input").val(newValipt20);
        
        /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
        v_QContainersName20 = $(this).parent().parent().find("label").text();
        v_QContainersImgSrc20 = $(this).parent().parent().parent().find("div").find("img").attr("src");
        v_QContainersValue20 = newValipt20;

        /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
        $("#loadTypeContainer20").val(v_QContainersName20+" "+"Std");
        val20inputhiddenNew = parseInt(val20inputhidden) + 1;
        $("#loadQContainer20").val(val20inputhiddenNew);
        /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
        totalSend20ST = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer20ST").val();
        console.log(totalSend20ST);
        /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
        localStorage.setItem("key_v-totalflette", totalSend20ST);

        /************************** RESUMEN DEL LISTADO - CONTENEDORES 20' **************************/
        $("div[data-merchandisetype=rsm-qcontainer20]").find("img").attr("src", v_QContainersImgSrc20);
        $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(0).text(val20inputhiddenNew);
        $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(1).text("x");
        $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(2).text(v_QContainersName20);

      }else if(tindBtn == 0){
        if(input20 > 0){
          newValipt20 = parseInt(input20) - 1;
          $(this).parent().find("input").val(newValipt20);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          val20inputhiddenNew = parseInt(val20inputhidden) - 1;
          $("#loadQContainer20").val(val20inputhiddenNew);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend20ST = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer20ST").val();
          console.log(totalSend20ST);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", totalSend20ST);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 20' **************************/
          $("div[data-merchandisetype=rsm-qcontainer20]").find("img").attr("src", v_QContainersImgSrc20);
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(0).text(val20inputhiddenNew);
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(1).text("x");
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(2).text(v_QContainersName20);
        }else{
          newValipt20 = 0;
          $(this).parent().find("input").val(newValipt20);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          $("#loadTypeContainer20").val("");
          val20inputhiddenNew = 0;
          $("#loadQContainer20").val(0);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend20ST = 0;
          console.log(totalSend20ST);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", 0);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 20' **************************/
          $("div[data-merchandisetype=rsm-qcontainer20]").find("img").attr("src", "");
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(0).text("");
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(1).text("");
          $("div[data-merchandisetype=rsm-qcontainer20]").find("span").eq(2).text("");
        }
      }else{
        console.log('Sin acción');
      }
    }
  });
});
/************************** SEGUNDO INPUT **************************/
$(document).on("click", "#c-incdecBtns40 button", function(){
  var tindBtn = $(this).index();
  var input40 = $(this).parent().find("input").val();
  var newValipt40 = $(this).parent().find("input").val();
  var val40inputhidden = $("#loadQContainer40").val();
  var val40inputhiddenNew = $("#loadQContainer40").val();
  /************************** LISTAR LA TARIFA DEL PUERTO DE ORIGEN - FCL **************************/
  $.ajax({
    url: "controllers/list_rateByPortOriginFCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {nameportOrigin : arrPortOrigin[0], typetransport: $("#loadTypeTranport").val(), container : "40ST"},
  }).done((e) => {
    var totalFCL = JSON.parse(e);
    var totalSend40ST = 0;
    var total40ST = 0;

    /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
    var validdesde_final = totalFCL[0].validdesde;
    var validhasta_final = totalFCL[0].validhasta;
    var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
    var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
    var separateDateValidDesde = convertDateValidDesde.split(" ");
    var separateDateValidHasta = convertDateValidHasta.split(" ");
    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
    /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

    /************************** VALIDAR SI OTRO CONTROL TIENE ALGÚN VALOR **************************/
    if($("#ipt-qvalContainer20ST").val() > 0 || $("#ipt-qvalContainer40HQ").val() > 0 || $("#ipt-qvalContainer40NOR").val() > 0){
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">Un solo tipo</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor, elija <b>un solo tipo de contenedor.</b></p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });

      $("#ipt-qvalContainer40ST").val(0);
      total40ST = 0;
      totalSend40ST = 0;
    }else{

      if(tindBtn == 2){
        newValipt40 = parseInt(input40) + 1;
        $(this).parent().find("input").val(newValipt40);

        /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
        v_QContainersName40 = $(this).parent().parent().find("label").text();
        v_QContainersImgSrc40 = $(this).parent().parent().parent().find("div").find("img").attr("src");
        v_QContainersValue40 = $(this).parent().find("input").val(newValipt40);

        /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
        $("#loadTypeContainer40").val(v_QContainersName40+" "+"Std");
        val40inputhiddenNew = parseInt(val40inputhidden) + 1;
        $("#loadQContainer40").val(val40inputhiddenNew);
        /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
        totalSend40ST = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40ST").val();
        console.log(totalSend40ST);
        /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
        localStorage.setItem("key_v-totalflette", totalSend40ST);
        /************************** RESUMEN DEL LISTADO - CONTENEDORES 40' **************************/
        $("div[data-merchandisetype=rsm-qcontainer40]").find("img").attr("src", v_QContainersImgSrc40);
        $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(0).text(val40inputhiddenNew);
        $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(1).text("x");
        $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(2).text(v_QContainersName40);

      }else if(tindBtn == 0){
        if(input40 > 0){
          newValipt40 = parseInt(input40) - 1;
          $(this).parent().find("input").val(newValipt40);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          val40inputhiddenNew = parseInt(val40inputhidden) - 1;
          $("#loadQContainer40").val(val40inputhiddenNew);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40ST = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40ST").val();
          console.log(totalSend40ST);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", totalSend40ST);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40]").find("img").attr("src", v_QContainersImgSrc40);
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(0).text(val40inputhiddenNew);
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(1).text("x");
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(2).text(v_QContainersName40);
        }else{
          newValipt40 = 0;
          $(this).parent().find("input").val(newValipt40);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          $("#loadTypeContainer40").val("");
          val40inputhiddenNew = 0;
          $("#loadQContainer40").val(0);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40ST = 0;
          console.log(totalSend40ST);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", 0);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40]").find("img").attr("src", "");
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(0).text("");
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(1).text("");
          $("div[data-merchandisetype=rsm-qcontainer40]").find("span").eq(2).text("");
        }
      }else{
        console.log('Sin acción');
      }
    }

  });
});
/************************** TERCERO INPUT **************************/
$(document).on("click", "#c-incdecBtns40-hc button", function(){
  var tindBtn = $(this).index();
  var input40_hq = $(this).parent().find("input").val();
  var newValipt40_hq = $(this).parent().find("input").val();
  var val40hqinputhidden = $("#loadQContainer40hq").val();
  var val40hqinputhiddenNew = $("#loadQContainer40hq").val();

  /************************** LISTAR LA TARIFA DEL PUERTO DE ORIGEN - FCL **************************/
  $.ajax({
    url: "controllers/list_rateByPortOriginFCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {nameportOrigin : arrPortOrigin[0], typetransport: $("#loadTypeTranport").val(), container : "40HQ"},
  }).done((e) => {
    var totalFCL = JSON.parse(e);
    var totalSend40HQ = 0;
    var total40HQ = 0;

    /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
    var validdesde_final = totalFCL[0].validdesde;
    var validhasta_final = totalFCL[0].validhasta;
    var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
    var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
    var separateDateValidDesde = convertDateValidDesde.split(" ");
    var separateDateValidHasta = convertDateValidHasta.split(" ");
    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
    /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

    /************************** VALIDAR SI OTRO CONTROL TIENE ALGÚN VALOR **************************/
    if($("#ipt-qvalContainer20ST").val() > 0 || $("#ipt-qvalContainer40ST").val() > 0 || $("#ipt-qvalContainer40NOR").val() > 0){
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">Un solo tipo</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor, elija <b>un solo tipo de contenedor.</b></p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });

      $("#ipt-qvalContainer40HQ").val(0);
      total40HQ = 0;
      totalSend40HQ = 0;
    }else{
      
      if(tindBtn == 2){
        newValipt40_hq = parseInt(input40_hq) + 1;
        $(this).parent().find("input").val(newValipt40_hq);
        /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
        v_QContainersName40_hq = $(this).parent().parent().find("label").text();
        v_QContainersImgSrc40_hq = $(this).parent().parent().parent().find("div").find("img").attr("src");
        v_QContainersValue40_hq = $(this).parent().find("input").val(newValipt40_hq);

        /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
        $("#loadTypeContainer40hq").val("40' HIGH CUBE");
        val40hqinputhiddenNew = parseInt(val40hqinputhidden) + 1;
        $("#loadQContainer40hq").val(val40hqinputhiddenNew);
        /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
        totalSend40HQ = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40HQ").val();
        console.log(totalSend40HQ);
        /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
        localStorage.setItem("key_v-totalflette", totalSend40HQ);
        /************************** RESUMEN DEL LISTADO - CONTENEDORES 40hq' **************************/
        $("div[data-merchandisetype=rsm-qcontainer40hq]").find("img").attr("src", v_QContainersImgSrc40_hq);
        $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(0).text(val40hqinputhiddenNew);
        $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(1).text("x");
        $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(2).text(v_QContainersName40_hq);

      }else if(tindBtn == 0){
        if(input40_hq > 0){
          newValipt40_hq = parseInt(input40_hq) - 1;
          $(this).parent().find("input").val(newValipt40_hq);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          val40hqinputhiddenNew = parseInt(val40hqinputhidden) - 1;
          $("#loadQContainer40hq").val(val40hqinputhiddenNew);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40HQ = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40HQ").val();
          console.log(totalSend40HQ);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", totalSend40HQ);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40hq' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("img").attr("src", v_QContainersImgSrc40_hq);
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(0).text(val40hqinputhiddenNew);
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(1).text("x");
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(2).text(v_QContainersName40_hq);
        }else{
          newValipt40_hq = 0;
          $(this).parent().find("input").val(newValipt40_hq);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          $("#loadTypeContainer40hq").val("");
          val40hqinputhiddenNew = 0;
          $("#loadQContainer40hq").val(0);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40HQ = 0;
          console.log(totalSend40HQ);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", 0);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40hq' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("img").attr("src", "");
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(0).text("");
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(1).text("");
          $("div[data-merchandisetype=rsm-qcontainer40hq]").find("span").eq(2).text("");
        }
      }else{
        console.log('Sin acción');
      }

    }
  });


});
/************************** CUARTO INPUT **************************/
$(document).on("click", "#c-incdecBtns40-nor button", function(){
  var tindBtn = $(this).index();
  var input40_nor = $(this).parent().find("input").val();
  var newValipt40_nor = $(this).parent().find("input").val();
  var val40norinputhidden = $("#loadQContainer40nor").val();
  var val40norinputhiddenNew = $("#loadQContainer40nor").val();


  /************************** LISTAR LA TARIFA DEL PUERTO DE ORIGEN - FCL **************************/
  $.ajax({
    url: "controllers/list_rateByPortOriginFCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {nameportOrigin : arrPortOrigin[0], typetransport: $("#loadTypeTranport").val(), container : "NOR"},
  }).done((e) => {
    var totalFCL = JSON.parse(e);
    var totalSend40NOR = 0;
    var total40NOR = 0;

    /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
    var validdesde_final = totalFCL[0].validdesde;
    var validhasta_final = totalFCL[0].validhasta;
    var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
    var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
    //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
    var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
    var separateDateValidDesde = convertDateValidDesde.split(" ");
    var separateDateValidHasta = convertDateValidHasta.split(" ");
    var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
    var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

    var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
    var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
    /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

    /************************** VALIDAR SI OTRO CONTROL TIENE ALGÚN VALOR **************************/
    if($("#ipt-qvalContainer20ST").val() > 0 || $("#ipt-qvalContainer40ST").val() > 0 || $("#ipt-qvalContainer40HQ").val() > 0){
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">Un solo tipo</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor, elija <b>un solo tipo de contenedor.</b></p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });

      $("#ipt-qvalContainer40NOR").val(0);
      total40NOR = 0;
      totalSend40NOR = 0;
    }else{

      if(tindBtn == 2){
        newValipt40_nor = parseInt(input40_nor) + 1;
        $(this).parent().find("input").val(newValipt40_nor);
        /************************** ASIGNAR VALORES A LA VARIABLE GLOBAL REFERENTE **************************/
        v_QContainersName40_nor = $(this).parent().parent().find("label").text();
        v_QContainersImgSrc40_nor = $(this).parent().parent().parent().find("div").find("img").attr("src");
        v_QContainersValue40_nor = $(this).parent().find("input").val(newValipt40_nor);

        /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
        $("#loadTypeContainer40nor").val("40' NOR");
        val40norinputhiddenNew = parseInt(val40norinputhidden) + 1;
        $("#loadQContainer40nor").val(val40norinputhiddenNew);
        /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
        totalSend40NOR = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40NOR").val();
        console.log(totalSend40NOR);
        /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
        localStorage.setItem("key_v-totalflette", totalSend40NOR);
        /************************** RESUMEN DEL LISTADO - CONTENEDORES 40nor' **************************/
        $("div[data-merchandisetype=rsm-qcontainer40nor]").find("img").attr("src", v_QContainersImgSrc40_nor);
        $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(0).text(val40norinputhiddenNew);
        $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(1).text("x");
        $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(2).text(v_QContainersName40_nor);

      }else if(tindBtn == 0){
        if(input40_nor > 0){
          newValipt40_nor = parseInt(input40_nor) - 1;
          $(this).parent().find("input").val(newValipt40_nor);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          val40norinputhiddenNew = parseInt(val40norinputhidden) - 1;
          $("#loadQContainer40nor").val(val40norinputhiddenNew);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40NOR = parseFloat(totalFCL[0].total) * $("#ipt-qvalContainer40NOR").val();
          console.log(totalSend40NOR);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", totalSend40NOR);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40nor' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("img").attr("src", v_QContainersImgSrc40_nor);
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(0).text(val40norinputhiddenNew);
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(1).text("x");
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(2).text(v_QContainersName40_nor);
        }else{
          newValipt40_nor = 0;
          $(this).parent().find("input").val(newValipt40_nor);
          /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN **************************/
          $("#loadTypeContainer40nor").val("");
          val40norinputhiddenNew = 0;
          $("#loadQContainer40nor").val(0);
          /************************** CALCULAR EL VALOR DEL TOTAL - 20ST **************************/
          totalSend40NOR = 0;
          console.log(totalSend40NOR);
          /************************** ASIGNAR A LA VARIABLE LOCAL - LOCALSTORAGE **************************/
          localStorage.setItem("key_v-totalflette", 0);
          /************************** RESUMEN DEL LISTADO - CONTENEDORES 40nor' **************************/
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("img").attr("src", "");
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(0).text("");
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(1).text("");
          $("div[data-merchandisetype=rsm-qcontainer40nor]").find("span").eq(2).text("");
        }
      }else{
        console.log('Sin acción');
      }
    }
  });

});
/************************** DEVOLVER EL VALOR DE LOS CONTROLES (DIMENSIONES DE CARGA) AL RESUMEN DEL PROCESO **************************/
$(document).on("change input keyup", "#val-iptPackagesNInterface", function(e){
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:first-child").text("Bultos");
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:nth-child(2)").text($(this).val());
  /************************** ASIGNAR AL INPUT DE COMPARACIÓN **************************/
  $("#n_packscompare_ultstep").val($(this).val());
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
  }else{
    //console.log("Campo completado");
  }
});
$(document).on("change input keyup", "#val-iptWeightNInterface", function(e){
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:first-child").text("Peso(Kg)");
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:nth-child(2)").text($(this).val());
  /************************** ASIGNAR AL INPUT DE COMPARACIÓN **************************/
  $("#n_weightcompare_ultstep").val($(this).val());
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
  }else{
    //console.log("Campo completado");
  }
});
$(document).on("change input keyup", "#val-iptVolumeNInterface", function(e){
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:first-child").text("Volumen(M³)");
  $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:nth-child(2)").text($(this).val());
  /************************** ASIGNAR AL INPUT DE COMPARACIÓN **************************/
  $("#n_volumecompare_ultstep").val($(this).val());
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");
  }else{
    //console.log("Campo completado");
  }
});
/************************** SWITCH DE CONTENEDORES REFRIGERADOS **************************/
// $(document).on("click", "#chck-containerfreeze", function(){
//   if($(this).is(":checked")){
//     $(this).parent().addClass("active");
//     $(this).parent().attr("switch-CFreeze", "SÍ");
//   }else{
//     $(this).parent().removeClass("active");
//     $(this).parent().attr("switch-CFreeze", "NO");
//   }
// });
/************************** VALIDAR EL BOTÓN DE PASO SIGUIENTE - DESDE CONTENEDORES **************************/
$(document).on("click", "#btn-NextStepToSelOptResultExp", function(){
  if($("#c-incdecBtns20").find("input").val() != 0 && $("#c-incdecBtns20").find("input").val() != "" || 
     $("#c-incdecBtns40").find("input").val() != 0 && $("#c-incdecBtns40").find("input").val() != "" ||
     $("#c-incdecBtns40-hc").find("input").val() != 0 && $("#c-incdecBtns40-hc").find("input").val() != "" ||
     $("#c-incdecBtns40-nor").find("input").val() != 0 && $("#c-incdecBtns40-nor").find("input").val() != ""){
    
    /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");

    /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
    sectionsSteps.moveTo('step-integservorfleteinte', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
        <span>
          <span>
            <input type="hidden" id="opt-genfquotation" name="opt-genfquotation" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-SelOptionResultExp">
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <h3>Opción 1</h3>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/customs-clearance.png" alt="" loading="lazy">
              </div>
              <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
            </li>
          </a>
          <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
              <h3>Opción 2</h3>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                <img src="views/assets/img/steps/no-customs-clearance.png" alt="" loading="lazy">
              </div>
              <p>NO AGREGAR SERVICIOS "SOLO DESEO FLETE"</p>
            </li>
          </a>
        </ul>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
    `);

  }else{
    /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
    $("#idMessageSteps-prcss").html(`
      <div class="cntMessageSteps-prcss--cont">
        <div class="cntMessageSteps-prcss--cont--c">
          <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
          <h3 class="cntMessageSteps-prcss--cont--c--title">No se ha añadido ningún contenedor</h3>
          <p class="cntMessageSteps-prcss--cont--c--text">Por favor añade al menos un contenedor o selecciona LCL como tipo de carga.</p>
        </div>
      </div>
    `)
    /************************** CERRAR EL MODAL **************************/
    setTimeout(function(){
      $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
    }, 6500)
    $("#btnclose-modalMessage").on("click", function(){
      $(this).parent().parent().remove();
    });
  }  
});
/************************** VALIDAR DE ACUERDO A LA OPCIÓN SELECCIONADA - ELIGE UNA OPCIÓN **************************/
$(document).on("click", "#list-SelOptionResultExp a", function(){
  var tItemSelOptExp = $(this).index();
  if(tItemSelOptExp == 0){
    if($("#loadTypeCharge").val() != "LCL"){
      /************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_fcl_by_igv.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      }).done((e) => {
        var resbyigv = JSON.parse(e);
        var unitvaluesQuotesbyIGV = 0;
        $.each(resbyigv, function(i, e){
          unitvaluesQuotesbyIGV+= parseFloat(e.data_value);
        });
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        localStorage.setItem("key_v-valuesquotationbyigv", unitvaluesQuotesbyIGV);
      });

      /************************** LISTAR SERVICIOS DE ACUERDO A LA SELECCIÓN - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_fcl.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {require_servs : 'SI'}
      }).done((e) => {
        var res = JSON.parse(e);
        var unitvaluesQuotes = 0;
        $.each(res, function(i, e){
          unitvaluesQuotes+= parseFloat(e.data_value);
        });

        /************************** ASIGNAR A LA VARIABLE GLOBAL **************************/
        localStorage.setItem("key_v-valuesquotation", unitvaluesQuotes);
      });
    }else{
      /************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_lcl_by_igv.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      }).done((e) => {
        var resbyigv = JSON.parse(e);
        var unitvaluesQuotesbyIGV = 0;
        $.each(resbyigv, function(i, e){
          unitvaluesQuotesbyIGV+= parseFloat(e.data_value);
        });
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        localStorage.setItem("key_v-valuesquotationbyigv", unitvaluesQuotesbyIGV);
      });

      /************************** LISTAR SERVICIOS DE ACUERDO A LA SELECCIÓN - LCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_lcl.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {require_servs : 'SI'}
      }).done((e) => {
        var res = JSON.parse(e);
        var unitvaluesQuotes = 0;
        $.each(res, function(i, e){
          unitvaluesQuotes+= parseFloat(e.data_value);
        });

        /************************** ASIGNAR A LA VARIABLE GLOBAL **************************/
        localStorage.setItem("key_v-valuesquotation", unitvaluesQuotes);
      });
    }

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - ELIGE UNA OPCIÓN **************************/
    $("#opt-genfquotation").val("y-moreOpts");
    /************************** OCULTAR EL BOTÓN DE ENVIAR **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html("");
    /************************** AGREGAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").addClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("Despacho de aduanas");

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").addClass("show");
    sectionsSteps.moveTo('step-merchandisedata', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Mercancía</h3>
        <span>
          <span>
            <input type="hidden" value="" id="val-categProdquot" name="val-categProdquot" class="n-val-sd">
            <input type="hidden" value="" id="val-reqPermisoProdquot" name="val-reqPermisoProdquot" class="n-val-sd">
            <input type="hidden" value="" id="val-valProdquot" name="val-valProdquot" class="n-val-sd">
            <input type="hidden" value="NO" id="val-prevImports" name="val-prevImports" class="n-val-sd">
            <input type="hidden" value="" id="val-quantityProdsAmmAdd" name="val-quantityProdsAmmAdd" class="n-val-sd">
          </span>
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
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC" id="ipt-valCantOfAmountAdditional"></div>
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

    if($("#loadTypeCharge").val() != "LCL"){
      /************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_fcl_by_igv.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      }).done((e) => {
        var resbyigv = JSON.parse(e);
        var unitvaluesQuotesbyIGV = 0;
        $.each(resbyigv, function(i, e){
          unitvaluesQuotesbyIGV+= parseFloat(e.data_value);
        });
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        localStorage.setItem("key_v-valuesquotationbyigv", unitvaluesQuotesbyIGV);
      });

      /************************** LISTAR SERVICIOS DE ACUERDO A LA SELECCIÓN - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_fcl.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {require_servs : 'NO'}
      }).done((e) => {
        var res = JSON.parse(e);
        var unitvaluesQuotes = 0;
        $.each(res, function(i, e){
          unitvaluesQuotes+= parseFloat(e.data_value);
        });

        /************************** ASIGNAR A LA VARIABLE GLOBAL **************************/
        localStorage.setItem("key_v-valuesquotation", unitvaluesQuotes);
      });
    }else{
      /************************** LISTAR SERVICIOS PARA CALCULO CON IGV - FCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_lcl_by_igv.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      }).done((e) => {
        var resbyigv = JSON.parse(e);
        var unitvaluesQuotesbyIGV = 0;
        $.each(resbyigv, function(i, e){
          unitvaluesQuotesbyIGV+= parseFloat(e.data_value);
        });
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        localStorage.setItem("key_v-valuesquotationbyigv", unitvaluesQuotesbyIGV);
      });

      /************************** LISTAR SERVICIOS DE ACUERDO A LA SELECCIÓN - LCL **************************/
      $.ajax({
        url: "controllers/list_quotation_values_lcl.php",
        method: "POST",
        datatype: "JSON",
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data: {require_servs : 'NO'}
      }).done((e) => {
        var res = JSON.parse(e);
        var unitvaluesQuotes = 0;
        $.each(res, function(i, e){
          unitvaluesQuotes+= parseFloat(e.data_value);
        });

        /************************** ASIGNAR A LA VARIABLE GLOBAL **************************/
        localStorage.setItem("key_v-valuesquotation", unitvaluesQuotes);
      });
    }

    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - ELIGE UNA OPCIÓN **************************/
    $("#opt-genfquotation").val("not-moreOpts");
    /************************** AGREGAR AL LISTADO DE RESUMEN - ELIGE UN OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").removeClass("show");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-reqspeacialservs]").find("span").text("");
    /************************** OCULTAR - DATOS DE MERCANCÍA **************************/
    // $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").removeClass("show");
    // $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html("");
    /************************** MOSTRAR EL BOTÓN DE CALCULAR COTIZACIÓN **************************/
    // $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html(`
    //   <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToChargerdata">
    //     <span>CALCULAR COTIZACIÓN</span>
    //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
    //   </button>
    // `);

    /************************** MOSTRAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").addClass("show");
    sectionsSteps.moveTo('step-merchandisedata', 1);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
        <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Mercancía</h3>
        <span>
          <span>
            <input type="hidden" value="" id="val-categProdquot" name="val-categProdquot" class="n-val-sd">
            <input type="hidden" value="" id="val-reqPermisoProdquot" name="val-reqPermisoProdquot" class="n-val-sd">
            <input type="hidden" value="" id="val-valProdquot" name="val-valProdquot" class="n-val-sd">
            <input type="hidden" value="" id="val-quantityProdsAmmAdd" name="val-quantityProdsAmmAdd" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CATEGORÍA</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valNameTypeProdNInterface-notMoreOpts" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" autocomplete="off">
                <ul class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m" id="m-listAllNamTypeProds"></ul>
              </div>
            </div>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC" id="ipt-valCantOfAmountAdditional-notMoreOpts"></div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">VALOR</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
                <input type="text" id="ipt-valPriceProdNInterface-notMoreOpts" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep" id="s-caseNextStepTomerchandisedata">
      </div>
    `);

  }
});
/************************** VALIDAR EL INPUT DE PRECIO DEL PRODUCTO - OPCIÓN 2 **************************/
$(document).on("change input keyup", "#ipt-valPriceProdNInterface-notMoreOpts", function(e){
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
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-valueproduct", $(this).val());
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");

    $("#s-caseNextStepTomerchandisedata").html("");
  }else{
    //console.log("Campo completado");
    if(document.querySelector("#ipt-valCantOfAmountAdditional-notMoreOpts").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface-notMoreOpts"))){
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct") && 
        $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != "" && 
        $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != 0){

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }else{
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct")){
        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }
  }
});
/************************** VALIDAR SI CONTIENE ALGÚN VALOR NULO O 0 **************************/
$(document).on("keyup", "#ipt-valPriceProdNInterface-notMoreOpts", function(){
  if($(this).val() == "" || $(this).val() == 0 || $(this).val() == " USD" || $(this).val() == ".00" || $(this).val() == 0.00){
    $("#MsgItemValueProdRequired").text("Ingrese valor exacto, SIN DECIMALES");
    $(this).val("");
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");

    $("#s-caseNextStepTomerchandisedata").html("");
  }else{
    $("#MsgItemValueProdRequired").text("");
    if(document.querySelector("#ipt-valCantOfAmountAdditional-notMoreOpts").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface-notMoreOpts"))){
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct") && 
        $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != "" && 
        $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != 0){

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }else{
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct")){
        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }
  }
});
/************************** MOSTRAR EL LISTADO DE TIPOS DE PRODUCTOS **************************/
$(document).on("focus", "#ipt-valNameTypeProdNInterface-notMoreOpts", function(){
  $("#m-listAllNamTypeProds").addClass("show");
  listProductsUser();
});
$(document).on("keyup keydown", "#ipt-valNameTypeProdNInterface-notMoreOpts", function(e){
  $("#m-listAllNamTypeProds").addClass("show");
  var searchVal = $(this).val();
  if(searchVal != ""){
    $("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct", "");
    listProductsUser(searchVal);
  }else{
    setTimeout(function(){
      $("#m-listAllNamTypeProds").removeClass("show");
    }, 4500);
    listProductsUser();
  }

  if(e.which == 8 || event.keyCode == 46){
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");
  }else{
    console.log('Con contenido');
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - TIPOS DE PRODUCTOS **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllNamTypeProds").removeClass("show");
  $("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct", $(this).attr("id"));
  $("#ipt-valNameTypeProdNInterface-notMoreOpts").val($(this).find("p").text());
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-dbammountadditional", $(this).attr("data-amountadditional"));
  /************************** MOSTRAR/OCULTAR DE ACUERDO A EL VALOR DEL MONTO ADICIONAL **************************/
  if($(this).attr("data-amountadditional") != 0 || $(this).attr("data-amountadditional") != 0.00){
    $("#ipt-valCantOfAmountAdditional-notMoreOpts").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
        <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CANTIDAD</label>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
          <input type="text" id="ipt-valQuantityAmAddProdNInterface-notMoreOpts" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
        </div>
      </div>
    `);
  }else{
    $("#ipt-valCantOfAmountAdditional-notMoreOpts").html("");
  }
  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
  $("#val-categProdquot").val($(this).find("p").text());
  $("#val-reqPermisoProdquot").val($(this).find("small").find("span:nth-child(2)").text());
});
/************************** VALIDAR INPUT - CANTIDAD DE PRODUCTOS CON MONTO ADICIONAL **************************/
$(document).on("keyup keypress blur change", "#ipt-valQuantityAmAddProdNInterface-notMoreOpts", function(e){
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
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });
  /************************** AGREGAR AL INPUT DE ENVÍO POST Y AGREGAR A LA VARIABLE LOCAL **************************/
  $("#val-quantityProdsAmmAdd").val(e.target.value);
  localStorage.setItem("key_v-ammountadditional", e.target.value);
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-totalammountadditional", localStorage.getItem("key_v-dbammountadditional") * value);

  if(e.target.value != 0 && e.target.value != ""){
    if(document.querySelector("#ipt-valCantOfAmountAdditional-notMoreOpts").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface-notMoreOpts"))){
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct") && 
        $("#ipt-valPriceProdNInterface-notMoreOpts").val() != 0 &&
        $("#ipt-valPriceProdNInterface-notMoreOpts").val() != ""){

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);

      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }

    }else{

      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct")){

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);

      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }
  }else{
    $("#s-caseNextStepTomerchandisedata").html("");
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

    /************************** AÑADIR LOS TOTALES AL LISTADO DE RESUMEN **************************/
    
		
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

    /************************** AÑADIR LOS TOTALES AL LISTADO DE RESUMEN **************************/
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:first-child").text("Bultos");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totpackages]").find("span:nth-child(2)").text(valCalculadoPackages);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:first-child").text("Peso(Kg)");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totweight]").find("span:nth-child(2)").text(valCalculadoWeight);
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:first-child").text("Volumen(M³)");
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-totvolume]").find("span:nth-child(2)").text(valCalculadoVolume);

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

    var totwithoutvalues = 0;
    /************************** LISTAR LA TARIFA DEL PUERTO DE ORIGEN **************************/
    $.ajax({
      url: "controllers/list_rateByPortOriginLCL.php",
      method: "POST",
      datatype: "JSON",
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: {nameportOrigin : arrPortOrigin[0], typetransport: $("#loadTypeTranport").val()},
    }).done((e) => {
      var ratesorigin = JSON.parse(e);

      /************************** DEVOLVER EL RESULTADO MAYOR - VOLUMEN O PESO **************************/
      var v_ValDividedTotalWeight = v_ValTotalWeight / 1000;

      if($("#loadTypeTranport").val() == "general"){
        rate_5cbm = parseFloat(ratesorigin[0].total5cbm); //EN CASO DE NO SUPERAR LOS 5CBM
        rate_15cbm = parseFloat(ratesorigin[0].total15cbm); //EN CASO DE SUPERAR LOS 15CBM
        twodecimal_rate_5cbm = roundToTwo(rate_5cbm);
        twodecimal_rate_15cbm = roundToTwo(rate_15cbm);

        /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
        var validdesde_final = ratesorigin[0].validdesde;
        var validhasta_final = ratesorigin[0].validhasta;
        var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
        var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
        //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
        var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
        var separateDateValidDesde = convertDateValidDesde.split(" ");
        var separateDateValidHasta = convertDateValidHasta.split(" ");
        var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
        var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

        var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
        var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
        /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
        localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

        if(v_ValTotalVolume <= 5){

          if(v_ValTotalVolume > v_ValDividedTotalWeight){

            totwithoutvalues = roundToTwo(twodecimal_rate_5cbm * v_ValTotalVolume);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
          }else{

            totwithoutvalues = roundToTwo(twodecimal_rate_5cbm * v_ValDividedTotalWeight);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
          }

          /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");
          /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
          sectionsSteps.moveTo('step-integservorfleteinte', 1);
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
            <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
              <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
              <span>
                <span>
                  <input type="hidden" id="opt-genfquotation" name="opt-genfquotation" class="n-val-sd">
                </span>
              </span>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep">
              <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-SelOptionResultExp">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 1</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
                  </li>
                </a>
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 2</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/no-customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>NO AGREGAR SERVICIOS "SOLO DESEO FLETE"</p>
                  </li>
                </a>
              </ul>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
          `);


        }else if(v_ValTotalVolume > 5 && v_ValTotalVolume <= 15){

          if(v_ValTotalVolume > v_ValDividedTotalWeight){

            totwithoutvalues = roundToTwo(twodecimal_rate_15cbm * v_ValTotalVolume);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
          }else{

            totwithoutvalues = roundToTwo(twodecimal_rate_15cbm * v_ValDividedTotalWeight);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
          }

          /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");

          /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
          sectionsSteps.moveTo('step-integservorfleteinte', 1);
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
            <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
              <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
              <span>
                <span>
                  <input type="hidden" value="" id="opt-genfquotation" name="opt-genfquotation" class="n-val-sd">
                </span>
              </span>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep">
              <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-SelOptionResultExp">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 1</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
                  </li>
                </a>
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 2</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/no-customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>NO AGREGAR SERVICIOS "SOLO DESEO FLETE"</p>
                  </li>
                </a>
              </ul>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
          `);

        }else if(v_ValTotalVolume > 15){

          /************************** OCULTAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").removeClass("show");
          /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");

          /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
          $("#idMessageSteps-prcss").html(`
            <div class="cntMessageSteps-prcss--cont">
              <div class="cntMessageSteps-prcss--cont--c">
                <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
                <h3 class="cntMessageSteps-prcss--cont--c--title">Carga excedida</h3>
                <p class="cntMessageSteps-prcss--cont--c--text">El <b>VOLUMEN</b> registrado no debe exceder los <b>15 M³</b>, seleccione <b>CONTENEDOR COMPLETO o contacte a un ASESOR +51 990 234 625.</b></p>
              </div>
            </div>
          `)
          /************************** CERRAR EL MODAL **************************/
          setTimeout(function(){
            $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
          }, 6500)
          $("#btnclose-modalMessage").on("click", function(){
            $(this).parent().parent().remove();
          });

        }else{
          console.log('Error de cálculo');
        }

      }else if($("#loadTypeTranport").val() == "imo"){
        twodecimal_total_imo = roundToTwo(ratesorigin[0].total_imo);
        //console.log(twodecimal_total_imo);
        if(v_ValTotalVolume > 15){

          /************************** OCULTAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").removeClass("show");
          /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");

          /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
          $("#idMessageSteps-prcss").html(`
            <div class="cntMessageSteps-prcss--cont">
              <div class="cntMessageSteps-prcss--cont--c">
                <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
                <h3 class="cntMessageSteps-prcss--cont--c--title">Carga excedida</h3>
                <p class="cntMessageSteps-prcss--cont--c--text">El <b>VOLUMEN</b> registrado no debe exceder los <b>15 M³</b>, seleccione <b>CONTENEDOR COMPLETO o contacte a un ASESOR +51 990 234 625.</b></p>
              </div>
            </div>
          `)
          /************************** CERRAR EL MODAL **************************/
          setTimeout(function(){
            $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
          }, 6500)
          $("#btnclose-modalMessage").on("click", function(){
            $(this).parent().parent().remove();
          });
        }else{
          /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
          var validdesde_final = ratesorigin[0].validdesde;
          var validhasta_final = ratesorigin[0].validhasta;
          var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
          var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
          //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
          var options = { year: 'numeric', month: 'long', day: 'numeric' };
          var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
          var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
          var separateDateValidDesde = convertDateValidDesde.split(" ");
          var separateDateValidHasta = convertDateValidHasta.split(" ");
          var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
          var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

          var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
          var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
          /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
          localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);
          
          /************************** VALIDAR EL VALOR MÁXIMO ENTRE PESO Y VOLUMEN **************************/
          if(v_ValTotalVolume > v_ValDividedTotalWeight){
            totwithoutvalues = roundToTwo(twodecimal_total_imo * v_ValTotalVolume);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
            //console.log(totwithoutvalues);
          }else{
            totwithoutvalues = roundToTwo(twodecimal_total_imo * v_ValDividedTotalWeight);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
            //console.log(totwithoutvalues);
          }
          /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");
          /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
          sectionsSteps.moveTo('step-integservorfleteinte', 1);
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
            <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
              <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
              <span>
                <span>
                  <input type="hidden" value="" id="opt-genfquotation" name="opt-genfquotation" class="n-val-sd">
                </span>
              </span>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cStep">
              <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-SelOptionResultExp">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 1</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
                  </li>
                </a>
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                    <h3>Opción 2</h3>
                    <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                      <img src="views/assets/img/steps/no-customs-clearance.png" alt="" loading="lazy">
                    </div>
                    <p>NO AGREGAR SERVICIOS "SOLO DESEO FLETE"</p>
                  </li>
                </a>
              </ul>
            </div>
            <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
          `);
        }

      }else{
        twodecimal_total_refrigerado = roundToTwo(ratesorigin[0].total_refrigerado);
        //console.log(twodecimal_total_refrigerado);
        if(v_ValTotalVolume > 15){

          /************************** OCULTAR EL RESUMEN HASTA ESTE PASO **************************/
          $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").removeClass("show");
          /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
          $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");

          /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
          $("#idMessageSteps-prcss").html(`
            <div class="cntMessageSteps-prcss--cont">
              <div class="cntMessageSteps-prcss--cont--c">
                <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
                <h3 class="cntMessageSteps-prcss--cont--c--title">Carga excedida</h3>
                <p class="cntMessageSteps-prcss--cont--c--text">El <b>VOLUMEN</b> registrado no debe exceder los <b>15 M³</b>, seleccione <b>CONTENEDOR COMPLETO o contacte a un ASESOR +51 990 234 625.</b></p>
              </div>
            </div>
          `)
          /************************** CERRAR EL MODAL **************************/
          setTimeout(function(){
            $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
          }, 6500)
          $("#btnclose-modalMessage").on("click", function(){
            $(this).parent().parent().remove();
          });
        }else{

          /************************** DEVOLVER LA FECHA DE VALIDEZ DE LA TARIFA A LA VARIABLE LOCAL **************************/
          var validdesde_final = ratesorigin[0].validdesde;
          var validhasta_final = ratesorigin[0].validhasta;
          var convertOneDATE =  new Date(Date.parse(validdesde_final.replace(/-/g, '/')));
          var convertTwoDATE =  new Date(Date.parse(validhasta_final.replace(/[-]/g,'/')));
          //var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
          var options = { year: 'numeric', month: 'long', day: 'numeric' };
          var convertDateValidDesde = convertOneDATE.toLocaleDateString("es-ES", options);
          var convertDateValidHasta = convertTwoDATE.toLocaleDateString("es-ES", options);
          var separateDateValidDesde = convertDateValidDesde.split(" ");
          var separateDateValidHasta = convertDateValidHasta.split(" ");
          var monthSeparatetoArrayDesde = separateDateValidDesde[2].slice(0, 3);
          var monthSeparatetoArrayHasta = separateDateValidHasta[2].slice(0, 3);

          var val_dateValidDesde = separateDateValidDesde[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayDesde);
          var val_dateValidHasta = separateDateValidHasta[0]+" "+"de"+" "+firstToUppercase(monthSeparatetoArrayHasta);
          /************************** ASIGNAR A LAS VARIABLES LOCALES **************************/
          localStorage.setItem("key_validaterate", val_dateValidDesde+" - "+val_dateValidHasta);

          /************************** VALIDAR EL VALOR MÁXIMO ENTRE PESO Y VOLUMEN **************************/
          if(v_ValTotalVolume > v_ValDividedTotalWeight){
            totwithoutvalues = roundToTwo(twodecimal_total_refrigerado * v_ValTotalVolume);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
            //console.log(totwithoutvalues);
          }else{
            totwithoutvalues = roundToTwo(twodecimal_total_refrigerado * v_ValDividedTotalWeight);
            localStorage.setItem("key_v-totalflette", totwithoutvalues);
            //console.log(totwithoutvalues);
          }
          /************************** MOSTRAR EL RESUMEN HASTA ESTE PASO **************************/
            $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typecontainer]").addClass("show");
            /************************** MOSTRAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
            $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").addClass("show");
            sectionsSteps.moveTo('step-integservorfleteinte', 1);
            $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html(`
              <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
                <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">Eliga una opción</h3>
                <span>
                  <span>
                    <input type="hidden" value="" id="opt-genfquotation" name="opt-genfquotation" class="n-val-sd">
                  </span>
                </span>
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep">
                <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-SelOptionResultExp">
                  <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                      <h3>Opción 1</h3>
                      <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                        <img src="views/assets/img/steps/customs-clearance.png" alt="" loading="lazy">
                      </div>
                      <p>AGREGAR SERVICIOS DE ADUANA EN DESTINO</p>
                    </li>
                  </a>
                  <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                    <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                      <h3>Opción 2</h3>
                      <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                        <img src="views/assets/img/steps/no-customs-clearance.png" alt="" loading="lazy">
                      </div>
                      <p>NO AGREGAR SERVICIOS "SOLO DESEO FLETE"</p>
                    </li>
                  </a>
                </ul>
              </div>
              <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
            `);
        }
      }
    });

  }else{

    /************************** OCULTAR EL PASO DE - ELIGE UNA OPCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-integservorfleteinte]").html("");

    /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
    $("#idMessageSteps-prcss").html(`
      <div class="cntMessageSteps-prcss--cont">
        <div class="cntMessageSteps-prcss--cont--c">
          <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
          <h3 class="cntMessageSteps-prcss--cont--c--title">No se completaron los datos de la carga</h3>
          <p class="cntMessageSteps-prcss--cont--c--text">Por favor, rellena todos los campos relativos a las dimensiones de carga.</p>
        </div>
      </div>
    `)
    /************************** CERRAR EL MODAL **************************/
    setTimeout(function(){
      $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
    }, 6500)
    $("#btnclose-modalMessage").on("click", function(){
      $(this).parent().parent().remove();
    });
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
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item" id="${e.id_prod}" data-amountadditional="${e.montoadd}">
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
$(document).on("keyup keydown", "#ipt-valNameTypeProdNInterface", function(e){
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

  if(e.which == 8 || event.keyCode == 46){
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");
  }else{
    console.log('Con contenido');
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - TIPOS DE PRODUCTOS **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllNamTypeProds").removeClass("show");
  $("#ipt-valNameTypeProdNInterface").attr("idproduct", $(this).attr("id"));
  $("#ipt-valNameTypeProdNInterface").val($(this).find("p").text());
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-dbammountadditional", $(this).attr("data-amountadditional"));
  /************************** MOSTRAR/OCULTAR DE ACUERDO A EL VALOR DEL MONTO ADICIONAL **************************/
  if($(this).attr("data-amountadditional") != 0 || $(this).attr("data-amountadditional") != 0.00){
    $("#ipt-valCantOfAmountAdditional").html(`
      <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl">
        <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--label">CANTIDAD</label>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange">
          <input type="text" id="ipt-valQuantityAmAddProdNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--input" maxlength="13" autocomplete="off">
        </div>
      </div>
    `);
  }else{
    $("#ipt-valCantOfAmountAdditional").html("");
  }
  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
  $("#val-categProdquot").val($(this).find("p").text());
  $("#val-reqPermisoProdquot").val($(this).find("small").find("span:nth-child(2)").text());
});
/************************** VALIDAR INPUT - CANTIDAD DE PRODUCTOS CON MONTO ADICIONAL **************************/
$(document).on("keyup keypress blur change", "#ipt-valQuantityAmAddProdNInterface", function(e){
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
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });
  /************************** AGREGAR AL INPUT DE ENVÍO POST Y AGREGAR A LA VARIABLE LOCAL **************************/
  $("#val-quantityProdsAmmAdd").val(e.target.value);
  localStorage.setItem("key_v-ammountadditional", e.target.value);
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-totalammountadditional", localStorage.getItem("key_v-dbammountadditional") * value);

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
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-valueproduct", $(this).val());
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");
  }else{
    //console.log("Campo completado");
  }

  /************************** CALCULAR DE ACUERDO A SI SELECCIONÓ SEGURO O NO **************************/
  // $.ajax({
  //   url: "controllers/list_insurancevalues.php",
  //   method: "POST",
  //   datatype: "JSON",
  //   contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  // }).done((e) => {
  //   var thisresutlinsurance = JSON.parse(e);
  //   var thisvalfobproduct = $(this).val();
  //   var thiscutefobprice = thisvalfobproduct.split(" USD");
  //   var thiswithoutpointsfob = thiscutefobprice[0].replace(/\./g, '');
  //   var thisfinalvaluefob = twodecimals(thiswithoutpointsfob);
    
  //   var thisvalorfinalseguro = 0;
  //   if($("#res-insuremerch").val() != "NO"){
  //     //console.log(thisfinalvaluefob);
  //     if(thisfinalvaluefob > 25000){
  //       /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
  //       thisvalorfinalseguro = (thisfinalvaluefob * thisresutlinsurance[1].data_value) / 100;
  //       localStorage.setItem("key_v-valueinsurance", roundToTwo(thisvalorfinalseguro));
  //     }else{
  //       ************************* ASIGNAR AL VALOR DE LA VARIABLE LOCAL *************************
  //       thisvalorfinalseguro = (thisfinalvaluefob * thisresutlinsurance[0].data_value) / 100;
  //       localStorage.setItem("key_v-valueinsurance", roundToTwo(thisvalorfinalseguro));
  //     }

  //   }else{
  //     //sasdsa
  //     if(thisfinalvaluefob > 25000){
  //       /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
  //       thisvalorfinalseguro = (thisfinalvaluefob * thisresutlinsurance[0].data_value) / 100;
  //       localStorage.setItem("key_v-valueinsurance", roundToTwo(thisvalorfinalseguro));
  //     }else{
  //       /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
  //       thisvalorfinalseguro = (thisfinalvaluefob * thisresutlinsurance[0].data_value) / 100;
  //       localStorage.setItem("key_v-valueinsurance", roundToTwo(thisvalorfinalseguro));
  //     }
  //   }
  // });
});
/************************** VALIDAR SI HAY ALGÚN VALOR EN EL CONTROL - VALOR DE PRODUCTO IMPORTADO **************************/
$(document).on("change input keyup", "#ipt-valPriceProdNInterface", function(e){
  if(e.target.value == "" || e.target.value == 0){
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");
  }else{
    //console.log("Campo completado");
  }
});
/************************** VALIDAR SI CONTIENE ALGÚN VALOR NULO O 0 **************************/
$(document).on("keyup", "#ipt-valPriceProdNInterface", function(){
  if($(this).val() == "" || $(this).val() == 0 || $(this).val() == " USD" || $(this).val() == ".00" || $(this).val() == 0.00){
    $("#MsgItemValueProdRequired").text("Ingrese valor exacto, SIN DECIMALES");
    $(this).val("");
    /************************** OCULTAR EL SIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
    /************************** OCULTAR EL TRASSIGUIENTE PASO **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html("");
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
  
  if(document.querySelector("#ipt-valCantOfAmountAdditional").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface"))){
    //console.log('Existe input');
    if($("#ipt-valNameTypeProdNInterface").val() != "" && $("#ipt-valNameTypeProdNInterface").val() != 0 &&
       $("#ipt-valNameTypeProdNInterface").attr("idproduct") &&
       $("#ipt-valQuantityAmAddProdNInterface").val() != 0 && $("#ipt-valQuantityAmAddProdNInterface").val() != "" &&
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
            <span>
              <input type="hidden" id="res-insuremerch" name="res-insuremerch" class="n-val-sd">
            </span>
          </span>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep">
          <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-insuremerchandise">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/insurance.png" alt="" loading="lazy">
                </div>
                <p>SÍ</p>
              </li>
            </a>
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/no-insurance.png" alt="" loading="lazy">
                </div>
                <p>NO</p>
              </li>
            </a>
          </ul>
        </div>
      `);
    }else{
      /************************** OCULTAR EL SIGUIENTE PASO **************************/
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
      
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">No se han completado los datos de mercancía.</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor rellena todos los campos que son necesarios.</p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });
    }

  }else{
    //console.log('No existe input');
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
            <span>
              <input type="hidden" id="res-insuremerch" name="res-insuremerch" class="n-val-sd">
            </span>
          </span>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep">
          <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-insuremerchandise">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/insurance.png" alt="" loading="lazy">
                </div>
                <p>SÍ</p>
              </li>
            </a>
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/no-insurance.png" alt="" loading="lazy">
                </div>
                <p>NO</p>
              </li>
            </a>
          </ul>
        </div>
      `);
    }else{
      /************************** OCULTAR EL SIGUIENTE PASO **************************/
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").removeClass("show");
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-insuremerchandise]").html("");
      
      /************************** MOSTRAR EL MENSAJE DE ALERTA PERSONALIZADO **************************/
      $("#idMessageSteps-prcss").html(`
        <div class="cntMessageSteps-prcss--cont">
          <div class="cntMessageSteps-prcss--cont--c">
            <span class="cntMessageSteps-prcss--cont--c--btnclose" id="btnclose-modalMessage"></span>
            <h3 class="cntMessageSteps-prcss--cont--c--title">No se han completado los datos de mercancía.</h3>
            <p class="cntMessageSteps-prcss--cont--c--text">Por favor rellena todos los campos que son necesarios.</p>
          </div>
        </div>
      `)
      /************************** CERRAR EL MODAL **************************/
      setTimeout(function(){
        $("#idMessageSteps-prcss .cntMessageSteps-prcss--cont").remove();
      }, 6500)
      $("#btnclose-modalMessage").on("click", function(){
        $(this).parent().parent().remove();
      });
    }
  }

});
/*===================================================================================
=                     7. AGREGAR O NO SEGURO DE MERCANCÍA                           =
====================================================================================*/
$(document).on("click", "#list-insuremerchandise a", function(){
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").addClass("show");
  var tinsuremerchandise = $(this).index();
  
  $.ajax({
    url: "controllers/list_insurancevalues.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }).done((e) => {
    var resutlinsurance = JSON.parse(e);
    //localStorage.setItem("key_v-valueproduct", $(this).val());
    var valfobproduct = $("#val-valProdquot").val();
    var cutefobprice = valfobproduct.split(" USD");
    var withoutpointsfob = cutefobprice[0].replace(/\./g, '');
    var finalvaluefob = twodecimals(withoutpointsfob);

    if(tinsuremerchandise == 0){
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - QUIERES ASEGURAR LA MERCANCÍA **************************/
      $("#res-insuremerch").val("SI");
      var valorfinalseguro = 0;
      if(finalvaluefob > 25000){
        /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
        valorfinalseguro = (finalvaluefob * resutlinsurance[1].data_value) / 100;
        localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
      }else{
        /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
        valorfinalseguro = (finalvaluefob * resutlinsurance[0].data_value) / 100;
        localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
      }

      /************************** MOSTRAR EL SIGUIENTE PASO - ¿ NECESITAS TRANSPORTE ? **************************/
      sectionsSteps.moveTo('step-requirespickup', 1);
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html(`
        <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
          <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas Transporte?</h3>
          <span>
            <span>
              <input type="hidden" value="" id="opt-reqtransport" name="opt-reqtransport" class="n-val-sd">
            </span>
          </span>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep">
          <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-requirespickup">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/inland-trans.png" alt="" loading="lazy">
                </div>
                <p>SÍ</p>
              </li>
            </a>
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/no-inland-trans.png" alt="" loading="lazy">
                </div>
                <p>NO</p>
              </li>
            </a>
          </ul>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
      `);
    }else{
      /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - QUIERES ASEGURAR LA MERCANCÍA **************************/
      $("#res-insuremerch").val("NO");
      var valorfinalseguro = 0;
      if(finalvaluefob > 25000){
        /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
        valorfinalseguro = (finalvaluefob * resutlinsurance[0].data_value) / 100;
        localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
      }else{
        /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
        valorfinalseguro = (finalvaluefob * resutlinsurance[0].data_value) / 100;
        localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
      }
      sectionsSteps.moveTo('step-requirespickup', 1);
      $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-requirespickup]").html(`
        <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
          <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Necesitas Transporte?</h3>
          <span>
            <span>
              <input type="hidden" value="" id="opt-reqtransport" name="opt-reqtransport" class="n-val-sd">
            </span>
          </span>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cStep">
          <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-requirespickup">
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/inland-trans.png" alt="" loading="lazy">
                </div>
                <p>SÍ</p>
              </li>
            </a>
            <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                  <img src="views/assets/img/steps/no-inland-trans.png" alt="" loading="lazy">
                </div>
                <p>NO</p>
              </li>
            </a>
          </ul>
        </div>
        <div class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep"></div>
      `);
    }
  });

});
/*===================================================================================
=                     9. AGREGAR - RECOGIDA                                         =
====================================================================================*/
$(document).on("click", "#list-requirespickup a", function(){
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
          <span>
            <input type="hidden" value="" id="plc-pickuploc" name="plc-pickuploc" class="n-val-sd">
          </span>
        </span>
      </div>
      <div class="cont-MainCamelLog--c--contSteps--item--cStep">
        <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation">
          <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC">
            <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl">
              <label for="" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--label">DISTRITO</label>
              <div class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange">
                <input type="text" id="ipt-valDistricByCountryNInterface" class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--input" autocomplete="nope" spellcheck="false">
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
      <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-NextStepTorequirespickup">
        <span>CALCULAR COTIZACIÓN</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
      </button>
    `);
  }
});
/************************** LISTAR LOS DISTRITOS POR ID DE PAÍS **************************/
function listrateLCLTransport(searchVal){

  if($("#loadTypeTranport").val() == "general")  {

    /************************** LISTADO DE TARIFAS PARA TRANSPORTE INTERNO - TIPO GENERAL **************************/
    $.ajax({
      url: "controllers/list_zonasratelcltransport_general.php",
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
        var zonaUppercase = e.zona;

        var g_1_1000 = parseFloat(e.g_1_1000);
        var g_1001_2000 = parseFloat(e.g_1001_2000);
        var g_2001_3000 = parseFloat(e.g_2001_3000);
        var g_3001_4000 = parseFloat(e.g_3001_4000);
        var g_4001_5000 = parseFloat(e.g_4001_5000);
        var g_5001_7000 = parseFloat(e.g_5001_7000);
        var g_20st_40nor = parseFloat(e.g_20st_40nor);

        if($("#loadTypeCharge").val() == "LCL"){
          /************************** QUITAR LOS PUNTOS A EL VALOR DEL PESO **************************/
          var val_weighttotalstep = $("#n_weightcompare_ultstep").val();
          var val_finalweighttotalstep = val_weighttotalstep.replace(/\./g, '');

          if($("#n_weightcompare_ultstep").val() != 0 && $("#n_weightcompare_ultstep").val() != ""){
            if(val_finalweighttotalstep > 0 && val_finalweighttotalstep <= 1000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_1_1000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 1001 && val_finalweighttotalstep <= 2000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_1001_2000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 2001 && val_finalweighttotalstep <= 3000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_2001_3000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 3001 && val_finalweighttotalstep <= 4000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_3001_4000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 4001 && val_finalweighttotalstep <= 5000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_4001_5000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 5001 && val_finalweighttotalstep <= 7000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_5001_7000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else{
              console.log('El peso excede las tarifas del sistema');
            }
          }
        }else{
          //console.log('Se seleccionó FCL');
          template += `
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${g_20st_40nor.toFixed(2)}">
              <span>${zonaUppercase.toUpperCase()}</span>
            </li>
          `;
        }

        });
        $("#m-listAllDistricsByCountry").html(template);
      }
    });

  }else if($("#loadTypeTranport").val() == "imo"){

    /************************** LISTADO DE TARIFAS PARA TRANSPORTE INTERNO - TIPO IMO **************************/
    $.ajax({
      url: "controllers/list_zonasratelcltransport_imo.php",
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
        var zonaUppercase = e.zona;

        var imo_1_1000 = parseFloat(e.imo_1_1000);
        var imo_1001_2000 = parseFloat(e.imo_1001_2000);
        var imo_2001_3000 = parseFloat(e.imo_2001_3000);
        var imo_3001_4000 = parseFloat(e.imo_3001_4000);
        var imo_4001_5000 = parseFloat(e.imo_4001_5000);
        var imo_5001_7000 = parseFloat(e.imo_5001_7000);
        var imo_20st_40nor = parseFloat(e.imo_20st_40nor);

        if($("#loadTypeCharge").val() == "LCL"){
          /************************** QUITAR LOS PUNTOS A EL VALOR DEL PESO **************************/
          var val_weighttotalstep = $("#n_weightcompare_ultstep").val();
          var val_finalweighttotalstep = val_weighttotalstep.replace(/\./g, '');

          if($("#n_weightcompare_ultstep").val() != 0 && $("#n_weightcompare_ultstep").val() != ""){
            if(val_finalweighttotalstep > 0 && val_finalweighttotalstep <= 1000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_1_1000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 1001 && val_finalweighttotalstep <= 2000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_1001_2000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 2001 && val_finalweighttotalstep <= 3000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_2001_3000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 3001 && val_finalweighttotalstep <= 4000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_3001_4000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 4001 && val_finalweighttotalstep <= 5000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_4001_5000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 5001 && val_finalweighttotalstep <= 7000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_5001_7000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else{
              console.log('El peso excede las tarifas del sistema');
            }
          }
        }else{
          //console.log('Se seleccionó FCL');
          template += `
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${imo_20st_40nor.toFixed(2)}">
              <span>${zonaUppercase.toUpperCase()}</span>
            </li>
          `;
        }

        });
        $("#m-listAllDistricsByCountry").html(template);
      }
    });

  }else if($("#loadTypeTranport").val() == "refrigerado"){

    /************************** LISTADO DE TARIFAS PARA TRANSPORTE INTERNO - TIPO REFRIGERADO **************************/
    $.ajax({
      url: "controllers/list_zonasratelcltransport_refrigerado.php",
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
        var zonaUppercase = e.zona;

        var refr_1_1000 = parseFloat(e.refr_1_1000);
        var refr_1001_2000 = parseFloat(e.refr_1001_2000);
        var refr_2001_3000 = parseFloat(e.refr_2001_3000);
        var refr_3001_4000 = parseFloat(e.refr_3001_4000);
        var refr_4001_5000 = parseFloat(e.refr_4001_5000);
        var refr_5001_7000 = parseFloat(e.refr_5001_7000);
        var refr_20st_40nor = parseFloat(e.refr_20st_40nor);

        if($("#loadTypeCharge").val() == "LCL"){
          /************************** QUITAR LOS PUNTOS A EL VALOR DEL PESO **************************/
          var val_weighttotalstep = $("#n_weightcompare_ultstep").val();
          var val_finalweighttotalstep = val_weighttotalstep.replace(/\./g, '');

          if($("#n_weightcompare_ultstep").val() != 0 && $("#n_weightcompare_ultstep").val() != ""){
            if(val_finalweighttotalstep > 0 && val_finalweighttotalstep <= 1000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_1_1000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 1001 && val_finalweighttotalstep <= 2000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_1001_2000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 2001 && val_finalweighttotalstep <= 3000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_2001_3000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 3001 && val_finalweighttotalstep <= 4000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_3001_4000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 4001 && val_finalweighttotalstep <= 5000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_4001_5000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else if(val_finalweighttotalstep > 5001 && val_finalweighttotalstep <= 7000){
              template += `
                <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_5001_7000.toFixed(2)}">
                  <span>${zonaUppercase.toUpperCase()}</span>
                </li>
              `;
            }else{
              console.log('El peso excede las tarifas del sistema');
            }
          }
        }else{
          //console.log('Se seleccionó FCL');
          template += `
            <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item" id="${e.id}" idprovince="${e.zona}" namprovince="${e.province}" rateprice="${refr_20st_40nor.toFixed(2)}">
              <span>${zonaUppercase.toUpperCase()}</span>
            </li>
          `;
        }

        });
        $("#m-listAllDistricsByCountry").html(template);
      }
    });
    
  }else{
    console.log("Por favor, elige un tipo de transporte para continuar");
  }

}
/************************** MOSTRAR EL LISTADO DE DISTRITO POR PAÍS DE DESTINO **************************/
$(document).on("focus", "#ipt-valDistricByCountryNInterface", function(){
	$("#m-listAllDistricsByCountry").addClass("show");listrateLCLTransport();
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
    listrateLCLTransport(searchVal);
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html("");
  }else{
    listrateLCLTransport();
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - DISTRITO POR PAÍS DE DESTINO **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsPickupLocation--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllDistricsByCountry").removeClass("show");
  $("#ipt-valDistricByCountryNInterface").attr("iddistrict", $(this).attr("id"));
  $("#ipt-valDistricByCountryNInterface").val($(this).find("span").text());

  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - RECOGIDA UBICACIÓN **************************/
  $("#plc-pickuploc").val($(this).attr("namprovince")+" - "+$(this).find("span").text());

  /************************** VARIABLE PARA CONTENEDORES - 20ST,40ST,40HQ Y 40NOR **************************/
  var q_containerType = 0;

  if($("#loadTypeCharge").val() == "FCL"){
    if($("#ipt-qvalContainer20ST").val() != 0 && $("#ipt-qvalContainer20ST").val() != ""){
      q_containerType = $("#ipt-qvalContainer20ST").val();
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuetransport", q_containerType * $(this).attr("rateprice"));

    }else if($("#ipt-qvalContainer40ST").val() != 0 && $("#ipt-qvalContainer40ST").val() != ""){
      q_containerType = $("#ipt-qvalContainer40ST").val();
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuetransport", q_containerType * $(this).attr("rateprice"));

    }else if($("#ipt-qvalContainer40HQ").val() != 0 && $("#ipt-qvalContainer40HQ").val() != ""){
      q_containerType = $("#ipt-qvalContainer40HQ").val();
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuetransport", q_containerType * $(this).attr("rateprice"));

    }else if($("#ipt-qvalContainer40NOR").val() != 0 && $("#ipt-qvalContainer40NOR").val() != ""){
      q_containerType = $("#ipt-qvalContainer40NOR").val();
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuetransport", q_containerType * $(this).attr("rateprice"));

    }else{
      console.log('No se seleccionó ningún contenedor en FCL');
    }

  }else{

    localStorage.setItem("key_v-valuetransport", $("#val-iptPackagesNInterface").val() * $(this).attr("rateprice"));
  }

  /************************** MOSTRAR EL BOTÓN DE COTIZACIÓN **************************/
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-pickuplocation] .cont-MainCamelLog--c--contSteps--item--cBtnNextStep").html(`
    <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-NextStepTopickuplocation">
      <span>CALCULAR COTIZACIÓN</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
    </button>
  `);
});