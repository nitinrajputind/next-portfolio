import React from "react";
import Skill from "./Skill";
import "./skill.scss";

interface Skills {
  name: string;
  icon: React.ReactNode;
}

interface CardStackProps {
  name: string;
  skill: Skills[];
}

const CardStack: React.FC<CardStackProps> = ({ name, skill }) => {
  return (
    <div className="stack_card">
      <div className="stack_card_name">
        <p className="stack_card_name_text">{name}</p>
      </div>
      <div className="stack_card_skills">
        {skill &&
          skill.map((tech, index) => {
            return <Skill icon={tech.icon} name={tech.name} key={index} />;
          })}
      </div>
    </div>
  );
};

export default CardStack;
