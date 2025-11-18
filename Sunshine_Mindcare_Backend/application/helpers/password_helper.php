<?php
defined('BASEPATH') or exit('No direct script access allowed');

if (!function_exists('hash_password')) {
    function hash_password($password)
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }
}

if (!function_exists('verify_password')) {
    function verify_password($password, $hash)
    {
        return password_verify($password, $hash);
    }
}
