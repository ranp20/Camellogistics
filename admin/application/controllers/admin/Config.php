<?php
class Config extends Admin_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('tarifa_model');
  }

  public function index()
  {
    $data['title'] = 'Configuración de precios';

    $data['subview'] = $this->load->view('admin/config/index', $data, TRUE);
    $this->load->view('admin/_layout_main', $data);
  }
  public function save_configs()
  {
    $input_data = $this->tarifa_model->array_from_post(array(
      'emision_bl_ewb',
      'handling',
      'visto_bueno',
      'desconsolidacion',
      'almacen_referencial',
      'transporte_interno',
      'aforo_fisico_previo',
      'gremios_maritimos',
      'thc',
      'devolucion_contenedores',
      'derechos_embarque',
      'consolidacion',
      'bohe_inspeccion',
      'comision_agencia',
      'gastos_operativos',
      'estiba'
    ));

    foreach ($input_data as $key => $value) {
      $data = array('value' => $value);
      $this->db->where('config_key', $key)->update('tbl_config', $data);
      $exists = $this->db->where('config_key', $key)->get('tbl_config');
      if ($exists->num_rows() == 0) {
        $this->db->insert('tbl_config', array("config_key" => $key, "value" => $value));
      }
    }
    $type = "success";
        $message = 'Precios Actualizados con Exito!.';
        set_message($type, $message);
    redirect('admin/config');
    // 5jo+bV!Fs3pH
  }
}
