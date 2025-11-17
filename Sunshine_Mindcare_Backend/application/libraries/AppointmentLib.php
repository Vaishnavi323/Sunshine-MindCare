<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AppointmentLib {

    protected $CI;

    public function __construct() {
        $this->CI = &get_instance();
        $this->CI->load->model('Appointment_model');
    }

    public function addAppointment($input) {

        // Required validation
        $required = ['name','contact_no','email','appointment_date','appointment_time','service_id'];

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
        $insertID = $this->CI->Appointment_model->insertAppointment($data);

        return [
            "success" => true,
            "message" => "Appointment added successfully",
            "data" => ["appointment_id" => $insertID]
        ];
    }
}
