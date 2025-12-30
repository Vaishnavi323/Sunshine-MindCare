// import React, { useState, useEffect, useRef } from 'react';
// import { Container, Row, Col, Modal } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Import your service images
// import individualTherapyImg from '../../assets/a1.jpg';
// import couplesCounselingImg from '../../assets/a2.jpg';
// import familyTherapyImg from '../../assets/a1.jpg';
// import childTherapyImg from '../../assets/a1.jpg';
// import anxietyTreatmentImg from '../../assets/a1.jpg';
// import traumaTherapyImg from '../../assets/a1.jpg';

// const ServicesPage = () => {
//     const [selectedService, setSelectedService] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [visibleServices, setVisibleServices] = useState({});
//     const [servicesData, setServicesData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const servicesRef = useRef([]);

//     // Fetch services from API
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
                
//                 const serviceIds = [1, 2, 3, 4, 5, 6];
//                 const servicePromises = serviceIds.map(async (id) => {
//                     try {
//                         const url = `${import.meta.env.VITE_BACKEND_URL}/service/list?id=${id}`;
                        
//                         const response = await fetch(url, {
//                             method: 'GET',
//                             headers: {
//                                 'Accept': 'application/json',
//                                 'Content-Type': 'application/json',
//                             },
//                         });
                        
//                         if (!response.ok) {
//                             throw new Error(`HTTP ${response.status} for service ${id}`);
//                         }
                        
//                         const data = await response.json();
//                         return { id, data, error: null };
                        
//                     } catch (fetchError) {
//                         console.error(`Error fetching service ${id}:`, fetchError);
//                         return { 
//                             id, 
//                             data: null, 
//                             error: fetchError.message || 'Network error' 
//                         };
//                     }
//                 });

//                 const results = await Promise.all(servicePromises);
                
//                 // Transform API responses
//                 const transformedServices = results.map((result) => {
//                     const { id, data, error } = result;
                    
//                     // If we got a successful API response
//                     if (data && !error) {
//                         // Extract service data from different possible response structures
//                         let serviceData = null;
                        
//                         // Try different possible response structures
//                         if (data.data && data.data.id) {
//                             serviceData = data.data;
//                         } else if (data.error && data.error.id) {
//                             serviceData = data.error;
//                         } else if (data.id) {
//                             serviceData = data;
//                         } else if (Array.isArray(data) && data.length > 0) {
//                             serviceData = data[0];
//                         } else if (typeof data === 'object' && Object.keys(data).length > 0) {
//                             serviceData = data;
//                         }
                        
//                         // If we have valid service data from API
//                         if (serviceData && (serviceData.id || serviceData.title || serviceData.name)) {
//                             const hasSubservices = (
//                                 (serviceData.sub_services && Array.isArray(serviceData.sub_services) && serviceData.sub_services.length > 0) ||
//                                 (serviceData.subServices && Array.isArray(serviceData.subServices) && serviceData.subServices.length > 0) ||
//                                 (serviceData.subservices && Array.isArray(serviceData.subservices) && serviceData.subservices.length > 0)
//                             );
                            
//                             return {
//                                 id: serviceData.id || id,
//                                 title: serviceData.title || serviceData.name || `Service ${id}`,
//                                 image: getServiceImage(serviceData.id || id),
//                                 description: serviceData.description || serviceData.desc || 'No description available',
//                                 color: getServiceColor(serviceData.id || id),
//                                 subservices: hasSubservices 
//                                     ? (serviceData.sub_services || serviceData.subServices || serviceData.subservices || []).map(sub => ({
//                                         title: sub.title || sub.name || 'Sub Service',
//                                         description: sub.description || sub.desc || 'No description available',
//                                         duration: sub.duration || sub.time || '50 mins',
//                                         price: sub.price || sub.cost || 'Contact for pricing'
//                                     }))
//                                     : [] // Return empty array if no subservices
//                             };
//                         }
//                     }
                    
//                     // If API failed or returned no valid data, return null
//                     return null;
//                 });

//                 // Filter out any null values (failed API calls)
//                 const validServices = transformedServices.filter(service => 
//                     service !== null
//                 );
                
//                 // Set the services data
//                 setServicesData(validServices);
                
//             } catch (error) {
//                 console.error('Error in fetchServices:', error);
//                 setError(error.message);
//                 // Don't set any data on error
//                 setServicesData([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchServices();
//     }, []);

//     // Helper function to get service image based on ID
//     const getServiceImage = (id) => {
//         const imageMap = {
//             1: individualTherapyImg,
//             2: couplesCounselingImg,
//             3: familyTherapyImg,
//             4: childTherapyImg,
//             5: anxietyTreatmentImg,
//             6: traumaTherapyImg
//         };
//         return imageMap[id] || individualTherapyImg;
//     };

//     // Helper function to get service color based on ID
//     const getServiceColor = (id) => {
//         const colorMap = {
//             1: "#2a5298",
//             2: "#ff9800",
//             3: "#4caf50",
//             4: "#9c27b0",
//             5: "#2196f3",
//             6: "#ff5722"
//         };
//         return colorMap[id] || "#2a5298";
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setVisibleServices(prev => ({
//                             ...prev,
//                             [entry.target.dataset.index]: true
//                         }));
//                     }
//                 });
//             },
//             { 
//                 threshold: 0.2,
//                 rootMargin: '0px 0px -50px 0px'
//             }
//         );

//         servicesRef.current.forEach((card, index) => {
//             if (card) {
//                 card.dataset.index = index;
//                 observer.observe(card);
//             }
//         });

//         return () => observer.disconnect();
//     }, [servicesData]);

//     const setServiceRef = (index) => (el) => {
//         servicesRef.current[index] = el;
//     };

//     const handleServiceClick = (service) => {
//         setSelectedService(service);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedService(null);
//     };

//     if (loading) {
//         return (
//             <div className="service-page">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Col lg={8} className="text-center">
//                             <div className="loading-state">
//                                 <div className="loading-spinner"></div>
//                                 <p>Loading services from server...</p>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="service-page">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Col lg={8} className="text-center">
//                             <div className="error-state">
//                                 <div className="error-icon">⚠️</div>
//                                 <h3>Unable to Load Services</h3>
//                                 <p>There was an error connecting to the server. Please try again later.</p>
//                                 <p className="text-muted">Error: {error}</p>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         );
//     }

//     if (servicesData.length === 0) {
//         return (
//             <div className="service-page">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Col lg={8} className="text-center">
//                             <div className="no-data-state">
//                                 <div className="no-data-icon">📭</div>
//                                 <h3>No Services Available</h3>
//                                 <p>No services data found from the server.</p>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         );
//     }

//     return (
//         <div className="service-page">
//             {/* Animated Background */}
//             <div className="services-background">
//                 <div className="floating-therapy">💬</div>
//                 <div className="floating-therapy">❤️</div>
//                 <div className="floating-therapy">🌟</div>
//                 <div className="floating-therapy">😊</div>
//             </div>

//             <Container>
//                 {/* Header Section */}
//                 <Row className="justify-content-center">
//                     <Col lg={8} className="text-center">
//                         <div className="services-header">
//                             <h1 className="services-title">Our Services</h1>
//                             <p className="services-subtitle">
//                                 Comprehensive mental health services tailored to your unique journey. 
//                                 Click on any service to explore specialized treatments and therapies.
//                             </p>
//                             <div className="header-divider"></div>
//                         </div>
//                     </Col>
//                 </Row>

//                 {/* Services Grid */}
//                 <Row className="g-4">
//                     {servicesData.map((service, index) => (
//                         <Col key={service.id} lg={4} md={6} className="mb-4">
//                             <div
//                                 ref={setServiceRef(index)}
//                                 className={`service-cards ${visibleServices[index] ? 'visible' : ''}`}
//                                 style={{ animationDelay: `${index * 0.1}s` }}
//                                 onClick={() => handleServiceClick(service)}
//                             >
//                                 <div className="card-inner">
//                                     <div className="service-image-container">
//                                         <img 
//                                             src={service.image} 
//                                             alt={service.title}
//                                             className="service-image"
//                                         />
//                                         <div className="image-overlay"></div>
//                                     </div>
//                                     <div className="service-content">
//                                         <h3 className="service-title-card">{service.title}</h3>
//                                         <p className="service-description">{service.description}</p>
//                                         <div className="service-footer">
//                                             <span className="subservices-count">
//                                                 {service.subservices.length} Specialized {service.subservices.length === 1 ? 'Treatment' : 'Treatments'}
//                                             </span>
//                                             <div className="click-indicator">
//                                                 <span>View Details →</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>

//             {/* Subservices Modal */}
//             <Modal 
//                 show={showModal} 
//                 onHide={handleCloseModal} 
//                 size="lg" 
//                 centered
//                 className="subservices-modal"
//             >
//                 {selectedService && (
//                     <>
//                         <Modal.Header closeButton>
//                             <div className="modal-header-content">
//                                 <div className="modal-image-container">
//                                     <img 
//                                         src={selectedService.image} 
//                                         alt={selectedService.title}
//                                         className="modal-service-image"
//                                     />
//                                 </div>
//                                 <div className="modal-text-content">
//                                     <Modal.Title>{selectedService.title}</Modal.Title>
//                                     <p className="modal-subtitle">{selectedService.description}</p>
//                                 </div>
//                             </div>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <div className="subservices-container">
//                                 <h4 className="subservices-title">Available Treatments</h4>
//                                 {selectedService.subservices.length > 0 ? (
//                                     <div className="subservices-grid">
//                                         {selectedService.subservices.map((subservice, index) => (
//                                             <div 
//                                                 key={index}
//                                                 className="subservice-card"
//                                                 style={{ animationDelay: `${index * 0.1}s` }}
//                                             >
//                                                 <div className="subservice-content">
//                                                     <div className="subservice-header">
//                                                         <h5 className="subservice-title">{subservice.title}</h5>
//                                                         <div className="subservice-meta">
//                                                             <span className="duration">{subservice.duration}</span>
//                                                         </div>
//                                                     </div>
//                                                     <p className="subservice-description">{subservice.description}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="no-subservices-message">
//                                         <p>No specific treatments listed for this service.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </Modal.Body>
//                     </>
//                 )}
//             </Modal>

//             <style jsx>{`
//                 .service-page {
//                     min-height: 100vh;
//                     background: linear-gradient(135deg, #f8fcff 0%, #e8f4ff 100%);
//                     padding: 80px 0;
//                     position: relative;
//                     overflow: hidden;
//                 }

//                 /* Animated Background */
//                 .services-background {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                     pointer-events: none;
//                     z-index: 0;
//                 }

//                 .floating-therapy {
//                     position: absolute;
//                     font-size: 2rem;
//                     opacity: 0.1;
//                     animation: floatGently 8s ease-in-out infinite;
//                 }

//                 .floating-therapy:nth-child(1) {
//                     top: 15%;
//                     left: 5%;
//                     animation-delay: 0s;
//                 }

//                 .floating-therapy:nth-child(2) {
//                     top: 60%;
//                     right: 10%;
//                     animation-delay: 2s;
//                 }

//                 .floating-therapy:nth-child(3) {
//                     bottom: 20%;
//                     left: 15%;
//                     animation-delay: 4s;
//                 }

//                 .floating-therapy:nth-child(4) {
//                     top: 30%;
//                     right: 20%;
//                     animation-delay: 1s;
//                 }

//                 @keyframes floatGently {
//                     0%, 100% {
//                         transform: translateY(0px) rotate(0deg) scale(1);
//                     }
//                     33% {
//                         transform: translateY(-15px) rotate(120deg) scale(1.1);
//                     }
//                     66% {
//                         transform: translateY(8px) rotate(240deg) scale(0.9);
//                     }
//                 }

//                 /* Header Styles */
//                 .services-header {
//                     margin-bottom: 60px;
//                 }

//                 .services-title {
//                     font-size: 3.5rem;
//                     font-weight: 800;
//                     background:linear-gradient(45deg, #2a5298, #1e3c72);
//                     -webkit-background-clip: text;
//                     -webkit-text-fill-color: transparent;
//                     background-clip: text;
//                     margin-bottom: 1rem;
//                     opacity: 0;
//                     animation: slideDown 1s ease-out 0.3s forwards;
//                 }

//                 .services-subtitle {
//                     font-size: 1.2rem;
//                     color: #546e7a;
//                     line-height: 1.6;
//                     margin-bottom: 2rem;
//                     opacity: 0;
//                     animation: fadeIn 1s ease-out 0.6s forwards;
//                 }

//                 .header-divider {
//                     width: 100px;
//                     height: 4px;
//                     background: linear-gradient(45deg, #ff9800, #ffb74d);
//                     margin: 0 auto;
//                     border-radius: 2px;
//                     animation: expandWidth 1s ease-out 0.9s forwards;
//                     transform-origin: left;
//                 }

//                 /* Service Cards */
//                 .service-cards {
//                     opacity: 0;
//                     transform: translateY(50px);
//                     transition: all 0.6s ease-out;
//                     cursor: pointer;
//                     height: 100%;
//                 }

//                 .service-cards.visible {
//                     opacity: 1;
//                     transform: translateY(0);
//                 }

//                 .card-inner {
//                     background: white;
//                     border-radius: 20px;
//                     overflow: hidden;
//                     box-shadow: 0 10px 30px rgba(30, 136, 229, 0.1);
//                     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//                     border: 1px solid rgba(100, 181, 246, 0.2);
//                     height: 100%;
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .service-cards:hover .card-inner {
//                     transform: translateY(-15px) scale(1.02);
//                     box-shadow: 
//                         0 20px 40px rgba(30, 136, 229, 0.15),
//                         0 0 0 1px rgba(100, 181, 246, 0.3);
//                 }

//                 .service-image-container {
//                     position: relative;
//                     height: 250px;
//                     overflow: hidden;
//                 }

//                 .service-image {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                     transition: transform 0.6s ease;
//                 }

//                 .service-cards:hover .service-image {
//                     transform: scale(1.1);
//                 }

//                 .image-overlay {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     background: linear-gradient(to bottom, transparent 60%, rgba(30, 136, 229, 0.3));
//                     opacity: 0;
//                     transition: opacity 0.3s ease;
//                 }

//                 .service-cards:hover .image-overlay {
//                     opacity: 1;
//                 }

//                 .service-content {
//                     padding: 2rem;
//                     flex-grow: 1;
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .service-title-card {
//                     font-size: 1.5rem;
//                     font-weight: 700;
//                     color: #2a5298;
//                     margin-bottom: 1rem;
//                     line-height: 1.3;
//                 }

//                 .service-description {
//                     color: #546e7a;
//                     line-height: 1.6;
//                     margin-bottom: 1.5rem;
//                     flex-grow: 1;
//                 }

//                 .service-footer {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: center;
//                     margin-top: auto;
//                 }

//                 .subservices-count {
//                     background: rgba(30, 136, 229, 0.1);
//                     color: #2a5298;
//                     padding: 6px 12px;
//                     border-radius: 15px;
//                     font-size: 0.85rem;
//                     font-weight: 600;
//                 }

//                 .click-indicator {
//                     color: #ff9800;
//                     font-weight: 600;
//                     transition: transform 0.3s ease;
//                 }

//                 .service-cards:hover .click-indicator {
//                     transform: translateX(5px);
//                 }

//                 /* Modal Styles */
//                 .subservices-modal .modal-content {
//                     border-radius: 20px;
//                     border: none;
//                     box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
//                 }

//                 .modal-header-content {
//                     display: flex;
//                     align-items: center;
//                     gap: 1.5rem;
//                     padding: 1.5rem;
//                 }

//                 .modal-image-container {
//                     width: 80px;
//                     height: 80px;
//                     border-radius: 15px;
//                     overflow: hidden;
//                     flex-shrink: 0;
//                 }

//                 .modal-service-image {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: cover;
//                 }

//                 .modal-text-content {
//                     flex: 1;
//                 }

//                 .modal-subtitle {
//                     color: #546e7a;
//                     margin: 0;
//                     font-size: 1rem;
//                 }

//                 .subservices-container {
//                     padding: 0 1.5rem 1.5rem;
//                 }

//                 .subservices-title {
//                     color: #2a5298;
//                     font-size: 1.5rem;
//                     font-weight: 700;
//                     margin-bottom: 1.5rem;
//                 }

//                 .subservices-grid {
//                     display: grid;
//                     gap: 1.5rem;
//                 }

//                 .subservice-card {
//                     background: white;
//                     border-radius: 15px;
//                     overflow: hidden;
//                     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//                     animation: slideInRight 0.5s ease-out forwards;
//                     opacity: 0;
//                     transform: translateX(30px);
//                     display: flex;
//                     border: 1px solid rgba(100, 181, 246, 0.2);
//                 }

//                 .subservice-content {
//                     padding: 1.5rem;
//                     flex: 1;
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 .subservice-header {
//                     display: flex;
//                     justify-content: space-between;
//                     align-items: flex-start;
//                     margin-bottom: 1rem;
//                 }

//                 .subservice-title {
//                     color: #2a5298;
//                     font-size: 1.2rem;
//                     font-weight: 600;
//                     margin: 0;
//                     flex: 1;
//                 }

//                 .subservice-meta {
//                     display: flex;
//                     flex-direction: column;
//                     align-items: flex-end;
//                     gap: 0.25rem;
//                 }

//                 .duration {
//                     background: rgba(30, 136, 229, 0.1);
//                     color: #2a5298;
//                     padding: 4px 8px;
//                     border-radius: 10px;
//                     font-size: 0.8rem;
//                     font-weight: 600;
//                 }

//                 .subservice-description {
//                     color: #546e7a;
//                     line-height: 1.5;
//                     margin-bottom: 1rem;
//                     flex-grow: 1;
//                 }

//                 .no-subservices-message {
//                     text-align: center;
//                     padding: 2rem;
//                     color: #666;
//                     font-style: italic;
//                 }

//                 /* Loading State */
//                 .loading-state {
//                     text-align: center;
//                     padding: 100px 20px;
//                     animation: fadeIn 0.6s ease-out;
//                 }

//                 .loading-spinner {
//                     width: 50px;
//                     height: 50px;
//                     border: 4px solid #f3f3f3;
//                     border-top: 4px solid #2a5298;
//                     border-radius: 50%;
//                     animation: spin 1s linear infinite;
//                     margin: 0 auto 1rem;
//                 }

//                 /* Error State */
//                 .error-state {
//                     text-align: center;
//                     padding: 100px 20px;
//                     animation: fadeIn 0.6s ease-out;
//                 }

//                 .error-icon {
//                     font-size: 4rem;
//                     margin-bottom: 20px;
//                 }

//                 .error-state h3 {
//                     color: #dc3545;
//                     margin-bottom: 1rem;
//                 }

//                 .error-state p {
//                     color: #666;
//                     margin-bottom: 0.5rem;
//                 }

//                 /* No Data State */
//                 .no-data-state {
//                     text-align: center;
//                     padding: 100px 20px;
//                     animation: fadeIn 0.6s ease-out;
//                 }

//                 .no-data-icon {
//                     font-size: 4rem;
//                     margin-bottom: 20px;
//                 }

//                 .no-data-state h3 {
//                     color: #666;
//                     margin-bottom: 1rem;
//                 }

//                 .no-data-state p {
//                     color: #888;
//                     margin-bottom: 0.5rem;
//                 }

//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }

//                 /* Animations */
//                 @keyframes slideDown {
//                     from {
//                         opacity: 0;
//                         transform: translateY(-50px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }

//                 @keyframes expandWidth {
//                     from { width: 0; }
//                     to { width: 100px; }
//                 }

//                 @keyframes slideInRight {
//                     from {
//                         opacity: 0;
//                         transform: translateX(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }

//                 /* Responsive Design */
//                 @media (max-width: 768px) {
//                     .services-title {
//                         font-size: 2.5rem;
//                     }

//                     .services-subtitle {
//                         font-size: 1.1rem;
//                     }

//                     .service-content {
//                         padding: 1.5rem;
//                     }

//                     .service-title-card {
//                         font-size: 1.3rem;
//                     }

//                     .modal-header-content {
//                         flex-direction: column;
//                         text-align: center;
//                         gap: 1rem;
//                     }

//                     .modal-image-container {
//                         width: 100px;
//                         height: 100px;
//                     }

//                     .subservice-card {
//                         flex-direction: column;
//                     }

//                     .subservice-header {
//                         flex-direction: column;
//                         gap: 1rem;
//                     }

//                     .subservice-meta {
//                         align-items: flex-start;
//                         flex-direction: row;
//                         gap: 1rem;
//                     }
//                 }

//                 @media (max-width: 576px) {
//                     .services-title {
//                         font-size: 2rem;
//                     }

//                     .service-image-container {
//                         height: 200px;
//                     }

//                     .subservice-card {
//                         padding: 0;
//                     }
//                 }

//                 /* Reduced motion for accessibility */
//                 @media (prefers-reduced-motion: reduce) {
//                     .service-cards,
//                     .floating-therapy,
//                     .services-title,
//                     .services-subtitle,
//                     .header-divider,
//                     .subservice-card {
//                         animation: none !important;
//                         transition: none !important;
//                     }
                    
//                     .service-cards {
//                         opacity: 1;
//                         transform: none;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ServicesPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ServicesPage = () => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost/Sunshine-MindCare/Sunshine_Mindcare_Backend';
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [loadingSubservices, setLoadingSubservices] = useState({});

  // Sample services for testing (remove when API is ready)
  const sampleServices = [
    {
      id: 1,
      title: "General Medicine",
      description: "Comprehensive medical care for adults and children, including diagnosis and treatment of various health conditions.",
      image: null,
    },
    {
      id: 2,
      title: "Cardiology",
      description: "Specialized care for heart-related conditions including diagnosis, treatment, and preventive cardiology.",
      image: null,
    },
    {
      id: 3,
      title: "Pediatrics",
      description: "Healthcare for infants, children, and adolescents, including regular check-ups and specialized care.",
      image: null,
    },
    {
      id: 4,
      title: "Dermatology",
      description: "Treatment of skin, hair, and nail conditions with advanced diagnostic and therapeutic options.",
      image: null,
    },
    {
      id: 5,
      title: "Orthopedics",
      description: "Care for musculoskeletal system including bones, joints, ligaments, tendons, and muscles.",
      image: null,
    },
    {
      id: 6,
      title: "Mental Health",
      description: "Comprehensive psychological services including counseling, therapy, and psychiatric care.",
      image: null,
    },
  ];

  // Fetch services - using sample data for now
  const fetchServices = async () => {
    try {
      setLoading(true);
      // Uncomment this when your API is ready
      /*
      const response = await axios.get(`${API_BASE_URL}/services`);
      if (response.data.status) {
        setServices(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch services');
      }
      */
      
      // Using sample data for now
      setServices(sampleServices);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch subservices for a specific service
  const fetchSubservices = async (serviceId) => {
    try {
      setLoadingSubservices(prev => ({ ...prev, [serviceId]: true }));
      
      const response = await axios.get(`${API_BASE_URL}/service/list?id=${serviceId}`);
      
      if (response.data.status) {
        return response.data.error.sub_services || []; // Based on your API response structure
      } else {
        throw new Error(response.data.message || 'Failed to fetch subservices');
      }
    } catch (err) {
      console.error('Error fetching subservices:', err);
      throw err;
    } finally {
      setLoadingSubservices(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  // Handle card click
  const handleCardClick = async (serviceId, title) => {
    // If card is already flipped, just flip it back
    if (flippedCards[serviceId]) {
      setFlippedCards(prev => ({ ...prev, [serviceId]: false }));
      return;
    }

    // If we haven't fetched subservices yet, fetch them
    if (!flippedCards[serviceId] && !flippedCards[`${serviceId}_data`]) {
      try {
        const subServices = await fetchSubservices(serviceId);
        setFlippedCards(prev => ({ 
          ...prev, 
          [serviceId]: true,
          [`${serviceId}_data`]: subServices
        }));
      } catch (error) {
        // If API fails, use sample subservices for demonstration
        const sampleSubservices = getSampleSubservices(serviceId, title);
        setFlippedCards(prev => ({ 
          ...prev, 
          [serviceId]: true,
          [`${serviceId}_data`]: sampleSubservices
        }));
      }
    } else {
      // If we already have the data, just flip the card
      setFlippedCards(prev => ({ ...prev, [serviceId]: true }));
    }
  };

  // Get sample subservices for demonstration
  const getSampleSubservices = (serviceId, title) => {
    const subservicesMap = {
      1: [
        { id: 101, title: "General Check-up", description: "Complete physical examination and health assessment" },
        { id: 102, title: "Chronic Disease Management", description: "Management of diabetes, hypertension, etc." },
        { id: 103, title: "Vaccinations", description: "Immunization for all age groups" },
        { id: 104, title: "Health Screening", description: "Preventive health screenings and tests" }
      ],
      2: [
        { id: 201, title: "Echocardiography", description: "Ultrasound imaging of the heart" },
        { id: 202, title: "Stress Test", description: "Cardiac stress testing" },
        { id: 203, title: "Angioplasty", description: "Coronary artery procedure" },
        { id: 204, title: "Pacemaker Implantation", description: "Cardiac rhythm management" }
      ],
      3: [
        { id: 301, title: "Newborn Care", description: "Comprehensive care for newborns" },
        { id: 302, title: "Childhood Vaccinations", description: "Immunization schedule for children" },
        { id: 303, title: "Growth Monitoring", description: "Regular growth and development checks" },
        { id: 304, title: "Pediatric Nutrition", description: "Dietary guidance for children" }
      ],
      4: [
        { id: 401, title: "Acne Treatment", description: "Treatment for all types of acne" },
        { id: 402, title: "Skin Biopsy", description: "Diagnostic skin procedures" },
        { id: 403, title: "Laser Therapy", description: "Advanced laser treatments" },
        { id: 404, title: "Cosmetic Dermatology", description: "Aesthetic skin treatments" }
      ],
      5: [
        { id: 501, title: "Joint Replacement", description: "Hip and knee replacement surgery" },
        { id: 502, title: "Arthroscopy", description: "Minimally invasive joint surgery" },
        { id: 503, title: "Fracture Care", description: "Treatment for bone fractures" },
        { id: 504, title: "Sports Injury Management", description: "Treatment for athletic injuries" }
      ],
      6: [
        { id: 601, title: "Individual Therapy", description: "One-on-one counseling sessions" },
        { id: 602, title: "Group Therapy", description: "Therapeutic sessions in groups" },
        { id: 603, title: "Cognitive Behavioral Therapy", description: "CBT for various conditions" },
        { id: 604, title: "Psychiatric Evaluation", description: "Comprehensive mental health assessment" }
      ]
    };

    return subservicesMap[serviceId] || [
      { id: 1, title: "Consultation", description: "Initial consultation and assessment" },
      { id: 2, title: "Follow-up", description: "Regular follow-up appointments" },
      { id: 3, title: "Diagnostic Tests", description: "Relevant diagnostic procedures" },
      { id: 4, title: "Treatment Planning", description: "Personalized treatment plans" }
    ];
  };

  // Handle back button click
  const handleBackClick = (serviceId, e) => {
    e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [serviceId]: false }));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Custom styles
  const styles = {
    pageBackground: {
      background: 'linear-gradient(135deg, #2a5298, #1e3c72)',
      minHeight: '100vh'
    },
    cardFront: {
      background: 'linear-gradient(135deg, #2a5298, #1e3c72)',
      height: '100%'
    },
    cardBack: {
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      height: '100%'
    },
    flipContainer: {
      perspective: '1000px',
      height: '300px'
    },
    flipper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d'
    },
    flipped: {
      transform: 'rotateY(180deg)'
    },
    front: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    },
    back: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)'
    }
  };

  if (loading) {
    return (
      <div style={styles.pageBackground} className="d-flex align-items-center justify-content-center">
        <div className="text-center text-white">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading services...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.pageBackground} className="d-flex align-items-center justify-content-center">
        <div className="text-center text-white">
          <div className="alert alert-danger" role="alert">
            <h4>Error Loading Services</h4>
            <p>{error}</p>
            <button className="btn btn-light mt-2" onClick={fetchServices}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground} className="py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="text-white mb-3" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            Our Healthcare Services
          </h1>
          <p className="text-white lead" style={{ opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            Explore our comprehensive healthcare services. Click on any service card to view its subservices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div 
                style={styles.flipContainer}
                className="cursor-pointer"
                onClick={() => handleCardClick(service.id, service.title)}
              >
                <div 
                  style={{
                    ...styles.flipper,
                    ...(flippedCards[service.id] ? styles.flipped : {})
                  }}
                >
                  {/* Front of Card */}
                  <div style={{ ...styles.front, ...styles.cardFront }} className="rounded shadow-lg">
                    <div className="h-100 p-4 d-flex flex-column justify-content-between text-white">
                      <div>
                        <h3 className="h4 fw-bold mb-3">{service.title}</h3>
                        <p className="mb-0" style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-between mt-4">
                        <span className="fw-medium" style={{ fontSize: '0.9rem' }}>
                          Click to view subservices
                        </span>
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card - Subservices */}
                  <div style={{ ...styles.back, ...styles.cardBack }} className="rounded shadow-lg">
                    <div className="h-100 p-4 d-flex flex-column text-white">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h4 className="h5 fw-bold mb-0">Subservices</h4>
                        <button 
                          onClick={(e) => handleBackClick(service.id, e)}
                          className="btn btn-sm p-0 rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {loadingSubservices[service.id] ? (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <span className="ms-2">Loading subservices...</span>
                        </div>
                      ) : flippedCards[`${service.id}_data`] && flippedCards[`${service.id}_data`].length > 0 ? (
                        <div className="flex-grow-1 overflow-auto pe-2">
                          <ul className="list-unstyled mb-0">
                            {flippedCards[`${service.id}_data`].map((subService, index) => (
                              <li 
                                key={subService.id || index}
                                className="mb-3 p-3 rounded"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              >
                                <h5 className="h6 fw-semibold mb-1">{subService.title}</h5>
                                {subService.description && (
                                  <p className="mb-0 small" style={{ opacity: 0.8 }}>
                                    {subService.description}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                          <p className="mb-0" style={{ opacity: 0.7 }}>
                            No subservices available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-5">
            <p className="text-white lead">No services available at the moment.</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-5 text-center text-white" style={{ opacity: 0.8 }}>
          <p className="small">
            <em>Click on any service card to view its subservices. Click the back button or card again to return.</em>
          </p>
        </div>
      </div>

      {/* Custom CSS for scrollbar and cursor */}
      <style>
        {`
          .cursor-pointer {
            cursor: pointer;
          }
          
          .overflow-auto::-webkit-scrollbar {
            width: 6px;
          }
          
          .overflow-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          
          .overflow-auto::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
          }
          
          .overflow-auto::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
          }
          
          .btn.p-0:hover {
            background-color: rgba(255, 255, 255, 0.3) !important;
          }
          
          .shadow-lg {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
          }
          
          .rounded {
            border-radius: 15px !important;
          }
        `}
      </style>
    </div>
  );
};

export default ServicesPage;