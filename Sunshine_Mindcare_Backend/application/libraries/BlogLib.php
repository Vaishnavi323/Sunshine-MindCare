<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogLib {

    protected $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->model('BlogModel');
    }

   public function addBlog($data) {
    $insert_id = $this->CI->BlogModel->insertBlog($data);
    if ($insert_id) {
        return [
            'status' => true,
            'message' => 'Blog added successfully',
            'id' => $insert_id
        ];
    } else {
        return [
            'status' => false,
            'message' => 'Failed to add blog'
        ];
    }
}

    public function updateBlog($data) {
        return $this->CI->BlogModel->updateBlog($data);
    }

    public function deleteBlog($id) {
        return $this->CI->BlogModel->deleteBlog($id);
    }

    public function getBlogList() {
        return $this->CI->BlogModel->getBlogs();
    }
}
