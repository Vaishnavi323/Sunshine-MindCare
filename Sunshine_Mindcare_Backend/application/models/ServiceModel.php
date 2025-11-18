<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ServiceModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function addService($data)
    {
        return $this->db->insert('services', $data);
    }

    public function getServices()
    {
        return $this->db->order_by('id', 'DESC')->get('services')->result();
    }
}
