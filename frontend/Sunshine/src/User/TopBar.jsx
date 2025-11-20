import React from 'react';
import { Container } from 'react-bootstrap';

const TopBar = () => {
    return (
        <div className="topbar">
            <Container fluid className="px-4">
                <div className="topbar-content">
                    {/* Left - Location and Email */}
                    <div className="topbar-info">
                        <span className="info-item">
                            <i className="fas fa-map-marker-alt"></i>
                            Solitaire building, First & Second floor, Keshavrao More Marg, Collage Road, Nashik-422005
                        </span>
                        <span className="info-item">
                            <i className="fas fa-envelope"></i>
                            info@sunshinemindcare.com
                        </span>
                    </div>

                    {/* Right - Social Links */}
                    <div className="topbar-social">
                        <a href="https://www.facebook.com/people/Sunshine-Counselling-and-Therapy-Centre/100064207141730/?mibextid=ZbWKwL%20" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/sunshine-counselling-and-therapy-centre/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.instagram.com/sunshinenashik?igshid=NzZlODBkYWE4Ng%3D%3D" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </Container>

            <style jsx>{`
                .topbar {
                    background: linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%);
                    padding: 12px 0;
                    position: sticky;
                    top: 0;
                    z-index: 1001;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .topbar-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 2rem;
                }

                .topbar-info {
                    display: flex;
                    gap: 2rem;
                    flex: 1;
                    align-items: center;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #ffffff;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .info-item i {
                    font-size: 1rem;
                }

                .topbar-social {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .social-link {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    color: #ffffff;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .social-link:hover {
                    background: rgba(255, 255, 255, 0.35);
                    transform: translateY(-3px);
                    border-color: rgba(255, 255, 255, 0.6);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .social-link i {
                    font-size: 0.85rem;
                }

                /* Mobile Responsive */
                @media (max-width: 992px) {
                    .topbar-content {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .topbar-info {
                        flex-direction: column;
                        gap: 0.8rem;
                        width: 100%;
                    }

                    .info-item {
                        font-size: 0.85rem;
                        justify-content: center;
                        text-align: center;
                    }

                    .topbar-social {
                        justify-content: center;
                        gap: 1.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .topbar {
                        padding: 10px 0;
                    }

                    .info-item {
                        font-size: 0.8rem;
                    }

                    .topbar-content {
                        gap: 0.5rem;
                    }

                    .topbar-info {
                        gap: 0.5rem;
                    }

                    .topbar-social {
                        gap: 1rem;
                    }

                    .social-link {
                        width: 28px;
                        height: 28px;
                    }

                    .social-link i {
                        font-size: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default TopBar;
