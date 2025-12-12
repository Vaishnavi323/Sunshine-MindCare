import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Internship = () => {
    const [visibleSections, setVisibleSections] = useState({});
    const sectionRefs = useRef({});

    const programData = {
        hero: {
            title: "Nurturing Future Psychologists",
            subtitle: "Sunshine Counseling and Therapy Centre Internship Program",
            description: "Embark on a developing four-week experience, blending observation, case analysis, and hands-on experience at Sunshine Counseling. Our structured program develops practical skills, imparts theoretical knowledge, and hones competencies for a successful psychology career. Engage in real-world scenarios, from history taking to clinical interviewing, emerging well-equipped for the dynamic field."
        },
        sections: [
            
            {
                id: 'structure',
                title: 'Program Structure',
                content: [
                    'Weeks 1-2: Emphasis on observation, case history taking, and understanding the center\'s working model.',
                    'Weeks 3-4: Hands-on experience in history taking, additional assignments (e.g., hypothetical case histories), testing and assessment sessions, with a focus on clinical interviewing.'
                ],
                icon: '📊',
                color: '#2a5298'
            },
            {
                id: 'objectives',
                title: 'Learning Objectives',
                content: [
                    'Develop practical skills in a clinical setting.',
                    'Gain theoretical knowledge relevant to psychology.',
                    'Acquire hands-on experience to foster a well-rounded understanding of the field.'
                ],
                icon: '🎯',
                color: '#ff6b35'
            },
            {
                id: 'approach',
                title: 'Staggered Approach',
                content: [
                    'Ensures effective learning by gradually introducing different aspects of the field.',
                    'Focus on observation and understanding in the initial weeks, followed by practical application.'
                ],
                icon: '📈',
                color: '#2a5298'
            },
            {
                id: 'skills',
                title: 'Skill and Competency Development',
                content: [
                    'Program designed to enhance various skills, including clinical interviewing, case history analysis, and testing.',
                    'Encourages the development of competencies necessary for a successful career in psychology.'
                ],
                icon: '💪',
                color: '#ff6b35'
            },
            {
                id: 'engagement',
                title: 'Student Engagement',
                content: [
                    'Opportunities for active participation through assignments like hypothetical case histories.',
                    'Exposure to the center\'s working model to understand its operational dynamics.'
                ],
                icon: '👥',
                color: '#2a5298'
            },
            {
                id: 'exposure',
                title: 'Comprehensive Exposure',
                content: [
                    'Aim to provide students with a holistic understanding of psychology within a clinical setting.',
                    'Balances practical skills, theoretical knowledge, and hands-on experience.'
                ],
                icon: '🔍',
                color: '#ff6b35'
            },
            {
                id: 'focus',
                title: 'Practical Focus',
                content: [
                    'Practical application of skills in real-world scenarios, preparing students for the challenges of the field.',
                    'Incorporates testing and assessment sessions for a well-rounded learning experience.'
                ],
                icon: '🛠️',
                color: '#2a5298'
            },
            {
                id: 'certificate',
                title: 'Certificate',
                content: 'When you successfully complete your internship you will be awarded with a certificate stating the same',
                icon: '🏆',
                color: '#ff6b35'
            }
        ]
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.3 }
        );

        Object.values(sectionRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const setSectionRef = (id) => (el) => {
        sectionRefs.current[id] = el;
    };

    return (
        <div className="internship-page">
            {/* Animated Background */}
            <div className="animated-background">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
                <div className="floating-shape shape-4"></div>
            </div>

            {/* Hero Section */}
            <section className="internship-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={10}>
                            <div className="hero-content">
                                <div className="title-container">
                                    <h1 className="hero-title animate-typing pt-5">
                                        {programData.hero.title}
                                    </h1>
                                </div>
                                <h2 className="hero-subtitle animate-slide-up">
                                    {programData.hero.subtitle}
                                </h2>
                                <div className="hero-divider"></div>
                                <p className="hero-description animate-fade-in">
                                    {programData.hero.description}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Program Sections */}
            <section className="program-sections py-5">
                <Container>
                    <Row className="g-4">
                        {programData.sections.map((section, index) => (
                            <Col key={section.id} lg={6} className="mb-4">
                                <div
                                    ref={setSectionRef(section.id)}
                                    id={section.id}
                                    className={`program-card ${visibleSections[section.id] ? 'visible' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Card className="h-100">
                                        <Card.Body className="p-4">
                                            <div className="card-header">
                                                <div 
                                                    className="icon-container"
                                                    style={{ backgroundColor: section.color }}
                                                >
                                                    <span className="icon">{section.icon}</span>
                                                </div>
                                                <h3 className="card-title">{section.title}</h3>
                                            </div>
                                            <div className="card-content">
                                                {Array.isArray(section.content) ? (
                                                    <ul className="content-list">
                                                        {section.content.map((item, idx) => (
                                                            <li key={idx} className="list-item">
                                                                <span className="bullet"></span>
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="content-text">{section.content}</p>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            

            <style jsx>{`
                .internship-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    position: relative;
                    overflow: hidden;
                }

                /* Animated Background */
                .animated-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .floating-shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float 6s ease-in-out infinite;
                }

                .shape-1 {
                    width: 100px;
                    height: 100px;
                    background: #ff6b35;
                    top: 10%;
                    left: 5%;
                    animation-delay: 0s;
                }

                .shape-2 {
                    width: 150px;
                    height: 150px;
                    background: #2a5298;
                    top: 60%;
                    right: 10%;
                    animation-delay: 2s;
                }

                .shape-3 {
                    width: 80px;
                    height: 80px;
                    background: #ff6b35;
                    bottom: 20%;
                    left: 15%;
                    animation-delay: 4s;
                }

                .shape-4 {
                    width: 120px;
                    height: 120px;
                    background: #2a5298;
                    top: 30%;
                    right: 20%;
                    animation-delay: 1s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                /* Hero Section */
                .internship-hero {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    z-index: 1;
                }

                .title-container {
                    overflow: hidden;
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
                    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
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
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    opacity: 0.9;
                }

                .animate-slide-up {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideUp 1s ease-out 1s forwards;
                }

                .hero-divider {
                    width: 100px;
                    height: 4px;
                    background: #ff6b35;
                    margin: 0 auto 2rem;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 1.5s forwards;
                    transform-origin: left;
                }

                .hero-description {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    opacity: 0.9;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-out 2s forwards;
                }

                /* Program Sections */
                .program-sections {
                    position: relative;
                    z-index: 1;
                }

                .program-card {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.6s ease-out;
                }

                .program-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .program-card .card {
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    background: white;
                    overflow: hidden;
                    position: relative;
                }

                .program-card .card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(45deg, #ff6b35, #2a5298);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }

                .program-card.visible .card::before {
                    transform: scaleX(1);
                }

                .program-card .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .icon-container {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    animation: bounceIn 1s ease-out;
                }

                .icon {
                    font-size: 1.5rem;
                    color: white;
                }

                .card-title {
                    color: #2a5298;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }

                .content-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .list-item {
                    position: relative;
                    padding: 0.5rem 0 0.5rem 2rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.6;
                    color: #495057;
                    animation: slideInLeft 0.5s ease-out forwards;
                    opacity: 0;
                }

                .program-card.visible .list-item {
                    animation-delay: calc(var(--animation-order) * 0.1s);
                }

                .list-item:nth-child(1) { --animation-order: 1; }
                .list-item:nth-child(2) { --animation-order: 2; }
                .list-item:nth-child(3) { --animation-order: 3; }

                .bullet {
                    position: absolute;
                    left: 0;
                    top: 0.8rem;
                    width: 8px;
                    height: 8px;
                    background: #ff6b35;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                .content-text {
                    color: #495057;
                    line-height: 1.7;
                    font-size: 1.1rem;
                    margin: 0;
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }

                .program-card.visible .content-text {
                    animation-delay: 0.3s;
                }

                /* CTA Section */
                .cta-section {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    z-index: 1;
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
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
                }

                .animate-pulse {
                    animation: pulse-glow 2s ease-in-out infinite;
                }

                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes expandWidth {
                    from { width: 0; }
                    to { width: 100px; }
                }

                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.7;
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(255, 107, 53, 0.8), 0 0 40px rgba(255, 107, 53, 0.6);
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

                    .hero-subtitle {
                        font-size: 1.3rem;
                    }

                    .hero-description {
                        font-size: 1.1rem;
                    }

                    .card-title {
                        font-size: 1.3rem;
                    }

                    .cta-content h2 {
                        font-size: 2rem;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .card-header {
                        flex-direction: column;
                        text-align: center;
                    }

                    .icon-container {
                        margin-right: 0;
                        margin-bottom: 1rem;
                    }

                    .cta-button {
                        padding: 12px 30px;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Internship;