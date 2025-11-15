<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AdminController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library(['Api', 'AdminService']);
        header('Content-Type: application/json');
		header("Access-Control-Allow-Origin: http://localhost:5173");
		header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
		header("Access-Control-Allow-Headers: Content-Type, Authorization");
		header("Access-Control-Allow-Credentials: true");    
    }

    public function login()
    {
				// echo 'hiii';die;

        $this->api->request_method('POST');

        $input = json_decode(file_get_contents("php://input"), true);
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
