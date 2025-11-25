<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AppointmentController extends CI_Controller {

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

		// Get all appointment
	public function get()
	{
		$this->api->request_method('GET');

		$id = $this->input->get('id'); // frontend sends ?id=4

		if ($id) {
		$data = $this->appointmentlib->getAppointmentById($id);
	} else {
		$data = $this->appointmentlib->getAppointments();
	}

	if (!empty($data)) {
		$this->api->send_response(200, "Appointment data fetched", $data);
	} else {
		$this->api->send_response(404, "No appointment found", null);
	}

		if ($response['status']) {
			$this->api->send_response(200, "Appointment data fetched", $response['data']);
		} else {
			$this->api->send_response(404, $response['message'], null);
		}
	}

	// // admin reshedule
	
	// 	public function adminReschedule()
	// {
	// 	$this->api->request_method('POST');
	// 	$input = $this->input->post();
	// 	$response = $this->appointmentlib->adminRescheduleAppointment($input);

	// 	if ($response['success']) {
	// 		$this->api->send_response(200, $response['message'], null, null, $response['data']);

	// 	} else {
	// 		$this->api->send_response(400, $response['message'], null);
	// 	}
	// }
public function delete($id)
{
    $deleted = $this->AppointmentModel->deleteAppointment($id);

    echo json_encode([
        'status' => $deleted,
        'message' => $deleted ? 'Appointment successfully deleted' : 'Failed to delete appointment'
    ]);
}
}

