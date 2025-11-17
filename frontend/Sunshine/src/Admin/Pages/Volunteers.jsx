import React, { useState } from 'react';
import CustomAlert from '../../CustomAlert/CustomAlert';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Anita Desai',
      email: 'anita@example.com',
      phone: '+91 9876543210',
      skills: ['Counseling', 'Event Management'],
      availability: 'Weekends',
      status: 'active',
      joinDate: '2024-01-10',
      events: 3
    },
    {
      id: 2,
      name: 'Rohan Mehra',
      email: 'rohan@example.com',
      phone: '+91 9876543211',
      skills: ['Social Media', 'Photography'],
      availability: 'Flexible',
      status: 'active',
      joinDate: '2024-01-08',
      events: 2
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      email: 'sneha@example.com',
      phone: '+91 9876543212',
      skills: ['Teaching', 'Child Care'],
      availability: 'Evenings',
      status: 'pending',
      joinDate: '2024-01-05',
      events: 0
    }
  ]);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVolunteer = {
      id: volunteers.length + 1,
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      events: 0
    };
    setVolunteers([...volunteers, newVolunteer]);
    setShowForm(false);
    setFormData({
      name: '', email: '', phone: '', skills: '', availability: ''
    });
    setAlert({
      type: 'success',
      message: 'Volunteer added successfully!'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === id ? { ...volunteer, status: newStatus } : volunteer
    ));
    setAlert({
      type: 'success',
      message: 'Volunteer status updated successfully!'
    });
  };

  const handleDelete = (id) => {
    setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
    setAlert({
      type: 'success',
      message: 'Volunteer removed successfully!'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteers Management</h1>
          <p className="text-gray-600">Manage foundation volunteers and their information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          + Add Volunteer
        </button>
      </div>

      {/* Add Volunteer Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Volunteer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Counseling, Event Management, Teaching"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                >
                  Add Volunteer
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-primary-600">{volunteers.length}</div>
          <div className="text-sm text-gray-600">Total Volunteers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {volunteers.filter(v => v.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {volunteers.filter(v => v.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {volunteers.reduce((sum, v) => sum + v.events, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{volunteer.name}</h3>
                <p className="text-gray-600">{volunteer.email}</p>
              </div>
              <select
                value={volunteer.status}
                onChange={(e) => handleStatusChange(volunteer.id, e.target.value)}
                className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${getStatusColor(volunteer.status)}`}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📞</span>
                {volunteer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                Available: {volunteer.availability}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">🎯</span>
                Events: {volunteer.events}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                Joined: {new Date(volunteer.joinDate).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Skills:</div>
              <div className="flex flex-wrap gap-1">
                {volunteer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                Edit
              </button>
              <button 
                onClick={() => handleDelete(volunteer.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {volunteers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Volunteers Found</h3>
          <p className="text-gray-600">Get started by adding your first volunteer.</p>
        </div>
      )}
    </div>
  );
};

export default Volunteers;