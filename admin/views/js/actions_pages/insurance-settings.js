$(() => {
  listInsuranceValues();
  listInsuranceValues_aduanas();
  listMerchandiseValues();
});
// ------------ LIMITAR A DOS DECIMALES CUALQUIER INPUT DE TIPO NÚMERO EN DONDE ESTÁ IMPORTADO ESTE ARCHIVO
$(document).on("input","input[data-valformat='twodecimal']",function(e){
	let val = e.target.value;
  let t = val.toString();
  let regex = /(\d*.\d{0,2})/;
  let vl_twoformat = t.match(regex)[0];
  $(this).val(vl_twoformat);
});
// ------------ FORMATO - SEPARADOR DE MILLAR Y PUNTO DECIMAL
$(document).on("keyup", "input[data-valformat=withcomedecimal]", function(e){
  let val = e.target.value;
  let val_formatNumber = val.toString().replace(/[^\d.]/g, "").replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3').replace(/\.(\d{2})\d+/, '.$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  $(this).val(val_formatNumber);
});
// ------------ LISTAR LOS SEGUROS DE TRANSPORTE MARÍTIMO Y AÉREO
function listInsuranceValues(){ 
  $.ajax({
    url: "../admin/controllers/c_list-insurance-values.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    if(e != ""){
      let r = JSON.parse(e);
      let template = "";
      if(r.length == 0){
        template = `<tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_insurancevalues").html(template);
      }else{
        $.ajax({
          url: "../admin/controllers/c_list-merchandise-values.php",
          method: "POST",
          datatype: "JSON",
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        }).done((m) => {
          if(m != ""){
            let rmerchandise = JSON.parse(m);
            let valFOBmerchandise = rmerchandise[0].data_value;

            $.each(r, function(i,e){
              let namevalueins = "";
              if(i == 0){
                namevalueins = "Menor a "+valFOBmerchandise+" (FOB)";
              }else if(i == 1){
                namevalueins = "Mayor a "+valFOBmerchandise+" (FOB)";
              }else if(i == 2){
                namevalueins = e.data_name;
              }else{
                namevalueins = e.data_name;
              }
            template += `
              <tr id="item-${e.id}">
                <td>
                  <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                    <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                      <a class="btn-update-insurancevalues" href="javascript:void(0);" data-toggle="modal" data-target="#updateModalInsurance" 
                         data-id="${e.id}"
                         data-dataname="${namevalueins}"
                         data-datavalue="${e.data_value}">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                      </a>
                      <span>${namevalueins}</span>
                      <span>*</span>
                    </label>
                    <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs">
                      <input type="text" data-valformat='twodecimal' id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value}" step="0.01">
                    </div>
                  </div>
                </td>
              </tr>`;
            });      
            $("#tbl_insurancevalues").html(template);
          }else{
            console.log('Lo sentimos, hubo un error al procesar la información.');
          }
        });
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}
// ------------ LISTAR LOS SEGUROS DE ADUANAS
function listInsuranceValues_aduanas(){
  $.ajax({
    url: "../admin/controllers/c_list-insurance-values-aduanas.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    if(e != ""){
      let r = JSON.parse(e);
      let template = "";
      if(r.length == 0){
        template = `<tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_insurancevaluesaduanas").html(template);
      }else{
        $.each(r, function(i,e){
        template += `
          <tr id="item-${e.id}">
            <td>
              <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                  <a class="btn-update-insurancevalues-aduanas" href="javascript:void(0);" data-toggle="modal" data-target="#updateModalAduanas" 
                     data-id="${e.id}"
                     data-dataname="${e.data_name}"
                     data-datavalue="${e.data_value}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                  </a>
                  <span>${e.data_name}</span>
                  <span>*</span>
                </label>
                <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs">
                  <input type="text" data-valformat='twodecimal' id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value}" step="0.01">
                </div>
              </div>
            </td>
          </tr>`;
        });      
        $("#tbl_insurancevaluesaduanas").html(template);
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}
// ------------ LISTAR DATOS EN EL MODAL - ACTUALIZAR
$(document).on('click', '.btn-update-insurancevalues', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue')
    };
    $('#idupdate-insurancevalues').val(item_data['id']);
    $('#dataname-update').val(item_data['data_name']);
    $('#datavalue-update').val(item_data['data_value']);
    $("#update-modal-label").text(item_data['data_name']);
  });
});
// ------------ ACTUALIZAR SEGURO POR ID
$(document).on('submit', '#form-update-insurancevalues', function(e){
  e.preventDefault();
  var formdata = new FormData();
  formdata.append("data_name", $('#dataname-update').val());
  formdata.append("data_value", $('#datavalue-update').val());
  formdata.append("id", $('#idupdate-insurancevalues').val());
  $.ajax({
    url: "../admin/controllers/c_update-insurance-values.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e != ""){
      if(e == "true"){
        listInsuranceValues();
        $('#updateModalInsurance').modal("hide");
        Swal.fire({
          title: 'Actualizado!',
          html: `<span class='font-w-300'>Se ha actualizado el valor.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }else{
        Swal.fire({
          title: 'Atención!',
          html: `<span class='font-w-300'>Hubo un error y/o los datos son los mismos.</span>`,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
});
// ------------ LISTAR DATOS EN EL MODAL - ACTUALIZAR - ADUANAS
$(document).on('click', '.btn-update-insurancevalues-aduanas', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue')
    };
    $('#idupdate-insurancevalues-aduanas').val(item_data['id']);
    $('#dataname-update-aduanas').val(item_data['data_name']);
    $('#datavalue-update-aduanas').val(item_data['data_value']);
    $("#update-modal-label-aduanas").text(item_data['data_name']+" - ADUANAS");
  });
});
// ------------ ACTUALIZAR SEGURO ADUANAS POR ID - ADUANAS
$(document).on('submit', '#form-update-insurancevalues-aduanas', function(e){
  e.preventDefault();
  var formdata = new FormData();
  formdata.append("data_name", $('#dataname-update-aduanas').val());
  formdata.append("data_value", $('#datavalue-update-aduanas').val());
  formdata.append("id", $('#idupdate-insurancevalues-aduanas').val());
  $.ajax({
    url: "../admin/controllers/c_update-insurance-values-aduanas.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e != ""){
      if(e == "true"){
        listInsuranceValues_aduanas();
        $('#updateModalAduanas').modal("hide");
        Swal.fire({
          title: 'Actualizado!',
          html: `<span class='font-w-300'>Se ha actualizado el valor.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }else{
        Swal.fire({
          title: 'Atención!',
          html: `<span class='font-w-300'>Hubo un error y/o los datos son los mismos.</span>`,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
});
// ------------ LISTAR LOS SEGUROS DE TRANSPORTE MARÍTIMO Y AÉREO
function listMerchandiseValues(){ 
  $.ajax({
    url: "../admin/controllers/c_list-merchandise-values.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    if(e != ""){
      let r = JSON.parse(e);
      let template = "";
      if(r.length == 0){
        template = `<tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_merchandisevalues").html(template);
      }else{
        $.each(r, function(i,e){
          let merchandisePrice = e.data_value;
          let v_formatPrice = merchandisePrice.toString().replace(/[^\d.]/g, "").replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3').replace(/\.(\d{2})\d+/, '.$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        template += `
          <tr id="item-${e.id}">
            <td>
              <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                  <a class="btn-update-merchandisevalues" href="javascript:void(0);" data-toggle="modal" data-target="#updateModalMerchandise" 
                     data-id="${e.id}"
                     data-dataname="${e.data_name}"
                     data-datavalue="${v_formatPrice}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                  </a>
                  <span>${e.data_name}</span>
                  <span>*</span>
                </label>
                <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs">
                  <input type="text" data-valformat="withcomedecimal" id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${v_formatPrice}" step="0.01">
                </div>
              </div>
            </td>
          </tr>`;
        });      
        $("#tbl_merchandisevalues").html(template);
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}
// ------------ LISTAR DATOS EN EL MODAL - ACTUALIZAR
$(document).on('click', '.btn-update-merchandisevalues', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue')
    };
    $('#idupdate-merchandisevalues').val(item_data['id']);
    $('#datanamemerchandise-update').val(item_data['data_name']);
    $('#datavaluemerchandise-update').val(item_data['data_value']);
  });
});
// ------------ ACTUALIZAR MERCANCÍA POR ID
$(document).on('submit', '#form-update-merchandisevalues', function(e){
  e.preventDefault();
  let val_input = $('#datavaluemerchandise-update').val();
  let formatWithoutComa = val_input.replace(/\,/g, '');
  var formdata = new FormData();
  formdata.append("data_name", $('#datanamemerchandise-update').val());
  formdata.append("data_value", formatWithoutComa);
  formdata.append("id", $('#idupdate-merchandisevalues').val());
  $.ajax({
    url: "../admin/controllers/c_update-merchandise-values.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e != ""){
      if(e == "true"){
        listMerchandiseValues();
        listInsuranceValues();
        $('#updateModalMerchandise').modal("hide");
        Swal.fire({
          title: 'Actualizado!',
          html: `<span class='font-w-300'>Se ha actualizado el valor.</span>`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }else{
        Swal.fire({
          title: 'Atención!',
          html: `<span class='font-w-300'>Hubo un error y/o los datos son los mismos.</span>`,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
});