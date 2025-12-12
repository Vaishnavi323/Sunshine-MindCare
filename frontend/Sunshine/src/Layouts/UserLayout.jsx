import Footer from '../User/Footer.jsx'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../User/ScrollToTop.jsx'
import BackToTop from '../User/BackToTop.jsx'
import Chatbot from '../User/Chatbot.jsx'
import Header from '../User/Header.jsx'
import Navbar from '../User/Navbar.jsx'

const UserLayout = () => {
    return (
        <div>
            <ScrollToTop/>
            <Navbar  />
            <div className="content" >
                <Outlet /> {/* All user routes will be rendered here */}
            </div>
            <Footer />
            <BackToTop /><br/>
            <Chatbot/>
        </div>
    )
}

export default UserLayout;