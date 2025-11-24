import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real API call
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/upcoming`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.status) {
                    // Transform API data to match your component structure
                    const transformedEvents = data.data.map(event => ({
                        id: event.id,
                        title: event.heading,
                        venue: event.venue,
                        date: event.date,
                        time: event.time,
                        description: event.description,
                        image: event.image_url || `${import.meta.env.VITE_BACKEND_URL}/${event.image}`,
                        created_at: event.created_at
                    }));
                    
                    setEvents(transformedEvents);
                } else {
                    // No upcoming events - this is not an error, just empty data
                    setEvents([]);
                }
                
            } catch (error) {
                console.error('Error fetching upcoming events:', error);
                setError(error.message);
                // Fallback to empty array if API fails
                setEvents([]);
            } finally {
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

    // Format time
    const formatTime = (timeString) => {
        if (!timeString || timeString === '00:00:00') return '';
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    if (error) {
        return (
            <div className="events-error">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="error-icon">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <h3>Error Loading Events</h3>
                            <p>{error}</p>
                            <button 
                                className="retry-btn"
                                onClick={() => window.location.reload()}
                            >
                                <i className="fas fa-redo"></i>
                                Try Again
                            </button>
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
                                <h1 className="hero-title pt-5">Upcoming Events</h1>
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
                                        <div 
                                            className="event-image"
                                            style={{
                                                backgroundImage: `url(${event.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        >
                                            {/* Fallback icon if image fails to load */}
                                            <div className="image-fallback">
                                                <i className="fas fa-calendar-plus"></i>
                                            </div>
                                        </div>
                                        <div className="event-date-overlay">
                                            {formatDate(event.date)}
                                            {event.time && event.time !== '00:00:00' && (
                                                <div className="event-time">
                                                    {formatTime(event.time)}
                                                </div>
                                            )}
                                            {isEventSoon(event.date) && (
                                                <span className="soon-badge">Coming Soon</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <Card.Body className="p-4">
                                        <h3 className="event-title">{event.title}</h3>
                                        {event.venue && (
                                            <div className="event-venue">
                                                <i className="fas fa-map-marker-alt"></i>
                                                {event.venue}
                                            </div>
                                        )}
                                        {event.description && (
                                            <p className="event-description">
                                                {event.description}
                                            </p>
                                        )}
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

            {/* Empty State - This will show since API returns no events */}
            {events.length === 0 && !loading && !error && (
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

            {/* CTA Section */}
            <section className="events-cta py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="cta-content">
                                <h2>Stay Updated</h2>
                                <p>
                                    Be the first to know about our upcoming events, workshops, and mental health initiatives. 
                                    Subscribe to our newsletter for regular updates.
                                </p>
                                <button className="cta-button">
                                    Subscribe to Newsletter
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .event-card:hover .event-image {
                    transform: scale(1.05);
                }

                .image-fallback {
                    font-size: 3rem;
                    opacity: 0.8;
                    display: none;
                }

                .event-image:not([style*="background-image"]),
                .event-image[style*="background-image: url(null)"],
                .event-image[style*="background-image: url(undefined)"] {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%) !important;
                }

                .event-image:not([style*="background-image"]) .image-fallback,
                .event-image[style*="background-image: url(null)"] .image-fallback,
                .event-image[style*="background-image: url(undefined)"] .image-fallback {
                    display: flex;
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

                .event-time {
                    font-size: 0.75rem;
                    opacity: 0.9;
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
                    margin: 0 0 10px 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .event-venue {
                    color: #666;
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .event-venue i {
                    color: #ff6b35;
                }

                .event-description {
                    color: #666;
                    font-size: 0.9rem;
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

                /* Error State */
                .events-error {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .error-icon {
                    font-size: 4rem;
                    color: #dc3545;
                    margin-bottom: 1.5rem;
                }

                .events-error h3 {
                    color: #dc3545;
                    margin-bottom: 1rem;
                }

                .events-error p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }

                .retry-btn {
                    background: linear-gradient(45deg, #dc3545, #e35d6a);
                    border: none;
                    padding: 10px 25px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0 auto;
                }

                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
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