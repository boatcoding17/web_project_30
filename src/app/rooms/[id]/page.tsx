import { rooms } from "../../../data/rooms";
import Link from "next/link";

interface RoomPageProps {
  params: {
    id: string;
  };
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const room = rooms.find((r) => r.id.toString() === params.id);

  if (!room) {
    return (
      <section className="px-10 py-32 text-center">
        <h2 className="text-3xl font-bold text-red-600">Room not found</h2>
      </section>
    );
  }

  return (
    <section className="px-10 py-32 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {/* รูปห้อง */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={room.img}
            alt={room.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* รายละเอียดห้อง */}
        <h2 className="text-4xl font-serif font-bold mb-4">{room.name}</h2>
        <p className="text-gray-600 mb-6">{room.desc}</p>

        {/* สถานะ */}
        <p
          className={`mt-2 font-semibold ${
            room.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {room.available ? "Available" : "Not Available"}
        </p>

        {/* รายละเอียดเพิ่มเติม */}
        <div className="mb-6 mt-6">
          <h3 className="text-2xl font-semibold mb-2">รายละเอียด</h3>
          <p className="text-gray-700">{room.details}</p>
        </div>

        {/* สิ่งอำนวยความสะดวก */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">สิ่งอำนวยความสะดวก</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {room.amenities.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        {/* ราคา */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">ราคา</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>รายเดือน: {room.pricing.monthly}</li>
            <li>ค่ามัดจำ: {room.pricing.deposit}</li>
            <li>ค่าเช่าล่วงหน้า: {room.pricing.advance}</li>
            <li>ค่าน้ำ: {room.pricing.water}</li>
            <li>ค่าไฟ: {room.pricing.electricity}</li>
            <li>อินเทอร์เน็ต: {room.pricing.internet}</li>
          </ul>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-between space-x-4 mt-6">
          {room.available ? (
            <Link
              href={`/booking?roomId=${room.id}&roomName=${encodeURIComponent(
                room.name
              )}`}
              className="flex-1"
            >
              <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold">
                จองห้อง
              </button>
            </Link>
          ) : (
            <p className="text-gray-400 text-center flex-1">
              ห้องนี้ไม่สามารถจองได้
            </p>
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
