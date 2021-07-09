<?php
class Test extends MY_Controller
{
  public function index(){

    $data['json'] = $this->db->where(['status' => 1])->get('tbl_menu')->result();
    $this->load->view('json', $data);
  }
}
