<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('get_request_data')) {
    function get_request_data() {
        $input = file_get_contents('php://input');
        return json_decode($input, true);
    }
}

if (!function_exists('get_auth_token')) {
    function get_auth_token() {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            return str_replace('Bearer ', '', $headers['Authorization']);
        }
        return null;
    }
}
