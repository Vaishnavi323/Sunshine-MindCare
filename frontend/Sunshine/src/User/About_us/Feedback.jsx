import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewFeedback = () => {
    const [activeTab, setActiveTab] = useState('give');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
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
                const transformedReviews = result.data.map(feedback => ({
                    id: feedback.id,
                    name: feedback.full_name || 'Anonymous',
                    rating: parseInt(feedback.rating) || 0,
                    date: feedback.created_at ? feedback.created_at.split(' ')[0] : new Date().toISOString().split('T')[0],
                    review: feedback.message || 'No message provided',
                    experience: 'Mental Health Services',
                    verified: feedback.status === "1"
                }));
                setReviews(transformedReviews);
            } else {
                throw new Error(result.message || 'Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError(error.message || 'Failed to load reviews. Please try again later.');
            // Fallback to empty array
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    // Calculate reviews statistics
    const calculateStats = () => {
        if (reviews.length === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            };
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(review => {
            ratingDistribution[review.rating]++;
        });

        return {
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews: reviews.length,
            ratingDistribution
        };
    };

    const stats = calculateStats();

    useEffect(() => {
        if (activeTab === 'reviews') {
            fetchApprovedFeedbacks();
        }
    }, [activeTab]);

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
            setSubmitError('Please select a rating');
            return;
        }


        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Convert to FormData
            const formDataToSend = new FormData();
            formDataToSend.append('rating', rating);

            if (formData.message.trim()) formDataToSend.append('message', formData.message.trim());

            // Optional fields
            if (formData.full_name.trim()) formDataToSend.append('full_name', formData.full_name.trim());
            if (formData.email.trim()) formDataToSend.append('email', formData.email.trim());

            const response = await fetch(`${backendUrl}/feedback/add`, {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.status) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setRating(0);
                    setFormData({ full_name: '', email: '', message: '' });
                    setIsSubmitted(false);
                }, 3000);
            } else {
                throw new Error(data.message || 'Failed to submit feedback');
            }
        } catch (error) {
            setSubmitError(error.message || 'Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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

    const getPercentage = (count) => {
        if (stats.totalReviews === 0) return 0;
        return Math.round((count / stats.totalReviews) * 100);
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
                                {stats.totalReviews > 0 && (
                                    <span className="review-count-badge">
                                        {stats.totalReviews}
                                    </span>
                                )}
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
                                                    <h4 className="section-title mb-5">Your Information (Optional)</h4>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label>Full Name</label>
                                                            <input
                                                                type="text"
                                                                name="full_name"
                                                                value={formData.full_name}
                                                                onChange={handleInputChange}
                                                                className="form-input"
                                                                placeholder="Enter your full name (optional)"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email Address</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className="form-input"
                                                                placeholder="Enter your email (optional)"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Feedback Message */}
                                                <div className="form-section">
                                                    <h4 className="section-title">Your Feedback *</h4>
                                                    <div className="form-group">
                                                        <label>Share your experience *</label>
                                                        <textarea
                                                            name="message"
                                                            value={formData.message}
                                                            onChange={handleInputChange}
                                                            className="form-textarea"
                                                            placeholder="Tell us about your experience with our services..."
                                                            rows="5"
                                                            maxLength="500"
                                                        ></textarea>
                                                        <div className="char-count">
                                                            {formData.message.length}/500 characters
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Error Message */}
                                                {submitError && (
                                                    <div className="error-message">
                                                        <i className="fas fa-exclamation-circle"></i>
                                                        {submitError}
                                                    </div>
                                                )}

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
                                {loading ? (
                                    <div className="loading-reviews">
                                        <div className="loading-spinner-large"></div>
                                        <p>Loading reviews...</p>
                                    </div>
                                ) : error ? (
                                    <div className="error-state">
                                        <div className="error-icon">⚠️</div>
                                        <h4>Unable to Load Reviews</h4>
                                        <p>{error}</p>
                                        <button
                                            className="retry-btn"
                                            onClick={fetchApprovedFeedbacks}
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <div className="no-reviews">
                                        <div className="no-reviews-icon">💬</div>
                                        <h4>No Reviews Yet</h4>
                                        <p>Be the first to share your experience!</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="reviews-stats">
                                            <div className="overall-rating">
                                                <div className="rating-number">{stats.averageRating}</div>
                                                <div className="rating-stars">
                                                    {renderStars(Math.round(stats.averageRating), true)}
                                                </div>
                                                <div className="rating-count">Based on {stats.totalReviews} reviews</div>
                                            </div>
                                            <div className="rating-bars">
                                                {[5, 4, 3, 2, 1].map(stars => (
                                                    <div key={stars} className="rating-bar">
                                                        <span className="stars">{stars} ★</span>
                                                        <div className="bar-container">
                                                            <div
                                                                className="bar-fill"
                                                                style={{ width: `${getPercentage(stats.ratingDistribution[stars])}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="count">{getPercentage(stats.ratingDistribution[stars])}%</span>
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
                                                                <div className="reviewer-info">
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
                                                                </div>
                                                                <div className="review-rating">
                                                                    {renderStars(review.rating, true)}
                                                                </div>
                                                            </div>

                                                            {/* Review Content */}
                                                            <div className="review-content">
                                                                <p className="review-text">{review.review}</p>
                                                                <div className="review-experience">
                                                                    <span className="experience-tag">
                                                                        {review.experience}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
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
                .review-feedback-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Review count badge */
                .review-count-badge {
                    background: #ff6b35;
                    color: white;
                    border-radius: 12px;
                    padding: 2px 8px;
                    font-size: 0.8rem;
                    margin-left: 8px;
                }

                /* Loading state */
                .loading-reviews {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

                /* Error state */
                .error-state {
                    text-align: center;
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

                /* No reviews state */
                .no-reviews {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }

                .no-reviews-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .no-reviews h4 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .no-reviews p {
                    color: #6c757d;
                }

                /* Rest of the existing styles remain the same */
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
                    position: relative;
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
                    color: #1c75cd72;
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
                    border: 2px solid #418bd5ff;
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

                /* Error Message */
                .error-message {
                    background: #f8d7da;
                    color: #721c24;
                    padding: 12px 15px;
                    border-radius: 8px;
                    border: 1px solid #f5c6cb;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
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