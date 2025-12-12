

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroBannerImage from '../../assets/a1.jpg';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comment: ''
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comment: ''
    });

    const [touchedFields, setTouchedFields] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    // Validation rules
    const validationRules = {
        firstName: {
            required: true,
            pattern: /^[A-Za-z\s]{2,30}$/,
            message: 'First name must be 2-30 letters only'
        },
        lastName: {
            required: true,
            pattern: /^[A-Za-z\s]{2,30}$/,
            message: 'Last name must be 2-30 letters only'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        comment: {
            required: true,
            minLength: 10,
            maxLength: 500,
            message: 'Message must be 10-500 characters'
        }
    };

    // Validate a single field
    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (!rules) return '';
        
        let error = '';
        
        if (rules.required && (!value || value.trim() === '')) {
            error = 'This field is required';
        } else if (rules.pattern && !rules.pattern.test(value)) {
            error = rules.message;
        } else if (rules.minLength && value.length < rules.minLength) {
            error = rules.message;
        } else if (rules.maxLength && value.length > rules.maxLength) {
            error = rules.message;
        }
        
        return error;
    };

    // Validate all fields
    const validateForm = () => {
        const errors = {};
        let isValid = true;

        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                errors[field] = error;
                isValid = false;
            }
        });

        setFormErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clean input based on field type
        let cleanedValue = value;
        if (name === 'firstName' || name === 'lastName') {
            // Only allow letters and spaces
            cleanedValue = value.replace(/[^A-Za-z\s]/g, '');
        }

        setFormData({
            ...formData,
            [name]: cleanedValue
        });

        // Validate on change if field has been touched
        if (touchedFields[name]) {
            const error = validateField(name, cleanedValue);
            setFormErrors(prev => ({ ...prev, [name]: error }));
        }

        if (alert.show) setAlert({ ...alert, show: false });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateField(name, formData[name]);
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    const isFormValid = () => {
        return !formErrors.firstName && !formErrors.lastName && !formErrors.email && !formErrors.comment &&
            formData.firstName && formData.lastName && formData.email && formData.comment &&
            formData.comment.length >= 10 && formData.comment.length <= 500;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            // Mark all fields as touched to show errors
            setTouchedFields({
                firstName: true,
                lastName: true,
                email: true,
                comment: true
            });
            
            // Show validation error alert
            setAlert({
                show: true,
                variant: 'warning',
                message: 'Please fix the validation errors before submitting.'
            });
            return;
        }

        setLoading(true);
        setAlert({ show: false });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/contact/add`,
                {
                    first_name: formData.firstName.trim(),
                    last_name: formData.lastName.trim(),
                    email: formData.email.trim(),
                    message: formData.comment.trim()
                }
            );

            if (response.data.status === true) {
                setAlert({
                    show: true,
                    variant: 'success',
                    message: 'Thank you for your message! We will get back to you soon.'
                });
                setFormData({ firstName: '', lastName: '', email: '', comment: '' });
                // Clear errors and touched fields on success
                setFormErrors({ firstName: '', lastName: '', email: '', comment: '' });
                setTouchedFields({});
            } else {
                throw new Error(response.data.message || 'Failed to send message');
            }
        } catch (error) {
            setAlert({
                show: true,
                variant: 'danger',
                message: error.response?.data?.message || 'Failed to send message. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
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

                                    {alert.show && (
                                        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                                            {alert.message}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit} noValidate>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label">First Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!formErrors.firstName && touchedFields.firstName}
                                                        className="form-control-custom"
                                                        placeholder="Enter your first name"
                                                        disabled={loading}
                                                        maxLength="30"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.firstName}
                                                    </Form.Control.Feedback>
                                                    {touchedFields.firstName && !formErrors.firstName && (
                                                        <Form.Text className="text-success">
                                                            ✓ Valid
                                                        </Form.Text>
                                                    )}
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
                                                        onBlur={handleBlur}
                                                        isInvalid={!!formErrors.lastName && touchedFields.lastName}
                                                        className="form-control-custom"
                                                        placeholder="Enter your last name"
                                                        disabled={loading}
                                                        maxLength="30"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.lastName}
                                                    </Form.Control.Feedback>
                                                    {touchedFields.lastName && !formErrors.lastName && (
                                                        <Form.Text className="text-success">
                                                            ✓ Valid
                                                        </Form.Text>
                                                    )}
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
                                                onBlur={handleBlur}
                                                isInvalid={!!formErrors.email && touchedFields.email}
                                                className="form-control-custom"
                                                placeholder="Enter your email address"
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors.email}
                                            </Form.Control.Feedback>
                                            {touchedFields.email && !formErrors.email && (
                                                <Form.Text className="text-success">
                                                    ✓ Valid email format
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label">Your Message *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                name="comment"
                                                value={formData.comment}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={!!formErrors.comment && touchedFields.comment}
                                                className="form-control-custom"
                                                placeholder="Tell us how we can help you..."
                                                disabled={loading}
                                                maxLength="500"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formErrors.comment}
                                            </Form.Control.Feedback>
                                            <div className={`character-count ${formData.comment.length > 0 ? 'd-block' : 'd-none'} mt-2`}>
                                                <small className={formData.comment.length < 10 ? 'text-danger' : formData.comment.length > 450 ? 'text-warning' : 'text-muted'}>
                                                    {formData.comment.length}/500 characters
                                                    {formData.comment.length < 10 && ` (Minimum 10 characters required)`}
                                                    {formData.comment.length >= 10 && formData.comment.length <= 500 && ` ✓`}
                                                </small>
                                            </div>
                                        </Form.Group>

                                        <Button 
                                            type="submit" 
                                            className="submit-btns w-100" 
                                            disabled={loading || !isFormValid()}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Map & Info Section */}
                        <Col lg={6}>
                            <div className="map-info-containers h-100">
                                <div className="map-containers animate-slide-right mb-4">
                                    <div className="map-placeholders">
                                        <MapEmbed />
                                    </div>
                                </div>

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
                                                <p className="mb-0">Mon-Sat: 9AM-6PM</p>
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

            {/* Bottom Image Section */}
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

            {/* === ALL YOUR ORIGINAL STYLES (with minor additions) === */}
            <style jsx>{`
                .contact-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }
                .contact-hero {
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.91) 0%, rgba(0, 0, 0, 0.75) 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }
                .contact-hero::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: url(${heroBannerImage});
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    opacity: 0.2;
                }
                .hero-title { font-size: 3.5rem; font-weight: 700; margin-bottom: 1rem; }
                .hero-subtitle { font-size: 1.2rem; opacity: 0.9; margin-bottom: 2rem; }
                .hero-divider { width: 100px; height: 4px; background: #ff6b35; margin: 0 auto; border-radius: 2px; animation: expandWidth 1s ease-out 0.5s forwards; transform-origin: left; }
                .animate-fade-in { opacity: 0; animation: fadeIn 1s ease-out 0.3s forwards; }
                .animate-slide-left { opacity: 0; transform: translateX(-50px); animation: slideLeft 1s ease-out 0.5s forwards; }
                .animate-slide-right { opacity: 0; transform: translateX(50px); animation: slideRight 1s ease-out 0.5s forwards; }
                .animate-bounce-in { opacity: 0; animation: bounceIn 0.8s ease-out forwards; }
                .animate-zoom-in { opacity: 0; transform: scale(0.9); animation: zoomIn 1s ease-out 0.7s forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes slideRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                @keyframes expandWidth { from { width: 0; } to { width: 100px; } }

                .contact-form-card { border: none; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); background: white; border-left: 5px solid #ff6b35; }
                .form-title { color: #2a5298; font-weight: 700; font-size: 2rem; }
                .form-label { color: #2a5298; font-weight: 600; margin-bottom: 0.5rem; }
                .form-control-custom { border: 2px solid #e9ecef; border-radius: 10px; padding: 12px 15px; font-size: 1rem; transition: all 0.3s ease; background: #f8f9fa; }
                .form-control-custom:focus { border-color: #ff6b35; box-shadow: 0 0 0 0.2rem rgba(255,107,53,0.25); background: white; }
                .form-control-custom.is-invalid { border-color: #dc3545; }
                .form-control-custom.is-invalid:focus { border-color: #dc3545; box-shadow: 0 0 0 0.2rem rgba(220,53,69,0.25); }
                .submit-btns { background: linear-gradient(45deg, #ff6b35, #ff8e53); border: none; padding: 15px 30px; font-size: 1.1rem; font-weight: 600; border-radius: 50px; color: white; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(255,107,53,0.3); }
                .submit-btns:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,107,53,0.4); background: linear-gradient(45deg, #ff8e53, #ff6b35); }
                .submit-btns:disabled { background: #ccc; cursor: not-allowed; transform: none; box-shadow: none; }

                .character-count {
                    font-size: 0.85rem;
                    display: block;
                    margin-top: 0.5rem;
                }

                .map-containers { height: 300px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .map-placeholders { height: 100%; position: relative; }
                .contact-map-iframe { width: 100%; height: 100%; border: 0; border-radius: 15px; }
                .map-overlay-panel { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.95); color: #1e3c72; padding: 8px 12px; border-radius: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.12); z-index: 5; font-size: 0.95rem; }
                .map-overlay-panel small { display: block; color: #6c757d; font-size: 0.85rem; margin-top: 2px; }

                .info-card { border: none; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: all 0.3s ease; background: white; border-top: 3px solid #2a5298; }
                .info-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
                .info-icon { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #2a5298, #1e3c72); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 1.5rem; }

                .image-containerss { height: 300px; border-radius: 20px; overflow: hidden; position: relative; background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80') center center/cover no-repeat; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
                .image-overlayss { position: absolute; inset: 0; background: rgba(42,82,152,0.9); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem; }
                .image-overlayss h3 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
                .image-overlayss p { font-size: 1.2rem; opacity: 0.9; max-width: 600px; }

                @media (max-width: 768px) {
                    .hero-title { font-size: 2.5rem; }
                    .form-title { font-size: 1.5rem; }
                    .image-overlayss h3 { font-size: 2rem; }
                }
                @media (max-width: 576px) {
                    .hero-title { font-size: 2rem; }
                    .contact-form-card .card-body { padding: 2rem !important; }
                }
            `}</style>
        </div>
    );
};

/* Google Maps Embed */
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
            />
            <div className="map-overlay-panel">
                <strong>Our Location</strong>
                <small>College Road, Nashik, Maharashtra</small>
            </div>
        </div>
    );
};

export default ContactUs;