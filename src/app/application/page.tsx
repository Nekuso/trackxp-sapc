"use client";

import { supabase } from "../../lib/supabase";

export default function Dashboard() {

  return (
    <div className="w-full h-full flex justify-between gap-6">
      <div className="w-full h-full flex flex-col justify-between gap-6">
        <div className="w-full h-[40%] flex justify-between gap-6">
          <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder">
          </div>
          <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
          <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
        </div>
        <div className="w-full h-[55%] bg-darkComponentBg rounded-xl border border-lightBorder"></div>
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
      </div>
      <div className="w-[25%] h-full flex flex-col gap-6">
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder"></div>
      </div>
    </div>
  );
}
