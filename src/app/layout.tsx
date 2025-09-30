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
          bg-black text-white
          selection:bg-primary-gold/40 selection:text-black
        `}
      >
        {/* Navbar */}
        <header className="flex justify-between items-center px-12 py-5 bg-white/90 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-50">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-black">
            THE AZURE ZENITH
          </h1>
          <nav className="hidden md:flex gap-10 text-sm font-medium uppercase text-black">
            <a href="/" className="hover:text-primary-gold transition">Home</a>
            <a href="/rooms" className="hover:text-primary-gold transition">Rooms</a>
            <a href="/booking" className="hover:text-primary-gold transition">Booking</a>
            <a href="/confirm" className="hover:text-primary-gold transition">Confirm</a>
            <a href="#contact" className="hover:text-primary-gold transition">Contact</a>
          </nav>
        </header>

        {/* Content ของแต่ละหน้า */}
        <main className="pt-28">{children}</main>

        {/* Footer ทุกหน้า */}
        <footer id="contact" className="bg-primary-black text-gray-400 px-10 py-12 mt-20">
          <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            <div>
              <h4 className="text-xl font-serif font-bold mb-4 text-primary-gold">
                The Azure Zenith
              </h4>
              <p className="text-sm">
                An elevation of serenity, where luxury meets the horizon.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Contact</h4>
              <p className="text-sm">123 Horizon Lane, The Zenith Isles</p>
              <p className="text-sm">+62 361 987 654</p>
              <p className="text-sm hover:text-primary-gold transition">
                <a href="mailto:info@azurezenith.com">info@azurezenith.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Explore</h4>
              <ul>
                <li>
                  <a href="/offers" className="hover:text-primary-gold transition">Exclusive Offers</a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-primary-gold transition">Gallery</a>
                </li>
                <li>
                  <a href="/weddings" className="hover:text-primary-gold transition">Weddings</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary-gold transition">Facebook</a>
                <a href="#" className="hover:text-primary-gold transition">Instagram</a>
                <a href="#" className="hover:text-primary-gold transition">Twitter</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-800 pt-6">
            © 2025 The Azure Zenith. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
