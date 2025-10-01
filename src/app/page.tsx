// src/app/page.tsx
import { rooms } from "../data/rooms";
const HOTEL_NAME = "The Azure Zenith";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[var(--overlay-hero)]" /> {/* ใช้ตัวแปร Overlay */}
        <div className="relative text-center z-10 px-4 text-[var(--foreground-hero)]">
          <p className="text-lg md:text-2xl mb-4 font-sans uppercase tracking-[0.3em] text-[var(--accent)]">
            An Elevation of Serenity
          </p>
          <h2 className="text-7xl md:text-[8rem] font-serif font-light mb-10 drop-shadow-2xl leading-tight">
            {HOTEL_NAME}
          </h2>
          <a
            href="/booking"
            className="inline-block px-12 py-4 rounded-full font-bold uppercase transition-all duration-300 shadow-xl
                       bg-[var(--accent)] text-[var(--foreground)] hover:opacity-90 hover:scale-105"
          >
            Book now
          </a>
        </div>
      </section>

      {/* Room Preview */}
      <section className="px-10 py-32 bg-[var(--background-secondary)]">
        <h2 className="text-5xl font-serif font-bold text-center mb-16 text-[var(--accent)]">
          The Signature Collection
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="rounded-2xl shadow-2xl overflow-hidden cursor-pointer group border bg-[var(--card-bg)] border-[var(--accent)]/20"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--overlay-card)] group-hover:bg-transparent transition-all duration-500" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[var(--foreground)]">
                  {room.name}
                </h3>
                <p className="mb-4 text-[var(--muted)]">{room.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
