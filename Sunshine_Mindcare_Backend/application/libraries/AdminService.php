<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AdminService
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->load->model('AdminModel');
        $this->CI->load->helper(['jwt', 'request', 'password', 'id']);
    }

    public function login($email, $password)
    {
        $Admin = $this->CI->AdminModel->login($email, $password);

        if ($Admin) {
            $token = generate_jwt([
                'id'    => $Admin['id'],
                'email' => $Admin['email'],
            ]);

            return [
                'status'  => true,
                'message' => 'Login successful',
                'token'   =>  $token
            ];
        }

        return [
            'status'  => false,
            'message' => 'Invalid email or password'
        ];
    }
}
