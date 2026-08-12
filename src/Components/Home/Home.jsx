import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';
import homeimg from '../../images/home-img.jpg';
import imagenotfound from '../../images/image-not-found.png';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const newsCategories = [
    { name: "Business", icon: "fas fa-chart-line", path: "/business" },
    { name: "Technology", icon: "fas fa-microchip", path: "/technology" },
    { name: "Entertainment", icon: "fas fa-film", path: "/entertainment" },
    { name: "Health", icon: "fas fa-heartbeat", path: "/health" },
    { name: "Science", icon: "fas fa-flask", path: "/science" },
    { name: "Sports", icon: "fas fa-running", path: "/sports" },
    { name: "General", icon: "fas fa-newspaper", path: "/general" }
  ];

  // Turns an ISO timestamp into a short relative label, e.g. "2h ago"
  const formatPublished = (publishedAt) => {
    if (!publishedAt) return null;
    const diffMs = Date.now() - new Date(publishedAt).getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  // Showing error state if fetching failed
  if (error) {
    return (
      <div className="container text-center py-5">
        <div className={styles.errorIcon}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="text-danger mt-3">{error}</p>
        <button className="btn btn-primary mt-3" onClick={fetchNews}>Try Again</button>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      {/* Home Section */}
      <section className={styles.home}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className={styles.homeTitle}>Stay Informed with <span>NewsHub</span></h1>
              <p className={styles.homeSubtitle}>Your trusted source for the latest news, trends, and insights in the United States.</p>
              <div className={styles.homeSearch}>
                <input type="text" placeholder="Search for news..." className={styles.searchInput}/>
                <button className={styles.searchButton}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.homeImage}>
                <img src={homeimg} alt="News reading" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle}>News Categories</h2>
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
      <section className={styles.latestNews}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Latest News</h2>

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
                      <img src={article.urlToImage || imagenotfound} alt={article.title}
                        onError={(e) => {
                          e.target.src = imagenotfound;
                        }}
                      />
                      {article.source?.name && (
                        <span className={styles.newsSource}>{article.source.name}</span>
                      )}
                    </div>
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{article.title}</h3>
                      <p className={styles.newsDescription}>
                        {article.description ?
                          (article.description.length > 120
                            ? `${article.description.substring(0, 120)}...`
                            : article.description)
                          : 'No description available.'
                        }
                      </p>
                      <div className={styles.newsMeta}>
                        {formatPublished(article.publishedAt) && (
                          <span className={styles.newsDate}>{formatPublished(article.publishedAt)}</span>
                        )}
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>Read Full Article <i className="fas fa-arrow-right ms-2"></i>
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
