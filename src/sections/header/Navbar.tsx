"use client";
import Button from "@/components/button/Button";
import Logo from "@/components/brand/Logo";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./navbar.scss";
import { sectionLink } from "@/constants/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Nitin_Rajput_SDE.pdf';
    link.download = 'Nitin_Rajput_SDE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeMenu(); // Close mobile menu if open
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar_wrapper">
        <div className="navbar_brand">
          <Link href={"/"} onClick={closeMenu}>
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar_desktop">
          <ul className="navbar_list">
            {sectionLink &&
              sectionLink?.map(({ name, link }, index) => {
                return (
                  <li className="navbar_list_item" key={name || index}>
                    <Link 
                      className="navbar_list_item_link" 
                      href={link}
                      onClick={closeMenu}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className="navbar_button">
            <Button 
              text={"Resume"} 
              onClick={downloadResume}
              size="small" 
              type="button"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="navbar_mobile_toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`navbar_mobile_toggle_line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`navbar_mobile_toggle_line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`navbar_mobile_toggle_line ${isMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="navbar_mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Show scroll hint only if menu has many items */}
            {sectionLink && sectionLink.length > 6 && (
              <div className="navbar_mobile_scroll_hint">
                <span>Scroll to see all sections</span>
              </div>
            )}
            
            <ul className="navbar_mobile_list">
              {sectionLink &&
                sectionLink?.map(({ name, link }, index) => {
                  return (
                    <li className="navbar_mobile_list_item" key={name || index}>
                      <Link 
                        className="navbar_mobile_list_item_link" 
                        href={link}
                        onClick={closeMenu}
                      >
                        {name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className="navbar_mobile_button">
              <Button 
                text={"Resume"} 
                onClick={downloadResume}
                size="medium" 
                type="button"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
