import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientTestimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            id: 1,
            name: "Akanksha Damare",
            contributions: "14 contributions",
            text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to the mental health issues. But with my parents guidance I decided to give it a chance. I had few very fruitful sessions with one of the counsellor... They understood my issues in detail and provided excellent support throughout my journey.",
            avatar: "AD"
        },
        {
            id: 2,
            name: "Rahul Sharma",
            contributions: "8 contributions",
            text: "The team at Sunshine Counseling has been incredibly supportive. Their professional approach and compassionate care helped me overcome my anxiety and depression. I'm forever grateful for their guidance.",
            avatar: "RS"
        },
        {
            id: 3,
            name: "Priya Patel",
            contributions: "12 contributions",
            text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients. My mental health has improved significantly since I started sessions here.",
            avatar: "PP"
        },
        {
            id: 4,
            name: "Michael Chen",
            contributions: "6 contributions",
            text: "A safe and welcoming environment where I felt comfortable sharing my thoughts. The personalized approach made all the difference in my recovery journey.",
            avatar: "MC"
        }
    ];

    useEffect(() => {
        if (isAutoPlaying) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, testimonials.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="testimonials-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <div className="section-header animate-fade-in">
                            <h2 className="section-titles">What Our Client Say</h2>
                            <p className="section-subtitle">
                                A simple thank you goes a long way and will not only make your employees feel good,
                                but will actually benefit your business in the process.
                            </p>
                            <div className="divider"></div>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div
                            className="testimonial-slider"
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                        >
                            <div className="slider-container">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={testimonial.id}
                                        className={`testimonial-slide ${index === currentSlide ? 'active' :
                                                index === (currentSlide - 1 + testimonials.length) % testimonials.length ? 'prev' :
                                                    index === (currentSlide + 1) % testimonials.length ? 'next' : 'hidden'
                                            }`}
                                    >
                                        <div className="testimonial-card">
                                            <div className="quote-icon">"</div>

                                            <div className="testimonial-content">
                                                <p className="testimonial-text">{testimonial.text}</p>

                                                <div className="client-info">
                                                    <div className="avatar">{testimonial.avatar}</div>
                                                    <div className="client-details">
                                                        <h4 className="client-name">{testimonial.name}</h4>
                                                        <span className="client-contributions">{testimonial.contributions}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button className="slider-arrow prev-arrow" onClick={prevSlide}>
                                <span>‹</span>
                            </button>
                            <button className="slider-arrow next-arrow" onClick={nextSlide}>
                                <span>›</span>
                            </button>

                            {/* Dots Indicator */}
                            <div className="slider-dots">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
        .testimonials-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          position: relative;
          overflow: hidden;
        }

        /* Animations */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.3s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateX(100px) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideOut {
          from { 
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to { 
            opacity: 0;
            transform: translateX(-100px) scale(0.9);
          }
        }

        /* Section Header */
        .sections-title {
          color: #2a5298;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .section-subtitle {
          color: #6c757d;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 30px;
        }

        .divider {
          width: 80px;
          height: 3px;
          background: linear-gradient(45deg, #ff6b35, #ff8e53);
          margin: 0 auto 40px;
          border-radius: 2px;
          animation: expandWidth 1s ease-out 0.8s forwards;
          transform-origin: left;
        }

        @keyframes expandWidth {
          from { width: 0; }
          to { width: 80px; }
        }

        /* Slider Styles */
        .testimonial-slider {
          position: relative;
          padding: 40px 0;
        }

        .slider-container {
          position: relative;
          height: 400px;
          overflow: hidden;
        }

        .testimonial-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-slide.active {
          opacity: 1;
          transform: translateX(0) scale(1);
          z-index: 3;
          animation: slideIn 0.6s ease-out;
        }

        .testimonial-slide.prev {
          opacity: 0.3;
          transform: translateX(-100%) scale(0.8);
          z-index: 1;
        }

        .testimonial-slide.next {
          opacity: 0.3;
          transform: translateX(100%) scale(0.8);
          z-index: 1;
        }

        .testimonial-slide.hidden {
          opacity: 0;
          transform: translateX(100%) scale(0.8);
          z-index: 0;
        }

        /* Testimonial Card */
        .testimonial-card {
          background: white;
          padding: 50px 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #ff6b35;
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quote-icon {
          font-size: 4rem;
          color: #ff6b35;
          opacity: 0.2;
          position: absolute;
          top: 20px;
          left: 30px;
          font-family: serif;
          line-height: 1;
        }

        .testimonial-content {
          position: relative;
          z-index: 2;
        }

        .testimonial-text {
          color: #495057;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 30px;
          font-style: italic;
        }

        /* Client Info */
        .client-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(45deg, #2a5298, #1e3c72);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          box-shadow: 0 5px 15px rgba(42, 82, 152, 0.3);
        }

        .client-details h4 {
          color: #2a5298;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .client-contributions {
          color: #ff6b35;
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* Navigation Arrows */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          color: #2a5298;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slider-arrow:hover {
          background: #2a5298;
          color: white;
          transform: translateY(-50%) scale(1.1);
        }

        .prev-arrow {
          left: -25px;
        }

        .next-arrow {
          right: -25px;
        }

        /* Dots Indicator */
        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #dee2e6;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #ff6b35;
          transform: scale(1.3);
        }

        .dot:hover {
          background: #2a5298;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .sections-title {
            font-size: 2rem;
          }

          .testimonial-card {
            padding: 30px 25px;
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .slider-arrow {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }

          .prev-arrow {
            left: -10px;
          }

          .next-arrow {
            right: -10px;
          }

          .slider-container {
            height: 450px;
          }
        }

        @media (max-width: 576px) {
          .section-titles {
            font-size: 1.8rem;
          }

          .testimonial-card {
            padding: 25px 20px;
          }

          .client-info {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .slider-container {
            height: 500px;
          }
        }
      `}</style>
        </section>
    );
};

export default ClientTestimonials;