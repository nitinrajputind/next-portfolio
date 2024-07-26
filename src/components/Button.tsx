import Link from "next/link";
import React from "react";

export default function Button({ text, link }: { text: string; link: string }) {
  return (
    <Link href={"link"} className="btn">
      {text}
    </Link>
  );
}
