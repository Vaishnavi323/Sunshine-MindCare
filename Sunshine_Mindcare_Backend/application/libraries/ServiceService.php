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

	public function list($id = null)
	{
		if ($id) { // Single service fetch
			$service = $this->CI->ServiceModel->getServiceById($id);
			if (!$service) {
				return ["status" => false, "message" => "Service not found"];
			}

			$sub_services = $this->CI->ServiceModel->getSubServices($id);

			return [
				"status" => true,
				"data" => [
					"id" => $service->id,
					"title" => $service->title,
					"description" => $service->description,
					"image" => $service->image,
					"created_at" => $service->created_at,
					"sub_services" => $sub_services
				]
			];
		}

		// Fetch all services with sub-services
		$services = $this->CI->ServiceModel->getServices();

		foreach ($services as &$service) {
			$service->sub_services = $this->CI->ServiceModel->getSubServices($service->id);
		}

		return ["status" => true, "data" => $services];
	}

}
