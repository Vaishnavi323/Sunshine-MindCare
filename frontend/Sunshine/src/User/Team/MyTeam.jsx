// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TeamPage = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [loading, setLoading] = useState(true);


//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   const defaultImage = "https://via.placeholder.com/600x600?text=No+Image";

//   const fetchTeamMembers = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/doctor/list`
//       );
//       const members = response?.data?.data || [];

//       const fetchedMembers = members.map((member) => {
//         // Clean image path
//         let cleanImage = defaultImage;
//         if (member.photo) {
//           const photo = member.photo.replace(/\\/g, "/").trim();
//           cleanImage = photo.startsWith("http")
//             ? photo
//             : `${import.meta.env.VITE_BACKEND_URL}/${photo}`;
//         }

//         // Yeh important hai – category API se le rahe hain
//         const categoryMap = {
//           Founder: "founder",
//           senior: "senior",
//           psychologist: "psychologist",
//           counselor: "counselor",
//           educator: "educator",
//         };

//         const rawCategory = (member.category || "").toString().trim().toLowerCase();
//         const category = categoryMap[rawCategory] || "psychologist"; // fallback

//         return {
//           id: member.id,
//           name: member.full_name?.trim() || "Dr. Unknown",
//           profession: member.qualification?.trim() || "Mental Health Specialist", // Fixed: removed wrong colon
//           specialization: member.description?.trim() || "General Psychology",
//           image: cleanImage,
//           bio: member.description?.trim() || "Dedicated to improving mental well-being.",
//           email: member.email?.trim(),
//           phone: member.phone?.trim(),
//           category: category, // Yeh ab sahi aayega: "founder", "senior", etc.
//         };
//       });

//       // Optional: Sort kar do – founder pehle, baaki alphabetical
//       fetchedMembers.sort((a, b) => {
//         if (a.category === "founder") return -1;
//         if (b.category === "founder") return 1;
//         return 0;
//       });

//       setTeamMembers(fetchedMembers);
//     } catch (error) {
//       console.error("Error fetching team members:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeamMembers();
//   }, []);

//   const handleMemberClick = (member) => setSelectedMember(member);
//   const closeModal = () => setSelectedMember(null);

//   // Ab sahi category se filter kar rahe hain
//   const founder = teamMembers.find((m) => m.category === "founder");
//   const seniorDoctors = teamMembers.filter((m) => m.category === "senior");
//   const psychologists = teamMembers.filter((m) => m.category === "psychologist");
//   const counselors = teamMembers.filter((m) => m.category === "counselor");
//   const educators = teamMembers.filter((m) => m.category === "educator");

//   // Baaki sab same rahega – CSS, structure, modal – kuch nahi badla

//   return (
//     <>
//       {loading && (
//         <div style={{ color: "#fff", textAlign: "center", marginTop: "50px", fontSize: "22px" }}>
//           Loading team members...
//         </div>
//       )}

//       {!loading && teamMembers.length === 0 && (
//         <div style={{ color: "#fff", textAlign: "center", marginTop: "50px", fontSize: "20px" }}>
//           No team members found.
//         </div>
//       )}

//       {!loading && teamMembers.length > 0 && (
//         <>
//           <style>{`
//             /* Tumhara saara CSS yahan same rahega - no change */
//             .team-page { padding: 60px 20px; background: linear-gradient(135deg, #1e3c72, #2a5298); min-height: 100vh; }
//             .team-container { max-width: 1200px; margin: 0 auto; }
//             .page-header { text-align: center; margin-bottom: 60px; color: white; }
//             .page-title { font-size: 48px; font-weight: 700; margin-bottom: 16px; }
//             .page-subtitle { font-size: 20px; opacity: 0.9; }
//             .founder-section { margin-bottom: 80px; }
//             .founder-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; max-width: 800px; margin: 0 auto; }
//             .founder-image-container { position: relative; }
//             .founder-image { width: 100%; height: 500px; object-fit: cover; }
//             .founder-badge { position: absolute; top: 20px; right: 20px; background: #ff6b6b; color: white; padding: 10px 20px; border-radius: 50px; font-weight: bold; }
//             .founder-info { padding: 40px; text-align: center; }
//             .founder-name { font-size: 36px; margin-bottom: 10px; color: #1e3c72; }
//             .founder-profession { font-size: 22px; color: #ff6b6b; margin-bottom: 10px; }
//             .founder-specialization { font-size: 18px; color: #555; margin-bottom: 20px; }
//             .founder-bio { font-size: 16px; line-height: 1.8; color: #666; margin-bottom: 30px; }
//             .team-section { margin-bottom: 80px; }
//             .section-title { text-align: center; font-size: 38px; color: white; margin-bottom: 50px; font-weight: 700; }
//             .team-grids { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
//             .team-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 30px rgba(0,0,0,0.15); transition: all 0.4s; cursor: pointer; }
//             .team-card:hover { transform: translateY(-15px); box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
//             .image-container { position: relative; overflow: hidden; }
//             .member-image { width: 100%; height: 350px; object-fit: cover; transition: 0.5s; }
//             .team-card:hover .member-image { transform: scale(1.1); }
//             .image-overlay { position: absolute; inset: 0; background: rgba(30, 60, 114, 0.8); opacity: 0; transition: 0.4s; display: flex; align-items: center; justify-content: center; }
//             .team-card:hover .image-overlay { opacity: 1; }
//             .view-profile { color: white; font-size: 20px; font-weight: bold; }
//             .member-info { padding: 25px; text-align: center; }
//             .member-name { font-size: 24px; color: #1e3c72; margin-bottom: 8px; }
//             .member-profession { font-size: 16px; color: #ff6b6b; font-weight: 600; margin-bottom: 8px; }
//             .member-specialization { font-size: 15px; color: #666; }
//             .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
//             .modal-content { background: white; border-radius: 20px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; }
//             .modal-close { position: absolute; top: 15px; right: 20px; background: #ff6b6b; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 28px; cursor: pointer; z-index: 10; }
//             .modal-image { width: 100%; height: 400px; object-fit: cover; border-radius: 20px 20px 0 0; }
//             .modal-info { padding: 40px; text-align: center; }
//             .modal-name { font-size: 36px; color: #1e3c72; margin-bottom: 10px; }
//             .modal-profession { font-size: 22px; color: #ff6b6b; margin-bottom: 10px; }
//             .modal-specialization { font-size: 18px; color: #555; margin-bottom: 20px; }
//             .modal-bio { font-size: 17px; line-height: 1.8; color: #444; margin-bottom: 30px; }
//             .contact-info { display: flex; flex-direction: column; gap: 15px; align-items: center; }
//             .contact-item { display: flex; align-items: center; gap: 15px; font-size: 18px; }
//             .contact-icon { font-size: 24px; }
//             .contact-text { color: #1e3c72; font-weight: 500; }
//           `}</style>

//           <div className={`team-page ${selectedMember ? "modal-open" : ""}`}>
//             <div className="team-container">
//               <div className="page-header">
//                 <h1 className="page-title">Meet Our Team</h1>
//                 <p className="page-subtitle">
//                   Dedicated professionals committed to your mental health and well-being.
//                 </p>
//               </div>

//               {/* Founder - Bada Card */}
//               {founder && (
//                 <div className="founder-section">
//                   <div className="founder-card" onClick={() => handleMemberClick(founder)}>
//                     <div className="founder-image-container">
//                       <img src={founder.image} alt={founder.name} className="founder-image" onError={(e) => (e.target.src = defaultImage)} />
//                       <div className="founder-badge">Founder</div>
//                     </div>
//                     <div className="founder-info">
//                       <h2 className="founder-name">{founder.name}</h2>
//                       <p className="founder-profession">{founder.profession}</p>
//                       <p className="founder-specialization">{founder.specialization}</p>
//                       <p className="founder-bio">{founder.bio}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Baki Sections - Same as before */}
//               {[
//                 { title: "Senior Doctors", list: seniorDoctors, category: "senior" },
//                 { title: "Clinical Psychologists", list: psychologists, category: "psychologist" },
//                 { title: "Counselors & Therapists", list: counselors, category: "counselor" },
//                 { title: "Special Educators", list: educators, category: "educator" },
//               ].map((section) => (
//                 section.list.length > 0 && (
//                   <div className="team-section" key={section.category}>
//                     <h2 className="section-title">{section.title}</h2>
//                     <div className="team-grids">
//                       {section.list.map((member) => (
//                         <div key={member.id} className="team-card" onClick={() => handleMemberClick(member)}>
//                           <div className="image-container">
//                             <img src={member.image} alt={member.name} className="member-image" onError={(e) => (e.target.src = defaultImage)} />
//                             <div className="image-overlay">
//                               <div className="view-profile">View Profile</div>
//                             </div>
//                           </div>
//                           <div className="member-info">
//                             <h3 className="member-name">{member.name}</h3>
//                             <p className="member-profession">{member.profession}</p>
//                             <p className="member-specialization">{member.specialization}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )
//               ))}
//             </div>

//             {/* Modal - Same */}
//             {selectedMember && (
//               <div className="modal-overlay" onClick={closeModal}>
//                 <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                   <button className="modal-close" onClick={closeModal}>×</button>
//                   <img src={selectedMember.image} alt={selectedMember.name} className="modal-image" onError={(e) => (e.target.src = defaultImage)} />
//                   <div className="modal-info">
//                     <h2 className="modal-name">{selectedMember.name}</h2>
//                     <p className="modal-profession">{selectedMember.profession}</p>
//                     <p className="modal-specialization">{selectedMember.specialization}</p>
//                     <p className="modal-bio">{selectedMember.bio}</p>
//                     <div className="contact-info">
//                       <div className="contact-item">
//                         <div className="contact-icon">Email</div>
//                         <span className="contact-text">{selectedMember.email}</span>
//                       </div>
//                       <div className="contact-item">
//                         <div className="contact-icon">Phone</div>
//                         <span className="contact-text">{selectedMember.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default TeamPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const defaultImage = "https://via.placeholder.com/600x600?text=No+Image";

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${baseURL}/doctor/list`);
      const members = response?.data?.data || [];

      const fetchedMembers = members.map((member) => {
        // Clean image path
        let cleanImage = defaultImage;
        if (member.photo) {
          const photo = member.photo.replace(/\\/g, "/").trim();
          cleanImage = photo.startsWith("http")
            ? photo
            : `${import.meta.env.VITE_BACKEND_URL}/${photo}`;
        }

        // Category mapping - simplified for founder, senior, junior
        const categoryMap = {
          Founder: "founder",
          founder: "founder",
          senior: "senior",
          Senior: "senior",
          junior: "junior",
          Junior: "junior",
          psychologist: "junior",
          counselor: "junior",
          educator: "junior",
        };

        const rawCategory = (member.category || "").toString().trim().toLowerCase();
        const category = categoryMap[rawCategory] || "junior";

        return {
          id: member.id,
          name: member.full_name?.trim() || "Dr. Unknown",
          profession: member.qualification?.trim() || "Mental Health Specialist",
          specialization: member.description?.trim() || "General Psychology",
          image: cleanImage,
          bio: member.description?.trim() || "Dedicated to improving mental well-being.",
          email: member.email?.trim(),
          phone: member.phone?.trim(),
          category: category,
        };
      });

      // Sort by hierarchy: founder → senior → junior
      const categoryOrder = { founder: 1, senior: 2, junior: 3 };
      fetchedMembers.sort((a, b) => {
        return categoryOrder[a.category] - categoryOrder[b.category];
      });

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

  // Filter members by category in hierarchical order
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
        <>
          <style>{`
            .team-page { 
              padding: 60px 20px; 
              background: #ffffff; 
              min-height: 100vh; 
            }
            .team-container { 
              max-width: 1200px; 
              margin: 0 auto; 
            }
            .page-header { 
              text-align: center; 
              margin-bottom: 60px; 
            }
            .page-title { 
              font-size: 48px; 
              font-weight: 700; 
              margin-bottom: 16px; 
              color: #1e3c72;
            }
            .page-subtitle { 
              font-size: 20px; 
              color: #666;
              opacity: 0.9; 
            }

            /* Founder Section - Big Horizontal Card */
            .founder-section { 
              margin-bottom: 80px; 
            }
            .founder-card { 
              background: #f8f9fa; 
              border: 2px solid #1e3c72;
              border-radius: 20px; 
              overflow: hidden; 
              box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1); 
              display: flex; 
              max-width: 100%; 
              margin: 0 auto;
              transition: all 0.3s ease;
              cursor: pointer;
              min-height: 400px;
            }
            .founder-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 15px 40px rgba(30, 60, 114, 0.2);
            }
            .founder-image-container { 
              position: relative; 
              flex: 0 0 400px;
            }
            .founder-image { 
              width: 100%; 
              height: 100%; 
              object-fit: cover; 
            }
            .founder-badge { 
              position: absolute; 
              top: 20px; 
              right: 20px; 
              background: #1e3c72; 
              color: white; 
              padding: 12px 24px; 
              border-radius: 50px; 
              font-weight: bold; 
              font-size: 18px;
            }
            .founder-info { 
              padding: 50px; 
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .founder-name { 
              font-size: 42px; 
              margin-bottom: 15px; 
              color: #1e3c72; 
              font-weight: 700;
            }
            .founder-profession { 
              font-size: 24px; 
              color: #2a5298; 
              margin-bottom: 15px; 
              font-weight: 600;
            }
            .founder-specialization { 
              font-size: 20px; 
              color: #666; 
              margin-bottom: 25px; 
              font-style: italic;
            }
            .founder-bio { 
              font-size: 18px; 
              line-height: 1.8; 
              color: #555; 
              margin-bottom: 30px; 
            }
            .founder-contact {
              display: flex;
              gap: 30px;
              flex-wrap: wrap;
            }
            .contact-item {
              display: flex;
              align-items: center;
              gap: 10px;
              font-size: 16px;
              color: #1e3c72;
            }
            .contact-icon {
              font-size: 20px;
            }

            /* Team Sections */
            .team-section { 
              margin-bottom: 80px; 
            }
            .section-title { 
              text-align: center; 
              font-size: 38px; 
              color: #1e3c72; 
              margin-bottom: 50px; 
              font-weight: 700; 
              position: relative;
            }
            .section-title::after {
              content: '';
              position: absolute;
              bottom: -15px;
              left: 50%;
              transform: translateX(-50%);
              width: 100px;
              height: 4px;
              background: #1e3c72;
              border-radius: 2px;
            }
            .team-grids { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
              gap: 30px; 
            }
            .team-card { 
              background: white; 
              border: 1px solid #e0e0e0;
              border-radius: 16px; 
              overflow: hidden; 
              box-shadow: 0 5px 15px rgba(30, 60, 114, 0.08); 
              transition: all 0.4s; 
              cursor: pointer; 
            }
            .team-card:hover { 
              transform: translateY(-10px); 
              box-shadow: 0 15px 30px rgba(30, 60, 114, 0.15); 
              border-color: #1e3c72;
            }
            .image-container { 
              position: relative; 
              overflow: hidden; 
            }
            .member-image { 
              width: 100%; 
              height: 300px; 
              object-fit: cover; 
              transition: 0.5s; 
            }
            .team-card:hover .member-image { 
              transform: scale(1.05); 
            }
            .image-overlay { 
              position: absolute; 
              inset: 0; 
              background: rgba(30, 60, 114, 0.8); 
              opacity: 0; 
              transition: 0.4s; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
            }
            .team-card:hover .image-overlay { 
              opacity: 1; 
            }
            .view-profile { 
              color: white; 
              font-size: 18px; 
              font-weight: bold; 
            }
            .member-info { 
              padding: 25px; 
              text-align: center; 
            }
            .member-name { 
              font-size: 22px; 
              color: #1e3c72; 
              margin-bottom: 8px; 
              font-weight: 600;
            }
            .member-profession { 
              font-size: 16px; 
              color: #2a5298; 
              font-weight: 600; 
              margin-bottom: 8px; 
            }
            .member-specialization { 
              font-size: 14px; 
              color: #666; 
              line-height: 1.5;
            }

            /* Modal */
            .modal-overlay { 
              position: fixed; 
              inset: 0; 
              background: rgba(0,0,0,0.8); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              z-index: 9999; 
              padding: 20px; 
            }
            .modal-content { 
              background: white; 
              border-radius: 20px; 
              max-width: 900px; 
              width: 100%; 
              max-height: 90vh; 
              overflow-y: auto; 
              position: relative; 
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .modal-close { 
              position: absolute; 
              top: 15px; 
              right: 20px; 
              background: #1e3c72; 
              color: white; 
              border: none; 
              width: 40px; 
              height: 40px; 
              border-radius: 50%; 
              font-size: 28px; 
              cursor: pointer; 
              z-index: 10; 
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .modal-image { 
              width: 100%; 
              height: 350px; 
              object-fit: cover; 
              border-radius: 20px 20px 0 0; 
            }
            .modal-info { 
              padding: 40px; 
              text-align: center; 
            }
            .modal-name { 
              font-size: 36px; 
              color: #1e3c72; 
              margin-bottom: 10px; 
              font-weight: 700;
            }
            .modal-profession { 
              font-size: 22px; 
              color: #2a5298; 
              margin-bottom: 10px; 
              font-weight: 600;
            }
            .modal-specialization { 
              font-size: 18px; 
              color: #666; 
              margin-bottom: 20px; 
              font-style: italic;
            }
            .modal-bio { 
              font-size: 17px; 
              line-height: 1.8; 
              color: #444; 
              margin-bottom: 30px; 
            }
            .contact-info { 
              display: flex; 
              flex-direction: column; 
              gap: 15px; 
              align-items: center; 
            }
            .contact-item { 
              display: flex; 
              align-items: center; 
              gap: 15px; 
              font-size: 18px; 
            }
            .contact-icon { 
              font-size: 24px; 
              color: #1e3c72;
            }
            .contact-text { 
              color: #1e3c72; 
              font-weight: 500; 
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .founder-card {
                flex-direction: column;
                min-height: auto;
              }
              .founder-image-container {
                flex: 0 0 300px;
              }
              .founder-info {
                padding: 30px;
              }
              .founder-name {
                font-size: 32px;
              }
              .team-grids {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className={`team-page ${selectedMember ? "modal-open" : ""}`}>
            <div className="team-container">
              <div className="page-header">
                <h1 className="page-title">Meet Our Team</h1>
                <p className="page-subtitle">
                  Dedicated professionals committed to your mental health and well-being.
                </p>
              </div>

              {/* Founder Section - Big Horizontal Card */}
              {founder && (
                <div className="founder-section">
                  <h2 className="section-title">Founder</h2>
                  <div className="founder-card" onClick={() => handleMemberClick(founder)}>
                    <div className="founder-image-container">
                      <img src={founder.image} alt={founder.name} className="founder-image" onError={(e) => (e.target.src = defaultImage)} />
                      <div className="founder-badge">Founder</div>
                    </div>
                    <div className="founder-info">
                      <h2 className="founder-name">{founder.name}</h2>
                      <p className="founder-profession">{founder.profession}</p>
                      <p className="founder-specialization">{founder.specialization}</p>
                      <p className="founder-bio">{founder.bio}</p>
                      <div className="founder-contact">
                        {founder.email && (
                          <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span>{founder.email}</span>
                          </div>
                        )}
                        {founder.phone && (
                          <div className="contact-item">
                            <span className="contact-icon">📞</span>
                            <span>{founder.phone}</span>
                          </div>
                        )}
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
                      <div key={member.id} className="team-card" onClick={() => handleMemberClick(member)}>
                        <div className="image-container">
                          <img src={member.image} alt={member.name} className="member-image" onError={(e) => (e.target.src = defaultImage)} />
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

              {/* Junior Doctors Section */}
              {juniorDoctors.length > 0 && (
                <div className="team-section">
                  <h2 className="section-title">Our Team</h2>
                  <div className="team-grids">
                    {juniorDoctors.map((member) => (
                      <div key={member.id} className="team-card" onClick={() => handleMemberClick(member)}>
                        <div className="image-container">
                          <img src={member.image} alt={member.name} className="member-image" onError={(e) => (e.target.src = defaultImage)} />
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
                  <img src={selectedMember.image} alt={selectedMember.name} className="modal-image" onError={(e) => (e.target.src = defaultImage)} />
                  <div className="modal-info">
                    <h2 className="modal-name">{selectedMember.name}</h2>
                    <p className="modal-profession">{selectedMember.profession}</p>
                    <p className="modal-specialization">{selectedMember.specialization}</p>
                    <p className="modal-bio">{selectedMember.bio}</p>
                    <div className="contact-info">
                      {selectedMember.email && (
                        <div className="contact-item">
                          <div className="contact-icon">📧</div>
                          <span className="contact-text">{selectedMember.email}</span>
                        </div>
                      )}
                      {selectedMember.phone && (
                        <div className="contact-item">
                          <div className="contact-icon">📞</div>
                          <span className="contact-text">{selectedMember.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default TeamPage;