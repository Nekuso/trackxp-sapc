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
import Widget from "@/components/widget/widget";
import BarChart from "@/components/barChart/barChart";

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
            <h3 className="text-sm font-semibold">Most Vehicle Job</h3>
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
          <div className="w-full h-full p-5 flex flex-col justify-between place-items-between gap-2">
            <h3 className="text-sm font-semibold">Compare Activity</h3>
            <div className="w-full h-full">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[25%] h-full flex flex-col gap-6">
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full p-5 flex flex-col justify-between place-items-between">
            <h3 className="w-full flex justify-between text-sm font-semibold">Activity Logs <span>See all</span></h3>

          </div>
        </div>
        <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
          <div className="w-full h-full p-5 flex flex-col justify-between place-items-between">
            <h3 className="text-sm font-semibold">Employees</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
