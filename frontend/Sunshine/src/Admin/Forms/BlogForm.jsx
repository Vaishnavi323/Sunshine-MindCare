import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faUpload,
    faImage,
    faCalendarAlt,
    faFolder,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const BlogForm = ({ blog, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        description: blog?.description || "",
        category: blog?.category || "Mental Health",
        status: blog?.status || "draft",
        image: blog?.image || "",
    });

    const [imagePreview, setImagePreview] = useState(blog?.image || "");
    const fileInputRef = useRef(null);

    const categories = [
        "Mental Health",
        "Wellness",
        "Meditation",
        "Awareness",
        "Nutrition",
        "Therapy",
        "Self-Care",
        "Research"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Check file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result, // Store base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview("");
        setFormData((prev) => ({
            ...prev,
            image: "",
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title.trim()) {
            alert('Please enter blog title');
            return;
        }
        if (!formData.description.trim()) {
            alert('Please enter blog description');
            return;
        }
        if (formData.description.length < 50) {
            alert('Description should be at least 50 characters long');
            return;
        }
        if (!formData.category) {
            alert('Please select a category');
            return;
        }

        onSubmit(formData);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div
                className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-[#2d365b] text-white p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {blog ? "Edit Blog" : "Create New Blog"}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload Section */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-[#2d365b]">
                                Blog Image *
                            </label>

                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Blog preview"
                                        className="w-full h-64 object-cover rounded-xl border-2 border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="text-sm" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={triggerFileInput}
                                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#2d365b] transition-all duration-300 group"
                                >
                                    <FontAwesomeIcon
                                        icon={faImage}
                                        className="text-4xl text-gray-400 mb-4 group-hover:text-[#2d365b]"
                                    />
                                    <p className="text-gray-600 mb-2">
                                        Click to upload blog image
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        PNG, JPG, JPEG up to 5MB
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                                required={!blog} // Required only for new blogs
                            />
                        </div>

                        {/* Blog Title */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                                Blog Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                                placeholder="Enter blog title"
                            />
                        </div>

                        {/* Category and Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                                    Category *
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300 pl-12 appearance-none"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {/* <FontAwesomeIcon
                                        icon={faFolder}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    /> */}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                                    Status *
                                </label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300 pl-12 appearance-none"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    {/* <FontAwesomeIcon
                                        icon={faUser}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    /> */}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                                placeholder="Write your blog content here..."
                            />
                            <div className="text-sm text-gray-500 mt-2">
                                {formData.description.length} characters (minimum 50 required)
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-[#2d365b] text-white py-3 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 border border-[#2d365b]"
                            >
                                {blog ? "Update Blog" : "Create Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;