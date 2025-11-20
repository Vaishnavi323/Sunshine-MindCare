<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Event
{
    public static function schema()
    {
        return [
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
                'primary' => true
            ],
            'heading' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
			'venue' => [
				'type' => 'VARCHAR', 
				'constraint' => 255, 
				'null' => false
			], 
			'description' => [
				'type' => 'VARCHAR', 
				'constraint' => 255, 
				'null' => false
			], 
            'image' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'date' => [
                'type' => 'DATE',
                'null' => false
            ],
			'time' => [
				'type'=> 'TIME',
				'null' => false
			],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ]
        ];
    }

    public static function tableName()
    {
        return 'events';
    }
}
