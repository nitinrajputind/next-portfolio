import Link from "next/link";
import React from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import "./socialIcon.scss";

export default function SocialIcon() {
  const socialIcons = [
    {
      name: "Github",
      icon: <FiGithub />,
      link: "https://github.com/nitinrajputind",
    },
    {
      name: "Instagram",
      icon: <FiInstagram />,
      link: "https://github.com/nitinrajputind",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      link: "https://github.com/nitinrajputind",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "https://github.com/nitinrajputind",
    },
  ];

  return (
    <div className="social_icons">
      <ul className="social_icons_list">
        {socialIcons &&
          socialIcons.map(({ name, icon, link }) => {
            return (
              <>
                <li key={name} title={name} className="social_icons_list_item">
                  <Link
                    href={link}
                    className="social_icons_list_item_link"
                    target="_blank"
                  >
                    {icon}
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
}
