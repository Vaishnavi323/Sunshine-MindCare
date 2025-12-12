import React from 'react';
import a1 from '../../assets/a1.jpg'
import a2 from '../../assets/a2.jpg'
import { Link } from 'react-router-dom';

const OurCenter = () => {
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

        /* Keyframe Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          }
          50% {
            box-shadow: 0 15px 50px rgba(30, 136, 229, 0.25);
          }
        }

        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .about-container {
          background: #f8f9fa;
          padding: 80px 20px;
          animation: fadeInUp 0.8s ease-out;
        }

        .about-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 60px;
          align-items: center;
        }

        .images-section {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .circular-image-container {
          position: relative;
          width: 450px;
          height: 450px;
          animation: pulse 3s ease-in-out infinite;
        }

        .circular-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 8px solid white;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          animation: glow 3s ease-in-out infinite;
        }

        .small-circular-container {
          position: absolute;
          width: 200px;
          height: 200px;
          top: -30px;
          left: -30px;
          z-index: 2;
          animation: pulse 3s ease-in-out infinite 0.5s;
        }

        .small-circular-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 6px solid white;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        }

        .content-section {
          padding: 20px 40px;
          animation: slideInRight 0.8s ease-out 0.2s both;
        }

        .about-title {
          font-size: 5rem;
          font-weight: 700;
          color: #1e88e5;
          margin-bottom: 30px;
          line-height: 1.2;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .section-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 40px;
          text-align: justify;
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 40px;
        }

        .feature-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          animation: fadeInUp 0.8s ease-out both;
          padding: 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .feature-item:nth-child(1) { animation-delay: 0.5s; }
        .feature-item:nth-child(2) { animation-delay: 0.6s; }
        .feature-item:nth-child(3) { animation-delay: 0.7s; }
        .feature-item:nth-child(4) { animation-delay: 0.8s; }

        .feature-item:hover {
          background: rgba(30, 136, 229, 0.1);
          transform: translateX(8px);
        }

        .check-icon {
          width: 28px;
          height: 28px;
          background: #ffa726;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 3px;
          transition: all 0.3s ease;
        }

        .feature-item:hover .check-icon {
          transform: scale(1.2) rotate(360deg);
          background: #ff6b35;
        }

        .check-icon svg {
          width: 16px;
          height: 16px;
          fill: white;
        }

        .feature-text {
          font-size: 1rem;
          color: #1e88e5;
          font-weight: 600;
          line-height: 1.5;
        }

        .contact-section {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-top: 40px;
          animation: fadeInUp 0.8s ease-out 0.9s both;
        }

        .contact-button {
          background: #ffa726;
          color: white;
          border: none;
          padding: 16px 40px;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          animation: floatY 3s ease-in-out infinite;
        }

        .contact-button:hover {
          background: #ff9800;
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(255, 167, 38, 0.5);
          animation: none;
        }

        .contact-button:active {
          transform: translateY(-1px);
        }

        .phone-info {
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.8s ease-out 1s both;
        }

        .phone-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e88e5;
          margin-bottom: 5px;
          transition: all 0.3s ease;
        }

        .phone-info:hover .phone-number {
          color: #ffa726;
          transform: scale(1.05);
        }

        .business-name {
          font-size: 0.95rem;
          color: #ffa726;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .about-wrapper {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .circular-image-container {
            width: 400px;
            height: 400px;
          }

          .small-circular-container {
            width: 180px;
            height: 180px;
          }

          .about-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .circular-image-container {
            width: 320px;
            height: 320px;
          }

          .small-circular-container {
            width: 150px;
            height: 150px;
          }

          .about-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .contact-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 25px;
          }

          .phone-number {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .about-container {
            padding: 50px 15px;
          }

          .circular-image-container {
            width: 280px;
            height: 280px;
          }

          .small-circular-container {
            width: 130px;
            height: 130px;
            top: -20px;
            left: -20px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .section-description {
            font-size: 0.95rem;
          }

          .contact-button {
            width: 100%;
            text-align: center;
            animation: floatY 3s ease-in-out infinite;
          }
        }
      `}</style>

            <div className="about-container">
                <div className="about-wrapper">
                    {/* Images Section */}
                    <div className="images-section">
                        <div className="circular-image-container">
                            <img
                                src={a1}
                                alt="Counseling Session"
                                className="circular-image"
                            />
                            <div className="small-circular-container">
                                <img
                                    src={a2}
                                    alt="Team Meeting"
                                    className="small-circular-image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="content-section">
                        <h2 className="section-title">About Our Centre</h2>

                        <p className="section-description">
                            Welcome to Sunshine Counseling and Therapy Centre, a leading mental health
                            clinic dedicated to fostering mental well-being since our establishment in 2016.
                            Driven by a keen interest in the effectiveness of psychological therapy, Dr.
                            Hemant Sonanis was inspired to start Sunshine Counseling and Therapy Centre.
                            Over the years, our team has expanded and can now meet the demand for
                            enhanced patient care. Our team comprises a distinguished group of
                            professionals, including an experienced psychiatrist, two RCI-licensed clinical
                            psychologists, two psychologists, a compassionate counselor, and a dedicated
                            remedial educator. Our team is unparalleled in the region, constantly striving to
                            provide quality care.
                        </p>

                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="check-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <span className="feature-text">
                                    Comprehensive and Personalized Mental Health Care
                                </span>
                            </div>

                            <div className="feature-item">
                                <div className="check-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <span className="feature-text">
                                    Tailored Therapeutic Services for Individual Needs
                                </span>
                            </div>

                            <div className="feature-item">
                                <div className="check-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <span className="feature-text">
                                    Diverse and Experienced Team Collaboration
                                </span>
                            </div>

                            <div className="feature-item">
                                <div className="check-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <span className="feature-text">
                                    Convenient Accessibility Under One Roof
                                </span>
                            </div>
                        </div>

                        <div className="contact-section">
                            <Link to="/ContactUs"><button className="contact-button">
                                Contact Us
                            </button></Link>

                            <div className="phone-info">
                                <div className="phone-number">+91 9607899660</div>
                                <div className="business-name">Sunshine Counselling and Therapy Centre</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurCenter;