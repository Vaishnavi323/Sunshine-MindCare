

import React, { useState } from 'react';
import '../../styles/Navbar.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../assets/ChatGPT Image Dec 11, 2025, 04_24_07 PM.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { IoMdHeart } from "react-icons/io";

const CustomNavbar = () => {
    const [showEventsDropdown, setShowEventsDropdown] = useState(false);
    const [showCareersDropdown, setShowCareersDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Helper function to check if a path is active
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Function to handle navigation and close navbar
    const handleNavLinkClick = (to) => {
        navigate(to);
        setExpanded(false);
        setShowEventsDropdown(false);
        setShowCareersDropdown(false);
        setShowServicesDropdown(false);
    };

    // Function to handle dropdown item click
    const handleDropdownItemClick = (to) => {
        handleNavLinkClick(to);
    };

    return (
        <>
            <TopBar />
            <Navbar expand="xl" className="custom-navbar" sticky="top" expanded={expanded} onToggle={setExpanded}>
                <Container fluid className="px-4">
                    {/* Left side - Logo and email */}
                    <div className="d-flex align-items gap-3">
                        <Link to="/" className="d-flex align-items" style={{ textDecoration: 'none' }}>
                            <Navbar.Brand href="#" className="d-flex align-items" onClick={(e) => e.preventDefault()} style={{ backgroundColor: "transparent" }}>
                                <Link to={"/"}><img src={logoImage} alt="Sunshine Logo" className="navbar-logo"
                                    style={{ height: "70px", width: "155px", objectFit: "cover", display: "block" }}
                                /></Link>
                            </Navbar.Brand>
                        </Link>
                    </div>

                    {/* Hamburger Toggle Button */}
                    <Navbar.Toggle 
                        aria-controls="basic-navbar-nav" 
                        className="custom-toggler" 
                        onClick={() => setExpanded(!expanded)}
                    />

                    {/* Center - Navigation links */}
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                        <Nav className="mx-auto nav-links">
                            <Nav.Link 
                                as={Link} 
                                to="/" 
                                className={`mx-2 fw-medium nav-link-custom ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
                                onClick={() => handleNavLinkClick('/')}
                            >
                                Home
                            </Nav.Link>
                            
                            <Nav.Link 
                                as={NavLink} 
                                to="/AboutUs" 
                                className={`mx-2 fw-medium nav-link-custom ${isActive('/AboutUs') ? 'active' : ''}`}
                                onClick={() => handleNavLinkClick('/AboutUs')}
                            >
                                About Us
                            </Nav.Link>

                            {/* Services Dropdown */}
                            <Dropdown
                                show={showServicesDropdown}
                                onMouseEnter={() => window.innerWidth > 991 && setShowServicesDropdown(true)}
                                onMouseLeave={() => window.innerWidth > 991 && setShowServicesDropdown(false)}
                                className="mx-2"
                            >   
                                <Dropdown.Toggle 
                                    as={Nav.Link} 
                                    className={`nav-link-custom fw-medium ${isActive('/ServicePage') || isActive('/Tests') || isActive('/Therapys') ? 'active' : ''}`}
                                    onClick={() => window.innerWidth <= 991 && setShowServicesDropdown(!showServicesDropdown)}
                                >
                                    Services
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-custom">
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/ServicePage" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/ServicePage')}
                                    >
                                        Our Services
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/Tests" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/Tests')}
                                    >
                                        Tests
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/Therapys" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/Therapys')}
                                    >
                                        Therapys
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link 
                                as={NavLink} 
                                to="/TeamPage" 
                                className={`mx-2 fw-medium nav-link-custom ${isActive('/TeamPage') ? 'active' : ''}`}
                                onClick={() => handleNavLinkClick('/TeamPage')}
                            >
                                Team
                            </Nav.Link>

                            {/* Events Dropdown */}
                            <Dropdown
                                show={showEventsDropdown}
                                onMouseEnter={() => window.innerWidth > 991 && setShowEventsDropdown(true)}
                                onMouseLeave={() => window.innerWidth > 991 && setShowEventsDropdown(false)}
                                className="mx-2"
                            >
                                <Dropdown.Toggle 
                                    as={Nav.Link} 
                                    className={`nav-link-custom fw-medium ${isActive('/PastEvents') || isActive('/UpcomingEvents') || isActive('/PublishedArticles') ? 'active' : ''}`}
                                    onClick={() => window.innerWidth <= 991 && setShowEventsDropdown(!showEventsDropdown)}
                                >
                                    Events
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-custom">
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/PastEvents" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/PastEvents')}
                                    >
                                        Past Events
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/UpcomingEvents" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/UpcomingEvents')}
                                    >
                                        Upcoming Events
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/PublishedArticles" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/PublishedArticles')}
                                    >
                                        Articles
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link 
                                as={NavLink} 
                                to="/BlogPage" 
                                className={`mx-2 fw-medium nav-link-custom ${isActive('/BlogPage') ? 'active' : ''}`}
                                onClick={() => handleNavLinkClick('/BlogPage')}
                            >
                                Blogs
                            </Nav.Link>

                            {/* Careers Dropdown */}
                            <Dropdown
                                show={showCareersDropdown}
                                onMouseEnter={() => window.innerWidth > 991 && setShowCareersDropdown(true)}
                                onMouseLeave={() => window.innerWidth > 991 && setShowCareersDropdown(false)}
                                className="mx-2"
                            >
                                <Dropdown.Toggle 
                                    as={Nav.Link} 
                                    className={`nav-link-custom fw-medium ${isActive('/Training') || isActive('/Job') ? 'active' : ''}`}
                                    onClick={() => window.innerWidth <= 991 && setShowCareersDropdown(!showCareersDropdown)}
                                >
                                    Career
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-custom">
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/Training" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/Training')}
                                    >
                                        Training and Certification
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/Job" 
                                        className="dropdown-item-custom"
                                        onClick={() => handleDropdownItemClick('/Job')}
                                    >
                                        Jobs
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Nav.Link 
                                as={NavLink} 
                                to="/ContactUs" 
                                className={`mx-2 fw-medium nav-link-custom ${isActive('/ContactUs') ? 'active' : ''}`}
                                onClick={() => handleNavLinkClick('/ContactUs')}
                            >
                                Contact Us
                            </Nav.Link>

                            {/* Mobile Donate and Appointment Buttons */}
                            <div className="mobile-buttons">
                                <a
                                    href="https://empathy-foundation-frontend.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mobile-button-link"
                                    onClick={() => setExpanded(false)}
                                >
                                    <button className="appointment-btn donate-btn mobile-btn-full">
                                        <IoMdHeart style={{ marginRight: "8px" }} /> Donate
                                    </button>
                                </a>
                                <button 
                                    className="appointment-btn mobile-btn-full"
                                    onClick={() => {
                                        navigate("/BookAppointment");
                                        setExpanded(false);
                                    }}
                                >
                                    Make Appointment
                                </button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>

                    {/* Right side - Search and Make Appointment Button (Desktop Only) */}
                    <div className="navbar-actions d-none d-xl-flex align-items-center gap-3">
                        <a
                            href="https://empathy-foundation-frontend.netlify.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <button className="appointment-btn donate-btn">
                                <IoMdHeart style={{ marginRight: "8px" }} /> Donate
                            </button>
                        </a>
                        <button 
                            className="appointment-btn"
                            onClick={() => navigate("/BookAppointment")}
                        >
                            Make Appointment
                        </button>
                    </div>
                </Container>

                <style jsx>{`
                    .custom-navbar {
                        background: linear-gradient(to right, #f8f8f8ff 5%, #7aa6e0ff 100%);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        border-bottom: 3px solid #ff6b35;
                    }
                    
                    .navbar-logo {
                        height: 66px;
                        width: 140px;
                    }
                    
                    .nav-link-custom {
                        color: #000000ff !important;
                        font-size: 1.05rem;
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
                    
                    /* Dropdown Styles */
                    .dropdown-toggle-custom {
                        background: transparent !important;
                        border: none !important;
                        color: #ffffff !important;
                        font-size: 1.05rem;
                        font-weight: 500;
                        padding: 0.5rem 1rem !important;
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
                        text-align: center;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .appointment-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.34);
                        background: linear-gradient(45deg, #ff8f53b8, #ff6b35);
                    }

                    /* Donate Button specific style */
                    .donate-btn {
                        background: linear-gradient(45deg, #ff355ea9, #ff5373);
                    }

                    .donate-btn:hover {
                        background: linear-gradient(45deg, #ff5373b8, #ff355e);
                    }

                    /* Mobile Button Link */
                    .mobile-button-link {
                        width: 100%;
                        text-decoration: none;
                        display: block;
                    }

                    .mobile-btn-full {
                        width: 100%;
                    }

                    /* Mobile Buttons Container */
                    .mobile-buttons {
                        display: none;
                        flex-direction: column;
                        gap: 0.75rem;
                        width: 100%;
                        margin-top: 1rem;
                        padding: 0 1rem;
                    }

                    /* Mobile Responsive */
                    @media (max-width: 1199px) {
                        .navbar-collapse {
                            background: linear-gradient(to right, #f8f8f8ff 5%, #7aa6e0ff 100%);
                            padding: 1rem;
                            margin-top: 1rem;
                            border-radius: 8px;
                            border: 2px solid #ff6b35;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                        }

                        .nav-links {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        .nav-links .nav-link {
                            text-align: center;
                            margin: 0.5rem 0;
                            padding: 0.75rem !important;
                            width: 100%;
                        }

                        .dropdown-menu-custom {
                            background: rgba(255, 255, 255, 0.15);
                            margin: 0.5rem auto;
                            text-align: center;
                            width: 90%;
                            border: 1px solid rgba(255, 107, 53, 0.3);
                        }

                        .dropdown-item-custom {
                            text-align: center;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        }

                        .mobile-buttons {
                            display: flex !important;
                            flex-direction: column;
                            width: calc(100% - 2rem);
                            align-items: stretch;
                        }

                        .appointment-btn {
                            width: 100%;
                        }
                    }

                    @media (min-width: 1200px) {
                        .mobile-buttons {
                            display: none !important;
                        }
                    }

                    /* Tablet specific adjustments */
                    @media (max-width: 1199px) and (min-width: 768px) {
                        .navbar-collapse {
                            padding: 1.5rem;
                        }
                        
                        .nav-links .nav-link {
                            font-size: 1rem;
                            padding: 0.85rem !important;
                        }
                        
                        .mobile-buttons {
                            flex-direction: column;
                            gap: 1rem;
                            width: calc(100% - 2rem);
                        }
                        
                        .mobile-buttons .appointment-btn {
                            width: 100%;
                        }
                    }

                    /* Mobile specific adjustments */
                    @media (max-width: 767px) {
                        .navbar-collapse {
                            padding: 1rem;
                        }
                        
                        .nav-links .nav-link {
                            font-size: 0.95rem;
                            padding: 0.7rem !important;
                        }
                        
                        .mobile-buttons {
                            gap: 0.75rem;
                            padding: 0 0.5rem;
                        }
                        
                        .appointment-btn {
                            padding: 0.6rem 1rem;
                            font-size: 0.9rem;
                        }
                    }
                `}</style>
            </Navbar>
        </>
    );
};

export default CustomNavbar;