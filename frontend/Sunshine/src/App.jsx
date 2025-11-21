import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserLayout from './Layouts/UserLayout.jsx'
import Home from './User/Home.jsx'
import About from './User/About_us/AboutUs.jsx'
import Service from './User/Services/Service.jsx'
import MyTeam from './User/Team/MyTeam.jsx'
import Blogs from './User/Blog/Blogs.jsx'
import Contact from './User/Contact_us/Contact.jsx'
import Past from './User/Events/Past.jsx'
import Upcoming from './User/Events/Upcoming.jsx'
import Articles from './User/Events/Articles.jsx'
import Training from './User/Careers/Internship/Training.jsx'
import Job from './User/Careers/Jobs/Job.jsx'
import Book from './User/Book_Appoint/Book.jsx'
import ChatBot from './User/Chatbot.jsx'

//Admin Routes

import { AuthProvider, useAuth } from "./Admin/Auth/AuthContext";
import Sidebar from "./Admin/Sidebar";
import Navbar from "./Admin/AdminNavbar.jsx";
import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Auth/Login";
import Events from "./Admin/Pages/Events";

import Blogss from "./Admin/Pages/Blogss";
import AdminReview from "./Admin/Pages/AdminReview";
import Hospitals from "./Admin/Pages/Hospitals";
import Team from "./Admin/Pages/Team";
import Donations from "./Admin/Pages/AdminJobs.jsx";
import Volunteers from "./Admin/Pages/AdminServices.jsx";
import AdminAppoint from "./Admin/Pages/AdminAppoint";
import AdminMessages from './Admin/Pages/AdminMessage.jsx';
import AdminEnquiries from './Admin/Pages/AdminEnquiry.jsx';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Admin Layout Component
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            
            <Route path="/Blogss" element={<Blogss />} />
            <Route path="/Reviews" element={<AdminReview />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/team" element={<Team />} />
            <Route path="/Jobs" element={<Donations />} />
            <Route path="/Services" element={<Volunteers />} />
            <Route path="/AdminAppoint" element={<AdminAppoint />} />
            <Route path="/AdminMessages" element={<AdminMessages />} />
            <Route path="/AdminEnquiries" element={<AdminEnquiries />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

//--------------------------User Routes------------------------------------------------

function App() {
  return (
    
    <AuthProvider>
      
    <Routes>
    
      <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="AboutUs" element={<About/>} />
      <Route path="ServicePage" element={<Service/>} />
      <Route path="TeamPage" element={<MyTeam/>}/>
      <Route path="BlogPage" element={<Blogs/>}/>
      <Route path="ContactUs" element={<Contact/>}/>
      <Route path="PastEvents" element={<Past/>}/>
      <Route path="UpcomingEvents" element={<Upcoming/>}/>
      <Route path="PublishedArticles" element={<Articles/>}/>
      <Route path="Training" element={<Training/>}/>
      <Route path="Job" element={<Job/>}/>
      <Route path="BookAppointment" element={<Book/>}/>
      <Route path="Chatbot" element={<ChatBot/>}/>

      {/* <Route path="/login" element={<Login />} /> */}

      </Route>

      <Route path="/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/admin" replace />} />
      
    </Routes>

    
        
    
    </AuthProvider>
    
  )
}

export default App
