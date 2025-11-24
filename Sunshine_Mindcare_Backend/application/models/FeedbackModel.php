<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FeedbackModel extends CI_Model {

    public function addFeedback($data) {
        return $this->db->insert('feedback_reviews', $data);
    }

	public function getFeedbackByStatus($status) {
    return $this->db->where('status', $status)
                    ->order_by('id', 'DESC')
                    ->get('feedback_reviews')->result_array();
}

public function updateStatus($id, $status) {
    return $this->db->where('id', $id)
                    ->update('feedback_reviews', ['status' => $status]);
}
public function getAllFeedback()
{
    return $this->db
        ->order_by('id', 'DESC')
        ->get('feedback_reviews')
        ->result_array();
}
public function deleteFeedback($id) {
    return $this->db->where('id', $id)->delete('feedback_reviews');
}

}
