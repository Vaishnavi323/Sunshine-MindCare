<?php
class EventModel extends CI_Model {

    public function addEvent($data) {
        $this->db->insert('events', $data);
        return $this->db->insert_id();
    }

    public function getEvents($id = null) {
        if ($id) {
            return $this->db->get_where('events', ['id' => $id])->row_array();
        }
        return $this->db->order_by('id', 'DESC')->get('events')->result_array();
    }

	public function getEventById($id)
	{
		return $this->db->get_where('events', ['id' => $id])->row();
	}

	public function updateEvent($id, $data)
	{
		$this->db->where('id', $id);
		return $this->db->update('events', $data);
	}

		public function deleteEvent($id) {
			return $this->db->delete('events', ['id' => $id]);
		}
}
