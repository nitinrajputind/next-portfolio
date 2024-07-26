import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const sectionLink = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Experince",
      link: "/#experince",
    },
    {
      name: "work",
      link: "/#work",
    },
    {
      name: "contact",
      link: "/#contact",
    },
  ];

  return (
    <nav>
      <div className="wrapper">
        <div className="brand">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <div className="nav_items">
          <ul className="nav_items_list">
            {sectionLink.map(({ name, link }) => {
              return (
                <>
                  <li className="nav_items_list_item">
                    <Link className="nav_items_list_item_link" href={link}>{name}</Link>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
