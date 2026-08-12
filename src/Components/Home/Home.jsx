import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';
import homeimg from '../../images/home-img.jpg';
import imagenotfound from '../../images/image-not-found.png';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Fetch general news from API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=6&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNews(data.articles);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observers = {};
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.15 }
      );
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]);
      }
    });

    return () => {
      Object.keys(observers).forEach((key) => {
        if (observers[key]) observers[key].disconnect();
      });
    };
  }, []);

  const newsCategories = [
    { name: "Business", icon: "fas fa-chart-line", path: "/business", color: "#2ecc71" },
    { name: "Technology", icon: "fas fa-microchip", path: "/technology", color: "#3498db" },
    { name: "Entertainment", icon: "fas fa-film", path: "/entertainment", color: "#e74c3c" },
    { name: "Health", icon: "fas fa-heartbeat", path: "/health", color: "#e67e22" },
    { name: "Science", icon: "fas fa-flask", path: "/science", color: "#9b59b6" },
    { name: "Sports", icon: "fas fa-running", path: "/sports", color: "#1abc9c" },
    { name: "General", icon: "fas fa-newspaper", path: "/general", color: "#34495e" }
  ];

  // Format published date
  const formatPublished = (publishedAt) => {
    if (!publishedAt) return null;
    const diffMs = Date.now() - new Date(publishedAt).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results or filter news
      const filtered = news.filter(article => 
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        setNews(filtered);
      }
    }
  };

  // Retry fetch
  const handleRetry = () => {
    fetchNews();
  };

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className={styles.errorIcon}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="text-danger mt-3">{error}</p>
        <button className={styles.retryButton} onClick={handleRetry}>
          <i className="fas fa-sync-alt"></i> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`row align-items-center ${styles.heroContent}`}>
            <div className="col-lg-6">
              <div className={styles.heroText}>
                <span className={styles.heroBadge}>
                  <i className="fas fa-bolt"></i> Breaking News
                </span>
                <h1 className={styles.homeTitle}>
                  Stay Informed with <span>NewsHub</span>
                </h1>
                <p className={styles.homeSubtitle}>
                  Your trusted source for the latest news, trends, and insights 
                  in the United States and around the world.
                </p>
                <form className={styles.homeSearch} onSubmit={handleSearch}>
                  <input 
                    type="text" 
                    placeholder="Search for news..." 
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className={styles.searchButton}>
                    <i className="fas fa-search"></i>
                  </button>
                </form>
                <div className={styles.trustBadges}>
                  <div>
                    <i className="fas fa-check-circle"></i>
                    <span>Trusted Source</span>
                  </div>
                  <div>
                    <i className="fas fa-clock"></i>
                    <span>24/7 Coverage</span>
                  </div>
                  <div>
                    <i className="fas fa-globe"></i>
                    <span>Global News</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.homeImageWrapper}>
                <div className={styles.homeImage}>
                  <img src={homeimg} alt="News reading" />
                  <div className={styles.imageBadge}>
                    <i className="fas fa-play"></i> Watch Live
                  </div>
                </div>
                <div className={styles.floatingStats}>
                  <div className={styles.floatingStat}>
                    <span className={styles.statNumber}>100k+</span>
                    <span>Daily Readers</span>
                  </div>
                  <div className={styles.floatingStat}>
                    <span className={styles.statNumber}>50+</span>
                    <span>Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        className={`${styles.categories} ${isVisible.categories ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.categories = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Explore</span>
            <h2 className={styles.sectionTitle}>
              News <span className={styles.highlight}>Categories</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className="row">
            {newsCategories.map((category, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <Link to={category.path} className={styles.categoryCard}>
                  <div 
                    className={styles.categoryIcon}
                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                  >
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.name}</h3>
                  <span className={styles.categoryArrow}>
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section 
        className={`${styles.latestNews} ${isVisible.latest ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.latest = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Latest</span>
            <h2 className={styles.sectionTitle}>
              Top <span className={styles.highlight}>Stories</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
                <p>Loading latest news...</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {news.length > 0 ? (
                news.map((article, index) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={index}>
                    <div className={`${styles.newsCard} ${styles.animateCard}`}>
                      <div className={styles.newsImage}>
                        <img 
                          src={article.urlToImage || imagenotfound} 
                          alt={article.title || 'News article'}
                          onError={(e) => {
                            e.target.src = imagenotfound;
                          }}
                        />
                        {article.source?.name && (
                          <span className={styles.newsSource}>
                            <i className="fas fa-newspaper"></i> {article.source.name}
                          </span>
                        )}
                        {article.publishedAt && (
                          <span className={styles.newsTime}>
                            <i className="far fa-clock"></i> {formatPublished(article.publishedAt)}
                          </span>
                        )}
                      </div>
                      <div className={styles.newsContent}>
                        <h3 className={styles.newsTitle}>
                          {article.title || 'No title available'}
                        </h3>
                        <p className={styles.newsDescription}>
                          {article.description ? (
                            article.description.length > 120
                              ? `${article.description.substring(0, 120)}...`
                              : article.description
                          ) : 'No description available.'}
                        </p>
                        <div className={styles.newsMeta}>
                          <span className={styles.newsAuthor}>
                            <i className="fas fa-user"></i> 
                            {article.author || 'Unknown'}
                          </span>
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.readMore}
                          >
                            Read More <i className="fas fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className={styles.noNews}>No news articles available at the moment.</p>
                </div>
              )}
            </div>
          )}

          {news.length > 0 && !loading && (
            <div className={styles.loadMoreContainer}>
              <button className={styles.loadMoreButton} onClick={fetchNews}>
                <i className="fas fa-sync-alt"></i> Refresh News
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
