import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} <strong>Sujal Rakshe</strong>. Crafted with React.js & Node.js.</p>
        <div className="footer-links">
          <a href="/Sujal_Rakshe_Resume_Updated.pdf" download><i className="fa-solid fa-file-pdf"></i> Resume</a>
          <a href="https://github.com/sujalrakshe" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i> GitHub</a>
          <a href="https://www.linkedin.com/in/sujal-rakshe" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
