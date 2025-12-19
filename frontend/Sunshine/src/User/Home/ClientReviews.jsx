// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ClientTestimonials = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//     const [testimonials, setTestimonials] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     // Fetch approved feedbacks from API
//     const fetchApprovedFeedbacks = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await fetch(`${backendUrl}/feedback/getapproved`);
            
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
            
//             if (result.status && result.data) {
//                 // Transform API data to match our component structure
//                 const transformedTestimonials = result.data.map(feedback => ({
//                     id: feedback.id,
//                     name: feedback.full_name || 'Anonymous',
//                     rating: parseInt(feedback.rating) || 0,
//                     date: feedback.created_at ? feedback.created_at.split(' ')[0] : new Date().toISOString().split('T')[0],
//                     text: feedback.message || 'No message provided',
//                     avatar: getInitials(feedback.full_name || 'Anonymous'),
//                     verified: feedback.status === "1",
//                     contributions: getRandomContributions()
//                 }));
//                 setTestimonials(transformedTestimonials);
//             } else {
//                 throw new Error(result.message || 'Failed to fetch testimonials');
//             }
//         } catch (error) {
//             console.error('Error fetching testimonials:', error);
//             setError(error.message || 'Failed to load testimonials. Please try again later.');
//             // Fallback to mock data if API fails
//             setTestimonials(getMockTestimonials());
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Helper function to get initials for avatar
//     const getInitials = (name) => {
//         return name.split(' ').map(n => n[0]).join('').toUpperCase();
//     };

//     // Helper function to generate random contributions
//     const getRandomContributions = () => {
//         const contributions = [1, 2, 3, 5, 8, 10, 12, 14];
//         return `${contributions[Math.floor(Math.random() * contributions.length)]} contributions`;
//     };

//     // Fallback mock data
//     const getMockTestimonials = () => [
//         {
//             id: 1,
//             name: "Akanksha Damare",
//             contributions: "14 contributions",
//             text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to the mental health issues. But with my parents guidance I decided to give it a chance. I had few very fruitful sessions with one of the counsellor... They understood my issues in detail and provided excellent support throughout my journey.",
//             avatar: "AD",
//             rating: 5,
//             date: "2024-01-15",
//             verified: true
//         },
//         {
//             id: 2,
//             name: "Rahul Sharma",
//             contributions: "8 contributions",
//             text: "The team at Sunshine Counseling has been incredibly supportive. Their professional approach and compassionate care helped me overcome my anxiety and depression. I'm forever grateful for their guidance.",
//             avatar: "RS",
//             rating: 4,
//             date: "2024-01-10",
//             verified: true
//         },
//         {
//             id: 3,
//             name: "Priya Patel",
//             contributions: "12 contributions",
//             text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients. My mental health has improved significantly since I started sessions here.",
//             avatar: "PP",
//             rating: 5,
//             date: "2024-01-08",
//             verified: true
//         },
//         {
//             id: 4,
//             name: "Michael Chen",
//             contributions: "6 contributions",
//             text: "A safe and welcoming environment where I felt comfortable sharing my thoughts. The personalized approach made all the difference in my recovery journey.",
//             avatar: "MC",
//             rating: 4,
//             date: "2024-01-05",
//             verified: true
//         }
//     ];

//     useEffect(() => {
//         fetchApprovedFeedbacks();
//     }, []);

//     useEffect(() => {
//         if (isAutoPlaying && testimonials.length > 0) {
//             const interval = setInterval(() => {
//                 // advance start index but stop at last possible start to avoid empty space
//                 const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
//                 setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAutoPlaying, testimonials.length]);

//     const nextSlide = () => {
//         const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
//         setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
//     };

//     const prevSlide = () => {
//         const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
//         setCurrentSlide((prev) => (prev <= 0 ? maxStart : prev - 1));
//     };

//     const goToSlide = (index) => {
//         const maxStart = testimonials.length > 2 ? testimonials.length - 2 : 0;
//         const clamped = Math.min(Math.max(0, index), maxStart);
//         setCurrentSlide(clamped);
//     };

//     const renderStars = (rating) => {
//         return Array.from({ length: 5 }, (_, index) => {
//             const starValue = index + 1;
//             return (
//                 <span
//                     key={index}
//                     className={`star ${starValue <= rating ? 'filled' : ''}`}
//                 >
//                     ★
//                 </span>
//             );
//         });
//     };

//     if (loading) {
//         return (
//             <section className="testimonials-section py-5">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Col lg={8} className="text-center">
//                             <div className="loading-testimonials">
//                                 <div className="loading-spinner-large"></div>
//                                 <p>Loading testimonials...</p>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//         );
//     }

//     return (
//         <section className="testimonials-section py-5">
//             <Container>
//                 <Row className="justify-content-center">
//                     <Col lg={8} className="text-center">
//                         <div className="section-header animate-fade-in">
//                             <h2 className="sectionss-title">What Our Clients Say</h2>
//                             <p className="section-subtitle">
//                                 Real experiences from our valued clients. Your feedback helps us grow and improve our services.
//                             </p>
//                             <div className="divider"></div>
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row className="justify-content-center">
//                     <Col lg={8}>
//                         {error ? (
//                             <div className="error-state text-center">
//                                 <div className="error-icon">⚠️</div>
//                                 <h4>Unable to Load Testimonials</h4>
//                                 <p>{error}</p>
//                                 <button 
//                                     className="retry-btn"
//                                     onClick={fetchApprovedFeedbacks}
//                                 >
//                                     Try Again
//                                 </button>
//                             </div>
//                         ) : testimonials.length === 0 ? (
//                             <div className="no-testimonials text-center">
//                                 <div className="no-testimonials-icon">💬</div>
//                                 <h4>No Testimonials Yet</h4>
//                                 <p>Be the first to share your experience!</p>
//                             </div>
//                         ) : (
//                             <div
//                                 className="testimonial-slider"
//                                 onMouseEnter={() => setIsAutoPlaying(false)}
//                                 onMouseLeave={() => setIsAutoPlaying(true)}
//                             >
//                                 <div className="slider-container">
//                                     <div
//                                         className="slider-track"
//                                         style={{
//                                             transform: `translateX(-${currentSlide * 50}%)`,
//                                             width: `${testimonials.length * 50}%`
//                                         }}
//                                     >
//                                         {testimonials.map((testimonial) => (
//                                             <div key={testimonial.id} className="testimonial-slide">
//                                                 <div className="testimonial-card">
//                                                     <div className="quote-icon">"</div>

//                                                     <div className="testimonial-content">
//                                                         <div className="testimonial-rating">
//                                                             {renderStars(testimonial.rating)}
//                                                         </div>

//                                                         <p className="testimonial-text">{testimonial.text}</p>

//                                                         <div className="client-info">
//                                                             <div className="avatar">{testimonial.avatar}</div>
//                                                             <div className="client-details">
//                                                                 <h4 className="client-name">{testimonial.name}</h4>
//                                                                 <div className="client-meta">
//                                                                     <span className="client-contributions">{testimonial.contributions}</span>
//                                                                     {testimonial.verified && (
//                                                                         <span className="verified-badge">✓ Verified</span>
//                                                                     )}
//                                                                 </div>
//                                                                 <span className="review-date">
//                                                                     {new Date(testimonial.date).toLocaleDateString('en-US', {
//                                                                         year: 'numeric',
//                                                                         month: 'long',
//                                                                         day: 'numeric'
//                                                                     })}
//                                                                 </span>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Navigation Arrows */}
//                                 {testimonials.length > 1 && (
//                                     <>
//                                         <button className="slider-arrow prev-arrow" onClick={prevSlide}>
//                                             <span>‹</span>
//                                         </button>
//                                         <button className="slider-arrow next-arrow" onClick={nextSlide}>
//                                             <span>›</span>
//                                         </button>

//                                         {/* Dots Indicator */}
//                                         <div className="slider-dots">
//                                             {Array.from({ length: Math.max(1, (testimonials.length > 2 ? testimonials.length - 2 : 0) + 1) }).map((_, idx) => (
//                                                 <button
//                                                     key={idx}
//                                                     className={`dot ${idx === currentSlide ? 'active' : ''}`}
//                                                     onClick={() => goToSlide(idx)}
//                                                 />
//                                             ))}
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                         )}
//                     </Col>
//                 </Row>
//             </Container>

//             <style jsx>{`
//                 .testimonials-section {
//                     background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
//                     position: relative;
//                     overflow: hidden;
//                 }

//                 /* Loading State */
//                 .loading-testimonials {
//                     text-align: center;
//                     padding: 4rem 2rem;
//                 }

//                 .loading-spinner-large {
//                     width: 50px;
//                     height: 50px;
//                     border: 4px solid #e9ecef;
//                     border-top: 4px solid #2a5298;
//                     border-radius: 50%;
//                     animation: spin 1s linear infinite;
//                     margin: 0 auto 1rem;
//                 }

//                 /* Error State */
//                 .error-state {
//                     padding: 4rem 2rem;
//                     background: white;
//                     border-radius: 20px;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//                 }

//                 .error-icon {
//                     font-size: 4rem;
//                     margin-bottom: 1rem;
//                 }

//                 .error-state h4 {
//                     color: #dc3545;
//                     margin-bottom: 1rem;
//                 }

//                 .error-state p {
//                     color: #6c757d;
//                     margin-bottom: 2rem;
//                 }

//                 .retry-btn {
//                     background: #2a5298;
//                     color: white;
//                     border: none;
//                     padding: 10px 20px;
//                     border-radius: 8px;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .retry-btn:hover {
//                     background: #1e3c72;
//                     transform: translateY(-2px);
//                 }

//                 /* No Testimonials State */
//                 .no-testimonials {
//                     padding: 4rem 2rem;
//                     background: white;
//                     border-radius: 20px;
//                     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//                 }

//                 .no-testimonials-icon {
//                     font-size: 4rem;
//                     margin-bottom: 1rem;
//                 }

//                 .no-testimonials h4 {
//                     color: #2a5298;
//                     margin-bottom: 1rem;
//                 }

//                 .no-testimonials p {
//                     color: #6c757d;
//                 }

//                 /* Animations */
//                 .animate-fade-in {
//                     opacity: 0;
//                     animation: fadeIn 1s ease-out 0.3s forwards;
//                 }

//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(-20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }

//                 @keyframes slideIn {
//                     from { 
//                         opacity: 0;
//                         transform: translateX(100px) scale(0.9);
//                     }
//                     to { 
//                         opacity: 1;
//                         transform: translateX(0) scale(1);
//                     }
//                 }

//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }

//                 /* Section Header */
//                 .sectionss-title {
//                     color: #2a5298;
//                     font-size: 2.5rem;
//                     font-weight: 700;
//                     margin-bottom: 20px;
//                 }

//                 .section-subtitle {
//                     color: #6c757d;
//                     font-size: 1.1rem;
//                     line-height: 1.6;
//                     max-width: 600px;
//                     margin: 0 auto 30px;
//                 }

//                 .divider {
//                     width: 80px;
//                     height: 3px;
//                     background: linear-gradient(45deg, #ff6b35, #ff8e53);
//                     margin: 0 auto 40px;
//                     border-radius: 2px;
//                     animation: expandWidth 1s ease-out 0.8s forwards;
//                     transform-origin: left;
//                 }

//                 @keyframes expandWidth {
//                     from { width: 0; }
//                     to { width: 80px; }
//                 }

//                 /* Slider Styles - two cards visible */
//                 .testimonial-slider {
//                     position: relative;
//                     padding: 40px 0;
//                 }

//                 .slider-container {
//                     position: relative;
//                     height: 320px;
//                     overflow: hidden;
//                 }

//                 .slider-track {
//                     display: flex;
//                     align-items: stretch;
//                     height: 100%;
//                     transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//                 }

//                 .testimonial-slide {
//                     position: relative;
//                     width: 50%;
//                     height: 100%;
//                     box-sizing: border-box;
//                     padding: 0 10px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                 }

//                 /* Testimonial Card */
//                 .testimonial-card {
//                     background: white;
//                     padding: 30px 25px;
//                     border-radius: 20px;
//                     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//                     border-left: 5px solid #ff6b35;
//                     position: relative;
//                     height: 100%;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                 }

//                 .quote-icon {
//                     font-size: 2.5rem;
//                     color: #ff6b35;
//                     opacity: 0.2;
//                     position: absolute;
//                     top: 15px;
//                     left: 20px;
//                     font-family: serif;
//                     line-height: 1;
//                 }

//                 .testimonial-content {
//                     position: relative;
//                     z-index: 2;
//                 }

//                 /* Rating Stars */
//                 .testimonial-rating {
//                     margin-bottom: 15px;
//                 }

//                 .testimonial-rating .star {
//                     font-size: 1rem;
//                     color: #e9ecef;
//                     margin-right: 2px;
//                 }

//                 .testimonial-rating .star.filled {
//                     color: #ffc107;
//                 }

//                 .testimonial-text {
//                     color: #495057;
//                     font-size: 0.95rem;
//                     line-height: 1.6;
//                     margin-bottom: 20px;
//                     font-style: italic;
//                 }

//                 /* Client Info */
//                 .client-info {
//                     display: flex;
//                     align-items: center;
//                     gap: 12px;
//                 }

//                 .avatar {
//                     width: 50px;
//                     height: 50px;
//                     border-radius: 50%;
//                     background: linear-gradient(45deg, #2a5298, #1e3c72);
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     color: white;
//                     font-weight: 700;
//                     font-size: 1rem;
//                     box-shadow: 0 5px 15px rgba(42, 82, 152, 0.3);
//                     flex-shrink: 0;
//                 }

//                 .client-details {
//                     flex: 1;
//                 }

//                 .client-details h4 {
//                     color: #2a5298;
//                     font-weight: 700;
//                     margin-bottom: 3px;
//                     font-size: 0.95rem;
//                 }

//                 .client-meta {
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                     margin-bottom: 3px;
//                 }

//                 .client-contributions {
//                     color: #ff6b35;
//                     font-size: 0.8rem;
//                     font-weight: 600;
//                 }

//                 .verified-badge {
//                     background: #28a745;
//                     color: white;
//                     padding: 1px 6px;
//                     border-radius: 8px;
//                     font-size: 0.65rem;
//                     font-weight: 600;
//                 }

//                 .review-date {
//                     color: #6c757d;
//                     font-size: 0.75rem;
//                 }

//                 /* Navigation Arrows */
//                 .slider-arrow {
//                     position: absolute;
//                     top: 50%;
//                     transform: translateY(-50%);
//                     width: 50px;
//                     height: 50px;
//                     border: none;
//                     border-radius: 50%;
//                     background: white;
//                     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//                     color: #2a5298;
//                     font-size: 1.5rem;
//                     font-weight: bold;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                     z-index: 4;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                 }

//                 .slider-arrow:hover {
//                     background: #2a5298;
//                     color: white;
//                     transform: translateY(-50%) scale(1.1);
//                 }

//                 .prev-arrow {
//                     left: -25px;
//                 }

//                 .next-arrow {
//                     right: -25px;
//                 }

//                 /* Dots Indicator */
//                 .slider-dots {
//                     display: flex;
//                     justify-content: center;
//                     gap: 10px;
//                     margin-top: 40px;
//                 }

//                 .dot {
//                     width: 12px;
//                     height: 12px;
//                     border-radius: 50%;
//                     border: none;
//                     background: #dee2e6;
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .dot.active {
//                     background: #ff6b35;
//                     transform: scale(1.3);
//                 }

//                 .dot:hover {
//                     background: #2a5298;
//                 }

//                 /* Responsive Design */
//                 @media (max-width: 768px) {
//                     .sectionss-title {
//                         font-size: 2rem;
//                     }

//                     .testimonial-card {
//                         padding: 30px 25px;
//                     }

//                     .testimonial-text {
//                         font-size: 1rem;
//                     }

//                     .slider-arrow {
//                         width: 40px;
//                         height: 40px;
//                         font-size: 1.2rem;
//                     }

//                     .prev-arrow {
//                         left: -10px;
//                     }

//                     .next-arrow {
//                         right: -10px;
//                     }

//                     .slider-container {
//                         height: 450px;
//                     }
//                 }

//                 @media (max-width: 576px) {
//                     .sectionss-title {
//                         font-size: 1.8rem;
//                     }

//                     .testimonial-card {
//                         padding: 25px 20px;
//                     }

//                     .client-info {
//                         flex-direction: column;
//                         text-align: center;
//                         gap: 10px;
//                     }

//                     .client-meta {
//                         justify-content: center;
//                     }

//                     .slider-container {
//                         height: 500px;
//                     }
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default ClientTestimonials;


import React, { useState, useEffect } from 'react';

const ClientTestimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
            setTestimonials(getMockTestimonials());
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getRandomContributions = () => {
        const contributions = [1, 2, 3, 5, 8, 10, 12, 14];
        return `${contributions[Math.floor(Math.random() * contributions.length)]} contributions`;
    };

    const getMockTestimonials = () => [
        {
            id: 1,
            name: "Akanksha Damare",
            contributions: "14 contributions",
            text: "Initially I was hesitant about taking help from psychiatrist because of the stigma attached to mental health issues. But with my parents guidance I decided to give it a chance. Excellent support throughout my journey!",
            avatar: "AD",
            rating: 5,
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            name: "Rahul Sharma",
            contributions: "8 contributions",
            text: "The team has been incredibly supportive. Their professional approach and compassionate care helped me overcome my anxiety. I'm forever grateful for their guidance.",
            avatar: "RS",
            rating: 4,
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            name: "Priya Patel",
            contributions: "12 contributions",
            text: "Outstanding service! The therapists are highly skilled and genuinely care about their clients. My mental health has improved significantly since I started sessions.",
            avatar: "PP",
            rating: 5,
            date: "2024-01-08",
            verified: true
        },
        {
            id: 4,
            name: "Michael Chen",
            contributions: "6 contributions",
            text: "A safe and welcoming environment where I felt comfortable sharing my thoughts. The personalized approach made all the difference in my recovery.",
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
                const maxStart = testimonials.length > 3 ? testimonials.length - 3 : 0;
                setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlaying, testimonials.length]);

    const nextSlide = () => {
        const maxStart = testimonials.length > 3 ? testimonials.length - 3 : 0;
        setCurrentSlide((prev) => (prev >= maxStart ? 0 : prev + 1));
    };

    const prevSlide = () => {
        const maxStart = testimonials.length > 3 ? testimonials.length - 3 : 0;
        setCurrentSlide((prev) => (prev <= 0 ? maxStart : prev - 1));
    };

    const goToSlide = (index) => {
        const maxStart = testimonials.length > 3 ? testimonials.length - 3 : 0;
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
            <section className="testimonials-section">
                <div className="container">
                    <div className="loading-testimonials">
                        <div className="loading-spinner-large"></div>
                        <p>Loading testimonials...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-header">
                    <span className="badge-title">TESTIMONIALS</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                    <p className="section-subtitle">
                        Real experiences from our valued clients
                    </p>
                </div>

                <div className="content-wrapper">
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
                                <div
                                    className="slider-track"
                                    style={{
                                        transform: `translateX(-${currentSlide * 33.333}%)`,
                                        width: `${testimonials.length * 33.333}%`
                                    }}
                                >
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className="testimonial-slide">
                                            <div className="testimonial-card">
                                                <div className="card-glow"></div>
                                                <div className="card-shine"></div>
                                                
                                                <div className="card-header">
                                                    <div className="avatar-wrapper">
                                                        <div className="avatar">{testimonial.avatar}</div>
                                                        <div className="avatar-ring"></div>
                                                    </div>
                                                    <div className="client-info">
                                                        <h4 className="client-name">{testimonial.name}</h4>
                                                        <div className="rating-row">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                    </div>
                                                    {testimonial.verified && (
                                                        <div className="verified-badge">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                <path d="M8 0L10.5 5.5L16 6.5L12 10.5L13 16L8 13.5L3 16L4 10.5L0 6.5L5.5 5.5L8 0Z" fill="currentColor"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="card-body">
                                                    <div className="quote-mark">"</div>
                                                    <p className="testimonial-text">{testimonial.text}</p>
                                                </div>

                                                <div className="card-footer">
                                                    <span className="contributions">{testimonial.contributions}</span>
                                                    <span className="date-separator">•</span>
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
                            </div>

                            {testimonials.length > 1 && (
                                <>
                                    <button className="slider-arrow prev-arrow" onClick={prevSlide}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    <button className="slider-arrow next-arrow" onClick={nextSlide}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>

                                    <div className="slider-dots">
                                        {Array.from({ length: Math.max(1, (testimonials.length > 3 ? testimonials.length - 3 : 0) + 1) }).map((_, idx) => (
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
                </div>
            </div>

            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .testimonials-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    position: relative;
                    overflow: hidden;
                    min-height: 600px;
                    padding: 80px 20px;
                }

                .testimonials-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
                    animation: backgroundPulse 15s ease-in-out infinite;
                }

                @keyframes backgroundPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .loading-testimonials {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: white;
                }

                .loading-spinner-large {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .error-state, .no-testimonials {
                    padding: 4rem 2rem;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .error-icon, .no-testimonials-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .error-state h4, .no-testimonials h4 {
                    margin-bottom: 1rem;
                    color: #2d3748;
                }

                .error-state p, .no-testimonials p {
                    color: #718096;
                }

                .retry-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    margin-top: 1rem;
                }

                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 60px;
                    animation: fadeInDown 0.8s ease-out;
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .badge-title {
                    display: inline-block;
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    margin-bottom: 16px;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .section-title {
                    color: white;
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 16px;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .section-subtitle {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.1rem;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .content-wrapper {
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .testimonial-slider {
                    position: relative;
                    padding: 40px 0 80px;
                }

                .slider-container {
                    position: relative;
                    height: 340px;
                    overflow: visible;
                    perspective: 1000px;
                }

                .slider-track {
                    display: flex;
                    align-items: stretch;
                    height: 100%;
                    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .testimonial-slide {
                    position: relative;
                    width: 33.333%;
                    height: 100%;
                    box-sizing: border-box;
                    padding: 0 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .testimonial-card {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 28px;
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
                    position: relative;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    animation: cardSlideIn 0.6s ease-out;
                }

                @keyframes cardSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px) rotateX(-10deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) rotateX(0);
                    }
                }

                .testimonial-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
                    background-size: 200% 100%;
                    animation: gradientShift 3s linear infinite;
                }

                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                .testimonial-card:hover {
                    transform: translateY(-12px) scale(1.02);
                    box-shadow: 0 30px 80px rgba(102, 126, 234, 0.35);
                }

                .card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                .testimonial-card:hover .card-glow {
                    opacity: 1;
                    animation: glowRotate 3s linear infinite;
                }

                @keyframes glowRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .card-shine {
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: shine 3s ease-in-out infinite;
                }

                @keyframes shine {
                    0% { transform: translateX(-100%) translateY(-100%); }
                    50% { transform: translateX(200%) translateY(200%); }
                    100% { transform: translateX(-100%) translateY(-100%); }
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                    position: relative;
                }

                .avatar-wrapper {
                    position: relative;
                    flex-shrink: 0;
                }

                .avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 0.95rem;
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                    position: relative;
                    z-index: 2;
                    animation: avatarPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                @keyframes avatarPop {
                    0% { transform: scale(0); }
                    100% { transform: scale(1); }
                }

                .avatar-ring {
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    right: -4px;
                    bottom: -4px;
                    border: 2px solid #667eea;
                    border-radius: 50%;
                    animation: ringPulse 2s ease-in-out infinite;
                    opacity: 0.5;
                }

                @keyframes ringPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.3; }
                }

                .client-info {
                    flex: 1;
                    min-width: 0;
                }

                .client-name {
                    color: #2d3748;
                    font-weight: 700;
                    margin: 0 0 6px 0;
                    font-size: 1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .rating-row {
                    display: flex;
                    gap: 2px;
                }

                .star {
                    font-size: 0.9rem;
                    color: #e2e8f0;
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .star.filled {
                    color: #fbbf24;
                    animation: starPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
                }

                .star.filled:nth-child(1) { animation-delay: 0s; }
                .star.filled:nth-child(2) { animation-delay: 0.1s; }
                .star.filled:nth-child(3) { animation-delay: 0.2s; }
                .star.filled:nth-child(4) { animation-delay: 0.3s; }
                .star.filled:nth-child(5) { animation-delay: 0.4s; }

                @keyframes starPop {
                    0% { transform: scale(0) rotate(-180deg); }
                    100% { transform: scale(1) rotate(0); }
                }

                .testimonial-card:hover .star.filled {
                    transform: scale(1.2);
                }

                .verified-badge {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981, #059669);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                    flex-shrink: 0;
                    animation: badgeSpin 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                @keyframes badgeSpin {
                    0% { transform: scale(0) rotate(-180deg); }
                    100% { transform: scale(1) rotate(0); }
                }

                .card-body {
                    flex: 1;
                    position: relative;
                    margin-bottom: 16px;
                }

                .quote-mark {
                    position: absolute;
                    top: -8px;
                    left: -8px;
                    font-size: 4rem;
                    font-family: Georgia, serif;
                    color: rgba(102, 126, 234, 0.15);
                    line-height: 1;
                    font-weight: bold;
                    user-select: none;
                }

                .testimonial-text {
                    color: #4a5568;
                    font-size: 0.9rem;
                    line-height: 1.7;
                    margin: 0;
                    position: relative;
                    z-index: 1;
                }

                .card-footer {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-top: 16px;
                    border-top: 1px solid #e2e8f0;
                    font-size: 0.8rem;
                }

                .contributions {
                    color: #667eea;
                    font-weight: 600;
                }

                .date-separator {
                    color: #cbd5e0;
                }

                .review-date {
                    color: #718096;
                }

                .slider-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 48px;
                    height: 48px;
                    border: none;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    color: #667eea;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .slider-arrow:hover {
                    background: #667eea;
                    color: white;
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
                }

                .slider-arrow:active {
                    transform: translateY(-50%) scale(0.95);
                }

                .prev-arrow {
                    left: -24px;
                }

                .next-arrow {
                    right: -24px;
                }

                .slider-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 50px;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 20px;
                    border: none;
                    background: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0;
                }

                .dot.active {
                    background: white;
                    width: 32px;
                    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
                }

                .dot:hover {
                    background: rgba(255, 255, 255, 0.7);
                }

                @media (max-width: 992px) {
                    .section-title {
                        font-size: 2.5rem;
                    }

                    .slider-container {
                        height: 380px;
                    }

                    .testimonial-slide {
                        width: 50%;
                    }
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 2rem;
                    }

                    .testimonial-card {
                        padding: 24px;
                    }

                    .slider-arrow {
                        width: 40px;
                        height: 40px;
                    }

                    .prev-arrow {
                        left: -10px;
                    }

                    .next-arrow {
                        right: -10px;
                    }

                    .slider-container {
                        height: 420px;
                    }
                }

                @media (max-width: 576px) {
                    .section-title {
                        font-size: 1.75rem;
                    }

                    .testimonial-slide {
                        width: 100%;
                    }

                    .slider-container {
                        height: 450px;
                    }

                    .testimonials-section {
                        padding: 60px 15px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ClientTestimonials;