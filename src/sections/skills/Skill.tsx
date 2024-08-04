import CardStack from "@/components/techStack/CardStack";
import React from "react";
import './skill.scss';

export default function Experience() {
  const technoolgy = [
    {
      name: "Frontend Skill",
      skill: [
        {
          name: "React JS",
          icon: "ic_react",
        },
        {
          name: "Angular",
          icon: "ic_angular",
        },
        {
          name: "Next JS",
          icon: "ic_nextjs",
        },
        {
          name: "Redux",
          icon: "ic_redux",
        },
        {
          name: "Mobx",
          icon: "ic_mobx",
        },
        {
          name: "HTML",
          icon: "ic_html",
        },
        {
          name: "CSS",
          icon: "ic_css",
        },
        {
          name: "SCSS",
          icon: "ic_scss",
        },
        {
          name: "JS",
          icon: "ic_js",
        },
        {
          name: "tailwind",
          icon: "ic_tailwind",
        },
        {
          name: "Flutter",
          icon: "ic_flutter",
        },
      ],
    },
    {
      name: "Backend Skill",
      skill: [
        {
          name: "Node JS",
          icon: "ic_nodejs",
        },
        {
          name: "Firebase",
          icon: "ic_firebase",
        },
        {
          name: "NPM",
          icon: "ic_npm",
        },
        {
          name: "json",
          icon: "ic_json",
        },
        {
          name: "Mongo DB",
          icon: "ic_mongodb",
        },
        {
          name: "Rest Api",
          icon: "ic_api",
        },
        {
          name: "Express JS",
          icon: "ic_express",
        },
        {
          name: "GraphQl",
          icon: "ic_graphql",
        },
      ],
    },
    {
      name: "Tools",
      skill: [
        {
          name: "Vs Code",
          icon: "ic_vscode",
        },
        {
          name: "Github",
          icon: "ic_github",
        },
        {
          name: "Git",
          icon: "ic_git",
        },
        {
          name: "Postman",
          icon: "ic_postman",
        },
        {
          name: "Replit",
          icon: "ic_replit",
        },
        {
          name: "CodeSandBox",
          icon: "ic_codesandbox",
        },
        {
          name: "Gitlab",
          icon: "ic_gitlab",
        },
        {
          name: "bitbucket",
          icon: "ic_bitbucket",
        },
        {
          name: "jira",
          icon: "ic_jira",
        },
      ],
    },
    {
      name: "Soft Skills",
      skill: [
        {
          name: "Team Work",
          icon: "ic_team",
        },
        {
          name: "Problem Solving",
          icon: "ic_problemsolving",
        },
        {
          name: "Time Management",
          icon: "ic_timemanagement",
        },
        {
          name: "Collaborative",
          icon: "ic_collaboration",
        },
      ],
    },
  ];
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
        {technoolgy.map(({ name, skill }) => {
          return <CardStack name={name} skill={skill} key={name} />;
        })}
      </div>
    </div>
  );
}
