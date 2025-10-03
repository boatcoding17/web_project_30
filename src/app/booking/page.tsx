"use client";
import { rooms } from "../../data/rooms";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
      checkInDate: data.checkInDate,
      checkInTime: data.checkInTime,
      checkOut: data.checkOut,
      nights: data.nights,
      adults,
      children,
    };

    localStorage.setItem("booking", JSON.stringify(bookingInfo));
    router.push("/confirm");
  };

  // วันที่วันนี้
  const todayObj = new Date();
  const minDate = todayObj.toISOString().split("T")[0];

  // วันที่ 3 เดือนถัดไป
  const maxDateObj = new Date(todayObj);
  maxDateObj.setMonth(maxDateObj.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split("T")[0];

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
            min={minDate}
            max={maxDate}
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
            value={data.nights || 1}
            onChange={e => {
              const val = parseInt(e.target.value);
              setData(prev => ({ ...prev, nights: isNaN(val) ? 1 : val }));
            }}
            min={1}
            max={90}
            className="w-full p-3 border rounded-md"
          />
          {dateAlert && <p className="text-red-600 mt-1">{dateAlert}</p>}
        </div>

        {/* จำนวนผู้เข้าพัก */}
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
              className="w-full p-3 border rounded-md"
            />
            <p className="text-sm text-gray-500">สูงสุด {selectedRoom.maxAdults} คน</p>

            <label className="block font-semibold mt-3 mb-2">เด็ก (Children)</label>
            <input
              type="number"
              value={children || 0}
              onChange={e => handleChildrenChange(parseInt(e.target.value) || 0)}
              min={0}
              max={selectedRoom.maxChildren}
              className="w-full p-3 border rounded-md"
            />
            <p className="text-sm text-gray-500">สูงสุด {selectedRoom.maxChildren} คน</p>

            {childAges.map((age, i) => (
              <div key={i}>
                <label className="block font-semibold mt-2 mb-1">อายุเด็กคนที่ {i + 1}</label>
                <select
                  value={age}
                  onChange={e => handleChildAgeChange(i, Number(e.target.value))}
                  className="w-full p-3 border rounded-md"
                >
                  <option value={0.08}>1 เดือน</option>
                  <option value={0.17}>2 เดือน</option>
                  <option value={0.25}>3 เดือน</option>
                  <option value={0.33}>4 เดือน</option>
                  <option value={0.42}>5 เดือน</option>
                  <option value={0.5}>6 เดือน</option>
                  <option value={0.58}>7 เดือน</option>
                  <option value={0.67}>8 เดือน</option>
                  <option value={0.75}>9 เดือน</option>
                  <option value={0.83}>10 เดือน</option>
                  <option value={0.92}>11 เดือน</option>
                  <option value={1}>1 ปี</option>
                  {Array.from({ length: 16 }, (_, n) => n + 2).map(n => (
                    <option key={n} value={n}>{n} ปี</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

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
                className="block mx-auto mt-2 w-6/5 object-contain"
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
            <p><strong>ผู้ใหญ่:</strong> {adults}</p>
            <p><strong>เด็ก:</strong> {children}</p>
            {childAges.length > 0 && <p><strong>อายุเด็ก:</strong> {childAges.join(", ")}</p>}
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
