"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingInfo {
  roomName: string;
  fullName: string;
  checkInDate: string;
  checkInTime: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  phone: string;
  childAges?: number[]; // เพิ่มเพื่อแสดงอายุเด็กแต่ละคน
}

export default function ConfirmPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("booking");

    if (stored) {
      setBooking(JSON.parse(stored));
    } else {
      const confirmRedirect = window.confirm(
        "คุณยังไม่ได้ทำการจอง! ต้องการกลับไปหน้า Booking เพื่อทำการจองหรือไม่?"
      );

      if (confirmRedirect) {
        router.push("/booking");
      }
    }
  }, [router]);

  if (!booking) {
    return (
      <section className="px-6 py-12 max-w-2xl mx-auto text-center">
        <p className="text-gray-500">กำลังตรวจสอบข้อมูลการจอง...</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 flex justify-center text-black text-center">
      <div className="bg-green-100 p-6 rounded-xl shadow-lg space-y-4 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center">🎉 การจองสำเร็จเรียบร้อยแล้ว</h2>

        <div className="space-y-2 ">
          <p><strong>ห้อง:</strong> {booking.roomName}</p>
          <p><strong>ชื่อ:</strong> {booking.fullName}</p>
          <p><strong>เบอร์โทรศัพท์:</strong> {booking.phone}</p>
          <p><strong>เช็คอิน:</strong> {booking.checkInDate} เวลา {booking.checkInTime}</p>
          <p><strong>เช็คเอาท์:</strong> {booking.checkOut}</p>
          <p><strong>จำนวนคืน:</strong> {booking.nights}</p>
          <p><strong>ผู้ใหญ่:</strong> {booking.adults}</p>
          <p><strong>เด็ก:</strong> {booking.children}</p>

          {booking.childAges && booking.childAges.length > 0 && (
            <div>
              <strong>อายุเด็กแต่ละคน:</strong>
              <ul className="list-disc list-inside mt-1">
                {booking.childAges.map((age, idx) => (
                  <li key={idx}>
                    {age >= 1 ? `${age} ปี` : `${age * 1} เดือน`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={() => router.push("/booking")}
          className="mt-4 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          กลับไปหน้า Booking
        </button>
      </div>
    </section>
  );
}
