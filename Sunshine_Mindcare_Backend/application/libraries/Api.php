<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
    }

    /**
     * Check if the request method matches
     */
    public function request_method($method)
    {
        if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
            $this->send_response(405, 'Method not allowed', 'ERR_METHOD_NOT_ALLOWED');
            exit;
        }
    }

    /**
     * Send JSON response
     */
    public function send_response($status_code, $message, $error = null, $token = null, $data = null)
    {
        http_response_code($status_code);
        
        $response = [
            'status' => $status_code >= 200 && $status_code < 300,
            'message' => $message
        ];

        if ($error !== null) {
            $response['error'] = $error;
        }

        if ($token !== null) {
            $response['token'] = $token;
        }

        if ($data !== null) {
            $response['data'] = $data;
        }

        echo json_encode($response);
        exit;
    }

    /**
     * Get bearer token from header
     */
    public function get_bearer_token()
    {
        $headers = $this->get_authorization_header();
        
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        
        return null;
    }

    /**
     * Get authorization header
     */
    private function get_authorization_header()
    {
        $headers = null;
        
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        
        return $headers;
    }
}
