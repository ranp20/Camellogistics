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
$(document).on("submit",".cont-dashCamel--cHSettings--containRight--cContain__cBody__cSettings__sideContAnchors__cItemSetting--frm",function(e){
	e.preventDefault();
	var formdata = new FormData();
	var nameSendPOST = $(this).find("button[type='submit']").attr("name");

	if(nameSendPOST == "home_settings"){
		formdata.append("whatsapp_phone", $("#whatsapp_phone").val());
		formdata.append("whatsapp_text", $("#whatsapp_text").val());
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