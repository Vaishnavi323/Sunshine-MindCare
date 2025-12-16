import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import logoImage from '../assets/Sunshine_logo.png';
import { Link } from 'react-router-dom'
import img1 from '../assets/j1.jpg';
import img2 from '../assets/j2.jpg';

const SunshineFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      console.log('Subscribed:', email);
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif;
        }
        
        .appointments-btn {
          background: linear-gradient(45deg, #ffb235a9, #ff8e53);
          border: none;
          padding: 15px 35px;
          font-weight: 700;
          border-radius: 25px;
          color: white;
          transition: all 0.4s ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          z-index: 1;
          font-size: 1.1rem;
          min-width: 140px;
          margin-left: 40px;
        }

        .appointments-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s;
          z-index: -1;
        }

        .appointments-btn:hover::before {
          left: 100%;
        }

        .appointments-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 30px rgba(255, 107, 53, 0.4);
        }

        .footer-section {
          background: linear-gradient(135deg, #346fdecb 0%, #2a5298b1 100%);
          color: white;
          padding: 60px 0 40px;
          border-top: 5px solid #ff6b35;
        }
        
        .info-card {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          height: 100%;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }
        
        .icon-box {
          width: 70px;
          height: 70px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        
        .icon-box svg {
          width: 40px;
          height: 40px;
          fill: #ffa726;
        }
        
        .info-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        .info-texts {
          font-size: 14px;
          line-height: 1.6;
          color: #e0e0e0;
        }
        
        .logo-section {
          margin-bottom: 30px;
        }
        
        .logo {
          width: 280px;
          margin-bottom: 20px;
        }
        
        .subscribe-text {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .email-form {
          position: relative;
          max-width: 400px;
        }
        
        .email-input {
          width: 100%;
          padding: 15px 60px 15px 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
        }
        
        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .email-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .submit-btn {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: #ffa726;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover {
          background: #ff9800;
        }
        
        .submit-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 25px;
          margin-left: 80px;
        }
        
        .social-btn {
          width: 45px;
          height: 45px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }
        
        .social-btn:hover {
          background: #ffa726;
          transform: translateY(-3px);
        }
        
        .social-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }
        
        .links-section h5 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 25px;
        }
        
        .link-list {
          list-style: none;
          padding: 0;
        }
        
        .link-list li {
          margin-bottom: 12px;
        }
        
        .link-list a {
          color: white;
          text-decoration: none;
          font-size: 15px;
          opacity: 0.9;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .link-list a:hover {
          opacity: 1;
          padding-left: 5px;
        }
        
        .link-list a::before {
          content: '›';
          font-size: 20px;
          font-weight: bold;
        }
        
        .event-images {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        
        .event-img {
          width: 120px;
          height: 90px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .event-img:hover {
          transform: scale(1.05);
          border-color: #ffa726;
        }

        /* Tablet Responsive Styles (768px to 1024px) */
        @media (max-width: 1024px) {
          .footer-section {
            padding: 50px 0 35px;
          }

          .info-card {
            padding: 18px;
          }

          .info-title {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .info-texts {
            font-size: 13px;
            line-height: 1.5;
          }

          .icon-box {
            width: 60px;
            height: 60px;
            margin-bottom: 12px;
          }

          .icon-box svg {
            width: 35px;
            height: 35px;
          }

          .logo {
            width: 240px;
            margin-bottom: 18px;
          }

          .subscribe-text {
            font-size: 16px;
            margin-bottom: 18px;
          }

          .email-form {
            max-width: 350px;
          }

          .email-input {
            padding: 13px 55px 13px 18px;
            font-size: 13px;
          }

          .submit-btn {
            padding: 9px 13px;
          }

          .submit-btn svg {
            width: 18px;
            height: 18px;
          }

          .social-links {
            gap: 12px;
            margin-top: 22px;
            
          }

          .social-btn {
            width: 42px;
            height: 42px;
          }

          .social-btn svg {
            width: 18px;
            height: 18px;
          }

          .links-section h5 {
            font-size: 19px;
            margin-bottom: 20px;
          }

          .link-list li {
            margin-bottom: 10px;
          }

          .link-list a {
            font-size: 14px;
            gap: 6px;
          }

          .event-images {
            gap: 12px;
            margin-top: 18px;
          }

          .event-img {
            width: 110px;
            height: 85px;
          }

          .row {
            margin-bottom: 3rem !important;
          }

          .col-lg-3 {
            margin-bottom: 28px;
          }
        }

        /* Small Tablet Responsive Styles (576px to 768px) */
        @media (max-width: 768px) {
          .footer-section {
            padding: 45px 0 30px;
          }

          .info-card {
            padding: 16px;
          }

          .info-title {
            font-size: 18px;
            margin-bottom: 10px;
          }

          .info-texts {
            font-size: 12px;
            line-height: 1.4;
          }

          .icon-box {
            width: 55px;
            height: 55px;
            margin-bottom: 10px;
          }

          .icon-box svg {
            width: 32px;
            height: 32px;
          }

          .logo {
            width: 220px;
            margin-bottom: 16px;
          }

          .subscribe-text {
            font-size: 15px;
            margin-bottom: 16px;
          }

          .email-form {
            max-width: 100%;
          }

          .email-input {
            padding: 12px 50px 12px 16px;
            font-size: 13px;
          }

          .submit-btn {
            padding: 8px 12px;
          }

          .submit-btn svg {
            width: 17px;
            height: 17px;
          }

          .social-links {
            gap: 10px;
            margin-top: 20px;
            
          }

          .social-btn {
            width: 40px;
            height: 40px;
          }

          .social-btn svg {
            width: 17px;
            height: 17px;
          }

          .links-section h5 {
            font-size: 17px;
            margin-bottom: 18px;
          }

          .link-list li {
            margin-bottom: 9px;
          }

          .link-list a {
            font-size: 13px;
            gap: 5px;
          }

          .event-images {
            gap: 10px;
            margin-top: 16px;
            flex-wrap: wrap;
          }

          .event-img {
            width: 100px;
            height: 80px;
            flex: 1;
            min-width: 90px;
          }

          .col-md-4,
          .col-md-6,
          .col-lg-3 {
            margin-bottom: 25px;
          }

          .mb-5 {
            margin-bottom: 2rem !important;
          }
        }

        .copyright-section {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 30px;
          text-align: center;
          margin-top: 40px;
        }

        .copyright-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .copyright-text {
            font-size: 12px;
          }
        }

        @media (max-width: 768px) {
          .copyright-text {
            font-size: 11px;
          }
        }
      `}</style>

      <footer className="footer-section">
        <div className="container">
          {/* Top Section with Info Cards */}
          <div className="row mb-5">
            <div className="col-md-4 mb-4">
              <div className="info-card">
                <div className="icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="info-title">Location</h3>
                <p className="info-texts">
                  Solitaire building, First & Second floor,<br />
                  Keshavrao More Marg, Collage Road,<br />
                  Nashik-422005
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="info-card">
                <div className="icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
                  </svg>
                </div>
                <h3 className="info-title">Working Hours</h3>
                <p className="info-texts">
                  Consultation by appointment only<br />
                  Mon To Sat 10am - 8pm
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="info-card">
                <div className="icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <h3 className="info-title">Contact Us</h3>
                <p className="info-texts">
                  info@sunshinemindcare.com<br />
                  +91 8007869220<br />
                  +91 9607899660
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section with Links */}
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 flex-column d-flex">
              <div className="logo-section">
                <svg viewBox="0 0 300 120" className="logo">
                  {/* Sun Logo */}
                  <image href={logoImage} width="300" height="120" />
                </svg>

                <Link to={"/BookAppointment"}>
                  <Button className="appointments-btn animate-btn">
                    Book Appointment
                  </Button>
                </Link>

                <div className="social-links">
                  <a href="https://www.facebook.com/people/Sunshine-Counselling-and-Therapy-Centre/100064207141730/?mibextid=ZbWKwL%20" target="_blank" rel="noopener noreferrer" className="social-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/sunshine-counselling-and-therapy-centre/" target="_blank" rel="noopener noreferrer" className="social-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/sunshinenashik?igshid=NzZlODBkYWE4Ng%3D%3D" target="_blank" rel="noopener noreferrer" className="social-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="links-section">
                <h5>Our links</h5>
                <ul className="link-list">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/AboutUs">About Us</Link></li>
                  <li><Link to="/ServicePage">Services</Link></li>
                  <li><Link to="/BlogPage">Blogs</Link></li>
                  <li><Link to="/TeamPage">Team</Link></li>
                  <li><Link to="/ContactUs">Contact Us</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="links-section">
                <h5>Other Links</h5>
                <ul className="link-list">
                  <li><Link to="/Job">Jobs</Link></li>
                  <li><Link to="/UpcomingEvents">Upcoming Events</Link></li>
                  <li><Link to="/PastEvents">Past Events</Link></li>
                  <li><Link to="/PublishedArticles">Articles</Link></li>
                  <li><Link to="/Training">Enquiry</Link></li>
                </ul>
              </div>
            </div>


            <div className="col-lg-3 col-md-6 mb-4">
              <div className="links-section">
                <h5>Events</h5>
                <div className="event-images">
                  <img src={img1} alt="Event 1" className="event-img" />
                  <img src={img2} alt="Event 2" className="event-img" />
                </div>
              </div>
            </div>
          </div>

          

          {/* Copyright Section */}
          <div className="copyright-section">
            <p className="copyright-text">
              &copy; 2024 Sunshine Counselling & Therapy Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SunshineFooter;