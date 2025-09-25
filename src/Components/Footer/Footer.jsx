import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container py-5">
        <div className="row">
          {/* Column 1: About */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className={styles.footerHeading}>About NewsHub</h5>
            <p className={styles.footerText}>
              NewsHub US Network delivers the latest and most relevant news from across the United States and around the world.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className='text-decoration-none' aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className='text-decoration-none' aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className='text-decoration-none' aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className='text-decoration-none' aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className='text-decoration-none' aria-label="Youtube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className={styles.footerHeading}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="home" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Home</Link></li>
              <li><a href="#" className={styles.footerLink}>News Categories</a></li>
              <li><Link to="about" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>About Us</Link></li>
              <li><Link to="contact" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Contact</Link></li>
              <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="#" className={styles.footerLink}>Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Column 3: News Categories */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className={styles.footerHeading}>News Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="business" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Business & Economy</Link></li>
              <li><Link to="entertainment" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Entertainment</Link></li>
              <li><Link to="health" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Health</Link></li>
              <li><Link to="technology" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Technology</Link></li>
              <li><Link to="science" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Science</Link></li>
              <li><Link to="sport" onClick={() => setIsMenuOpen(false)} className={styles.footerLink}>Sports</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className={styles.footerHeading}>Contact Us</h5>
            <ul className="list-unstyled">
              <li className={styles.contactItem}>
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>123 News Street, New York, NY 10001</span>
              </li>
              <li className={styles.contactItem}>
                <i className="fas fa-phone me-2"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className={styles.contactItem}>
                <i className="fas fa-envelope me-2"></i>
                <span>info@newshub.com</span>
              </li>
              <li className={styles.contactItem}>
                <i className="fas fa-clock me-2"></i>
                <span>Mon-Fri: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <hr className={styles.divider} />
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} NewsHub US Network. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;