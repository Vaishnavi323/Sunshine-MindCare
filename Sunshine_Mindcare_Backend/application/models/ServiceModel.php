<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ServiceModel extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function addService($data)
    {
        return $this->db->insert('services', $data);
    }

    public function getServices()
    {
        return $this->db->order_by('id', 'DESC')->get('services')->result();
    }

	// Get single service
	public function getServiceById($id)
	{
		return $this->db->get_where('services', ['id' => $id])->row();
	}

	// Get sub-services for a service
	public function getSubServices($service_id)
	{
		return $this->db->get_where('sub_services', ['service_id' => $service_id])->result();
	}
	// Update service
public function updateService($id, $data)
{
    return $this->db->where('id', $id)->update('services', $data);
}

// Soft delete service (status = 0)
public function softDeleteService($id)
{
    return $this->db->where('id', $id)->delete('services'); // update → delete
}

}
