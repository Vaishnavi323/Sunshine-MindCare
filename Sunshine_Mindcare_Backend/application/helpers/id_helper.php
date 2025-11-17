<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('generate_unique_id')) {
    function generate_unique_id($prefix = '')
    {
        return $prefix . uniqid() . bin2hex(random_bytes(8));
    }
}
