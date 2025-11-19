<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AppointmentLib {

    protected $CI;

    public function __construct() {
        $this->CI = &get_instance();
        $this->CI->load->model('AppointmentModel');
    }

   public function addAppointment($input) 
{
    // Required validation
    $required = ['name', 'contact_no', 'email', 'appointment_date', 'appointment_time', 'service_id'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            return [
                "success" => false,
                "message" => "$field is required"
            ];
        }
    }

    // Prepare Data
    $data = [
        "name"                 => $input['name'],
        "phone"                => $input['contact_no'],
        "alternate_contact_no" => $input['alternate_contact_no'] ?? null,
        "email"                => $input['email'],

        "service_id"           => $input['service_id'],
        "sub_service_id"       => $input['sub_service_id'] ?? null,

        "appointment_date"     => $input['appointment_date'],
        "appointment_time"     => $input['appointment_time'],
        "message"              => $input['description'] ?? null,

        "status"               => "pending",
        "created_at"           => date("Y-m-d H:i:s")
    ];

    // Call Model to insert
    $insertID = $this->CI->AppointmentModel->insertAppointment($data);

   
    $service = $this->CI->db->get_where('services', ['id' => $input['service_id']])->row_array();

    $subService = null;
    if (!empty($input['sub_service_id'])) {
        $subService = $this->CI->db->get_where('sub_services', ['id' => $input['sub_service_id']])->row_array();
    }

    return [
        "success" => true,
        "message" => "Appointment added successfully",
        "data" => array_merge(
            ["appointment_id" => $insertID],
            $data,
            [
                "service_name" => $service['title'] ?? null,
                "sub_service_name" => $subService['title'] ?? null
            ]
        )
    ];
}


	// Get all appointment
    public function getAppointments()
	{
     $this->CI->db->select('a.*, s.title AS service_name, ss.title AS sub_service_name');
    $this->CI->db->from('appointments a');
    $this->CI->db->join('services s', 's.id = a.service_id', 'left');
    $this->CI->db->join('sub_services ss', 'ss.id = a.sub_service_id', 'left');
    return $this->CI->db->get()->result_array();
	}

// Get appointment by ID
	public function getAppointmentById($id)
	{
     $this->CI->db->select('a.*, s.title AS service_name, ss.title AS sub_service_name');
    $this->CI->db->from('appointments a');
    $this->CI->db->join('services s', 's.id = a.service_id', 'left');
    $this->CI->db->join('sub_services ss', 'ss.id = a.sub_service_id', 'left');
    return $this->CI->db->get()->result_array();
	}

	public function adminRescheduleAppointment($input)
{
    if (empty($input['appointment_id']) || empty($input['appointment_date']) || empty($input['appointment_time'])) {
        return [
            "success" => false,
            "message" => "appointment_id, appointment_date and appointment_time are required"
        ];
    }

    // Fetch existing appointment
    $appointment = $this->CI->AppointmentModel->getAppointmentById($input['appointment_id']);
    if (!$appointment) {
        return [
            "success" => false,
            "message" => "Appointment not found"
        ];
    }

    // UPDATED final logic based on your DB
    $data = [
        "appointment_date" => $input['appointment_date'],
        "appointment_time" => $input['appointment_time'],
        "status" => "rescheduled",
    ];

    // Add service reason in new column (you already created)
    if (!empty($input['reason'])) {
        $data["reschedule_reason"] = $input['reason'];
    }

    // Update DB
    $update = $this->CI->AppointmentModel->updateAppointment($input['appointment_id'], $data);

    if ($update) {
        return [
            "success" => true,
            "message" => "Appointment rescheduled successfully by admin",
            "data" => array_merge(["appointment_id" => $input['appointment_id']], $data)
        ];
    }

    return ["success" => false, "message" => "Failed to reschedule appointment"];
}


}

