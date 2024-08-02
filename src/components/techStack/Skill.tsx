import React, { ReactNode } from "react";
import "./skill.scss";
import SvgIcon from "../svg/SvgIcon";

export default function Skill({
  icon,
  name,
}: {
  icon: string;
  name: string;
}) {
  return (
    <div className="skill">
      <div className="skill_image">
        <SvgIcon name={icon} width={32} height={32} />
      </div>
      <div className="skill_name">
        <p className="skill_name_text">{name}</p>
      </div>
    </div>
  );
}
