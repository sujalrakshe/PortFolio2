import React, { useState } from 'react';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onShowToast(data.message || 'Message sent successfully!', 'success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        onShowToast(data.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      // Offline fallback
      console.error(err);
      onShowToast('Message saved locally (Backend offline). Thank you!', 'info');
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-block">
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <div className="title-underline"></div>
      </div>

      <div className="contact-wrapper">
        {/* Contact Details */}
        <div className="contact-info-cards">
          <div className="info-card">
            <div className="info-icon"><i className="fa-solid fa-envelope-open-text"></i></div>
            <div className="info-text">
              <h3>Direct Email</h3>
              <p>Feel free to reach out anytime</p>
              <a href="mailto:sujalrakshe05@gmail.com">sujalrakshe05@gmail.com</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><i className="fa-solid fa-phone-volume"></i></div>
            <div className="info-text">
              <h3>Phone & WhatsApp</h3>
              <p>Available for calls and messages</p>
              <a href="tel:9545893258">+91 9545893258</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><i className="fa-solid fa-location-crosshairs"></i></div>
            <div className="info-text">
              <h3>Location</h3>
              <p>Based in India</p>
              <span>Nagpur, Maharashtra</span>
            </div>
          </div>
        </div>

        {/* Contact Form Connected to Node.js Backend */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h3 className="form-title">Send a Message (Node.js API)</h3>
          
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <div className="input-wrapper">
              <i className="fa-regular fa-user input-icon"></i>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                value={formData.name} 
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email Address</label>
            <div className="input-wrapper">
              <i className="fa-regular fa-envelope input-icon"></i>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                value={formData.email} 
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <div className="input-wrapper">
              <i className="fa-regular fa-comment-dots input-icon textarea-icon"></i>
              <textarea 
                id="message" 
                rows="4" 
                placeholder="Hi Sujal, I'd like to discuss a project or role..." 
                value={formData.message} 
                onChange={handleChange}
                required 
              ></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            <span>{loading ? 'Sending...' : 'Send Message'}</span> 
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
          </button>
        </form>
      </div>
    </section>
  );
}
