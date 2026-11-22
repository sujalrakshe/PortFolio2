import React, { useState, useEffect } from 'react';

const fallbackSkills = [
  { name: 'HTML5', category: 'web lang', tag: 'Frontend', icon: 'https://cdn.iconscout.com/icon/free/png-512/free-html-logo-icon-svg-download-png-2284975.png' },
  { name: 'CSS3', category: 'web lang', tag: 'Styling', icon: 'https://cdn.iconscout.com/icon/free/png-512/free-css-icon-svg-download-png-722685.png' },
  { name: 'JavaScript', category: 'web lang', tag: 'ES6+', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', category: 'web', tag: 'Frontend Library', icon: 'https://images.icon-icons.com/2415/PNG/96/react_original_logo_icon_146374.png' },
  { name: 'Node.js', category: 'backend', tag: 'Runtime API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Java', category: 'backend lang', tag: 'Core Tech', icon: 'https://cdn.iconscout.com/icon/free/png-512/free-java-icon-svg-download-png-1174953.png' },
  { name: 'Spring Boot', category: 'backend', tag: 'Framework', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH03DJAgxHc9dWfvXLW92uzIs6P3LnbEhh6igVBj-o_UnhYbJv01zw1rw&s' },
  { name: 'SQL', category: 'backend lang', tag: 'Database', icon: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/sql-icon-svg-download-png-10989655.png' },
  { name: 'C', category: 'lang', tag: 'Programming', icon: 'https://images.icon-icons.com/2415/PNG/96/c_original_logo_icon_146611.png' },
  { name: 'C++', category: 'lang', tag: 'OOP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', category: 'lang', tag: 'Scripting', icon: 'https://cdn.iconscout.com/icon/free/png-512/free-python-logo-icon-svg-download-png-1720083.png' },
  { name: 'GitHub', category: 'tools', tag: 'Version Control', icon: 'https://cdn.iconscout.com/icon/free/png-512/free-github-icon-svg-download-png-432516.png' }
];

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/skills')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch((err) => {
        console.log('Using local fallback skills data:', err.message);
      });
  }, []);

  const filteredSkills = skills.filter((skill) => {
    if (activeFilter === 'all') return true;
    return skill.category.includes(activeFilter);
  });

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'lang', label: 'Languages' },
    { key: 'web', label: 'Web & Frontend' },
    { key: 'backend', label: 'Backend & DB' },
    { key: 'tools', label: 'Tools & Version Control' }
  ];

  return (
    <section id="skill" className="section-block">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <div className="title-underline"></div>
      </div>

      <div className="filter-tabs">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeFilter === tab.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">
              <img src={skill.icon} alt={skill.name} />
            </div>
            <h3>{skill.name}</h3>
            <span className="skill-tag">{skill.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
