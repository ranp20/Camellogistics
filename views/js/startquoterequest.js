$(() => {
	listPortOriginandDestiny();
});
/************************** LISTAR EL PUERTO DE ORIGEN Y EL PUERTO DE DESTINO **************************/
function listPortOriginandDestiny(){
	var ipt_idPortOrigin = $("#ipt-vportidOrigin").val();
	var ipt_idPortcountryOrigin = $("#ipt-vportidcountryOrigin").val();
	var ipt_idPortDestiny = $("#ipt-vportidDestiny").val();
	var ipt_idPortcountryDestiny = $("#ipt-vportidcountryDestiny").val();

	// $.ajax({
	// 	url: "controllers/list_puertoOriginByIds.php",
 //    method: "POST",
 //    datatype: "JSON",
 //    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
 //    data: {searchList : searchVal},
	// }).done((e) => {
	// 	console.log(e);
	// });
}
/*=====================================================
=            2. ELEGIR EL TIPO DE OPRACIÓN            =
=====================================================*/
$(document).on("click", "#list-typeOperationItems li", function(){
	var tTypeOperation = $(this).index();
	if(tTypeOperation == 0){
    $("html, body").stop().animate({
        scrollTop: $("#id-stepRightQuoteCamel div[data-level=step-chargeload]").offset().top - 70,
      },
      1000
    );
    $("#id-stepRightQuoteCamel div[data-level=step-chargeload]").addClass("step-s");
		$("#id-stepRightQuoteCamel div[data-level=step-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item">
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Qué tipo de operación vas a realizar?</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/export.png" alt="">
                  </div>
                  <p>Exportación</p>
                </a>
              </li>
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/import.png" alt="">
                  </div>
                  <p>Importación</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
		`);
	}else{
    $("html, body").stop().animate({
        scrollTop: $("#id-stepRightQuoteCamel div[data-level=step-chargeload]").offset().top - 70,
      },
      1000
    );
    $("#id-stepRightQuoteCamel div[data-level=step-chargeload]").addClass("step-s");
		$("#id-stepRightQuoteCamel div[data-level=step-chargeload]").html(`
			<div class="cont-MainCamelLog--c--contSteps--item">
          <div class="cont-MainCamelLog--c--contSteps--item--cTitle">
            <h3 class="cont-MainCamelLog--c--contSteps--item--cTitle--title">¿Qué tipo de operación vas a realizar?</h3>
          </div>
          <div class="cont-MainCamelLog--c--contSteps--item--cStep">
            <ul class="cont-MainCamelLog--c--contSteps--item--cStep--m" id="list-typeChargeLoadItems">
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/export.png" alt="">
                  </div>
                  <p>Exportación</p>
                </a>
              </li>
              <li class="cont-MainCamelLog--c--contSteps--item--cStep--m--item">
                <a href="javascript:void(0);" class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem">
                  <div class="cont-MainCamelLog--c--contSteps--item--cStep--m--cardItem--cImg">
                    <img src="views/assets/img/steps/import.png" alt="">
                  </div>
                  <p>Importación</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
		`);
	}
	
});