<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestModel extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    // Insert a new test
    public function addTest($data) {
        return $this->db->insert('tests', $data);
    }

    // Fetch all or single test by ID
    public function getTest($id = null) {
        if ($id) {
            return $this->db->get_where('tests', ['id' => $id])->row_array();
        }
        return $this->db->get('tests')->result_array();
    }

    // Delete test
    public function deleteTest($id) {
        return $this->db->delete('tests', ['id' => $id]);
    }
}
