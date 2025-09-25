import img1 from '../../images/logo.png';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({logindata, setLoginData}) {
  let navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function Logout(){
    localStorage.removeItem("usertoken");
    setLoginData(null);
    navigate("/");
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          {/* Logo and Brand Name */}
          <Link className={`navbar-brand ${styles.navbarBrand}`} to="home">
            <img className={styles.logo} src={img1} alt="Website logo"/>
            <span className={styles.brandText}>NewsHub US Network</span>
          </Link>
          
          {/* Toggle Button */}
          <button className={`navbar-toggler ${styles.toggler}`} type="button" onClick={toggleMenu} aria-label="Toggle navigation">
            <span className={`navbar-toggler-icon ${isMenuOpen ? styles.togglerIconOpen : ''}`}></span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            {/* Navigation Links - Center */}
            {logindata ? (
                <ul className={`navbar-nav mx-auto mb-2 mb-lg-0 ${styles.navMain}`}>
                  <li className="nav-item">
                    <Link className={`nav-link ${styles.navLink}`} to="home" onClick={() => setIsMenuOpen(false)}><i className="fas fa-home me-2"></i>Home</Link>
                  </li>
              
                  <li className="nav-item dropdown">
                    <a className={`nav-link dropdown-toggle ${styles.navLink} ${styles.dropdownToggle}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fas fa-list-alt me-2"></i>News Categories
                    </a>

                    <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="navbarDropdown">
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="business" onClick={() => setIsMenuOpen(false)}><i className="fas fa-chart-line me-2"></i><span>Business & Economy</span></Link></li>
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="entertainment" onClick={() => setIsMenuOpen(false)}><i className="fas fa-film me-2"></i><span>Entertainment</span></Link></li>
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="health" onClick={() => setIsMenuOpen(false)}><i className="fas fa-heartbeat me-2"></i><span>Health</span></Link></li>
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="science" onClick={() => setIsMenuOpen(false)}><i className="fas fa-flask me-2"></i><span>Science</span></Link></li>
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="sport" onClick={() => setIsMenuOpen(false)}><i className="fas fa-running me-2"></i><span>Sports</span></Link></li>
                      <li><Link className={`dropdown-item ${styles.dropdownItem}`} to="technology" onClick={() => setIsMenuOpen(false)}><i className="fas fa-microchip me-2"></i><span>Technology</span></Link></li>
                    </ul>
                  </li>
              
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="about" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-info-circle me-2"></i>About
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLink}`} to="contact" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-envelope me-2"></i>Contact Us
                </Link>
              </li>
            </ul>
            ): null}

            {/* Authentication Buttons */}
            <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navAuth}`}>
               
                 {logindata ? (
                    <li className="nav-item">
                      <button onClick={Logout} className={styles.logoutButton}><i className="fas fa-sign-out-alt me-2"></i>Logout</button>
                </li>
                 ): (
                  <>
                  <li className="nav-item">
                    <Link className={styles.authButton} to="" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-sign-in-alt me-2"></i>Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className={styles.authButtonSecondary} to="register" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-user-plus me-2"></i>Register
                    </Link>
                  </li>
                  </>
                 )}          
            </ul>
          </div>
        </div>
      </nav>      
    </>
  );
}