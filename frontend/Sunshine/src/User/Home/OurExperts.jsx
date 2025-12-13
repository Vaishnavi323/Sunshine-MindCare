import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import expertImage1 from '../../assets/Our_experts1.jpg'; // Image 1
import expertImage2 from '../../assets/Our_experts2.jpg'; // Image 2 - replace with actual path
import expertImage3 from '../../assets/Our_experts3.jpg'; // Image 3 - replace with actual path

const OurExperts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Image data array
  const images = [
    {
      src: expertImage1,
      alt: "Expert Counseling Session",
    },
    {
      src: expertImage2,
      alt: "Mental Wellness Support",
    },
    {
      src: expertImage3,
      alt: "Therapy Session",
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
                <Button className="view-all-btn">
                  View All Team
                </Button>
              </Link>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="image-wrapper position-relative">
              {/* Slider Container */}
              <div className="slider-container">
                <div className="slider-wrapper">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`slide ${index === currentSlide ? 'active' : ''} ${
                        index === (currentSlide - 1 + images.length) % images.length ? 'prev' : ''
                      } ${
                        index === (currentSlide + 1) % images.length ? 'next' : ''
                      }`}
                    >
                      <div
                        className="slide-image"
                        style={{
                          backgroundImage: `url(${image.src})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '20px',
                          height: '400px',
                          position: 'relative',
                          zIndex: 2,
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                        }}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button 
                  className="slider-nav prev-btn"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                <button 
                  className="slider-nav next-btn"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

                {/* Dots Indicator */}
                <div className="dots-container">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="slide-counter">
                  {currentSlide + 1} / {images.length}
                </div>
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
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .experts-section {
          background: linear-gradient(135deg, #346fdecb 0%, #2a5298b1 100%);
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
          background: #ff6b35f8;
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
          box-shadow: 0 10px 20px rgba(255, 107, 53, 0.4);
        }
        
        /* Slider Styles */
        .slider-container {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .slider-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        
        .slide.active {
          opacity: 1;
          transform: translateX(0);
          z-index: 3;
        }
        
        .slide.prev {
          opacity: 0.3;
          transform: translateX(-100%);
          z-index: 2;
        }
        
        .slide.next {
          opacity: 0.3;
          transform: translateX(100%);
          z-index: 2;
        }
        
        .slide-image {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
        
        /* Navigation Buttons */
        .slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 107, 53, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          opacity: 0;
        }
        
        .slider-container:hover .slider-nav {
          opacity: 1;
        }
        
        .slider-nav:hover {
          background: #ff6b35;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 5px 15px rgba(255, 107, 53, 0.5);
        }
        
        .prev-btn {
          left: 20px;
        }
        
        .next-btn {
          right: 20px;
        }
        
        /* Dots Indicator */
        .dots-container {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        
        .dot.active {
          background: #ff6b35;
          border-color: #ff6b35;
          transform: scale(1.2);
        }
        
        .dot:hover {
          background: rgba(255, 107, 53, 0.5);
          transform: scale(1.1);
        }
        
        /* Slide Counter */
        .slide-counter {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          z-index: 10;
          backdrop-filter: blur(5px);
        }
        
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
          z-index: 11;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: floatElement 8s ease-in-out infinite;
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
          animation-delay: 0s;
        }
        
        .element-2 {
          top: 60%;
          right: -5%;
          animation-delay: 1s;
        }
        
        .element-3 {
          bottom: 10%;
          left: 0%;
          animation-delay: 2s;
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
        
        /* Image Wrapper */
        .image-wrapper {
          padding: 30px;
          position: relative;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
          .slider-container {
            height: 350px;
          }
          
          .slide-image {
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
          
          .slider-container {
            height: 300px;
          }
          
          .slide-image {
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
          
          .slider-nav {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            opacity: 1; /* Always visible on mobile */
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
          
          .slider-container {
            height: 250px;
          }
          
          .slide-image {
            height: 250px !important;
          }
          
          .floating-element {
            transform: scale(0.7);
          }
          
          .dots-container {
            bottom: 10px;
          }
          
          .slide-counter {
            top: 10px;
            right: 10px;
            font-size: 0.8rem;
            padding: 3px 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default OurExperts;