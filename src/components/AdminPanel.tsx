import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, User, Image, Palette, Save, Check, 
  Eye, EyeOff, LogOut, Edit3, Trash2, Plus, Upload,
  Briefcase, GraduationCap, Globe, Moon, Sun,
  LayoutGrid, Bell, Settings, Type
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

interface AdminPanelProps {
  onClose: () => void;
}

const ADMIN_USERNAME = 'suresh';
const ADMIN_PASSWORD = '21Sujesm@';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { 
    data, 
    updateProfile, 
    updateColors, 
    updateHeroImage, 
    updateCarouselImages,
    updateAppSettings,
    updateNotification,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addProject,
    updateProject,
    deleteProject,
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
  } = useApp();
  
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [newGalleryItem, setNewGalleryItem] = useState({ image: '', caption: '', category: '' });
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, color: '#FF6B6B' });
  const [newProject, setNewProject] = useState({ title: '', category: '', description: '', image: '', color: '#FF6B6B' });
  const [newExperience, setNewExperience] = useState({ title: '', company: '', period: '', description: '' });
  const [newEducation, setNewEducation] = useState({ degree: '', school: '', year: '' });
  const [newSocial, setNewSocial] = useState({ platform: '', url: '', color: '#0077B5' });
  const [newTag, setNewTag] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleImageUpload = (callback: (imageUrl: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          callback(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'gallery', label: 'Gallery', icon: LayoutGrid },
    { id: 'skills', label: 'Skills', icon: Type },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Edit3 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'social', label: 'Social', icon: Globe },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'settings', label: 'App Settings', icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <motion.div
        className="admin-panel-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="admin-login-card"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <button className="admin-close" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="admin-login-header">
            <div className="admin-login-icon">
              <Lock size={32} />
            </div>
            <h2>Admin Login</h2>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label>Username</label>
              <div className="admin-input-wrapper">
                <User size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                className="admin-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="admin-login-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="admin-panel-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="admin-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Admin Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <div className="admin-logo">
              <Settings size={24} />
            </div>
            <h2>Admin Panel</h2>
          </div>
          <div className="admin-header-right">
            <motion.button
              className="admin-theme-toggle"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            
            <motion.button
              className={`admin-save-btn ${saveSuccess ? 'success' : ''}`}
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {saveSuccess ? <Check size={18} /> : <Save size={18} />}
              {saveSuccess ? 'Saved!' : 'Save Changes'}
            </motion.button>
            <motion.button
              className="admin-logout-btn"
              onClick={() => setIsAuthenticated(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={18} />
            </motion.button>
            <motion.button
              className="admin-close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Admin Content */}
        <div className="admin-content">
          {/* Sidebar */}
          <div className="admin-sidebar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 5 }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Main Panel */}
          <div className="admin-main">
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Profile Information</h3>
                  
                  <div className="admin-avatar-section">
                    <div className="admin-avatar-preview">
                      <img src={data.profile.avatar} alt="Profile" />
                    </div>
                    <div className="admin-avatar-actions">
                      <motion.button 
                        className="admin-btn secondary"
                        onClick={() => handleImageUpload((url) => updateProfile({ avatar: url }))}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Upload size={16} />
                        Change Photo
                      </motion.button>
                    </div>
                  </div>

                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={data.profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Job Title</label>
                      <input
                        type="text"
                        value={data.profile.title}
                        onChange={(e) => updateProfile({ title: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={data.profile.location}
                        onChange={(e) => updateProfile({ location: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={data.profile.email}
                        onChange={(e) => updateProfile({ email: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group full-width">
                      <label>Bio</label>
                      <textarea
                        rows={4}
                        value={data.profile.bio}
                        onChange={(e) => updateProfile({ bio: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Images Tab */}
              {activeTab === 'images' && (
                <motion.div
                  key="images"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Images</h3>
                  
                  <div className="admin-image-section">
                    <h4>Hero Banner</h4>
                    <div className="admin-image-preview-large">
                      <img src={data.heroImage} alt="Hero" />
                      <motion.button
                        className="admin-image-upload-btn"
                        onClick={() => handleImageUpload(updateHeroImage)}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Upload size={20} />
                        Change Hero Image
                      </motion.button>
                    </div>
                  </div>

                  <div className="admin-image-section">
                    <h4>Carousel Images</h4>
                    <div className="admin-carousel-images">
                      {data.carouselImages.map((img, index) => (
                        <div key={index} className="admin-carousel-image-item">
                          <img src={img} alt={`Carousel ${index + 1}`} />
                          <motion.button
                            className="admin-image-change-btn"
                            onClick={() => handleImageUpload((url) => {
                              const newImages = [...data.carouselImages];
                              newImages[index] = url;
                              updateCarouselImages(newImages);
                            })}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Edit3 size={16} />
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <motion.div
                  key="colors"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Theme Colors</h3>
                  <p className="admin-section-desc">Customize the color scheme of your portfolio</p>
                  
                  <div className="admin-colors-grid">
                    {Object.entries(data.colors).map(([key, value]) => (
                      <div key={key} className="admin-color-item">
                        <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                        <div className="admin-color-input-wrapper">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => updateColors({ [key]: e.target.value })}
                          />
                          <span>{value}</span>
                        </div>
                        <div 
                          className="admin-color-preview" 
                          style={{ background: value }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Gallery Items</h3>
                  <p className="admin-section-desc">Manage your gallery images and captions</p>
                  
                  <div className="admin-gallery-grid">
                    {data.gallery.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="admin-gallery-item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="admin-gallery-image">
                          <img src={item.image} alt={item.caption} />
                          <div className="admin-gallery-overlay">
                            <button onClick={() => handleImageUpload((url) => updateGalleryItem(item.id, { image: url }))}>
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => deleteGalleryItem(item.id)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="admin-gallery-fields">
                          <input
                            type="text"
                            value={item.caption}
                            placeholder="Caption"
                            onChange={(e) => updateGalleryItem(item.id, { caption: e.target.value })}
                          />
                          <input
                            type="text"
                            value={item.category}
                            placeholder="Category"
                            onChange={(e) => updateGalleryItem(item.id, { category: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Add New Gallery Item */}
                  <div className="admin-add-new">
                    <h4>Add New Gallery Item</h4>
                    <div className="admin-new-item-form vertical">
                      <motion.button
                        className="admin-btn secondary"
                        onClick={() => handleImageUpload((url) => setNewGalleryItem({ ...newGalleryItem, image: url }))}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Upload size={16} />
                        {newGalleryItem.image ? 'Change Image' : 'Select Image'}
                      </motion.button>
                      {newGalleryItem.image && (
                        <img src={newGalleryItem.image} alt="Preview" className="admin-image-preview-small" />
                      )}
                      <input
                        type="text"
                        placeholder="Caption"
                        value={newGalleryItem.caption}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newGalleryItem.image && newGalleryItem.caption) {
                            addGalleryItem({ ...newGalleryItem, id: Date.now() });
                            setNewGalleryItem({ image: '', caption: '', category: '' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add Gallery Item
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Skills</h3>
                  <div className="admin-skills-list">
                    {data.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        className="admin-skill-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="admin-skill-info">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, { name: e.target.value })}
                          />
                          <input
                            type="color"
                            value={skill.color}
                            onChange={(e) => updateSkill(index, { color: e.target.value })}
                          />
                        </div>
                        <div className="admin-skill-level">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => updateSkill(index, { level: parseInt(e.target.value) })}
                          />
                          <span>{skill.level}%</span>
                        </div>
                        <button className="admin-delete-btn" onClick={() => deleteSkill(index)}>
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="admin-add-new">
                    <h4>Add New Skill</h4>
                    <div className="admin-new-item-form">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      />
                      <input
                        type="color"
                        value={newSkill.color}
                        onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newSkill.name) {
                            addSkill(newSkill);
                            setNewSkill({ name: '', level: 80, color: '#FF6B6B' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Projects</h3>
                  <div className="admin-projects-grid">
                    {data.projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="admin-project-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="admin-project-image">
                          <img src={project.image} alt={project.title} />
                          <div className="admin-project-overlay">
                            <button onClick={() => handleImageUpload((url) => updateProject(project.id, { image: url }))}>
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => deleteProject(project.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="admin-project-info">
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, { title: e.target.value })}
                            placeholder="Title"
                          />
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) => updateProject(project.id, { category: e.target.value })}
                            placeholder="Category"
                          />
                          <input
                            type="color"
                            value={project.color}
                            onChange={(e) => updateProject(project.id, { color: e.target.value })}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="admin-add-new">
                    <h4>Add New Project</h4>
                    <div className="admin-new-item-form vertical">
                      <input
                        type="text"
                        placeholder="Project title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={newProject.category}
                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      />
                      <input
                        type="color"
                        value={newProject.color}
                        onChange={(e) => setNewProject({ ...newProject, color: e.target.value })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newProject.title) {
                            addProject({ 
                              ...newProject, 
                              id: Date.now(),
                              image: '/project1.jpg',
                              tags: ['UI/UX'],
                              views: '0',
                              likes: '0'
                            });
                            setNewProject({ title: '', category: '', description: '', image: '', color: '#FF6B6B' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add Project
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Experience</h3>
                  <div className="admin-experience-list">
                    {data.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="admin-experience-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="admin-experience-fields">
                          <input
                            type="text"
                            value={exp.title}
                            placeholder="Job Title"
                            onChange={(e) => updateExperience(index, { title: e.target.value })}
                          />
                          <input
                            type="text"
                            value={exp.company}
                            placeholder="Company"
                            onChange={(e) => updateExperience(index, { company: e.target.value })}
                          />
                          <input
                            type="text"
                            value={exp.period}
                            placeholder="Period"
                            onChange={(e) => updateExperience(index, { period: e.target.value })}
                          />
                          <textarea
                            value={exp.description}
                            placeholder="Description"
                            rows={2}
                            onChange={(e) => updateExperience(index, { description: e.target.value })}
                          />
                        </div>
                        <button className="admin-delete-btn" onClick={() => deleteExperience(index)}>
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="admin-add-new">
                    <h4>Add New Experience</h4>
                    <div className="admin-new-item-form vertical">
                      <input
                        type="text"
                        placeholder="Job title"
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Period (e.g., Jan 2020 - Present)"
                        value={newExperience.period}
                        onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                      />
                      <textarea
                        placeholder="Description"
                        rows={2}
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newExperience.title) {
                            addExperience(newExperience);
                            setNewExperience({ title: '', company: '', period: '', description: '' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add Experience
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Education</h3>
                  <div className="admin-education-list">
                    {data.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="admin-education-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="admin-education-fields">
                          <input
                            type="text"
                            value={edu.degree}
                            placeholder="Degree"
                            onChange={(e) => updateEducation(index, { degree: e.target.value })}
                          />
                          <input
                            type="text"
                            value={edu.school}
                            placeholder="School"
                            onChange={(e) => updateEducation(index, { school: e.target.value })}
                          />
                          <input
                            type="text"
                            value={edu.year}
                            placeholder="Year"
                            onChange={(e) => updateEducation(index, { year: e.target.value })}
                          />
                        </div>
                        <button className="admin-delete-btn" onClick={() => deleteEducation(index)}>
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="admin-add-new">
                    <h4>Add New Education</h4>
                    <div className="admin-new-item-form vertical">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="School"
                        value={newEducation.school}
                        onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={newEducation.year}
                        onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newEducation.degree) {
                            addEducation(newEducation);
                            setNewEducation({ degree: '', school: '', year: '' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add Education
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Social Tab */}
              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Social Links</h3>
                  <div className="admin-social-list">
                    {data.social.map((social, index) => (
                      <motion.div
                        key={index}
                        className="admin-social-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <input
                          type="text"
                          value={social.platform}
                          placeholder="Platform"
                          onChange={(e) => updateSocial(index, { platform: e.target.value })}
                        />
                        <input
                          type="text"
                          value={social.url}
                          placeholder="URL"
                          onChange={(e) => updateSocial(index, { url: e.target.value })}
                        />
                        <input
                          type="color"
                          value={social.color}
                          onChange={(e) => updateSocial(index, { color: e.target.value })}
                        />
                        <button className="admin-delete-btn" onClick={() => deleteSocial(index)}>
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="admin-add-new">
                    <h4>Add New Social Link</h4>
                    <div className="admin-new-item-form">
                      <input
                        type="text"
                        placeholder="Platform name"
                        value={newSocial.platform}
                        onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={newSocial.url}
                        onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                      />
                      <input
                        type="color"
                        value={newSocial.color}
                        onChange={(e) => setNewSocial({ ...newSocial, color: e.target.value })}
                      />
                      <motion.button
                        className="admin-add-btn"
                        onClick={() => {
                          if (newSocial.platform) {
                            addSocial(newSocial);
                            setNewSocial({ platform: '', url: '', color: '#0077B5' });
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={18} />
                        Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notification Tab */}
              {activeTab === 'notification' && (
                <motion.div
                  key="notification"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>Notification Settings</h3>
                  <p className="admin-section-desc">Customize the welcome notification that appears when users open your portfolio</p>
                  
                  <div className="admin-notification-settings">
                    <div className="admin-form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={data.notification.enabled}
                          onChange={(e) => updateNotification({ enabled: e.target.checked })}
                        />
                        <span>Enable Welcome Notification</span>
                      </label>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Notification Title</label>
                      <input
                        type="text"
                        value={data.notification.title}
                        onChange={(e) => updateNotification({ title: e.target.value })}
                        placeholder="e.g., Welcome! 👋"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Notification Message</label>
                      <textarea
                        rows={3}
                        value={data.notification.message}
                        onChange={(e) => updateNotification({ message: e.target.value })}
                        placeholder="e.g., Thanks for visiting my portfolio. Enjoy exploring!"
                      />
                    </div>
                  </div>
                  
                  <div className="admin-notification-preview">
                    <h4>Preview</h4>
                    <div className="notification-preview-box">
                      <div className="notification-icon">
                        <Bell size={20} />
                      </div>
                      <div className="notification-text">
                        <h4>{data.notification.title || 'Welcome!'}</h4>
                        <p>{data.notification.message || 'Thanks for visiting!'}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* App Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  className="admin-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3>App Settings</h3>
                  <p className="admin-section-desc">Configure your PWA app settings</p>
                  
                  <div className="admin-app-settings">
                    <div className="admin-avatar-section">
                      <div className="admin-avatar-preview">
                        <img src={data.appSettings.appIcon} alt="App Icon" />
                      </div>
                      <div className="admin-avatar-actions">
                        <motion.button 
                          className="admin-btn secondary"
                          onClick={() => handleImageUpload((url) => updateAppSettings({ appIcon: url }))}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Upload size={16} />
                          Change App Icon
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>App Name</label>
                      <input
                        type="text"
                        value={data.appSettings.appName}
                        onChange={(e) => updateAppSettings({ appName: e.target.value })}
                        placeholder="e.g., Gloria Portfolio"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>App Description</label>
                      <textarea
                        rows={3}
                        value={data.appSettings.appDescription}
                        onChange={(e) => updateAppSettings({ appDescription: e.target.value })}
                        placeholder="Short description of your app"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Theme Color</label>
                      <div className="admin-color-input-wrapper">
                        <input
                          type="color"
                          value={data.appSettings.themeColor}
                          onChange={(e) => updateAppSettings({ themeColor: e.target.value })}
                        />
                        <span>{data.appSettings.themeColor}</span>
                      </div>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Background Color</label>
                      <div className="admin-color-input-wrapper">
                        <input
                          type="color"
                          value={data.appSettings.backgroundColor}
                          onChange={(e) => updateAppSettings({ backgroundColor: e.target.value })}
                        />
                        <span>{data.appSettings.backgroundColor}</span>
                      </div>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Tags</label>
                      <div className="admin-tags-list">
                        {data.appSettings.tags.map((tag, index) => (
                          <span key={index} className="admin-tag-item">
                            {tag}
                            <button onClick={() => {
                              const newTags = data.appSettings.tags.filter((_, i) => i !== index);
                              updateAppSettings({ tags: newTags });
                            }}>
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="admin-add-tag">
                        <input
                          type="text"
                          placeholder="Add tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && newTag.trim()) {
                              updateAppSettings({ tags: [...data.appSettings.tags, newTag.trim()] });
                              setNewTag('');
                            }
                          }}
                        />
                        <motion.button
                          onClick={() => {
                            if (newTag.trim()) {
                              updateAppSettings({ tags: [...data.appSettings.tags, newTag.trim()] });
                              setNewTag('');
                            }
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
