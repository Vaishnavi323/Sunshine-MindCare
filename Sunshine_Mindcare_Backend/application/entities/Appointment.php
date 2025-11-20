<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Appointment
{
    public static function schema()
    {
        return [
            'id' => ['type' => 'INT', 'auto_increment' => true, 'primary' => true],
            'name' => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => false],
            'email' => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => false],
            'phone' => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => false],
            'alternate_contact_no' => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => true],
            'service_id' => ['type' => 'INT', 'null' => true],
            'sub_service_id' => ['type' => 'INT', 'null' => true],
            'appointment_date' => ['type' => 'DATE', 'null' => false],
            'appointment_time' => ['type' => 'TIME', 'null' => false],
            'message' => ['type' => 'TEXT', 'null' => true],
            'reschedule_reason' => ['type' => 'TEXT', 'null' => true],
            'status' => ['type' => "ENUM('pending','approved','rejected','rescheduled')", 'default' => 'pending'],
            'created_at' => ['type' => 'DATETIME', 'null' => false],
        ];
    }

    public static function tableName()
    {
        return 'appointments';
    }
}
