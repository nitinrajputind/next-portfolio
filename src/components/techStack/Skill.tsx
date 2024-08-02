import React, { ReactNode } from "react";
import "./skill.scss";

export default function Skill({
  icon,
  name,
}: {
  icon: ReactNode;
  name: string;
}) {
  return (
    <div className="skill">
      <div className="skill_image">{icon}</div>
      <div className="skill_name">
        <p className="skill_name_text">{name}</p>
      </div>
    </div>
  );
}
