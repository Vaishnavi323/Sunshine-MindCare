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
            text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to the mental health issues. But with my parents guidance I decided to give it a chance. I had few very fruitful sessions with one of the counsellor... They understood my issues in detail and provided excellent support throughout my journey.",
            avatar: "AD",
            rating: 5,
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "Rahul Sharma",
            contributions: "8 contributions",
            text: "The team at Sunshine Counseling has been incredibly supportive. Their professional approach and compassionate care helped me overcome my anxiety and depression. I'm forever grateful for their guidance.",
            avatar: "RS",
            rating: 4,
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "Priya Patel",
            contributions: "12 contributions",
            text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients. My mental health has improved significantly since I started sessions here.",
            avatar: "PP",
            rating: 5,
            date: "2024-01-08",
            verified: true
        },
        {
            id: 4,
            name: "Michael Chen",
            contributions: "6 contributions",
            text: "A safe and welcoming environment where I felt comfortable sharing my thoughts. The personalized approach made all the difference in my recovery journey.",
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
        if (isAutoPlaying && testimonials.length > 0) {
            const interval = setInterval(() => {
                // advance start index but stop at last possible start to avoid empty space
                const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
                setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, testimonials.length]);

    const nextSlide = () => {
        const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
        setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
    };

    const prevSlide = () => {
        const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
        setCurrentSlide((prev) => (prev <= 0 ? maxStart : prev - 1));
    };

    const goToSlide = (index) => {
        const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
        const clamped = Math.min(Math.max(0, index), maxStart);
        setCurrentSlide(clamped);
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
                                <div className="loading-spinner-large"></div>
                                <p>Loading testimonials...</p>
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
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <div className="section-header animate-fade-in">
                            <h2 className="sectionss-title">What Our Clients Say</h2>
                            <p className="section-subtitle">
                                Real experiences from our valued clients. Your feedback helps us grow and improve our services.
                            </p>
                            <div className="divider"></div>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={8}>
                        {error ? (
                            <div className="error-state text-center">
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
                            <div className="no-testimonials text-center">
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
                                    <div
                                        className="slider-track"
                                        style={{
                                            transform: `translateX(-${currentSlide * 50}%)`,
                                            width: `${testimonials.length * 50}%`
                                        }}
                                    >
                                        {testimonials.map((testimonial) => (
                                            <div key={testimonial.id} className="testimonial-slide">
                                                <div className="testimonial-card">
                                                    <div className="quote-icon">"</div>

                                                    <div className="testimonial-content">
                                                        <div className="testimonial-rating">
                                                            {renderStars(testimonial.rating)}
                                                        </div>

                                                        <p className="testimonial-text">{testimonial.text}</p>

                                                        <div className="client-info">
                                                            <div className="avatar">{testimonial.avatar}</div>
                                                            <div className="client-details">
                                                                <h4 className="client-name">{testimonial.name}</h4>
                                                                <div className="client-meta">
                                                                    <span className="client-contributions">{testimonial.contributions}</span>
                                                                    {testimonial.verified && (
                                                                        <span className="verified-badge">✓ Verified</span>
                                                                    )}
                                                                </div>
                                                                <span className="review-date">
                                                                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Arrows */}
                                {testimonials.length > 1 && (
                                    <>
                                        <button className="slider-arrow prev-arrow" onClick={prevSlide}>
                                            <span>‹</span>
                                        </button>
                                        <button className="slider-arrow next-arrow" onClick={nextSlide}>
                                            <span>›</span>
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="slider-dots">
                                            {Array.from({ length: Math.max(1, (testimonials.length > 2 ? testimonials.length - 2 : 0) + 1) }).map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`dot ${idx === currentSlide ? 'active' : ''}`}
                                                    onClick={() => goToSlide(idx)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .testimonials-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    position: relative;
                    overflow: hidden;
                }

                /* Loading State */
                .loading-testimonials {
                    text-align: center;
                    padding: 4rem 2rem;
                }

                .loading-spinner-large {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #e9ecef;
                    border-top: 4px solid #2a5298;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }

                /* Error State */
                .error-state {
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .error-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .error-state h4 {
                    color: #dc3545;
                    margin-bottom: 1rem;
                }

                .error-state p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }

                .retry-btn {
                    background: #2a5298;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .retry-btn:hover {
                    background: #1e3c72;
                    transform: translateY(-2px);
                }

                /* No Testimonials State */
                .no-testimonials {
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .no-testimonials-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .no-testimonials h4 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .no-testimonials p {
                    color: #6c757d;
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

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Section Header */
                .sectionss-title {
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

                /* Slider Styles - two cards visible */
                .testimonial-slider {
                    position: relative;
                    padding: 40px 0;
                }

                .slider-container {
                    position: relative;
                    height: 320px;
                    overflow: hidden;
                }

                .slider-track {
                    display: flex;
                    align-items: stretch;
                    height: 100%;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .testimonial-slide {
                    position: relative;
                    width: 50%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 0 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Testimonial Card */
                .testimonial-card {
                    background: white;
                    padding: 30px 25px;
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
                    font-size: 2.5rem;
                    color: #ff6b35;
                    opacity: 0.2;
                    position: absolute;
                    top: 15px;
                    left: 20px;
                    font-family: serif;
                    line-height: 1;
                }

                .testimonial-content {
                    position: relative;
                    z-index: 2;
                }

                /* Rating Stars */
                .testimonial-rating {
                    margin-bottom: 15px;
                }

                .testimonial-rating .star {
                    font-size: 1rem;
                    color: #e9ecef;
                    margin-right: 2px;
                }

                .testimonial-rating .star.filled {
                    color: #ffc107;
                }

                .testimonial-text {
                    color: #495057;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 20px;
                    font-style: italic;
                }

                /* Client Info */
                .client-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 1rem;
                    box-shadow: 0 5px 15px rgba(42, 82, 152, 0.3);
                    flex-shrink: 0;
                }

                .client-details {
                    flex: 1;
                }

                .client-details h4 {
                    color: #2a5298;
                    font-weight: 700;
                    margin-bottom: 3px;
                    font-size: 0.95rem;
                }

                .client-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 3px;
                }

                .client-contributions {
                    color: #ff6b35;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .verified-badge {
                    background: #28a745;
                    color: white;
                    padding: 1px 6px;
                    border-radius: 8px;
                    font-size: 0.65rem;
                    font-weight: 600;
                }

                .review-date {
                    color: #6c757d;
                    font-size: 0.75rem;
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
                    .sectionss-title {
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
                    .sectionss-title {
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

                    .client-meta {
                        justify-content: center;
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