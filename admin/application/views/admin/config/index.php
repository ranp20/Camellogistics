<?php echo message_box('error') ?>
<?php echo message_box('success') ?>

<div class="row">
    <!-- Start Form -->
    <div class="col-lg-12">
        <form role="form" id="form" action="<?php echo base_url(); ?>admin/config/save_configs" method="post"
              class="form-horizontal  ">
            <section class="panel panel-custom">
                <?php
                ?>
                    <header class="panel-heading  "> Precios</header>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Emision de BL/EWB <span
                                    class="text-danger">*</span></label>
                            <div class="col-lg-2">
                                <input type="text" name="emision_bl_ewb" class="form-control"
                                       value="<?= $this->config->item('emision_bl_ewb') ?>" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Handling <span
                                    class="text-danger">*</span></label>
                            <div class="col-lg-2">
                                <input type="text" name="handling" class="form-control"
                                       value="<?= $this->config->item('handling') ?>" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Visto Bueno </label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('visto_bueno') ?>"
                                       name="visto_bueno">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Desconsolidación<span
                                    class="text-danger">*</span></label>
                            <div class="col-lg-2">
                            <input type="text" class="form-control" name="desconsolidacion"
                                      value="<?= $this->config->item('desconsolidacion') ?>">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Almacen Referencial</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('almacen_referencial') ?>"
                                       name="almacen_referencial">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Transporte Interno </label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('transporte_interno') ?>" name="transporte_interno">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Aforo Fisico y previo</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('aforo_fisico_previo') ?>"
                                       name="aforo_fisico_previo">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Gremios Maritimos</label>
                            <div class="col-lg-2">
                                <input type="email" class="form-control"
                                       value="<?= $this->config->item('gremios_maritimos') ?>"
                                       name="gremios_maritimos">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">THC</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('thc') ?>"
                                       name="thc">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Devolucion de Contenedores</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('devolucion_contenedores') ?>"
                                       name="devolucion_contenedores">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Derechos de Embarque</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('derechos_embarque') ?>"
                                       name="derechos_embarque">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Consolidación</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('consolidacion') ?>"
                                       name="consolidacion">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 control-label">Bohe e Inspeccion</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('bohe_inspeccion') ?>"
                                       name="bohe_inspeccion">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 control-label">Comision de Agencia</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('comision_agencia') ?>"
                                       name="comision_agencia">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 control-label">Gastos Operativos</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('gastos_operativos') ?>"
                                       name="gastos_operativos">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-lg-3 control-label">Estiba</label>
                            <div class="col-lg-2">
                                <input type="text" class="form-control"
                                       value="<?= $this->config->item('estiba') ?>"
                                       name="estiba">
                            </div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-lg-3"></label>
                        <div class="col-lg-2">
                            <button type="submit" class="btn btn-sm btn-primary">Guardar Cambios</button>
                        </div>
                    </div>
                    <?php
                ?>
            </section>
        </form>
    </div>
    <!-- End Form -->
</div>