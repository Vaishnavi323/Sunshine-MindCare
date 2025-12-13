import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Book.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', age: '', gender: '', concerns: '',
        serviceType: '', service_id: '', sub_service_id: '',
        appointmentDate: '', timeSlot: '', appointment_time: '',
        notes: '', alternate_contact_no: ''
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '', lastName: '', email: '', phone: '', age: '', gender: '', concerns: '',
        service_id: '', appointmentDate: '', timeSlot: '', alternate_contact_no: ''
    });

    const [touchedFields, setTouchedFields] = useState({});

    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [serviceError, setServiceError] = useState('');

    const [availableSlots] = useState([
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const concernsList = [
        'Anxiety & Stress', 'Depression', 'Relationship Issues', 'Family Conflicts',
        'Career Guidance', 'Trauma & PTSD', 'Addiction', 'Self-esteem', 'Anger Management', 'Other'
    ];

    // Validation rules
    const validationRules = {
        firstName: {
            required: true,
            pattern: /^[A-Za-z\s]{2,50}$/,
            message: 'First name must be 2-50 letters only'
        },
        lastName: {
            required: true,
            pattern: /^[A-Za-z\s]{2,50}$/,
            message: 'Last name must be 2-50 letters only'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number'
        },
        alternate_contact_no: {
            required: false,
            pattern: /^[0-9]{10}$|^$/,
            message: 'Please enter a valid 10-digit phone number or leave empty'
        },
        age: {
            required: true,
            pattern: /^(?:[1-9][0-9]?|100)$/,
            message: 'Age must be between 1 and 100'
        },
        gender: {
            required: true,
            message: 'Please select your gender'
        },
        concerns: {
            required: false,
            message: 'Please select a primary concern'
        },
        service_id: {
            required: true,
            message: 'Please select a service'
        },
        appointmentDate: {
            required: true,
            message: 'Please select an appointment date'
        },
        timeSlot: {
            required: true,
            message: 'Please select a time slot'
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
        } else if (rules.custom && !rules.custom(value)) {
            error = rules.message;
        }
        
        return error;
    };

    // Validate all fields in current step
    const validateStep = (step) => {
        const errors = {};
        let isValid = true;

        switch(step) {
            case 1:
                const step1Fields = ['firstName', 'lastName', 'email', 'phone', 'age', 'gender', 'concerns'];
                step1Fields.forEach(field => {
                    const error = validateField(field, formData[field]);
                    if (error) {
                        errors[field] = error;
                        isValid = false;
                    }
                });
                // Validate alternate phone if provided
                if (formData.alternate_contact_no) {
                    const altPhoneError = validateField('alternate_contact_no', formData.alternate_contact_no);
                    if (altPhoneError) {
                        errors.alternate_contact_no = altPhoneError;
                        isValid = false;
                    }
                }
                break;
                
            case 2:
                const serviceError = validateField('service_id', formData.service_id);
                if (serviceError) {
                    errors.service_id = serviceError;
                    isValid = false;
                }
                break;
                
            case 3:
                const dateError = validateField('appointmentDate', formData.appointmentDate);
                const timeError = validateField('timeSlot', formData.timeSlot);
                if (dateError) {
                    errors.appointmentDate = dateError;
                    isValid = false;
                }
                if (timeError) {
                    errors.timeSlot = timeError;
                    isValid = false;
                }
                break;
        }

        setFormErrors(prev => ({ ...prev, ...errors }));
        return isValid;
    };

    // Handle field blur
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        const error = validateField(name, formData[name]);
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle input change with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Clean input based on field type
        let cleanedValue = value;
        if (name === 'firstName' || name === 'lastName') {
            // Only allow letters and spaces
            cleanedValue = value.replace(/[^A-Za-z\s]/g, '');
        } else if (name === 'phone' || name === 'alternate_contact_no') {
            // Only allow numbers
            cleanedValue = value.replace(/\D/g, '');
        } else if (name === 'age') {
            // Only allow numbers 1-100
            const num = parseInt(value);
            if (isNaN(num) || num < 1) cleanedValue = '';
            else if (num > 100) cleanedValue = '100';
        }

        setFormData(prev => ({ ...prev, [name]: cleanedValue }));
        
        // Validate on change if field has been touched
        if (touchedFields[name]) {
            const error = validateField(name, cleanedValue);
            setFormErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Fetch Services from API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoadingServices(true);
                const response = await axios.get(`${backendUrl}/service/list`);

                if (response.data.status === true) {
                    const data = response.data.error;
                    if (Array.isArray(data)) {
                        setServices(data);
                    } else if (data && data.id) {
                        setServices([data]);
                    } else {
                        setServices([]);
                    }
                }
            } catch (err) {
                console.error("Service fetch error:", err);
                setServiceError("Failed to load services. Using demo mode.");
            } finally {
                setLoadingServices(false);
            }
        };
        fetchServices();
    }, [backendUrl]);

    const goToNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Show error message for invalid step
            Swal.fire({
                icon: 'warning',
                title: 'Please fix the errors',
                text: 'Please fill in all required fields correctly before proceeding.',
                confirmButtonText: 'OK'
            });
        }
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleConcernSelect = (concern) => {
        setFormData(prev => ({ ...prev, concerns: concern }));
        // Clear error when concern is selected
        setFormErrors(prev => ({ ...prev, concerns: '' }));
    };

    const handleServiceSelect = (service) => {
        setFormData(prev => ({
            ...prev,
            serviceType: service.title,
            service_id: service.id,
            sub_service_id: ''
        }));
        // Clear error when service is selected
        setFormErrors(prev => ({ ...prev, service_id: '' }));
    };

    const handleSubServiceSelect = (subService) => {
        setFormData(prev => ({
            ...prev,
            serviceType: subService.title || subService.name,
            sub_service_id: subService.id
        }));
    };

    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, appointmentDate: date, timeSlot: '' }));
        // Clear date error when date is selected
        setFormErrors(prev => ({ ...prev, appointmentDate: '' }));
    };

    const handleTimeSelect = (time) => {
        const time24 = convertTo24Hour(time);
        setFormData(prev => ({ ...prev, timeSlot: time, appointment_time: time24 }));
        // Clear time error when time is selected
        setFormErrors(prev => ({ ...prev, timeSlot: '' }));
    };

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    };

    const submitAppointmentToAPI = async () => {
        const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            contact_no: formData.phone,
            alternate_contact_no: formData.alternate_contact_no || formData.phone,
            service_id: formData.service_id || "1",
            sub_service_id: formData.sub_service_id || "1",
            appointment_date: formData.appointmentDate,
            appointment_time: formData.appointment_time,
            message: formData.notes || `Concern: ${formData.concerns}`
        };

        const response = await axios.post(`${backendUrl}/appointment/add`, payload);
        return response.data;
    };

    const handleSubmit = async () => {
        // Final validation before submission
        if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
            await Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fix all validation errors before submitting.',
                confirmButtonText: 'OK'
            });
            return;
        }

        setIsSubmitting(true);
        
        try {
            const result = await submitAppointmentToAPI();

            // API response mein "success: true" hai, "status" nahi
            if (result.success === true) {
                
                // SweetAlert show karo aur button click ka wait karo
                const swalResult = await Swal.fire({
                    icon: 'success',
                    title: 'Appointment Booked Successfully!',
                    html: `
                        <div style="text-align: center; padding: 10px;">
                            <strong style="font-size: 1.2rem;">${formData.firstName} ${formData.lastName}</strong><br/><br/>
                            <div style="font-size: 1rem; margin: 10px 0;">
                                📅 ${formatDate(formData.appointmentDate)}<br/>
                                🕐 ${formData.timeSlot}
                            </div>
                            <br/>
                            <small style="color: #666;">We will contact you shortly on your phone/email.</small>
                        </div>
                    `,
                    confirmButtonText: 'Go Home',
                    confirmButtonColor: '#4CAF50',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });

                // Jab user "Go Home" click karega tab hi navigate hoga
                if (swalResult.isConfirmed) {
                    navigate('/');
                }
            } else {
                // Agar success false hai toh error show karo
                await Swal.fire({
                    icon: 'warning',
                    title: 'Unexpected Response',
                    text: result.message || 'Appointment may not have been booked. Please check with support.',
                    confirmButtonText: 'OK'
                });
            }

        } catch (err) {
            console.error("Appointment booking error:", err);
            await Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: err.response?.data?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#f44336'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Check if step is valid (for button disable state)
    const isStep1Valid = () => {
        const fields = ['firstName', 'lastName', 'email', 'phone', 'age', 'gender', 'concerns'];
        return fields.every(field => !formErrors[field] && formData[field]);
    };

    const isStep2Valid = () => !formErrors.service_id && formData.service_id;
    const isStep3Valid = () => !formErrors.appointmentDate && !formErrors.timeSlot && formData.appointmentDate && formData.timeSlot;

    return (
        <div className="appointment-page">
            <div className="appointment-background">
                <div className="floating-heart">Heart</div>
                <div className="floating-mind">Brain</div>
                <div className="floating-calm">Calm</div>
                <div className="floating-support">Support</div>
            </div>

            <Container>
                <Row className="justify-content-center pt-5">
                    <Col lg={8} xl={6}>

                        {/* Progress Bar */}
                        <div className="progress-steps">
                            {[1, 2, 3, 4].map(step => (
                                <div key={step} className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                                    <div className="step-circle">{step < currentStep ? '' : step}</div>
                                    <div className="step-label">
                                        {step === 1 && 'Basic Details'}
                                        {step === 2 && 'Service'}
                                        {step === 3 && 'Date & Time'}
                                        {step === 4 && 'Summary'}
                                    </div>
                                </div>
                            ))}
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${(currentStep - 1) * 33.33}%` }}></div>
                            </div>
                        </div>

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Tell Us About Yourself</h2>
                                <p className="step-subtitle">We'll match you with the right specialist</p>
                                <form className="details-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>First Name *</label>
                                            <input 
                                                type="text" 
                                                name="firstName" 
                                                value={formData.firstName} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                                                placeholder="First name" 
                                            />
                                            {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name *</label>
                                            <input 
                                                type="text" 
                                                name="lastName" 
                                                value={formData.lastName} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                                                placeholder="Last name" 
                                            />
                                            {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                value={formData.email} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.email ? 'error' : ''}`}
                                                placeholder="Email" 
                                            />
                                            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Phone *</label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                value={formData.phone} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.phone ? 'error' : ''}`}
                                                placeholder="10-digit number"
                                                maxLength="10"
                                            />
                                            {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Alternate Phone</label>
                                            <input 
                                                type="tel" 
                                                name="alternate_contact_no" 
                                                value={formData.alternate_contact_no} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.alternate_contact_no ? 'error' : ''}`}
                                                placeholder="Optional - 10-digit number"
                                                maxLength="10"
                                            />
                                            {formErrors.alternate_contact_no && <span className="error-message">{formErrors.alternate_contact_no}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Age *</label>
                                            <input 
                                                type="number" 
                                                name="age" 
                                                value={formData.age} 
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`form-input ${formErrors.age ? 'error' : ''}`}
                                                min="1" 
                                                max="100" 
                                                placeholder="1-100"
                                            />
                                            {formErrors.age && <span className="error-message">{formErrors.age}</span>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Gender *</label>
                                        <select 
                                            name="gender" 
                                            value={formData.gender} 
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            className={`form-input ${formErrors.gender ? 'error' : ''}`}
                                        >
                                            <option value="">Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                            <option>Prefer not to say</option>
                                        </select>
                                        {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Primary Concern</label>
                                        {formErrors.concerns && <span className="error-message">{formErrors.concerns}</span>}
                                        <div className="concerns-grid">
                                            {concernsList.map(c => (
                                                <div key={c} className={`concern-card ${formData.concerns === c ? 'selected' : ''}`} onClick={() => handleConcernSelect(c)}>
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button type="button" className="continue-btn" onClick={goToNextStep} disabled={!isStep1Valid()}>
                                            Continue to Services
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 2: Services from API */}
                        {currentStep === 2 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Choose a Service</h2>
                                <p className="step-subtitle">Select your therapy type</p>

                                {formErrors.service_id && <span className="error-message">{formErrors.service_id}</span>}

                                {loadingServices && <p>Loading services...</p>}
                                {serviceError && <p style={{color: 'red'}}>{serviceError}</p>}

                                {!loadingServices && services.length === 0 && <p>No services available.</p>}

                                <div className="services-grid">
                                    {services.map(service => (
                                        <div key={service.id}>
                                            <div
                                                className={`service-card ${formData.service_id === service.id ? 'selected' : ''}`}
                                                onClick={() => handleServiceSelect(service)}
                                            >
                                                <h4 className="service-name">{service.title}</h4>
                                                <p style={{fontSize: '0.9rem', color: '#666', margin: '8px 0'}}>
                                                    {service.description?.substring(0, 120)}...
                                                </p>
                                            </div>

                                            {formData.service_id === service.id && service.sub_services?.length > 0 && (
                                                <div style={{marginLeft: '20px', marginTop: '10px'}}>
                                                    {service.sub_services.map(sub => (
                                                        <div
                                                            key={sub.id}
                                                            className={`service-card sub-service ${formData.sub_service_id === sub.id ? 'selected' : ''}`}
                                                            onClick={() => handleSubServiceSelect(sub)}
                                                        >
                                                            {sub.title || sub.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="form-actions">
                                    <button className="back-btn" onClick={goToPreviousStep}>Back</button>
                                    <button className="continue-btn" onClick={goToNextStep} disabled={!isStep2Valid()}>
                                        Choose Date & Time
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Date & Time */}
                        {currentStep === 3 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Select Date & Time</h2>
                                <p className="step-subtitle">Pick your preferred slot</p>
                                <div className="date-time-selection">
                                    <div className="date-section">
                                        <h4>Date</h4>
                                        {formErrors.appointmentDate && <span className="error-message">{formErrors.appointmentDate}</span>}
                                        <input 
                                            type="date" 
                                            min={getMinDate()} 
                                            max={getMaxDate()} 
                                            value={formData.appointmentDate} 
                                            onChange={(e) => handleDateSelect(e.target.value)}
                                            className={`date-input ${formErrors.appointmentDate ? 'error' : ''}`}
                                        />
                                    </div>
                                    {formData.appointmentDate && (
                                        <div className="time-section animate-fade-in">
                                            <h4>Time Slots</h4>
                                            {formErrors.timeSlot && <span className="error-message">{formErrors.timeSlot}</span>}
                                            <div className="time-slots-grid">
                                                {availableSlots.map(slot => (
                                                    <div key={slot} className={`time-slot ${formData.timeSlot === slot ? 'selected' : ''}`} onClick={() => handleTimeSelect(slot)}>
                                                        {slot}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="form-actions">
                                    <button className="back-btn" onClick={goToPreviousStep}>Back</button>
                                    <button className="continue-btn" onClick={goToNextStep} disabled={!isStep3Valid()}>
                                        Review Summary
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Summary & Confirm - UPDATED */}
                        {currentStep === 4 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Confirm Appointment</h2>
                                <p className="step-subtitle">Review your details</p>
                                <div className="booking-summary">
                                    <div className="summary-card">
                                        <h4>Summary</h4>
                                        <div className="summary-item"><span>Name:</span> {formData.firstName} {formData.lastName}</div>
                                        <div className="summary-item"><span>Email:</span> {formData.email}</div>
                                        <div className="summary-item"><span>Phone:</span> {formData.phone}</div>
                                        {formData.alternate_contact_no && (
                                            <div className="summary-item"><span>Alternate Phone:</span> {formData.alternate_contact_no}</div>
                                        )}
                                        <div className="summary-item"><span>Service:</span> {formData.serviceType}</div>
                                        <div className="summary-item"><span>Date & Time:</span> {formatDate(formData.appointmentDate)} at {formData.timeSlot}</div>
                                        <div className="summary-item"><span>Concern:</span> {formData.concerns}</div>
                                    </div>
                                    <div className="additional-notes">
                                        <label>Notes (Optional)</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="form-textarea" rows="3" placeholder="Anything else?"></textarea>
                                    </div>
                                    <div className="confirmation-actions">
                                        <button className="back-btn" onClick={goToPreviousStep}>Back</button>
                                        <button className="confirm-btn" onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit Appointment'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BookAppointment;