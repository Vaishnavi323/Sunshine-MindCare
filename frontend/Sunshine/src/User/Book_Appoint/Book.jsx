// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import './Book.css';
// import { Link, Navigate } from 'react-router-dom';

// const BookAppointment = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState({
//         // Step 1: Basic Details
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         age: '',
//         gender: '',
//         concerns: '',
        
//         // Step 2: Service Selection
//         serviceType: '',
        
//         // Step 3: Date & Time
//         appointmentDate: '',
//         timeSlot: '',
        
//         // Additional
//         notes: ''
//     });
//     const [availableSlots, setAvailableSlots] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [appointments, setAppointments] = useState([]);

//     // Mock data - Replace with API calls
//     const serviceTypes = [
//         { id: 1, name: 'Individual Therapy', duration: '50 mins', price: '₹1,500' },
//         { id: 2, name: 'Couples Counseling', duration: '60 mins', price: '₹2,000' },
//         { id: 3, name: 'Family Therapy', duration: '60 mins', price: '₹2,500' },
//         { id: 4, name: 'Child Psychology', duration: '45 mins', price: '₹1,800' },
//         { id: 5, name: 'Anxiety Treatment', duration: '50 mins', price: '₹1,600' },
//         { id: 6, name: 'Depression Counseling', duration: '50 mins', price: '₹1,600' }
//     ];

//     const timeSlots = [
//         '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
//         '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
//         '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
//     ];

//     const concernsList = [
//         'Anxiety & Stress',
//         'Depression',
//         'Relationship Issues',
//         'Family Conflicts',
//         'Career Guidance',
//         'Trauma & PTSD',
//         'Addiction',
//         'Self-esteem',
//         'Anger Management',
//         'Other'
//     ];

//     useEffect(() => {
//         // Simulate fetching available slots when date is selected
//         if (formData.appointmentDate) {
//             setAvailableSlots(timeSlots);
//         }
//     }, [formData.appointmentDate]);

//     // Load saved appointments from localStorage
//     useEffect(() => {
//         try {
//             const raw = localStorage.getItem('sunshine_appointments')
//             if (raw) setAppointments(JSON.parse(raw))
//         } catch (err) {
//             console.warn('Failed to load appointments', err)
//         }
//     }, [])

//     // Navigation handlers
//     const goToNextStep = () => {
//         setCurrentStep(prev => prev + 1);
//     };

//     const goToPreviousStep = () => {
//         setCurrentStep(prev => prev - 1);
//     };

//     // Step 1: Basic Details handlers
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleConcernSelect = (concern) => {
//         setFormData(prev => ({ ...prev, concerns: concern }));
//     };

//     // Step 2: Service Selection handlers
//     const handleServiceSelect = (service) => {
//         setFormData(prev => ({ ...prev, serviceType: service.name }));
//     };

//     // Step 3: Date & Time handlers
//     const handleDateSelect = (date) => {
//         setFormData(prev => ({ ...prev, appointmentDate: date, timeSlot: '' }));
//     };

//     const handleTimeSelect = (time) => {
//         setFormData(prev => ({ ...prev, timeSlot: time }));
//     };

//     // Form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         // Save to localStorage (mock persistence)
//         let savedId = null;
//         try {
//             const existing = JSON.parse(localStorage.getItem('sunshine_appointments') || '[]');
//             const newAppt = { id: Date.now(), createdAt: new Date().toISOString(), ...formData }
//             existing.push(newAppt)
//             localStorage.setItem('sunshine_appointments', JSON.stringify(existing))
//             setAppointments(existing)
//             savedId = newAppt.id;
//         } catch (err) {
//             console.warn('Failed to save appointment', err)
//         }

//         setIsSubmitting(false);
//         setIsSubmitted(true);

//         // Show SweetAlert confirmation to the user
//         try {
//             await Swal.fire({
//                 icon: 'success',
//                 title: 'Appointment Confirmed',
//                 html: `<strong>${formData.firstName} ${formData.lastName}</strong><br/>${formatDate(formData.appointmentDate)} at ${formData.timeSlot}<br/><small>Reference: ${savedId || Date.now()}</small>`,
//                 confirmButtonText: 'OK'
//             });
//             if(true){       
//             return <Navigate to="/" />; 
//             }    
//         } catch (err) {
//             // If Swal fails (unlikely), just log and continue
//             console.warn('SweetAlert failed', err);
//         }
//     };

//     // Rescheduling/cancel removed intentionally: users can only book appointments

//     // Download or copy confirmation helpers
//     const buildConfirmationText = (data) => {
//         return `Booking Confirmation\n\nPatient: ${data.firstName} ${data.lastName}\nAge: ${data.age}\nGender: ${data.gender}\nConcern: ${data.concerns}\nService: ${data.serviceType}\nDate: ${data.appointmentDate}\nTime: ${data.timeSlot}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nReference: ${data.id}`;
//     }

//     const handleDownloadConfirmation = () => {
//         try {
//             const filename = `Sunshine_Booking_${formData.firstName || 'guest'}_${formData.appointmentDate || ''}.txt`;
//             const content = buildConfirmationText({ ...formData, id: Date.now() });
//             const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = filename;
//             document.body.appendChild(a);
//             a.click();
//             a.remove();
//             URL.revokeObjectURL(url);
//         } catch (err) {
//             console.warn('Download failed', err);
//         }
//     }

//     const handleCopyDetails = async () => {
//         try {
//             const content = buildConfirmationText({ ...formData, id: Date.now() });
//             await navigator.clipboard.writeText(content);
//             alert('Booking details copied to clipboard');
//         } catch (err) {
//             console.warn('Copy failed', err);
//             alert('Unable to copy details');
//         }
//     }

//     const getMinDate = () => {
//         const today = new Date();
//         today.setDate(today.getDate() + 1); // Next day
//         return today.toISOString().split('T')[0];
//     };

//     const getMaxDate = () => {
//         const maxDate = new Date();
//         maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
//         return maxDate.toISOString().split('T')[0];
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Validation functions
//     const isStep1Valid = () => {
//         return formData.firstName && 
//                formData.lastName && 
//                formData.email && 
//                formData.phone && 
//                formData.age && 
//                formData.gender && 
//                formData.concerns;
//     };

//     const isStep2Valid = () => {
//         return formData.serviceType;
//     };

//     const isStep3Valid = () => {
//         return formData.appointmentDate && formData.timeSlot;
//     };



//     return (
//         <div className="appointment-page">
//             {/* Animated Background */}
//             <div className="appointment-background">
//                 <div className="floating-heart">❤️</div>
//                 <div className="floating-mind">🧠</div>
//                 <div className="floating-calm">😌</div>
//                 <div className="floating-support">🤝</div>
//             </div>

//             <Container>
//                 <Row className="justify-content-center pt-5">
//                     <Col lg={8} xl={6}>

//                         {/* Progress Steps */}
//                         <div className="progress-steps">
//                             {[1, 2, 3, 4].map(step => (
//                                 <div key={step} className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
//                                     <div className="step-circle">
//                                         {step < currentStep ? '✓' : step}
//                                     </div>
//                                     <div className="step-label">
//                                         {step === 1 && 'Basic Details'}
//                                         {step === 2 && 'Service'}
//                                         {step === 3 && 'Date & Time'}
//                                         {step === 4 && 'Summary'}
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="progress-bar">
//                                 <div 
//                                     className="progress-fill"
//                                     style={{ width: `${(currentStep - 1) * 33.33}%` }}
//                                 ></div>
//                             </div>
//                         </div>

//                         {/* Step 1: Basic Details */}
//                         {currentStep === 1 && (
//                             <div className="step-container animate-slide-in">
//                                 <h2 className="step-title">Tell Us About Yourself</h2>
//                                 <p className="step-subtitle">We'll use this information to match you with the right specialist</p>
                                
//                                 <form className="details-form">
//                                     <div className="form-row">
//                                         <div className="form-group">
//                                             <label>First Name *</label>
//                                             <input
//                                                 type="text"
//                                                 name="firstName"
//                                                 value={formData.firstName}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                                 placeholder="Enter your first name"
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Last Name *</label>
//                                             <input
//                                                 type="text"
//                                                 name="lastName"
//                                                 value={formData.lastName}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                                 placeholder="Enter your last name"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="form-row">
//                                         <div className="form-group">
//                                             <label>Email Address *</label>
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 value={formData.email}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                                 placeholder="Enter your email"
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Phone Number *</label>
//                                             <input
//                                                 type="tel"
//                                                 name="phone"
//                                                 value={formData.phone}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                                 placeholder="Enter your phone number"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="form-row">
//                                         <div className="form-group">
//                                             <label>Age *</label>
//                                             <input
//                                                 type="number"
//                                                 name="age"
//                                                 value={formData.age}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                                 placeholder="Your age"
//                                                 min="1"
//                                                 max="100"
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Gender *</label>
//                                             <select
//                                                 name="gender"
//                                                 value={formData.gender}
//                                                 onChange={handleInputChange}
//                                                 required
//                                                 className="form-input"
//                                             >
//                                                 <option value="">Select Gender</option>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                                 <option value="Other">Other</option>
//                                                 <option value="Prefer not to say">Prefer not to say</option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     <div className="form-group">
//                                         <label>Primary Concern *</label>
//                                         <div className="concerns-grid">
//                                             {concernsList.map(concern => (
//                                                 <div
//                                                     key={concern}
//                                                     className={`concern-card ${formData.concerns === concern ? 'selected' : ''}`}
//                                                     onClick={() => handleConcernSelect(concern)}
//                                                 >
//                                                     {concern}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="form-actions">
//                                         <button 
//                                             type="button"
//                                             className="continue-btn"
//                                             onClick={goToNextStep}
//                                             disabled={!isStep1Valid()}
//                                         >
//                                             Continue to Services →
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         )}

//                         {/* Step 2: Service Selection */}
//                         {currentStep === 2 && (
//                             <div className="step-container animate-slide-in">
//                                 <h2 className="step-title">Choose a Service</h2>
//                                 <p className="step-subtitle">Select the type of therapy or counseling that matches your needs</p>
                                
//                                 <div className="services-grid">
//                                     {serviceTypes.map(service => (
//                                         <div 
//                                             key={service.id}
//                                             className={`service-card ${formData.serviceType === service.name ? 'selected' : ''}`}
//                                             onClick={() => handleServiceSelect(service)}
//                                         >
//                                             <h4 className="service-name">{service.name}</h4>
//                                             <div className="service-details">
//                                                 <span className="duration">{service.duration}</span>
//                                                 {/* <span className="price">{service.price}</span> */}
//                                             </div>
//                                             <div className="selection-indicator"></div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="form-actions">
//                                     <button 
//                                         className="back-btn"
//                                         onClick={goToPreviousStep}
//                                     >
//                                         ← Back to Details
//                                     </button>
//                                     <button 
//                                         className="continue-btn"
//                                         onClick={goToNextStep}
//                                         disabled={!isStep2Valid()}
//                                     >
//                                         Choose Date & Time →
//                                     </button>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Step 3: Date & Time Selection */}
//                         {currentStep === 3 && (
//                             <div className="step-container animate-slide-in">
//                                 <h2 className="step-title">Select Date & Time</h2>
//                                 <p className="step-subtitle">Choose your preferred appointment slot</p>

//                                 <div className="date-time-selection">
//                                     {/* Date Selection */}
//                                     <div className="date-section">
//                                         <h4>Select Date</h4>
//                                         <input
//                                             type="date"
//                                             min={getMinDate()}
//                                             max={getMaxDate()}
//                                             value={formData.appointmentDate}
//                                             onChange={(e) => handleDateSelect(e.target.value)}
//                                             className="date-input"
//                                         />
//                                     </div>

//                                     {/* Time Slots */}
//                                     {formData.appointmentDate && (
//                                         <div className="time-section animate-fade-in">
//                                             <h4>Available Time Slots</h4>
//                                             <div className="time-slots-grid">
//                                                 {availableSlots.map(slot => (
//                                                     <div
//                                                         key={slot}
//                                                         className={`time-slot ${formData.timeSlot === slot ? 'selected' : ''}`}
//                                                         onClick={() => handleTimeSelect(slot)}
//                                                     >
//                                                         {slot}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="form-actions">
//                                     <button 
//                                         className="back-btn"
//                                         onClick={goToPreviousStep}
//                                     >
//                                         ← Back to Services
//                                     </button>
//                                     <button 
//                                         className="continue-btn"
//                                         onClick={goToNextStep}
//                                         disabled={!isStep3Valid()}
//                                     >
//                                         Review Summary →
//                                     </button>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Step 4: Confirmation */}
//                         {currentStep === 4 && (
//                             <div className="step-container animate-slide-in">
//                                 <h2 className="step-title">Confirm Your Appointment</h2>
//                                 <p className="step-subtitle">Review your booking details before confirming</p>

//                                 <div className="booking-summary">
//                                     <div className="summary-card">
//                                         <h4>Appointment Summary</h4>
//                                         <div className="summary-details">
//                                             <div className="summary-section">
//                                                 <h5>Personal Information</h5>
//                                                 <div className="summary-item">
//                                                     <span className="label">Name:</span>
//                                                     <span className="value">{formData.firstName} {formData.lastName}</span>
//                                                 </div>
//                                                 <div className="summary-item">
//                                                     <span className="label">Age & Gender:</span>
//                                                     <span className="value">{formData.age} years, {formData.gender}</span>
//                                                 </div>
//                                                 <div className="summary-item">
//                                                     <span className="label">Contact:</span>
//                                                     <span className="value">{formData.email} | {formData.phone}</span>
//                                                 </div>
//                                                 <div className="summary-item">
//                                                     <span className="label">Primary Concern:</span>
//                                                     <span className="value">{formData.concerns}</span>
//                                                 </div>
//                                             </div>

//                                             <div className="summary-section">
//                                                 <h5>Appointment Details</h5>
//                                                 <div className="summary-item">
//                                                     <span className="label">Service:</span>
//                                                     <span className="value">{formData.serviceType}</span>
//                                                 </div>
//                                                 <div className="summary-item">
//                                                     <span className="label">Date:</span>
//                                                     <span className="value">{formatDate(formData.appointmentDate)}</span>
//                                                 </div>
//                                                 <div className="summary-item">
//                                                     <span className="label">Time:</span>
//                                                     <span className="value">{formData.timeSlot}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="additional-notes">
//                                         <label>Additional Notes (Optional)</label>
//                                         <textarea
//                                             name="notes"
//                                             value={formData.notes}
//                                             onChange={handleInputChange}
//                                             className="form-textarea"
//                                             placeholder="Any specific concerns or preferences you'd like to share..."
//                                             rows="3"
//                                         ></textarea>
//                                     </div>

//                                     <div className="confirmation-actions">
//                                         <button 
//                                             className="back-btn"
//                                             onClick={goToPreviousStep}
//                                         >
//                                             ← Edit Date & Time
//                                         </button>
//                                         <button 
//                                             className="confirm-btn"
//                                             onClick={handleSubmit}
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? (
//                                                 <>
//                                                     <div className="loading-spinner"></div>
//                                                     Booking...
//                                                 </>
//                                             ) : (
//                                                 'Confirm Appointment'
//                                             )}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </Col>
//                 </Row>
//             </Container>

            
//         </div>
//     );
// };

// export default BookAppointment;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Book.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        concerns: '',
        
        // Step 2: Service Selection
        serviceType: '',
        service_id: '',
        sub_service_id: '',
        
        // Step 3: Date & Time
        appointmentDate: '',
        timeSlot: '',
        appointment_time: '',
        
        // Additional
        notes: '',
        alternate_contact_no: ''
    });
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Mock data - Replace with API calls
    const serviceTypes = [
        { id: 1, name: 'Individual Therapy', duration: '50 mins', price: '₹1,500', service_id: '1', sub_service_id: '1' },
        { id: 2, name: 'Couples Counseling', duration: '60 mins', price: '₹2,000', service_id: '1', sub_service_id: '2' },
        { id: 3, name: 'Family Therapy', duration: '60 mins', price: '₹2,500', service_id: '2', sub_service_id: '3' },
        { id: 4, name: 'Child Psychology', duration: '45 mins', price: '₹1,800', service_id: '2', sub_service_id: '4' },
        { id: 5, name: 'Anxiety Treatment', duration: '50 mins', price: '₹1,600', service_id: '3', sub_service_id: '5' },
        { id: 6, name: 'Depression Counseling', duration: '50 mins', price: '₹1,600', service_id: '3', sub_service_id: '6' }
    ];

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const concernsList = [
        'Anxiety & Stress',
        'Depression',
        'Relationship Issues',
        'Family Conflicts',
        'Career Guidance',
        'Trauma & PTSD',
        'Addiction',
        'Self-esteem',
        'Anger Management',
        'Other'
    ];

    useEffect(() => {
        // Simulate fetching available slots when date is selected
        if (formData.appointmentDate) {
            setAvailableSlots(timeSlots);
        }
    }, [formData.appointmentDate]);

    // Load saved appointments from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem('sunshine_appointments')
            if (raw) setAppointments(JSON.parse(raw))
        } catch (err) {
            console.warn('Failed to load appointments', err)
        }
    }, [])

    // Navigation handlers
    const goToNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    // Step 1: Basic Details handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConcernSelect = (concern) => {
        setFormData(prev => ({ ...prev, concerns: concern }));
    };

    // Step 2: Service Selection handlers
    const handleServiceSelect = (service) => {
        setFormData(prev => ({ 
            ...prev, 
            serviceType: service.name,
            service_id: service.service_id,
            sub_service_id: service.sub_service_id
        }));
    };

    // Step 3: Date & Time handlers
    const handleDateSelect = (date) => {
        setFormData(prev => ({ ...prev, appointmentDate: date, timeSlot: '' }));
    };

    const handleTimeSelect = (time) => {
        // Convert time to 24-hour format for API
        const time24 = convertTo24Hour(time);
        setFormData(prev => ({ 
            ...prev, 
            timeSlot: time,
            appointment_time: time24
        }));
    };

    // Convert time to 24-hour format
    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}:00`;
    };

    // Format date for API (YYYY-MM-DD)
    const formatDateForAPI = (dateString) => {
        return dateString; // Already in YYYY-MM-DD format from input
    };

    // API call to submit appointment
    const submitAppointmentToAPI = async (appointmentData) => {
        try {
            const payload = {
                name: `${appointmentData.firstName} ${appointmentData.lastName}`,
                email: appointmentData.email,
                contact_no: appointmentData.phone,
                alternate_contact_no: appointmentData.alternate_contact_no || appointmentData.phone,
                service_id: appointmentData.service_id || "1",
                sub_service_id: appointmentData.sub_service_id || "1",
                appointment_date: formatDateForAPI(appointmentData.appointmentDate),
                appointment_time: appointmentData.appointment_time,
                message: appointmentData.notes || `Appointment for ${appointmentData.concerns}. ${appointmentData.notes || 'Please confirm.'}`
            };

            console.log('Submitting appointment:', payload);

            const response = await fetch(`${backendUrl}/appointment/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error('Error submitting appointment:', error);
            throw error;
        }
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Submit to API
            const apiResult = await submitAppointmentToAPI(formData);
            console.log('API Response:', apiResult);

            // Save to localStorage as backup
            let savedId = null;
            try {
                const existing = JSON.parse(localStorage.getItem('sunshine_appointments') || '[]');
                const newAppt = { 
                    id: Date.now(), 
                    createdAt: new Date().toISOString(), 
                    ...formData,
                    apiResponse: apiResult 
                };
                existing.push(newAppt);
                localStorage.setItem('sunshine_appointments', JSON.stringify(existing));
                setAppointments(existing);
                savedId = newAppt.id;
            } catch (err) {
                console.warn('Failed to save appointment locally', err);
            }

            setIsSubmitting(false);
            setIsSubmitted(true);

            // Show SweetAlert confirmation
            await Swal.fire({
                icon: 'success',
                title: 'Appointment Confirmed!',
                html: `
                    <strong>${formData.firstName} ${formData.lastName}</strong><br/>
                    ${formatDate(formData.appointmentDate)} at ${formData.timeSlot}<br/>
                    <small>Reference: ${savedId || 'API Submitted'}</small>
                    <br/><br/>
                    <small style="color: #666;">We've sent a confirmation to your email.</small>
                `,
                confirmButtonText: 'Return to Home',
                showCancelButton: true,
                cancelButtonText: 'Download Details',
                didClose: () => {
                    navigate('/');
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    handleDownloadConfirmation();
                } else {
                    navigate('/');
                }
            });

        } catch (error) {
            setIsSubmitting(false);
            
            // Show error message
            await Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: 'There was an error submitting your appointment. Please try again or contact support.',
                confirmButtonText: 'Try Again'
            });
            
            console.error('Appointment submission failed:', error);
        }
    };

    // Download or copy confirmation helpers
    const buildConfirmationText = (data) => {
        return `Booking Confirmation\n\nPatient: ${data.firstName} ${data.lastName}\nAge: ${data.age}\nGender: ${data.gender}\nConcern: ${data.concerns}\nService: ${data.serviceType}\nDate: ${data.appointmentDate}\nTime: ${data.timeSlot}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nReference: ${data.id}`;
    };

    const handleDownloadConfirmation = () => {
        try {
            const filename = `Sunshine_Booking_${formData.firstName || 'guest'}_${formData.appointmentDate || ''}.txt`;
            const content = buildConfirmationText({ ...formData, id: Date.now() });
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.warn('Download failed', err);
        }
    };

    const handleCopyDetails = async () => {
        try {
            const content = buildConfirmationText({ ...formData, id: Date.now() });
            await navigator.clipboard.writeText(content);
            alert('Booking details copied to clipboard');
        } catch (err) {
            console.warn('Copy failed', err);
            alert('Unable to copy details');
        }
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

    // Validation functions
    const isStep1Valid = () => {
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.phone && 
               formData.age && 
               formData.gender && 
               formData.concerns;
    };

    const isStep2Valid = () => {
        return formData.serviceType;
    };

    const isStep3Valid = () => {
        return formData.appointmentDate && formData.timeSlot;
    };

    // Add alternate contact number field in Step 1
    const renderStep1 = () => (
        <div className="step-container animate-slide-in">
            <h2 className="step-title">Tell Us About Yourself</h2>
            <p className="step-subtitle">We'll use this information to match you with the right specialist</p>
            
            <form className="details-form">
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

                <div className="form-row">
                    <div className="form-group">
                        <label>Alternate Phone Number</label>
                        <input
                            type="tel"
                            name="alternate_contact_no"
                            value={formData.alternate_contact_no}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Optional alternate number"
                        />
                    </div>
                    <div className="form-group">
                        <label>Age *</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                            placeholder="Your age"
                            min="1"
                            max="100"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Gender *</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Primary Concern *</label>
                    <div className="concerns-grid">
                        {concernsList.map(concern => (
                            <div
                                key={concern}
                                className={`concern-card ${formData.concerns === concern ? 'selected' : ''}`}
                                onClick={() => handleConcernSelect(concern)}
                            >
                                {concern}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button"
                        className="continue-btn"
                        onClick={goToNextStep}
                        disabled={!isStep1Valid()}
                    >
                        Continue to Services →
                    </button>
                </div>
            </form>
        </div>
    );

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
                <Row className="justify-content-center pt-5">
                    <Col lg={8} xl={6}>

                        {/* Progress Steps */}
                        <div className="progress-steps">
                            {[1, 2, 3, 4].map(step => (
                                <div key={step} className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                                    <div className="step-circle">
                                        {step < currentStep ? '✓' : step}
                                    </div>
                                    <div className="step-label">
                                        {step === 1 && 'Basic Details'}
                                        {step === 2 && 'Service'}
                                        {step === 3 && 'Date & Time'}
                                        {step === 4 && 'Summary'}
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

                        {/* Step 1: Basic Details */}
                        {currentStep === 1 && renderStep1()}

                        {/* Step 2: Service Selection */}
                        {currentStep === 2 && (
                            <div className="step-container animate-slide-in">
                                <h2 className="step-title">Choose a Service</h2>
                                <p className="step-subtitle">Select the type of therapy or counseling that matches your needs</p>
                                
                                <div className="services-grid">
                                    {serviceTypes.map(service => (
                                        <div 
                                            key={service.id}
                                            className={`service-card ${formData.serviceType === service.name ? 'selected' : ''}`}
                                            onClick={() => handleServiceSelect(service)}
                                        >
                                            <h4 className="service-name">{service.name}</h4>
                                            <div className="service-details">
                                                <span className="duration">{service.duration}</span>
                                                {/* <span className="price">{service.price}</span> */}
                                            </div>
                                            <div className="selection-indicator"></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-actions">
                                    <button 
                                        className="back-btn"
                                        onClick={goToPreviousStep}
                                    >
                                        ← Back to Details
                                    </button>
                                    <button 
                                        className="continue-btn"
                                        onClick={goToNextStep}
                                        disabled={!isStep2Valid()}
                                    >
                                        Choose Date & Time →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Date & Time Selection */}
                        {currentStep === 3 && (
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

                                <div className="form-actions">
                                    <button 
                                        className="back-btn"
                                        onClick={goToPreviousStep}
                                    >
                                        ← Back to Services
                                    </button>
                                    <button 
                                        className="continue-btn"
                                        onClick={goToNextStep}
                                        disabled={!isStep3Valid()}
                                    >
                                        Review Summary →
                                    </button>
                                </div>
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
                                            <div className="summary-section">
                                                <h5>Personal Information</h5>
                                                <div className="summary-item">
                                                    <span className="label">Name:</span>
                                                    <span className="value">{formData.firstName} {formData.lastName}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Age & Gender:</span>
                                                    <span className="value">{formData.age} years, {formData.gender}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Contact:</span>
                                                    <span className="value">{formData.email} | {formData.phone}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Alternate Contact:</span>
                                                    <span className="value">{formData.alternate_contact_no || formData.phone}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Primary Concern:</span>
                                                    <span className="value">{formData.concerns}</span>
                                                </div>
                                            </div>

                                            <div className="summary-section">
                                                <h5>Appointment Details</h5>
                                                <div className="summary-item">
                                                    <span className="label">Service:</span>
                                                    <span className="value">{formData.serviceType}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Service ID:</span>
                                                    <span className="value">{formData.service_id}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Sub-service ID:</span>
                                                    <span className="value">{formData.sub_service_id}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Date:</span>
                                                    <span className="value">{formatDate(formData.appointmentDate)}</span>
                                                </div>
                                                <div className="summary-item">
                                                    <span className="label">Time:</span>
                                                    <span className="value">{formData.timeSlot}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="additional-notes">
                                        <label>Additional Notes (Optional)</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="form-textarea"
                                            placeholder="Any specific concerns or preferences you'd like to share..."
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div className="confirmation-actions">
                                        <button 
                                            className="back-btn"
                                            onClick={goToPreviousStep}
                                        >
                                            ← Edit Date & Time
                                        </button>
                                        <button 
                                            className="confirm-btn"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="loading-spinner"></div>
                                                    Submitting...
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
        </div>
    );
};

export default BookAppointment;