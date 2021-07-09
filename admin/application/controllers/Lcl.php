<?php

/**
 * [Tarifa description]
 */
class Lcl extends Admin_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('tarifa_model');
  }
  /**
   * Listando las vigencias con su respectivo % utilidad
   *
   * @return void
   */
  public function index()
  {
    $data['title'] = 'TARIFAS LCL';
    $data['subview'] = $this->load->view('admin/lcl/index', $data, TRUE);
    $this->load->view('admin/_layout_main', $data);
  }

  public function import()
  {
    $data['title'] = 'Importando Información LCL';

    $data['subview'] = $this->load->view('admin/lcl/import', $data, TRUE);
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
        if (!empty($this->input->post('utilidad')) && !empty($this->input->post('start_date'))  && !empty($this->input->post('end_date'))) :
          //All data from excel
          $row = 4; // el numero de fila desde donde empiezan los datos a registrar 
          $sheetData = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);
          if (empty(trim($sheetData[$row]["A"]))) :
            $type = 'error';
            $message = 'Archivo no contienen Informacion';
          else :

            $data_carga_lcl = [
              'vigencia_desde' => $this->input->post('start_date'),
              'vigencia_hasta' => $this->input->post('end_date'),
              'utilidad' => $this->input->post('utilidad'),
            ];
            $this->tarifa_model->_table_name = 'tbl_aq_carga_lcl';
            $this->tarifa_model->_primary_key = "carga_lcl_id";
            $carga_lcl_id = $this->tarifa_model->save($data_carga_lcl);
            $data['carga_lcl_id'] = $carga_lcl_id;
            for ($x = $row; $x <= count($sheetData); $x++) {
              if (!empty($sheetData[$x]["A"]) && !empty($sheetData[$x]["B"])) :
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


                $data['hasta_5'] = trim( str_replace('USD', '', $sheetData[$x]["E"]) );
                $data['total_5'] = trim( str_replace('USD', '', $sheetData[$x]["F"]) );
                $data['hasta_15'] = trim( str_replace('USD', '', $sheetData[$x]["G"]) );
                $data['total_15'] = trim( str_replace('USD', '', $sheetData[$x]["H"]) );
                $data['mayor_15'] = trim( str_replace('USD', '', $sheetData[$x]["I"]) );
                $data['total_mayor15'] = trim( str_replace('USD', '', $sheetData[$x]["J"]) );

                /**
                 * Frecuencia
                 */
                $this->tarifa_model->_table_name = 'tbl_aq_frecuencias';
                $this->tarifa_model->_primary_key = "frecuencia_id";

                $frec = trim($sheetData[$x]["K"]);
                if ($frecuencia = $this->db->where(['frecuencia' => $frec])->get('tbl_aq_frecuencias')->row()) {
                  $id_frecuencia = $frecuencia->frecuencia_id;
                } else {
                  $data_frecuencia = ['frecuencia' => $frec];
                  $id_frecuencia = $this->tarifa_model->save($data_frecuencia);
                }
                $data['frecuencia_id'] = $id_frecuencia;

                $data['tt_aprox'] = trim($sheetData[$x]["L"]);

                $cooloder = str_replace(' ', '', trim($sheetData[$x]["M"]));
                $cooloder = explode('/', $cooloder);
                $cooloder = json_encode($cooloder);
                $data['cooloder'] = $cooloder;

                /**
                 * AGREGAR INFORMACION SEGUN SEA EL CASO DE ARCHIVO
                 */

                // die();
                $this->tarifa_model->_table_name = 'tbl_aq_carga_lcl_detail';
                $this->tarifa_model->_primary_key = "carga_lcl_detail_id";
                $id_contenedor_tarifa = $this->tarifa_model->save($data);
              endif;
            }
            $type = 'success';
            $message = 'Datos importados con exito';
          endif;
        else :
          $type = 'error';
          $message = 'Campos vacios';
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
    redirect('admin/lcl');
  }


  public function vigenciasList( $type = NULL )
  {
    if ($this->input->is_ajax_request()) {
      $this->load->model('datatables');
      $this->datatables->table         = 'tbl_aq_carga_lcl c';
      $this->datatables->join_table    = array(
        
      );
      $this->datatables->join_where    = array(
        
      );

      $this->datatables->column_search = array('c.carga_lcl_id','c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
      $this->datatables->column_order  = array('c.carga_lcl_id','c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
      $this->datatables->order         = array('c.carga_lcl_id' => 'desc');
      $where = NULL;
      if (!empty($type)) {
        // $where = array('pao.pais_id' => $type);
        $where = NULL;
      } else {
        $where = null;
      }

      $fetch_data = make_datatables($where);
      $data = array();
      foreach ($fetch_data as $_key => $carga) {
        $action = null;
        $sub_array = array();

        $sub_array[] = $_key + 1;
        $sub_array[] = '<strong>'.$carga->utilidad.'%</strong>';
        $sub_array[] = $carga->vigencia_desde;
        $sub_array[] = $carga->vigencia_hasta;

        $action .= '<a data-toggle="modal" data-target="#myModal_large"
       title="VER DETALLE DE TARIFAS"
       href="' . base_url() . 'admin/lcl/tarifas/' . $carga->carga_lcl_id . '"
       class="btn btn-xs btn-purple"><i class="fa fa-list"></i></a>' . ' ';
        $sub_array[] = $action;
        $data[] = $sub_array;
      }
      render_table($data, $where);
    } else {
      redirect('admin/dashboard');
    }
  }
  
  /**
   * Undocumented function
   *
   * @param integer $id
   * @return void
   */
  public function tarifas( int $id ){
    $data['title'] = 'TARIFAS LCL';
    $data['info'] = $this->db->where( ['carga_lcl_id' => $id] )->get( 'tbl_aq_carga_lcl' )->row();

    $this->db->select('c.*, f.*, po.puerto as "puerto_origen", pao.pais as "pais_origen", pd.puerto as "puerto_destino", pad.pais as "pais_destino"');
    $this->db->from('tbl_aq_carga_lcl_detail c');
    $this->db->join( 'tbl_aq_frecuencias f', 'c.frecuencia_id = f.frecuencia_id' );
    $this->db->join( 'tbl_aq_puertos po', 'c.puerto_origen_id = po.puerto_id' );
    $this->db->join( 'tbl_aq_paises pao', 'po.pais_id = pao.pais_id' );
    $this->db->join( 'tbl_aq_puertos pd', 'c.puerto_destino_id = pd.puerto_id' );
    $this->db->join( 'tbl_aq_paises pad', 'pd.pais_id = pad.pais_id' );
    $data['tarifas'] = $this->db->where( ['c.carga_lcl_id' => $id] )->get()->result();
    $data['subview'] = $this->load->view('admin/lcl/tarifas', $data, FALSE);
    $this->load->view('admin/_layout_modal_large', $data);
  }

}

