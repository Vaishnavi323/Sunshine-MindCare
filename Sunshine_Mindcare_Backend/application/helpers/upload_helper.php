<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

function upload_file($input, $path)
{
    $CI =& get_instance();
    $CI->load->library('upload');

    if (!is_dir($path)) {
        mkdir($path, 0777, true);
    }

    $config = [
        'upload_path'   => $path,
        'allowed_types' => 'jpg|jpeg|png|gif|pdf',
        'max_size'      => 5120,
        'encrypt_name'  => true
    ];

    $CI->upload->initialize($config);

    if (!$CI->upload->do_upload($input)) {
        return ['status' => false, 'error' => $CI->upload->display_errors('', '')];
    }

    return ['status' => true, 'data' => $CI->upload->data()];
}

