// Home.jsx
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
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Fetch general news from API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=6&apiKey=061c3bff2b054e75b3cca1dae6df9835`
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

  // Scroll-reveal for sections, matching the About page pattern
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
        { threshold: 0.2 }
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
    { name: "Business", icon: "fas fa-chart-line", path: "/business" },
    { name: "Technology", icon: "fas fa-microchip", path: "/technology" },
    { name: "Entertainment", icon: "fas fa-film", path: "/entertainment" },
    { name: "Health", icon: "fas fa-heartbeat", path: "/health" },
    { name: "Science", icon: "fas fa-flask", path: "/science" },
    { name: "Sports", icon: "fas fa-running", path: "/sports" },
    { name: "General", icon: "fas fa-newspaper", path: "/general" }
  ];

  // Showing error state if fetching failed
  if (error) {
    return (
      <div className="container text-center py-5">
        <div className={styles.errorIcon}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={fetchNews}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.home}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`row align-items-center ${styles.heroContent}`}>
            <div className="col-lg-6">
              <div className={styles.heroText}>
                <span className={styles.heroBadge}>Welcome to</span>
                <h1 className={styles.homeTitle}>
                  Stay Informed with <span>NewsHub</span>
                </h1>
                <p className={styles.homeSubtitle}>
                  Your trusted source for the latest news, trends, and
                  insights in the United States.
                </p>
                <div className={styles.homeSearch}>
                  <input
                    type="text"
                    placeholder="Search for news..."
                    className={styles.searchInput}
                  />
                  <button className={styles.searchButton}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.homeImageWrapper}>
                <div className={styles.homeImage}>
                  <img src={homeimg} alt="News reading" />
                  <div className={styles.imageBadge}>
                    <i className="fas fa-bolt"></i> Breaking news, first
                  </div>
                </div>
                <div className={styles.floatingCard}>
                  <i className="fas fa-newspaper"></i>
                  <span>7 Categories</span>
                </div>
                <div className={styles.floatingCard2}>
                  <i className="fas fa-bolt"></i>
                  <span>Updated live</span>
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
                  <div className={styles.categoryIcon}>
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section with API Data */}
      <section
        className={`${styles.latestNews} ${isVisible.latestNews ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.latestNews = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Fresh off the wire</span>
            <h2 className={styles.sectionTitle}>
              Latest <span className={styles.highlight}>News</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading latest news...</p>
            </div>
          ) : (
            <div className="row">
              {news.map((article, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <div className={styles.newsCard}>
                    <div className={styles.newsImage}>
                      <img
                        src={article.urlToImage || imagenotfound}
                        alt={article.title}
                        onError={(e) => {
                          e.target.src = imagenotfound;
                        }}
                      />
                    </div>
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{article.title}</h3>
                      <p className={styles.newsDescription}>
                        {article.description
                          ? article.description.length > 120
                            ? `${article.description.substring(0, 120)}...`
                            : article.description
                          : 'No description available.'}
                      </p>
                      <div className={styles.newsMeta}>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.readMore}
                        >
                          Read Full Article{' '}
                          <i className="fas fa-arrow-right ms-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
