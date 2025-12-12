import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';

const Services = () => {
  const [services, setServices] = useState([]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showSubserviceForm, setShowSubserviceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingSubservice, setEditingSubservice] = useState(null);
  const [parentService, setParentService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedServices, setExpandedServices] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { token } = useAuth();  

  // API Base URL from environment variable
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
    fetchSubservices();
  }, []);

  // API function to fetch services
  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/service/list?id=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status) {
        // Transform API response to match your component structure
        const transformedServices = transformServicesData(result);
        setServices(transformedServices);
      } else {
        throw new Error(result.message || 'Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setAlert({
        type: "error",
        message: error.message || "Failed to fetch services. Please try again.",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  // API function to fetch all subservices
  const fetchSubservices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subservice/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status && result.error) {
        // Map subservices to their respective services
        mapSubservicesToServices(result.error);
      }
    } catch (error) {
      console.error('Error fetching subservices:', error);
      // Don't show alert for subservices as it's secondary data
    }
  };

  // Map subservices to their respective services
  const mapSubservicesToServices = (subservices) => {
    setServices(prevServices => 
      prevServices.map(service => ({
        ...service,
        subservices: subservices
          .filter(sub => sub.service_id === service.id.toString())
          .map(sub => ({
            id: sub.id,
            name: sub.title,
            description: sub.description,
            duration: sub.duration || "60 mins",
            price: sub.price ? `₹${sub.price}` : "₹2,500",
            status: sub.status === "1" ? "active" : "inactive"
          }))
      }))
    );
  };

  // Transform API response to match your component structure
  const transformServicesData = (apiResponse) => {
    const serviceData = apiResponse.error;
    
    return [{
      id: serviceData.id,
      name: serviceData.title,
      description: serviceData.description,
      image: serviceData.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      category: "Medical", // Default category since API doesn't provide
      status: "active",
      duration: "45-60 mins", // Default duration
      createdDate: serviceData.created_at ? serviceData.created_at.split(' ')[0] : "2024-01-15",
      subservices: serviceData.sub_services ? serviceData.sub_services.map((sub, index) => ({
        id: sub.id || index + 1,
        name: sub.title || `Subservice ${index + 1}`,
        description: sub.description || "No description available",
        duration: sub.duration || "60 mins",
        price: sub.price ? `₹${sub.price}` : "₹2,500",
        status: "active"
      })) : []
    }];
  };

  // API function to add service
const addServiceAPI = async (serviceData) => {
  try {
    const formData = new FormData();
    formData.append("title", serviceData.name);
    formData.append("description", serviceData.description);

    if (serviceData.imageFile) {
      formData.append("image", serviceData.imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/service/add`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
        // ❌ Do NOT add Content-Type → browser automatically sets multipart/form-data
      },
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};


  // API function to update service
  const updateServiceAPI = async (serviceId, serviceData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/service/update/${serviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: serviceData.name,
          description: serviceData.description,
          image: serviceData.image || "default.jpg"
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  // API function to delete service
  const deleteServiceAPI = async (serviceId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/service/delete/${serviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  // API function to add subservice
  const addSubserviceAPI = async (subserviceData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subservice/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          servicetitle: subserviceData.name,
          description: subserviceData.description,
          service_id: parentService.id,
          duration: subserviceData.duration,
          price: subserviceData.price ? subserviceData.price.replace('₹', '') : null
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding subservice:', error);
      throw error;
    }
  };

  // API function to update subservice
  const updateSubserviceAPI = async (subserviceId, subserviceData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subservice/update/${subserviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          servicetitle: subserviceData.name,
          description: subserviceData.description,
          duration: subserviceData.duration,
          price: subserviceData.price ? subserviceData.price.replace('₹', '') : null
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating subservice:', error);
      throw error;
    }
  };

  // API function to delete subservice
  const deleteSubserviceAPI = async (subserviceId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/subservice/delete/${subserviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting subservice:', error);
      throw error;
    }
  };

  // Auto-hide alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const toggleExpansion = (id) => {
    const newSet = new Set(expandedServices);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setExpandedServices(newSet);
  };

  const handleDeleteService = async (id) => {
    try {
      setLoading(true);
      const response = await deleteServiceAPI(id);
      
      if (response.status) {
        setServices(services.filter(s => s.id !== id));
        setDeleteConfirm(null);
        setAlert({
          type: "success",
          message: "Service deleted successfully!",
        });
      } else {
        throw new Error(response.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      setAlert({
        type: "error",
        message: error.message || "Failed to delete service. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubservice = async (serviceId, subId) => {
    try {
      setLoading(true);
      const response = await deleteSubserviceAPI(subId);
      
      if (response.status) {
        setServices(services.map(s => s.id === serviceId ? { ...s, subservices: s.subservices.filter(sub => sub.id !== subId) } : s));
        setDeleteConfirm(null);
        setAlert({
          type: "success",
          message: "Subservice deleted successfully!",
        });
      } else {
        throw new Error(response.message || 'Failed to delete subservice');
      }
    } catch (error) {
      console.error('Error deleting subservice:', error);
      setAlert({
        type: "error",
        message: error.message || "Failed to delete subservice. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (data) => {
    setLoading(true);
    
    try {
      if (editingService) {
        // Update existing service
        const response = await updateServiceAPI(editingService.id, data);
        
        if (response.status) {
          // Update local state
          setServices(services.map(s => s.id === editingService.id ? { ...s, ...data } : s));
          setAlert({
            type: "success",
            message: "Service updated successfully!",
          });
        } else {
          throw new Error(response.message || 'Failed to update service');
        }
      } else {
        // Create new service
        const response = await addServiceAPI(data);
        
        if (response.status) {
          // Refresh services list after successful addition
          await fetchServices();
          setAlert({
            type: "success",
            message: "Service created successfully!",
          });
        } else {
          throw new Error(response.message || 'Failed to create service');
        }
      }
    } catch (error) {
      console.error('Error submitting service:', error);
      setAlert({
        type: "error",
        message: error.message || `Failed to ${editingService ? 'update' : 'create'} service. Please try again.`,
      });
      return; // Don't close the form if there's an error
    } finally {
      setLoading(false);
    }

    setShowServiceForm(false);
    setEditingService(null);
  };

  const handleSubserviceSubmit = async (data) => {
    setLoading(true);
    
    try {
      if (editingSubservice) {
        // Update existing subservice
        const response = await updateSubserviceAPI(editingSubservice.id, data);
        
        if (response.status) {
          // Update local state
          setServices(services.map(s => s.id === parentService.id ? { 
            ...s, 
            subservices: s.subservices.map(sub => sub.id === editingSubservice.id ? { ...sub, ...data } : sub) 
          } : s));
          setAlert({
            type: "success",
            message: "Subservice updated successfully!",
          });
        } else {
          throw new Error(response.message || 'Failed to update subservice');
        }
      } else {
        // Create new subservice
        const response = await addSubserviceAPI(data);
        
        if (response.status) {
          // Refresh subservices list after successful addition
          await fetchSubservices();
          setAlert({
            type: "success",
            message: "Subservice created successfully!",
          });
        } else {
          throw new Error(response.message || 'Failed to create subservice');
        }
      }
    } catch (error) {
      console.error('Error submitting subservice:', error);
      setAlert({
        type: "error",
        message: error.message || `Failed to ${editingSubservice ? 'update' : 'create'} subservice. Please try again.`,
      });
      return; // Don't close the form if there's an error
    } finally {
      setLoading(false);
    }

    setShowSubserviceForm(false);
    setEditingSubservice(null);
    setParentService(null);
  };

  const getCatColor = (cat) => {
    const c = { Medical: "bg-blue-100 text-blue-800", Therapy: "bg-purple-100 text-purple-800", Pediatric: "bg-pink-100 text-pink-800", Emergency: "bg-red-100 text-red-800", Educational: "bg-orange-100 text-orange-800" };
    return c[cat] || "bg-gray-100 text-gray-800";
  };

  const categories = ["all", ...new Set(services.map(s => s.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f1f35] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`px-6 py-4 rounded-xl shadow-lg border ${
            alert.type === 'success' 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-red-100 text-red-800 border-red-300'
          }`}>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">{alert.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Services Management</h1>
            <p className="text-gray-600">Manage services and subservices</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                fetchServices();
                fetchSubservices();
              }}
              disabled={loading}
              className="bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
            >
              🔄 Refresh
            </button>
            <button 
              onClick={() => setShowServiceForm(true)} 
              disabled={loading}
              className="bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <span className="text-xl">+</span>
              )}
              {loading ? "Processing..." : "Add Service"}
            </button>
          </div>
        </div>

        {/* Rest of your JSX remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-md border flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1f1f35] to-[#174593] rounded-xl flex items-center justify-center text-white text-xl">📋</div>
            <div><h3 className="text-2xl font-bold text-gray-900">{services.length}</h3><p className="text-gray-500 text-sm">Total Services</p></div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md border flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">✓</div>
            <div><h3 className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === "active").length}</h3><p className="text-gray-500 text-sm">Active</p></div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md border flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">≡</div>
            <div><h3 className="text-2xl font-bold text-gray-900">{services.reduce((a, s) => a + s.subservices.length, 0)}</h3><p className="text-gray-500 text-sm">Subservices</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border p-4 mb-6 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search services..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#174593]" 
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#174593]"
          >
            {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
        </div>

        <div className="space-y-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-56 h-44 md:h-auto bg-gray-200">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCatColor(service.category)}`}>
                          {service.category}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                    <button onClick={() => toggleExpansion(service.id)} className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                      <span className={`transition-transform ${expandedServices.has(service.id) ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>⏱ {service.duration}</span>
                    <span>📋 {service.subservices.length} subservices</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingService(service); setShowServiceForm(true); }} 
                      className="px-4 py-2 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg text-sm font-semibold hover:shadow-md"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setDeleteConfirm({ type: 'service', id: service.id, name: service.name })} 
                      className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg text-sm font-semibold hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {expandedServices.has(service.id) && (
                <div className="p-5 border-t bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Subservices ({service.subservices.length})</h4>
                    <button 
                      onClick={() => { setParentService(service); setEditingSubservice(null); setShowSubserviceForm(true); }} 
                      className="px-3 py-2 bg-[#1f1f35] text-white rounded-lg text-sm font-semibold hover:bg-[#174593]"
                    >
                      + Add
                    </button>
                  </div>
                  {service.subservices.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {service.subservices.map((sub) => (
                        <div key={sub.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{sub.name}</h5>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => { setParentService(service); setEditingSubservice(sub); setShowSubserviceForm(true); }} 
                                className="w-7 h-7 bg-blue-500 text-white rounded flex items-center justify-center text-xs hover:bg-blue-600"
                              >
                                ✎
                              </button>
                              <button 
                                onClick={() => setDeleteConfirm({ type: 'subservice', serviceId: service.id, id: sub.id, name: sub.name })} 
                                className="w-7 h-7 bg-red-500 text-white rounded flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{sub.description}</p>
                          <div className="flex gap-3 text-xs text-gray-500">
                            <span>{sub.duration}</span>
                            {sub.price && <span>{sub.price}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-gray-500">No subservices yet</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border">
            <p className="text-5xl mb-4">🩺</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Services Found</h3>
            <button 
              onClick={() => setShowServiceForm(true)} 
              className="mt-4 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold"
            >
              Add Service
            </button>
          </div>
        )}
      </div>

      {/* Service Form */}
      {showServiceForm && (
        <ServiceForm 
          service={editingService} 
          onSubmit={handleServiceSubmit} 
          onCancel={() => { setShowServiceForm(false); setEditingService(null); }} 
          loading={loading}
        />
      )}
      
      {/* Subservice Form */}
      {showSubserviceForm && (
        <SubserviceForm 
          subservice={editingSubservice} 
          parentService={parentService} 
          onSubmit={handleSubserviceSubmit} 
          onCancel={() => { setShowSubserviceForm(false); setEditingSubservice(null); setParentService(null); }} 
          loading={loading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {deleteConfirm.type} "{deleteConfirm.name}"?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirm(null)} 
                disabled={loading}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => deleteConfirm.type === 'service' 
                  ? handleDeleteService(deleteConfirm.id) 
                  : handleDeleteSubservice(deleteConfirm.serviceId, deleteConfirm.id)
                } 
                disabled={loading}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ServiceForm and SubserviceForm components remain exactly the same as in your original code
// [Include the exact same ServiceForm and SubserviceForm components from your previous code]

const ServiceForm = ({ service, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    description: service?.description || "",
    image: service?.image || "",
    category: service?.category || "Medical",
    status: service?.status || "active",
    duration: service?.duration || "",
  });
  const [imagePreview, setImagePreview] = useState(service?.image || "");
  const fileRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) { alert('Please select an image'); return; }
      if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); setFormData({ ...formData, image: reader.result }); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.duration) { 
      alert('Please fill all required fields'); 
      return; 
    }
    onSubmit(formData);
  };

  const categories = ["Medical", "Therapy", "Pediatric", "Emergency", "Educational"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-5 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">{service ? 'Edit Service' : 'Add Service'}</h2>
          <button onClick={onCancel} disabled={loading} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 text-lg disabled:opacity-50">✕</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image</label>
            <div onClick={() => fileRef.current?.click()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${imagePreview ? 'border-[#174593]' : 'border-gray-300 hover:border-[#174593]'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-3" />
                  <div className="flex gap-2 justify-center">
                    <button type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">Change</button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setImagePreview(""); setFormData({ ...formData, image: "" }); }} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50">Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-4xl mb-2">📷</p>
                  <p className="text-gray-600 font-medium">Click to upload image</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
              placeholder="Enter service name" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3" 
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
              placeholder="Describe the service" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
              <input 
                type="text" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
                placeholder="e.g., 45-60 mins" 
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onCancel} 
              disabled={loading}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleSubmit} 
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  {service ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                service ? 'Update' : 'Create'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubserviceForm = ({ subservice, parentService, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: subservice?.name || "",
    description: subservice?.description || "",
    duration: subservice?.duration || "",
    price: subservice?.price || "",
    status: subservice?.status || "active",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.duration) { 
      alert('Please fill all required fields'); 
      return; 
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{subservice ? 'Edit Subservice' : 'Add Subservice'}</h2>
              <p className="text-white/80 text-sm">For: {parentService?.name}</p>
            </div>
            <button onClick={onCancel} disabled={loading} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 text-lg disabled:opacity-50">✕</button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
              placeholder="Subservice name" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="3" 
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
              placeholder="Describe the subservice" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
              <input 
                type="text" 
                name="duration" 
                value={formData.duration} 
                onChange={handleChange} 
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
                placeholder="e.g., 60 mins" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593] disabled:opacity-50" 
                placeholder="e.g., ₹2,500" 
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onCancel} 
              disabled={loading}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleSubmit} 
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  {subservice ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                subservice ? 'Update' : 'Add'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;