import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Code, Smartphone, TrendingUp, Users, Award } from 'lucide-react';
import LazyLoad from '../components/LazyLoad';
import { useApp } from '../context/AppContext';

const services = [
  {
    icon: Palette,
    title: 'UI Design',
    description: 'Beautiful interfaces that captivate users',
    image: 'https://pub-b7063e985df64ddcba4ecd5e89b94954.r2.dev/whatido1.JPG',
  },
  {
    icon: Code,
    title: 'UX Research',
    description: 'User-centered design approach',
    image: 'https://pub-b7063e985df64ddcba4ecd5e89b94954.r2.dev/whatido2.JPG',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'iOS & Android experiences',
    image: 'https://pub-b7063e985df64ddcba4ecd5e89b94954.r2.dev/whatido3.JPG',
  },
];

const statsIcons = [
  { icon: TrendingUp, label: 'Projects' },
  { icon: Users, label: 'Clients' },
  { icon: Award, label: 'Years Exp' },
];

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { data } = useApp();
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  const recentWorks = data.projects.slice(0, 2);

  return (
    <div className="home-screen">
      {/* Hero Banner Image */}
      <LazyLoad delay={0}>
        <motion.div 
          className="hero-banner-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-banner-wrapper">
            <img 
              src={data.heroImage} 
              alt="Portfolio Hero" 
              className="hero-banner-image"
            />
   
          </div>
        </motion.div>
      </LazyLoad>

      {/* Stats Section */}
      <LazyLoad delay={0.1}>
        <div className="stats-bar">
          {[
            { value: data.stats.projects, label: 'Projects', color: data.colors.primary },
            { value: data.stats.clients, label: 'Clients', color: data.colors.secondary },
            { value: data.stats.years, label: 'Years Exp', color: data.colors.warning },
          ].map((stat, index) => {
            const Icon = statsIcons[index].icon;
            return (
              <motion.div 
                key={index} 
                className="stat-bar-item"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="stat-bar-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                  <Icon size={20} />
                </div>
                <div className="stat-bar-content">
                  <span className="stat-bar-value" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="stat-bar-label">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </LazyLoad>

      {/* Profile Card */}
      <LazyLoad delay={0.2}>
        <motion.div 
          className="profile-card"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="profile-card-avatar">
            <img src={data.profile.avatar} alt={data.profile.name} />
            <div className="avatar-ring" />
          </div>
          <div className="profile-card-info">
            <h3>{data.profile.name}</h3>
            <p>{data.profile.title}</p>
            <div className="profile-tags">
              {data.skills.slice(0, 2).map((skill, i) => (
                <span key={i} className="tag" style={{ color: skill.color, background: `${skill.color}15` }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <motion.button 
            className="profile-card-btn"
            style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate?.('profile')}
          >
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </LazyLoad>

      {/* Services Section */}
      <LazyLoad delay={0.3}>
        <div className="services-section">
          <h2 className="section-heading">What I Do</h2>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index} 
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    minHeight: '200px',
                    cursor: 'pointer',
                  }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px',
                      color: 'white',
                    }}
                  >
                    <div 
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <Icon size={24} color="white" />
                    </div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 600 }}>{service.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.4 }}>{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </LazyLoad>

      {/* Recent Work Preview */}
      <LazyLoad delay={0.4}>
        <div className="recent-work-section">
          <div className="section-header">
            <h2 className="section-heading">Recent Work</h2>
            <motion.button 
              className="view-all-btn"
              style={{ color: data.colors.primary }}
              whileHover={{ x: 5 }}
              onClick={() => onNavigate?.('projects')}
            >
              View All <ArrowRight size={14} />
            </motion.button>
          </div>
          <div className="work-preview-grid">
            {recentWorks.map((work) => (
              <motion.div
                key={work.id}
                className="work-card"
                onMouseEnter={() => setHoveredWork(work.id)}
                onMouseLeave={() => setHoveredWork(null)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => onNavigate?.('projects')}
              >
                <img src={work.image} alt={work.title} className="work-card-image" />
                <div className={`work-card-overlay ${hoveredWork === work.id ? 'active' : ''}`}>
                  <span className="work-tag" style={{ background: work.color }}>{work.category}</span>
                  <h4>{work.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LazyLoad>

      {/* Testimonial Section */}
      <LazyLoad delay={0.5}>
        <div className="testimonial-section">
          <h2 className="section-heading">Client Feedback</h2>
          <motion.div 
            className="testimonial-card"
            whileHover={{ y: -5 }}
          >
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Gloria's design work exceeded our expectations. She transformed our vision into a stunning, user-friendly interface that our customers love.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` }}>JD</div>
              <div className="author-info">
                <h5>John Davidson</h5>
                <p>CEO, TechStart Inc.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </LazyLoad>
    </div>
  );
}
