import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCalendarAlt,
  faMapMarkerAlt,
  faUsers,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    hospital: "Sunshine",
    participants: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        date: event.date || "",
        venue: event.venue || "",
        hospital: event.hospital || "Sunshine",
        participants: event.participants || "",
        description: event.description || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    if (!formData.participants || formData.participants < 1) {
      newErrors.participants = "Number of participants must be at least 1";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        participants: parseInt(formData.participants),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2d365b]">
            {event ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-[#7883ae] hover:text-[#2d365b] transition-colors rounded-xl hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Title */}
          <div>
            <label className="form-label">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Date and Hospital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Event Date *</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7883ae]"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`form-input pl-10 ${
                    errors.date ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                />
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="form-label">Hospital *</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faHospital}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7883ae]"
                />
                <select
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="form-input pl-10"
                >
                  <option value="Sunshine">Sunshine Mindcare</option>
                  <option value="Manoday">Manoday Hospital</option>
                  <option value="Both">Both Hospitals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Venue and Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Venue *</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7883ae]"
                />
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className={`form-input pl-10 ${
                    errors.venue ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter venue address"
                />
              </div>
              {errors.venue && (
                <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
              )}
            </div>

            <div>
              <label className="form-label">Expected Participants *</label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7883ae]"
                />
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  className={`form-input pl-10 ${
                    errors.participants
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="Number of participants"
                  min="1"
                />
              </div>
              {errors.participants && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.participants}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Event Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`form-input ${
                errors.description ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Describe the event purpose, activities, and expected outcomes..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
