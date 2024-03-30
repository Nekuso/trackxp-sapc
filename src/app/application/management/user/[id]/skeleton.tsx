"use client";
import { MdAlternateEmail } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { BsGenderMale } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { IoPersonAddOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserSkeleton() {
  const logsData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
  ];
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <div className="w-full h-full flex max-w-[1840px] max-h-[900px] justify-center place-items-center gap-7">
        <div className="w-full h-full flex flex-col gap-7 rounded-xl ">
          <div className="w-full p-6 bg-darkComponentBg flex flex-col gap-2 2xl:gap-4 rounded-xl shadow-lg border border-lightBorder">
            <div className="w-full h-[170px] 2xl:h-[210px] rounded-xl relative">
              <Skeleton className="w-full h-full object-cover rounded-xl opacity-75 bg-lightBorder" />
              <Skeleton className="w-48 h-48 cursor-pointer z-0 absolute -bottom-[30%] left-7 border-8 border-transparent rounded-full bg-lightBorder"></Skeleton>
            </div>
            <div className="w-full flex justify-end gap-4">
              <Skeleton className="w-[96px] h-[40px] text-xs font-bold rounded-full flex gap-2 bg-lightBorder"></Skeleton>
              <Skeleton className="w-[96px] h-[40px] text-xs font-bold rounded-full flex gap-2 bg-lightBorder"></Skeleton>
            </div>
            <div className="w-full flex justify-start gap-4">
              <Skeleton className="w-[25%] h-[32px] flex text-2xl bg-lightBorder font-bold place-items-center gap-5 rounded-lg"></Skeleton>
            </div>
            <div className="w-full flex gap-7">
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <MdAlternateEmail />
                  Email
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <BsGenderMale />
                  Gender
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <CiCalendarDate />
                  Date of Birth
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
            </div>
            <div className="w-full flex gap-7">
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <IoLocationOutline />
                  Address
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <MdOutlinePhone />
                  Contact Number
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <IoPersonAddOutline />
                  Added at
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex gap-7">
            <div className="w-[60%] h-full flex flex-col justify-start p-6 gap-2 2xl:gap-4 bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder">
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <IoLocationOutline />
                  Assigned Branch
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <MdOutlineManageAccounts />
                  Branch Position
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start place-items-center gap-2 bg-lightBorder px-2 py-[17px] rounded-lg w-full"></Skeleton>
              </div>
              <div className="w-full h-full flex flex-col gap-2">
                <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  <FaMapLocationDot />
                  Branch Location
                </span>
                <Skeleton className="text-sm 2xl:text-md text-white flex justify-start  place-items-start gap-2 p-2 bg-lightBorder rounded-lg w-full h-full"></Skeleton>
              </div>
            </div>

            <Skeleton className="w-full h-full rounded-xl bg-lightBorder border border-lightBorder"></Skeleton>
          </div>
        </div>

        <div className="w-[35%] 2xl:w-[30%] h-full flex flex-col gap-7">
          <div className="w-full h-full flex flex-col gap-2 justify-around place-items-start bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder overflow-hidden p-6">
            <Skeleton className="w-[80%] h-[60px] bg-lightBorder"></Skeleton>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex justify-between place-items-center">
                <Skeleton className="w-[30%] h-[16px] bg-lightBorder"></Skeleton>
                <Skeleton className="w-[20%] h-[16px] bg-lightBorder"></Skeleton>
              </div>
              <div className="w-full flex justify-between place-items-center">
                <Skeleton className="w-[40%] h-[16px] bg-lightBorder"></Skeleton>
                <Skeleton className="w-[25%] h-[16px] bg-lightBorder"></Skeleton>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[580px] max-h-[580px] 2xl:min-h-[640px] 2xl:max-h-[640px] bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder flex flex-col">
            <div className="w-full px-4 py-6">
              <Skeleton className="w-[45%] h-[20px] bg-lightBorder"></Skeleton>
            </div>
            <ScrollArea className="w-full h-full px-3 pb-6 rounded-xl">
              <div className="w-full h-full flex flex-col gap-3">
                {logsData.map((item, i) => (
                  <div
                    className="w-full p-4 bg-lightBorder/60 hover:bg-lightBorder rounded-xl transition-all duration-100 cursor-pointer"
                    key={i}
                  >
                    <div className="w-full flex justify-between place-items-center">
                      <div className="w-full flex flex-col gap-1">
                        <Skeleton className="w-[35%] h-[16px] bg-lightBorder"></Skeleton>

                        <Skeleton className="w-[60%] h-[20px] bg-lightBorder"></Skeleton>
                      </div>
                      <Skeleton className="w-[16px] h-[16px] bg-lightBorder" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
