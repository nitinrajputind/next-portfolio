"use client";
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiAward, FiStar, FiExternalLink, FiCalendar, FiMapPin } from "react-icons/fi";
import { RiTrophyLine } from "react-icons/ri";
import { SiAmazon, SiGoogle, SiReact, SiNodedotjs, SiDocker } from "react-icons/si";
import "./achievements.scss";

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'certification' | 'award' | 'competition' | 'contribution';
  description: string;
  icon?: any;
  link?: string;
  skills?: string[];
  featured?: boolean;
  credentialId?: string;
  location?: string;
}

// Memoize achievements data to prevent recreation on every render
const achievements: Achievement[] = [
  {
    id: "aws-certified",
    title: "AWS Certified Developer - Associate",
    organization: "Amazon Web Services",
    date: "2024",
    type: "certification",
    description: "Demonstrated expertise in developing and maintaining applications on the AWS platform, including deployment, debugging, and optimization.",
    icon: SiAmazon,
    link: "https://aws.amazon.com/certification/",
    skills: ["AWS", "Cloud Computing", "Lambda", "EC2", "S3"],
    featured: true,
    credentialId: "AWS-CDA-2024-001"
  },
  {
    id: "react-expert",
    title: "React Advanced Certification",
    organization: "Meta (Facebook)",
    date: "2023",
    type: "certification",
    description: "Advanced React development certification covering hooks, context, performance optimization, and modern React patterns.",
    icon: SiReact,
    link: "https://developers.facebook.com/",
    skills: ["React", "Hooks", "Context API", "Performance"],
    featured: true,
    credentialId: "META-REACT-2023-042"
  },
  {
    id: "hackathon-winner",
    title: "1st Place - National Web Development Hackathon",
    organization: "TechFest India",
    date: "2023",
    type: "competition",
    description: "Led a team of 4 developers to build an innovative healthcare platform in 48 hours, winning first place among 200+ teams.",
    icon: RiTrophyLine,
    location: "Mumbai, India",
    skills: ["Team Leadership", "Full-Stack Development", "Healthcare Tech"],
    featured: true
  },
  {
    id: "google-cloud",
    title: "Google Cloud Professional Developer",
    organization: "Google Cloud",
    date: "2023",
    type: "certification",
    description: "Certified in designing, building, and deploying applications on Google Cloud Platform with focus on scalability and security.",
    icon: SiGoogle,
    link: "https://cloud.google.com/certification",
    skills: ["GCP", "Kubernetes", "Cloud Functions", "BigQuery"],
    featured: false,
    credentialId: "GCP-PD-2023-789"
  },
  {
    id: "open-source",
    title: "Top Contributor - React Community",
    organization: "GitHub",
    date: "2023",
    type: "contribution",
    description: "Recognized as top contributor to React ecosystem with 50+ merged PRs across various open source projects.",
    icon: FiStar,
    link: "https://github.com/nitinrajputind",
    skills: ["Open Source", "React", "Community Building"],
    featured: false
  },
  {
    id: "docker-certified",
    title: "Docker Certified Associate",
    organization: "Docker Inc.",
    date: "2022",
    type: "certification",
    description: "Demonstrated proficiency in containerization, orchestration, and Docker best practices for production environments.",
    icon: SiDocker,
    link: "https://www.docker.com/certification",
    skills: ["Docker", "Containerization", "DevOps"],
    featured: false,
    credentialId: "DOCKER-DCA-2022-156"
  },
  {
    id: "coding-champion",
    title: "Coding Champion - University Level",
    organization: "Chaudhary Charan Singh University",
    date: "2022",
    type: "award",
    description: "Won the university-wide coding competition with innovative algorithm solutions and optimal code performance.",
    icon: FiAward,
    location: "Meerut, India",
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    featured: false
  }
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(null);

  // Reset expanded state when filter changes
  useEffect(() => {
    setExpandedAchievement(null);
  }, [selectedType]);

  const types = [
    { value: 'all', label: 'All', icon: FiStar },
    { value: 'certification', label: 'Certifications', icon: FiAward },
    { value: 'award', label: 'Awards', icon: RiTrophyLine },
    { value: 'competition', label: 'Competitions', icon: RiTrophyLine },
    { value: 'contribution', label: 'Contributions', icon: FiStar },
  ];

  // Memoize expensive filtering operations
  const filteredAchievements = useMemo(() => 
    selectedType === 'all' 
      ? achievements 
      : achievements.filter(achievement => achievement.type === selectedType),
    [selectedType]
  );

  const featuredAchievements = useMemo(() => 
    achievements.filter(a => a.featured),
    []
  );


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Memoize icon lookup function
  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'certification': return FiAward;
      case 'award': return RiTrophyLine;
      case 'competition': return RiTrophyLine;
      case 'contribution': return FiStar;
      default: return FiStar;
    }
  }, []);

  return (
    <section className="achievements section" id="achievements">
      <motion.div 
        className="achievements_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="achievements_header" variants={itemVariants}>
          <h2 className="achievements_title">
            <span className="achievements_title_number">05.</span>
            Achievements & Certifications
          </h2>
          <div className="achievements_title_line"></div>
        </motion.div>

        {/* Featured Achievements */}
        <motion.div className="achievements_featured" variants={itemVariants}>
          <h3>Featured Achievements</h3>
          <div className="achievements_featured_grid">
            {featuredAchievements.map((achievement, index) => {
              const Icon = achievement.icon || getTypeIcon(achievement.type);
              return (
                <motion.div
                  key={achievement.id}
                  className="achievements_featured_card"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="achievements_featured_card_icon">
                    <Icon />
                  </div>
                  <div className="achievements_featured_card_content">
                    <h4>{achievement.title}</h4>
                    <p className="achievements_featured_card_org">{achievement.organization}</p>
                    <p className="achievements_featured_card_desc">{achievement.description}</p>
                    <div className="achievements_featured_card_meta">
                      <span className="achievements_featured_card_date">
                        <FiCalendar /> {achievement.date}
                      </span>
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="achievements_featured_card_link"
                        >
                          <FiExternalLink /> Verify
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="achievements_filters" variants={itemVariants}>
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.value}
                className={`achievements_filter ${selectedType === type.value ? 'active' : ''}`}
                onClick={() => setSelectedType(type.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
                <span>{type.label}</span>
                {selectedType === type.value && (
                  <span className="achievements_filter_count">
                    {type.value === 'all' ? achievements.length : filteredAchievements.length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* All Achievements List */}
        <motion.div className="achievements_list" variants={itemVariants}>
          <div className="achievements_grid">
            {filteredAchievements.length === 0 ? (
              <div className="achievements_empty">
                <FiStar size={48} />
                <h4>No achievements found</h4>
                <p>No achievements match the selected filter. Try selecting &quot;All&quot; to see all achievements.</p>
              </div>
            ) : (
              filteredAchievements.map((achievement, index) => {
                const Icon = achievement.icon || getTypeIcon(achievement.type);
                const isExpanded = expandedAchievement === achievement.id;
                
                return (
                  <motion.div
                    key={`${selectedType}-${achievement.id}`}
                    className={`achievements_card ${achievement.featured ? 'featured' : ''} ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedAchievement(isExpanded ? null : achievement.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="achievements_card_header">
                      <div className="achievements_card_icon">
                        <Icon />
                        <div className={`achievements_card_badge achievements_card_badge--${achievement.type}`}>
                          {achievement.type}
                        </div>
                      </div>
                      <div className="achievements_card_info">
                        <h4>{achievement.title}</h4>
                        <p className="achievements_card_org">{achievement.organization}</p>
                        <div className="achievements_card_meta">
                          <span><FiCalendar /> {achievement.date}</span>
                          {achievement.location && (
                            <span><FiMapPin /> {achievement.location}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="achievements_card_details"
                        >
                          <p>{achievement.description}</p>
                          
                          {achievement.skills && (
                            <div className="achievements_card_skills">
                              <h5>Related Skills:</h5>
                              <div className="achievements_card_skills_list">
                                {achievement.skills.map((skill) => (
                                  <span key={skill} className="achievements_card_skill">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {achievement.credentialId && (
                            <div className="achievements_card_credential">
                              <strong>Credential ID:</strong> {achievement.credentialId}
                            </div>
                          )}
                          
                          {achievement.link && (
                            <a 
                              href={achievement.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="achievements_card_verify"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiExternalLink /> Verify Certificate
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  );
                })
              )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
