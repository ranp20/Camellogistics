$(function(){
	list_typ_services();
});
/************************** MOSTRAR LOS TIPOS DE SERVICIOS PARA LA COTZACIÓN **************************/
function list_typ_services(){
	$.ajax({
    url: "controllers/list_type_services.php",
    method: "POST",
    datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }).done( function (res) {
    var response = JSON.parse(res);
    var template = "";

    if(response.length == 0){
      template = `
        <li class="c-CalculatorStep--form--contStep--cStep--m--item">
        	<span>No se econtraron resultados</span>
        </li>
      `;
      $("#cont-typeServicesOneStep").html(template);
    }else{
      $.each(response, function(i, e) {
      	var pathimgservice = "views/assets/img/"+e.photo;
      	
      	$("#cont-typeServicesOneStep").append(`
    			<li class="c-CalculatorStep--form--contStep--cStep--m--item" id="typeservice-${e.id}" item-service="${i}">
						<a href="#" id="${e.type}" class="c-CalculatorStep--form--contStep--cStep--m--link">
							<img class="img-fluid" src="${pathimgservice}" alt=""/>
						</a>
					</li>
      	`);
      });
    }
  });
}