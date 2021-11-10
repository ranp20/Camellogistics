<?php
session_start();
if(isset($_POST) && count($_POST) > 0){
	if(isset($_POST['ipt-vcodgeneratex']) && strlen($_POST['ipt-vcodgeneratex']) > 7){
		
		/*echo "<pre>";
		print_r($_POST);
		echo "</pre>";*/

		$code_currquotation = ['code_currgen' => $_POST['ipt-vcodgeneratex']];
		//OPTAR POR INCORPORAR AL ARRAY DE SESSION, OBTENER LOS VALORES DE LA SESSION Y ACTUALIZAR NUEVAMENTE LA VARIABLE;
		//$union_sesscode = array_merge($_SESSION['user_camel'], $code_currquotation);
		//print_r($union_sesscode);

		//VARIABLES...
		$v_img_typetransport = ""; //IMAGEN DE TIPO DE TRANSPORTE
		$v_port_originsend = strtoupper($_POST['val-originPortSend']); //PUERTO DE ORIGEN
		$v_port_destinysend = strtoupper($_POST['val-destinyPortSend']); //PUERTO DE DESTINO
		$v_typecharge = $_POST['loadTypeCharge']; //TIPO DE CARGA (LCL, FCL)
		$v_typetransport = "";
		$v_typeloadtransport = "";
		$v_typecontainer = "";
		$v_cantidad = "";
		$v_gatosaduanas = "";
		$v_typeproduct = "";
		$v_quantityproduct = "";
		$v_impuestos = "";
		$v_fob = "";
		$v_impuestoaduana = "";
		$v_transdomicilio = "";
		$v_seguromercancia = "";
		$v_permisoadicional = "";
		//ARRAYS/JSON
		$arr_yesselect = [];
		$arr_notselect = [];


		//IMAGEN DEL TIPO DE TRANSPORTE
		if($_POST['idtypetransportsendinit'] == 1){$v_img_typetransport = "fleteMaritimo.png";
		}else if($_POST['idtypetransportsendinit'] == 2){$v_img_typetransport = "fleteAereo.png";
    }else{$v_img_typetransport = "logotipo-camel.png";}
    
    //TIPO DE TRANSPORTE
		if($_POST['idtypetransportsendinit'] == 1){$v_typetransport = "MARÍTIMO";
		}else{$v_typetransport = "No Especificado";}
		
		//TIPO DE TRANSPORTE(GENERAL, IMO, REFRIGERADO)
		if(isset($_POST['loadTypeTranport'])){$v_typeloadtransport = strtoupper($_POST['loadTypeTranport']);
		}else{$v_typeloadtransport = "No especificado";}
		
		//TIPO DE CONTENEDOR
		if($_POST['loadTypeCharge'] == "FCL"){$v_typecontainer = "CONTENEDOR COMPLETO";
		}else{$v_typecontainer = "CONTENEDOR COMPARTIDO";}

		//CANTIDAD | Solo irá: peso(Kg) o metros cúbicos en el caso de LCL, y la cantidad por el tipo de contenedor(1x20st,1x40st,1x40HQ,1x40NOR) si es FCL

		//GASTOS PORTUARIOS Y ALMACENAMIENTO ADUANERO...
		if($_POST['opt-genfquotation'] == "not-moreOpts"){$v_gatosaduanas = "NO";
		}else{$v_gatosaduanas = "SI";}

		//TIPO DE PRODUCTO
		if(isset($_POST['val-categProdquot'])){$v_typeproduct = $_POST['val-categProdquot'];
		}else{$v_typeproduct = "No especificado";}

		//CANTIDAD DE PRODUCTO
		if(isset($_POST['val-quantityProdsAmmAdd']) && $_POST['val-quantityProdsAmmAdd'] != 0 && $_POST['val-quantityProdsAmmAdd'] != ""){
			$v_quantityproduct = " x ".$_POST['val-quantityProdsAmmAdd'];
		}else{$v_quantityproduct = "";}

		//IMPUESTOS
		if(!isset($_POST['val-prevImports'])){$v_impuestos = "No especificado";
    }else if($_POST['val-prevImports'] == "NO"){$v_impuestos = "Primera importación";
    }else{$v_impuestos = "Importado previamente";}

    //VALOR DE MERCANCÍA
    if(isset($_POST['val-valProdquot'])){$v_fob = $_POST['val-valProdquot'];
    }else{$v_fob = "No especificado";}

    //IMPUESTO DE ADUANA
    if($_POST['opt-genfquotation'] == "y-moreOpts"){$v_impuestoaduana = "SI";
    }else{$v_impuestoaduana = "NO";}

    //TRANSPORTE A DOMICILIO
    if(isset($_POST['plc-pickuploc'])){$v_transdomicilio = $_POST['plc-pickuploc'];
    }else{$v_transdomicilio = "NO";}

    //SEGURO DE MERCANCÍA
    if(!isset($_POST['res-insuremerch'])){$v_seguromercancia = "No especificado";
  	}else if($_POST['res-insuremerch'] == "NO"){$v_seguromercancia = "NO";
  	}else{$v_seguromercancia = "SÍ";}

  	//PERMISO GUBERNAMENTAL ADICIONAL
  	if(isset($_POST['val-reqPermisoProdquot']) && $_POST['val-reqPermisoProdquot'] != "NO REQUIERE"){
  		$v_permisoadicional = $_POST['val-reqPermisoProdquot'];
  	}else{$v_permisoadicional = "No Requiere";}

  	//SERVICIO LOGÍSTICO: Resumen de los items que se escogieron, separar en dos campos o de lo contrario guardar en json y separar por indice
		//VARIABLES DE ITEMS...
		$tipotranporte = "";
		$handling = "HANDLING Y MANEJO DESTINO";
		$vistobueno = "VISTOS BUENOS";
		$descarga = "DESCARGA";
		$almacenaduanero = "ALMACEN ADUANERO";
		//$honorarios = "HONORARIOS DE AGENCIA DE ADUANA";
		$transportefabrica = "TRANSPORTE A FÁBRICA IMPORTADOR";
		$seguromercancia = "SEGURO DE MERCANCÍA";
		//ARRAYS - INCLUYE Y NO INCLUYE...
		$arr_include = [];
		$arr_notinclude = [];

		/************************** TIPO DE SERVICIO **************************/
		if($_POST['idtypetransportsendinit'] == 1){$tipotranporte = "FLETE MARÍTIMO";array_push($arr_include, $tipotranporte);
		}else if($_POST['idtypetransportsendinit'] == 2){$tipotranporte = "FLETE AÉREO";array_push($arr_include, $tipotranporte);
		}else{$tipotranporte = "SERVICIO ADUANERO";array_push($arr_include, $tipotranporte);}

		/************************** HANDLING Y MANEJO DESTINO **************************/
		if($_POST['loadTypeCharge'] == "FCL" || $_POST['loadTypeCharge'] == "LCL"){array_push($arr_include, $handling);
		}else{array_push($arr_include, $handling);}

		/************************** VISTOS BUENOS **************************/
		if($_POST['opt-genfquotation'] == "y-moreOpts"){array_push($arr_include, $vistobueno, $descarga);
		}else{array_push($arr_include, $vistobueno, $descarga);}

		/************************** ALMACEN ADUANERO **************************/
		if(isset($_POST['val-categProdquot']) && $_POST['val-categProdquot'] != "" && $_POST['val-valProdquot']){array_push($arr_include, $almacenaduanero);
		}else{array_push($arr_notinclude, $almacenaduanero);}

		/************************** TRANSPORTE A FÁBRICA IMPORTADOR/TRANSPORTE INTERNO **************************/
		if(isset($_POST['opt-reqtransport']) && $_POST['opt-reqtransport'] != "NO"){array_push($arr_include, $transportefabrica);
		}else{array_push($arr_notinclude, $transportefabrica);}

		/************************** SEGURO DE MERCANCÍA **************************/
		if(isset($_POST['res-insuremerch']) && $_POST['res-insuremerch'] != "NO"){array_push($arr_include, $seguromercancia);
		}else{array_push($arr_notinclude, $seguromercancia);}

		//print_r($arr_include);
		//print_r($arr_notinclude);

		$template_incserv = "";
		$template_notincserv = "";

		if(empty($arr_include) || count($arr_include) == 0){
		  $template_incserv = "";
		}else{

		  $template_incserv .="
		    <div class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include'>
		      <p class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--title'>Incluye</p>
		      <ul class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m'>";
		  foreach($arr_include as $value){
		    $template_incserv .= "<li class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--include--m--item'>
		            <span>{$value}</span>
		          </li>";
		  }
		  $template_incserv .="
		      </ul>
		    </div>
		  ";
		}

		if(empty($arr_notinclude) || count($arr_notinclude) == 0){
		  $template_notincserv = "";
		}else{
		  $template_notincserv .="
		    <div class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude'>
		      <p class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--title'>No incluye</p>
		      <ul class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m'>";
		  foreach($arr_notinclude as $value){
		    $template_notincserv .= "<li class='c-FinalQuotation--contStep--cQuotation--cBottom--c--moreDetails--cInnotIn--notinclude--m--item'>
		            <span>{$value}</span>
		          </li>";
		  }
		  $template_notincserv .="
		      </ul>
		    </div>
		  ";
		}

		echo $template_incserv.$template_notincserv;

	}else{
		header("Location: marketplace-logistico");	
	}
}else{
	header("Location: marketplace-logistico");
}