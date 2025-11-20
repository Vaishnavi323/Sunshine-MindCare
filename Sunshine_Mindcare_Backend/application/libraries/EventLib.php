<?php
class EventLib {

    protected $CI;

    public function __construct() {
        $this->CI = &get_instance();
        $this->CI->load->model('EventModel');
    }

   public function addEvent($input) 
{
    // Validate required fields
    if (empty($_FILES['image']['name'])) {
        return ["success" => false, "message" => "Image is required"];
    }

    if (empty($input['heading']) || empty($input['date'])) {
        return ["success" => false, "message" => "Heading and date are required"];
    }

    // Upload directory
    $uploadPath = './uploads/events/';

    // Create directory if not exists
    if (!is_dir($uploadPath)) {
        mkdir($uploadPath, 0777, true);
    }

    // Upload Configuration
    $config['upload_path']   = $uploadPath;
    $config['allowed_types'] = 'jpg|jpeg|png|webp';
    $config['max_size']      = 2048;
    $config['file_name']     = time() . '_' . preg_replace('/[^A-Za-z0-9.\-_]/', '_', $_FILES['image']['name']); // Secure file name

    $this->CI->load->library('upload', $config);
    $this->CI->upload->initialize($config);

    // Upload Image
    if (!$this->CI->upload->do_upload('image')) {
        return [
            "success" => false,
            "message" => strip_tags($this->CI->upload->display_errors()) 
        ];
    }

    $fileData = $this->CI->upload->data();

    // Prepare data for DB
    $data = [
        "heading"    => $input['heading'],
        "venue"      => !empty($input['venue']) ? $input['venue'] : null, 
        "date"       => $input['date'],
		"time"       => $input['time'],
        "image"      => 'uploads/events/' . $fileData['file_name'],
		"description" => !empty($input['description']) ? $input['description'] : null, 
        "created_at" => date('Y-m-d H:i:s')
    ];

    // Insert into DB
    $insertID = $this->CI->EventModel->addEvent($data);

    if (!$insertID) {
        return ["success" => false, "message" => "Failed to add event. Please try again"];
    }

    // Success Response
    return [
        "success" => true,
        "message" => "Event added successfully",
        "data" => [
            "event_id"  => $insertID,
            "heading"   => $data['heading'],
            "venue"     => $data['venue'],
            "date"      => $data['date'],
			"time"      => $data['time'],
			"description" => $data['description'],
            "image_url" => base_url($data['image']) 
        ]
    ];
}

    public function listEvents($id = null) {
        $events = $this->CI->EventModel->getEvents($id);

        if (!$events) return ["success" => false, "message" => "No event found"];

        if ($id) {
            $events['image_url'] = base_url($events['image']);
        } else {
            foreach ($events as &$row) {
                $row['image_url'] = base_url($row['image']);
            }
        }

        return ["success" => true, "data" => $events];
    }


	//update event 
	public function updateEvent($input, $files = null){
    
        // Force $files to be $_FILES if not passed
        if ($files === null) {
            $files = $_FILES;
        }

        if (empty($input['id']) || !is_numeric($input['id'])) {
            return ["success" => false, "message" => "Valid Event ID is required"];
        }

        $eventId = (int)$input['id'];

        // Validate required fields
        if (empty(trim($input['heading'])) || empty($input['date'])) {
            return ["success" => false, "message" => "Heading and date are required"];
        }

        // Check if event exists
        $eventData = $this->CI->EventModel->getEventById($eventId);
        if (!$eventData) {
            return ["success" => false, "message" => "Event not found"];
        }

        $uploadPath = FCPATH . 'uploads/events/';
        if (!is_dir($uploadPath)) {
            mkdir($uploadPath, 0777, true);
        }

        $imagePath = $eventData->image; // Keep old image by default

        // Handle image upload
        if (!empty($files['image']['name']) && $files['image']['error'] !== UPLOAD_ERR_NO_FILE) {
            
            if ($files['image']['error'] !== 0) {
                return ["success" => false, "message" => "File upload error: " . $files['image']['error']];
            }

            $config = [
                'upload_path'   => $uploadPath,
                'allowed_types' => 'jpg|jpeg|png|webp',
                'max_size'     => 2048, // 2MB
                'file_name'    => time() . '_' . rand(1000, 9999) . '_' . preg_replace("/[^A-Za-z0-9.\-_]/", '', $files['image']['name']),
                'overwrite'    => false
            ];

            $this->CI->upload->initialize($config);

            if (!$this->CI->upload->do_upload('image')) {
                return [
                    "success" => false,
                    "message" => strip_tags($this->CI->upload->display_errors())
                ];
            }

            $uploadData = $this->CI->upload->data();
            $imagePath = 'uploads/events/' . $uploadData['file_name'];

            // Delete old image if exists and not default
            $oldImagePath = FCPATH . $eventData->image;
            if ($eventData->image && file_exists($oldImagePath) && strpos($eventData->image, 'default') === false) {
                @unlink($oldImagePath);
            }
        }

        // Prepare data for update
        $updateData = [
            'heading'    => ($input['heading']),
            'venue'      => !empty(($input['venue'])) ? ($input['venue']) : null,
            'date'       => date('Y-m-d', strtotime($input['date'])), // Ensure valid date format
            'image'      => $imagePath,
            'created_at' => date('Y-m-d H:i:s')
        ];

        // Update in database
        $this->CI->db->where('id', $eventId);
        $updated = $this->CI->db->update('events', $updateData);

        if (!$updated) {
            return ["success" => false, "message" => "Failed to update event in database"];
        }

        return [
            "success" => true,
            "message" => "Event updated successfully",
            "data" => [
                "event_id"  => $eventId,
                "heading"   => $updateData['heading'],
                "venue"     => $updateData['venue'],
                "date"      => $updateData['date'],
                "image_url" => base_url($updateData['image'])
            ]
        ];
    }


		// dellete 
		public function deleteEvent($eventId)
	{
		if (empty($eventId)) {
			return ["success" => false, "message" => "Event ID is required"];
		}

		// Check if Event exists
		$eventData = $this->CI->EventModel->getEventById($eventId);
		if (!$eventData) {
			return ["success" => false, "message" => "Invalid Event ID"];
		}

		// Delete image if exists
		if (!empty($eventData->image) && file_exists(FCPATH . $eventData->image)) {
			unlink(FCPATH . $eventData->image);
		}

		// Delete record
		$deleted = $this->CI->EventModel->deleteEvent($eventId);

		if (!$deleted) {
			return ["success" => false, "message" => "Failed to delete event"];
		}

		return [
			"success" => true,
			"message" => "Event deleted successfully",
			"data" => ["id" => $eventId]
		];
	}


}
