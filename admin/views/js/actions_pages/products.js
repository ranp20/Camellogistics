$(function(){
  listProducts();
  //load(1);
});
/************************** FUNCIÓN - LIMITAR A DOS DECIMALES SIN REDONDEO **************************/
function twodecimals(n) {
  let t = n.toString();
  let regex = /(\d*.\d{0,2})/;
  return t.match(regex)[0];
}
/************************** LIMITAR A DOS DECIMALES CUALQUIER INPUT DE TIPO NÚMERO EN DONDE ESTÁ IMPORTADO ESTE ARCHIVO **************************/
$(document).on("input","input[type=number]",function(e){
  ($(this).val() == "") ? $(this).val() : $(this).val(twodecimals(e.target.value));
});
// /************************** PAGINACIÓN DE CONTENIDO **************************/
// // function load(page){
// //   var parametros = {"action": "filter","page": page};
// //   $("#loader").fadeIn('slow');
// //   $.ajax({
// //     url:'../admin/controllers/pag_regulators.php',
// //     method: 'POST',
// //     data: parametros,
// //     beforeSend: function(){
// //       $("#loader").html("<img src='../admin/views/assets/img/Utilities/loader.gif'>");
// //     },
// //     success:function(data){
// //       console.log(data);
// //       $(".outer_div").html(data).fadeIn('slow');
// //       $("#loader").html("");
// //     }
// //   });
// // }
/*=======================================================
=            NOMBRE Y REGULADORES - PRODUCTO            =
=======================================================*/
/************************** MOSTRAR/OCULTAR DE ACUERDO AL CHECKBOX SELECCINADO - REGULADOR/NO REQUIERE **************************/
$(document).on("click", ".cont-modalbootstrap__form--controlRadios--c--control--input[name=sel-reornotreg]", function(){
  if($(this).attr("id") == "noun-required-reg"){
    $("#sel-optsRegulatorsMore").html("");
  }else{
    $("#sel-optsRegulatorsMore").html(`
      <div class="cont-modalbootstrap__form--controlSelect">
        <label for="" class="cont-modalbootstrap__form--controlSelect--label">Regulador 1</label>
        <div class="cont-modalbootstrap__form--controlSelect--cFakeSelect" id="btn-FakeListRegulatorOne">
          <span class="cont-modalbootstrap__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSelRegOne">Selecciona un regulador</span>
          <input type="text" readonly id="SelectedItem-inputfakeselRegOne">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <ul class="cont-modalbootstrap__form--controlSelect--m" id="c-listitems-regulatorOne"></ul>
        <span id="msgErrNounReguladorOne"></span>
      </div>
      <div class="cont-modalbootstrap__form--controlSelect">
        <label for="" class="cont-modalbootstrap__form--controlSelect--label">Regulador 2</label>
        <div class="cont-modalbootstrap__form--controlSelect--cFakeSelect" id="btn-FakeListRegulatorTwo">
          <span class="cont-modalbootstrap__form--controlSelect--cFakeSelect--txtitemsel" id="selectedItem-fakeSelRegTwo">Selecciona un regulador</span>
          <input type="text" readonly id="SelectedItem-inputfakeselRegTwo">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.08298L5 5L9 1" stroke="#999" stroke-width="1.25727" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <ul class="cont-modalbootstrap__form--controlSelect--m" id="c-listitems-regulatorTwo"></ul>
        <span id="msgErrNounReguladorTwo"></span>
      </div>
    `);
  }
});
/************************** VALIDAR SI EL NOMBRE DEL PRODUCTO ESTÁ VACÍO **************************/
$(document).on("keyup", "#nameProduct", function(){
  ($(this).val() != 0) ? $("#msgErrNounNameProduct").text("") : $("#msgErrNounNameProduct").text("Debes ingresar un nombre");
});
/************************** VALIDAR SI ESTÁ MARCADO EL RADIOBUTTON - REGULADOR 1 **************************/
$(document).on("click", "#required-reg", function(){
  ($(this).is(':checked')) ? $("#msgErrNounWithOrNotRegulator").text("") : $("#msgErrNounWithOrNotRegulator").text("Debes marcar una opción");
});
/************************** VALIDAR SI ESTÁ MARCADO EL RADIOBUTTON - REGULADOR 1 **************************/
$(document).on("click", "#noun-required-reg", function(){
  ($(this).is(':checked')) ? $("#msgErrNounWithOrNotRegulator").text("") : $("#msgErrNounWithOrNotRegulator").text("Debes marcar una opción");
});
/************************** ABRIR/CERRAR EL LISTADO DE REGULADORES - AGREGAR 1 **************************/
$(document).on("click", "#btn-FakeListRegulatorOne", function(){
  $("#c-listitems-regulatorOne").toggleClass("show");
  $(this).toggleClass("showList");

   $.ajax({
    url: "../admin/controllers/c_list_regulators.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      
      result.forEach( (e) => {
        template += `<li class="cont-modalbootstrap__form--controlSelect--m--item" id="${e.id}" regularone="${e.name}">${e.name}</li>`;
      });

      $("#c-listitems-regulatorOne").html(template);
    }else{
      template += `<li class="cont-modalbootstrap__form--controlSelect--m--item">No se encontraron datos</li>`;

      $("#c-listitems-regulatorOne").html(template);
    }
  });
});
/************************** FIJAR EL VALOR EN EL FAKE SELECT - AGREGAR 1 **************************/
$(document).on("click", "#c-listitems-regulatorOne .cont-modalbootstrap__form--controlSelect--m--item", function(){
  $("#msgErrNounReguladorOne").text("");
  $("#c-listitems-regulatorOne").removeClass("show");
  $("#btn-FakeListRegulatorOne").removeClass("showList");
  $("#selectedItem-fakeSelRegOne").text($(this).text());
  $("#SelectedItem-inputfakeselRegOne").attr("regularone", $(this).attr("regularone"));
  $("#SelectedItem-inputfakeselRegOne").attr("idtregularone", $(this).attr("id"));
});
/************************** ABRIR/CERRAR EL LISTADO DE REGULADORES - AGREGAR 2 **************************/
$(document).on("click", "#btn-FakeListRegulatorTwo", function(){
  $("#c-listitems-regulatorTwo").toggleClass("show");
  $(this).toggleClass("showList");

   $.ajax({
    url: "../admin/controllers/c_list_regulators.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      
      result.forEach( (e) => {
        template += `<li class="cont-modalbootstrap__form--controlSelect--m--item" id="${e.id}" regulartwo="${e.name}">${e.name}</li>`;
      });

      $("#c-listitems-regulatorTwo").html(template);
    }else{
      template += `<li class="cont-modalbootstrap__form--controlSelect--m--item">No se encontraron datos</li>`;

      $("#c-listitems-regulatorTwo").html(template);
    }
  });
});
/************************** FIJAR EL VALOR EN EL FAKE SELECT - AGREGAR 2 **************************/
$(document).on("click", "#c-listitems-regulatorTwo .cont-modalbootstrap__form--controlSelect--m--item", function(){
  $("#msgErrNounReguladorTwo").text("");
  $("#c-listitems-regulatorTwo").removeClass("show");
  $("#btn-FakeListRegulatorTwo").removeClass("showList");
  $("#selectedItem-fakeSelRegTwo").text($(this).text());
  $("#SelectedItem-inputfakeselRegTwo").attr("regulartwo", $(this).attr("regulartwo"));
  $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo", $(this).attr("id"));
});
/*==================================================
=            MONTO ADICIONAL - PRODUCTO            =
==================================================*/
/************************** MOSTRAR/OCULTAR DE ACUERDO AL CHECKBOX SELECCIONADO - MONTO ADICIONAL(AGREGAR) **************************/
$(document).on("click", ".cont-modalbootstrap__form--controlRadios--c--control--input[name=sel-addornotadd]", function(){
  if($(this).attr("id") == "noun-required-amountadditional"){
    $("#sel-optsAmountAdditionalMore").html("");
  }else{
    $("#sel-optsAmountAdditionalMore").html(`
      <div class="cont-modalbootstrap__form--control">
        <label for="amountadditionalProduct" class="cont-modalbootstrap__form--control__label">Precio adicional</label>
        <input id="amountadditionalProduct" class="cont-modalbootstrap__form--control__input" name="amountadditionalProduct" type="number" maxlength="300" placeholder="Ingrese el monto del producto" step="0.01">
        <span id="msgErrNounAmountAdditionalProduct"></span>
      </div>
    `);
  }
});
/************************** MOSTRAR/OCULTAR DE ACUERDO AL CHECKBOX SELECCIONADO - MONTO ADICIONAL(ACTUALIZAR) **************************/
$(document).on("click", ".cont-modalbootstrapupdate__form--controlRadios--c--control--input[name=sel-addornotaddupdate]", function(){
  if($(this).attr("id") == "noun-required-amountadditionalupdate"){
    $("#sel-optsAmountAdditionalMoreUpdate").html("");
  }else{
    $("#sel-optsAmountAdditionalMoreUpdate").html(`
      <div class="cont-modalbootstrapupdate__form--control">
        <label for="amountadditionalProduct-update" class="cont-modalbootstrapupdate__form--control__label">Precio adicional</label>
        <input id="amountadditionalProduct-update" class="cont-modalbootstrapupdate__form--control__input" name="amountadditionalProduct-update" type="number" maxlength="300" placeholder="Ingrese el monto del producto" step="0.01">
        <span id="msgErrNounAmountAdditionalProductUpdate"></span>
      </div>
    `);
  }
});
/************************** VALIDAR SI EL MONTO ESTÁ VACÍO **************************/
$(document).on("keyup", "#amountadditionalProduct", function(){
  ($(this).val() != 0) ? $("#msgErrNounAmountAdditionalProduct").text("") : $("#msgErrNounAmountAdditionalProduct").text("Debe colocar un monto");
});
/************************** VALIDAR SI ESTÁ MARCADO EL RADIOBUTTON - IZQUIERDA **************************/
$(document).on("click", "#required-amountadditional", function(){
  ($(this).is(':checked')) ? $("#msgErrNounWithOrNotAmountAdditional").text("") : $("#msgErrNounWithOrNotAmountAdditional").text("Debes marcar una opción");
});
/************************** VALIDAR SI ESTÁ MARCADO EL RADIOBUTTON - DERECHA **************************/
$(document).on("click", "#noun-required-amountadditional", function(){
  ($(this).is(':checked')) ? $("#msgErrNounWithOrNotAmountAdditional").text("") : $("#msgErrNounWithOrNotAmountAdditional").text("Debes marcar una opción");
});
/*======================================================================
=            IMPUESTOS ADICIONALES - LISTADO DE FAKESELECTS            =
======================================================================*/
/************************** LISTAR LOS IMPUESTOS ADICIONALES - AGREGAR 1 **************************/
$(document).on("click", ".cont-modalbootstrap__form--controlRadios--c--control--input[name=sel-taxornottax]", function(){
  if($(this).attr("id") == "noun-required-taxadditional"){
    $("#sel-optsTaxationAdditionalsMore").html("");
  }else{
    $("#sel-optsTaxationAdditionalsMore").html(`
      <div class="cont-modalbootstrap__form--control">
        <label for="taxoneadditional" class="cont-modalbootstrap__form--control__label">Ad-Valoren</label>
        <input id="taxoneadditional" class="cont-modalbootstrap__form--control__input" name="taxoneadditional" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxOneAdditionalProduct"></span>
      </div>
      <div class="cont-modalbootstrap__form--control">
        <label for="taxtwoadditional" class="cont-modalbootstrap__form--control__label">Impuesto Selecctivo</label>
        <input id="taxtwoadditional" class="cont-modalbootstrap__form--control__input" name="taxtwoadditional" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxTwoAdditionalProduct"></span>
      </div>
      <div class="cont-modalbootstrap__form--control">
        <label for="taxthreeadditional" class="cont-modalbootstrap__form--control__label">ANTIDUMPING</label>
        <input id="taxthreeadditional" class="cont-modalbootstrap__form--control__input" name="taxthreeadditional" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxThreeAdditionalProduct"></span>
      </div>
    `);
  }
});
/************************** VALIDAR LOS CONTROLES DE IMPUESTOS (SI) **************************/
$(document).on("input keyup","#taxoneadditional",function(e){(e.target.value == 0 || e.target.value == "") ? $("#msgErrNounTaxOneAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxOneAdditionalProduct").text("");});
$(document).on("input keyup","#taxtwoadditional",function(e){(e.target.value == 0 || e.target.value == "") ? $("#msgErrNounTaxTwoAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxTwoAdditionalProduct").text("");});
$(document).on("input keyup","#taxthreeadditional",function(e){(e.target.value == 0 || e.target.value == "") ? $("#msgErrNounTaxThreeAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxThreeAdditionalProduct").text("");});

/************************** AGREGAR PRODUCTO **************************/
$(document).on('submit', '#form-add-product', function(e){
  e.preventDefault();

  ($("#nameProduct").val() != 0) ? $("#msgErrNounNameProduct").text("") : $("#msgErrNounNameProduct").text("Debes ingresar un nombre");
  ($("#required-reg").is(":checked") || $("#noun-required-reg").is(":checked")) ? $("#msgErrNounWithOrNotRegulator").text("") : $("#msgErrNounWithOrNotRegulator").text("Debe marcar una opción"); 
  ($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne")) ? $("#msgErrNounReguladorOne").text("") : $("#msgErrNounReguladorOne").text("Debe seleccionar un regulador");
  ($("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo")) ? $("#msgErrNounReguladorTwo").text("") : $("#msgErrNounReguladorTwo").text("Debe seleccionar un regulador");
  ($("#required-amountadditional").is(":checked") || $("#noun-required-amountadditional").is(":checked")) ? $("#msgErrNounWithOrNotAmountAdditional").text("") : $("#msgErrNounWithOrNotAmountAdditional").text("Debe marcar una opción"); 
  ($("#required-taxadditional").is(":checked") || $("#noun-required-taxadditional").is(":checked")) ? $("#msgErrNounWithOrNotTaxAdditional").text("") : $("#msgErrNounWithOrNotTaxAdditional").text("Debe marcar una opción"); 

  /************************** CONDICIONAL 1 - (SI, SI, SI, SI) **************************/
  if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
      $("#required-reg").is(":checked") && 
      $("#required-amountadditional").is(":checked") && 
      $("#required-taxadditional").is(":checked")){
    
    ($("#amountadditionalProduct").val() != 0 || $("#amountadditionalProduct").val() != "") ? $("#msgErrNounAmountAdditionalProduct").text("") : $("#msgErrNounAmountAdditionalProduct").text("Debe colocar un monto");
    ($("#taxoneadditional").val() == 0 || $("#taxoneadditional").val() == "") ? $("#msgErrNounTaxOneAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxOneAdditionalProduct").text("");
    ($("#taxtwoadditional").val() == 0 || $("#taxtwoadditional").val() == "") ? $("#msgErrNounTaxTwoAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxTwoAdditionalProduct").text("");
    ($("#taxthreeadditional").val() == 0 || $("#taxthreeadditional").val() == "") ? $("#msgErrNounTaxThreeAdditionalProduct").text("Debe colocar un monto") : $("#msgErrNounTaxThreeAdditionalProduct").text("");

    if(($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo")) &&
      ($("#amountadditionalProduct").val() != 0 && $("#amountadditionalProduct").val() != "") &&
      (($("#taxoneadditional").val() != 0 || $("#taxoneadditional").val() != "") || 
       ($("#taxtwoadditional").val() != 0 || $("#taxtwoadditional").val() != "") ||
       ($("#taxthreeadditional").val() != 0 || $("#taxthreeadditional").val() != ""))){
      
      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", ($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") != undefined) ? $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") : 0);
      formdata.append("id_regulatortwo", ($("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") != undefined) ? $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") : 0);
      formdata.append("amount_additional", $("#amountadditionalProduct").val());
      formdata.append("ad_valoren", $("#taxoneadditional").val());
      formdata.append("impuesto_selectivo", $("#taxtwoadditional").val());
      formdata.append("antidumping", $("#taxthreeadditional").val());

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsRegulatorsMore").html("");
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      console.log("Falta rellenar los campos");
    }
  /************************** CONDICIONAL 2 - (SI, SI, NO, NO) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") &&
            $("#required-reg").is(":checked") &&
            $("#noun-required-amountadditional").is(":checked") &&
            $("#noun-required-taxadditional").is(":checked")){

    if($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo")){
      
      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne"));
      formdata.append("id_regulatortwo", $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo"));
      formdata.append("amount_additional", 0);
      formdata.append("ad_valoren", 0);
      formdata.append("impuesto_selectivo", 0);
      formdata.append("antidumping", 0);

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsRegulatorsMore").html("");
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });

    }else{
      console.log("Falta rellenar los campos");      
    }
  /************************** CONDICIONAL 3 - (SI, NO, SI, NO) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") &&
           $("#noun-required-reg").is(":checked") &&
           $("#required-amountadditional").is(":checked") &&
           $("#noun-required-taxadditional").is(":checked")){

    if($("#amountadditionalProduct").val() != 0 || $("#amountadditionalProduct").val() != ""){
      $("#msgErrNounAmountAdditionalProduct").text("");

      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#noun-required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", 0);
      formdata.append("id_regulatortwo", 0);
      formdata.append("amount_additional", $("#amountadditionalProduct").val());
      formdata.append("ad_valoren", 0);
      formdata.append("impuesto_selectivo", 0);
      formdata.append("antidumping", 0);

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      $("#msgErrNounAmountAdditionalProduct").text("Debe colocar un monto");
    }
  /************************** CONDICIONAL 4 - (SI, SI, NO, SI) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
           $("#required-reg").is(":checked") && 
           $("#noun-required-amountadditional").is(":checked") && 
           $("#required-taxadditional").is(":checked")){

    if(($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo")) &&
      (($("#taxoneadditional").val() != 0 || $("#taxoneadditional").val() != "") || 
       ($("#taxtwoadditional").val() != 0 || $("#taxtwoadditional").val() != "") ||
       ($("#taxthreeadditional").val() != 0 || $("#taxthreeadditional").val() != ""))){
      
      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", ($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") != undefined) ? $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") : 0);
      formdata.append("id_regulatortwo", ($("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") != undefined) ? $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") : 0);
      formdata.append("amount_additional", 0);
      formdata.append("ad_valoren", $("#taxoneadditional").val());
      formdata.append("impuesto_selectivo", $("#taxtwoadditional").val());
      formdata.append("antidumping", $("#taxthreeadditional").val());

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsRegulatorsMore").html("");
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      console.log("Falta rellenar los campos");      
    }
  /************************** CONDICIONAL 5 - (SI, NO, SI, SI) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
           $("#noun-required-reg").is(":checked") && 
           $("#required-amountadditional").is(":checked") && 
           $("#required-taxadditional").is(":checked")){
    
    if(($("#amountadditionalProduct").val() != 0 || $("#amountadditionalProduct").val() != "") &&
      (($("#taxoneadditional").val() != 0 || $("#taxoneadditional").val() != "") || 
       ($("#taxtwoadditional").val() != 0 || $("#taxtwoadditional").val() != "") ||
       ($("#taxthreeadditional").val() != 0 || $("#taxthreeadditional").val() != ""))){
      $("#msgErrNounAmountAdditionalProduct").text("");

      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#noun-required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", 0);
      formdata.append("id_regulatortwo", 0);
      formdata.append("amount_additional", $("#amountadditionalProduct").val());
      formdata.append("ad_valoren", $("#taxoneadditional").val());
      formdata.append("impuesto_selectivo", $("#taxtwoadditional").val());
      formdata.append("antidumping", $("#taxthreeadditional").val());

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      $("#msgErrNounAmountAdditionalProduct").text("Debe colocar un monto");
    }
  /************************** CONDICIONAL 6 - (SI, SI, SI, NO) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
          $("#required-reg").is(":checked") && 
          $("#required-amountadditional").is(":checked") && 
          $("#noun-required-taxadditional").is(":checked")){

    if(($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo")) &&
      $("#amountadditionalProduct").val() != 0 && $("#amountadditionalProduct").val() != ""){
      
      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", ($("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") || $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") != undefined) ? $("#SelectedItem-inputfakeselRegOne").attr("idtregularOne") : 0);
      formdata.append("id_regulatortwo", ($("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") || $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") != undefined) ? $("#SelectedItem-inputfakeselRegTwo").attr("idtregulartwo") : 0);
      formdata.append("amount_additional", $("#amountadditionalProduct").val());
      formdata.append("ad_valoren", 0);
      formdata.append("impuesto_selectivo", 0);
      formdata.append("antidumping", 0);

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          $("#sel-optsRegulatorsMore").html("");
          $("#sel-optsAmountAdditionalMore").html("");
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      console.log("Falta rellenar los campos");
    }
  /************************** CONDICIONAL 7 - (SI, NO, NO, SI) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
          $("#noun-required-reg").is(":checked") && 
          $("#noun-required-amountadditional").is(":checked") && 
          $("#required-taxadditional").is(":checked")){

    if(($("#taxoneadditional").val() != 0 || $("#taxoneadditional").val() != "") || 
       ($("#taxtwoadditional").val() != 0 || $("#taxtwoadditional").val() != "") ||
       ($("#taxthreeadditional").val() != 0 || $("#taxthreeadditional").val() != "")){

      var formdata = new FormData();
      formdata.append("name", $("#nameProduct").val());
      formdata.append("regulate", $("#noun-required-reg").parent().find("span").text());
      formdata.append("id_regulatorone", 0);
      formdata.append("id_regulatortwo", 0);
      formdata.append("amount_additional", 0);
      formdata.append("ad_valoren", $("#taxoneadditional").val());
      formdata.append("impuesto_selectivo", $("#taxtwoadditional").val());
      formdata.append("antidumping", $("#taxthreeadditional").val());

      $.ajax({
        url: "../admin/controllers/c_add-products.php",
        method: "POST",
        data: formdata,
        contentType: false,
        cache: false,
        processData: false,
      }).done((res) => {
        if(res == "true"){
          $('#form-add-product')[0].reset();
          listProducts();
          $('#addproductModal').modal("hide");
        }else{
          console.log('Lo sentimos, ocurrió un error al agregar el registro');
        }
      });
    }else{
      console.log("Falta rellenar los campos");
    }
  /************************** CONDICIONAL 8 - (SI, NO, NO, NO) **************************/
  }else if(($("#nameProduct").val() != 0 || $("#nameProduct").val() != "") && 
            $("#noun-required-reg").is(":checked") && 
            $("#noun-required-amountadditional").is(":checked") && 
            $("#noun-required-taxadditional").is(":checked")){

    var formdata = new FormData();
    formdata.append("name", $("#nameProduct").val());
    formdata.append("regulate", $("#noun-required-reg").parent().find("span").text());
    formdata.append("id_regulatorone", 0);
    formdata.append("id_regulatortwo", 0);
    formdata.append("amount_additional", 0);
    formdata.append("ad_valoren", 0);
    formdata.append("impuesto_selectivo", 0);
    formdata.append("antidumping", 0);

    $.ajax({
      url: "../admin/controllers/c_add-products.php",
      method: "POST",
      data: formdata,
      contentType: false,
      cache: false,
      processData: false,
    }).done((res) => {
      if(res == "true"){
        $('#form-add-product')[0].reset();
        listProducts();
        $('#addproductModal').modal("hide");
      }else{
        console.log('Lo sentimos, ocurrió un error al agregar el registro');
      }
    });
  }else{
    console.log("Falta rellenar los campos");
  }

});
// /************************** LISTAR PRODUCTOS **************************/
function listProducts(searchVal){ 
  $.ajax({
    url: "../admin/controllers/c_list_products.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {searchList : searchVal},
  }).done( function (res) {

    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <tr>
          <td colspan="7">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;

      $("#tbl_products").html(template);
    }else{
      response.forEach(e => {
      var nounRegOne = "";
      var nounRegTwo = "";
      var nounOneAndTwoRegs = "";

      (e.reguladorOne == null || e.reguladorOne == "") ? nounRegOne = "NO REQUIERE" : nounRegOne = e.reguladorOne;
      (e.reguladorTwo == null || e.reguladorTwo == "") ? nounRegTwo = "NO REQUIERE" : nounRegTwo = e.reguladorTwo;

      if((e.reguladorOne == null || e.reguladorOne == "") && (e.reguladorTwo == null || e.reguladorTwo == "")){
        nounOneAndTwoRegs = "NO REQUIERE";
      }else if(e.reguladorOne == null || e.reguladorOne == ""){
        nounOneAndTwoRegs = e.reguladorTwo;
      }else if(e.reguladorTwo == null || e.reguladorTwo == ""){
        nounOneAndTwoRegs = e.reguladorOne;
      }else{
        nounOneAndTwoRegs = e.reguladorOne + " / " + e.reguladorTwo;
      }      

      // var nounTaxOne = "";
      // var nounTaxTwo = "";
      // var nounTaxThree = "";
      // var nounOneAndMoreTaxs = "";

      // (e.impuestoOne == null || e.impuestoOne == 'null' || e.impuestoOne == "") ? nounTaxOne = "" : nounTaxOne = e.impuestoOne;
      // (e.impuestoTwo == null || e.impuestoTwo == 'null' || e.impuestoTwo == "") ? nounTaxTwo = "" : nounTaxTwo = e.impuestoTwo;
      // (e.impuestoThree == null || e.impuestoThree == 'null' || e.impuestoThree == "") ? nounTaxThree = "" : nounTaxThree = e.impuestoThree;

      // if((e.impuestoOne == null || e.impuestoOne == 'null' || e.impuestoOne == "") && 
      //   (e.impuestoTwo == null || e.impuestoTwo == 'null' || e.impuestoTwo == "") && 
      //   (e.impuestoThree == null || e.impuestoThree == 'null' || e.impuestoThree == "")){
      //   nounOneAndMoreTaxs = "Ninguno";
      // }else if((e.impuestoOne == null || e.impuestoOne == 'null' || e.impuestoOne == "") && (e.impuestoTwo == null || e.impuestoTwo == 'null' || e.impuestoTwo == "")){
      //   nounOneAndMoreTaxs = nounTaxThree;
      // }else if((e.impuestoTwo == null || e.impuestoTwo == 'null' || e.impuestoTwo == "") && (e.impuestoThree == null || e.impuestoThree == 'null' || e.impuestoThree == "")){
      //   nounOneAndMoreTaxs = nounTaxOne;
      // }else if((e.impuestoOne == null || e.impuestoOne == 'null' || e.impuestoOne == "") && (e.impuestoThree == null || e.impuestoThree == 'null' || e.impuestoThree == "")){
      //   nounOneAndMoreTaxs = nounTaxTwo;
      // }else{
      //   nounOneAndMoreTaxs = nounTaxOne + " / " + nounTaxTwo + " / " + nounTaxThree;
      // }

      // var longNameProd = e.name_prod;
      // var longlimitNameProd = (longNameProd.length >= 36) ? longNameProd.substring(36, 0) + '<b>...</b>' : longNameProd;

      template += `
        <tr id="item-${e.id_prod}">
          <td class='center'>${e.id_prod}</td>
          <td>${e.name_prod}</td>
          <td class='center'>${e.regulated}</td>
          <td>${nounOneAndTwoRegs}</td>
          <td>${e.montoadd}</td>
          <td>${e.ad_valoren}</td>
          <td>${e.impuesto_selectivo}</td>
          <td>${e.antidumping}</td>
          <td class="cont-btn-update">
            <a class="btn-update-product" data-toggle="modal" data-target="#updateModal"  href="#" 
              data-id="${e.id_prod}"
              data-name="${e.name_prod}"
              data-regulated="${e.regulated}"
              data-idregulator="${e.id_regulator}"
              data-idregulatortwo="${e.id_regulator_two}"
              data-regulatorone="${nounRegOne}"
              data-regulatortwo="${nounRegTwo}"
              data-amountadditional="${e.montoadd}"
              data-pricetadditional_one="${e.ad_valoren}"
              data-pricetadditional_two="${e.impuesto_selectivo}"
              data-pricetadditional_three="${e.antidumping}"
              >Editar</a>
          </td>
          <td class="cont-btn-delete" id="cont-btn-delete">
            <a class="btn-delete-product" data-toggle="modal" data-target="#deleteModal" href="#"
              data-id="${e.id_prod}"
              >Eliminar</a>
          </td>
        </tr>
        `;
      });
      
      $("#tbl_products").html(template);
    }

  });
}
/************************** MOSTRAR EL CONTENIDO DENTRO DEL FORMULARIO DE ACTUALIZAR - IMPUESTOS ADICIONALES **************************/
$(document).on("click", ".cont-modalbootstrapupdate__form--controlRadios--c--control--input[name=sel-taxornottax]", function(){
  if($(this).attr("id") == "noun-required-taxadditionalupdate"){
    $("#sel-optsTaxationAdditionalsMoreUpdate").html("");
  }else{
    $("#sel-optsTaxationAdditionalsMoreUpdate").html(`
      <div class="cont-modalbootstrapupdate__form--control">
        <label for="taxoneadditional-update" class="cont-modalbootstrapupdate__form--control__label">Ad-Valoren</label>
        <input id="taxoneadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxoneadditional-update" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxOneAdditionalProductUpdate"></span>
      </div>
      <div class="cont-modalbootstrapupdate__form--control">
        <label for="taxtwoadditional-update" class="cont-modalbootstrapupdate__form--control__label">Impuesto Selecctivo</label>
        <input id="taxtwoadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxtwoadditional-update" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxTwoAdditionalProductUpdate"></span>
      </div>
      <div class="cont-modalbootstrapupdate__form--control">
        <label for="taxthreeadditional-update" class="cont-modalbootstrapupdate__form--control__label">ANTIDUMPING</label>
        <input id="taxthreeadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxthreeadditional-update" type="number" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
        <span id="msgErrNounTaxThreeAdditionalProductUpdate"></span>
      </div>
    `);
  }
});
/************************** BUSCADOR EN TIEMPO REAL **************************/
$(document).on('keyup', '#searchproducts', function() {
  var searchVal = $(this).val();
  if(searchVal != ""){
    listProducts(searchVal);
  }else{
    listProducts();
  }
});
/************************** LISTAR DATOS EN EL MODAL - ACTUALIZAR **************************/
$(document).on('click', '.btn-update-product', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      name: $(this).attr('data-name'),
      regulated: $(this).attr('data-regulated'),
      idregulator: $(this).attr('data-idregulator'),
      idregulatortwo: $(this).attr('data-idregulatortwo'),
      regulatorone: $(this).attr('data-regulatorone'),
      regulatortwo: $(this).attr('data-regulatortwo'),
      amountadditional: $(this).attr('data-amountadditional'),
      pricetadditional_one: $(this).attr('data-pricetadditional_one'),
      pricetadditional_two: $(this).attr('data-pricetadditional_two'),
      pricetadditional_three: $(this).attr('data-pricetadditional_three')
    };

    console.log(item_data);

    /************************** VALIDAR SI EL PRODUCTO CONTIENE REGULADORES - MOSTRAR LOS CONTROLES RESPECTIVOS **************************/
    if(item_data['regulated'] == "NO"){
      $("#sel-optsRegulatorsMoreUpdate").addClass("hidden");
      $("#sel-optsRegulatorsMoreUpdate").attr("aria-expanded", true);
      $("#sel-optsRegulatorsMoreUpdate").attr("aria-visibility", "show");
      ($("#noun-required-reg").attr("checked")) ? $("#noun-required-reg").attr("checked", true) : $("#noun-required-reg").attr("checked", false);
    }else{
      $("#sel-optsRegulatorsMoreUpdate").removeClass("hidden");
      $("#sel-optsRegulatorsMoreUpdate").attr("aria-expanded", false);
      $("#sel-optsRegulatorsMoreUpdate").attr("aria-visibility", "hidden");
      ($("#required-reg").attr("checked")) ? $("#required-reg").attr("checked", true) : $("#noun-required-reg").attr("checked", false);
    }

    /************************** ASIGNAR A LOS CONTROLES DEL MODAL DE ACTUALIZAR **************************/
    $('#idupdate-product').val(item_data['id']);
    $('#name-update').val(item_data['name']);
    $('#required_regsoptupdate').val(item_data['regulated']);
    $('#SelectedItem-inputfakeselRegOneUpdate').attr("idtregularone", item_data['idregulator']);
    $('#SelectedItem-inputfakeselRegOneUpdate').attr("regularone", item_data['regulatorone']);
    $('#SelectedItem-inputfakeselRegTwoUpdate').attr("idtregulartwo", item_data['idregulatortwo']);
    $('#SelectedItem-inputfakeselRegTwoUpdate').attr("regulartwo", item_data['regulatortwo']);
    $("#selectedItem-fakeSelRegOneUpdate").text(item_data['regulatorone']);
    $("#selectedItem-fakeSelRegTwoUpdate").text(item_data['regulatortwo']);

    /************************** MOSTRAR EL CONTROL DE MONTO ADICIONAL **************************/
    if(item_data['amountadditional'] > 0 || item_data['amountadditional'] != 0.00){
      $("#sel-optsAmountAdditionalMoreUpdate").html(`
        <div class="cont-modalbootstrapupdate__form--control">
          <label for="amountadditionalProduct-update" class="cont-modalbootstrapupdate__form--control__label">Precio adicional</label>
          <input id="amountadditionalProduct-update" class="cont-modalbootstrapupdate__form--control__input" name="amountadditionalProduct-update" type="number" maxlength="300" placeholder="Ingrese el monto del producto" value="${item_data['amountadditional']}">
          <span id="msgErrNounAmountAdditionalProductUpdate"></span>
        </div>
      `);
    }else{
      $("#sel-optsAmountAdditionalMoreUpdate").html("");
    }

    /************************** MOSTRAR LOS CONTROLES DE LOS IMPUESTOS **************************/
    if((item_data['pricetadditional_one'] != 0 && item_data['pricetadditional_one'] != "" && item_data['pricetadditional_one'] != null) ||
      (item_data['pricetadditional_two'] != 0 && item_data['pricetadditional_two'] != "" && item_data['pricetadditional_two'] != null) ||
      (item_data['pricetadditional_three'] != 0 && item_data['pricetadditional_three'] != "" && item_data['pricetadditional_three'] != null)){

      $("#sel-optsTaxationAdditionalsMoreUpdate").html(`
        <div class="cont-modalbootstrapupdate__form--control">
          <label for="taxoneadditional-update" class="cont-modalbootstrapupdate__form--control__label">Ad-Valoren</label>
          <input id="taxoneadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxoneadditional-update" type="number" value="${item_data['pricetadditional_one']}" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
          <span id="msgErrNounTaxOneAdditionalProductUpdate"></span>
        </div>
        <div class="cont-modalbootstrapupdate__form--control">
          <label for="taxtwoadditional-update" class="cont-modalbootstrapupdate__form--control__label">Impuesto Selecctivo</label>
          <input id="taxtwoadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxtwoadditional-update" type="number" value="${item_data['pricetadditional_two']}" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
          <span id="msgErrNounTaxTwoAdditionalProductUpdate"></span>
        </div>
        <div class="cont-modalbootstrapupdate__form--control">
          <label for="taxthreeadditional-update" class="cont-modalbootstrapupdate__form--control__label">ANTIDUMPING</label>
          <input id="taxthreeadditional-update" class="cont-modalbootstrapupdate__form--control__input" name="taxthreeadditional-update" type="number" value="${item_data['pricetadditional_three']}" maxlength="300" placeholder="Ingrese el monto del impuesto" step="0.01">
          <span id="msgErrNounTaxThreeAdditionalProductUpdate"></span>
        </div>
      `);
    }else{
      $("#sel-optsTaxationAdditionalsMoreUpdate").html("");
    }
  });
});
/************************** MOSTRAR/OCULTAR DATOS EN EL MODAL **************************/
$(document).on("click", ".cont-modalbootstrapupdate__form--controlRadios--c--control--input[name=sel-reornotregupdate]", function(){
  if($(this).attr("id") == "noun-required-regupdate"){
    $("#sel-optsRegulatorsMoreUpdate").addClass("hidden");
    $("#sel-optsRegulatorsMoreUpdate").attr("aria-expanded", true);
    $("#sel-optsRegulatorsMoreUpdate").attr("aria-visibility", "show");
  }else{
    $("#sel-optsRegulatorsMoreUpdate").removeClass("hidden");
    $("#sel-optsRegulatorsMoreUpdate").attr("aria-expanded", false);
    $("#sel-optsRegulatorsMoreUpdate").attr("aria-visibility", "hidden");
  }
});
/************************** ABRIR/CERRAR EL LISTADO DE REGULADORES - ACTUALIZAR 1 **************************/
$(document).on("click", "#btn-FakeListRegulatorOneUpdate", function(){
  $("#c-listitems-regulatorOneUpdate").toggleClass("show");
  $(this).toggleClass("showList");
   $.ajax({
    url: "../admin/controllers/c_list_regulators.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){   
      result.forEach( (e) => {
        template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" regularone="${e.name}">${e.name}</li>`;
      });

      $("#c-listitems-regulatorOneUpdate").html(template);
    }else{
      template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se encontraron datos</li>`;

      $("#c-listitems-regulatorOneUpdate").html(template);
    }
  });
});
/************************** FIJAR EL VALOR EN EL FAKE SELECT - ACTUALIZAR 1 **************************/
$(document).on("click", "#c-listitems-regulatorOneUpdate .cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
  $("#msgErrNounReguladorOneUpdate").text("");
  $("#c-listitems-regulatorOneUpdate").removeClass("show");
  $("#btn-FakeListRegulatorOneUpdate").removeClass("showList");
  $("#selectedItem-fakeSelRegOneUpdate").text($(this).text());
  $("#SelectedItem-inputfakeselRegOneUpdate").attr("regularone", $(this).attr("regularone"));
  $("#SelectedItem-inputfakeselRegOneUpdate").attr("idtregularone", $(this).attr("id"));
});
/************************** ABRIR/CERRAR EL LISTADO DE REGULADORES - ACTUALIZAR 2 **************************/
$(document).on("click", "#btn-FakeListRegulatorTwoUpdate", function(){
  $("#c-listitems-regulatorTwoUpdate").toggleClass("show");
  $(this).toggleClass("showList");
   $.ajax({
    url: "../admin/controllers/c_list_regulators.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((res) => {
    var result = JSON.parse(res);
    var template = "";
    if(result.length > 0){
      result.forEach( (e) => {
        template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" regulartwo="${e.name}">${e.name}</li>`;
      });

      $("#c-listitems-regulatorTwoUpdate").html(template);
    }else{
      template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se encontraron datos</li>`;

      $("#c-listitems-regulatorTwoUpdate").html(template);
    }
  });
});
/************************** FIJAR EL VALOR EN EL FAKE SELECT - ACTUALIZAR 2 **************************/
$(document).on("click", "#c-listitems-regulatorTwoUpdate .cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
  $("#msgErrNounReguladorTwoUpdate").text("");
  $("#c-listitems-regulatorTwoUpdate").removeClass("show");
  $("#btn-FakeListRegulatorTwoUpdate").removeClass("showList");
  $("#selectedItem-fakeSelRegTwoUpdate").text($(this).text());
  $("#SelectedItem-inputfakeselRegTwoUpdate").attr("regulartwo", $(this).attr("regulartwo"));
  $("#SelectedItem-inputfakeselRegTwoUpdate").attr("idtregulartwo", $(this).attr("id"));
});
/************************** ABRIR/CERRAR EL LISTADO DE IMPUESTOS - ACTUALIZAR 1 **************************/
// $(document).on("click", "#btn-FakeListTaxationOneUpdate", function(){
//   $("#c-listitems-taxationOneUpdate").toggleClass("show");
//   $(this).toggleClass("showList");
//    $.ajax({
//     url: "../admin/controllers/c_list-taxation-values-by-product.php",
//     method: "POST",
//     datatype: "JSON",
//     contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
//   }).done((res) => {
//     var result = JSON.parse(res);
//     var template = "";
//     if(result.length > 0){
//       result.forEach( (e) => {
//         template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" taxationone="${e.data_name}">${e.data_name}</li>`;
//       });

//       $("#c-listitems-taxationOneUpdate").html(template);
//     }else{
//       template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se encontraron datos</li>`;

//       $("#c-listitems-taxationOneUpdate").html(template);
//     }
//   });
// });
// /************************** ABRIR/CERRAR EL LISTADO DE IMPUESTOS - ACTUALIZAR 2 **************************/
// $(document).on("click", "#btn-FakeListTaxationTwoUpdate", function(){
//   $("#c-listitems-taxationTwoUpdate").toggleClass("show");
//   $(this).toggleClass("showList");
//    $.ajax({
//     url: "../admin/controllers/c_list-taxation-values-by-product.php",
//     method: "POST",
//     datatype: "JSON",
//     contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
//   }).done((res) => {
//     var result = JSON.parse(res);
//     var template = "";
//     if(result.length > 0){
//       result.forEach( (e) => {
//         template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" taxationtwo="${e.data_name}">${e.data_name}</li>`;
//       });

//       $("#c-listitems-taxationTwoUpdate").html(template);
//     }else{
//       template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se encontraron datos</li>`;

//       $("#c-listitems-taxationTwoUpdate").html(template);
//     }
//   });
// });
// /************************** ABRIR/CERRAR EL LISTADO DE IMPUESTOS - ACTUALIZAR 3 **************************/
// $(document).on("click", "#btn-FakeListTaxationThreeUpdate", function(){
//   $("#c-listitems-taxationThreeUpdate").toggleClass("show");
//   $(this).toggleClass("showList");
//    $.ajax({
//     url: "../admin/controllers/c_list-taxation-values-by-product.php",
//     method: "POST",
//     datatype: "JSON",
//     contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
//   }).done((res) => {
//     var result = JSON.parse(res);
//     var template = "";
//     if(result.length > 0){
//       result.forEach( (e) => {
//         template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item" id="${e.id}" taxationthree="${e.data_name}">${e.data_name}</li>`;
//       });

//       $("#c-listitems-taxationThreeUpdate").html(template);
//     }else{
//       template += `<li class="cont-modalbootstrapupdate__form--controlSelect--m--item">No se encontraron datos</li>`;

//       $("#c-listitems-taxationThreeUpdate").html(template);
//     }
//   });
// });
// /************************** FIJAR EL VALOR DE IMPUESTO - ACTUALIZAR 1 **************************/
// $(document).on("click", "#c-listitems-taxationOneUpdate .cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
//   $("#msgErrNounTaxationOneUpdate").text("");
//   $("#c-listitems-taxationOneUpdate").removeClass("show");
//   $("#btn-FakeListTaxationOneUpdate").removeClass("showList");
//   $("#selectedItem-fakeSelTaxOneUpdate").text($(this).text());
//   $("#SelectedItem-inputfakeselTaxOneUpdate").attr("taxone", $(this).attr("taxationone"));
//   $("#SelectedItem-inputfakeselTaxOneUpdate").attr("idtaxationone", $(this).attr("id"));
// });
// /************************** FIJAR EL VALOR DE IMPUESTO - ACTUALIZAR 2 **************************/
// $(document).on("click", "#c-listitems-taxationTwoUpdate .cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
//   $("#msgErrNounTaxationTwoUpdate").text("");
//   $("#c-listitems-taxationTwoUpdate").removeClass("show");
//   $("#btn-FakeListTaxationTwoUpdate").removeClass("showList");
//   $("#selectedItem-fakeSelTaxTwoUpdate").text($(this).text());
//   $("#SelectedItem-inputfakeselTaxTwoUpdate").attr("taxtwo", $(this).attr("taxationtwo"));
//   $("#SelectedItem-inputfakeselTaxTwoUpdate").attr("idtaxationtwo", $(this).attr("id"));
// });
// /************************** FIJAR EL VALOR DE IMPUESTO - ACTUALIZAR 3 **************************/
// $(document).on("click", "#c-listitems-taxationThreeUpdate .cont-modalbootstrapupdate__form--controlSelect--m--item", function(){
//   $("#msgErrNounTaxationThreeUpdate").text("");
//   $("#c-listitems-taxationThreeUpdate").removeClass("show");
//   $("#btn-FakeListTaxationThreeUpdate").removeClass("showList");
//   $("#selectedItem-fakeSelTaxThreeUpdate").text($(this).text());
//   $("#SelectedItem-inputfakeselTaxThreeUpdate").attr("taxthree", $(this).attr("taxationthree"));
//   $("#SelectedItem-inputfakeselTaxThreeUpdate").attr("idtaxationthree", $(this).attr("id"));
// });
/************************** VALIDAR SI EL NOMBRE DEL PRODUCTO ESTÁ VACÍO - ACTUALIZAR **************************/
$(document).on("keyup", "#name-update", function(){
  ($(this).val() != 0 || $(this).val() != "") ? $("#msgErrNounNameProductUpdate").text("") : $("#msgErrNounNameProductUpdate").text("Debes ingresar un nombre");
});
/************************** ACTUALIZAR PRODUCTO POR ID **************************/
$(document).on('submit', '#form-update-product', function(e){
  e.preventDefault();

  ($('#name-update').val() != 0 || $('#name-update').val() != "") ? $("#msgErrNounNameProductUpdate").text("") : $("#msgErrNounNameProductUpdate").text("Debes ingresar un nombre");

  if($('#idupdate-product').val() != 0 || $('#idupdate-product').val() != ""){
    
    var formdata = new FormData();
    formdata.append("name", $('#name-update').val());
    formdata.append("regulated", $('#required_regsoptupdate').val());
    formdata.append("id_regulator", ($("#SelectedItem-inputfakeselRegOneUpdate").attr("idtregularone") || $("#SelectedItem-inputfakeselRegOneUpdate").attr("idtregularone") != null) ? $("#SelectedItem-inputfakeselRegOneUpdate").attr("idtregularone") : 0);
    formdata.append("id_regulatortwo", ($("#SelectedItem-inputfakeselRegTwoUpdate").attr("idtregulartwo") || $("#SelectedItem-inputfakeselRegTwoUpdate").attr("idtregulartwo") != null) ? $("#SelectedItem-inputfakeselRegTwoUpdate").attr("idtregulartwo") : 0);
    formdata.append("amount_additional", ($("#amountadditionalProduct-update").val() != undefined && $("#amountadditionalProduct-update").val() != 0 && $("#amountadditionalProduct-update").val() != "") ? $("#amountadditionalProduct-update").val() : 0);
    formdata.append("ad_valoren", ($("#taxoneadditional-update").val() != undefined && $("#taxoneadditional-update").val() != 0 && $("#taxoneadditional-update").val() != "") ? $("#taxoneadditional-update").val() : 0);
    formdata.append("impuesto_selectivo", ($("#taxtwoadditional-update").val() != undefined && $("#taxtwoadditional-update").val() != 0 && $("#taxtwoadditional-update").val() != "") ? $("#taxtwoadditional-update").val() : 0);
    formdata.append("antidumping", ($("#taxthreeadditional-update").val() != undefined && $("#taxthreeadditional-update").val() != 0 && $("#taxthreeadditional-update").val() != "") ? $("#taxthreeadditional-update").val() : 0);
    formdata.append("id", $('#idupdate-product').val());

    $.ajax({
      url: "../admin/controllers/c_update-product.php",
      method: "POST",
      data: formdata,
      contentType: false,
      cache: false,
      processData: false
    }).done((res) => {
      //console.log(res);
      listProducts();
      $('#updateModal').modal("hide");
    });
  }else{
    console.log('Falta rellenar los campos');
  }

});
/************************** LISTAR ID EN EL MODAL - ELIMINAR **************************/
$(document).on('click', '.btn-delete-product', function(e){
  e.preventDefault();
  var id = $(this).attr('data-id');
  $('#iddelete-product').val(id);
});
/************************** ELIMINAR PAÍS **************************/
$(document).on('click', '#btndelete-product', function(e){
  e.preventDefault();
	var id = $('#iddelete-product').val();
  $.ajax({
    url: "../admin/controllers/c_delete-product.php",
    method: "POST",
    data: {id : id},
  }).done((e) => {
    $("#item-" + id).remove();
    $('#deleteModal').modal("hide");
  });
});