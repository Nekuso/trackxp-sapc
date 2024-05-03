"use client";

import Image from "next/image";
import searchIcon from "@/icons/search-icon.svg";
import ProfileButton from "@/components/profile-button/profile-button";
import NotificationButton from "@/components/notification-button/notification-button";
import { pathNameFilter } from "@/hooks/pathNameFilter";

import { usePathname } from "next/navigation";
export default function TopBar({ data }: { data: any }) {
  function getCurrentDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${dayOfWeek} | ${dayOfMonth} ${month} ${year}`;
  }
  function getTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes: string | number = currentTime.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zero to minutes if less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
  }
  // console.log(data);
  const pathname = usePathname();

  return (
    <div className="flex justify-between place-items-center w-full sticky top-0 z-[10] bg-darkBg py-4">
      <h1 className="text-2xl font-extrabold text-white">
        {pathNameFilter(pathname)}
      </h1>
      <div className="w-auto h-full flex just place-items-center gap-5">
        <div className="w-auto flex flex-col place-items-end">
          {/* <h5 className="text-xs text-white">{getCurrentDate()}</h5>
          <span className="text-xs text-white">{getTime()}</span> */}
        </div>

        <div className="w-auto min-h-11 flex justify-center place-items-center bg-darkComponentBg rounded-full px-3 gap-4">
          <Image src={searchIcon} alt="search icon" className="w-6 h-6"></Image>
          <input
            type="text"
            placeholder="Quick Search"
            className="w-52 h-full bg-transparent outline-none text-sm"
          />
        </div>

        <NotificationButton />
        <ProfileButton data={data} />
      </div>
    </div>
  );
}
