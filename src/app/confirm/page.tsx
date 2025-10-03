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
}

export default function ConfirmPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("booking");

    if (stored) {
      setBooking(JSON.parse(stored));
    } else {
      // ถ้ายังไม่มีการจอง ให้เตือนและถามก่อน redirect
      const confirmRedirect = window.confirm(
        "คุณยังไม่ได้ทำการจอง! ต้องการกลับไปหน้า Booking เพื่อทำการจองหรือไม่?"
      );

      if (confirmRedirect) {
        router.push("/booking");
      } else {
        // ถ้า user ไม่อยากไปหน้า booking, จะอยู่ที่หน้าปัจจุบัน
        setBooking(null);
      }
    }
  }, [router]);

  if (!booking) {
    // ถ้าไม่มีการจอง หรือกำลัง redirect, return null หรือโหลด loading
    return (
      <section className="px-6 py-12 max-w-2xl mx-auto text-center">
        <p className="text-gray-500">กำลังตรวจสอบข้อมูลการจอง...</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto">
      <div className="bg-green-100 p-6 rounded-xl text-center shadow space-y-3">
        <h2 className="text-3xl font-bold">🎉 การจองสำเร็จเรียบร้อยแล้ว</h2>
        <p><strong>ห้อง:</strong> {booking.roomName}</p>
        <p><strong>ชื่อ:</strong> {booking.fullName}</p>
        <p><strong>เช็คอิน:</strong> {booking.checkInDate} เวลา {booking.checkInTime}</p>
        <p><strong>เช็คเอาท์:</strong> {booking.checkOut}</p>
        <p><strong>จำนวนคืน:</strong> {booking.nights}</p>
        <p><strong>ผู้ใหญ่:</strong> {booking.adults}</p>
        <p><strong>เด็ก:</strong> {booking.children}</p>

        <button
          onClick={() => router.push("/booking")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          กลับไปหน้า Booking
        </button>
      </div>
    </section>
  );
}
