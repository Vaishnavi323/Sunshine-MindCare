import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

const BlogForm = ({ blog, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    description: blog?.description || "",
    category: blog?.category || "Mental Health",
    status: blog?.status || "draft",
  });

  const [imageFile, setImageFile] = useState(null);              // ✅ ACTUAL FILE
  const [imagePreview, setImagePreview] = useState(blog?.image || ""); // ✅ URL / preview
  const fileInputRef = useRef(null);

  const categories = [
    "Mental Health",
    "Wellness",
    "Meditation",
    "Awareness",
    "Nutrition",
    "Therapy",
    "Self-Care",
    "Research",
  ];

  /* ================= INPUT CHANGE ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= IMAGE CHANGE ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setImageFile(file); // ✅ store file
    setImagePreview(URL.createObjectURL(file)); // ✅ preview only
  };

  /* ================= REMOVE IMAGE ================= */
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter blog title");
      return;
    }

    // if (formData.description.trim().length < 50) {
    //   alert("Description must be at least 50 characters");
    //   return;
  

    const data = new FormData();
    data.append("heading", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("status", formData.status);

    if (imageFile) {
      data.append("image", imageFile); // ✅ FILE goes to backend
    }

    onSubmit(data); // ✅ send FormData
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#2a5298] text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {blog ? "Edit Blog" : "Create New Blog"}
          </h2>
          <button
            onClick={onCancel}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* IMAGE */}
          <div>
            <label className="font-semibold text-[#2a5298]">Blog Image *</label>

            {imagePreview ? (
              <div className="relative mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current.click()}
                className="mt-3 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400 mb-3" />
                <p className="text-gray-600">Click to upload image</p>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              required={!blog}
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="font-semibold text-[#2a5298]">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border px-4 py-3 rounded-lg"
            />
          </div>

          {/* CATEGORY & STATUS */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border px-4 py-3 rounded-lg"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border px-4 py-3 rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-semibold text-[#2a5298]">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full border px-4 py-3 rounded-lg"
                placeholder="Description (optional)"

            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length} / 50 characters
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#2a5298] text-white py-3 rounded-lg"
            >
              {blog ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
