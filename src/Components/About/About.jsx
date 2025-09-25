import { useState } from 'react';
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

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.about}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className={styles.aboutTitle}>About <span>NewsHub</span></h1>
              <p className={styles.aboutSubtitle}>
                Your trusted source for accurate, timely, and comprehensive news in the United States.
              </p>
            </div>
            <div className="col-lg-6">
              <div className={styles.aboutImage}>
                <img src={aboutimg} alt="News team collaboration" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className={styles.missionSection}>
        <div className="container">
          <div className={styles.tabContainer}>
            <div className={styles.tabButtons}>
              <button className={activeTab === 'mission' ? styles.activeTab : ''} onClick={() => setActiveTab('mission')}>
                <i className="fas fa-bullseye me-2"></i>Our Mission
              </button>
              <button className={activeTab === 'values' ? styles.activeTab : ''} onClick={() => setActiveTab('values')}>
                <i className="fas fa-star me-2"></i>Our Values
              </button>
              <button className={activeTab === 'team' ? styles.activeTab : ''} onClick={() => setActiveTab('team')}>
                <i className="fas fa-users me-2"></i>Our Team
              </button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'mission' && (
                <div className={styles.tabPanel}>
                  <h2>Our Mission</h2>
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
                      <h3>50+</h3>
                      <p>Professional Journalists</p>
                    </div>
                    <div className={styles.statItem}>
                      <h3>100k+</h3>
                      <p>Daily Readers</p>
                    </div>
                    <div className={styles.statItem}>
                      <h3>24/7</h3>
                      <p>News Coverage</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'values' && (
                <div className={styles.tabPanel}>
                  <h2>Our Values</h2>
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
                <div className={styles.tabPanel}>
                  <h2>Our Team</h2>
                  <p>
                    Our diverse team of experienced journalists, editors, and technologists are committed to delivering 
                    excellence in news reporting. With backgrounds from leading media organizations around the world, 
                    we bring a global perspective to local news.
                  </p>
                  <div className={styles.teamGrid}>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberone} alt="Editor-in-Chief" />
                      </div>
                      <h3>Leo Johnson</h3>
                      <p>Editor-in-Chief</p>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={membertwo} alt="Senior Correspondent" />
                      </div>
                      <h3>Michael Chen</h3>
                      <p>Senior Correspondent</p>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberthree} alt="Technology Editor" />
                      </div>
                      <h3>Jessica Williams</h3>
                      <p>Technology Editor</p>
                    </div>
                    <div className={styles.teamMember}>
                      <div className={styles.memberImage}>
                        <img src={memberfour} alt="Foreign Correspondent" />
                      </div>
                      <h3>David Rodriguez</h3>
                      <p>Foreign Correspondent</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.historySection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Our Story</h2>

          <div className="row">
            <div className="col-lg-6">
              <div className={styles.historyContent}>
                <p>
                  NewsHub was founded in 2015 with a simple vision: to create a news platform that prioritizes 
                  accuracy over speed and substance over sensationalism. What started as a small team of dedicated 
                  journalists has grown into a respected news organization with a global reach.
                </p>
                <p>
                  Over the years, we've weathered the challenges of the evolving media landscape while staying true 
                  to our core principles. Our commitment to quality journalism has earned us numerous awards and, 
                  more importantly, the trust of our readers.
                </p>
                <p>
                  Today, we continue to innovate while maintaining the standards that have defined us from the beginning. 
                  As we look to the future, we remain dedicated to our mission of delivering news that informs, educates, 
                  and empowers.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.historyImage}>
                <img src={storyimg} alt="NewsHub office"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Information Section */}
      <section className={styles.apiSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Our News Source</h2>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className={styles.apiImage}>
                <img src={newsapi} alt="NewsAPI logo" className={styles.apiLogo}/>
                <div className={styles.apiMeta}>
                  <h3>NewsAPI.org</h3>
                  <p>Powering news for developers</p>
                  <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" title='NewsAPI Page' className={styles.apiLink}>
                    Visit NewsAPI <i className="fas fa-external-link-alt ms-2"></i>
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
                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>Real-time news updates</span>
                  </div>

                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>80,000+ news sources</span>
                  </div>

                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>Global coverage</span>
                  </div>

                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>Multiple categories</span>
                  </div>

                  <div className={styles.featureItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>High-quality content</span>
                  </div>
                </div>
                <p className={styles.apiNote}>
                  By leveraging NewsAPI's comprehensive database, NewsHub ensures 
                  you receive accurate, timely, and diverse news content from 
                  trusted sources around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2>Stay Updated with NewsHub</h2>
            <p>Subscribe to our newsletter for the latest news and exclusive content.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email address" className={styles.newsletterInput}/>
              <button type="submit" className={styles.newsletterButton}>
                Subscribe <i className="fas fa-paper-plane ms-2"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;