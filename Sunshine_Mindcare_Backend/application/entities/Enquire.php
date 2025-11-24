<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiry
{
    public static function schema()
    {
        return [
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
                'primary' => true
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
                'null' => true
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
                'null' => true
            ],
            'phone' => [
                'type' => 'VARCHAR',
                'constraint' => 15,
                'null' => true
            ],
            'subject' => [
                'type' => 'VARCHAR',
                'constraint' => 200,
                'null' => true
            ],
            'message' => [
                'type' => 'TEXT',
                'null' => true
            ],
            'status' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'null' => false,
                'default' => 1   // 1 = active, 0 = inactive (soft delete)
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ]
        ];
    }

    public static function tableName()
    {
        return 'enquires';
    }
}
