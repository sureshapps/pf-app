import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Heart, Share2, X } from 'lucide-react';
import LazyLoad from '../components/LazyLoad';
import { useApp } from '../context/AppContext';

const categories = ['All', 'Mobile App', 'Dashboard', 'Web App', 'E-Commerce'];

export default function PortfolioScreen() {
  const { data } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof data.projects[0] | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const filteredProjects = selectedCategory === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === selectedCategory || p.tags.includes(selectedCategory));

  const featuredProjects = data.projects.slice(0, 3);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const nextCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevCarousel = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <div className="portfolio-screen">
      {/* Header */}
      <LazyLoad delay={0}>
        <div className="portfolio-header">
          <h1>My Projects</h1>
          <p>Explore my latest design work and creative projects</p>
        </div>
      </LazyLoad>

      {/* Featured Projects Carousel */}
      <LazyLoad delay={0.1}>
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCarouselIndex}
                className="carousel-slide"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedProject(featuredProjects[currentCarouselIndex])}
              >
                <img 
                  src={featuredProjects[currentCarouselIndex].image} 
                  alt={featuredProjects[currentCarouselIndex].title}
                />
                <div className="carousel-overlay">
                  <span 
                    className="carousel-tag"
                    style={{ background: featuredProjects[currentCarouselIndex].color }}
                  >
                    {featuredProjects[currentCarouselIndex].category}
                  </span>
                  <h3>{featuredProjects[currentCarouselIndex].title}</h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Carousel Controls */}
          <button className="carousel-btn prev" onClick={prevCarousel}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-btn next" onClick={nextCarousel}>
            <ChevronRight size={24} />
          </button>
          
          {/* Carousel Dots */}
          <div className="carousel-dots">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentCarouselIndex ? 'active' : ''}`}
                onClick={() => setCurrentCarouselIndex(index)}
              />
            ))}
          </div>
        </div>
      </LazyLoad>

      {/* Category Filter */}
      <LazyLoad delay={0.2}>
        <div className="category-filter">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              style={selectedCategory === category ? { background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` } : {}}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </LazyLoad>

      {/* Projects Grid */}
      <LazyLoad delay={0.3}>
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <motion.button 
                    className="view-project-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category" style={{ color: project.color }}>
                  {project.category}
                </span>
                <h4>{project.title}</h4>
                <div className="project-stats">
                  <span><Eye size={14} /> {project.views}</span>
                  <span><Heart size={14} /> {project.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </LazyLoad>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="modal-info">
                <span 
                  className="modal-category"
                  style={{ background: selectedProject.color }}
                >
                  {selectedProject.category}
                </span>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                
                <div className="modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="modal-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="modal-actions">
                  <motion.button 
                    className="modal-btn primary"
                    style={{ background: selectedProject.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    View Live
                  </motion.button>
                  <motion.button 
                    className="modal-btn secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 size={18} />
                    Share
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
