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
            text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to the mental health issues...",
            avatar: "AD",
            rating: 5,
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "Rahul Sharma",
            contributions: "8 contributions",
            text: "The team at Sunshine Counseling has been incredibly supportive. Their professional approach and compassionate care...",
            avatar: "RS",
            rating: 4,
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "Priya Patel",
            contributions: "12 contributions",
            text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients...",
            avatar: "PP",
            rating: 5,
            date: "2024-01-08",
            verified: true
        },
        {
            id: 4,
            name: "Michael Chen",
            contributions: "6 contributions",
            text: "A safe and welcoming environment where I felt comfortable sharing my thoughts...",
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
            }, 3500);
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
            <section className="testimonials-section py-4">
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
        <section className="testimonials-section py-4">
            <Container>
                <Row className="justify-content-center mb-4">
                    <Col lg={8} className="text-center">
                        <div className="section-header">
                            <h2 className="section-title animate-title">Client Testimonials</h2>
                            <p className="section-subtitle animate-subtitle">
                                Real stories from our valued clients
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                        {error ? (
                            <div className="error-state">
                                <div className="error-icon">⚠️</div>
                                <h4>Unable to Load</h4>
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
                                <h4>No Testimonials</h4>
                                <p>Share your experience!</p>
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
                                                    </div>
                                                    <div className="client-info">
                                                        <h4 className="client-name">{testimonial.name}</h4>
                                                        <div className="client-meta">
                                                            <div className="rating-container">
                                                                {renderStars(testimonial.rating)}
                                                            </div>
                                                            {testimonial.verified && (
                                                                <span className="verified-badge">
                                                                    ✓ Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card-body">
                                                    <p className="testimonial-text">{testimonial.text}</p>
                                                </div>

                                                <div className="card-footer">
                                                    <div className="footer-content">
                                                        <span className="contributions">{testimonial.contributions}</span>
                                                        <span className="review-date">
                                                            {new Date(testimonial.date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
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
                                                />
                                            ))}
                                        </div>
                                        <div className="arrow-buttons">
                                            <button className="slider-arrow prev-arrow" onClick={prevSlide}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                            <button className="slider-arrow next-arrow" onClick={nextSlide}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
            </div>

            <style jsx>{`
                .testimonials-section {
                    background: linear-gradient(135deg, #fafcff 0%, #f0f5ff 100%);
                    position: relative;
                    overflow: hidden;
                    padding: 60px 0;
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
                    background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
                    animation: float 25s infinite linear;
                }

                .element-1 {
                    width: 80px;
                    height: 80px;
                    top: 15%;
                    left: 8%;
                    animation-delay: 0s;
                }

                .element-2 {
                    width: 60px;
                    height: 60px;
                    bottom: 20%;
                    right: 10%;
                    animation-delay: 12s;
                }

                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateY(-100px) rotate(180deg);
                        opacity: 0.4;
                    }
                    100% {
                        transform: translateY(0) rotate(360deg);
                        opacity: 0.8;
                    }
                }

                /* Loading State */
                .loading-testimonials {
                    text-align: center;
                    padding: 30px;
                    position: relative;
                    z-index: 2;
                }

                .loading-spinner {
                    width: 32px;
                    height: 32px;
                    border: 2px solid rgba(42, 82, 152, 0.1);
                    border-top: 2px solid #2a5298;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 12px;
                }

                .loading-text {
                    color: #64748b;
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                /* Error State */
                .error-state {
                    text-align: center;
                    padding: 30px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
                    position: relative;
                    z-index: 2;
                }

                .error-icon {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                    color: #f59e0b;
                }

                .error-state h4 {
                    color: #dc2626;
                    margin-bottom: 8px;
                    font-size: 1.1rem;
                }

                .error-state p {
                    color: #64748b;
                    margin-bottom: 20px;
                    font-size: 0.85rem;
                }

                .retry-btn {
                    background: #2a5298;
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.85rem;
                }

                .retry-btn:hover {
                    background: #1e3c72;
                    transform: translateY(-1px);
                }

                /* No Testimonials State */
                .no-testimonials {
                    text-align: center;
                    padding: 30px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
                    position: relative;
                    z-index: 2;
                }

                .no-testimonials-icon {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                    color: #2a5298;
                }

                .no-testimonials h4 {
                    color: #2a5298;
                    margin-bottom: 8px;
                    font-size: 1.1rem;
                }

                .no-testimonials p {
                    color: #64748b;
                    font-size: 0.85rem;
                }

                /* Section Header */
                .section-header {
                    margin-bottom: 30px;
                    position: relative;
                    z-index: 2;
                }

                .section-title {
                    color: #1e293b;
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                    opacity: 0;
                    transform: translateY(15px);
                    animation: titleSlideIn 0.6s ease-out 0.2s forwards;
                }

                .section-subtitle {
                    color: #64748b;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    max-width: 400px;
                    margin: 0 auto;
                    opacity: 0;
                    transform: translateY(15px);
                    animation: subtitleSlideIn 0.6s ease-out 0.3s forwards;
                }

                /* Slider Container */
                .testimonial-slider {
                    position: relative;
                    padding: 15px 0;
                    z-index: 2;
                }

                .slider-container {
                    position: relative;
                    height: 220px; /* Reduced from 280px */
                    overflow: hidden;
                    margin-bottom: 20px;
                }

                /* Testimonial Slide */
                .testimonial-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    transform: translateX(40px) scale(0.97);
                    pointer-events: none;
                }

                .testimonial-slide.active {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                    pointer-events: all;
                }

                .testimonial-slide.prev {
                    opacity: 0.3;
                    transform: translateX(-100%) scale(0.95);
                }

                .testimonial-slide.next {
                    opacity: 0.3;
                    transform: translateX(100%) scale(0.95);
                }

                /* Testimonial Card */
                .testimonial-card {
                    background: white;
                    border-radius: 14px;
                    padding: 20px;
                    height: 100%;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    border: 1px solid rgba(226, 232, 240, 0.6);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .testimonial-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                }

                .testimonial-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #ff6b35, #ff8e53);
                }

                /* Card Header */
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 14px;
                }

                .avatar-container {
                    flex-shrink: 0;
                }

                .avatar-circle {
                    width: 40px; /* Reduced from 48px */
                    height: 40px; /* Reduced from 48px */
                    background: linear-gradient(135deg, #2a5298, #1e3c72);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 0.9rem; /* Reduced from 1rem */
                    box-shadow: 0 3px 8px rgba(42, 82, 152, 0.2);
                }

                .client-info {
                    flex: 1;
                    min-width: 0;
                }

                .client-name {
                    color: #1e293b;
                    font-size: 0.95rem; /* Reduced from 1rem */
                    font-weight: 600;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .client-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .rating-container {
                    display: flex;
                    align-items: center;
                }

                .star {
                    font-size: 0.85rem; /* Reduced from 1rem */
                    color: #e2e8f0;
                    margin-right: 1px;
                }

                .star.filled {
                    color: #fbbf24;
                }

                .verified-badge {
                    color: #10b981;
                    font-size: 0.75rem; /* Reduced from 0.75rem */
                    font-weight: 600;
                    background: rgba(16, 185, 129, 0.1);
                    padding: 2px 6px;
                    border-radius: 8px;
                    display: inline-flex;
                    align-items: center;
                    gap: 2px;
                }

                /* Card Body */
                .card-body {
                    flex: 1;
                    margin-bottom: 14px;
                }

                .testimonial-text {
                    color: #475569;
                    font-size: 0.85rem; /* Reduced from 0.9rem */
                    line-height: 1.5;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Card Footer */
                .card-footer {
                    padding-top: 12px;
                    border-top: 1px solid rgba(226, 232, 240, 0.5);
                    margin-top: auto;
                }

                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .contributions {
                    color: #ff6b35;
                    font-size: 0.75rem; /* Reduced from 0.75rem */
                    font-weight: 600;
                    background: rgba(255, 107, 53, 0.08);
                    padding: 3px 8px;
                    border-radius: 6px;
                }

                .review-date {
                    color: #94a3b8;
                    font-size: 0.75rem; /* Reduced from 0.75rem */
                    font-weight: 500;
                }

                /* Slider Controls */
                .slider-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .dots-container {
                    display: flex;
                    gap: 6px;
                }

                .slider-dot {
                    width: 6px; /* Reduced from 8px */
                    height: 6px; /* Reduced from 8px */
                    border-radius: 50%;
                    border: none;
                    background: #cbd5e1;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .slider-dot.active {
                    background: #ff6b35;
                    width: 18px; /* Reduced from 24px */
                    border-radius: 9px;
                }

                .slider-dot:hover {
                    background: #94a3b8;
                    transform: scale(1.1);
                }

                .arrow-buttons {
                    display: flex;
                    gap: 6px;
                }

                .slider-arrow {
                    width: 32px; /* Reduced from 40px */
                    height: 32px; /* Reduced from 40px */
                    border: none;
                    border-radius: 50%;
                    background: white;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
                    border: 1px solid #e2e8f0;
                }

                .slider-arrow:hover {
                    background: #2a5298;
                    color: white;
                    border-color: #2a5298;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(42, 82, 152, 0.2);
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

                /* Responsive Design */
                @media (max-width: 992px) {
                    .testimonials-section {
                        padding: 50px 0;
                    }
                    
                    .section-title {
                        font-size: 1.5rem;
                    }
                    
                    .slider-container {
                        height: 200px;
                    }
                }

                @media (max-width: 768px) {
                    .testimonials-section {
                        padding: 40px 0;
                    }
                    
                    .section-title {
                        font-size: 1.4rem;
                    }
                    
                    .slider-container {
                        height: 180px;
                    }
                    
                    .testimonial-card {
                        padding: 16px;
                    }
                    
                    .testimonial-text {
                        font-size: 0.82rem;
                    }
                }

                @media (max-width: 576px) {
                    .testimonials-section {
                        padding: 30px 0;
                    }
                    
                    .section-title {
                        font-size: 1.3rem;
                    }
                    
                    .section-subtitle {
                        font-size: 0.85rem;
                    }
                    
                    .slider-container {
                        height: 190px;
                    }
                    
                    .testimonial-card {
                        padding: 14px;
                    }
                    
                    .avatar-circle {
                        width: 36px;
                        height: 36px;
                        font-size: 0.85rem;
                    }
                    
                    .client-name {
                        font-size: 0.9rem;
                    }
                    
                    .testimonial-text {
                        font-size: 0.8rem;
                        -webkit-line-clamp: 4;
                    }
                    
                    .slider-controls {
                        flex-direction: column;
                        gap: 12px;
                        align-items: center;
                    }
                    
                    .arrow-buttons {
                        order: -1;
                    }
                }

                @media (max-width: 400px) {
                    .slider-container {
                        height: 200px;
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