// import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faTrash,
//   faUser,
//   faCalendarAlt,
//   faSearch,
//   faFilter,
//   faThumbsUp,
//   faComment,
//   faEye,
//   faCheck,
//   faChevronLeft,
//   faChevronRight,
//   faXmark,
//   faUserMd,
//   faStethoscope,
// } from "@fortawesome/free-solid-svg-icons";

// const Reviews = () => {
//   const [reviews, setReviews] = useState([
//     {
//       id: 1,
//       patientName: "Rajesh Kumar",
//       patientEmail: "rajesh.kumar@email.com",
//       rating: 5,
//       comment: "Excellent service! Dr. Priya Sharma was very understanding and provided great counseling sessions. The staff was very supportive.",
//       date: "2024-01-15",
//       status: "approved",
//       doctor: "Dr. Priya Sharma",
//       service: "Counseling",
//       helpful: 12,
//       verified: true,
//     },
//     {
//       id: 2,
//       patientName: "Anita Sharma",
//       patientEmail: "anita.sharma@email.com",
//       rating: 4,
//       comment: "Good experience overall. The therapy sessions helped me manage my stress better. Could improve on appointment scheduling.",
//       date: "2024-01-14",
//       status: "approved",
//       doctor: "Dr. Amit Patel",
//       service: "Therapy",
//       helpful: 8,
//       verified: true,
//     },
//     {
//       id: 3,
//       patientName: "Rohan Mehra",
//       patientEmail: "rohan.mehra@email.com",
//       rating: 3,
//       comment: "Average experience. The doctor was good but waiting time was too long. Facilities could be better.",
//       date: "2024-01-13",
//       status: "approved",
//       doctor: "Dr. Sneha Reddy",
//       service: "Consultation",
//       helpful: 5,
//       verified: false,
//     },
//     {
//       id: 4,
//       patientName: "Priya Singh",
//       patientEmail: "priya.singh@email.com",
//       rating: 5,
//       comment: "Outstanding care and support! The mental health workshop was life-changing. Highly recommend Sunshine Mindcare.",
//       date: "2024-01-12",
//       status: "approved",
//       doctor: "Dr. Michael Chen",
//       service: "Workshop",
//       helpful: 25,
//       verified: true,
//     },
//     {
//       id: 5,
//       patientName: "Vikram Joshi",
//       patientEmail: "vikram.joshi@email.com",
//       rating: 2,
//       comment: "Not satisfied with the service. Felt rushed during the session and didn't get proper attention.",
//       date: "2024-01-11",
//       status: "approved",
//       doctor: "Dr. Lisa Wang",
//       service: "Therapy",
//       helpful: 3,
//       verified: true,
//     },
//     {
//       id: 6,
//       patientName: "Sneha Gupta",
//       patientEmail: "sneha.gupta@email.com",
//       rating: 4,
//       comment: "Professional and caring staff. The counseling sessions have been very helpful for my anxiety issues.",
//       date: "2024-01-10",
//       status: "approved",
//       doctor: "Dr. Robert Davis",
//       service: "Counseling",
//       helpful: 15,
//       verified: true,
//     },
//   ]);

//   const [alert, setAlert] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [viewReview, setViewReview] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRating, setSelectedRating] = useState("all");
//   const [selectedDoctor, setSelectedDoctor] = useState("all");
//   const reviewsPerPage = 6;

//   // Get unique doctors and ratings
//   const doctors = ["all", ...new Set(reviews.map(review => review.doctor))];
//   const ratings = ["all", "5", "4", "3", "2", "1"];

//   // Filter reviews based on search, rating, and doctor
//   const filteredReviews = reviews.filter(review => {
//     const matchesSearch = review.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       review.doctor.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating;
//     const matchesDoctor = selectedDoctor === "all" || review.doctor === selectedDoctor;

//     return matchesSearch && matchesRating && matchesDoctor;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

//   const handleDelete = (id) => {
//     setReviews(reviews.filter((review) => review.id !== id));
//     setAlert({
//       type: "success",
//       message: "Review deleted successfully!",
//     });
//     setDeleteConfirm(null);

//     // Adjust current page if needed after deletion
//     if (currentReviews.length === 1 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const getRatingColor = (rating) => {
//     if (rating >= 4) return "text-green-600";
//     if (rating >= 3) return "text-yellow-600";
//     return "text-red-600";
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <FontAwesomeIcon
//         key={index}
//         icon={faStar}
//         className={index < rating ? "text-yellow-400" : "text-gray-300"}
//       />
//     ));
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
//     setSelectedRating("all");
//     setSelectedDoctor("all");
//     setCurrentPage(1);
//   };

//   // Calculate statistics
//   const stats = {
//     total: reviews.length,
//     averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
//     fiveStar: reviews.filter(r => r.rating === 5).length,
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
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
//       <style>{animationStyles}</style>

//       {/* Alert */}
//       {alert && (
//         <div className="fixed top-4 right-4 z-50 animate-fade-in">
//           <div className="px-6 py-4 rounded-xl shadow-lg border bg-green-100 text-green-800 border-green-300">
//             <div className="flex items-center space-x-3">
//               <FontAwesomeIcon icon={faCheck} className="text-lg" />
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
//               Review Management
//             </h1>
//             <p className="text-gray-600 text-lg">
//               View and manage patient reviews and feedback
//             </p>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Total Reviews */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-[#2a5298] mb-2">
//                   {stats.total}
//                 </div>
//                 <div className="text-gray-600 font-medium">Total Reviews</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faComment}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Average Rating */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-purple-600 mb-2">
//                   {stats.averageRating}
//                 </div>
//                 <div className="text-gray-600 font-medium">Avg Rating</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faStar}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 5-Star Reviews */}
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-yellow-600 mb-2">
//                   {stats.fiveStar}
//                 </div>
//                 <div className="text-gray-600 font-medium">5-Star Reviews</div>
//               </div>
//               <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
//                 <FontAwesomeIcon
//                   icon={faStar}
//                   className="text-white text-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8 animate-scale-in">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search Input */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Search Reviews
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by patient, comment, or doctor..."
//                   className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//                 />

//               </div>
//             </div>

//             {/* Rating Filter */}
//             <div>
//               <label className="block text-sm font-semibold text-[#2a5298] mb-2">
//                 Rating
//               </label>
//               <select
//                 value={selectedRating}
//                 onChange={(e) => setSelectedRating(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
//               >
//                 {ratings.map(rating => (
//                   <option key={rating} value={rating}>
//                     {rating === "all" ? "All Ratings" : `${rating} Stars`}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Doctor Filter */}

//           </div>

//           {/* Filter Actions */}
//           <div className="flex justify-between items-center mt-4">
//             <div className="text-sm text-gray-600">
//               Showing {filteredReviews.length} of {reviews.length} reviews
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

//         {/* Reviews Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//           {currentReviews.map((review, index) => (
//             <div
//               key={review.id}
//               className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               {/* Review Header */}
//               <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
//                 {/* <div className="flex items-center justify-between mb-3">
//                   {review.verified && (
//                     <span className="px-2 py-1 bg-green-500 rounded-full text-xs font-semibold">
//                       Verified
//                     </span>
//                   )}
//                 </div> */}

//                 {/* Rating */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex space-x-1">
//                     {renderStars(review.rating)}
//                   </div>
//                   <span className={`text-lg font-bold ${getRatingColor(review.rating)}`}>
//                     {review.rating}.0
//                   </span>
//                 </div>
//               </div>

//               {/* Review Content */}
//               <div className="p-3">
//                 {/* Patient Info */}
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
//                     <FontAwesomeIcon icon={faUser} className="text-purple-600" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="font-semibold text-gray-900">{review.patientName}</div>
//                     <div className="text-sm text-gray-600">{review.patientEmail}</div>
//                   </div>
//                 </div>

//                 {/* Doctor and Service */}
//                 {/* <div className="space-y-2 mb-4">
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faUserMd} className="text-[#2a5298] mr-3 w-4" />
//                       <span className="font-medium">{review.doctor}</span>
//                     </div>
//                     <div className="flex items-center text-gray-700">
//                       <FontAwesomeIcon icon={faStethoscope} className="text-[#2a5298] mr-3 w-4" />
//                       <span>{review.service}</span>
//                     </div>
//                   </div> */}

//                 {/* Comment */}
//                 <div className="mb-2">
//                   <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
//                     "{review.comment}"
//                   </p>
//                 </div>

//                 {/* Review Meta */}
//                 <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center">
//                       <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
//                       <span>
//                         {new Date(review.date).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                         })}
//                       </span>
//                     </div>
//                     {/* <div className="flex items-center">
//                       <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
//                       <span>{review.helpful} helpful</span>
//                     </div> */}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-2 pt-2 border-t border-gray-200">


//                   <button
//                     onClick={() => setDeleteConfirm(review.id)}
//                     className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-500"
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredReviews.length === 0 && (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
//             <div className="text-6xl mb-6 text-[#2a5298]">💬</div>
//             <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
//               No Reviews Found
//             </h3>
//             <p className="text-gray-600 mb-8 max-w-md mx-auto">
//               {searchTerm || selectedRating !== "all" || selectedDoctor !== "all"
//                 ? "Try adjusting your search filters to find more reviews."
//                 : "No reviews have been submitted yet."
//               }
//             </p>
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
//                 className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${pageNum === currentPage
//                     ? "bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white shadow-lg border border-[#2a5298]"
//                     : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2a5298] hover:bg-gray-50"
//                   } ${pageNum === "..."
//                     ? "cursor-default hover:bg-white hover:border-gray-300 hover-lift-none"
//                     : ""
//                   }`}
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

//       {/* Delete Confirmation */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
//           <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto animate-scale-in">
//             <h3 className="text-xl font-bold text-[#2a5298] mb-4">
//               Confirm Deletion
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this review? This action cannot be undone.
//             </p>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirm)}
//                 className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 border border-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Review Modal */}

//     </div>
//   );
// };

// // View Review Modal Component
// const ViewReviewModal = ({ review, onClose, onDelete }) => {
//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <FontAwesomeIcon
//         key={index}
//         icon={faStar}
//         className={index < rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
//       />
//     ));
//   };


// };

// export default Reviews;

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTrash,
  faUser,
  faCalendarAlt,
  faSearch,
  faFilter,
  faThumbsUp,
  faComment,
  faEye,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faUserMd,
  faStethoscope,
  faSpinner,
  faExclamationTriangle,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewReview, setViewReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reviewsPerPage = 6;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Show alert function
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // API call to fetch all feedback
  const fetchReviews = async () => {
    setLoading(true);
    setError("");

    const token = sessionStorage.getItem("admin_token");
    try {
      const response = await axios.get(`${backendUrl}/feedback/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const result = await response.json();

      console.log("Fetched Reviews:", response.data.data);

      if (response.data.status) {
        // Transform API data to match our component structure
        // console.log("API Response inner Data:", response.data.data);
        const transformedReviews = response.data.data.map(feedback => ({
          id: feedback?.id,
          patientName: feedback?.full_name || "Anonymous",
          patientEmail: feedback?.email || "No email provided",
          rating: parseInt(feedback?.rating) || 0,
          comment: feedback?.message || "No comment provided",
          date: feedback?.created_at ? feedback?.created_at.split(' ')[0] : new Date().toISOString().split('T')[0],
          status: feedback?.status === "1" ? "approved" : "pending",
          doctor: "General", // Default value since not in API
          service: "Mental Health Services", // Default value
          helpful: Math.floor(Math.random() * 50), // Random helpful count
          verified: feedback?.status === "1",
          // originalData: feedback // Keep original API data
        }));
        setReviews(transformedReviews);
      } else {
        throw new Error(response.data.message || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError(error.message || 'Failed to load reviews. Please try again later.');
      showAlert("error", "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Get unique ratings and statuses
  const ratings = ["all", "5", "4", "3", "2", "1"];
  const statuses = ["all", "approved", "pending"];

  // Filter reviews based on search, rating, and status
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating;
    const matchesStatus = selectedStatus === "all" || review.status === selectedStatus;

    return matchesSearch && matchesRating && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
    showAlert("success", "Review deleted successfully!");
    setDeleteConfirm(null);

    // Adjust current page if needed after deletion
    if (currentReviews.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Refresh reviews
  const handleRefresh = () => {
    fetchReviews();
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
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
    setSelectedRating("all");
    setSelectedStatus("all");
    setCurrentPage(1);
  };

  // Calculate statistics
  const stats = {
    total: reviews.length,
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0",
    fiveStar: reviews.filter(r => r.rating === 5).length,
    approved: reviews.filter(r => r.status === "approved").length,
    pending: reviews.filter(r => r.status === "pending").length,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <style>{animationStyles}</style>

      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`px-6 py-4 rounded-xl shadow-lg border ${alert.type === 'success'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-red-100 text-red-800 border-red-300'
            }`}>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={alert.type === 'success' ? faCheck : faExclamationTriangle}
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
              Review Management
            </h1>
            <p className="text-gray-600 text-lg">
              View and manage patient reviews and feedback
            </p>
          </div>

          {/* Refresh Button */}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-[#2a5298] animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-[#2a5298] mb-2">Loading Reviews</h3>
              <p className="text-gray-600">Please wait while we fetch your reviews...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-red-600 mb-2">Unable to Load Reviews</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Total Reviews */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[#2a5298] mb-2">
                      {stats.total}
                    </div>
                    <div className="text-gray-600 font-medium">Total Reviews</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Average Rating */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {stats.averageRating}
                    </div>
                    <div className="text-gray-600 font-medium">Avg Rating</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Approved Reviews */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {stats.approved}
                    </div>
                    <div className="text-gray-600 font-medium">Approved</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-white text-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Pending Reviews */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {stats.pending}
                    </div>
                    <div className="text-gray-600 font-medium">Pending</div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faStar}
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
                    Search Reviews
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by patient, comment, or doctor..."
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                    Rating
                  </label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>
                        {rating === "all" ? "All Ratings" : `${rating} Stars`}
                      </option>
                    ))}
                  </select>
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
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Showing {filteredReviews.length} of {reviews.length} reviews
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

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {currentReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Review Header */}
                  <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      {review.verified && (
                        <span className="px-2 py-1 bg-green-500 rounded-full text-xs font-semibold">
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className={`text-lg font-bold ${getRatingColor(review.rating)}`}>
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="p-3">
                    {/* Patient Info */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{review.patientName}</div>
                        <div className="text-sm text-gray-600">{review.patientEmail}</div>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-2">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* Review Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                          <span>
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                          <span>{review.helpful} helpful</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => setViewReview(review)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-500"
                      >
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(review.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-500"
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
            {filteredReviews.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
                <div className="text-6xl mb-6 text-[#2a5298]">💬</div>
                <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
                  No Reviews Found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm || selectedRating !== "all" || selectedStatus !== "all"
                    ? "Try adjusting your search filters to find more reviews."
                    : "No reviews have been submitted yet."
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
              Are you sure you want to delete this review? This action cannot be undone.
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

      {/* View Review Modal */}
      {viewReview && (
        <ViewReviewModal
          review={viewReview}
          onClose={() => setViewReview(null)}
          onDelete={setDeleteConfirm}
        />
      )}
    </div>
  );
};

// View Review Modal Component
const ViewReviewModal = ({ review, onClose, onDelete }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Review Details</h2>
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
          {/* Rating and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {review.rating}.0
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(review.status)}`}>
                {review.status}
              </span>
              {review.verified && (
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
              Patient Information
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-purple-600 text-xl" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-lg">{review.patientName}</div>
                <div className="text-gray-600">{review.patientEmail}</div>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2a5298] border-b pb-2">
              Review Content
            </h3>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Service Details</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faUserMd} className="mr-3 w-4 text-[#2a5298]" />
                  <span>{review.doctor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faStethoscope} className="mr-3 w-4 text-[#2a5298]" />
                  <span>{review.service}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Review Meta</h4>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 w-4 text-[#2a5298]" />
                  <span>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-3 w-4 text-[#2a5298]" />
                  <span>{review.helpful} people found this helpful</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onDelete(review.id);
                onClose();
              }}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 border border-red-500"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete Review
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

export default Reviews;