import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import './App.css'


function App() {
  return (
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
      </Route>
      
    </Routes>
  )
}

export default App
