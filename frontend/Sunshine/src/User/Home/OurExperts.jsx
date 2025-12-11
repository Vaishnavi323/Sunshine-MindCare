import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import expertImage from '../../assets/a2.jpg'; // You'll need to add this image

const OurExperts = () => {
  return (
    <section className="experts-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="content-wrapper">
              <h2 className="sections-title mb-4 animate-fade-in text-white">
                Our Experts
              </h2>
              <p className="section-description mb-4 animate-slide-up">
                Discover personalized mental wellness with our skilled team of psychiatrists and therapists. 
                We offer compassionate care, tailored treatments, and a collaborative approach to guide you 
                through life's challenges. Achieve balance, resilience, and a brighter future with our 
                dedicated professionals. Take the first step towards a healthier mind—schedule your 
                appointment today.
              </p>
              <Link to="/TeamPage">
                <Button className="view-all-btn animate-pulse-glow">
                  View All Team
                </Button>
              </Link>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="image-wrapper position-relative">
              <div className="main-image-container animate-float">
                <div 
                  className="main-image"
                  style={{
                    backgroundImage: `url(${expertImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '20px',
                    height: '400px',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
              
              {/* Floating Elements */}
              <div className="floating-element element-1">
                <div className="icon-circle">
                  <i className="fas fa-brain"></i>
                </div>
                <span className="element-text">Mind Care</span>
              </div>
              
              <div className="floating-element element-2">
                <div className="icon-circle">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <span className="element-text">Wellness</span>
              </div>
              
              <div className="floating-element element-3">
                <div className="icon-circle">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <span className="element-text">Support</span>
              </div>
              
              {/* Animated Background Pattern */}
              {/* <div className="pattern-dots"></div>
              <div className="pattern-lines"></div> */}
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .experts-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        /* Text Animations */
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 1.2s ease-out 0.3s both;
        }
        
        {/* .animate-pulse-glow {
          animation: pulseGlow 2s infinite, slideUp 1s ease-out 0.6s both;
        } */}
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        {/* @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 107, 53, 0.6), 0 0 30px rgba(255, 107, 53, 0.4);
            transform: scale(1.05);
          }
        } */}
        
        .sections-title {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .sections-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 80px;
          height: 4px;
          background: #ff6b35;
          border-radius: 2px;
          animation: expandWidth 1s ease-out 0.8s both;
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 80px;
          }
        }
        
        .section-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #e6f0ff;
          margin-bottom: 2rem;
        }
        
        .view-all-btn {
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          border: none;
          padding: 12px 35px;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          color: white;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }
        
        .view-all-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .view-all-btn:hover::before {
          left: 100%;
        }
        
        .view-all-btn:hover {
          transform: translateY(-3px);
        }
        
        /* Image Animation */
        .image-wrapper {
          padding: 30px;
          position: relative;
        }
        
        .main-image-container {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        {/* .main-image::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, #ff6b35, #2a5298);
          border-radius: 25px;
          z-index: -1;
          opacity: 0.5;
          filter: blur(15px);
          animation: glowPulse 4s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        } */}
        
        /* Floating Elements */
        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 3;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        
        .element-text {
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
        }
        
        .element-1 {
          top: 10%;
          left: -10%;
          animation: floatElement 8s ease-in-out infinite;
        }
        
        .element-2 {
          top: 60%;
          right: -5%;
          animation: floatElement 10s ease-in-out infinite 1s;
        }
        
        .element-3 {
          bottom: 10%;
          left: 0%;
          animation: floatElement 12s ease-in-out infinite 2s;
        }
        
        @keyframes floatElement {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        
        /* Pattern Background */
        .pattern-dots {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          z-index: 1;
          opacity: 0.5;
          animation: patternMove 20s linear infinite;
        }
        
        .pattern-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(90deg, transparent 49%, rgba(255, 107, 53, 0.1) 50%, transparent 51%),
            linear-gradient(transparent 49%, rgba(255, 107, 53, 0.1) 50%, transparent 51%);
          background-size: 50px 50px;
          z-index: 1;
          opacity: 0.3;
          animation: patternMove 30s linear infinite reverse;
        }
        
        @keyframes patternMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .main-image {
            height: 350px !important;
          }
          
          .floating-element {
            transform: scale(0.9);
          }
        }
        
        @media (max-width: 768px) {
          .sections-title {
            font-size: 2.5rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
          
          .image-wrapper {
            padding: 20px;
            margin-top: 30px;
          }
          
          .main-image {
            height: 300px !important;
          }
          
          .floating-element {
            padding: 10px;
            transform: scale(0.8);
          }
          
          .element-1 {
            left: -5%;
          }
          
          .element-2 {
            right: -5%;
          }
          
          .element-3 {
            left: -5%;
          }
        }
        
        @media (max-width: 576px) {
          .sections-title {
            font-size: 2rem;
          }
          
          .view-all-btn {
            padding: 10px 30px;
            font-size: 1rem;
          }
          
          .main-image {
            height: 250px !important;
          }
          
          .floating-element {
            transform: scale(0.7);
          }
        }
      `}</style>
    </section>
  );
};

export default OurExperts;