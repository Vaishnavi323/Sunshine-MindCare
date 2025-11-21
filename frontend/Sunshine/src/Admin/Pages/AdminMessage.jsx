import React, { useState } from 'react';

const AdminMessages = () => {
  // Dynamic messages data - will come from API in future
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      message: 'I would like to book an appointment for counseling session. Can you please provide more information about the services and pricing?',
      date: '2024-11-15T10:30:00',
      isRead: false
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@yahoo.com',
      message: 'Thank you for the wonderful session yesterday. It really helped me understand my anxiety better. Looking forward to the next appointment.',
      date: '2024-11-14T15:45:00',
      isRead: true
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@outlook.com',
      message: 'My son has been struggling with focus issues at school. I was wondering if you offer assessments for children and what the process would be like.',
      date: '2024-11-14T09:20:00',
      isRead: false
    },
    {
      id: 4,
      name: 'Sneha Deshmukh',
      email: 'sneha.d@gmail.com',
      message: 'I attended your mental health workshop last week and found it very informative. Are there any upcoming events I can register for?',
      date: '2024-11-13T14:10:00',
      isRead: true
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      email: 'vikram.joshi@company.com',
      message: 'We are interested in organizing a corporate wellness program for our employees. Could you please share the available packages and schedules?',
      date: '2024-11-13T11:00:00',
      isRead: false
    },
    {
      id: 6,
      name: 'Meera Kulkarni',
      email: 'meera.k@gmail.com',
      message: 'I have been experiencing severe stress due to work pressure. How soon can I get an appointment? Is online consultation available?',
      date: '2024-11-12T16:30:00',
      isRead: true
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !msg.isRead) || 
                         (filter === 'read' && msg.isRead);
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase());
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

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      setMessages(messages.map(m => 
        m.id === msg.id ? { ...m, isRead: true } : m
      ));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const readCount = messages.filter(m => m.isRead).length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2a5298] mb-2">
            Messages
          </h1>
          <p className="text-gray-600 text-lg">
            View and manage contact form submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Total Messages */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1f1f35] to-[#174593] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#2a5298]">{messages.length}</h3>
              <p className="text-gray-500 font-medium">Total Messages</p>
            </div>
          </div>

          {/* Unread Messages */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#2a5298]">{unreadCount}</h3>
              <p className="text-gray-500 font-medium">Unread Messages</p>
            </div>
          </div>

          {/* Read Messages */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#2a5298]">{readCount}</h3>
              <p className="text-gray-500 font-medium">Read Messages</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 md:p-5 mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#3567c3] transition-colors"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'unread', 'read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-lg font-semibold capitalize transition-all duration-300 ${
                  filter === f
                    ? 'bg-gradient-to-r from-[#3567c3] to-[#2a5298] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`bg-white rounded-xl p-5 shadow-md border-2 cursor-pointer transition-all duration-300 hover:translate-x-1 hover:shadow-lg ${
                    !msg.isRead 
                      ? 'border-l-4 border-l-amber-500 border-t-transparent border-r-transparent border-b-transparent bg-gradient-to-r from-amber-50 to-white' 
                      : 'border-transparent'
                  } ${
                    selectedMessage?.id === msg.id 
                      ? 'border-[#3567c3] ring-2 ring-[#3567c3]/20' 
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3567c3] to-[#2a5298] flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(msg.name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#2a5298] flex items-center gap-2">
                          {msg.name}
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-semibold animate-pulse">
                              New
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                      {formatDate(msg.date)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-md border border-gray-200 text-center">
                <div className="text-6xl mb-4 opacity-50">📭</div>
                <h3 className="text-xl font-bold text-[#2a5298] mb-2">No Messages Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="hidden lg:block">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-8 animate-[scaleIn_0.3s_ease-out]">
                {/* Detail Header */}
                <div className="bg-gradient-to-r from-[#3567c3] to-[#2a5298] p-8 text-white">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-2xl font-bold">
                      {getInitials(selectedMessage.name)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{selectedMessage.name}</h3>
                      <p className="opacity-90">{selectedMessage.email}</p>
                      <p className="text-sm opacity-75 mt-1">{formatDate(selectedMessage.date)}</p>
                    </div>
                  </div>
                </div>

                {/* Detail Body */}
                <div className="p-8">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Message Content
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 flex flex-col items-center justify-center h-96">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#2a5298] mb-2">Select a Message</h3>
                <p className="text-gray-500 text-center">Click on any message from the list to view its full content</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Message Detail Modal */}
        {selectedMessage && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedMessage(null)}>
            <div 
              className="bg-white w-full max-h-[80vh] rounded-t-3xl overflow-hidden animate-[slideUp_0.3s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-[#3567c3] to-[#2a5298] p-6 text-white relative">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {getInitials(selectedMessage.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedMessage.name}</h3>
                    <p className="opacity-90 text-sm">{selectedMessage.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Message</p>
                <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                <p className="text-sm text-gray-400 mt-4">{formatDate(selectedMessage.date)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AdminMessages;