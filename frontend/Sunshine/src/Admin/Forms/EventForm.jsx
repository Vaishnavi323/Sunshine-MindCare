import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpload,
  faImage,
  faCalendarAlt,
  faMapMarkerAlt,
  faUsers,
  faHospital,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: event?.heading || "",
    date: event?.date || "",
    time: event?.time || "",
    venue: event?.venue || "",
    hospital: event?.hospital || "Sunshine",
    participants: event?.participants || "",
    description: event?.description || "",
  });

  const [imagePreview, setImagePreview] = useState(event?.image_url || "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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
      setImageFile(file);
      
      // Create preview URL only for display
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Prepare form data for API
      const submitData = {
        heading: formData.title,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        description: formData.description,
        imageFile: imageFile, // Send the File object
        // Include existing image URL if editing and no new file
        existingImage: event?.image_url || ""
      };
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2a5298] text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {event ? "Edit Event" : "Create New Event"}
            </h2>
            <button
              onClick={onCancel}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              disabled={uploading}
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
              <label className="block text-sm font-semibold text-[#2a5298]">
                Event Image
              </label>
              
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                    disabled={uploading}
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group ${
                    uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#2a5298]'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faImage}
                    className={`text-4xl mb-4 group-hover:text-[#2a5298] ${
                      uploading ? 'text-gray-300' : 'text-gray-400'
                    }`}
                  />
                  <p className={`mb-2 ${
                    uploading ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Click to upload event image
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
                disabled={uploading}
              />

              {!imagePreview && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  <FontAwesomeIcon icon={faUpload} />
                  <span>Choose Image</span>
                </button>
              )}
            </div>

            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={uploading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                placeholder="Enter event title"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 pl-12 disabled:opacity-50"
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Time *
                </label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  disabled={uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="e.g., 10:00 AM - 2:00 PM"
                />
              </div>
            </div>

            {/* Venue and Hospital */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Venue *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 pl-12 disabled:opacity-50"
                    placeholder="Enter venue"
                  />
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Hospital
                </label>
                <div className="relative">
                  <select
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 pl-12 appearance-none disabled:opacity-50"
                  >
                    <option value="Sunshine">Sunshine</option>
                    <option value="Manoday">Manoday</option>
                    <option value="Both">Both</option>
                  </select>
                  <FontAwesomeIcon
                    icon={faHospital}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Participants */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Expected Participants
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 pl-12 disabled:opacity-50"
                  placeholder="Enter number"
                />
                <FontAwesomeIcon
                  icon={faUsers}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={uploading}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                placeholder="Enter event description"
              />
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={uploading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-[#2a5298] text-white py-3 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 border border-[#2a5298] disabled:opacity-50 flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    {event ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  event ? "Update Event" : "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;