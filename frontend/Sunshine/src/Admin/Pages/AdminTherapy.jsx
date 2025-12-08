// AdminTherapy.jsx
import React, { useState, useEffect } from 'react';
import {
    PlusCircle,
    Trash2,
    Edit2,
    Search,
    Filter,
    CheckCircle,
    AlertCircle,
    X,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

// Sample initial therapies data
const initialTherapies = [
    { id: 1, title: 'Cognitive Behavioral Therapy', description: 'A type of psychotherapy that helps patients understand thoughts and feelings influencing behaviors.', category: 'Psychotherapy', createdAt: '2024-01-15', status: 'active' },
    { id: 2, title: 'Physical Therapy', description: 'Restores movement and function when affected by injury, illness or disability.', category: 'Rehabilitation', createdAt: '2024-01-10', status: 'active' },
    { id: 3, title: 'Art Therapy', description: 'Uses creative processes to improve mental health and wellbeing.', category: 'Creative', createdAt: '2024-01-05', status: 'active' },
    { id: 4, title: 'Massage Therapy', description: 'Manual manipulation of soft body tissues to enhance health and wellbeing.', category: 'Alternative', createdAt: '2024-01-20', status: 'inactive' },
];

// Category options
const categories = ['Psychotherapy', 'Rehabilitation', 'Creative', 'Alternative', 'Medical', 'Wellness', 'Other'];

// Status options
const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
    { value: 'draft', label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
];

const AdminTherapy = () => {
    // State management
    const [therapies, setTherapies] = useState(initialTherapies);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        status: 'active'
    });

    const [errors, setErrors] = useState({});

    // Filtered therapies
    const filteredTherapies = therapies
        .filter(therapy => {
            const matchesSearch = therapy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                therapy.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || therapy.category === selectedCategory;
            const matchesStatus = selectedStatus === 'all' || therapy.status === selectedStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    // Stats
    const stats = {
        total: therapies.length,
        active: therapies.filter(t => t.status === 'active').length,
        categories: [...new Set(therapies.map(t => t.category))].length
    };

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
        if (!formData.title.trim()) newErrors.title = 'Title is required';
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

        if (editingId) {
            // Update existing therapy
            setTherapies(prev => prev.map(therapy =>
                therapy.id === editingId
                    ? { ...formData, id: editingId, updatedAt: new Date().toISOString().split('T')[0] }
                    : therapy
            ));
        } else {
            // Add new therapy
            const newTherapy = {
                ...formData,
                id: Date.now(), // Simple ID generation
                createdAt: new Date().toISOString().split('T')[0]
            };
            setTherapies(prev => [...prev, newTherapy]);
        }

        // Reset form
        handleFormClose();
    };

    // Handle edit
    const handleEdit = (therapy) => {
        setFormData({
            title: therapy.title,
            description: therapy.description,
            category: therapy.category,
            status: therapy.status
        });
        setEditingId(therapy.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this therapy? This action cannot be undone.')) {
            setTherapies(prev => prev.filter(therapy => therapy.id !== id));
        }
    };

    // Handle form close
    const handleFormClose = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            category: '',
            status: 'active'
        });
        setErrors({});
    };

    // Toggle description expansion
    const toggleDescription = (id) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Clear filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedStatus('all');
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const option = statusOptions.find(opt => opt.value === status);
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option?.color}`}>
                {option?.label}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Therapy Management</h1>
                    <p className="text-gray-600 mt-2">Add, edit, and manage therapeutic treatments</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Therapies</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <PlusCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Therapies</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Categories</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.categories}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Filter className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white rounded-xl shadow mb-8 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Search and Filters */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search therapies..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap gap-2">
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

                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="all">All Status</option>
                                        {statusOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="title">Title A-Z</option>
                                    </select>

                                    {(searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                                        <button
                                            onClick={clearFilters}
                                            className="px-3 py-2.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                        >
                                            <X className="w-4 h-4" />
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Add New Therapy
                        </button>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredTherapies.length} of {therapies.length} therapies
                    </div>
                </div>

                {/* Add/Edit Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingId ? 'Edit Therapy' : 'Add New Therapy'}
                                    </h2>
                                    <button
                                        onClick={handleFormClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Therapy Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter therapy title"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
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
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter therapy description"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            {errors.category && (
                                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.category}
                                                </p>
                                            )}
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {statusOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
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
                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            {editingId ? 'Update Therapy' : 'Add Therapy'}
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
                            <div className="text-gray-400 mb-4">
                                <Search className="w-16 h-16 mx-auto" />
                            </div>
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
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-lg font-semibold text-gray-900">{therapy.title}</h3>
                                                <StatusBadge status={therapy.status} />
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                                    {therapy.category}
                                                </span>
                                                <span>Created: {therapy.createdAt}</span>
                                            </div>

                                            {therapy.description && (
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-sm font-medium text-gray-700">Description</p>
                                                        <button
                                                            onClick={() => toggleDescription(therapy.id)}
                                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                        >
                                                            {expandedDescriptions[therapy.id] ? (
                                                                <>
                                                                    Show Less <ChevronUp className="w-4 h-4" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Show More <ChevronDown className="w-4 h-4" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <p className={`text-gray-600 ${expandedDescriptions[therapy.id] ? '' : 'line-clamp-2'}`}>
                                                        {therapy.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(therapy)}
                                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit therapy"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(therapy.id)}
                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete therapy"
                                            >
                                                <Trash2 className="w-5 h-5" />
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
                    <p>Total therapies: {therapies.length} • Active: {stats.active} • Use search and filters to find specific therapies</p>
                </div>
            </div>
        </div>
    );
};

export default AdminTherapy;