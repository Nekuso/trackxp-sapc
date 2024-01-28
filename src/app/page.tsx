"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex flex-col h-screen w-screen justify-center place-items-center">
      This is the landing page
    </main>
  );
}
