<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Appointment_model extends CI_Model {

    public function insertAppointment($data) {
        $this->db->insert("appointments", $data);
        return $this->db->insert_id();
    }
}
