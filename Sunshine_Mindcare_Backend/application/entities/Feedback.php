<?php 
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Feedback
{
    public static function schema()
    {
        return [
            'id' => [
                'type' => 'INT',
                'auto_increment' => true,
                'primary' => true
            ],

            'rating' => [
                'type' => 'INT',
                'constraint' => 1,
                'null' => false             
            ],

            'full_name' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true              
            ],

            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 150,
                'null' => true             
            ],

            'message' => [
                'type' => 'TEXT',
                'null' => true               
            ],
			 'status' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 0, // 0 = Pending, 1 = Approved
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
        return 'feedback_reviews';
    }
}
