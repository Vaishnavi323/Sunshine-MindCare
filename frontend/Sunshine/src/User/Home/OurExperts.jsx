import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OurExperts = () => {
  return (
    <section className="experts-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="content-wrapper">
              <h2 className="section-title mb-4 animate-fade-in text-white">
                Our Experts
              </h2>
              <p className="section-description mb-4 animate-slide-up">
                Discover personalized mental wellness with our skilled team of psychiatrists and therapists. 
                We offer compassionate care, tailored treatments, and a collaborative approach to guide you 
                through life's challenges. Achieve balance, resilience, and a brighter future with our 
                dedicated professionals. Take the first step towards a healthier mind—schedule your 
                appointment today.
              </p>
              <Button className="view-all-btn animate-pulse-glow">
                View All Team
              </Button>
            </div>
          </Col>
          <Col lg={6}>
            <div className="experts-visual mt-4 mt-lg-0">
              {/* Animated Brain Icon */}
              <div className="brain-animation">
                <div className="brain-lobe lobe-left"></div>
                <div className="brain-lobe lobe-right"></div>
                <div className="brain-stem"></div>
              </div>
              
              {/* Floating Particles */}
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              
              {/* Pulsing Circles */}
              <div className="pulse-circle circle-1"></div>
              <div className="pulse-circle circle-2"></div>
              <div className="pulse-circle circle-3"></div>
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
        
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite, slideUp 1s ease-out 0.6s both;
        }
        
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
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 4px 25px rgba(255, 107, 53, 0.6), 0 0 30px rgba(255, 107, 53, 0.4);
            transform: scale(1.05);
          }
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .section-title::after {
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
        
        /* Brain Animation */
        .brain-animation {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 100px;
          animation: floatBrain 6s ease-in-out infinite;
        }
        
        .brain-lobe {
          position: absolute;
          width: 50px;
          height: 70px;
          background: rgba(255, 107, 53, 0.1);
          border: 2px solid rgba(255, 107, 53, 0.5);
          border-radius: 50% 50% 40% 40%;
          animation: brainPulse 4s ease-in-out infinite;
        }
        
        .lobe-left {
          left: 0;
          transform: rotate(-5deg);
        }
        
        .lobe-right {
          right: 0;
          transform: rotate(5deg);
        }
        
        .brain-stem {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 15px;
          background: rgba(255, 107, 53, 0.2);
          border: 2px solid rgba(255, 107, 53, 0.4);
          border-radius: 0 0 10px 10px;
        }
        
        @keyframes floatBrain {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          33% {
            transform: translate(-50%, -52%) rotate(2deg);
          }
          66% {
            transform: translate(-50%, -48%) rotate(-2deg);
          }
        }
        
        @keyframes brainPulse {
          0%, 100% {
            transform: scale(1);
            border-color: rgba(255, 107, 53, 0.5);
          }
          50% {
            transform: scale(1.05);
            border-color: rgba(255, 107, 53, 0.8);
          }
        }
        
        /* Floating Particles */
        .particle {
          position: absolute;
          background: rgba(255, 107, 53, 0.6);
          border-radius: 50%;
          animation: floatParticle 15s linear infinite;
        }
        
        .particle-1 {
          width: 8px;
          height: 8px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          width: 6px;
          height: 6px;
          top: 60%;
          right: 15%;
          animation-delay: -3s;
        }
        
        .particle-3 {
          width: 10px;
          height: 10px;
          bottom: 30%;
          left: 20%;
          animation-delay: -6s;
        }
        
        .particle-4 {
          width: 5px;
          height: 5px;
          top: 40%;
          right: 25%;
          animation-delay: -9s;
        }
        
        .particle-5 {
          width: 7px;
          height: 7px;
          bottom: 20%;
          right: 10%;
          animation-delay: -12s;
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        
        /* Pulsing Circles */
        .pulse-circle {
          position: absolute;
          border: 2px solid rgba(255, 107, 53, 0.3);
          border-radius: 50%;
          animation: pulse 4s ease-out infinite;
        }
        
        .circle-1 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 0s;
        }
        
        .circle-2 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 1s;
        }
        
        .circle-3 {
          width: 250px;
          height: 250px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 2s;
        }
        
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
          
          .brain-animation {
            width: 100px;
            height: 80px;
          }
          
          .brain-lobe {
            width: 40px;
            height: 60px;
          }
        }
        
        @media (max-width: 576px) {
          .section-title {
            font-size: 2rem;
          }
          
          .view-all-btn {
            padding: 10px 30px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OurExperts;