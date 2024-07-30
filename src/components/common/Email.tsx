import Link from "next/link";
import React from "react";
import './email.scss';

export default function Email() {
  return (
    <div className="email">
      <Link href={"mailto:nitinrajput971624@gmail.com"} className="email_link">
        Nitinrajput971624@gmail.com
      </Link>
    </div>
  );
}
