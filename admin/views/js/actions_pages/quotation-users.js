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
          </tr>
        `;
      }
    });
    
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
      out += "<li><a>...</a></li>";
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
      out += `<li><a>...</a></li>`;
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