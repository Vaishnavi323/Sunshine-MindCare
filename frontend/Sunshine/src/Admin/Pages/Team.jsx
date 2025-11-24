import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faUser,
  faSearch,
  faFilter,
  faEye,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faStethoscope,
  faGraduationCap,
  faAward,
  faCalendarAlt,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faStar,
  faUserMd,
  faUserTie,
  faUserGraduate,
  faUsers,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Team = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      email: "priya.sharma@sunshine.com",
      phone: "+91 9876543210",
      specialization: "Psychiatry",
      category: "founder",
      experience: "15 years",
      qualification: "MD Psychiatry, MBBS",
      description: "Founder and chief psychiatrist with extensive experience in mental health treatment and research.",
      address: "Sunshine Mindcare, Nashik",
      joiningDate: "2018-05-15",
      status: "active",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
      rating: 4.9,
      patients: 1200
    },
    // ... rest of your mock data remains the same
  ]);

  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [loading, setLoading] = useState(false);
  const doctorsPerPage = 6;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Show alert function
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // API call to add doctor
  const addDoctorToAPI = async (doctorData) => {
    try {
      const payload = {
        full_name: doctorData.name,
        email: doctorData.email,
        phone: doctorData.phone,
        specialization: doctorData.specialization,
        experience: doctorData.experience,
        qualification: doctorData.qualification,
        description: doctorData.description,
        // category is not in the API payload based on your example
      };

      console.log('Submitting doctor:', payload);

      const response = await fetch(`${backendUrl}/doctor/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Error adding doctor:', error);
      throw error;
    }
  };

  // Get unique categories, statuses, and specializations
  const categories = ["all", "founder", "senior", "junior", "other"];
  const statuses = ["all", "active", "inactive"];
  const specializations = ["all", ...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doctor.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || doctor.status === selectedStatus;
    const matchesSpecialization = selectedSpecialization === "all" || doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesCategory && matchesStatus && matchesSpecialization;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    showAlert("success", "Doctor deleted successfully!");
    setDeleteConfirm(null);

    // Adjust current page if needed after deletion
    if (currentDoctors.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    
    try {
      if (editingDoctor) {
        // Update existing doctor (local only for now)
        setDoctors(
          doctors.map((doctor) =>
            doctor.id === editingDoctor.id ? { ...doctor, ...formData } : doctor
          )
        );
        showAlert("success", "Doctor updated successfully!");
      } else {
        // Add new doctor via API
        const apiResult = await addDoctorToAPI(formData);
        
        if (apiResult.status) {
          // Add to local state with data from API response
          const newDoctor = {
            id: doctors.length > 0 ? Math.max(...doctors.map((d) => d.id)) + 1 : 1,
            ...formData,
            joiningDate: new Date().toISOString().split('T')[0],
            rating: 4.0,
            patients: 0,
            // Use data from API response if available
            ...apiResult.data
          };
          setDoctors([...doctors, newDoctor]);
          showAlert("success", "Doctor added successfully via API!");
        } else {
          throw new Error(apiResult.message || 'Failed to add doctor');
        }
      }
      setShowForm(false);
      setEditingDoctor(null);
    } catch (error) {
      console.error('Error submitting doctor:', error);
      showAlert("error", error.message || 'Failed to submit doctor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingDoctor(null);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "founder":
        return "bg-purple-100 text-purple-800 border border-purple-300";
      case "senior":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "junior":
        return "bg-green-100 text-green-800 border border-green-300";
      case "other":
        return "bg-orange-100 text-orange-800 border border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "founder":
        return faAward;
      case "senior":
        return faUserTie;
      case "junior":
        return faUserGraduate;
      case "other":
        return faUsers;
      default:
        return faUserMd;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border border-green-300";
      case "inactive":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
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
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedSpecialization("all");
    setCurrentPage(1);
  };

  // Calculate statistics
  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === "active").length,
    founders: doctors.filter(d => d.category === "founder").length,
    senior: doctors.filter(d => d.category === "senior").length,
    junior: doctors.filter(d => d.category === "junior").length,
    other: doctors.filter(d => d.category === "other").length,
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 p-6">
      <style>{animationStyles}</style>

      {/* Alert */}
      {alert && (
        <div className={`fixed top-4 right-4 z-50 animate-fade-in px-6 py-4 rounded-xl shadow-lg border ${
          alert.type === "success" 
            ? "bg-green-100 text-green-800 border-green-300" 
            : "bg-red-100 text-red-800 border-red-300"
        }`}>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon 
              icon={alert.type === "success" ? faCheck : faExclamationTriangle} 
              className="text-lg" 
            />
            <span className="font-semibold">{alert.message}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-[#2a5298] mb-3 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] bg-clip-text text-transparent">
              Doctors Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage medical professionals and their categories
            </p>
          </div>

          {/* Add Doctor Button */}
          <button
            onClick={() => setShowForm(true)}
            disabled={loading}
            className="group relative bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-3 relative z-10">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FontAwesomeIcon
                  icon={faPlus}
                  className="transition-transform duration-500 group-hover:rotate-180"
                />
              )}
              <span className="text-lg">
                {loading ? "Adding..." : "Add New Doctor"}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#2a5298] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Stats Cards - Rest of your component remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Doctors */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2a5298] mb-2">
                  {stats.total}
                </div>
                <div className="text-gray-600 font-medium">Total Doctors</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUserMd}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Active Doctors */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.active}
                </div>
                <div className="text-gray-600 font-medium">Active</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Senior Doctors */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.senior}
                </div>
                <div className="text-gray-600 font-medium">Senior Doctors</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Junior Doctors */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.junior}
                </div>
                <div className="text-gray-600 font-medium">Junior Doctors</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters - Rest of your component remains the same */}
        {/* ... */}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
          {currentDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift group animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Doctor Header */}
              <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] p-3 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={getCategoryIcon(doctor.category)} />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(doctor.category)}`}>
                      {doctor.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold truncate">{doctor.name}</h3>
                <p className="text-sm opacity-90 truncate">{doctor.specialization}</p>
              </div>

              {/* Doctor Content */}
              <div className="p-3">
                {/* Doctor Image and Basic Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      {doctor.experience} experience
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[#2a5298] mr-3 w-4" />
                    <span className="truncate text-sm">{doctor.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FontAwesomeIcon icon={faPhone} className="text-[#2a5298] mr-3 w-4" />
                    <span className="text-sm">{doctor.phone}</span>
                  </div>
                </div>

                {/* Qualification */}
                <div className="mb-2">
                  <div className="flex items-center text-gray-700 mb-1">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-[#2a5298] mr-3 w-4" />
                    <span className="text-sm font-semibold">Qualification</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{doctor.qualification}</p>
                </div>

                {/* Description */}
                <div className="mb-1">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {doctor.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="flex-1 bg-[#2a5298] text-white py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2a5298]"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(doctor.id)}
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
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
            <div className="text-6xl mb-6 text-[#2a5298]">👨‍⚕️</div>
            <h3 className="text-2xl font-bold text-[#2a5298] mb-4">
              No Doctors Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all" || selectedSpecialization !== "all"
                ? "Try adjusting your search filters to find more doctors."
                : "Get started by adding your first doctor to the system."
              }
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
            >
              Add Your First Doctor
            </button>
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
      </div>

      {/* Doctor Form Modal */}
      {showForm && (
        <DoctorForm
          doctor={editingDoctor}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
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
              Are you sure you want to delete this doctor? This action cannot be undone.
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

      {/* View Doctor Modal */}
      {viewDoctor && (
        <ViewDoctorModal
          doctor={viewDoctor}
          onClose={() => setViewDoctor(null)}
          onEdit={handleEdit}
          onDelete={setDeleteConfirm}
        />
      )}
    </div>
  );
};

// Updated DoctorForm Component with API integration
const DoctorForm = ({ doctor, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    email: doctor?.email || "",
    phone: doctor?.phone || "",
    specialization: doctor?.specialization || "Psychiatry",
    category: doctor?.category || "senior",
    experience: doctor?.experience || "",
    qualification: doctor?.qualification || "",
    description: doctor?.description || "",
    address: doctor?.address || "",
    status: doctor?.status || "active",
    image: doctor?.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
  });

  const [imagePreview, setImagePreview] = useState(doctor?.image || "");
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
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
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
    if (!formData.name.trim()) {
      alert('Please enter doctor name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter doctor email');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter doctor phone');
      return;
    }
    if (!formData.specialization.trim()) {
      alert('Please enter specialization');
      return;
    }
    if (!formData.qualification.trim()) {
      alert('Please enter qualification');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter description');
      return;
    }

    onSubmit(formData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const categories = ["founder", "senior", "junior", "other"];
  const specializations = [
    "Psychiatry",
    "Clinical Psychology",
    "Counseling Psychology",
    "Therapy",
    "Child Psychology",
    "Neuropsychology",
    "Forensic Psychology",
    "Health Psychology"
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {doctor ? "Edit Doctor" : "Add New Doctor"}
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
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#2a5298]">
                Doctor Photo
              </label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Doctor preview"
                    className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-300 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={loading}
                    className="absolute top-0 right-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform -translate-y-1 -translate-x-1 disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#2a5298] transition-all duration-300 group"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-4xl text-gray-400 mb-4 group-hover:text-[#2a5298]"
                  />
                  <p className="text-gray-600 mb-2">
                    Click to upload doctor photo
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
                disabled={loading}
              />

              {!imagePreview && (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={loading}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-300 disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Choose Photo</span>
                </button>
              )}
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter doctor's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Specialization *
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Experience *
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="e.g., 5 years"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                  Qualification *
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  placeholder="e.g., MD Psychiatry, MBBS"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2a5298] mb-2">
                Professional Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={loading}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a5298] focus:border-transparent transition-all duration-300 disabled:opacity-50"
                placeholder="Describe the doctor's expertise, experience, and specializations..."
              />
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
                className="flex-1 bg-gradient-to-r from-[#2a5298] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2a5298] disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span>{doctor ? "Update Doctor" : loading ? "Adding..." : "Add Doctor"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ViewDoctorModal component remains the same as in your original code
// ... (keep the existing ViewDoctorModal component)

export default Team;