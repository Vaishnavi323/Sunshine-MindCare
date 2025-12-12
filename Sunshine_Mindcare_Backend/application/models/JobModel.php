<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class JobModel extends CI_Model {

    public function insertJob($data) {
        $this->db->insert('jobs', $data);
        return $this->db->insert_id();
    }

    public function updateJob($data) {
        $this->db->where('id', $data['id']);
        return $this->db->update('jobs', $data);
    }

    public function deleteJob($id) {
        $this->db->where('id', $id);
        return $this->db->delete('jobs');
    }

    public function getJobs() {
        return $this->db->get('jobs')->result();
    }
}
