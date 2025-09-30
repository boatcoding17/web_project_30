import { rooms } from "../../data/rooms";
import Link from "next/link";

export default function RoomsPage() {
  return (
    <section className="px-10 py-32 bg-black text-white min-h-screen">
      <h2 className="text-5xl font-serif font-bold text-center mb-16 text-primary-gold">
        The Signature Collection
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <Link href={`/rooms/${room.id}`} key={room.id}>
            <div className="bg-gradient-to-b from-black to-gray-900 rounded-2xl shadow-2xl overflow-hidden cursor-pointer group border border-gray-800">
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
                <p className="text-lg font-semibold text-yellow-400 mb-2">
                  {room.price.toLocaleString()} THB / คืน
                </p>
                <p className={room.available ? "text-green-400" : "text-red-500"}>
                  {room.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
