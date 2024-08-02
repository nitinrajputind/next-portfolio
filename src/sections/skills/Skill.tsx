import CardStack from "@/components/techStack/CardStack";
import react_icon from "../../assets/icons/react_icon.png";
import Image from "next/image";
import React from "react";

export default function Experience() {
  const technoolgy = [
    {
      name: "Frontend Skill",
      skill: [
        {
          name: "HTML",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "CSS",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "JS",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "React JS",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "Angular",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
      ],
    },
    {
      name: "Backend Skill",
      skill: [
        {
          name: "Node JS",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "Express JS",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "Mongo DB",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
        {
          name: "SQL",
          icon: <Image src={react_icon} alt={"react_Icon"} />,
        },
      ],
    },
  ];
  return (
    <div>
      {technoolgy.map(({ name, skill }) => {
        return <CardStack name={name} skill={skill} key={name} />;
      })}
    </div>
  );
}
