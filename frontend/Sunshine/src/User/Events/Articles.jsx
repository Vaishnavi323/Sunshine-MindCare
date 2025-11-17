import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublishedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Mock data - Replace this with your API call
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                
                // Mock data structure for published articles - only images
                const mockArticles = [
                    {
                        id: 1,
                        title: "Mental Health Awareness in Modern Society",
                        newspaper: "The Daily Times",
                        date: "2024-01-15",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 2,
                        title: "Breaking the Stigma: Talking About Mental Health",
                        newspaper: "Health Chronicle",
                        date: "2024-01-10",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 3,
                        title: "The Rise of Telepsychiatry During Pandemic",
                        newspaper: "Medical Gazette",
                        date: "2024-01-05",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 4,
                        title: "Mindfulness Practices for Daily Life",
                        newspaper: "Wellness Weekly",
                        date: "2023-12-20",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 5,
                        title: "Youth Mental Health Crisis: A Call to Action",
                        newspaper: "Education Today",
                        date: "2023-12-15",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 6,
                        title: "Corporate Wellness: Investing in Employee Mental Health",
                        newspaper: "Business Digest",
                        date: "2023-12-10",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 7,
                        title: "Traditional Healing Meets Modern Therapy",
                        newspaper: "Cultural Review",
                        date: "2023-12-05",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 8,
                        title: "The Science of Happiness and Well-being",
                        newspaper: "Science Journal",
                        date: "2023-11-28",
                        image: "/api/placeholder/400/500",
                    },
                    {
                        id: 9,
                        title: "Mental Health Legislation and Policy Changes",
                        newspaper: "Policy Watch",
                        date: "2023-11-20",
                        image: "/api/placeholder/400/500",
                    }
                ];

                // Simulate API delay
                setTimeout(() => {
                    setArticles(mockArticles);
                    setLoading(false);
                }, 1000);
                
            } catch (error) {
                console.error('Error fetching articles:', error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    if (loading) {
        return (
            <div className="articles-loading">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="loading-spinner"></div>
                            <p>Loading published articles...</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    return (
        <div className="published-articles-page">
            {/* Hero Section */}
            <section className="articles-hero py-5">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="hero-content animate-fade-in">
                                <h1 className="hero-title pt-5">Published Articles</h1>
                                <p className="hero-subtitle">
                                    Explore our featured articles published in leading newspapers and magazines worldwide.
                                </p>
                                <div className="hero-divider"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Articles Grid */}
            <section className="articles-grid py-5">
                <Container>
                    <Row className="g-4">
                        {articles.map((article, index) => (
                            <Col key={article.id} xl={4} lg={4} md={6} sm={12}>
                                <Card 
                                    className={`article-card animate-card`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => handleArticleClick(article)}
                                >
                                    <div className="card-image-container">
                                        <div className="article-image">
                                            {/* Newspaper image */}
                                            <div className="newspaper-image">
                                                <div className="image-overlay-text">
                                                    <div className="newspaper-name">{article.newspaper}</div>
                                                    <div className="article-date">{formatDate(article.date)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="article-overlay">
                                            <div className="overlay-content">
                                                <i className="fas fa-search-plus"></i>
                                                <span>View Article</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Load More Button */}
                    {articles.length > 0 && (
                        <Row className="mt-5">
                            <Col className="text-center">
                                <button className="load-more-btn">
                                    Load More Articles
                                </button>
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>

            {/* Empty State */}
            {articles.length === 0 && !loading && (
                <section className="empty-state py-5">
                    <Container>
                        <Row className="justify-content-center text-center">
                            <Col lg={6}>
                                <div className="empty-content">
                                    <div className="empty-icon">
                                        <i className="fas fa-newspaper"></i>
                                    </div>
                                    <h3>No Published Articles</h3>
                                    <p>There are no published articles to display at the moment.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}

            {/* Article Detail Modal */}
            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                size="lg" 
                centered
                className="article-modal"
            >
                {selectedArticle && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedArticle.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-content">
                                <div className="modal-image">
                                    <div className="newspaper-image-modal">
                                        <div className="image-overlay-text-modal">
                                            <div className="newspaper-name">{selectedArticle.newspaper}</div>
                                            <div className="article-date">{formatDate(selectedArticle.date)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button 
                                        className="view-original-btn"
                                        onClick={() => window.open('#', '_blank')}
                                    >
                                        <i className="fas fa-external-link-alt"></i>
                                        View Original Article
                                    </button>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>

            <style jsx>{`
                .published-articles-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                /* Hero Section */
                .articles-hero {
                    background: linear-gradient(135deg, #3567c3 0%, #2a5298 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .hero-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .hero-divider {
                    width: 80px;
                    height: 4px;
                    background: #ff6b35;
                    margin: 0 auto;
                    border-radius: 2px;
                    animation: expandWidth 1s ease-out 0.5s forwards;
                    transform-origin: left;
                }

                /* Animations */
                .animate-fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-out 0.3s forwards;
                }

                .animate-card {
                    opacity: 0;
                    transform: translateY(30px);
                    animation: slideUp 0.6s ease-out forwards;
                }

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
                    to { width: 80px; }
                }

                /* Article Card */
                .article-card {
                    border: none;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    background: white;
                    height: 100%;
                    overflow: hidden;
                    cursor: pointer;
                }

                .article-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                }

                .card-image-container {
                    position: relative;
                    height: 400px;
                    overflow: hidden;
                }

                .article-image {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: transform 0.3s ease;
                    position: relative;
                }

                .article-card:hover .article-image {
                    transform: scale(1.05);
                }

                /* Newspaper Image Style */
                .newspaper-image {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #8b9dc3 0%, #3b5998 100%);
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    position: relative;
                    padding: 20px;
                }

                .newspaper-image::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                    opacity: 0.3;
                }

                .image-overlay-text {
                    color: white;
                    text-align: left;
                }

                .newspaper-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 5px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }

                .article-date {
                    font-size: 1rem;
                    opacity: 0.9;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                }

                /* Overlay Effect */
                .article-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(42, 82, 152, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    color: white;
                }

                .article-card:hover .article-overlay {
                    opacity: 1;
                }

                .overlay-content {
                    text-align: center;
                }

                .overlay-content i {
                    font-size: 2rem;
                    margin-bottom: 10px;
                    display: block;
                }

                .overlay-content span {
                    font-size: 1rem;
                    font-weight: 600;
                }

                /* Modal Styles */
                .article-modal .modal-content {
                    border-radius: 15px;
                    border: none;
                }

                .modal-image {
                    margin-bottom: 20px;
                }

                .newspaper-image-modal {
                    width: 100%;
                    height: 500px;
                    background: linear-gradient(135deg, #8b9dc3 0%, #3b5998 100%);
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    position: relative;
                    padding: 30px;
                    border-radius: 10px;
                }

                .newspaper-image-modal::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
                    opacity: 0.3;
                }

                .image-overlay-text-modal {
                    color: white;
                    text-align: left;
                    position: relative;
                    z-index: 2;
                }

                .modal-actions {
                    text-align: center;
                }

                .view-original-btn {
                    background: linear-gradient(45deg, #ff6b35, #ff8e53);
                    border: none;
                    padding: 12px 30px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0 auto;
                }

                .view-original-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
                }

                /* Load More Button */
                .load-more-btn {
                    background: linear-gradient(45deg, #2a5298, #1e3c72);
                    border: none;
                    padding: 12px 40px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .load-more-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(42, 82, 152, 0.3);
                    background: linear-gradient(45deg, #1e3c72, #2a5298);
                }

                /* Loading State */
                .articles-loading {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2a5298;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Empty State */
                .empty-state {
                    text-align: center;
                }

                .empty-icon {
                    font-size: 4rem;
                    color: #6c757d;
                    margin-bottom: 1.5rem;
                }

                .empty-content h3 {
                    color: #2a5298;
                    margin-bottom: 1rem;
                }

                .empty-content p {
                    color: #6c757d;
                    font-size: 1.1rem;
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .card-image-container {
                        height: 350px;
                    }

                    .newspaper-image-modal {
                        height: 400px;
                        padding: 20px;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 1.8rem;
                    }

                    .card-image-container {
                        height: 300px;
                    }

                    .newspaper-name {
                        font-size: 1.3rem;
                    }

                    .article-date {
                        font-size: 0.9rem;
                    }

                    .newspaper-image-modal {
                        height: 300px;
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PublishedArticles;