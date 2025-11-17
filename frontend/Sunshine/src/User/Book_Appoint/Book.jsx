import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookAppointment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        serviceType: '',
        appointmentDate: '',
        timeSlot: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Mock data - Replace with API calls
    const serviceTypes = [
        { id: 1, name: 'Individual Therapy', duration: '50 mins', price: '₹1,500' },
        { id: 2, name: 'Couples Counseling', duration: '60 mins', price: '₹2,000' },
        { id: 3, name: 'Family Therapy', duration: '60 mins', price: '₹2,500' },
        { id: 4, name: 'Child Psychology', duration: '45 mins', price: '₹1,800' },
        { id: 5, name: 'Anxiety Treatment', duration: '50 mins', price: '₹1,600' },
        { id: 6, name: 'Depression Counseling', duration: '50 mins', price: '₹1,600' }
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    useEffect(() => {
        // Simulate fetching available slots when date is selected
        if (formData.appointmentDate) {
            // In real app, this would be an API call
            setAvailableSlots(timeSlots);
        }
    }, [formData.appointmentDate]);

    const handleServiceSelect = (service) => {
        setFormData(prev => ({ ...prev, serviceType: service.name }));
        setCurrentStep(2);
    };

    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, appointmentDate: date, timeSlot: '' }));
    };

    const handleTimeSelect = (time) => {
        setFormData(prev => ({ ...prev, timeSlot: time }));
        setCurrentStep(3);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Next day
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
        return maxDate.toISOString().split('T')[0];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isSubmitted) {
        return (
            <div className="appointment-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="success-booking">
                                <div className="success-animation">
                                    <div className="success-icon">✅</div>
                                    <div className="confetti"></div>
                                    <div className="confetti"></div>
                                    <div className="confetti"></div>
                                    <div className="confetti"></div>
                                    <div className="confetti"></div>
                                </div>
                                <h2 className="success-title">Appointment Booked!</h2>
                                <div className="booking-summary-card">
                                    <h4>Booking Confirmation</h4>
                                    <div className="summary-details">
                                        <p><strong>Service:</strong> {formData.serviceType}</p>
                                        <p><strong>Date:</strong> {formatDate(formData.appointmentDate)}</p>
                                        <p><strong>Time:</strong> {formData.timeSlot}</p>
                                        <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                                        <p><strong>Email:</strong> {formData.email}</p>
                                    </div>
                                    <p className="confirmation-message">
                                        We've sent a confirmation email to {formData.email}. 
                                        You'll receive a reminder 24 hours before your appointment.
                                    </p>
                                </div>
                                {/* <button 
                                    className="new-booking-btns"
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setCurrentStep(1);
                                        setFormData({
                                            serviceType: '',
                                            appointmentDate: '',
                                            timeSlot: '',
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            phone: '',
                                            notes: ''
                                        });
                                    }}
                                >
                                    Book Another Appointment    
                                </button> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="appointment-page">
            {/* Animated Background */}
            <div className="appointment-background">
                <div className="floating-heart">❤️</div>
                <div className="floating-mind">🧠</div>
                <div className="floating-calm">😌</div>
                <div className="floating-support">🤝</div>
            </div>

            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        {/* Progress Steps */}
                        <div className="progress-steps">
                            {[1, 2, 3, 4].map(step => (
                                <div key={step} className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                                    <div className="step-circle">
                                        {step < currentStep ? '✓' : step}
                                    </div>
                                    <div className="step-label">
                                        {step === 1 && 'Service'}
                                        {step === 2 && 'Date & Time'}
                                        {step === 3 && 'Details'}
                                        {step === 4 && 'Confirm'}
                                    </div>
                                </div>
                            ))}
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill"
                                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Step 1: Service Selection */}
                        {currentStep === 1 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Choose a Service</h2>
                                <p className="step-subtitle">Select the type of therapy or counseling you're interested in</p>
                                
                                <div className="services-grid">
                                    {serviceTypes.map(service => (
                                        <div 
                                            key={service.id}
                                            className={`service-card ${formData.serviceType === service.name ? 'selected' : ''}`}
                                            onClick={() => handleServiceSelect(service)}
                                        >
                                            {/* <div className="service-icon">💬</div> */}
                                            <h4 className="service-name">{service.name}</h4>
                                            <div className="service-details">
                                                <span className="duration">{service.duration}</span>
                                                <span className="price">{service.price}</span>
                                            </div>
                                            <div className="selection-indicator"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Date & Time Selection */}
                        {currentStep === 2 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Select Date & Time</h2>
                                <p className="step-subtitle">Choose your preferred appointment slot</p>

                                <div className="date-time-selection">
                                    {/* Date Selection */}
                                    <div className="date-section">
                                        <h4>Select Date</h4>
                                        <input
                                            type="date"
                                            min={getMinDate()}
                                            max={getMaxDate()}
                                            value={formData.appointmentDate}
                                            onChange={(e) => handleDateSelect(e.target.value)}
                                            className="date-input"
                                        />
                                    </div>

                                    {/* Time Slots */}
                                    {formData.appointmentDate && (
                                        <div className="time-section animate-fade-in">
                                            <h4>Available Time Slots</h4>
                                            <div className="time-slots-grid">
                                                {availableSlots.map(slot => (
                                                    <div
                                                        key={slot}
                                                        className={`time-slot ${formData.timeSlot === slot ? 'selected' : ''}`}
                                                        onClick={() => handleTimeSelect(slot)}
                                                    >
                                                        {slot}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    className="back-btns"
                                    onClick={() => setCurrentStep(1)}
                                >
                                    ← Back to Services
                                </button>
                            </div>
                        )}

                        {/* Step 3: Personal Details */}
                        {currentStep === 3 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Your Information</h2>
                                <p className="step-subtitle">Please provide your contact details</p>

                                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(4); }} className="details-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input"
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input"
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Additional Notes (Optional)</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="form-textarea"
                                            placeholder="Any specific concerns or preferences..."
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    <div className="form-actions">
                                        <button 
                                            type="button"
                                            className="back-btns"
                                            onClick={() => setCurrentStep(2)}
                                        >
                                            ← Back to Time Selection
                                        </button>
                                        <button 
                                            type="submit"
                                            className="continue-btn"
                                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                                        >
                                            Continue to Summary →
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Confirm Your Appointment</h2>
                                <p className="step-subtitle">Review your booking details before confirming</p>

                                <div className="booking-summary">
                                    <div className="summary-card">
                                        <h4>Appointment Summary</h4>
                                        <div className="summary-details">
                                            <div className="summary-item">
                                                <span className="label">Service:</span>
                                                <span className="value">{formData.serviceType}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="label">Date:</span>
                                                <span className="value">{formatDate(formData.appointmentDate)}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="label">Time:</span>
                                                <span className="value">{formData.timeSlot}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="label">Name:</span>
                                                <span className="value">{formData.firstName} {formData.lastName}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="label">Email:</span>
                                                <span className="value">{formData.email}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="label">Phone:</span>
                                                <span className="value">{formData.phone}</span>
                                            </div>
                                            {formData.notes && (
                                                <div className="summary-item">
                                                    <span className="label">Notes:</span>
                                                    <span className="value">{formData.notes}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="confirmation-actions">
                                        <button 
                                            className="back-btns"
                                            onClick={() => setCurrentStep(3)}
                                        >
                                            ← Edit Details
                                        </button>
                                        <button 
                                            className="confirm-btn"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="loading-spinner"></div>
                                                    Booking...
                                                </>
                                            ) : (
                                                'Confirm Appointment'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .appointment-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .appointment-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-heart, .floating-mind, .floating-calm, .floating-support {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.1;
                    animation: floatGently 8s ease-in-out infinite;
                }

                .floating-heart {
                    top: 15%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .floating-mind {
                    top: 60%;
                    right: 10%;
                    animation-delay: 2s;
                }

                .floating-calm {
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .floating-support {
                    top: 30%;
                    right: 20%;
                    animation-delay: 1s;
                }

                @keyframes floatGently {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    33% {
                        transform: translateY(-15px) rotate(120deg) scale(1.1);
                    }
                    66% {
                        transform: translateY(8px) rotate(240deg) scale(0.9);
                    }
                }

                /* Progress Steps */
                .progress-steps {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    margin-bottom: 3rem;
                    padding: 0 2rem;
                }

                .progress-bar {
                    position: absolute;
                    top: 20px;
                    left: 10%;
                    right: 10%;
                    height: 4px;
                    background: #e9ecef;
                    z-index: 0;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    transition: width 0.5s ease;
                    border-radius: 2px;
                }

                .step {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }

                .step-circle {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    color: #6c757d;
                    transition: all 0.3s ease;
                    border: 3px solid #e9ecef;
                }

                .step.active .step-circle {
                    background: #2a5298;
                    color: white;
                    border-color: #2a5298;
                    transform: scale(1.1);
                    box-shadow: 0 0 0 5px rgba(42, 82, 152, 0.2);
                }

                .step.completed .step-circle {
                    background: #28a745;
                    color: white;
                    border-color: #28a745;
                    animation: bounceIn 0.5s ease;
                }

                .step-label {
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #6c757d;
                    transition: color 0.3s ease;
                }

                .step.active .step-label {
                    color: #2a5298;
                }

                /* Step Container */
                .step-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 1;
                }

                .step-title {
                    color: #2a5298;
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .step-subtitle {
                    color: #6c757d;
                    text-align: center;
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                }

                /* Service Selection */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .service-card {
                    background: #f8f9fa;
                    border: 2px solid #e9ecef;
                    border-radius: 15px;
                    padding: 1.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .service-card:hover {
                    transform: translateY(-5px);
                    border-color: #2a5298;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }

                .service-card.selected {
                    background: linear-gradient(135deg, #2a5298, #1e3c72);
                    color: white;
                    border-color: #2a5298;
                    transform: scale(1.02);
                }

                .service-card.selected .service-name,
                .service-card.selected .service-details span {
                    color: white;
                }

                .service-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .service-name {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #2a5298;
                }

                .service-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .duration {
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                .price {
                    color: #28a745;
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .selection-indicator {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #e9ecef;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }

                .service-card.selected .selection-indicator {
                    background: #ff6b35;
                    border-color: #ff6b35;
                    animation: pulse 2s infinite;
                }

                /* Date & Time Selection */
                .date-time-selection {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .date-section, .time-section {
                    animation: slideUp 0.5s ease-out;
                }

                .date-input {
                    width: 100%;
                    padding: 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                }

                .date-input:focus {
                    outline: none;
                    border-color: #2a5298;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
                }

                .time-slots-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.8rem;
                    margin-top: 1rem;
                }

                .time-slot {
                    padding: 12px;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                    font-weight: 500;
                }

                .time-slot:hover {
                    border-color: #2a5298;
                    transform: translateY(-2px);
                }

                .time-slot.selected {
                    background: #2a5298;
                    color: white;
                    border-color: #2a5298;
                    transform: scale(1.05);
                }

                /* Form Styles */
                .details-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    font-weight: 600;
                    color: #2a5298;
                    margin-bottom: 0.5rem;
                }

                .form-input, .form-textarea {
                    padding: 12px 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                }

                .form-input:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #2a5298;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
                    transform: translateY(-2px);
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                /* Buttons */
                .form-actions, .confirmation-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 2rem;
                }

                .back-btns {
                    background: transparent;
                    border: 2px solid #6c757d;
                    color: #6c757d;
                    padding: 12px 24px;
                    border-radius: 25px;
                    margin-top: 1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .back-btns:hover {
                    background: #2a5298;
                    color: white;
                    transform: translateX(-5px);
                }

                .continue-btn, .confirm-btn {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 12px 30px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                }

                .continue-btn:hover:not(:disabled), .confirm-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
                }

                .continue-btn:disabled, .confirm-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                /* Booking Summary */
                .booking-summary-card, .summary-card {
                    background: #f8f9fa;
                    border-radius: 15px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    border-left: 4px solid #2a5298;
                }

                .summary-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e9ecef;
                }

                .summary-item:last-child {
                    border-bottom: none;
                }

                .label {
                    font-weight: 600;
                    color: #2a5298;
                    min-width: 100px;
                }

                .value {
                    color: #495057;
                    text-align: right;
                    flex: 1;
                }

                /* Success Animation */
                .success-booking {
                    text-align: center;
                    padding: 3rem 2rem;
                }

                .success-animation {
                    position: relative;
                    margin-bottom: 2rem;
                }

                .success-icon {
                    font-size: 4rem;
                    animation: bounceSuccess 1s ease;
                }

                .confetti {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: #ff6b35;
                    border-radius: 50%;
                    animation: confettiFall 2s ease-out forwards;
                }

                .confetti:nth-child(2) { left: 20%; animation-delay: 0.2s; background: #2a5298; }
                .confetti:nth-child(3) { left: 40%; animation-delay: 0.4s; background: #28a745; }
                .confetti:nth-child(4) { left: 60%; animation-delay: 0.6s; background: #ffc107; }
                .confetti:nth-child(5) { left: 80%; animation-delay: 0.8s; background: #dc3545; }

                .success-title {
                    color: #28a745;
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                }

                .confirmation-message {
                    color: #6c757d;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }

                .new-booking-btns {
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                }

                .new-booking-btns:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(42, 82, 152, 0.3);
                }

                /* Loading Spinner */
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                    margin-right: 10px;
                }

                /* Animations */
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in {
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
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
                    }
                    50% {
                        transform: scale(1.1);
                        box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
                    }
                }

                @keyframes bounceSuccess {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0,-30px,0);
                    }
                    70% {
                        transform: translate3d(0,-15px,0);
                    }
                    90% {
                        transform: translate3d(0,-4px,0);
                    }
                }

                @keyframes confettiFall {
                    0% {
                        transform: translateY(-100px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(500px) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .animate-slide-in {
                    animation: slide-in 0.5s ease-out;
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .progress-steps {
                        padding: 0 1rem;
                    }

                    .step-label {
                        font-size: 0.8rem;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .form-actions, .confirmation-actions {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .back-btns, .continue-btn, .confirm-btn {
                        width: 100%;
                        text-align: center;
                    }

                    .step-container {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 576px) {
                    .step-title {
                        font-size: 1.5rem;
                    }

                    .time-slots-grid {
                        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    }
                }
            `}</style>
        </div>
    );
};


export default BookAppointment;