import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data - Replace this with your API call
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                
                // Mock data structure for upcoming events
                const mockEvents = [
                    {
                        id: 1,
                        title: "MENTAL HEALTH AWARENESS WORKSHOP 2024",
                        date: "2024-03-15",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 2,
                        title: "SPRING WELLNESS RETREAT",
                        date: "2024-04-20",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 3,
                        title: "MINDFULNESS & MEDITATION MASTERCLASS",
                        date: "2024-05-10",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 4,
                        title: "ANXIETY MANAGEMENT SUPPORT GROUP",
                        date: "2024-06-05",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 5,
                        title: "STRESS REDUCTION TECHNIQUES SEMINAR",
                        date: "2024-07-18",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 6,
                        title: "YOUTH MENTAL HEALTH CONFERENCE 2024",
                        date: "2024-08-25",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 7,
                        title: "COPING WITH DEPRESSION WORKSHOP",
                        date: "2024-09-12",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 8,
                        title: "FAMILY THERAPY AND SUPPORT SESSION",
                        date: "2024-10-08",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 9,
                        title: "ANNUAL MENTAL HEALTH GALA",
                        date: "2024-11-20",
                        image: "/api/placeholder/400/250",
                    }
                ];

                // Simulate API delay
                setTimeout(() => {
                    setEvents(mockEvents);
                    setLoading(false);
                }, 1000);
                
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Check if event is happening soon (within next 30 days)
    const isEventSoon = (dateString) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
        return eventDate <= thirtyDaysFromNow;
    };

    if (loading) {
        return (
            <div className="events-loading">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-spinner"></div>
                            <p>Loading upcoming events...</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="upcoming-events-page">
            {/* Hero Section */}
            <section className="events-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="hero-content animate-fade-in">
                                <h1 className="hero-title">Upcoming Events</h1>
                                <p className="hero-subtitle">
                                    Join us for our future mental health events, workshops, and community gatherings.
                                </p>
                                <div className="hero-divider"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Events Grid */}
            <section className="events-grid py-5">
                <Container>
                    <Row className="g-4">
                        {events.map((event, index) => (
                            <Col key={event.id} xl={4} lg={4} md={6} sm={12}>
                                <Card 
                                    className={`event-card animate-card ${isEventSoon(event.date) ? 'event-soon' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="card-image-container">
                                        <div className="event-image">
                                            {/* Image placeholder - replace with actual image */}
                                            <div className="image-placeholder">
                                                <i className="fas fa-calendar-plus"></i>
                                            </div>
                                        </div>
                                        <div className="event-date-overlay">
                                            {formatDate(event.date)}
                                            {isEventSoon(event.date) && (
                                                <span className="soon-badge">Coming Soon</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Card.Body className="p-4">
                                        <h3 className="event-title">{event.title}</h3>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Load More Button for Pagination */}
                    {events.length > 0 && (
                        <Row className="mt-5">
                            <Col className="text-center">
                                <button className="load-more-btn">
                                    Load More Events
                                </button>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* Empty State */}
            {events.length === 0 && !loading && (
                <section className="empty-state py-5">
                    <Container>
                        <Row className="justify-content-center text-center">
                            <Col lg={6}>
                                <div className="empty-content">
                                    <div className="empty-icon">
                                        <i className="fas fa-calendar-plus"></i>
                                    </div>
                                    <h3>No Upcoming Events</h3>
                                    <p>There are no upcoming events scheduled at the moment. Check back later for new events!</p>
                                    <button className="subscribe-btn">
                                        Notify Me About Future Events
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}

            
            

            <style jsx>{`
                .upcoming-events-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                /* Hero Section */
                .events-hero {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .hero-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .hero-divider {
                    width: 80px;
                    height: 4px;
                    background: #ff6b35;
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 0.5s forwards;
                    transform-origin: left;
                }

                /* Animations */
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-out 0.3s forwards;
                }

                .animate-card {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideUp 0.6s ease-out forwards;
                }

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

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 80px; }
                }

                /* Event Card */
                .event-card {
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    background: white;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                }

                .event-card.event-soon {
                    border-top: 4px solid #ff6b35;
                }

                .card-image-container {
                    position: relative;
                    height: 250px;
                    overflow: hidden;
                }

                .event-image {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: transform 0.3s ease;
                }

                .event-card:hover .event-image {
                    transform: scale(1.05);
                }

                .image-placeholder {
                    font-size: 3rem;
                    opacity: 0.8;
                }

                .event-date-overlay {
                    position: absolute;
                    bottom: 15px;
                    left: 15px;
                    background: rgba(42, 82, 152, 0.9);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .soon-badge {
                    background: #ff6b35;
                    color: white;
                    padding: 3px 8px;
                    border-radius: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }

                .event-title {
                    color: #2a5298;
                    font-size: 1.2rem;
                    font-weight: 600;
                    line-height: 1.4;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Load More Button */
                .load-more-btn {
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    border: none;
                    padding: 12px 40px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .load-more-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
                    background: linear-gradient(45deg, #1e3c72, #2a5298);
                }

                /* Loading State */
                .events-loading {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2a5298;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                }

                .empty-icon {
                    font-size: 4rem;
                    color: #6c757d;
                    margin-bottom: 1.5rem;
                }

                .empty-content h3 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .empty-content p {
                    color: #6c757d;
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                }

                .subscribe-btn {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 12px 30px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                }

                .subscribe-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
                }

                /* CTA Section */
                .events-cta {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                }

                .cta-content h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .cta-content p {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .cta-button {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 12px 35px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .card-image-container {
                        height: 200px;
                    }

                    .event-title {
                        font-size: 1.1rem;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 1.8rem;
                    }

                    .card-image-container {
                        height: 180px;
                    }

                    .event-date-overlay {
                        font-size: 0.8rem;
                        padding: 6px 12px;
                    }

                    .event-card {
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default UpcomingEvents;