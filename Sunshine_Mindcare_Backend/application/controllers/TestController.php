<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TestController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('api');
        $this->load->model('TestModel');

       
    }

    //  Add Test
   public function add()
{
    $this->api->request_method('POST');

    // Accept JSON Input
    $input = json_decode($this->input->raw_input_stream, true);

    $data = [
        "name"        => $input['name'] ?? null,
        "description" => $input['description'] ?? null,
        "category"    => $input['category'] ?? null
    ];

    if ($this->TestModel->addTest($data)) {

        $insert_id = $this->db->insert_id();
        $fullData = $this->TestModel->getTest($insert_id);

        $this->api->send_response(200, "Test added successfully", null, null, $fullData);

    } else {
        $this->api->send_response(400, "Failed to add test");
    }
}


    public function list()
    {
        $this->api->request_method('GET');
        $id = $this->input->get('id');

        $result = $this->TestModel->getTest($id);

        $this->api->send_response(
            $result ? 200 : 404,
            $result ? "Test fetched" : "No test found",
            $result
        );
    }

  
    public function delete()
    {
        $this->api->request_method('POST');
        $id = $this->input->post('id');

        if (!$id) {
            $this->api->send_response(400, "Test ID is required");
            return;
        }

        if ($this->TestModel->deleteTest($id)) {
            $this->api->send_response(200, "Test deleted successfully");
        } else {
            $this->api->send_response(400, "Failed to delete test");
        }
    }
}
