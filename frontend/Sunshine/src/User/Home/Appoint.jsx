import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const OurStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Counter values
  const [clients, setClients] = useState(0);
  const [assessments, setAssessments] = useState(0);
  const [programs, setPrograms] = useState(0);
  const [articles, setArticles] = useState(0);

  const targetClients = 10000;
  const targetAssessments = 5000;
  const targetPrograms = 100;
  const targetArticles = 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      // Animated counters
      const counters = [
        { setter: setClients, target: targetClients },
        { setter: setAssessments, target: targetAssessments },
        { setter: setPrograms, target: targetPrograms },
        { setter: setArticles, target: targetArticles }
      ];

      counters.forEach((counter, index) => {
        let step = 0;
        const increment = counter.target / steps;
        const timer = setInterval(() => {
          step++;
          counter.setter(Math.min(Math.floor(increment * step), counter.target));
          if (step >= steps) clearInterval(timer);
        }, stepDuration + (index * 100));
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="our-story-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="content-wrapper">
              <div className="section-header">
                {/* <div className="animateds-underline mb-4">
                  <h6 className="sections-subtitle animates-subtitle">OUR STORY, YOUR WELLNESS</h6>
                </div> */}
                <h2 className="section-title animate-title">Compassionate Care, Tailored for You</h2>
              </div>
              
              <p className="story-description animate-description">
                Delve into the essence of Sunshine Counseling and Therapy Center, where compassionate care meets personalized support. Our mission is to guide you towards holistic well-being, one step at a time.
              </p>

              <div className="cta-section animate-cta">
                <div className="cta-icon-wrapper">
                  <div className="cta-icon-pulse"></div>
                  <div className="cta-icon">❤️</div>
                </div>
                <div className="cta-content">
                  <h4>Book An Appointment</h4>
                  <p>Your journey to well-being starts here. Schedule a therapeutic session, and let our experienced team guide you towards a happier, healthier life.</p>
                </div>

                <Link to={"/BookAppointment"}>
                  <Button className="appointments-btn animate-btn">
                    Book <br/>Appointment
                  </Button>
                </Link>
                
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="stats-container">
              <div className="stats-grid">
                {[
                  { value: clients, label: 'Clients', icon: '👥', color: '#2a5298' },
                  { value: assessments, label: 'Assessments', icon: '📊', color: '#1e88e5' },
                  { value: programs, label: 'Programs', icon: '🎯', color: '#ff6b35' },
                  { value: articles, label: 'Articles', icon: '📰', color: '#ff8e53' }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className={`stat-item animate-stat-${index + 1}`}
                  >
                    <div className="stat-icon-wrapper">
                      <div className="stat-icon">{stat.icon}</div>
                      <div className="stat-icon-glow"></div>
                    </div>
                    <div className="stat-content">
                      <div className="stat-number" style={{ color: stat.color }}>
                        {stat.value.toLocaleString()}+
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-progress" 
                        style={{ 
                          background: `linear-gradient(90deg, ${stat.color}, ${stat.color}99)`,
                          animationDelay: `${index * 0.3}s`
                        }}
                      ></div>
                    </div>
                    <div className="stat-particle"></div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Floating Particles Background */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i + 1}`}
            style={{
              background: i % 3 === 0 ? '#ff6b35' : i % 3 === 1 ? '#2a5298' : '#1e88e5',
              opacity: 0.15 + Math.random() * 0.2
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        .our-story-section {
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Floating Particles */
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          animation: floatParticle 20s linear infinite;
        }

        .particle-1 { width: 20px; height: 20px; top: 10%; left: 5%; animation-delay: 0s; }
        .particle-2 { width: 15px; height: 15px; top: 20%; right: 10%; animation-delay: 2s; }
        .particle-3 { width: 25px; height: 25px; bottom: 30%; left: 15%; animation-delay: 4s; }
        .particle-4 { width: 12px; height: 12px; top: 40%; right: 20%; animation-delay: 6s; }
        .particle-5 { width: 18px; height: 18px; bottom: 20%; right: 15%; animation-delay: 8s; }
        .particle-6 { width: 22px; height: 22px; top: 60%; left: 8%; animation-delay: 10s; }
        .particle-7 { width: 14px; height: 14px; bottom: 40%; right: 8%; animation-delay: 12s; }
        .particle-8 { width: 16px; height: 16px; top: 15%; left: 20%; animation-delay: 14s; }
        .particle-9 { width: 19px; height: 19px; bottom: 60%; right: 25%; animation-delay: 16s; }
        .particle-10 { width: 21px; height: 21px; top: 70%; left: 30%; animation-delay: 18s; }
        .particle-11 { width: 13px; height: 13px; bottom: 15%; left: 10%; animation-delay: 1s; }
        .particle-12 { width: 17px; height: 17px; top: 25%; right: 15%; animation-delay: 3s; }
        .particle-13 { width: 24px; height: 24px; bottom: 50%; left: 25%; animation-delay: 5s; }
        .particle-14 { width: 11px; height: 11px; top: 45%; right: 5%; animation-delay: 7s; }
        .particle-15 { width: 23px; height: 23px; bottom: 35%; left: 35%; animation-delay: 9s; }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }

        /* Container */
        .content-wrapper {
          position: relative;
          z-index: 2;
        }

        /* Section Header Animations */
        .sections-subtitle {
          color: #ff6b35;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 15px;
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 1s ease-out 0.3s forwards;
        }

        .section-title {
          color: #1a3a6e;
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 25px;
          background: linear-gradient(45deg, #1a3a6e, #2a5298);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 1s ease-out 0.6s forwards;
        }

        .animateds-underline {
          position: relative;
          display: inline-block;
        }

        .animateds-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b35, #ff8e53);
          border-radius: 2px;
          animation: expandWidth 1s ease-out 1s forwards;
        }

        /* Story Description */
        .story-description {
          color: #5a6c82;
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(40px);
          animation: slideInUp 1s ease-out 0.9s forwards;
        }

        /* CTA Section */
        .cta-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(42, 82, 152, 0.1);
          border: 2px solid rgba(255, 107, 53, 0.1);
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 40px;
          opacity: 0;
          transform: scale(0.9) translateY(50px);
          animation: slideInUpScale 1.2s ease-out 1.2s forwards;
        }

        .cta-icon-wrapper {
          position: relative;
          min-width: 60px;
          height: 60px;
        }

        .cta-icon-pulse {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 107, 53, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .cta-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          z-index: 1;
        }

        .cta-content {
          flex: 1;
        }

        .cta-content h4 {
          color: #1a3a6e;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        .cta-content p {
          color: #5a6c82;
          margin-bottom: 0;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .appointments-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
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

        /* Stats Section */
        .stats-container {
          position: relative;
          z-index: 2;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          padding: 20px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 35px 25px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(42, 82, 152, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(60px) rotateX(90deg);
        }

        .stat-item:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 20px 40px rgba(42, 82, 152, 0.25);
        }

        .stat-icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
        }

        .stat-icon {
          font-size: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .stat-icon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%);
          animation: glowPulse 2s infinite alternate;
        }

        .stat-number {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 5px;
          font-family: 'Arial', sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          color: #5a6c82;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .stat-bar {
          width: 100%;
          height: 6px;
          background: rgba(234, 236, 239, 0.8);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .stat-progress {
          height: 100%;
          width: 0%;
          border-radius: 3px;
          animation: progressFill 2s ease-out forwards;
        }

        .stat-particle {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 107, 53, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: particleExplode 2s ease-out forwards;
          opacity: 0;
        }

        /* Animation Classes */
        .animate-stat-1 { animation: statFlipIn 1s ease-out 1.5s forwards; }
        .animate-stat-2 { animation: statFlipIn 1s ease-out 1.7s forwards; }
        .animate-stat-3 { animation: statFlipIn 1s ease-out 1.9s forwards; }
        .animate-stat-4 { animation: statFlipIn 1s ease-out 2.1s forwards; }

        /* Keyframe Animations */
        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUpScale {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes expandWidth {
          to {
            width: 100%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes particleExplode {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, 0), var(--ty, 0)) scale(0);
          }
        }

        @keyframes statFlipIn {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .section-title {
            font-size: 2.5rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .sections-subtitle {
            font-size: 0.9rem;
            letter-spacing: 2px;
          }
          
          .cta-section {
            flex-direction: column;
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 576px) {
          .section-title {
            font-size: 1.8rem;
          }
          
          .story-description {
            font-size: 1rem;
          }
          
          .stats-grid {
            gap: 20px;
            padding: 10px;
          }
          
          .stat-item {
            padding: 25px 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default OurStory;