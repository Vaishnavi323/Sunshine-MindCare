<?php
defined('BASEPATH') or exit('No direct script access allowed');

class AdminModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function login($email, $password)
    {
        return $this->db
            ->where('email', $email)
            ->where('password', $password)
            ->get('admin')
            ->row_array();
    }
}
