import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIND WAVE — AI-Powered Mental Wellness Platform",
  description: "Ride the wave of your mind. An AI-powered space to understand your emotions, build healthier habits, and take control of your mental wellbeing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-mw-950 text-mw-100 antialiased">{children}</body>
    </html>
  );
}
