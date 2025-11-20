<?php
defined('BASEPATH') or exit('No direct script access allowed');

class EventController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library(['Api', 'EventLib']);
    }

    public function add() {
        $this->api->request_method('POST');
        $input = $this->input->post();
        $response = $this->eventlib->addEvent($input);

        if ($response['success']) 
            $this->api->send_response(200, $response['message'], null, null, $response['data']);
        else 
            $this->api->send_response(400, $response['message'], $response['message']);
    }

    public function list() {
        $this->api->request_method('GET');
        $id = $this->input->get('id');
        $response = $this->eventlib->listEvents($id);

        if ($response['success']) 
            $this->api->send_response(200, $id ? "Event details fetched" : "Events fetched", null, null, $response['data']);
        else 
            $this->api->send_response(404, $response['message'], $response['message']);
    }


	// Update Event
	public function update()
	{
		$this->api->request_method('POST');

		$input = $this->input->post();
		$response = $this->eventlib->updateEvent($input, $_FILES); 

		if ($response['success']) {
			$this->api->send_response(200, $response['message'], null, null, $response['data']);
		} else {
			$this->api->send_response(400, $response['message']);
		}
	}

    // delete event
    public function delete() {
        $this->api->request_method('POST');
        $event_id = $this->input->post('id');
        $response = $this->eventlib->deleteEvent($event_id);

        if ($response['success']) {
            $this->api->send_response(200, $response['message']);
        } else {
            $this->api->send_response(400, $response['message'], $response['message']);
        }
    }
}

