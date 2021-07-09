<?php

/* echo "<pre>";
print_r($info);
print_r($tarifas);
echo "</pre>"; */
?>
<div class="panel panel-custom">
  <header class="panel-heading ">
    <div class="panel-title pull-right">UTILIDAD <strong><?php echo $info->utilidad . '%'; ?></strong></div>
    <div class="panel-title"><strong>TARIFAS </strong></div>
    <div class="text-center panel-title"><strong>TARIFAS VIGENTES DEL <strong class="text-green"><?php echo strftime('%d, %B, %Y', strtotime($info->vigencia_desde)); ?></strong> AL <strong class="text-green"><?php echo strftime('%d, %B, %Y', strtotime($info->vigencia_hasta)); ?></strong> </strong></div>
  </header>
  <div class="panel-body">
    <div class="table-responsive">

      <table class="table table-striped DataTables" id="DataTables" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>Item</th>
            <th>Pais Origen</th>
            <th>Puerto Origen</th>
            <th>Puerto Destino</th>
            <th>Hasta 5CBM</th>
            <th>Total</th>
            <th>Hasta 15CBM</th>
            <th>Total</th>
            <th>Mayor a 15CBM</th>
            <th>Total</th>
            <th>Frecnuencia</th>
            <th>tt_aprox</th>
            <th>Cooloder</th>
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
              <td><?php echo $tarifa->hasta_5; ?></td>
              <td><?php echo $tarifa->total_5; ?></td>
              <td><?php echo $tarifa->hasta_15; ?></td>
              <td><?php echo $tarifa->total_15; ?></td>
              <td><?php echo $tarifa->mayor_15; ?></td>
              <td><?php echo $tarifa->total_mayor15; ?></td>
              <td><?php echo $tarifa->frecuencia; ?></td>
              <td><?php echo $tarifa->tt_aprox; ?></td>
              <td><?php echo $cooloder; ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>