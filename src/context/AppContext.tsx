import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface AppColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  warning: string;
  dark: string;
  darker: string;
  light: string;
  lighter: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  views: string;
  likes: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  caption: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  color: string;
}

export interface AppSettings {
  appName: string;
  appDescription: string;
  appIcon: string;
  tags: string[];
  themeColor: string;
  backgroundColor: string;
}

export interface NotificationSettings {
  title: string;
  message: string;
  enabled: boolean;
}

export interface AppData {
  profile: {
    name: string;
    title: string;
    location: string;
    email: string;
    bio: string;
    avatar: string;
  };
  heroImage: string;
  carouselImages: string[];
  colors: AppColors;
  skills: Skill[];
  projects: Project[];
  gallery: GalleryItem[];
  experience: Experience[];
  education: Education[];
  social: SocialLink[];
  stats: {
    projects: string;
    clients: string;
    years: string;
  };
  appSettings: AppSettings;
  notification: NotificationSettings;
}

const defaultColors: AppColors = {
  primary: '#FF6B6B',
  primaryLight: '#FF8E8E',
  secondary: '#4ECDC4',
  accent: '#A78BFA',
  warning: '#FBBF24',
  dark: '#2D2D3A',
  darker: '#1a1a2e',
  light: '#FFE4D6',
  lighter: '#FFF5F0',
};

const defaultData: AppData = {
  profile: {
    name: 'Suresh Kaleyannan',
    title: 'Creative Developer',
    location: 'Kuala Lumpur, MY',
    email: 'hello@suresh.app',
    bio: 'Passionate UI/UX designer with over 5 years of experience creating intuitive and visually stunning digital experiences.',
    avatar: '/profile.jpg',
  },
  heroImage: '/hero-banner.jpg',
  carouselImages: ['/carousel1.jpg', '/carousel2.jpg', '/carousel3.jpg'],
  colors: defaultColors,
  skills: [
    { name: Figma', level: 95, color: '#F24E1E' },
    { name: 'Canva', level: 90, color: '#FF61F6' },
    { name: 'Sketch', level: 85, color: '#F7B500' },
    { name: 'Capcut', level: 88, color: '#FF3366' },
    { name: 'Photoshop', level: 82, color: '#31A8FF' },
    { name: 'Illustrator', level: 78, color: '#FF9A00' },
  ],
  projects: [
    {
      id: 1,
      title: 'Fashion Store',
      category: 'E-Commerce',
      description: 'A modern e-commerce mobile app with clean UI, smooth animations, and intuitive navigation for fashion retail.',
      image: '/project1.jpg',
      color: '#FF6B6B',
      tags: ['UI Design', 'Mobile App', 'E-Commerce'],
      views: '2.4K',
      likes: '186',
    },
    {
      id: 2,
      title: 'Analytics Pro',
      category: 'Dashboard',
      description: 'Comprehensive analytics dashboard with real-time data visualization and interactive charts.',
      image: '/project2.jpg',
      color: '#4ECDC4',
      tags: ['Dashboard', 'Data Viz', 'Web App'],
      views: '3.1K',
      likes: '245',
    },
    {
      id: 3,
      title: 'Social Connect',
      category: 'Social Media',
      description: 'Social media platform with stories, feeds, and engaging user interactions.',
      image: '/project3.jpg',
      color: '#A78BFA',
      tags: ['Social', 'Mobile App', 'UI/UX'],
      views: '1.8K',
      likes: '156',
    },
    {
      id: 4,
      title: 'FitTrack Pro',
      category: 'Health & Fitness',
      description: 'Fitness tracking app with workout statistics, progress charts, and goal setting.',
      image: '/project4.jpg',
      color: '#34D399',
      tags: ['Fitness', 'Health', 'Mobile'],
      views: '2.2K',
      likes: '198',
    },
    {
      id: 5,
      title: 'Foodie Express',
      category: 'Food Delivery',
      description: 'Food delivery app with restaurant listings, menu cards, and easy ordering.',
      image: '/project5.jpg',
      color: '#FBBF24',
      tags: ['Food', 'Delivery', 'Mobile App'],
      views: '1.5K',
      likes: '132',
    },
    {
      id: 6,
      title: 'WanderBook',
      category: 'Travel',
      description: 'Travel booking platform with destination discovery and hotel reservations.',
      image: '/project6.jpg',
      color: '#60A5FA',
      tags: ['Travel', 'Booking', 'Web App'],
      views: '2.8K',
      likes: '210',
    },
  ],
  gallery: [
    { id: 1, image: '/project1.jpg', caption: 'Fashion Store Design', category: 'UI Design' },
    { id: 2, image: '/project2.jpg', caption: 'Analytics Dashboard', category: 'Dashboard' },
    { id: 3, image: '/project3.jpg', caption: 'Social Media App', category: 'Mobile' },
    { id: 4, image: '/project4.jpg', caption: 'Fitness Tracker', category: 'Health' },
    { id: 5, image: '/project5.jpg', caption: 'Food Delivery App', category: 'Food' },
    { id: 6, image: '/project6.jpg', caption: 'Travel Booking', category: 'Travel' },
    { id: 7, image: '/carousel1.jpg', caption: 'Creative Workspace', category: 'Branding' },
    { id: 8, image: '/carousel2.jpg', caption: 'Mobile Showcase', category: 'Showcase' },
  ],
  experience: [
    {
      title: 'Senior Art Director',
      company: 'Pixels LTD',
      period: 'Feb 2021 - Present',
      description: 'Leading design team, creating visual strategies for major clients',
    },
    {
      title: 'Art Director',
      company: 'Pixels LTD',
      period: 'Feb 2019 - Jan 2021',
      description: 'Managed creative projects and mentored junior designers',
    },
    {
      title: 'UI/UX Designer',
      company: 'Fire Media LLC',
      period: 'Jul 2018 - Feb 2019',
      description: 'Designed mobile apps and web interfaces for startups',
    },
    {
      title: 'Junior Designer',
      company: 'Creative Studio',
      period: 'Jan 2017 - Jun 2018',
      description: 'Created marketing materials and brand identities',
    },
  ],
  education: [
    {
      degree: 'Master of Design',
      school: 'California Institute of Arts',
      year: '2016 - 2018',
    },
    {
      degree: 'Bachelor of Fine Arts',
      school: 'University of Design',
      year: '2012 - 2016',
    },
  ],
  social: [
    { platform: 'LinkedIn', url: 'https://linkedin.com', color: '#0077B5' },
    { platform: 'Dribbble', url: 'https://dribbble.com', color: '#EA4C89' },
    { platform: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
    { platform: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
  ],
  stats: {
    projects: '50+',
    clients: '30+',
    years: '5+',
  },
  appSettings: {
    appName: 'Gloria Portfolio',
    appDescription: 'UI/UX Designer Portfolio - Showcasing creative digital experiences',
    appIcon: '/profile.jpg',
    tags: ['portfolio', 'design', 'ui/ux', 'mobile', 'web'],
    themeColor: '#FF6B6B',
    backgroundColor: '#FFE4D6',
  },
  notification: {
    title: 'Welcome! 👋',
    message: 'Thanks for visiting my portfolio. Enjoy exploring!',
    enabled: true,
  },
};

interface AppContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  updateProfile: (profile: Partial<AppData['profile']>) => void;
  updateColors: (colors: Partial<AppColors>) => void;
  updateHeroImage: (image: string) => void;
  updateCarouselImages: (images: string[]) => void;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  updateNotification: (notification: Partial<NotificationSettings>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: number, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: number) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Partial<Skill>) => void;
  deleteSkill: (index: number) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Partial<Experience>) => void;
  deleteExperience: (index: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (index: number, edu: Partial<Education>) => void;
  deleteEducation: (index: number) => void;
  addSocial: (social: SocialLink) => void;
  updateSocial: (index: number, social: Partial<SocialLink>) => void;
  deleteSocial: (index: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<AppData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateProfile = (profile: Partial<AppData['profile']>) => {
    setData((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } }));
  };

  const updateColors = (colors: Partial<AppColors>) => {
    setData((prev) => ({ ...prev, colors: { ...prev.colors, ...colors } }));
  };

  const updateHeroImage = (image: string) => {
    setData((prev) => ({ ...prev, heroImage: image }));
  };

  const updateCarouselImages = (images: string[]) => {
    setData((prev) => ({ ...prev, carouselImages: images }));
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setData((prev) => ({ ...prev, appSettings: { ...prev.appSettings, ...settings } }));
  };

  const updateNotification = (notification: Partial<NotificationSettings>) => {
    setData((prev) => ({ ...prev, notification: { ...prev.notification, ...notification } }));
  };

  const addProject = (project: Project) => {
    setData((prev) => ({ ...prev, projects: [...prev.projects, project] }));
  };

  const updateProject = (id: number, project: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }));
  };

  const deleteProject = (id: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setData((prev) => ({ ...prev, gallery: [...prev.gallery, item] }));
  };

  const updateGalleryItem = (id: number, item: Partial<GalleryItem>) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...item } : g)),
    }));
  };

  const deleteGalleryItem = (id: number) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const addSkill = (skill: Skill) => {
    setData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  };

  const updateSkill = (index: number, skill: Partial<Skill>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === index ? { ...s, ...skill } : s)),
    }));
  };

  const deleteSkill = (index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = (exp: Experience) => {
    setData((prev) => ({ ...prev, experience: [...prev.experience, exp] }));
  };

  const updateExperience = (index: number, exp: Partial<Experience>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e, i) => (i === index ? { ...e, ...exp } : e)),
    }));
  };

  const deleteExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = (edu: Education) => {
    setData((prev) => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (index: number, edu: Partial<Education>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e, i) => (i === index ? { ...e, ...edu } : e)),
    }));
  };

  const deleteEducation = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addSocial = (social: SocialLink) => {
    setData((prev) => ({ ...prev, social: [...prev.social, social] }));
  };

  const updateSocial = (index: number, social: Partial<SocialLink>) => {
    setData((prev) => ({
      ...prev,
      social: prev.social.map((s, i) => (i === index ? { ...s, ...social } : s)),
    }));
  };

  const deleteSocial = (index: number) => {
    setData((prev) => ({
      ...prev,
      social: prev.social.filter((_, i) => i !== index),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        data,
        updateData,
        updateProfile,
        updateColors,
        updateHeroImage,
        updateCarouselImages,
        updateAppSettings,
        updateNotification,
        addProject,
        updateProject,
        deleteProject,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSocial,
        updateSocial,
        deleteSocial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
