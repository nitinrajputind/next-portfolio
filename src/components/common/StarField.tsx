"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./starField.scss";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  moveSpeed: number;
  type: 'dot' | 'cross' | 'diamond';
}

interface StarFieldProps {
  density?: number; // number of stars
  maxSize?: number; // maximum star size
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({ 
  density = 100, 
  maxSize = 3,
  className = ""
}) => {
  // Check for custom particle density from theme customizer
  const [customDensity, setCustomDensity] = useState(density);
  
  useEffect(() => {
    const updateDensity = () => {
      const customValue = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-density').trim();
      if (customValue) {
        setCustomDensity(parseInt(customValue) || density);
      }
    };
    
    updateDensity();
    
    // Listen for theme customizer changes
    const observer = new MutationObserver(updateDensity);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });
    
    return () => observer.disconnect();
  }, [density]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);

  // Initialize stars with theme-aware properties
  const initializeStars = (width: number, height: number) => {
    const stars: Star[] = [];
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    for (let i = 0; i < customDensity; i++) {
      // Enhanced properties for light theme visibility
      const baseOpacity = isLight ? 0.7 : 0.5;
      const opacityRange = isLight ? 0.3 : 0.5;
      const baseTwinkleSpeed = isLight ? 0.008 : 0.005;
      const twinkleRange = isLight ? 0.015 : 0.02;
      
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize + (isLight ? 0.8 : 0.5),
        opacity: Math.random() * opacityRange + baseOpacity,
        twinkleSpeed: Math.random() * twinkleRange + baseTwinkleSpeed,
        moveSpeed: Math.random() * 0.1 + 0.02,
        type: ['dot', 'cross', 'diamond'][Math.floor(Math.random() * 3)] as 'dot' | 'cross' | 'diamond'
      });
    }
    
    starsRef.current = stars;
  };

  // Draw different star types
  const drawStar = (
    ctx: CanvasRenderingContext2D, 
    star: Star, 
    currentOpacity: number,
    theme: 'light' | 'dark'
  ) => {
    const { x, y, size, type } = star;
    
    // Enhanced theme-aware colors
    const colors = {
      light: {
        primary: `rgba(99, 102, 241, ${currentOpacity * 0.9})`, // Indigo - more visible
        secondary: `rgba(59, 130, 246, ${currentOpacity * 0.8})`, // Blue
        accent: `rgba(168, 85, 247, ${currentOpacity * 0.7})`, // Purple
        warm: `rgba(245, 158, 11, ${currentOpacity * 0.6})`, // Amber
        cool: `rgba(14, 165, 233, ${currentOpacity * 0.5})`, // Sky blue
        soft: `rgba(107, 114, 128, ${currentOpacity * 0.8})` // Gray - darker for visibility
      },
      dark: {
        primary: `rgba(196, 181, 253, ${currentOpacity})`, // Light purple
        secondary: `rgba(147, 197, 253, ${currentOpacity})`, // Light blue
        accent: `rgba(251, 146, 190, ${currentOpacity})`, // Light pink
        warm: `rgba(252, 211, 77, ${currentOpacity})`, // Light amber
        cool: `rgba(125, 211, 252, ${currentOpacity})`, // Light sky
        soft: `rgba(229, 231, 235, ${currentOpacity * 0.8})` // Light gray
      }
    };

    const colorSet = colors[theme];
    const colorKeys = Object.keys(colorSet) as Array<keyof typeof colorSet>;
    const randomColor = colorSet[colorKeys[Math.floor(Math.random() * colorKeys.length)]];

    ctx.fillStyle = randomColor;
    ctx.strokeStyle = randomColor;
    ctx.lineWidth = 0.5;

    switch (type) {
      case 'dot':
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced glow effect based on theme
        if (theme === 'light') {
          ctx.shadowBlur = size * 3;
          ctx.shadowColor = randomColor;
          ctx.fill();
          // Add inner bright core for light theme
          ctx.shadowBlur = size * 1.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.shadowBlur = size * 2;
          ctx.shadowColor = randomColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        break;

      case 'cross':
        ctx.beginPath();
        // Horizontal line
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        // Vertical line
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        ctx.stroke();
        
        // Enhanced glow for crosses
        if (theme === 'light') {
          ctx.lineWidth = 1;
          ctx.shadowBlur = size * 2;
          ctx.shadowColor = randomColor;
          ctx.stroke();
          // Add bright center for light theme
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = size;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          ctx.shadowBlur = size;
          ctx.shadowColor = randomColor;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        break;

      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * 0.7, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size * 0.7, y);
        ctx.closePath();
        ctx.fill();
        
        // Enhanced glow for diamonds
        if (theme === 'light') {
          ctx.shadowBlur = size * 2.5;
          ctx.shadowColor = randomColor;
          ctx.fill();
          // Add bright center for light theme
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
          ctx.shadowBlur = size;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.shadowBlur = size * 1.5;
          ctx.shadowColor = randomColor;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        break;
    }
  };

  // Scroll-optimized animation loop
  const lastScrollY = useRef(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    
    // Detect scrolling for performance optimization
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY.current) > 2) {
      isScrolling.current = true;
      lastScrollY.current = currentScrollY;
      
      // Add scroll optimization class
      if (containerRef.current) {
        containerRef.current.classList.add('scroll-optimized');
      }
      
      // Clear scroll timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        // Remove scroll optimization class
        if (containerRef.current) {
          containerRef.current.classList.remove('scroll-optimized');
        }
      }, 150);
    }
    
    // Adaptive frame rate based on scroll state
    const now = performance.now();
    const targetFPS = isScrolling.current ? 30 : 60;
    const frameTime = 1000 / targetFPS;
    
    if (now - (timeRef.current || 0) < frameTime) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    // Clear canvas efficiently
    ctx.clearRect(0, 0, width, height);
    
    // Cache theme check
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    
    timeRef.current = now;
    const time = now * 0.001;
    
    // Scroll-aware star count and complexity
    const baseStarCount = theme === 'light' ? 80 : 100; // Reduced base count
    const activeStarCount = isScrolling.current ? 
      Math.floor(baseStarCount * 0.4) : // 40% during scroll
      Math.min(starsRef.current.length, baseStarCount);
    
    // Batch canvas operations
    ctx.save();
    
    // Optimized star rendering
    for (let i = 0; i < activeStarCount; i++) {
      const star = starsRef.current[i];
      
      // Reduced movement during scroll
      const movementScale = isScrolling.current ? 0.3 : 1;
      star.x += Math.sin(time * star.moveSpeed) * 0.05 * movementScale;
      star.y += Math.cos(time * star.moveSpeed * 0.7) * 0.025 * movementScale;
      
      // Boundary wrapping
      if (star.x < -10) star.x = width + 10;
      else if (star.x > width + 10) star.x = -10;
      if (star.y < -10) star.y = height + 10;
      else if (star.y > height + 10) star.y = -10;
      
      // Reduced twinkling during scroll
      const twinkleFreq = isScrolling.current ? 20 : 50;
      const twinkle = Math.sin(time * star.twinkleSpeed * twinkleFreq) * 0.5 + 0.5;
      const currentOpacity = star.opacity * twinkle;
      
      // Higher culling during scroll
      const minOpacity = isScrolling.current ? 0.4 : 0.15;
      if (currentOpacity > minOpacity) {
        drawStar(ctx, star, currentOpacity, theme);
      }
    }
    
    ctx.restore();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    initializeStars(innerWidth, innerHeight);
  }, [initializeStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial size
    handleResize();
    
    // Start animation
    animate();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleResize]);

  return (
    <div ref={containerRef} className={`starfield ${className}`}>
      <canvas
        ref={canvasRef}
        className="starfield__canvas"
      />
      
      {/* Animated gradient overlay for extra magic */}
      <motion.div 
        className="starfield__gradient"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.02) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Theme-specific shooting stars */}
      <div className="starfield__shooting-stars">
        {/* Dark theme shooting stars - Classic meteors */}
        <div className="starfield__shooting-stars--dark">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`dark-${i}`}
              className="starfield__shooting-star starfield__shooting-star--meteor"
              initial={{ 
                x: "-100px", 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400),
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                x: ["calc(100vw + 100px)"],
                y: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400) + 150
                ],
                opacity: [0, 1, 0.8, 0],
                scale: [0.8, 1.2, 1, 0.6]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Light theme shooting stars - Sparkle trails */}
        <div className="starfield__shooting-stars--light">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="starfield__shooting-star starfield__shooting-star--sparkle"
              initial={{ 
                x: "-80px", 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400),
                opacity: 0,
                rotate: 0
              }}
              animate={{
                x: ["calc(100vw + 80px)"],
                y: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400),
                  Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 400) + 80
                ],
                opacity: [0, 0.8, 0.6, 0],
                rotate: [0, 180, 360],
                scale: [0.6, 1, 0.8, 0.4]
              }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                delay: i * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Light theme floating orbs */}
        <div className="starfield__floating-orbs">
          {Array.from({ length: 2 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="starfield__floating-orb"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 50,
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                x: [
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                  Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800)
                ],
                y: [-100],
                opacity: [0, 0.4, 0.6, 0],
                scale: [0.5, 1.2, 1, 0.3]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 10,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarField;
