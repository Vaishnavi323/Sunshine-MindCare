import React, { useState } from 'react';

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async () => {
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
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message
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

        .form-input:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
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

        .form-textarea:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
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
        }

        .submit-button:hover {
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
                  <h3 className="business-name">Sunshine Counseling and Ther...</h3>
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
              <input
                type="text"
                name="firstName"
                className="form-input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                className="form-input"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Message (Optional)"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              className="submit-button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchSection;