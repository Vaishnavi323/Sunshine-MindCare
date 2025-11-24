<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DoctorLib {

    private $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->library('upload');
    }

    public function uploadImage($field_name, $upload_path) {
        $config = [
            'upload_path' => $upload_path,
            'allowed_types' => 'jpg|jpeg|png',
            'max_size' => 2048 // 2MB
        ];

        $this->CI->upload->initialize($config);

        if (!$this->CI->upload->do_upload($field_name)) {
            return ['status' => false, 'error' => $this->CI->upload->display_errors()];
        } else {
            $file_data = $this->CI->upload->data();
           return [
    'status' => true,
    'file_path' => base_url('uploads/doctors/' . $file_data['file_name'])
];
        }
    }
}
