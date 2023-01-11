import React from 'react';

const CTA = () => {
    return (
      <article className="cta">
        <p className="cta-summary">
          Ready to Book Appointment? Enter your email to create or restart your membership.
        </p>
        <article className="cta-content">
          <input type="email" placeholder="Email adress" />
          <button className="cta-content-btn">
            
          </button>
        </article>
      </article>
    );
  };

export default CTA;