<?php
 if (!defined('BASEPATH')) exit('No direct script access allowed');

class Service
{
    public static function schema()
    {
        return [
            'id' => ['type' => 'INT', 'auto_increment' => true, 'primary' => true],
            'title' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => false],
            'description' => ['type' => 'TEXT', 'null' => true],
            'image' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'status' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => false],
            'updated_at' => ['type' => 'DATETIME', 'null' => true]
        ];
    }

    public static function tableName()
    {
        return 'services';
    }
}
