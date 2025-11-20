import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewFeedback = () => {
    const [activeTab, setActiveTab] = useState('give');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        review: '',
        experience: '',
        recommend: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Mock reviews data - Replace with API data
    const reviews = [
        {
            id: 1,
            name: 'Priya Sharma',
            rating: 5,
            date: '2024-01-15',
            review: 'Sunshine Counseling transformed my life. The therapists are incredibly compassionate and professional. Highly recommended!',
            experience: 'Individual Therapy',
            verified: true
        },
        {
            id: 2,
            name: 'Rahul Verma',
            rating: 4,
            date: '2024-01-12',
            review: 'Great experience with the counseling sessions. The environment is very welcoming and the staff is supportive.',
            experience: 'Couples Counseling',
            verified: true
        },
        {
            id: 3,
            name: 'Anita Patel',
            rating: 5,
            date: '2024-01-10',
            review: 'My child has shown remarkable improvement after sessions with the child psychologist. Thank you for your dedication!',
            experience: 'Child Psychology',
            verified: true
        },
        {
            id: 4,
            name: 'Michael Thomas',
            rating: 5,
            date: '2024-01-08',
            review: 'Professional, empathetic, and effective. The therapy sessions have helped me manage my anxiety significantly.',
            experience: 'Anxiety Treatment',
            verified: false
        }
    ];

    const experienceOptions = [
        'Individual Therapy',
        'Couples Counseling',
        'Family Therapy',
        'Child Psychology',
        'Anxiety Treatment',
        'Depression Counseling',
        'Other'
    ];

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleRatingHover = (value) => {
        setHoverRating(value);
    };

    const handleRatingLeave = () => {
        setHoverRating(0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after success
        setTimeout(() => {
            setRating(0);
            setFormData({
                name: '',
                email: '',
                review: '',
                experience: '',
                recommend: ''
            });
            setIsSubmitted(false);
        }, 3000);
    };

    const renderStars = (ratingValue, forDisplay = false) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            let starClass = 'star';
            
            if (forDisplay) {
                starClass += starValue <= ratingValue ? ' filled' : '';
            } else {
                if (hoverRating >= starValue) {
                    starClass += ' hover';
                } else if (!hoverRating && rating >= starValue) {
                    starClass += ' filled';
                }
            }
            
            return (
                <span
                    key={index}
                    className={starClass}
                    onClick={() => !forDisplay && handleRatingClick(starValue)}
                    onMouseEnter={() => !forDisplay && handleRatingHover(starValue)}
                    onMouseLeave={!forDisplay ? handleRatingLeave : undefined}
                >
                    ★
                </span>
            );
        });
    };

    const getRatingText = (ratingValue) => {
        const texts = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        return texts[ratingValue] || '';
    };

    return (
        <div className="review-feedback-page">
            {/* Animated Background */}
            <div className="feedback-background">
                <div className="floating-review">⭐</div>
                <div className="floating-review">💬</div>
                <div className="floating-review">❤️</div>
                <div className="floating-review">🌟</div>
            </div>

            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {/* Header */}
                        <div className="feedback-header text-center animate-header">
                            <h1 className="header-title">Share Your Experience</h1>
                            <p className="header-subtitle">
                                Your feedback helps us improve and helps others find the right mental health support.
                            </p>
                            <div className="header-divider"></div>
                        </div>

                        {/* Tabs */}
                        <div className="feedback-tabs animate-tabs">
                            <button 
                                className={`tab-button ${activeTab === 'give' ? 'active' : ''}`}
                                onClick={() => setActiveTab('give')}
                            >
                                <span className="tab-icon">✍️</span>
                                Give Feedback
                            </button>
                            <button 
                                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                <span className="tab-icon">📖</span>
                                Read Reviews
                            </button>
                        </div>

                        {/* Give Feedback Tab */}
                        {activeTab === 'give' && (
                            <div className="tab-content animate-slide-in">
                                {isSubmitted ? (
                                    <div className="success-feedback">
                                        <div className="success-animation">
                                            <div className="success-icon">🎉</div>
                                            <div className="confetti"></div>
                                            <div className="confetti"></div>
                                            <div className="confetti"></div>
                                        </div>
                                        <h3 className="success-title">Thank You!</h3>
                                        <p className="success-message">
                                            Your feedback has been submitted successfully. 
                                            We appreciate you taking the time to share your experience.
                                        </p>
                                    </div>
                                ) : (
                                    <Card className="feedback-form-card">
                                        <Card.Body className="p-4">
                                            <form onSubmit={handleSubmit} className="feedback-form">
                                                {/* Rating Section */}
                                                <div className="rating-section">
                                                    <h4 className="rating-title">How would you rate your experience?</h4>
                                                    <div className="star-rating">
                                                        <div className="stars-container">
                                                            {renderStars(0)}
                                                        </div>
                                                        <div className="rating-text">
                                                            {getRatingText(hoverRating || rating)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Personal Information */}
                                                <div className="form-section">
                                                    <h4 className="section-title">Your Information</h4>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label>Full Name *</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="form-input"
                                                                placeholder="Enter your full name"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email Address *</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                required
                                                                className="form-input"
                                                                placeholder="Enter your email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Experience Details */}
                                                {/* <div className="form-section">
                                                    <h4 className="section-title">Experience Details</h4>
                                                    <div className="form-group">
                                                        <label>Type of Service *</label>
                                                        <select
                                                            name="experience"
                                                            value={formData.experience}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="form-select"
                                                        >
                                                            <option value="">Select service type</option>
                                                            {experienceOptions.map(option => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Would you recommend us to others? *</label>
                                                        <div className="radio-group">
                                                            <label className="radio-option">
                                                                <input
                                                                    type="radio"
                                                                    name="recommend"
                                                                    value="yes"
                                                                    checked={formData.recommend === 'yes'}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                                <span className="radio-custom"></span>
                                                                <span className="radio-label">Yes, definitely</span>
                                                            </label>
                                                            <label className="radio-option">
                                                                <input
                                                                    type="radio"
                                                                    name="recommend"
                                                                    value="maybe"
                                                                    checked={formData.recommend === 'maybe'}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <span className="radio-custom"></span>
                                                                <span className="radio-label">Maybe</span>
                                                            </label>
                                                            <label className="radio-option">
                                                                <input
                                                                    type="radio"
                                                                    name="recommend"
                                                                    value="no"
                                                                    checked={formData.recommend === 'no'}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <span className="radio-custom"></span>
                                                                <span className="radio-label">Probably not</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                {/* Review Text */}
                                                <div className="form-section">
                                                    <h4 className="section-title">Your Review</h4>
                                                    <div className="form-group">
                                                        <label>Share your experience *</label>
                                                        <textarea
                                                            name="review"
                                                            value={formData.review}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="form-textarea"
                                                            placeholder="Tell us about your experience with our services..."
                                                            rows="5"
                                                        ></textarea>
                                                        <div className="char-count">
                                                            {formData.review.length}/500 characters
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <button
                                                    type="submit"
                                                    className={`submit-feedback-btn ${isSubmitting ? 'submitting' : ''}`}
                                                    disabled={isSubmitting || rating === 0}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="loading-spinner"></div>
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit Feedback'
                                                    )}
                                                </button>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* Read Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="tab-content animate-slide-in">
                                <div className="reviews-stats">
                                    <div className="overall-rating">
                                        <div className="rating-number">4.8</div>
                                        <div className="rating-stars">
                                            {renderStars(5, true)}
                                        </div>
                                        <div className="rating-count">Based on 127 reviews</div>
                                    </div>
                                    <div className="rating-bars">
                                        {[5, 4, 3, 2, 1].map(stars => (
                                            <div key={stars} className="rating-bar">
                                                <span className="stars">{stars} ★</span>
                                                <div className="bar-container">
                                                    <div 
                                                        className="bar-fill"
                                                        style={{ width: `${(stars/5) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="count">64%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="reviews-grid">
                                    {reviews.map((review, index) => (
                                        <div 
                                            key={review.id}
                                            className="review-card animate-card"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <Card className="h-100">
                                                <Card.Body className="p-4">
                                                    {/* Review Header */}
                                                    <div className="review-header">
                                                        {/* <div className="reviewer-info">
                                                            <div className="reviewer-avatar">
                                                                {review.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div className="reviewer-details">
                                                                <h5 className="reviewer-name">{review.name}</h5>
                                                                <div className="review-meta">
                                                                    <span className="review-date">
                                                                        {new Date(review.date).toLocaleDateString()}
                                                                    </span>
                                                                    {review.verified && (
                                                                        <span className="verified-badge">✓ Verified</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        <div className="review-rating">
                                                            {renderStars(review.rating, true)}
                                                        </div>
                                                    </div>

                                                    {/* Review Content */}
                                                    <div className="review-content">
                                                        <p className="review-text">{review.review}</p>
                                                        <div className="review-experience">
                                                            {/* <span className="experience-tag">
                                                                {review.experience}
                                                            </span> */}
                                                        </div>
                                                    </div>

                                                    {/* Review Reactions */}
                                                    {/* <div className="review-actions">
                                                        <button className="helpful-btn">
                                                            <span className="reaction-icon">👍</span>
                                                            Helpful (24)
                                                        </button>
                                                    </div> */}
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
                .review-feedback-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .feedback-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-review {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.1;
                    animation: floatGently 8s ease-in-out infinite;
                }

                .floating-review:nth-child(1) {
                    top: 15%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .floating-review:nth-child(2) {
                    top: 60%;
                    right: 10%;
                    animation-delay: 2s;
                }

                .floating-review:nth-child(3) {
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .floating-review:nth-child(4) {
                    top: 30%;
                    right: 20%;
                    animation-delay: 1s;
                }

                @keyframes floatGently {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    33% {
                        transform: translateY(-15px) rotate(120deg) scale(1.1);
                    }
                    66% {
                        transform: translateY(8px) rotate(240deg) scale(0.9);
                    }
                }

                /* Header */
                .feedback-header {
                    margin-bottom: 3rem;
                }

                .header-title {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #2a5298;
                    margin-bottom: 1rem;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .header-subtitle {
                    font-size: 1.2rem;
                    color: #6c757d;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .header-divider {
                    width: 100px;
                    height: 4px;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 0.5s forwards;
                    transform-origin: left;
                }

                /* Tabs */
                .feedback-tabs {
                    display: flex;
                    background: white;
                    border-radius: 15px;
                    padding: 0.5rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .tab-button {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem 1.5rem;
                    border: none;
                    background: transparent;
                    border-radius: 10px;
                    font-weight: 600;
                    color: #6c757d;
                    transition: all 1s ease;
                    cursor: pointer;
                }

                .tab-button.active {
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(42, 82, 152, 0.3);
                }

                .tab-icon {
                    font-size: 1.2rem;
                }

                /* Tab Content */
                .tab-content {
                    position: relative;
                    z-index: 1;
                }

                /* Feedback Form */
                .feedback-form-card {
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    background: white;
                }

                .feedback-form {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                /* Rating Section */
                .rating-section {
                    text-align: center;
                    padding: 2rem;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    border-radius: 15px;
                    margin: -1rem -1rem 0 -1rem;
                }

                .rating-title {
                    color: #2a5298;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .star-rating {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .stars-container {
                    display: flex;
                    gap: 0.5rem;
                }

                .star {
                    font-size: 3rem;
                    color: #e9ecef;
                    cursor: pointer;
                    transition: all 0.70s ease;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .star:hover,
                .star.hover {
                    color: #ffc107;
                    transform: scale(1.2) rotate(10deg);
                }

                .star.filled {
                    color: #ffc107;
                    animation: starPop 0.3s ease;
                }

                @keyframes starPop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1.2); }
                }

                .rating-text {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #2a5298;
                    min-height: 1.5rem;
                }

                /* Form Sections */
                .form-section {
                    border-bottom: 1px solid #e9ecef;
                    padding-bottom: 2rem;
                }

                .form-section:last-of-type {
                    border-bottom: none;
                }

                .section-title {
                    color: #2a5298;
                    font-size: 1.3rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-group label {
                    font-weight: 600;
                    color: #2a5298;
                    margin-bottom: 0.5rem;
                }

                .form-input, .form-select, .form-textarea {
                    padding: 12px 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.1s ease;
                    background: #f8f9fa;
                }

                .form-input:focus, .form-select:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #2a5298;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
                    transform: translateY(-2px);
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .char-count {
                    text-align: right;
                    font-size: 0.8rem;
                    color: #6c757d;
                    margin-top: 0.5rem;
                }

                /* Radio Buttons */
                .radio-group {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .radio-option {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    padding: 10px 15px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .radio-option:hover {
                    background: #f8f9fa;
                }

                .radio-option input {
                    display: none;
                }

                .radio-custom {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #e9ecef;
                    border-radius: 50%;
                    position: relative;
                    transition: all 0.3s ease;
                }

                .radio-option input:checked + .radio-custom {
                    border-color: #2a5298;
                    background: #2a5298;
                }

                .radio-option input:checked + .radio-custom::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                }

                .radio-label {
                    font-weight: 500;
                    color: #495057;
                }

                /* Submit Button */
                .submit-feedback-btn {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                    align-self: center;
                    min-width: 200px;
                }

                .submit-feedback-btn:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
                }

                .submit-feedback-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .submit-feedback-btn.submitting {
                    background: linear-gradient(45deg, #6c757d, #adb5bd);
                }

                /* Loading Spinner */
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    display: inline-block;
                    margin-right: 10px;
                }

                /* Success Animation */
                .success-feedback {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .success-animation {
                    position: relative;
                    margin-bottom: 2rem;
                }

                .success-icon {
                    font-size: 4rem;
                    animation: bounceSuccess 1s ease;
                }

                .confetti {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #ff6b35;
                    border-radius: 50%;
                    animation: confettiFall 2s ease-out forwards;
                }

                .confetti:nth-child(2) { left: 30%; animation-delay: 0.2s; background: #2a5298; }
                .confetti:nth-child(3) { left: 70%; animation-delay: 0.4s; background: #28a745; }

                .success-title {
                    color: #28a745;
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .success-message {
                    color: #6c757d;
                    line-height: 1.6;
                    font-size: 1.1rem;
                }

                /* Reviews Section */
                .reviews-stats {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 3rem;
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    margin-bottom: 2rem;
                }

                .overall-rating {
                    text-align: center;
                    padding: 1rem;
                }

                .rating-number {
                    font-size: 3rem;
                    font-weight: 800;
                    color: #2a5298;
                    line-height: 1;
                }

                .rating-stars {
                    margin: 1rem 0;
                }

                .rating-stars .star {
                    font-size: 1.5rem;
                    cursor: default;
                }

                .rating-count {
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                .rating-bars {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .rating-bar {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .rating-bar .stars {
                    min-width: 50px;
                    font-size: 0.9rem;
                    color: #495057;
                }

                .bar-container {
                    flex: 1;
                    height: 8px;
                    background: #e9ecef;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border-radius: 4px;
                    transition: width 1s ease;
                }

                .rating-bar .count {
                    min-width: 40px;
                    text-align: right;
                    font-size: 0.9rem;
                    color: #6c757d;
                }

                /* Reviews Grid */
                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .review-card {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideUp 0.6s ease-out forwards;
                }

                .review-card .card {
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    transition: all 0.1s ease;
                    background: white;
                    height: 100%;
                }

                .review-card .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                }

                .review-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .reviewer-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .reviewer-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .reviewer-name {
                    color: #2a5298;
                    font-weight: 600;
                    margin: 0;
                }

                .review-meta {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-top: 0.25rem;
                }

                .review-date {
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                .verified-badge {
                    background: #28a745;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }

                .review-rating .star {
                    font-size: 1.2rem;
                    cursor: default;
                }

                .review-content {
                    margin-bottom: 1.5rem;
                }

                .review-text {
                    color: #495057;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .experience-tag {
                    background: #e9ecef;
                    color: #495057;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .review-actions {
                    border-top: 1px solid #e9ecef;
                    padding-top: 1rem;
                }

                .helpful-btn {
                    background: transparent;
                    border: 1px solid #e9ecef;
                    padding: 6px 12px;
                    border-radius: 15px;
                    color: #6c757d;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .helpful-btn:hover {
                    background: #f8f9fa;
                    border-color: #2a5298;
                    color: #2a5298;
                }

                .reaction-icon {
                    margin-right: 5px;
                }

                /* Animations */
                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100px; }
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

                @keyframes bounceSuccess {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0,-20px,0);
                    }
                    70% {
                        transform: translate3d(0,-10px,0);
                    }
                    90% {
                        transform: translate3d(0,-2px,0);
                    }
                }

                @keyframes confettiFall {
                    0% {
                        transform: translateY(-50px) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(200px) rotate(360deg);
                        opacity: 0;
                    }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .animate-header {
                    opacity: 0;
                    animation: slideUp 1s ease-out 0.3s forwards;
                }

                .animate-tabs {
                    opacity: 0;
                    animation: slideUp 1s ease-out 0.5s forwards;
                }

                .animate-slide-in {
                    animation: slideUp 0.6s ease-out;
                }

                .animate-card {
                    animation: slideUp 0.6s ease-out forwards;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .header-title {
                        font-size: 2.5rem;
                    }

                    .feedback-tabs {
                        flex-direction: column;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .reviews-stats {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .reviews-grid {
                        grid-template-columns: 1fr;
                    }

                    .star {
                        font-size: 2.5rem;
                    }
                }

                @media (max-width: 576px) {
                    .header-title {
                        font-size: 2rem;
                    }

                    .rating-section {
                        padding: 1.5rem;
                    }

                    .star {
                        font-size: 2rem;
                    }

                    .review-header {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </div>
    );
};

export default ReviewFeedback;