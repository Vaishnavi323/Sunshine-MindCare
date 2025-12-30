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

import React, { useEffect, useState } from 'react';
import './services.css';

const ServicesPage = () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [flippedCard, setFlippedCard] = useState(null);

    /* =========================
       FETCH SERVICES FROM API
    ========================= */
    useEffect(() => {
    fetch(`${BASE_URL}/service/list`)
        .then(res => res.json())
        .then(result => {
            if (result.status) {
                const formatted = result.error.map(service => ({
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    image: service.image || 'https://via.placeholder.com/500',
                    color: '#1e3c72',
                    subservices: service.sub_services.map(sub => ({
                        name: sub.title,
                        description: sub.description,
                        duration: sub.duration || 'N/A'
                    }))
                }));

                setServices(formatted);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setError('Server error');
            setLoading(false);
        });
}, []);


    const handleCardClick = (id) => {
        setFlippedCard(flippedCard === id ? null : id);
    };

    const handleViewSubservices = (service) => {
        setSelectedService(service);
        setShowModal(true);
        setFlippedCard(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    /* =========================
       LOADING & ERROR STATES
    ========================= */
    if (loading) return <div className="text-center py-5">Loading services...</div>;
    if (error) return <div className="text-center text-danger py-5">{error}</div>;

    return (
        <div className="healthcare-services">

            {/* HEADER */}
            <header className="services-header py-5 text-center">
                <h1 className="fw-bold">Our Healthcare Services</h1>
                <p className="lead">Click any service to explore subservices</p>
            </header>

            {/* SERVICES */}
            <section className="services-section py-5">
                <div className="container">
                    <div className="row g-4">
                        {services.map(service => (
                            <div className="col-md-6 col-lg-4" key={service.id}>
                                <div
                                    className={`card-flip ${flippedCard === service.id ? 'flipped' : ''}`}
                                    onClick={() => handleCardClick(service.id)}
                                >
                                    {/* FRONT */}
                                    <div className="card-front">
                                        <div className="card h-100 shadow-sm">
                                            <div
                                                className="card-img-top service-image"
                                                style={{ backgroundImage: `url(${service.image})` }}
                                            />
                                            <div className="card-body text-center">
                                                <h4>{service.title}</h4>
                                                <p>{service.description}</p>
                                                <span className="badge bg-primary">
                                                    {service.subservices.length} Subservices
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BACK */}
                                    <div className="card-back">
                                        <div className="card h-100 text-white" style={{ backgroundColor: service.color }}>
                                            <div className="card-body text-center">
                                                <h4>{service.title}</h4>

                                                {service.subservices.length === 0 ? (
                                                    <p>No subservices available</p>
                                                ) : (
                                                    <ul className="list-unstyled">
                                                        {service.subservices.slice(0, 3).map((sub, i) => (
                                                            <li key={i} className="badge bg-light text-dark m-1">
                                                                {sub.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                <button
                                                    className="btn btn-light mt-3"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewSubservices(service);
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MODAL */}
            {showModal && selectedService && (
                <>
                    <div className="modal fade show d-block">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5>{selectedService.title}</h5>
                                    <button className="btn-close" onClick={handleCloseModal}></button>
                                </div>

                                <div className="modal-body">
                                    {selectedService.subservices.length === 0 ? (
                                        <p>No subservices available</p>
                                    ) : (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedService.subservices.map((sub, i) => (
                                                    <tr key={i}>
                                                        <td>{sub.name}</td>
                                                        <td>{sub.duration || 'N/A'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
                </>
            )}
        </div>
    );
};

export default ServicesPage;
