<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ServiceController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library(['Api', 'ServiceService']);

      
    }
	
public function add()
{
    $this->api->request_method('POST');

    $input = $this->input->post();
    // Ensure directory exists

    if (!is_dir(FCPATH . 'uploads/services/')) {

        mkdir(FCPATH . 'uploads/services/', 0777, true);

    }

    if (!empty($_FILES['image']['name'])) {


        $config['upload_path']   = FCPATH . 'uploads/services/';

        $config['allowed_types'] = 'jpg|jpeg|png|webp';

        $config['max_size']      = 2048;

        $this->load->library('upload', $config);

        $this->upload->initialize($config);


        if ($this->upload->do_upload('image')) {

            $fileData = $this->upload->data();

            $input['image'] = 'uploads/services/' . $fileData['file_name'];

        } else {

            $this->api->send_response(400, $this->upload->display_errors());

            return;

        }

    }
    $response = $this->serviceservice->addService($input);

    if ($response['status']) {

        $this->api->send_response(200, $response['message']);

    } else {

        $this->api->send_response(400, $response['message']);

    }

}


    public function list()
    {
        $this->api->request_method('GET');

        $response = $this->serviceservice->list();

        $this->api->send_response(200, "Services fetched", $response['data']);
    }
}
