<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class ArticleController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('ArticleLib');
        $this->load->library('api');
    }

    //  Add Article Image
	public function add()
	{
		$this->api->request_method('POST');

		$input = $this->input->post();

		// Ensure directory exists
		if (!is_dir(FCPATH . 'uploads/articles/')) {
			mkdir(FCPATH . 'uploads/articles/', 0777, true);
		}

		// Handle image upload
		if (!empty($_FILES['image']['name'])) {

			$config['upload_path']   = FCPATH . 'uploads/articles/';
			$config['allowed_types'] = 'jpg|jpeg|png|webp';
			$config['max_size']      = 2048; // 2MB limit

			$this->load->library('upload', $config);
			$this->upload->initialize($config);

			if ($this->upload->do_upload('image')) {
				$fileData = $this->upload->data();
				$input['image'] = 'uploads/articles/' . $fileData['file_name']; // store path
			} else {
				$this->api->send_response(400, $this->upload->display_errors(), $this->upload->display_errors(), null, null);
				return;
			}
		}

		// Call library
		$response = $this->articlelib->addArticle($input);

		if ($response['success']) {
			$this->api->send_response(200, $response['message'], null, null, $response['data']);
		} else {
			$this->api->send_response(400, $response['message'], $response['message'], null, null);
		}
	}


    // fetch article
    public function list() {
        $this->api->request_method('GET');
        $id = $this->input->get('id');

        $data = $this->articlelib->getArticle($id);

        $this->api->send_response(
            $data ? 200 : 404,
            $data ? "Article data fetched" : "No article found",
            $data
        );
    }

	//delete article
	public function delete() {
        $this->api->request_method('POST');
        $articleId = $this->input->post('id');
        $response = $this->articlelib->deleteArticle($articleId);

        if ($response['success']) {
            $this->api->send_response(200, $response['message']);
        } else {
            $this->api->send_response(400, $response['message'], $response['message']);
        }
    }
}

