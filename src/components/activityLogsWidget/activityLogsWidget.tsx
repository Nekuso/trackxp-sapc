"use client";

import { IoCreateOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";

const data = [
  {
    id: 1,
    name: "Nixxo",
    action: "created",
    time: "10 mins ago",
    order_number: "1220942",
  },
  {
    id: 2,
    name: "Sharlen",
    action: "updated",
    time: "20 mins ago",
    order_number: "1220932",
  },
  {
    id: 3,
    name: "Natalie",
    action: "completed",
    time: "30 mins ago",
    order_number: "1220998",
  },
  {
    id: 4,
    name: "Nixxo",
    action: "completed",
    time: "40 mins ago",
    order_number: "12209232",
  },
  {
    id: 5,
    name: "Nixxo",
    action: "completed",
    time: "50 mins ago",
    order_number: "1220925",
  },
];

export default function ActivityLogsWidget() {
  return (
    <div className="w-full h-full flex flex-col place-content-between py-2">
      {data.map((item, i) => (
        <div
          className="w-full p-3 hover:bg-applicationPrimary hover:scale-105 rounded-xl hover:shadow-2xl transition-all duration-100 cursor-pointer"
          key={i}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-300 font-normal flex place-items-center gap-1">
              {item.action == "created" && <IoCreateOutline />}
              {item.action == "updated" && <LuRefreshCcw />}
              {item.action == "completed" && <MdOutlineVerified />}
              {item.name} • {item.time}
            </span>
            <p className="text-xs font-normal flex place-items-center gap-2 truncate">
              Order #{item.order_number} was {item.action}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
