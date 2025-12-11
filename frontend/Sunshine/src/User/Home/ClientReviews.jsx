import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientTestimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;    

    // Fetch approved feedbacks from API
    const fetchApprovedFeedbacks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${backendUrl}/feedback/getapproved`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.status && result.data) {
                // Transform API data to match our component structure
                const transformedTestimonials = result.data.map(feedback => ({
                    id: feedback.id,
                    name: feedback.full_name || 'Anonymous',
                    rating: parseInt(feedback.rating) || 0,
                    date: feedback.created_at ? feedback.created_at.split(' ')[0] : new Date().toISOString().split('T')[0],
                    text: feedback.message || 'No message provided',
                    avatar: getInitials(feedback.full_name || 'Anonymous'),
                    verified: feedback.status === "1",
                    contributions: getRandomContributions()
                }));
                setTestimonials(transformedTestimonials);
            } else {
                throw new Error(result.message || 'Failed to fetch testimonials');
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setError(error.message || 'Failed to load testimonials. Please try again later.');
            // Fallback to mock data if API fails
            setTestimonials(getMockTestimonials());
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get initials for avatar
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Helper function to generate random contributions
    const getRandomContributions = () => {
        const contributions = [1, 2, 3, 5, 8, 10, 12, 14];
        return `${contributions[Math.floor(Math.random() * contributions.length)]} contributions`;
    };

    // Fallback mock data
    const getMockTestimonials = () => [
        {
            id: 1,
            name: "Akanksha Damare",
            contributions: "14 contributions",
            text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to the mental health issues. But with my parents guidance I decided to give it a chance. I had few very fruitful sessions with one of the counsellor...",
            avatar: "AD",
            rating: 5,
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "Rahul Sharma",
            contributions: "8 contributions",
            text: "The team at Sunshine Counseling has been incredibly supportive. Their professional approach and compassionate care helped me overcome my anxiety and depression.",
            avatar: "RS",
            rating: 4,
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "Priya Patel",
            contributions: "12 contributions",
            text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients. My mental health has improved significantly.",
            avatar: "PP",
            rating: 5,
            date: "2024-01-08",
            verified: true
        },
        {
            id: 4,
            name: "Michael Chen",
            contributions: "6 contributions",
            text: "A safe and welcoming environment where I felt comfortable sharing my thoughts. The personalized approach made all the difference.",
            avatar: "MC",
            rating: 4,
            date: "2024-01-05",
            verified: true
        }
    ];

    useEffect(() => {
        fetchApprovedFeedbacks();
    }, []);

    useEffect(() => {
        if (isAutoPlaying && testimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
            }, 4000);
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

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
                <span
                    key={index}
                    className={`star ${starValue <= rating ? 'filled' : ''}`}
                >
                    ★
                </span>
            );
        });
    };

    if (loading) {
        return (
            <section className="testimonials-section py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-testimonials">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Loading testimonials...</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }

    return (
        <section className="testimonials-section py-5">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={8} className="text-center">
                        <div className="section-header">
                            <h2 className="section-title animate-title">What Our Clients Say</h2>
                            <p className="section-subtitle animate-subtitle">
                                Real experiences from our valued clients. Your feedback helps us grow and improve our services.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={10}>
                        {error ? (
                            <div className="error-state">
                                <div className="error-icon">⚠️</div>
                                <h4>Unable to Load Testimonials</h4>
                                <p>{error}</p>
                                <button 
                                    className="retry-btn"
                                    onClick={fetchApprovedFeedbacks}
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : testimonials.length === 0 ? (
                            <div className="no-testimonials">
                                <div className="no-testimonials-icon">💬</div>
                                <h4>No Testimonials Yet</h4>
                                <p>Be the first to share your experience!</p>
                            </div>
                        ) : (
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
                                                        index === (currentSlide + 1) % testimonials.length ? 'next' : ''
                                                }`}
                                        >
                                            <div className="testimonial-card">
                                                <div className="card-header">
                                                    <div className="avatar-container">
                                                        <div className="avatar-circle">
                                                            <div className="avatar-initials">{testimonial.avatar}</div>
                                                        </div>
                                                        <div className="avatar-glow"></div>
                                                    </div>
                                                    <div className="client-info">
                                                        <h4 className="client-name">{testimonial.name}</h4>
                                                        <div className="client-meta">
                                                            <span className="client-contributions">{testimonial.contributions}</span>
                                                            {testimonial.verified && (
                                                                <span className="verified-badge">
                                                                    <span className="verified-icon">✓</span>
                                                                    Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <div className="testimonial-rating">
                                                        {renderStars(testimonial.rating)}
                                                    </div>
                                                    <p className="testimonial-text">{testimonial.text}</p>
                                                </div>

                                                <div className="card-footer">
                                                    <span className="review-date">
                                                        {new Date(testimonial.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Controls */}
                                {testimonials.length > 1 && (
                                    <div className="slider-controls">
                                        <div className="dots-container">
                                            {testimonials.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                                    onClick={() => goToSlide(index)}
                                                    aria-label={`Go to testimonial ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="arrow-buttons">
                                            <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous testimonial">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next testimonial">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Decorative Elements */}
            <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
                <div className="floating-element element-4"></div>
            </div>

            <style jsx>{`
                .testimonials-section {
                    background: linear-gradient(135deg, #f8fafc 0%, #e9f2ff 100%);
                    position: relative;
                    overflow: hidden;
                    padding: 80px 0;
                }

                /* Floating Elements */
                .floating-elements {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-element {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(42, 82, 152, 0.1) 0%, transparent 70%);
                    animation: float 20s infinite ease-in-out;
                }

                .element-1 {
                    width: 120px;
                    height: 120px;
                    top: 10%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .element-2 {
                    width: 80px;
                    height: 80px;
                    bottom: 20%;
                    right: 10%;
                    animation-delay: 5s;
                }

                .element-3 {
                    width: 100px;
                    height: 100px;
                    top: 40%;
                    right: 15%;
                    animation-delay: 10s;
                }

                .element-4 {
                    width: 60px;
                    height: 60px;
                    bottom: 40%;
                    left: 8%;
                    animation-delay: 15s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 40px) scale(0.9);
                    }
                }

                /* Loading State */
                .loading-testimonials {
                    text-align: center;
                    padding: 40px;
                    position: relative;
                    z-index: 2;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(42, 82, 152, 0.1);
                    border-top: 3px solid #2a5298;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }

                .loading-text {
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                /* Error State */
                .error-state {
                    text-align: center;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    position: relative;
                    z-index: 2;
                }

                .error-icon {
                    font-size: 3rem;
                    margin-bottom: 20px;
                }

                .error-state h4 {
                    color: #ef4444;
                    margin-bottom: 12px;
                    font-size: 1.25rem;
                }

                .error-state p {
                    color: #64748b;
                    margin-bottom: 24px;
                    font-size: 0.95rem;
                }

                .retry-btn {
                    background: linear-gradient(135deg, #2a5298, #1e3c72);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                }

                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
                }

                /* No Testimonials State */
                .no-testimonials {
                    text-align: center;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    position: relative;
                    z-index: 2;
                }

                .no-testimonials-icon {
                    font-size: 3rem;
                    margin-bottom: 20px;
                }

                .no-testimonials h4 {
                    color: #2a5298;
                    margin-bottom: 12px;
                    font-size: 1.25rem;
                }

                .no-testimonials p {
                    color: #64748b;
                    font-size: 0.95rem;
                }

                /* Section Header */
                .section-header {
                    margin-bottom: 40px;
                    position: relative;
                    z-index: 2;
                }

                .section-title {
                    color: #1e293b;
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin-bottom: 16px;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: titleSlideIn 0.8s ease-out 0.2s forwards;
                }

                .section-subtitle {
                    color: #64748b;
                    font-size: 1rem;
                    line-height: 1.6;
                    max-width: 500px;
                    margin: 0 auto;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: subtitleSlideIn 0.8s ease-out 0.4s forwards;
                }

                /* Slider Container */
                .testimonial-slider {
                    position: relative;
                    padding: 20px 0;
                    z-index: 2;
                }

                .slider-container {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }

                /* Testimonial Slide */
                .testimonial-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: translateX(50px) scale(0.95);
                    pointer-events: none;
                }

                .testimonial-slide.active {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                    pointer-events: all;
                }

                .testimonial-slide.prev {
                    opacity: 0.5;
                    transform: translateX(-100%) scale(0.9);
                }

                .testimonial-slide.next {
                    opacity: 0.5;
                    transform: translateX(100%) scale(0.9);
                }

                /* Testimonial Card */
                .testimonial-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 24px;
                    height: 100%;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .testimonial-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #ff6b35, #ff8e53);
                    opacity: 0.8;
                }

                .testimonial-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
                }

                /* Card Header */
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }

                .avatar-container {
                    position: relative;
                    width: 48px;
                    height: 48px;
                }

                .avatar-circle {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #2a5298, #1e3c72);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1rem;
                    position: relative;
                    z-index: 1;
                }

                .avatar-glow {
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(135deg, rgba(42, 82, 152, 0.3), rgba(255, 107, 53, 0.3));
                    border-radius: 50%;
                    animation: avatarGlow 2s ease-in-out infinite alternate;
                }

                .client-info {
                    flex: 1;
                }

                .client-name {
                    color: #1e293b;
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 4px;
                    line-height: 1.2;
                }

                .client-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .client-contributions {
                    color: #ff6b35;
                    font-size: 0.75rem;
                    font-weight: 600;
                    background: rgba(255, 107, 53, 0.1);
                    padding: 2px 8px;
                    border-radius: 12px;
                }

                .verified-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    color: #10b981;
                    font-size: 0.75rem;
                    font-weight: 600;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 2px 8px;
                    border-radius: 12px;
                }

                .verified-icon {
                    font-size: 0.7rem;
                    font-weight: bold;
                }

                /* Card Body */
                .card-body {
                    flex: 1;
                    margin-bottom: 16px;
                }

                .testimonial-rating {
                    margin-bottom: 12px;
                }

                .testimonial-rating .star {
                    font-size: 1rem;
                    color: #e2e8f0;
                    margin-right: 2px;
                }

                .testimonial-rating .star.filled {
                    color: #fbbf24;
                }

                .testimonial-text {
                    color: #475569;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Card Footer */
                .card-footer {
                    border-top: 1px solid rgba(226, 232, 240, 0.5);
                    padding-top: 12px;
                    margin-top: auto;
                }

                .review-date {
                    color: #94a3b8;
                    font-size: 0.75rem;
                    font-weight: 500;
                }

                /* Slider Controls */
                .slider-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 24px;
                }

                .dots-container {
                    display: flex;
                    gap: 8px;
                }

                .slider-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: #cbd5e1;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .slider-dot.active {
                    background: linear-gradient(135deg, #ff6b35, #ff8e53);
                    width: 24px;
                    border-radius: 12px;
                }

                .slider-dot:hover {
                    background: #94a3b8;
                    transform: scale(1.2);
                }

                .arrow-buttons {
                    display: flex;
                    gap: 8px;
                }

                .slider-arrow {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    background: white;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }

                .slider-arrow:hover {
                    background: linear-gradient(135deg, #2a5298, #1e3c72);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(42, 82, 152, 0.3);
                }

                /* Animations */
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes titleSlideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes subtitleSlideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes avatarGlow {
                    0% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(1.1);
                        opacity: 0.3;
                    }
                }

                /* Responsive Design */
                @media (max-width: 992px) {
                    .section-title {
                        font-size: 2rem;
                    }
                    
                    .slider-container {
                        height: 300px;
                    }
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 1.75rem;
                    }
                    
                    .slider-container {
                        height: 320px;
                    }
                    
                    .testimonial-card {
                        padding: 20px;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: 1.5rem;
                    }
                    
                    .section-subtitle {
                        font-size: 0.9rem;
                    }
                    
                    .slider-container {
                        height: 340px;
                    }
                    
                    .testimonial-card {
                        padding: 16px;
                    }
                    
                    .avatar-circle {
                        width: 40px;
                        height: 40px;
                        font-size: 0.9rem;
                    }
                    
                    .testimonial-text {
                        font-size: 0.85rem;
                        -webkit-line-clamp: 4;
                    }
                    
                    .slider-controls {
                        flex-direction: column;
                        gap: 16px;
                        align-items: center;
                    }
                    
                    .arrow-buttons {
                        order: -1;
                    }
                }

                @media (max-width: 400px) {
                    .slider-container {
                        height: 360px;
                    }
                    
                    .testimonial-text {
                        -webkit-line-clamp: 5;
                    }
                }
            `}</style>
        </section>
    );
};

export default ClientTestimonials;