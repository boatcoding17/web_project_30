// src/app/page.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HOTEL_NAME = "The Azure Zenith";
const ACCENT_COLOR_CLASS = "text-primary-gold";
const BG_COLOR_CLASS = "bg-primary-black";

// 1. Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/1.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      <motion.div
        className="relative text-center text-white z-10 px-4"
        style={{ y }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p
          className={`text-lg md:text-2xl mb-4 font-sans uppercase tracking-[0.3em] ${ACCENT_COLOR_CLASS}`}
        >
          An Elevation of Serenity
        </p>
        <h2 className="text-7xl md:text-[8rem] font-serif font-light mb-10 drop-shadow-2xl leading-tight">
          {HOTEL_NAME}
        </h2>
        <a
          href="/booking"
          className="inline-block px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold uppercase rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-400/60 transition-all duration-500 backdrop-blur-sm"
        >
          Book now
        </a>
      </motion.div>
    </section>
  );
};

// 2. Room Preview (เหมือนเดิม)
const RoomPreview = () => (
  <section className="px-10 py-32 bg-gradient-to-b from-gray-900 to-black">
    <h2 className="text-5xl font-serif font-bold text-center mb-16 text-primary-gold">
      The Signature Collection
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
      {[
        {
          img: "/images/11.jpg",
          title: "Skyline Terrace Suite",
          desc: "Panoramic views and sophisticated elegance.",
          link: "/rooms/1",
        },
        {
          img: "/images/22.jpg",
          title: "Ocean's Edge Villa",
          desc: "Ultimate privacy with a heated infinity pool.",
          link: "/rooms/2",
        },
        {
          img: "/images/33.jpg",
          title: "Botanical Sanctuary",
          desc: "Secluded sanctuary with private lush gardens.",
          link: "/rooms/3",
        },
      ].map((room, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-b from-black to-gray-900 rounded-2xl shadow-2xl overflow-hidden cursor-pointer group border border-gray-800"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: i * 0.2 }}
        >
          <div className="h-64 overflow-hidden relative">
            <img
              src={room.img}
              alt={room.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
          </div>
          <div className="p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-2 text-white">
              {room.title}
            </h3>
            <p className="mb-4 text-gray-400">{room.desc}</p>
            <a
              href={room.link}
              className="font-semibold uppercase tracking-wider text-primary-gold hover:text-white transition"
            >
              View Details →
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// 3. Unique Features (เหมือนเดิม)
const UniqueFeatures = () => (
  <section className={`${BG_COLOR_CLASS} px-10 py-32 text-white`}>
    <h2 className="text-5xl font-serif font-bold text-center mb-20 text-primary-gold">
      Beyond Expectation
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
      {[
        {
          image: "/images/111.jpg",
          title: "Cellar & Bistro",
          desc: "A curated collection of fine wines and bespoke dining.",
        },
        {
          image: "/images/222.jpg",
          title: "Starlight Ritual",
          desc: "Exclusive sunset yoga and evening meditation sessions.",
        },
        {
          image: "/images/33.jpeg",
          title: "Private Yachting",
          desc: "Tailored excursions to secluded islands.",
        },
        {
          image: "/images/444jpg.jpg",
          title: "Artisan Workshops",
          desc: "Immerse yourself in local craft and culinary arts.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="flex flex-col bg-gradient-to-b from-gray-950 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 group"
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: i * 0.15 }}
        >
          <div className="h-48 overflow-hidden relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
          </div>
          <div className="p-6 text-center flex-grow">
            <h3 className="text-xl font-serif font-bold mb-2 text-primary-gold">
              {item.title}
            </h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// 4. Footer
const Footer = () => (
  <footer
    id="contact"
    className={`${BG_COLOR_CLASS} text-gray-400 px-10 py-12`}
  >
    <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
      <div>
        <h4 className="text-xl font-serif font-bold mb-4 text-primary-gold">
          {HOTEL_NAME}
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
            <a href="/offers" className="hover:text-primary-gold transition">
              Exclusive Offers
            </a>
          </li>
          <li>
            <a href="/gallery" className="hover:text-primary-gold transition">
              Gallery
            </a>
          </li>
          <li>
            <a href="/weddings" className="hover:text-primary-gold transition">
              Weddings
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-3 text-white">Connect</h4>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary-gold transition">
            Facebook
          </a>
          <a href="#" className="hover:text-primary-gold transition">
            Instagram
          </a>
          <a href="#" className="hover:text-primary-gold transition">
            Twitter
          </a>
        </div>
      </div>
    </div>
    <div className="text-center mt-10 text-sm text-gray-500 border-t border-gray-800 pt-6">
      © 2025 The Azure Zenith. All rights reserved.
    </div>
  </footer>
);

// 5. Main Page
export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen font-sans text-white bg-black">
      {/* Navbar เเถบบนสุด ปุ่ม Book Now เอาออก */}
      <header className="flex justify-between items-center px-12 py-5 bg-white/90 backdrop-blur-md shadow-xl fixed top-0 left-0 right-0 z-50">
        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-black">
          {HOTEL_NAME.toUpperCase()}
        </h1>
        <nav className="hidden md:flex gap-10 text-sm font-medium uppercase text-black">
          <a href="/rooms" className="hover:text-primary-gold transition">
            Rooms
          </a>
          {/* Contact เลื่อนลง Footer */}
          <a
            href="#contact"
            className="hover:text-primary-gold transition"
          >
            Contact
          </a>
        </nav>
      </header>

      <HeroSection />
      <UniqueFeatures />
      <RoomPreview />
      <Footer />
    </main>
  );
}
