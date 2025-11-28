<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogModel extends CI_Model {

    public function insertBlog($data) {
        $this->db->insert('blogs', $data);
        return $this->db->insert_id();
    }

    public function updateBlog($data) {
        $this->db->where('id', $data['id']);
        return $this->db->update('blogs', $data);
    }

    public function deleteBlog($id) {
        $this->db->where('id', $id);
        return $this->db->delete('blogs');
    }

    public function getBlogs() {
        return $this->db->get('blogs')->result();
    }
}
