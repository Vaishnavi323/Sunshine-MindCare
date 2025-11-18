import React, { useState } from 'react';

const TeamPage = () => {
    // Dynamic team members data - easily add more members
    const [teamMembers] = useState([
        {
            id: 1,
            name: 'Dr. Hemant Sonanis',
            profession: 'Psychiatrist & Founder',
            specialization: 'Clinical Psychology & Mental Health',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop',
            bio: 'Leading psychiatrist with over 15 years of experience in mental health care. Specializes in complex psychological disorders and innovative treatment approaches.',
            email: 'hemant@sunshinemindcare.com',
            phone: '+91 9607899660',
            category: 'founder'
        },
        {
            id: 2,
            name: 'Dr. Priya Sharma',
            profession: 'Clinical Psychologist',
            specialization: 'CBT & Trauma Therapy',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop',
            bio: 'RCI-licensed clinical psychologist specializing in cognitive behavioral therapy with extensive experience in trauma recovery.',
            email: 'priya@sunshinemindcare.com',
            phone: '+91 8007869220',
            category: 'senior'
        },
        {
            id: 3,
            name: 'Ms. Anjali Deshmukh',
            profession: 'Counseling Psychologist',
            specialization: 'Family & Relationship Counseling',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop',
            bio: 'Compassionate counselor dedicated to helping families and couples build stronger relationships.',
            email: 'anjali@sunshinemindcare.com',
            phone: '+91 8007869221',
            category: 'senior'
        },
        {
            id: 4,
            name: 'Mr. Rahul Patil',
            profession: 'Clinical Psychologist',
            specialization: 'Child & Adolescent Psychology',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop',
            bio: 'RCI-licensed psychologist with expertise in child development and behavioral issues.',
            email: 'rahul@sunshinemindcare.com',
            phone: '+91 8007869222',
            category: 'psychologist'
        },
        {
            id: 5,
            name: 'Ms. Neha Kulkarni',
            profession: 'Psychologist',
            specialization: 'Anxiety & Depression Management',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            bio: 'Dedicated psychologist focusing on anxiety disorders and mood management.',
            email: 'neha@sunshinemindcare.com',
            phone: '+91 8007869223',
            category: 'psychologist'
        },
        {
            id: 6,
            name: 'Mr. Vikram Joshi',
            profession: 'Counselor',
            specialization: 'Career & Life Coaching',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop',
            bio: 'Experienced counselor helping individuals navigate life transitions and career challenges.',
            email: 'vikram@sunshinemindcare.com',
            phone: '+91 8007869224',
            category: 'counselor'
        },
        {
            id: 7,
            name: 'Ms. Sneha Reddy',
            profession: 'Remedial Educator',
            specialization: 'Learning Disabilities & Special Education',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop',
            bio: 'Dedicated educator specializing in helping children with learning disabilities.',
            email: 'sneha@sunshinemindcare.com',
            phone: '+91 8007869225',
            category: 'educator'
        },
        {
            id: 8,
            name: 'Dr. Aditya Mehta',
            profession: 'Psychologist',
            specialization: 'Addiction & Rehabilitation',
            image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&h=600&fit=crop',
            bio: 'Specialist in addiction recovery and rehabilitation psychology.',
            email: 'aditya@sunshinemindcare.com',
            phone: '+91 8007869226',
            category: 'psychologist'
        }
    ]);

    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    // Filter team members by category
    const founder = teamMembers.find(member => member.category === 'founder');
    const seniorDoctors = teamMembers.filter(member => member.category === 'senior');
    const psychologists = teamMembers.filter(member => member.category === 'psychologist');
    const counselors = teamMembers.filter(member => member.category === 'counselor');
    const educators = teamMembers.filter(member => member.category === 'educator');

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
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
            box-shadow: 0 0 20px rgba(255, 167, 38, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 167, 38, 0.6);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .team-page {
          background: linear-gradient(135deg, #2c2c71f8 0%, #174593ff 100%);
          min-height: 100vh;
          padding: 80px 20px;
          position: relative;
          overflow: visible;
        }

        .team-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
          opacity: 0.5;
        }

        .team-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .page-header {
          text-align: center;
          margin-bottom: 70px;
          animation: fadeInUp 0.8s ease-out;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
        }

        .page-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        /* Founder Section */
        .founder-section {
          margin-bottom: 100px;
          animation: fadeInUp 1s ease-out;
        }

        .founder-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          animation: pulse 4s infinite ease-in-out;
          position: relative;
        }

        .founder-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #ffa726 0%, transparent 50%);
          opacity: 0.1;
          z-index: 1;
        }

        {/* .founder-card:hover {
          transform: translateY(-10px) scale(1.02);
          animation: glow 2s infinite ease-in-out;
          transition: all 0.3s ease;
        } */}

        .founder-image-container {
          flex: 0 0 400px;
          position: relative;
          overflow: hidden;
        }

        .founder-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .founder-card:hover .founder-image {
          transform: scale(1.1);
        }

        .founder-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: linear-gradient(135deg, #ffa726, #ff9800);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
          animation: float 3s infinite ease-in-out;
        }

        .founder-info {
          flex: 1;
          padding: 50px;
          position: relative;
          z-index: 1;
        }

        .founder-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f1f35;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #1f1f35, #174593);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .founder-profession {
          font-size: 1.5rem;
          color: #ffa726;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .founder-specialization {
          font-size: 1.2rem;
          color: #174593;
          font-weight: 500;
          margin-bottom: 25px;
          font-style: italic;
        }

        .founder-bio {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .founder-contact {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .contact-btn {
          background: linear-gradient(135deg, #174593, #1f1f35);
          color: white;
          padding: 12px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(23, 69, 147, 0.4);
        }

        /* Team Sections */
        .team-section {
          margin-bottom: 80px;
          animation: fadeInUp 0.8s ease-out;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 40px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          padding-bottom: 15px;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(135deg, #ffa726, #ff9800);
          border-radius: 2px;
        }

        .team-grids {
          display: grid;
          grid-template-columns: repeat(3, minmax(300px, 1fr));
          gap: 10px;
          justify-items: center;
          
        }

        .team-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          animation: fadeInUp 0.8s ease-out backwards;
          position: relative;
        }

        .team-card:nth-child(odd) {
          animation-name: slideInFromLeft;
        }

        .team-card:nth-child(even) {
          animation-name: slideInFromRight;
        }

        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }

        .team-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(255, 167, 38, 0.3);
        }

        .team-card:hover .member-image {
          transform: scale(1.1);
        }

        .image-container {
          position: relative;
          height: 350px;
          overflow: hidden;
          background: linear-gradient(135deg, #1f1f35ff 0%, #174593ff 100%);
        }

        .member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;  
          transition: transform 0.5s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(31, 31, 53, 0.8) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .team-card:hover .image-overlay {
          opacity: 1;
        }

        .view-profile {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          background: #ffa726;
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          font-weight: 700;
          opacity: 0;
          transition: all 0.4s ease;
          text-align: center;
        }

        .team-card:hover .view-profile {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .team-page.modal-open .image-overlay,
        .team-page.modal-open .view-profile {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateX(-50%) translateY(20px) !important;
        }

        .team-page.modal-open .team-card {
          transform: none !important;
          box-shadow: 0 15px 45px rgba(0,0,0,0.15) !important;
        }

        .member-info {
          padding: 25px;
          text-align: center;
        }

        .member-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f1f35;
          margin-bottom: 8px;
        }

        .member-profession {
          font-size: 1.1rem;
          color: #174593;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .member-specialization {
          font-size: 0.9rem;
          color: #ffa726;
          font-weight: 500;
          font-style: italic;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(31, 31, 53, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
          animation: fadeIn 0.2s ease;
          backdrop-filter: blur(4px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.25s ease;
          position: relative;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #ffa726;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-close:hover {
          background: #ff9800;
          transform: rotate(90deg);
        }

        .modal-image {
          width: 100%;
          height: min(55vh, 500px);
          object-fit: cover;
          display: block;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .modal-info {
          padding: 40px;
        }

        .modal-name {
          font-size: 2rem;
          font-weight: 700;
          color: #1f1f35;
          margin-bottom: 10px;
        }

        .modal-profession {
          font-size: 1.3rem;
          color: #174593;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .modal-specialization {
          font-size: 1rem;
          color: #ffa726;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .modal-bio {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .contact-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 12px;
          color: #1f1f35;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          background: #174593;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .contact-text {
          font-size: 1rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .founder-card {
            flex-direction: column;
          }

          .founder-image-container {
            flex: 0 0 400px;
          }

          .team-grids {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
          }

          .page-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .team-page {
            padding: 50px 15px;
          }

          .page-title {
            font-size: 2.5rem;
          }

          .page-subtitle {
            font-size: 1.1rem;
          }

          .founder-image-container {
            flex: 0 0 300px;
          }

          .founder-info {
            padding: 30px;
          }

          .founder-name {
            font-size: 2rem;
          }

          .team-grids {
            grid-template-columns: 1fr;
          }

          .modal-info {
            padding: 30px 25px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem;
          }

          .founder-contact {
            flex-direction: column;
          }

          .image-container {
            height: 300px;
          }

          .modal-image {
            height: 300px;
          }
        }
      `}</style>

            <div className={`team-page ${selectedMember ? 'modal-open' : ''}`}>
                <div className="team-container">
                    {/* Page Header */}
                    <div className="page-header">
                        <h1 className="page-title">Meet Our Team</h1>
                        <p className="page-subtitle">
                            Dedicated professionals committed to your mental health and well-being.
                            Our diverse team brings expertise and compassion to every session.
                        </p>
                    </div>

                    {/* Founder Section */}
                    {founder && (
                        <div className="founder-section">
                            <div 
                                className="founder-card"
                                onClick={() => handleMemberClick(founder)}
                            >
                                <div className="founder-image-container">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="founder-image"
                                    />
                                    <div className="founder-badge">Founder</div>
                                </div>
                                <div className="founder-info">
                                    <h2 className="founder-name">{founder.name}</h2>
                                    <p className="founder-profession">{founder.profession}</p>
                                    <p className="founder-specialization">{founder.specialization}</p>
                                    <p className="founder-bio">{founder.bio}</p>
                                    <div className="founder-contact">
                                        <a href={`mailto:${founder.email}`} className="contact-btn">
                                            📧 {founder.email}
                                        </a>
                                        <a href={`tel:${founder.phone}`} className="contact-btn">
                                            📞 {founder.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Senior Doctors Section */}
                    {seniorDoctors.length > 0 && (
                        <div className="team-section">
                            <h2 className="section-title">Senior Doctors</h2>
                            <div className="team-grids">
                                {seniorDoctors.map((member) => (
                                    <div
                                        key={member.id}
                                        className="team-card"
                                        onClick={() => handleMemberClick(member)}
                                    >
                                        <div className="image-container">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="member-image"
                                            />
                                            <div className="image-overlay">
                                                <div className="view-profile">View Profile</div>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <h3 className="member-name">{member.name}</h3>
                                            <p className="member-profession">{member.profession}</p>
                                            <p className="member-specialization">{member.specialization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Psychologists Section */}
                    {psychologists.length > 0 && (
                        <div className="team-section">
                            <h2 className="section-title">Clinical Psychologists</h2>
                            <div className="team-grids">
                                {psychologists.map((member) => (
                                    <div
                                        key={member.id}
                                        className="team-card"
                                        onClick={() => handleMemberClick(member)}
                                    >
                                        <div className="image-container">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="member-image"
                                            />
                                            <div className="image-overlay">
                                                <div className="view-profile ">View Profile</div>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <h3 className="member-name">{member.name}</h3>
                                            <p className="member-profession">{member.profession}</p>
                                            <p className="member-specialization">{member.specialization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Counselors Section */}
                    {counselors.length > 0 && (
                        <div className="team-section">
                            <h2 className="section-title">Counselors & Therapists</h2>
                            <div className="team-grids">
                                {counselors.map((member) => (
                                    <div
                                        key={member.id}
                                        className="team-card"
                                        onClick={() => handleMemberClick(member)}
                                    >
                                        <div className="image-container">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="member-image"
                                            />
                                            <div className="image-overlay">
                                                <div className="view-profile">View Profile</div>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <h3 className="member-name">{member.name}</h3>
                                            <p className="member-profession">{member.profession}</p>
                                            <p className="member-specialization">{member.specialization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Educators Section */}
                    {educators.length > 0 && (
                        <div className="team-section">
                            <h2 className="section-title">Special Educators</h2>
                            <div className="team-grids">
                                {educators.map((member) => (
                                    <div
                                        key={member.id}
                                        className="team-card"
                                        onClick={() => handleMemberClick(member)}
                                    >
                                        <div className="image-container">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="member-image"
                                            />
                                            <div className="image-overlay">
                                                <div className="view-profile">View Profile</div>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <h3 className="member-name">{member.name}</h3>
                                            <p className="member-profession">{member.profession}</p>
                                            <p className="member-specialization">{member.specialization}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {selectedMember && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>×</button>

                            <img
                                src={selectedMember.image}
                                alt={selectedMember.name}
                                className="modal-image"
                            />

                            <div className="modal-info">
                                <h2 className="modal-name">{selectedMember.name}</h2>
                                <p className="modal-profession">{selectedMember.profession}</p>
                                <p className="modal-specialization">{selectedMember.specialization}</p>
                                <p className="modal-bio">{selectedMember.bio}</p>

                                <div className="contact-info">
                                    <div className="contact-item">
                                        <div className="contact-icon">📧</div>
                                        <span className="contact-text">{selectedMember.email}</span>
                                    </div>
                                    <div className="contact-item">
                                        <div className="contact-icon">📞</div>
                                        <span className="contact-text">{selectedMember.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TeamPage;