var x = $(document);
x.ready(inicializar);

function inicializar() {
    //filt_todos();
	  $("input[type='number']").inputSpinner();
  	$("body").on('click','#con_completo',show_tipo_contenedor); 
    $("body").on('click','#estimar',show_estimar_contenedor); 
    $("body").on('click','#flete_maritimo',show_cbo_rutas);
    $("body").on('change','#puertos_dest',show_t_envio);
    $("body").on('change','#txtnum_1',show_txtnum_1);
    $("body").on('change','#txtnum_2',show_txtnum_2);
    $("body").on('change','#txtnum_3',show_txtnum_3);
    $("body").on('change','#txtnum_4',show_txtnum_4);
    $("body").on('change','#tip_contenedor',show_btn_estimar);
    $("body").on('click','#next_maritimo',show_reg_services);
    //$("body").on('click','#dowload_cotizacion',validar_registrarse);
    $("body").on('click','#dowload_cotizacion',reg_cotizacion);
    $("body").on('change','input[name=perm_aduana]',show_permisos_aduana);
    $("body").on('change','input[name=gast_trans_dom]',show_envio_domicilio);
    $("body").on('click','#opc_si_servicio',show_con_servicio);
    $("body").on('click','#opc_no_servicio',show_sin_servicio);
    



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
        console.log(data);
        $('#fase1').css({'display':'none'});
        $('#fase2').css({'display':'block'});
        
        //$('#fase2').html('<div id="dt_flete">'+data[0].tipo_flete+'</div><div id="dt_rutas"><div id="dt_origen">'+data[0].puerto_origen+'</div><div id="dt_destino">'+data[0].puerto_destino+'</div></div><div id="dt_container">'+data[0].contenedor_tipo+'</div>');
        $('#fase2').html('<h2>Resumen de Rutas</h2><div id="marc_det_flete"><div id="dt_flete">'+data[0].tipo_flete+'</div><div id="dt_rutas"><div id="dt_origen">'+data[0].puerto_origen+'</div><div id="dt_destino">'+data[0].puerto_destino+'</div></div><div id="dt_container"></div><input type="hidden" name="user_id_text" id="user_id_text" value="'+data[0].user_cotizacion_id+'"></div><h2>Elije una opcion</h2><div id="marc_opc_serv"><div id="opc_si_servicio">OPCION 1<br>AGREGAR SERVICIOS</div><div id="opc_no_servicio">OPCION 2<br>NO AGREGAR SERVICIOS</div><input type="text" id="text_tip_serv" name="text_tip_serv"></div><div id="si_servicios"><h2>Servicios</h2><div id="marc_serv_flete"><div class="mc_check"><input type="checkbox" name="gast_portuario_aduana" id="gast_portuario_aduana" value="1"></div><div class="mc_des_check">Gastos portuarios y de Almacenamiento Aduanero</div><div class="mc_check"><input type="checkbox" id="perm_aduana" name="perm_aduana" value="2"></div><div class="mc_des_check">Cálculo de impuestos y permisos de aduana</div><div class="mc_check"></div><div class="mc_des_check"><div id="marc_permisos_aduana"><div class="item_per_tit">Tu Producto NO APARECE elegir CARGA GENERAL.</div><div class="item_per"><select id="producto_id" name="producto_id"><option value="1">ADITIVOS ALIMENTICIOS</option><option value="2">AGRICULTURA (FRUTAS Y VEGETALES)</option></select></div><div class="item_per_tit">Ingresar valor exacto, SIN DECIMALES</div><div class="item_per"><input type="number" name="txt_pre_carga" id="txt_pre_carga"></div><div class="item_per_tit">¿Ha realizado importaciones previamente ?</div><div class="item_per"><select id="importacion_estado" name="importacion_estado"><option value="NO">NO</option><option value="SI">SI</option></select></div></div></div><div class="mc_check"><input type="checkbox" id="gast_trans_dom" name="gast_trans_dom" value="3"></div><div class="mc_des_check">Transporte a domicilio</div><div class="mc_check"></div><div class="mc_des_check"><div id="marc_trans_domicilio"><div class="item_per"><select id="trans_origen" name="trans_origen"><option value="1">Seleccione Origen</option><option value="1">Lima</option></select></div><div class="item_per"><select id="trans_destino" name="trans_destino"><option value="1">Seleccione Destino</option><option value="2">Barranco</option><option value="3">Ate Vitarte</option></select></div></div></div><div class="mc_check"><input type="checkbox" id="gast_seg_merc" name="gast_seg_merc" value="4"></div><div class="mc_des_check">Seguro de mercancia</div></div></div><h2>Ingrese sus datos</h2><div id="marc_datos_user"><div class="mc_tit">Ingrese su correo elcetronico</div><div class="mc_input"><input type="text" required name="txtemail" id="txtemail"></div><div class="mc_tit">Ingreser su RUC </div><div class="mc_input"><input type="text" name="txtruc" id="txtruc"></div><div class="mc_tit">Ingreser su numero de celular</div><div class="mc_input"><input type="text" name="txtcel" id="txtcel"></div></div><div align="center"><div id="dowload_cotizacion" class="button" rel_cotizacion="'+data[0].user_cotizacion_id+'">Calcular Flete</div></div>')

        if (data!==null){
          $.each(data,function(key,val){
            console.log("jharol"+val.contenedor_tipo);
            $("#dt_container").append(val.cantidad_contenedores+"*"+val.contenedor_tipo+",");
          })
          }

      });
      e.preventDefault(); 
      return false;
    });


    




}	
 
function show_tipo_contenedor(){
    console.log("Mostramos tipos de contenedores");
}
function show_cbo_rutas(){
    console.log("show_cbo_rutas");
    $("#cbo_ruta").css({'display':'block'});
    $("#text_tipo_flete").val('Carga Maritima');
}
function show_t_envio(){
    console.log("show_t_envio");
    $("#t_envio").css({'display':'block'});
    $('#detail_cont_selc1t').html(' ');

    $('#detail_cont_selc1').html(' ');
    $('#detail_cont_selc2').html(' ');
    $('#detail_cont_selc3').html(' ');
    $('#detail_cont_selc4').html(' ');
}
function show_txtnum_1(){
    console.log("show_txtnum_1");
    //$("#t_envio").css({'display':'block'});
    
    $("#next_maritimo").css({'display':'none'});
    //if($("input[name=txtnum_1]").val()==0){
    if($("#txtnum_1").val()==0){
			$('#detail_cont_selc1').html(' ');
		}else{
			$('#detail_cont_selc1').html($('#txtnum_1').val()+' * '+'20 STANDARD ,' );
		}
}
function show_txtnum_2(){
    console.log($('#txtnum_2').val());
    $("#next_maritimo").css({'display':'none'});
		//if($("input[name=txtnum_2]").val()==0){
    if($("#txtnum_2").val()==0){
			$('#detail_cont_selc2').html(' ');
		}else{
			//$('#detail_cont_selc2').html($('input[name=txtnum_2]').val()+' * '+'40 STANDARD ,' );
      $('#detail_cont_selc2').html($('#txtnum_2').val()+' * '+'40 STANDARD ,' );
		}
}
function show_txtnum_3(){
    console.log($('#txtnum_3').val());
    $("#next_maritimo").css({'display':'none'});
    //if($("input[name=txtnum_3]").val()==0){
    if($("#txtnum_3").val()==0){
      $('#detail_cont_selc3').html(' ');
    }else{
      //$('#detail_cont_selc3').html($('input[name=txtnum_3]').val()+' * '+'40 HC ,' );
      $('#detail_cont_selc3').html($('#txtnum_3').val()+' * '+'40 HC ,' );
    }
}
function show_txtnum_4(){
    console.log($('#txtnum_4').val());
    $("#next_maritimo").css({'display':'none'});
    //if($("input[name=txtnum_4]").val()==0){
    if($("#txtnum_4").val()==0){
      $('#detail_cont_selc4').html(' ');
    }else{
      //$('#detail_cont_selc4').html($('input[name=txtnum_4]').val()+' * '+'40 NOR ' );
      $('#detail_cont_selc4').html($('#txtnum_4').val()+' * '+'40 NOR ' );
    }	
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

   
}
function show_btn_estimar(){
    
      $('#estimar').css({'display':'block'});
    
}
function show_reg_services(){
    console.log('show_reg_services');
    
}
function reg_cotizacion(){
  //validar_registrarse();
  var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
  var numeros = /^[0-9]+$/;
	    //$("#dowload_cotizacion").click(function (){
        $(".error").remove();
        if( $("#txtemail").val() == "" || !emailreg.test($("#txtemail").val())){
              $("#txtemail").focus().after("<span class='error'>Ingrese un email correcto</span>");
              return false;
        }else if( $("#txtruc").val() == "" || !numeros.test($("#txtruc").val())){
            $("#txtruc").focus().after("<span class='error'>Ingrese su Numero de Ruc</p>");
            return false;
		    }else if( $("#txtcel").val() == "" || !numeros.test($("#txtcel").val()) ){
            $("#txtcel").focus().after("<span class='error'>Ingrese su Celular</span>");
            return false;
        } 
    	//});

		$("#txtruc, #txtcel").keyup(function(){
        if( $(this).val() != "" ){
            $(".error").fadeOut();
            return false;
        }
	    });
	    $("#txtemail").keyup(function(){
	        if( $(this).val() != "" && emailreg.test($(this).val())){
	            $(".error").fadeOut();
	            return false;
	        }
	    });

  console.log("reg_cotizacion");
 
  var user_id=$(this)
  var codigo_id=user_id.attr('rel_cotizacion');
  var servicio_estado=$('input[name=text_tip_serv]').val();
  var nr_ruc=$('input[name=txtruc]').val();
  var nr_cel=$('input[name=txtcel]').val();
  var email=$('input[name=txtemail]').val();


  if ($('input:checkbox[name=gast_portuario_aduana]').is(':checked') ) {
      ch1=1;
  }else{
      ch1=0;
  }

  if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
    ch2=2;
    producto_id=$('select[name=producto_id]').val();
    txt_pre_carga=$('input[name=txt_pre_carga]').val();
    importacion_estado=$('select[name=importacion_estado]').val();
  }else{
    ch2=0;
    producto_id=0;
    txt_pre_carga=0;
    importacion_estado=0;
  }

  if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
    ch3=3;
    trans_origen=$('select[name=trans_origen]').val();
    trans_destino=$('select[name=trans_destino]').val();
  }else{
    ch3=0;
    trans_origen=0;
    trans_destino=0;
  }

  if ($('input:checkbox[name=gast_seg_merc]').is(':checked') ) {
    ch4=4;
  }else{
    ch4=0;
  }

    console.log("chek1 =>"+ch1);
    console.log("chek2 =>"+ch2);
    console.log("chek3 =>"+ch3);
    console.log("chek4 =>"+ch4);

    console.log(codigo_id);
    console.log(nr_ruc);
    console.log(nr_cel);
    console.log(email);

    console.log(producto_id);
    console.log(txt_pre_carga);
    console.log(importacion_estado);
    console.log(trans_origen);
    console.log(trans_destino);

  $.ajax( {
      url: "views/modules/act_user_datos.php",
      type: 'POST',
      dataType: "json",
      data: {user_cotizacion_id:codigo_id,servicio_estado:servicio_estado,servicios_1:ch1,servicios_2:ch2,servicios_3:ch3,servicios_4:ch4,tipo_producto_id:producto_id,valor_producto:txt_pre_carga,importacion_estado:importacion_estado,trans_origen:trans_origen,trans_destino:trans_destino,ruc:nr_ruc,celular:nr_cel,correo:email},
  })
  .done(function(data) {
     //console.log(data);
     console.log("success");
     if(data!=null){
        $('#fase2').css({'display':'none'});
        $('#fase3').css({'display':'block'});

        $('#fase3').html('<h2>Paso 4. Presupuesto</h2><div id="marc_det_resumen_presupuesto"><div id="tit_det_rPresupuesto1">ID: 00000000000'+data[0].user_cotizacion_id+'</div><div id="tit_det_rPresupuesto2">'+data[0].puerto_origen+' →'+data[0].puerto_destino+'</div><div id="tit_det_rPresupuesto3"><div id="marc_rPresupuesto3_izq"><div class="item_detalles">Transporte</div><div class="item1_detalles">'+data[0].tipo_flete+'</div><div class="item_detalles">Tipo</div><div class="item1_detalles">CONTENEDOR COMPLETO</div><div class="item_detalles">Cantidad</div><div class="item1_detalles" id="cont_can"></div><div class="item_detalles">Gasto portuario y Almacenamiento Aduanero</div><div class="item1_detalles">Si</div><div class="item_detalles">Tipo de producto</div><div class="item1_detalles">'+data[0].tipo_producto_id+'</div><div class="item_detalles">Impuestos:</div><div class="item1_detalles">Segunda Importación</div></div><div id="marc_rPresupuesto3_der"><div class="item_detalles">Valor de mercancía</div><div class="item1_detalles">'+data[0].valor_producto+'</div><div class="item_detalles">Impuestos de Aduana</div><div class="item1_detalles">Si</div><div class="item_detalles">Transporte a Domicilio</div><div class="item1_detalles">'+data[0].trans_origen+' -'+data[0].trans_destino+'</div><div class="item_detalles">Seguro de Mercancia:</div><div class="item1_detalles">'+data[0].servicios_4+'</div><div class="item_detalles">Permiso Gubernamental Adicional:</div><div class="item1_detalles">MINAGRI / SENASA</div></div></div><div id="tit_det_rPresupuesto4">Validez de tarifa: 7 may - 16 may</div><div id="tit_det_rPresupuesto3"><div id="servicio_completo"><div id="marc_rPresupuesto3_izq"><div class="item_detalles_sub">Incluye</div><div class="item_detalles_sub">FLETE MARITIMO</div><div class="item_detalles_sub">THCD (Manejo de naviera en Destino)</div><div class="item_detalles_sub">VISTOS BUENOS</div><div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div><div class="item_detalles_sub">ALMACEN ADUANERO</div><div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div><div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div><div class="item_detalles_sub">SEGURO DE MERCANCIA</div></div><div class="costo_tot">'+data[0].sub_total_containers+',<sup>00</sup> USD</div></div><div id="servicio_incompleto"><!--<div id="marc_rPresupuesto3_izq"><div class="item_detalles_sub">Incluye</div><div class="item_detalles_sub">FLETE MARITIMO</div><div class="item_detalles_sub">THCD (Manejo de naviera en Destino)</div><div class="item_detalles_sub">No incluye</div><div class="item_detalles_sub">VISTOS BUENOS</div><div class="item_detalles_sub">GATE IN(Recepción de contenedor vacio en el puerto</div><div class="item_detalles_sub">ALMACEN ADUANERO</div><div class="item_detalles_sub">HONORARIOS DE AGENCIA DE ADUANA</div><div class="item_detalles_sub">TRANSPORTE A FABRICA IMPORTADOR</div><div class="item_detalles_sub">SEGURO DE MERCANCIA</div></div><div class="costo_tot">19.272,<sup>00</sup> USD</div></div></div>--><div id="tit_det_rPresupuesto3"><div align="center"><a id="btn_descargar_coti" target="_blank" download href="views/modules/pdf.php?ID='+data[0].user_cotizacion_id+'" class="button">Descargar Cotizacion</a></div></div>')

        if (data!==null){
          $.each(data,function(key,val){
            console.log("jharol"+val.contenedor_tipo);
            $("#cont_can").append(val.cantidad_contenedores+"*"+val.contenedor_tipo+",");
          })
        }
        if (data[0].servicio_estado=="SI"){

        }  
        
      }
      
    }).fail(function(){
      console.log("error");
      console.log(data);
    }).always(function() {
      console.log("complete");
    }); 





    /*****/

    /****/
    
}
function show_permisos_aduana(){
  console.log('show_permisos_aduana');
  if ($('input:checkbox[name=perm_aduana]').is(':checked') ) {
    console.log("si");
    $('#marc_permisos_aduana ').css({'display':'block'});
  }else{
    console.log("no");
    $('#marc_permisos_aduana ').css({'display':'none'});
  }
}
function show_envio_domicilio(){
  console.log('gast_trans_dom');
  if ($('input:checkbox[name=gast_trans_dom]').is(':checked') ) {
    console.log("si");
    $('#marc_trans_domicilio').css({'display':'block'});
  }else{
    console.log("no");
    $('#marc_trans_domicilio').css({'display':'none'});
  }
}

function validar_registrarse(){
  console.log('validar_registrarse');
	var emailreg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
  var numeros = /^[0-9]+$/;
	    //$("#dowload_cotizacion").click(function (){
        $(".error").remove();
        if( $("#txtemail").val() == "" || !emailreg.test($("#txtemail").val())){
              $("#txtemail").focus().after("<span class='error'>Ingrese un email correcto</span>");
              return false;
        }else if( $("#txtruc").val() == "" || !numeros.test($("#txtruc").val())){
            $("#txtruc").focus().after("<span class='error'>Ingrese su Numero de Ruc</p>");
            return false;
		    }else if( $("#txtcel").val() == "" || !numeros.test($("#txtcel").val()) ){
            $("#txtcel").focus().after("<span class='error'>Ingrese su Celular</span>");
            return false;
        } 
    	//});

		$("#txtruc, #txtcel").keyup(function(){
        if( $(this).val() != "" ){
            $(".error").fadeOut();
            return false;
        }
	    });
	    $("#txtemail").keyup(function(){
	        if( $(this).val() != "" && emailreg.test($(this).val())){
	            $(".error").fadeOut();
	            return false;
	        }
	    });
		
}

function show_con_servicio(){
  console.log('show_con_servicio');
  $('#si_servicios').css({'display':'block'});
  $('#text_tip_serv').val('SI');
}
function show_sin_servicio(){
  console.log('show_con_servicio');
  $('#si_servicios').css({'display':'none'});
  $('#text_tip_serv').val('NO');
}
