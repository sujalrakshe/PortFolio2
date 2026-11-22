import React from 'react';

const educationData = [
  {
    period: '2022 - 2026',
    grade: 'CGPA: 6.80',
    title: 'B.Tech Electrical Engineering',
    institution: 'Smt Radhikatai Pandav College of Engineering',
    sub: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
    skills: ['Core Engineering', 'Software Development', 'Problem Solving']
  },
  {
    period: '2020 - 2022',
    grade: '76.56%',
    title: 'Higher Secondary Certificate (HSC - 12th)',
    institution: 'Vidarbha Buniyadhi Junior College',
    sub: 'Maharashtra State Board',
    skills: ['Science', 'Mathematics', 'Physics & Chemistry']
  },
  {
    period: '2014 - 2020',
    grade: '78.00%',
    title: 'Secondary School Certificate (SSC - 10th)',
    institution: 'Vidarbha Buniyadhi High School',
    sub: 'Maharashtra State Board',
    skills: ['Foundational Mathematics', 'General Science']
  }
];

export default function Education() {
  return (
    <section id="education" className="section-block">
      <div className="section-header">
        <h2 className="section-title">Education Timeline</h2>
        <div className="title-underline"></div>
      </div>

      <div className="timeline">
        {educationData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-period">
                  <i className="fa-regular fa-calendar"></i> {item.period}
                </span>
                <span className="grade-chip">{item.grade}</span>
              </div>
              <h3 className="timeline-title">{item.title}</h3>
              <h4 className="timeline-institution">{item.institution}</h4>
              <p className="timeline-sub">{item.sub}</p>
              <div className="timeline-skills">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
