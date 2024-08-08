import React from "react";
import ExperienceCard from "@/components/experience/ExperienceCard";
import "./experience.scss";
import { experience } from "@/constants/constants";

export default function Experience() {
  return (
    <div className="experience" id="experience">
      <div className="experience_title">
        <h2>Experience</h2>
      </div>
      <p className="experience_description">Where I have worked</p>
      <div className="experience_contanier">
        {experience &&
          experience?.map((item, index) => (
            <ExperienceCard
              key={index}
              icon={item.image}
              role={item.role}
              details={item.description}
              duration={item.duration}
              company={item.company}
              skills={item.skills}
            />
          ))}
      </div>
    </div>
  );
}
