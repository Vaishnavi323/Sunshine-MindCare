import { useState } from 'react'
import Navbar from './User/Navbar.jsx'
import Footer from './User/Footer.jsx'
import Herosection from './User/Home/Herosection.jsx'
import WhatNew from './User/Home/WhatNew.jsx'
import './App.css'
import OurExperts from './User/Home/OurExperts.jsx'
import AppointmentSection from './User/Home/Appoint.jsx'
import ClientReviews from './User/Home/ClientReviews.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Herosection/>
      <WhatNew/>
      <OurExperts/>
      <AppointmentSection/>
      <ClientReviews/>
      <Footer/>
    </>
  )
}

export default App
