import React, { useState } from 'react';
import CustomAlert from '../../CustomAlert/CustomAlert';

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState([
    {
      id: 1,
      title: 'Mental Health Awareness Programs',
      category: 'Awareness',
      status: 'active',
      participants: 1500,
      description: 'Community programs to raise awareness about mental health issues.',
      image: '🧠'
    },
    {
      id: 2,
      title: 'Counselling Camps',
      category: 'Support',
      status: 'active',
      participants: 800,
      description: 'Free counseling sessions and mental health check-ups.',
      image: '💬'
    },
    {
      id: 3,
      title: 'Child & Adolescent Care',
      category: 'Youth',
      status: 'planning',
      participants: 0,
      description: 'Specialized programs for children and teenagers.',
      image: '👦'
    }
  ]);
  const [alert, setAlert] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Awareness': return 'bg-purple-100 text-purple-800';
      case 'Support': return 'bg-pink-100 text-pink-800';
      case 'Youth': return 'bg-indigo-100 text-indigo-800';
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Initiatives Management</h1>
        <p className="text-gray-600">Manage all foundation initiatives and programs</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-primary-600">{initiatives.length}</div>
          <div className="text-sm text-gray-600">Total Initiatives</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {initiatives.filter(i => i.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Programs</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {initiatives.filter(i => i.status === 'planning').length}
          </div>
          <div className="text-sm text-gray-600">In Planning</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {initiatives.reduce((sum, i) => sum + i.participants, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Participants</div>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{initiative.image}</div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(initiative.status)}`}>
                  {initiative.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(initiative.category)}`}>
                  {initiative.category}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{initiative.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <strong>{initiative.participants}</strong> participants
              </div>
              <div className="flex space-x-2">
                <button className="bg-primary-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Initiative Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center text-2xl">
          +
        </button>
      </div>
    </div>
  );
};

export default Initiatives;