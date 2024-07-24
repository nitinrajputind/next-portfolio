import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <div className="wrapper">
        <div className="brand">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
      </div>
    </nav>
  );
}
