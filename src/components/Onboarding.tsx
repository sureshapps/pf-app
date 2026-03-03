import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Palette, Rocket } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { data } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      icon: Sparkles,
      title: 'Welcome to My Portfolio',
      subtitle: 'Discover amazing UI/UX designs crafted with passion and creativity',
      color: data.colors.primary,
      image: data.carouselImages[0],
    },
    {
      icon: Palette,
      title: 'Creative Designs',
      subtitle: 'Explore a collection of beautiful mobile apps, dashboards, and web interfaces',
      color: data.colors.secondary,
      image: data.carouselImages[1],
    },
    {
      icon: Rocket,
      title: "Let's Get Started",
      subtitle: 'Swipe through my work and let\'s create something amazing together',
      color: data.colors.accent,
      image: data.carouselImages[2],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        setDirection(1);
        setCurrentSlide((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="onboarding-container">
      {/* Background shapes */}
      <div className="onboarding-bg">
        <div className="bg-shape shape-1" style={{ background: currentSlideData.color }} />
        <div className="bg-shape shape-2" style={{ background: currentSlideData.color }} />
        <div className="bg-shape shape-3" style={{ background: currentSlideData.color }} />
      </div>

      {/* Skip button */}
      <button className="skip-btn" onClick={skipOnboarding}>
        Skip
      </button>

      {/* Content */}
      <div className="onboarding-content">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="slide-content"
          >
            {/* Carousel Image */}
            <motion.div
              className="slide-image-wrapper"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img 
                src={currentSlideData.image} 
                alt={currentSlideData.title}
                className="slide-image"
              />
            </motion.div>

            {/* Icon */}
            <motion.div
              className="slide-icon-wrapper"
              style={{ background: `linear-gradient(135deg, ${currentSlideData.color}20, ${currentSlideData.color}40)` }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            >
              <Icon size={40} style={{ color: currentSlideData.color }} />
            </motion.div>

            {/* Text */}
            <motion.h1
              className="slide-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {currentSlideData.title}
            </motion.h1>

            <motion.p
              className="slide-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentSlideData.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="progress-container">
        <div className="progress-dots">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`progress-dot ${index === currentSlide ? 'active' : ''}`}
              animate={{
                width: index === currentSlide ? 32 : 8,
                backgroundColor: index === currentSlide ? currentSlideData.color : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Next button */}
        <motion.button
          className="next-btn"
          style={{ background: currentSlideData.color }}
          onClick={nextSlide}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
