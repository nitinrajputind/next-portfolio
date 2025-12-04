"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Tooltip from "@/components/common/Tooltip";
import "./projects.scss";
import { projectsData } from "@/constants/constants";

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProjects, setExpandedProjects] = useState<{[key: string]: boolean}>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{[key: string]: boolean}>({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleProject = (projectName: string) => {
    // Only allow toggling on mobile
    if (isMobile) {
      setExpandedProjects(prev => {
        const isCurrentlyExpanded = prev[projectName];
        
        // If clicking on an already expanded project, collapse it
        if (isCurrentlyExpanded) {
          return {
            ...prev,
            [projectName]: false
          };
        }
        
        // If clicking on a collapsed project, collapse all others and expand this one
        const newState: {[key: string]: boolean} = {};
        Object.keys(prev).forEach(key => {
          newState[key] = false;
        });
        newState[projectName] = true;
        
        return newState;
      });
    }
  };

  const toggleDescription = (projectName: string) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectName]: !prev[projectName]
    }));
  };

  const truncateText = (text: string, limit: number = 150) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const ProjectDescription = ({ projectName, description }: { projectName: string, description: string }) => {
    const isExpanded = expandedDescriptions[projectName] || false;
    const shouldTruncate = description.length > 150;
    const truncatedText = truncateText(description);
    const fullText = description;
    const contentRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
      const checkScrollable = () => {
        if (contentRef.current) {
          const { scrollHeight, clientHeight } = contentRef.current;
          setIsScrollable(scrollHeight > clientHeight);
        }
      };

      checkScrollable();
      window.addEventListener('resize', checkScrollable);
      return () => window.removeEventListener('resize', checkScrollable);
    }, [isExpanded, description]);

     return (
       <div className="project_info_description">
         <motion.div
           ref={contentRef}
           initial={false}
           animate={{ 
             height: "auto",
             opacity: 1
           }}
           transition={{ 
             duration: 0.4, 
             ease: "easeInOut",
             opacity: { duration: 0.2 }
           }}
           className={`project_description_content ${isScrollable ? 'scrollable' : ''}`}
         >
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'full' : 'truncated'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              {shouldTruncate && !isExpanded ? truncatedText : fullText}
            </motion.p>
          </AnimatePresence>
        </motion.div>
        {shouldTruncate && (
          <motion.button 
            className="project_info_read_more"
            onClick={() => toggleDescription(projectName)}
            whileHover={{ 
              scale: 1.05,
              color: "var(--lightest-slate)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 17 
            }}
          >
            <motion.span
              key={isExpanded ? 'less' : 'more'}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </motion.span>
          </motion.button>
        )}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  return (
    <section className="projects section" id="projects">
      <motion.div 
        className="projects_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="projects_header" variants={itemVariants}>
          <h2 className="projects_title">
            <span className="projects_title_number">06.</span>
            Some Things I&apos;ve Built
          </h2>
          <div className="projects_title_line"></div>
        </motion.div>

        {/* Project Categories */}
        <motion.div className="projects_categories" variants={itemVariants}>
          <div className="projects_categories_list">
            <button className="projects_category_btn active">All Projects</button>
            <button className="projects_category_btn">Web Applications</button>
            <button className="projects_category_btn">E-Commerce</button>
            <button className="projects_category_btn">Mobile Apps</button>
          </div>
        </motion.div>

        <motion.div className="projects_content" variants={itemVariants}>
          {projectsData &&
            projectsData?.map(
              ({
                image,
                projectDescription,
                projectLink,
                projectExternalLinks,
                projectName,
                projectTech,
                isPrivate,
                category,
                metrics,
                featured,
              }, index) => {
                const isEven = index % 2 === 0;
                const isExpanded = expandedProjects[projectName] || false;
                const shouldShowContent = !isMobile || isExpanded;
                
                return (
                  <motion.div
                    className={`project ${isEven ? 'project--left' : 'project--right'}`}
                    key={projectName}
                    variants={itemVariants}
                  >
                    <div className="project_image">
                      <div className="project_image_overlay"></div>
                      <div className="project_image_container">
                        <Image src={image} fill alt={projectName} quality={100} />
                      </div>
                    </div>
                    <div className="project_info">
                      <div className="project_info_header" onClick={() => toggleProject(projectName)}>
                        <div className="project_info_header_content">
                          <div className="project_info_header_text">
                            <p className="project_info_overline">{featured ? 'Featured Project' : 'Project'}</p>
                            <h3 className="project_info_title">{projectName}</h3>
                            {category && <span className="project_info_category">{category}</span>}
                          </div>
                          {isMobile && (
                            <div className="project_info_toggle">
                              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          )}
                        </div>
                        
                        {/* Project Metrics */}
                        {metrics && (
                          <div className="project_info_metrics">
                            <div className="project_metric">
                              <span className="project_metric_value">{metrics.users}</span>
                              <span className="project_metric_label">Users</span>
                            </div>
                            <div className="project_metric">
                              <span className="project_metric_value">{metrics.performance}</span>
                              <span className="project_metric_label">Performance</span>
                            </div>
                            <div className="project_metric">
                              <span className="project_metric_value">{metrics.uptime}</span>
                              <span className="project_metric_label">Uptime</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {isMobile ? (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              className="project_info_body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <ProjectDescription 
                                projectName={projectName} 
                                description={projectDescription} 
                              />
                              <ul className="project_info_tech_list">
                                {projectTech.map((tech) => (
                                  <li className="project_info_tech_item" key={tech}>
                                    {tech}
                                  </li>
                                ))}
                              </ul>
                              <ul className="project_info_links">
                                <li className="project_info_links_item">
                                  {isPrivate ? (
                                    <Tooltip
                                      content="Client project for security reason we can't show you source code"
                                      position="top"
                                      delay={200}
                                    >
                                      <div className="project_info_links_link project_info_links_link--disabled">
                                        <FiGithub />
                                      </div>
                                    </Tooltip>
                                  ) : (
                                    <Link
                                      href={projectExternalLinks.github}
                                      className="project_info_links_link"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <FiGithub />
                                    </Link>
                                  )}
                                </li>
                                <li className="project_info_links_item">
                                  <Link
                                    href={projectExternalLinks.externalLink}
                                    className="project_info_links_link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FiExternalLink />
                                  </Link>
                                </li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ) : (
                        <div className="project_info_body">
                          <ProjectDescription 
                            projectName={projectName} 
                            description={projectDescription} 
                          />
                          <ul className="project_info_tech_list">
                            {projectTech.map((tech) => (
                              <li className="project_info_tech_item" key={tech}>
                                {tech}
                              </li>
                            ))}
                          </ul>
                          <ul className="project_info_links">
                            <li className="project_info_links_item">
                            {isPrivate ? (
                              <Tooltip
                                content="Client project for security reason we can't show you source code"
                                position="top"
                                delay={200}
                              >
                                <div className="project_info_links_link project_info_links_link--disabled">
                                  <FiGithub />
                                </div>
                              </Tooltip>
                            ) : (
                                <Link
                                  href={projectExternalLinks.github}
                                  className="project_info_links_link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FiGithub />
                                </Link>
                              )}
                            </li>
                            <li className="project_info_links_item">
                              <Link
                                href={projectExternalLinks.externalLink}
                                className="project_info_links_link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FiExternalLink />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              }
            )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;
