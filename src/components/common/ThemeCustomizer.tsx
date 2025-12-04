"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSettings, FiType, FiZap, FiLayout, FiX, FiCheck } from "react-icons/fi";
import { RiPaletteLine } from "react-icons/ri";
import "./themeCustomizer.scss";

interface ThemePreferences {
  colorScheme: string;
  animationIntensity: number;
  typography: string;
  layout: string;
  particleDensity: number;
}

const colorSchemes = [
  { name: "Purple Indigo", primary: "#8b5cf6", secondary: "#6366f1", accent: "#ec4899" },
  { name: "Blue Ocean", primary: "#3b82f6", secondary: "#0ea5e9", accent: "#06b6d4" },
  { name: "Green Forest", primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  { name: "Orange Sunset", primary: "#f59e0b", secondary: "#ea580c", accent: "#fb923c" },
  { name: "Pink Rose", primary: "#ec4899", secondary: "#be185d", accent: "#f472b6" },
  { name: "Teal Mint", primary: "#14b8a6", secondary: "#0d9488", accent: "#5eead4" },
];

const typographyOptions = [
  { name: "Modern", value: "modern", description: "Clean and contemporary" },
  { name: "Classic", value: "classic", description: "Traditional and elegant" },
  { name: "Tech", value: "tech", description: "Monospace focused" },
];

const layoutOptions = [
  { name: "Compact", value: "compact", description: "Dense information layout" },
  { name: "Spacious", value: "spacious", description: "More breathing room" },
  { name: "Minimal", value: "minimal", description: "Clean and simple" },
];

const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'animations'>('colors');
  const [preferences, setPreferences] = useState<ThemePreferences>({
    colorScheme: "Purple Indigo",
    animationIntensity: 1,
    typography: "modern",
    layout: "spacious",
    particleDensity: 80,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme-preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
        applyThemePreferences(parsed);
      } catch (error) {
        console.error('Failed to parse theme preferences:', error);
      }
    }
  }, []);

  // Memoize hex to RGB conversion
  const hex2rgb = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }, []);

  // Apply theme preferences to document
  const applyThemePreferences = useCallback((prefs: ThemePreferences) => {
    const root = document.documentElement;
    const scheme = colorSchemes.find(s => s.name === prefs.colorScheme);
    
    if (scheme) {
      root.style.setProperty('--theme-color', scheme.primary);
      root.style.setProperty('--theme-secondary', scheme.secondary);
      root.style.setProperty('--theme-accent', scheme.accent);
      
      // Update RGB values for transparency usage
      root.style.setProperty('--theme-color-rgb', hex2rgb(scheme.primary));
    }
    
    // Apply typography
    root.setAttribute('data-typography', prefs.typography);
    
    // Apply layout
    root.setAttribute('data-layout', prefs.layout);
    
    // Apply animation intensity
    root.style.setProperty('--animation-scale', prefs.animationIntensity.toString());
    
    // Apply particle density (this would need to be handled by StarField component)
    root.style.setProperty('--particle-density', prefs.particleDensity.toString());
  }, [hex2rgb]);

  // Memoize preference update to prevent unnecessary re-renders
  const updatePreference = useCallback(<K extends keyof ThemePreferences>(
    key: K, 
    value: ThemePreferences[K]
  ) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    setHasChanges(true);
    applyThemePreferences(newPrefs);
  }, [preferences, applyThemePreferences]);

  const savePreferences = useCallback(() => {
    localStorage.setItem('portfolio-theme-preferences', JSON.stringify(preferences));
    setHasChanges(false);
  }, [preferences]);

  const resetToDefaults = useCallback(() => {
    const defaults: ThemePreferences = {
      colorScheme: "Purple Indigo",
      animationIntensity: 1,
      typography: "modern",
      layout: "spacious",
      particleDensity: 80,
    };
    setPreferences(defaults);
    applyThemePreferences(defaults);
    setHasChanges(true);
  }, [applyThemePreferences]);

  const tabs = [
    { id: 'colors' as const, icon: RiPaletteLine, label: 'Colors' },
    { id: 'typography' as const, icon: FiType, label: 'Typography' },
    { id: 'layout' as const, icon: FiLayout, label: 'Layout' },
    { id: 'animations' as const, icon: FiZap, label: 'Animations' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="theme-customizer__fab"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <FiSettings />
        {hasChanges && <div className="theme-customizer__fab-indicator" />}
      </motion.button>

      {/* Customizer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="theme-customizer__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="theme-customizer__panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="theme-customizer__header">
                <h3>Customize Portfolio</h3>
                <button
                  className="theme-customizer__close"
                  onClick={() => setIsOpen(false)}
                >
                  <FiX />
                </button>
              </div>

              {/* Tabs */}
              <div className="theme-customizer__tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`theme-customizer__tab ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="theme-customizer__content">
                {/* Colors Tab */}
                {activeTab === 'colors' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-customizer__section"
                  >
                    <h4>Color Schemes</h4>
                    <div className="theme-customizer__color-grid">
                      {colorSchemes.map((scheme) => (
                        <motion.button
                          key={scheme.name}
                          className={`theme-customizer__color-option ${
                            preferences.colorScheme === scheme.name ? 'active' : ''
                          }`}
                          onClick={() => updatePreference('colorScheme', scheme.name)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="theme-customizer__color-preview">
                            <div style={{ backgroundColor: scheme.primary }} />
                            <div style={{ backgroundColor: scheme.secondary }} />
                            <div style={{ backgroundColor: scheme.accent }} />
                          </div>
                          <span>{scheme.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Typography Tab */}
                {activeTab === 'typography' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-customizer__section"
                  >
                    <h4>Typography Style</h4>
                    <div className="theme-customizer__option-list">
                      {typographyOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          className={`theme-customizer__option ${
                            preferences.typography === option.value ? 'active' : ''
                          }`}
                          onClick={() => updatePreference('typography', option.value)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="theme-customizer__option-info">
                            <span className="theme-customizer__option-name">{option.name}</span>
                            <span className="theme-customizer__option-desc">{option.description}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Layout Tab */}
                {activeTab === 'layout' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-customizer__section"
                  >
                    <h4>Layout Style</h4>
                    <div className="theme-customizer__option-list">
                      {layoutOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          className={`theme-customizer__option ${
                            preferences.layout === option.value ? 'active' : ''
                          }`}
                          onClick={() => updatePreference('layout', option.value)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="theme-customizer__option-info">
                            <span className="theme-customizer__option-name">{option.name}</span>
                            <span className="theme-customizer__option-desc">{option.description}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Animations Tab */}
                {activeTab === 'animations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="theme-customizer__section"
                  >
                    <h4>Animation Settings</h4>
                    
                    <div className="theme-customizer__slider-group">
                      <label>Animation Intensity</label>
                      <div className="theme-customizer__slider-wrapper">
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={preferences.animationIntensity}
                          onChange={(e) => updatePreference('animationIntensity', parseFloat(e.target.value))}
                          className="theme-customizer__slider"
                        />
                        <span className="theme-customizer__slider-value">
                          {preferences.animationIntensity.toFixed(1)}x
                        </span>
                      </div>
                    </div>

                    <div className="theme-customizer__slider-group">
                      <label>Particle Density</label>
                      <div className="theme-customizer__slider-wrapper">
                        <input
                          type="range"
                          min="20"
                          max="150"
                          step="10"
                          value={preferences.particleDensity}
                          onChange={(e) => updatePreference('particleDensity', parseInt(e.target.value))}
                          className="theme-customizer__slider"
                        />
                        <span className="theme-customizer__slider-value">
                          {preferences.particleDensity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <div className="theme-customizer__actions">
                <motion.button
                  className="theme-customizer__action theme-customizer__action--reset"
                  onClick={resetToDefaults}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
                
                <motion.button
                  className={`theme-customizer__action theme-customizer__action--save ${
                    hasChanges ? 'has-changes' : ''
                  }`}
                  onClick={savePreferences}
                  disabled={!hasChanges}
                  whileHover={{ scale: hasChanges ? 1.05 : 1 }}
                  whileTap={{ scale: hasChanges ? 0.95 : 1 }}
                >
                  <FiCheck />
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeCustomizer;
