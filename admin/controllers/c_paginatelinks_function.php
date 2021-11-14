<?php
function paginate($currpage, $totalpages, $adjacents){
  $prevlabel = "&lsaquo;";
  $nextlabel = "&rsaquo;";
  $out = '<ul id="paginador" class="cont_listpagination--m-paginator">';
  
  /*********************** PÁGINA ANTERIOR ************************/
  if($currpage == 1){
    $out .= "<li class='prev-disabledlink'><span><a>$prevlabel</a></span></li>";
  } else if($currpage == 2) {
    $out .= "<li><span><a href='javascript:void(0);' data-pagina='1'>$prevlabel</a></span></li>";
  }else {
    $out .= "<li><span><a href='javascript:void(0);' data-pagina='".($currpage - 1)."'>$prevlabel</a></span></li>";
  }
  
  /*********************** PRIMERA PÁGINA ************************/
  if($currpage > ($adjacents + 1)) {
    $out .= "<li><a href='javascript:void(0);' data-pagina='1'>1</a></li>";
  }

  /*********************** INTERVALOS ************************/
  if($currpage > ($adjacents + 2)) {
    $out .= "<li class='between-defaultlink'><a>...</a></li>";
  }

  /*********************** PÁGINAS ************************/
  $pmin = ($currpage > $adjacents) ? ($currpage - $adjacents) : 1;
  $pmax = ($currpage < ($totalpages - $adjacents)) ? ($currpage + $adjacents) : $totalpages;
  for($i = $pmin; $i <= $pmax; $i++) {
    if($i == $currpage) {
      $out .= "<li class='active'><a class='actual'>$i</a></li>";
    }else if($i == 1) {
      $out .= "<li><a href='javascript:void(0);' data-pagina='1'>$i</a></li>";
    }else {
      $out .= "<li><a href='javascript:void(0);' data-pagina='".$i."'>$i</a></li>";
    }
  }

  /*********************** INTERVALOS ************************/
  if($currpage < ($totalpages - $adjacents - 1)) {
    $out .= "<li class='between-defaultlink'><a>...</a></li>";
  }

  /*********************** ÚLTIMA PÁGINA ************************/
  if($currpage < ($totalpages - $adjacents)) {
    $out .= "<li><a href='javascript:void(0);' data-pagina='$totalpages'>$totalpages</a></li>";
  }

  /*********************** SIGUIENTE PÁGINA ************************/
  if($currpage < $totalpages) {
    $out .= "<li><span><a href='javascript:void(0);' data-pagina='".($currpage + 1)."'>$nextlabel</a></span></li>";
  }else {
    $out .= "<li class='next-disabledlink'><span><a>$nextlabel</a></span></li>";
  }
  
  $out .= '</ul>';
  return $out;
}