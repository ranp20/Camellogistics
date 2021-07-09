<?php

/* echo "<pre>";
print_r($info);
print_r($tarifas);
echo "</pre>"; */
?>
<div class="panel panel-custom">
  <header class="panel-heading ">
    <div class="panel-title pull-right">UTILIDAD <strong><?php echo $info->utilidad.'%'; ?></strong></div>
    <div class="panel-title"><strong>TARIFAS </strong></div>
    <div class="text-center panel-title"><strong>TARIFAS VIGENTES DEL <strong class="text-green"><?php echo strftime('%d, %B, %Y', strtotime( $info->vigencia_desde )) ; ?></strong> AL <strong class="text-green"><?php echo strftime('%d, %B, %Y', strtotime( $info->vigencia_hasta )); ?></strong> </strong></div>
  </header>
  <div class="panel-body">
    <div class="table-responsive">

      <table class="table table-striped DataTables" id="DataTables" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th >Item</th>
            <th >Pais Origen</th>
            <th >Puerto Origen</th>
            <th >Puerto Destino</th>
            <th >Contenedor</th>
            <th >Monto</th>
            <th >Total</th>
            <th >Naviera</th>
            <th >Cooloder</th>
          </tr>

        </thead>
        <tbody>
          <?php
          foreach ($tarifas as $key => $tarifa) :
            $cooloder = implode("/", json_decode($tarifa->cooloder));
          ?>
            <tr>
              <td><?php echo $key + 1; ?></td>
              <td><?php echo $tarifa->pais_origen; ?></td>
              <td><?php echo $tarifa->puerto_origen; ?></td>
              <td><?php echo $tarifa->puerto_destino; ?></td>
              <td><?php echo $tarifa->contenedor_tipo; ?></td>
              <td><?php echo $tarifa->monto; ?></td>
              <td><?php echo $tarifa->total; ?></td>
              <td><?php echo $tarifa->naviera; ?></td>
              <td><?php echo $cooloder; ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>