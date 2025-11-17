<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Appointment extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('AppointmentLib');
    }

    public function add() {
        // JSON INPUT
        $input = json_decode(trim(file_get_contents('php://input')), true);

        if (!$input) {
            return $this->_response(false, "Invalid JSON input");
        }

        // Send data to Library for business logic
        $result = $this->appointmentlib->addAppointment($input);

        return $this->_response($result['success'], $result['message'], $result['data'] ?? []);
    }

    // Common Response Function
    private function _response($success, $message, $data = []) {
        $response = [
            "success" => $success,
            "message" => $message,
        ];

        if (!empty($data)) {
            $response["data"] = $data;
        }

        return $this->output
            ->set_content_type('application/json')
            ->set_status_header($success ? 200 : 400)
            ->set_output(json_encode($response));
    }
}
