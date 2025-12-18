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
			'total'   => count($doctors), 
            'data'    => $doctors
        ]);
    } else {
        echo json_encode([
            'status'  => false,
            'message' => 'No doctors found',
			 'total'   => 0,
            'data'    => []
        ]);
    }
}

//update doctor details
 public function update() {
    $this->api->request_method('POST');

    $input = $this->input->post();
    $id = $input['id'] ?? null;

    if (!$id) {
        echo json_encode(['status' => false, 'message' => 'Doctor ID required']);
        return;
    }

    $doctor = $this->DoctorModel->getDoctorById($id);
    if (!$doctor) {
        echo json_encode(['status' => false, 'message' => 'Doctor not found']);
        return;
    }

    $upload_path = FCPATH . 'uploads/doctors/';
    if (!is_dir($upload_path)) {
        mkdir($upload_path, 0777, true);
    }

    $data = [
        'full_name'       => $input['full_name'] ?? $doctor->full_name,
        'email'           => $input['email'] ?? $doctor->email,
        'phone'           => $input['phone'] ?? $doctor->phone,
        'category'        => $input['category'] ?? $doctor->category,
        'specialization'  => $input['specialization'] ?? $doctor->specialization,
        'experience'      => $input['experience'] ?? $doctor->experience,
        'qualification'   => $input['qualification'] ?? $doctor->qualification,
        'description'     => $input['description'] ?? $doctor->description,
       
    ];

    // 🔹 Optional photo update
    if (!empty($_FILES['photo']['name'])) {

        $photo = $this->doctorlib->uploadImage('photo', $upload_path);
        if (!$photo['status']) {
            echo json_encode(['status' => false, 'message' => $photo['error']]);
            return;
        }

        if (!empty($doctor->photo)) {
            $oldPath = FCPATH . str_replace(base_url(), '', $doctor->photo);
            if (file_exists($oldPath)) unlink($oldPath);
        }

        $data['photo'] = $photo['file_path'];
    }

    $updated = $this->DoctorModel->updateDoctor($id, $data);

    echo json_encode([
        'status'  => (bool)$updated,
        'message' => $updated ? 'Doctor updated successfully' : 'Update failed',
        'data'    => $data
    ]);
}


    /* DELETE DOCTOR  */
 public function delete() {
    $this->api->request_method('POST');

    $id = $this->input->post('id');

    if (!$id) {
        echo json_encode(['status' => false, 'message' => 'Doctor ID required']);
        return;
    }

    $doctor = $this->DoctorModel->getDoctorById($id);
    if (!$doctor) {
        echo json_encode(['status' => false, 'message' => 'Doctor not found']);
        return;
    }

    // Delete photo
    if (!empty($doctor->photo)) {
        $path = FCPATH . str_replace(base_url(), '', $doctor->photo);
        if (file_exists($path)) unlink($path);
    }

    $deleted = $this->DoctorModel->deleteDoctor($id);

    echo json_encode([
        'status'  => (bool)$deleted,
        'message' => $deleted ? 'Doctor deleted successfully' : 'Delete failed'
    ]);
}

}



