


import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faEdit,
    faTrash,
    faCalendarAlt,
    faUser,
    faClock,
    faStethoscope,
    faChevronLeft,
    faChevronRight,
    faXmark,
    faSearch,
    faFilter,
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faCalendarCheck,
    faCalendarTimes,
    faUserMd,
    faEye,
    faExclamationTriangle,
    faSpinner,
    faSync,
} from "@fortawesome/free-solid-svg-icons";

const AdminAppoint = () => {
    const [appointments, setAppointments] = useState([]);
    const [alert, setAlert] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [viewAppointment, setViewAppointment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedDoctor, setSelectedDoctor] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const appointmentsPerPage = 6;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Show alert function
    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 5000);
    };

    // API call to fetch appointments
    const fetchAppointments = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${backendUrl}/appointment/list`);
            
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            const result = await response.json();
            // console.log("API Response:", result);
            
            if (result?.status) {
                // Transform API data to match our component structure
                const transformedAppointments = result?.error.map(apt => ({
                    id: apt?.id,
                    patientName: apt?.name,
                    patientEmail: apt?.email,
                    patientPhone: apt?.phone,
                    doctorName: "Doctor", // You might want to fetch doctor names separately
                    doctorSpecialization: apt?.service_name || "General",
                    date: apt?.appointment_date,
                    time: formatTimeForDisplay(apt?.appointment_time),
                    duration: "45 mins", // Default duration
                    type: getAppointmentType(apt?.sub_service_name),
                    status: apt?.status || "pending",
                    notes: apt?.message || "No additional notes",
                    address: "Sunshine Mindcare, Nashik", // Default address
                    createdAt: apt?.created_at,
                    alternate_contact_no: apt?.alternate_contact_no,
                    service_name: apt?.service_name,
                    sub_service_name: apt?.sub_service_name,
                    service_id: apt?.service_id,
                    sub_service_id: apt?.sub_service_id
                }));
                // console.log("Transformed Appointments:", transformedAppointments);
                setAppointments(transformedAppointments);
            } else {
                throw new Error(result.message || 'Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError(error.message || 'Failed to load appointments. Please try again later.');
            showAlert("error", "Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    // Format time from 24-hour to 12-hour format
    const formatTimeForDisplay = (time24) => {
        if (!time24) return "N/A";
        
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        return `${hour12}:${minutes} ${ampm}`;
    };

    // Determine appointment type based on sub-service
    const getAppointmentType = (subService) => {
        if (!subService) return "Consultation";
        
        const subServiceLower = subService.toLowerCase();
        if (subServiceLower.includes('therapy') || subServiceLower.includes('counseling')) {
            return "Therapy";
        } else if (subServiceLower.includes('follow') || subServiceLower.includes('review')) {
            return "Follow-up";
        } else {
            return "Consultation";
        }
    };

    // Fetch appointments on component mount
    useEffect(() => {
        fetchAppointments();
    }, []);

    // Get unique doctors and statuses from API data
    const doctors = ["all", ...new Set(appointments.map(apt => apt.doctorName))];
    const statuses = ["all", "pending", "confirmed", "completed", "cancelled"];

    // Filter appointments based on search, status, doctor, and date
    const filteredAppointments = appointments.filter(apt => {
        const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || apt.status === selectedStatus;
        const matchesDoctor = selectedDoctor === "all" || apt.doctorName === selectedDoctor;
        const matchesDate = !selectedDate || apt.date === selectedDate;

        return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const handleDelete = (id) => {
        setAppointments(appointments.filter((apt) => apt.id !== id));
        showAlert("success", "Appointment deleted successfully!");
        setDeleteConfirm(null);

        // Adjust current page if needed after deletion
        if (currentAppointments.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (appointment) => {
        setEditingAppointment(appointment);
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        if (editingAppointment) {
            setAppointments(
                appointments.map((apt) =>
                    apt.id === editingAppointment.id ? { ...apt, ...formData } : apt
                )
            );
            showAlert("success", "Appointment updated successfully!");
        } else {
            const newAppointment = {
                id: appointments.length > 0 ? Math.max(...appointments.map((apt) => apt.id)) + 1 : 1,
                ...formData,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setAppointments([...appointments, newAppointment]);
            showAlert("success", "Appointment created successfully!");
        }
        setShowForm(false);
        setEditingAppointment(null);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingAppointment(null);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setAppointments(
            appointments.map((apt) =>
                apt.id === id ? { ...apt, status: newStatus } : apt
            )
        );
        showAlert("success", `Appointment ${newStatus} successfully!`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 border border-green-300";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border border-yellow-300";
            case "completed":
                return "bg-blue-100 text-blue-800 border border-blue-300";
            case "cancelled":
                return "bg-red-100 text-red-800 border border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-300";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "confirmed":
                return faCalendarCheck;
            case "pending":
                return faClock;
            case "completed":
                return faCalendarAlt;
            case "cancelled":
                return faCalendarTimes;
            default:
                return faCalendarAlt;
        }
    };

    const getTypeColor = (type) => {
        const colors = {
            "Consultation": "bg-purple-100 text-purple-800",
            "Therapy": "bg-indigo-100 text-indigo-800",
            "Follow-up": "bg-teal-100 text-teal-800",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
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

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm("");
        setSelectedStatus("all");
        setSelectedDoctor("all");
        setSelectedDate("");
        setCurrentPage(1);
    };

    // Refresh appointments
    const handleRefresh = () => {
        fetchAppointments();
    };

    // Animation styles
    const animationStyles = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-slide-in-up {
      animation: slideInUp 0.6s ease-out;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    
    .animate-scale-in {
      animation: scaleIn 0.5s ease-out;
    }
    
    .animate-pulse-once {
      animation: pulse 0.5s ease-in-out;
    }
    
    .animate-bounce-in {
      animation: bounceIn 0.6s ease-out;
    }
    
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
  `;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <style>{animationStyles}</style>

            {/* Alert */}
            {alert && (
                <div className="fixed top-4 right-4 z-50 animate-bounce-in">
                    <div className={`px-6 py-4 rounded-xl shadow-lg border ${alert.type === 'success'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}>
                        <div className="flex items-center space-x-3">
                            <FontAwesomeIcon
                                icon={alert.type === 'success' ? faCalendarCheck : faExclamationTriangle}
                                className="text-lg"
                            />
                            <span className="font-semibold">{alert.message}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold text-[#2a5298] mb-3 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] bg-clip-text text-transparent">
                            Appointment Management
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Manage patient appointments and schedules efficiently
                        </p>
                    </div>

                    {/* Refresh Button */}
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="group relative bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift disabled:opacity-50"
                        >
                            <div className="flex items-center space-x-3 relative z-10">
                                {loading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                ) : (
                                    <FontAwesomeIcon icon={faSync} />
                                )}
                                <span className="text-lg">
                                    {loading ? "Refreshing..." : "Refresh"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-pulse">
                        <div className="flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#2a5298] animate-spin mb-4" />
                            <h3 className="text-xl font-semibold text-[#2a5298] mb-2">Loading Appointments</h3>
                            <p className="text-gray-600">Please wait while we fetch your appointments...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
                        <div className="flex flex-col items-center justify-center">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-red-600 mb-2">Unable to Load Appointments</h3>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={handleRefresh}
                                className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                {!loading && !error && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Total Appointments */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-[#2a5298] mb-2">
                                            {appointments.length}
                                        </div>
                                        <div className="text-gray-600 font-medium">Total Appointments</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="text-white text-2xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Confirmed Appointments */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-green-600 mb-2">
                                            {appointments.filter((apt) => apt.status === "confirmed").length}
                                        </div>
                                        <div className="text-gray-600 font-medium">Confirmed</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
                                        <FontAwesomeIcon
                                            icon={faCalendarCheck}
                                            className="text-white text-2xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pending Appointments */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-yellow-600 mb-2">
                                            {appointments.filter((apt) => apt.status === "pending").length}
                                        </div>
                                        <div className="text-gray-600 font-medium">Pending</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="text-white text-2xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Today's Appointments */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-purple-600 mb-2">
                                            {appointments.filter((apt) => apt.date === new Date().toISOString().split('T')[0]).length}
                                        </div>
                                        <div className="text-gray-600 font-medium">Today's</div>
                                    </div>
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
                                        <FontAwesomeIcon
                                            icon={faUserMd}
                                            className="text-white text-2xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-scale-in">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search Input */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                        Search Appointments
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search by patient, email, or doctor..."
                                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                        />
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Status Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>
                                                {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date Filter */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-between items-center mt-4">
                                <div className="text-sm text-gray-600">
                                    Showing {filteredAppointments.length} of {appointments.length} appointments
                                </div>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-sm text-[#2a5298] font-semibold hover:text-[#1e2a4a] transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faFilter} />
                                    <span>Reset Filters</span>
                                </button>
                            </div>
                        </div>

                        {/* Appointments Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                            {currentAppointments.map((appointment, index) => (
                                <div
                                    key={appointment.id}
                                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Appointment Header */}
                                    <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-4 text-white">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={getStatusIcon(appointment.status)} />
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(appointment.type)}`}>
                                                {appointment.type}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold truncate">{appointment.patientName}</h3>
                                        <p className="text-sm opacity-90 truncate">{appointment.service_name}</p>
                                    </div>

                                    {/* Appointment Content */}
                                    <div className="p-4">
                                        {/* Appointment Details */}
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-gray-700">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-[#2a5298] mr-3 w-4" />
                                                <span className="font-medium">
                                                    {new Date(appointment.date).toLocaleDateString("en-US", {
                                                        weekday: 'short',
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center text-gray-700">
                                                <FontAwesomeIcon icon={faClock} className="text-[#2a5298] mr-3 w-4" />
                                                <span>{appointment.time} • {appointment.duration}</span>
                                            </div>

                                            <div className="flex items-center text-gray-700">
                                                <FontAwesomeIcon icon={faStethoscope} className="text-[#2a5298] mr-3 w-4" />
                                                <span className="text-sm truncate">{appointment.sub_service_name}</span>
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-2 mb-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FontAwesomeIcon icon={faPhone} className="mr-2 w-3" />
                                                <span>{appointment.patientPhone}</span>
                                            </div>
                                            {appointment.alternate_contact_no && (
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FontAwesomeIcon icon={faPhone} className="mr-2 w-3" />
                                                    <span>Alt: {appointment.alternate_contact_no}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-3" />
                                                <span className="truncate">{appointment.patientEmail}</span>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        

                                        {/* Action Buttons */}
                                        <div className="flex space-x-2 pt-3 border-t border-gray-200">
                                            
                                            <button
                                                onClick={() => setDeleteConfirm(appointment.id)}
                                                className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                <span>Delete</span>
                                            </button>
                                        </div>

                                        {/* Status Update Buttons */}
                                        
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredAppointments.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
                                <div className="text-6xl mb-6 text-[#2a5298]">📅</div>
                                <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
                                    No Appointments Found
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    {searchTerm || selectedStatus !== "all" || selectedDate
                                        ? "Try adjusting your search filters to find more appointments."
                                        : "No appointments have been scheduled yet."
                                    }
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center space-x-2 mt-12 animate-fade-in">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
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
                                        className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${pageNum === currentPage
                                                ? "bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white shadow-lg border border-[#2a5298]"
                                                : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
                                            } ${pageNum === "..."
                                                ? "cursor-default hover:bg-white hover:border-gray-300 hover-lift-none"
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
                                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="text-[#2a5298]"
                                    />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>


            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto animate-scale-in">
                        <h3 className="text-xl font-bold text-[#2a5298] mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this appointment? This action cannot be undone.
                        </p>
                        <div className="flex space-x-4">
                            
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
};

export default AdminAppoint;