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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="relative text-center text-white z-10 px-4">
          <p className="text-lg md:text-2xl mb-4 font-sans uppercase tracking-[0.3em] text-primary-gold">
            An Elevation of Serenity
          </p>
          <h2 className="text-7xl md:text-[8rem] font-serif font-light mb-10 drop-shadow-2xl leading-tight">
            {HOTEL_NAME}
          </h2>
          <a
            href="/booking"
            className="inline-block px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold uppercase rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Book now
          </a>
        </div>
      </section>

      {/* Room Preview */}
      <section className="px-10 py-32 bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-5xl font-serif font-bold text-center mb-16 text-primary-gold">
          The Signature Collection
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gradient-to-b from-black to-gray-900 rounded-2xl shadow-2xl overflow-hidden cursor-pointer group border border-gray-800"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-serif font-bold mb-2 text-white">
                  {room.name}
                </h3>
                <p className="mb-4 text-gray-400">{room.desc}</p>

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
