<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class DbMigrationHook {
    private $CI;
    private $entityPath;

    public function __construct() {
        $this->CI =& get_instance();
        $this->entityPath = APPPATH . 'entities/';
    }

    public function migrate() {
        if ($this->CI === null) {
            echo('Error: CI instance is null. Hook fired too early.');
            return;
        }

        $this->CI->load->dbforge();
        $entityFiles = $this->getEntityFiles();

        foreach ($entityFiles as $file) {
            $className = pathinfo($file, PATHINFO_FILENAME);
            $this->processEntity($className, $file);
        }
    }

    private function getEntityFiles() {
        $files = [];
        foreach (glob($this->entityPath . '*.php') as $file) {
            $files[] = $file;
        }
        return $files;
    }

    private function processEntity($className, $filePath) {
        if (!file_exists($filePath)) {
            log_message('error', "Entity file '{$className}' not found.");
            return;
        }

        include_once($filePath);

        if (!class_exists($className)) {
            log_message('error', "Entity class '{$className}' not found in file.");
            return;
        }

        $table = $this->camelToSnake($className);
        $schema = $className::schema();

        $primaryKeys = $this->extractPrimaryKeys($schema);

        if (!$this->CI->db->table_exists($table)) {
            $this->CI->dbforge->add_field($schema);
            if (!empty($primaryKeys)) {
                $this->CI->dbforge->add_key($primaryKeys, true);
            }
            $this->CI->dbforge->create_table($table);
            log_message('debug', "✅ Table '{$table}' created successfully.");
        } else {
            log_message('debug', "⚠️ Table '{$table}' already exists.");
        }
    }

    private function camelToSnake($input) {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
    }

    private function extractPrimaryKeys($schema) {
        $keys = [];
        foreach ($schema as $field => $definition) {
            if (isset($definition['primary']) && $definition['primary']) {
                $keys[] = $field;
            }
        }
        return $keys;
    }
}
