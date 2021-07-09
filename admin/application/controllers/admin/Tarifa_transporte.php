<?php

/**
 * [Tarifa description]
 */
class Tarifa_transporte extends Admin_Controller
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
    $data['title'] = 'TARIFAS DE TRANSPORTE';
    $data['zonas'] = $this->db->get('tbl_aq_zonas')->result();
    $zona_precios = $this->db->get('tbl_aq_zona_precios')->result();
    foreach ($zona_precios as $key => $pre) {
      $precios[$pre->zona_id][] = $pre;
    }
    $data['precios'] = $precios;
    
    $zona_distritos = $this->db->get('tbl_aq_zona_distritos')->result();
    foreach ($zona_distritos as $key => $dis) {
      $distritos[$dis->zona_id][] = $dis->distrito;
    }
    $data['distritos'] = $distritos;
    $data['subview'] = $this->load->view('admin/tarifa_transporte/index', $data, TRUE);
    $this->load->view('admin/_layout_main', $data);
  }

  public function import()
  {
    $data['title'] = 'Importando Información LCL';

    $data['subview'] = $this->load->view('admin/tarifa_transporte/import', $data, FALSE);
    $this->load->view('admin/_layout_modal', $data); //page load
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
        // if (!empty($this->input->post('utilidad')) && !empty($this->input->post('start_date'))  && !empty($this->input->post('end_date'))) :
        //All data from excel
        $row = 5; // el numero de fila desde donde empiezan los datos a registrar 
        $sheetData = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);
        if (empty(trim($sheetData[$row]["A"]))) :
          $type = 'error';
          $message = 'Archivo no contienen Informacion';
        else :

          $utilidad = trim($sheetData[1]["I"]);
          $utilidad = $this->db->where('config_key', 'utilidad_transporte')->update('tbl_config', ['value' => $utilidad]);
          $data_distritos = [];
          for ($x = $row; $x <= count($sheetData); $x++) :
            if (!empty($sheetData[$x]["A"]) && !empty($sheetData[$x]["B"])) :

              $zona = trim($sheetData[$x]["A"]);
              $precios['zona'] = $zona;
              $zonas[] = $zona;
              $distritos =  explode(' - ', trim($sheetData[$x]["B"]));
              // ZONAS DISTRITOS
              $zona_distritos['zonas'][] = $zona;
              $zona_distritos['distritos'][] = $distritos;
              
              foreach ($distritos as $key => $distrito) {
                array_push($data_distritos, $distrito);
              }

            endif;
            if (!empty($sheetData[$x]["C"]) && !empty($sheetData[$x]["D"])) :
              $precios['peso_min'] = trim($sheetData[$x]["C"]);
              $precios['peso_max'] = trim($sheetData[$x]["D"]);
              $precios['precio'] = trim( str_replace('USD', '', $sheetData[$x]["E"]));
              $precios['precio_utilidad'] = trim( str_replace('USD', '', $sheetData[$x]["F"]) );
            endif;

            $data_precios[] = $precios;
          endfor;

          // Llenando a la DB
          foreach ($zona_distritos['zonas'] as $key => $zd) {

            $this->tarifa_model->_table_name = 'tbl_aq_zonas';
            $this->tarifa_model->_primary_key = "zona_id";
            if ($zona = $this->db->where(['zona' => $zd])->get('tbl_aq_zonas')->row()) {
              $id_zona = $zona->zona_id;
            } else {
              $data_zona = ['zona' => $zd];
              $id_zona = $this->tarifa_model->save($data_zona);
            }
            $data_zona_distritos['zona_id'] = $id_zona;

            $this->tarifa_model->_table_name = 'tbl_aq_zona_distritos';
            $this->tarifa_model->_primary_key = "zona_distrito_id";
            foreach ($zona_distritos['distritos'][$key] as $keyz => $distrito) {
              $data_zona_distritos['distrito'] = trim($distrito);
              if (!$this->db->where($data_zona_distritos)->get('tbl_aq_zona_distritos')->row()) :
                $id_zona_distrito = $this->tarifa_model->save($data_zona_distritos);
              endif;
            }

            $this->tarifa_model->_table_name = 'tbl_aq_zona_precios';
            $this->tarifa_model->_primary_key = "zona_precio_id";
            $data_zona_precios['zona_id'] = $id_zona;

            foreach ($data_precios as $keyp => $dp) {
              if( $dp['zona'] == $zd ){
                $data_zona_precios['peso_min'] = $dp['peso_min'];
                $data_zona_precios['peso_max'] = $dp['peso_max'];
                
                if( $id =  $this->db->where( $data_zona_precios )->get( 'tbl_aq_zona_precios' )->row() ){
                  $data_zona_precios['precio'] = $dp['precio'];
                  $this->tarifa_model->save( $data_zona_precios, $id );
                }else{
                  $data_zona_precios['precio'] = $dp['precio'];
                  $this->tarifa_model->save( $data_zona_precios );
                }
              }
            }

          }
          // die();
          $type = 'success';
          $message = 'Datos importados con exito';
        endif;
        /* else :
          $type = 'error';
          $message = 'Campos vacios';
        endif; */
      } else {
        $type = 'error';
        $message = "Sorry your uploaded file type not allowed ! please upload XLS/CSV File ";
      }
    } else {
      $type = 'error';
      $message = "You did not Select File! please upload XLS/CSV File ";
    }

    set_message($type, $message);
    redirect('admin/tarifa_transporte/');
  }


  public function vigenciasList($type = NULL)
  {
    if ($this->input->is_ajax_request()) {
      $this->load->model('datatables');
      $this->datatables->table         = 'tbl_aq_carga_lcl c';
      $this->datatables->join_table    = array();
      $this->datatables->join_where    = array();

      $this->datatables->column_search = array('c.carga_lcl_id', 'c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
      $this->datatables->column_order  = array('c.carga_lcl_id', 'c.vigencia_desde', 'c.vigencia_hasta', 'c.utilidad');
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
        $sub_array[] = '<strong>' . $carga->utilidad . '%</strong>';
        $sub_array[] = $carga->vigencia_desde;
        $sub_array[] = $carga->vigencia_hasta;

        $action .= '<a data-toggle="modal" data-target="#myModal_large"
       title="VER DETALLE DE TARIFAS"
       href="' . base_url() . 'admin/tarifa_transporte/tarifas/' . $carga->carga_lcl_id . '"
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
    $data['title'] = 'TARIFAS LCL';
    $data['info'] = $this->db->where(['carga_lcl_id' => $id])->get('tbl_aq_carga_lcl')->row();

    $this->db->select('c.*, f.*, po.puerto as "puerto_origen", pao.pais as "pais_origen", pd.puerto as "puerto_destino", pad.pais as "pais_destino"');
    $this->db->from('tbl_aq_carga_lcl_detail c');
    $this->db->join('tbl_aq_frecuencias f', 'c.frecuencia_id = f.frecuencia_id');
    $this->db->join('tbl_aq_puertos po', 'c.puerto_origen_id = po.puerto_id');
    $this->db->join('tbl_aq_paises pao', 'po.pais_id = pao.pais_id');
    $this->db->join('tbl_aq_puertos pd', 'c.puerto_destino_id = pd.puerto_id');
    $this->db->join('tbl_aq_paises pad', 'pd.pais_id = pad.pais_id');
    $data['tarifas'] = $this->db->where(['c.carga_lcl_id' => $id])->get()->result();
    $data['subview'] = $this->load->view('admin/tarifa_transporte/tarifas', $data, FALSE);
    $this->load->view('admin/_layout_modal_large', $data);
  }
}
