<?php

/**
 * [Tarifa description]
 */
class Tarifa extends Admin_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('tarifa_model');
  }
  public function index(){
    redirect('admin/tarifa/import');
  }
  public function contenedor()
  {
    $data['title'] = 'Tarifas';
    $data['page'] = 'Tarifas';
    // si es comercial para generar la orden

    $data['subview'] = $this->load->view('admin/tarifa/contenedor', $data, TRUE); //TRUE ES CUANDO SE DEVUELVEN COMO DATOS LA VIEW 
    $this->load->view('admin/_layout_main', $data);
  }
  public function import()
  {
    $data['title'] = 'Importando Información';
    // get all country
    $data['tipos_transportes'] = tipo_transporte();

    $data['subview'] = $this->load->view('admin/tarifa/import_tarifas', $data, TRUE);
    $this->load->view('admin/_layout_main', $data); //page load
  }

  public function save_imported()
  {
    //load the excel library
    $this->load->library('excel');
    ob_start();
    $file = $_FILES["upload_file"]["tmp_name"];
    if (!empty($file)) {
      $valid = false;
      $types = array('Excel2007', 'Excel5', 'CSV');
      foreach ($types as $type) {
        $reader = PHPExcel_IOFactory::createReader($type);
        if ($reader->canRead($file)) {
          $valid = true;
        }
      }
      if (!empty($valid)) {
        try {
          $objPHPExcel = PHPExcel_IOFactory::load($file);
        } catch (Exception $e) {
          die("Error loading file :" . $e->getMessage());
        }
        //All data from excel
        $sheetData = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);
        if (empty(trim($sheetData[2]["A"]))) :
          $type = 'error';
          $message = 'Archivo no contienen Informacion';
        else :
          for ($x = 2; $x <= count($sheetData); $x++) {
            // **********************
            // Save Into PAIS table
            // **********************

            $this->tarifa_model->_table_name = 'tbl_aq_paises';
            $this->tarifa_model->_primary_key = "pais_id";
            if ($pais = $this->db->where(['pais' => trim($sheetData[$x]["A"])])->get('tbl_aq_paises')->row()) {
              $id_pais_origen = $pais->pais_id;
            } else {
              $data_pais = ['pais' => trim($sheetData[$x]["A"])];
              $id_pais_origen = $this->tarifa_model->save($data_pais);
            }

            if ($pais = $this->db->where(['pais' => trim($sheetData[$x]["C"])])->get('tbl_aq_paises')->row()) {
              $id_pais_destino = $pais->pais_id;
            } else {
              $data_pais = ['pais' => trim($sheetData[$x]["C"])];
              $id_pais_destino = $this->tarifa_model->save($data_pais);
            }

            /**
             * SAVE INTO PUERTOS
             */
            $this->tarifa_model->_table_name = 'tbl_aq_puertos';
            $this->tarifa_model->_primary_key = "puerto_id";
            if ($puerto = $this->db->where(['puerto' => trim($sheetData[$x]["B"]), 'pais_id' => $id_pais_origen])->get('tbl_aq_puertos')->row()) {
              $id_puerto_origen = $puerto->puerto_id;
            } else {
              $data_pais = [
                'puerto' => trim($sheetData[$x]["B"]),
                'pais_id' => $id_pais_origen
              ];
              $id_puerto_origen = $this->tarifa_model->save($data_pais);
            }
            $data['puerto_origen_id'] = $id_puerto_origen;
            if ($puerto = $this->db->where(['puerto' => trim($sheetData[$x]["D"]), 'pais_id' => $id_pais_destino])->get('tbl_aq_puertos')->row()) {
              $id_puerto_destino = $puerto->puerto_id;
            } else {
              $data_pais = [
                'puerto' => trim($sheetData[$x]["D"]),
                'pais_id' => $id_pais_destino
              ];
              $id_puerto_destino = $this->tarifa_model->save($data_pais);
            }
            $data['puerto_destino_id'] = $id_puerto_destino;

            /**
             * AGREGAR INFORMACION SEGUN SEA EL CASO DE ARCHIVO
             */
            if ($this->input->post('transporte_tipo_id') == 1) :
              /**
               * CARGA SUELTA
               */

              /**
               *  Volumen minimo volumendesde hasta
               */
              $data['volumen_minimo'] = trim($sheetData[$x]["E"]);
              $data['volumen_desde'] = trim($sheetData[$x]["F"]);
              $data['volumen_hasta'] = trim($sheetData[$x]["G"]);

              /**
               *  costo minimo y costo 
               */
              $data['coto_minimo'] = trim($sheetData[$x]["H"]);
              $data['coto'] = trim($sheetData[$x]["I"]);

               /**
               * MONEDA 
               */
              $this->tarifa_model->_table_name = 'tbl_aq_moneda';
              $this->tarifa_model->_primary_key = "moneda_id";
              $monedas = ['DOLAR', 'DOLARES', 'DÓLAR'];
              $moneda = (in_array(trim($sheetData[$x]["J"]), $monedas)) ? 'DOLAR' : '';
              if ($contenedor = $this->db->where(['moneda' => $moneda])->get('tbl_aq_moneda')->row()) {
                $id_moneda = $contenedor->moneda_id;
              } else {
                $data_moneda = ['moneda' => $moneda];
                $id_moneda = $this->tarifa_model->save($data_moneda);
              }
              $data['moneda_id'] = $id_moneda;

               /**
               * SERVICIO ED TARIFA CARGA SUELTA 
               */
              $this->tarifa_model->_table_name = 'tbl_aq_servicios';
              $this->tarifa_model->_primary_key = "servicio_id";

              $servicio = trim($sheetData[$x]["K"]);
              if ($contenedor = $this->db->where(['servicio' => $servicio])->get('tbl_aq_servicios')->row()) {
                $id_servicio = $contenedor->servicio_id;
              } else {
                $data_servicio = ['servicio' => $servicio];
                $id_servicio = $this->tarifa_model->save($data_servicio);
              }
              $data['servicio_id'] = $id_servicio;

               /**
               * Frecuencia
               */
              $this->tarifa_model->_table_name = 'tbl_aq_frecuencias';
              $this->tarifa_model->_primary_key = "frecuencia_id";

              $frecuencia = trim($sheetData[$x]["L"]);
              if ($frecuencia = $this->db->where(['frecuencia' => $frecuencia])->get('tbl_aq_frecuencias')->row()) {
                $id_frecuencia = $frecuencia->frecuencia_id;
              } else {
                $data_frecuencia = ['frecuencia' => $frecuencia];
                $id_frecuencia = $this->tarifa_model->save($data_frecuencia);
              }
              $data['frecuencia_id'] = $id_frecuencia;

              /**
               *  tt_aprox y recargos
               */
              $data['tt_aprox'] = trim($sheetData[$x]["M"]);
              $data['recargos'] = trim($sheetData[$x]["N"]);

              /**
               * Agente
               */
              $this->tarifa_model->_table_name = 'tbl_aq_agentes';
              $this->tarifa_model->_primary_key = "agente_id";

              $agente = trim($sheetData[$x]["O"]);
              if ($agente = $this->db->where(['agente' => $agente])->get('tbl_aq_agentes')->row()) {
                $id_agente = $agente->agente_id;
              } else {
                $data_agente = ['agente' => $agente];
                $id_agente = $this->tarifa_model->save($data_agente);
              }
              $data['agente_id'] = $id_agente;

              /**
               *  vigencias
               */
              $data['vigencia_desde'] = trim($sheetData[$x]["P"]);
              $data['vigencia_hasta'] = trim($sheetData[$x]["Q"]);

              $data['tarifario_activo'] = trim($sheetData[$x]["R"]);
              $data['puerto_origen_activo'] = trim($sheetData[$x]["S"]);
              $data['fecha_registro'] = trim($sheetData[$x]["T"]);

              $this->tarifa_model->_table_name = 'tbl_aq_carga_suelta_tarifas';
              $this->tarifa_model->_primary_key = "carga_suelta_tarifa_id";
              $id_carga_suelta_tarifa = $this->tarifa_model->save($data);


            elseif ($this->input->post('transporte_tipo_id') == 2) :
              /**
               * CONTENEDOR
               */
              $this->tarifa_model->_table_name = 'tbl_aq_contenedor_tipo';
              $this->tarifa_model->_primary_key = "contenedor_tipo_id";
              if ($contenedor = $this->db->where(['contenedor_tipo' => trim($sheetData[$x]["E"])])->get('tbl_aq_contenedor_tipo')->row()) {
                $id_contenedor_tipo = $contenedor->contenedor_tipo_id;
              } else {
                $data_contenedor = ['contenedor_tipo' => trim($sheetData[$x]["E"])];
                $id_contenedor_tipo = $this->tarifa_model->save($data_contenedor);
              }
              $data['contenedor_tipo_id'] = $id_contenedor_tipo;
              $data['costo'] = trim($sheetData[$x]["F"]);

              /**
               * MONEDA 
               */
              $this->tarifa_model->_table_name = 'tbl_aq_moneda';
              $this->tarifa_model->_primary_key = "moneda_id";
              $monedas = ['DOLAR', 'DOLARES', 'DÓLAR'];
              $moneda = (in_array(trim($sheetData[$x]["G"]), $monedas)) ? 'DOLAR' : '';
              if ($contenedor = $this->db->where(['moneda' => $moneda])->get('tbl_aq_moneda')->row()) {
                $id_moneda = $contenedor->moneda_id;
              } else {
                $data_moneda = ['moneda' => $moneda];
                $id_moneda = $this->tarifa_model->save($data_moneda);
              }

              $data['moneda_id'] = $id_moneda;
              /**
               * NAVIERA 
               */
              $this->tarifa_model->_table_name = 'tbl_aq_naviera';
              $this->tarifa_model->_primary_key = "naviera_id";
              if ($contenedor = $this->db->where(['naviera' => trim($sheetData[$x]["H"])])->get('tbl_aq_naviera')->row()) {
                $id_naviera = $contenedor->naviera_id;
              } else {
                $data_naviera = ['naviera' => trim($sheetData[$x]["H"])];
                $id_naviera = $this->tarifa_model->save($data_naviera);
              }
              $data['naviera_id'] = $id_naviera;
              $data['vigencia_desde'] = trim($sheetData[$x]["I"]);
              $data['vigencia_hasta'] = trim($sheetData[$x]["J"]);
              $data['fecha_actualizacion'] = trim($sheetData[$x]["K"]);
              // print_r($data );
              // die();
              $this->tarifa_model->_table_name = 'tbl_aq_contenedor_tarifas';
              $this->tarifa_model->_primary_key = "contenedor_tarifa_id";
              $id_contenedor_tarifa = $this->tarifa_model->save($data);

            elseif ($this->input->post('transporte_tipo_id') == 3) :
              /**
               * AEREA
               */
            endif;
          }
        endif;
      } else {
        $type = 'error';
        $message = "Sorry your uploaded file type not allowed ! please upload XLS/CSV File ";
      }
    } else {
      $type = 'error';
      $message = "You did not Select File! please upload XLS/CSV File ";
    }

    set_message($type, $message);
    redirect('admin/tarifa/import');
  }

  public function ContenedorList($type = NULL)
  {
    if ($this->input->is_ajax_request()) {
      $this->load->model('datatables');
      $this->datatables->select = '
          cot.contenedor_tarifa_id, 
          pao.pais as "pais_origen", 
          cot.puerto_origen_id, 
          puo.puerto as "puerto_origen", 
          pad.pais as "pais_destino", 
          cot.puerto_destino_id, 
          pud.puerto as "puerto_destino", 
          cti.contenedor_tipo, 
          cot.costo, 
          mon.moneda, 
          na.naviera, 
          cot.vigencia_desde, 
          cot.vigencia_hasta, 
          cot.fecha_actualizacion, 
          cot.date_upload
        ';
      $this->datatables->table         = 'tbl_aq_contenedor_tarifas cot';
      $this->datatables->join_table    = array(
        'tbl_aq_contenedor_tipo cti',
        'tbl_aq_puertos puo',
        'tbl_aq_puertos pud',
        'tbl_aq_paises pao',
        'tbl_aq_paises pad',
        'tbl_aq_moneda mon',
        'tbl_aq_naviera na',
      );
      $this->datatables->join_where    = array(
        'cot.contenedor_tipo_id = cti.contenedor_tipo_id',
        'cot.puerto_origen_id = puo.puerto_id',
        'cot.puerto_destino_id = pud.puerto_id',
        'puo.pais_id = pao.pais_id',
        'pud.pais_id = pad.pais_id',
        'cot.moneda_id = mon.moneda_id',
        'cot.naviera_id = na.naviera_id',
      );

      $this->datatables->column_search = array('cot.pais_origen_id');
      $this->datatables->column_order  = array('cot.pais_origen_id');
      $this->datatables->order         = array('cot.contenedor_tarifa_id' => 'desc');
      $where = NULL;
      if (!empty($type)) {
        // $where = array('pao.pais_id' => $type);
        $where = NULL;
      } else {
        $where = null;
      }

      $fetch_data = make_datatables($where);
      /* echo "<pre>";
      print_r($fetch_data);
      echo "</pre>";
      die(); */
      $data = array();
      foreach ($fetch_data as $_key => $tarifa) {
        $action = null;
        $sub_array = array();

        $sub_array[] = $_key + 1;
        /* $this->db->select('*');
        $this->db->from('tbl_aq_puertos');
        $this->db->join('tbl_aq_paises', 'tbl_aq_puertos.pais_id = tbl_aq_paises.pais_id'); 
        $data_puerto_origen = $this->db->where(['tbl_aq_puertos.puerto_id' => $tarifa->puerto_origen_id])->get()->row();*/
        $sub_array[] = $tarifa->pais_origen;
        $sub_array[] = $tarifa->puerto_origen;

        /* $this->db->select('*');
        $this->db->from('tbl_aq_puertos');
        $this->db->join('tbl_aq_paises', 'tbl_aq_puertos.pais_id = tbl_aq_paises.pais_id');
        $data_puerto_destino = $this->db->where(['tbl_aq_puertos.puerto_id' => $tarifa->puerto_destino_id])->get()->row(); */

        $sub_array[] = $tarifa->pais_destino;
        $sub_array[] = $tarifa->puerto_destino;
/* 
        $data_contenedor_tipo = $this->db->where(['contenedor_tipo_id' => $tarifa->contenedor_tipo_id])->get('tbl_aq_contenedor_tipo')->row();
         */
        $sub_array[] = $tarifa->contenedor_tipo;
        $sub_array[] = $tarifa->costo;

        /* $data_moneda = $this->db->where(['moneda_id' => $tarifa->moneda_id])->get('tbl_aq_moneda')->row(); */

        $sub_array[] = $tarifa->moneda;
        // $data_naviera = $this->db->where(['naviera_id' => $tarifa->naviera_id])->get('tbl_aq_naviera')->row();
        $sub_array[] = $tarifa->naviera;
        $sub_array[] = $tarifa->vigencia_desde;
        $sub_array[] = $tarifa->vigencia_hasta;
        $sub_array[] = $tarifa->fecha_actualizacion;

        $sub_array[] = $action;
        $data[] = $sub_array;
      }
      render_table($data, $where);
    } else {
      redirect('admin/dashboard');
    }
  }
}

/* 
10 con pellejo 
1 1/2 costilla  */