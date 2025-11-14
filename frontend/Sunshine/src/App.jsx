import { useState } from 'react'
import Navbar from './User/Navbar.jsx'
import Footer from './User/Footer.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Footer/>
    </>
  )
}

export default App
