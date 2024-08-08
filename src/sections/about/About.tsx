// "use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./about.scss";
import { aboutImage } from "@/assets";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);
  return (
    <div className="about" id="about">
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about_grid">
        <div className="about_grid_info">
          <p className="about_grid_info_text">
            Bonjour! My name is Nitin Rajput, As a passionate and driven
            full-stack software engineer, I specialize in crafting dynamic and
            responsive web applications using the MERN stack—MongoDB,
            Express.js, React, and Node.js. With over 5 years of hands-on
            experience, I thrive on turning complex problems into elegant and
            efficient solutions.
          </p>
          <p className="about_grid_info_text">
            My expertise lies in developing robust backend services with Node.js
            and Express, designing intuitive and engaging frontend interfaces
            with React, and managing data with MongoDB. I am adept at
            integrating these technologies to create seamless and performant
            applications that meet user needs and business goals.
          </p>
          <p className="about_grid_info_text">
            At the core of my work is a strong belief in creating accessible and
            user-centered digital experiences. As part of the talented team at
            Rapidos, I am dedicated to delivering high-quality products that
            make a real impact. Whether it&apos;s building a scalable web
            platform or improving existing systems, I bring a proactive and
            collaborative approach to every challenge.
          </p>
        </div>
        <div className="about_grid_photo">
          <div className="about_grid_photo_container">
            <Image src={aboutImage} alt="profile" fill loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
