<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SubServiceModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function addSubService($data)
    {
        return $this->db->insert('sub_services', $data);
    }

    public function getSubServices()
    {
        return $this->db->get('sub_services')->result_array();
    }
}
