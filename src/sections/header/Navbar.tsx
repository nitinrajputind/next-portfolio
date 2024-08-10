import Button from "@/components/button/Button";
import Logo from "@/components/brand/Logo";
import Link from "next/link";
import React from "react";
import "./navbar.scss";
import { sectionLink } from "@/constants/constants";

export default function Navbar() {
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
            {sectionLink &&
              sectionLink?.map(({ name, link }, index) => {
                return (
                  <li className="nav_items_list_item" key={name || index}>
                    <Link className="nav_items_list_item_link" href={link}>
                      {name}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className="nav_item_button">
            <Button text={"resume"} link={"/"} />
          </div>
        </div>
      </div>
    </nav>
  );
}
