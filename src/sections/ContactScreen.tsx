import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Linkedin, Dribbble, Twitter, Instagram, CheckCircle } from 'lucide-react';
import LazyLoad from '../components/LazyLoad';
import { useApp } from '../context/AppContext';

interface ContactScreenProps {
  onAdminClick?: () => void;
}

export default function ContactScreen({ onAdminClick }: ContactScreenProps) {
  const { data } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-screen">
      {/* Header */}
      <LazyLoad delay={0}>
        <div className="contact-header">
          <h1 className="contact-title">Let's Talk</h1>
          <p className="contact-subtitle">
            Have a project in mind? Let's create something amazing{' '}
            <span className="admin-link-plain" onClick={onAdminClick}>
              together
            </span>
          </p>
        </div>
      </LazyLoad>

      {/* Contact Info Cards */}
      <LazyLoad delay={0.1}>
        <div className="contact-info-grid">
          <motion.a 
            href={`mailto:${data.profile.email}`}
            className="contact-info-card"
            whileHover={{ y: -8 }}
          >
            <div className="contact-icon-wrapper email" style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` }}>
              <Mail size={22} />
            </div>
            <div className="contact-info-content">
              <span className="contact-label">Email</span>
              <span className="contact-value">{data.profile.email}</span>
            </div>
          </motion.a>
          
          <motion.a 
            href="tel:+15551234567"
            className="contact-info-card"
            whileHover={{ y: -8 }}
          >
            <div className="contact-icon-wrapper phone" style={{ background: `linear-gradient(135deg, ${data.colors.secondary} 0%, #44A08D 100%)` }}>
              <Phone size={22} />
            </div>
            <div className="contact-info-content">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+1 (555) 123-4567</span>
            </div>
          </motion.a>
          
          <motion.div 
            className="contact-info-card"
            whileHover={{ y: -8 }}
          >
            <div className="contact-icon-wrapper location" style={{ background: `linear-gradient(135deg, ${data.colors.warning} 0%, #F59E0B 100%)`, color: data.colors.darker }}>
              <MapPin size={22} />
            </div>
            <div className="contact-info-content">
              <span className="contact-label">Location</span>
              <span className="contact-value">{data.profile.location}</span>
            </div>
          </motion.div>
        </div>
      </LazyLoad>

      {/* Contact Form */}
      <LazyLoad delay={0.2}>
        <div className="contact-form-container">
          <h3 className="form-title">Send Message</h3>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <motion.div 
                  className="success-icon"
                  style={{ background: `linear-gradient(135deg, ${data.colors.secondary} 0%, #44A08D 100%)` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <CheckCircle size={48} />
                </motion.div>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` }}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </LazyLoad>

      {/* Social Links */}
      <LazyLoad delay={0.3}>
        <div className="social-section">
          <h3 className="social-title">Follow Me</h3>
          <div className="social-grid">
            {data.social.map((social, index) => {
              const icons = [Linkedin, Dribbble, Twitter, Instagram];
              const Icon = icons[index] || Linkedin;
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-card"
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={26} />
                  <span>{social.platform}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </LazyLoad>

      {/* Availability Badge */}
      <LazyLoad delay={0.4}>
        <motion.div 
          className="availability-badge"
          whileHover={{ scale: 1.02 }}
        >
          <div className="availability-dot" />
          <span>Currently available for freelance projects</span>
        </motion.div>
      </LazyLoad>
    </div>
  );
}
