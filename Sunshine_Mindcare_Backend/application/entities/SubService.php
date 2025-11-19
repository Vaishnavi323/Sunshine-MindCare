<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class SubService
{
    public static function schema()
    {
        return [
            'id' => ['type' => 'INT', 'auto_increment' => true, 'primary' => true],
            'service_id' => ['type' => 'INT', 'null' => false],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => false],
            'description' => ['type' => 'TEXT', 'null' => true],
            'price' => ['type' => 'DECIMAL', 'constraint' => '10,2', 'null' => true],
            'duration' => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => true],
            'image' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'status' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => false],
            'updated_at' => ['type' => 'DATETIME', 'null' => true]
        ];
    }

    public static function tableName()
    {
        return 'subservices';
    }
}
