import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Folder, User, ImageIcon, Mail, Moon, Sun } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Onboarding from './components/Onboarding';
import WelcomeNotification from './components/WelcomeNotification';
import AdminPanel from './components/AdminPanel';
import HomeScreen from './sections/HomeScreen';
import PortfolioScreen from './sections/PortfolioScreen';
import ProfileScreen from './sections/ProfileScreen';
import GalleryScreen from './sections/GalleryScreen';
import ContactScreen from './sections/ContactScreen';
import './App.css';

type ScreenType = 'home' | 'projects' | 'profile' | 'gallery' | 'contact';

const tabs = [
  { id: 'home' as ScreenType, label: 'Home', icon: Home },
  { id: 'projects' as ScreenType, label: 'Project', icon: Folder },
  { id: 'profile' as ScreenType, label: 'Profile', icon: User, isCenter: true },
  { id: 'gallery' as ScreenType, label: 'Gallery', icon: ImageIcon },
  { id: 'contact' as ScreenType, label: 'Contact', icon: Mail },
];

function AppContent() {
  const { data } = useApp();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
      setShowWelcome(true);
    }
    setIsLoaded(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    setShowWelcome(true);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as ScreenType);
  };

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <AnimatePresence mode="wait">
        {showOnboarding && (
          <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {!showOnboarding && (
        <>
          {/* Dark Mode Toggle */}
          <motion.button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* Welcome Notification - Centered */}
          {showWelcome && (
            <WelcomeNotification onClose={() => setShowWelcome(false)} />
          )}

          {/* Main Content */}
          <motion.div 
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
                {currentScreen === 'projects' && <PortfolioScreen />}
                {currentScreen === 'profile' && <ProfileScreen />}
                {currentScreen === 'gallery' && <GalleryScreen />}
                {currentScreen === 'contact' && <ContactScreen onAdminClick={() => setShowAdmin(true)} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Attached Bottom Tab Bar with Elevated Center Button */}
          <motion.div 
            className="attached-tab-bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
          >
            <div className="tab-bar-content">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentScreen === tab.id;
                const isCenter = tab.isCenter;

                if (isCenter) {
                  return (
                    <motion.button
                      key={tab.id}
                      className={`tab-item center-tab ${isActive ? 'active' : ''}`}
                      onClick={() => setCurrentScreen(tab.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className="center-tab-button"
                        style={{ 
                          background: isActive 
                            ? `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.primaryLight} 100%)`
                            : `linear-gradient(135deg, ${data.colors.secondary} 0%, ${data.colors.accent} 100%)`
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span className="tab-label">{tab.label}</span>
                    </motion.button>
                  );
                }

                return (
                  <motion.button
                    key={tab.id}
                    className={`tab-item ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentScreen(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="tab-icon-wrapper">
                      <Icon size={22} className="tab-icon" />
                    </div>
                    <span className="tab-label">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Admin Panel */}
          <AnimatePresence>
            {showAdmin && (
              <AdminPanel onClose={() => setShowAdmin(false)} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
