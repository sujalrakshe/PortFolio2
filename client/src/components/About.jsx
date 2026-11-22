import React from 'react';

export default function About() {
  const pillars = [
    {
      icon: 'fa-layer-group',
      title: 'Full-Stack Architecture',
      desc: 'End-to-end application development from SQL tables and Node/Spring APIs to interactive React frontends.'
    },
    {
      icon: 'fa-code',
      title: 'Clean Code & OOP',
      desc: 'Strong emphasis on modular design, reusability, and software design patterns.'
    },
    {
      icon: 'fa-database',
      title: 'Database Engineering',
      desc: 'Designing optimized schemas, writing complex SQL queries, joins, and triggers.'
    },
    {
      icon: 'fa-bolt',
      title: 'Continuous Learning',
      desc: 'Constantly expanding knowledge across React, Node.js, Spring Boot, and modern cloud technologies.'
    }
  ];

  return (
    <section id="about" className="section-block">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>

      <div className="about-card">
        <p className="about-text">
          Aspiring <strong>Full-Stack Developer</strong> with a solid foundation in Core Java, SQL database management, and modern Web Technologies like React and Node.js. I bring a logical mindset from my engineering background and apply rigorous Object-Oriented Programming (OOP) principles to craft clean, maintainable software.
        </p>
        <p className="about-text">
          Whether constructing relational e-commerce database schemas with views & stored procedures, developing console-based banking solutions, or creating sleek interactive UI clones with full-stack capabilities, I strive for excellence in every line of code.
        </p>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <div key={index} className="pillar-item">
              <div className="pillar-icon">
                <i className={`fa-solid ${pillar.icon}`}></i>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
