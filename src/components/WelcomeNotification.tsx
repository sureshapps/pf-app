import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hand } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WelcomeNotificationProps {
  onClose: () => void;
}

export default function WelcomeNotification({ onClose }: WelcomeNotificationProps) {
  const { data } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  const { notification } = data;

  useEffect(() => {
    if (!notification.enabled) {
      onClose();
      return;
    }

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 6500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [notification.enabled, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!notification.enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="welcome-notification-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="welcome-notification"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
          >
            {/* Content */}
            <div className="notification-content">
              <div className="notification-icon">
                <Hand size={22} />
              </div>
              <div className="notification-text">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
              </div>
              <button className="notification-close" onClick={handleClose}>
                <X size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <motion.div 
              className="notification-progress"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
