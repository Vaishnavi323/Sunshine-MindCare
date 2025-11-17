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
            bio: 'Leading psychiatrist with over 15 years of experience in mental health care.',
            email: 'hemant@sunshinemindcare.com',
            phone: '+91 9607899660'
        },
        {
            id: 2,
            name: 'Dr. Priya Sharma',
            profession: 'Clinical Psychologist',
            specialization: 'CBT & Trauma Therapy',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=600&fit=crop',
            bio: 'RCI-licensed clinical psychologist specializing in cognitive behavioral therapy.',
            email: 'priya@sunshinemindcare.com',
            phone: '+91 8007869220'
        },
        {
            id: 3,
            name: 'Ms. Anjali Deshmukh',
            profession: 'Counseling Psychologist',
            specialization: 'Family & Relationship Counseling',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop',
            bio: 'Compassionate counselor dedicated to helping families and couples.',
            email: 'anjali@sunshinemindcare.com',
            phone: '+91 8007869221'
        },
        {
            id: 4,
            name: 'Mr. Rahul Patil',
            profession: 'Clinical Psychologist',
            specialization: 'Child & Adolescent Psychology',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=600&fit=crop',
            bio: 'RCI-licensed psychologist with expertise in child development and behavioral issues.',
            email: 'rahul@sunshinemindcare.com',
            phone: '+91 8007869222'
        },
        {
            id: 5,
            name: 'Ms. Neha Kulkarni',
            profession: 'Psychologist',
            specialization: 'Anxiety & Depression Management',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=600&fit=crop',
            bio: 'Dedicated psychologist focusing on anxiety disorders and mood management.',
            email: 'neha@sunshinemindcare.com',
            phone: '+91 8007869223'
        },
        {
            id: 6,
            name: 'Mr. Vikram Joshi',
            profession: 'Counselor',
            specialization: 'Career & Life Coaching',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop',
            bio: 'Experienced counselor helping individuals navigate life transitions and career challenges.',
            email: 'vikram@sunshinemindcare.com',
            phone: '+91 8007869224'
        },
        {
            id: 7,
            name: 'Ms. Sneha Reddy',
            profession: 'Remedial Educator',
            specialization: 'Learning Disabilities & Special Education',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop',
            bio: 'Dedicated educator specializing in helping children with learning disabilities.',
            email: 'sneha@sunshinemindcare.com',
            phone: '+91 8007869225'
        },
        {
            id: 8,
            name: 'Dr. Aditya Mehta',
            profession: 'Psychologist',
            specialization: 'Addiction & Rehabilitation',
            image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&h=600&fit=crop',
            bio: 'Specialist in addiction recovery and rehabilitation psychology.',
            email: 'aditya@sunshinemindcare.com',
            phone: '+91 8007869226'
        }
    ]);

    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
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
            transform: translateY(-10px);
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

        .team-page {
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          min-height: 100vh;
          padding: 80px 20px;
          position: relative;
          /* allow overlays (modals) to be visible above */
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

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 40px;
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

        .team-card:nth-child(1) { animation-delay: 0.1s; }
        .team-card:nth-child(2) { animation-delay: 0.2s; }
        .team-card:nth-child(3) { animation-delay: 0.3s; }
        .team-card:nth-child(4) { animation-delay: 0.4s; }
        .team-card:nth-child(5) { animation-delay: 0.5s; }
        .team-card:nth-child(6) { animation-delay: 0.6s; }
        .team-card:nth-child(7) { animation-delay: 0.7s; }
        .team-card:nth-child(8) { animation-delay: 0.8s; }

        .team-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(118, 75, 162, 0.4);
        }

        .team-card:hover .member-image {
          transform: scale(1.1);
        }

        .image-container {
          position: relative;
          height: 350px;
          overflow: hidden;
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
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
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
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
          text: center;
        }

        .team-card:hover .view-profile {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* When modal is open, hide hover/dropdown overlays */
        .team-page.modal-open .image-overlay,
        .team-page.modal-open .view-profile {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateX(-50%) translateY(20px) !important;
        }

        /* Disable hover lift effect when modal open */
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
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .member-profession {
          font-size: 1.1rem;
          color: #667eea;
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
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          /* make sure modal sits above any fixed headers */
          z-index: 99999;
          padding: 20px;
          animation: fadeIn 0.2s ease;
          -webkit-backdrop-filter: blur(4px);
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
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .modal-profession {
          font-size: 1.3rem;
          color: #667eea;
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
          color: #2c3e50;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          background: #667eea;
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
          .team-grid {
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

          .team-grid {
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

                    {/* Team Grid */}
                    <div className="team-grid">
                        {teamMembers.map((member) => (
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
                                        <div className="view-profile text-center">View Profile</div>
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