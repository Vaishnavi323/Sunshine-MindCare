import React, { useState } from 'react';
import CustomAlert from '../../CustomAlert/CustomAlert';

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      title: 'Mental Health Workshop',
      category: 'Events',
      hospital: 'Sunshine',
      date: '2024-01-15',
      url: '🏢',
      type: 'image'
    },
    {
      id: 2,
      title: 'Community Counseling',
      category: 'Activities',
      hospital: 'Manoday',
      date: '2024-01-12',
      url: '🌳',
      type: 'image'
    },
    {
      id: 3,
      title: 'Awareness Campaign',
      category: 'Campaigns',
      hospital: 'Both',
      date: '2024-01-10',
      url: '📢',
      type: 'image'
    },
    {
      id: 4,
      title: 'Team Building',
      category: 'Team',
      hospital: 'Both',
      date: '2024-01-08',
      url: '👥',
      type: 'image'
    }
  ]);
  const [alert, setAlert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Events', 'Activities', 'Campaigns', 'Team', 'Media'];

  const handleDelete = (id) => {
    setImages(images.filter(image => image.id !== id));
    setAlert({
      type: 'success',
      message: 'Image deleted successfully!'
    });
  };

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(image => image.category === selectedCategory);

  const getHospitalColor = (hospital) => {
    switch (hospital) {
      case 'Sunshine': return 'bg-yellow-100 text-yellow-800';
      case 'Manoday': return 'bg-purple-100 text-purple-800';
      case 'Both': return 'bg-indigo-100 text-indigo-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600">Manage event photos, campaign images, and media coverage</p>
        </div>
        <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
          + Upload Media
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-primary-600">{images.length}</div>
          <div className="text-sm text-gray-600">Total Images</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {images.filter(i => i.hospital === 'Sunshine').length}
          </div>
          <div className="text-sm text-gray-600">Sunshine Events</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {images.filter(i => i.hospital === 'Manoday').length}
          </div>
          <div className="text-sm text-gray-600">Manoday Events</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-indigo-600">
            {images.filter(i => i.hospital === 'Both').length}
          </div>
          <div className="text-sm text-gray-600">Joint Events</div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover">
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-6xl">
              {image.url}
            </div>
            
            {/* Image Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Category:</span>
                  <span className="font-medium">{image.category}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Date:</span>
                  <span>{new Date(image.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Hospital:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getHospitalColor(image.hospital)}`}>
                    {image.hospital}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-primary-600 transition-colors">
                  View
                </button>
                <button 
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Images Found</h3>
          <p className="text-gray-600">No images found for the selected category.</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center text-2xl">
          +
        </button>
      </div>
    </div>
  );
};

export default Gallery;