import React, { useState, useEffect } from 'react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Real API call
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/list`, {
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
          const transformedBlogs = data.error.map(blog => ({
            id: blog.id,
            title: blog.heading,
            excerpt: blog.description ? blog.description.substring(0, 150) + '...' : 'No description available',
            author: 'Sunshine MindCare Team',
            authorRole: 'Mental Health Professionals',
            date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Recent',
            readTime: '5 min read',
            category: blog.category || 'Mental Health',
            image: `${import.meta.env.VITE_BACKEND_URL}/${blog.image}`,
            tags: [blog.category || 'Mental Health', 'Wellness'],
            created_at: blog.created_at,
            description: blog.description,
            fullContent: blog.description || 'No content available for this blog post.'
          }));
          
          setBlogs(transformedBlogs);
        } else {
          throw new Error(data.message || 'Failed to fetch blogs');
        }
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message);
        // Fallback to empty array if API fails
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from API data
  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  const handleShareBlog = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${blog.title} - ${window.location.href}`);
      alert('Blog link copied to clipboard!');
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  if (loading) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <div className="blog-hero">
            <h1 className="blog-hero-title">Our Blog</h1>
            <p className="blog-hero-subtitle">
              Expert insights, mental health tips, and inspiring stories to support 
              your journey towards wellness and personal growth
            </p>
          </div>
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="blog-container">
          <div className="blog-hero">
            <h1 className="blog-hero-title">Our Blog</h1>
            <p className="blog-hero-subtitle">
              Expert insights, mental health tips, and inspiring stories to support 
              your journey towards wellness and personal growth
            </p>
          </div>
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Blogs</h3>
            <p>{error}</p>
            <button 
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .blog-page {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 80px 20px 60px;
        }

        .blog-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Hero Section */
        .blog-hero {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInUp 0.8s ease-out;
        }

        .blog-hero-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .blog-hero-subtitle {
          font-size: 1.3rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        /* Search and Filter Section */
        .filter-section {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          margin-bottom: 50px;
          animation: slideInLeft 0.8s ease-out 0.2s backwards;
        }

        .search-bar {
          margin-bottom: 25px;
        }

        .search-input {
          width: 100%;
          max-width: 500px;
          padding: 15px 25px;
          border: 2px solid #e0e0e0;
          border-radius: 25px;
          font-size: 1rem;
          transition: all 0.3s ease;
          margin: 0 auto;
          display: block;
        }

        .search-input:focus {
          outline: none;
          border-color: #3567c3;
          box-shadow: 0 0 0 3px rgba(53, 103, 195, 0.1);
        }

        .category-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-btn {
          padding: 10px 25px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          color: white;
          border-color: transparent;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 35px;
          margin-bottom: 40px;
        }

        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          animation: scaleIn 0.6s ease-out backwards;
        }

        .blog-card:nth-child(1) { animation-delay: 0.1s; }
        .blog-card:nth-child(2) { animation-delay: 0.2s; }
        .blog-card:nth-child(3) { animation-delay: 0.3s; }
        .blog-card:nth-child(4) { animation-delay: 0.4s; }
        .blog-card:nth-child(5) { animation-delay: 0.5s; }
        .blog-card:nth-child(6) { animation-delay: 0.6s; }

        .blog-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
        }

        .blog-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .blog-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .blog-image {
          transform: scale(1.1);
        }

        .blog-category-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .blog-content {
          padding: 30px;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 0.85rem;
          color: #999;
        }

        .blog-date,
        .blog-read-time {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .blog-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 15px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-excerpt {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.7;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .blog-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .author-role {
          font-size: 0.85rem;
          color: #999;
        }

        .blog-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .tag {
          background: #f0f0f0;
          color: #667eea;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .read-more-btn {
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .read-more-btn:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        /* Blog Detail Modal - FIXED SIZE AND ALIGNMENT */
        .blog-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .blog-modal {
          background: white;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 85vh;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.4s ease-out;
          display: flex;
          flex-direction: column;
        }

        .modal-close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.9);
          color: #2c3e50;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .modal-close-btn:hover {
          background: #3567c3;
          color: white;
          transform: scale(1.1);
        }

        .modal-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-content-wrapper {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }

        .modal-header {
          margin-bottom: 25px;
        }

        .modal-category {
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          color: white;
          padding: 6px 18px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 15px;
          letter-spacing: 0.5px;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .modal-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          color: #666;
          font-size: 0.9rem;
          flex-wrap: wrap;
        }

        .modal-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-meta-item i {
          color: #3567c3;
          font-size: 0.9rem;
        }

        .modal-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 25px;
          white-space: pre-line;
        }

        .modal-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 25px;
          align-items: center;
        }

        .modal-tags-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .modal-tag {
          background: #f0f0f0;
          color: #667eea;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .share-btn {
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          color: #666;
          padding: 10px 22px;
          border-radius: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .share-btn:hover {
          background: #3567c3;
          color: white;
          border-color: #3567c3;
        }

        /* Image Fallback */
        .image-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          width: 100%;
          height: 100%;
          color: white;
        }

        /* Loading State */
        .loading-state {
          text-align: center;
          padding: 60px 20px;
          animation: fadeInUp 0.6s ease-out;
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
        .error-state {
          text-align: center;
          padding: 60px 20px;
          animation: fadeInUp 0.6s ease-out;
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .error-state h3 {
          color: #dc3545;
          margin-bottom: 1rem;
        }

        .error-state p {
          color: #666;
          margin-bottom: 2rem;
        }

        .retry-btn {
          background: linear-gradient(45deg, #dc3545, #e35d6a);
          border: none;
          padding: 12px 30px;
          font-weight: 600;
          border-radius: 25px;
          color: white;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 60px 20px;
          animation: fadeInUp 0.6s ease-out;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        .no-results-text {
          font-size: 1.5rem;
          color: #666;
          font-weight: 600;
        }

        /* Modal Scrollbar */
        .modal-content-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-content-wrapper::-webkit-scrollbar-thumb {
          background: #c3cfe2;
          border-radius: 10px;
        }

        .modal-content-wrapper::-webkit-scrollbar-thumb:hover {
          background: #a8b4d0;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
          }

          .blog-hero-title {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .blog-page {
            padding: 60px 15px 40px;
          }

          .blog-hero-title {
            font-size: 2.5rem;
          }

          .blog-hero-subtitle {
            font-size: 1.1rem;
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }

          .filter-section {
            padding: 20px;
          }

          .category-filters {
            gap: 10px;
          }

          .category-btn {
            padding: 8px 18px;
            font-size: 0.85rem;
          }

          /* Mobile Modal */
          .blog-modal {
            max-width: 95%;
            max-height: 90vh;
          }

          .modal-image-container {
            height: 250px;
          }

          .modal-content-wrapper {
            padding: 25px;
          }

          .modal-title {
            font-size: 1.6rem;
          }

          .modal-meta {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .blog-hero-title {
            font-size: 2rem;
          }

          .blog-content {
            padding: 20px;
          }

          .blog-title {
            font-size: 1.3rem;
          }

          .blog-footer {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          /* Small Mobile Modal */
          .blog-modal {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
            margin: 0;
          }

          .modal-image-container {
            height: 200px;
          }

          .modal-content-wrapper {
            padding: 20px;
          }

          .modal-title {
            font-size: 1.4rem;
          }

          .modal-category {
            font-size: 0.8rem;
            padding: 5px 15px;
          }

          .modal-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .share-btn {
            width: 100%;
            justify-content: center;
          }

          .modal-close-btn {
            width: 35px;
            height: 35px;
            top: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="blog-page">
        <div className="blog-container">
          {/* Hero Section */}
          <div className="blog-hero">
            <h1 className="blog-hero-title">Our Blog</h1>
            <p className="blog-hero-subtitle">
              Expert insights, mental health tips, and inspiring stories to support 
              your journey towards wellness and personal growth
            </p>
          </div>

          {/* Search and Filter */}
          <div className="filter-section">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search blogs by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="blog-grid">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="blog-card"
                  onClick={() => handleBlogClick(blog)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="blog-image-container">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.image-fallback').style.display = 'flex';
                      }}
                    />
                    <div className="image-fallback" style={{ display: 'none' }}>
                      <i className="fas fa-image" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <div className="blog-category-badge">{blog.category}</div>
                  </div>

                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-date">📅 {blog.date}</span>
                      <span>•</span>
                      <span className="blog-read-time">⏱️ {blog.readTime}</span>
                    </div>

                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>

                    <div className="blog-tags">
                      {blog.tags && blog.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="blog-footer">
                      <div className="blog-author">
                        <span className="author-name">{blog.author}</span>
                        <span className="author-role">{blog.authorRole}</span>
                      </div>
                      <button 
                        className="read-more-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlogClick(blog);
                        }}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p className="no-results-text">No blogs found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Blog Detail Modal - PROPERLY SIZED AND ALIGNED */}
        {showModal && selectedBlog && (
          <div className="blog-modal-overlay" onClick={handleCloseModal}>
            <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
              
              {/* Fixed size image */}
              <div className="modal-image-container">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="modal-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.image-fallback').style.display = 'flex';
                  }}
                />
                <div className="image-fallback" style={{ display: 'none', fontSize: '3rem' }}>
                  <i className="fas fa-image"></i>
                </div>
              </div>

              {/* Content wrapper with proper alignment */}
              <div className="modal-content-wrapper">
                <div className="modal-header">
                  <div className="modal-category">{selectedBlog.category}</div>
                  <h1 className="modal-title">{selectedBlog.title}</h1>
                  <div className="modal-meta">
                    <div className="modal-meta-item">
                      <i className="fas fa-user"></i>
                      <span>{selectedBlog.author}</span>
                    </div>
                    <div className="modal-meta-item">
                      <i className="fas fa-calendar"></i>
                      <span>{selectedBlog.date}</span>
                    </div>
                    <div className="modal-meta-item">
                      <i className="fas fa-clock"></i>
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-description">
                  {selectedBlog.fullContent}
                </div>

                <div className="modal-tags">
                  <span className="modal-tags-label">Tags:</span>
                  {selectedBlog.tags && selectedBlog.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="modal-tag">{tag}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <button 
                    className="share-btn"
                    onClick={() => handleShareBlog(selectedBlog)}
                  >
                    <i className="fas fa-share-alt"></i>
                    Share This Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;