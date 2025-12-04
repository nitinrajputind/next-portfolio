"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Above-the-fold: keep Navbar & Hero eagerly loaded if needed for UX
import Navbar from "@/sections/header/Navbar";
import Hero from "@/sections/hero/Hero";

// Lazy loaded components (below-the-fold or non-critical)
const About = dynamic(() => import("@/sections/about/About"), { ssr: false });
const Skill = dynamic(() => import("@/sections/skills/Skill"), { ssr: false });
const Experience = dynamic(() => import("@/sections/experience/Experience"), { ssr: false });
const Education = dynamic(() => import("@/sections/education/Education"), { ssr: false });
const Achievements = dynamic(() => import("@/sections/achievements/Achievements"), { ssr: false });
const Projects = dynamic(() => import("@/sections/projects/Projects"), { ssr: false });
const Contact = dynamic(() => import("@/sections/contact/Contact"), { ssr: false });
const SocialIcon = dynamic(() => import("@/components/common/SocialIcon"), { ssr: false });
const Email = dynamic(() => import("@/components/common/Email"), { ssr: false });
const ThemeFab = dynamic(() => import("@/components/common/ThemeFab"), { ssr: false });

// Lightweight skeleton to reserve space and prevent CLS
const SectionSkeleton = ({ height = 480 }: { height?: number }) => (
  <div
    style={{
      height,
      borderRadius: 8,
      background: "rgba(100,255,218,0.06)",
      border: "1px solid rgba(100,255,218,0.15)"
    }}
  />
);

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={null}>
        <SocialIcon />
      </Suspense>
      <Suspense fallback={null}>
        <Email />
      </Suspense>
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton height={520} />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={520} />}>
          <Skill />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={520} />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={500} />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={600} />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={640} />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton height={480} />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <ThemeFab />
      </Suspense>
    </div>
  );
}
