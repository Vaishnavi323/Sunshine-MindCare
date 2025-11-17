import React, { useState } from 'react';
import CustomAlert from '../../CustomAlert/CustomAlert';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      email: 'sarah@empathyfoundation.org',
      phone: '+91 9876543210',
      department: 'Leadership',
      joinDate: '2020-01-15',
      status: 'active',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Mike Chen',
      role: 'Head of Counseling',
      email: 'mike@empathyfoundation.org',
      phone: '+91 9876543211',
      department: 'Counseling',
      joinDate: '2020-03-20',
      status: 'active',
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      role: 'Program Manager',
      email: 'priya@empathyfoundation.org',
      phone: '+91 9876543212',
      department: 'Operations',
      joinDate: '2021-06-10',
      status: 'active',
      avatar: '👩‍💼'
    }
  ]);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    department: '',
    joinDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: teamMembers.length + 1,
      ...formData,
      status: 'active',
      avatar: '👤'
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowForm(false);
    setFormData({
      name: '', role: '', email: '', phone: '', department: '', joinDate: ''
    });
    setAlert({
      type: 'success',
      message: 'Team member added successfully!'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    setAlert({
      type: 'success',
      message: 'Team member removed successfully!'
    });
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case 'Leadership': return 'bg-purple-100 text-purple-800';
      case 'Counseling': return 'bg-blue-100 text-blue-800';
      case 'Operations': return 'bg-green-100 text-green-800';
      case 'Marketing': return 'bg-yellow-100 text-yellow-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600">Manage foundation team members and staff</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          + Add Team Member
        </button>
      </div>

      {/* Add Team Member Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
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
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
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
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Counseling">Counseling</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                >
                  Add Member
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

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">{member.avatar}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">✉️</span>
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📞</span>
                {member.phone}
              </div>
              <div className="flex items-center text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${getDepartmentColor(member.department)}`}>
                  {member.department}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                Joined {new Date(member.joinDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                Edit
              </button>
              <button 
                onClick={() => handleDelete(member.id)}
                className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {teamMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Team Members Found</h3>
          <p className="text-gray-600">Get started by adding your first team member.</p>
        </div>
      )}
    </div>
  );
};

export default Team;