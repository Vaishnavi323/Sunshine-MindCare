<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SubServiceService
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->load->model('SubServiceModel');
    }

    public function add($data)
    {
        if (empty($data['service_id']) || empty($data['title'])) {
            return [
                "status" => false,
                "message" => "Service ID and Sub-Service title required"
            ];
        }

        $insert = [
            "service_id"  => $data['service_id'],
            "title"       => $data['title'],
            "description" => $data['description'] ?? "",
			 "image"       => $data['image'] ?? null,
            "created_at"  => date("Y-m-d H:i:s")
        ];

        if ($this->CI->SubServiceModel->addSubService($insert)) {
            return ["status" => true, "message" => "Sub-Service added"];
        }

        return ["status" => false, "message" => "Failed to add"];
    }

    public function list()
    {
        return [
            "status" => true,
            "data"   => $this->CI->SubServiceModel->getSubServices()
        ];
    }
}
