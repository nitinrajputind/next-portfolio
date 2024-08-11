"use client";
import Email from "@/components/common/Email";
import SocialIcon from "@/components/common/SocialIcon";
import About from "@/sections/about/About";
import Skill from "@/sections/skills/Skill";
import Navbar from "@/sections/header/Navbar";
import Hero from "@/sections/hero/Hero";
import React from "react";
import Experience from "@/sections/experience/Experience";
import Projects from "@/sections/projects/Projects";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <SocialIcon />
      <Email />
      <main>
        <Hero />
        <About />
        <Skill />
        <Experience />
        <Projects />
      </main>
    </div>
  );
}
