// app/booking/page.tsx
import { redirect } from "next/navigation";

async function createBooking(formData: FormData) {
  "use server"; // server action

  const params = new URLSearchParams();
  formData.forEach((value, key) => params.append(key, value.toString()));

  redirect(`/confirm?${params.toString()}`);
}

export default function BookingPage() {
  return (
    <section className="max-w-2xl mx-auto fade-in">
      <h1 className="text-3xl font-bold mb-8">Booking</h1>

      <form action={createBooking} className="space-y-6">
  {/* เลือกห้อง */}
  <div>
    <label htmlFor="roomId">Select Room</label>
    <select name="roomId" id="roomId" required>
      {rooms.map(room => (
        <option key={room.id} value={room.id}>
          {room.name} - {room.available ? "Available" : "Full"}
        </option>
      ))}
    </select>
  </div>

  {/* ชื่อ-นามสกุล, Email, ประเทศ, เบอร์โทร */}
  <div>
    <input type="text" name="fullname" placeholder="Full Name" required />
    <input type="email" name="email" placeholder="Email" required />
    <input type="text" name="country" placeholder="Country" required />
    <input type="tel" name="phone" placeholder="Phone" required />
  </div>

  {/* จำนวนแขก */}
  <div>
    <input type="number" name="adults" placeholder="Adults" required />
    <input type="number" name="children" placeholder="Children" required />
    {/* ถ้ามี children > 0 ให้สร้าง input สำหรับใส่อายุเด็ก */}
    {Array.from({ length: children }).map((_, i) => (
      <input key={i} type="number" name={`childAge${i}`} placeholder={`Child ${i+1} Age`} required />
    ))}
  </div>

  {/* บริการเพิ่มเติม */}
  <div>
    <label>Bed Type</label>
    <select name="bedType">
      <option value="king">King</option>
      <option value="twin">Twin</option>
    </select>
  </div>

  {/* มัดจำ */}
  <div>
    <input type="number" name="deposit" placeholder="Deposit" required />
  </div>

  {/* เช็คอิน / เช็คเอาต์ */}
  <div>
    <input type="date" name="checkIn" required />
    <input type="date" name="checkOut" required />
  </div>

  {/* Upload Slip */}
  <div>
    <input type="file" name="slip" accept="image/*,application/pdf" />
  </div>

  <button type="submit" className="btn">Confirm Booking</button>
</form>

    </section>
  );
}
