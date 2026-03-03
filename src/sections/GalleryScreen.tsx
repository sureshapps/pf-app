import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Filter } from 'lucide-react';
import LazyLoad from '../components/LazyLoad';
import { useApp } from '../context/AppContext';

export default function GalleryScreen() {
  const { data } = useApp();
  const [selectedImage, setSelectedImage] = useState<typeof data.gallery[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(data.gallery.map(item => item.category)))];

  const filteredGallery = selectedCategory === 'All'
    ? data.gallery
    : data.gallery.filter(item => item.category === selectedCategory);

  // Masonry layout - split into 2 columns
  const leftColumn = filteredGallery.filter((_, i) => i % 2 === 0);
  const rightColumn = filteredGallery.filter((_, i) => i % 2 === 1);

  return (
    <div className="gallery-screen">
      {/* Header */}
      <LazyLoad delay={0}>
        <div className="gallery-header">
          <h1>Gallery</h1>
          <p>Explore my creative works and design journey</p>
        </div>
      </LazyLoad>

      {/* Category Filter */}
      <LazyLoad delay={0.1}>
        <div className="gallery-filter">
          <div className="filter-icon">
            <Filter size={16} />
          </div>
          <div className="filter-buttons">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                style={selectedCategory === category ? { 
                  background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)` 
                } : {}}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </LazyLoad>

      {/* Masonry Grid */}
      <LazyLoad delay={0.2}>
        <div className="masonry-grid">
          {/* Left Column */}
          <div className="masonry-column">
            {leftColumn.map((item, index) => (
              <motion.div
                key={item.id}
                className="masonry-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="masonry-image-wrapper">
                  <img src={item.image} alt={item.caption} loading="lazy" />
                  <div className="masonry-overlay">
                    <motion.div 
                      className="masonry-zoom-icon"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn size={20} />
                    </motion.div>
                  </div>
                </div>
                <div className="masonry-caption">
                  <span className="masonry-category">{item.category}</span>
                  <p>{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="masonry-column">
            {rightColumn.map((item, index) => (
              <motion.div
                key={item.id}
                className="masonry-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="masonry-image-wrapper">
                  <img src={item.image} alt={item.caption} loading="lazy" />
                  <div className="masonry-overlay">
                    <motion.div 
                      className="masonry-zoom-icon"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn size={20} />
                    </motion.div>
                  </div>
                </div>
                <div className="masonry-caption">
                  <span className="masonry-category">{item.category}</span>
                  <p>{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LazyLoad>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="gallery-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery-modal-close" onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </button>
              
              <div className="gallery-modal-image">
                <img src={selectedImage.image} alt={selectedImage.caption} />
              </div>
              
              <div className="gallery-modal-info">
                <span className="gallery-modal-category">{selectedImage.category}</span>
                <h3>{selectedImage.caption}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
