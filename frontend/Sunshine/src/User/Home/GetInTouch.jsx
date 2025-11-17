import React, { useState } from 'react';

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.email && formData.message) {
      alert('Thank you for reaching out! We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      alert('Please fill in all required fields.');
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

        .rating-section {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .rating-number {
          font-weight: 700;
          color: #2c3e50;
        }

        .stars {
          color: #ffa726;
        }

        .reviews-link {
          color: #1e88e5;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .reviews-link:hover {
          text-decoration: underline;
        }

        .map-link {
          color: #1e88e5;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .map-link:hover {
          text-decoration: underline;
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
              
              {/* <div className="rating-section">
                <span className="rating-number">4.8</span>
                <span className="stars">★★★★★</span>
                <a href="#reviews" className="reviews-link">129 reviews</a>
              </div>
              
              <a href="#map" className="map-link">View larger map</a> */}
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <h2 className="form-title">Get In Touch</h2>
            <p className="form-subtitle">
              If efforts are likely to be praised and rewarded, then it makes sense 
              that a member of staff will work harder to receive such employee recognition
            </p>

            <div className="form-group">
              <input
                type="text"
                name="fullName"
                className="form-input"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="submit-button" onClick={handleSubmit}>
              Submit Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInTouchSection;