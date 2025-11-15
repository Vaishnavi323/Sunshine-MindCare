<?php
function generate_jwt($data)
{
    $CI = &get_instance();
    $CI->load->library('jwt_lib');

    $issuedAt = time();
    $expire = $issuedAt + (60 * 60 * 24); 

    $payload = [
        'iat' => $issuedAt,
        'exp' => $expire,
        'data' => $data
    ];

    return $CI->jwt_lib->encode($payload);
}

function validate_jwt($token)
{
    $CI = &get_instance();
    $CI->load->library('jwt_lib');

    try {
        $decoded = $CI->jwt_lib->decode($token);
         if (isset($decoded->data)) {
            return (array) $decoded->data;
        } else {
            return false;
        }
    } catch (Exception $e) {
        return false;
    }
}
