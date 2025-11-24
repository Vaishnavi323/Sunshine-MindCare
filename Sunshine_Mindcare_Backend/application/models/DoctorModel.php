<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DoctorModel extends CI_Model {

    public function insertDoctor($data) {
        return $this->db->insert('doctors', $data); // 'doctors' table in DB
    }

	public function getAllDoctors()
{
    return $this->db->select('*')
        ->from('doctors')
        ->order_by('id', 'DESC')
        ->get()
        ->result_array();
}

}