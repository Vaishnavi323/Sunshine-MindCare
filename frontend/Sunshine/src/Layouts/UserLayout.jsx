import Navbar from '../User/Navbar.jsx'
import Footer from '../User/Footer.jsx'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../User/ScrollToTop.jsx'

const UserLayout = () => {
    return (
        <div className="app-container">
            <ScrollToTop/>
            <Navbar  />
            <div className="content pt-5" >
                <Outlet /> {/* All user routes will be rendered here */}
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout;