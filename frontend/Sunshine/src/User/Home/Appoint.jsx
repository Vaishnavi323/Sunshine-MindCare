import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      { threshold: 0.3 }
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
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      // Clients counter
      let clientStep = 0;
      const clientIncrement = targetClients / steps;
      const clientTimer = setInterval(() => {
        clientStep++;
        setClients(Math.min(Math.floor(clientIncrement * clientStep), targetClients));
        if (clientStep >= steps) clearInterval(clientTimer);
      }, stepDuration);

      // Assessments counter
      let assessmentStep = 0;
      const assessmentIncrement = targetAssessments / steps;
      const assessmentTimer = setInterval(() => {
        assessmentStep++;
        setAssessments(Math.min(Math.floor(assessmentIncrement * assessmentStep), targetAssessments));
        if (assessmentStep >= steps) clearInterval(assessmentTimer);
      }, stepDuration);

      // Programs counter
      let programStep = 0;
      const programIncrement = targetPrograms / steps;
      const programTimer = setInterval(() => {
        programStep++;
        setPrograms(Math.min(Math.floor(programIncrement * programStep), targetPrograms));
        if (programStep >= steps) clearInterval(programTimer);
      }, stepDuration);

      // Articles counter
      let articleStep = 0;
      const articleIncrement = targetArticles / steps;
      const articleTimer = setInterval(() => {
        articleStep++;
        setArticles(Math.min(Math.floor(articleIncrement * articleStep), targetArticles));
        if (articleStep >= steps) clearInterval(articleTimer);
      }, stepDuration);

      return () => {
        clearInterval(clientTimer);
        clearInterval(assessmentTimer);
        clearInterval(programTimer);
        clearInterval(articleTimer);
      };
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="our-story-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="content-wrapper">
              <div className="section-header animate-fade-in">
                <h6 className="section-subtitle">OUR STORY, YOUR WELLNESS</h6>
                <h2 className="section-title">Compassionate Care, Tailored for You</h2>
              </div>
              
              <p className="story-description animate-slide-up">
                Delve into the essence of Sunshine Counseling and Therapy Center, where compassionate care meets personalized support. Our mission is to guide you towards holistic well-being, one step at a time.
              </p>

              <div className="cta-section animate-bounce-in">
                <div className="cta-icon">➤</div>
                <div className="cta-content">
                  <h4>Book An Appointment</h4>
                  <p>Your journey to well-being starts here. Schedule a therapeutic session, and let our experienced team guide you towards a happier, healthier life.</p>
                </div>
                <Button className="appointment-btn">
                  Book <br/>Appointment
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="stats-grid">
              <div className="stat-item animate-stat-1">
                <div className="stat-number">{clients.toLocaleString()}+</div>
                <div className="stat-label">Clients</div>
                <div className="stat-bar">
                  <div className="stat-progress"></div>
                </div>
              </div>

              <div className="stat-item animate-stat-2">
                <div className="stat-number">{assessments.toLocaleString()}+</div>
                <div className="stat-label">Assessments</div>
                <div className="stat-bar">
                  <div className="stat-progress"></div>
                </div>
              </div>

              <div className="stat-item animate-stat-3">
                <div className="stat-number">{programs}+</div>
                <div className="stat-label">Programs</div>
                <div className="stat-bar">
                  <div className="stat-progress"></div>
                </div>
              </div>

              <div className="stat-item animate-stat-4">
                <div className="stat-number">{articles}+</div>
                <div className="stat-label">Newspaper Articles</div>
                <div className="stat-bar">
                  <div className="stat-progress"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .our-story-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        /* Animations */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.2s forwards;
        }

        .animate-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 1s ease-out 0.5s forwards;
        }

        .animate-bounce-in {
          opacity: 0;
          animation: bounceIn 1s ease-out 0.8s forwards;
        }

        .animate-stat-1 { animation: statSlideIn 1s ease-out 1.1s forwards; opacity: 0; }
        .animate-stat-2 { animation: statSlideIn 1s ease-out 1.3s forwards; opacity: 0; }
        .animate-stat-3 { animation: statSlideIn 1s ease-out 1.5s forwards; opacity: 0; }
        .animate-stat-4 { animation: statSlideIn 1s ease-out 1.7s forwards; opacity: 0; }

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

        @keyframes statSlideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Section Header */
        .section-subtitle {
          color: #ff6b35;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .section-title {
          color: #2a5298;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .story-description {
          color: #6c757d;
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        /* CTA Section */
        .cta-section {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #ff6b35;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 40px;
        }

        .cta-icon {
          font-size: 2rem;
          color: #ff6b35;
          margin-top: 5px;
        }

        .cta-content {
          flex: 1;
        }

        .cta-content h4 {
          color: #2a5298;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .cta-content p {
          color: #6c757d;
          margin-bottom: 0;
          line-height: 1.6;
        }

        .appointment-btn {
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          border: none;
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 25px;
          color: white;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .appointment-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .stat-item {
          background: white;
          padding: 30px 25px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          border-top: 4px solid #2a5298;
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2a5298;
          margin-bottom: 5px;
          font-family: 'Arial', sans-serif;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }

        .stat-bar {
          width: 100%;
          height: 4px;
          background: #e9ecef;
          border-radius: 2px;
          overflow: hidden;
        }

        .stat-progress {
          height: 100%;
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          width: 0%;
          animation: progressFill 2s ease-out 2s forwards;
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .cta-section {
            flex-direction: column;
            text-align: center;
          }

          .stat-number {
            font-size: 2rem;
          }
        }

        @media (max-width: 576px) {
          .section-title {
            font-size: 1.8rem;
          }

          .story-description {
            font-size: 1rem;
          }

          .cta-section {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default OurStory;