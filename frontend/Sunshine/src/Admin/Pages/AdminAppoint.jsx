// import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faPlus,
//     faEdit,
//     faTrash,
//     faCalendarAlt,
//     faUser,
//     faClock,
//     faStethoscope,
//     faChevronLeft,
//     faChevronRight,
//     faXmark,
//     faSearch,
//     faFilter,
//     faPhone,
//     faEnvelope,
//     faMapMarkerAlt,
//     faCalendarCheck,
//     faCalendarTimes,
//     faUserMd,
//     faEye,
// } from "@fortawesome/free-solid-svg-icons";

// const AdminAppoint = () => {
//     const [appointments, setAppointments] = useState([
//         {
//             id: 1,
//             patientName: "Rajesh Kumar",
//             patientEmail: "rajesh.kumar@email.com",
//             patientPhone: "+91 9876543210",
//             doctorName: "Dr. Priya Sharma",
//             doctorSpecialization: "Psychiatry",
//             date: "2024-01-20",
//             time: "10:00 AM",
//             duration: "45 mins",
//             type: "Consultation",
//             status: "confirmed",
//             notes: "Follow-up session for anxiety management",
//             address: "Sunshine Mindcare, Nashik",
//             createdAt: "2024-01-15",
//         },
//         {
//             id: 2,
//             patientName: "Anita Sharma",
//             patientEmail: "anita.sharma@email.com",
//             patientPhone: "+91 9876543211",
//             doctorName: "Dr. Amit Patel",
//             doctorSpecialization: "Clinical Psychology",
//             date: "2024-01-20",
//             time: "2:30 PM",
//             duration: "60 mins",
//             type: "Therapy",
//             status: "pending",
//             notes: "Initial consultation for stress management",
//             address: "Manoday Center, Nashik",
//             createdAt: "2024-01-16",
//         },
//         {
//             id: 3,
//             patientName: "Rohan Mehra",
//             patientEmail: "rohan.mehra@email.com",
//             patientPhone: "+91 9876543212",
//             doctorName: "Dr. Sneha Reddy",
//             doctorSpecialization: "Counseling",
//             date: "2024-01-21",
//             time: "11:15 AM",
//             duration: "30 mins",
//             type: "Follow-up",
//             status: "confirmed",
//             notes: "Progress review session",
//             address: "Sunshine Mindcare, Nashik",
//             createdAt: "2024-01-14",
//         },
//         {
//             id: 4,
//             patientName: "Priya Singh",
//             patientEmail: "priya.singh@email.com",
//             patientPhone: "+91 9876543213",
//             doctorName: "Dr. Michael Chen",
//             doctorSpecialization: "Psychiatry",
//             date: "2024-01-21",
//             time: "4:00 PM",
//             duration: "45 mins",
//             type: "Consultation",
//             status: "cancelled",
//             notes: "Patient requested cancellation",
//             address: "Manoday Center, Nashik",
//             createdAt: "2024-01-13",
//         },
//         {
//             id: 5,
//             patientName: "Vikram Joshi",
//             patientEmail: "vikram.joshi@email.com",
//             patientPhone: "+91 9876543214",
//             doctorName: "Dr. Lisa Wang",
//             doctorSpecialization: "Therapy",
//             date: "2024-01-22",
//             time: "9:00 AM",
//             duration: "60 mins",
//             type: "Therapy",
//             status: "completed",
//             notes: "Cognitive behavioral therapy session",
//             address: "Sunshine Mindcare, Nashik",
//             createdAt: "2024-01-12",
//         },
//         {
//             id: 6,
//             patientName: "Sneha Gupta",
//             patientEmail: "sneha.gupta@email.com",
//             patientPhone: "+91 9876543215",
//             doctorName: "Dr. Robert Davis",
//             doctorSpecialization: "Counseling",
//             date: "2024-01-22",
//             time: "3:30 PM",
//             duration: "30 mins",
//             type: "Consultation",
//             status: "confirmed",
//             notes: "Career counseling session",
//             address: "Manoday Center, Nashik",
//             createdAt: "2024-01-17",
//         },
//         {
//             id: 7,
//             patientName: "Arun Malhotra",
//             patientEmail: "arun.malhotra@email.com",
//             patientPhone: "+91 9876543216",
//             doctorName: "Dr. Priya Sharma",
//             doctorSpecialization: "Psychiatry",
//             date: "2024-01-23",
//             time: "1:00 PM",
//             duration: "45 mins",
//             type: "Follow-up",
//             status: "pending",
//             notes: "Medication review",
//             address: "Sunshine Mindcare, Nashik",
//             createdAt: "2024-01-18",
//         },
//         {
//             id: 8,
//             patientName: "Meera Patel",
//             patientEmail: "meera.patel@email.com",
//             patientPhone: "+91 9876543217",
//             doctorName: "Dr. Amit Patel",
//             doctorSpecialization: "Clinical Psychology",
//             date: "2024-01-23",
//             time: "5:00 PM",
//             duration: "60 mins",
//             type: "Therapy",
//             status: "confirmed",
//             notes: "Family therapy session",
//             address: "Manoday Center, Nashik",
//             createdAt: "2024-01-15",
//         },
//     ]);

//     const [alert, setAlert] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [editingAppointment, setEditingAppointment] = useState(null);
//     const [deleteConfirm, setDeleteConfirm] = useState(null);
//     const [viewAppointment, setViewAppointment] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedStatus, setSelectedStatus] = useState("all");
//     const [selectedDoctor, setSelectedDoctor] = useState("all");
//     const [selectedDate, setSelectedDate] = useState("");
//     const appointmentsPerPage = 6;

//     // Get unique doctors and statuses
//     const doctors = ["all", ...new Set(appointments.map(apt => apt.doctorName))];
//     const statuses = ["all", "pending", "confirmed", "completed", "cancelled"];

//     // Filter appointments based on search, status, doctor, and date
//     const filteredAppointments = appointments.filter(apt => {
//         const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = selectedStatus === "all" || apt.status === selectedStatus;
//         const matchesDoctor = selectedDoctor === "all" || apt.doctorName === selectedDoctor;
//         const matchesDate = !selectedDate || apt.date === selectedDate;

//         return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
//     });

//     // Pagination calculations
//     const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
//     const indexOfLastAppointment = currentPage * appointmentsPerPage;
//     const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
//     const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

//     const handleDelete = (id) => {
//         setAppointments(appointments.filter((apt) => apt.id !== id));
//         setAlert({
//             type: "success",
//             message: "Appointment deleted successfully!",
//         });
//         setDeleteConfirm(null);

//         // Adjust current page if needed after deletion
//         if (currentAppointments.length === 1 && currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleEdit = (appointment) => {
//         setEditingAppointment(appointment);
//         setShowForm(true);
//     };

//     const handleFormSubmit = (formData) => {
//         if (editingAppointment) {
//             setAppointments(
//                 appointments.map((apt) =>
//                     apt.id === editingAppointment.id ? { ...apt, ...formData } : apt
//                 )
//             );
//             setAlert({
//                 type: "success",
//                 message: "Appointment updated successfully!",
//             });
//         } else {
//             const newAppointment = {
//                 id: appointments.length > 0 ? Math.max(...appointments.map((apt) => apt.id)) + 1 : 1,
//                 ...formData,
//                 createdAt: new Date().toISOString().split('T')[0],
//             };
//             setAppointments([...appointments, newAppointment]);
//             setAlert({
//                 type: "success",
//                 message: "Appointment created successfully!",
//             });
//         }
//         setShowForm(false);
//         setEditingAppointment(null);
//     };

//     const handleFormCancel = () => {
//         setShowForm(false);
//         setEditingAppointment(null);
//     };

//     const handleStatusUpdate = (id, newStatus) => {
//         setAppointments(
//             appointments.map((apt) =>
//                 apt.id === id ? { ...apt, status: newStatus } : apt
//             )
//         );
//         setAlert({
//             type: "success",
//             message: `Appointment ${newStatus} successfully!`,
//         });
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "confirmed":
//                 return "bg-green-100 text-green-800 border border-green-300";
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800 border border-yellow-300";
//             case "completed":
//                 return "bg-blue-100 text-blue-800 border border-blue-300";
//             case "cancelled":
//                 return "bg-red-100 text-red-800 border border-red-300";
//             default:
//                 return "bg-gray-100 text-gray-800 border border-gray-300";
//         }
//     };

//     const getStatusIcon = (status) => {
//         switch (status) {
//             case "confirmed":
//                 return faCalendarCheck;
//             case "pending":
//                 return faClock;
//             case "completed":
//                 return faCalendarAlt;
//             case "cancelled":
//                 return faCalendarTimes;
//             default:
//                 return faCalendarAlt;
//         }
//     };

//     const getTypeColor = (type) => {
//         const colors = {
//             "Consultation": "bg-purple-100 text-purple-800",
//             "Therapy": "bg-indigo-100 text-indigo-800",
//             "Follow-up": "bg-teal-100 text-teal-800",
//         };
//         return colors[type] || "bg-gray-100 text-gray-800";
//     };

//     // Dynamic pagination generation
//     const getPaginationNumbers = () => {
//         const pages = [];
//         const showEllipsis = totalPages > 7;

//         if (!showEllipsis) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i);
//             }
//         } else {
//             pages.push(1, 2, 3);
//             if (currentPage > 4) pages.push("...");
//             if (currentPage > 3 && currentPage < totalPages - 2) {
//                 pages.push(currentPage - 1, currentPage, currentPage + 1);
//             }
//             if (currentPage < totalPages - 3) pages.push("...");
//             pages.push(totalPages - 2, totalPages - 1, totalPages);
//         }

//         return [...new Set(pages)].sort((a, b) => a - b);
//     };

//     // Reset filters
//     const handleResetFilters = () => {
//         setSearchTerm("");
//         setSelectedStatus("all");
//         setSelectedDoctor("all");
//         setSelectedDate("");
//         setCurrentPage(1);
//     };

//     // Animation styles
//     const animationStyles = `
//     @keyframes slideInUp {
//       from {
//         opacity: 0;
//         transform: translateY(30px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
    
//     @keyframes fadeIn {
//       from {
//         opacity: 0;
//       }
//       to {
//         opacity: 1;
//       }
//     }
    
//     @keyframes scaleIn {
//       from {
//         opacity: 0;
//         transform: scale(0.9);
//       }
//       to {
//         opacity: 1;
//         transform: scale(1);
//       }
//     }
    
//     @keyframes pulse {
//       0%, 100% {
//         transform: scale(1);
//       }
//       50% {
//         transform: scale(1.05);
//       }
//     }
    
//     @keyframes bounceIn {
//       0% {
//         opacity: 0;
//         transform: scale(0.3);
//       }
//       50% {
//         opacity: 1;
//         transform: scale(1.05);
//       }
//       70% {
//         transform: scale(0.9);
//       }
//       100% {
//         opacity: 1;
//         transform: scale(1);
//       }
//     }
    
//     .animate-slide-in-up {
//       animation: slideInUp 0.6s ease-out;
//     }
    
//     .animate-fade-in {
//       animation: fadeIn 0.8s ease-out;
//     }
    
//     .animate-scale-in {
//       animation: scaleIn 0.5s ease-out;
//     }
    
//     .animate-pulse-once {
//       animation: pulse 0.5s ease-in-out;
//     }
    
//     .animate-bounce-in {
//       animation: bounceIn 0.6s ease-out;
//     }
    
//     .hover-lift {
//       transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     }
    
//     .hover-lift:hover {
//       transform: translateY(-8px);
//       box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//     }
//   `;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//             <style>{animationStyles}</style>

//             {/* Alert */}
//             {alert && (
//                 <div className="fixed top-4 right-4 z-50 animate-bounce-in">
//                     <div className={`px-6 py-4 rounded-xl shadow-lg border ${alert.type === 'success'
//                             ? 'bg-green-100 text-green-800 border-green-300'
//                             : 'bg-red-100 text-red-800 border-red-300'
//                         }`}>
//                         <div className="flex items-center space-x-3">
//                             <FontAwesomeIcon
//                                 icon={alert.type === 'success' ? faCalendarCheck : faCalendarTimes}
//                                 className="text-lg"
//                             />
//                             <span className="font-semibold">{alert.message}</span>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Header Section */}
//             <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//                     <div className="mb-6 lg:mb-0">
//                         <h1 className="text-4xl font-bold text-[#2a5298] mb-3 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] bg-clip-text text-transparent">
//                             Appointment Management
//                         </h1>
//                         <p className="text-gray-600 text-lg">
//                             Manage patient appointments and schedules efficiently
//                         </p>
//                     </div>

//                     {/* Add Appointment Button */}
//                     {/* <button
//                         onClick={() => setShowForm(true)}
//                         className="group relative bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift"
//                     >
//                         <div className="flex items-center space-x-3 relative z-10">
//                             <FontAwesomeIcon
//                                 icon={faPlus}
//                                 className="transition-transform duration-500 group-hover:rotate-180"
//                             />
//                             <span className="text-lg">Add New Appointment</span>
//                         </div>
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#2a5298] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     </button> */}
//                 </div>

//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                     {/* Total Appointments */}
//                     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <div className="text-3xl font-bold text-[#2a5298] mb-2">
//                                     {appointments.length}
//                                 </div>
//                                 <div className="text-gray-600 font-medium">Total Appointments</div>
//                             </div>
//                             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
//                                 <FontAwesomeIcon
//                                     icon={faCalendarAlt}
//                                     className="text-white text-2xl"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Confirmed Appointments */}
//                     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <div className="text-3xl font-bold text-green-600 mb-2">
//                                     {appointments.filter((apt) => apt.status === "confirmed").length}
//                                 </div>
//                                 <div className="text-gray-600 font-medium">Confirmed</div>
//                             </div>
//                             <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
//                                 <FontAwesomeIcon
//                                     icon={faCalendarCheck}
//                                     className="text-white text-2xl"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pending Appointments */}
//                     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <div className="text-3xl font-bold text-yellow-600 mb-2">
//                                     {appointments.filter((apt) => apt.status === "pending").length}
//                                 </div>
//                                 <div className="text-gray-600 font-medium">Pending</div>
//                             </div>
//                             <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
//                                 <FontAwesomeIcon
//                                     icon={faClock}
//                                     className="text-white text-2xl"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Today's Appointments */}
//                     <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <div className="text-3xl font-bold text-purple-600 mb-2">
//                                     {appointments.filter((apt) => apt.date === new Date().toISOString().split('T')[0]).length}
//                                 </div>
//                                 <div className="text-gray-600 font-medium">Today's</div>
//                             </div>
//                             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:animate-pulse-once transition-all duration-300">
//                                 <FontAwesomeIcon
//                                     icon={faUserMd}
//                                     className="text-white text-2xl"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Search and Filters */}
//                 <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-scale-in">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         {/* Search Input */}
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                 Search Appointments
//                             </label>
//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search by patient, email, or doctor..."
//                                     className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 />
//                                 {/* <FontAwesomeIcon
//                                     icon={faSearch}
//                                     className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//                                 /> */}
//                             </div>
//                         </div>

//                         {/* Status Filter */}
//                         <div>
//                             <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                 Status
//                             </label>
//                             <select
//                                 value={selectedStatus}
//                                 onChange={(e) => setSelectedStatus(e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                             >
//                                 {statuses.map(status => (
//                                     <option key={status} value={status}>
//                                         {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Date Filter */}
//                         <div>
//                             <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                 Date
//                             </label>
//                             <input
//                                 type="date"
//                                 value={selectedDate}
//                                 onChange={(e) => setSelectedDate(e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                             />
//                         </div>
//                     </div>

//                     {/* Filter Actions */}
//                     <div className="flex justify-between items-center mt-4">
//                         <div className="text-sm text-gray-600">
//                             Showing {filteredAppointments.length} of {appointments.length} appointments
//                         </div>
//                         <button
//                             onClick={handleResetFilters}
//                             className="text-sm text-[#2a5298] font-semibold hover:text-[#1e2a4a] transition-colors duration-300 flex items-center space-x-2"
//                         >
//                             <FontAwesomeIcon icon={faFilter} />
//                             <span>Reset Filters</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Appointments Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//                     {currentAppointments.map((appointment, index) => (
//                         <div
//                             key={appointment.id}
//                             className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
//                             style={{ animationDelay: `${index * 0.1}s` }}
//                         >
//                             {/* Appointment Header */}
//                             <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-4 text-white">
//                                 <div className="flex items-center justify-between mb-2">
//                                     <div className="flex items-center space-x-2">
//                                         <FontAwesomeIcon icon={getStatusIcon(appointment.status)} />
//                                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
//                                             {appointment.status}
//                                         </span>
//                                     </div>
//                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(appointment.type)}`}>
//                                         {appointment.type}
//                                     </span>
//                                 </div>
//                                 <h3 className="text-lg font-bold truncate">{appointment.patientName}</h3>
//                             </div>

//                             {/* Appointment Content */}
//                             <div className="p-3">
//                                 {/* Doctor Info */}
//                                 {/* <div className="flex items-center space-x-3 mb-4">
//                                     <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
//                                         <FontAwesomeIcon icon={faUserMd} className="text-blue-600" />
//                                     </div>
//                                     <div className="flex-1">
//                                         <div className="font-semibold text-gray-900">{appointment.doctorName}</div>
//                                         <div className="text-sm text-gray-600">{appointment.doctorSpecialization}</div>
//                                     </div>
//                                 </div> */}

//                                 {/* Appointment Details */}
//                                 <div className="space-y-3 mb-4">
//                                     <div className="flex items-center text-gray-700">
//                                         <FontAwesomeIcon icon={faCalendarAlt} className="text-[#2a5298] mr-3 w-4" />
//                                         <span className="font-medium">
//                                             {new Date(appointment.date).toLocaleDateString("en-US", {
//                                                 weekday: 'short',
//                                                 year: "numeric",
//                                                 month: "short",
//                                                 day: "numeric",
//                                             })}
//                                         </span>
//                                     </div>

//                                     <div className="flex items-center text-gray-700">
//                                         <FontAwesomeIcon icon={faClock} className="text-[#2a5298] mr-3 w-4" />
//                                         <span>{appointment.time} • {appointment.duration}</span>
//                                     </div>

//                                     <div className="flex items-center text-gray-700">
//                                         <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] mr-3 w-4" />
//                                         <span className="text-sm truncate">{appointment.address}</span>
//                                     </div>
//                                 </div>

//                                 {/* Contact Info */}
//                                 <div className="space-y-2 mb-2 p-3 bg-gray-50 rounded-lg">
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <FontAwesomeIcon icon={faPhone} className="mr-2 w-3" />
//                                         <span>{appointment.patientPhone}</span>
//                                     </div>
//                                     <div className="flex items-center text-sm text-gray-600">
//                                         <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-3" />
//                                         <span className="truncate">{appointment.patientEmail}</span>
//                                     </div>
//                                 </div>

//                                 {/* Notes */}
//                                 {/* {appointment.notes && (
//                                     <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                                         <div className="text-sm text-blue-800">
//                                             <strong>Notes:</strong> {appointment.notes}
//                                         </div>
//                                     </div>
//                                 )} */}

//                                 {/* Action Buttons */}
//                                 <div className="flex space-x-2 pt-2 border-t border-gray-200">
//                                     {/* <button
//                                         onClick={() => setViewAppointment(appointment)}
//                                         className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-500"
//                                     >
//                                         <FontAwesomeIcon icon={faEye} />
//                                         <span>View</span>
//                                     </button>
//                                     <button
//                                         onClick={() => handleEdit(appointment)}
//                                         className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
//                                     >
//                                         <FontAwesomeIcon icon={faEdit} />
//                                         <span>Edit</span>
//                                     </button> */}
//                                     <button
//                                         onClick={() => setDeleteConfirm(appointment.id)}
//                                         className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
//                                     >
//                                         <FontAwesomeIcon icon={faTrash} />
//                                         <span>Delete</span>
//                                     </button>
//                                 </div>

//                                 {/* Status Update Buttons */}
//                                 {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
//                                     <div className="flex space-x-2 mt-2">
//                                         {appointment.status === 'pending' && (
//                                             <button
//                                                 onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
//                                                 className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-300"
//                                             >
//                                                 Confirm
//                                             </button>
//                                         )}
//                                         {appointment.status === 'confirmed' && (
//                                             <button
//                                                 onClick={() => handleStatusUpdate(appointment.id, 'completed')}
//                                                 className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all duration-300"
//                                             >
//                                                 Complete
//                                             </button>
//                                         )}
//                                         <button
//                                             onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
//                                             className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-300"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredAppointments.length === 0 && (
//                     <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
//                         <div className="text-6xl mb-6 text-[#2a5298]">📅</div>
//                         <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
//                             No Appointments Found
//                         </h3>
//                         <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                             {searchTerm || selectedStatus !== "all" || selectedDate
//                                 ? "Try adjusting your search filters to find more appointments."
//                                 : "Get started by scheduling your first appointment."
//                             }
//                         </p>
//                         <button
//                             onClick={() => setShowForm(true)}
//                             className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
//                         >
//                             Schedule New Appointment
//                         </button>
//                     </div>
//                 )}

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="flex items-center justify-center space-x-2 mt-12 animate-fade-in">
//                         {/* Previous Button */}
//                         <button
//                             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                             disabled={currentPage === 1}
//                             className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
//                         >
//                             <FontAwesomeIcon
//                                 icon={faChevronLeft}
//                                 className="text-[#2a5298]"
//                             />
//                         </button>

//                         {/* Page Numbers */}
//                         {getPaginationNumbers().map((pageNum, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() =>
//                                     typeof pageNum === "number" && setCurrentPage(pageNum)
//                                 }
//                                 className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${pageNum === currentPage
//                                         ? "bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white shadow-lg border border-[#2a5298]"
//                                         : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
//                                     } ${pageNum === "..."
//                                         ? "cursor-default hover:bg-white hover:border-gray-300 hover-lift-none"
//                                         : ""
//                                     }`}
//                                 disabled={pageNum === "..."}
//                             >
//                                 {pageNum}
//                             </button>
//                         ))}

//                         {/* Next Button */}
//                         <button
//                             onClick={() =>
//                                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                             }
//                             disabled={currentPage === totalPages}
//                             className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
//                         >
//                             <FontAwesomeIcon
//                                 icon={faChevronRight}
//                                 className="text-[#2a5298]"
//                             />
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Appointment Form Modal */}
//             {showForm && (
//                 <AppointmentForm
//                     appointment={editingAppointment}
//                     onSubmit={handleFormSubmit}
//                     onCancel={handleFormCancel}
//                 />
//             )}

//             {/* Delete Confirmation */}
//             {deleteConfirm && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//                     <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto animate-scale-in">
//                         <h3 className="text-xl font-bold text-[#2a5298] mb-4">
//                             Confirm Deletion
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             Are you sure you want to delete this appointment? This action cannot be undone.
//                         </p>
//                         <div className="flex space-x-4">
//                             <button
//                                 onClick={() => setDeleteConfirm(null)}
//                                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(deleteConfirm)}
//                                 className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* View Appointment Modal */}
//             {viewAppointment && (
//                 <ViewAppointmentModal
//                     appointment={viewAppointment}
//                     onClose={() => setViewAppointment(null)}
//                 />
//             )}
//         </div>
//     );
// };

// // Appointment Form Component
// const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
//     const [formData, setFormData] = useState({
//         patientName: appointment?.patientName || "",
//         patientEmail: appointment?.patientEmail || "",
//         patientPhone: appointment?.patientPhone || "",
//         doctorName: appointment?.doctorName || "Dr. Priya Sharma",
//         doctorSpecialization: appointment?.doctorSpecialization || "Psychiatry",
//         date: appointment?.date || "",
//         time: appointment?.time || "",
//         duration: appointment?.duration || "45 mins",
//         type: appointment?.type || "Consultation",
//         status: appointment?.status || "pending",
//         notes: appointment?.notes || "",
//         address: appointment?.address || "Sunshine Mindcare, Nashik",
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Basic validation
//         if (!formData.patientName.trim()) {
//             alert('Please enter patient name');
//             return;
//         }
//         if (!formData.patientEmail.trim()) {
//             alert('Please enter patient email');
//             return;
//         }
//         if (!formData.patientPhone.trim()) {
//             alert('Please enter patient phone');
//             return;
//         }
//         if (!formData.date) {
//             alert('Please select appointment date');
//             return;
//         }
//         if (!formData.time) {
//             alert('Please select appointment time');
//             return;
//         }

//         onSubmit(formData);
//     };

//     const doctors = [
//         { name: "Dr. Priya Sharma", specialization: "Psychiatry" },
//         { name: "Dr. Amit Patel", specialization: "Clinical Psychology" },
//         { name: "Dr. Sneha Reddy", specialization: "Counseling" },
//         { name: "Dr. Michael Chen", specialization: "Psychiatry" },
//         { name: "Dr. Lisa Wang", specialization: "Therapy" },
//         { name: "Dr. Robert Davis", specialization: "Counseling" },
//     ];

//     const appointmentTypes = ["Consultation", "Therapy", "Follow-up"];
//     const durations = ["30 mins", "45 mins", "60 mins", "90 mins"];
//     const addresses = ["Sunshine Mindcare, Nashik", "Manoday Center, Nashik"];

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//             <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-bold">
//                             {appointment ? "Edit Appointment" : "Create New Appointment"}
//                         </h2>
//                         <button
//                             onClick={onCancel}
//                             className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
//                         >
//                             <FontAwesomeIcon icon={faXmark} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Form Content */}
//                 <div className="p-6 max-h-[70vh] overflow-y-auto">
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Patient Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Patient Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="patientName"
//                                     value={formData.patientName}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                     placeholder="Enter patient name"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Patient Email *
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="patientEmail"
//                                     value={formData.patientEmail}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                     placeholder="Enter patient email"
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Patient Phone *
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     name="patientPhone"
//                                     value={formData.patientPhone}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                     placeholder="Enter patient phone"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Address *
//                                 </label>
//                                 <select
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 >
//                                     {addresses.map(address => (
//                                         <option key={address} value={address}>{address}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Doctor Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Doctor *
//                                 </label>
//                                 <select
//                                     name="doctorName"
//                                     value={formData.doctorName}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 >
//                                     {doctors.map(doctor => (
//                                         <option key={doctor.name} value={doctor.name}>
//                                             {doctor.name} - {doctor.specialization}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Appointment Type *
//                                 </label>
//                                 <select
//                                     name="type"
//                                     value={formData.type}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 >
//                                     {appointmentTypes.map(type => (
//                                         <option key={type} value={type}>{type}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Date and Time */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Date *
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="date"
//                                     value={formData.date}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Time *
//                                 </label>
//                                 <input
//                                     type="time"
//                                     name="time"
//                                     value={formData.time}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Duration *
//                                 </label>
//                                 <select
//                                     name="duration"
//                                     value={formData.duration}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 >
//                                     {durations.map(duration => (
//                                         <option key={duration} value={duration}>{duration}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Status and Notes */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                     Status *
//                                 </label>
//                                 <select
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 >
//                                     <option value="pending">Pending</option>
//                                     <option value="confirmed">Confirmed</option>
//                                     <option value="completed">Completed</option>
//                                     <option value="cancelled">Cancelled</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Notes */}
//                         <div>
//                             <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                                 Notes
//                             </label>
//                             <textarea
//                                 name="notes"
//                                 value={formData.notes}
//                                 onChange={handleInputChange}
//                                 rows="3"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                                 placeholder="Additional notes about the appointment..."
//                             />
//                         </div>

//                         {/* Form Actions */}
//                         <div className="flex space-x-4 pt-4">
//                             <button
//                                 type="button"
//                                 onClick={onCancel}
//                                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="flex-1 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2a5298]"
//                             >
//                                 {appointment ? "Update Appointment" : "Create Appointment"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // View Appointment Modal Component
// const ViewAppointmentModal = ({ appointment, onClose }) => {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//             <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-bold">Appointment Details</h2>
//                         <button
//                             onClick={onClose}
//                             className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
//                         >
//                             <FontAwesomeIcon icon={faXmark} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6 space-y-6">
//                     {/* Patient Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                                 Patient Information
//                             </h3>
//                             <div className="space-y-3">
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faUser} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-semibold">{appointment.patientName}</div>
//                                         <div className="text-sm text-gray-600">Patient</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-medium">{appointment.patientEmail}</div>
//                                         <div className="text-sm text-gray-600">Email</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-medium">{appointment.patientPhone}</div>
//                                         <div className="text-sm text-gray-600">Phone</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                                 Doctor Information
//                             </h3>
//                             <div className="space-y-3">
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faUserMd} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-semibold">{appointment.doctorName}</div>
//                                         <div className="text-sm text-gray-600">Doctor</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faStethoscope} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-medium">{appointment.doctorSpecialization}</div>
//                                         <div className="text-sm text-gray-600">Specialization</div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] w-4" />
//                                     <div>
//                                         <div className="font-medium">{appointment.address}</div>
//                                         <div className="text-sm text-gray-600">Location</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Appointment Details */}
//                     <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                             Appointment Details
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
//                                 <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600 text-xl mb-2" />
//                                 <div className="font-semibold text-blue-800">
//                                     {new Date(appointment.date).toLocaleDateString("en-US", {
//                                         weekday: 'long',
//                                         year: "numeric",
//                                         month: "long",
//                                         day: "numeric",
//                                     })}
//                                 </div>
//                                 <div className="text-sm text-blue-600">Date</div>
//                             </div>

//                             <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
//                                 <FontAwesomeIcon icon={faClock} className="text-green-600 text-xl mb-2" />
//                                 <div className="font-semibold text-green-800">{appointment.time}</div>
//                                 <div className="text-sm text-green-600">Time</div>
//                             </div>

//                             <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
//                                 <FontAwesomeIcon icon={faClock} className="text-purple-600 text-xl mb-2" />
//                                 <div className="font-semibold text-purple-800">{appointment.duration}</div>
//                                 <div className="text-sm text-purple-600">Duration</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Status and Type */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
//                             <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(appointment.status)}`}>
//                                 <FontAwesomeIcon icon={getStatusIcon(appointment.status)} />
//                                 <span className="font-semibold capitalize">{appointment.status}</span>
//                             </div>
//                             <div className="text-sm text-gray-600 mt-2">Status</div>
//                         </div>

//                         <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
//                             <div className={`inline-flex items-center px-4 py-2 rounded-full ${getTypeColor(appointment.type)}`}>
//                                 <span className="font-semibold">{appointment.type}</span>
//                             </div>
//                             <div className="text-sm text-gray-600 mt-2">Type</div>
//                         </div>
//                     </div>

//                     {/* Notes */}
//                     {appointment.notes && (
//                         <div className="space-y-4">
//                             <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                                 Additional Notes
//                             </h3>
//                             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
//                                 <p className="text-gray-700">{appointment.notes}</p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Created Date */}
//                     <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
//                         <div className="text-sm text-gray-600">
//                             Created on {new Date(appointment.createdAt).toLocaleDateString("en-US", {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminAppoint;



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
                                        {appointment.notes && appointment.notes !== "No additional notes" && (
                                            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="text-sm text-blue-800">
                                                    <strong>Message:</strong> {appointment.notes}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex space-x-2 pt-3 border-t border-gray-200">
                                            <button
                                                onClick={() => setViewAppointment(appointment)}
                                                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-500"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                <span>View</span>
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(appointment.id)}
                                                className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                <span>Delete</span>
                                            </button>
                                        </div>

                                        {/* Status Update Buttons */}
                                        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                                            <div className="flex space-x-2 mt-3">
                                                {appointment.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                                                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-300"
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                                {appointment.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                                                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all duration-300"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-300"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
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

            {/* Appointment Form Modal */}
            {showForm && (
                <AppointmentForm
                    appointment={editingAppointment}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

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
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                            >
                                Cancel
                            </button>
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

            {/* View Appointment Modal */}
            {viewAppointment && (
                <ViewAppointmentModal
                    appointment={viewAppointment}
                    onClose={() => setViewAppointment(null)}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
};

// Appointment Form Component
const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        patientName: appointment?.patientName || "",
        patientEmail: appointment?.patientEmail || "",
        patientPhone: appointment?.patientPhone || "",
        doctorName: appointment?.doctorName || "Dr. Priya Sharma",
        doctorSpecialization: appointment?.doctorSpecialization || "Psychiatry",
        date: appointment?.date || "",
        time: appointment?.time || "",
        duration: appointment?.duration || "45 mins",
        type: appointment?.type || "Consultation",
        status: appointment?.status || "pending",
        notes: appointment?.notes || "",
        address: appointment?.address || "Sunshine Mindcare, Nashik",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.patientName.trim()) {
            alert('Please enter patient name');
            return;
        }
        if (!formData.patientEmail.trim()) {
            alert('Please enter patient email');
            return;
        }
        if (!formData.patientPhone.trim()) {
            alert('Please enter patient phone');
            return;
        }
        if (!formData.date) {
            alert('Please select appointment date');
            return;
        }
        if (!formData.time) {
            alert('Please select appointment time');
            return;
        }

        onSubmit(formData);
    };

    const doctors = [
        { name: "Dr. Priya Sharma", specialization: "Psychiatry" },
        { name: "Dr. Amit Patel", specialization: "Clinical Psychology" },
        { name: "Dr. Sneha Reddy", specialization: "Counseling" },
        { name: "Dr. Michael Chen", specialization: "Psychiatry" },
        { name: "Dr. Lisa Wang", specialization: "Therapy" },
        { name: "Dr. Robert Davis", specialization: "Counseling" },
    ];

    const appointmentTypes = ["Consultation", "Therapy", "Follow-up"];
    const durations = ["30 mins", "45 mins", "60 mins", "90 mins"];
    const addresses = ["Sunshine Mindcare, Nashik", "Manoday Center, Nashik"];

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">
                            {appointment ? "Edit Appointment" : "Create New Appointment"}
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
                        {/* Patient Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Patient Name *
                                </label>
                                <input
                                    type="text"
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter patient name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Patient Email *
                                </label>
                                <input
                                    type="email"
                                    name="patientEmail"
                                    value={formData.patientEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter patient email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Patient Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="patientPhone"
                                    value={formData.patientPhone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                    placeholder="Enter patient phone"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Address *
                                </label>
                                <select
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                >
                                    {addresses.map(address => (
                                        <option key={address} value={address}>{address}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Doctor Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Doctor *
                                </label>
                                <select
                                    name="doctorName"
                                    value={formData.doctorName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                >
                                    {doctors.map(doctor => (
                                        <option key={doctor.name} value={doctor.name}>
                                            {doctor.name} - {doctor.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Appointment Type *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                >
                                    {appointmentTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Time *
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Duration *
                                </label>
                                <select
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                >
                                    {durations.map(duration => (
                                        <option key={duration} value={duration}>{duration}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status and Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                                placeholder="Additional notes about the appointment..."
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2a5298]"
                            >
                                {appointment ? "Update Appointment" : "Create Appointment"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// View Appointment Modal Component
const ViewAppointmentModal = ({ appointment, onClose, onEdit }) => {
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

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Appointment Details</h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Patient Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                                Patient Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faUser} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-semibold">{appointment.patientName}</div>
                                        <div className="text-sm text-gray-600">Patient</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-medium">{appointment.patientEmail}</div>
                                        <div className="text-sm text-gray-600">Email</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-medium">{appointment.patientPhone}</div>
                                        <div className="text-sm text-gray-600">Phone</div>
                                    </div>
                                </div>
                                {appointment.alternate_contact_no && (
                                    <div className="flex items-center space-x-3">
                                        <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] w-4" />
                                        <div>
                                            <div className="font-medium">{appointment.alternate_contact_no}</div>
                                            <div className="text-sm text-gray-600">Alternate Phone</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                                Service Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faStethoscope} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-semibold">{appointment.service_name}</div>
                                        <div className="text-sm text-gray-600">Service</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faUserMd} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-medium">{appointment.sub_service_name}</div>
                                        <div className="text-sm text-gray-600">Sub Service</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] w-4" />
                                    <div>
                                        <div className="font-medium">{appointment.address}</div>
                                        <div className="text-sm text-gray-600">Location</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                            Appointment Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600 text-xl mb-2" />
                                <div className="font-semibold text-blue-800">
                                    {new Date(appointment.date).toLocaleDateString("en-US", {
                                        weekday: 'long',
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="text-sm text-blue-600">Date</div>
                            </div>

                            <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                                <FontAwesomeIcon icon={faClock} className="text-green-600 text-xl mb-2" />
                                <div className="font-semibold text-green-800">{appointment.time}</div>
                                <div className="text-sm text-green-600">Time</div>
                            </div>

                            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                                <FontAwesomeIcon icon={faClock} className="text-purple-600 text-xl mb-2" />
                                <div className="font-semibold text-purple-800">{appointment.duration}</div>
                                <div className="text-sm text-purple-600">Duration</div>
                            </div>
                        </div>
                    </div>

                    {/* Status and Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(appointment.status)}`}>
                                <FontAwesomeIcon icon={getStatusIcon(appointment.status)} />
                                <span className="font-semibold capitalize">{appointment.status}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">Status</div>
                        </div>

                        <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full ${getTypeColor(appointment.type)}`}>
                                <span className="font-semibold">{appointment.type}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">Type</div>
                        </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && appointment.notes !== "No additional notes" && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                                Patient Message
                            </h3>
                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                <p className="text-gray-700">{appointment.notes}</p>
                            </div>
                        </div>
                    )}

                    {/* Created Date */}
                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-sm text-gray-600">
                            Created on {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => {
                                onEdit(appointment);
                                onClose();
                            }}
                            className="flex-1 bg-[#2a5298] text-white py-3 rounded-xl font-semibold hover:bg-[#1e2a4a] transition-all duration-300 border border-[#2a5298]"
                        >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Edit Appointment
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAppoint;