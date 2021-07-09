<?= message_box('success'); ?>
<?= message_box('error'); ?>
<div class="panel panel-custom">
  <header class="panel-heading">
    <div class="panel-title"><strong><?= $title ?></strong>
      <div class="pull-right hidden-print">
        
      </div>

    </div>
  </header>
  <div class="panel-body">
    <form role="form" enctype="multipart/form-data" id="form_import" action="<?php echo base_url(); ?>admin/tarifa_transporte/save_imported" method="post" class="form-horizontal  ">
      <div class="panel-body">
        <div class="form-group">
          <label for="field-1" class="col-sm-3 control-label">
            Selecione Archivo<span class="required">*</span></label>
          <div class="col-sm-5">
            <div style="display: inherit;margin-bottom: inherit" class="fileinput fileinput-new" data-provides="fileinput">
              <span class="btn btn-default btn-file"><span class="fileinput-new">Seleccione Archivo</span>
                <span class="fileinput-exists">Cambiar</span>
                <input type="file" name="upload_file" required>
              </span>
              <span class="fileinput-filename"></span>
              <a href="#" class="close fileinput-exists" data-dismiss="fileinput" style="float: none;">&times;</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-lg-3 control-label"></label>
          <div class="col-lg-6">
            <button type="submit" class="btn btn-sm btn-primary"></i> Procesar Información</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>