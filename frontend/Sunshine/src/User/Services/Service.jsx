

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
