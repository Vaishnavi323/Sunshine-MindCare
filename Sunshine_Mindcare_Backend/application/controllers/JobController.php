<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class JobController extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library(['Api', 'JobLib']);
    }

	public function add() {
		$this->api->request_method('POST');
		$input = $this->input->post();

		$input = json_decode($this->input->raw_input_stream, true);
    if (empty($input)) {
        $input = $this->input->post(); 
    }

    log_message('error', 'Job Add Input: ' . print_r($input, true)); // Debug

		$input['created_at'] = date('Y-m-d H:i:s');

		$response = $this->joblib->addJob($input);

		if ($response['status']) {
			$this->api->send_response(200, $response['message'], null, null, ['id' => $response['data']['id']]);
		} else {
			$this->api->send_response(400, $response['message'], 'ERR_ADD_FAILED');
		}
	}

  public function list()
{
    $this->api->request_method('GET');
    $response = $this->joblib->getJobList();

    if (!empty($response)) {

        $total = count($response); 

        $this->api->send_response(
            200,
            'Job list fetched',
            null,
            ['total' => $total],   
            $response
        );

    } else {

        $this->api->send_response(
            404,
            'No jobs found',
            'No jobs found'
        );
    }
}


    public function delete() {
        $this->api->request_method('POST');
        $id = $this->input->post('id');

        if (!$id) return $this->api->send_response(400, 'ID required');
        
        $response = $this->joblib->deleteJob($id);
        $this->api->send_response(200, 'Job deleted', $response);
    }

    public function update() {
        $this->api->request_method('POST');
        $input = $this->input->post();
        $response = $this->joblib->updateJob($input);
        $this->api->send_response(
            $response['status'] ? 200 : 400,
            $response['message']
        );
    }
}
