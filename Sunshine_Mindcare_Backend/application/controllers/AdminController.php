<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AdminController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library(['Api', 'AdminService']);
        
    
    }

    public function login()
    {
        $this->api->request_method('POST');

        $input = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($input['email']) || !isset($input['password'])) {
            $this->api->send_response(400, 'Email and password are required', 'ERR_MISSING_FIELDS');
            return;
        }

        $email = $input['email'];
        $password = $input['password'];

        $response = $this->adminservice->login($email, $password);
        
        if ($response['status']) {
            $this->api->send_response(200, $response['message'], null, $response['token']);
        } else {
            $this->api->send_response(401, $response['message'], 'ERR_LOGIN_FAILED');
        }
    }
}
