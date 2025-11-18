<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ServiceService
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->load->model('ServiceModel');
    }

    public function addService($data)
    {
        if (empty($data['title'])) {
            return [
                "status" => false,
                "message" => "Service title is required"
            ];
        }

        $insertData = [
            "title"       => $data['title'],
            "description" => $data['description'] ?? "",
            "image"       => $data['image'] ?? null,
            "created_at"  => date("Y-m-d H:i:s")
        ];

        $insert = $this->CI->ServiceModel->addService($insertData);

        if ($insert) {
            return [
                "status" => true,
                "message" => "Service added successfully",
				"data" => array_merge(
       		 	$data
   			 )
            ];
        }

        return [
            "status" => false,
            "message" => "Failed to add service"
        ];
    }

    public function list()
    {
        return [
            "status" => true,
            "data" => $this->CI->ServiceModel->getServices()
        ];
    }
}
