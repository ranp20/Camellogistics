$(() => {
  listQuotationUsers();
});
// ------------ LISTAR PRODUCTOS
var listQuotationUsers = () => {
  var tblClients = $("#tbl_quotationusers").DataTable({
    "destroy": true,
    "ajax":{
      "url": "../admin/controllers/c_list-quotationusers-filter.php",
      // "data": { option : optionSel },
      "type": "POST",
    },
    "columns":[
      {"data":"id",
        "render": function(data,type,row){
          var tmpid = "";
          tmpid += `<span id="item-${row.id}">${row.id}</span>`;
          return tmpid;
        }
      },
      {"data":"code_quote"},
      {"data":"u_login"},
      {"data":"f_type_service"},
      {"data":"f_type_transport"},
      {"data":"f_type_container"},
      {"data":"u_n_document"},
      {"data":"u_enterprise"},
      {"data":"u_telephone"},
      {"data":"id",
        "render": function ( data, type, row ){
          var tmpBtnDetail = "";
          tmpBtnDetail += `<div class="cont-btn-details center">
            <a class="btn-generate-pdf" href="javascript:void(0);" data-id='${row.id_gencode}' data-codequote='${row.code_quote}'>
              <span>
                <svg aria-hidden='true' focusable='false' data-prefix='fal' data-icon='file-pdf' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' class='svg-inline--fa fa-file-pdf fa-w-12 fa-3x' width="25px" height="25px"><path d='M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-22-171.2c-13.5-13.3-55-9.2-73.7-6.7-21.2-12.8-35.2-30.4-45.1-56.6 4.3-18 12-47.2 6.4-64.9-4.4-28.1-39.7-24.7-44.6-6.8-5 18.3-.3 44.4 8.4 77.8-11.9 28.4-29.7 66.9-42.1 88.6-20.8 10.7-54.1 29.3-58.8 52.4-3.5 16.8 22.9 39.4 53.1 6.4 9.1-9.9 19.3-24.8 31.3-45.5 26.7-8.8 56.1-19.8 82-24 21.9 12 47.6 19.9 64.6 19.9 27.7.1 28.9-30.2 18.5-40.6zm-229.2 89c5.9-15.9 28.6-34.4 35.5-40.8-22.1 35.3-35.5 41.5-35.5 40.8zM180 175.5c8.7 0 7.8 37.5 2.1 47.6-5.2-16.3-5-47.6-2.1-47.6zm-28.4 159.3c11.3-19.8 21-43.2 28.8-63.7 9.7 17.7 22.1 31.7 35.1 41.5-24.3 4.7-45.4 15.1-63.9 22.2zm153.4-5.9s-5.8 7-43.5-9.1c41-3 47.7 6.4 43.5 9.1z' class=''></path></svg>
              </span>
            </a>
          </div>`;
          return tmpBtnDetail;
        }
      },
    ],
    "language":{
      "processing": "Procesando...",
      "lengthMenu": "Mostrar _MENU_ registros",
      "zeroRecords": "No se encontraron resultados",
      "emptyTable": "Ningún dato disponible en esta tabla",
      "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
      "infoFiltered": "(filtrado de un total de _MAX_ registros)",
      "search": "Buscar:",
      "infoThousands": ",",
      "loadingRecords": "Cargando...",
      "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
      },
      "aria": {
          "sortAscending": ": Activar para ordenar la columna de manera ascendente",
          "sortDescending": ": Activar para ordenar la columna de manera descendente"
      },
      "buttons": {
          "copy": "Copiar",
          "colvis": "Visibilidad",
          "collection": "Colección",
          "colvisRestore": "Restaurar visibilidad",
          "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
          "copySuccess": {
              "1": "Copiada 1 fila al portapapeles",
              "_": "Copiadas %d fila al portapapeles"
          },
          "copyTitle": "Copiar al portapapeles",
          "csv": "CSV",
          "excel": "Excel",
          "pageLength": {
              "-1": "Mostrar todas las filas",
              "1": "Mostrar 1 fila",
              "_": "Mostrar %d filas"
          },
          "pdf": "PDF",
          "print": "Imprimir"
      },
      "autoFill": {
          "cancel": "Cancelar",
          "fill": "Rellene todas las celdas con <i>%d<\/i>",
          "fillHorizontal": "Rellenar celdas horizontalmente",
          "fillVertical": "Rellenar celdas verticalmentemente"
      },
      "decimal": ",",
      "searchBuilder": {
          "add": "Añadir condición",
          "button": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
          },
          "clearAll": "Borrar todo",
          "condition": "Condición",
          "conditions": {
              "date": {
                  "after": "Despues",
                  "before": "Antes",
                  "between": "Entre",
                  "empty": "Vacío",
                  "equals": "Igual a",
                  "notBetween": "No entre",
                  "notEmpty": "No Vacio",
                  "not": "Diferente de"
              },
              "number": {
                  "between": "Entre",
                  "empty": "Vacio",
                  "equals": "Igual a",
                  "gt": "Mayor a",
                  "gte": "Mayor o igual a",
                  "lt": "Menor que",
                  "lte": "Menor o igual que",
                  "notBetween": "No entre",
                  "notEmpty": "No vacío",
                  "not": "Diferente de"
              },
              "string": {
                  "contains": "Contiene",
                  "empty": "Vacío",
                  "endsWith": "Termina en",
                  "equals": "Igual a",
                  "notEmpty": "No Vacio",
                  "startsWith": "Empieza con",
                  "not": "Diferente de"
              },
              "array": {
                  "not": "Diferente de",
                  "equals": "Igual",
                  "empty": "Vacío",
                  "contains": "Contiene",
                  "notEmpty": "No Vacío",
                  "without": "Sin"
              }
          },
          "data": "Data",
          "deleteTitle": "Eliminar regla de filtrado",
          "leftTitle": "Criterios anulados",
          "logicAnd": "Y",
          "logicOr": "O",
          "rightTitle": "Criterios de sangría",
          "title": {
              "0": "Constructor de búsqueda",
              "_": "Constructor de búsqueda (%d)"
          },
          "value": "Valor"
      },
      "searchPanes": {
          "clearMessage": "Borrar todo",
          "collapse": {
              "0": "Paneles de búsqueda",
              "_": "Paneles de búsqueda (%d)"
          },
          "count": "{total}",
          "countFiltered": "{shown} ({total})",
          "emptyPanes": "Sin paneles de búsqueda",
          "loadMessage": "Cargando paneles de búsqueda",
          "title": "Filtros Activos - %d"
      },
      "select": {
          "1": "%d fila seleccionada",
          "_": "%d filas seleccionadas",
          "cells": {
              "1": "1 celda seleccionada",
              "_": "$d celdas seleccionadas"
          },
          "columns": {
              "1": "1 columna seleccionada",
              "_": "%d columnas seleccionadas"
          }
      },
      "thousands": ".",
      "datetime": {
          "previous": "Anterior",
          "next": "Proximo",
          "hours": "Horas",
          "minutes": "Minutos",
          "seconds": "Segundos",
          "unknown": "-",
          "amPm": [
              "am",
              "pm"
          ]
      },
      "editor": {
          "close": "Cerrar",
          "create": {
              "button": "Nuevo",
              "title": "Crear Nuevo Registro",
              "submit": "Crear"
          },
          "edit": {
              "button": "Editar",
              "title": "Editar Registro",
              "submit": "Actualizar"
          },
          "remove": {
              "button": "Eliminar",
              "title": "Eliminar Registro",
              "submit": "Eliminar",
              "confirm": {
                  "_": "¿Está seguro que desea eliminar %d filas?",
                  "1": "¿Está seguro que desea eliminar 1 fila?"
              }
          },
          "error": {
              "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
          },
          "multi": {
              "title": "Múltiples Valores",
              "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
              "restore": "Deshacer Cambios",
              "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
          }
      },
      "info": "Mostrando _START_ - _END_ de _TOTAL_ registros"
    },
    "responsive": "false",
    "dom": 'Bfrtilp',
    "buttons": [
      {
        "extend": 'excelHtml5',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m383.04 424.43v-298.93h-24.137c-61.992 11.199-123.82 21.559-186.03 32.312v282.74c61.207 10.809 123.2 21.617 184.8 32.816h25.199v-48.941zm-91.168-62.051c-7.7188-16.508-14.488-33.449-20.27-50.734-5.6016 16.406-13.328 31.863-19.656 47.938-8.8477 0-17.695-0.50391-26.543-0.83984 10.359-20.328 20.383-40.824 31.078-60.984-9.0703-20.832-19.098-41.215-28.449-61.879l26.77-1.5156c5.9922 15.793 12.602 31.414 17.586 47.602 5.6016-17.191 13.273-33.602 20.105-49.953 9.1484-0.63281 18.312-1.1953 27.496-1.6797-10.758 22.102-21.602 44.258-32.539 66.473 11.199 22.398 22.398 45.078 33.602 67.703-9.7461-0.78516-19.434-1.3984-29.18-2.1289z"/><path d="m393.23 164.25v21.449h42.84v31.641h-42.84v17.359h42.84v31.641h-42.84v17.359h42.84v31.586h-42.84v17.359h42.84v31.359h-42.84v18.367h42.84v30.633h-42.84v21.449h147.95v-270.2zm115.3 248.98h-62.27v-30.629h62.27zm0-49h-62.27v-31.637h62.27zm0-49h-62.27v-31.582h62.27zm0-49h-62.27v-31.582h62.27zm0-49h-62.27v-31.527h62.27z"/></g></svg>`,
        "titleAttr": 'Exportar a Excel',
        "className": 'btn btn-success'
      },
      {
        "extend": 'pdfHtml5',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" version="1.1" viewBox="0 0 700 700"><g xmlns="http://www.w3.org/2000/svg"><path d="m190.92 4.125c-23.449 0-42.523 19.023-42.523 42.406v466.94c0 23.383 19.074 42.406 42.52 42.406h318.16c23.449 0 42.523-19.023 42.523-42.406v-352.67c0-2.7422-1.0625-5.3789-2.9688-7.3594l-140.57-146.06c-2-2.0781-4.7617-3.2539-7.6484-3.2539h-209.5zm0 21.219h190.91v137.94c0 5.8594 4.75 10.609 10.609 10.609h137.94v339.57c0 11.68-9.5547 21.188-21.297 21.188h-318.16c-11.746 0-21.301-9.5039-21.301-21.188v-466.94c0-11.68 9.5547-21.188 21.301-21.188zm212.13 7.4258 115.39 119.9h-115.39zm-57.367 129.7c-2.6289-0.03125-5.5781 0.30078-8.8711 1.125-8.3125 2.0781-21.688 10.195-17.871 41.219 1.6875 13.707 6.707 31.168 14.145 49.969-4 12.531-8.4531 25.633-12.832 38.512-4.125 12.133-8.3945 24.68-12.191 36.504h-0.003906c-3.0469 9.4883-5.8398 18.457-8.4766 26.938-3.6953 11.883-7.0469 22.652-10.336 32.402-56.73 32.211-79.395 60.109-80.781 77.273-0.56641 6.9727 2.1602 13.035 7.4766 16.625 2.668 1.8008 6.4922 3.3242 11.809 3.3242 5.3438 0 12.195-1.5391 20.883-5.8828 30.621-15.312 45.078-40.629 57.973-76.707 10.895-5.9609 23.238-12.191 37.223-18.645 22.055-10.176 40.836-16.461 56.613-20.156 18.246 19.164 37.547 31.742 55.656 31.742 19.699 0 33.594-6.5117 38.121-17.859 3.3359-8.3672 0.78906-17.672-6.8203-24.887-10.805-10.246-30.027-15.5-54.086-14.812-7.9883 0.23047-16.434 1.1328-25.258 2.6836-19.996-24-39.41-57.328-52.453-88.008 13.367-43.137 18.25-71.324 6.0625-84.562-3.0469-3.3086-8.0898-6.7031-15.984-6.8008zm-0.15625 21.199c0.35938 0.003906 0.54297 0.023437 0.55078 0 0.37891 0.46484 4.2539 6.125-2.7148 35.328-1.582-6.0156-2.7266-11.656-3.3555-16.773-1.5664-12.738 0.68359-17.723 1.9492-18.039 1.8047-0.44922 2.9531-0.51172 3.5664-0.51172zm0.40234 99.945c10.969 22.223 24.48 44.574 39.207 63.48-15.984 4.4648-32.855 10.754-50.195 18.758-6.5508 3.0234-12.812 6.0273-18.777 9 1.207-3.8438 2.4336-7.7852 3.6914-11.816 2.6172-8.418 5.3906-17.328 8.418-26.746h-0.003906c3.7461-11.656 7.9844-24.117 12.082-36.168 1.9336-5.6797 3.7969-11.18 5.582-16.516zm89.035 76.734c19.047-0.30859 29.434 3.9492 32.637 5.5469 4.5195 2.2578 6.25 4.4414 6.7109 5.3359-1.1367 1.2422-6.0703 4.2578-18.211 4.2578-9.0234 0-19.262-5.5078-29.836-14.707 3.0781-0.25391 5.9766-0.39062 8.6953-0.43359zm-158.72 61.656c-8.9922 18.227-19.879 30.883-37.098 39.492-3.7852 1.8945-6.5859 2.8125-8.5312 3.25 3.2539-7.1406 15.152-22.461 45.629-42.742z"/></g></svg>`,
        "titleAttr": 'Exportar a PDF',
        "className": 'btn btn-danger'
      }
      ,
      {
        "extend": 'print',
        "text": `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1" viewBox="0 0 700 700"><g><path d="m525 70c0-19.32-15.68-35-35-35h-280c-19.32 0-35 15.68-35 35v35h350z"/><path d="m560 140h-420c-19.32 0-35 15.68-35 35v210c0 19.32 15.68 35 35 35h35v70c0 19.32 15.68 35 35 35h280c19.32 0 35-15.68 35-35v-70h35c19.32 0 35-15.68 35-35v-210c0-19.32-15.68-35-35-35zm-70 350h-280v-175h280zm35-245h-70v-35h70z"/><path d="m245 420h105v35h-105z"/><path d="m245 350h210v35h-210z"/></g></svg>`,
        "titleAttr": 'Imprimir',
        "className": 'btn btn-info'
      },
    ]
  });
};
// ------------ GENERAR PDFs DE LOS REGISTROS
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
    var item_data = {
      id: $(this).attr('data-id'), 
      codequote: $(this).attr('data-codequote')
    };
    $.ajax({
      url: "controllers/c_list-typequotation-filter.php",
      method: "POST",
      datatype: "JSON",
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      data: {id_codegenrand : item_data['id']},
    }).done((e) => {
      if(e != "" && e != "[]"){      
        var r = JSON.parse(e);
        var tinitidtrans = r[0].f_typetransendinitid;
        var optgenfquotation = r[0].f_optgenfquotation;
        var type_container = r[0].f_type_container;
        if(tinitidtrans == "S-ADU"){
          $.ajax({
            type: 'POST',
            url: 'controllers/c_generate-pdf-adm-aduanas.php',
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
                //var downloadUrl = HTMLMediaElement.srcObject(blob);

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
        }else if(tinitidtrans == "T-MAR"){
          if(optgenfquotation == "y-moreOpts"){
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
          }else if(optgenfquotation == "not-moreOpts"){
            if(type_container == "FCL"){
              $.ajax({
                type: 'POST',
                url: 'controllers/c_generate-pdf-adm-fcl.php',
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
            }else if(type_container == "LCL"){
              $.ajax({
                type: 'POST',
                url: 'controllers/c_generate-pdf-adm-lcl.php',
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
            }else{
              console.log('Lo sentimos, hubo un error al procesar la información.');
            }
          }else{
            console.log('Lo sentimos, hubo un error al procesar la información.');
          }
        }else{
          console.log('Lo sentimos, hubo un error al procesar la información.');
        }
      }else{
        console.log('Lo sentimos, hubo un error al procesar la información.');
      }
    });
  });
});
