import React from 'react';
import w1 from '../../assets/w1.jpg';
import w2 from '../../assets/w2.jpg';
import w3 from '../../assets/w3.jpg';

const MentalHealthSection = () => {
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .service-card {
          position: relative;
          height: 300px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 30px;
        }

        .play-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: rgba(255, 152, 0, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .play-button:hover {
          background: #ff9800;
          transform: scale(1.1);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-left: 12px solid white;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          margin-left: 3px;
        }

        .service-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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

          .card-image {
            height: 300px;
          }

          .service-card {
            height: 250px;
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
                        <h3 className="card-title">Whats Are The Signs?</h3>
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

                {/* Wellness Section */}
                <div className="wellness-section">
                    <h2 className="wellness-title">Your Wellness, Our Priority</h2>
                    <p className="wellness-subtitle">
                        At Sunshine Counselling and Therapy Center, we prioritize your well-being with
                        a range of specialized services crafted to guide you on your path to a
                        healthier, more fulfilled life.
                    </p>

                    <div className="services-grid">
                        <div className="service-card">
                            <img
                                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop"
                                alt="Assessments"
                                className="service-image"
                            />
                            <div className="service-overlay">
                                <div className="play-button">
                                    <div className="play-icon"></div>
                                </div>
                                <h3 className="service-title">ASSESSMENTS</h3>
                            </div>
                        </div>

                        <div className="service-card">
                            <img
                                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop"
                                alt="Psychological Therapies"
                                className="service-image"
                            />
                            <div className="service-overlay">
                                <div className="play-button">
                                    <div className="play-icon"></div>
                                </div>
                                <h3 className="service-title">PSYCHOLOGICAL<br />THERAPIES</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MentalHealthSection;