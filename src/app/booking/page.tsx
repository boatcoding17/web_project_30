"use client";
import { rooms } from "../../data/rooms";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface BookingData {
  checkInDate: string;
  checkInTime: string;
  nights: number;
  checkOut: string;
  arrivalTime: string;
  fullName: string;
  email: string;
  phone: string;
  roomId: string;
}

export default function BookingPage() {
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get("roomId") || "";

  const [data, setData] = useState<BookingData>({
    checkInDate: "",
    checkInTime: "",
    nights: 1,
    checkOut: "",
    arrivalTime: "",
    fullName: "",
    email: "",
    phone: "",
    roomId: roomIdFromUrl,
  });

  const [arrivalAlert, setArrivalAlert] = useState(false);
  const [dateAlert, setDateAlert] = useState<string | null>(null);
  const [depositPaid, setDepositPaid] = useState(false);
  const [depositSlip, setDepositSlip] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedRoom = rooms.find((r) => r.id.toString() === data.roomId);
  const pricePerNight = selectedRoom ? selectedRoom.pricing.monthly / 30 : 0;
  const totalPrice = data.nights * pricePerNight;
  const depositAmount = selectedRoom ? selectedRoom.pricing.deposit : 0;

  // Auto set check-out
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

  // Validate nights
  useEffect(() => {
    if (data.nights < 1) {
      setDateAlert("❌ ต้องเข้าพักอย่างน้อย 1 คืน");
    } else if (data.nights > 90) {
      setDateAlert("❌ ไม่สามารถจองเกิน 90 คืน (3 เดือน)");
    } else {
      setDateAlert(null);
    }
  }, [data.nights]);

  // Preview slip
  useEffect(() => {
    if (depositSlip) {
      const url = URL.createObjectURL(depositSlip);
      setSlipPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setSlipPreview(null);
    }
  }, [depositSlip]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDepositSlip(e.target.files[0]);
      setDepositPaid(true);
    }
  };

  const handleDepositClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoom) return alert("กรุณาเลือกห้อง");
    if (!depositPaid) return alert("⚠️ ต้องจ่ายค่ามัดจำก่อนการจอง!");
    if (arrivalAlert) return alert("⚠️ Arrival Time เกิน 1 ชั่วโมงหลัง Check-in!");
    if (dateAlert) return alert(dateAlert);

    // ✅ ตรวจชื่อ-นามสกุลขั้นต่ำ 2 ตัวอักษร
    if (!data.fullName.trim() || data.fullName.trim().length < 2)
      return alert("กรุณาใส่ชื่อ-นามสกุลจริง");

    if (!data.email.trim()) return alert("กรุณาใส่อีเมล");
    if (!data.phone.trim()) return alert("กรุณาใส่เบอร์โทรศัพท์");

    alert(
      `Booking Complete!\n\nห้อง: ${selectedRoom.name}\nชื่อ: ${data.fullName}\nอีเมล: ${data.email}\nเข้าพัก: ${data.checkInDate} ${data.checkInTime}\nเช็คเอาท์: ${data.checkOut}\nจำนวนคืน: ${data.nights}\nราคารวม: ${totalPrice.toFixed(0)} บาท\nค่ามัดจำ: ${depositAmount} บาท`
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="px-6 py-12 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">24-Hour Stay Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        {/* เลือกห้อง */}
        <div>
          <label className="block font-semibold mb-2">เลือกห้อง</label>
          <select
            value={data.roomId}
            onChange={(e) => setData(prev => ({ ...prev, roomId: e.target.value }))}
            className="w-full p-3 border rounded-md"
            required
          >
            <option value="" disabled>-- เลือกห้อง --</option>
            {rooms.filter(r => r.available).map(room => (
              <option key={room.id} value={room.id}>
                {room.name} ({room.pricing.monthly} บาท/เดือน)
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div>
          <label className="block font-semibold mb-2">Check-in Date</label>
          <input
            type="date"
            value={data.checkInDate}
            onChange={(e) => setData(prev => ({ ...prev, checkInDate: e.target.value }))}
            required
            min={today}
            className="w-full p-3 border rounded-md"
          />
          <label className="block font-semibold mt-3 mb-2">Check-in Time</label>
          <input
            type="time"
            value={data.checkInTime}
            onChange={(e) => setData(prev => ({ ...prev, checkInTime: e.target.value }))}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* จำนวนคืน */}
        <div>
  <label className="block font-semibold mb-2">จำนวนคืน</label>
  <input
    type="number"
    value={data.nights}
    onChange={(e) =>
      setData(prev => ({
        ...prev,
        nights: Math.max(1, Math.min(90, parseInt(e.target.value) || 1))
      }))
    }
    min={1}
    max={90}
    className="w-full p-3 border rounded-md"
  />
  {dateAlert && <p className="text-red-600 mt-1">{dateAlert}</p>}
</div>

        {/* Check-out */}
        <div>
          <label className="block font-semibold mb-2">Check-out (Auto)</label>
          <input
            type="datetime-local"
            value={data.checkOut}
            disabled
            className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* ข้อมูลผู้จอง */}
        <div>
          <label className="block font-semibold mb-2">ชื่อ-นามสกุล</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => setData(prev => ({ ...prev, fullName: e.target.value }))}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">อีเมล</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
            required
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* จ่ายค่ามัดจำ */}
        {selectedRoom && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p><strong>ค่ามัดจำ:</strong> {depositAmount} บาท</p>
            <button
              type="button"
              onClick={handleDepositClick}
              className="w-full py-2 bg-green-600 text-white rounded-lg mt-2 hover:bg-green-700"
            >
              แนบสลิปค่ามัดจำ
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {slipPreview && (
              <img
                src={slipPreview}
                alt="Preview Slip"
                className="block mx-auto mt-2 w-1/5 object-contain"
              />
            )}
          </div>
        )}

        {/* สรุป */}
        {selectedRoom && (
          <div className="p-4 bg-gray-200 rounded-lg">
            <p><strong>ห้อง:</strong> {selectedRoom.name}</p>
            <p><strong>ราคา/เดือน:</strong> {selectedRoom.pricing.monthly} บาท</p>
            <p><strong>จำนวนคืน:</strong> {data.nights}</p>
            <p><strong>รวมทั้งหมด:</strong> {totalPrice.toFixed(0)} บาท</p>
          </div>
        )}

        {/* ปุ่มยืนยัน */}
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
