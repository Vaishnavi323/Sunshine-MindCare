<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Article
{
    public static function schema()
    {
        return [
            'id' => ['type' => 'INT', 'auto_increment' => true, 'primary' => true],
            'image' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => false],
            'created_at' => ['type' => 'DATETIME', 'null' => true]
        ];
    }

    public static function tableName()
    {
        return 'articles';
    }
}
