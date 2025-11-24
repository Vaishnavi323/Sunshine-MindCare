<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ContactModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }

    // Insert form data (all fields optional)
    public function addMessage($data)
    {
        return $this->db->insert('contact_messages', $data);
    }

	public function getMessages()
{
    return $this->db->order_by('id', 'DESC')->get('contact_messages')->result_array();
}
}
