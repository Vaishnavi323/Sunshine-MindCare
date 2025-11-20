<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class ArticleModel extends CI_Model {

    public function addArticle($data) {
        $this->db->insert('articles', $data);
        return $this->db->insert_id();
    }

    public function getArticles() {
        return $this->db->get('articles')->result_array();
    }

    public function getArticleById($id) {
        return $this->db->get_where('articles', ['id' => $id])->row_array();
    }
	public function updateArticle($id, $data)
	{
		$this->db->where('id', $id);
		return $this->db->update('articles', $data);
	}

	public function deleteArticle($id) {
		return $this->db->delete('articles', ['id' => $id]);
	}
}
