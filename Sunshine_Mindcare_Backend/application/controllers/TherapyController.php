<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TherapyController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('api');
        $this->load->model('TherapyModel');

     
    }

 //  Add Therapy
public function add()
{
    $this->api->request_method('POST');

    $input = json_decode($this->input->raw_input_stream, true);

    $data = [
        "therapy_name"        => $input['therapy_name'] ?? null,
        "therapy_description" => $input['therapy_description'] ?? null,
        "type_of_therapy"     => $input['type_of_therapy'] ?? null,
        "category"            => $input['category'] ?? null
    ];

    if ($this->TherapyModel->addTherapy($data)) {

        $insert_id = $this->db->insert_id();
        $fullData = $this->TherapyModel->getTherapy($insert_id);

        $this->api->send_response(200, "Therapy added successfully", null, null, $fullData);

    } else {
        $this->api->send_response(400, "Failed to add therapy");
    }
}



    //  Fetch All / Single Therapy
    public function list()
    {
        $this->api->request_method('GET');
        $id = $this->input->get('id');

        $result = $this->TherapyModel->getTherapy($id);

        $this->api->send_response(
            $result ? 200 : 404,
            $result ? "Therapy fetched" : "No therapy found",
            $result
        );
    }

    //  Delete Therapy
    public function delete()
    {
        $this->api->request_method('POST');
        $id = $this->input->post('id');

        if (!$id) {
            $this->api->send_response(400, "Therapy ID is required");
            return;
        }

        if ($this->TherapyModel->deleteTherapy($id)) {
            $this->api->send_response(200, "Therapy deleted successfully");
        } else {
            $this->api->send_response(400, "Failed to delete therapy");
        }
    }
}
