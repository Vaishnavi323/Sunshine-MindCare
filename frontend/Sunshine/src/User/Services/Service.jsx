import React, { useState } from 'react';

const ServicesPage = () => {
  // Dynamic services data - easily add more services here
  const [services] = useState([
    {
      id: 1,
      title: 'Assessments',
      description: 'Comprehensive psychological assessments to understand your mental health needs and create personalized treatment plans.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
      icon: '📋',
      details: [
        'Clinical Psychological Assessment',
        'Cognitive Assessment',
        'Behavioral Assessment',
        'Personality Assessment'
      ]
    },
    {
      id: 2,
      title: 'Psychological Therapies',
      description: 'Evidence-based therapeutic interventions tailored to your individual needs for optimal mental well-being.',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop',
      icon: '🧠',
      details: [
        'Cognitive Behavioral Therapy (CBT)',
        'Individual Counseling',
        'Family Therapy',
        'Group Therapy Sessions'
      ]
    }
    // Add more services here in the future
    // {
    //   id: 3,
    //   title: 'New Service',
    //   description: 'Description here',
    //   image: 'image_url',
    //   icon: '🎯',
    //   details: ['Detail 1', 'Detail 2']
    // }
  ]);

  const handleServiceClick = (service) => {
    console.log('Service clicked:', service.title);
    // You can add navigation or modal logic here
    alert(`You clicked on ${service.title}. This would navigate to the service details page.`);
  };

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

        .services-page {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 80px 20px;
        }

        .services-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #1e88e5;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .service-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 60px rgba(30, 136, 229, 0.3);
        }

        .service-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-image {
          transform: scale(1.1);
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
          display: flex;
          align-items: flex-end;
          padding: 30px;
        }

        .service-icon {
          font-size: 3rem;
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 167, 38, 0.9);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .service-title-overlay {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .service-content {
          padding: 35px;
        }

        .service-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .service-details {
          list-style: none;
          margin-bottom: 25px;
        }

        .service-details li {
          padding: 12px 0;
          color: #1e88e5;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #e0e0e0;
        }

        .service-details li:last-child {
          border-bottom: none;
        }

        .service-details li::before {
          content: '✓';
          color: white;
          background: #ffa726;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .service-button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .service-button:hover {
          background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 136, 229, 0.4);
        }

        .cta-section {
          text-align: center;
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .cta-text {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 30px;
        }

        .cta-button {
          background: #ffa726;
          color: white;
          border: none;
          padding: 18px 50px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #ff9800;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 167, 38, 0.4);
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .services-page {
            padding: 50px 15px;
          }

          .page-title {
            font-size: 2rem;
          }

          .page-subtitle {
            font-size: 1rem;
          }

          .service-image-container {
            height: 250px;
          }

          .service-content {
            padding: 25px;
          }

          .service-title-overlay {
            font-size: 1.5rem;
          }

          .cta-section {
            padding: 35px 25px;
          }

          .cta-title {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.8rem;
          }

          .service-icon {
            width: 60px;
            height: 60px;
            font-size: 2.5rem;
          }

          .cta-button {
            width: 100%;
            padding: 16px 30px;
          }
        }
      `}</style>

      <div className="services-page">
        <div className="services-container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Our Services</h1>
            <p className="page-subtitle">
              Comprehensive mental health services designed to support your journey 
              towards wellness and personal growth
            </p>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => handleServiceClick(service)}
              >
                <div className="service-image-container">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="service-image"
                  />
                  <div className="service-overlay">
                    <h3 className="service-title-overlay">{service.title}</h3>
                  </div>
                  <div className="service-icon">{service.icon}</div>
                </div>
                
                <div className="service-content">
                  <p className="service-description">{service.description}</p>
                  
                  <ul className="service-details">
                    {service.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  
                  <button className="service-button">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h2 className="cta-title">Need Help Choosing a Service?</h2>
            <p className="cta-text">
              Our team is here to guide you. Contact us for a free consultation 
              to find the best service for your needs.
            </p>
            <button className="cta-button">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;