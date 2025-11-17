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
        // Get admin by email
        $admin = $this->db
            ->where('email', $email)
            ->get('admin')
            ->row_array();

        if ($admin) {
            // Check if password is encrypted or plain text
            if (substr($admin['password'], 0, 4) === '$2y$' || substr($admin['password'], 0, 4) === '$2a$') {
                // Password is hashed - use password_verify
                if (password_verify($password, $admin['password'])) {
                    return $admin;
                }
            } else {
                // Password is plain text - direct comparison
                if ($password === $admin['password']) {
                    return $admin;
                }
            }
        }

        return false;
    }
}
