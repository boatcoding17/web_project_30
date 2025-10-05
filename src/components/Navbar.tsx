"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-serif font-bold">
          THE AZURE ZENITH
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/booking">Booking</Link>
          <Link href="/confirm">Confirm</Link>
          <a href="#contact">Contact</a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-0.5 bg-[var(--foreground)]"></span>
          <span className="w-6 h-0.5 bg-[var(--foreground)]"></span>
          <span className="w-6 h-0.5 bg-[var(--foreground)]"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-[var(--card-bg)] text-[var(--foreground)] flex flex-col px-6 py-4 space-y-4 shadow-lg">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/rooms" onClick={() => setOpen(false)}>Rooms</Link>
          <Link href="/booking" onClick={() => setOpen(false)}>Booking</Link>
          <Link href="/confirm" onClick={() => setOpen(false)}>Confirm</Link>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
}
