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
    const [apiStatus, setApiStatus] = useState('');

    // ==================== API INTEGRATION ====================

    // Fetch ALL Services from /service/list endpoint
    const fetchAllServices = async () => {
        try {
            setLoading(true);
            setError(null);
            setApiStatus('Fetching services...');

            console.log('Fetching from:', `${API_BASE_URL}/service/list`);

            const response = await axios.get(`${API_BASE_URL}/service/list`, {
                timeout: 10000,
                params: { id: 'all' } // Adjust based on your API
            });

            console.log('API Response:', response.data);

            if (response.data.status) {
                // Extract services from error field (based on your API structure)
                const servicesArray = Array.isArray(response.data.error)
                    ? response.data.error
                    : [response.data.error];

                console.log('Parsed services:', servicesArray);

                if (servicesArray.length > 0) {
                    // Map the data to ensure proper structure
                    const formattedServices = servicesArray.map(service => ({
                        id: service.id || '',
                        title: service.title || 'Untitled Service',
                        description: service.description || 'No description available',
                        image: service.image || null,
                        status: service.status || '1',
                        created_at: service.created_at || '',
                        updated_at: service.updated_at || null,
                        sub_services: Array.isArray(service.sub_services)
                            ? service.sub_services.map(sub => ({
                                id: sub.id || '',
                                service_id: sub.service_id || '',
                                title: sub.title || 'Untitled Subservice',
                                description: sub.description || 'No description',
                                price: sub.price || null,
                                duration: sub.duration || null,
                                image: sub.image || null,
                                status: sub.status || '1',
                                created_at: sub.created_at || '',
                                updated_at: sub.updated_at || null
                            }))
                            : []
                    }));

                    setServices(formattedServices);
                    setApiStatus(`Loaded ${formattedServices.length} service(s) with subservices`);
                } else {
                    setError('No services found in response');
                    setServices(getSampleServices());
                }
            } else {
                throw new Error(response.data.message || 'API returned false status');
            }

        } catch (err) {
            console.error('Error fetching services:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Network error';
            setError(`API Error: ${errorMessage}`);
            setApiStatus('Failed to fetch. Using sample data.');
            setServices(getSampleServices());
        } finally {
            setLoading(false);
        }
    };

    // Handle card click
    const handleCardClick = (serviceId) => {
        if (flippedCards[serviceId]) {
            setFlippedCards(prev => ({ ...prev, [serviceId]: false }));
            setActiveServiceId(null);
        } else {
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

    // ==================== SAMPLE DATA (Fallback) ====================

    const getSampleServices = () => [
        {
            id: "18",
            title: "Assessment",
            description: "One of the best Services",
            image: "https://hpclsparesportal.in/Sunshine_Mindcare_Backend/uploads/services/PAN.jpeg",
            status: "1",
            created_at: "2025-12-16 05:45:18",
            updated_at: null,
            sub_services: [
                {
                    id: "9",
                    service_id: "18",
                    title: "Blood Test",
                    description: "Able to test blood reports",
                    price: null,
                    duration: null,
                    image: null,
                    status: "1",
                    created_at: "2025-12-16 05:46:23",
                    updated_at: null
                }
            ]
        },
        {
            id: "2",
            title: "Cardiology",
            description: "Heart care and cardiovascular treatments",
            image: null,
            status: "1",
            created_at: "2025-11-17 09:55:07",
            updated_at: null,
            sub_services: [
                {
                    id: "3",
                    service_id: "2",
                    title: "ECG Test",
                    description: "Electrocardiogram testing",
                    price: "₹1200",
                    duration: "30 mins",
                    image: null,
                    status: "1",
                    created_at: "2025-11-17 10:23:02",
                    updated_at: null
                }
            ]
        }
    ];

    // ==================== USE EFFECT ====================

    useEffect(() => {
        fetchAllServices();
    }, []);

    // ==================== STYLES ====================

    const themeColors = {
        primary: '#2a5298',
        secondary: '#1e3c72',
        light: '#4a7cd8',
        gradient: 'linear-gradient(135deg, #2a5298, #1e3c72)',
        gradientReverse: 'linear-gradient(135deg, #1e3c72, #2a5298)'
    };

    const styles = {
        pageBackground: {
            background: themeColors.gradient,
            minHeight: '100vh'
        },
        cardFront: {
            background: themeColors.gradient
        },
        cardBack: {
            background: themeColors.gradientReverse
        }
    };

    // ==================== RENDER LOADING ====================

    if (loading) {
        return (
            <div style={styles.pageBackground} className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="text-center text-white">
                    <div className="spinner-border spinner-border-lg mb-3" style={{ color: 'white' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mb-2">Loading Healthcare Services</h4>
                    <p className="mb-0 opacity-75">Fetching from API...</p>
                    <small className="d-block mt-2 text-white-50">{API_BASE_URL}/service/list</small>
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
                    <div className="mb-4">
                        <div className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3 shadow">
                            <i className="bi bi-heart-pulse fs-1" style={{ color: themeColors.primary }}></i>
                        </div>
                        <h1 className="text-white display-5 fw-bold mb-3">
                            Sunshine MindCare Services
                        </h1>
                        <p className="text-white fs-5 opacity-90 mb-0">
                            Professional healthcare services with comprehensive subservices
                        </p>
                    </div>

                    {/* API Status */}
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="alert bg-white bg-opacity-10 border-0 text-white shadow">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-database fs-4 me-3"></i>
                                            <div>
                                                <h6 className="mb-0 fw-bold">API Status</h6>
                                                <p className="mb-0 small opacity-90">
                                                    {apiStatus}
                                                    {error && <span className="ms-2 text-warning">({error})</span>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-md-end mt-2 mt-md-0">
                                        <button
                                            className="btn btn-light btn-sm"
                                            onClick={fetchAllServices}
                                            disabled={loading}
                                        >
                                            <i className="bi bi-arrow-clockwise me-1"></i>
                                            {loading ? 'Refreshing...' : 'Refresh Data'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="row g-4">
                    {services.map((service) => (
                        <div key={service.id} className="col-md-6 col-lg-4">
                            <div className="service-card-wrapper">
                                <div
                                    className={`flip-card ${flippedCards[service.id] ? 'flipped' : ''}`}
                                    onClick={() => handleCardClick(service.id)}
                                >
                                    <div className="flip-card-inner">
                                        {/* Front Card */}
                                        <div className="flip-card-front">
                                            <div className="card-front-content h-100">
                                                {/* Service Image */}
                                                {service.image && (
                                                    <div className="service-image-container">
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            className="service-image"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextElementSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="service-image-fallback d-none align-items-center justify-content-center">
                                                            <i className="bi bi-heart-pulse fs-1 text-white"></i>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="p-4">
                                                    {/* Service Title */}
                                                    <h3 className="card-title fw-bold mb-3 text-white">
                                                        {service.title}
                                                    </h3>

                                                    {/* Service Description */}
                                                    <p className="card-description text-white opacity-90 mb-4">
                                                        {service.description.length > 100
                                                            ? `${service.description.substring(0, 100)}...`
                                                            : service.description}
                                                    </p>

                                                    {/* Subservices Count */}
                                                    <div className="subservices-count">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <span className="badge bg-white bg-opacity-20 text-white px-3 py-2 rounded-pill">
                                                                    <i className="bi bi-layers me-2"></i>
                                                                    {service.sub_services.length} Subservices
                                                                </span>
                                                            </div>
                                                            <div className="flip-indicator">
                                                                <i className="bi bi-chevron-right text-white fs-5"></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Click Hint */}
                                                    <div className="mt-3 pt-3 border-top border-white border-opacity-20">
                                                        <small className="text-white opacity-75">
                                                            <i className="bi bi-mouse me-1"></i>
                                                            Click to view subservices
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Back Card - Subservices */}
                                        <div className="flip-card-back">
                                            <div className="card-back-content h-100">
                                                <div className="p-4 h-100 d-flex flex-column">
                                                    {/* Back Header */}
                                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                                        <div>
                                                            <h4 className="fw-bold text-white mb-1">
                                                                <i className="bi bi-list-task me-2"></i>
                                                                Subservices
                                                            </h4>
                                                            <p className="text-white opacity-75 mb-0 small">
                                                                {service.title}
                                                            </p>
                                                        </div>
                                                        <button
                                                            className="btn btn-sm btn-light rounded-circle"
                                                            style={{ width: '36px', height: '36px' }}
                                                            onClick={(e) => handleBackClick(service.id, e)}
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </div>

                                                    {/* Subservices List */}
                                                    <div className="subservices-list flex-grow-1 overflow-auto">
                                                        {service.sub_services.length > 0 ? (
                                                            <div className="row g-3">
                                                                {service.sub_services.map((subService, index) => (
                                                                    <div key={subService.id || index} className="col-12">
                                                                        <div className="subservice-item p-3 rounded">
                                                                            <div className="d-flex">
                                                                                <div className="subservice-icon me-3">
                                                                                    <div className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                                                                        style={{ width: '40px', height: '40px' }}>
                                                                                        <i className="bi bi-clipboard-check text-white"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow-1">
                                                                                    <h6 className="fw-semibold text-white mb-1">
                                                                                        {subService.title}
                                                                                    </h6>
                                                                                    <p className="text-white opacity-75 mb-2 small">
                                                                                        {subService.description || 'No description available'}
                                                                                    </p>

                                                                                    {/* Price and Duration */}
                                                                                    <div className="d-flex flex-wrap gap-2">
                                                                                        {subService.price && (
                                                                                            <span className="badge bg-success bg-opacity-25 text-success border-0 px-3 py-1">
                                                                                                <i className="bi bi-currency-rupee me-1"></i>
                                                                                                {subService.price}
                                                                                            </span>
                                                                                        )}
                                                                                        {subService.duration && (
                                                                                            <span className="badge bg-info bg-opacity-25 text-info border-0 px-3 py-1">
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
                                                                <i className="bi bi-inbox fs-1 text-white opacity-50 mb-3"></i>
                                                                <p className="text-white opacity-75 mb-1">No subservices available</p>
                                                                <small className="text-white opacity-50">Check back later for updates</small>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Back Footer */}
                                                    <div className="mt-4 pt-3 border-top border-white border-opacity-20">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <small className="text-white opacity-75">
                                                                <i className="bi bi-info-circle me-1"></i>
                                                                Total: {service.sub_services.length} subservice(s)
                                                            </small>
                                                            <small className="text-white opacity-50">
                                                                Click back button to return
                                                            </small>
                                                        </div>
                                                    </div>
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
                        <div className="card bg-white bg-opacity-10 border-0 text-white shadow-lg max-w-500 mx-auto p-5">
                            <i className="bi bi-clipboard-x fs-1 mb-3 opacity-50"></i>
                            <h4 className="mb-3">No Services Available</h4>
                            <p className="opacity-75 mb-4">
                                There are currently no healthcare services available.
                                Please check back later or contact support.
                            </p>
                            <button className="btn btn-light px-4" onClick={fetchAllServices}>
                                <i className="bi bi-arrow-clockwise me-2"></i>
                                Try Loading Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Service Count Summary */}
                {services.length > 0 && (
                    <div className="mt-5 pt-4">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="bg-white bg-opacity-10 rounded p-3 text-center text-white">
                                    <h2 className="fw-bold mb-0">{services.length}</h2>
                                    <p className="mb-0 opacity-75">Total Services</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-white bg-opacity-10 rounded p-3 text-center text-white">
                                    <h2 className="fw-bold mb-0">
                                        {services.reduce((total, service) => total + service.sub_services.length, 0)}
                                    </h2>
                                    <p className="mb-0 opacity-75">Total Subservices</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-white bg-opacity-10 rounded p-3 text-center text-white">
                                    <h2 className="fw-bold mb-0">
                                        {services.filter(s => s.image).length}
                                    </h2>
                                    <p className="mb-0 opacity-75">Services with Images</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-5 pt-5 text-center">
                    <div className="bg-white bg-opacity-10 rounded p-4">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-md-start mb-3 mb-md-0">
                                <h6 className="text-white fw-bold mb-2">
                                    <i className="bi bi-heart-pulse me-2"></i>
                                    Sunshine MindCare
                                </h6>
                                <p className="text-white opacity-75 small mb-0">
                                    Professional healthcare services for your wellness
                                </p>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <p className="text-white opacity-75 small mb-0">
                                    <i className="bi bi-lightning me-1"></i>
                                    API Endpoint: {API_BASE_URL}/service/list
                                </p>
                                <p className="text-white opacity-50 small mb-0">
                                    Last updated: {new Date().toLocaleDateString('en-IN')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style>
                {`
          /* Theme Variables */
          :root {
            --primary-color: ${themeColors.primary};
            --secondary-color: ${themeColors.secondary};
            --light-color: ${themeColors.light};
          }
          
          /* Flip Card Styles */
          .flip-card {
            perspective: 1000px;
            height: 420px;
            cursor: pointer;
          }
          
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            border-radius: 16px;
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
            border-radius: 16px;
            overflow: hidden;
          }
          
          .flip-card-back {
            transform: rotateY(180deg);
          }
          
          /* Card Content */
          .card-front-content {
            background: ${themeColors.gradient};
            display: flex;
            flex-direction: column;
          }
          
          .card-back-content {
            background: ${themeColors.gradientReverse};
            display: flex;
            flex-direction: column;
          }
          
          /* Service Image */
          .service-image-container {
            height: 180px;
            overflow: hidden;
            position: relative;
          }
          
          .service-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .service-image-fallback {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(42, 82, 152, 0.7);
          }
          
          .flip-card:hover .service-image {
            transform: scale(1.05);
          }
          
          /* Card Title */
          .card-title {
            font-size: 1.4rem;
            line-height: 1.3;
          }
          
          /* Card Description */
          .card-description {
            font-size: 0.95rem;
            line-height: 1.5;
          }
          
          /* Subservices Count */
          .subservices-count .badge {
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          /* Flip Indicator */
          .flip-indicator {
            transition: transform 0.3s ease;
          }
          
          .flip-card:hover .flip-indicator {
            transform: translateX(5px);
          }
          
          /* Subservice Items */
          .subservice-item {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
          }
          
          .subservice-item:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .subservice-icon {
            flex-shrink: 0;
          }
          
          /* Scrollbar Styling */
          .subservices-list::-webkit-scrollbar {
            width: 5px;
          }
          
          .subservices-list::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          
          .subservices-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
          }
          
          .subservices-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          
          /* Badge Styles */
          .badge {
            font-weight: 500;
            font-size: 0.75rem;
          }
          
          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .flip-card {
              height: 380px;
            }
            
            .service-image-container {
              height: 150px;
            }
            
            .card-title {
              font-size: 1.2rem;
            }
          }
          
          /* Hover Effects */
          .service-card-wrapper:hover .flip-card:not(.flipped) .flip-card-front {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
            transform: translateY(-5px);
          }
          
          /* Utility Classes */
          .max-w-500 {
            max-width: 500px;
          }
          
          .text-shadow {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
        `}
            </style>
        </div>
    );
};

export default ServicesPage;