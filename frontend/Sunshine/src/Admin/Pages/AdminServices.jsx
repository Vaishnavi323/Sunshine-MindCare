import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faEye,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faStethoscope,
  faUsers,
  faHeart,
  faBrain,
  faChild,
  faUserFriends,
  faCalendarAlt,
  faClock,
  faMoneyBillWave,
  faArrowRight,
  faList,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Psychiatry Services",
      description: "Comprehensive psychiatric evaluation and treatment for various mental health conditions.",
      icon: "faBrain",
      category: "Medical",
      status: "active",
      duration: "45-60 mins",
      price: "₹1,500 - ₹3,000",
      createdDate: "2024-01-15",
      subservices: [
        {
          id: 101,
          name: "Initial Psychiatric Evaluation",
          description: "Comprehensive assessment and diagnosis by a qualified psychiatrist.",
          duration: "60 mins",
          price: "₹3,000",
          status: "active"
        },
        {
          id: 102,
          name: "Medication Management",
          description: "Ongoing medication prescription and monitoring.",
          duration: "30 mins",
          price: "₹1,500",
          status: "active"
        },
        {
          id: 103,
          name: "Follow-up Consultation",
          description: "Regular check-ups and treatment adjustments.",
          duration: "30 mins",
          price: "₹1,500",
          status: "active"
        }
      ]
    },
    {
      id: 2,
      name: "Therapy & Counseling",
      description: "Professional therapy sessions for individuals, couples, and families.",
      icon: "faUsers",
      category: "Therapy",
      status: "active",
      duration: "45-60 mins",
      price: "₹1,200 - ₹2,500",
      createdDate: "2024-01-10",
      subservices: [
        {
          id: 201,
          name: "Individual Therapy",
          description: "One-on-one sessions with a licensed therapist.",
          duration: "60 mins",
          price: "₹2,500",
          status: "active"
        },
        {
          id: 202,
          name: "Couples Counseling",
          description: "Therapy sessions for couples to improve relationships.",
          duration: "60 mins",
          price: "₹3,000",
          status: "active"
        },
        {
          id: 203,
          name: "Family Therapy",
          description: "Sessions involving family members to resolve conflicts.",
          duration: "60 mins",
          price: "₹3,500",
          status: "active"
        },
        {
          id: 204,
          name: "Group Therapy",
          description: "Therapy sessions in a group setting.",
          duration: "90 mins",
          price: "₹1,200",
          status: "inactive"
        }
      ]
    },
    {
      id: 3,
      name: "Child & Adolescent Care",
      description: "Specialized mental health services for children and teenagers.",
      icon: "faChild",
      category: "Pediatric",
      status: "active",
      duration: "45-90 mins",
      price: "₹1,800 - ₹3,500",
      createdDate: "2024-01-08",
      subservices: [
        {
          id: 301,
          name: "Child Psychology Assessment",
          description: "Comprehensive evaluation for children's mental health.",
          duration: "90 mins",
          price: "₹3,500",
          status: "active"
        },
        {
          id: 302,
          name: "Teen Counseling",
          description: "Specialized counseling for adolescent issues.",
          duration: "60 mins",
          price: "₹2,500",
          status: "active"
        },
        {
          id: 303,
          name: "Parent Guidance Sessions",
          description: "Support and guidance for parents.",
          duration: "45 mins",
          price: "₹1,800",
          status: "active"
        }
      ]
    },
    {
      id: 4,
      name: "Crisis Intervention",
      description: "Immediate support and intervention for mental health emergencies.",
      icon: "faHeart",
      category: "Emergency",
      status: "active",
      duration: "30-60 mins",
      price: "₹2,000 - ₹4,000",
      createdDate: "2024-01-12",
      subservices: [
        {
          id: 401,
          name: "Emergency Consultation",
          description: "Immediate psychiatric consultation for crises.",
          duration: "60 mins",
          price: "₹4,000",
          status: "active"
        },
        {
          id: 402,
          name: "Suicide Prevention Support",
          description: "Specialized support for suicide prevention.",
          duration: "60 mins",
          price: "₹3,500",
          status: "active"
        }
      ]
    },
    {
      id: 5,
      name: "Workshops & Programs",
      description: "Educational workshops and mental health awareness programs.",
      icon: "faCalendarAlt",
      category: "Educational",
      status: "inactive",
      duration: "2-4 hours",
      price: "₹500 - ₹2,000",
      createdDate: "2024-01-05",
      subservices: [
        {
          id: 501,
          name: "Stress Management Workshop",
          description: "Learn effective stress management techniques.",
          duration: "3 hours",
          price: "₹1,500",
          status: "inactive"
        },
        {
          id: 502,
          name: "Mindfulness Meditation Session",
          description: "Guided meditation and mindfulness practices.",
          duration: "2 hours",
          price: "₹500",
          status: "inactive"
        }
      ]
    }
  ]);

  const [alert, setAlert] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showSubserviceForm, setShowSubserviceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingSubservice, setEditingSubservice] = useState(null);
  const [parentService, setParentService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewService, setViewService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedServices, setExpandedServices] = useState(new Set());
  const servicesPerPage = 6;

  // Get unique categories and statuses
  const categories = ["all", ...new Set(services.map(service => service.category))];
  const statuses = ["all", "active", "inactive"];

  // Filter services based on search and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || service.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
    setAlert({
      type: "success",
      message: "Service deleted successfully!",
    });
    setDeleteConfirm(null);

    if (currentServices.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteSubservice = (serviceId, subserviceId) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? {
            ...service,
            subservices: service.subservices.filter(sub => sub.id !== subserviceId)
          }
        : service
    ));
    setAlert({
      type: "success",
      message: "Subservice deleted successfully!",
    });
    setDeleteConfirm(null);
  };

  const handleServiceFormSubmit = (formData) => {
    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? { ...service, ...formData } : service
        )
      );
      setAlert({
        type: "success",
        message: "Service updated successfully!",
      });
    } else {
      const newService = {
        id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
        subservices: []
      };
      setServices([...services, newService]);
      setAlert({
        type: "success",
        message: "Service created successfully!",
      });
    }
    setShowServiceForm(false);
    setEditingService(null);
  };

  const handleSubserviceFormSubmit = (formData) => {
    if (editingSubservice) {
      setServices(services.map(service =>
        service.id === parentService.id
          ? {
              ...service,
              subservices: service.subservices.map(sub =>
                sub.id === editingSubservice.id ? { ...sub, ...formData } : sub
              )
            }
          : service
      ));
      setAlert({
        type: "success",
        message: "Subservice updated successfully!",
      });
    } else {
      const newSubservice = {
        id: parentService.subservices.length > 0 
          ? Math.max(...parentService.subservices.map((s) => s.id)) + 1 
          : (parentService.id * 100) + 1,
        ...formData
      };
      setServices(services.map(service =>
        service.id === parentService.id
          ? {
              ...service,
              subservices: [...service.subservices, newSubservice]
            }
          : service
      ));
      setAlert({
        type: "success",
        message: "Subservice added successfully!",
      });
    }
    setShowSubserviceForm(false);
    setEditingSubservice(null);
    setParentService(null);
  };

  const toggleServiceExpansion = (serviceId) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
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

  const getCategoryColor = (category) => {
    const colors = {
      "Medical": "bg-blue-100 text-blue-800",
      "Therapy": "bg-purple-100 text-purple-800",
      "Pediatric": "bg-pink-100 text-pink-800",
      "Emergency": "bg-red-100 text-red-800",
      "Educational": "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getIconComponent = (iconName) => {
    const icons = {
      "faBrain": faBrain,
      "faUsers": faUsers,
      "faChild": faChild,
      "faHeart": faHeart,
      "faCalendarAlt": faCalendarAlt,
      "faStethoscope": faStethoscope
    };
    return icons[iconName] || faStethoscope;
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
    setCurrentPage(1);
  };

  // Calculate statistics
  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === "active").length,
    totalSubservices: services.reduce((acc, service) => acc + service.subservices.length, 0),
    activeSubservices: services.reduce((acc, service) => 
      acc + service.subservices.filter(sub => sub.status === "active").length, 0
    ),
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
    
    .subservice-enter {
      animation: slideInUp 0.4s ease-out;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <style>{animationStyles}</style>
      
      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="px-6 py-4 rounded-xl shadow-lg border bg-green-100 text-green-800 border-green-300">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faPlus} className="text-lg" />
              <span className="font-semibold">{alert.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-[#2d365b] mb-3 bg-gradient-to-r from-[#2d365b] to-[#4f46e5] bg-clip-text text-transparent">
              Services Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage services and their subservices for your mental health practice
            </p>
          </div>

          {/* Add Service Button */}
          <button
            onClick={() => setShowServiceForm(true)}
            className="group relative bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 ease-out overflow-hidden hover-lift"
          >
            <div className="flex items-center space-x-3 relative z-10">
              <FontAwesomeIcon
                icon={faPlus}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
              <span className="text-lg">Add New Service</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#2d365b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Services */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#2d365b] mb-2">
                  {stats.totalServices}
                </div>
                <div className="text-gray-600 font-medium">Total Services</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faStethoscope}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Active Services */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.activeServices}
                </div>
                <div className="text-gray-600 font-medium">Active Services</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Total Subservices */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.totalSubservices}
                </div>
                <div className="text-gray-600 font-medium">Subservices</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  className="text-white text-2xl"
                />
              </div>
            </div>
          </div>

          {/* Active Subservices */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover-lift animate-slide-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stats.activeSubservices}
                </div>
                <div className="text-gray-600 font-medium">Active Subservices</div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faList}
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
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Search Services
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by service name, description, or category..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                />
                {/* <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                /> */}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            {/* <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredServices.length} of {services.length} services
            </div>
            <button
              onClick={handleResetFilters}
              className="text-sm text-[#2d365b] font-semibold hover:text-[#1e2a4a] transition-colors duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-6 mb-8">
          {currentServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift animate-slide-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* Service Header */}
              <div className="bg-gradient-to-r from-[#2d365b] to-[#4f46e5] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={getIconComponent(service.icon)}
                        className="text-white text-2xl"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        {/* <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span> */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                      </div>
                      <p className="text-white/90 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleServiceExpansion(service.id)}
                    className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={expandedServices.has(service.id) ? faXmark : faList}
                      className="text-white"
                    />
                  </button>
                </div>

                {/* Service Meta */}
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <span>{service.price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <span>{service.subservices.length} subservices</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>
                      Created: {new Date(service.createdDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subservices Section */}
              {expandedServices.has(service.id) && (
                <div className="p-6 border-t border-gray-200 subservice-enter">
                  {/* Subservices Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-[#2d365b]">
                      Subservices ({service.subservices.length})
                    </h4>
                    <button
                      onClick={() => {
                        setParentService(service);
                        setEditingSubservice(null);
                        setShowSubserviceForm(true);
                      }}
                      className="bg-[#2d365b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Add Subservice</span>
                    </button>
                  </div>

                  {/* Subservices Grid */}
                  {service.subservices.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {service.subservices.map((subservice) => (
                        <div
                          key={subservice.id}
                          className="bg-gray-50 rounded-xl border border-gray-200 p-4 hover:bg-gray-100 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h5 className="font-semibold text-gray-900">{subservice.name}</h5>
                                {/* <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(subservice.status)}`}>
                                  {subservice.status}
                                </span> */}
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{subservice.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faClock} className="w-3" />
                                <span>{subservice.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="w-3" />
                                <span>{subservice.price}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setParentService(service);
                                  setEditingSubservice(subservice);
                                  setShowSubserviceForm(true);
                                }}
                                className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
                              >
                                <FontAwesomeIcon icon={faEdit} className="text-xs" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'subservice', serviceId: service.id, id: subservice.id })}
                                className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all duration-300"
                              >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                      <FontAwesomeIcon icon={faList} className="text-4xl text-gray-400 mb-3" />
                      <p className="text-gray-600">No subservices added yet</p>
                      <button
                        onClick={() => {
                          setParentService(service);
                          setEditingSubservice(null);
                          setShowSubserviceForm(true);
                        }}
                        className="mt-3 text-[#2d365b] font-semibold hover:text-[#1e2a4a] transition-colors duration-300 flex items-center space-x-2 mx-auto"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add your first subservice</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Service Action Buttons */}
              <div className="flex space-x-3 p-6 border-t border-gray-200">
                {/* <button
                  onClick={() => setViewService(service)}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-500"
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span>View Details</span>
                </button> */}
                <button
                  onClick={() => {
                    setEditingService(service);
                    setShowServiceForm(true);
                  }}
                  className="flex-1 bg-[#2d365b] text-white py-3 rounded-xl font-semibold hover:bg-[#1e2a4a] transition-all duration-300 flex items-center justify-center space-x-2 border border-[#2d365b]"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  <span>Edit Service</span>
                </button>
                <button
                  onClick={() => setDeleteConfirm({ type: 'service', id: service.id })}
                  className="flex-1 bg-white text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-red-300"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200 animate-scale-in">
            <div className="text-6xl mb-6 text-[#2d365b]">🩺</div>
            <h3 className="text-2xl font-bold text-[#2d365b] mb-4">
              No Services Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                ? "Try adjusting your search filters to find more services."
                : "Get started by creating your first service for your mental health practice."
              }
            </p>
            <button
              onClick={() => setShowServiceForm(true)}
              className="bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
            >
              Create Your First Service
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
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300 hover-lift"
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
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 hover-lift ${
                  pageNum === currentPage
                    ? "bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white shadow-lg border border-[#2d365b]"
                    : "bg-white text-gray-700 shadow-lg border border-gray-300 hover:border-[#2d365b] hover:bg-gray-50"
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
              className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-[#2d365b] transition-all duration-300 hover-lift"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#2d365b]"
              />
            </button>
          </div>
        )}
      </div>

      {/* Service Form Modal */}
      {showServiceForm && (
        <ServiceForm
          service={editingService}
          onSubmit={handleServiceFormSubmit}
          onCancel={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
        />
      )}

      {/* Subservice Form Modal */}
      {showSubserviceForm && (
        <SubserviceForm
          subservice={editingSubservice}
          parentService={parentService}
          onSubmit={handleSubserviceFormSubmit}
          onCancel={() => {
            setShowSubserviceForm(false);
            setEditingSubservice(null);
            setParentService(null);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 p-6 max-w-md w-full mx-auto animate-scale-in">
            <h3 className="text-xl font-bold text-[#2d365b] mb-4">
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
                  if (deleteConfirm.type === 'service') {
                    handleDeleteService(deleteConfirm.id);
                  } else {
                    handleDeleteSubservice(deleteConfirm.serviceId, deleteConfirm.id);
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

      {/* View Service Modal */}
      {viewService && (
        <ViewServiceModal
          service={viewService}
          onClose={() => setViewService(null)}
          onEdit={(service) => {
            setEditingService(service);
            setShowServiceForm(true);
            setViewService(null);
          }}
          onDelete={setDeleteConfirm}
        />
      )}
    </div>
  );
};

// Service Form Component
const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    icon: service?.icon || "faStethoscope",
    category: service?.category || "Medical",
    status: service?.status || "active",
    duration: service?.duration || "",
    price: service?.price || "",
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
    if (!formData.name.trim()) {
      alert('Please enter service name');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter service description');
      return;
    }
    if (!formData.duration.trim()) {
      alert('Please enter service duration');
      return;
    }
    if (!formData.price.trim()) {
      alert('Please enter service price');
      return;
    }

    onSubmit(formData);
  };

  const categories = ["Medical", "Therapy", "Pediatric", "Emergency", "Educational"];
  const icons = [
    { value: "faStethoscope", label: "Stethoscope", icon: faStethoscope },
    { value: "faBrain", label: "Brain", icon: faBrain },
    { value: "faHeart", label: "Heart", icon: faHeart },
    { value: "faUsers", label: "Users", icon: faUsers },
    { value: "faChild", label: "Child", icon: faChild },
    { value: "faCalendarAlt", label: "Calendar", icon: faCalendarAlt },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {service ? "Edit Service" : "Create New Service"}
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
            {/* Service Name */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Service Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                placeholder="Enter service name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                placeholder="Describe the service and its benefits..."
              />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div> */}
            </div>

            {/* Duration and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 45-60 mins"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Price Range *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                  placeholder="e.g., ₹1,500 - ₹3,000"
                />
              </div>
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Service Icon *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {icons.map((iconObj) => (
                  <label
                    key={iconObj.value}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.icon === iconObj.value
                        ? "border-[#2d365b] bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="icon"
                      value={iconObj.value}
                      checked={formData.icon === iconObj.value}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <FontAwesomeIcon icon={iconObj.icon} className="text-[#2d365b] text-lg" />
                    <span className="font-medium text-gray-700">{iconObj.label}</span>
                  </label>
                ))}
              </div>
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
                className="flex-1 bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2d365b]"
              >
                {service ? "Update Service" : "Create Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Subservice Form Component
const SubserviceForm = ({ subservice, parentService, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: subservice?.name || "",
    description: subservice?.description || "",
    duration: subservice?.duration || "",
    price: subservice?.price || "",
    status: subservice?.status || "active",
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
    if (!formData.name.trim()) {
      alert('Please enter subservice name');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter subservice description');
      return;
    }
    if (!formData.duration.trim()) {
      alert('Please enter subservice duration');
      return;
    }
    if (!formData.price.trim()) {
      alert('Please enter subservice price');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {subservice ? "Edit Subservice" : "Add New Subservice"}
              </h2>
              <p className="text-white/90 mt-1">
                For: {parentService?.name}
              </p>
            </div>
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
            {/* Subservice Name */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Subservice Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                placeholder="Enter subservice name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                placeholder="Describe this specific subservice..."
              />
            </div>

            {/* Duration and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 60 mins"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
                  placeholder="e.g., ₹2,500"
                />
              </div>
            </div>

            {/* Status */}
            {/* <div>
              <label className="block text-sm font-semibold text-[#2d365b] mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2d365b] focus:border-transparent transition-all duration-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div> */}

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
                className="flex-1 bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-[#2d365b]"
              >
                {subservice ? "Update Subservice" : "Add Subservice"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// View Service Modal Component
const ViewServiceModal = ({ service, onClose, onEdit, onDelete }) => {
  const getIconComponent = (iconName) => {
    const icons = {
      "faBrain": faBrain,
      "faUsers": faUsers,
      "faChild": faChild,
      "faHeart": faHeart,
      "faCalendarAlt": faCalendarAlt,
      "faStethoscope": faStethoscope
    };
    return icons[iconName] || faStethoscope;
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "active":
  //       return "bg-green-100 text-green-800 border border-green-300";
  //     case "inactive":
  //       return "bg-red-100 text-red-800 border border-red-300";
  //     default:
  //       return "bg-gray-100 text-gray-800 border border-gray-300";
  //   }
  // };

  const getCategoryColor = (category) => {
    const colors = {
      "Medical": "bg-blue-100 text-blue-800",
      "Therapy": "bg-purple-100 text-purple-800",
      "Pediatric": "bg-pink-100 text-pink-800",
      "Emergency": "bg-red-100 text-red-800",
      "Educational": "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // return (
  //   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-fade-in">
  //     <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-300 overflow-hidden animate-scale-in">
  //       {/* Header */}
  //       <div className="bg-gradient-to-r from-[#2d365b] to-[#4f46e5] text-white p-6">
  //         <div className="flex items-center justify-between">
  //           <h2 className="text-2xl font-bold">Service Details</h2>
  //           <button
  //             onClick={onClose}
  //             className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
  //           >
  //             <FontAwesomeIcon icon={faXmark} />
  //           </button>
  //         </div>
  //       </div>

  //       {/* Content */}
  //       <div className="p-6 space-y-6">
  //         {/* Service Header */}
  //         <div className="flex items-center space-x-4">
  //           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
  //             <FontAwesomeIcon
  //               icon={getIconComponent(service.icon)}
  //               className="text-white text-2xl"
  //             />
  //           </div>
  //           <div className="flex-1">
  //             <div className="flex items-center space-x-3 mb-2">
  //               <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
  //               <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(service.status)}`}>
  //                 {service.status}
  //               </span>
  //               <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(service.category)}`}>
  //                 {service.category}
  //               </span>
  //             </div>
  //             <p className="text-gray-600">{service.description}</p>
  //           </div>
  //         </div>

  //         {/* Service Details */}
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold text-[#2d365b] border-b pb-2">
  //               Service Information
  //             </h3>
  //             <div className="space-y-3">
  //               <div className="flex items-center justify-between">
  //                 <span className="text-gray-600">Duration:</span>
  //                 <span className="font-semibold">{service.duration}</span>
  //               </div>
  //               <div className="flex items-center justify-between">
  //                 <span className="text-gray-600">Price Range:</span>
  //                 <span className="font-semibold">{service.price}</span>
  //               </div>
  //               <div className="flex items-center justify-between">
  //                 <span className="text-gray-600">Created Date:</span>
  //                 <span className="font-semibold">
  //                   {new Date(service.createdDate).toLocaleDateString("en-US", {
  //                     month: "long",
  //                     day: "numeric",
  //                     year: "numeric",
  //                   })}
  //                 </span>
  //               </div>
  //               <div className="flex items-center justify-between">
  //                 <span className="text-gray-600">Total Subservices:</span>
  //                 <span className="font-semibold">{service.subservices.length}</span>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold text-[#2d365b] border-b pb-2">
  //               Subservices Overview
  //             </h3>
  //             <div className="space-y-2">
  //               <div className="flex items-center justify-between text-sm">
  //                 <span className="text-gray-600">Active Subservices:</span>
  //                 <span className="font-semibold text-green-600">
  //                   {service.subservices.filter(sub => sub.status === 'active').length}
  //                 </span>
  //               </div>
  //               <div className="flex items-center justify-between text-sm">
  //                 <span className="text-gray-600">Inactive Subservices:</span>
  //                 <span className="font-semibold text-red-600">
  //                   {service.subservices.filter(sub => sub.status === 'inactive').length}
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Subservices List */}
  //         <div className="space-y-4">
  //           <h3 className="text-lg font-semibold text-[#2d365b] border-b pb-2">
  //             Subservices ({service.subservices.length})
  //           </h3>
  //           <div className="space-y-3 max-h-60 overflow-y-auto">
  //             {service.subservices.map((subservice) => (
  //               <div
  //                 key={subservice.id}
  //                 className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
  //               >
  //                 <div className="flex-1">
  //                   <div className="flex items-center space-x-2 mb-1">
  //                     <h4 className="font-semibold text-gray-900">{subservice.name}</h4>
  //                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(subservice.status)}`}>
  //                       {subservice.status}
  //                     </span>
  //                   </div>
  //                   <p className="text-gray-600 text-sm mb-2">{subservice.description}</p>
  //                   <div className="flex items-center space-x-4 text-sm text-gray-500">
  //                     <span className="flex items-center space-x-1">
  //                       <FontAwesomeIcon icon={faClock} className="w-3" />
  //                       <span>{subservice.duration}</span>
  //                     </span>
  //                     <span className="flex items-center space-x-1">
  //                       <FontAwesomeIcon icon={faMoneyBillWave} className="w-3" />
  //                       <span>{subservice.price}</span>
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Action Buttons */}
  //         <div className="flex space-x-4 pt-4 border-t border-gray-200">
  //           <button
  //             onClick={() => {
  //               onEdit(service);
  //             }}
  //             className="flex-1 bg-[#2d365b] text-white py-3 rounded-xl font-semibold hover:bg-[#1e2a4a] transition-all duration-300 border border-[#2d365b]"
  //           >
  //             <FontAwesomeIcon icon={faEdit} className="mr-2" />
  //             Edit Service
  //           </button>
  //           <button
  //             onClick={() => {
  //               onDelete({ type: 'service', id: service.id });
  //               onClose();
  //             }}
  //             className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 border border-red-500"
  //           >
  //             <FontAwesomeIcon icon={faTrash} className="mr-2" />
  //             Delete Service
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Services;