// import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faEdit,
//   faTrash,
//   faCalendarAlt,
//   faUser,
//   faSearch,
//   faFilter,
//   faEye,
//   faChevronLeft,
//   faChevronRight,
//   faXmark,
//   faBriefcase,
//   faMapMarkerAlt,
//   faMoneyBillWave,
//   faClock,
//   faUsers,
//   faFileAlt,
//   faCheck,
//   faTimes,
//   faEnvelope,
//   faPhone,
//   faDownload,
// } from "@fortawesome/free-solid-svg-icons";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([
//     {
//       id: 1,
//       title: "Clinical Psychologist",
//       department: "Mental Health",
//       type: "Full-time",
//       location: "Nashik",
//       salary: "₹60,000 - ₹80,000/month",
//       experience: "3+ years",
//       description: "We are looking for a qualified Clinical Psychologist to join our mental health team. The ideal candidate will have experience in cognitive behavioral therapy and patient counseling.",
//       requirements: ["PhD in Clinical Psychology", "Valid license to practice", "Experience with CBT and DBT", "Excellent communication skills"],
//       status: "active",
//       postedDate: "2024-01-15",
//       applications: 12,
//       deadline: "2024-02-15"
//     },
//     {
//       id: 2,
//       title: "Mental Health Counselor",
//       department: "Counseling",
//       type: "Part-time",
//       location: "Pune",
//       salary: "₹35,000 - ₹45,000/month",
//       experience: "2+ years",
//       description: "Seeking a compassionate Mental Health Counselor to provide individual and group counseling sessions. Must be skilled in various therapeutic approaches.",
//       requirements: ["Master's in Psychology", "Counseling certification", "Experience in mental health settings", "Empathetic and patient"],
//       status: "active",
//       postedDate: "2024-01-12",
//       applications: 8,
//       deadline: "2024-02-10"
//     },
//     {
//       id: 3,
//       title: "Psychiatric Nurse",
//       department: "Medical",
//       type: "Full-time",
//       location: "Nashik",
//       salary: "₹45,000 - ₹60,000/month",
//       experience: "4+ years",
//       description: "We need a dedicated Psychiatric Nurse to work with our psychiatry team. Responsibilities include patient care, medication management, and support.",
//       requirements: ["BSc Nursing", "Psychiatric nursing certification", "4+ years experience", "Strong clinical skills"],
//       status: "closed",
//       postedDate: "2024-01-10",
//       applications: 15,
//       deadline: "2024-01-31"
//     }
//   ]);

//   const [applications, setApplications] = useState([
//     {
//       id: 1,
//       jobId: 1,
//       applicantName: "Priya Sharma",
//       applicantEmail: "priya.sharma@email.com",
//       applicantPhone: "+91 9876543210",
//       experience: "4 years",
//       education: "PhD in Clinical Psychology",
//       coverLetter: "I am very interested in the Clinical Psychologist position at Sunshine Mindcare. With 4 years of experience in clinical practice and specialization in CBT, I believe I can contribute significantly to your team.",
//       resume: "priya_sharma_resume.pdf",
//       appliedDate: "2024-01-16",
//       status: "pending",
//       notes: "Strong background in CBT"
//     },
//     {
//       id: 2,
//       jobId: 1,
//       applicantName: "Rahul Verma",
//       applicantEmail: "rahul.verma@email.com",
//       applicantPhone: "+91 9876543211",
//       experience: "3 years",
//       education: "MPhil in Clinical Psychology",
//       coverLetter: "I have been working as a clinical psychologist for 3 years and have extensive experience with various therapeutic approaches. I am particularly interested in your innovative mental health programs.",
//       resume: "rahul_verma_resume.pdf",
//       appliedDate: "2024-01-17",
//       status: "reviewed",
//       notes: "Good academic background"
//     },
//     {
//       id: 3,
//       jobId: 2,
//       applicantName: "Anjali Patel",
//       applicantEmail: "anjali.patel@email.com",
//       applicantPhone: "+91 9876543212",
//       experience: "2 years",
//       education: "MA in Counseling Psychology",
//       coverLetter: "As a dedicated mental health counselor, I have worked with diverse populations and have experience in both individual and group therapy settings.",
//       resume: "anjali_patel_resume.pdf",
//       appliedDate: "2024-01-14",
//       status: "accepted",
//       notes: "Excellent communication skills"
//     },
//     {
//       id: 4,
//       jobId: 2,
//       applicantName: "Suresh Kumar",
//       applicantEmail: "suresh.kumar@email.com",
//       applicantPhone: "+91 9876543213",
//       experience: "1 year",
//       education: "MA in Psychology",
//       coverLetter: "I am a recent graduate with one year of internship experience in mental health counseling. I am eager to start my professional career with your organization.",
//       resume: "suresh_kumar_resume.pdf",
//       appliedDate: "2024-01-13",
//       status: "rejected",
//       notes: "Limited experience"
//     },
//     {
//       id: 5,
//       jobId: 3,
//       applicantName: "Meena Reddy",
//       applicantEmail: "meena.reddy@email.com",
//       applicantPhone: "+91 9876543214",
//       experience: "5 years",
//       education: "BSc Nursing + Psychiatric Certification",
//       coverLetter: "With 5 years of experience in psychiatric nursing, I have developed strong skills in patient care, medication management, and crisis intervention.",
//       resume: "meena_reddy_resume.pdf",
//       appliedDate: "2024-01-11",
//       status: "accepted",
//       notes: "Highly experienced"
//     }
//   ]);

//   const [alert, setAlert] = useState(null);
//   const [showJobForm, setShowJobForm] = useState(false);
//   const [editingJob, setEditingJob] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [viewApplication, setViewApplication] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "applications"
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const itemsPerPage = 6;

//   // Get unique departments and statuses
//   const departments = ["all", ...new Set(jobs.map(job => job.department))];
//   const statuses = ["all", "active", "closed"];
//   const applicationStatuses = ["all", "pending", "reviewed", "accepted", "rejected"];

//   // Filter jobs based on search and filters
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === "all" || job.status === selectedStatus;
//     const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
    
//     return matchesSearch && matchesStatus && matchesDepartment;
//   });

//   // Filter applications based on search and filters
//   const filteredApplications = applications.filter(app => {
//     const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Get current items based on active tab
//   const currentItems = activeTab === "jobs" ? filteredJobs : filteredApplications;
//   const totalPages = Math.ceil(currentItems.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItemsSlice = currentItems.slice(indexOfFirstItem, indexOfLastItem);

//   const handleDeleteJob = (id) => {
//     setJobs(jobs.filter((job) => job.id !== id));
//     setAlert({
//       type: "success",
//       message: "Job deleted successfully!",
//     });
//     setDeleteConfirm(null);

//     if (currentItemsSlice.length === 1 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleDeleteApplication = (id) => {
//     setApplications(applications.filter((app) => app.id !== id));
//     setAlert({
//       type: "success",
//       message: "Application deleted successfully!",
//     });
//     setDeleteConfirm(null);

//     if (currentItemsSlice.length === 1 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleJobFormSubmit = (formData) => {
//     if (editingJob) {
//       setJobs(
//         jobs.map((job) =>
//           job.id === editingJob.id ? { ...job, ...formData } : job
//         )
//       );
//       setAlert({
//         type: "success",
//         message: "Job updated successfully!",
//       });
//     } else {
//       const newJob = {
//         id: jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1,
//         ...formData,
//         postedDate: new Date().toISOString().split('T')[0],
//         applications: 0,
//         status: "active"
//       };
//       setJobs([...jobs, newJob]);
//       setAlert({
//         type: "success",
//         message: "Job posted successfully!",
//       });
//     }
//     setShowJobForm(false);
//     setEditingJob(null);
//   };

//   const handleApplicationStatusUpdate = (id, newStatus) => {
//     setApplications(
//       applications.map((app) =>
//         app.id === id ? { ...app, status: newStatus } : app
//       )
//     );
//     setAlert({
//       type: "success",
//       message: `Application ${newStatus} successfully!`,
//     });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//       case "accepted":
//         return "bg-green-100 text-green-800 border border-green-300";
//       case "pending":
//       case "reviewed":
//         return "bg-yellow-100 text-yellow-800 border border-yellow-300";
//       case "closed":
//       case "rejected":
//         return "bg-red-100 text-red-800 border border-red-300";
//       default:
//         return "bg-gray-100 text-gray-800 border border-gray-300";
//     }
//   };

//   const getJobTypeColor = (type) => {
//     switch (type) {
//       case "Full-time":
//         return "bg-blue-100 text-blue-800";
//       case "Part-time":
//         return "bg-purple-100 text-purple-800";
//       case "Contract":
//         return "bg-orange-100 text-orange-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Dynamic pagination generation
//   const getPaginationNumbers = () => {
//     const pages = [];
//     const showEllipsis = totalPages > 7;

//     if (!showEllipsis) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1, 2, 3);
//       if (currentPage > 4) pages.push("...");
//       if (currentPage > 3 && currentPage < totalPages - 2) {
//         pages.push(currentPage - 1, currentPage, currentPage + 1);
//       }
//       if (currentPage < totalPages - 3) pages.push("...");
//       pages.push(totalPages - 2, totalPages - 1, totalPages);
//     }

//     return [...new Set(pages)].sort((a, b) => a - b);
//   };

//   // Reset filters
//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setSelectedStatus("all");
//     setSelectedDepartment("all");
//     setCurrentPage(1);
//   };

//   // Calculate statistics
//   const stats = {
//     totalJobs: jobs.length,
//     activeJobs: jobs.filter(j => j.status === "active").length,
//     totalApplications: applications.length,
//     pendingApplications: applications.filter(a => a.status === "pending").length,
//   };

//   // Animation styles
//   const animationStyles = `
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
    
//     .animate-slide-in-up {
//       animation: slideInUp 0.6s ease-out;
//     }
    
//     .animate-fade-in {
//       animation: fadeIn 0.8s ease-out;
//     }
    
//     .animate-scale-in {
//       animation: scaleIn 0.5s ease-out;
//     }
    
//     .hover-lift {
//       transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//     }
    
//     .hover-lift:hover {
//       transform: translateY(-8px);
//       box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//     }
//   `;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <style>{animationStyles}</style>
      
//       {/* Alert */}
//       {alert && (
//         <div className="fixed top-4 right-4 z-50 animate-fade-in">
//           <div className={`px-6 py-4 rounded-xl shadow-lg border ${
//             alert.type === 'success' 
//               ? 'bg-green-100 text-green-800 border-green-300' 
//               : 'bg-red-100 text-red-800 border-red-300'
//           }`}>
//             <div className="flex items-center space-x-3">
//               <FontAwesomeIcon 
//                 icon={alert.type === 'success' ? faCheck : faTimes} 
//                 className="text-lg"
//               />
//               <span className="font-semibold">{alert.message}</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//           <div className="mb-6 lg:mb-0">
//             <h1 className="text-4xl font-bold text-[#2a5298] mb-3 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] bg-clip-text text-transparent">
//               Jobs Management
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Post job openings and manage applications
//             </p>
//           </div>

//           {/* Add Job Button */}
//           <button
//             onClick={() => setShowJobForm(true)}
//             className="group relative bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift"
//           >
//             <div className="flex items-center space-x-3 relative z-10">
//               <FontAwesomeIcon
//                 icon={faPlus}
//                 className="transition-transform duration-500 group-hover:rotate-180"
//               />
//               <span className="text-lg">Post New Job</span>
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#2a5298] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Jobs */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-[#2a5298] mb-2">
//                   {stats.totalJobs}
//                 </div>
//                 <div className="text-gray-600 font-medium">Total Jobs</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faBriefcase}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Active Jobs */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.1s'}}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-green-600 mb-2">
//                   {stats.activeJobs}
//                 </div>
//                 <div className="text-gray-600 font-medium">Active Jobs</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faUsers}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Total Applications */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.2s'}}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-purple-600 mb-2">
//                   {stats.totalApplications}
//                 </div>
//                 <div className="text-gray-600 font-medium">Applications</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faFileAlt}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pending Applications */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.3s'}}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-yellow-600 mb-2">
//                   {stats.pendingApplications}
//                 </div>
//                 <div className="text-gray-600 font-medium">Pending Review</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faClock}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-8 animate-scale-in">
//           <div className="flex space-x-2">
//             <button
//               onClick={() => {
//                 setActiveTab("jobs");
//                 setCurrentPage(1);
//                 setSearchTerm("");
//                 setSelectedStatus("all");
//                 setSelectedDepartment("all");
//               }}
//               className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "jobs"
//                   ? "bg-[#2a5298] text-white shadow-md"
//                   : "text-gray-600 hover:text-[#2a5298] hover:bg-gray-50"
//               }`}
//             >
//               <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
//               Job Openings ({jobs.length})
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab("applications");
//                 setCurrentPage(1);
//                 setSearchTerm("");
//                 setSelectedStatus("all");
//                 setSelectedDepartment("all");
//               }}
//               className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === "applications"
//                   ? "bg-[#2a5298] text-white shadow-md"
//                   : "text-gray-600 hover:text-[#2a5298] hover:bg-gray-50"
//               }`}
//             >
//               <FontAwesomeIcon icon={faUsers} className="mr-2" />
//               Applications ({applications.length})
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-scale-in">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search Input */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Search {activeTab === "jobs" ? "Jobs" : "Applications"}
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder={
//                     activeTab === "jobs" 
//                       ? "Search by job title or department..." 
//                       : "Search by applicant name or email..."
//                   }
//                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 />
                
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div>
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Status
//               </label>
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//               >
//                 {activeTab === "jobs" 
//                   ? statuses.map(status => (
//                       <option key={status} value={status}>
//                         {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     ))
//                   : applicationStatuses.map(status => (
//                       <option key={status} value={status}>
//                         {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
//                       </option>
//                     ))
//                 }
//               </select>
//             </div>

//             {/* Department Filter (only for jobs) */}
//             {activeTab === "jobs" && (
//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Department
//                 </label>
//                 <select
//                   value={selectedDepartment}
//                   onChange={(e) => setSelectedDepartment(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 >
//                   {departments.map(dept => (
//                     <option key={dept} value={dept}>
//                       {dept === "all" ? "All Departments" : dept}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Filter Actions */}
//           <div className="flex justify-between items-center mt-4">
//             <div className="text-sm text-gray-600">
//               Showing {currentItems.length} of {activeTab === "jobs" ? jobs.length : applications.length} {activeTab === "jobs" ? "jobs" : "applications"}
//             </div>
//             <button
//               onClick={handleResetFilters}
//               className="text-sm text-[#2a5298] font-semibold hover:text-[#1e2a4a] transition-colors duration-300 flex items-center space-x-2"
//             >
//               <FontAwesomeIcon icon={faFilter} />
//               <span>Reset Filters</span>
//             </button>
//           </div>
//         </div>

//         {/* Jobs Grid */}
//         {activeTab === "jobs" && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//             {currentItemsSlice.map((job, index) => (
//               <div
//                 key={job.id}
//                 className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
//                 style={{animationDelay: `${index * 0.1}s`}}
//               >
//                 {/* Job Header */}
//                 <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
//                       {job.status}
//                     </span>
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.type)}`}>
//                       {job.type}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-bold truncate">{job.title}</h3>
//                 </div>

//                 {/* Job Content */}
//                 <div className="p-3">
//                   {/* Job Details */}
//                   <div className="space-y-3 mb-4">
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] mr-3 w-4" />
//                       <span>{job.location}</span>
//                     </div>
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#2a5298] mr-3 w-4" />
//                       <span>{job.salary}</span>
//                     </div>
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faClock} className="text-[#2a5298] mr-3 w-4" />
//                       <span>{job.experience} experience</span>
//                     </div>
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faUsers} className="text-[#2a5298] mr-3 w-4" />
//                       <span>{job.applications} applications</span>
//                     </div>
//                   </div>

//                   {/* Job Description */}
//                   <div className="mb-3">
//                     <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
//                       {job.description}
//                     </p>
//                   </div>

//                   {/* Job Meta */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                     <div className="flex items-center">
//                       <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
//                       <span>
//                         Posted: {new Date(job.postedDate).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>
//                     <span>Deadline: {new Date(job.deadline).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     })}</span>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex space-x-2 pt-3  border-t border-gray-200">
//                     <button
//                       onClick={() => {
//                         setEditingJob(job);
//                         setShowJobForm(true);
//                       }}
//                       className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
//                     >
//                       <FontAwesomeIcon icon={faEdit} />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => setDeleteConfirm({ type: 'job', id: job.id })}
//                       className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Applications Grid */}
//         {activeTab === "applications" && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//             {currentItemsSlice.map((application, index) => {
//               const job = jobs.find(j => j.id === application.jobId);
//               return (
//                 <div
//                   key={application.id}
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
//                   style={{animationDelay: `${index * 0.1}s`}}
//                 >
//                   {/* Application Header */}
//                   <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
//                         {application.status}
//                       </span>
//                     </div>
//                     <h3 className="text-lg font-bold truncate">{application.applicantName}</h3>
//                     <p className="text-sm opacity-90 truncate">{job?.title}</p>
//                   </div>

//                   {/* Application Content */}
//                   <div className="p-3">
//                     {/* Applicant Details */}
//                     <div className="space-y-3 mb-4">
//                       <div className="flex items-center text-gray-700">
//                         <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] mr-3 w-4" />
//                         <span className="truncate">{application.applicantEmail}</span>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] mr-3 w-4" />
//                         <span>{application.applicantPhone}</span>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <FontAwesomeIcon icon={faBriefcase} className="text-[#2a5298] mr-3 w-4" />
//                         <span>{application.experience} experience</span>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <FontAwesomeIcon icon={faUser} className="text-[#2a5298] mr-3 w-4" />
//                         <span className="text-sm">{application.education}</span>
//                       </div>
//                     </div>

//                     {/* Cover Letter Excerpt */}
//                     <div className="mb-3">
//                       <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
//                         "{application.coverLetter}"
//                       </p>
//                     </div>

//                     {/* Application Meta */}
//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                       <div className="flex items-center">
//                         <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
//                         <span>
//                           Applied: {new Date(application.appliedDate).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                           })}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex space-x-2 pt-3 border-t border-gray-200">
                      
//                       <button
//                         onClick={() => setDeleteConfirm({ type: 'application', id: application.id })}
//                         className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                         <span>Delete</span>
//                       </button>
//                     </div>

//                     {/* Status Update Buttons */}
//                     {application.status !== 'accepted' && application.status !== 'rejected' && (
//                       <div className="flex space-x-2 mt-3">
//                         <button
//                           onClick={() => handleApplicationStatusUpdate(application.id, 'accepted')}
//                           className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-300"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => handleApplicationStatusUpdate(application.id, 'rejected')}
//                           className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-300"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Empty State */}
//         {currentItems.length === 0 && (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
//             <div className="text-6xl mb-6 text-[#2a5298]">
//               {activeTab === "jobs" ? "💼" : "📄"}
//             </div>
//             <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
//               No {activeTab === "jobs" ? "Jobs" : "Applications"} Found
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               {searchTerm || selectedStatus !== "all" || selectedDepartment !== "all"
//                 ? "Try adjusting your search filters to find more items."
//                 : activeTab === "jobs" 
//                   ? "Get started by posting your first job opening."
//                   : "No applications have been submitted yet."
//               }
//             </p>
//             {activeTab === "jobs" && (
//               <button
//                 onClick={() => setShowJobForm(true)}
//                 className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
//               >
//                 Post Your First Job
//               </button>
//             )}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-center space-x-2 mt-12 animate-fade-in">
//             {/* Previous Button */}
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
//             >
//               <FontAwesomeIcon
//                 icon={faChevronLeft}
//                 className="text-[#2a5298]"
//               />
//             </button>

//             {/* Page Numbers */}
//             {getPaginationNumbers().map((pageNum, index) => (
//               <button
//                 key={index}
//                 onClick={() =>
//                   typeof pageNum === "number" && setCurrentPage(pageNum)
//                 }
//                 className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${
//                   pageNum === currentPage
//                     ? "bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white shadow-lg border border-[#2a5298]"
//                     : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
//                 } ${
//                   pageNum === "..."
//                     ? "cursor-default hover:bg-white hover:border-gray-300 hover-lift-none"
//                     : ""
//                 }`}
//                 disabled={pageNum === "..."}
//               >
//                 {pageNum}
//               </button>
//             ))}

//             {/* Next Button */}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2a5298] transition-all duration-300 hover-lift"
//             >
//               <FontAwesomeIcon
//                 icon={faChevronRight}
//                 className="text-[#2a5298]"
//               />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Job Form Modal */}
//       {showJobForm && (
//         <JobForm
//           job={editingJob}
//           onSubmit={handleJobFormSubmit}
//           onCancel={() => {
//             setShowJobForm(false);
//             setEditingJob(null);
//           }}
//         />
//       )}

//       {/* Delete Confirmation */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//           <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto animate-scale-in">
//             <h3 className="text-xl font-bold text-[#2a5298] mb-4">
//               Confirm Deletion
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   if (deleteConfirm.type === 'job') {
//                     handleDeleteJob(deleteConfirm.id);
//                   } else {
//                     handleDeleteApplication(deleteConfirm.id);
//                   }
//                 }}
//                 className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Application Modal */}
//       {viewApplication && (
//         <ViewApplicationModal
//           application={viewApplication}
//           job={jobs.find(j => j.id === viewApplication.jobId)}
//           onClose={() => setViewApplication(null)}
//           onStatusUpdate={handleApplicationStatusUpdate}
//           onDelete={setDeleteConfirm}
//         />
//       )}
//     </div>
//   );
// };

// // Job Form Component
// const JobForm = ({ job, onSubmit, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: job?.title || "",
//     department: job?.department || "Mental Health",
//     type: job?.type || "Full-time",
//     location: job?.location || "Nashik",
//     salary: job?.salary || "",
//     experience: job?.experience || "",
//     description: job?.description || "",
//     requirements: job?.requirements || [],
//     deadline: job?.deadline || "",
//     status: job?.status || "active",
//   });

//   const [requirementInput, setRequirementInput] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddRequirement = () => {
//     if (requirementInput.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         requirements: [...prev.requirements, requirementInput.trim()],
//       }));
//       setRequirementInput("");
//     }
//   };

//   const handleRemoveRequirement = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       requirements: prev.requirements.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!formData.title.trim()) {
//       alert('Please enter job title');
//       return;
//     }
//     if (!formData.description.trim()) {
//       alert('Please enter job description');
//       return;
//     }
//     if (!formData.deadline) {
//       alert('Please select application deadline');
//       return;
//     }

//     onSubmit(formData);
//   };

//   const departments = ["Mental Health", "Counseling", "Medical", "Administration", "Support Staff"];
//   const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//       <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold">
//               {job ? "Edit Job" : "Post New Job"}
//             </h2>
//             <button
//               onClick={onCancel}
//               className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
//             >
//               <FontAwesomeIcon icon={faXmark} />
//             </button>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="p-6 max-h-[70vh] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Basic Information */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Job Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                   placeholder="Enter job title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Department *
//                 </label>
//                 <select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 >
//                   {departments.map(dept => (
//                     <option key={dept} value={dept}>{dept}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Job Type *
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 >
//                   {jobTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Location *
//                 </label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                   placeholder="Enter location"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Application Deadline *
//                 </label>
//                 <input
//                   type="date"
//                   name="deadline"
//                   value={formData.deadline}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Salary Range *
//                 </label>
//                 <input
//                   type="text"
//                   name="salary"
//                   value={formData.salary}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                   placeholder="e.g., ₹60,000 - ₹80,000/month"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                   Experience Required *
//                 </label>
//                 <input
//                   type="text"
//                   name="experience"
//                   value={formData.experience}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                   placeholder="e.g., 3+ years"
//                 />
//               </div>
//             </div>

//             {/* Job Description */}
//             <div>
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Job Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 required
//                 rows="4"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 placeholder="Describe the job responsibilities and expectations..."
//               />
//             </div>

//             {/* Requirements */}
//             {/* <div>
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Requirements
//               </label>
//               <div className="space-y-2">
//                 {formData.requirements.map((req, index) => (
//                   <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                     <span className="text-gray-700">{req}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveRequirement(index)}
//                       className="text-red-500 hover:text-red-700 transition-colors duration-300"
//                     >
//                       <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                   </div>
//                 ))}
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={requirementInput}
//                     onChange={(e) => setRequirementInput(e.target.value)}
//                     placeholder="Add a requirement..."
//                     className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddRequirement}
//                     className="px-6 py-3 bg-[#2a5298] text-white rounded-xl font-semibold hover:bg-[#1e2a4a] transition-all duration-300"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             </div> */}

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//               >
//                 <option value="active">Active</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>

//             {/* Form Actions */}
//             <div className="flex space-x-4 pt-4">
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2a5298]"
//               >
//                 {job ? "Update Job" : "Post Job"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // View Application Modal Component
// const ViewApplicationModal = ({ application, job, onClose, onStatusUpdate, onDelete }) => {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//       <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold">Application Details</h2>
//             <button
//               onClick={onClose}
//               className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
//             >
//               <FontAwesomeIcon icon={faXmark} />
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Applicant Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                 Applicant Information
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faUser} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-semibold">{application.applicantName}</div>
//                     <div className="text-sm text-gray-600">Full Name</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-medium">{application.applicantEmail}</div>
//                     <div className="text-sm text-gray-600">Email</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-medium">{application.applicantPhone}</div>
//                     <div className="text-sm text-gray-600">Phone</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                 Job Information
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faBriefcase} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-semibold">{job?.title}</div>
//                     <div className="text-sm text-gray-600">Position</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-medium">{job?.location}</div>
//                     <div className="text-sm text-gray-600">Location</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faClock} className="text-[#2a5298] w-4" />
//                   <div>
//                     <div className="font-medium">
//                       Applied: {new Date(application.appliedDate).toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </div>
//                     <div className="text-sm text-gray-600">Application Date</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Qualifications */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                 Education
//               </h3>
//               <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-gray-700">{application.education}</p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                 Experience
//               </h3>
//               <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
//                 <p className="text-gray-700">{application.experience}</p>
//               </div>
//             </div>
//           </div>

//           {/* Cover Letter */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//               Cover Letter
//             </h3>
//             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <p className="text-gray-700 leading-relaxed">{application.coverLetter}</p>
//             </div>
//           </div>

//           {/* Resume */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//               Resume
//             </h3>
//             <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 text-xl" />
//                   <div>
//                     <div className="font-semibold text-blue-800">{application.resume}</div>
//                     <div className="text-sm text-blue-600">PDF Document</div>
//                   </div>
//                 </div>
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2">
//                   <FontAwesomeIcon icon={faDownload} />
//                   <span>Download</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Status and Notes */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
//               <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(application.status)}`}>
//                 <span className="font-semibold capitalize">{application.status}</span>
//               </div>
//               <div className="text-sm text-gray-600 mt-2">Current Status</div>
//             </div>

//             {application.notes && (
//               <div className="space-y-3">
//                 <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
//                   Admin Notes
//                 </h3>
//                 <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
//                   <p className="text-gray-700">{application.notes}</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex space-x-4 pt-4 border-t border-gray-200">
//             {application.status !== 'accepted' && application.status !== 'rejected' && (
//               <>
//                 <button
//                   onClick={() => {
//                     onStatusUpdate(application.id, 'accepted');
//                     onClose();
//                   }}
//                   className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 border border-green-500"
//                 >
//                   <FontAwesomeIcon icon={faCheck} className="mr-2" />
//                   Accept Application
//                 </button>
//                 <button
//                   onClick={() => {
//                     onStatusUpdate(application.id, 'rejected');
//                     onClose();
//                   }}
//                   className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 border border-red-500"
//                 >
//                   <FontAwesomeIcon icon={faTimes} className="mr-2" />
//                   Reject Application
//                 </button>
//               </>
//             )}
//             <button
//               onClick={() => {
//                 onDelete({ type: 'application', id: application.id });
//                 onClose();
//               }}
//               className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 border border-gray-500"
//             >
//               <FontAwesomeIcon icon={faTrash} className="mr-2" />
//               Delete Application
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCalendarAlt,
  faUser,
  faSearch,
  faFilter,
  faEye,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faBriefcase,
  faMapMarkerAlt,
  faMoneyBillWave,
  faClock,
  faUsers,
  faFileAlt,
  faCheck,
  faTimes,
  faEnvelope,
  faPhone,
  faDownload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Clinical Psychologist",
      department: "Mental Health",
      type: "Full-time",
      location: "Nashik",
      salary: "₹60,000 - ₹80,000/month",
      experience: "3+ years",
      description: "We are looking for a qualified Clinical Psychologist to join our mental health team. The ideal candidate will have experience in cognitive behavioral therapy and patient counseling.",
      requirements: ["PhD in Clinical Psychology", "Valid license to practice", "Experience with CBT and DBT", "Excellent communication skills"],
      status: "active",
      postedDate: "2024-01-15",
      applications: 12,
      deadline: "2024-02-15"
    },
    {
      id: 2,
      title: "Mental Health Counselor",
      department: "Counseling",
      type: "Part-time",
      location: "Pune",
      salary: "₹35,000 - ₹45,000/month",
      experience: "2+ years",
      description: "Seeking a compassionate Mental Health Counselor to provide individual and group counseling sessions. Must be skilled in various therapeutic approaches.",
      requirements: ["Master's in Psychology", "Counseling certification", "Experience in mental health settings", "Empathetic and patient"],
      status: "active",
      postedDate: "2024-01-12",
      applications: 8,
      deadline: "2024-02-10"
    },
    {
      id: 3,
      title: "Psychiatric Nurse",
      department: "Medical",
      type: "Full-time",
      location: "Nashik",
      salary: "₹45,000 - ₹60,000/month",
      experience: "4+ years",
      description: "We need a dedicated Psychiatric Nurse to work with our psychiatry team. Responsibilities include patient care, medication management, and support.",
      requirements: ["BSc Nursing", "Psychiatric nursing certification", "4+ years experience", "Strong clinical skills"],
      status: "closed",
      postedDate: "2024-01-10",
      applications: 15,
      deadline: "2024-01-31"
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 1,
      applicantName: "Priya Sharma",
      applicantEmail: "priya.sharma@email.com",
      applicantPhone: "+91 9876543210",
      experience: "4 years",
      education: "PhD in Clinical Psychology",
      coverLetter: "I am very interested in the Clinical Psychologist position at Sunshine Mindcare. With 4 years of experience in clinical practice and specialization in CBT, I believe I can contribute significantly to your team.",
      resume: "priya_sharma_resume.pdf",
      appliedDate: "2024-01-16",
      status: "pending",
      notes: "Strong background in CBT"
    },
    {
      id: 2,
      jobId: 1,
      applicantName: "Rahul Verma",
      applicantEmail: "rahul.verma@email.com",
      applicantPhone: "+91 9876543211",
      experience: "3 years",
      education: "MPhil in Clinical Psychology",
      coverLetter: "I have been working as a clinical psychologist for 3 years and have extensive experience with various therapeutic approaches. I am particularly interested in your innovative mental health programs.",
      resume: "rahul_verma_resume.pdf",
      appliedDate: "2024-01-17",
      status: "reviewed",
      notes: "Good academic background"
    },
    {
      id: 3,
      jobId: 2,
      applicantName: "Anjali Patel",
      applicantEmail: "anjali.patel@email.com",
      applicantPhone: "+91 9876543212",
      experience: "2 years",
      education: "MA in Counseling Psychology",
      coverLetter: "As a dedicated mental health counselor, I have worked with diverse populations and have experience in both individual and group therapy settings.",
      resume: "anjali_patel_resume.pdf",
      appliedDate: "2024-01-14",
      status: "accepted",
      notes: "Excellent communication skills"
    },
    {
      id: 4,
      jobId: 2,
      applicantName: "Suresh Kumar",
      applicantEmail: "suresh.kumar@email.com",
      applicantPhone: "+91 9876543213",
      experience: "1 year",
      education: "MA in Psychology",
      coverLetter: "I am a recent graduate with one year of internship experience in mental health counseling. I am eager to start my professional career with your organization.",
      resume: "suresh_kumar_resume.pdf",
      appliedDate: "2024-01-13",
      status: "rejected",
      notes: "Limited experience"
    },
    {
      id: 5,
      jobId: 3,
      applicantName: "Meena Reddy",
      applicantEmail: "meena.reddy@email.com",
      applicantPhone: "+91 9876543214",
      experience: "5 years",
      education: "BSc Nursing + Psychiatric Certification",
      coverLetter: "With 5 years of experience in psychiatric nursing, I have developed strong skills in patient care, medication management, and crisis intervention.",
      resume: "meena_reddy_resume.pdf",
      appliedDate: "2024-01-11",
      status: "accepted",
      notes: "Highly experienced"
    }
  ]);

  const [alert, setAlert] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewApplication, setViewApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "applications"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  // API Base URL from environment variable
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Get unique departments and statuses
  const departments = ["all", ...new Set(jobs.map(job => job.department))];
  const statuses = ["all", "active", "closed"];
  const applicationStatuses = ["all", "pending", "reviewed", "accepted", "rejected"];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || job.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get current items based on active tab
  const currentItems = activeTab === "jobs" ? filteredJobs : filteredApplications;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsSlice = currentItems.slice(indexOfFirstItem, indexOfLastItem);

  // API function to add job
  const addJobAPI = async (jobData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/job/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    setAlert({
      type: "success",
      message: "Job deleted successfully!",
    });
    setDeleteConfirm(null);

    if (currentItemsSlice.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
    setAlert({
      type: "success",
      message: "Application deleted successfully!",
    });
    setDeleteConfirm(null);

    if (currentItemsSlice.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleJobFormSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Transform form data to match API payload structure
      const apiPayload = {
        heading: formData.title,
        department: formData.department,
        salary_lpa: formData.salary,
        type: formData.type.toLowerCase(),
        experience: formData.experience,
        requirements: Array.isArray(formData.requirements) ? formData.requirements.join(', ') : formData.requirements,
        description: formData.description,
        post_date: new Date().toISOString().split('T')[0],
        location: formData.location
      };

      // Call the API
      const response = await addJobAPI(apiPayload);

      if (response.status) {
        // API call successful - add job to local state with the ID from API
        const newJob = {
          id: response.data.id, // Use the ID returned from API
          title: formData.title,
          department: formData.department,
          type: formData.type,
          location: formData.location,
          salary: formData.salary,
          experience: formData.experience,
          description: formData.description,
          requirements: formData.requirements,
          status: "active",
          postedDate: new Date().toISOString().split('T')[0],
          applications: 0,
          deadline: formData.deadline
        };
        
        setJobs([...jobs, newJob]);
        setAlert({
          type: "success",
          message: "Job posted successfully!",
        });
      } else {
        throw new Error(response.message || 'Failed to add job');
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      setAlert({
        type: "error",
        message: error.message || "Failed to post job. Please try again.",
      });
      return; // Don't close the form if there's an error
    } finally {
      setLoading(false);
    }

    // Only close the form if API call was successful
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleApplicationStatusUpdate = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    setAlert({
      type: "success",
      message: `Application ${newStatus} successfully!`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "accepted":
        return "bg-green-100 text-green-800 border border-green-300";
      case "pending":
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "closed":
      case "rejected":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getJobTypeColor = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-purple-100 text-purple-800";
      case "Contract":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedDepartment("all");
    setCurrentPage(1);
  };

  // Calculate statistics
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.status === "active").length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === "pending").length,
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
    
    .animate-slide-in-up {
      animation: slideInUp 0.6s ease-out;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    
    .animate-scale-in {
      animation: scaleIn 0.5s ease-out;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <style>{animationStyles}</style>
      
      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`px-6 py-4 rounded-xl shadow-lg border ${
            alert.type === 'success' 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-red-100 text-red-800 border-red-300'
          }`}>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon 
                icon={alert.type === 'success' ? faCheck : faTimes} 
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
              Jobs Management
            </h1>
            <p className="text-gray-600 text-lg">
              Post job openings and manage applications
            </p>
          </div>

          {/* Add Job Button */}
          <button
            onClick={() => setShowJobForm(true)}
            disabled={loading}
            className="group relative bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 relative z-10">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="transition-transform duration-500 group-hover:rotate-180"
                />
              )}
              <span className="text-lg">
                {loading ? "Processing..." : "Post New Job"}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#2a5298] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2a5298] mb-2">
                  {stats.totalJobs}
                </div>
                <div className="text-gray-600 font-medium">Total Jobs</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.activeJobs}
                </div>
                <div className="text-gray-600 font-medium">Active Jobs</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.totalApplications}
                </div>
                <div className="text-gray-600 font-medium">Applications</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {stats.pendingApplications}
                </div>
                <div className="text-gray-600 font-medium">Pending Review</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-8 animate-scale-in">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setActiveTab("jobs");
                setCurrentPage(1);
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedDepartment("all");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "jobs"
                  ? "bg-[#2a5298] text-white shadow-md"
                  : "text-gray-600 hover:text-[#2a5298] hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Job Openings ({jobs.length})
            </button>
            <button
              onClick={() => {
                setActiveTab("applications");
                setCurrentPage(1);
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedDepartment("all");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "applications"
                  ? "bg-[#2a5298] text-white shadow-md"
                  : "text-gray-600 hover:text-[#2a5298] hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Applications ({applications.length})
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Search {activeTab === "jobs" ? "Jobs" : "Applications"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={
                    activeTab === "jobs" 
                      ? "Search by job title or department..." 
                      : "Search by applicant name or email..."
                  }
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
                {activeTab === "jobs" 
                  ? statuses.map(status => (
                      <option key={status} value={status}>
                        {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))
                  : applicationStatuses.map(status => (
                      <option key={status} value={status}>
                        {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))
                }
              </select>
            </div>

            {/* Department Filter (only for jobs) */}
            {activeTab === "jobs" && (
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {currentItems.length} of {activeTab === "jobs" ? jobs.length : applications.length} {activeTab === "jobs" ? "jobs" : "applications"}
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

        {/* Jobs Grid */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentItemsSlice.map((job, index) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Job Header */}
                <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold truncate">{job.title}</h3>
                </div>

                {/* Job Content */}
                <div className="p-3">
                  {/* Job Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] mr-3 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#2a5298] mr-3 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faClock} className="text-[#2a5298] mr-3 w-4" />
                      <span>{job.experience} experience</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faUsers} className="text-[#2a5298] mr-3 w-4" />
                      <span>{job.applications} applications</span>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Job Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      <span>
                        Posted: {new Date(job.postedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setShowJobForm(true);
                      }}
                      className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ type: 'job', id: job.id })}
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
        )}

        {/* Applications Grid */}
        {activeTab === "applications" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentItemsSlice.map((application, index) => {
              const job = jobs.find(j => j.id === application.jobId);
              return (
                <div
                  key={application.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Application Header */}
                  <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold truncate">{application.applicantName}</h3>
                    <p className="text-sm opacity-90 truncate">{job?.title}</p>
                  </div>

                  {/* Application Content */}
                  <div className="p-3">
                    {/* Applicant Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] mr-3 w-4" />
                        <span className="truncate">{application.applicantEmail}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] mr-3 w-4" />
                        <span>{application.applicantPhone}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faBriefcase} className="text-[#2a5298] mr-3 w-4" />
                        <span>{application.experience} experience</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FontAwesomeIcon icon={faUser} className="text-[#2a5298] mr-3 w-4" />
                        <span className="text-sm">{application.education}</span>
                      </div>
                    </div>

                    {/* Cover Letter Excerpt */}
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        "{application.coverLetter}"
                      </p>
                    </div>

                    {/* Application Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                        <span>
                          Applied: {new Date(application.appliedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => setViewApplication(application)}
                        className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
                      >
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'application', id: application.id })}
                        className="flex-1 bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Status Update Buttons */}
                    {application.status !== 'accepted' && application.status !== 'rejected' && (
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => handleApplicationStatusUpdate(application.id, 'accepted')}
                          className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all duration-300"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleApplicationStatusUpdate(application.id, 'rejected')}
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-300"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {currentItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
            <div className="text-6xl mb-6 text-[#2a5298]">
              {activeTab === "jobs" ? "💼" : "📄"}
            </div>
            <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
              No {activeTab === "jobs" ? "Jobs" : "Applications"} Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedStatus !== "all" || selectedDepartment !== "all"
                ? "Try adjusting your search filters to find more items."
                : activeTab === "jobs" 
                  ? "Get started by posting your first job opening."
                  : "No applications have been submitted yet."
              }
            </p>
            {activeTab === "jobs" && (
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              >
                Post Your First Job
              </button>
            )}
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
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${
                  pageNum === currentPage
                    ? "bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white shadow-lg border border-[#2a5298]"
                    : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
                } ${
                  pageNum === "..."
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
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm
          job={editingJob}
          onSubmit={handleJobFormSubmit}
          onCancel={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
          loading={loading}
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
              Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'job') {
                    handleDeleteJob(deleteConfirm.id);
                  } else {
                    handleDeleteApplication(deleteConfirm.id);
                  }
                }}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Application Modal */}
      {viewApplication && (
        <ViewApplicationModal
          application={viewApplication}
          job={jobs.find(j => j.id === viewApplication.jobId)}
          onClose={() => setViewApplication(null)}
          onStatusUpdate={handleApplicationStatusUpdate}
          onDelete={setDeleteConfirm}
        />
      )}
    </div>
  );
};

// Job Form Component
const JobForm = ({ job, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    department: job?.department || "Mental Health",
    type: job?.type || "Full-time",
    location: job?.location || "Nashik",
    salary: job?.salary || "",
    experience: job?.experience || "",
    description: job?.description || "",
    requirements: job?.requirements || [],
    deadline: job?.deadline || "",
    status: job?.status || "active",
  });

  const [requirementInput, setRequirementInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()],
      }));
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter job title');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter job description');
      return;
    }
    if (!formData.deadline) {
      alert('Please select application deadline');
      return;
    }

    onSubmit(formData);
  };

  const departments = ["Mental Health", "Counseling", "Medical", "Administration", "Support Staff"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {job ? "Edit Job" : "Post New Job"}
            </h2>
            <button
              onClick={onCancel}
              disabled={loading}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter job title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Salary Range *
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="e.g., ₹60,000 - ₹80,000/month"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Experience Required *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="e.g., 3+ years"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                placeholder="Describe the job responsibilities and expectations..."
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Requirements
              </label>
              <div className="space-y-2">
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300 disabled:opacity-50"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    placeholder="Add a requirement..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    disabled={loading}
                    className="px-6 py-3 bg-[#2a5298] text-white rounded-xl font-semibold hover:bg-[#1e2a4a] transition-all duration-300 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2a5298] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    {job ? "Updating..." : "Posting..."}
                  </>
                ) : (
                  job ? "Update Job" : "Post Job"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// View Application Modal Component
const ViewApplicationModal = ({ application, job, onClose, onStatusUpdate, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Application Details</h2>
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
          {/* Applicant Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                Applicant Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faUser} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-semibold">{application.applicantName}</div>
                    <div className="text-sm text-gray-600">Full Name</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-medium">{application.applicantEmail}</div>
                    <div className="text-sm text-gray-600">Email</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-medium">{application.applicantPhone}</div>
                    <div className="text-sm text-gray-600">Phone</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                Job Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faBriefcase} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-semibold">{job?.title}</div>
                    <div className="text-sm text-gray-600">Position</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-medium">{job?.location}</div>
                    <div className="text-sm text-gray-600">Location</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faClock} className="text-[#2a5298] w-4" />
                  <div>
                    <div className="font-medium">
                      Applied: {new Date(application.appliedDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-gray-600">Application Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                Education
              </h3>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-700">{application.education}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                Experience
              </h3>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-700">{application.experience}</p>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
              Cover Letter
            </h3>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{application.coverLetter}</p>
            </div>
          </div>

          {/* Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
              Resume
            </h3>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-blue-600 text-xl" />
                  <div>
                    <div className="font-semibold text-blue-800">{application.resume}</div>
                    <div className="text-sm text-blue-600">PDF Document</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getStatusColor(application.status)}`}>
                <span className="font-semibold capitalize">{application.status}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">Current Status</div>
            </div>

            {application.notes && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
                  Admin Notes
                </h3>
                <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-gray-700">{application.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            {application.status !== 'accepted' && application.status !== 'rejected' && (
              <>
                <button
                  onClick={() => {
                    onStatusUpdate(application.id, 'accepted');
                    onClose();
                  }}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 border border-green-500"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Accept Application
                </button>
                <button
                  onClick={() => {
                    onStatusUpdate(application.id, 'rejected');
                    onClose();
                  }}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 border border-red-500"
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-2" />
                  Reject Application
                </button>
              </>
            )}
            <button
              onClick={() => {
                onDelete({ type: 'application', id: application.id });
                onClose();
              }}
              className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 border border-gray-500"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;