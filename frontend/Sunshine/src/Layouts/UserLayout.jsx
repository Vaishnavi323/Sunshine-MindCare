import Navbar from '../User/Navbar.jsx'
import Footer from '../User/Footer.jsx'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../User/ScrollToTop.jsx'
import BackToTop from '../User/BackToTop.jsx'
import Chatbot from '../User/Chatbot.jsx'

const UserLayout = () => {
    return (
        <div className="app-container">
            <ScrollToTop/>
            <Navbar  />
            <div className="content pt-5" >
                <Outlet /> {/* All user routes will be rendered here */}
            </div>
            <Footer />
            <BackToTop /><br/>
            <Chatbot/>
        </div>
    )
}

export default UserLayout;