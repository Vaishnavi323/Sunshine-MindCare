import React, { useState, useEffect } from 'react';

const categories = ['Psychotherapy', 'Rehabilitation', 'Creative', 'Alternative', 'Medical', 'Wellness', 'Other'];

const AdminTherapy = () => {
  const [therapies, setTherapies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const token = sessionStorage.getItem("admin_token");
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch therapies on mount
  useEffect(() => {
    fetchTherapies();
  }, []);

  // Auto-hide alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Fetch all therapies
  const fetchTherapies = async () => {
    try {
      setInitialLoading(true);
      const response = await fetch(`${API_BASE_URL}/therapy/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch therapies');

      const result = await response.json();

      if (result.status && Array.isArray(result.error)) {
        const transformed = result.error.map(t => ({
          id: t.id,
          title: t.therapy_name,
          description: t.therapy_description || 'No description available',
          category: t.type_of_therapy || 'Other'
        }));
        setTherapies(transformed);
      } else {
        throw new Error(result.message || 'Invalid response');
      }
    } catch (error) {
      console.error('Error fetching therapies:', error);
      setAlert({ type: 'error', message: 'Failed to load therapies.' });
    } finally {
      setInitialLoading(false);
    }
  };

  // Add new therapy
  const addTherapyAPI = async (data) => {
    const response = await fetch(`${API_BASE_URL}/therapy/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        therapy_name: data.title,
        therapy_description: data.description,
        type_of_therapy: data.category,
      }),
    });
    return await response.json();
  };

  // Delete therapy
  const deleteTherapyAPI = async (id) => {
    const response = await fetch(`${API_BASE_URL}/therapy/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await addTherapyAPI(formData);
      if (response.status) {
        await fetchTherapies(); // Refresh list
        setAlert({ type: 'success', message: 'Therapy added successfully!' });
        handleFormClose();
      } else {
        throw new Error(response.message || 'Failed to add therapy');
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Failed to add therapy.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this therapy? This action cannot be undone.')) return;

    setLoading(true);
    try {
      const response = await deleteTherapyAPI(id);
      if (response.status) {
        setTherapies(prev => prev.filter(t => t.id !== id));
        setAlert({ type: 'success', message: 'Therapy deleted successfully!' });
      } else {
        throw new Error(response.message || 'Failed to delete');
      }
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Delete failed.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setFormData({ title: '', description: '', category: '' });
    setErrors({});
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const filteredTherapies = therapies
    .filter(therapy => {
      const matchesSearch = therapy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || therapy.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading therapies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-6 py-4 rounded-xl shadow-lg border ${
            alert.type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'
          }`}>
            <span className="font-semibold">{alert.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Therapy Management</h1>
          <p className="text-gray-600 mt-2">Add and manage therapeutic treatments</p>
        </div>

        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Therapies</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{therapies.length}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={fetchTherapies}
                  disabled={loading}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  🔄 Refresh
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Therapy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow mb-8 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search therapies by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTherapies.length} of {therapies.length} therapies
          </div>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Therapy</h2>
                  <button
                    onClick={handleFormClose}
                    disabled={loading}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Therapy Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Enter therapy title"
                    />
                    {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter therapy description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-300' : 'border-gray-300'}`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category}</p>}
                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleFormClose}
                      disabled={loading}
                      className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? <>⟳ Adding...</> : 'Add Therapy'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Therapies List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {filteredTherapies.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No therapies found</h3>
              <p className="text-gray-600">
                {therapies.length === 0 ? 'Add your first therapy to get started' : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTherapies.map(therapy => (
                <div key={therapy.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{therapy.title}</h3>

                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {therapy.category}
                        </span>
                      </div>

                      {therapy.description && (
                        <div className="mb-4">
                          <p className="text-gray-600">{therapy.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center">
                      <button
                        onClick={() => handleDelete(therapy.id)}
                        disabled={loading}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete therapy"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Total therapies: {therapies.length} • Click the delete icon to remove a therapy</p>
        </div>
      </div>
    </div>
  );
};

export default AdminTherapy;