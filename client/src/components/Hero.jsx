import React, { useState, useEffect } from 'react';

const roles = [
  "Full-Stack Developer",
  "Java & Spring Boot Engineer",
  "React & Node.js Developer",
  "SQL Database Architect"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timer = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length + 1));
        }, 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timer = setTimeout(() => {}, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-subtitle">Hello, I'm Sujal 👋</div>
        <h2 className="hero-title">
          I am a <span className="typing-text">{displayText}</span><span className="cursor">|</span>
        </h2>
        <p className="hero-description">
          Passionate software engineer building robust backends with <strong>Java, Spring Boot & Node.js</strong> and responsive web applications with <strong>React & Modern JavaScript</strong>. Eager to solve real-world problems and deliver high-performance digital solutions.
        </p>

        <div className="hero-cta">
          <a href="#portfolio" className="btn btn-primary">
            <i className="fa-solid fa-eye"></i> View Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            <i className="fa-solid fa-comments"></i> Contact Me
          </a>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">7+</div>
          <div className="stat-label">Featured Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12+</div>
          <div className="stat-label">Tech Skills</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2026</div>
          <div className="stat-label">B.Tech Batch</div>
        </div>
      </div>
    </section>
  );
}
