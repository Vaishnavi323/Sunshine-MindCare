<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class JobLib {

    protected $CI;

    public function __construct() {

        $this->CI =& get_instance();
        $this->CI->load->model('JobModel');
    }


public function addJob($data) {
    $insert_id = $this->CI->JobModel->insertJob($data);

    if ($insert_id) {
        
        $data['id'] = $insert_id;

        return [
            'status'  => true,
            'message' => 'Job added',
            'data'    => $data
        ];
    } else {
        return ['status' => false, 'message' => 'Failed'];
    }
}



    public function updateJob($data) {
        return $this->CI->JobModel->updateJob($data) ? ['status' => true, 'message' => 'Updated']
                        : ['status' => false, 'message' => 'Failed'];
    }

    public function deleteJob($id) {
        return $this->CI->JobModel->deleteJob($id);
    }

    public function getJobList() {
        return $this->CI->JobModel->getJobs();
    }
}
