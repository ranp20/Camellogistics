<?php
/* INSERT INTO `tbl_config` (`config_key`, `value`) VALUES ('utilidad_transporte', '5'); */
?>
<?php echo message_box('success'); ?>
<?php echo message_box('error'); ?>
<?php
?>



<div class="panel panel-custom">
  <header class="panel-heading ">
    <div class="pull-right">
      <a href="<?= base_url() . 'admin/tarifa_transporte/import' ?>" class="btn btn-success" data-toggle="modal" data-target="#myModal"> Importar </a>
    </div>
    <div class="panel-title"><strong><?php echo $title; ?></strong></div>
  </header>
  <form role="form" enctype="multipart/form-data" id="form_import" action="<?php echo base_url(); ?>admin/settings/utilidad_transporte_saved" method="post" class="form-inline  ">

    <div class="text-center ">UTILIDAD:
      <div class="form-group">
        <div class="input-group ">
          <input type="text" class="form-control" name="utilidad_transporte" id="utilidad_transporte" value="<?php echo $utilidad = config_item('utilidad_transporte'); ?>">
          <span class="input-group-addon">%</span>
          <span class="input-group-btn ">
          <input type="submit" class="btn btn-success" value="Actualizar Utilidad">
          </span>
        </div>
      </div>
    </div>
  </form>
  <div class="table-responsive">

    <table class="table table-bordered table-striped " id="" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th class="col-sm-1">Item</th>
          <th class="col-sm-1">Zona</th>
          <th class="col-sm-1">Distritos</th>
          <th class="col-sm-1">Peso Min</th>
          <th class="col-sm-1">Peso Max</th>
          <th class="col-sm-1">Precio</th>
          <th class="col-sm-1">Total</th>
        </tr>

      </thead>
      <tbody>
        <?php
        $item = 1;
        foreach ($zonas as $key => $zona) :
          $rows = count($precios[$zona->zona_id]);
        ?>
          <tr>
            <td rowspan="<?php echo $rows + 1; ?>"><?php echo $item; ?></td>
            <td rowspan="<?php echo $rows + 1; ?>"><?php echo $zona->zona; ?></td>
            <td rowspan="<?php echo $rows + 1; ?>"><?php echo implode(' - ', $distritos[$zona->zona_id]); ?></td>
          </tr>

          <?php foreach ($precios[$zona->zona_id] as $keyp => $precio) : ?>
            <tr>
              <td><?php echo $precio->peso_min; ?></td>
              <td><?php echo $precio->peso_max; ?></td>
              <td align="right"><?php echo 'USD ' . display_money( $precio->precio ); ?></td>
              <td align="right"><strong class="text-success h4"><?php echo 'USD ' . display_money($precio->precio + ($precio->precio * ($utilidad / 100))); ?></strong></td>

            </tr>
          <?php endforeach; ?>
        <?php
          $item++;
        endforeach; ?>

      </tbody>
    </table>

  </div>
</div>


<script>
  // $(function () {
  $(document).on('mouseenter', '[data-toggle="popover"]', function() {
    console.info('click')
    console.info('popover')
    $(this).popover({
      trigger: 'hover'
    })
    $(this).popover('show')
  })
  $(document).on('mouseenter', '[data-toggle="tooltip"]', function() {
    $('[data-toggle="tooltip"]').tooltip({
      'html': true
    })
    $(this).tooltip('show')
  })
</script>