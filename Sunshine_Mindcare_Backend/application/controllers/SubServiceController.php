<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SubServiceController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library(['Api', 'SubServiceService']);
    }
public function add()
{
    $this->api->request_method('POST');

    $data = $this->input->post();

    // Ensure directory exists
    if (!is_dir(FCPATH . 'uploads/subservices/')) {
        mkdir(FCPATH . 'uploads/subservices/', 0777, true);
    }

    if (!empty($_FILES['image']['name'])) {

        $config = [
            'upload_path'   => FCPATH . 'uploads/subservices/',
            'allowed_types' => 'jpg|jpeg|png|webp',
            'max_size'      => 2048,
            'encrypt_name'  => true
        ];

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if ($this->upload->do_upload('image')) {

            $fileData = $this->upload->data();
            $data['image'] = 'uploads/subservices/' . $fileData['file_name'];

        } else {

            $error = strip_tags($this->upload->display_errors());
            log_message('error', "UPLOAD ERROR: " . $error);

            $this->api->send_response(400, $error);
            return;
        }
    } else {
        $data['image'] = null;
    }

    $response = $this->subserviceservice->add($data);

    if ($response['status']) {
        $this->api->send_response(200, $response['message']);
    } else {
        $this->api->send_response(400, $response['message']);
    }
}


    public function list()
    {
        $this->api->request_method('GET');

        $response = $this->subserviceservice->list();

        $this->api->send_response(200, "Sub Services fetched", $response['data']);
    }

	public function update($id)
{
    $input = json_decode(file_get_contents('php://input'), true);
    $updated = $this->SubServiceModel->updateSubService($id, $input);

    echo json_encode([
        'status' => $updated,
        'message' => $updated ? 'SubService updated successfully' : 'Failed to update sub-service'
    ]);
}

public function delete($id)
{
    $deleted = $this->SubServiceModel->softDeleteSubService($id); // Name same rakha hai

    echo json_encode([
        'status' => $deleted,
        'message' => $deleted ? 'SubService permanently deleted' : 'Failed to delete sub-service'
    ]);
}

}
