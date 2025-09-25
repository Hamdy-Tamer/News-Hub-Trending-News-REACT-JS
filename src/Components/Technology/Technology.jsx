import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Technology.module.css';
import imagenotfound from '../../images/image-not-found.png';

export default function Technology() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTechnologyNews() {
    try {
      setLoading(true);
      setError(null);

      let { data } = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=061c3bff2b054e75b3cca1dae6df9835`);
      console.log(data);
      console.log(data.articles);
      setNews(data.articles);
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError("Failed to load technology news. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechnologyNews();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <i className={`fas fa-spinner fa-spin ${styles.spinner}`}></i>
        <p>Loading technology news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className={styles.errorText}>{error}</p>
        <button className={styles.retryButton} onClick={fetchTechnologyNews}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.technologyContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className={styles.heroTitle}>Technology News</h1>
              <p className={styles.heroSubtitle}>
                Stay ahead of the curve with the latest in tech innovation, gadgets, and digital trends. 
                From AI breakthroughs to startup news and product launches - your source for everything tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className={styles.newsGrid}>
        <div className="container">
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
                  </div>
                  
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>{article.title || "No title available"}</h3>
                    
                    <div className={styles.newsMeta}>
                      <div className={styles.metaItem}>
                        <i className="fas fa-user"></i>
                        <span>{article.author || "Unknown Author"}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <i className="fas fa-calendar-alt"></i>
                        <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <i className="fas fa-microchip"></i>
                        <span>{article.source?.name || "Unknown Source"}</span>
                      </div>
                    </div>

                    {article.description ? (
                      <p className={styles.newsDescription}>{article.description}</p>
                    ) : (
                      <p className={styles.newsDescription}>No content available</p>
                    )}
                    
                    <div className={styles.readMoreContainer}>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMoreButton}>
                        <i className="fas fa-external-link-alt me-2"></i>Read Full Article
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}