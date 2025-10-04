"use client";
import { rooms } from "../../data/rooms";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get("roomId") || "";

  const [data, setData] = useState({
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

  useEffect(() => {
    if (data.nights < 1) {
      setDateAlert("❌ ต้องเข้าพักอย่างน้อย 1 คืน");
    } else if (data.nights > 90) {
      setDateAlert("❌ ไม่สามารถจองเกิน 90 คืน (3 เดือน)");
    } else {
      setDateAlert(null);
    }
  }, [data.nights]);

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

  const todayObj = new Date();
  const minDate = todayObj.toISOString().split("T")[0];
  const maxDateObj = new Date(todayObj);
  maxDateObj.setMonth(maxDateObj.getMonth() + 3);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  return (
    <section className="px-10 py-32 text-white min-h-screen bg-[#2b221b] flex justify-center">
  <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-3xl duration-300">

    {/* Gradient Title Bar */}
    <div className="bg-gradient-to-r from-[#d4af37] to-[#b08a31] text-center py-6">
      <h2 className="text-4xl font-serif font-bold text-white">24-Hour Stay Booking</h2>
    </div>

    {/* Form */}
    <form className="p-8 space-y-6 text-black">
      <div>
        <label className="block text-lg font-semibold mb-2 text-white">Check-in Date</label>
        <input type="date" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-white">Check-in Time</label>
        <input type="time" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-white">จำนวนคืน</label>
        <input type="number" min="1" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <hr className="border-white/40" />

      <div>
        <label className="block text-lg font-semibold mb-2 text-white">ชื่อ-นามสกุล</label>
        <input type="text" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-white">อีเมล</label>
        <input type="email" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2 text-white">เบอร์โทรศัพท์</label>
        <input type="tel" className="w-full border border-gray-300 rounded-lg p-3 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
      </div>

      <button type="submit" className="w-full bg-[#e5c14c] text-white font-semibold text-lg py-3 rounded-lg hover:bg-[#c9a227] transition duration-300 shadow-md">
        จองตอนนี้
      </button>
    </form>
  </div>
</section>
  );
}
