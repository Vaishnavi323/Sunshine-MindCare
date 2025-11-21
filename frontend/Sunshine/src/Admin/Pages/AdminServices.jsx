import React, { useState, useRef } from 'react';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Psychiatry Services",
      description: "Comprehensive psychiatric evaluation and treatment for various mental health conditions.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      category: "Medical",
      status: "active",
      duration: "45-60 mins",
      createdDate: "2024-01-15",
      subservices: [
        { id: 101, name: "Initial Psychiatric Evaluation", description: "Comprehensive assessment and diagnosis.", duration: "60 mins", price: "₹3,000", status: "active" },
        { id: 102, name: "Medication Management", description: "Ongoing medication prescription and monitoring.", duration: "30 mins", price: "₹1,500", status: "active" }
      ]
    },
    {
      id: 2,
      name: "Therapy & Counseling",
      description: "Professional therapy sessions for individuals, couples, and families.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
      category: "Therapy",
      status: "active",
      duration: "45-60 mins",
      createdDate: "2024-01-10",
      subservices: [
        { id: 201, name: "Individual Therapy", description: "One-on-one sessions with a licensed therapist.", duration: "60 mins", price: "₹2,500", status: "active" }
      ]
    },
    {
      id: 3,
      name: "Child & Adolescent Care",
      description: "Specialized mental health services for children and teenagers.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      category: "Pediatric",
      status: "active",
      duration: "45-90 mins",
      createdDate: "2024-01-08",
      subservices: []
    }
  ]);

  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showSubserviceForm, setShowSubserviceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [editingSubservice, setEditingSubservice] = useState(null);
  const [parentService, setParentService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedServices, setExpandedServices] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(services.map(s => s.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpansion = (id) => {
    const newSet = new Set(expandedServices);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setExpandedServices(newSet);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
    setDeleteConfirm(null);
  };

  const handleDeleteSubservice = (serviceId, subId) => {
    setServices(services.map(s => s.id === serviceId ? { ...s, subservices: s.subservices.filter(sub => sub.id !== subId) } : s));
    setDeleteConfirm(null);
  };

  const handleServiceSubmit = (data) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...data } : s));
    } else {
      setServices([...services, { id: Date.now(), ...data, createdDate: new Date().toISOString().split('T')[0], subservices: [] }]);
    }
    setShowServiceForm(false);
    setEditingService(null);
  };

  const handleSubserviceSubmit = (data) => {
    if (editingSubservice) {
      setServices(services.map(s => s.id === parentService.id ? { ...s, subservices: s.subservices.map(sub => sub.id === editingSubservice.id ? { ...sub, ...data } : sub) } : s));
    } else {
      setServices(services.map(s => s.id === parentService.id ? { ...s, subservices: [...s.subservices, { id: Date.now(), ...data }] } : s));
    }
    setShowSubserviceForm(false);
    setEditingSubservice(null);
    setParentService(null);
  };

  const getCatColor = (cat) => {
    const c = { Medical: "bg-blue-100 text-blue-800", Therapy: "bg-purple-100 text-purple-800", Pediatric: "bg-pink-100 text-pink-800", Emergency: "bg-red-100 text-red-800", Educational: "bg-orange-100 text-orange-800" };
    return c[cat] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Services Management</h1>
            <p className="text-gray-600">Manage services and subservices</p>
          </div>
          <button onClick={() => setShowServiceForm(true)} className="bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all">
            <span className="text-xl">+</span> Add Service
          </button>
        </div>

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
          <input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#174593]" />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#174593]">
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
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCatColor(service.category)}`}>{service.category}</span>
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
                    <button onClick={() => { setEditingService(service); setShowServiceForm(true); }} className="px-4 py-2 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg text-sm font-semibold hover:shadow-md">Edit</button>
                    <button onClick={() => setDeleteConfirm({ type: 'service', id: service.id })} className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg text-sm font-semibold hover:bg-red-50">Delete</button>
                  </div>
                </div>
              </div>

              {expandedServices.has(service.id) && (
                <div className="p-5 border-t bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Subservices ({service.subservices.length})</h4>
                    <button onClick={() => { setParentService(service); setEditingSubservice(null); setShowSubserviceForm(true); }} className="px-3 py-2 bg-[#1f1f35] text-white rounded-lg text-sm font-semibold hover:bg-[#174593]">+ Add</button>
                  </div>
                  {service.subservices.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {service.subservices.map((sub) => (
                        <div key={sub.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900">{sub.name}</h5>
                            <div className="flex gap-1">
                              <button onClick={() => { setParentService(service); setEditingSubservice(sub); setShowSubserviceForm(true); }} className="w-7 h-7 bg-blue-500 text-white rounded flex items-center justify-center text-xs hover:bg-blue-600">✎</button>
                              <button onClick={() => setDeleteConfirm({ type: 'subservice', serviceId: service.id, id: sub.id })} className="w-7 h-7 bg-red-500 text-white rounded flex items-center justify-center text-xs hover:bg-red-600">✕</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{sub.description}</p>
                          <div className="flex gap-3 text-xs text-gray-500">
                            <span>{sub.duration}</span>
                            {/* <span>{sub.price}</span> */}
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
            <button onClick={() => setShowServiceForm(true)} className="mt-4 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white px-6 py-3 rounded-xl font-semibold">Add Service</button>
          </div>
        )}
      </div>

      {showServiceForm && <ServiceForm service={editingService} onSubmit={handleServiceSubmit} onCancel={() => { setShowServiceForm(false); setEditingService(null); }} />}
      {showSubserviceForm && <SubserviceForm subservice={editingSubservice} parentService={parentService} onSubmit={handleSubserviceSubmit} onCancel={() => { setShowSubserviceForm(false); setEditingSubservice(null); setParentService(null); }} />}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this {deleteConfirm.type}?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
              <button onClick={() => deleteConfirm.type === 'service' ? handleDeleteService(deleteConfirm.id) : handleDeleteSubservice(deleteConfirm.serviceId, deleteConfirm.id)} className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceForm = ({ service, onSubmit, onCancel }) => {
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
    if (!formData.name || !formData.description || !formData.duration || !formData.image) { alert('Fill all fields'); return; }
    onSubmit(formData);
  };

  const categories = ["Medical", "Therapy", "Pediatric", "Emergency", "Educational"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-5 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">{service ? 'Edit Service' : 'Add Service'}</h2>
          <button onClick={onCancel} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 text-lg">✕</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Image *</label>
            <div onClick={() => fileRef.current?.click()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${imagePreview ? 'border-[#174593]' : 'border-gray-300 hover:border-[#174593]'}`}>
              {imagePreview ? (
                <div>
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-3" />
                  <div className="flex gap-2 justify-center">
                    <button type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Change</button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); setImagePreview(""); setFormData({ ...formData, image: "" }); }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Remove</button>
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
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="Enter service name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="Describe the service" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="e.g., 45-60 mins" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onCancel} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
            <button type="button" onClick={handleSubmit} className="flex-1 py-3 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg font-semibold hover:shadow-lg">{service ? 'Update' : 'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubserviceForm = ({ subservice, parentService, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: subservice?.name || "",
    description: subservice?.description || "",
    duration: subservice?.duration || "",
    price: subservice?.price || "",
    status: subservice?.status || "active",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.duration || !formData.price) { alert('Fill all fields'); return; }
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
            <button onClick={onCancel} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 text-lg">✕</button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="Subservice name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="Describe the subservice" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="e.g., 60 mins" />
            </div>
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#174593]" placeholder="e.g., ₹2,500" />
            </div> */}
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onCancel} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200">Cancel</button>
            <button type="button" onClick={handleSubmit} className="flex-1 py-3 bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white rounded-lg font-semibold hover:shadow-lg">{subservice ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;