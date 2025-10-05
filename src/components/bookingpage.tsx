"use client";

export const dynamic = "force-dynamic";

import { rooms } from "../data/rooms";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface BookingData {
  checkInDate: string;
  checkInTime: string;
  nights: number;
  checkOut: string;
  fullName: string;
  email: string;
  phone: string;
  roomId: string;
}

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get("roomId") || "";

  const [data, setData] = useState<BookingData>({
    checkInDate: "",
    checkInTime: "",
    nights: 1,
    checkOut: "",
    fullName: "",
    email: "",
    phone: "",
    roomId: roomIdFromUrl,
  });

  const [dateAlert, setDateAlert] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);
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

  const handleChildrenChange = (value: number) => {
    const max = selectedRoom?.maxChildren || 0;
    const newChildren = Math.min(value, max);
    setChildren(newChildren);

    setChildAges((prev) => {
      const arr = [...prev];
      arr.length = newChildren;
      return arr.fill(0, prev.length, newChildren);
    });
  };

  const handleChildAgeChange = (index: number, age: number) => {
    setChildAges((prev) => {
      const newArr = [...prev];
      newArr[index] = age;
      return newArr;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRoom) return alert("กรุณาเลือกห้อง");
    if (!depositPaid) return alert("⚠️ ต้องจ่ายค่ามัดจำก่อนการจอง!");
    if (dateAlert) return alert(dateAlert);

    const bookingInfo = {
      roomName: selectedRoom.name,
      fullName: data.fullName,
      phone: data.phone,
      checkInDate: data.checkInDate,
      checkInTime: data.checkInTime,
      checkOut: data.checkOut,
      nights: data.nights,
      adults,
      children,
      childAges,
    };

    localStorage.setItem("booking", JSON.stringify(bookingInfo));
    router.push("/confirm");
  };

  const todayObj = new Date();
  const minDate = todayObj.toISOString().split("T")[0];

  const maxDateObj = new Date(todayObj);
  maxDateObj.setMonth(maxDateObj.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  return (
    <section className="px-6 py-20 min-h-screen bg-[#2b221b] flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">
        
        {/* Gradient Title Bar */}
        <div className="bg-gradient-to-r from-[#d4af37] to-[#b08a31] text-center py-6">
          <h2 className="text-4xl font-serif font-bold text-white">24-Hour Stay Booking</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 text-white">
          
          {/* เลือกห้อง */}
          <div>
            <label className="block font-semibold mb-2">เลือกห้อง</label>
            <select
              value={data.roomId}
              onChange={(e) => setData(prev => ({ ...prev, roomId: e.target.value }))}
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
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
              min={minDate}
              max={maxDate}
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <label className="block font-semibold mt-3 mb-2">Check-in Time</label>
            <input
              type="time"
              value={data.checkInTime}
              onChange={(e) => setData(prev => ({ ...prev, checkInTime: e.target.value }))}
              required
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          {/* Check-out (auto) */}
          {data.checkOut && (
            <div>
              <label className="block font-semibold mb-2">Check-out</label>
              <input
                type="datetime-local"
                value={data.checkOut}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-200 text-black"
              />
            </div>
          )}

          {/* จำนวนคืน */}
          <div>
            <label className="block font-semibold mb-2">จำนวนคืน</label>
            <input
              type="number"
              value={data.nights || 1}
              onChange={e => {
                const val = parseInt(e.target.value);
                setData(prev => ({ ...prev, nights: isNaN(val) ? 1 : val }));
              }}
              min={1}
              max={90}
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            {dateAlert && <p className="text-red-400 mt-1">{dateAlert}</p>}
          </div>

          {/* ผู้ใหญ่และเด็ก */}
          {selectedRoom && (
            <div>
              <label className="block font-semibold mb-2">ผู้ใหญ่ (Adults)</label>
              <input
                type="number"
                value={adults || 1}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setAdults(isNaN(val) ? 1 : Math.min(Math.max(val, 1), selectedRoom.maxAdults));
                }}
                min={1}
                max={selectedRoom.maxAdults}
                className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
              <p className="text-sm text-gray-200">สูงสุด {selectedRoom.maxAdults} คน</p>

              <label className="block font-semibold mt-3 mb-2">เด็ก (Children)</label>
              <input
                type="number"
                value={children || 0}
                onChange={e => handleChildrenChange(parseInt(e.target.value) || 0)}
                min={0}
                max={selectedRoom.maxChildren}
                className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
              <p className="text-sm text-gray-200">สูงสุด {selectedRoom.maxChildren} คน</p>

              {/* เลือกอายุเด็ก */}
              {children > 0 && (
                <div className="mt-3 space-y-2">
                  {Array.from({ length: children }).map((_, idx) => (
                    <div key={idx}>
                      <label className="block font-semibold mb-1">อายุเด็กคนที่ {idx + 1}</label>
                      <select
                        value={childAges[idx] || 0}
                        onChange={(e) => handleChildAgeChange(idx, parseInt(e.target.value))}
                        className="w-full p-2 rounded-lg text-black bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                      >
                        <option value={0}>1 เดือน</option>
                        <option value={1}>2 เดือน</option>
                        <option value={2}>3 เดือน</option>
                        <option value={3}>4 เดือน</option>
                        <option value={4}>5 เดือน</option>
                        <option value={5}>6 เดือน</option>
                        <option value={6}>7 เดือน</option>
                        <option value={7}>8 เดือน</option>
                        <option value={8}>9 เดือน</option>
                        <option value={9}>10 เดือน</option>
                        <option value={10}>11 เดือน</option>
                        {Array.from({ length: 17 }).map((_, i) => (
                          <option key={i + 11} value={i + 1}>{i + 1} ปี</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ผู้จอง */}
          <div>
            <label className="block font-semibold mb-2">ชื่อ-นามสกุล</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => setData(prev => ({ ...prev, fullName: e.target.value }))}
              required
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">อีเมล</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/\D/g, "");
                if (onlyNums.length <= 10) setData(prev => ({ ...prev, phone: onlyNums }));
              }}
              required
              pattern="[0-9]{10}"
              maxLength={10}
              inputMode="numeric"
              placeholder="เช่น 0812345678"
              className="w-full p-3 border rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <p className="text-sm text-gray-200 mt-1">ต้องเป็นตัวเลข 10 หลัก</p>
          </div>

          {/* ค่ามัดจำ */}
          {selectedRoom && (
            <div className="p-4 bg-white/20 rounded-lg">
              <p><strong>ค่ามัดจำ:</strong> {depositAmount} บาท</p>
              <button
                type="button"
                onClick={handleDepositClick}
                className="w-full py-2 bg-green-600 text-white rounded-lg mt-2 hover:bg-green-700 transition"
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
                <div className="relative w-full h-64 mt-2">
                  <Image
                    src={slipPreview}
                    alt="Preview Slip"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          )}

          {/* สรุป */}
          {selectedRoom && (
            <div className="p-4 bg-white/10 rounded-lg">
              <p><strong>ห้อง:</strong> {selectedRoom.name}</p>
              <p><strong>ราคา/เดือน:</strong> {selectedRoom.pricing.monthly} บาท</p>
              <p><strong>จำนวนคืน:</strong> {data.nights}</p>
              <p><strong>Check-in:</strong> {data.checkInDate} {data.checkInTime}</p>
              <p><strong>Check-out:</strong> {data.checkOut ? new Date(data.checkOut).toLocaleString() : "-"}</p>
              <p><strong>ผู้ใหญ่:</strong> {adults}</p>
              <p><strong>เด็ก:</strong> {children}</p>
              {childAges.length > 0 && <p><strong>อายุเด็ก:</strong> {childAges.join(", ")}</p>}
              <p><strong>รวมทั้งหมด:</strong> {totalPrice.toFixed(0)} บาท</p>
            </div>
          )}

          {/* ปุ่มยืนยัน */}
          <button
            type="submit"
            className="w-full bg-[#e5c14c] text-white font-semibold text-lg py-3 rounded-lg hover:bg-[#c9a227] transition duration-300 shadow-md"
          >
            ยืนยันการจอง
          </button>

        </form>
      </div>
    </section>
  );
}
