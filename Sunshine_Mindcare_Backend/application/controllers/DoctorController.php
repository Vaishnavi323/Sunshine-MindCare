<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DoctorController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('DoctorModel');
$this->load->library('DoctorLib', '', 'doctorlib');
    }

    public function add() {
        $this->api->request_method('POST'); // Add this if using API request validation

        $input = $this->input->post();

        // Ensure upload folder exists
        $upload_path = FCPATH . 'uploads/doctors/';
        if (!is_dir($upload_path)) {
            mkdir($upload_path, 0777, true);
        }

      if (!isset($_FILES['photo']) || $_FILES['photo']['error'] != UPLOAD_ERR_OK) {
    echo json_encode(['status' => false, 'message' => 'Please upload a valid photo file']);
    return;
}

$photo = $this->doctorlib->uploadImage('photo', $upload_path);


        // If upload fails
        if (!$photo['status']) {
            echo json_encode(['status' => false, 'message' => $photo['error']]);
            return;
        }

        // Prepare data
        $data = [
            'full_name'          => $input['full_name'] ?? '',
            'email'         => $input['email'] ?? '',
            'phone'         => $input['phone'] ?? '',
            'category'      => $input['category'] ?? '',
            'specialization'=> $input['specialization'] ?? '',
            'experience'    => $input['experience'] ?? '',
            'qualification' => $input['qualification'] ?? '',
            'description'   => $input['description'] ?? '',
            'photo'         => $photo['file_path'],
            'created_at'    => date('Y-m-d H:i:s')
        ];

        $result = $this->DoctorModel->insertDoctor($data);

        // Final API response
        echo json_encode([
            'status'  => (bool)$result,
            'message' => $result ? 'Doctor added successfully' : 'Failed to add doctor',
			    'data'    => $data  // Return inserted data back to frontend

        ]);
    }
	public function list()
{
    $this->api->request_method('GET'); // Only allow GET

    $doctors = $this->DoctorModel->getAllDoctors();

    if (!empty($doctors)) {
        echo json_encode([
            'status'  => true,
            'message' => 'Doctor list fetched successfully',
            'data'    => $doctors
        ]);
    } else {
        echo json_encode([
            'status'  => false,
            'message' => 'No doctors found',
            'data'    => []
        ]);
    }
}

}


