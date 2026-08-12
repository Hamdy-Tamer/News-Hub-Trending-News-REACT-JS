// About.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './About.module.css';
import aboutimg from '../../images/about-img.jpg';
import memberone from '../../images/member-1.jpg';
import membertwo from '../../images/member-2.jpg';
import memberthree from '../../images/member-3.jpg';
import memberfour from '../../images/member-4.jpg';
import storyimg from '../../images/story-img.jpg';
import newsapi from '../../images/NewsAPI.png';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

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

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`row align-items-center ${styles.heroContent}`}>
            <div className="col-lg-6">
              <div className={styles.heroText}>
                <span className={styles.heroBadge}>Welcome to</span>
                <h1 className={styles.aboutTitle}>
                  News<span>Hub</span>
                </h1>
                <p className={styles.aboutSubtitle}>
                  Your trusted source for accurate, timely, and comprehensive 
                  news in the United States and around the world.
                </p>
                <div className={styles.heroStats}>
                  <div>
                    <span className={styles.statNumber}>50+</span>
                    <span>Journalists</span>
                  </div>
                  <div>
                    <span className={styles.statNumber}>100k+</span>
                    <span>Daily Readers</span>
                  </div>
                  <div>
                    <span className={styles.statNumber}>24/7</span>
                    <span>Coverage</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.aboutImageWrapper}>
                <div className={styles.aboutImage}>
                  <img src={aboutimg} alt="News team collaboration" />
                  <div className={styles.imageBadge}>
                    <i className="fas fa-play"></i> Watch our story
                  </div>
                </div>
                <div className={styles.floatingCard}>
                  <i className="fas fa-newspaper"></i>
                  <span>Latest News</span>
                </div>
                <div className={styles.floatingCard2}>
                  <i className="fas fa-users"></i>
                  <span>Trusted by millions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section 
        className={`${styles.missionSection} ${isVisible.mission ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.mission = el)}
      >
        <div className="container">
          <div className={styles.tabContainer}>
            <div className={styles.tabButtons}>
              <button 
                className={activeTab === 'mission' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('mission')}
              >
                <i className="fas fa-bullseye"></i>
                <span>Our Mission</span>
              </button>
              <button 
                className={activeTab === 'values' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('values')}
              >
                <i className="fas fa-star"></i>
                <span>Our Values</span>
              </button>
              <button 
                className={activeTab === 'team' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('team')}
              >
                <i className="fas fa-users"></i>
                <span>Our Team</span>
              </button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'mission' && (
                <div className={`${styles.tabPanel} ${styles.fadeIn}`}>
                  <h2>
                    <span className={styles.highlight}>Our</span> Mission
                  </h2>
                  <p>
                    At NewsHub, our mission is to deliver accurate, unbiased, and timely news to our readers. 
                    We believe in the power of information to transform societies and empower individuals to make informed decisions.
                  </p>
                  <p>
                    In an era of information overload, we strive to cut through the noise and provide news that matters. 
                    Our dedicated team of journalists works around the clock to bring you the most relevant stories from around the globe.
                  </p>
                  <div className={styles.missionStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statCircle}>
                        <h3>50+</h3>
                      </div>
                      <p>Professional Journalists</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statCircle}>
                        <h3>100k+</h3>
                      </div>
                      <p>Daily Readers</p>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statCircle}>
                        <h3>24/7</h3>
                      </div>
                      <p>News Coverage</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'values' && (
                <div className={`${styles.tabPanel} ${styles.fadeIn}`}>
                  <h2>
                    <span className={styles.highlight}>Our</span> Values
                  </h2>
                  <div className={styles.valuesList}>
                    <div className={styles.valueItem}>
                      <div className={styles.valueIcon}>
                        <i className="fas fa-shield-alt"></i>
                      </div>
                      <div className={styles.valueContent}>
                        <h3>Integrity</h3>
                        <p>We adhere to the highest ethical standards in journalism, ensuring our reporting is always truthful and accurate.</p>
                      </div>
                    </div>
                    <div className={styles.valueItem}>
                      <div className={styles.valueIcon}>
                        <i className="fas fa-balance-scale"></i>
                      </div>
                      <div className={styles.valueContent}>
                        <h3>Impartiality</h3>
                        <p>We present news without bias, allowing our readers to form their own opinions based on facts.</p>
                      </div>
                    </div>
                    <div className={styles.valueItem}>
                      <div className={styles.valueIcon}>
                        <i className="fas fa-rocket"></i>
                      </div>
                      <div className={styles.valueContent}>
                        <h3>Innovation</h3>
                        <p>We continuously evolve our reporting methods and platforms to better serve our audience.</p>
                      </div>
                    </div>
                    <div className={styles.valueItem}>
                      <div className={styles.valueIcon}>
                        <i className="fas fa-handshake"></i>
                      </div>
                      <div className={styles.valueContent}>
                        <h3>Community</h3>
                        <p>We believe in building strong connections with our readers and serving the public interest.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'team' && (
                <div className={`${styles.tabPanel} ${styles.fadeIn}`}>
                  <h2>
                    <span className={styles.highlight}>Our</span> Team
                  </h2>
                  <p className={styles.teamDescription}>
                    Our diverse team of experienced journalists, editors, and technologists are committed to delivering 
                    excellence in news reporting. With backgrounds from leading media organizations around the world, 
                    we bring a global perspective to local news.
                  </p>
                  <div className={styles.teamGrid}>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberone} alt="Editor-in-Chief" />
                        <div className={styles.memberOverlay}>
                          <a href="#"><i className="fab fa-twitter"></i></a>
                          <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                      </div>
                      <h3>Leo Johnson</h3>
                      <p>Editor-in-Chief</p>
                      <span className={styles.memberBadge}>10+ years</span>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={membertwo} alt="Senior Correspondent" />
                        <div className={styles.memberOverlay}>
                          <a href="#"><i className="fab fa-twitter"></i></a>
                          <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                      </div>
                      <h3>Michael Chen</h3>
                      <p>Senior Correspondent</p>
                      <span className={styles.memberBadge}>8+ years</span>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberthree} alt="Technology Editor" />
                        <div className={styles.memberOverlay}>
                          <a href="#"><i className="fab fa-twitter"></i></a>
                          <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                      </div>
                      <h3>Jessica Williams</h3>
                      <p>Technology Editor</p>
                      <span className={styles.memberBadge}>6+ years</span>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberfour} alt="Foreign Correspondent" />
                        <div className={styles.memberOverlay}>
                          <a href="#"><i className="fab fa-twitter"></i></a>
                          <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                      </div>
                      <h3>David Rodriguez</h3>
                      <p>Foreign Correspondent</p>
                      <span className={styles.memberBadge}>7+ years</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        className={`${styles.historySection} ${isVisible.history ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.history = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Story</span>
            <h2 className={styles.sectionTitle}>
              The <span className={styles.highlight}>Journey</span> of NewsHub
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className={styles.historyContent}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <p>
                    NewsHub was founded in 2015 with a simple vision: to create a news platform that prioritizes 
                    accuracy over speed and substance over sensationalism. What started as a small team of dedicated 
                    journalists has grown into a respected news organization with a global reach.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <p>
                    Over the years, we've weathered the challenges of the evolving media landscape while staying true 
                    to our core principles. Our commitment to quality journalism has earned us numerous awards and, 
                    more importantly, the trust of our readers.
                  </p>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <p>
                    Today, we continue to innovate while maintaining the standards that have defined us from the beginning. 
                    As we look to the future, we remain dedicated to our mission of delivering news that informs, educates, 
                    and empowers.
                  </p>
                </div>
                <div className={styles.historyStats}>
                  <div>
                    <span className={styles.statNumber}>2015</span>
                    <span>Founded</span>
                  </div>
                  <div>
                    <span className={styles.statNumber}>50+</span>
                    <span>Team Members</span>
                  </div>
                  <div>
                    <span className={styles.statNumber}>100+</span>
                    <span>Awards</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.historyImage}>
                <img src={storyimg} alt="NewsHub office" />
                <div className={styles.imageOverlay}>
                  <div className={styles.playButton}>
                    <i className="fas fa-play"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Information Section */}
      <section 
        className={`${styles.apiSection} ${isVisible.api ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.api = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technology</span>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.highlight}>News Source</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className={styles.apiCard}>
                <div className={styles.apiLogoWrapper}>
                  <img src={newsapi} alt="NewsAPI logo" className={styles.apiLogo} />
                  <div className={styles.apiPulse}></div>
                </div>
                <div className={styles.apiMeta}>
                  <h3>NewsAPI.org</h3>
                  <p>Powering news for developers worldwide</p>
                  <a 
                    href="https://newsapi.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.apiLink}
                  >
                    Explore NewsAPI <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.apiDetails}>
                <h3>Real-Time News Data</h3>
                <p>
                  NewsHub sources its content from NewsAPI, a service that provides 
                  real-time news headlines from over 80,000 sources worldwide. This 
                  ensures you always have access to the latest and most relevant news 
                  across all categories.
                </p>
                <div className={styles.apiFeatures}>
                  {[
                    'Real-time news updates',
                    '80,000+ news sources',
                    'Global coverage',
                    'Multiple categories',
                    'High-quality content',
                    'Developer-friendly API'
                  ].map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.apiNote}>
                  <i className="fas fa-info-circle"></i>
                  <p>
                    By leveraging NewsAPI's comprehensive database, NewsHub ensures 
                    you receive accurate, timely, and diverse news content from 
                    trusted sources around the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterIcon}>
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2>Stay Updated with NewsHub</h2>
            <p>Subscribe to our newsletter for the latest news and exclusive content.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                Subscribe <i className="fas fa-paper-plane"></i>
              </button>
            </form>
            <p className={styles.newsletterNote}>
              <i className="fas fa-lock"></i> No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
