// AdminTest.jsx
import React, { useState } from 'react';

// Sample initial tests data
const initialTests = [
    {
        id: 1,
        title: 'Blood Pressure Test',
        description: 'Measures the pressure in your arteries when your heart beats and rests.',
        category: 'Cardiovascular'
    },
    {
        id: 2,
        title: 'Complete Blood Count',
        description: 'Evaluates your overall health and detects a wide range of disorders.',
        category: 'Hematology'
    },
    {
        id: 3,
        title: 'MRI Scan',
        description: 'Uses magnetic fields and radio waves to create detailed images of organs and tissues.',
        category: 'Imaging'
    },
];

// Category options for tests
const categories = ['Cardiovascular', 'Hematology', 'Imaging', 'Neurological', 'Metabolic', 'Genetic', 'Other'];

const AdminTest = () => {
    // State management
    const [tests, setTests] = useState(initialTests);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });

    const [errors, setErrors] = useState({});

    // Filtered tests
    const filteredTests = tests
        .filter(test => {
            const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => a.title.localeCompare(b.title));

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Test title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        return newErrors;
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Add new test
        const newTest = {
            ...formData,
            id: Date.now(), // Simple ID generation
        };

        setTests(prev => [newTest, ...prev]); // Add to beginning of list
        handleFormClose();
    };

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
            setTests(prev => prev.filter(test => test.id !== id));
        }
    };

    // Handle form close
    const handleFormClose = () => {
        setShowForm(false);
        setFormData({
            title: '',
            description: '',
            category: ''
        });
        setErrors({});
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Test Management</h1>
                    <p className="text-gray-600 mt-2">Add and manage medical tests</p>
                </div>

                {/* Stats Card */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{tests.length}</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow mb-8 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search tests by title or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredTests.length} of {tests.length} tests
                    </div>
                </div>

                {/* Add Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Add New Test</h2>
                                    <button
                                        onClick={handleFormClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Test Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.title ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter test title"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Enter test description"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.category ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={handleFormClose}
                                            className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Add Test
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tests List */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    {filteredTests.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tests found</h3>
                            <p className="text-gray-600">
                                {tests.length === 0 ? 'Add your first test to get started' : 'Try adjusting your filters'}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredTests.map(test => (
                                <div key={test.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h3>

                                            <div className="flex items-center gap-4 mb-3">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                                    {test.category}
                                                </span>
                                            </div>

                                            {test.description && (
                                                <div className="mb-4">
                                                    <p className="text-gray-600">{test.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Delete Button */}
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete test"
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

                {/* Footer Note */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Total tests: {tests.length} • Click the delete icon to remove a test</p>
                </div>
            </div>
        </div>
    );
};

export default AdminTest;