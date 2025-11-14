import React from 'react';
import '../../styles/Navbar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../assets/Sunshine_logo.webp';

const CustomNavbar = () => {
    return (

        <>
        
        <Navbar expand="lg" className="custom-navbar" fixed="top">
            <Container fluid className="px-4">
                {/* Left side - Logo and email */}
                <div className="d-flex align-items-center gap-3">
                    <Navbar.Brand href="#" className="d-flex align-items-center">
                        <img src={logoImage} alt="Sunshine Logo" className="navbar-logo" />
                    </Navbar.Brand>
                    {/* <div className="vr custom-vr d-none d-lg-block"></div>
                    <div className="d-none d-lg-block">
                        <small className="email-text">sales@spyromechind</small>
                    </div> */}
                </div>

                {/* Center - Navigation links */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="mx-auto nav-links">
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Home</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">About Us</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Services</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Team</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Events</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Blogs</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Career</Nav.Link>
                        <Nav.Link href="#" className="mx-2 fw-medium nav-link-custom">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {/* Right side - Search and Make Appointment Button */}
                <div className="d-none d-lg-flex align-items-center gap-3">
                    <div className="search-container">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search..."
                        />
                        <button className="search-btn" title="Search">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <button className="appointment-btn">Make Appointment</button>
                </div>
            </Container>            
        </Navbar>
        </>
    );
};

export default CustomNavbar;