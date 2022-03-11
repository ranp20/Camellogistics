var nombre = '';
scannear_botones(); //carga la pagina y le digo que sea operativo el funcionamiento de los links...
/************************** CAPTURAR LOS VALORES DEL INPUT DE ENTRADA **************************/
var inputsearch = document.querySelector("#search_quotationusers");
inputsearch.addEventListener('keyup', function(e){
  var name = inputsearch.value;
  num = 1;
  buscar(name, num);
});
/************************** CAPTURAR EL VALOR NUMÉRICO DEL ATRIBUTO EN EL ENLACE **************************/
function scannear_botones(){
  const botones = document.querySelectorAll('#paginador a');
  for( let i = 0; i < botones.length; i++ ){
    botones[i].addEventListener( 'click', function( e ){    
      const num = e.target.dataset.pagina;
      buscar(inputsearch.value, num);
      e.preventDefault();
    });
  }
}
/************************** BUSCADOR EN TIEMPO REAL **************************/
function buscar(que, num){
  if(num == undefined || num == 'undefined'){
    return false;
  }else{
    const fd = new FormData();
    fd.append('nombre', que);
    fd.append('numero', num);

    fetch('../admin/controllers/c_seach-ajax-quotationusers.php', {method: 'post', body: fd})
    .then(function(j){ return j.json();})
    .then(function(d){
      //console.log(d);
      const publicaciones = document.getElementById('tbl_quotationusers');
      const paginador = document.getElementById('paginador');

      publicaciones.innerHTML = ''; //RESETEA EL LISTADO DE RESULTADOS DE ESTA PAGINA....
      if(d.resultados.length == 0){
        publicaciones.innerHTML = `
          <tr>
            <td colspan="10">
              <div class="msg-non-results-res">
                <img src="../admin/views/assets/img/utilities/icon-sad-face.svg" alt="" class="msg-non-results-res__icon">
                <h3 class="msg-non-results-res__title">No se encontraron resultados...</h3>
              </div>
            </td>
          </tr>
        `;
      }else{
        d.resultados.forEach(function(u, i){
          for (var i = 0; i < u.length; i++) {
            publicaciones.innerHTML += `
              <tr id='${u[i].id}'>
                <td class='center'>${u[i].id}</td>
                <td>${u[i].code_quote}</td>
                <td>${u[i].u_login}</td>
                <td>${u[i].f_type_operation}</td>
                <td>${u[i].f_type_transport}</td>
                <td>${u[i].f_type_container}</td>
                <td>${u[i].u_n_document}</td>
                <td>${u[i].u_enterprise}</td>
                <td>${u[i].u_telephone}</td>
                <td>${u[i].u_service}</td>
                <td class='cont-btn-generate-pdf'>
                  <a class='btn-generate-pdf' href='#' data-id='${u[i].id_gencode}' data-codequote='${u[i].code_quote}'>
                    <span>Exportar </span>
                    <svg aria-hidden='true' focusable='false' data-prefix='fal' data-icon='file-pdf' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' class='svg-inline--fa fa-file-pdf fa-w-12 fa-3x'><path d='M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-22-171.2c-13.5-13.3-55-9.2-73.7-6.7-21.2-12.8-35.2-30.4-45.1-56.6 4.3-18 12-47.2 6.4-64.9-4.4-28.1-39.7-24.7-44.6-6.8-5 18.3-.3 44.4 8.4 77.8-11.9 28.4-29.7 66.9-42.1 88.6-20.8 10.7-54.1 29.3-58.8 52.4-3.5 16.8 22.9 39.4 53.1 6.4 9.1-9.9 19.3-24.8 31.3-45.5 26.7-8.8 56.1-19.8 82-24 21.9 12 47.6 19.9 64.6 19.9 27.7.1 28.9-30.2 18.5-40.6zm-229.2 89c5.9-15.9 28.6-34.4 35.5-40.8-22.1 35.3-35.5 41.5-35.5 40.8zM180 175.5c8.7 0 7.8 37.5 2.1 47.6-5.2-16.3-5-47.6-2.1-47.6zm-28.4 159.3c11.3-19.8 21-43.2 28.8-63.7 9.7 17.7 22.1 31.7 35.1 41.5-24.3 4.7-45.4 15.1-63.9 22.2zm153.4-5.9s-5.8 7-43.5-9.1c41-3 47.7 6.4 43.5 9.1z' class=''></path></svg>
                  </a>
                </td>
              </tr>
            `;
          }
        });
      }
      
      paginador.innerHTML = ''; //RESETEAR LA BOTONERA DEL PAGINADOR...
      var currpage = parseFloat(d.actual); //PARSEAR LAS VARIABLES RECIBIDAS...
      var totalpages = parseFloat(d.paginas); //PARSEAR LAS VARIABLES RECIBIDAS...
      var adjacents = 3;
      
      // SE PODRÍA METER TODO ESTE CÓDIGO APARTIR DE ESTE PUNTO, DE TODAS MANERAS ES MERA ELECCIÓN...
      var prevlabel = "&lsaquo;";
      var nextlabel = "&rsaquo;";
      var out = '';
      
      /*********************** PÁGINA ANTERIOR ************************/
      if(currpage == 1){
        out += `<li class='prev-disabledlink'><span><a>${prevlabel}</a></span></li>`;
      } else if(currpage == 2) {
        out += `<li><span><a href='javascript:void(0);' data-pagina='1'>${prevlabel}</a></span></li>`;
      }else {
        out += `<li><span><a href='javascript:void(0);' data-pagina='${currpage - 1}'>${prevlabel}</a></span></li>`;
      }
      
      /*********************** PRIMERA PÁGINA ************************/
      if(currpage > (adjacents + 1)) {
        out += `<li><a href='javascript:void(0);' data-pagina='1'>1</a></li>`;
      }

      /*********************** INTERVALOS ************************/
      if(currpage > (adjacents + 2)) {
        out += "<li class='between-defaultlink'><a>...</a></li>";
      }

      /*********************** PÁGINAS ************************/
      pmin = (currpage > adjacents) ? (currpage - adjacents) : 1;
      pmax = (currpage < (totalpages - adjacents)) ? (currpage + adjacents) : totalpages;
      for(var i = pmin; i <= pmax; i++) {
        let actual = d.actual == i ? " class='actual' " : "";
        if(i == currpage) {
          out += `<li class='active'><a class='actual'>${i}</a></li>`;
        }else if(i == 1) {
          out += `<li><a href='javascript:void(0);' data-pagina='1'>${i}</a></li>`;
        }else {
          out += `<li><a href='' ${ actual } data-pagina='${ i }'>${ i }</a></li>`;
        }
      }
      /*********************** INTERVALOS ************************/
      if(currpage < (totalpages - adjacents - 1)) {
        out += `<li class='between-defaultlink'><a>...</a></li>`;
      }

      /*********************** ÚLTIMA PÁGINA ************************/
      if(currpage < (totalpages - adjacents)) {
        out += `<li><a href='javascript:void(0);' data-pagina='${totalpages}'>${totalpages}</a></li>`;
      }

      /*********************** SIGUIENTE PÁGINA ************************/
      if(currpage < totalpages) {
        out += `<li><span><a href='javascript:void(0);' data-pagina='${currpage + 1}'>${nextlabel}</a></span></li>`;
      }else {
        out += `<li class='next-disabledlink'><span><a>${nextlabel}</a></span></li>`;
      }
      
      out += '';
      paginador.innerHTML = out;

      scannear_botones();
    });
  }
}

$(document).on("click", ".btn-generate-pdf", function(e){
  e.preventDefault();
  
  $("#cUIMessageValid-adm").html(`<div id="msgAlertpreloader">
    <div class="cont-loader--loader">
      <span class="cont-loader--loader--circle"></span>
      <span class="cont-loader--loader--circle"></span>
      <span class="cont-loader--loader--circle"></span>
      <span class="cont-loader--loader--circle"></span>
    </div>
    <p>Preparando archivo PDF...</p>
  </div>`);

  $.each($(this), function(i, v){
    var item_data = {id: $(this).attr('data-id'), codequote: $(this).attr('data-codequote')};

    $.ajax({
      type: 'POST',
      url: 'controllers/c_generate-pdf-adm-integral.php',
      data: {
        id_codegenrand : item_data['id'],
        code_quote : item_data['codequote']
      },
      xhrFields: {
        responseType: 'blob' // to avoid binary data being mangled on charset conversion
      },
      success: function(blob, status, xhr) {
        // check for a filename
        var filename = "";
        var disposition = xhr.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
        }

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
          window.navigator.msSaveBlob(blob, filename);
        } else {
          var URL = window.URL || window.webkitURL;
          var downloadUrl = URL.createObjectURL(blob);

          if (filename) {
            // use HTML5 a[download] attribute to specify filename
            var a = document.createElement("a");
            // safari doesn't support this yet
            if (typeof a.download === 'undefined') {
              window.location.href = downloadUrl;
            } else {
              a.href = downloadUrl;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              $("#cUIMessageValid-adm").html("");
            }
          } else {
            window.location.href = downloadUrl;
          }

          setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
        }
      }
    });
  });
});