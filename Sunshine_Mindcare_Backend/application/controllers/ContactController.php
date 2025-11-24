<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ContactController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();       // Database load
        $this->load->model('ContactModel'); // Model load
    }

    // API endpoint: POST /contact/add
    public function add()
    {
        header('Content-Type: application/json');

        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);

        if (!is_array($input)) {
            $input = $this->input->post();
        }

        // ✔ Sabhi fields optional rakhe gaye hain
        $data = [
            'first_name' => isset($input['first_name']) ? $input['first_name'] : null,
            'last_name'  => isset($input['last_name']) ? $input['last_name'] : null,
            'email'      => isset($input['email']) ? $input['email'] : null,
            'message'    => isset($input['message']) ? $input['message'] : null,
        ];

        // Save via model
        $inserted = $this->ContactModel->addMessage($data);

        if ($inserted) {
            echo json_encode([
                'status'  => true,
                'message' => 'Message saved successfully.',
                'data'    => $data
            ]);
        } else {
            echo json_encode([
                'status'  => false,
                'message' => 'Failed to save message.'
            ]);
        }
 
	
	}

	 public function list()
    {
        header('Content-Type: application/json');

        $messages = $this->ContactModel->getMessages();

        echo json_encode([
            'status'  => !empty($messages),
            'message' => !empty($messages) ? 'Messages retrieved successfully.' : 'No messages found.',
            'data'    => $messages
        ]);
    }
}
