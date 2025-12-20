import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://hpcisparesportal.in/Sunshine_Mindcare_Backend';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [viewImage, setViewImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Fetch articles on component mount
    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/article/list`);
            if (response.data.status) {
                // Transform API response to match component structure
                const formattedArticles = response.data.data.map(article => ({
                    id: article.id,
                    image: `${API_BASE_URL}/${article.image.replace(/\\/g, '/')}`,
                    title: article.title || `Article ${article.id}`,
                    createdDate: article.created_at
                }));
                setArticles(formattedArticles);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            alert('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleAddArticle = async (formData) => {
        try {
            setUploading(true);
            const response = await axios.post(`${API_BASE_URL}/article/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                // Refresh articles list
                await fetchArticles();
                setShowAddModal(false);
                alert('Article added successfully!');
            }
        } catch (error) {
            console.error('Error adding article:', error);
            alert('Failed to add article. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteArticle = async (id) => {
        try {
            const formData = new FormData();
            formData.append('id', id);

            const response = await axios.post(`${API_BASE_URL}/article/delete`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status) {
                // Remove from local state
                setArticles(articles.filter(a => a.id !== id));
                setDeleteConfirm(null);
                alert('Article deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1f1f35] mb-2">Articles Management</h1>
                        <p className="text-gray-600 text-lg">Upload and manage article images</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                        <span className="text-xl">+</span>
                        Add New Article
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1f1f35] mb-4"></div>
                        <p className="text-gray-600">Loading articles...</p>
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#1f1f35] to-[#174593] rounded-xl flex items-center justify-center text-2xl">
                                    📰
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#1f1f35]">{articles.length}</h3>
                                    <p className="text-gray-500 font-medium">Total Articles</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                                    🖼️
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#1f1f35]">{articles.length}</h3>
                                    <p className="text-gray-500 font-medium">Images Uploaded</p>
                                </div>
                            </div>
                        </div>

                        {/* Articles Grid */}
                        {articles.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {articles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setViewImage(article)}>
                                            <img
                                                src={article.image}
                                                alt="Article"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                                            </div>
                                        </div>

                                        {/* Card Footer */}
                                        <div className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-semibold text-gray-800 truncate">{article.title}</div>
                                                    <div className="text-sm text-gray-500 mt-1">Uploaded • {formatDate(article.createdDate)}</div>
                                                </div>
                                                <button
                                                    onClick={() => setDeleteConfirm(article.id)}
                                                    className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-all duration-300"
                                                    title="Delete Article"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
                                <p className="text-6xl mb-4">📰</p>
                                <h3 className="text-2xl font-bold text-[#1f1f35] mb-2">No Articles Yet</h3>
                                <p className="text-gray-500 mb-6">Upload your first article image to get started</p>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    Add Article
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add Article Modal */}
            {showAddModal && (
                <AddArticleModal
                    onAdd={handleAddArticle}
                    onCancel={() => setShowAddModal(false)}
                    uploading={uploading}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ⚠️
                            </div>
                            <h3 className="text-xl font-bold text-[#1f1f35] mb-2">Delete Article?</h3>
                            <p className="text-gray-600">Are you sure you want to delete this article? This action cannot be undone.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteArticle(deleteConfirm)}
                                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Image Modal */}
            {viewImage && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setViewImage(null)}>
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setViewImage(null)}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all text-xl"
                        >
                            ✕
                        </button>
                        <img
                            src={viewImage.image}
                            alt={viewImage.title || 'Article Full View'}
                            className="w-full h-auto rounded-xl shadow-2xl"
                        />
                        <div className="mt-4 text-center text-white">
                            <h3 className="text-lg font-semibold mb-1">{viewImage.title}</h3>
                            <p className="text-sm opacity-80">Uploaded: {formatDate(viewImage.createdDate)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add Article Modal Component
const AddArticleModal = ({ onAdd, onCancel, uploading }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [title, setTitle] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('Image must be less than 5MB');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            alert('Please upload an image');
            return;
        }
        if (!title.trim()) {
            alert('Please enter a title for the article');
            return;
        }

        // Create FormData for API call
        const formData = new FormData();
        formData.append('image', imageFile);
        // If your API accepts title, add it here
        // formData.append('title', title.trim());

        onAdd(formData);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-5 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Add New Article</h2>
                    <button
                        onClick={onCancel}
                        className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-[#1f1f35] mb-2">Article Title (Optional)</label>
                        <input 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            type="text" 
                            placeholder="Enter article title" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                        />
                    </div>
                    
                    {/* Image Upload Area */}
                    <div
                        onClick={() => !imagePreview && fileRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                                ? 'border-[#174593] bg-blue-50'
                                : imagePreview
                                    ? 'border-[#174593] bg-gray-50'
                                    : 'border-gray-300 hover:border-[#174593] hover:bg-gray-50'
                            }`}
                    >
                        {imagePreview ? (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-64 mx-auto rounded-lg shadow-md mb-4"
                                />
                                <div className="flex gap-3 justify-center">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            fileRef.current?.click();
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                                    >
                                        Change Image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveImage();
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="text-5xl mb-4">📷</div>
                                <p className="text-gray-700 font-semibold mb-2">
                                    {isDragging ? 'Drop image here' : 'Click or drag image here'}
                                </p>
                                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        )}
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onCancel}
                            disabled={uploading}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!imagePreview || uploading}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${imagePreview && !uploading
                                    ? 'bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white hover:shadow-lg'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                    Uploading...
                                </>
                            ) : 'Add Article'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;