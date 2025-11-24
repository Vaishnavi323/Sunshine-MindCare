import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCalendarAlt,
  faMapMarkerAlt,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faUpload,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../../CustomAlert/CustomAlert";
import EventForm from "../Forms/EventForm";
import { addEvent, getEvents, updateEvent, deleteEvent } from "../../utils/Admin/event";

const baseURL = import.meta.env.VITE_IMAGE_URL;


const Events = () => {

const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Ref for delete alert click-outside
  const deleteAlertRef = useRef(null);
useEffect(() => {
  fetchEvents();
}, []);

const fetchEvents = async () => {
  try {
    const response = await getEvents();
    console.log(response);
    setEvents(response?.data?.data || []); // adjust based on your backend response
  } catch (error) {
    console.error(error);
    setAlert({ type: "error", message: "Failed to load events!" });
  } finally {
    setLoading(false);
  }
};
  // Click outside to close delete alert
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteAlertRef.current &&
        !deleteAlertRef.current.contains(event.target)
      ) {
        setDeleteConfirm(null);
      }
    };

    if (deleteConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteConfirm]);

  // Pagination calculations
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
const handleDelete = async (id) => {
  try {
    const response = await deleteEvent(id);

    if (response?.data?.success) {
      setAlert({ type: "success", message: "Event deleted successfully!" });
      fetchEvents(); // Refresh list after delete
    } else {
      setAlert({ type: "error", message: response?.data?.message || "Failed to delete event" });
    }
  } catch (error) {
    setAlert({ type: "error", message: "Delete failed!" });
  }
  setDeleteConfirm(null);
};

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
  try {
    let response;

    if (editingEvent) {
      // Update event
      response = await updateEvent(editingEvent.id, formData);
    } else {
      // Add new event
      response = await addEvent(formData);
    }

    if (response?.data?.success) {
      setAlert({
        type: "success",
        message: editingEvent ? "Event updated successfully!" : "Event created successfully!",
      });
      fetchEvents(); // Refresh list from backend
      setShowForm(false);
      setEditingEvent(null);
    } else {
      setAlert({ type: "error", message: response?.data?.message || "Something went wrong!" });
    }
  } catch (error) {
    setAlert({ type: "error", message: "Failed to save event!" });
  }
};


  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-300";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // Dynamic pagination generation
  const getPaginationNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-[#2a5298] mb-3">
              Events Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage all foundation events and activities
            </p>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => setShowForm(true)}
            className="group relative bg-[#2a5298] text-white px-8 py-4 rounded-xl font-semibold shadow-md border border-[#2a5298] hover:bg-white hover:text-[#2a5298] transition-all duration-300 ease-in-out overflow-hidden"
          >
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={faPlus}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
              <span className="text-lg">Add New Event</span>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Events Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2a5298] mb-2">
                  {events.length}
                </div>
                <div className="text-gray-600 font-medium">Total Events</div>
              </div>
              <div className="w-16 h-16 bg-[#2a5298] rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2a5298] mb-2">
                  {events.filter((e) => e.status === "upcoming").length}
                </div>
                <div className="text-gray-600 font-medium">Upcoming Events</div>
              </div>
              <div className="w-16 h-16 bg-[#2a5298] rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Completed Events Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2a5298] mb-2">
                  {events.filter((e) => e.status === "completed").length}
                </div>
                <div className="text-gray-600 font-medium">
                  Completed Events
                </div>
              </div>
              <div className="w-16 h-16 bg-[#2a5298] rounded-xl flex items-center justify-center group-hover:rotate-360 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 ease-in-out cursor-pointer"
              onClick={() => setImageModal(event)}
            >
              {/* Event Image */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Event Content */}
              <div className="p-5">
                {/* Event Title */}
                <h3 className="text-lg font-bold text-[#2a5298] mb-3 line-clamp-2 group-hover:text-[#3a4a7a] transition-colors duration-300">
                  {event.heading}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-[#2a5298] mr-3 w-4"
                    />
                    <span className="font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-[#2a5298] mr-3 w-4"
                    />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                    <h4 className="text-lg font-bold text-[#2a5298] mb-3 line-clamp-2 group-hover:text-[#3a4a7a] transition-colors duration-300">
                  {event.heading}
                </h4>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                    }}
                    className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(event.id);
                    }}
                    className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-300">
            <div className="text-6xl mb-6 text-[#2a5298]">Calendar</div>
            <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
              No Events Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first event to help spread mental
              health awareness in the community.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#2a5298] text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-white hover:text-[#2a5298] border border-[#2a5298] transition-all duration-300"
            >
              Create Your First Event
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[#2a5298]"
              />
            </button>

            {/* Page Numbers */}
            {getPaginationNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageNum === "number" && setCurrentPage(pageNum)
                }
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                  pageNum === currentPage
                    ? "bg-[#2a5298] text-white shadow-md border border-[#2a5298]"
                    : "bg-white text-gray-700 shadow-md border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
                } ${
                  pageNum === "..."
                    ? "cursor-default hover:bg-white hover:border-gray-300"
                    : ""
                }`}
                disabled={pageNum === "..."}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#2a5298]"
              />
            </button>
          </div>
        )}
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          event={editingEvent}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* Delete Confirmation using CustomAlert with Click Outside */}
      {deleteConfirm && (
        <CustomAlert
          type="delete"
          message="Are you sure you want to delete this event? This action cannot be undone."
          onClose={() => setDeleteConfirm(null)}
          onConfirm={() => handleDelete(deleteConfirm)}
        />
      )}

      {/* Image Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModal(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden transform animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setImageModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#2a5298] rounded-full flex items-center justify-center hover:bg-[#1e2a4a] transition-all duration-300 shadow-lg border border-[#2a5298]"
            >
              <FontAwesomeIcon icon={faXmark} className="text-white text-lg" />
            </button>

            <div className="w-full h-[70vh] overflow-hidden">
              <img
                src={imageModal.image}
                alt={imageModal.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-white border-t border-gray-200">
              <h3 className="text-2xl font-bold text-[#2a5298] mb-3">
                {imageModal.title}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="mr-3 w-4 text-[#2a5298]"
                  />
                  <span className="font-medium">
                    {new Date(imageModal.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-3 w-4 text-[#2a5298]"
                  />
                  <span>{imageModal.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;