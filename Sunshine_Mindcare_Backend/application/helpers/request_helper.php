<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('get_request_data')) {
    function get_request_data()
    {
        return json_decode(file_get_contents("php://input"), true);
    }
}
