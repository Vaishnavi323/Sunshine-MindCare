<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AppointmentModel extends CI_Model {

    public function insertAppointment($data) {
        $this->db->insert("appointments", $data);
        return $this->db->insert_id();
    }

	   public function getAppointments()
    {
        return $this->db->get('appointments')->result_array();
    }

    // Get appointment by ID
    public function getAppointmentById($id)
    {
        return $this->db->get_where('appointments', ['id' => $id])->row_array();
    }
// 	public function updateAppointment($id, $data) {
//     $this->db->where('id', $id);
//     return $this->db->update('appointments', $data);
// }



}

