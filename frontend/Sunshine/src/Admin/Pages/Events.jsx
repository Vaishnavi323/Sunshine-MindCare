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
} from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../../CustomAlert/CustomAlert";
import EventForm from "../Forms/EventForm";

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Mental Health Workshop",
      date: "2024-01-15",
      time: "10:00 AM - 2:00 PM",
      venue: "Community Hall, Nashik",
      hospital: "Sunshine",
      participants: 120,
      status: "completed",
      description:
        "Workshop focusing on mental health awareness and coping strategies for community members.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Community Counseling",
      date: "2024-01-20",
      time: "9:00 AM - 5:00 PM",
      venue: "Local Park, Nashik",
      hospital: "Manoday",
      participants: 85,
      status: "upcoming",
      description:
        "Free counseling sessions for community members with professional psychologists.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Youth Awareness Program",
      date: "2024-02-01",
      time: "11:00 AM - 4:00 PM",
      venue: "City College, Nashik",
      hospital: "Both",
      participants: 200,
      status: "upcoming",
      description:
        "Program targeting youth mental health awareness and stress management techniques.",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Senior Citizen Support",
      date: "2024-02-10",
      time: "1:00 PM - 3:00 PM",
      venue: "Senior Center, Nashik",
      hospital: "Sunshine",
      participants: 60,
      status: "upcoming",
      description: "Mental health support and counseling for senior citizens.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "Stress Management Workshop",
      date: "2024-01-10",
      time: "2:00 PM - 5:00 PM",
      venue: "Corporate Office, Nashik",
      hospital: "Manoday",
      participants: 45,
      status: "completed",
      description:
        "Workshop for corporate employees on stress management techniques.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Children's Mental Health",
      date: "2024-02-15",
      time: "10:00 AM - 12:00 PM",
      venue: "Public School, Nashik",
      hospital: "Both",
      participants: 150,
      status: "upcoming",
      description:
        "Awareness program for children's mental health and emotional well-being.",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      title: "Family Counseling Day",
      date: "2024-01-25",
      time: "9:00 AM - 6:00 PM",
      venue: "Community Center, Nashik",
      hospital: "Sunshine",
      participants: 90,
      status: "completed",
      description: "Full day counseling sessions for families and couples.",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      title: "Mental Health Marathon",
      date: "2024-03-01",
      time: "6:00 AM - 12:00 PM",
      venue: "City Ground, Nashik",
      hospital: "Both",
      participants: 300,
      status: "upcoming",
      description: "Awareness marathon to promote mental health discussions.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      title: "Professional Development",
      date: "2024-01-30",
      time: "3:00 PM - 6:00 PM",
      venue: "Conference Hall, Nashik",
      hospital: "Manoday",
      participants: 75,
      status: "completed",
      description: "Training for mental health professionals and volunteers.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      title: "Community Meditation",
      date: "2024-02-20",
      time: "6:00 AM - 7:00 AM",
      venue: "Riverside Park, Nashik",
      hospital: "Sunshine",
      participants: 120,
      status: "upcoming",
      description:
        "Guided meditation sessions for mental peace and relaxation.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    },
  ]);

  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [imageModal, setImageModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Ref for delete alert click-outside
  const deleteAlertRef = useRef(null);

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

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setAlert({
      type: "success",
      message: "Event deleted successfully!",
    });
    setDeleteConfirm(null);

    // Adjust current page if needed after deletion
    if (currentEvents.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? { ...event, ...formData } : event
        )
      );
      setAlert({
        type: "success",
        message: "Event updated successfully!",
      });
    } else {
      const newEvent = {
        id: Math.max(...events.map((e) => e.id)) + 1,
        ...formData,
        status: "upcoming",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
      };
      setEvents([...events, newEvent]);
      setAlert({
        type: "success",
        message: "Event created successfully!",
      });
    }
    setShowForm(false);
    setEditingEvent(null);
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
            <h1 className="text-4xl font-bold text-[#2d365b] mb-3">
              Events Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage all foundation events and activities
            </p>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => setShowForm(true)}
            className="group relative bg-[#2d365b] text-white px-8 py-4 rounded-xl font-semibold shadow-md border border-[#2d365b] hover:bg-white hover:text-[#2d365b] transition-all duration-300 ease-in-out overflow-hidden"
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
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {events.length}
                </div>
                <div className="text-gray-600 font-medium">Total Events</div>
              </div>
              <div className="w-16 h-16 bg-[#2d365b] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
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
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {events.filter((e) => e.status === "upcoming").length}
                </div>
                <div className="text-gray-600 font-medium">Upcoming Events</div>
              </div>
              <div className="w-16 h-16 bg-[#2d365b] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
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
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {events.filter((e) => e.status === "completed").length}
                </div>
                <div className="text-gray-600 font-medium">
                  Completed Events
                </div>
              </div>
              <div className="w-16 h-16 bg-[#2d365b] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
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
                  src={event.image}
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
                <h3 className="text-lg font-bold text-[#2d365b] mb-3 line-clamp-2 group-hover:text-[#3a4a7a] transition-colors duration-300">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="text-[#2d365b] mr-3 w-4"
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
                      className="text-[#2d365b] mr-3 w-4"
                    />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                    }}
                    className="flex-1 bg-[#2d365b] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2d365b]"
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
            <div className="text-6xl mb-6 text-[#2d365b]">Calendar</div>
            <h3 className="text-2xl font-bold text-[#2d365b] mb-4">
              No Events Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first event to help spread mental
              health awareness in the community.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#2d365b] text-white px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-white hover:text-[#2d365b] border border-[#2d365b] transition-all duration-300"
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
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-[#2d365b]"
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
                    ? "bg-[#2d365b] text-white shadow-md border border-[#2d365b]"
                    : "bg-white text-gray-700 shadow-md border border-gray-300 hover:border-[#2d365b] hover:bg-gray-50"
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
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#2d365b]"
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
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#2d365b] rounded-full flex items-center justify-center hover:bg-[#1e2a4a] transition-all duration-300 shadow-lg border border-[#2d365b]"
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
              <h3 className="text-2xl font-bold text-[#2d365b] mb-3">
                {imageModal.title}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="mr-3 w-4 text-[#2d365b]"
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
                    className="mr-3 w-4 text-[#2d365b]"
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
