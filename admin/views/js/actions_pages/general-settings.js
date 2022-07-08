$(() => {
	// ------------ ANCLAS INTERNAS PARA LAS SECCCIONES
	const linksAnchParent = $("#c-Settings_linksAnchors-m");
	const linksAnch = linksAnchParent.find("li");
	const itemsAnch = $(".cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting");
	const firstLinkAnch = linksAnch.eq(0).data("target").slice(1);

	// MOSTRAR EL PRIMER LINK Y SU SECCIÓN
	linksAnch
		.eq(0)
		.add($(`.cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting[id="${firstLinkAnch}"]`))
		.addClass("active");
	// MOSTRAR SECCIÓN DE ACUERDO AL LINK
	linksAnch.on("click", function(){
		var t = $(this);
		var tindex = t.index();
		var tattribute = t.data("target").slice(1);
		// linksAnch.eq(tindex).add(itemsAnch.eq(tindex)).addClass("active").siblings().removeClass("active");
	  linksAnch
	  	.eq(tindex)
	  	.add($(`.cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting[id="${tattribute}"]`))
	  	.addClass('active')
	  	.siblings()
	  	.removeClass("active");
	});
});
// ------------ FORMATO - SEPARADOR DE NÚMERO TELEFÓNICO (+51)
$(document).on("keyup", "input[data-valformat=withspacesforthreenumbers]", function(e){
	let val = e.target.value;
  $(this).val(val.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3'));
});
// ------------ LIMITAR A DOS DECIMALES CUALQUIER INPUT DE TIPO NÚMERO EN DONDE ESTÁ IMPORTADO ESTE ARCHIVO
$(document).on("keyup","input[data-valformat=withtwodecimals]",function(e){
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
// // ------------ VISUALIZAR LA IMAGEN A CARGAR - FOTO FRONTAL
$("#home_banner_principal").on("change", function(e){
  let readerImg = new FileReader();
  let contUploadView = $(this).parent().find("img");
  if(e.target.files[0] == undefined || e.target.files[0] == "undefined"){
    contUploadView.removeClass("w-topload");
    contUploadView.attr("src", "./views/assets/img/utilities/icon-upload.svg");
  }else{
  	$(this).parent().find("img").addClass("w-topload");
    readerImg.readAsDataURL(e.target.files[0]);
    readerImg.onload = function(){
      contUploadView.attr("src", readerImg.result);
    }
  }
});
// ------------ AGREGAR UNA CONDICIÓN
var count_itms = 0;
var tmp_conditions = "";
$(document).on("click","#btn-addConditions",function(){
	let list_cond = $("#lts-allConditions > div");
	count_itms = list_cond.length;
	count_itms++;
	tmp_conditions = "";
	tmp_conditions += `<div class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm item-condition" id="item-${count_itms}">
		<textarea class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__input" data-bold="" cols="30" rows="1" name="infogeneral_conditions[]" id="condition_${count_itms}" placeholder="Ingrese la condición" required></textarea>
		<div class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns gruop-btns'>
			<button type="button" class="cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btndel btn-del" title="Eliminar condición">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="18px" height="18px"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
				</span>
			</button>
			<button type='button' class='cont-dashCamel--cHSettings--containRight--cContain__cBody__cardBody__cCardBody__contCol__cardGrpControls__lCtrls__cItms__m__itm__gpBtns__btnbold btn-bold' title='Poner en negrita la condición'>
				<span>
					<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='18px' height='18px' version='1.1' viewBox='0 0 700 700'><g xmlns='http://www.w3.org/2000/svg'><path d='m450.3 261.65c25.453 17.703 48.227 43.645 59.645 72.66 3.1758 8.0625 5.8281 16.844 7.207 25.426 3.4883 21.762 0.80469 44.832-6.3516 65.613-1.9805 5.7617-4.3555 11.406-7.1562 16.828-2.8242 5.4766-6.1641 10.773-9.8438 15.691-16.684 22.309-38.27 40.207-64.551 50.031-18.727 6.9883-38.633 10.141-58.605 10.109-53.652-0.078124-189.34 0-189.34 0v-476h187.14c28.285 0 55.254 14.312 75.242 33.57 5.6797 5.4727 11.105 11.504 15.883 17.797 12.219 16.109 22.758 34.641 26.82 54.633 3.8594 19.098 3.293 38.258-2.9531 56.789-1.7305 5.1289-3.8398 10.152-6.2109 15.008-4.6367 9.4766-9.5859 17.898-15.754 26.434-0.69531 0.95312-11.203 15.395-11.18 15.41zm-172.13 189.66s62.016 0.17188 85.559-0.050782c4.3516-0.050781 8.6797-0.57031 12.992-1.082 22.074-2.6719 37.582-22.203 43.445-42.363 5.0977-17.527 4.3008-38.484-2.168-55.559-1.8125-4.8008-4.2891-9.5938-7.2539-13.77-8.4609-11.945-23-25.473-38.629-25.465-26.824 0.023438-93.945 0.066407-93.945 0.066407zm0-202.59h40.945c17.488 0 18.09-0.46875 24.414-1.6406 12.324-2.2852 25.047-11.066 32.414-20.961 7.582-10.176 12.473-22.719 14.117-35.293 1.7422-13.223 1.2617-27.469-3.5234-40.078-7.1523-18.891-21.387-36.746-41.625-42.152-4.6211-1.2305-9.6875-1.9336-14.48-1.9336h-52.27l0.003906 142.06z'/></g></svg>
				</span>
			</button>
		</div>
	</div>`;
	$("#lts-allConditions").append(tmp_conditions);
});
// ------------ ELIMINAR UNA CONDICIÓN
$(document).on("click","button.btn-del",function(){
	$(this).parent().parent().remove();
});
// ------------ AGREGAR BOLD A UNA CONDICIÓN
$(document).on("click","button.btn-bold",function(){
	let txtinput = $(this).parent().parent().find("textarea");
	if(txtinput.hasClass("t-bold")){
		txtinput.removeClass("t-bold");
		txtinput.attr("data-bold","light");
	}else{
		txtinput.attr("data-bold","bold");
		txtinput.addClass("t-bold");
	}
});
$(document).on("submit",".cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm",function(e){
	e.preventDefault();
	
	var formdata = new FormData();
	var nameSendPOST = $(this).find("button[type='submit']").attr("name");

	if(nameSendPOST == "home_settings"){
		formdata.append("whatsapp_phone", $("#whatsapp_phone").val());
		formdata.append("whatsapp_text", $("#whatsapp_text").val());
		formdata.append("infogeneral_address", $("#infogeneral_address").val());
		formdata.append("infogeneral_email", $("#infogeneral_email").val());
		formdata.append("infogeneral_telephone", $("#infogeneral_telephone").val());
	}else if(nameSendPOST == "conditions_settings"){
		$('[name^="infogeneral_conditions["]').each(function(){
			formdata.append("infogeneral_conditions[]", $(this).val());
			formdata.append("infogeneral_conditions_bold[]", $(this).attr("data-bold"));
		});
	}else if(nameSendPOST == "quotation_settings"){
		formdata.append("quotation_ammountcifvalidation", $("#ammountCifValidation").val());
		formdata.append("quotation_ammountcifmaxvalidation", $("#ammountCifMaxValidation").val());
		formdata.append("quotation_ammountcerticonformvalidation", $("#ammountCertiConformValidation").val());
	}else if(nameSendPOST == "banners_settings"){
		var filelength = $('.banner_principal-upload')[0].files.length;
	  for (var i = 0;i < filelength; i ++) {
	    formdata.append("home_banner_principal", $('.banner_principal-upload')[0].files[i]);
	  }
	}else{
		console.log('Error, no hay un método de asociación para GUARDAR');
	}

	$.ajax({
	  url: `savesettings?action=SaveChanges&assoc=${nameSendPOST}`,
	  method: 'POST',
	  data: formdata,
	  datatype: "JSON",
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    cache: false,
    contentType: false,
    processData: false,
	  success: function(e){
      if(e != ""){
      	let r = JSON.parse(e);
      	if(r.res == "updated"){
      		Swal.fire({
	          title: 'Actualizado!',
	          html: `<span class='font-w-300'>Se ha actualizado correctamente.</span>`,
	          icon: 'success',
	          confirmButtonText: 'Aceptar'
	        });
      	}else if(r.res == "not-updated"){
      		Swal.fire({
	          title: 'Atención!',
	          html: `<span class='font-w-300'>Hubo un error y/o los datos son los mismos.</span>`,
	          icon: 'warning',
	          confirmButtonText: 'Aceptar'
	        });
      	}else{
					Swal.fire({
	          title: 'Error!',
	          html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
	          icon: 'error',
	          confirmButtonText: 'Aceptar'
	        });
      	}
      }else{
				Swal.fire({
          title: 'Error!',
          html: `<span class='font-w-300'>Lo sentimos, hubo un error al procesar la información.</span>`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
	  }
  });
  
})