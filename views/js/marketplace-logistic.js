$(function(){
	changesTabsOperation();	
	list_puertoOriginLCL();
});
/************************** CAMBIAR DE CONTROLES SEGÚN LA OPCIÓN SELECCIONADA **************************/
function changesTabsOperation(){
	parentLinks = $("#c-cOptionsMarket");
	links = parentLinks.find("a");
	parentItems = $("#c-cTabsItem");
	items = $(".cont-MainCamelLog--c--cOptionsMarket--cont--cTabsItem--item");
	links.eq(0).add(items.eq(0)).addClass("active");
	parentLinks.on("click", "a", function(){
		var t = $(this);
		var ind = t.index();
		t.add(items.eq(ind)).addClass("active").siblings().removeClass("active");
	});
}
/************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN **************************/
function list_puertoOriginLCL(searchVal){ 
  $.ajax({
    url: "controllers/list_puertoOriginLCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if($("#ipt-valNamePortOrigin").val() == "" || response.length == 0){
      template = `
        <li class="cont-MainCamelLog--c--cOptionsMarket--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--anyresults">
          <span>No encontrado</span>
        </li>
      `;
      $("#list-itemsNamePortsOrigin").html(template);
      setTimeout(function(){
        $("#list-itemsNamePortsOrigin").removeClass("show");
      }, 5000);
    }else{
      response.forEach(e => {
      template += `
        <li class="cont-MainCamelLog--c--cOptionsMarket--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item" id="${e.idpuerto}" idpaisattr="${e.idpais}">
          <span>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
            (Puerto)
          </span>
          <span>${e.puerto}, ${e.pais}</span>
        </li>
        `;
      });
      $("#list-itemsNamePortsOrigin").html(template);
    }
  });
}
/************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE ORIGIN - LCL **************************/
$(document).on("keyup", "#ipt-valNamePortOrigin", function(){ 
  $("#list-itemsNamePortsOrigin").addClass("show");
  var searchVal = $(this).val();
  if(searchVal != ""){
    list_puertoOriginLCL(searchVal);
  }else{
    list_puertoOriginLCL();
  }
});
/************************** FOCUS EN EL INPUT DE ORIGEN **************************/
// $("#input-vallistorigin").focus(function(){
  
// });
/************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
$(document).on("click", "#list-itemsNamePortsOrigin .cont-MainCamelLog--c--cOptionsMarket--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item", function(){ 
  $("#list-itemsNamePortsOrigin").removeClass("show");
  $("#ipt-valNamePortOrigin").attr("id-puertoorigin", $(this).attr("id"));
  $("#ipt-valNamePortOrigin").attr("id-paispuertoorigin", $(this).attr("idpaisattr"));
  $("#ipt-valNamePortOrigin").val($(this).find("span:nth-child(2)").text());

  /************************** GUARDAR INFO. EN LOCALSTORAGE **************************/
  localStorage.setItem("port_OId", $(this).attr("id"));
  localStorage.setItem("port_OName", $(this).find("span:nth-child(2)").text());
});

// /************************** VARIABLE DE PAÍS DE ORIGEN **************************/
// var idCountryOrigin = 0;

// /************************** OBTENER EL VALOR DEL ID DE ORIGEN **************************/
// $(document).on("click", "#list-originCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){
//   idCountryOrigin = $(this).attr("idpaisattr");
//   return idCountryOrigin;
// });

// /************************** MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN **************************/
// function list_puertoDestinyLCL(searchVal){ 
//   $.ajax({
//     url: "controllers/list_puertoDestinyLCL.php",
//     method: "POST",
//     datatype: "JSON",
//     contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
//     data: {searchList : searchVal, idpais : idCountryOrigin },
//   }).done( function (res) {

//     var response = JSON.parse(res);
//     var template = "";

//     if($("#input-vallistdestiny").val() == "" || $("#input-vallistdestiny").val() == 0 || response.length == 0){
//       template = `
//         <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
//           <span>No encontrado</span>
//         </li>
//       `;
//       $("#list-destinyCountriesandPort").html(template);
//       setTimeout(function(){
//         $("#list-destinyCountriesandPort").removeClass("show");
//       }, 4500);
//     }else{
//       response.forEach(e => {
      
//       if(e.idpais != idCountryOrigin){
//         template += `
//           <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item" id="${e.idpuerto}" idpaisDestino="${e.idpais}">
//             <span>${e.pais} - ${e.puerto}</span>
//           </li>
//           `;
//       }
//       });

//       $("#list-destinyCountriesandPort").html(template);
//     }
//   });
// }
// /************************** BUSQUEDA EN TIEMPO REAL DE PUERTO DE DESTINO - LCL **************************/
// $(document).on("keyup", "#input-vallistdestiny", function(){  
  
//   if($("#input-vallistorigin").val() == ""){
//     $("#input-vallistdestiny").attr("aria-expanded", false);
//     $("#input-vallistdestiny").css({"background-color":"#dddd","cursor":"not-allowed"});
//     $("#input-vallistdestiny").attr("title", "Seleccione un puerto de origen");
//     $("#list-destinyCountriesandPort").html(`
//       <li class="c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--anyresults">
//         <span>No encontrado</span>
//       </li>
//     `);
//   }else{
//     $("#input-vallistdestiny").attr("aria-expanded", true);
//     $("#input-vallistdestiny").css({"background-color":"#fff","cursor":"pointer"});
//     $("#input-vallistdestiny").removeAttr("title");
//   }

//   /************************** VALIDACIÓN AL PUERTO DE DESTINO **************************/
//   if($("#input-vallistdestiny").val() == ""){
//     $("#input-vallistdestiny").removeAttr("id-puertodestiny");
//     $("#input-vallistdestiny").removeAttr("idpaisDestino");
//   }else{
//     $("#input-vallistdestiny").attr("aria-expanded", true);
//     $("#input-vallistdestiny").removeAttr("disabled");
//   }

//   $("#list-destinyCountriesandPort").addClass("show");
//   var searchVal = $(this).val();
//   if(searchVal != ""){
//     list_puertoDestinyLCL(searchVal);
//   }else{
//     list_puertoDestinyLCL();
//   }

//   /************************** VALIDAR SI SE EDITÓ EL CONTROL ESTÁNDO EN EL PASO 2.1 **************************/
//   var stepTwoEdit = document.querySelector("#step-TwoPointOne");
//   if(stepTwoEdit.classList.contains("show")){
//     document.querySelector("#step-TwoPointOne").innerHTML = "";
//     document.querySelector("#cont-btnnextStepTwopointOne").innerHTML = `
//       <button type="button" id="btn-ValidToshowNextStep" class="c-CalculatorStep--form--contStep--cStepSelects--item--nextbtn">SIGUIENTE</button>
//     `;
//   }

// });
// /************************** FOCUS EN EL INPUT DE DESTINO **************************/
// $("#input-vallistdestiny").focus(function(){
//   if($("#input-vallistorigin").val() == ""){
//     alert("Debes seleccionar una opcíon de origen válida");
//     $("#input-vallistdestiny").attr("aria-expanded", false);
//     $("#input-vallistdestiny").css({"background-color":"#dddd","cursor":"not-allowed"});
//     $("#input-vallistdestiny").attr("disabled","disabled");
//   }else{
//     $("#input-vallistdestiny").attr("aria-expanded", true);
//     $("#input-vallistdestiny").css({"background-color":"#fff","cursor":"pointer"});
//     $("#input-vallistdestiny").removeAttr("disabled");
//   }
// });
// /************************** FIJAR EL VALOR DEL PUERTO EN EL INPUT **************************/
// $(document).on("click", "#list-destinyCountriesandPort .c-CalculatorStep--form--contStep--cStepSelects--item--listItems--list--item", function(){ 
//   $("#list-destinyCountriesandPort").removeClass("show");
//   $("#input-vallistdestiny").attr("id-puertodestiny", $(this).attr("id"));
//   $("#input-vallistdestiny").val($(this).find("span").text());
  
//   /************************** GUARDAR INFO. EN LOCALSTORAGE **************************/
//   localStorage.setItem("port_DId", $(this).attr("id"));
//   localStorage.setItem("port_DName", $(this).find("span").text());
// });
// /*==========================================================================================================
// =            PASO 2.1. AVANZAR AL PASO 2.1 AL HACER CLICK EN EL BOTÓN DE "SIGUIENTE" DEL PASO 2            =
// ===========================================================================================================*/
// $(document).on("click", "#btn-ValidToshowNextStep", function(){
  
//   if($("#val-typecontainerflete").attr("idtypecontainer") && 
//     $("#val-CalcPacksRequestModal").val() != "" &&
//     $("#val-CalcWeightRequestModal").val() != "" &&
//     $("#val-CalcVolumeRequestModal").val() != "" &&
//     $("#input-vallistorigin").attr("id-puertoorigin") &&
//     $("#input-vallistdestiny").attr("id-puertodestiny")){

//     /************************** LOADER PARA HABILITAR LA SIGUIENTE FASE **************************/
//     $("#portfolio").append(`
//       <div id="loader-clasic-op85">
//         <div class="loader-clasic-op85--c"></div>
//       </div>
//     `);

//     setTimeout(function(){
//       $("#loader-clasic-op85").remove();
//     }, 1100);

//     $("#step-TwoPointOne").addClass("show");
//     $("#step-TwoPointOne").removeClass("hide step-hidden");
    
//     $("#step-TwoPointOne").html(`
//       <div class="box-container">
//         <div class="c-SelServicesOrNotStep--contStep--cTitle">
//           <h3 class="c-SelServicesOrNotStep--contStep--cTitle--title">2.1 Elige una opción</h3>
//         </div>
//         <div class="c-SelServicesOrNotStep--contStep--cOptionsServices">
//           <ul class="c-SelServicesOrNotStep--contStep--cOptionsServices--m" id="c-listItemsSelRs">
//             <li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item" id="c-listItemsSelRs--withS">
//               <a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
//                 <p>OPCIÓN 1</p>
//                 <div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
//                   <input type="radio" id="chk-optServSel-1" name="chk-optServSel-1" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
//                   <label for="chk-optServSel-1">AGREGAR SERVICIOS DE ADUANA EN DESTINO</label>
//                 </div>
//               </a>
//             </li>
//             <li class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--item" id="c-listItemsSelRs--withoutS">
//               <a href="#" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link">
//                 <p>OPCIÓN 2</p>
//                 <div class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--cControl">
//                   <input type="radio" id="chk-optServSel-2" name="chk-optServSel-2" class="c-SelServicesOrNotStep--contStep--cOptionsServices--m--link--check">
//                   <label for="chk-optServSel-2">NO AGREGAR SERVICIOS "SOLO DESEEO FLETE"</label>
//                 </div>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     `);

//     if(!document.querySelector("#step-TwoPointOne").classList.contains("hide") && !document.querySelector("#step-TwoPointOne").classList.contains("step-hidden")){
//       $("#btn-ValidToshowNextStep").remove();
//     }
//   }else{
//     alert("Completa los campos primero");
//   }
// });