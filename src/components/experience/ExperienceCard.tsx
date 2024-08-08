import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import "./experienceCard.scss";
import Image from "next/image";

const ExperienceCard = ({
  icon,
  role,
  company,
  details,
  skills,
  duration,
}: {
  icon: any;
  role: any;
  company: any;
  details: any;
  skills: any;
  duration: any;
}) => {
  return (
    <>
      <div className="experience_card">
        <div className="experience_card_header">
          <Image
            src={icon}
            alt="Company Icon"
            width={64}
            height={64}
          />
          <div className="experience_card_header_details">
            <h4>{company}</h4>
            <p>{duration}</p>
          </div>
        </div>
        <p className="experience_card_details_text">{details}</p>
        <p className="experience_card_skills">
          <span className="skills_label">Skills:</span>
          {skills}
        </p>
      </div>
    </>
  );
};

export default ExperienceCard;
