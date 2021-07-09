<?php

/**
 * [Tarifa description]
 */
class Fcl extends Admin_Controller
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
    $data['title'] = 'TARIFAS FCL';
    $data['subview'] = $this->load->view('admin/fcl/index', $data, TRUE);
    $this->load->view('admin/_layout_main', $data);
  }

  public function import()
  {
    $data['title'] = 'Importando Información fcl';

    $data['subview'] = $this->load->view('admin/fcl/import', $data, TRUE);
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

            $data_carga_fcl = [
              'vigencia_desde' => $this->input->post('start_date'),
              'vigencia_hasta' => $this->input->post('end_date'),
              'utilidad' => $this->input->post('utilidad'),
            ];
            $this->tarifa_model->_table_name = 'tbl_aq_carga_fcl';
            $this->tarifa_model->_primary_key = "carga_fcl_id";
            $carga_fcl_id = $this->tarifa_model->save($data_carga_fcl);
            $data['carga_fcl_id'] = $carga_fcl_id;
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

                $data['monto'] = trim(str_replace(',', '', str_replace('USD', '', $sheetData[$x]["F"])));
                $data['total'] = trim(str_replace(',', '', str_replace('USD', '', $sheetData[$x]["G"])));

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



                $cooloder = str_replace(' ', '', trim($sheetData[$x]["I"]));
                $cooloder = explode('/', $cooloder);
                $cooloder = json_encode($cooloder);
                $data['cooloder'] = $cooloder;

                /**
                 * AGREGAR INFORMACION SEGUN SEA EL CASO DE ARCHIVO
                 */

                // die();
                $this->tarifa_model->_table_name = 'tbl_aq_carga_fcl_detail';
                $this->tarifa_model->_primary_key = "carga_fcl_detail_id";
                echo $id_contenedor_tarifa = $this->tarifa_model->save($data);
              endif;
              /* echo "<pre>";
              print_r( $data );
              echo "</pre>"; */
            }
            // die();
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
    redirect('admin/fcl');
  }


  public function vigenciasList($type = NULL)
  {
    if ($this->input->is_ajax_request()) {
      $this->load->model('datatables');
      $this->datatables->table         = 'tbl_aq_carga_fcl c';
      $this->datatables->join_table    = array();
      $this->datatables->join_where    = array();

      $this->datatables->column_search = array('c.carga_fcl_id', 'c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
      $this->datatables->column_order  = array('c.carga_fcl_id', 'c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
      $this->datatables->order         = array('c.carga_fcl_id' => 'desc');
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
        $sub_array[] = '<strong>' . $carga->utilidad . '%</strong>';
        $sub_array[] = $carga->vigencia_desde;
        $sub_array[] = $carga->vigencia_hasta;

        $action .= '<a data-toggle="modal" data-target="#myModal_large"
       title="VER DETALLE DE TARIFAS"
       href="' . base_url() . 'admin/fcl/tarifas/' . $carga->carga_fcl_id . '"
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
  public function tarifas(int $id)
  {
    $data['title'] = 'TARIFAS fcl';
    $data['info'] = $this->db->where(['carga_fcl_id' => $id])->get('tbl_aq_carga_fcl')->row();

    $this->db->select('c.*, na.*, ct.*, po.puerto as "puerto_origen", pao.pais as "pais_origen", pd.puerto as "puerto_destino", pad.pais as "pais_destino"');
    $this->db->from('tbl_aq_carga_fcl_detail c');
    $this->db->join('tbl_aq_puertos po', 'c.puerto_origen_id = po.puerto_id');
    $this->db->join('tbl_aq_paises pao', 'po.pais_id = pao.pais_id');
    $this->db->join('tbl_aq_puertos pd', 'c.puerto_destino_id = pd.puerto_id');
    $this->db->join('tbl_aq_paises pad', 'pd.pais_id = pad.pais_id');
    $this->db->join('tbl_aq_naviera na', 'c.naviera_id = na.naviera_id');
    $this->db->join('tbl_aq_contenedor_tipo ct', 'c.contenedor_tipo_id = ct.contenedor_tipo_id');
    $data['tarifas'] = $this->db->where(['c.carga_fcl_id' => $id])->get()->result();
    $data['subview'] = $this->load->view('admin/fcl/tarifas', $data, FALSE);
    $this->load->view('admin/_layout_modal_large', $data);
  }
}
