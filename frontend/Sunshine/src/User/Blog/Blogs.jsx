import React, { useState } from 'react';

const BlogPage = () => {
  // Dynamic blog data - easily add more blogs
  const [blogs] = useState([
    {
      id: 1,
      title: 'Understanding Anxiety: A Comprehensive Guide',
      excerpt: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can impact your daily life. Learn about the signs, symptoms, and effective coping strategies.',
      author: 'Dr. Hemant Sonanis',
      authorRole: 'Psychiatrist',
      date: 'Nov 10, 2024',
      readTime: '8 min read',
      category: 'Mental Health',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop',
      tags: ['Anxiety', 'Mental Health', 'Coping Strategies']
    },
    {
      id: 2,
      title: 'The Power of Mindfulness in Daily Life',
      excerpt: 'Discover how mindfulness practices can transform your mental well-being and help you live more fully in the present moment.',
      author: 'Ms. Anjali Deshmukh',
      authorRole: 'Counseling Psychologist',
      date: 'Nov 8, 2024',
      readTime: '6 min read',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
      tags: ['Mindfulness', 'Wellness', 'Meditation']
    },
    {
      id: 3,
      title: 'Supporting Children Through Emotional Challenges',
      excerpt: 'As parents and caregivers, understanding how to support children through emotional difficulties is crucial for their development and well-being.',
      author: 'Mr. Rahul Patil',
      authorRole: 'Clinical Psychologist',
      date: 'Nov 5, 2024',
      readTime: '10 min read',
      category: 'Child Psychology',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
      tags: ['Child Psychology', 'Parenting', 'Emotional Health']
    },
    {
      id: 4,
      title: 'Breaking the Stigma: Mental Health Awareness',
      excerpt: 'Mental health is just as important as physical health. Let\'s break the stigma and create a supportive environment for those seeking help.',
      author: 'Dr. Priya Sharma',
      authorRole: 'Clinical Psychologist',
      date: 'Nov 3, 2024',
      readTime: '7 min read',
      category: 'Awareness',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
      tags: ['Mental Health', 'Awareness', 'Stigma']
    },
    {
      id: 5,
      title: 'Cognitive Behavioral Therapy: What to Expect',
      excerpt: 'CBT is one of the most effective forms of therapy. Learn what happens in a typical session and how it can help you overcome challenges.',
      author: 'Ms. Neha Kulkarni',
      authorRole: 'Psychologist',
      date: 'Nov 1, 2024',
      readTime: '9 min read',
      category: 'Therapy',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      tags: ['CBT', 'Therapy', 'Treatment']
    },
    {
      id: 6,
      title: 'Building Resilience in Difficult Times',
      excerpt: 'Resilience is the ability to bounce back from adversity. Discover practical strategies to build your mental and emotional resilience.',
      author: 'Mr. Vikram Joshi',
      authorRole: 'Counselor',
      date: 'Oct 28, 2024',
      readTime: '7 min read',
      category: 'Self-Help',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
      tags: ['Resilience', 'Self-Help', 'Coping']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBlogClick = (blog) => {
    console.log('Blog clicked:', blog.title);
    alert(`Opening: ${blog.title}`);
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

        /* Featured Post */
        .featured-section {
          margin-bottom: 50px;
          animation: fadeInUp 0.8s ease-out 0.4s backwards;
        }

        .featured-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        /* Responsive */
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
            {/* <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search blogs by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div> */}
            
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
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="blog-card"
                  onClick={() => handleBlogClick(blog)}
                >
                  <div className="blog-image-container">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="blog-image"
                    />
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
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>

                    <div className="blog-footer">
                      <div className="blog-author">
                        <span className="author-name">{blog.author}</span>
                        <span className="author-role">{blog.authorRole}</span>
                      </div>
                      <button className="read-more-btn">Read More →</button>
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
      </div>
    </>
  );
};

export default BlogPage;