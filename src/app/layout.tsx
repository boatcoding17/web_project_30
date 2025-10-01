import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

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
        {/* Navbar */}
        <header className="navbar">
          <h1 className="navbar-title">THE AZURE ZENITH</h1>
          <nav className="navbar-links">
            <a href="/">Home</a>
            <a href="/rooms">Rooms</a>
            <a href="/booking">Booking</a>
            <a href="/confirm">Confirm</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* Content */}
        <main className="pt-28">{children}</main>

        {/* Footer */}
        <footer id="contact" className="px-8 py-20 mt-32 border-t">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">

    {/* Logo + Description */}
<header className="flex justify-between items-center px-12 py-5 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-50">
  <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
    THE AZURE ZENITH
  </h1>
  <nav className="hidden md:flex gap-10 text-sm font-medium uppercase">
    <a href="/" className="transition hover:underline">Home</a>
    <a href="/rooms" className="transition hover:underline">Rooms</a>
    <a href="/booking" className="transition hover:underline">Booking</a>
    <a href="/confirm" className="transition hover:underline">Confirm</a>
    <a href="#contact" className="transition hover:underline">Contact</a>
  </nav>
</header>

    {/* Contact */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold uppercase tracking-wide">Contact</h4>
      <ul className="space-y-1">
        <li>123 Horizon Lane, The Zenith Isles</li>
        <li>+62 361 987 654</li>
        <li>
          <a href="mailto:info@azurezenith.com" className="transition underline-offset-2 hover:underline">
            info@azurezenith.com
          </a>
        </li>
      </ul>
    </div>

    {/* Explore */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold uppercase tracking-wide">Explore</h4>
      <ul className="space-y-2">
        <li><a href="/offers" className="transition hover:underline underline-offset-2">Exclusive Offers</a></li>
        <li><a href="/gallery" className="transition hover:underline underline-offset-2">Gallery</a></li>
        <li><a href="/weddings" className="transition hover:underline underline-offset-2">Weddings</a></li>
      </ul>
    </div>

    {/* Social */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold uppercase tracking-wide">Connect</h4>
      <div className="flex gap-5">
        <a href="#" className="transition hover:underline underline-offset-2">Facebook</a>
        <a href="#" className="transition hover:underline underline-offset-2">Instagram</a>
        <a href="#" className="transition hover:underline underline-offset-2">Twitter</a>
      </div>
    </div>
  </div>

  <div className="border-t mt-16 pt-8 text-center text-sm tracking-wide">
    © {new Date().getFullYear()} The Azure Zenith — All Rights Reserved.
  </div>
</footer>
      </body>
    </html>
  );
}
