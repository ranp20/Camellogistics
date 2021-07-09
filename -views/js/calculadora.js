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
    $("body").on('change','#gast_portuario_aduana',gast_portuario_aduana);
    $("body").on('change','#perm_aduana',perm_aduana);
    $("body").on('change','#gast_trans_dom',gast_trans_dom);
    $("body").on('change','#gast_seg_merc',gast_seg_merc);
    $("body").on('click','#calc_cotiz_con_serv',validar_check_vacios);
    $("body").on('click','.cerrar_float',cerrar_flotante);
    $("body").on('click','#add-lcl-btn',add_flete_lcl);
    $("body").on('click','#opc_si_servicio_lcl',show_servicios_lcl);
    $("body").on('click','#calc_cotiz_con_serv_lcl',validar_check_vacios_lcl);
    

    $("#tip_contenedor").on('change', function () {
        console.log("cambio_tipo_carga");
        if($('#tip_contenedor').val() == "con_compartido") {
            var con_compartido = 'con_compartido';
            $.post("views/modules/puertoOrigenLcl.php", { con_compartido: con_compartido }, function(data) {
                $("#puertos_orig").html(data);
            });
        }else if($('#tip_contenedor').val() == "con_completo") {
            var con_completo = 'con_completo';
            $.post("views/modules/puertoOrigenFcl.php", { con_completo: con_completo }, function(data) {
                $("#puertos_orig").html(data);
            });
            
        }    
    });
    
   

    

    $("#puertos_orig").on('change', function () {    
            var puerto_origen_id = $(this).val();
            $.post("views/modules/puertoDest.php", { puerto_origen_id: puerto_origen_id }, function(data) {
                $("#puertos_dest").html(data);
            });			
     });

     
     $("#puertos_dest, #puertos_orig, #tip_contenedor").on('change', function () {

            var puerto_destino_id = $('#puertos_dest').val()
            let puerto_origen_id = $("#puertos_orig").val();
            let tip_contenedor = $("#tip_contenedor").val()
            let vigencia_desde = Date.now;
            //console.log( vigencia_desde )
            let vigencia_hasta = $("#vigencia_hasta").val();

            if( puerto_destino_id != '' && puerto_origen_id != '' && tip_contenedor != '' ){
                if( tip_contenedor === 'con_completo'){
                    cargar_fcl(puerto_origen_id, puerto_destino_id)
                    $('#estimar').css({'display':'block'});
                }else if( tip_contenedor === 'con_compartido' ){
                    cargar_lcl(puerto_origen_id, puerto_destino_id)
                    
                }
                console.log('ok')
            }else{
                $('#estimar').css({'display':'none'});
            }
     });
     

     


function cargar_fcl (puerto_origen_id, puerto_destino_id){
    $.post("views/modules/contPuert.php", {puerto_origen_id: puerto_origen_id,puerto_destino_id:puerto_destino_id }, function(data) {
        $(".rell_spi").html(data);
    });	
}

function cargar_lcl (puerto_origen_id, puerto_destino_id){
    $("#list_cont_completo").css({'display':'block'})
    $.post("views/modules/lcl_form.php", {puerto_origen_id: puerto_origen_id,puerto_destino_id:puerto_destino_id }, function(data) {
        $(".rell_spi").html(data);
    });	
}
     $('#frm_cotizacion').submit(function(e){
        console.log('submit');
        var elem=$(this);
        console.log(elem);
        var url=elem.attr('action');
        var boton_submit=elem.find("input[type='submit']");
        data = new FormData($(this)[0]);
        console.log(data)
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
		//detail_contenedor
		$('#list_cont_completo').css({'display':'block'});
		$('#detail_contenedor').css({'display':'block'});
        $('#next_maritimo').css({'display':'none'});
		$('#list_cont_compartido').css({'display':'block'});
        //$('#estimar').css({'display':'block'});
        //$('#detail_contenedor').css({'margin':'-185px 0px 0px 0px'});
	}
	if ($('#tip_contenedor').val() == "con_compartido") {
		console.log("contenedor compartido");
		$('#list_cont_compartido').css({'display':'block'});
		$('#detail_contenedor').css({'display':'none'});
		$('#list_cont_completo').css({'display':'block'});
        $('#estimar').css({'display':'none'});
	}

	
}
function show_servicios_contenedor(){
    console.log('show_servicios_contenedor');    
    $('#img_icon_serv_extra').css({'background':'url(views/assets/img/linea_tiempo/ico-11.png)','background-size':'100%'});
    $('#fase2').css({'display':'none'});
    $('#tit_el_op').css({'display':'none'});
    $('#boton_serv').css({'display':'none'});
    var user_id=$(this )
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
            
            $('#fase3').html(`
            <div class="row">
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">

                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <div class="text-center">
                            <!-- detalle de rutas -->
                            <div id="marc_det_flete">
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
                            </div>	
                                <!-- Fin detalle de rutas -->						
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">									
                    </div>
                </div>
            </div>    
             `);
        }
        if(data!=null){
            $('#fase31').html(`
                <div class="row">
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">

                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <div class="text-center">
                                <!-- Con servicios -->
                                <div id="si_servicios">
                                    <div id="marc_serv_flete">
                                        <div class="fill_serv">
                                            <div class="text-center">
                                                <h3 class="section-subheading text-muted">
                                                    PASO 3. Agrega Servicios Adicionales
                                                </h3>	
                                            </div>
                                        </div>
                                        <div class="fill_serv">
                                            <div class="mc_check">
                                                <input type="checkbox" name="gast_portuario_aduana" id="gast_portuario_aduana" value="1">
                                            </div>
                                            <div class="mc_des_check">
                                                Gastos portuarios y de Almacenamiento Aduanero
                                            </div>
                                        </div>
                                        <div class="fill_serv">
                                            <div class="mc_check">
                                                <input type="checkbox" id="perm_aduana" name="perm_aduana" value="2">
                                            </div>
                                            <div class="mc_des_check">
                                                Cálculo de impuestos y permisos de aduana
                                            </div>
                                        </div>							
                                        <div id="marc_permisos_aduana">
                                            <div class="fill_serv">
                                                <div class="item_per_tit">	
                                                    Tu Producto NO APARECE elegir CARGA GENERAL.
                                                </div>    
                                            </div>
                                            <div class="fill_serv">
                                                <div class="selector_productos">
                                                    <select id="producto_id" name="producto_id">
                                                        
                                                    </select>
                                                </div>
                                            </div>		
                                            <div class="fill_serv">
                                            </div>
                                            <div class="fill_serv">
                                                <input type="number" name="txt_pre_carga" id="txt_pre_carga">
                                            </div>
                                            <div class="fill_serv">
                                                <div class="item_per_tit">
                                                    ¿Ha realizado importaciones previamente ?
                                                </div>   
                                            </div>
                                            <div class="fill_serv">
                                                <select id="importacion_estado" name="importacion_estado">
                                                    <option value="NO">NO</option>
                                                    <option value="SI">SI</option>
                                                </select>
                                            </div>
                                        </div>    
                                        <div class="fill_serv">
                                            <div class="mc_check">
                                                <input type="checkbox" id="gast_trans_dom" name="gast_trans_dom" value="3">
                                            </div>
                                            <div class="mc_des_check">
                                                Transporte a domicilio
                                            </div>
                                        </div>
                                        <div id="marc_trans_domicilio">	
                                            <div class="fill_serv">
                                                <select id="trans_origen" name="trans_origen">
                                                    <option value="">Seleccione Destino</option>
                                                    <option value="1">Lima</option>
                                                </select>
                                                <select id="trans_destino" name="trans_destino"> 
                                                    <option value="">Seleccione Destino</option>
                                                    <option value="2">Barranco</option>
                                                    <option value="3">Ate Vitarte</option>
                                                </select>
                                            </div>
                                        </div>    
                                        <div class="fill_serv">
                                            <div class="mc_check">
                                                <input type="checkbox" id="gast_seg_merc" name="gast_seg_merc" value="4">
                                            </div>
                                            <div class="mc_des_check">
                                                Seguro de mercancia
                                            </div>
                                            <div id="">
                                            </div>
                                        </div>
                                        <div class="fill_serv">
                                            <div id="valor_prod_hidden">
                                                <input type="number" id="text_valmrc" name="text_valmrc" value="">
                                                <div class="fill_serv">
                                                    <!--<div class="item_per_tit" id="tit_seg_val">
                                                        Ingresar valor exacto, SIN DECIMALES
                                                    </div>    -->
                                                </div>    
                                            </div>
                                        </div>
                                        <center>
                                            <div id="calc_cotiz_con_serv" class="button" rel_cotizacion="${data[0].user_cotizacion_id}">Calcular Cotización</div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                                <!-- Fin de los servicios -->
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">									
                        </div>
                    </div>
                </div>
            `);
        }
        
        if(data!=null){
            $(document).ready(function() {
                $.ajax({
                        type: "POST",
                        url: "views/modules/getTipoProd.php",
                        success: function(response)
                        {
                            $('.selector_productos select').html(response).fadeIn();
                        }
                });

            });
        }            
        if(data!=null){
            $('#cadena_logistica').html(`
            <div class="row">
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">
                                
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <div id="leye_cadena_logis">
                            <div id="marc_ley">
                                <center>
                                <div class="text_ley">Cadena Logistica</div>
                                </center>
                            </div>
                        </div>
                        <div id="marc_cadena_logis">
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_1"></div>
                                <div id="linea_1">
                                </div>
                                <div id="text_ico_1">
                                    FABRICA PROVEEDOR
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_2"></div>
                                <div id="linea_2"></div>
                                <div id="text_ico_2">
                                    TRANSPORTE EN ORIGEN
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_3"></div>
                                <div id="linea_3"></div>
                                <div id="text_ico_3">
                                    ADUANA EN ORIGEN
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_4"></div>
                                <div id="linea_4"></div>
                                <div id="text_ico_4">
                                    PUERTO EN ORIGEN
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_5"></div>
                                <div id="linea_5"></div>
                                <div id="text_ico_5">
                                    FLETE MARITÍMO
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_6"></div>
                                <div id="linea_6"></div>
                                <div id="text_ico_6">
                                    PTO Y ALM DEST
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_7"></div>
                                <div id="linea_7"></div>
                                <div id="text_ico_7">
                                    ADUANA DESTIDO
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_8"></div>
                                <div id="linea_8"></div>
                                <div id="text_ico_8">
                                    TRANSPORTE DESTINO
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_9"></div>
                                <div id="linea_9"></div>
                                <div id="text_ico_9">
                                    ALMACEN IMPORTADOR
                                </div>
                            </div>
                            <div class="cad_ico_cad_log">
                                <div id="img_ico_10">
                                    <i class="fas fa-lock" style="font-size: 30px; font-weight: bold; color: rgb(180, 180, 180);"></i>
                                </div>
                                <div id="linea_10"></div>
                                <div id="text_ico_10">
                                    SEGURO DE MERCANCIA
                                </div>
                            </div>
                            <div id="leye_cadena_logis">
                                <div id="marc_ley">
                                <div id="circ_ley_1"></div>
                                <div class="text_ley">Pagado por tú proveedor</div>
                                <div id="circ_ley_2"></div>
                                <div class="text_ley">Cotizado</div>
                                <div id="circ_ley_3"></div>
                                <div class="text_ley">No cotizado</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">			
                    </div>
                </div>
            </div>
            
            <div id="ventana_flota">
            </div>

            
            <div id="content_flotante" class="flotar">
					<div id="ventana_float">
						<div class="cerrar_float">×</div>
						<div id="tit_float"> ATENCIÓN</div>
						<div id="sub_tit_float"> Para un PRESUPUESTO MÁS EXACTO, sugerimos volver y completar:</div>
						<div id="cuerpo_servicios">
							<div class="item_servicios1">
							</div>
							<div class="item_servicios2">
							</div>
							<div class="item_servicios3">
							</div>
							<div class="item_servicios4">
							</div>
							
						</div>
						<div align="center">
							<div id="ir_presupuesto" class="button" rel_cotizacion="${data[0].user_cotizacion_id}">Ir a Presupuesto</div>
						</div>
					</div>
			</div>

            
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

function gast_portuario_aduana(){
    if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
        console.log("SI Quiero => gastos portuarios y alm");
        $('#img_ico_6').css({'background':'url(views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-002.png)','background-size':'100%'});

        $('#linea_6').css({'background':'url(views/assets/img/linea_tiempo/Gline.png)','background-size':'100%'});
  
    }else{
        console.log("NO Quiero => gastos portuarios y alm");
        $('#img_ico_6').css({'background':'url(views/assets/img/linea_tiempo/PUERTO-Y-ALMACEN-003.png)','background-size':'100%'});

        $('#linea_6').css({'background':'url(views/assets/img/linea_tiempo/Greyline.png)','background-size':'100%'});
    }
}

function perm_aduana(){
    if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
        console.log("SI Quiero => Permisos de aduana");


        $('#tit_seg_val').css({'display':'none'});
        if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
            $('#text_valmrc').css({'display':'none'});
            $('#text_valmrc').val('');
        }else{
            $('#text_valmrc').css({'display':'block'});
        }    
        $('#marc_permisos_aduana ').css({'display':'block'});
        $('#img_ico_7').css({'background':'url(views/assets/img/linea_tiempo/ADUANA-003.png)','background-size':'100%'});

        $('#linea_7').css({'background':'url(views/assets/img/linea_tiempo/Gline.png)','background-size':'100%'});
        
  
    }else{
        console.log("NO Quiero => Permisos de aduana");
        $('#marc_permisos_aduana ').css({'display':'none'});
        $('#img_ico_7').css({'background':'url(views/assets/img/linea_tiempo/ADUANA-002.png)','background-size':'100%'});

        $('#linea_7').css({'background':'url(views/assets/img/linea_tiempo/Greyline.png)','background-size':'100%'});
        if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
            $('#text_valmrc').css({'display':'block'});
            
        }else{
            $('#text_valmrc').css({'display':'none'});
            $('#text_valmrc').val('');
        }  
        $('#txt_pre_carga').val('');
        $('#tit_seg_val').css({'display':'block'});
    }
}

function gast_trans_dom(){
    if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
        console.log("SI Quiero =>trans domicilio");
        $('#marc_trans_domicilio').css({'display':'block'});
        $('#img_ico_8').css({'background':'url(views/assets/img/linea_tiempo/TRANSPORTE-003.png)','background-size':'100%'});

        $('#linea_8').css({'background':'url(views/assets/img/linea_tiempo/Gline.png)','background-size':'100%'});

        $('#img_ico_9').css({'background':'url(views/assets/img/linea_tiempo/ALMACEN-003.png)','background-size':'100%'});

        $('#linea_9').css({'background':'url(views/assets/img/linea_tiempo/Gline.png)','background-size':'100%'});
  
    }else{
        console.log("NO Quiero => Permisos de aduana");
        $('#marc_trans_domicilio').css({'display':'none'});
        $('#img_ico_8').css({'background':'url(views/assets/img/linea_tiempo/TRANSPORTE-002.png)','background-size':'100%'});

        $('#linea_8').css({'background':'url(views/assets/img/linea_tiempo/Greyline.png)','background-size':'100%'});

        $('#img_ico_9').css({'background':'url(views/assets/img/linea_tiempo/ALMACEN-002.png)','background-size':'100%'});

        $('#linea_9').css({'background':'url(views/assets/img/linea_tiempo/Greyline.png)','background-size':'100%'});
    }
}

function gast_seg_merc(){
    if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
        console.log("SI Quiero => Seguro de mercancia");
        if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
            $('#text_valmrc').css({'display':'none'});
        }else{
            $('#text_valmrc').css({'display':'block'});
            $('#text_valmrc').val('');
        }    
        if($('#txt_pre_carga').val()==0){
            $('#valor_prod_hidden').css({'display':'block'});
        }
        $('.svg-inline--fa fa-lock fa-w-14').css({'color':'rgb(0, 102, 240)!important'});
    
        $('#linea_10').css({'background':'url(views/assets/img/linea_tiempo/Gline.png)','background-size':'100%'});
  
    }else{
        console.log("NO Quiero => Seguro de mercancia");
        $('.svg-inline--fa fa-lock fa-w-14').css({'color':'rgb(180, 180, 180)!important'});

        $('#linea_10').css({'background':'url(views/assets/img/linea_tiempo/Greyline.png)','background-size':'100%'});
        if($('#txt_pre_carga').val()==0){
            $('#valor_prod_hidden').css({'display':'none'});
        }
        
    }
}

function validar_check_vacios(){
    console.log('validar_check_vacios');
    //$('#calc_cotiz_con_serv').on('click', function() {
    /*
    var serviciosSeleccionados = new Array();
        $('input[type=checkbox]:not(:checked)').each(function() {
            serviciosSeleccionados.push($(this).val());
        });
    */
   /*
    console.log(serviciosSeleccionados)
    */
    
    /*var servicio_estado=$('input[name=text_tip_serv]').val();*/

    if($('input:checkbox[name=gast_portuario_aduana]').is(':checked')&&$('input:checkbox[name=perm_aduana]').is(':checked')&&$('input:checkbox[name=gast_trans_dom]').is(':checked')&&$('input:checkbox[name=gast_seg_merc]').is(':checked')) {

    /********************/    

    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var numeros = /^[0-9]+$/;
    $(".error").remove();
    $(".item_per_tit_val_prod").remove();
    if( $("#txt_pre_carga").val() == "" ){
        $("#txt_pre_carga").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
        return false;
    }else if($('select[name=trans_origen]').val() == ""){
        $('#trans_origen').focus().after("<div class='item_per_tit_val_prod'>Seleccione Origen</div>");
    return false;
    }else if($('select[name=trans_destino]').val()== ""){
          $('#trans_destino').focus().after("<div class='item_per_tit_val_prod'>Seleccione Destino</div>");
    return false;
    } 

    /*********************/
    /**
      * Variables para insertar
    */
    var user_id=$(this)
    var codigo_id=user_id.attr('rel_cotizacion');
    txt_pre_carga=$('input[name=txt_pre_carga]').val();
    ch1=1;
    ch2=2;
    ch3=3;
    ch4=4;
    producto_id=$('select[name=producto_id]').val();
    txt_pre_carga=$('input[name=txt_pre_carga]').val();
    importacion_estado=$('select[name=importacion_estado]').val();
    trans_origen=$('select[name=trans_origen]').val();
    trans_destino=$('select[name=trans_destino]').val();
    /*** Fin  de las  variables para  insertar ***/

    console.log("listo para guardar");
    

    $.ajax( {
        url: "views/modules/act_user_datos.php",
        type: 'POST',
        dataType: "json",
        data: {user_cotizacion_id:codigo_id,servicios_1:ch1,servicios_2:ch2,servicios_3:ch3,servicios_4:ch4,tipo_producto_id:producto_id,valor_producto:txt_pre_carga,importacion_estado:importacion_estado,trans_origen:trans_origen,trans_destino:trans_destino},
    })
    .done(function(data) {
       //console.log(data);
       /**
        * calculos para cotizar
        */

        /* Gastos portuarios y de almacenamiento aduanero */
        blewb=emision_bl_ewb;
        visto_bueno=visto_bueno;
        descarga=0;
        almacen_referencial=almacen_referencial;
        gremios_mar=gremios_maritimos;
        thc=thc;
        dev_contenedores=devolucion_contenedores;
        com_agencia=comision_agencia;
        gastos_operativos=gastos_operativos;
        /***************************************************/

        /* Cálculo de impuestos y permisos de aduana  Y TAMBIEN Seguro de mercancia*/
        var val_seguro;
        
        if (txt_pre_carga>15000){
            val_seguro=txt_pre_carga*0.01;
        }else{
            val_seguro=60;
        }
                /* SI se ¿Ha realizado importaciones previamente ?  */
                if(importacion_estado=="SI") {
                    impuesto_imp=txt_pre_carga*0.035;
                  }else{
                    impuesto_imp=txt_pre_carga*0.10;
                  }
                  console.log("impuesto_imp =>"+impuesto_imp);    
        /*********************************************/ 
       

        /* Impuestos aplicados a los contenedores sin incluir servicios */
        cif=(parseFloat(txt_pre_carga)+(parseFloat(data[0].sub_total_containers))+(parseFloat(val_seguro)));
        igv=cif*0.16;
        ipm=cif*0.02;
        percepcion=(parseFloat(cif)+parseFloat(igv)+parseFloat(ipm))*0.035;
        total_impuestos=(parseFloat(igv)+parseFloat(ipm)+parseFloat(percepcion));
        console.log('Total Impuestos de Importacion',total_impuestos)
        /****************************************************************/
        total_servicios_camel=(parseFloat(data[0].sub_total_containers)+parseFloat(blewb)+parseFloat(visto_bueno)+parseFloat(descarga)+parseFloat(almacen_referencial)+parseFloat(gremios_mar)+parseFloat(thc)+parseFloat(dev_contenedores)+parseFloat(com_agencia)+parseFloat(gastos_operativos));

        igv_ser_camel=(parseFloat(total_servicios_camel)-parseFloat(data[0].sub_total_containers))*0.18;

        tot_prof_camel=(parseFloat(total_servicios_camel)+parseFloat(igv_ser_camel));
        console.log('Total de servcios camel',tot_prof_camel);
        total_serv_completo=(parseFloat(tot_prof_camel)+parseFloat(total_impuestos));

        console.log("total_servicios_camel =>"+total_serv_completo);    

    


       /******** Fin de calculos para cotizar ********/
       console.log("success");
       $('#fase3').css({'display':'none'});
       $('#fase31').css({'display':'none'});
       $('#cadena_logistica').css({'display':'none'});
       $('#fase_time_line').css({'display':'none'});

       
       if(data!=null){
            $('#fase_reporte_maritimo_con_servicios').html(`
            <div class="row">
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">

                    </div>
                </div>
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <div class="text-center">
                            <h6>Paso 4. Presupuesto</h6>
                        </div>	
                        <div id="marc_det_resumen_presupuesto">
                            <div id="tit_det_rPresupuesto1">ID: 00000000000${data[0].user_cotizacion_id}</div>
                            <div id="tit_det_rPresupuesto2">${data[0].puerto_origen}→${data[0].puerto_destino}</div>
                            <div id="tit_det_rPresupuesto3">
                                <div id="marc_rPresupuesto3_izq">
                                    <div class="item_detalles">Transporte</div>
                                    <div class="item1_detalles">${data[0].tipo_flete}</div>
                                    <div class="item_detalles">Tipo</div>
                                    <div class="item1_detalles">CONTENEDOR COMPLETO</div>
                                    <div class="item_detalles">Cantidad</div>
                                    <div class="item1_detalles" id="cont_can"></div>
                                    <div class="item_detalles">Gasto portuario y Almacenamiento Aduanero</div>
                                    <div class="item1_detalles">
                                        <div id="per_adu_sn"></div>
                                    </div>
                                    <div class="item_detalles">Tipo de producto</div>
                                    <div class="item1_detalles"><div id="tip_pro">${data[0].tipo_producto_id}</div></div>
                                    <div class="item_detalles">Impuestos:</div>
                                    <div class="item1_detalles">${data[0].importacion_estado}</div>
                                </div>
                                <div id="marc_rPresupuesto3_der">
                                    <div class="item_detalles">Valor de mercancía</div>
                                    <div class="item1_detalles">${(new Intl.NumberFormat('de-DE').format(data[0].valor_producto))} USD</div>
                                    <div class="item_detalles">Impuestos de Aduana</div>
                                    <div class="item1_detalles">
                                        <div id="imp_adu_sn"></div>
                                    </div>
                                    <div class="item_detalles">Transporte a Domicilio</div>
                                    <div class="item1_detalles"><div id="tra_dom">${data[0].trans_origen}-${data[0].trans_destino}</div></div>
                                    <div class="item_detalles">Seguro de Mercancia:</div>
                                    <div class="item1_detalles">
                                        <div id="seg_merca"></div>
                                    </div>
                                    <div class="item_detalles">Permiso Gubernamental Adicional:</div>
                                    <div class="item1_detalles"><div id="regulador"></div></div>
                                </div>
                            </div>
                            <div id="tit_det_rPresupuesto4">Validez de tarifa:<div id="fech_vig">${data[0].vigencia_desde}  /  ${data[0].vigencia_hasta}</div></div>
                            <div id="tit_det_rPresupuesto3">
                                <div id="servicio_completo">

                                </div>
                                <!--
                                <div id="servicio_incompleto"></div>	-->
                                <div id="tit_det_rPresupuesto3">
                                    <div align="center">
                                        <a id="btn_descargar_coti" target="_blank" href="views/modules/pdf.php?ID=${data[0].user_cotizacion_id}" class="button">Descargar Cotizacion</a>
                                    </div>
                                </div>						
                            </div>
                        </div>
                    </div>
                </div>		
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">									
                    </div>
                </div>
            </div>                    
            `);

            $('#servicio_completo').html(`
            <div id="marc_rPresupuesto3_izq">
                <div class="item_detalles_sub">Incluye</div>
                <div class="item_detalles_sub">FLETE MARITIMO</div>
                <div class="item_detalles_sub">THCD (Manejo de naviera en Destino)</div>
                <div class="item_detalles_sub">VISTOS BUENOS</div>
                <div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div>
                <div class="item_detalles_sub">ALMACEN ADUANERO</div>
                <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
            </div>
            <div class="costo_tot">${(new Intl.NumberFormat('de-DE').format(total_serv_completo))},<sup>00</sup> USD</div>
            
            `);

            if (data!==null){
                $.each(data,function(key,val){
                  console.log("jharol"+val.contenedor_tipo);
                  $("#cont_can").append(val.cantidad_contenedores+"*"+val.contenedor_tipo+",");
                })
            }

            if (data[0].servicios_1==1){
                $("#per_adu_sn").html('SI');
      
            } else{
                $("#per_adu_sn").html('NO');
            }

            if (data[0].tipo_producto_id==0){
                $("#tip_pro").html('NO');
      
            }

            if (data[0].servicios_2==2){
                $("#imp_adu_sn").html('SI');
      
            } else{
                $("#imp_adu_sn").html('NO');
            }
            if (data[0].servicios_3==3){
                $("#tra_dom").html('SI');
      
            } else{
                $("#tra_dom").html('NO');
            }

            if (data[0].servicios_4==4){
                $("#seg_merca").html('SI');
      
            } else{
                $("#seg_merca").html('NO');
            }
            if (data[0].tipo_producto_id==0){
                $("#regulador").html('NO');
      
            }else{
                $("#regulador").html(data[0].regulador);
            }
            

        }
      
    }).fail(function(){
    console.log("error");

    }).always(function() {
    console.log("complete");
   
    });        


}else{
    var serviciosSeleccionados = new Array();
        $('input[type=checkbox]:is(:checked)').each(function() {
            serviciosSeleccionados.push($(this).val());
        });
    
    console.log(serviciosSeleccionados)
    /*
    $(".item_per_tit_val_prod").remove();
        if( $("#txt_pre_carga").val() == "" ){
            $("#txt_pre_carga").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
            return false;
    }
    $('#content_flotante').css({'display':'block'}).animate({'opacity':'1'},400,'swing');
    */
   
    //$('input:checkbox[name=gast_seg_merc]').is(':checked')
    if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
        //$('#content_flotante').css({'display':'block'}).animate({'opacity':'1'},400,'swing');
        console.log("SI selecciono gastos portuarios");
        $('.item_servicios1').html("");
       
        /* Valores si selccionono gastos de aduana */
            ch1=1;
            blewb=emision_bl_ewb;
            console.log( 'blew'+  blewb );
            visto_bueno=visto_bueno;
            console.log( 'visto_bueno'+  visto_bueno );
            descarga=0;
            almacen_referencial=almacen_referencial;
            console.log( 'almacen_referencial'+  almacen_referencial );
            gremios_mar=gremios_maritimos;
            console.log( 'gremios_maritimos'+  gremios_maritimos );
            thc=thc;
            console.log( 'thc'+  thc );
            dev_contenedores=devolucion_contenedores;
            console.log( 'devolucion_contenedores'+  devolucion_contenedores );
            com_agencia=comision_agencia;
            console.log( 'comision_agencia'+  comision_agencia );
            gastos_operativos=gastos_operativos;
            console.log( 'gastos_operativos'+  gastos_operativos );
            var ch1_act=(parseFloat(blewb)+parseFloat(visto_bueno)+parseFloat(descarga)+parseFloat(almacen_referencial)+parseFloat(gremios_mar)+parseFloat(thc)+parseFloat(dev_contenedores)+parseFloat(com_agencia)+parseFloat(gastos_operativos));
            console.log("tot_check1",ch1_act);
        /********************************************/
    }else{
        console.log("No selecciono gastos portuarios");
        ser_1_si="<li>Gastos portuarios y de Almacenamiento Aduanero</li>";
        $('.item_servicios1').html(ser_1_si);
        var ch1_act=0;
        ch1=0;
        console.log("total check no seleccionar =>",ch1_act);
    }

    if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
        console.log("SI Permisos de aduana");

        $(".item_per_tit_val_prod").remove();
        if( $("#txt_pre_carga").val() == "" ){
            $("#txt_pre_carga").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
            return false;
        }
       

        $('.item_servicios2').html("");
        ch2=2;

        importacion_estado=$('select[name=importacion_estado]').val();
        producto_id=$('select[name=producto_id]').val()
        txt_pre_carga=$('input[name=txt_pre_carga]').val();

        /* Si selecciono Cálculo de impuestos y permisos de aduana */
        
        if(importacion_estado=="SI") {
            impuesto_imp=txt_pre_carga*0.035;
        }else{
            impuesto_imp=txt_pre_carga*0.10;
        }
        console.log("valor carga chk2",txt_pre_carga);
        console.log("tot_check2",impuesto_imp);
        /***********************************************************/
       
    }else{
        console.log("No Permisos de aduana");
        ser_2_si="<li>Cálculo de impuestos y permisos de aduana</li>";
        $('.item_servicios2').html(ser_2_si);
        producto_id=0;
        importacion_estado=0;
        ch2=0;
        txt_pre_carga=0;
        impuesto_imp=0;
        console.log("valor carga chk2 no selec",txt_pre_carga);
        console.log("tot_check2 no selc",impuesto_imp);
    }

    if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
        $(".item_per_tit_val_prod").remove();
        if($('select[name=trans_origen]').val() == ""){
            $('#trans_origen').focus().after("<div class='item_per_tit_val_prod'>Seleccione Origen</div>");
        return false;
        }else if($('select[name=trans_destino]').val()== ""){
              $('#trans_destino').focus().after("<div class='item_per_tit_val_prod'>Seleccione Destino</div>");
        return false;
        } 

        console.log("SI selecciono transporte a dmomicilio");
        $('.item_servicios3').html("");
        ch3=3;
        
        trans_origen=$('select[name=trans_origen]').val();
        trans_destino=$('select[name=trans_destino]').val();
       
    }else{
        console.log("No selecciono transporte a dmomicilio");
        ser_3_si="<li>Transporte a domicilio</li>";
        $('.item_servicios3').html(ser_3_si);
        ch3=0;
        trans_origen=0;
        trans_destino=0;
    }

    if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
        console.log("SI selecciono seguro de mercancia");
        $('.item_servicios4').html("");
        ch4=4;
        /*$(".item_per_tit_val_prod").remove();
        if( $("#text_valmrc").val() == "" ){
            $("#text_valmrc").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
            return false;
        }*/
        //text_valmrc=$('input[name=text_valmrc]').val();
        if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {

        }else{
            /* Si selecciono seguro de mercancia */
            txt_pre_carga=$('input[name=text_valmrc]').val();
            if (txt_pre_carga>15000){
                val_seguro=txt_pre_carga*0.01;
            }else{
                val_seguro=60;
            }
        }    
        

        console.log("valor carga chk 4",txt_pre_carga);
        console.log("tot_check4",val_seguro);
        /*************************************/
       
    }else{
        console.log("No selecciono seguro de mercancia");
        ser_4_si="<li>Seguro de mercancia</li>";
        $('.item_servicios4').html(ser_4_si);
        ch4=0;
        txt_pre_carga=0;
        val_seguro=0;
        console.log("valor carga chk 4no selec",txt_pre_carga);
        console.log("tot_check4 no selc",val_seguro);
    }

    
    $('#content_flotante').css({'display':'block'}).animate({'opacity':'1'},400,'swing');
    /*  Guardar con servicios incompletos */
    $('#ir_presupuesto').on('click', function(){
        // $(document).on('click', '#ir_presupuesto', function() {
        console.log("Guardamos con servicios incompletos");

        

        console.log('checks =>',ch1,ch2,ch3,ch4 );
       
        var user_id=$(this)
        var codigo_id=user_id.attr('rel_cotizacion');

        $.ajax( {
            url: "views/modules/act_user_datos.php",
            type: 'POST',
            dataType: "json",
            data: {user_cotizacion_id:codigo_id,servicios_1:ch1,servicios_2:ch2,servicios_3:ch3,servicios_4:ch4,tipo_producto_id:producto_id,valor_producto:txt_pre_carga,importacion_estado:importacion_estado,trans_origen:trans_origen,trans_destino:trans_destino},
        }).done(function(data) {
            console.log("success");
            $('#fase3').css({'display':'none'});
            $('#fase31').css({'display':'none'});
            $('#cadena_logistica').css({'display':'none'});
            $('#fase_time_line').css({'display':'none'});

            total_serv_completo=(parseFloat(ch1_act)+parseFloat(impuesto_imp)+parseFloat(val_seguro)+parseFloat(data[0].sub_total_containers));

            if(data!=null){
                $('#fase_reporte_maritimo_con_servicios').html(`
                <div class="row">
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">
    
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <div class="text-center">
                                <h6>Paso 4. Presupuesto</h6>
                            </div>	
                            <div id="marc_det_resumen_presupuesto">
                                <div id="tit_det_rPresupuesto1">ID: 00000000000${data[0].user_cotizacion_id}</div>
                                <div id="tit_det_rPresupuesto2">${data[0].puerto_origen}→${data[0].puerto_destino}</div>
                                <div id="tit_det_rPresupuesto3">
                                    <div id="marc_rPresupuesto3_izq">
                                        <div class="item_detalles">Transporte</div>
                                        <div class="item1_detalles">${data[0].tipo_flete}</div>
                                        <div class="item_detalles">Tipo</div>
                                        <div class="item1_detalles">CONTENEDOR COMPLETO</div>
                                        <div class="item_detalles">Cantidad</div>
                                        <div class="item1_detalles" id="cont_can"></div>
                                        <div class="item_detalles">Gasto portuario y Almacenamiento Aduanero</div>
                                        <div class="item1_detalles">
                                            <div id="per_adu_sn"></div>
                                        </div>
                                        <div class="item_detalles">Tipo de producto</div>
                                        <div class="item1_detalles"><div id="tip_pro">${data[0].name}</div></div>
                                        <div class="item_detalles">Impuestos:</div>
                                        <div class="item1_detalles"><div id="impo_st">${data[0].importacion_estado}</div></div>
                                    </div>
                                    <div id="marc_rPresupuesto3_der">
                                        <div class="item_detalles">Valor de mercancía</div>
                                        <div class="item1_detalles">${(new Intl.NumberFormat('de-DE').format(data[0].valor_producto))} USD</div>
                                        <div class="item_detalles">Impuestos de Aduana</div>
                                        <div class="item1_detalles">
                                            <div id="imp_adu_sn"></div>
                                        </div>
                                        <div class="item_detalles">Transporte a Domicilio</div>
                                        <div class="item1_detalles"><div id="tra_dom">${data[0].trans_origen}-${data[0].trans_destino}</div></div>
                                        <div class="item_detalles">Seguro de Mercancia:</div>
                                        <div class="item1_detalles">
                                            <div id="seg_merca"></div>
                                        </div>
                                        <div class="item_detalles">Permiso Gubernamental Adicional:</div>
                                        <div class="item1_detalles">${data[0].regulador}</div>
                                    </div>
                                </div>
                                <div id="tit_det_rPresupuesto4">Validez de tarifa:<div id="fech_vig">${data[0].vigencia_desde}  /  ${data[0].vigencia_hasta}</div></div>
                                <div id="tit_det_rPresupuesto3">
                                    <div id="servicio_completo">
    
                                    </div>
                                    <div class="costo_tot1">${(new Intl.NumberFormat('de-DE').format(total_serv_completo))},<sup>00</sup> USD</div>
                                    <div id="servicio_incompleto">
                                        
                                        <div id="ser_incl">
                                            <div class="item_detalles_sub">Incluye</div>
                                            <div class="item_detalles_sub">FLETE MARITIMO</div>
                                            <div class="item_detalles_sub">THCD (Manejo de naviera en Destino)</div>
                                        </div>
                                        No Incluye
                                        <div id="ser_no_inc">
                                            
                                        </div>
                                        
                                        
                                    </div>
                                    
                                    <div id="tit_det_rPresupuesto3">
                                        <div align="center">
                                            <a id="btn_descargar_coti" target="_blank" download href="views/modules/pdf.php?ID=${data[0].user_cotizacion_id}" class="button">Descargar Cotizacion</a>
                                        </div>
                                    </div>						
                                </div>
                            </div>
                        </div>
                    </div>		
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">									
                        </div>
                    </div>
                </div>                 
            `)};
            
            if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">VISTOS BUENOS</div>
                    <div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div>
                    <div class="item_detalles_sub">ALMACEN ADUANERO</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">VISTOS BUENOS</div>
                    <div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div>
                    <div class="item_detalles_sub">ALMACEN ADUANERO</div>
                </div>
                `);
            }
            if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                </div>
                
                `);
            }  
            if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                </div>
                
                `);

            }
            if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
                </div>
                
                
                `);
            }    

            if (data!==null){
                
                $.each(data,function(key,val){
                  console.log("jharol"+val.contenedor_tipo);
                  $("#cont_can").append(val.cantidad_contenedores+"*"+val.contenedor_tipo+",");
                })
            }

            
            if (data[0].servicios_1==1){
                $("#per_adu_sn").html('SI');
      
            } else{
                $("#per_adu_sn").html('NO');
            }

            if (data[0].tipo_producto_id==0){
                $("#tip_pro").html('NO');
      
            }
            
            if (data[0].importacion_estado==0){
                $("#impo_st").html('NO');
      
            } else{
                $("#impo_st").html('SI');
            }

            if (data[0].servicios_2==2){
                $("#imp_adu_sn").html('SI');
      
            } else{
                $("#imp_adu_sn").html('NO');
            }
            if (data[0].servicios_3==3){
                $("#tra_dom").html('SI');
      
            } else{
                $("#tra_dom").html('NO');
            }

            if (data[0].servicios_4==4){
                $("#seg_merca").html('SI');
      
            } else{
                $("#seg_merca").html('NO');
            }
          
        }).fail(function(){
        console.log("error");
    
        }).always(function() {
        console.log("complete");
       
        });            

    });
    /***************************************/
}    
    
}

function cerrar_flotante(){
	console.log('cerrar flotante');
	var p=$('.flotar');
	p.stop().animate({'opacity':'0'},400,'swing',function(){
		$(this).css({'display':'none'});
	})	



}
/*
function validar_valor_carga(){
	console.log('escribi algo');
	if ($('#txt_pre_carga').val()==0){
        console.log("valor carga vacio");
        if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
            $('#text_valmrc').css({'display':'block'});
        }else{
            $('#text_valmrc').css({'display':'none'});
            $('#text_valmrc').val('');
        }    
    }else{
        if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
            $('#text_valmrc').css({'display':'none'});
            $('#text_valmrc').val('');
        }else{
            $('#text_valmrc').css({'display':'block'});
        }  
    }

}
*/

function validar_calc_cot(){
    console.log('validar_registrarse');
    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var numeros = /^[0-9]+$/;
    $(".error").remove();
    if( $("#txt_pre_carga").val() == "" ){
        $("#txt_pre_carga").focus().after("<span class='error'>Ingresar valor exacto, SIN DECIMALES 1</span>");
        return false;
    }else if( $("#trans_origen").val() == ""){
        $("#trans_origen").focus().after("<span class='error'>Seleccione Origen</p>");
    return false;
    }else if( $("#trans_destino").val() == ""){
        $("#trans_destino").focus().after("<span class='error'>Seleccione Destino</span>");
    return false;
    } 
}
function add_flete_lcl(){

    console.log("agregar felte LCL");
    var tipo_flete='Transporte Maritimo';
    var puerto_origen_id=$('select[name=puertos_orig]').val();
    var puerto_destino_id=$('select[name=puertos_dest]').val();
    var bultos=$('input[name=txtnum_bultos]').val();
    var peso=$('input[name=txtnum_peso]').val();
    var peso_simb=$('select[name=medidas_pesos]').val();
    var volumen=$('input[name=txtnum_volumen]').val();
    var volumen_simb=$('select[name=medidas_mets]').val();
    var carga_lcl_detail_id=$('input[name=carga_lcl_detail_id]').val();
    

    
    
    $.ajax( {
        url: "views/modules/act_add_lcl.php",
        type: 'POST',
        dataType: "application/json",
        data: {tipo_flete:tipo_flete,puerto_origen_id:puerto_origen_id,puerto_destino_id:puerto_destino_id,bultos:bultos,peso:peso,peso_simb:peso_simb,volumen:volumen,volumen_simb:volumen_simb,carga_lcl_detail_id:carga_lcl_detail_id},

    }).done(function(data) {
       console.log("success");
      
       if(data!=null){
            //$('#boton_serv').css({'display':'none'});
            //$('#fase2').css({'display':'none'});
            $('#tit_el_op').css({'display':'block'});
            $('#list_cont_compartido').css({'display':'none'});

           $('#boton_serv_lcl').html(`
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="portfolio-item">
                    <div class="portfolio-caption">				
                        <div id="marc_si_serv">
                            <div id="opc_si_servicio_lcl" rel_user_cotizacion_lcl="${data.user_cotizacion_lcl_id}">
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
                            <div id="opc_no_servicio" rel_usr_cot="${data.user_cotizacion_lcl_id}">
                                OPCION 2<br>
                                NO AGREGAR SERVICIOS
                            </div>										
                        </div>
                    </div>
                </div>
            </div>
            `);
        //$('#fase3').html(``)
       };
    }).fail(function(){
        console.log("error");
    }).always(function() {
        console.log("complete");
    });    
}

function show_servicios_lcl(){
    console.log("Servicios LCL");
    $('#img_icon_serv_extra').css({'background':'url(views/assets/img/linea_tiempo/ico-11.png)','background-size':'100%'});
    $('#fase2').css({'display':'none'});
    $('#fase_21').css({'display':'none'});
    $('#tit_el_op').css({'display':'none'});
    $('#boton_serv').css({'display':'none'});
    $('#marc_det_flete').css({'margin': '56px 0px 0px 0px'});
    var user_id=$(this )
    var codigo_id=user_id.attr('rel_user_cotizacion_lcl');
    console.log(codigo_id);

    $.ajax( {
        url: "views/modules/act_data_lcl.php",
        type: 'POST',
        dataType: "json",
        data: {user_cotizacion_lcl_id:codigo_id},

    }).done(function(data) {
       console.log("success");
       
        
       if(data!=null){
            $('#fase3').html(`
            <div class="row">
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">

                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <div class="text-center">
                            <!-- detalle de rutas -->
                            <div id="marc_det_flete">
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
                                ${data[0].bultos} Bulto de ${data[0].peso} ${data[0].peso_simb} y ${data[0].volumen}  ${data[0].volumen_simb} 
                                </div>
                                    <input type="hidden" name="user_id_text" id="user_id_text" value="${data[0].user_cotizacion_id}">
                            </div>	
                                <!-- Fin detalle de rutas -->						
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 mb-4">
                    <div class="portfolio-item">									
                    </div>
                </div>
            </div>    
             `);
        
            if(data!=null){
                $('#fase31').html(`
                    <div class="row">
                        <div class="col-lg-3 col-sm-6 mb-4">
                            <div class="portfolio-item">
    
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 mb-4">
                            <div class="portfolio-item">
                                <div class="text-center">
                                    <!-- Con servicios -->
                                    <div id="si_servicios">
                                        <div id="marc_serv_flete">
                                            <div class="fill_serv">
                                                <div class="text-center">
                                                    <h3 class="section-subheading text-muted">
                                                        PASO 3. Agrega Servicios Adicionales
                                                    </h3>	
                                                </div>
                                            </div>
                                            <div class="fill_serv">
                                                <div class="mc_check">
                                                    <input type="checkbox" name="gast_portuario_aduana" id="gast_portuario_aduana" value="1">
                                                </div>
                                                <div class="mc_des_check">
                                                    Gastos portuarios y de Almacenamiento Aduanero
                                                </div>
                                            </div>
                                            <div class="fill_serv">
                                                <div class="mc_check">
                                                    <input type="checkbox" id="perm_aduana" name="perm_aduana" value="2">
                                                </div>
                                                <div class="mc_des_check">
                                                    Cálculo de impuestos y permisos de aduana
                                                </div>
                                            </div>							
                                            <div id="marc_permisos_aduana">
                                                <div class="fill_serv">
                                                    <div class="item_per_tit">	
                                                        Tu Producto NO APARECE elegir CARGA GENERAL.
                                                    </div>    
                                                </div>
                                                <div class="fill_serv">
                                                    <div class="selector_productos">
                                                        <select id="producto_id" name="producto_id">
                                                            
                                                        </select>
                                                    </div>
                                                </div>		
                                                <div class="fill_serv">
                                                    <!--<div class="item_per_tit_val_prod">
                                                        Ingresar valor exacto, SIN DECIMALES
                                                    </div>    -->
                                                </div>
                                                <div class="fill_serv">
                                                    <input type="number" name="txt_pre_carga" id="txt_pre_carga">
                                                </div>
                                                
                                            </div>    
                                            <div class="fill_serv">
                                                <div class="mc_check">
                                                    <input type="checkbox" id="gast_trans_dom" name="gast_trans_dom" value="3">
                                                </div>
                                                <div class="mc_des_check">
                                                    Transporte a domicilio
                                                </div>
                                            </div>
                                            <div id="marc_trans_domicilio">	
                                                <div class="fill_serv">
                                                    <select id="trans_origen" name="trans_origen">
                                                        <option value="">Seleccione Destino</option>
                                                        <option value="1">Lima</option>
                                                    </select>
                                                    <select id="trans_destino" name="trans_destino"> 
                                                        <option value="">Seleccione Destino</option>
                                                        <option value="2">Barranco</option>
                                                        <option value="3">Ate Vitarte</option>
                                                    </select>
                                                </div>
                                            </div>    
                                            <div class="fill_serv">
                                                <div class="mc_check">
                                                    <input type="checkbox" id="gast_seg_merc" name="gast_seg_merc" value="4">
                                                </div>
                                                <div class="mc_des_check">
                                                    Seguro de mercancia
                                                </div>
                                                <div id="">
                                                </div>
                                            </div>
                                            <div class="fill_serv">
                                                <div id="valor_prod_hidden">
                                                    <input type="number" id="text_valmrc" name="text_valmrc" value="">
                                                    <div class="fill_serv">
                                                        <!--<div class="item_per_tit" id="tit_seg_val">
                                                            Ingresar valor exacto, SIN DECIMALES
                                                        </div>    -->
                                                    </div>    
                                                </div>
                                            </div>
                                            <center>
                                                <div id="calc_cotiz_con_serv_lcl" class="button" rel_cotizacion="${data[0].user_cotizacion_lcl_id}">Calcular Cotización</div>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                                    <!-- Fin de los servicios -->
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 mb-4">
                            <div class="portfolio-item">									
                            </div>
                        </div>
                    </div>
                `);
            }
            if(data!=null){
                $(document).ready(function() {
                    $.ajax({
                            type: "POST",
                            url: "views/modules/getTipoProd.php",
                            success: function(response)
                            {
                                $('.selector_productos select').html(response).fadeIn();
                            }
                    });
    
                });
            }
            
            if(data!=null){
                $('#cadena_logistica').html(`
                <div class="row">
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">
                                    
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <div id="leye_cadena_logis">
                                <div id="marc_ley">
                                    <center>
                                    <div class="text_ley">Cadena Logistica</div>
                                    </center>
                                </div>
                            </div>
                            <div id="marc_cadena_logis">
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_1"></div>
                                    <div id="linea_1">
                                    </div>
                                    <div id="text_ico_1">
                                        FABRICA PROVEEDOR
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_2"></div>
                                    <div id="linea_2"></div>
                                    <div id="text_ico_2">
                                        TRANSPORTE EN ORIGEN
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_3"></div>
                                    <div id="linea_3"></div>
                                    <div id="text_ico_3">
                                        ADUANA EN ORIGEN
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_4"></div>
                                    <div id="linea_4"></div>
                                    <div id="text_ico_4">
                                        PUERTO EN ORIGEN
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_5"></div>
                                    <div id="linea_5"></div>
                                    <div id="text_ico_5">
                                        FLETE MARITÍMO
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_6"></div>
                                    <div id="linea_6"></div>
                                    <div id="text_ico_6">
                                        PTO Y ALM DEST
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_7"></div>
                                    <div id="linea_7"></div>
                                    <div id="text_ico_7">
                                        ADUANA DESTIDO
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_8"></div>
                                    <div id="linea_8"></div>
                                    <div id="text_ico_8">
                                        TRANSPORTE DESTINO
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_9"></div>
                                    <div id="linea_9"></div>
                                    <div id="text_ico_9">
                                        ALMACEN IMPORTADOR
                                    </div>
                                </div>
                                <div class="cad_ico_cad_log">
                                    <div id="img_ico_10">
                                        <i class="fas fa-lock" style="font-size: 30px; font-weight: bold; color: rgb(180, 180, 180);"></i>
                                    </div>
                                    <div id="linea_10"></div>
                                    <div id="text_ico_10">
                                        SEGURO DE MERCANCIA
                                    </div>
                                </div>
                                <div id="leye_cadena_logis">
                                    <div id="marc_ley">
                                    <div id="circ_ley_1"></div>
                                    <div class="text_ley">Pagado por tú proveedor</div>
                                    <div id="circ_ley_2"></div>
                                    <div class="text_ley">Cotizado</div>
                                    <div id="circ_ley_3"></div>
                                    <div class="text_ley">No cotizado</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 mb-4">
                        <div class="portfolio-item">			
                        </div>
                    </div>
                </div>
                
                <div id="ventana_flota">
                </div>
    
                
                <div id="content_flotante" class="flotar">
                        <div id="ventana_float">
                            <div class="cerrar_float">×</div>
                            <div id="tit_float"> ATENCIÓN</div>
                            <div id="sub_tit_float"> Para un PRESUPUESTO MÁS EXACTO, sugerimos volver y completar:</div>
                            <div id="cuerpo_servicios">
                                <div class="item_servicios1">
                                </div>
                                <div class="item_servicios2">
                                </div>
                                <div class="item_servicios3">
                                </div>
                                <div class="item_servicios4">
                                </div>
                                
                            </div>
                            <div align="center">
                                <div id="ir_presupuesto" class="button" rel_cotizacion="${data[0].user_cotizacion_lcl_id}">Ir a Presupuesto</div>
                            </div>
                        </div>
                </div>
    
                
                `);
            }
            
        }
    }).fail(function(){
        console.log("error");
    }).always(function() {
        console.log("complete");
    
    });    

}

/********************************** */


function validar_check_vacios_lcl(){
    console.log('validar_check_vacios');
    

    if($('input:checkbox[name=gast_portuario_aduana]').is(':checked')&&$('input:checkbox[name=perm_aduana]').is(':checked')&&$('input:checkbox[name=gast_trans_dom]').is(':checked')&&$('input:checkbox[name=gast_seg_merc]').is(':checked')) {

    /********************/    

    var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var numeros = /^[0-9]+$/;
    $(".error").remove();
    $(".item_per_tit_val_prod").remove();
    if( $("#txt_pre_carga").val() == "" ){
        $("#txt_pre_carga").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
        return false;
    }else if($('select[name=trans_origen]').val() == ""){
        $('#trans_origen').focus().after("<div class='item_per_tit_val_prod'>Seleccione Origen</div>");
    return false;
    }else if($('select[name=trans_destino]').val()== ""){
          $('#trans_destino').focus().after("<div class='item_per_tit_val_prod'>Seleccione Destino</div>");
    return false;
    } 

    /*********************/
    /**
      * Variables para insertar
    */
    var user_id=$(this)
    var codigo_id=user_id.attr('rel_cotizacion');
    txt_pre_carga=$('input[name=txt_pre_carga]').val();
    ch1=1;
    ch2=2;
    ch3=3;
    ch4=4;
    producto_id=$('select[name=producto_id]').val();
    txt_pre_carga=$('input[name=txt_pre_carga]').val();
    trans_origen=$('select[name=trans_origen]').val();
    trans_destino=$('select[name=trans_destino]').val();
    /*** Fin  de las  variables para  insertar ***/

    console.log("listo para guardar");
    

    $.ajax( {
        url: "views/modules/act_user_datos_lcl.php",
        type: 'POST',
        dataType: "json",
        data: {user_cotizacion_lcl_id:codigo_id,servicio_1:ch1,servicio_2:ch2,servicio_3:ch3,servicio_4:ch4,tipo_producto_id:producto_id,valor_producto:txt_pre_carga,trans_origen:trans_origen,trans_destino:trans_destino},
    })
    .done(function(data) {
       //console.log(data);
       /**
        * calculos para cotizar
        */

        /* Gastos portuarios y de almacenamiento aduanero */
        blewb=90;
        handling=45;
        visto_bueno=170;
        descarga=75;
        almacen_referencial=220;
        gremios_mar=0;
        thc=0;
        dev_contenedores=0;
        com_agencia=140;
        gastos_operativos=45;
        /***************************************************/

        /* Cálculo de impuestos y permisos de aduana  Y TAMBIEN Seguro de mercancia*/
        var val_seguro;
        
        if (txt_pre_carga>15000){
            val_seguro=txt_pre_carga*0.01;
        }else{
            val_seguro=60;
        }
              
        /*********************************************/ 
       

        /* Impuestos aplicados a los contenedores sin incluir servicios */
        cif=(parseFloat(txt_pre_carga)+(parseFloat(data[0].valor_total))+(parseFloat(val_seguro)));
        igv=cif*0.16;
        ipm=cif*0.02;
        percepcion=(parseFloat(cif)+parseFloat(igv)+parseFloat(ipm))*0.035;
        total_impuestos=(parseFloat(igv)+parseFloat(ipm)+parseFloat(percepcion));
        console.log('Total Impuestos de Importacion',total_impuestos)
        console.log(data[0].valor_total);
        /****************************************************************/
        total_servicios_camel=(parseFloat(data[0].valor_total)+parseFloat(blewb)+parseFloat(visto_bueno)+parseFloat(descarga)+parseFloat(almacen_referencial)+parseFloat(gremios_mar)+parseFloat(thc)+parseFloat(dev_contenedores)+parseFloat(com_agencia)+parseFloat(gastos_operativos));

        igv_ser_camel=(parseFloat(total_servicios_camel)-parseFloat(data[0].valor_total))*0.18;

        tot_prof_camel=(parseFloat(total_servicios_camel)+parseFloat(igv_ser_camel));
        console.log('Total de servcios camel',tot_prof_camel);
        total_serv_completo=(parseFloat(tot_prof_camel)+parseFloat(total_impuestos));

        console.log("total_servicios_camel =>"+total_serv_completo);    

    


       /******** Fin de calculos para cotizar ********/
       console.log("success");
       $('#fase3').css({'display':'none'});
       $('#fase31').css({'display':'none'});
       $('#cadena_logistica').css({'display':'none'});
       $('#fase_time_line').css({'display':'none'});

       
       if(data!=null){
            $('#fase_reporte_maritimo_con_servicios').html(`
            <div class="row">
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">

                    </div>
                </div>
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">
                        <div class="text-center">
                            <h6>Paso 4. Presupuesto</h6>
                        </div>	
                        <div id="marc_det_resumen_presupuesto">
                            <div id="tit_det_rPresupuesto1">ID: 00000000000${data[0].user_cotizacion_lcl_id}</div>
                            <div id="tit_det_rPresupuesto2">${data[0].puerto_origen}→${data[0].puerto_destino}</div>
                            <div id="tit_det_rPresupuesto3">
                                <div id="marc_rPresupuesto3_izq">
                                    <div class="item_detalles">Transporte</div>
                                    <div class="item1_detalles">${data[0].tipo_flete}</div>
                                    <div class="item_detalles">Tipo</div>
                                    <div class="item1_detalles">CARGA COMPARTIDA (LCL)</div>
                                    <div class="item_detalles">Cantidad</div>
                                    <div class="item1_detalles" id="cont_can"> ${data[0].bultos} Bulto de ${data[0].peso} ${data[0].peso_simb} y ${data[0].volumen}  ${data[0].volumen_simb}</div>
                                    <div class="item_detalles">Gasto portuario y Almacenamiento Aduanero</div>
                                    <div class="item1_detalles">
                                        <div id="per_adu_sn"></div>
                                    </div>
                                    <div class="item_detalles">Tipo de producto</div>
                                    <div class="item1_detalles"><div id="tip_pro">${data[0].name}</div></div>
                                   
                                </div>
                                <div id="marc_rPresupuesto3_der">
                                    <div class="item_detalles">Valor de mercancía</div>
                                    <div class="item1_detalles">${(new Intl.NumberFormat('de-DE').format(data[0].valor_producto))} USD</div>
                                    <div class="item_detalles">Impuestos de Aduana</div>
                                    <div class="item1_detalles">
                                        <div id="imp_adu_sn"></div>
                                    </div>
                                    <div class="item_detalles">Transporte a Domicilio</div>
                                    <div class="item1_detalles"><div id="tra_dom">${data[0].trans_origen}-${data[0].trans_destino}</div></div>
                                    <div class="item_detalles">Seguro de Mercancia:</div>
                                    <div class="item1_detalles">
                                        <div id="seg_merca"></div>
                                    </div>
                                    <div class="item_detalles">Permiso Gubernamental Adicional:</div>
                                    <div class="item1_detalles"><div id="regulador"></div></div>
                                </div>
                            </div>
                            <div id="tit_det_rPresupuesto4">Validez de tarifa:<div id="fech_vig">${data[0].vigencia_desde}  /  ${data[0].vigencia_hasta}</div></div>
                            <div id="tit_det_rPresupuesto3">
                                <div id="servicio_completo">

                                </div>
                                <!--
                                <div id="servicio_incompleto"></div>	-->
                                <div id="tit_det_rPresupuesto3">
                                    <div align="center">
                                        <a id="btn_descargar_coti" target="_blank" href="views/modules/pdf.php?ID=${data[0].user_cotizacion_id}" class="button">Descargar Cotizacion</a>
                                    </div>
                                </div>						
                            </div>
                        </div>
                    </div>
                </div>		
                <div class="col-lg-2 col-sm-6 mb-4">
                    <div class="portfolio-item">									
                    </div>
                </div>
            </div>                    
            `);

            $('#servicio_completo').html(`
            <div id="marc_rPresupuesto3_izq">
                <div class="item_detalles_sub">Incluye</div>
                <div class="item_detalles_sub">FLETE MARITIMO</div>
                <div class="item_detalles_sub">DMC DE SALIDA GASTOS PORTUARIOS</div>
                <div class="item_detalles_sub">DESCONSOLIDACIÓN</div>
                <div class="item_detalles_sub">MANEJOS</div>
                <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
            </div>
            <div class="costo_tot">${(new Intl.NumberFormat('de-DE').format(total_serv_completo))},<sup>00</sup> USD</div>
            
            `);

            

            if (data[0].servicios_1==1){
                $("#per_adu_sn").html('SI');
      
            } else{
                $("#per_adu_sn").html('NO');
            }

            if (data[0].tipo_producto_id==0){
                $("#tip_pro").html('NO');
      
            }

            if (data[0].servicios_2==2){
                $("#imp_adu_sn").html('SI');
      
            } else{
                $("#imp_adu_sn").html('NO');
            }
            if (data[0].servicios_3==3){
                $("#tra_dom").html('SI');
      
            } else{
                $("#tra_dom").html('NO');
            }

            if (data[0].servicios_4==4){
                $("#seg_merca").html('SI');
      
            } else{
                $("#seg_merca").html('NO');
            }
            if (data[0].tipo_producto_id==0){
                $("#regulador").html('NO');
      
            }else{
                $("#regulador").html(data[0].regulador);
            }
            

        }
      
    }).fail(function(){
    console.log("error");

    }).always(function() {
    console.log("complete");
   
    });        


}else{
    var serviciosSeleccionados = new Array();
        $('input[type=checkbox]:is(:checked)').each(function() {
            serviciosSeleccionados.push($(this).val());
        });
    
    console.log(serviciosSeleccionados)
  
    if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
        console.log("SI selecciono gastos portuarios");
        $('.item_servicios1').html("");
       
        /* Valores si selccionono gastos de aduana */
            ch1=1;
            blewb=90;
            handling=45;
            visto_bueno=170;
            descarga=75;
            almacen_referencial=220;
            gremios_mar=0;
            thc=0;
            dev_contenedores=0;
            com_agencia=140;
            gastos_operativos=45;
            var ch1_act=(parseFloat(blewb)+parseFloat(handling)+parseFloat(visto_bueno)+parseFloat(descarga)+parseFloat(almacen_referencial)+parseFloat(gremios_mar)+parseFloat(thc)+parseFloat(dev_contenedores)+parseFloat(com_agencia)+parseFloat(gastos_operativos));
            console.log("tot_check1",ch1_act);
        /********************************************/
    }else{
        console.log("No selecciono gastos portuarios");
        ser_1_si="<li>Gastos portuarios y de Almacenamiento Aduanero</li>";
        $('.item_servicios1').html(ser_1_si);
        var ch1_act=0;
        ch1=0;
        console.log("total check no seleccionar =>",ch1_act);
    }

    if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
        console.log("SI Permisos de aduana");

        $(".item_per_tit_val_prod").remove();
        if( $("#txt_pre_carga").val() == "" ){
            $("#txt_pre_carga").focus().before("<div class='item_per_tit_val_prod'>Ingresar valor exacto, SIN DECIMALES</div>");
            return false;
        }
       

        $('.item_servicios2').html("");
        ch2=2;


        producto_id=$('select[name=producto_id]').val()
        txt_pre_carga=$('input[name=txt_pre_carga]').val();

        /* Si selecciono Cálculo de impuestos y permisos de aduana */
        
       
        console.log("valor carga chk2",txt_pre_carga);
        
        /***********************************************************/
       
    }else{
        console.log("No Permisos de aduana");
        ser_2_si="<li>Cálculo de impuestos y permisos de aduana</li>";
        $('.item_servicios2').html(ser_2_si);
        producto_id=0;
        importacion_estado=0;
        ch2=0;
        txt_pre_carga=0;
        impuesto_imp=0;
        console.log("valor carga chk2 no selec",txt_pre_carga);
        console.log("tot_check2 no selc",impuesto_imp);
    }

    if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
        $(".item_per_tit_val_prod").remove();
        if($('select[name=trans_origen]').val() == ""){
            $('#trans_origen').focus().after("<div class='item_per_tit_val_prod'>Seleccione Origen</div>");
        return false;
        }else if($('select[name=trans_destino]').val()== ""){
              $('#trans_destino').focus().after("<div class='item_per_tit_val_prod'>Seleccione Destino</div>");
        return false;
        } 

        console.log("SI selecciono transporte a dmomicilio");
        $('.item_servicios3').html("");
        ch3=3;
        
        trans_origen=$('select[name=trans_origen]').val();
        trans_destino=$('select[name=trans_destino]').val();
       
    }else{
        console.log("No selecciono transporte a dmomicilio");
        ser_3_si="<li>Transporte a domicilio</li>";
        $('.item_servicios3').html(ser_3_si);
        ch3=0;
        trans_origen=0;
        trans_destino=0;
    }

    if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
        console.log("SI selecciono seguro de mercancia");
        $('.item_servicios4').html("");
        ch4=4;
        txt_pre_carga=$('input[name=text_valmrc]').val();
        if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
            txt_pre_carga=$('input[name=txt_pre_carga]').val();
        }else{
            /* Si selecciono seguro de mercancia */
            txt_pre_carga=$('input[name=text_valmrc]').val();
            if (txt_pre_carga>15000){
                val_seguro=txt_pre_carga*0.01;
            }else{
                val_seguro=60;
            }
        }    
        

        console.log("valor carga chk 4",txt_pre_carga);
        console.log("tot_check4",val_seguro);
        /*************************************/
       
    }else{
        txt_pre_carga=$('input[name=text_valmrc]').val();
        console.log("No selecciono seguro de mercancia");
        ser_4_si="<li>Seguro de mercancia</li>";
        $('.item_servicios4').html(ser_4_si);
        ch4=0;
        txt_pre_carga=0;
        val_seguro=0;
        console.log("valor carga chk 4no selec",txt_pre_carga);
        console.log("tot_check4 no selc",val_seguro);
    }

    
    $('#content_flotante').css({'display':'block'}).animate({'opacity':'1'},400,'swing');
    /*  Guardar con servicios incompletos */
    $('#ir_presupuesto').on('click', function(){
        // $(document).on('click', '#ir_presupuesto', function() {
        console.log("Guardamos con servicios incompletos");

        

        console.log('checks =>',ch1,ch2,ch3,ch4 );
       
        var user_id=$(this)
        var codigo_id=user_id.attr('rel_cotizacion');

        $.ajax( {
            url: "views/modules/act_user_datos_lcl.php",
            type: 'POST',
            dataType: "json",
            data: {user_cotizacion_lcl_id:codigo_id,servicio_1:ch1,servicio_2:ch2,servicio_3:ch3,servicio_4:ch4,tipo_producto_id:producto_id,valor_producto:txt_pre_carga,trans_origen:trans_origen,trans_destino:trans_destino},
        }).done(function(data) {
            console.log("success");
            $('#fase3').css({'display':'none'});
            $('#fase31').css({'display':'none'});
            $('#cadena_logistica').css({'display':'none'});
            $('#fase_time_line').css({'display':'none'});

            total_serv_completo=(parseFloat(ch1_act)+parseFloat(val_seguro)+parseFloat(data[0].valor_total));

            if(data!=null){
                $('#fase_reporte_maritimo_con_servicios').html(`
                <div class="row">
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">
    
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">
                            <div class="text-center">
                                <h6>Paso 4. Presupuesto</h6>
                            </div>	
                            <div id="marc_det_resumen_presupuesto">
                                <div id="tit_det_rPresupuesto1">ID: 00000000000${data[0].user_cotizacion_lcl_id}</div>
                                <div id="tit_det_rPresupuesto2">${data[0].puerto_origen}→${data[0].puerto_destino}</div>
                                <div id="tit_det_rPresupuesto3">
                                    <div id="marc_rPresupuesto3_izq">
                                        <div class="item_detalles">Transporte</div>
                                        <div class="item1_detalles">${data[0].tipo_flete}</div>
                                        <div class="item_detalles">Tipo</div>
                                        <div class="item1_detalles">CONTENEDOR COMPLETO</div>
                                        <div class="item_detalles">Cantidad</div>
                                        <div class="item1_detalles" id="cont_can">
                                        ${data[0].bultos} Bulto de ${data[0].peso} ${data[0].peso_simb} y ${data[0].volumen}  ${data[0].volumen_simb} 
                                        </div>
                                        <div class="item_detalles">Gasto portuario y Almacenamiento Aduanero</div>
                                        <div class="item1_detalles">
                                            <div id="per_adu_sn"></div>
                                        </div>
                                        <div class="item_detalles">Tipo de producto</div>
                                        <div class="item1_detalles"><div id="tip_pro">${data[0].name}</div></div>
                                        
                                    </div>
                                    <div id="marc_rPresupuesto3_der">
                                        <div class="item_detalles">Valor de mercancía</div>
                                        <div class="item1_detalles">${(new Intl.NumberFormat('de-DE').format(data[0].valor_producto))} USD</div>
                                        <div class="item_detalles">Impuestos de Aduana</div>
                                        <div class="item1_detalles">
                                            <div id="imp_adu_sn"></div>
                                        </div>
                                        <div class="item_detalles">Transporte a Domicilio</div>
                                        <div class="item1_detalles"><div id="tra_dom">${data[0].trans_origen}-${data[0].trans_destino}</div></div>
                                        <div class="item_detalles">Seguro de Mercancia:</div>
                                        <div class="item1_detalles">
                                            <div id="seg_merca"></div>
                                        </div>
                                        <div class="item_detalles">Permiso Gubernamental Adicional:</div>
                                        <div class="item1_detalles">${data[0].regulador}</div>
                                    </div>
                                </div>
                                <div id="tit_det_rPresupuesto4">Validez de tarifa:<div id="fech_vig">${data[0].vigencia_desde}  /  ${data[0].vigencia_hasta}</div></div>
                                <div id="tit_det_rPresupuesto3">
                                    <div id="servicio_completo">
    
                                    </div>
                                    <div class="costo_tot1">${(new Intl.NumberFormat('de-DE').format(total_serv_completo))},<sup>00</sup> USD</div>
                                    <div id="servicio_incompleto">
                                        
                                        <div id="ser_incl">
                                            <div class="item_detalles_sub">Incluye</div>
                                            <div class="item_detalles_sub">FLETE MARITIMO</div>
                                            <div class="item_detalles_sub">THCD (Manejo de naviera en Destino)</div>
                                        </div>
                                        No Incluye
                                        <div id="ser_no_inc">
                                            
                                        </div>
                                        
                                        
                                    </div>
                                    
                                    <div id="tit_det_rPresupuesto3">
                                        <div align="center">
                                            <a id="btn_descargar_coti" target="_blank" download href="views/modules/pdf.php?ID=${data[0].user_cotizacion_id}" class="button">Descargar Cotizacion</a>
                                        </div>
                                    </div>						
                                </div>
                            </div>
                        </div>
                    </div>		
                    <div class="col-lg-2 col-sm-6 mb-4">
                        <div class="portfolio-item">									
                        </div>
                    </div>
                </div>                 
            `)};
            
            if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">VISTOS BUENOS</div>
                    <div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div>
                    <div class="item_detalles_sub">ALMACEN ADUANERO</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">VISTOS BUENOS</div>
                    <div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div>
                    <div class="item_detalles_sub">ALMACEN ADUANERO</div>
                </div>
                `);
            }
            if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div>
                </div>
                
                `);
            }  
            if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div>
                </div>
                
                `);

            }
            if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
                $('#ser_incl').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
                </div>
                
                
                `);
            }else{
                $('#ser_no_inc').append(`
                <div id="marc_rPresupuesto3_izq">
                    <div class="item_detalles_sub">SEGURO DE MERCANCIA</div>
                </div>
                
                
                `);
            }    

            
            if (data[0].servicios_1==1){
                $("#per_adu_sn").html('SI');
      
            } else{
                $("#per_adu_sn").html('NO');
            }

            if (data[0].tipo_producto_id==0){
                $("#tip_pro").html('NO');
      
            }
            
            if (data[0].importacion_estado==0){
                $("#impo_st").html('NO');
      
            } else{
                $("#impo_st").html('SI');
            }

            if (data[0].servicios_2==2){
                $("#imp_adu_sn").html('SI');
      
            } else{
                $("#imp_adu_sn").html('NO');
            }
            if (data[0].servicios_3==3){
                $("#tra_dom").html('SI');
      
            } else{
                $("#tra_dom").html('NO');
            }

            if (data[0].servicios_4==4){
                $("#seg_merca").html('SI');
      
            } else{
                $("#seg_merca").html('NO');
            }
          
        }).fail(function(){
        console.log("error");
    
        }).always(function() {
        console.log("complete");
       
        });            

    });
}    
    
}


/********************************** */