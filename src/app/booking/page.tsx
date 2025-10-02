"use client";

import { useState, useEffect } from "react";

interface BookingData {
  checkInDate: string;
  checkInTime: string;
  nights: number;
  checkOut: string;
  arrivalTime: string;
  fullName: string;
  email: string;
  phone: string;
}

export default function BookingPage() {
  const [data, setData] = useState<BookingData>({
    checkInDate: "",
    checkInTime: "",
    nights: 1,
    checkOut: "",
    arrivalTime: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const [arrivalAlert, setArrivalAlert] = useState(false);
  const pricePerNight = 1000; // สมมติราคา/คืน
  const totalPrice = data.nights * pricePerNight;

  // คำนวณ Check-out อัตโนมัติ
  useEffect(() => {
    if (data.checkInDate && data.checkInTime) {
      const [hour, minute] = data.checkInTime.split(":").map(Number);
      const inDate = new Date(data.checkInDate);
      inDate.setHours(hour, minute, 0, 0);

      const outDate = new Date(inDate);
      outDate.setDate(outDate.getDate() + data.nights);

      const iso = outDate.toISOString().slice(0, 16);
      setData((prev) => ({ ...prev, checkOut: iso }));
    }
  }, [data.checkInDate, data.checkInTime, data.nights]);

  // Arrival Time ต้องไม่เกิน 1 ชั่วโมงหลัง Check-in
  const handleArrivalChange = (value: string) => {
    setData((prev) => ({ ...prev, arrivalTime: value }));

    if (data.checkInDate && data.checkInTime) {
      const [inHour, inMin] = data.checkInTime.split(":").map(Number);
      const inDate = new Date(data.checkInDate);
      inDate.setHours(inHour, inMin, 0, 0);

      const [arrHour, arrMin] = value.split(":").map(Number);
      const arrDate = new Date(data.checkInDate);
      arrDate.setHours(arrHour, arrMin, 0, 0);

      const maxAllowed = new Date(inDate);
      maxAllowed.setHours(maxAllowed.getHours() + 1);

      setArrivalAlert(arrDate > maxAllowed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (arrivalAlert) {
      alert("⚠️ Arrival Time เกิน 1 ชั่วโมงหลัง Check-in!");
      return;
    }

    alert(
      `Booking Complete!\n\nชื่อ: ${data.fullName}\nเข้าพัก: ${data.checkInDate} ${data.checkInTime}\nเช็คเอาท์: ${data.checkOut}\nจำนวนคืน: ${data.nights}\nราคารวม: ${totalPrice} บาท`
    );
  };

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">24-Hour Stay Booking</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-2">ชื่อ-นามสกุล</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-2">อีเมล</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-2">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Check-in */}
        <div>
          <label className="block font-semibold mb-2">Check-in Date</label>
          <input
            type="date"
            value={data.checkInDate}
            onChange={(e) =>
              setData((prev) => ({ ...prev, checkInDate: e.target.value }))
            }
            required
            className="w-full p-3 border rounded-md"
          />
          <label className="block font-semibold mt-3 mb-2">Check-in Time</label>
          <input
            type="time"
            value={data.checkInTime}
            onChange={(e) =>
              setData((prev) => ({ ...prev, checkInTime: e.target.value }))
            }
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* จำนวนคืน */}
        <div>
          <label className="block font-semibold mb-2">จำนวนคืน</label>
          <select
            value={data.nights}
            onChange={(e) =>
              setData((prev) => ({ ...prev, nights: parseInt(e.target.value) }))
            }
            className="w-full p-3 border rounded-md"
          >
            <option value={1}>1 คืน</option>
            <option value={2}>2 คืน</option>
            <option value={3}>3 คืน</option>
            <option value={7}>7 คืน</option>
            <option value={30}>30 คืน (1 เดือน)</option>
          </select>
        </div>

        {/* Check-out (Auto) */}
        <div>
          <label className="block font-semibold mb-2">Check-out (Auto)</label>
          <input
            type="datetime-local"
            value={data.checkOut}
            disabled
            className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Arrival Time */}
        <div>
          <label className="block font-semibold mb-2">
            เวลาเข้าพักจริง (Arrival)
          </label>
          <input
            type="time"
            value={data.arrivalTime}
            onChange={(e) => handleArrivalChange(e.target.value)}
            required
            className={`w-full p-3 border rounded-md ${
              arrivalAlert ? "border-red-500" : ""
            }`}
          />
          {arrivalAlert && (
            <p className="text-red-600 mt-1">
              ⚠️ Arrival Time เกิน 1 ชั่วโมงหลังเวลา Check-in!
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <p>จำนวนคืน: {data.nights}</p>
          <p>ราคารวม: {totalPrice} บาท</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ยืนยันการจอง
        </button>
      </form>
    </section>
  );
}
