import React, { useState } from 'react';
import logoImage from '../assets/Sunshine_logo.png';

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
        
        .footer-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 60px 0 40px;
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
        
        .info-text {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.9;
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
                                <p className="info-text">
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
                                <p className="info-text">
                                    Consultation by appointment only<br />
                                    Mon To Fri 10am - 8pm
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
                                <p className="info-text">
                                    info@sunshinemindcare.com<br />
                                    +91 8007869220<br />
                                    +91 9607899660
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section with Links */}
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="logo-section">
                                <svg viewBox="0 0 300 120" className="logo">
                                    {/* Sun Logo */}
                                    <image href={logoImage} width="300" height="120" />
                                </svg>

                                <p className="subscribe-text">Subscribe Now</p>
                                <div className="email-form">
                                    <input
                                        type="email"
                                        className="email-input"
                                        placeholder="Your Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button onClick={handleSubmit} className="submit-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="social-links">
                                    <button className="social-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                                        </svg>
                                    </button>
                                    <button className="social-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                        </svg>
                                    </button>
                                    <button className="social-btn">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="links-section">
                                <h5>Our links</h5>
                                <ul className="link-list">
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#services">Services</a></li>
                                    <li><a href="#past-events">Past Events</a></li>
                                    <li><a href="#team">Team</a></li>
                                    <li><a href="#contact">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="links-section">
                                <h5>Other Links</h5>
                                <ul className="link-list">
                                    <li><a href="#internship">Internship</a></li>
                                    <li><a href="#articles">Published Articles</a></li>
                                    <li><a href="#upcoming">Upcoming Events</a></li>
                                    <li><a href="#faq">FAQ's</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4">
                            <div className="links-section">
                                <h5>Events</h5>
                                <div className="event-images">
                                    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop" alt="Event 1" className="event-img" />
                                    <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop" alt="Event 2" className="event-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default SunshineFooter;