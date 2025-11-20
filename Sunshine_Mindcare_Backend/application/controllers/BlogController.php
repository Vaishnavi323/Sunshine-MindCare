<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogController extends CI_Controller {

     public function __construct()
    {
        parent::__construct(); 
        $this->load->library(['Api', 'Bloglib']); 
    }

    // Add blog 
    public function add()
    {
        $this->api->request_method('POST');
        $input = $this->input->post();
		// print_r($input); exit;
		// FIX WRONG FIELD NAME
		if (isset($input['category_'])) {
			$input['category'] = $input['category_'];
			unset($input['category_']);
		}

        $input['created_at'] = date('Y-m-d H:i:s');

        // Ensure directory exists
        if (!is_dir(FCPATH . 'uploads/blogs/')) {
            mkdir(FCPATH . 'uploads/blogs/', 0777, true);
        }

        // Image Upload Logic (Same as ServiceController)
        if (!empty($_FILES['image']['name'])) {
            $config['upload_path']   = FCPATH . 'uploads/blogs/';
            $config['allowed_types'] = 'jpg|jpeg|png|webp'; // ✔ same
            $config['max_size']      = 2048;

            $this->load->library('upload', $config);
            $this->upload->initialize($config);

            if ($this->upload->do_upload('image')) {
                $fileData = $this->upload->data();
                $input['image'] = 'uploads/blogs/' . $fileData['file_name'];
            } else {
                $this->api->send_response(400, $this->upload->display_errors());
                return;
            }
        }

		$response = $this->bloglib->addBlog($input);

		if ($response['status']) {
			$this->api->send_response(200, $response['message'], ['id' => $response['id']]);
		} else {
			$this->api->send_response(400, $response['message'],null);
		}
    }
    //list 
	public function list() {
        $this->api->request_method('GET');
        $response = $this->bloglib->getBlogList();
        $this->api->send_response(200, 'Blog list fetched', $response);
    }

    // delete 
    public function delete() {
        $this->api->request_method('POST');
        $id = $this->input->post('id');

        if (empty($id)) {
            $this->api->send_response(400, 'Blog ID is required', null);
            return;
        }

        $response = $this->bloglib->deleteBlog($id);
        $this->api->send_response(200, 'Blog deleted successfully', $response);
    }
}
