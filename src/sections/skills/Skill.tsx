import CardStack from "@/components/techStack/CardStack";
import React from "react";
import "./skill.scss";
import { technoolgy } from "@/constants/constants";

export default function Experience() {
  return (
    <div className="Skill_Section" id="skills">
      <div className="Skill_Section_title">
        <h2>Skills</h2>
      </div>
      <p className="Skill_Section_description">
        Here are some of my skills on which I have been working on for the past
        few years.
      </p>
      <div className="Skill_Section_grid">
        {technoolgy &&
          technoolgy?.map(({ name, skill }) => {
            return <CardStack name={name} skill={skill} key={name} />;
          })}
      </div>
    </div>
  );
}
