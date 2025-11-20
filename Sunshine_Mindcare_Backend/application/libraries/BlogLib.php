<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bloglib {

    protected $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->model('Blogmodel');
    }

   public function addBlog($data) {
    $insert_id = $this->CI->Blogmodel->insertBlog($data);
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
        return $this->CI->Blogmodel->updateBlog($data);
    }

    public function deleteBlog($id) {
        return $this->CI->Blogmodel->deleteBlog($id);
    }

    public function getBlogList() {
        return $this->CI->Blogmodel->getBlogs();
    }
}
