import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Axios instance in same file
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  // Function to fetch API data
  const fetchTeamMembers = async () => {
    try {
      const response = await axiosInstance.get("/doctor/list");

      // Response में अगर data array ना मिले तो fallback से संभालो
      const fetchedMembers = response?.data?.data || response?.data || [];

      setTeamMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Default image fallback
  const defaultImage =
    "https://via.placeholder.com/600x600?text=No+Image+Available";

  // Category Filters
  const founder = teamMembers.find((m) => m.category === "founder");
  const seniorDoctors = teamMembers.filter((m) => m.category === "senior");
  const psychologists = teamMembers.filter((m) => m.category === "psychologist");
  const counselors = teamMembers.filter((m) => m.category === "counselor");
  const educators = teamMembers.filter((m) => m.category === "educator");

  return (
    <>
      {/* Loader */}
      {loading && (
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: "50px",
            fontSize: "22px",
          }}
        >
          Loading team members...
        </div>
      )}

      {!loading && (
        <>
          {/* 👇 आपका existing HTML + CSS code हमेशा जैसा है */}
          {/* नीचे सीधे वही code रखा है */}
          {/* 
              ↓↓↓ Existing Component Code Start
          */}

          <style>{`
            ... (आपका पूरा CSS code यहां वैसा ही रहेगा)
          `}</style>

          <div className={`team-page ${selectedMember ? "modal-open" : ""}`}>
            <div className="team-container">
              {/* Page Header */}
              <div className="page-header">
                <h1 className="page-title">Meet Our Team</h1>
                <p className="page-subtitle">
                  Dedicated professionals committed to your mental health and
                  well-being. Our diverse team brings expertise and compassion to
                  every session.
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
                        src={founder.image || defaultImage}
                        alt={founder.name}
                        className="founder-image"
                      />
                      <div className="founder-badge">Founder</div>
                    </div>
                    <div className="founder-info">
                      <h2 className="founder-name">{founder.name}</h2>
                      <p className="founder-profession">
                        {founder.profession}
                      </p>
                      <p className="founder-specialization">
                        {founder.specialization}
                      </p>
                      <p className="founder-bio">{founder.bio}</p>
                      <div className="founder-contact">
                        <a
                          href={`mailto:${founder.email}`}
                          className="contact-btn"
                        >
                          📧 {founder.email}
                        </a>
                        <a
                          href={`tel:${founder.phone}`}
                          className="contact-btn"
                        >
                          📞 {founder.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Sections */}
              {[
                { title: "Senior Doctors", list: seniorDoctors },
                { title: "Clinical Psychologists", list: psychologists },
                { title: "Counselors & Therapists", list: counselors },
                { title: "Special Educators", list: educators },
              ].map(
                (section, i) =>
                  section.list.length > 0 && (
                    <div className="team-section" key={i}>
                      <h2 className="section-title">{section.title}</h2>
                      <div className="team-grids">
                        {section.list.map((member) => (
                          <div
                            key={member.id}
                            className="team-card"
                            onClick={() => handleMemberClick(member)}
                          >
                            <div className="image-container">
                              <img
                                src={member.image || defaultImage}
                                alt={member.name}
                                className="member-image"
                              />
                              <div className="image-overlay">
                                <div className="view-profile">View Profile</div>
                              </div>
                            </div>
                            <div className="member-info">
                              <h3 className="member-name">{member.name}</h3>
                              <p className="member-profession">
                                {member.profession}
                              </p>
                              <p className="member-specialization">
                                {member.specialization}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Modal */}
            {selectedMember && (
              <div className="modal-overlay" onClick={closeModal}>
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="modal-close" onClick={closeModal}>
                    ×
                  </button>

                  <img
                    src={selectedMember.image || defaultImage}
                    alt={selectedMember.name}
                    className="modal-image"
                  />

                  <div className="modal-info">
                    <h2 className="modal-name">{selectedMember.name}</h2>
                    <p className="modal-profession">
                      {selectedMember.profession}
                    </p>
                    <p className="modal-specialization">
                      {selectedMember.specialization}
                    </p>
                    <p className="modal-bio">{selectedMember.bio}</p>

                    <div className="contact-info">
                      <div className="contact-item">
                        <div className="contact-icon">📧</div>
                        <span className="contact-text">
                          {selectedMember.email}
                        </span>
                      </div>
                      <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <span className="contact-text">
                          {selectedMember.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ↑↑↑ Existing Component Ends */}
        </>
      )}
    </>
  );
};

export default TeamPage;
