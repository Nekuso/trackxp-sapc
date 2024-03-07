"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  {
    id: 1,
    first_name: "Dave",
    last_name: "Duterte",
    role: "Mechanic",
    availability: "Available",
  },
  {
    id: 2,
    first_name: "Sargine",
    last_name: "Sigue",
    role: "Mechanic",
    availability: "In Progress",
  },
  {
    id: 3,
    first_name: "Penpen",
    last_name: "Desarapen",
    role: "Mechanic",
    availability: "Unavailable",
  },
  {
    id: 4,
    first_name: "Adrian",
    last_name: "Cardosa",
    role: "Mechanic",
    availability: "Available",
  },
  {
    id: 5,
    first_name: "Ted",
    last_name: "Gwapo",
    role: "Mechanic",
    availability: "In Progress",
  },
];

export default function EmployeesLogsWidget() {
  return (
    <div className="w-full h-full flex flex-col place-content-between py-2">
      {data.map((item, i) => (
        <div
          className="w-full flex gap-2 p-3 hover:bg-applicationPrimary hover:scale-105 rounded-xl hover:shadow-2xl transition-all cursor-pointer"
          key={i}
        >
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage
              src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`}
            />
            <AvatarFallback>
              {item.first_name[0] + item.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-300 font-semibold flex place-items-center gap-1">
              {item.first_name} {item.last_name}
            </span>
            <p
              className={`w-fit text-xs font-normal flex place-items-center gap-2 truncate text-${
                item.availability == "Available"
                  ? `green`
                  : item.availability == `In Progress`
                  ? `yellow`
                  : `red`
              }-300`}
            >
              {item.availability}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
