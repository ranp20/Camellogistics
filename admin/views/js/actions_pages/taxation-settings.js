$(function(){
  listTaxationValues();
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
/************************** LISTAR LOS DATOS **************************/
function listTaxationValues(){ 
  $.ajax({
    url: "../admin/controllers/c_list-taxation-values_by_admin.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <tr>
          <td colspan="4">
            <div class="msg-non-results-res">
              <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
              <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
            </div>
          </td>
        </tr>
      `;

      $("#tbl_taxationvalues").html(template);
    }else{
      response.forEach(e => {
      
      template += `
        <tr id="item-${e.id}">
          <td>
            <div class="cont-dashCamel__cControlsList--cC--cTable--cControl">
              <label for="" class="cont-dashCamel__cControlsList--cC--cTable--cControl--label">
                <a class="btn-update-taxationvalue" href="javascript:void(0);" data-toggle="modal" data-target="#updateModal" 
                   data-id="${e.id}"
                   data-dataname="${e.data_name}"
                   data-datavalue="${e.data_value}"
                   data-datavaluetwo="${e.data_value_two}">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M90.8,99H9.2C4.7,99,1,95.3,1,90.8V9.2c0-4.5,3.7-8.2,8.2-8.2h52.3l-8.2,8.2H9.2v81.6h81.6V46.7l8.2-8.2v52.3  C99,95.3,95.3,99,90.8,99z M41.8,78.6l-20.4,0.1l0-20.5L76.7,3.3c3.1-3.1,8.2-3.1,11.3,0c0,0,0,0,0,0l8.5,8.5  c3.1,3.1,3.1,8.2,0,11.4c0,0,0,0,0,0L41.8,78.6z M29.6,70.4h12.2L29.6,58.2V70.4z M82.4,9L37.8,54.1l8.2,8.2l45-44.7L82.4,9z"/></svg>
                </a>
                <span>${e.data_name}</span>
                <span>*</span>
              </label>
              <div class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs">
                <input type="number" id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value}" step="0.01">
                <input type="number" id="" name="" placeholder="0.00" class="cont-dashCamel__cControlsList--cC--cTable--cControl--cInputs--input" value="${e.data_value_two}" step="0.01">
              </div>
            </div>
          </td>
        </tr>
        `;
      });
      
      $("#tbl_taxationvalues").html(template);
    }
  });
}
/************************** LISTAR DATOS EN EL MODAL - ACTUALIZAR **************************/
$(document).on('click', '.btn-update-taxationvalue', function(e){
  e.preventDefault();
  $.each($(this), function(i, v){
    var item_data = {
      id: $(this).attr('data-id'),
      data_name: $(this).attr('data-dataname'),
      data_value: $(this).attr('data-datavalue'),
      data_valuetwo: $(this).attr('data-datavaluetwo')
    };
    $('#idupdate-taxation').val(item_data['id']);
    $('#dataname-update').val(item_data['data_name']);
    $('#datavalue-update').val(item_data['data_value']);
    $('#datavaluetwo-update').val(item_data['data_valuetwo']);
  });
});
/************************** ACTUALIZAR RESTAURANTE POR ID **************************/
$(document).on('click', '#btnupdate-taxation', function(e){
  e.preventDefault();
  
  var formdata = new FormData();
  formdata.append("data_name", $('#dataname-update').val());
  formdata.append("data_value", $('#datavalue-update').val());
  formdata.append("data_valuetwo", $('#datavaluetwo-update').val());
  formdata.append("id", $('#idupdate-taxation').val());

  $.ajax({
    url: "../admin/controllers/c_update-taxation-values.php",
    method: "POST",
    data: formdata,
    contentType: false,
    cache: false,
    processData: false
  }).done((res) => {
    if(res == "true"){
      listTaxationValues();
      $('#updateModal').modal("hide");
    }else{
      console.log('Lo sentimos, ocurrió un error al actualizar el precio');
    }
  });
});