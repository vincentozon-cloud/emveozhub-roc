import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eMVeOzHub | Risk Operations Center",
  description: "AI-Driven Risk Scoring and Security Perimeter Monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}