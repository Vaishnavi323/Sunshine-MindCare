import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your service images
import individualTherapyImg from '../../assets/a1.jpg';
import couplesCounselingImg from '../../assets/a2.jpg';
import familyTherapyImg from '../../assets/a1.jpg';
import childTherapyImg from '../../assets/a1.jpg';
import anxietyTreatmentImg from '../../assets/a1.jpg';
import traumaTherapyImg from '../../assets/a1.jpg';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [visibleServices, setVisibleServices] = useState({});
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const servicesRef = useRef([]);

    // Fetch services from API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch all services by calling the API multiple times (since it requires ID)
                const serviceIds = [1, 2, 3, 4, 5, 6]; // Adjust based on your service IDs
                const servicePromises = serviceIds.map(id => 
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/service/list?id=${id}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                );

                const serviceResults = await Promise.all(servicePromises);
                
                // Transform API data to match your component structure
                const transformedServices = serviceResults.map((result, index) => {
                    if (result.status && result.error) {
                        const service = result.error;
                        return {
                            id: service.id,
                            title: service.title || `Service ${service.id}`,
                            image: getServiceImage(service.id),
                            description: service.description || 'No description available',
                            color: getServiceColor(service.id),
                            subservices: service.sub_services && service.sub_services.length > 0 
                                ? service.sub_services.map(sub => ({
                                    title: sub.title || 'Sub Service',
                                    description: sub.description || 'No description available',
                                    duration: '50 mins',
                                    price: 'Contact for pricing'
                                }))
                                : getDefaultSubservices(service.id)
                        };
                    }
                    return null;
                }).filter(service => service !== null);

                setServicesData(transformedServices);
                
            } catch (error) {
                console.error('Error fetching services:', error);
                setError(error.message);
                // Fallback to mock data if API fails
                setServicesData(getMockServicesData());
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Helper function to get service image based on ID
    const getServiceImage = (id) => {
        const imageMap = {
            1: individualTherapyImg,
            2: couplesCounselingImg,
            3: familyTherapyImg,
            4: childTherapyImg,
            5: anxietyTreatmentImg,
            6: traumaTherapyImg
        };
        return imageMap[id] || individualTherapyImg;
    };

    // Helper function to get service color based on ID
    const getServiceColor = (id) => {
        const colorMap = {
            1: "#2a5298",
            2: "#ff9800",
            3: "#4caf50",
            4: "#9c27b0",
            5: "#2196f3",
            6: "#ff5722"
        };
        return colorMap[id] || "#2a5298";
    };

    // Helper function to get default subservices if API returns empty
    const getDefaultSubservices = (id) => {
        const defaultSubservices = {
            1: [
                {
                    title: "Individual Counseling",
                    description: "Personalized one-on-one therapy sessions tailored to your specific needs and goals.",
                    duration: "50 mins",
                    price: "Contact for pricing"
                }
            ],
            2: [
                {
                    title: "Couples Therapy",
                    description: "Professional guidance to strengthen relationships and improve communication.",
                    duration: "60 mins",
                    price: "Contact for pricing"
                }
            ],
            3: [
                {
                    title: "Family Counseling",
                    description: "Therapy sessions focused on improving family dynamics and relationships.",
                    duration: "60 mins",
                    price: "Contact for pricing"
                }
            ],
            4: [
                {
                    title: "Child & Adolescent Therapy",
                    description: "Specialized therapy for young individuals facing emotional challenges.",
                    duration: "45 mins",
                    price: "Contact for pricing"
                }
            ],
            5: [
                {
                    title: "Anxiety & Depression Treatment",
                    description: "Evidence-based approaches for managing anxiety and depressive symptoms.",
                    duration: "50 mins",
                    price: "Contact for pricing"
                }
            ],
            6: [
                {
                    title: "Trauma Therapy",
                    description: "Specialized treatment for trauma recovery and PTSD management.",
                    duration: "50 mins",
                    price: "Contact for pricing"
                }
            ]
        };
        return defaultSubservices[id] || [{
            title: "Professional Counseling",
            description: "Expert mental health support and guidance.",
            duration: "50 mins",
            price: "Contact for pricing"
        }];
    };

    // Fallback mock data
    const getMockServicesData = () => [
        {
            id: 1,
            title: "Assesments",
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            description: "One-on-one counseling sessions tailored to your unique needs and goals.",
            color: "#2a5298",
            subservices: [
                { title: "Intelligence Quotient (IQ) Tests" },
                { title: "Developmental Quotient (DQ) Test" },
                { title: "Social Quotient (SQ) Test" },
                { title: "Tests for emotional expression CAT (Children Apperception Test)" },
                { title: "TAT (Thematic Apperception Test)" },
                { title: "ROR (Rorschach Ink Blot Test)" },
                { title: "Autism assessment" },
                { title: "ADHD assessment" },
                { title: "Career Guidance/Aptitude Test" },
                { title: "Personality Test (MMPI/MCMI 4)" },
                { title: "Millon Adolescent Clinical Inventory II (MACI-II): for identifying temperamental and behavioral issues in the Adolescents" },
                { title: "Test for Obsessive Compulsive Disorders" },
                { title: "HAM-A and BDI for Anxiety/ Depression" },
                { title: "WRAT 5 India: for diagnosing learning difficulty" },
                { title: "CBCL 1 % to 5 years and CBCL. 6 to 18 years (Child Behavioral Checklist): To identify behavioral and emotional challenges in children." }
            ]
        },
        {
            id: 2,
            title: "Therapy",
            image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop',
            description: "Strengthen your relationship and improve communication patterns with professional guidance.",
            color: "#ff9800",
            subservices: [
                { title: "Cognitive Behavior Therapy" },
                { title: "Behavior Therapy" },
                { title: "Psychoanalysis" },
                { title: "Humanistic Therapy" },
                { title: "Grief Counselling" },
                { title: "Marriage / Couple Therapy" },
                { title: "Family Therapy" },
                { title: "Supportive psychotherapy" },
                { title: "Social Skill Training" },
                { title: "Motivational Enhancement Therapy for De-addiction" },
                { title: "Relaxation Therapy" },
                { title: "Habit Reversal Training" },
                { title: "Career Guidance Counselling" },
                { title: "Remedial Therapy" },
                { title: "REBT" }
            ]
        },
        {
            id: 3,
            title: "Group & Support",
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop',
            description: "Improve family relationships and resolve conflicts in a supportive environment.",
            color: "#4caf50",
            subservices: [
                { title: "Family Counseling", description: "Improve family dynamics and resolve conflicts with professional guidance.", duration: "60 mins" },
                { title: "Parenting Support", description: "Develop effective parenting strategies and improve family communication.", duration: "50 mins" }
            ]
        },
        {
            id: 4,
            title: "Education & Training",
            image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop',
            description: "Evidence-based treatments for anxiety disorders and stress management.",
            color: "#9c27b0",
            subservices: [
                { title: "Anxiety Management", description: "Learn techniques to manage and reduce anxiety symptoms effectively.", duration: "50 mins" },
                { title: "Stress Reduction", description: "Develop coping strategies to manage daily stress and improve resilience.", duration: "50 mins" }
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleServices(prev => ({
                            ...prev,
                            [entry.target.dataset.index]: true
                        }));
                    }
                });
            },
            { 
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        servicesRef.current.forEach((card, index) => {
            if (card) {
                card.dataset.index = index;
                observer.observe(card);
            }
        });

        return () => observer.disconnect();
    }, [servicesData]);

    const setServiceRef = (index) => (el) => {
        servicesRef.current[index] = el;
    };

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    const handleBookAppointment = (subservice) => {
        // Navigate to booking page or open booking modal
        console.log('Booking:', subservice);
        alert(`Booking appointment for: ${subservice.title}`);
    };

    if (loading) {
        return (
            <div className="service-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>Loading services...</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="service-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="error-state">
                                <div className="error-icon">⚠️</div>
                                <h3>Error Loading Services</h3>
                                <p>{error}</p>
                                <button 
                                    className="retry-btn"
                                    onClick={() => window.location.reload()}
                                >
                                    Try Again
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="service-page">
            {/* Animated Background */}
            <div className="services-background">
                <div className="floating-therapy">💬</div>
                <div className="floating-therapy">❤️</div>
                <div className="floating-therapy">🌟</div>
                <div className="floating-therapy">😊</div>
            </div>

            <Container>
                {/* Header Section */}
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <div className="services-header">
                            <h1 className="services-title">Our Services</h1>
                            <p className="services-subtitle">
                                Comprehensive mental health services tailored to your unique journey. 
                                Click on any service to explore specialized treatments and therapies.
                            </p>
                            <div className="header-divider"></div>
                        </div>
                    </Col>
                </Row>

                {/* Services Grid */}
                <Row className="g-4">
                    {servicesData.map((service, index) => (
                        <Col key={service.id} lg={4} md={6} className="mb-4">
                            <div
                                ref={setServiceRef(index)}
                                className={`service-cards ${visibleServices[index] ? 'visible' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleServiceClick(service)}
                            >
                                <div className="card-inner">
                                    <div className="service-image-container">
                                        <img 
                                            src={service.image} 
                                            alt={service.title}
                                            className="service-image"
                                        />
                                        <div className="image-overlay"></div>
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-title-card">{service.title}</h3>
                                        <p className="service-description">{service.description}</p>
                                        <div className="service-footer">
                                            <span className="subservices-count">
                                                {service.subservices.length} Specialized {service.subservices.length === 1 ? 'Treatment' : 'Treatments'}
                                            </span>
                                            <div className="click-indicator">
                                                <span>View Details →</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Subservices Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg" 
                centered
                className="subservices-modal"
            >
                {selectedService && (
                    <>
                        <Modal.Header closeButton>
                            <div className="modal-header-content">
                                <div className="modal-image-container">
                                    <img 
                                        src={selectedService.image} 
                                        alt={selectedService.title}
                                        className="modal-service-image"
                                    />
                                </div>
                                <div className="modal-text-content">
                                    <Modal.Title>{selectedService.title}</Modal.Title>
                                    <p className="modal-subtitle">{selectedService.description}</p>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="subservices-container">
                                <h4 className="subservices-title">Available Treatments</h4>
                                <div className="subservices-grid">
                                    {selectedService.subservices.map((subservice, index) => (
                                        <div 
                                            key={index}
                                            className="subservice-card"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="subservice-content">
                                                <div className="subservice-header">
                                                    <h5 className="subservice-title">{subservice.title}</h5>
                                                    <div className="subservice-meta">
                                                        <span className="duration">{subservice.duration}</span>
                                                    </div>
                                                </div>
                                                <p className="subservice-description">{subservice.description}</p>
                                                {/* <button 
                                                    className="book-subservice-btn"
                                                    onClick={() => handleBookAppointment(subservice)}
                                                >
                                                    Book Session
                                                </button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>

            <style jsx>{`
                .service-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8fcff 0%, #e8f4ff 100%);
                    padding: 80px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .services-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-therapy {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.1;
                    animation: floatGently 8s ease-in-out infinite;
                }

                .floating-therapy:nth-child(1) {
                    top: 15%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .floating-therapy:nth-child(2) {
                    top: 60%;
                    right: 10%;
                    animation-delay: 2s;
                }

                .floating-therapy:nth-child(3) {
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .floating-therapy:nth-child(4) {
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

                /* Header Styles */
                .services-header {
                    margin-bottom: 60px;
                }

                .services-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    background:linear-gradient(45deg, #2a5298, #1e3c72);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                    opacity: 0;
                    animation: slideDown 1s ease-out 0.3s forwards;
                }

                .services-subtitle {
                    font-size: 1.2rem;
                    color: #546e7a;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    opacity: 0;
                    animation: fadeIn 1s ease-out 0.6s forwards;
                }

                .header-divider {
                    width: 100px;
                    height: 4px;
                    background: linear-gradient(45deg, #ff9800, #ffb74d);
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 0.9s forwards;
                    transform-origin: left;
                }

                /* Service Cards */
                .service-cards {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.6s ease-out;
                    cursor: pointer;
                    height: 100%;
                }

                .service-cards.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .card-inner {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(30, 136, 229, 0.1);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid rgba(100, 181, 246, 0.2);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .service-cards:hover .card-inner {
                    transform: translateY(-15px) scale(1.02);
                    box-shadow: 
                        0 20px 40px rgba(30, 136, 229, 0.15),
                        0 0 0 1px rgba(100, 181, 246, 0.3);
                }

                .service-image-container {
                    position: relative;
                    height: 250px;
                    overflow: hidden;
                }

                .service-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .service-cards:hover .service-image {
                    transform: scale(1.1);
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom, transparent 60%, rgba(30, 136, 229, 0.3));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .service-cards:hover .image-overlay {
                    opacity: 1;
                }

                .service-content {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .service-title-card {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2a5298;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                .service-description {
                    color: #546e7a;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    flex-grow: 1;
                }

                .service-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                }

                .subservices-count {
                    background: rgba(30, 136, 229, 0.1);
                    color: #2a5298;
                    padding: 6px 12px;
                    border-radius: 15px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .click-indicator {
                    color: #ff9800;
                    font-weight: 600;
                    transition: transform 0.3s ease;
                }

                .service-cards:hover .click-indicator {
                    transform: translateX(5px);
                }

                /* Modal Styles */
                .subservices-modal .modal-content {
                    border-radius: 20px;
                    border: none;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .modal-header-content {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 1.5rem;
                }

                .modal-image-container {
                    width: 80px;
                    height: 80px;
                    border-radius: 15px;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .modal-service-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .modal-text-content {
                    flex: 1;
                }

                .modal-subtitle {
                    color: #546e7a;
                    margin: 0;
                    font-size: 1rem;
                }

                .subservices-container {
                    padding: 0 1.5rem 1.5rem;
                }

                .subservices-title {
                    color: #2a5298;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                }

                .subservices-grid {
                    display: grid;
                    gap: 1.5rem;
                }

                .subservice-card {
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    animation: slideInRight 0.5s ease-out forwards;
                    opacity: 0;
                    transform: translateX(30px);
                    display: flex;
                    border: 1px solid rgba(100, 181, 246, 0.2);
                }

                .subservice-content {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .subservice-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .subservice-title {
                    color: #2a5298;
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin: 0;
                    flex: 1;
                }

                .subservice-meta {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.25rem;
                }

                .duration {
                    background: rgba(30, 136, 229, 0.1);
                    color: #2a5298;
                    padding: 4px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .subservice-description {
                    color: #546e7a;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                }

                .book-subservice-btn {
                    background: linear-gradient(45deg, #ff9800, #ffb74d);
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    color: white;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    width: 100%;
                }

                .book-subservice-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 152, 0, 0.3);
                }

                /* Loading State */
                .loading-state {
                    text-align: center;
                    padding: 100px 20px;
                    animation: fadeIn 0.6s ease-out;
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
                .error-state {
                    text-align: center;
                    padding: 100px 20px;
                    animation: fadeIn 0.6s ease-out;
                }

                .error-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                }

                .error-state h3 {
                    color: #dc3545;
                    margin-bottom: 1rem;
                }

                .error-state p {
                    color: #666;
                    margin-bottom: 2rem;
                }

                .retry-btn {
                    background: linear-gradient(45deg, #dc3545, #e35d6a);
                    border: none;
                    padding: 12px 30px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                }

                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
                }

                /* Animations */
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100px; }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .services-title {
                        font-size: 2.5rem;
                    }

                    .services-subtitle {
                        font-size: 1.1rem;
                    }

                    .service-content {
                        padding: 1.5rem;
                    }

                    .service-title-card {
                        font-size: 1.3rem;
                    }

                    .modal-header-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .modal-image-container {
                        width: 100px;
                        height: 100px;
                    }

                    .subservice-card {
                        flex-direction: column;
                    }

                    .subservice-header {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .subservice-meta {
                        align-items: flex-start;
                        flex-direction: row;
                        gap: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    .services-title {
                        font-size: 2rem;
                    }

                    .service-image-container {
                        height: 200px;
                    }

                    .subservice-card {
                        padding: 0;
                    }
                }

                /* Reduced motion for accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .service-cards,
                    .floating-therapy,
                    .services-title,
                    .services-subtitle,
                    .header-divider,
                    .subservice-card {
                        animation: none !important;
                        transition: none !important;
                    }
                    
                    .service-cards {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default ServicesPage;