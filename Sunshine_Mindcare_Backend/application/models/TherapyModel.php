<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TherapyModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    // Insert a new therapy
    public function addTherapy($data) {
        return $this->db->insert('therapies', $data);
    }

    // Fetch all or single therapy by ID
    public function getTherapy($id = null) {
        if ($id) {
            return $this->db->get_where('therapies', ['id' => $id])->row_array();
        }
        return $this->db->get('therapies')->result_array();
    }

    // Delete therapy
    public function deleteTherapy($id) {
        return $this->db->delete('therapies', ['id' => $id]);
    }
}
