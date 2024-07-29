import Email from "@/components/Email";
import SocialIcon from "@/components/SocialIcon";
import Navbar from "@/sections/Navbar";
import React from "react";

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <SocialIcon />
      <Email/>
    </div>
  );
}
