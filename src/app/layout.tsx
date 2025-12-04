import type { Metadata } from "next";
import { Raleway, Fira_Code } from "next/font/google";
import "../scss/index.scss";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import StarField from "@/components/common/StarField";
import ThemeCustomizer from "@/components/common/ThemeCustomizer";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--raleway",
  weight: ["300", "400", "500", "600", "700"],
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--fira-code",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://nitinrajput.dev' : 'http://localhost:3000'),
  title: "Nitin Rajput - Full Stack Developer | React, Node.js, MERN Stack",
  description: "Passionate full-stack software engineer specializing in React, Node.js, and MERN stack. Building scalable web applications with modern technologies. Available for new opportunities.",
  keywords: [
    "Nitin Rajput",
    "Full Stack Engineer Developer",
    "Full Stack Engineer",
    "React Developer",
    "Node.js Developer",
    "MERN Stack",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Firebase",
    "REST APIs",
    "GraphQL",
    "Docker",
    "AWS",
    "CI/CD",
    "Git",
    "GitHub",
    "GitLab",
    "GitLab CI/CD",
  ],
  authors: [{ name: "Nitin Rajput" }],
  creator: "Nitin Rajput",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nitinrajput.dev",
    title: "Nitin Rajput - Full Stack Software Engineer",
    description: "Passionate full-stack software engineer specializing in React, Node.js, and MERN stack. Building scalable web applications with modern technologies.",
    siteName: "Nitin Rajput Portfolio",
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Nitin Rajput - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Rajput - Full Stack Developer",
    description: "Passionate full-stack software engineer specializing in React, Node.js, and MERN stack. Building scalable web applications with modern technologies.",
    creator: "@thenitinrajput",
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${firaCode.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          <StarField density={80} maxSize={2.5} />
          <ThemeCustomizer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
