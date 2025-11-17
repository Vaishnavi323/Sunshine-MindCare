import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PastEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data - Replace this with your API call
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                
                // Mock data structure
                const mockEvents = [
                    {
                        id: 1,
                        title: "WOMEN'S DAY 2023 IN ASSOCIATION WITH REVIVE SKIN AND HAIR CLINIC",
                        date: "2023-03-08",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 2,
                        title: "WORLD MENTAL HEALTH DAY EVENT 2023",
                        date: "2023-10-10",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 3,
                        title: "MINDFULNESS MEDITATION WORKSHOP",
                        date: "2023-07-15",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 4,
                        title: "YOUTH MENTAL HEALTH SUMMIT 2023",
                        date: "2023-11-20",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 5,
                        title: "STRESS MANAGEMENT SEMINAR",
                        date: "2023-05-12",
                        image: "/api/placeholder/400/250",
                    },
                    {
                        id: 6,
                        title: "ANXIETY AWARENESS CAMPAIGN",
                        date: "2023-09-18",
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

    if (loading) {
        return (
            <div className="events-loading">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-spinner"></div>
                            <p>Loading past events...</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="past-events-page">
            {/* Hero Section */}
            <section className="events-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="hero-content animate-fade-in">
                                <h1 className="hero-title pt-5">Past Events</h1>
                                <p className="hero-subtitle">
                                    Relive the impactful moments from our previous mental health events and workshops.
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
                                    className={`event-card animate-card`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="card-image-container">
                                        <div className="event-image">
                                            {/* Image placeholder - replace with actual image */}
                                            <div className="image-placeholder">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <div className="event-date-overlay">
                                            {formatDate(event.date)}
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
                                        <i className="fas fa-calendar-times"></i>
                                    </div>
                                    <h3>No Past Events</h3>
                                    <p>There are no past events to display at the moment.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}

            <style jsx>{`
                .past-events-page {
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
                }

                .event-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
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
                    background: rgba(255, 107, 53, 0.9);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    backdrop-filter: blur(10px);
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

export default PastEvents;