<?php
defined('BASEPATH') or exit('No direct script access allowed');

class FeedbackController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library(['Api', 'FeedbackLib']);
    }

    public function add() {
		 
        $this->api->request_method('POST');
        $input = $this->input->post();

        $response = $this->feedbacklib->addReview($input);

        if ($response['success'])
            $this->api->send_response(200, $response['message'], null, null, $response['data']);
        else
            $this->api->send_response(400, $response['message'], $response['message']);
    }


	public function get() {
    $this->api->request_method('GET');
    $status = $this->input->get('status');  // 0=pending, 1=approved

    $response = $this->feedbacklib->getFeedback($status);

    if ($response['success'])
        $this->api->send_response(200, "Feedback fetched successfully", null, null, $response['data']);
    else
        $this->api->send_response(404, $response['message'], $response['message']);
}

public function update() {
    $this->api->request_method('POST');
    $input = $this->input->post();

    $response = $this->feedbacklib->approveFeedback($input);

    if ($response['success'])
        $this->api->send_response(200, $response['message']);
    else
        $this->api->send_response(400, $response['message'], $response['message']);
}

public function getApproved()
{
    $this->api->request_method('GET');
    $response = $this->feedbacklib->getFeedbackByStatus(1);

    if ($response['success'])
        $this->api->send_response(200, "Approved feedback fetched", null, null, $response['data']);
    else
        $this->api->send_response(404, $response['message'], $response['message']);
}

//this api for admin side get all
public function getAll()
{
    $this->api->request_method('GET');
    $response = $this->feedbacklib->getAllFeedback();

    if ($response['success'])
        $this->api->send_response(200, "All feedback fetched", null, null, $response['data']);
    else
        $this->api->send_response(404, $response['message'], $response['message']);
}
}
