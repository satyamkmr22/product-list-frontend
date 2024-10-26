import React from 'react';
import { Link } from 'react-router-dom';
import '../css/LandingPage.css'; // Import the CSS file for landing page styles
import landingImage from '../assets/pm.jpeg'; // Replace with your actual image path

export const Navbar = () => (
  <nav className="navbar">
    <div className="left">
     <h2> Product Management system</h2>
    </div>
    <div className="right">
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* <Navbar /> */}
      <div className="content">
        <div className="text-section">
          <h1>Welcome to Our <br></br> Product Management System</h1>
          <span>
            Manage your products efficiently with our intuitive interface.
            <br></br>
            Add, edit, and delete products with ease.
          </span>

          <span>
            Get started now and streamline your product management process!
          </span>
          <div className="button-container">
          <button className="get-started-button">
            <Link to="/products">Get Started</Link>
          </button>
          </div>
        </div>
        <div className="image-section">
          <img src={landingImage} alt="Landing" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage ;