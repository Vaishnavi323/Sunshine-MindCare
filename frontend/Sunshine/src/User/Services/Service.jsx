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
  // API Configuration
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  
  // State Management
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [apiCalls, setApiCalls] = useState([]);

  // ==================== API INTEGRATION ====================

  // Fetch ALL Services by calling /service/list for each ID
  const fetchAllServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching services from API:', API_BASE_URL);
      
      // Define service IDs to fetch (you can modify this array)
      const serviceIds = [1, 2, 3, 4, 5, 6];
      const apiLogs = [];
      const fetchedServices = [];
      
      // Fetch each service individually
      for (const id of serviceIds) {
        try {
          const apiUrl = `${API_BASE_URL}/service/list?id=${id}`;
          apiLogs.push(`Fetching: ${apiUrl}`);
          
          const response = await axios.get(apiUrl, { timeout: 10000 });
          
          if (response.data.status && response.data.error) {
            const serviceData = response.data.error;
            
            // Ensure sub_services is always an array
            const serviceWithSubservices = {
              id: serviceData.id,
              title: serviceData.title,
              description: serviceData.description,
              image: serviceData.image,
              created_at: serviceData.created_at,
              sub_services: Array.isArray(serviceData.sub_services) 
                ? serviceData.sub_services 
                : []
            };
            
            fetchedServices.push(serviceWithSubservices);
            apiLogs.push(`✓ Service ${id}: ${serviceData.title} (${serviceData.sub_services?.length || 0} subservices)`);
          } else {
            apiLogs.push(`✗ Service ${id}: ${response.data.message || 'No data'}`);
          }
        } catch (err) {
          apiLogs.push(`✗ Service ${id} Error: ${err.message}`);
          console.error(`Error fetching service ${id}:`, err);
        }
      }
      
      setApiCalls(apiLogs);
      
      if (fetchedServices.length > 0) {
        setServices(fetchedServices);
        console.log('Fetched services:', fetchedServices);
      } else {
        // Fallback to sample data
        setServices(getSampleServicesWithSubservices());
        setError('No services found from API, using sample data');
      }
      
    } catch (err) {
      console.error('Error in fetchAllServices:', err);
      setError(err.message);
      // Fallback to sample data
      setServices(getSampleServicesWithSubservices());
    } finally {
      setLoading(false);
    }
  };

  // Handle card click - No API call needed as subservices are already loaded
  const handleCardClick = (serviceId) => {
    // If card is already flipped, flip it back
    if (flippedCards[serviceId]) {
      setFlippedCards(prev => ({ ...prev, [serviceId]: false }));
      setActiveServiceId(null);
    } else {
      // Flip this card and unflip others
      const newFlippedState = {};
      newFlippedState[serviceId] = true;
      setFlippedCards(newFlippedState);
      setActiveServiceId(serviceId);
    }
  };

  const handleBackClick = (serviceId, e) => {
    e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [serviceId]: false }));
    setActiveServiceId(null);
  };

  // ==================== SAMPLE DATA ====================

  const getSampleServicesWithSubservices = () => [
    {
      id: "1",
      title: "General Medicine",
      description: "Comprehensive medical care for adults and children, including diagnosis and treatment of various health conditions.",
      image: null,
      created_at: "2025-11-17 09:55:07",
      sub_services: [
        {
          id: "1",
          service_id: "1",
          title: "General Check-up",
          description: "Complete physical examination and health assessment",
          price: "₹500",
          duration: "30 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "2",
          service_id: "1",
          title: "Chronic Disease Management",
          description: "Management of diabetes, hypertension, and other chronic conditions",
          price: "₹800",
          duration: "45 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "3",
          service_id: "1",
          title: "Vaccinations",
          description: "Immunization for all age groups including travel vaccines",
          price: "₹300-1500",
          duration: "15-30 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        }
      ]
    },
    {
      id: "2",
      title: "Cardiology",
      description: "Specialized care for heart-related conditions including diagnosis, treatment, and preventive cardiology.",
      image: null,
      created_at: "2025-11-17 09:55:07",
      sub_services: [
        {
          id: "4",
          service_id: "2",
          title: "ECG Test",
          description: "Electrocardiogram to check heart's electrical activity",
          price: "₹800",
          duration: "20 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "5",
          service_id: "2",
          title: "Echocardiography",
          description: "Ultrasound imaging of the heart",
          price: "₹2500",
          duration: "45 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "6",
          service_id: "2",
          title: "Stress Test",
          description: "Cardiac stress testing on treadmill",
          price: "₹1500",
          duration: "60 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        }
      ]
    },
    {
      id: "3",
      title: "Pediatrics",
      description: "Healthcare for infants, children, and adolescents, including regular check-ups and specialized care.",
      image: null,
      created_at: "2025-11-17 09:55:07",
      sub_services: [
        {
          id: "7",
          service_id: "3",
          title: "Newborn Care",
          description: "Comprehensive care for newborns including vaccination",
          price: "₹600",
          duration: "40 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "8",
          service_id: "3",
          title: "Childhood Vaccinations",
          description: "Complete immunization schedule for children",
          price: "₹400",
          duration: "20 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        },
        {
          id: "9",
          service_id: "3",
          title: "Growth Monitoring",
          description: "Regular growth and development checks",
          price: "₹500",
          duration: "30 mins",
          image: null,
          status: "1",
          created_at: "2025-11-17 10:23:02"
        }
      ]
    }
  ];

  // ==================== USE EFFECT ====================

  useEffect(() => {
    fetchAllServices();
  }, []);

  // ==================== STYLES ====================

  const styles = {
    pageBackground: {
      background: 'linear-gradient(135deg, #2a5298, #1e3c72)',
      minHeight: '100vh'
    },
    cardFront: {
      background: 'linear-gradient(135deg, #2a5298, #1e3c72)'
    },
    cardBack: {
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)'
    }
  };

  // ==================== RENDER LOADING ====================

  if (loading) {
    return (
      <div style={styles.pageBackground} className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="text-center text-white">
          <div className="spinner-border spinner-border-lg mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Healthcare Services</h4>
          <p className="mt-2">Fetching data from API...</p>
          <div className="mt-3">
            <small className="text-white-50">API: {API_BASE_URL}/service/list?id=[1,2,3...]</small>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================

  return (
    <div style={styles.pageBackground} className="py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-white mb-3 display-4 fw-bold">
            <i className="bi bi-heart-pulse me-3"></i>
            Sunshine MindCare Services
          </h1>
          <p className="text-white lead fs-5" style={{ opacity: 0.9 }}>
            Click on any service card to view available subservices
          </p>
          
          {/* API Status */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-8">
              <div className="alert alert-light shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-database me-2"></i>
                    <strong>API Status:</strong> 
                    <span className="ms-2">
                      {error ? 'Using sample data' : `Loaded ${services.length} services`}
                    </span>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={fetchAllServices}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Refresh
                  </button>
                </div>
                {error && (
                  <div className="mt-2 text-danger small">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              {/* Flip Card Container */}
              <div 
                className="flip-card"
                onClick={() => handleCardClick(service.id)}
              >
                <div 
                  className={`flip-card-inner ${flippedCards[service.id] ? 'flipped' : ''}`}
                  style={{ height: '380px' }}
                >
                  {/* Front of Card */}
                  <div className="flip-card-front rounded-4 shadow-lg border-0">
                    <div 
                      className="h-100 p-4 d-flex flex-column justify-content-between text-white rounded-4"
                      style={styles.cardFront}
                    >
                      <div>
                        {/* Service Icon */}
                        <div className="mb-4">
                          <div className="bg-white/20 rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                            <i className="bi bi-heart-pulse fs-2"></i>
                          </div>
                        </div>
                        
                        {/* Service Title */}
                        <h3 className="fw-bold mb-3">{service.title}</h3>
                        
                        {/* Service Description */}
                        <p className="mb-0 opacity-90" style={{ fontSize: '0.95rem' }}>
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Subservices Count & CTA */}
                      <div className="mt-4 pt-3 border-top border-white/20">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="badge bg-white/20 rounded-pill px-3 py-2">
                              <i className="bi bi-layers me-2"></i>
                              {service.sub_services.length} Subservices
                            </div>
                          </div>
                          <div className="arrow-icon">
                            <i className="bi bi-chevron-right fs-4"></i>
                          </div>
                        </div>
                        <div className="mt-2">
                          <small className="opacity-75">
                            <i className="bi bi-mouse me-1"></i>
                            Click to view details
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card - Subservices */}
                  <div className="flip-card-back rounded-4 shadow-lg border-0">
                    <div 
                      className="h-100 p-4 d-flex flex-column text-white rounded-4"
                      style={styles.cardBack}
                    >
                      {/* Back Header */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h4 className="fw-bold mb-1">Subservices</h4>
                          <small className="opacity-75">
                            <i className="bi bi-heart me-1"></i>
                            {service.title}
                          </small>
                        </div>
                        <button 
                          className="btn btn-light btn-sm rounded-circle"
                          style={{ width: '36px', height: '36px' }}
                          onClick={(e) => handleBackClick(service.id, e)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>

                      {/* Subservices List */}
                      <div className="flex-grow-1 overflow-auto">
                        {service.sub_services.length > 0 ? (
                          <div className="row g-3">
                            {service.sub_services.map((subService, index) => (
                              <div key={subService.id || index} className="col-12">
                                <div className="subservice-card p-3 rounded-3">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center mb-2">
                                        <div className="bg-white/10 rounded-circle d-flex align-items-center justify-content-center me-2"
                                             style={{ width: '24px', height: '24px' }}>
                                          <i className="bi bi-check-lg small"></i>
                                        </div>
                                        <h6 className="fw-semibold mb-0">{subService.title}</h6>
                                      </div>
                                      <p className="small mb-2 opacity-75">{subService.description}</p>
                                      
                                      {/* Price and Duration */}
                                      <div className="d-flex gap-3 mt-2">
                                        {subService.price && (
                                          <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25">
                                            <i className="bi bi-currency-rupee me-1"></i>
                                            {subService.price}
                                          </span>
                                        )}
                                        {subService.duration && (
                                          <span className="badge bg-info bg-opacity-25 text-info border border-info border-opacity-25">
                                            <i className="bi bi-clock me-1"></i>
                                            {subService.duration}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                            <i className="bi bi-inboxes fs-1 opacity-50 mb-3"></i>
                            <p className="text-center opacity-75">No subservices available</p>
                            <small className="opacity-50">Check back later for updates</small>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="mt-3 pt-3 border-top border-white/20">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="opacity-75">
                            Total: {service.sub_services.length} subservices
                          </small>
                          <small className="opacity-50">
                            <i className="bi bi-info-circle me-1"></i>
                            Click outside to return
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && !loading && (
          <div className="text-center py-5">
            <div className="alert alert-light shadow-lg max-w-600 mx-auto">
              <i className="bi bi-clipboard-x fs-1 text-muted mb-3"></i>
              <h4>No Services Found</h4>
              <p>No healthcare services are currently available.</p>
              <button className="btn btn-primary mt-2" onClick={fetchAllServices}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* API Debug Panel (Collapsible) */}
        {apiCalls.length > 0 && (
          <div className="mt-5">
            <div className="accordion" id="apiDebugAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed bg-light" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#apiDebug"
                  >
                    <i className="bi bi-terminal me-2"></i>
                    API Call Logs ({apiCalls.length} calls)
                  </button>
                </h2>
                <div id="apiDebug" className="accordion-collapse collapse">
                  <div className="accordion-body bg-dark text-light">
                    <pre className="mb-0 small" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {apiCalls.map((log, index) => (
                        <div key={index} className="font-monospace">
                          [{index + 1}] {log}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-5 text-center">
          <p className="text-white opacity-75 mb-2">
            <i className="bi bi-lightning-charge-fill me-2"></i>
            Powered by Sunshine MindCare Healthcare System
          </p>
          <small className="text-white opacity-50">
            Data fetched from: {API_BASE_URL}/service/list | 
            Real-time updates | 
            v1.0.0
          </small>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          /* Flip Card Styles */
          .flip-card {
            perspective: 1000px;
            cursor: pointer;
          }
          
          .flip-card-inner {
            position: relative;
            width: 100%;
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
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          .flip-card-back {
            transform: rotateY(180deg);
          }
          
          /* Card Styles */
          .rounded-4 {
            border-radius: 1rem !important;
          }
          
          .shadow-lg {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
          }
          
          /* Subservice Card */
          .subservice-card {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .subservice-card:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
          }
          
          /* Scrollbar */
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
          
          /* Arrow Icon Animation */
          .arrow-icon {
            transition: transform 0.3s ease;
          }
          
          .flip-card:hover .arrow-icon {
            transform: translateX(5px);
          }
          
          /* Badge Styles */
          .badge {
            font-weight: 500;
          }
          
          /* Hover effect for cards */
          .flip-card:not(.flipped):hover .flip-card-front {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3) !important;
          }
        `}
      </style>
    </div>
  );
};

export default ServicesPage;