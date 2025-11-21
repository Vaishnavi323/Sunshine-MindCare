import React, { useState } from 'react';
import CustomAlert from '../../CustomAlert/CustomAlert';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([
    
    {
      id: 2,
      name: 'Manoday Hospital',
      type: 'Mental Health Hospital',
      location: 'Nashik',
      contact: '+91 9876543211',
      email: 'contact@manodayhospital.com',
      status: 'active',
      events: 8,
      staff: 15,
      description: 'Specialized mental health hospital providing comprehensive care.',
      image: '🏥',
      instagram: 'https://www.instagram.com/manoday_hospital/'
    }
  ]);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    contact: '',
    email: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHospital = {
      id: hospitals.length + 1,
      ...formData,
      status: 'active',
      events: 0,
      staff: 0,
      image: '🏥'
    };
    setHospitals([...hospitals, newHospital]);
    setShowForm(false);
    setFormData({
      name: '', type: '', location: '', contact: '', email: '', description: ''
    });
    setAlert({
      type: 'success',
      message: 'Hospital added successfully!'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    setHospitals(hospitals.filter(hospital => hospital.id !== id));
    setAlert({
      type: 'success',
      message: 'Hospital removed successfully!'
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Partner Hospitals</h1>
          <p className="text-gray-600">Manage partner hospitals and their information</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          + Add Hospital
        </button>
      </div>

      {/* Add Hospital Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Hospital</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
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
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Counseling Center">Counseling Center</option>
                  <option value="Mental Health Hospital">Mental Health Hospital</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Rehabilitation Center">Rehabilitation Center</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
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
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                >
                  Add Hospital
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

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{hospital.image}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-gray-600">{hospital.type} • {hospital.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                hospital.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {hospital.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{hospital.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">{hospital.events}</div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">{hospital.staff}</div>
                <div className="text-sm text-gray-600">Staff</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📞</span>
                {hospital.contact}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">✉️</span>
                {hospital.email}
              </div>
              {hospital.instagram && (
                <div className="flex items-center text-sm">
                  <a 
                    href={hospital.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <span className="mr-2">📷</span>
                    Instagram Profile
                  </a>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                Edit
              </button>
              <button 
                onClick={() => handleDelete(hospital.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {hospitals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hospitals Found</h3>
          <p className="text-gray-600">Get started by adding your first partner hospital.</p>
        </div>
      )}
    </div>
  );
};

export default Hospitals;