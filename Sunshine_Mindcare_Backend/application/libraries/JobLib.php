<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Joblib {

    protected $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->model('Jobmodel');
    }

    public function addJob($data) {
        $insert_id = $this->CI->Jobmodel->insertJob($data);
        return $insert_id ? ['status' => true, 'message' => 'Job added', 'id' => $insert_id]
                          : ['status' => false, 'message' => 'Failed'];
    }

    public function updateJob($data) {
        return $this->CI->Jobmodel->updateJob($data) ? ['status' => true, 'message' => 'Updated']
                        : ['status' => false, 'message' => 'Failed'];
    }

    public function deleteJob($id) {
        return $this->CI->Jobmodel->deleteJob($id);
    }

    public function getJobList() {
        return $this->CI->Jobmodel->getJobs();
    }
}
