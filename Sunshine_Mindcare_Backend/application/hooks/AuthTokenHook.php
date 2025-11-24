<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AuthTokenHook
{
    private $publicRoutes = [
        'admincontroller/login',
		'servicecontroller/list',
		'subservicecontroller/list',
		'appointmentcontroller/add',
		'appointmentcontroller/get',
		'articlecontroller/list',
        'eventcontroller/list',
		'eventcontroller/past',
		'eventcontroller/upcoming',
		'blogcontroller/list',
		'feedbackcontroller/add',
		'feedbackcontroller/get',
		'feedbackcontroller/update',
		'feedbackcontroller/getApproved',
		'jobcontroller/list',
		'doctorcontroller/get',
		'enquirecontroler/list',
		'enquirecontroller/add',

		
    ];

    private $accessControl = [
        'admincontroller'    => ['admin'],
        
    ];

    public function validateToken()
    {
        $CI = &get_instance();
        $CI->load->helper('jwt');
        $CI->load->database();

        $class = strtolower($CI->router->fetch_class());
        $method = strtolower($CI->router->fetch_method());
        $route = "$class/$method";

        if (in_array($route, $this->publicRoutes)) return;

        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? '';

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $this->unauthorized("Missing or invalid Authorization header");
        }

        $token = $matches[1];
		$user = verify_jwt($token);


        if (!$user) {
            $this->unauthorized("Token is invalid or expired");
        }

        if (isset($user['role']) && $user['role'] === 'college') {
            if (!isset($user['college_id'])) {
                $this->unauthorized("College ID missing in token");
            }

            $college = $CI->db
                ->where('id', $user['college_id'])
                ->get('colleges')
                ->row_array();

            if (!$college || $college['status'] === 'expired' || date('Y-m-d') > $college['valid_until']) {
                if ($college && $college['status'] !== 'expired') {
                    $CI->db->where('id', $college['id'])->update('colleges', ['status' => 'expired']);
                }
                $this->unauthorized("College validation expired. Access denied.");
            }
        }

        $CI->auth_user = $user;

        if (isset($this->accessControl[$route])) {
            $allowedRoles = $this->accessControl[$route];
            if (!in_array($user['role'], $allowedRoles)) {
                $this->forbidden("Access denied for role: {$user['role']}");
            }
        }
    }


    private function unauthorized($message)
    {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['status' => false, 'message' => $message]);
        exit;
    }

    private function forbidden($message)
    {
        header('Content-Type: application/json');
        http_response_code(403);
        echo json_encode(['status' => false, 'message' => $message]);
        exit;
    }
}
