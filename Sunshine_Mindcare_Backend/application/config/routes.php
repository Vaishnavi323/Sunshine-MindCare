<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['admin/login'] = 'admincontroller/login';
$route['service/add']  = 'ServiceController/add';
$route['service/list'] = 'ServiceController/list';
$route['subservice/add'] = 'SubServiceController/add';
$route['subservice/list'] = 'SubServiceController/list';
$route['appointment/add'] = 'AppointmentController/add';
$route['appointment/list']='AppointmentController/get';
$route['article/add']='ArticleController/add';
$route['article/list']='ArticleController/list';
$route['article/delete']='ArticleController/delete';
// $route['appointment/reschedule']='AppointmentController/adminReschedule';
$route['event/add'] = 'EventController/add';
$route['event/list'] = 'EventController/list';
$route['event/update'] = 'EventController/update';
$route['event/delete'] = 'EventController/delete';
$route['event/past'] = 'EventController/past';
$route['event/upcoming'] = 'EventController/upcoming';
$route['blog/add'] = 'BlogController/add';
$route['blog/list'] ='BlogController/list';
$route['blog/delete'] = 'BlogController/delete';
$route['job/add'] = 'JobController/add';
$route['job/list'] = 'JobController/list';
$route['job/update'] = 'JobController/update';
$route['job/delete'] = 'JobController/delete';
$route['feedback/add'] = 'FeedbackController/add';
$route['feedback/get'] = 'FeedbackController/get';
$route['feedback/approve'] = 'FeedbackController/update';
$route['feedback/getapproved'] = 'FeedbackController/getApproved';
$route['feedback/getall'] = 'FeedbackController/getAll';
