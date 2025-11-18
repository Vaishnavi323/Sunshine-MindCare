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
    const servicesRef = useRef([]);

    // Services data with images
    const servicesData = [
        {
            id: 1,
            title: "Individual Therapy",
            image: individualTherapyImg,
            description: "One-on-one counseling sessions tailored to your unique needs and goals.",
            color: "#2a5298",
            subservices: [
                {
                    title: "Cognitive Behavioral Therapy (CBT)",
                    description: "Identify and change negative thought patterns and behaviors that affect your mental health and daily functioning.",
                    duration: "50 mins",
                    price: "₹1,500",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
                },
                {
                    title: "Psychodynamic Therapy",
                    description: "Explore unconscious patterns and childhood experiences to understand current behaviors and relationships.",
                    duration: "50 mins",
                    price: "₹1,600",
                    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
                },
                {
                    title: "Humanistic Therapy",
                    description: "Focus on self-development and personal growth through self-exploration and positive regard.",
                    duration: "50 mins",
                    price: "₹1,400",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop"
                },
                {
                    title: "Solution-Focused Therapy",
                    description: "Concentrate on solutions rather than problems, building on your existing strengths and resources.",
                    duration: "45 mins",
                    price: "₹1,300",
                    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=300&fit=crop"
                }
            ]
        },
        {
            id: 2,
            title: "Couples Counseling",
            image: couplesCounselingImg,
            description: "Strengthen your relationship and improve communication patterns with professional guidance.",
            color: "#ff9800",
            subservices: [
                {
                    title: "Relationship Counseling",
                    description: "Improve communication, resolve conflicts, and rebuild trust in your relationship.",
                    duration: "60 mins",
                    price: "₹2,000",
                    image: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=400&h=300&fit=crop"
                },
                {
                    title: "Pre-Marital Counseling",
                    description: "Prepare for marriage by discussing expectations, goals, and building a strong foundation.",
                    duration: "60 mins",
                    price: "₹2,200",
                    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop"
                },
                {
                    title: "Marital Therapy",
                    description: "Address specific marital issues, enhance intimacy, and navigate life transitions together.",
                    duration: "60 mins",
                    price: "₹2,500",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                }
            ]
        },
        {
            id: 3,
            title: "Family Therapy",
            image: familyTherapyImg,
            description: "Heal family dynamics and improve relationships within the family system.",
            color: "#4caf50",
            subservices: [
                {
                    title: "Family Systems Therapy",
                    description: "Understand family dynamics, roles, and patterns that affect individual and family well-being.",
                    duration: "60 mins",
                    price: "₹2,500",
                    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop"
                },
                {
                    title: "Parent-Child Therapy",
                    description: "Improve parent-child relationships, communication, and attachment bonds.",
                    duration: "50 mins",
                    price: "₹2,000",
                    image: "https://images.unsplash.com/photo-1541559475991-5d8ad1e1e8b3?w=400&h=300&fit=crop"
                },
                {
                    title: "Blended Family Counseling",
                    description: "Support for step-families navigating new relationships and family structures.",
                    duration: "60 mins",
                    price: "₹2,800",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
                }
            ]
        },
        {
            id: 4,
            title: "Child & Adolescent Therapy",
            image: childTherapyImg,
            description: "Specialized therapy for children and teenagers facing emotional and behavioral challenges.",
            color: "#9c27b0",
            subservices: [
                {
                    title: "Play Therapy",
                    description: "Therapeutic approach using play to help young children express emotions and resolve problems.",
                    duration: "45 mins",
                    price: "₹1,800",
                    image: "https://images.unsplash.com/photo-1549056572-75914d6d7e1a?w=400&h=300&fit=crop"
                },
                {
                    title: "Teen Counseling",
                    description: "Address adolescent issues including identity, peer pressure, academic stress, and emotional regulation.",
                    duration: "50 mins",
                    price: "₹1,700",
                    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
                },
                {
                    title: "Parent Coaching",
                    description: "Guidance for parents of children with emotional, behavioral, or developmental needs.",
                    duration: "50 mins",
                    price: "₹1,600",
                    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&h=300&fit=crop"
                }
            ]
        },
        {
            id: 5,
            title: "Anxiety & Depression Treatment",
            image: anxietyTreatmentImg,
            description: "Evidence-based treatments for anxiety disorders, depression, and mood-related challenges.",
            color: "#2196f3",
            subservices: [
                {
                    title: "Anxiety Management",
                    description: "Coping strategies, relaxation techniques, and cognitive restructuring for anxiety disorders.",
                    duration: "50 mins",
                    price: "₹1,600",
                    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
                },
                {
                    title: "Depression Therapy",
                    description: "Comprehensive treatment for major depressive disorder using evidence-based approaches.",
                    duration: "50 mins",
                    price: "₹1,600",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
                },
                {
                    title: "Stress Management",
                    description: "Techniques to manage and reduce stress, improve coping skills, and enhance resilience.",
                    duration: "45 mins",
                    price: "₹1,400",
                    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
                }
            ]
        },
        {
            id: 6,
            title: "Trauma & PTSD Therapy",
            image: traumaTherapyImg,
            description: "Specialized treatment for trauma, PTSD, and stress-related disorders with trauma-informed care.",
            color: "#ff5722",
            subservices: [
                {
                    title: "EMDR Therapy",
                    description: "Eye Movement Desensitization and Reprocessing for trauma processing and healing.",
                    duration: "60 mins",
                    price: "₹2,200",
                    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=300&fit=crop"
                },
                {
                    title: "Trauma-Focused CBT",
                    description: "Cognitive Behavioral Therapy specifically adapted for trauma recovery.",
                    duration: "50 mins",
                    price: "₹1,800",
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop"
                },
                {
                    title: "PTSD Treatment",
                    description: "Comprehensive PTSD management including symptom reduction and quality of life improvement.",
                    duration: "50 mins",
                    price: "₹1,900",
                    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
                }
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
    }, []);

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
                                className={`service-card ${visibleServices[index] ? 'visible' : ''}`}
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
                                                {service.subservices.length} Specialized Treatments
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
                                            {/* <div className="subservice-image-container">
                                                <img 
                                                    src={subservice.image} 
                                                    alt={subservice.title}
                                                    className="subservice-image"
                                                />
                                            </div> */}
                                            <div className="subservice-content">
                                                <div className="subservice-header">
                                                    <h5 className="subservice-title">{subservice.title}</h5>
                                                    <div className="subservice-meta">
                                                        <span className="duration">{subservice.duration}</span>
                                                        {/* <span className="price">{subservice.price}</span> */}
                                                    </div>
                                                </div>
                                                <p className="subservice-description">{subservice.description}</p>
                                                <button 
                                                    className="book-subservice-btn"
                                                    onClick={() => handleBookAppointment(subservice)}
                                                >
                                                    Book Session
                                                </button>
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
                .service-card {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.6s ease-out;
                    cursor: pointer;
                    height: 100%;
                }

                .service-card.visible {
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

                .service-card:hover .card-inner {
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

                .service-card:hover .service-image {
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

                .service-card:hover .image-overlay {
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

                .service-card:hover .click-indicator {
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

                .subservice-image-container {
                    width: 120px;
                    flex-shrink: 0;
                }

                .subservice-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
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

                .price {
                    color: #4caf50;
                    font-weight: 700;
                    font-size: 1.1rem;
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

                    .subservice-image-container {
                        width: 100%;
                        height: 150px;
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
                    .service-card,
                    .floating-therapy,
                    .services-title,
                    .services-subtitle,
                    .header-divider,
                    .subservice-card {
                        animation: none !important;
                        transition: none !important;
                    }
                    
                    .service-card {
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default ServicesPage;