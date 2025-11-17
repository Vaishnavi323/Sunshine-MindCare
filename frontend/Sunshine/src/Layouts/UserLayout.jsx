import Navbar from '../User/Navbar.jsx'
import Footer from '../User/Footer.jsx'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div className="app-container">
            
            <Navbar  />
            <div className="content pt-5" >
                <Outlet /> {/* All user routes will be rendered here */}
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout;