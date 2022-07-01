$(() => {
  list_comagencia();
  list_certiconform();
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
function list_comagencia(){ 
  $.ajax({
    url: "../admin/controllers/c_list-other-values-com-agencia.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    if(e != ""){
      let r = JSON.parse(e);
      let tmp = "";
      if(r.length == 0){
        tmp = `<tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_othervalues_com_agencia").html(tmp);
      }else{
        $.each(r,function(i,e){
          let tmp_format = "";
          let tmp_dataformatinput = "";
          let tmp_asigdata = e.data_value;
          let tmp_formatdata = tmp_asigdata.toString().replace(/[^\d.]/g, "").replace(/^(\d*\.)(.*)\.(.*)$/, '$1$2$3').replace(/\.(\d{2})\d+/, '.$1').replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
          if(e.id == 1){
            tmp_dataformatinput = "withcomedecimal";
            tmp_format += `
              <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                  <a class="btn-update-comagencia" href="javascript:void(0);" data-toggle="modal" data-target="#updateModal" 
                     data-id="${e.id}"
                     data-dataname="${e.data_name}"
                     data-datavalue="${tmp_formatdata}"
                     data-dataformat="${tmp_dataformatinput}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                  </a>
                  <span>${e.data_name}</span>
                  <span>*</span>
                </label>
                <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs mx-longlabel">
                  <input type="text" data-valformat='withcomedecimal' id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${tmp_formatdata}" step="0.01">
                </div>
              </div>
            `;
          }else{
            tmp_dataformatinput = "twodecimal";
            tmp_format += `
              <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                  <a class="btn-update-comagencia" href="javascript:void(0);" data-toggle="modal" data-target="#updateModal" 
                     data-id="${e.id}"
                     data-dataname="${e.data_name}"
                     data-datavalue="${e.data_value}"
                     data-dataformat="${tmp_dataformatinput}">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                  </a>
                  <span>${e.data_name}</span>
                  <span>*</span>
                </label>
                <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs mx-longlabel">
                  <input type="text" data-valformat='twodecimal' id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value}" step="0.01">
                </div>
              </div>
            `;
          }
          tmp += `
          <tr id="item-${e.id}">
            <td>${tmp_format}</td>
          </tr>`;
        });
        $("#tbl_othervalues_com_agencia").html(tmp);
      }
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}
// ------------ LISTAR LOS SEGUROS DE ADUANAS
function list_certiconform(){
  $.ajax({
    url: "../admin/controllers/c_list-other-values-cert-conform.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done((e) => {
    if(e != ""){
      let r = JSON.parse(e);
      let tmp = "";
      if(r.length == 0){
        tmp = `<tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>`;
        $("#tbl_othervalues_cert_conform").html(tmp);
      }else{
        $.each(r, function(i,e){
          let tmp_dataformatinput = "";
          tmp_dataformatinput = "withcomedecimal";
          tmp += `
            <tr id="item-${e.id}">
              <td>
                <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
                  <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                    <a class="btn-update-certconform" href="javascript:void(0);" data-toggle="modal" data-target="#updateModalAduanas" 
                       data-id="${e.id}"
                       data-dataname="${e.data_name}"
                       data-datavalue="${e.data_value}"
                       data-dataformat="${tmp_dataformatinput}">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                    </a>
                    <span>${e.data_name}</span>
                    <span>*</span>
                  </label>
                  <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs mx-longlabel">
                    <input type="text" data-valformat='withcomedecimal' id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value}" step="0.01">
                  </div>
                </div>
              </td>
            </tr>`;
        });      
        $("#tbl_othervalues_cert_conform").html(tmp);
      }
      
    }else{
      console.log('Lo sentimos, hubo un error al procesar la información.');
    }
  });
}
// ------------ LISTAR DATOS EN EL MODAL - ACTUALIZAR
$(document).on('click', '.btn-update-comagencia', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue'),
      data_format: $(this).attr('data-dataformat')
    };
    $('#idupdate-comagencia').val(item_data['id']);
    $('#dataname-update').val(item_data['data_name']);
    $("#dcont-update").html(`
      <label for="datavalue-update" class="cont-modalbootstrapupdate__form--control__label complete">${item_data['data_name']}</label>
      <input id="datavalue-update" class="cont-modalbootstrapupdate__form--control__input" name="datavalue-update" type="text" data-valformat='${item_data['data_format']}' maxlength="300" placeholder="Ingrese el precio" value="${item_data['data_value']}">
    `);
  });
});
// ------------ ACTUALIZAR RESTAURANTE POR ID
$(document).on('submit', '#form-update-comagencia', function(e){
  e.preventDefault();
  var formdata = new FormData();
  formdata.append("data_name", $('#dataname-update').val());
  formdata.append("data_value", $('#datavalue-update').val().replace(/,/g, ""));
  formdata.append("id", $('#idupdate-comagencia').val());
  $.ajax({
    url: "../admin/controllers/c_update-comagencia-values.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e != ""){
      if(e == "true"){
        list_comagencia();
        $('#updateModal').modal("hide");
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
$(document).on('click', '.btn-update-certconform', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue'),
      data_format: $(this).attr('data-dataformat')
    };
    $('#idupdate-certconform').val(item_data['id']);
    $('#dataname-update-certconform').val(item_data['data_name']);
    $('#datavalue-update-certconform').val(item_data['data_value']);
    $("#dcont-update-certconform").html(`
      <label for="datavalue-update-certconform" class="cont-modalbootstrapupdate__form--control__label complete">${item_data['data_name']}</label>
      <input id="datavalue-update-certconform" class="cont-modalbootstrapupdate__form--control__input" name="datavalue-update-certconform" type="text" data-valformat='${item_data['data_format']}' maxlength="300" placeholder="Ingrese el precio" value="${item_data['data_value']}">
    `);
  });
});
// ------------ ACTUALIZAR RESTAURANTE POR ID - ADUANAS
$(document).on('submit', '#form-update-certconform', function(e){
  e.preventDefault();
  var formdata = new FormData();
  formdata.append("data_name", $('#dataname-update-certconform').val());
  formdata.append("data_value", $('#datavalue-update-certconform').val().replace(/,/g, ""));
  formdata.append("id", $('#idupdate-certconform').val());
  $.ajax({
    url: "../admin/controllers/c_update-certconform.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((e) => {
    if(e != ""){
      if(e == "true"){
        list_certiconform();
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