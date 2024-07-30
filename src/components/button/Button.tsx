import Link from "next/link";
import React from "react";
import './button.scss';

export default function Button({ text, link }: { text: string; link: string }) {
  return (
    <Link href={"link"} className="btn">
      {text}
    </Link>
  );
}
