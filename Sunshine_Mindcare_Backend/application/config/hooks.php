<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/userguide3/general/hooks.html
|
*/
$hook['post_controller_constructor'][] = array(
    'class'    => 'DbMigrationHook',
    'function' => 'migrate',
    'filename' => 'DbMigrationHook.php',
    'filepath' => 'hooks',
    'params'   => array()
);


$hook['post_controller_constructor'][] = array(
    'class'    => 'AuthTokenHook',
    'function' => 'validateToken',
    'filename' => 'AuthTokenHook.php',
    'filepath' => 'hooks'
);

$hook['post_controller_constructor'][] = array(
    'class'    => 'DynamicFixHook',
    'function' => 'fixDynamicProperties',
    'filename' => 'DynamicFixHook.php',
    'filepath' => 'hooks'
);

