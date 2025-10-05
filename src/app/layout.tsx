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
          bg-[#2b221b] text-white
          selection:bg-[#d4af37] selection:text-white
          transition-colors
        `}
      >
        <Navbar />
        <main className="pt-28">{children}</main>

        {/* Contact Section */}
        <section
          id="contact"
          className="px-8 py-20 bg-gradient-to-r from-[#1a1410] to-[#2b221b] text-white"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-lg font-semibold uppercase tracking-wide mb-4 text-yellow-400">
                Contact
              </h4>
              <p>123 Horizon Lane, The Zenith Isles</p>
              <p>+62 361 987 654</p>
              <p>
                <a
                  href="mailto:info@azurezenith.com"
                  className="underline hover:text-[#d4af37]"
                >
                  info@azurezenith.com
                </a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold uppercase tracking-wide mb-4 text-yellow-400">
                Explore
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="/offers" className="hover:text-[#d4af37]">
                    Exclusive Offers
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="hover:text-[#d4af37]">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/weddings" className="hover:text-[#d4af37]">
                    Weddings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold uppercase tracking-wide mb-4 text-yellow-400">
                Connect
              </h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#d4af37]">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#d4af37]">
                  Instagram
                </a>
                <a href="#" className="hover:text-[#d4af37]">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
