
import React, { useState } from 'react';

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
    message: {
      required: false,
      maxLength: 500,
      message: 'Message cannot exceed 500 characters'
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
      if (field !== 'message' || formData.message) { // Only validate message if it has content
        const error = validateField(field, formData[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
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

    if (submitStatus) setSubmitStatus(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, formData[name]);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return !formErrors.firstName && !formErrors.lastName && !formErrors.email && 
           formData.firstName && formData.lastName && formData.email;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      setTouchedFields({
        firstName: true,
        lastName: true,
        email: true,
        message: true
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost/Sunshine-MindCare/Sunshine_Mindcare_Backend';
      
      const response = await fetch(`${BACKEND_URL}/contact/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        // Clear errors on successful submission
        setFormErrors({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
        setTouchedFields({});
        
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }

        .contact-container {
          background: #f8f9fa;
          padding: 60px 20px;
        }

        .contact-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .map-section {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .map-container {
          width: 100%;
          height: 410px;
          position: relative;
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .business-info {
          padding: 20px;
          background: white;
        }

        .business-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .business-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .directions-link {
          color: #1e88e5;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .directions-link:hover {
          text-decoration: underline;
        }

        .business-address {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .form-section {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e88e5;
          margin-bottom: 20px;
        }

        .form-subtitle {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 35px;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }

        .form-input.error {
          border-color: #f44336;
          background-color: #fff5f5;
        }

        .form-input:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }

        .form-input:focus.error {
          border-color: #f44336;
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }

        .form-textarea {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          min-height: 150px;
          resize: vertical;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }

        .form-textarea.error {
          border-color: #f44336;
          background-color: #fff5f5;
        }

        .form-textarea:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }

        .form-textarea:focus.error {
          border-color: #f44336;
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }

        .error-text {
          color: #f44336;
          font-size: 0.85rem;
          margin-top: 5px;
          display: block;
          position: absolute;
          bottom: -20px;
          left: 0;
        }

        .character-count {
          font-size: 0.85rem;
          color: #666;
          text-align: right;
          margin-top: 5px;
        }

        .character-count.warning {
          color: #ff9800;
        }

        .character-count.error {
          color: #f44336;
        }

        .submit-button {
          background: #ffa726;
          color: white;
          border: none;
          padding: 16px 50px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .submit-button:hover:not(:disabled) {
          background: #ff9800;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 167, 38, 0.4);
        }

        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .success-message {
          background: #4caf50;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          animation: slideDown 0.3s ease;
        }

        .error-message {
          background: #f44336;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          animation: slideDown 0.3s ease;
        }

        .validation-error {
          background: #fff3cd;
          color: #856404;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          border: 1px solid #ffeaa7;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 968px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 30px 20px;
          }
        }

        @media (max-width: 480px) {
          .form-title {
            font-size: 1.8rem;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-wrapper">
          {/* Map Section */}
          <div className="map-section">
            <div className="map-container">
              <iframe 
                className="map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.3726785965675!2d73.78525631490168!3d20.00120948655889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb1c5ac83451%3A0x7be8c9f8c8c8c8c8!2sCollege%20Road%2C%20Nashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="business-info">
              <div className="business-header">
                <div>
                  <h3 className="business-name">Sunshine Counseling and Therapy</h3>
                  <p className="business-address">
                    College Road, Near Nirman House,<br />
                    Besides City Union Bank Above Cafe<br />
                    Lolo Close to Vidya Vikas Circle,<br />
                    Gangapur Rd, of, Nashik,<br />
                    Maharashtra 422005
                  </p>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="directions-link">
                  Directions
                </a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <h2 className="form-title">Get In Touch</h2>
            <p className="form-subtitle">
              If efforts are likely to be praised and rewarded, then it makes sense 
              that a member of staff will work harder to receive such employee recognition
            </p>

            {submitStatus === 'success' && (
              <div className="success-message">
                ✓ Thank you for reaching out! Your form has been submitted successfully. We will get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="error-message">
                ✗ Something went wrong. Please try again later.
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength="30"
                />
                {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength="30"
                />
                {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                placeholder="Message (Optional)"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="500"
              ></textarea>
              {formErrors.message && <span className="error-text">{formErrors.message}</span>}
              <div className={`character-count ${formData.message.length > 450 ? 'warning' : ''} ${formData.message.length > 500 ? 'error' : ''}`}>
                {formData.message.length}/500 characters
              </div>
            </div>

            <button 
              className="submit-button" 
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid()}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchSection;