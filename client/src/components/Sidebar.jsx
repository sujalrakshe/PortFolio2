import React from 'react';

export default function Sidebar({ onCopy }) {
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="profile-img-wrapper">
          <img src="/images/sujal_profile.png" alt="Sujal Rakshe" className="profile-img" id="avatarImg" />
          <span className="status-indicator" title="Available for Hire"></span>
        </div>

        <h1 className="profile-name">Sujal Rakshe</h1>
        <div className="profile-badge">
          <i className="fa-solid fa-code"></i>
          <span>Full Stack Developer</span>
        </div>

        <div className="availability-tag">
          <span className="pulse-dot"></span> Open to Opportunities
        </div>

        <div className="sidebar-divider"></div>

        <div className="contact-list">
          <div className="contact-item">
            <div className="icon-box">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="contact-details">
              <span className="label">Email</span>
              <a href="mailto:sujalrakshe05@gmail.com" className="value" id="emailVal">sujalrakshe05@gmail.com</a>
            </div>
            <button 
              className="copy-btn" 
              onClick={() => onCopy('sujalrakshe05@gmail.com', 'Email copied!')} 
              title="Copy Email"
            >
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="contact-details">
              <span className="label">Phone</span>
              <a href="tel:9545893258" className="value" id="phoneVal">+91 9545893258</a>
            </div>
            <button 
              className="copy-btn" 
              onClick={() => onCopy('9545893258', 'Phone number copied!')} 
              title="Copy Phone"
            >
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>

          <div className="contact-item">
            <div className="icon-box">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div className="contact-details">
              <span className="label">Location</span>
              <p className="value">Nagpur, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="social-links">
          <a href="https://github.com/sujalrakshe" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/sujal-rakshe" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="mailto:sujalrakshe05@gmail.com" className="social-btn" title="Send Email">
            <i className="fa-solid fa-paper-plane"></i>
          </a>
        </div>

        <a href="/Sujal_Rakshe_Resume_Updated.pdf" download className="btn btn-primary btn-full sidebar-resume-btn">
          <i className="fa-solid fa-download"></i> Download Resume
        </a>
      </div>
    </aside>
  );
}
