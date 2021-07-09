var x = $(document);
x.ready(inicializar);

function inicializar(){
    $("body").on('click','#calc_cotiz_con_serv',validar_check_vacios);
    $("body").on('click','#btn_descargar_coti',validateSessionUser);
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
                                        <a id="btn_descargar_coti" href="#"  class="button">Descargar Cotizacion</a>
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
    

/*=========================================================================================
=            GUARDAR E IR AL SIGUIENTE PASO CON LOS SERVICIOS INCOMPLETOS             =
=========================================================================================*/

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
                                            <a id="btn_descargar_coti" href="#"   class="button">Descargar Cotizacion</a>
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

function validateSessionUser(){

    $(".cnt-modalFormLoginyRegister").addClass("show");
    $(".cnt-modalFormLoginyRegister--c").addClass("show");
}