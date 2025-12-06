import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublishedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    // Real API call
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/article/list`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.status) {
                    // Transform API data to match your component structure
                    const transformedArticles = data.error.map(article => ({
                        id: article.id,
                        title: `Article ${article.id}`,
                        newspaper: "Sunshine MindCare",
                        date: article.created_at,
                        image: `${import.meta.env.VITE_BACKEND_URL}/${article.image}`, 
                        originalImage: article.image
                    }));
                    
                    setArticles(transformedArticles);
                } else {
                    throw new Error(data.message || 'Failed to fetch articles');
                }
                
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError(error.message);
                // Fallback to empty array if API fails
                setArticles([]);
            } finally {
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

    if (error) {
        return (
            <div className="articles-error">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="error-icon">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <h3>Error Loading Articles</h3>
                            <p>{error}</p>
                            <button 
                                className="retry-btn"
                                onClick={() => window.location.reload()}
                            >
                                <i className="fas fa-redo"></i>
                                Try Again
                            </button>
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
                                            {/* Real newspaper image from API */}
                                            <div 
                                                className="newspaper-image"
                                                style={{ 
                                                    backgroundImage: `url(${article.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat'
                                                }}
                                            >
                                            <img src={article.image}/>
                                                <div className="image-overlay">
                                                    <div className="image-overlay-text">
                                                        <div className="newspaper-name">{article.newspaper}</div>
                                                        <div className="article-date">{formatDate(article.date)}</div>
                                                    </div>
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

                    {/* Load More Button - You can implement pagination later */}
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
            {articles.length === 0 && !loading && !error && (
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
                            <Modal.Title>Article {selectedArticle.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-content">
                                <div className="modal-image">
                                    <div 
                                        className="newspaper-image-modal"
                                        style={{ 
                                            backgroundImage: `url(${selectedArticle.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    >
                                    <img src={selectedArticle.image}/>
                                        <div className="image-overlay-modal">
                                            <div className="image-overlay-text-modal">
                                                <div className="newspaper-name">{selectedArticle.newspaper}</div>
                                                <div className="article-date">{formatDate(selectedArticle.date)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button 
                                        className="view-original-btn"
                                        onClick={() => window.open(selectedArticle.image, '_blank')}
                                    >
                                        <i className="fas fa-external-link-alt"></i>
                                        View Full Image
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
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    position: relative;
                    padding: 20px;
                }

                .image-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 100%);
                    padding: 20px;
                    color: white;
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
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-start;
                    position: relative;
                    padding: 30px;
                    border-radius: 10px;
                }

                .image-overlay-modal {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 100%);
                    padding: 30px;
                    color: white;
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

                /* Error State */
                .articles-error {
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .error-icon {
                    font-size: 4rem;
                    color: #dc3545;
                    margin-bottom: 1.5rem;
                }

                .articles-error h3 {
                    color: #dc3545;
                    margin-bottom: 1rem;
                }

                .articles-error p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }

                .retry-btn {
                    background: linear-gradient(45deg, #dc3545, #e35d6a);
                    border: none;
                    padding: 10px 25px;
                    font-weight: 600;
                    border-radius: 25px;
                    color: white;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 0 auto;
                }

                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
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