// src/data/rooms.ts
export const rooms = [
  {
    id: 1,
    name: "Single Room",
    img: "/images/room1.jpg", //single
    desc: "ห้องซิงเกิล เตียงเดี่ยว เหมาะสำหรับเข้าพัก 1 คน",
    available: true,
    details: [
      "ห้องซิงเกิล เตียงเดี่ยว 1 เตียง (Twin/Single bed)",
      "เหมาะสำหรับเข้าพัก 1 คน",
      "พร้อมสิ่งอำนวยความสะดวกพื้นฐาน",
    ],
    amenities: ["เตียงเดี่ยว 1 เตียง", "โต๊ะทำงาน", "ตู้เสื้อผ้า", "ทีวี", "ห้องน้ำส่วนตัว", "ฟรี Wi-Fi"],
    pricing: {
      monthly: "3,000 - 3,500 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 2,
    name: "Twin Room",
    img: "/images/room2.jpg", //twin
    desc: "ห้องทวิน มีเตียงเดี่ยว 2 เตียง เหมาะสำหรับเพื่อนหรือครอบครัว",
    available: true,
    details: [
      "มีเตียงเดี่ยว 2 เตียง",
      "เหมาะสำหรับเพื่อนหรือครอบครัวที่ต้องการแยกเตียง",
    ],
    amenities: ["เตียงเดี่ยว 2 เตียง", "ตู้เย็น", "ทีวี", "ห้องน้ำในตัว", "โต๊ะอาหารเล็ก", "Wi-Fi"],
    pricing: {
      monthly: "3,800 - 4,200 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 3,
    name: "Double Room",
    img: "/images/room3.jpg", //double
    desc: "ห้องดับเบิล เตียงใหญ่ เหมาะสำหรับคู่รักหรือเข้าพัก 2 คน",
    available: true,
    details: [
      "เตียงใหญ่ 1 เตียง (Queen/King size)",
      "เหมาะสำหรับคู่รักหรือผู้เข้าพัก 2 คน",
    ],
    amenities: ["เตียงใหญ่", "โซฟาเล็ก", "ตู้เสื้อผ้า", "ทีวีจอแบน", "ห้องน้ำส่วนตัว", "Wi-Fi"],
    pricing: {
      monthly: "4,000 - 4,500 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 4,
    name: "Triple Room",
    img: "/images/room4.jpg", //triple
    desc: "ห้องทริปเปิล เหมาะสำหรับเข้าพัก 3 คน",
    available: true,
    details: [
      "มี 3 เตียงเดี่ยว หรือ 1 เตียงใหญ่ + 1 เตียงเดี่ยว",
      "พักได้ 3 คน",
    ],
    amenities: ["3 เตียงเดี่ยว / 1 เตียงใหญ่ + 1 เดี่ยว", "โต๊ะอาหาร", "ตู้เย็น", "ห้องน้ำส่วนตัว", "Wi-Fi"],
    pricing: {
      monthly: "4,500 - 5,000 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 5,
    name: "Quad Room",
    img: "/images/room5.jpg", //quad
    desc: "ห้องควอด เหมาะสำหรับเข้าพัก 4 คน",
    available: false,
    details: [
      "มีเตียง 2 เตียงใหญ่ หรือ 4 เตียงเล็ก",
      "เหมาะสำหรับเข้าพัก 4 คน",
    ],
    amenities: ["4 เตียงเดี่ยว หรือ 2 เตียงใหญ่", "โต๊ะรับแขก", "ทีวี", "ตู้เย็น", "ห้องน้ำในตัว", "Wi-Fi"],
    pricing: {
      monthly: "5,000 - 5,500 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 6,
    name: "Studio Room",
    img: "/images/room6.jpg", //studio
    desc: "ห้องสตูดิโอ รวม ห้องนอน + ห้องนั่งเล่น + ครัวเล็ก",
    available: true,
    details: [
      "ห้องที่รวม ห้องนอน + ห้องนั่งเล่น + ครัวเล็ก ๆ ในที่เดียว",
      "เตียงมักจะเป็น Sofa bed หรือเตียงพับได้",
    ],
    amenities: ["Sofa bed / เตียงพับได้", "เคาน์เตอร์ครัว", "ไมโครเวฟ", "โต๊ะทานข้าว", "ห้องน้ำในตัว", "Wi-Fi"],
    pricing: {
      monthly: "6,000 - 6,500 บาท/เดือน",
      deposit: "1 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 7,
    name: "Deluxe Room",
    img: "/images/room7.jpg", //deluxe
    desc: "ห้องดีลักซ์ กว้างและหรูหรากว่ามาตรฐาน",
    available: true,
    details: [
      "ใหญ่กว่าห้องมาตรฐาน",
      "การตกแต่งหรูหรา สวยงามกว่า",
      "มีสิ่งอำนวยความสะดวกพิเศษเพิ่มขึ้น",
    ],
    amenities: ["เตียงใหญ่", "เฟอร์นิเจอร์พิเศษ", "วิวสวย", "ห้องน้ำหรูพร้อมอ่างอาบน้ำ", "ทีวีจอใหญ่", "Wi-Fi"],
    pricing: {
      monthly: "7,000 - 8,000 บาท/เดือน",
      deposit: "2 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 8,
    name: "Suite Room",
    img: "/images/room8.jpg", //suite
    desc: "ห้องสวีท หรูหราพร้อมห้องนั่งเล่นแยกต่างหาก",
    available: true,
    details: [
      "มีห้องนั่งเล่นแยกต่างหากจากห้องนอน",
      "พื้นที่กว้างขวางและหรูหรา",
    ],
    amenities: ["ห้องนอน + ห้องนั่งเล่น", "โซฟาเซ็ตใหญ่", "ครัวเล็ก", "โต๊ะอาหาร", "ห้องน้ำหรู", "Wi-Fi"],
    pricing: {
      monthly: "12,000 - 15,000 บาท/เดือน",
      deposit: "2 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  },
  {
    id: 9,
    name: "Presidential Suite",
    img: "/images/room9.jpg", //presidential
    desc: "ห้องเพรซิเดนเชียลสวีท ใหญ่และหรูที่สุด",
    available: true,
    details: [
      "ห้องที่ใหญ่และหรูหราที่สุดในโรงแรม",
      "มีหลายห้องนอน ห้องรับแขก ห้องประชุม",
      "มีอ่างจากุซซี่ ครัวส่วนตัว ใช้รับรองแขก VIP",
    ],
    amenities: ["ห้องนอนหลายห้อง", "ห้องประชุม", "อ่างจากุซซี่", "ครัวส่วนตัว", "ห้องรับแขกใหญ่", "Wi-Fi"],
    pricing: {
      monthly: "25,000 - 40,000 บาท/เดือน",
      deposit: "3 เดือน",
      advance: "1 เดือน",
      water: "ตามจริง",
      electricity: "ตามจริง",
      internet: "ฟรี"
    }
  },
  {
    id: 10,
    name: "Dormitory",
    img: "/images/room10.jpg", //dormitory
    desc: "ห้องดอร์มหอพักรวม ราคาประหยัด",
    available: true,
    details: [
      "มีเตียงหลายเตียงในห้องเดียว (Bunk bed)",
      "ใช้ร่วมกับแขกคนอื่น ๆ",
      "ราคาประหยัด เหมาะกับ Backpacker",
    ],
    amenities: ["เตียง 4-10 เตียง (Bunk bed)", "ล็อกเกอร์เก็บของ", "ห้องน้ำรวม", "Wi-Fi ฟรี", "โซนนั่งเล่นรวม"],
    pricing: {
      monthly: "2,000 - 2,500 บาท/เดือน",
      deposit: "0.5 เดือน",
      advance: "1 เดือน",
      water: "100 บาท/คน/เดือน",
      electricity: "6.8 บาท/ยูนิต",
      internet: "ฟรี"
    }
  }
];
