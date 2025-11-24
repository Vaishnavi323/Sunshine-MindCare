<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FeedbackLib {

    protected $CI;

    public function __construct() {
        $this->CI = &get_instance();
        $this->CI->load->model('FeedbackModel');
    }

 public function addReview($input) {

    // Only rating required
    if (empty($input['rating'])) {
        return ["success" => false, "message" => "Rating is required"];
    }

    // Optional fields
    $data = [
        "rating"    => $input['rating'],
        "full_name" => !empty($input['full_name']) ? $input['full_name'] : null,
        "email"     => !empty($input['email']) ? $input['email'] : null,
        "message"   => !empty($input['message']) ? $input['message'] : null,
        "created_at"=> date('Y-m-d H:i:s')
    ];

    // Optional: If email provided then validate
    if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        return ["success" => false, "message" => "Invalid email format"];
    }

    $insert = $this->CI->FeedbackModel->addFeedback($data);

    if (!$insert) {
        return ["success" => false, "message" => "Failed to submit review"];
    }

    $insertId = $this->CI->db->insert_id();

    return [
        "success" => true,
        "message" => "Thank you for your feedback!",
        "data" => [
		            "id" => $insertId,
					$data

		]
    ];
}


public function approveFeedback($input) {
    if (empty($input['id']) || !is_numeric($input['id'])) {
        return ["success" => false, "message" => "Valid feedback ID required"];
    }

    $status = isset($input['status']) ? (int)$input['status'] : 1; // Default Approve

    $updated = $this->CI->FeedbackModel->updateStatus($input['id'], $status);

    if (!$updated) {
        return ["success" => false, "message" => "Failed to update status"];
    }

    return ["success" => true, "message" => $status ? "Feedback approved" : "Feedback disapproved"];
}

public function getFeedbackByStatus($status)
{
    $feedbacks = $this->CI->FeedbackModel->getFeedbackByStatus($status);

    if (!$feedbacks) {
        return ["success" => false, "message" => "No feedback found"];
    }

    return ["success" => true, "data" => $feedbacks];
}

public function getAllFeedback()
{
    $feedbacks = $this->CI->FeedbackModel->getAllFeedback();

    if (!$feedbacks) {
        return ["success" => false, "message" => "No feedback found"];
    }

    return ["success" => true, "data" => $feedbacks];
}


}
