"use client";

import { useState, use } from "react";
import { rooms } from "../../../data/rooms";
import Link from "next/link";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const unwrappedParams = use(params);
  const room = rooms.find((r) => r.slug === unwrappedParams.slug);


  const roomImages = room?.imgs && room.imgs.length > 0 ? room.imgs : room ? [room.img] : [];

  const [currentImg, setCurrentImg] = useState(0);

  if (!room) {
    return (
      <section className="px-10 py-32 text-center">
        <h2 className="text-3xl font-bold text-red-600">Room not found</h2>
      </section>
    );
  }

  const prevImage = () => setCurrentImg((prev) => (prev - 1 + roomImages.length) % roomImages.length);
  const nextImage = () => setCurrentImg((prev) => (prev + 1) % roomImages.length);

  return (
    <section className="px-10 py-32 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={roomImages[currentImg]}
            alt={`${room.name} - ${currentImg + 1}`}
            className="w-full h-[400px] object-cover transition-all duration-300"
          />
          <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
          </button>
        </div>

        {/* Room info */}
        <h2 className="text-4xl font-serif font-bold mb-4">{room.name}</h2>
        <p className="text-gray-600 mb-6">{room.desc}</p>
        <p className={`mt-2 font-semibold ${room.available ? "text-green-600" : "text-red-600"}`}>
          {room.available ? "Available" : "Not Available"}
        </p>

        <div className="mb-6 mt-6">
          <h3 className="text-2xl font-semibold mb-2">รายละเอียด</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {room.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">สิ่งอำนวยความสะดวก</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {room.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">ราคา</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>รายวัน: {room.pricing.daily}</li>
            <li>รายเดือน: {room.pricing.monthly}</li>
            <li>ค่ามัดจำ: {room.pricing.deposit}</li>
            <li>ค่าเช่าล่วงหน้า: {room.pricing.advance}</li>
            <li>ค่าน้ำ: {room.pricing.water}</li>
            <li>ค่าไฟ: {room.pricing.electricity}</li>
            <li>อินเทอร์เน็ต: {room.pricing.internet}</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-4 mt-6">
          {room.available ? (
            <Link
              href={`/booking?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}`}
              className="flex-1"
            >
              <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold">
                จองห้อง
              </button>
            </Link>
          ) : (
            <p className="text-gray-400 text-center flex-1">ห้องนี้ไม่สามารถจองได้</p>
          )}
          <Link href="/rooms" className="flex-1">
            <button className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition font-semibold">
              กลับไปหน้ารายการห้อง
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}