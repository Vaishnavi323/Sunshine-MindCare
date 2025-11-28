import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import w1 from '../../assets/w1.jpg';
import w2 from '../../assets/w2.jpg';
import w3 from '../../assets/w3.jpg';

const MentalHealthSection = () => {
    const [recentServices, setRecentServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [flippedCards, setFlippedCards] = useState({});

    // Fetch services from API
    useEffect(() => {
        const fetchRecentServices = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch all services
                const serviceIds = [1, 2, 3, 4, 5, 6];
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
                
                // Transform API data
                const transformedServices = serviceResults.map((result, index) => {
                    if (result.status && result.error) {
                        const service = result.error;
                        return {
                            id: service.id,
                            title: service.title || `Service ${service.id}`,
                            image: getServiceImage(service.id),
                            description: service.description || 'No description available',
                            subservices: service.sub_services && service.sub_services.length > 0 
                                ? service.sub_services.map(sub => ({
                                    title: sub.title || 'Sub Service',
                                    description: sub.description || 'No description available',
                                    duration: '50 mins'
                                }))
                                : getDefaultSubservices(service.id)
                        };
                    }
                    return null;
                }).filter(service => service !== null);

                // Get the 2 most recent services
                const recent = transformedServices.slice(0, 2);
                setRecentServices(recent);
                
            } catch (error) {
                console.error('Error fetching services:', error);
                setError(error.message);
                // Fallback to mock data if API fails
                setRecentServices(getMockRecentServices());
            } finally {
                setLoading(false);
            }
        };

        fetchRecentServices();
    }, []);

    // Helper function to get service image
    const getServiceImage = (id) => {
        const imageMap = {
            1: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            2: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop',
            3: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            4: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            5: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            6: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop'
        };
        return imageMap[id] || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop';
    };

    // Helper function to get default subservices
    const getDefaultSubservices = (id) => {
        const defaultSubservices = {
            1: [
                {
                    title: "Individual Counseling",
                    description: "Personalized one-on-one therapy sessions tailored to your specific needs and goals.",
                    duration: "50 mins"
                },
                {
                    title: "Cognitive Behavioral Therapy",
                    description: "Evidence-based approach to identify and change negative thought patterns.",
                    duration: "50 mins"
                }
            ],
            2: [
                {
                    title: "Couples Therapy",
                    description: "Professional guidance to strengthen relationships and improve communication.",
                    duration: "60 mins"
                },
                {
                    title: "Relationship Counseling",
                    description: "Work through relationship challenges with expert support and guidance.",
                    duration: "60 mins"
                }
            ]
        };
        return defaultSubservices[id] || [{
            title: "Professional Counseling",
            description: "Expert mental health support and guidance.",
            duration: "50 mins"
        }];
    };

    // Fallback mock data
    const getMockRecentServices = () => [
        {
            id: 1,
            title: "Individual Therapy",
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            description: "One-on-one counseling sessions tailored to your unique needs and goals.",
            subservices: [
                {
                    title: "Individual Counseling",
                    description: "Personalized one-on-one therapy sessions tailored to your specific needs and goals.",
                    duration: "50 mins"
                },
                {
                    title: "Cognitive Behavioral Therapy",
                    description: "Evidence-based approach to identify and change negative thought patterns.",
                    duration: "50 mins"
                }
            ]
        },
        {
            id: 2,
            title: "Couples Counseling",
            image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop',
            description: "Strengthen your relationship and improve communication patterns with professional guidance.",
            subservices: [
                {
                    title: "Couples Therapy",
                    description: "Professional guidance to strengthen relationships and improve communication.",
                    duration: "60 mins"
                },
                {
                    title: "Relationship Counseling",
                    description: "Work through relationship challenges with expert support and guidance.",
                    duration: "60 mins"
                }
            ]
        }
    ];

    const handleCardClick = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    const handleCardHover = (serviceId, isHovering) => {
        setFlippedCards(prev => ({
            ...prev,
            [serviceId]: isHovering
        }));
    };

    if (loading) {
        return (
            <div className="main-container">
                <div className="loading-section">
                    <div className="loading-spinner"></div>
                    <p>Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Montserrat', sans-serif;
                }

                .main-container {
                    background: #f8f9fa;
                    padding: 60px 20px;
                }

                .section-titles {
                    text-align: center;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1e88e5;
                    margin-bottom: 50px;
                }

                .cards-container {
                    max-width: 1200px;
                    margin: 0 auto 80px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }

                .info-card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .info-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .card-image {
                    width: 100%;
                    height: 350px;
                    object-fit: cover;
                }

                .card-title {
                    padding: 20px;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #ff9800;
                    text-align: left;
                }

                .wellness-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                }

                .wellness-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #1e88e5;
                    margin-bottom: 15px;
                }

                .wellness-subtitle {
                    font-size: 1rem;
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto 50px;
                    line-height: 1.6;
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 30px;
                }

                /* Flip Card Styles */
                .flip-card {
                    background: transparent;
                    perspective: 1000px;
                    height: 400px;
                    cursor: pointer;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                }

                .flip-card.flipped .flip-card-inner {
                    transform: rotateY(180deg);
                }

                .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                .flip-card-front {
                    background: white;
                }

                .flip-card-back {
                    background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
                    color: white;
                    transform: rotateY(180deg);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 30px;
                    text-align: left;
                }

                .service-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .service-title-front {
                    padding: 20px;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #ff9800;
                    text-align: left;
                }

                .service-description-front {
                    padding: 0 20px 20px;
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .flip-indicator {
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    background: rgba(255, 152, 0, 0.9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .flip-card:hover .flip-indicator {
                    background: #ff9800;
                    transform: scale(1.05);
                }

                .back-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .subservices-list-back {
                    max-height: 250px;
                    overflow-y: auto;
                    padding-right: 10px;
                }

                .subservice-item-back {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 12px 15px;
                    margin-bottom: 10px;
                    border-radius: 8px;
                    border-left: 3px solid #ff9800;
                }

                .subservice-title-back {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 5px;
                }

                .subservice-description-back {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.4;
                    margin-bottom: 5px;
                }

                .subservice-duration-back {
                    font-size: 0.75rem;
                    color: #ff9800;
                    font-weight: 600;
                }

                .view-details-btn {
                    background: #ff9800;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-weight: 600;
                    margin-top: 20px;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .view-details-btn:hover {
                    background: #f57c00;
                    transform: translateY(-2px);
                }

                /* Modal Styles */
                .service-modal .modal-content {
                    border-radius: 20px;
                    border: none;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .modal-header-content {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
                    color: white;
                    border-radius: 20px 20px 0 0;
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

                .modal-text-content .modal-title {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .modal-subtitle {
                    color: rgba(255, 255, 255, 0.9);
                    margin: 0;
                    font-size: 1rem;
                }

                .subservices-container {
                    padding: 2rem;
                }

                .subservices-title {
                    color: #2a5298;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .subservices-grid {
                    display: grid;
                    gap: 1.5rem;
                }

                .subservice-card-modal {
                    background: white;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(100, 181, 246, 0.2);
                    padding: 1.5rem;
                }

                .subservice-header-modal {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .subservice-title-modal {
                    color: #2a5298;
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin: 0;
                    flex: 1;
                }

                .subservice-meta-modal {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.25rem;
                }

                .duration-modal {
                    background: rgba(30, 136, 229, 0.1);
                    color: #2a5298;
                    padding: 4px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .subservice-description-modal {
                    color: #546e7a;
                    line-height: 1.5;
                    margin: 0;
                }

                /* Loading Styles */
                .loading-section {
                    text-align: center;
                    padding: 60px 20px;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #1e88e5;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Scrollbar Styling */
                .subservices-list-back::-webkit-scrollbar {
                    width: 6px;
                }

                .subservices-list-back::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                .subservices-list-back::-webkit-scrollbar-thumb {
                    background: rgba(255, 152, 0, 0.6);
                    border-radius: 3px;
                }

                .subservices-list-back::-webkit-scrollbar-thumb:hover {
                    background: #ff9800;
                }

                @media (max-width: 768px) {
                    .section-titles {
                        font-size: 2rem;
                    }

                    .wellness-title {
                        font-size: 1.8rem;
                    }

                    .cards-container {
                        grid-template-columns: 1fr;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                    }

                    .flip-card {
                        height: 350px;
                    }

                    .service-image {
                        height: 200px;
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

                    .subservice-header-modal {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .subservice-meta-modal {
                        align-items: flex-start;
                        flex-direction: row;
                        gap: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .flip-card {
                        height: 300px;
                    }

                    .service-image {
                        height: 150px;
                    }

                    .flip-card-back {
                        padding: 20px;
                    }

                    .back-title {
                        font-size: 1.3rem;
                    margin-bottom: 15px;
                    }
                }
            `}</style>

            <div className="main-container">
                {/* What's New Section */}
                <h2 className="section-titles">What's New</h2>

                <div className="cards-container">
                    <div className="info-card">
                        <img
                            src={w1}
                            alt="Mental Health Illustration"
                            className="card-image"
                        />
                        <h3 className="card-title">What Is Mental Health?</h3>
                    </div>

                    <div className="info-card">
                        <img
                            src={w2}
                            alt="Mental Health Signs"
                            className="card-image"
                        />
                        <h3 className="card-title">What Are The Signs?</h3>
                    </div>

                    <div className="info-card">
                        <img
                            src={w3}
                            alt="Mental Health Care"
                            className="card-image"
                        />
                        <h3 className="card-title">How To Look After Your Mental Health?</h3>
                    </div>
                </div>

                {/* Wellness Section with Dynamic Services */}
                <div className="wellness-section">
                    <h2 className="wellness-title">Your Wellness, Our Priority</h2>
                    <p className="wellness-subtitle">
                        At Sunshine Counselling and Therapy Center, we prioritize your well-being with
                        a range of specialized services crafted to guide you on your path to a
                        healthier, more fulfilled life.
                    </p>

                    <div className="services-grid">
                        {recentServices.map((service) => (
                            <div 
                                key={service.id}
                                className={`flip-card ${flippedCards[service.id] ? 'flipped' : ''}`}
                                onMouseEnter={() => handleCardHover(service.id, true)}
                                onMouseLeave={() => handleCardHover(service.id, false)}
                                onClick={() => handleCardClick(service)}
                            >
                                <div className="flip-card-inner">
                                    {/* Front of Card */}
                                    <div className="flip-card-front">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="service-image"
                                        />
                                        <h3 className="service-title-front">{service.title}</h3>
                                        <p className="service-description-front">{service.description}</p>
                                        
                                    </div>

                                    {/* Back of Card */}
                                    <div className="flip-card-back">
                                        <h3 className="back-title">{service.title}</h3>
                                        <div className="subservices-list-back">
                                            {service.subservices.map((subservice, index) => (
                                                <div key={index} className="subservice-item-back">
                                                    <h4 className="subservice-title-back">{subservice.title}</h4>
                                                    <p className="subservice-description-back">{subservice.description}</p>
                                                    <div className="subservice-duration-back">{subservice.duration}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="view-details-btn">
                                            Click for Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subservices Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg" 
                centered
                className="service-modal"
            >
                {selectedService && (
                    <>
                        <Modal.Header closeButton className="modal-header-content">
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
                        </Modal.Header>
                        <Modal.Body>
                            <div className="subservices-container">
                                <h4 className="subservices-title">Available Treatments</h4>
                                <div className="subservices-grid">
                                    {selectedService.subservices.map((subservice, index) => (
                                        <div 
                                            key={index}
                                            className="subservice-card-modal"
                                        >
                                            <div className="subservice-content">
                                                <div className="subservice-header-modal">
                                                    <h5 className="subservice-title-modal">{subservice.title}</h5>
                                                    <div className="subservice-meta-modal">
                                                        <span className="duration-modal">{subservice.duration}</span>
                                                    </div>
                                                </div>
                                                <p className="subservice-description-modal">{subservice.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
};

export default MentalHealthSection;