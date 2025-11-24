<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Doctor
{
    public static function schema()
    {
        return [
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
                'primary' => true
            ],
            'full_name' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => 20,
                'null' => false
            ],
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
                'null' => false
            ],
            'specialization' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'experience' => [
                'type' => 'VARCHAR',
                'constraint' => 50,
                'null' => true
            ],
            'qualification' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'description' => [
                'type' => 'TEXT',
                'null' => true
            ],
            'photo' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ]
        ];
    }

    public static function tableName()
    {
        return 'doctors';
    }
}
