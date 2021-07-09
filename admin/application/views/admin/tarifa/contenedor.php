<?php echo message_box('success'); ?>
<?php echo message_box('error'); ?>
<?php

?>



<div class="panel panel-custom">
    <header class="panel-heading ">
        <div class="panel-title"><strong>TARIFAS </strong></div>
    </header>

    <div class="table-responsive">
        
                <table class="table table-striped DataTables" id="DataTables" cellspacing="0" width="100%">
                    <thead>
                        <tr>


                            <th class="col-sm-1">Item</th>
                            <th class="col-sm-1">Pais Origen</th>
                            <th class="col-sm-1">Puerto Origen</th>
                            <th class="col-sm-1">Pais Destino</th>
                            <th class="col-sm-1">Puerto Destino</th>
                            <th class="col-sm-1">Contenedor</th>
                            <th class="col-sm-1">Costo</th>
                            <th class="col-sm-1">Moneda</th>
                            <th class="col-sm-1">Naviera</th>
                            <th class="col-sm-1">Viegencia Desde</th>
                            <th class="col-sm-1">Viegencia Hasta</th>
                            <th class="col-sm-1">Fecha Actualizacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <script type="text/javascript">
                            $(document).ready(function() {
                                list = base_url + "admin/tarifa/ContenedorList/";
                                $('.filtered > .dropdown-toggle').on('click', function() {
                                    if ($('.group').css('display') == 'block') {
                                        $('.group').css('display', 'none');
                                    } else {
                                        $('.group').css('display', 'block')
                                    }
                                });
                                $('.filter_by').on('click', function() {
                                    $('.filter_by').removeClass('active');
                                    $('.group').css('display', 'block');
                                    $(this).addClass('active');
                                    var filter_by = $(this).attr('id');
                                    if (filter_by) {
                                        filter_by = filter_by;
                                    } else {
                                        filter_by = '';
                                    }
                                    table_url(list + filter_by);
                                });

                            });
                        </script>
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