import { motion } from 'framer-motion';
import { Dribbble, Linkedin, Facebook, Download, MapPin, Calendar, Mail } from 'lucide-react';
import LazyLoad from '../components/LazyLoad';
import { useApp } from '../context/AppContext';

// Behance Icon Component
const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.75.94 2.483 2.416 2.483.9 0 1.576-.363 1.923-.962l2.164.067zm-7.638-3.16h4.965c-.1-.975-.586-1.68-1.458-1.68-.927 0-1.418.668-1.507 1.68zM9.87 7.5c2.047 0 3.49 1.021 3.49 3.138 0 1.538-.797 2.433-1.893 2.78.993.31 1.696 1.336 1.696 2.558 0 2.312-1.5 3.524-3.69 3.524H4V7.5h5.87zm-.295 5.09c.827 0 1.346-.473 1.346-1.336 0-.863-.519-1.336-1.346-1.336H6.72v2.672h2.855zm.186 5.208c.953 0 1.55-.527 1.55-1.488 0-.962-.597-1.488-1.55-1.488H6.72v2.976h3.041z"/>
  </svg>
);

// Figma Icon
const FigmaIcon = () => (
  <svg viewBox="0 0 38 57" width="24" height="24" fill="none">
    <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
  </svg>
);

// Adobe XD Icon
const XDIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" rx="4" fill="#FF61F6"/>
    <text x="12" y="17" textAnchor="middle" fill="#2E0013" fontSize="12" fontWeight="bold" fontFamily="Arial">Xd</text>
  </svg>
);

// Sketch Icon
const SketchIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <polygon points="12,2 22,8 12,22 2,8" fill="#F7B500"/>
    <polygon points="12,2 22,8 12,14" fill="#FFD93D"/>
    <polygon points="12,2 2,8 12,14" fill="#FFEA63"/>
    <polygon points="2,8 12,22 12,14" fill="#F7B500"/>
    <polygon points="22,8 12,22 12,14" fill="#E5A800"/>
  </svg>
);

// InVision Icon
const InVisionIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" rx="4" fill="#FF3366"/>
    <text x="12" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">in</text>
  </svg>
);

// Photoshop Icon
const PSIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" rx="4" fill="#31A8FF"/>
    <text x="12" y="17" textAnchor="middle" fill="#001E36" fontSize="11" fontWeight="bold" fontFamily="Arial">Ps</text>
  </svg>
);

// Illustrator Icon
const AIIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <rect width="24" height="24" rx="4" fill="#FF9A00"/>
    <text x="12" y="17" textAnchor="middle" fill="#330000" fontSize="11" fontWeight="bold" fontFamily="Arial">Ai</text>
  </svg>
);

const getSkillIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'figma': return <FigmaIcon />;
    case 'adobe xd':
    case 'xd': return <XDIcon />;
    case 'sketch': return <SketchIcon />;
    case 'invision': return <InVisionIcon />;
    case 'photoshop':
    case 'ps': return <PSIcon />;
    case 'illustrator':
    case 'ai': return <AIIcon />;
    default: return <FigmaIcon />;
  }
};

export default function ProfileScreen() {
  const { data } = useApp();

  return (
    <div className="profile-screen">
      {/* Profile Header */}
      <LazyLoad delay={0}>
        <div className="profile-header">
          <div className="profile-avatar-container">
            <motion.div 
              className="profile-avatar"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={data.profile.avatar} alt={data.profile.name} />
            </motion.div>
            <div className="avatar-glow" style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }} />
          </div>
          
          <h1 className="profile-name">{data.profile.name}</h1>
          <p className="profile-title">{data.profile.title}</p>
          
          {/* Quick Info */}
          <div className="quick-info">
            <div className="quick-info-item">
              <MapPin size={14} />
              <span>{data.profile.location}</span>
            </div>
            <div className="quick-info-item">
              <Calendar size={14} />
              <span>{data.stats.years} Years Experience</span>
            </div>
            <div className="quick-info-item">
              <Mail size={14} />
              <span>{data.profile.email}</span>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="social-icons">
            <motion.a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-icon dribbble" whileHover={{ y: -5 }}>
              <Dribbble size={20} />
            </motion.a>
            <motion.a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-icon behance" whileHover={{ y: -5 }}>
              <BehanceIcon />
            </motion.a>
            <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" whileHover={{ y: -5 }}>
              <Linkedin size={20} />
            </motion.a>
            <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook" whileHover={{ y: -5 }}>
              <Facebook size={20} />
            </motion.a>
          </div>

          {/* Download CV Button */}
          <motion.button 
            className="download-cv-btn"
            style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Download CV
          </motion.button>
        </div>
      </LazyLoad>

      {/* Dark Content Section */}
      <div className="dark-section">
        {/* About Section */}
        <LazyLoad delay={0.1}>
          <div className="section">
            <h2 className="section-title">About Me</h2>
            <p className="about-text">{data.profile.bio}</p>
          </div>
        </LazyLoad>

        {/* Skills Section */}
        <LazyLoad delay={0.2}>
          <div className="section">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {data.skills.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="skill-icon">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </LazyLoad>

        {/* Experience Section */}
        <LazyLoad delay={0.3}>
          <div className="section">
            <h2 className="section-title">Experience</h2>
            <div className="experience-list">
              {data.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="experience-item"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="timeline-dot" style={{ background: data.colors.primary, boxShadow: `0 0 0 2px ${data.colors.primary}` }} />
                  <div className="experience-content">
                    <div className="experience-header">
                      <h3 className="experience-title">{exp.title}</h3>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                    <p className="experience-company">{exp.company}</p>
                    <p className="experience-description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </LazyLoad>

        {/* Education Section */}
        <LazyLoad delay={0.4}>
          <div className="section">
            <h2 className="section-title">Education</h2>
            <div className="education-list">
              {data.education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="education-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="education-icon">🎓</div>
                  <div className="education-content">
                    <h4>{edu.degree}</h4>
                    <p>{edu.school}</p>
                    <span>{edu.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </LazyLoad>
      </div>
    </div>
  );
}
