<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EnquireController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('EnquireModel');
        header("Content-Type: application/json");
    }

    // Add Internship Data (POST)
    public function add() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            echo json_encode(["status" => false, "message" => "Invalid input"]);
            return;
        }

        $insert = $this->EnquireModel->addInternship($data);

        if ($insert) {
            echo json_encode(["status" => true, "message" => "Internship application saved successfully"]);
        } else {
            echo json_encode(["status" => false, "message" => "Failed to save data"]);
        }
    }

    // List Internship Data (GET)
    public function list() {
        $result = $this->EnquireModel->getInternships();
        echo json_encode(["status" => true, "data" => $result]);
    }
	public function delete($id) {
    if (!$id) {
        echo json_encode(["status" => false, "message" => "ID is required"]);
        return;
    }

    $deleted = $this->EnquireModel->deleteInternship($id);

    if ($deleted) {
        echo json_encode(["status" => true, "message" => "Internship enquiry deleted permanently"]);
    } else {
        echo json_encode(["status" => false, "message" => "Failed to delete or ID not found"]);
    }
}

}
