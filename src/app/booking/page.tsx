"use client";

import { Suspense } from "react";
import BookingPage from "../../components/bookingpage"; // สมมติคุณย้าย code เดิมไป BookingPage.tsx ข้าง ๆ

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading booking page...</p>}>
      <BookingPage />
    </Suspense>
  );
}
