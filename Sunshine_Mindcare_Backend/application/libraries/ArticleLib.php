<?php
defined('BASEPATH') or exit('No direct script access allowed');


class ArticleLib {

    protected $CI;

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->model('ArticleModel');
    }

    public function addArticle($input) {

        if (empty($_FILES['image']['name'])) {
            return ["success" => false, "message" => "Image is required"];
        }

        $uploadPath = './uploads/articles/';
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0777, true);
        }

        $config['upload_path']   = $uploadPath;
        $config['allowed_types'] = 'jpg|jpeg|png|webp';
        $config['max_size']      = 2048; // 2MB
        $config['file_name']     = time() . '_' . $_FILES['image']['name'];

        $this->CI->load->library('upload', $config);

        if (!$this->CI->upload->do_upload('image')) {
            return [
                "success" => false,
                "message" => $this->CI->upload->display_errors()
            ];
        }

        $uploadData = $this->CI->upload->data();

        $data = [
		"image" => 'uploads/articles/' . $uploadData['file_name'],
		"created_at" => date('Y-m-d H:i:s')
        ];

        $insertID = $this->CI->ArticleModel->addArticle($data);

        return [
            "success" => true,
            "message" => "Article image added successfully",
            "data" => [
                "article_id" => $insertID,
                "image_url" => base_url('uploads/articles/' . $data['image'])
            ]
        ];
    }

    public function getArticle($id = null) {
        if ($id) return $this->CI->ArticleModel->getArticleById($id);
        return $this->CI->ArticleModel->getArticles();
    }


		// delelte 
		public function deleteArticle($articleId)
	{
		if (empty($articleId)) {
			return ["success" => false, "message" => "Article ID is required"];
		}

		// Check if Event exists
		$articleData = $this->CI->ArticleModel->getArticleById($articleId);
		if (!$articleData) {
			return ["success" => false, "message" => "Invalid Article ID"];
		}

		// Delete image if exists
		if (!empty($articleData->image) && file_exists(FCPATH . $articleData->image)) {
			unlink(FCPATH . $articleData->image);
		}

		// Delete record
		$deleted = $this->CI->ArticleModel->deleteArticle($articleId);

		if (!$deleted) {
			return ["success" => false, "message" => "Failed to delete article"];
		}

		return [
			"success" => true,
			"message" => "Article deleted successfully",
			"data" => ["id" => $articleId]
		];
	}

}
