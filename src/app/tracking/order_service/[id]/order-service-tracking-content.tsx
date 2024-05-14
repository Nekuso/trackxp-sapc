/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { allPurchaseOrderServicesDisplay } from "@/types";
import { FaClockRotateLeft } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { MdAddToPhotos } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { RiUserReceived2Fill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

import smallVehicle from "@/images/vehicle-small-hd.png";
import mediumVehicle from "@/images/vehicle-medium-hd.png";
import largeVehicle from "@/images/vehicle-large-hd.png";
import recieptLogo from "@/images/receipt-logo-white.svg";
import CountUp from "react-countup";
import Rating from "./add-rating/rating-dialog";
import { useRouter } from "next/navigation";

export default function OrderContent({ orderServiceDataTracking }: any) {
  const router = useRouter();
  const data: allPurchaseOrderServicesDisplay = orderServiceDataTracking[0];

  const [progress_entries_data, setProgressEntriesData] = useState<any>(
    data.progress_entries
      .map((progress: any) => ({
        id: progress.id,
        value: progress.progress_name,
        created_at: progress.created_at,
        icon:
          progress.progress_name === "Created"
            ? MdAddToPhotos
            : progress.progress_name === "In Progress"
            ? TbProgressBolt
            : progress.progress_name === "Completed"
            ? MdVerified
            : progress.progress_name === "Quality Checks"
            ? PiMagnifyingGlassFill
            : RiUserReceived2Fill,
        description: progress.description,
        order_service_id: progress.order_service_id,
      }))
      .sort(
        (a: any, b: any) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .reverse()
  );

  useEffect(() => {
    setProgressEntriesData(
      data.progress_entries
        .map((progress: any) => ({
          id: progress.id,
          value: progress.progress_name,
          created_at: progress.created_at,
          icon:
            progress.progress_name === "Created"
              ? MdAddToPhotos
              : progress.progress_name === "In Progress"
              ? TbProgressBolt
              : progress.progress_name === "Completed"
              ? MdVerified
              : progress.progress_name === "Quality Checks"
              ? PiMagnifyingGlassFill
              : RiUserReceived2Fill,
          description: progress.description,
          order_service_id: progress.order_service_id,
        }))
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .reverse()
    );
  }, [data.progress_entries]);

  return (
    <div className="w-full min-h-[90%] flex flex-col max-w-[1840px] justify-start place-items-center gap-5">
      <div className="w-full md:w-[400px] h-fit flex flex-col gap-4 bg-darkComponentBg p-6 md:p-6 rounded-2xl border border-lightBorder">
        <Image
          src={recieptLogo}
          alt="Receipt Logo"
          className="w-[60%] mx-auto mb-2 cursor-pointer"
          onClick={() => router.push("https://trackxp-sapsc.vercel.app/")}
        />

        <div className="w-full flex justify-between place-items-center">
          <h3 className="w-full text-xs font-semibold text-slate-200 ">
            Tracking ID: {data.tracking_id}
          </h3>
        </div>
        <div className="flex justify-between place-items-center gap-2 w-full">
          <div className="h-full flex flex-col justify-center">
            <h2
              className={cn(
                "w-full text-center text-4xl font-extrabold",
                progress_entries_data.length > 4 ? "text-green-300" : ""
              )}
            >
              <CountUp
                start={0}
                end={Math.round((progress_entries_data.length / 5) * 100)}
                duration={5}
              />
              %
            </h2>
            <span
              className={cn(
                "w-full text-center text-xs text-slate-300",
                progress_entries_data.length > 4 ? "text-green-300" : ""
              )}
            >
              Completion
            </span>
          </div>
          <Image
            src={
              data.vehicle_entries[0].type === "small"
                ? smallVehicle
                : data.vehicle_entries[0].type === "medium"
                ? mediumVehicle
                : largeVehicle
            }
            alt="Vehicle"
            className="rounded-xl w-[70%] "
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <div className="w-full flex justify-between gap-3">
              <div className="w-full flex flex-col gap-1">
                <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-200 ">
                  Customer
                </h3>
                <h3 className={cn("text-lg text-slate-100 font-bold")}>
                  {data.customer_first_name} {data.customer_last_name}
                </h3>
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-200 ">
                  Vehicle Type
                </h3>
                <h3 className="text-xs font-semibold text-slate-400">
                  {data.vehicle_entries[0].type.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="w-full flex justify-between gap-3">
              <div className="w-full flex flex-col gap-1">
                <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-200 ">
                  Branch
                </h3>
                <h3 className="text-xs font-semibold text-slate-400">
                  {data.inventory.branches.branch_name}
                </h3>
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-200 ">
                  Branch Contact
                </h3>
                <h3 className="text-xs font-semibold text-slate-400">
                  {data.inventory.branches.contact_number}
                </h3>
              </div>
            </div>
            <div className="w-full flex justify-between gap-3">
              <div className="w-full flex flex-col gap-1">
                <h3 className="flex place-items-center gap-1 text-xs font-semibold text-slate-200 ">
                  Remarks
                </h3>
                <h3 className="text-xs font-semibold text-slate-400 flex-wrap">
                  {data.remarks}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[400px] h-fit flex flex-col gap-1 bg-darkComponentBg p-6 md:p-6 rounded-2xl border border-lightBorder">
        <div className="w-full flex justify-between place-items-center">
          <h3 className="w-full text-sm font-semibold text-slate-200 ">
            Progress Timeline
          </h3>
        </div>
        <div
          className={cn(
            "w-full h-full flex-col flex place-items-center",
            data.progress_entries?.length > 4
              ? "justify-center"
              : "justify-start"
          )}
        >
          <div className="w-full h-fit">
            {progress_entries_data.map((progress: any, i: number) => (
              <div
                className={cn(
                  "relative pl-16 sm:pl-16 py-2 2xl:py-3 group",
                  progress.value === progress_entries_data[0].value
                    ? ""
                    : "opacity-30"
                )}
                key={i}
              >
                <div className="font-sm font-bold text-md text-white sm:mb-0">
                  {progress.value}
                </div>
                <div className="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-[1.4rem] sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[1.5rem] before:self-start before:-translate-x-1/2 before:-translate-y-2">
                  <div
                    className={cn(
                      "absolute left-[1.4rem] sm:left-0 w-11 h-11 border-2 box-content rounded-full sm:ml-[1.5rem] -translate-x-1/2 -translate-y-2 flex justify-center place-items-center text-center transition-all duration-300",
                      progress.value === progress_entries_data[0].value
                        ? "animate-pulse-on-ping hover:scale-125"
                        : "",
                      `bg-applicationPrimary`
                    )}
                  >
                    {<progress.icon />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-400 flex place-items-center gap-2">
                      <FaClockRotateLeft />
                      {formatDistanceToNow(new Date(progress.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="text-xs 2xl:text-sm text-slate-200">
                      {progress.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Rating data={data} progress_entries={progress_entries_data} />
    </div>
  );
}
