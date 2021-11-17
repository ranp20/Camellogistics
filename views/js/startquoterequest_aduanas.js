$(() => {
  /************************** REFRESCAR EL ID DE CÓDIGO RANDOM **************************/
  refreshIdCodeGenRandom();
  /************************** CAMBIAR ENTRE ENLACES HERMANOS Y OCULTAR LOS PASOS SIGUIENTES **************************/
  ChangesSibblingsLinks();
  hiddenAllNextSteps();
  /************************** LISTAR LAS UNIDADES DE MEDIDA EN EL MODAL **************************/
  list_measurement_units();
  list_mass_units();
	/************************** LISTAR LOS TIPOS DE PRODUCTOS **************************/
	listProductsUser();
  /************************** LISTAR LOS DISTRITOS DE ACUERDO AL PAÍS DE DESTINO **************************/
  //listrateLCLTransport();
});
function refreshIdCodeGenRandom(){
  setInterval(function(){
    $.ajax({
      url: "controllers/c_list_id_codegenrandom.php",
      method: "POST",
      datatype: "JSON",
      cache: false,
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    }).done(function(e){
      $("#ipt-vidcodgenrand").val(e);
    });
  }, 100);
}
////OTRAS TAREAS - MEJORA DE UI Y UX
/*- Mostrar al inicio solo los pasos a usar antes de cada elección, luego ir añadiendo o quitando de acuerdo a los elementos seleccionados*/
/************************** RECOGER LAS VARIABLES RECIBIDAS POR POST **************************/
var ipt_idTypeTransport = $("#ipt-vtypetranspinit").val();
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
           'step-chargedata',
  				 'step-merchandisedata',
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
    $(".cont-MainCamelLog--c--contResumeCalc--item--cardStep--cIconStepLeft[data-merchandise=rsm-typecharge]").find("img").attr("src","");
    $(".cont-MainCamelLog--c--contResumeCalc--item[data-advlevel=d-typetransportcharge]").html("");
    /************************** OCULTAR TODOS LOS PASOS ABIERTOS EN CASO SE VUELVA HASTA ESTE PASO **************************/
    /************************** OCULTAR LOS OTROS PASOS AJENOS A ESTA ELECCIÓN **************************/
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-typetransport]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").html("");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").removeClass("show");
    $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-merchandisedata]").html("");
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
  //$(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargeload]").addClass("show");
  $(".cont-MainCamelLog--c--contSteps--item[data-anchor=step-chargedata]").addClass("show");
  var ttypeTransport = $(this).index();
  if(ttypeTransport == 0){
    /************************** AGREGAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_v-totalflette", 0);
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
  }else if(ttypeTransport == 1){
    /************************** AGREGAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_v-totalflette", 0);
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
  }else{
    /************************** AGREGAR A LAS VARIABLES LOCALES **************************/
    localStorage.setItem("key_v-totalflette", 0);
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
/************************** VALIDAR EL INPUT DE PRECIO DEL PRODUCTO - OPCIÓN 2 **************************/
$(document).on("change input keyup", "#ipt-valPriceProdNInterface-notMoreOpts", function(e){
  if ((e.which != 8 && e.which != 0) && (e.which < 48 || e.which > 57) && $(this).val().length >= parseInt($(this).attr('maxlength'))){
    return false;
  }
  let value = e.target.value;
  e.target.value = value.replace(/[^A-Z\d-]/g, "");
  $(this).val(function(i, v){
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });
  /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
  $("#val-valProdquot-noMoreOpts").val($(this).val());
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-valueproduct", $(this).val());
  /************************** VALIDAR SI CONTIENE ALGÚN VALOR NULO O 0 **************************/
  if(e.target.value == "" || e.target.value == 0 || $(this).val() == " USD" || $(this).val() == ".00" || $(this).val() == 0.00){
    $("#s-caseNextStepTomerchandisedata").html("");
    $("#MsgItemValueProdRequired").text("Ingrese valor exacto, SIN DECIMALES");
    $(this).val("");
    $("#s-caseNextStepTomerchandisedata").html("");
  }else{
    $("#MsgItemValueProdRequired").text("");
    if(document.querySelector("#ipt-valCantOfAmountAdditional-notMoreOpts").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface-notMoreOpts"))){
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct") && $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != "" && $("#ipt-valQuantityAmAddProdNInterface-notMoreOpts").val() != 0){
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        $.ajax({
          url: "controllers/list_insurancevalues.php",
          method: "POST",
          datatype: "JSON",
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        }).done((e) => {
          var resutlinsurance = JSON.parse(e);
          var valfobproduct = $("#val-valProdquot-noMoreOpts").val();
          var cutefobprice = valfobproduct.split(" USD");
          var withoutpointsfob = cutefobprice[0].replace(/\./g, '');
          var finalvaluefob = twodecimals(withoutpointsfob);
          var c_InsuranceMenor = parseFloat(resutlinsurance[0].data_value);
          var c_InsuranceMayor = parseFloat(resutlinsurance[1].data_value) / 100;

          var valorfinalseguro = 0;
          if(finalvaluefob > 25000){
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = finalvaluefob * c_InsuranceMayor; //FOB ES MAYOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }else{
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = c_InsuranceMenor; //FOB ES MENOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }
        });
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }else{
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct")){
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        $.ajax({
          url: "controllers/list_insurancevalues.php",
          method: "POST",
          datatype: "JSON",
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        }).done((e) => {
          var resutlinsurance = JSON.parse(e);
          var valfobproduct = $("#val-valProdquot-noMoreOpts").val();
          var cutefobprice = valfobproduct.split(" USD");
          var withoutpointsfob = cutefobprice[0].replace(/\./g, '');
          var finalvaluefob = twodecimals(withoutpointsfob);
          var c_InsuranceMenor = parseFloat(resutlinsurance[0].data_value);
          var c_InsuranceMayor = parseFloat(resutlinsurance[1].data_value) / 100;

          var valorfinalseguro = 0;
          if(finalvaluefob > 25000){
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = finalvaluefob * c_InsuranceMayor; //FOB ES MAYOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }else{
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = c_InsuranceMenor; //FOB ES MENOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }
        });
      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }
    }

    $("#s-caseNextStepTomerchandisedata").html(`
      <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData-2">
        <span>CALCULAR COTIZACIÓN</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
      </button>
    `);
  }
});
/************************** MOSTRAR EL LISTADO DE TIPOS DE PRODUCTOS **************************/
$(document).on("focus", "#ipt-valNameTypeProdNInterface-notMoreOpts", function(){
  $("#m-listAllNamTypeProds").addClass("show");
  listProductsUser();
});
/************************** LISTAR LOS PRODUCTOS EN TIEMPO REAL **************************/
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
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - TIPOS DE PRODUCTOS **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllNamTypeProds").removeClass("show");
  $("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct", $(this).attr("id"));
  $("#ipt-valNameTypeProdNInterface-notMoreOpts").val($(this).find("p").text());
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-nametypeproduct", $(this).find("p").text()); //NOMBRE DEL TIPO DE PRODUCTO
  localStorage.setItem("key_v-dbammountadditional", $(this).attr("data-amountadditional")); //VALOR ADICIONAL DEL PRODUCTO
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
  $("#val-categProdquot-noMoreOpts").val($(this).find("p").text());
});
/************************** VALIDAR INPUT - CANTIDAD DE PRODUCTOS CON MONTO ADICIONAL **************************/
$(document).on("keyup keypress blur change", "#ipt-valQuantityAmAddProdNInterface-notMoreOpts", function(e){
  if ((e.which != 8 && e.which != 0) && (e.which < 48 || e.which > 57) && $(this).val().length >= parseInt($(this).attr('maxlength'))) {
    return false;
  }
  let value = e.target.value;
  e.target.value = value.replace(/[^A-Z\d-]/g, "");
  $(this).val(function(i, v) {
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  });
  /************************** AGREGAR AL INPUT DE ENVÍO POST Y AGREGAR A LA VARIABLE LOCAL **************************/
  $("#val-quantityProdsAmmAdd-noMoreOpts").val(e.target.value);
  localStorage.setItem("key_v-ammountadditional", e.target.value);
  /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
  localStorage.setItem("key_v-totalammountadditional", localStorage.getItem("key_v-dbammountadditional") * value);
  /************************** VALIDAR SI CONTIENE ALGÚN VALOR NULO O 0 **************************/
  if(e.target.value == 0 && e.target.value == ""){
    $("#s-caseNextStepTomerchandisedata").html("");
  }else{
    if(document.querySelector("#ipt-valCantOfAmountAdditional-notMoreOpts").contains(document.querySelector("#ipt-valQuantityAmAddProdNInterface-notMoreOpts"))){
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct") && $("#ipt-valPriceProdNInterface-notMoreOpts").val() != 0 && $("#ipt-valPriceProdNInterface-notMoreOpts").val() != ""){
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        $.ajax({
          url: "controllers/list_insurancevalues.php",
          method: "POST",
          datatype: "JSON",
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        }).done((e) => {
          var resutlinsurance = JSON.parse(e);
          var valfobproduct = $("#val-valProdquot-noMoreOpts").val();
          //var cutefobprice = valfobproduct.split(" USD");
          var withoutpointsfob = valfobproduct[0].replace(/\./g, '');
          console.log(withoutpointsfob);
          var finalvaluefob = twodecimals(withoutpointsfob);
          var c_InsuranceMenor = parseFloat(resutlinsurance[0].data_value);
          var c_InsuranceMayor = parseFloat(resutlinsurance[1].data_value) / 100;

          var valorfinalseguro = 0;
          if(finalvaluefob > 25000){
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = finalvaluefob * c_InsuranceMayor; //FOB ES MAYOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }else{
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = c_InsuranceMenor; //FOB ES MENOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }
        });

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData-3">
            <span>CALCULAR COTIZACIÓN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" x="0px" y="0px"><g data-name="13-Quotation"><path d="M53.47,77.72h.88a1.06,1.06,0,0,0,0-2.12H19.46V7.19H61.17V22.81a1.06,1.06,0,0,0,1.06,1.06H77.1V65.09a1.06,1.06,0,0,0,2.11,0V22.81s0,0,0-.07a2.38,2.38,0,0,0,0-.26l0-.1a1.17,1.17,0,0,0-.19-.3L63,5.41a1,1,0,0,0-.79-.32H18.41a1.05,1.05,0,0,0-1.06,1.06V75.6H6.11a1.06,1.06,0,0,0-1.05,1.06c0,7.43,5.29,13.47,11.79,13.47h37.5a1.06,1.06,0,1,0,0-2.12H16.85c-5,0-9.18-4.53-9.64-10.29H53.47ZM63.28,8.83l12.4,12.92H63.28Z"/><path d="M73.84,64V33.17a1.05,1.05,0,0,0-1.06-1.06h-49a1.05,1.05,0,0,0-1.06,1.06V64a1.05,1.05,0,0,0,1.06,1.06h49A1.05,1.05,0,0,0,73.84,64ZM71.73,38.29H39.25V34.22H71.73Zm-39.4,0V34.22h4.81v4.07Zm4.81,2.11V63H32.33V40.4ZM24.83,34.22h5.38v4.07H24.83Zm0,6.18h5.38V63H24.83ZM39.25,63V40.4H71.73V63Z"/><path d="M60.49,69.27a1.05,1.05,0,0,0-1.06-1.06H55.81a1.06,1.06,0,1,0,0,2.11h3.62A1.05,1.05,0,0,0,60.49,69.27Z"/><path d="M51.57,69.27a.95.95,0,1,0,1-1A.95.95,0,0,0,51.57,69.27Z"/><path d="M23,17.73H34.47a1.06,1.06,0,0,0,0-2.11H23a1.06,1.06,0,1,0,0,2.11Z"/><path d="M23,21.52H38.36a1.06,1.06,0,0,0,0-2.12H23a1.06,1.06,0,0,0,0,2.12Z"/><path d="M42.48,20.46a.95.95,0,1,0-.94.95A.95.95,0,0,0,42.48,20.46Z"/><path d="M71.47,75.84a2,2,0,0,1,2,2,1.06,1.06,0,0,0,1,1.1,1,1,0,0,0,1.09-1,4,4,0,0,0-3-4l0-.75a1.06,1.06,0,0,0-2.11-.08l0,.75a4,4,0,0,0-3.25,3.74,4,4,0,0,0,1.12,2.9,4.21,4.21,0,0,0,2.88,1.27,2.12,2.12,0,0,1,1.44.63,1.82,1.82,0,0,1,.53,1.35,2.05,2.05,0,0,1-4.09-.16,1.07,1.07,0,0,0-1-1.1,1,1,0,0,0-1.1,1,4,4,0,0,0,2.95,4l0,.68a1.05,1.05,0,0,0,1,1.1h0a1.06,1.06,0,0,0,1.05-1l0-.67a4,4,0,0,0,3.25-3.75,4,4,0,0,0-1.12-2.9,4.25,4.25,0,0,0-2.88-1.27A2.12,2.12,0,0,1,69.88,79a1.82,1.82,0,0,1-.53-1.35A2,2,0,0,1,71.47,75.84Z"/><path d="M83.67,92.54a1,1,0,0,0-1-.78,6.53,6.53,0,0,1-3.2-1,13.68,13.68,0,1,0-8.67,3.1A13.48,13.48,0,0,0,74,93.52,8.58,8.58,0,0,0,78.77,95a8.68,8.68,0,0,0,2.31-.31L83,94.15a1,1,0,0,0,.74-1.29Zm-6.67-1a8.39,8.39,0,0,0,1.88,1.32,6.37,6.37,0,0,1-4.07-1.34,1.08,1.08,0,0,0-.64-.22,1.26,1.26,0,0,0-.28,0,11.79,11.79,0,0,1-3.08.43,11.59,11.59,0,1,1,6.32-1.89,1.07,1.07,0,0,0-.47.8A1,1,0,0,0,77,91.56Z"/></g></svg>
          </button>
        `);

      }else{
        $("#s-caseNextStepTomerchandisedata").html("");
      }

    }else{
      if($("#ipt-valNameTypeProdNInterface-notMoreOpts").attr("idproduct")){
        /************************** AGREGAR A LA VARIABLE LOCAL **************************/
        $.ajax({
          url: "controllers/list_insurancevalues.php",
          method: "POST",
          datatype: "JSON",
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
        }).done((e) => {
          var resutlinsurance = JSON.parse(e);
          var valfobproduct = $("#val-valProdquot-noMoreOpts").val();
          var cutefobprice = valfobproduct.split(" USD");
          var withoutpointsfob = cutefobprice[0].replace(/\./g, '');
          var finalvaluefob = twodecimals(withoutpointsfob);
          var c_InsuranceMenor = parseFloat(resutlinsurance[0].data_value);
          var c_InsuranceMayor = parseFloat(resutlinsurance[1].data_value) / 100;

          var valorfinalseguro = 0;
          if(finalvaluefob > 25000){
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = finalvaluefob * c_InsuranceMayor; //FOB ES MAYOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }else{
            /************************** ASIGNAR AL VALOR DE LA VARIABLE LOCAL **************************/
            valorfinalseguro = c_InsuranceMenor; //FOB ES MENOR A 25000
            localStorage.setItem("key_v-valueinsurance", roundToTwo(valorfinalseguro));
          }
        });

        $("#s-caseNextStepTomerchandisedata").html(`
          <button type="submit" class="cont-MainCamelLog--c--contSteps--item--cBtnNextStep--btnR" id="btn-CalcQuoteToMerchandiseData-4">
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
/*========================================================================================
=                         5. AGREGAR LAS DIMENSIONES DE LA CARGA                         =
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
  ($(this).val() == "") ? $(this).val() : $(this).val(twodecimals(e.target.value));
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
contModalCalcVolum.addEventListener("click", e => { if(e.target === contModalCalcVolum) contModalCalcVolum.classList.remove("show");});
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
$(document).on("keyup", "#val-NroPackagestselitem", function(){ ($(this).val() != "") ? $("#msgNounNroPackagesvalue").text("") : $("#msgNounNroPackagesvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - LARGO **************************/
$(document).on("keyup", "#val-Longinputitem", function(){ ($(this).val() != "") ? $("#msgNounLongvalue").text("") : $("#msgNounLongvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ANCHO **************************/
$(document).on("keyup", "#val-Widthinputitem", function(){  ($(this).val() != "") ? $("#msgNounWidthvalue").text("") : $("#msgNounWidthvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - ALTO **************************/
$(document).on("keyup", "#val-Heightinputitem", function(){ ($(this).val() != "") ? $("#msgNounHeightvalue").text("") : $("#msgNounHeightvalue").text("Campo requerido");});
/************************** VALIDAR SI CONTIENE UN VALOR - PESO **************************/
$(document).on("keyup", "#val-Weightinputitem", function(){ ($(this).val() != "") ? $("#msgNounWeightvalue").text("") : $("#msgNounWeightvalue").text("Campo requerido");});

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
    //  typeSend: $("#val-typecontainerflete").attr("typecontainer"),
    //  unitLong: $("#val-Lengthselitem").val(),
    //  unitMass: $("#val-UnitWeightselitem").val(),
    //  nroPackages: $("#val-NroPackagestselitem").val(),
    //  valLong: $("#val-Longinputitem").val(),
    //  valWidth: $("#val-Widthinputitem").val(),
    //  valHeight: $("#val-Heightinputitem").val(),
    //  valWeight: $("#val-Weightinputitem").val(),
    //  placeOrigin: $("#input-vallistorigin").val(),
    //  placeDestiny: $("#input-vallistdestiny").val()
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
  listCalcTotal = calculateTotal;
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
    var twodecimal_total_imo = 0;
    var twodecimal_total_refrigerado = 0;
    
    console.log("Solo almacenar las dimensiones del producto.");

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
=                         6. AGREGAR LOS DATOS DE MERCANCÍA                           =
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
        <li class="cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item" id="${e.id_prod}" 
          data-amountadditional="${e.montoadd}"
          data-taxone="${e.ad_valoren}"
          data-taxtwo="${e.impuesto_selectivo}"
          data-taxthree="${e.antidumping}">
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
    //console.log('Con contenido');
  }
});
/************************** FIJAR EL VALOR DE ITEM EN EL INPUT - TIPOS DE PRODUCTOS **************************/
$(document).on("click", ".cont-MainCamelLog--c--contSteps--item--cStep--mFrmIptsControlsMerchandise--cC--cControl--cListChange--m--item", function(){
  $("#m-listAllNamTypeProds").removeClass("show");
  $("#ipt-valNameTypeProdNInterface").attr("idproduct", $(this).attr("id"));
  $("#ipt-valNameTypeProdNInterface").val($(this).find("p").text());
  var taxationOneVal = parseFloat($(this).attr("data-taxone"));
  var taxationTwoVal = parseFloat($(this).attr("data-taxtwo"));
  var taxationThreeVal = parseFloat($(this).attr("data-taxthree"));
  /************************** ASIGNAR A LA VARIABLE LOCAL DE IMPUESTOS DE PRODUCTO PARA IGV **************************/
  localStorage.setItem("key_v-nametypeproduct", $(this).find("p").text()); //NOMBRE DEL TIPO DE PRODUCTO
  localStorage.setItem("key_v-valuestaxOnebyigv", taxationOneVal); //VALOR DE AD-VALOREN
  localStorage.setItem("key_v-valuestaxTwobyigv", taxationTwoVal); //VALOR DE IMPUESTO SELECCTIVO
  localStorage.setItem("key_v-valuestaxThreebyigv", taxationThreeVal); //VALOR DE ANTIDUMPING
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
    return v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
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

    $.ajax({
      url: "controllers/list_taxation_values_byimport.php",
      method: "POST",
      datatype: "JSON",
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
    }).done(function(e){
      var resultTaximport = JSON.parse(e);
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuestaxationimport", resultTaximport[0].data_value);
    });
  }else{
    $(this).parent().removeClass("active");
    $(this).parent().attr("switch-CFreeze", "NO");
    var notImportPrev = $(this).parent().attr("switch-CFreeze");
    /************************** ASIGNAR VALORES DE LOS INPUTS HIDDEN - MERCANCÍA **************************/
    $("#val-prevImports").val(notImportPrev);

    $.ajax({
      url: "controllers/list_taxation_values_byimport.php",
      method: "POST",
      datatype: "JSON",
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
    }).done(function(e){
      var resultTaximport = JSON.parse(e);
      /************************** ASIGNAR A LA VARIABLE LOCAL **************************/
      localStorage.setItem("key_v-valuestaxationimport", resultTaximport[0].data_value_two);
    });
  }
});