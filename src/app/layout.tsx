import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selim Yildirim — Software Engineer",
  description:
    "Full Stack Developer building robust, scalable applications. TypeScript, React, Next.js, Node.js.",
  openGraph: {
    title: "Selim Yildirim — Software Engineer",
    description: "Full Stack Developer building robust, scalable applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deployBranch = process.env.NEXT_PUBLIC_DEPLOY_BRANCH;
  const isBetaDeploy = Boolean(deployBranch && deployBranch !== "main");

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isBetaDeploy && (
          <div className="beta-badge" aria-label="Beta deployment">
            <span className="beta-badge__text">BETA</span>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
