import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Azure Zenith",
  description: "Luxury hotel website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={` 
          ${geistSans.variable} ${geistMono.variable} antialiased
          bg-[var(--background)] text-[var(--foreground)]
          selection:bg-[var(--accent-light)] selection:text-[var(--foreground)]
          transition-colors
        `}
      >
        <Navbar />
        <main className="pt-28">{children}</main>
      </body>
    </html>
  );
}
