import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comment: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ firstName: '', lastName: '', email: '', comment: '' });
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="hero-content animate-fade-in">
                                <h1 className="hero-title pt-5">Get In Touch</h1>
                                <p className="hero-subtitle">
                                    We're here to help you on your mental wellness journey. Reach out to us and let's start the conversation.
                                </p>
                                <div className="hero-divider"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact Form & Map Section */}
            <section className="contact-main py-5">
                <Container>
                    <Row className="align-items-stretch">
                        {/* Contact Form */}
                        <Col lg={6} className="mb-4">
                            <Card className="contact-form-card animate-slide-left">
                                <Card.Body className="p-5">
                                    <h3 className="form-title mb-4">Send us a Message</h3>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label">First Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control-custom"
                                                        placeholder="Enter your first name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label">Last Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control-custom"
                                                        placeholder="Enter your last name"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">Email Address *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="form-control-custom"
                                                placeholder="Enter your email address"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label">Your Message *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="comment"
                                                value={formData.comment}
                                                onChange={handleChange}
                                                required
                                                className="form-control-custom"
                                                placeholder="Tell us how we can help you..."
                                            />
                                        </Form.Group>
                                        <Button type="submit" className="submit-btns w-100">
                                            Send Message
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Map & Info Section */}
                        <Col lg={6}>
                            <div className="map-info-containers h-100">
                                        {/* Map */}
                                        <div className="map-containers animate-slide-right mb-4">
                                            <div className="map-placeholders">
                                                {/* Interactive OSM iframe that centers on user's location (if allowed) */}
                                                <MapEmbed />
                                            </div>
                                        </div>

                                {/* Contact Info Cards */}
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Card className="info-card animate-bounce-in">
                                            <Card.Body className="text-center">
                                                <div className="info-icon">
                                                    <i className="fas fa-phone"></i>
                                                </div>
                                                <h6>Phone</h6>
                                                <p className="mb-0">+1 (555) 123-4567</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="info-card animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                                            <Card.Body className="text-center">
                                                <div className="info-icon">
                                                    <i className="fas fa-envelope"></i>
                                                </div>
                                                <h6>Email</h6>
                                                <p className="mb-0">hello@sunshine.com</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="info-card animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                                            <Card.Body className="text-center">
                                                <div className="info-icon">
                                                    <i className="fas fa-clock"></i>
                                                </div>
                                                <h6>Hours</h6>
                                                <p className="mb-0">Mon-Fri: 9AM-6PM</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="info-card animate-bounce-in" style={{ animationDelay: '0.6s' }}>
                                            <Card.Body className="text-center">
                                                <div className="info-icon">
                                                    <i className="fas fa-calendar"></i>
                                                </div>
                                                <h6>Appointments</h6>
                                                <p className="mb-0">Available Now</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Additional Image Section */}
            <section className="contact-image-section py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <div className="image-containerss animate-zoom-in">
                                <div className="image-overlayss">
                                    <h3>Your Journey to Wellness Starts Here</h3>
                                    <p>We're committed to providing compassionate care and support for your mental health journey.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <style jsx>{`
                .contact-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                /* Hero Section */
                .contact-hero {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .contact-hero::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                    animation: float 20s linear infinite;
                }

                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-100px) rotate(360deg); }
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .hero-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .hero-divider {
                    width: 100px;
                    height: 4px;
                    background: #ff6b35;
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 0.5s forwards;
                    transform-origin: left;
                }

                /* Animations */
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-out 0.3s forwards;
                }

                .animate-slide-left {
                    opacity: 0;
                    transform: translateX(-50px);
                    animation: slideLeft 1s ease-out 0.5s forwards;
                }

                .animate-slide-right {
                    opacity: 0;
                    transform: translateX(50px);
                    animation: slideRight 1s ease-out 0.5s forwards;
                }

                .animate-bounce-in {
                    opacity: 0;
                    animation: bounceIn 0.8s ease-out forwards;
                }

                .animate-zoom-in {
                    opacity: 0;
                    transform: scale(0.9);
                    animation: zoomIn 1s ease-out 0.7s forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideLeft {
                    from { 
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideRight {
                    from { 
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100px; }
                }

                /* Contact Form */
                .contact-form-card {
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    background: white;
                    border-left: 5px solid #ff6b35;
                }

                .form-title {
                    color: #2a5298;
                    font-weight: 700;
                    font-size: 2rem;
                }

                .form-label {
                    color: #2a5298;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .form-control-custom {
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    padding: 12px 15px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                }

                .form-control-custom:focus {
                    border-color: #ff6b35;
                    box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
                    background: white;
                }

                .submit-btns     {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
                    background: linear-gradient(45deg, #ff8e53, #ff6b35);
                }

                /* Map Container */
                .map-containers {
                    height: 300px;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .map-placeholders {
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #1b3b7bff 100%);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                }

                .map-overlays {
                    text-align: center;
                    z-index: 2;
                    position: relative;
                }

                .map-overlays h5 {
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .map-overlays p {
                    margin-bottom: 0.2rem;
                    opacity: 0.9;
                }

                .map-pin {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 2rem;
                    color: #ff6b35;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.1); }
                    100% { transform: translate(-50%, -50%) scale(1); }
                }

                /* Info Cards */
                .info-card {
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    background: white;
                    border-top: 3px solid #2a5298;
                }

                .info-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                }

                .info-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    color: white;
                    font-size: 1.5rem;
                }

                .info-card h6 {
                    color: #2a5298;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .info-card p {
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                /* Image Section */
                .contact-image-section {
                    {/* background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%); */}
                    
                }

                .image-containerss {
                    height: 300px;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80') center center/cover no-repeat;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }

                .image-overlayss {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(42, 82, 152, 0.9);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-align: center;
                    padding: 2rem;
                }

                .image-overlayss h3 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .image-overlayss p {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    max-width: 600px;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .form-title {
                        font-size: 1.5rem;
                    }

                    .image-overlayss h3 {
                        font-size: 2rem;
                    }

                    .image-overlayss p {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .contact-form-card .card-body {
                        padding: 2rem !important;
                    }
                }

                /* Map iframe + overlay */
                .contact-map-iframe {
                    width: 100%;
                    height: 100%;
                    min-height: 300px;
                    border-radius: 15px;
                    display: block;
                }

                .map-overlay-panel {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: rgba(255, 255, 255, 0.95);
                    color: #1e3c72;
                    padding: 8px 12px;
                    border-radius: 10px;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                    z-index: 5;
                    font-size: 0.95rem;
                }

                .map-overlay-panel small {
                    display: block;
                    color: #6c757d;
                    font-size: 0.85rem;
                    margin-top: 2px;
                }
            `}</style>
        </div>
    );
};

/* Static Google Maps embed for the requested location. */
const MapEmbed = () => {
    const googleSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.3726785965675!2d73.78525631490168!3d20.00120948655889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb1c5ac83451%3A0x7be8c9f8c8c8c8c8!2sCollege%20Road%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <iframe
                title="Sunshine Location"
                src={googleSrc}
                className="contact-map-iframe"
                frameBorder="0"
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
            />

            <div className="map-overlay-panel">
                <strong>Our Location</strong>
                <small>College Road, Nashik, Maharashtra</small>
            </div>
        </div>
    );
};

export default ContactUs;