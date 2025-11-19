import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../assets/j2.jpg';

const JourneySection = () => {
  return (
    <section className="journey-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="content-wrapper">
              <div className="section-header animate-fade-in">
                <h6 className="section-subtitle">GUIDING YOUR JOURNEY WITH EMPATHY AND EXPERTISE</h6>
                <h1 className="section-title">Your Compassionate Mental Health Support</h1>
              </div>
              
              <div className="description-content animate-slide-up">
                <p className="main-description">
                  Founded on the principles of empathy, authenticity, and expertise, our center is a trusted space where individuals of all ages can seek support for diverse psychological concerns. Whether you are dealing with anxiety, depression, addiction, career confusion, relationship issues, or learning difficulties, our team is here to guide you on your journey to mental health and resilience.
                </p>
                <p className="secondary-description">
                  Explore our website to learn more about our team, services, and the warm, confidential environment we provide. We look forward to accompanying you on your path to healing and personal growth.
                </p>
              </div>

              <div className="trust-badge animate-bounce-in">
                <div className="trust-icon">✓</div>
                <div className="trust-content">
                  <span className="trust-text">Trusted By</span>
                  <span className="trust-number">10000+ Clients</span>
                </div>
              </div>

              <div className="cta-buttons animate-fade-in">
                <Link to="/PublishedArticles"><Button className="primary-btn">
                  Learn More About Us
                </Button></Link>
                <Link to="/TeamPage"><Button className="secondary-btn">
                  Meet Our Team
                </Button></Link>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="image-section">
              {/* Main Image */}
              <div className="main-image-container animate-float">
                <div className="image-placeholder">
                  <img 
                    src={img} 
                    alt="Journey Illustration" 
                    className="journey-img"
                    loading="lazy"
                  />
                  <small className="image-caption">Compassionate Care Environment</small>
                </div>
                
                {/* Floating Elements */}
                <div className="floating-element element-1">💭</div>
                <div className="floating-element element-2">❤️</div>
                <div className="floating-element element-3">🌟</div>
              </div>

              {/* Stats Cards */}
              <div className="stats-cards">
                <div className="stat-card card-1 animate-slide-right">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <div className="stat-number">50+</div>
                    <div className="stat-label">Expert Professionals</div>
                  </div>
                </div>

                <div className="stat-card card-2 animate-slide-right-delay">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .journey-section {
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          position: relative;
          overflow: hidden;
        }

        /* Animations */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.3s forwards;
        }

        .animate-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease-out 0.6s forwards;
        }

        .animate-bounce-in {
          opacity: 0;
          animation: bounceIn 1s ease-out 0.9s forwards;
        }

        .animate-float {
          opacity: 0;
          animation: floatIn 1s ease-out 0.5s forwards, float 6s ease-in-out 1.5s infinite;
        }

        .animate-slide-right {
          opacity: 0;
          animation: slideRight 1s ease-out 1.1s forwards;
        }

        .animate-slide-right-delay {
          opacity: 0;
          animation: slideRight 1s ease-out 1.4s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Section Header */
        .section-subtitle {
          color: #ff6b35;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
          display: block;
        }

        .section-title {
          color: #2a5298;
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        /* Description Content */
        .description-content {
          margin-bottom: 40px;
        }

        .main-description {
          color: #495057;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .secondary-description {
          color: #6c757d;
          font-size: 1rem;
          line-height: 1.7;
          font-style: italic;
        }

        /* Trust Badge */
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 15px;
          background: linear-gradient(135deg, #2a5298, #1e3c72);
          padding: 20px 25px;
          border-radius: 15px;
          margin-bottom: 40px;
          box-shadow: 0 10px 30px rgba(42, 82, 152, 0.2);
        }

        .trust-icon {
          width: 50px;
          height: 50px;
          background: #ff6b35;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .trust-content {
          display: flex;
          flex-direction: column;
        }

        .trust-text {
          color: #e9ecef;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .trust-number {
          color: white;
          font-size: 1.5rem;
          font-weight: 800;
        }

        /* CTA Buttons */
        .cta-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .primary-btn {
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          border: none;
          padding: 15px 30px;
          font-weight: 600;
          border-radius: 10px;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
        }

        .secondary-btn {
          background: transparent;
          border: 2px solid #2a5298;
          padding: 13px 28px;
          font-weight: 600;
          border-radius: 10px;
          color: #2a5298;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: #2a5298;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(42, 82, 152, 0.3);
        }

        /* Image Section */
        .image-section {
          position: relative;
          padding: 20px;
        }

        .main-image-container {
          position: relative;
          background: linear-gradient(135deg, #2a5298, #1e3c72);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(42, 82, 152, 0.2);
          margin-bottom: 30px;
        }

        .image-placeholder {
          width: 100%;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: white;
          border: 2px dashed rgba(255, 255, 255, 0.3);
          overflow: hidden;
          gap: 10px;
        }

        .journey-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .image-placeholder:hover .journey-img {
          transform: scale(1.05);
        }

        .image-caption {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          backdrop-filter: blur(5px);
          opacity: 0;
          animation: fadeIn 0.8s ease-out 1.5s forwards;
          z-index: 10;
          white-space: nowrap;
        }

        /* Floating Elements */
        .floating-element {
          position: absolute;
          font-size: 1.5rem;
          animation: floatElement 4s ease-in-out infinite;
        }

        .element-1 {
          top: 20px;
          right: 30px;
          animation-delay: 0s;
        }

        .element-2 {
          bottom: 40px;
          left: 30px;
          animation-delay: 1s;
        }

        .element-3 {
          top: 50%;
          right: 40px;
          animation-delay: 2s;
        }

        @keyframes floatElement {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(10deg);
          }
        }

        /* Stats Cards */
        .stats-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .stat-card {
          background: white;
          padding: 25px 20px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #ff6b35;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-number {
          color: #2a5298;
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .primary-btn, .secondary-btn {
            width: 100%;
            text-align: center;
          }

          .stats-cards {
            grid-template-columns: 1fr;
          }

          .main-image-container {
            padding: 30px 20px;
          }

          .image-placeholder {
            height: 250px;
          }
        }

        @media (max-width: 576px) {
          .section-title {
            font-size: 1.8rem;
          }

          .main-description {
            font-size: 1rem;
          }

          .trust-badge {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default JourneySection;