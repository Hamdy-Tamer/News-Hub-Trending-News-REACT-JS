// Contact.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';
import contactimg from '../../images/contact-img.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitType, setSubmitType] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitType('success');
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setSubmitType('');
      }, 5000);
    }, 1500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'How can I submit a news tip?',
      answer: 'You can submit news tips through our contact form, or email us directly at tips@newshub.com. All tips are confidential, and we protect our sources.'
    },
    {
      question: 'How do I advertise with NewsHub?',
      answer: 'For advertising inquiries, please contact our advertising team at ads@newshub.com or call +1 (555) 123-ADS1. We offer various advertising options to suit your needs.'
    },
    {
      question: 'How can I subscribe to your newsletter?',
      answer: 'You can subscribe to our newsletter by entering your email in the subscription box at the bottom of our homepage. We send daily and weekly updates on the latest news.'
    },
    {
      question: 'Do you have a mobile app?',
      answer: 'Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store.'
    }
  ];

  return (
    <div className={styles.contactContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`row align-items-center ${styles.heroContent}`}>
            <div className="col-lg-6">
              <div className={styles.heroText}>
                <span className={styles.heroBadge}>Get in Touch</span>
                <h1 className={styles.contactTitle}>
                  Contact <span>NewsHub</span>
                </h1>
                <p className={styles.contactSubtitle}>
                  Have questions, feedback, or story tips? We'd love to hear from you.
                  Reach out to us and our team will get back to you promptly.
                </p>
                <div className={styles.quickContacts}>
                  <div className={styles.quickContact}>
                    <i className="fas fa-phone"></i>
                    <div>
                      <span>Call us</span>
                      <strong>+1 (555) 123-4567</strong>
                    </div>
                  </div>
                  <div className={styles.quickContact}>
                    <i className="fas fa-envelope"></i>
                    <div>
                      <span>Email us</span>
                      <strong>info@newshub.com</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.contactImageWrapper}>
                <div className={styles.contactImage}>
                  <img src={contactimg} alt="Contact us" />
                  <div className={styles.imageBadge}>
                    <i className="fas fa-headset"></i> 24/7 Support
                  </div>
                </div>
                <div className={styles.floatingCard}>
                  <i className="fas fa-comment-dots"></i>
                  <span>Average response time: 2hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section 
        className={`${styles.contactSection} ${isVisible.contact ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.contact = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Contact Us</span>
            <h2 className={styles.sectionTitle}>
              Let's <span className={styles.highlight}>Connect</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>

          <div className="row">
            <div className="col-lg-7">
              <div className={styles.contactForm}>
                {submitMessage && (
                  <div className={`${styles.message} ${styles[submitType]}`}>
                    <i className={`fas ${submitType === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                    {submitMessage}
                    <button 
                      className={styles.messageClose}
                      onClick={() => {
                        setSubmitMessage('');
                        setSubmitType('');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <label htmlFor="name">
                          <i className="fas fa-user"></i> Your Name
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          placeholder="John Doe"
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i> Your Email
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          placeholder="john@example.com"
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">
                      <i className="fas fa-tag"></i> Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      placeholder="How can we help you?"
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">
                      <i className="fas fa-pencil-alt"></i> Your Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                    <span className={styles.charCount}>
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <button 
                    type="submit" 
                    className={styles.submitButton} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <i className="fas fa-paper-plane"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className={styles.contactInfo}>
                <h2>Get in Touch</h2>
                <p className={styles.infoDescription}>
                  We're here to help and answer any questions you might have.
                </p>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Visit Us</h3>
                    <p>123 News Street, Suite 100</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Toll-free: +1 (800) 555-NEWS</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Email Us</h3>
                    <p>info@newshub.com</p>
                    <p>support@newshub.com</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Working Hours</h3>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat: 10:00 AM - 2:00 PM</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
                <div className={styles.socialLinks}>
                  <h3>Follow Us</h3>
                  <div className={styles.socialIcons}>
                    <a href="#" aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" aria-label="YouTube">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        className={`${styles.mapSection} ${isVisible.map ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.map = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Location</span>
            <h2 className={styles.sectionTitle}>
              Find <span className={styles.highlight}>Us</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className={styles.mapContainer}>
            <div className={styles.mapOverlay}>
              <div className={styles.mapInfo}>
                <i className="fas fa-map-pin"></i>
                <div>
                  <h4>NewsHub Headquarters</h4>
                  <p>123 News Street, New York, NY 10001</p>
                </div>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304613!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1643037033167!5m2!1sen!2s" 
              width="100%" 
              height="450" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="NewsHub Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className={`${styles.faqSection} ${isVisible.faq ? styles.visible : ''}`}
        ref={(el) => (sectionRefs.current.faq = el)}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FAQ</span>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <span className={styles.highlight}>Questions</span>
            </h2>
            <div className={styles.sectionDivider}></div>
          </div>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${activeFaq === index ? styles.active : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className={styles.faqHeader}>
                  <h3>{faq.question}</h3>
                  <span className={styles.faqIcon}>
                    <i className={`fas ${activeFaq === index ? 'fa-minus' : 'fa-plus'}`}></i>
                  </span>
                </div>
                <div className={styles.faqBody}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
