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


 public function getDoctorById($id) {
        return $this->db
            ->where('id', $id)
            ->get('doctors')
            ->row();
    }

    /*  UPDATE  */
    public function updateDoctor($id, $data) {
        return $this->db
            ->where('id', $id)
            ->update('doctors', $data);
    }

    /* DELETE */
    public function deleteDoctor($id) {
        return $this->db
            ->where('id', $id)
            ->delete('doctors');
    }
}
	

