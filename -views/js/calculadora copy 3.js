var x = $(document);
x.ready(inicializar);

function inicializar() {
    $("body").on('click','#transporte_maritimo',show_transporte_maritimo);
    $("body").on('click','#transporte_aereo',show_transporte_aereo);
    $("body").on('change','#txtnum_1',show_txtnum_1);
    $("body").on('change','#txtnum_2',show_txtnum_2);
    $("body").on('change','#txtnum_3',show_txtnum_3);
    $("body").on('change','#txtnum_4',show_txtnum_4);
    $("body").on('click','#transporte_maritimo',show_fase_2);
    $("body").on('click','#estimar',show_estimar_contenedor); 
    $("body").on('change','#tip_contenedor',show_tipo_contenedor);
    $("body").on('click','#opc_si_servicio',show_servicios_contenedor);


    $("#puertos_orig").on('change', function () {
        $("#puertos_orig option:selected").each(function () {
            var puerto_origen_id = $(this).val();
            $.post("views/modules/puertoDest.php", { puerto_origen_id: puerto_origen_id }, function(data) {
                $("#puertos_dest").html(data);
            });			
        });
        $('#cont_1').html(' ');
        $('#cont_2').html(' ');
        $('#cont_3').html(' ');
        $('#cont_3').html(' ');
     });

     $("#puertos_dest").on('change', function () {
    
        $("#puertos_dest option:selected").each(function () {
            var puerto_destino_id = $(this).val()
            let puerto_origen_id = $("#puertos_orig").val();
            let vigencia_desde = $("#vigencia_desde").val();
            let vigencia_hasta = $("#vigencia_hasta").val();

            $.post("views/modules/contPuert.php", {puerto_origen_id: puerto_origen_id,puerto_destino_id:puerto_destino_id }, function(data) {
                $(".rell_spi").html(data);
            });		
            $('#cont_1').html(' ');
            $('#cont_2').html(' ');
            $('#cont_3').html(' ');
            $('#cont_4').html(' ');	
        });
     });

     $('#frm_cotizacion').submit(function(e){
        console.log('submit');
        var elem=$(this);
        console.log(elem);
        var url=elem.attr('action');
        var boton_submit=elem.find("input[type='submit']");
        data = new FormData($(this)[0]);
        $.ajax( {
          url: url,
          type: 'POST',
          dataType: "json",
          data: data,
          processData: false,
          contentType: false
        })
        .fail(function(){
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        })
        .done(function(data) {
          console.log("success");

            $('#next_maritimo').css({'display':'none'});
            $('#tit_el_op').css({'display':'block'});
            /**
             * aparece el cuadro de servicios para contenedor completo
             */

            $('#boton_serv').html(`
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <div class="portfolio-caption">				
                        <div id="marc_si_serv">
                            <div id="opc_si_servicio" rel_user_cotizacion="${data[0].user_cotizacion_id}">
                                OPCION 1<br>
                                AGREGAR SERVICIOS
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <div class="portfolio-caption">
                        <div id="marc_no_serv">	
                            <div id="opc_no_servicio" rel_usr_cot="${data[0].user_cotizacion_id}">
                                OPCION 2<br>
                                NO AGREGAR SERVICIOS
                            </div>										
                        </div>
                    </div>
                </div>
            </div>
            `);
            /**
             * fin del cuadro de servicios y se mantiene oculto
             */
  
        });
        e.preventDefault(); 
        return false;
      });
  
  
      
  
  
  
  
  









}	
 
function show_transporte_maritimo(){
    console.log("show_transporte_maritimo");
    $('#text_tipo_flete').val('');
    $('#text_tipo_flete').val('Transporte Maritimo');
    $('#fase_time_line').css({'display':'block'});
}
function show_transporte_aereo(){
    console.log("show_transporte_aereo");
    $('#text_tipo_flete').val('');
    $('#text_tipo_flete').val('Transporte Aereo');
}
function show_txtnum_1(){
    console.log("show_txtnum_1");
    $("#next_maritimo").css({'display':'none'});
    if($("#txtnum_1").val()==0){
			$('#cont_1').html(' ');
		}else{
			$('#cont_1').html($('#txtnum_1').val()+' * '+'20 Std' );
		}
}
function show_txtnum_2(){
    console.log($('#txtnum_2').val());
    $("#next_maritimo").css({'display':'none'});
    if($("#txtnum_2").val()==0){
		$('#cont_2').html(' ');
	}else{
      $('#cont_2').html($('#txtnum_2').val()+' * '+'40 Std ,' );
		}
}
function show_txtnum_3(){
    console.log($('#txtnum_3').val());
    $("#next_maritimo").css({'display':'none'});
    if($("#txtnum_3").val()==0){
      $('#cont_3').html(' ');
    }else{
      $('#cont_3').html($('#txtnum_3').val()+' * '+'40 HC ,' );
    }
}
function show_txtnum_4(){
    console.log($('#txtnum_4').val());
    $("#next_maritimo").css({'display':'none'});
    if($("#txtnum_4").val()==0){
      $('#cont_4').html(' ');
    }else{
      $('#cont_4').html($('#txtnum_4').val()+' * '+'40 NOR ' );
    }	
}
function show_fase_2(){
    $('#fase1').css({'display':'none'});
    $('#fase2').css({'display':'block'});


}
function show_estimar_contenedor(){
    console.log("show_estimar_contenedor");
    
    $('#next_maritimo').css({'display':'block'});

    if(n1==null || n1=="") n1 == 0;
    if(n2==null || n2=="") n2 == 0;

    if(n3==null || n3=="") n3 == 0;
    if(n4==null || n4=="") n4 == 0;

    if(n5==null || n5=="") n5 == 0;
    if(n6==null || n6=="") n6 == 0;

    if(n7==null || n7=="") n7 == 0;
    if(n8==null || n8=="") n8 == 0;

    if(rc1==null || rc1=="") rc1 == 0;
    if(rc2==null || rc2=="") rc2 == 0;

    if(rc3==null || rc3=="") rc3 == 0;
    if(rc4==null || rc4=="") rc4 == 0;
  
    //var n1= $('input[name=txtnum_1]').val()
    //var n2= $('input[name=txtnumc_1]').val();
    var n1= $('#txtnum_1').val()
    var n2= $('input[name=txtnumc_1]').val();
    var rc1=(n1*n2)
    var rc1=!isNaN(rc1) ? rc1 : 0;

    //var n3= $('input[name=txtnum_2]').val()
    var n3= $('#txtnum_2').val()
    var n4= $('input[name=txtnumc_2]').val();
    var rc2=(n3*n4);
    var rc2=!isNaN(rc2) ? rc2 : 0;

    //var n5= $('input[name=txtnum_3]').val()
    var n5= $('#txtnum_3').val()
    var n6= $('input[name=txtnumc_3]').val();
    var rc3=(n5*n6);
    var rc3=!isNaN( rc3 ) ? rc3 : 0;

    //var n7= $('input[name=txtnum_4]').val()
    var n7= $('#txtnum_4').val()
    var n8= $('input[name=txtnumc_4]').val();
    var rc4=(n7*n8);
    var rc4=!isNaN( rc4 ) ? rc4 : 0;

    var tot=rc1+rc2+rc3+rc4;
    
    $('#detail_cont_selc1t').html(new Intl.NumberFormat("de-DE").format(tot)+',<sup>00</sup> USD');
    $('#tot_pre_cont').val(tot);
    $('#list_cont_completo').css({'display':'none'});
    
}
function show_tipo_contenedor() {
	if ($('#tip_contenedor').val() == "con_completo") {
		console.log("contenedor completo");
		detail_contenedor
		$('#list_cont_completo').css({'display':'block'});
		$('#detail_contenedor').css({'display':'block'});
        $('#next_maritimo').css({'display':'none'});
		$('#list_cont_compartido').css({'display':'none'});
        //$('#detail_contenedor').css({'margin':'-185px 0px 0px 0px'});
	}
	if ($('#tip_contenedor').val() == "con_compartido") {
		console.log("contenedor compartido");
		$('#list_cont_compartido').css({'display':'block'});
		$('#detail_contenedor').css({'display':'none'});
		$('#list_cont_completo').css({'display':'none'});
	}

	
}
function show_servicios_contenedor(){
    console.log('show_servicios_contenedor');    
    $('#img_icon_serv_extra').css({'background':'url(views/assets/img/linea_tiempo/ico-11.png)','background-size':'100%'});
    $('#fase2').css({'display':'none'});
    $('#tit_el_op').css({'display':'none'});
    $('#boton_serv').css({'display':'none'});
    var user_id=$(this)
    var codigo_id=user_id.attr('rel_user_cotizacion');
    console.log(codigo_id);

    $.ajax( {
        url: "views/modules/act_data_contanier.php",
        type: 'POST',
        dataType: "json",
        data: {user_cotizacion_id:codigo_id},

    }).done(function(data) {
       console.log("success");
        if(data!=null){
            //$('#marc_det_flete').css({'display':'block'})
            $('#fase3').html(`
            <h6>Resumen de Rutas</h6>
            <div id="dt_flete">${data[0].tipo_flete}
            </div>
            <div id="dt_rutas">
                <div id="dt_origen">
                ${data[0].puerto_origen}
                </div>
                <div id="dt_destino">
                ${data[0].puerto_destino}
                </div>
            </div>
            <div id="dt_container">
            </div>
                <input type="hidden" name="user_id_text" id="user_id_text" value="${data[0].user_cotizacion_id}">
            `);
        }

        if (data!==null){
            $.each(data,function(key,val){
              console.log("jharol"+val.contenedor_tipo);
              $("#dt_container").append(val.cantidad_contenedores+"*"+val.contenedor_tipo+",");
            })
        }


        
    }).fail(function(){
        console.log("error");
    }).always(function() {
        console.log("complete");
    
    }); 
   

}