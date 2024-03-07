"use client";

import Image from "next/image";
import { CiBadgeDollar } from "react-icons/ci";
import { FaBoxes } from "react-icons/fa";
import { BiPulse } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";

import SmallVehicle from "@/images/vehicle-small.png";
import MediumVechile from "@/images/vehicle-medium.png";
import LargeVechile from "@/images/vehicle-large.png";
import MostVehicle from "@/components/mostVehicle/mostVehicle";
import Widget from "@/components/dataWidget/widget";
import LineChart from "@/components/lineChart/lineChart";
import ActivityLogs from "@/components/activityLogsWidget/activityLogsWidget";
import EmployeesWidget from "@/components/employeesWidget/employeesWidget";
import ActivityLogsDialog from "@/components/activityLogsDialog/ActivityLogsDialog";

const mostVehciles = [
  {
    img: SmallVehicle,
    count: 41,
    percent: 20,
    type: "Small",
  },
  {
    img: MediumVechile,
    count: 31,
    percent: 10,
    type: "Medium",
  },
  {
    img: LargeVechile,
    count: 21,
    percent: 5,
    type: "Large",
  },
];

const widgets = [
  {
    title: "Total Revenue",
    icon: <CiBadgeDollar className="w-5 h-5 text-slate-300" />,
    amount: "₱ 201,497.00",
    percent: "+20.1% from last month",
  },
  {
    title: "Orders Reveneue",
    icon: <FaBoxes className="w-5 h-5 text-slate-300" />,
    amount: "₱ 89,497.00",
    percent: "+75.11% from last month",
  },
  {
    title: "Ongoing",
    icon: <BiPulse className="w-5 h-5 text-slate-300" />,
    amount: 14,
    percent: "+5% from last month",
  },
  {
    title: "Completed",
    icon: <MdOutlineVerified className="w-5 h-5 text-slate-300" />,
    amount: 27,
    percent: "+5% from last month",
  },
];

export default function Dashboard() {
  return (
    <div className="w-full h-full flex justify-between gap-6">
      <div className="w-full h-full flex flex-col justify-between gap-6">
        <div className="w-full h-[30%] max-h-[35%] flex justify-between gap-6">
          {widgets.map((widget, i) => (
            <Widget key={i} {...widget} />
          ))}
        </div>
        <div className="w-full h-[55%] bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full p-5 flex flex-col justify-between place-items-between">
            <h3 className="text-sm font-semibold text-slate-200">
              Most Vehicle Job
            </h3>
            <div className="w-full h-fit flex justify-between place-items-end gap-16">
              {mostVehciles.map((vehicle, i) => (
                <MostVehicle
                  key={i}
                  img={vehicle.img}
                  count={vehicle.count}
                  percent={vehicle.percent}
                  type={vehicle.type}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full p-5 flex flex-col justify-between place-items-between gap-4">
            <div className="w-full flex justify-between">
              <h3 className="text-sm font-semibold text-slate-200">
                This Week Activity
              </h3>
              <div className="flex gap-4 place-items-center">
                <div className="flex gap-2">
                  <div className="py-1 px-5 rounded-full bg-applicationPrimary"></div>
                  <h3 className="text-xs font-semibold text-slate-200">
                    This Week
                  </h3>
                </div>
                <div className="flex gap-2">
                  <div className="py-1 px-5 rounded-full bg-[#7F7D87]"></div>
                  <h3 className="text-xs font-semibold text-slate-200">
                    Last Week
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[25%] h-full flex flex-col gap-6">
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full flex flex-col justify-between place-items-between p-1">
            <div className="w-full flex justify-between place-items-center py-3 px-4">
              <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 ">
                Activity Logs
              </h3>
              <ActivityLogsDialog />
            </div>
            <ActivityLogs />
          </div>
        </div>
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full flex flex-col justify-between place-items-between">
            <h3 className="w-full flex justify-between place-items-center text-sm font-semibold text-slate-200 py-3 px-4">
              Employees <span className="text-xs font-normal">See all</span>
            </h3>
            <EmployeesWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
