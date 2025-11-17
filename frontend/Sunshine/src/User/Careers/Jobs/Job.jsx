import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState({
        department: '',
        type: '',
        experience: ''
    });

    // Mock data - Replace with API call
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                
                const mockJobs = [
                    {
                        id: 1,
                        title: "Clinical Psychologist",
                        department: "Clinical",
                        type: "Full-time",
                        experience: "3-5 years",
                        location: "Mumbai, India",
                        salary: "₹8-12 LPA",
                        description: "We are seeking a licensed Clinical Psychologist to join our team. The ideal candidate will have experience in therapeutic interventions and psychological assessments.",
                        requirements: [
                            "PhD or PsyD in Clinical Psychology",
                            "Valid license to practice",
                            "Experience with CBT, DBT, and other therapeutic modalities",
                            "Strong assessment and diagnostic skills"
                        ],
                        postedDate: "2024-01-15",
                        applyLink: "#",
                        featured: true
                    },
                    {
                        id: 2,
                        title: "Counseling Psychologist",
                        department: "Counseling",
                        type: "Full-time",
                        experience: "2-4 years",
                        location: "Delhi, India",
                        salary: "₹6-9 LPA",
                        description: "Join our counseling team to provide individual and group therapy sessions. Help clients navigate life challenges and mental health concerns.",
                        requirements: [
                            "Master's in Counseling Psychology",
                            "2+ years of counseling experience",
                            "Empathic and compassionate approach",
                            "Excellent communication skills"
                        ],
                        postedDate: "2024-01-12",
                        applyLink: "#",
                        featured: false
                    },
                    {
                        id: 3,
                        title: "Intern - Psychology",
                        department: "Training",
                        type: "Internship",
                        experience: "0-1 years",
                        location: "Bangalore, India",
                        salary: "Stipend Provided",
                        description: "Perfect opportunity for psychology students to gain hands-on experience in a clinical setting under expert supervision.",
                        requirements: [
                            "Currently pursuing Psychology degree",
                            "Strong interest in clinical work",
                            "Willingness to learn and grow",
                            "Good observational skills"
                        ],
                        postedDate: "2024-01-10",
                        applyLink: "#",
                        featured: true
                    },
                    {
                        id: 4,
                        title: "Mental Health Counselor",
                        department: "Counseling",
                        type: "Part-time",
                        experience: "1-3 years",
                        location: "Hyderabad, India",
                        salary: "₹4-6 LPA",
                        description: "Provide mental health counseling services to individuals and groups. Flexible part-time position with remote options.",
                        requirements: [
                            "Master's in Psychology or related field",
                            "Counseling certification preferred",
                            "Experience with teletherapy",
                            "Flexible schedule availability"
                        ],
                        postedDate: "2024-01-08",
                        applyLink: "#",
                        featured: false
                    },
                    {
                        id: 5,
                        title: "Research Psychologist",
                        department: "Research",
                        type: "Full-time",
                        experience: "4-6 years",
                        location: "Pune, India",
                        salary: "₹10-15 LPA",
                        description: "Lead research projects in mental health interventions. Collaborate with clinical team to implement evidence-based practices.",
                        requirements: [
                            "PhD in Psychology with research focus",
                            "Published research papers",
                            "Experience with statistical analysis",
                            "Strong analytical skills"
                        ],
                        postedDate: "2024-01-05",
                        applyLink: "#",
                        featured: true
                    },
                    {
                        id: 6,
                        title: "Child Psychologist",
                        department: "Pediatric",
                        type: "Full-time",
                        experience: "3-5 years",
                        location: "Chennai, India",
                        salary: "₹7-11 LPA",
                        description: "Specialize in child and adolescent psychology. Work with young clients and their families to address developmental and emotional concerns.",
                        requirements: [
                            "Specialization in Child Psychology",
                            "Experience with play therapy",
                            "Patience and creativity",
                            "Family therapy experience"
                        ],
                        postedDate: "2024-01-03",
                        applyLink: "#",
                        featured: false
                    }
                ];

                // Simulate API delay
                setTimeout(() => {
                    setJobs(mockJobs);
                    setLoading(false);
                }, 1500);
                
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const departments = [...new Set(jobs.map(job => job.department))];
    const jobTypes = [...new Set(jobs.map(job => job.type))];
    const experienceLevels = [...new Set(jobs.map(job => job.experience))];

    const filteredJobs = jobs.filter(job => {
        return (
            (!filters.department || job.department === filters.department) &&
            (!filters.type || job.type === filters.type) &&
            (!filters.experience || job.experience === filters.experience)
        );
    });

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            department: '',
            type: '',
            experience: ''
        });
    };

    if (loading) {
        return (
            <div className="jobs-loading">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-animation">
                                <div className="pulse-loader">
                                    <div className="pulse-dot dot-1"></div>
                                    <div className="pulse-dot dot-2"></div>
                                    <div className="pulse-dot dot-3"></div>
                                </div>
                                <p>Loading career opportunities...</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="job-opportunities-page">
            {/* Animated Background */}
            <div className="jobs-background">
                <div className="floating-career career-1">💼</div>
                <div className="floating-career career-2">🧠</div>
                <div className="floating-career career-3">🌟</div>
                <div className="floating-career career-4">⚡</div>
            </div>

            {/* Hero Section */}
            <section className="jobs-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="hero-content">
                                <h1 className="hero-title animate-typing">
                                    Join Our Mission
                                </h1>
                                <p className="hero-subtitle animate-fade-in">
                                    Build your career while making a difference in mental healthcare. 
                                    Explore opportunities to grow with Sunshine Counseling.
                                </p>
                                <div className="hero-divider"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Filters Section */}
            <section className="filters-section py-4">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={3}>
                            <h3 className="filters-title">Filter Opportunities</h3>
                        </Col>
                        <Col lg={9}>
                            <div className="filters-container">
                                <div className="filter-group">
                                    <select 
                                        value={filters.department}
                                        onChange={(e) => handleFilterChange('department', e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Departments</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <select 
                                        value={filters.type}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Job Types</option>
                                        {jobTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <select 
                                        value={filters.experience}
                                        onChange={(e) => handleFilterChange('experience', e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="">All Experience Levels</option>
                                        {experienceLevels.map(exp => (
                                            <option key={exp} value={exp}>{exp}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={clearFilters} className="clear-filters-btn">
                                    Clear Filters
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Jobs Grid */}
            <section className="jobs-grid py-5">
                <Container>
                    <Row className="g-4">
                        {filteredJobs.map((job, index) => (
                            <Col key={job.id} lg={6} className="mb-4">
                                <div 
                                    className={`job-card ${job.featured ? 'featured' : ''} animate-card`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => handleJobClick(job)}
                                >
                                    <Card className="h-100">
                                        <Card.Body className="p-4">
                                            {/* {job.featured && (
                                                <div className="featured-badge">
                                                    <span>⭐ Featured</span>
                                                </div>
                                            )} */}
                                            <div className="job-header">
                                                <h3 className="job-title">{job.title}</h3>
                                                <div className="salary-badge">{job.salary}</div>
                                            </div>
                                            
                                            <div className="job-meta">
                                                <div className="meta-item">
                                                    <span className="meta-icon">🏢</span>
                                                    <span>{job.department}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-icon">⏱️</span>
                                                    <span>{job.type}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-icon">📅</span>
                                                    <span>{job.experience}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <span className="meta-icon">📍</span>
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>

                                            <p className="job-description">
                                                {job.description}
                                            </p>

                                            <div className="job-requirements">
                                                <strong>Key Requirements:</strong>
                                                <div className="requirements-list">
                                                    {job.requirements.slice(0, 3).map((req, idx) => (
                                                        <span key={idx} className="requirement-tag">
                                                            {req}
                                                        </span>
                                                    ))}
                                                    {job.requirements.length > 3 && (
                                                        <span className="requirement-tag more">
                                                            +{job.requirements.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="job-footer">
                                                <div className="posted-date">
                                                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                                                </div>
                                                <button className="view-details-btn">
                                                    View Details →
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {/* Empty State */}
                    {filteredJobs.length === 0 && (
                        <Row className="justify-content-center">
                            <Col lg={6} className="text-center">
                                <div className="no-jobs-found">
                                    <div className="empty-icon">🔍</div>
                                    <h3>No Jobs Found</h3>
                                    <p>Try adjusting your filters or check back later for new opportunities.</p>
                                    <button onClick={clearFilters} className="reset-filters-btn">
                                        Reset Filters
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* CTA Section */}
            {/* <section className="jobs-cta py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="cta-content">
                                <h2>Can't Find Your Perfect Role?</h2>
                                <p>We're always looking for talented mental health professionals. Send us your resume and we'll contact you when matching positions open.</p>
                                <button className="cta-button">
                                    Submit Your Resume
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}

            {/* Job Detail Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg" 
                centered
                className="job-modal"
            >
                {selectedJob && (
                    <>
                        <Modal.Header closeButton>
                            {/* <div className="modal-header-content">
                                <Modal.Title>{selectedJob.title}</Modal.Title>
                                {selectedJob.featured && (
                                    <Badge bg="warning" className="featured-badge-modal">
                                        Featured
                                    </Badge>
                                )}
                            </div> */}
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-content">
                                <div className="job-overview">
                                    <div className="overview-grid">
                                        <div className="overview-item">
                                            <span className="overview-label">Department:</span>
                                            <span className="overview-value">{selectedJob.department}</span>
                                        </div>
                                        <div className="overview-item">
                                            <span className="overview-label">Job Type:</span>
                                            <span className="overview-value">{selectedJob.type}</span>
                                        </div>
                                        <div className="overview-item">
                                            <span className="overview-label">Experience:</span>
                                            <span className="overview-value">{selectedJob.experience}</span>
                                        </div>
                                        <div className="overview-item">
                                            <span className="overview-label">Location:</span>
                                            <span className="overview-value">{selectedJob.location}</span>
                                        </div>
                                        <div className="overview-item">
                                            <span className="overview-label">Salary:</span>
                                            <span className="overview-value salary">{selectedJob.salary}</span>
                                        </div>
                                        <div className="overview-item">
                                            <span className="overview-label">Posted:</span>
                                            <span className="overview-value">
                                                {new Date(selectedJob.postedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="job-description-section">
                                    <h4>Job Description</h4>
                                    <p>{selectedJob.description}</p>
                                </div>

                                <div className="job-requirements-section">
                                    <h4>Requirements</h4>
                                    <ul className="requirements-list-modal">
                                        {selectedJob.requirements.map((req, idx) => (
                                            <li key={idx}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button 
                                variant="primary" 
                                href={selectedJob.applyLink}
                                target="_blank"
                                className="apply-now-btn"
                            >
                                Apply Now
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>

            <style jsx>{`
                .job-opportunities-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .jobs-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-career {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.1;
                    animation: floatCareer 8s ease-in-out infinite;
                }

                .career-1 {
                    top: 15%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .career-2 {
                    top: 60%;
                    right: 10%;
                    animation-delay: 2s;
                }

                .career-3 {
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .career-4 {
                    top: 30%;
                    right: 20%;
                    animation-delay: 1s;
                }

                @keyframes floatCareer {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                    }
                    33% {
                        transform: translateY(-20px) rotate(120deg) scale(1.2);
                    }
                    66% {
                        transform: translateY(10px) rotate(240deg) scale(0.8);
                    }
                }

                /* Hero Section */
                .jobs-hero {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    z-index: 1;
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    background: linear-gradient(45deg, #ffffff, #ffb399);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .animate-typing {
                    animation: typing 2.5s steps(30, end), blink-caret 0.75s step-end infinite;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 3px solid #ff6b35;
                }

                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #ff6b35 }
                }

                .hero-subtitle {
                    font-size: 1.3rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-out 1s forwards;
                }

                .hero-divider {
                    width: 100px;
                    height: 4px;
                    background: #ff6b35;
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 1.5s forwards;
                    transform-origin: left;
                }

                /* Filters Section */
                .filters-section {
                    background: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 1;
                }

                .filters-title {
                    color: #2a5298;
                    font-weight: 700;
                    margin: 0;
                }

                .filters-container {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .filter-group {
                    flex: 1;
                    min-width: 150px;
                }

                .filter-select {
                    width: 100%;
                    padding: 10px 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 8px;
                    background: white;
                    color: #495057;
                    transition: all 0.3s ease;
                }

                .filter-select:focus {
                    outline: none;
                    border-color: #2a5298;
                    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
                }

                .clear-filters-btn {
                    background: transparent;
                    border: 2px solid #ff6b35;
                    color: #ff6b35;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .clear-filters-btn:hover {
                    background: #ff6b35;
                    color: white;
                    transform: translateY(-2px);
                }

                /* Jobs Grid */
                .jobs-grid {
                    position: relative;
                    z-index: 1;
                }

                .job-card {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.6s ease-out;
                    cursor: pointer;
                }

                .job-card.animate-card {
                    animation: slideUp 0.6s ease-out forwards;
                }

                .job-card.featured .card {
                    border: 2px solid #ff6b35;
                    background: linear-gradient(135deg, #fff9f7 0%, #ffffff 100%);
                }

                .job-card .card {
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    background: white;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .job-card .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                }

                .featured-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
                    }
                }

                .job-header {
                    display: flex;
                    justify-content: between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .job-title {
                    color: #2a5298;
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin: 0;
                    flex: 1;
                    line-height: 1.3;
                }

                .salary-badge {
                    background: linear-gradient(45deg, #28a745, #20c997);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-left: 1rem;
                }

                .job-meta {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                .meta-icon {
                    font-size: 1rem;
                }

                .job-description {
                    color: #495057;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .job-requirements {
                    margin-bottom: 1.5rem;
                }

                .job-requirements strong {
                    color: #2a5298;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .requirements-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .requirement-tag {
                    background: #e9ecef;
                    color: #495057;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    border-left: 3px solid #2a5298;
                }

                .requirement-tag.more {
                    background: #ff6b35;
                    color: white;
                    border-left-color: #ff6b35;
                }

                .job-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                }

                .posted-date {
                    color: #6c757d;
                    font-size: 0.9rem;
                }

                .view-details-btn {
                    background: transparent;
                    border: 2px solid #2a5298;
                    color: #2a5298;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .view-details-btn:hover {
                    background: #2a5298;
                    color: white;
                    transform: translateX(5px);
                }

                /* Loading Animation */
                .jobs-loading {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loading-animation {
                    text-align: center;
                }

                .pulse-loader {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .pulse-dot {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: #2a5298;
                    animation: pulse-dot 1.5s ease-in-out infinite;
                }

                .dot-1 { animation-delay: 0s; }
                .dot-2 { animation-delay: 0.3s; }
                .dot-3 { animation-delay: 0.6s; }

                @keyframes pulse-dot {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.5);
                        opacity: 0.7;
                    }
                }

                /* Empty State */
                .no-jobs-found {
                    padding: 3rem 2rem;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }

                .no-jobs-found h3 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .no-jobs-found p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }

                .reset-filters-btn {
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    color: white;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .reset-filters-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
                }

                /* CTA Section */
                .jobs-cta {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                }

                .cta-content h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .cta-content p {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .cta-button {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 50px;
                    color: white;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                }

                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
                }

                /* Modal Styles */
                .job-modal .modal-content {
                    border-radius: 15px;
                    border: none;
                }

                .modal-header-content {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .featured-badge-modal {
                    font-size: 0.8rem;
                }

                .overview-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                }

                .overview-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .overview-label {
                    font-weight: 600;
                    color: #2a5298;
                }

                .overview-value {
                    color: #495057;
                }

                .overview-value.salary {
                    color: #28a745;
                    font-weight: 600;
                }

                .job-description-section,
                .job-requirements-section {
                    margin-bottom: 2rem;
                }

                .job-description-section h4,
                .job-requirements-section h4 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .requirements-list-modal {
                    list-style: none;
                    padding: 0;
                }

                .requirements-list-modal li {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e9ecef;
                    position: relative;
                    padding-left: 1.5rem;
                }

                .requirements-list-modal li:before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #28a745;
                    font-weight: bold;
                }

                .apply-now-btn {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 10px 25px;
                    font-weight: 600;
                    border-radius: 25px;
                }

                .apply-now-btn:hover {
                    background: linear-gradient(45deg, #e55a2b, #ff6b35);
                    transform: translateY(-2px);
                }

                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100px; }
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

                /* Responsive Design */
                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                        white-space: normal;
                        border-right: none;
                        animation: none;
                    }

                    .filters-container {
                        flex-direction: column;
                    }

                    .filter-group {
                        min-width: 100%;
                    }

                    .job-meta {
                        grid-template-columns: 1fr;
                    }

                    .overview-grid {
                        grid-template-columns: 1fr;
                    }

                    .job-header {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .salary-badge {
                        margin-left: 0;
                        align-self: flex-start;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .job-title {
                        font-size: 1.2rem;
                    }

                    .cta-content h2 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Job;