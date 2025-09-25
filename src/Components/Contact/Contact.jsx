import { useState } from 'react';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className={styles.contactContainer}>
      {/* contact Section */}
      <section className={styles.contact}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className={styles.contactTitle}>Contact <span>NewsHub</span></h1>
              <p className={styles.contactSubtitle}>
                Have questions, feedback, or story tips? We'd love to hear from you.
              </p>
            </div>
            <div className="col-lg-6">
              <div className={styles.contactImage}>
                <img src={contactimg} alt="Contact us"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className={styles.contactForm}>
                <h2>Send us a Message</h2>
                {submitMessage && (
                  <div className={styles.successMessage}>
                    <i className="fas fa-check-circle"></i>
                    {submitMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className={styles.formGroup}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required/>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <i className="fas fa-paper-plane ms-2"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles.contactInfo}>
                <h2>Get in Touch</h2>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Address</h3>
                    <p>123 News Street, New York, NY 10001</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Email</h3>
                    <p>info@newshub.com</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9AM - 5PM</p>
                    <p>Saturday: 10AM - 2PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div className={styles.socialLinks}>
                  <h3>Follow Us</h3>
                  <div className={styles.socialIcons}>
                    <a href="#" className='text-decoration-none' aria-label="Facebook">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className='text-decoration-none' aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className='text-decoration-none' aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className='text-decoration-none' aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className='text-decoration-none' aria-label="LinkedIn">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Find Us</h2>
          <div className={styles.mapContainer}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304613!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1643037033167!5m2!1sen!2s" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="NewsHub Location"></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className={styles.faqItem}>
                <h3>How can I submit a news tip?</h3>
                <p>
                  You can submit news tips through our contact form, or email us directly at 
                  tips@newshub.com. All tips are confidential, and we protect our sources.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3>How do I advertise with NewsHub?</h3>
                <p>
                  For advertising inquiries, please contact our advertising team at 
                  ads@newshub.com or call +1 (555) 123-ADS1. We offer various advertising 
                  options to suit your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.faqItem}>
                <h3>How can I subscribe to your newsletter?</h3>
                <p>
                  You can subscribe to our newsletter by entering your email in the 
                  subscription box at the bottom of our homepage. We send daily and weekly 
                  updates on the latest news.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you have a mobile app?</h3>
                <p>
                  Yes! Our mobile app is available for both iOS and Android devices. 
                  You can download it from the App Store or Google Play Store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;