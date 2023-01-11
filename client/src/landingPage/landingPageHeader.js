import React from 'react';
import './landingPage.css';
import LogoWrapper from './logoWrapper';
import CTA from './cta';
import Footer from './footer';

const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <nav className="navigation">
          <LogoWrapper />
          <button className="sign-in-btn">
            Log In
          </button>
        </nav>
        <article className="header-content">
          <h1 className="header-content-title">
            We Provide Medical Services That You can Trust!
          </h1>
          <h4 className="header-content-subtitle">
            Health Care, For Whole Family.
          </h4>
          <CTA />
          <p className="header-content-summary">
            Pediatric primary, urgent care & telehealth services.
          </p>
        </article>
      </header>
      <Footer />
    </div>
  );
};


export default LandingPage;
