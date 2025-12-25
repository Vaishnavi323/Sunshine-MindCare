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
                
                const serviceIds = [1, 2, 3, 4, 5, 6];
                const servicePromises = serviceIds.map(id => 
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/service/list?id=${id}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => ({ id, data, error: null }))
                        .catch(error => ({ 
                            id, 
                            data: null, 
                            error: error.message 
                        }))
                );

                const results = await Promise.all(servicePromises);
                
                // Transform API responses
                const transformedServices = results.map((result) => {
                    const { id, data, error } = result;
                    
                    // If we got a successful API response
                    if (data && !error) {
                        // Extract service data from different possible response structures
                        let serviceData = null;
                        
                        if (data.data) {
                            serviceData = data.data;
                        } else if (data.error) {
                            serviceData = data.error;
                        } else if (data.id) {
                            serviceData = data;
                        } else if (Array.isArray(data) && data.length > 0) {
                            serviceData = data[0];
                        }
                        
                        // If we have valid service data from API
                        if (serviceData && serviceData.id) {
                            const hasSubservices = (
                                (serviceData.sub_services && serviceData.sub_services.length > 0) ||
                                (serviceData.subServices && serviceData.subServices.length > 0)
                            );
                            
                            return {
                                id: serviceData.id,
                                title: serviceData.title || serviceData.name || `Service ${serviceData.id}`,
                                image: getServiceImage(serviceData.id),
                                description: serviceData.description || serviceData.desc || 'Professional mental health service',
                                color: getServiceColor(serviceData.id),
                                subservices: hasSubservices 
                                    ? (serviceData.sub_services || serviceData.subServices).map(sub => ({
                                        title: sub.title || sub.name || 'Sub Service',
                                        description: sub.description || sub.desc || 'Specialized treatment',
                                        duration: sub.duration || sub.time || '50 mins',
                                        price: sub.price || sub.cost || 'Contact for pricing'
                                    }))
                                    : getDefaultSubservices(serviceData.id)
                            };
                        }
                    }
                    
                    // If API failed or returned no valid data, use mock data for this specific service
                    return getMockServiceById(id);
                });

                // Filter out any null/undefined values
                const validServices = transformedServices.filter(service => 
                    service !== null && service !== undefined
                );
                
                // If we got services from API, use them
                if (validServices.length > 0) {
                    setServicesData(validServices);
                } else {
                    // If no valid services from API, use all mock data
                    setServicesData(getMockServicesData());
                }
                
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

    // Helper function to get mock service by ID
    const getMockServiceById = (id) => {
        const mockServices = getMockServicesData();
        return mockServices.find(service => service.id === id) || {
            id,
            title: `Service ${id}`,
            image: getServiceImage(id),
            description: 'Professional mental health service',
            color: getServiceColor(id),
            subservices: getDefaultSubservices(id)
        };
    };

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
        // Get from mock data if available
        const mockService = getMockServicesData().find(service => service.id === id);
        if (mockService && mockService.subservices) {
            return mockService.subservices.map(sub => ({
                title: sub.title || 'Sub Service',
                description: sub.description || 'Specialized treatment',
                duration: sub.duration || '50 mins',
                price: 'Contact for pricing'
            }));
        }
        
        // Fallback to hardcoded defaults
        const defaultSubservices = {
            1: [
                { 
                    title: "Intelligence Quotient (IQ) Tests",
                    description: "Comprehensive cognitive assessment",
                    duration: "60 mins"
                },
                { 
                    title: "Developmental Quotient (DQ) Test",
                    description: "Assessment of developmental milestones",
                    duration: "60 mins"
                },
                { 
                    title: "Social Quotient (SQ) Test",
                    description: "Evaluation of social skills and awareness",
                    duration: "50 mins"
                },
                { 
                    title: "CAT (Children Apperception Test)",
                    description: "Assessment of emotional expression in children",
                    duration: "45 mins"
                },
                { 
                    title: "TAT (Thematic Apperception Test)",
                    description: "Projective psychological test",
                    duration: "60 mins"
                },
                { 
                    title: "ROR (Rorschach Ink Blot Test)",
                    description: "Personality and emotional functioning assessment",
                    duration: "75 mins"
                }
            ],
            2: [
                { 
                    title: "Cognitive Behavior Therapy",
                    description: "Evidence-based therapy for thought pattern modification",
                    duration: "50 mins"
                },
                { 
                    title: "Behavior Therapy",
                    description: "Focus on changing maladaptive behaviors",
                    duration: "50 mins"
                },
                { 
                    title: "Psychoanalysis",
                    description: "In-depth exploration of unconscious processes",
                    duration: "60 mins"
                },
                { 
                    title: "Humanistic Therapy",
                    description: "Person-centered therapeutic approach",
                    duration: "50 mins"
                },
                { 
                    title: "Grief Counselling",
                    description: "Support for loss and bereavement",
                    duration: "50 mins"
                },
                { 
                    title: "Marriage / Couple Therapy",
                    description: "Relationship enhancement and conflict resolution",
                    duration: "60 mins"
                }
            ],
            3: [
                { 
                    title: "Family Counseling",
                    description: "Improve family dynamics and resolve conflicts with professional guidance",
                    duration: "60 mins"
                },
                { 
                    title: "Parenting Support",
                    description: "Develop effective parenting strategies and improve family communication",
                    duration: "50 mins"
                },
                { 
                    title: "Sibling Conflict Resolution",
                    description: "Address and resolve conflicts between siblings",
                    duration: "50 mins"
                }
            ],
            4: [
                { 
                    title: "Learning Disability Assessment",
                    description: "Comprehensive evaluation for learning difficulties",
                    duration: "90 mins"
                },
                { 
                    title: "Remedial Education",
                    description: "Personalized educational support and intervention",
                    duration: "60 mins"
                },
                { 
                    title: "Study Skills Training",
                    description: "Develop effective study habits and techniques",
                    duration: "50 mins"
                }
            ],
            5: [
                { 
                    title: "Anxiety Management",
                    description: "Learn techniques to manage and reduce anxiety symptoms effectively",
                    duration: "50 mins"
                },
                { 
                    title: "Stress Reduction",
                    description: "Develop coping strategies to manage daily stress and improve resilience",
                    duration: "50 mins"
                },
                { 
                    title: "Panic Attack Therapy",
                    description: "Specialized treatment for panic disorder",
                    duration: "50 mins"
                }
            ],
            6: [
                { 
                    title: "Trauma Processing",
                    description: "Evidence-based therapy for trauma recovery",
                    duration: "60 mins"
                },
                { 
                    title: "PTSD Treatment",
                    description: "Specialized care for post-traumatic stress disorder",
                    duration: "60 mins"
                },
                { 
                    title: "EMDR Therapy",
                    description: "Eye Movement Desensitization and Reprocessing",
                    duration: "75 mins"
                }
            ]
        };
        
        return defaultSubservices[id] || [{
            title: "Professional Counseling",
            description: "Expert mental health support and guidance",
            duration: "50 mins",
            price: "Contact for pricing"
        }];
    };

    // Fallback mock data
    const getMockServicesData = () => [
        {
            id: 1,
            title: "Assessments",
            image: individualTherapyImg,
            description: "Comprehensive psychological assessments and evaluations for accurate diagnosis and treatment planning.",
            color: "#2a5298",
            subservices: [
                { 
                    title: "Intelligence Quotient (IQ) Tests",
                    description: "Comprehensive cognitive assessment",
                    duration: "60 mins"
                },
                { 
                    title: "Developmental Quotient (DQ) Test",
                    description: "Assessment of developmental milestones",
                    duration: "60 mins"
                },
                { 
                    title: "Social Quotient (SQ) Test",
                    description: "Evaluation of social skills and awareness",
                    duration: "50 mins"
                },
                { 
                    title: "CAT (Children Apperception Test)",
                    description: "Assessment of emotional expression in children",
                    duration: "45 mins"
                },
                { 
                    title: "TAT (Thematic Apperception Test)",
                    description: "Projective psychological test",
                    duration: "60 mins"
                },
                { 
                    title: "ROR (Rorschach Ink Blot Test)",
                    description: "Personality and emotional functioning assessment",
                    duration: "75 mins"
                },
                { 
                    title: "Autism Assessment",
                    description: "Comprehensive autism spectrum evaluation",
                    duration: "90 mins"
                },
                { 
                    title: "ADHD Assessment",
                    description: "Evaluation for attention deficit hyperactivity disorder",
                    duration: "75 mins"
                },
                { 
                    title: "Career Guidance/Aptitude Test",
                    description: "Assessment of career interests and aptitudes",
                    duration: "60 mins"
                },
                { 
                    title: "Personality Test (MMPI/MCMI 4)",
                    description: "Comprehensive personality assessment",
                    duration: "60 mins"
                }
            ]
        },
        {
            id: 2,
            title: "Therapy",
            image: couplesCounselingImg,
            description: "Evidence-based therapeutic interventions tailored to individual needs and goals for lasting change.",
            color: "#ff9800",
            subservices: [
                { 
                    title: "Cognitive Behavior Therapy",
                    description: "Evidence-based therapy for thought pattern modification",
                    duration: "50 mins"
                },
                { 
                    title: "Behavior Therapy",
                    description: "Focus on changing maladaptive behaviors",
                    duration: "50 mins"
                },
                { 
                    title: "Psychoanalysis",
                    description: "In-depth exploration of unconscious processes",
                    duration: "60 mins"
                },
                { 
                    title: "Humanistic Therapy",
                    description: "Person-centered therapeutic approach",
                    duration: "50 mins"
                },
                { 
                    title: "Grief Counselling",
                    description: "Support for loss and bereavement",
                    duration: "50 mins"
                },
                { 
                    title: "Marriage / Couple Therapy",
                    description: "Relationship enhancement and conflict resolution",
                    duration: "60 mins"
                },
                { 
                    title: "Family Therapy",
                    description: "Systemic approach to family issues",
                    duration: "60 mins"
                },
                { 
                    title: "Supportive Psychotherapy",
                    description: "Emotional support and validation",
                    duration: "50 mins"
                },
                { 
                    title: "Social Skill Training",
                    description: "Development of interpersonal skills",
                    duration: "50 mins"
                },
                { 
                    title: "Motivational Enhancement Therapy",
                    description: "For addiction recovery and behavioral change",
                    duration: "50 mins"
                }
            ]
        },
        {
            id: 3,
            title: "Group & Support",
            image: familyTherapyImg,
            description: "Therapeutic group sessions and support networks for shared healing and mutual growth.",
            color: "#4caf50",
            subservices: [
                { 
                    title: "Family Counseling",
                    description: "Improve family dynamics and resolve conflicts with professional guidance",
                    duration: "60 mins"
                },
                { 
                    title: "Parenting Support",
                    description: "Develop effective parenting strategies and improve family communication",
                    duration: "50 mins"
                },
                { 
                    title: "Support Groups",
                    description: "Peer support for various mental health challenges",
                    duration: "90 mins"
                },
                { 
                    title: "Anger Management Group",
                    description: "Group therapy for anger and emotional regulation",
                    duration: "75 mins"
                }
            ]
        },
        {
            id: 4,
            title: "Education & Training",
            image: childTherapyImg,
            description: "Specialized educational assessments, remedial training, and skill development programs.",
            color: "#9c27b0",
            subservices: [
                { 
                    title: "Learning Disability Assessment",
                    description: "Comprehensive evaluation for learning difficulties",
                    duration: "90 mins"
                },
                { 
                    title: "Remedial Education",
                    description: "Personalized educational support and intervention",
                    duration: "60 mins"
                },
                { 
                    title: "Study Skills Training",
                    description: "Develop effective study habits and techniques",
                    duration: "50 mins"
                },
                { 
                    title: "Workshops & Seminars",
                    description: "Educational programs on mental health topics",
                    duration: "120 mins"
                }
            ]
        },
        {
            id: 5,
            title: "Anxiety & Stress",
            image: anxietyTreatmentImg,
            description: "Specialized treatments for anxiety disorders, stress management, and emotional regulation.",
            color: "#2196f3",
            subservices: [
                { 
                    title: "Anxiety Management",
                    description: "Learn techniques to manage and reduce anxiety symptoms effectively",
                    duration: "50 mins"
                },
                { 
                    title: "Stress Reduction",
                    description: "Develop coping strategies to manage daily stress and improve resilience",
                    duration: "50 mins"
                },
                { 
                    title: "Panic Attack Therapy",
                    description: "Specialized treatment for panic disorder",
                    duration: "50 mins"
                },
                { 
                    title: "Relaxation Therapy",
                    description: "Techniques for deep relaxation and calm",
                    duration: "50 mins"
                }
            ]
        },
        {
            id: 6,
            title: "Trauma Recovery",
            image: traumaTherapyImg,
            description: "Specialized evidence-based treatments for trauma, PTSD, and related disorders.",
            color: "#ff5722",
            subservices: [
                { 
                    title: "Trauma Processing",
                    description: "Evidence-based therapy for trauma recovery",
                    duration: "60 mins"
                },
                { 
                    title: "PTSD Treatment",
                    description: "Specialized care for post-traumatic stress disorder",
                    duration: "60 mins"
                },
                { 
                    title: "EMDR Therapy",
                    description: "Eye Movement Desensitization and Reprocessing",
                    duration: "75 mins"
                },
                { 
                    title: "Trauma-Focused CBT",
                    description: "Cognitive behavioral therapy adapted for trauma",
                    duration: "60 mins"
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