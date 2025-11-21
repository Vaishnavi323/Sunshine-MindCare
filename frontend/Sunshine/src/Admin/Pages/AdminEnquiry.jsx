import React, { useState } from 'react';

const AdminEnquiries = () => {
  // Dynamic enquiries data - will come from API in future
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      name: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      age: 21,
      collegeName: 'Pune University',
      studyYear: '3rd Year',
      purpose: 'To gain practical experience in clinical psychology and understand therapeutic techniques used in real-world counseling sessions.',
      previousInternship: true,
      date: '2024-11-15T10:30:00',
      isRead: false
    },
    {
      id: 2,
      name: 'Priya Desai',
      email: 'priya.desai@yahoo.com',
      age: 20,
      collegeName: 'Mumbai University',
      studyYear: '2nd Year',
      purpose: 'Interested in learning about child psychology assessments and behavioral therapy methods.',
      previousInternship: false,
      date: '2024-11-14T15:45:00',
      isRead: true
    },
    {
      id: 3,
      name: 'Rohan Kulkarni',
      email: 'rohan.k@outlook.com',
      age: 22,
      collegeName: 'Nashik College of Psychology',
      studyYear: '4th Year',
      purpose: 'Final year project requires practical exposure. Want to specialize in anxiety and depression treatment.',
      previousInternship: true,
      date: '2024-11-14T09:20:00',
      isRead: false
    },
    {
      id: 4,
      name: 'Sneha Patil',
      email: 'sneha.patil@gmail.com',
      age: 19,
      collegeName: 'Fergusson College',
      studyYear: '1st Year',
      purpose: 'Early exposure to the field of mental health to confirm my career choice and understand the day-to-day responsibilities.',
      previousInternship: false,
      date: '2024-11-13T14:10:00',
      isRead: true
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@college.edu',
      age: 23,
      collegeName: 'Delhi University',
      studyYear: '5th Year (Masters)',
      purpose: 'Research-oriented internship for my thesis on cognitive behavioral therapy effectiveness in Indian context.',
      previousInternship: true,
      date: '2024-11-13T11:00:00',
      isRead: false
    },
    {
      id: 6,
      name: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      age: 20,
      collegeName: 'Symbiosis College',
      studyYear: '2nd Year',
      purpose: 'Want to explore different areas of psychology before choosing my specialization.',
      previousInternship: false,
      date: '2024-11-12T16:30:00',
      isRead: true
    }
  ]);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !enq.isRead) || 
                         (filter === 'read' && enq.isRead) ||
                         (filter === 'experienced' && enq.previousInternship) ||
                         (filter === 'fresher' && !enq.previousInternship);
    const matchesSearch = enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enq.collegeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectEnquiry = (enq) => {
    setSelectedEnquiry(enq);
    if (!enq.isRead) {
      setEnquiries(enquiries.map(e => 
        e.id === enq.id ? { ...e, isRead: true } : e
      ));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const unreadCount = enquiries.filter(e => !e.isRead).length;
  const experiencedCount = enquiries.filter(e => e.previousInternship).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f1f35] mb-2">
            Internship Enquiries
          </h1>
          <p className="text-gray-600 text-lg">
            View and manage internship applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Total Enquiries */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1f1f35] to-[#174593] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1f1f35]">{enquiries.length}</h3>
              <p className="text-gray-500 font-medium text-sm">Total Enquiries</p>
            </div>
          </div>

          {/* Unread */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1f1f35]">{unreadCount}</h3>
              <p className="text-gray-500 font-medium text-sm">New Enquiries</p>
            </div>
          </div>

          {/* Experienced */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1f1f35]">{experiencedCount}</h3>
              <p className="text-gray-500 font-medium text-sm">With Experience</p>
            </div>
          </div>

          {/* Freshers */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1f1f35]">{enquiries.length - experiencedCount}</h3>
              <p className="text-gray-500 font-medium text-sm">Freshers</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-5 mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#174593] transition-colors"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'New' },
              { key: 'experienced', label: 'Experienced' },
              { key: 'fresher', label: 'Freshers' }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-gradient-to-r from-[#1f1f35] to-[#174593] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enquiry List */}
          <div className="space-y-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enq, index) => (
                <div
                  key={enq.id}
                  onClick={() => handleSelectEnquiry(enq)}
                  className={`bg-white rounded-xl p-5 shadow-md border-2 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-lg ${
                    !enq.isRead 
                      ? 'border-l-4 border-l-amber-500 border-t-transparent border-r-transparent border-b-transparent bg-gradient-to-r from-amber-50 to-white' 
                      : 'border-transparent'
                  } ${
                    selectedEnquiry?.id === enq.id 
                      ? 'border-[#174593] ring-2 ring-[#174593]/20' 
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1f1f35] to-[#174593] flex items-center justify-center text-white font-bold">
                        {getInitials(enq.name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1f1f35] flex items-center gap-2">
                          {enq.name}
                          {!enq.isRead && (
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-semibold animate-pulse">
                              New
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">{enq.collegeName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        enq.previousInternship 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {enq.previousInternship ? 'Experienced' : 'Fresher'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {enq.age} yrs
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {enq.studyYear}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {enq.purpose}
                  </p>
                  
                  <p className="text-xs text-gray-400 mt-3">{formatDate(enq.date)}</p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-md border border-gray-200 text-center">
                <div className="text-6xl mb-4 opacity-50">📋</div>
                <h3 className="text-xl font-bold text-[#1f1f35] mb-2">No Enquiries Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Enquiry Detail */}
          <div className="hidden lg:block">
            {selectedEnquiry ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-8">
                {/* Detail Header */}
                <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-6 text-white">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-2xl font-bold">
                      {getInitials(selectedEnquiry.name)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{selectedEnquiry.name}</h3>
                      <p className="opacity-90">{selectedEnquiry.email}</p>
                      <p className="text-sm opacity-75 mt-1">{formatDate(selectedEnquiry.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Detail Body */}
                <div className="p-6 space-y-5">
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Age</p>
                      <p className="text-lg font-bold text-[#1f1f35]">{selectedEnquiry.age} years</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Study Year</p>
                      <p className="text-lg font-bold text-[#1f1f35]">{selectedEnquiry.studyYear}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">College Name</p>
                    <p className="text-base font-semibold text-[#1f1f35]">{selectedEnquiry.collegeName}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Previous Internship Experience</p>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedEnquiry.previousInternship 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedEnquiry.previousInternship ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Yes, has experience
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          No, fresher
                        </>
                      )}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Purpose of Internship</p>
                    <p className="text-gray-700 leading-relaxed">{selectedEnquiry.purpose}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 flex flex-col items-center justify-center h-96">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1f1f35] mb-2">Select an Enquiry</h3>
                <p className="text-gray-500 text-center">Click on any enquiry from the list to view full details</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Detail Modal */}
        {selectedEnquiry && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedEnquiry(null)}>
            <div 
              className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#1f1f35] to-[#174593] p-5 text-white relative">
                <button 
                  onClick={() => setSelectedEnquiry(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {getInitials(selectedEnquiry.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedEnquiry.name}</h3>
                    <p className="opacity-90 text-sm">{selectedEnquiry.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Age</p>
                    <p className="font-bold text-[#1f1f35]">{selectedEnquiry.age} yrs</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 uppercase">Year</p>
                    <p className="font-bold text-[#1f1f35]">{selectedEnquiry.studyYear}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase">College</p>
                  <p className="font-semibold text-[#1f1f35]">{selectedEnquiry.collegeName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase mb-1">Experience</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedEnquiry.previousInternship ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedEnquiry.previousInternship ? 'Has Experience' : 'Fresher'}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase mb-1">Purpose</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedEnquiry.purpose}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;