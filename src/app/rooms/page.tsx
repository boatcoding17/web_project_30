// src/app/rooms/page.tsx
import { rooms } from "../../data/rooms";
//Hello world
export default function RoomsPage() {
  return (
    <section className="px-10 py-32 bg-black text-white min-h-screen">
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
  );
}
