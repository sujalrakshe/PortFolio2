import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('about');
  const [toast, setToast] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Theme synchronization
  useEffect(() => {
    const savedTheme = localStorage.getItem('sr_portfolio_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sr_portfolio_theme', newTheme);
  };

  // Toast Notification helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleCopy = (text, successMsg) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, 'success');
    }).catch(() => {
      showToast('Could not copy to clipboard', 'error');
    });
  };

  // Scrollspy & Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = ['about', 'skill', 'portfolio', 'education', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Toast Notification Container */}
      {toast && (
        <div id="toast-container" className="toast-container">
          <div className={`toast toast-${toast.type} show`}>
            <i className={`fa-solid ${
              toast.type === 'success' ? 'fa-circle-check' : 
              toast.type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info'
            }`}></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Decorative Glows */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      <div className="bg-glow glow-3"></div>

      {/* Main Container */}
      <div className="main-container">
        <Sidebar onCopy={handleCopy} />

        <main className="main-content">
          <Header 
            activeSection={activeSection} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />

          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact onShowToast={showToast} />
          <Footer />
        </main>
      </div>

      {/* Back to Top */}
      {showScrollTop && (
        <button className="back-to-top visible" onClick={scrollToTop} title="Back to top">
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}
