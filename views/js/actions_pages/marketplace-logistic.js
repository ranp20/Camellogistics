$(document).ready(function(){
  // ------------ VARIABLES SESSIONSTORAGE 
  var sess_usercli = sessionStorage.setItem("sess_usercli", 0); //SESSION DE VARIABLE LOCAL PARA EL USUARIO
  var sess_valuser = sessionStorage.setItem("sess_valuser", 0); //VALOR DEL TIPO DE USUARIO: 0 = NINGUNO Y 1 = INVITADO O REGISTRADO
  var sessval_loginuser = "";
  if($("#s_useregin-sistem").val() == "" || $("#s_useregin-sistem").val() == undefined || $("#s_useregin-sistem").val() == 'undefined' || $("#s_useregin-sistem").val() == null ||$("#s_useregin-sistem").val() == 'null'){
    sessval_loginuser = { username: 'any' };
    sessionStorage.setItem("sess_usercli", JSON.stringify(sessval_loginuser));
    sessionStorage.setItem("sess_valuser", 0);
  }else{
    sessval_loginuser = { username: $("#s_useregin-sistem").val() };
    sessionStorage.setItem("sess_usercli", JSON.stringify(sessval_loginuser));
    sessionStorage.setItem("sess_valuser", 1);
  }

  parentLinks = $("#c-cOptionsMarket");
	links = parentLinks.find("a");
	parentItems = $("#c-cTabsItem");
	items = $(".cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item");
	links.eq(1).add(items.eq(1)).addClass("active");

  parentLinks.on("click", "a", function(){
		var t = $(this);
		var ind = t.index();
		t.add(items.eq(ind)).addClass("active").siblings().removeClass("active");
    var typeService = "";
    if(ind == 1){
      typeService = t.find("li").find("span:nth-child(2)").text();
      $("#c-cTabsItem").html(`
        <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typeserviceinpinit" name="v_typeserviceinpinit" value="${typeService}">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typetranspinit" name="v_typetranspinit" value="${ind}">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_iptportoriginpost" name="v_iptportoriginpost">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_iptcountryportoriginpost" name="v_iptcountryportoriginpost">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_iptportdestinypost" name="v_iptportdestinypost">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_iptcountryportdestinypost" name="v_iptcountryportdestinypost">
          <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl">
            <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control">
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
                </div>
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput">
                  <input type="text" id="ipt-valNamePortOrigin" name="ipt-valNamePortOrigin" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Puerto de origen" maxlength="180" autocomplete="off" required>
                  <ul class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m" id="list-itemsNamePortsOrigin"></ul>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
                </div>
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput">
                  <input type="text" id="ipt-valNamePortDestiny" name="ipt-valNamePortDestiny" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Puerto de destino" maxlength="180" autocomplete="off" required>
                  <ul class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m" id="list-itemsNamePortsDestiny"></ul>
                </div>
              </div>
            </div>
            <button type="submit" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--link" data-typeselsp="${typeService}" data-indselsp="${ind}">
              <span>Solicitar Presupuesto</span>
            </button>
          </div>
        </div>
      `);
    }else if(ind == 2){
      typeService = t.find("li").find("span:nth-child(2)").text();
      $("#c-cTabsItem").html(`
        <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typeserviceinpinit" name="v_typeserviceinpinit" value="${typeService}">
          <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl">
            <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control">
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plane-departure" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-plane-departure fa-w-20 fa-3x"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z" class=""></path></svg>
                </div>
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput">
                  <input type="text" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Aeropuerto de origen" maxlength="180" autocomplete="off" required>
                </div>
              </div>
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plane-arrival" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-plane-arrival fa-w-20 fa-3x"><path fill="currentColor" d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM44.81 205.66l88.74 80a62.607 62.607 0 0 0 25.47 13.93l287.6 78.35c26.48 7.21 54.56 8.72 81 1.36 29.67-8.27 43.44-21.21 47.25-35.71 3.83-14.5-1.73-32.71-23.37-54.96-19.28-19.82-44.35-32.79-70.83-40l-97.51-26.56L282.8 30.22c-1.51-5.81-5.95-10.35-11.66-11.91L206.05.58c-10.56-2.88-20.9 5.32-20.71 16.44l47.92 164.21-102.2-27.84-27.59-67.88c-1.93-4.89-6.01-8.57-11.02-9.93L52.72 64.75c-10.34-2.82-20.53 5-20.72 15.88l.23 101.78c.19 8.91 6.03 17.34 12.58 23.25z" class=""></path></svg>
                </div>
                <input type="text" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Aeropuerto de destino" autocomplete="off" required>
              </div>
            </div>
            <button type="submit" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--link" data-typeselsp="${typeService}" data-indselsp="${ind}">
              <span>Solicitar Presupuesto</span>
            </button>
          </div>
        </div>
      `);
    }else{
      t.find("button").attr("type", "submit");
      typeService = t.eq(0).find("li").find("span:nth-child(2)").text();
      $("#c-cTabsItem").html(`
        <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typetranspinit" name="v_typetranspinit" value="${ind}">
          <input tabindex="-1" placeholder="" type="hidden" width="0" height="0" autocomplete="off" spellcheck="false" f-hidden="aria-hidden" class="non-visvalipt h-alternative-shwnon s-fkeynone-step" id="v_typeserviceinpinit" name="v_typeserviceinpinit" value="${typeService}">
          <!--<div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl">
            <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control">
              <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon">
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cIcon">
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-map-marker-alt fa-w-12 fa-3x"><path fill="currentColor" d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z" class=""></path></svg>
                </div>
                <div class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput">
                  <input type="text" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--input" placeholder="Ciudad, puerto o aeropuerto donde realizar el despacho de aduanas" maxlength="180" autocomplete="off" required>
                </div>
              </div>
            </div>
            <button type="submit" class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--link" data-typeselsp="${typeService}" data-indselsp="${ind}">
              <span>Solicitar Presupuesto</span>
            </button>
          </div>-->
        </div>
      `);
    }
	});
});
// ------------ MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN 
function list_puertoOriginLCL(searchVal){
  $.ajax({
    url: "controllers/list_puertoOriginLCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done((e) => {
    if(e != "" && e != "[]"){
      var r = JSON.parse(e);
      var tmp = "";
      if(r.length == 0){
        tmp = `<li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--anyresults"><span>No encontrado</span></li>`;
        $("#list-itemsNamePortsOrigin").html(tmp);
        setTimeout(function(){$("#list-itemsNamePortsOrigin").removeClass("show");}, 5000);
      }else{
        $.each(r, function(i,e){
          tmp += `
          <li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item" id="${e.idpuerto}" idpaisattr="${e.idpais}">
            <span>
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
              (Puerto)
            </span>
            <span>${e.puerto}, ${e.pais}</span>
          </li>`;
        });
        $("#list-itemsNamePortsOrigin").html(tmp);
      }
    }else{
      tmp = `<li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--anyresults"><span>No encontrado</span></li>`;
      $("#list-itemsNamePortsOrigin").html(tmp);
      setTimeout(function(){$("#list-itemsNamePortsOrigin").removeClass("show");}, 5000);
    }
  });
}
// ------------ BUSQUEDA EN TIEMPO REAL DE PUERTO DE ORIGIN - LCL 
$(document).on("keypress keyup", "#ipt-valNamePortOrigin", function(e){ 
  $("#list-itemsNamePortsOrigin").addClass("show");
  var searchVal = e.target.value;
  if(searchVal != ""){list_puertoOriginLCL(searchVal);}else{list_puertoOriginLCL();};
});
// ------------ LISTAR PUERTOS DE ORIGEN *TRANSPORTE MARÍTIMO*
$(document).on("focus","#ipt-valNamePortOrigin",function(e){
  $("#list-itemsNamePortsOrigin").addClass("show");
  var searchVal = e.target.value;
  if(searchVal != ""){list_puertoOriginLCL(searchVal);}else{list_puertoOriginLCL();};
});
// ------------ FIJAR EL VALOR DEL PUERTO EN EL INPUT 
$(document).on("click", "#list-itemsNamePortsOrigin .cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item", function(){ 
  $("#list-itemsNamePortsOrigin").removeClass("show");
  $("#ipt-valNamePortOrigin").val($(this).find("span:nth-child(2)").text());
  // $("#ipt-valNamePortOrigin").attr("id-puertoorigin", $(this).attr("id"));
  // $("#ipt-valNamePortOrigin").attr("id-paispuertoorigin", $(this).attr("idpaisattr"));
  // ------------ GUARDAR PARA ENVIAR POR POST 
  // $("#v_iptportoriginpost").val($(this).attr("id"));
  // $("#v_iptcountryportoriginpost").val($(this).attr("idpaisattr"));
});
// ------------ MOSTRAR EL LISTADO DE PAÍSES O PUERTOS - ORIGEN 
function list_puertoDestinyLCL(searchVal){
  $.ajax({
    url: "controllers/list_puertoDestinyLCL.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done((e) => {
    if(e != "" && e != "[]"){
      var r = JSON.parse(e);
      var tmpDList = "";
      if(r.length == 0){
        tmpDList = `<li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--anyresults"><span>No encontrado</span></li>`;
        $("#list-itemsNamePortsDestiny").html(tmpDList);
        setTimeout(function(){$("#list-itemsNamePortsDestiny").removeClass("show");}, 5000);
      }else{
        $.each(r, function(i,e){
          let port_destiny = e.puerto;
          let port_pais = e.pais;
          tmpDList += `
          <li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item" idpaisattr="${e.pais_id}">
            <span>
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="anchor" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-anchor fa-w-18 fa-3x"><path fill="currentColor" d="M571.515 331.515l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h44.268C453.531 417.326 380.693 456.315 312 462.865V216h60c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12h-60v-11.668c32.456-10.195 56-40.512 56-76.332 0-44.183-35.817-80-80-80s-80 35.817-80 80c0 35.82 23.544 66.138 56 76.332V168h-60c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h60v246.865C195.192 456.304 122.424 417.176 102.762 352h44.268c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.03 67.029C-3.074 339.074 2.28 352 12.971 352h40.284C73.657 451.556 181.238 512 288 512c113.135 0 215.338-65.3 234.745-160h40.284c10.691 0 16.045-12.926 8.486-20.485zM288 48c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z" class=""></path></svg>
              (Puerto)
            </span>
            <span>${port_destiny.toUpperCase()}, ${port_pais.toUpperCase()}</span>
          </li>`;
        });
        $("#list-itemsNamePortsDestiny").html(tmpDList);
      }
    }else{
      tmpDList = `<li class="cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--anyresults"><span>No encontrado</span></li>`;
      $("#list-itemsNamePortsDestiny").html(tmpDList);
      setTimeout(function(){$("#list-itemsNamePortsDestiny").removeClass("show");}, 5000);
    }
  });
}
// ------------ BUSQUEDA EN TIEMPO REAL DE PUERTO DE DESTINO - LCL 
$(document).on("keypress keyup", "#ipt-valNamePortDestiny", function(e){  
  $("#list-itemsNamePortsDestiny").addClass("show");
  var searchVal = e.target.value;
  if(searchVal != ""){list_puertoDestinyLCL(searchVal);}else{list_puertoDestinyLCL();};
});
// ------------ LISTAR PUERTOS DE DESTINO *TRANSPORTE MARÍTIMO*
$(document).on("focus","#ipt-valNamePortDestiny",function(e){
  $("#list-itemsNamePortsDestiny").addClass("show");
  var searchVal = e.target.value;
  if(searchVal != ""){list_puertoDestinyLCL(searchVal);}else{list_puertoDestinyLCL();};
});
// ------------ FIJAR EL VALOR DEL PUERTO EN EL INPUT 
$(document).on("click", "#list-itemsNamePortsDestiny .cont-MainCamelLog--c--cOptionsMarket--f--cont--cTabsItem--item--cControl--control--cGroupIptsIcon--cInput--m--item", function(){ 
  $("#list-itemsNamePortsDestiny").removeClass("show");
  $("#ipt-valNamePortDestiny").val($(this).find("span:nth-child(2)").text());
  // $("#ipt-valNamePortDestiny").attr("id-puertodestiny", $(this).attr("id"));
  // $("#ipt-valNamePortDestiny").attr("id-paispuertodestiny", $(this).attr("idpaisattr"));
  // ------------ GUARDAR PARA ENVIAR POR POST 
  // $("#v_iptportdestinypost").val($(this).attr("id"));
  $("#v_iptcountryportdestinypost").val($(this).attr("idpaisattr"));
});