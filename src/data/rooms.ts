// src/data/rooms.ts
export const rooms = [
  {
    id: 1,
    name: "Single Room",
    slug: "single-room",
    img: "/images/room1.jpg",
    imgs: ["/images/otherroom/otherroom1.jpg", "/images/bathroom/bathroom1.jpg", "/images/balconyroom/balconyroom1.jpg"],
    desc: "ห้องซิงเกิล เตียงเดี่ยว เหมาะสำหรับเข้าพัก 1 คน",
    available: true,
    maxAdults: 1,
    maxChildren: 1,
    details: [
      "ห้องซิงเกิล เตียงเดี่ยว 1 เตียง (Twin/Single bed)",
      "เหมาะสำหรับเข้าพัก 1 คน",
      "พร้อมสิ่งอำนวยความสะดวกพื้นฐาน",
    ],
    amenities: ["เตียงเดี่ยว 1 เตียง", "โต๊ะทำงาน", "ตู้เสื้อผ้า", "ทีวี", "ห้องน้ำส่วนตัว", "ฟรี Wi-Fi"],
    pricing: {
      daily: 500,
      monthly: 3000,
      deposit: 3000,
      advance: 3000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 2,
    name: "Twin Room",
    slug: "twin-room",
    img: "/images/room2.jpg",
    imgs: ["/images/otherroom/otherroom2.jpg", "/images/bathroom/bathroom2.jpg", "/images/balconyroom/balconyroom2.jpg"],
    desc: "ห้องทวิน มีเตียงเดี่ยว 2 เตียง เหมาะสำหรับเพื่อนหรือครอบครัว",
    available: true,
    maxAdults: 2,
    maxChildren: 2,
    details: [
      "มีเตียงเดี่ยว 2 เตียง",
      "เหมาะสำหรับเพื่อนหรือครอบครัวที่ต้องการแยกเตียง",
    ],
    amenities: ["เตียงเดี่ยว 2 เตียง", "ตู้เย็น", "ทีวี", "ห้องน้ำในตัว", "โต๊ะอาหารเล็ก", "Wi-Fi"],
    pricing: {
      daily: 650,
      monthly: 3800,
      deposit: 3800,
      advance: 3800,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 3,
    name: "Double Room",
    slug: "double-room",
    img: "/images/room3.jpg",
    imgs: ["/images/otherroom/otherroom3.jpg", "/images/bathroom/bathroom3.jpg", "/images/balconyroom/balconyroom3.jpg"],
    desc: "ห้องดับเบิล เตียงใหญ่ เหมาะสำหรับคู่รักหรือเข้าพัก 2 คน",
    available: true,
    maxAdults: 2,
    maxChildren: 1,
    details: [
      "เตียงใหญ่ 1 เตียง (Queen/King size)",
      "เหมาะสำหรับคู่รักหรือผู้เข้าพัก 2 คน",
    ],
    amenities: ["เตียงใหญ่", "โซฟาเล็ก", "ตู้เสื้อผ้า", "ทีวีจอแบน", "ห้องน้ำส่วนตัว", "Wi-Fi"],
    pricing: {
      daily: 700,
      monthly: 4000,
      deposit: 4000,
      advance: 4000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 4,
    name: "Triple Room",
    slug: "triple-room",
    img: "/images/room4.jpg",
    imgs: ["/images/otherroom/otherroom4.jpg", "/images/bathroom/bathroom4.jpg", "/images/balconyroom/balconyroom4.jpg"],
    desc: "ห้องทริปเปิล เหมาะสำหรับเข้าพัก 3 คน",
    available: true,
    maxAdults: 3,
    maxChildren: 2,
    details: [
      "มี 3 เตียงเดี่ยว หรือ 1 เตียงใหญ่ + 1 เตียงเดี่ยว",
      "พักได้ 3 คน",
    ],
    amenities: ["3 เตียงเดี่ยว / 1 เตียงใหญ่ + 1 เดี่ยว", "โต๊ะอาหาร", "ตู้เย็น", "ห้องน้ำส่วนตัว", "Wi-Fi"],
    pricing: {
      daily: 850,
      monthly: 4500,
      deposit: 4500,
      advance: 4500,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 5,
    name: "Quad Room",
    slug: "quad-room",
    img: "/images/room5.jpg",
    imgs: ["/images/otherroom/otherroom5.jpg", "/images/bathroom/bathroom5.jpg", "/images/balconyroom/balconyroom5.jpg"],
    desc: "ห้องควอด เหมาะสำหรับเข้าพัก 4 คน",
    available: false,
    maxAdults: 4,
    maxChildren: 2,
    details: [
      "มีเตียง 2 เตียงใหญ่ หรือ 4 เตียงเล็ก",
      "เหมาะสำหรับเข้าพัก 4 คน",
    ],
    amenities: ["4 เตียงเดี่ยว หรือ 2 เตียงใหญ่", "โต๊ะรับแขก", "ทีวี", "ตู้เย็น", "ห้องน้ำในตัว", "Wi-Fi"],
    pricing: {
      daily: 1000,
      monthly: 5000,
      deposit: 5000,
      advance: 5000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 6,
    name: "Studio Room",
    slug: "studio-room",
    img: "/images/room6.jpg",
    imgs: ["/images/otherroom/otherroom6.jpg", "/images/bathroom/bathroom6.jpg", "/images/balconyroom/balconyroom6.jpg"],
    desc: "ห้องสตูดิโอ รวม ห้องนอน + ห้องนั่งเล่น + ครัวเล็ก",
    available: true,
    maxAdults: 2,
    maxChildren: 2,
    details: [
      "ห้องที่รวม ห้องนอน + ห้องนั่งเล่น + ครัวเล็ก ๆ ในที่เดียว",
      "เตียงมักจะเป็น Sofa bed หรือเตียงพับได้",
    ],
    amenities: ["Sofa bed / เตียงพับได้", "เคาน์เตอร์ครัว", "ไมโครเวฟ", "โต๊ะทานข้าว", "ห้องน้ำในตัว", "Wi-Fi"],
    pricing: {
      daily: 1200,
      monthly: 6000,
      deposit: 6000,
      advance: 6000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 7,
    name: "Deluxe Room",
    slug: "deluxe-room",
    img: "/images/room7.jpg",
    imgs: ["/images/otherroom/otherroom7.jpg", "/images/bathroom/bathroom7.jpg", "/images/balconyroom/balconyroom7.jpg"],
    desc: "ห้องดีลักซ์ กว้างและหรูหรากว่ามาตรฐาน",
    available: true,
    maxAdults: 3,
    maxChildren: 3,
    details: [
      "ใหญ่กว่าห้องมาตรฐาน",
      "การตกแต่งหรูหรา สวยงามกว่า",
      "มีสิ่งอำนวยความสะดวกพิเศษเพิ่มขึ้น",
    ],
    amenities: ["เตียงใหญ่", "เฟอร์นิเจอร์พิเศษ", "วิวสวย", "ห้องน้ำหรูพร้อมอ่างอาบน้ำ", "ทีวีจอใหญ่", "Wi-Fi"],
    pricing: {
      daily: 1500,
      monthly: 7000,
      deposit: 14000,
      advance: 7000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 8,
    name: "Suite Room",
    slug: "suite-room",
    img: "/images/room8.jpg",
    imgs: ["/images/otherroom/otherroom8.jpg", "/images/bathroom/bathroom8.jpg", "/images/balconyroom/balconyroom8.jpg"],
    desc: "ห้องสวีท หรูหราพร้อมห้องนั่งเล่นแยกต่างหาก",
    available: true,
    maxAdults: 4,
    maxChildren: 4,
    details: [
      "มีห้องนั่งเล่นแยกต่างหากจากห้องนอน",
      "พื้นที่กว้างขวางและหรูหรา",
    ],
    amenities: ["ห้องนอน + ห้องนั่งเล่น", "โซฟาเซ็ตใหญ่", "ครัวเล็ก", "โต๊ะอาหาร", "ห้องน้ำหรู", "Wi-Fi"],
    pricing: {
      daily: 2500,
      monthly: 12000,
      deposit: 24000,
      advance: 12000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  },
  {
    id: 9,
    name: "Presidential Suite",
    slug: "presidential-suite",
    img: "/images/room9.jpg",
    imgs: ["/images/otherroom/otherroom9.jpg", "/images/bathroom/bathroom9.jpg", "/images/balconyroom/balconyroom9.jpg"],
    desc: "ห้องเพรซิเดนเชียลสวีท ใหญ่และหรูที่สุด",
    available: true,
    maxAdults: 6,
    maxChildren: 4,
    details: [
      "ห้องที่ใหญ่และหรูหราที่สุดในโรงแรม",
      "มีหลายห้องนอน ห้องรับแขก ห้องประชุม",
      "มีอ่างจากุซซี่ ครัวส่วนตัว ใช้รับรองแขก VIP",
    ],
    amenities: ["ห้องนอนหลายห้อง", "ห้องประชุม", "อ่างจากุซซี่", "ครัวส่วนตัว", "ห้องรับแขกใหญ่", "Wi-Fi"],
    pricing: {
      daily: 5000,
      monthly: 25000,
      deposit: 75000,
      advance: 25000,
      water: 0,
      electricity: 0,
      internet: 0
    }
  },
  {
    id: 10,
    name: "Dormitory",
    slug: "dormitory",
    img: "/images/room10.jpg",
    imgs: ["/images/otherroom/otherroom10.jpg", "/images/bathroom/bathroom10.jpg", "/images/balconyroom/balconyroom10.jpg"],
    desc: "ห้องดอร์มหอพักรวม ราคาประหยัด",
    available: true,
    maxAdults: 10,
    maxChildren: 5,
    details: [
      "มีเตียงหลายเตียงในห้องเดียว (Bunk bed)",
      "ใช้ร่วมกับแขกคนอื่น ๆ",
      "ราคาประหยัด เหมาะกับ Backpacker",
    ],
    amenities: ["เตียง 4-10 เตียง (Bunk bed)", "ล็อกเกอร์เก็บของ", "ห้องน้ำรวม", "Wi-Fi ฟรี", "โซนนั่งเล่นรวม"],
    pricing: {
      daily: 300,
      monthly: 2000,
      deposit: 1000,
      advance: 2000,
      water: 100,
      electricity: 6.8,
      internet: 0
    }
  }
];
