import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyTeam.css";
import defaultProfile from '../../assets/Sunshine_logo.png';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  // Use local placeholder to avoid external network failures
  const defaultImage = defaultProfile;

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${baseURL}/doctor/list`);
      console.log("API Response ===>", response.data);

      // Your backend returns: data: [...]
      const members = response?.data?.data || [];

      const fetchedMembers = members.map((member) => {
        // Handling image - your backend does NOT provide photo currently
        let cleanImage = defaultImage;

        if (member.photo) {
          let photo = member.photo.replace(/\\/g, "/").trim();
          cleanImage = photo.startsWith("http")
            ? photo
            : `${baseURL}/${photo}`;
        }

        // Category mapping — backend may not send category
        const categoryMap = {
          founder: "founder",
          senior: "senior",
          junior: "junior",
          psychologist: "junior",
          counselor: "junior",
          educator: "junior",
        };

        const rawCategory = (member.category || "").toLowerCase().trim();
        const category = categoryMap[rawCategory] || "junior";

        return {
          id: member.id,
          name: member.full_name?.trim() || "Unknown Member",
          profession: member.qualification || "Mental Health Specialist",
          specialization: member.description || "General Psychology",
          image: member.photo ? cleanImage : defaultImage,
          bio: member.description || "Dedicated to improving mental well-being.",
          bioShort:
            (member.description && member.description.length > 120)
              ? `${member.description.slice(0, 120).trim()}...`
              : (member.description || "Dedicated to improving mental well-being."),
          email: member.email?.trim(),
          phone: member.phone?.trim(),
          category,
        };
      });

      // Order → Founder → Senior → Junior
      const order = { founder: 1, senior: 2, junior: 3 };
      fetchedMembers.sort((a, b) => order[a.category] - order[b.category]);

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

  const handleMemberClick = (member) => setSelectedMember(member);
  const closeModal = () => setSelectedMember(null);

  const founder = teamMembers.find((m) => m.category === "founder");
  const seniorDoctors = teamMembers.filter((m) => m.category === "senior");
  const juniorDoctors = teamMembers.filter((m) => m.category === "junior");

  return (
    <>
      {loading && (
        <div style={{ color: "#1e3c72", textAlign: "center", marginTop: "50px", fontSize: "22px" }}>
          Loading team members...
        </div>
      )}

      {!loading && teamMembers.length === 0 && (
        <div style={{ color: "#1e3c72", textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
          No team members found.
        </div>
      )}

      {!loading && teamMembers.length > 0 && (
        <div className={`team-page ${selectedMember ? "modal-open" : ""}`}>
          <div className="team-container">

            <div className="page-header">
              <h1 className="page-title">Meet Our Team</h1>
              <p className="page-subtitle">
                Dedicated professionals committed to your mental health and well-being.
              </p>
            </div>

            {/* Founder */}
            {founder && (
              <div className="founder-section">
                <h2 className="section-title">Founder</h2>
                <div className="founder-card" onClick={() => handleMemberClick(founder)}>
                  <div className="founder-image-container">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="founder-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                    />
                    <div className="founder-badge">Founder</div>
                  </div>
                  <div className="founder-info">
                    <h2 className="founder-name">{founder.name}</h2>
                    <p className="founder-profession">{founder.profession}</p>
                    <p className="founder-specialization">{founder.specialization}</p>
                    {/* <p className="founder-bio">{founder.bio}</p> */}
                  </div>
                </div>
              </div>
            )}

            {/* Senior Doctors */}
            {seniorDoctors.length > 0 && (
              <div className="team-section">
                <h2 className="section-title">Senior Doctors</h2>
                <div className="team-grids">
                  {seniorDoctors.map((member) => (
                    <div key={member.id} className="team-card" onClick={() => handleMemberClick(member)}>
                      <div className="image-container">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                        />
                        <div className="image-overlay">
                          <div className="view-profile">View Profile</div>
                        </div>
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-profession">{member.profession}</p>
                        {/* <p className="member-specialization">{member.specialization}</p> */}
                        <p className="member-bio">{member.bioShort}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Junior Doctors */}
            {juniorDoctors.length > 0 && (
              <div className="team-section">
                <h2 className="section-title">Our Team</h2>
                <div className="team-grids">
                  {juniorDoctors.map((member) => (
                    <div key={member.id} className="team-card" onClick={() => handleMemberClick(member)}>
                      <div className="image-container">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="member-image"
                          onError={(e) => (e.target.src = defaultImage)}
                        />
                        <div className="image-overlay">
                          <div className="view-profile">View Profile</div>
                        </div>
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-profession">{member.profession}</p>
                        {/* <p className="member-specialization">{member.specialization}</p> */}
                        <p className="member-bio">{member.bioShort}</p>
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
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                />
                <div className="modal-info">
                  <h2 className="modal-name">{selectedMember.name}</h2>
                  <p className="modal-profession">{selectedMember.profession}</p>
                  <p className="modal-specialization">{selectedMember.specialization}</p>
                  {/* <p className="modal-bio">{selectedMember.bio}</p> */}

                  <div className="contact-info">
                    {selectedMember.email && (
                      <div className="contact-item">
                        <div className="contact-icon">📧</div>
                        <span>{selectedMember.email}</span>
                      </div>
                    )}
                    {selectedMember.phone && (
                      <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <span>{selectedMember.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TeamPage;