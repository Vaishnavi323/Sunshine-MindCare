import React, { useState } from 'react';
import '../../styles/Navbar.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../assets/ChatGPT Image Dec 11, 2025, 04_24_07 PM.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
// import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

const CustomNavbar = () => {
    const [showEventsDropdown, setShowEventsDropdown] = useState(false);
    const [showCareersDropdown, setShowCareersDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const location = useLocation();

    // Helper function to check if a path is active
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (


        
        <>
            <TopBar />
            <Navbar expand="xl" className="custom-navbar" sticky="top">
                <Container fluid className="px-4">
                    {/* Left side - Logo and email */}
                    <div className="d-flex align-items gap-3">
                        <Link to="/" className="d-flex align-items" style={{ textDecoration: 'none' }}>
                            <Navbar.Brand href="#" className="d-flex align-items" onClick={(e) => e.preventDefault()} style={{ backgroundColor: "transparent" }}     >
                                <Link to={"/"}><img src={logoImage} alt="Sunshine Logo" className="navbar-logo"
                                    style={{ height: "70px", width: "155px", objectFit: "cover", display: "block", }}
                                /></Link>
                            </Navbar.Brand>
                        </Link>
                    </div>

                {/* Center - Navigation links */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="mx-auto nav-links">
                        <Nav.Link as={Link} to="/" className={`mx-2 fw-medium nav-link-custom ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/AboutUs" className={`mx-2 fw-medium nav-link-custom ${isActive('/AboutUs') ? 'active' : ''}`}>About Us</Nav.Link>
                        {/* <Nav.Link as={NavLink} to="/ServicePage" className={`mx-2 fw-medium nav-link-custom ${isActive('/ServicePage') ? 'active' : ''}`}>Services</Nav.Link> */}

                        <Dropdown
                            show={showServicesDropdown}
                            onMouseEnter={() => setShowServicesDropdown(true)}
                            onMouseLeave={() => setShowServicesDropdown(false)}
                            className="mx-2"
                        >   
                            <Dropdown.Toggle as={Nav.Link} className={`nav-link-custom fw-medium ${isActive('/ServicePage') || isActive('/Tests') || isActive('/Therapys') ? 'active' : ''}`}>
                                Services
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-custom">
                                <Dropdown.Item as={Link} to="/ServicePage" className="dropdown-item-custom">
                                    Our Services
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Tests" className="dropdown-item-custom">
                                    Tests
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Therapys" className="dropdown-item-custom">
                                    Therapys
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Nav.Link as={NavLink} to="/TeamPage" className={`mx-2 fw-medium nav-link-custom ${isActive('/TeamPage') ? 'active' : ''}`}>Team</Nav.Link>

                            {/* Events Dropdown */}
                            <Dropdown
                                show={showEventsDropdown}
                                onMouseEnter={() => setShowEventsDropdown(true)}
                                onMouseLeave={() => setShowEventsDropdown(false)}
                                className="mx-2"
                            >
                                <Dropdown.Toggle as={Nav.Link} className={`nav-link-custom fw-medium ${isActive('/PastEvents') || isActive('/UpcomingEvents') || isActive('/PublishedArticles') ? 'active' : ''}`}>
                                    Events
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-custom">
                                    <Dropdown.Item as={Link} to="/PastEvents" className="dropdown-item-custom">
                                        Past Events
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/UpcomingEvents" className="dropdown-item-custom">
                                        Upcoming Events
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/PublishedArticles" className="dropdown-item-custom">
                                        Articles
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link as={NavLink} to="/BlogPage" className={`mx-2 fw-medium nav-link-custom ${isActive('/BlogPage') ? 'active' : ''}`}>Blogs</Nav.Link>

                            {/* Careers Dropdown */}
                            <Dropdown
                                show={showCareersDropdown}
                                onMouseEnter={() => setShowCareersDropdown(true)}
                                onMouseLeave={() => setShowCareersDropdown(false)}
                                className="mx-2"
                            >
                                <Dropdown.Toggle as={Nav.Link} className={`nav-link-custom fw-medium ${isActive('/Training') || isActive('/Job') ? 'active' : ''}`}>
                                    Career
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-custom">
                                    <Dropdown.Item as={Link} to="/Training" className="dropdown-item-custom">
                                        Training and Certification
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/Job" className="dropdown-item-custom">
                                        Jobs
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link as={NavLink} to="/ContactUs" className={`mx-2 fw-medium nav-link-custom ${isActive('/ContactUs') ? 'active' : ''}`}>Contact Us</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>

                    {/* Right side - Search and Make Appointment Button */}
                    <div className="navbar-actions d-none d-lg-flex align-items-center gap-3">
                        {/* <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                        />
                        <button className="search-btn" title="Search">
                            <i className="fas fa-search"></i>
                        </button>
                    </div> */}
                        <a
                            href="https://empathy-foundation-frontend.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}

                        >
                            <button className="appointment-btn donate-btn">
                                <IoMdHeart  style={{ marginRight: "0px" }} /> Donate
                            </button>
                        </a>
                        <Link to={"/BookAppointment"}><button className="appointment-btn">Make Appointment</button></Link>
                    </div>
                </Container>

                <style jsx>{`
                .custom-navbar {
                    background: linear-gradient(to right, #f8f8f8ff 5%, #7aa6e0ff 100%);

                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    // padding: 0.8rem 0;
                    border-bottom: 3px solid #ff6b35;
                }
                
                .navbar-logo {
                    height: 66px;
                    width: 140px;
                }
                

            
                .nav-link-custom {
                    color: #000000ff !important;
                    font-size: 0.95rem;
                    font-weight: 500;
                    padding: 0.3rem 0.9rem !important;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-link-custom.active {
                    color: #ff6b35 !important;
                    background-color: rgba(255, 107, 53, 0.15);
                    border-bottom: 2px solid #ff6b35;
                }
                
                .nav-link-custom:hover {
                    color: #ff6b35 !important;
                    background-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                
                .nav-link-custom::after {
                    {/* content: ''; */}
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    {/* background: #ff6b35; */}
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }
                
                .nav-link-custom:hover::after {
                    width: 80%;
                }
                
                /* Dropdown Styles */
                .dropdown-toggle-custom {
                    background: transparent !important;
                    border: none !important;
                    color: #ffffff !important;
                    font-size: 0.95rem;
                    font-weight: 500;
                    padding: 0.5rem 1rem !important;
                }
                
                .dropdown-toggle-custom::after {
                    display: inline-block;
                    margin-left: 0.5em;
                    vertical-align: 0.15em;
                    content: "";
                    border-top: 0.3em solid;
                    border-right: 0.3em solid transparent;
                    border-bottom: 0;
                    border-left: 0.3em solid transparent;
                    transition: transform 0.3s ease;
                }
                
                .dropdown.show .dropdown-toggle-custom::after {
                    transform: rotate(-180deg);
                }
                

                .nav-link-custom.dropdown-toggle::after {
                    display: none !important;
                }
                .dropdown-menu-custom {
                    background: linear-gradient(to right, rgba(24, 122, 183, 0.63) 5%, #7aa6e0ff 100%);
                    border: none;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    padding: 0.5rem 0;
                    margin-top: 0.5rem;
                    border-left: 3px solid #ff6b35;
                    animation: dropdownFade 0.3s ease;
                }
                
                @keyframes dropdownFade {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .dropdown-item-custom {
                    color: #000000ff !important;
                    padding: 0.75rem 1.5rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .dropdown-item-custom:last-child {
                    border-bottom: none;
                }
                
                .dropdown-item-custom:hover {
                    background: rgba(255, 107, 53, 0.2) !important;
                    color: #ffff !important;
                    padding-left: 2rem;
                }
                
                /* Search Styles */
                .navbar-actions {
                    flex-shrink: 0;
                    gap: 1rem;
                    align-items: center;
                    display: flex;
                }

                

                /* Appointment Button */
                .appointment-btn {
                    background: linear-gradient(45deg, #ffb235a9, #ff8e53);
                    border: none;
                    padding: 0.65rem 1.25rem;
                    font-size: 0.92rem;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.22s ease;
                    box-shadow: 0 6px 18px rgba(255, 107, 53, 0.22);
                    flex-shrink: 0;
                }

                .appointment-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.34);
                    background: linear-gradient(45deg, #ff8f53b8, #ff6b35);
                }

                /* Mobile Responsive */
                @media (max-width: 991px) {
                    .navbar-collapse {
                        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                        padding: 1rem;
                        margin-top: 1rem;
                        border-radius: 8px;
                        border: 2px solid #ff6b35;
                    }

                    .nav-links .nav-link {
                        text-align: center;
                        margin: 0.5rem 0;
                        padding: 0.75rem;
                    }

                    .dropdown-menu-custom {
                        background: rgba(255, 255, 255, 0.1);
                        margin: 0.5rem 0;
                        text-align: center;
                    }

                    .dropdown-item-custom {
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .search-container {
                        margin: 1rem 0;
                        width: 100%;
                        min-width: 0;
                    }

                    .search-input {
                        width: 100%;
                        padding-right: 48px;
                    }

                    .appointment-btn {
                        width: 100%;
                        margin-top: 0.5rem;
                    }
                }
            `}</style>

            </Navbar>
        </>
    );
};

export default CustomNavbar;