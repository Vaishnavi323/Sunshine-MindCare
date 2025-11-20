<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Blog
{
    public static function schema()
    {
        return [
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
                'primary' => true
            ],
            'image' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true          
            ],
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'date' => [
                'type' => 'DATE',
                'null' => false
            ],
            'heading' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'description' => [
    			'type' => 'VARCHAR',
    			'constraint' => 255,
    			'null' => false
			],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true           
            ],
            'status' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 1           
            ]
        ];
    }

    public static function tableName()
    {
        return 'blogs';
    }
}
