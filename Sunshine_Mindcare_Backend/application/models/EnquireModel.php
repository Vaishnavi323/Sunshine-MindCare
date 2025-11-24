<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EnquireModel extends CI_Model {

    public function addInternship($data) {
        return $this->db->insert('enquires', [
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'age' => $data['age'],
            'college_name' => $data['college_name'],
            'study_year' => $data['study_year'],
            'purpose' => $data['purpose'],
            'training_hours' => $data['training_hours'],
            'previous_internship' => $data['previous_internship']
        ]);
    }

    public function getInternships() {
        return $this->db->order_by('id', 'DESC')->get('enquires')->result_array();
    }
}
