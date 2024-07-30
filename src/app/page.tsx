import Email from "@/components/common/Email";
import SocialIcon from "@/components/common/SocialIcon";
import Navbar from "@/sections/header/Navbar";
import Hero from "@/sections/hero/Hero";
import React from "react";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <SocialIcon />
      <Email />
      <main>
        <Hero />
      </main>
    </div>
  );
}
