<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Job
{
    public static function schema()
    {
        return [
            'id' => ['type' => 'INT', 'auto_increment' => true, 'primary' => true],
            'heading' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => false],
            'department' => ['type' => 'VARCHAR', 'constraint' => 150, 'null' => false],
            'salary_lpa' => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => false],
            'type' => ['type' => 'ENUM', 'constraint' => ['fulltime', 'parttime', 'internship'], 'null' => false],
            'experience' => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => false],
            'requirements' => ['type' => 'TEXT', 'null' => false],
            'description' => ['type' => 'TEXT', 'null' => false],
            'post_date' => ['type' => 'DATE', 'null' => false],
            'location' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => false],
            'status' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true]
        ];
    }

    public static function tableName() { return 'jobs'; }
}
