import { useEmployees } from "@/hooks/useEmployees";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAlternateEmail, MdOutlineVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { IoCreateOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaEye } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { Rating as ReactRating, Star } from "@smastrom/react-rating";
import { format } from "date-fns";

import Banner from "@/images/banner.jpg";
import Image from "next/image";
import { LuRefreshCcw } from "react-icons/lu";
import UpdateEmployeeButton from "./update-employee/update-employee-dialog";
import DeleteEmployeeButton from "./delete-employee/delete-employee-dialog";
import UpdateEmployeeStatusButton from "./update-employee-status/update-employee-status-dialog";

export default function UserContent({ employee }: any) {
  const logsData = [
    {
      id: 1,
      name: employee[0].first_name,
      action: "created",
      time: "10 mins ago",
      order_number: "1220942",
    },
    {
      id: 2,
      name: employee[0].first_name,
      action: "updated",
      time: "20 mins ago",
      order_number: "1220932",
    },
    {
      id: 3,
      name: employee[0].first_name,
      action: "completed",
      time: "30 mins ago",
      order_number: "1220998",
    },
    {
      id: 4,
      name: employee[0].first_name,
      action: "completed",
      time: "40 mins ago",
      order_number: "12209232",
    },
    {
      id: 5,
      name: employee[0].first_name,
      action: "completed",
      time: "50 mins ago",
      order_number: "1220925",
    },
    {
      id: 6,
      name: employee[0].first_name,
      action: "completed",
      time: "50 mins ago",
      order_number: "1220925",
    },
    {
      id: 7,
      name: employee[0].first_name,
      action: "completed",
      time: "50 mins ago",
      order_number: "1220925",
    },
    {
      id: 8,
      name: employee[0].first_name,
      action: "completed",
      time: "50 mins ago",
      order_number: "1220925",
    },
    {
      id: 9,
      name: employee[0].first_name,
      action: "completed",
      time: "50 mins ago",
      order_number: "1220925",
    },
  ];

  return (
    <div className="w-full h-full flex max-w-[1840px] max-h-[900px] justify-center place-items-center gap-7">
      <div className="w-full h-full flex flex-col gap-7 rounded-xl">
        <div className="w-full p-6 bg-darkComponentBg flex flex-col gap-2 2xl:gap-4 rounded-xl shadow-lg border border-lightBorder">
          <div className="w-full h-[170px] 2xl:h-[210px] bg-black rounded-xl relative">
            <Image
              src={Banner}
              alt="something"
              className="w-full h-full object-cover rounded-xl opacity-75"
            />

            <Avatar className="w-48 h-48 cursor-pointer z-0 absolute -bottom-[30%] left-7 border-8 border-darkComponentBg">
              <AvatarImage src={employee.img_url} alt={employee.id} />
              <AvatarFallback className="bg-lightComponentBg font-bold text-2xl">
                {`${employee[0].first_name[0]} ${employee[0].last_name[0]}`}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full flex justify-end gap-4">
            <UpdateEmployeeButton employeeData={employee[0]} />
            <DeleteEmployeeButton employeeData={employee[0]} />
          </div>
          <div className="w-full flex justify-start gap-4">
            <h2 className="flex text-2xl font-bold place-items-center gap-3">
              {employee[0].first_name + " " + employee[0].last_name}
              <UpdateEmployeeStatusButton employeeData={employee[0]} />
            </h2>
          </div>
          <div className="w-full flex gap-7">
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <MdAlternateEmail />
                Email
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {employee[0].email}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                {employee[0].gender === "Male" ? (
                  <BsGenderMale />
                ) : (
                  <BsGenderFemale />
                )}
                Gender
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {employee[0].gender}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <CiCalendarDate />
                Date of Birth
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {format(employee[0].dob, "PPP")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-7">
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <IoLocationOutline />
                Address
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {employee[0].address}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <MdOutlinePhone />
                Contact Number
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  +63 {employee[0].contact_number}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <IoPersonAddOutline />
                Added at
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {format(employee[0].created_at, "PPP")}
                </p>
              </div>
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
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {employee[0].branches.branch_name}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <MdOutlineManageAccounts />
                Branch Position
              </span>
              <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                <p className="text-sm 2xl:text-md text-white gap-2 p-2 max-w-[260px] truncate">
                  {employee[0].roles.role}
                </p>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-2">
              <span className="text-xs 2xl:text-md font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                <FaMapLocationDot />
                Branch Location
              </span>
              <div className="w-full h-full bg-lightBorder rounded-lg">
                <span className="text-sm 2xl:text-md text-white flex justify-start place-items-start gap-2 p-2 w-full h-full">
                  {employee[0].branches.branch_location}
                </span>
              </div>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.332903070714!2d123.30489887658621!3d9.30374158462459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab6edef6d33ce3%3A0x48ea1c2dfa8f1ff4!2sSentro%20Auto%20Parts%20%26%20Service%20Center!5e0!3m2!1sen!2sph!4v1711121635491!5m2!1sen!2sph"
            width="100%"
            height="100%"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>

      <div className="w-[35%] 2xl:w-[30%] h-full flex flex-col gap-7">
        <div className="w-full h-full flex flex-col gap-2 justify-around place-items-center bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder overflow-hidden p-6">
          <div className="w-full flex gap-3 place-items-start justify-center">
            <h1 className="text-5xl 2xl:text-6xl font-black">4.6</h1>
            <div className="w-full flex flex-col">
              <div className="flex place-items-center">
                <ReactRating
                  className="max-w-[80%]"
                  itemStyles={{
                    itemShapes: Star,
                    // activeFillColor: "#f59e0b",
                    activeFillColor: "#605ECD",
                    inactiveFillColor: "#ffedd5",
                  }}
                  value={4.6}
                  readOnly
                />
              </div>
              <p className="text-xs 2xl:text-sm text-slate-400 font-semibold">
                Based on 321 ratings
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between place-items-center">
              <span className="text-xs 2xl:text-md font-semibold text-slate-400">
                Orders Completed
              </span>
              <p className="text-xs 2xl:text-md text-white font-semibold">
                203 / 240
              </p>
            </div>
            <div className="w-full flex justify-between place-items-center">
              <span className="text-xs 2xl:text-md font-semibold text-slate-400">
                Last Activity
              </span>
              <p className="text-xs 2xl:text-md text-white font-semibold">
                5 mins ago
              </p>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[580px] max-h-[580px] 2xl:min-h-[640px] 2xl:max-h-[640px] bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder flex flex-col">
          <p className="text-xs 2xl:text-sm text-white font-semibold p-6 flex gap-2 place-items-center">
            <MdShowChart />
            Recent Activities
          </p>
          <ScrollArea className="w-full h-full px-3 pb-6 rounded-xl">
            <div className="w-full h-full flex flex-col gap-3">
              {logsData.map((item, i) => (
                <div
                  className="w-full p-4 bg-lightBorder/60 hover:bg-lightBorder rounded-xl transition-all duration-100 cursor-pointer"
                  key={i}
                >
                  <div className="w-full flex justify-between place-items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-slate-400 flex place-items-center gap-1">
                        {item.action == "created" && <IoCreateOutline />}
                        {item.action == "updated" && <LuRefreshCcw />}
                        {item.action == "completed" && <MdOutlineVerified />}
                        {item.name} • {item.time}
                      </span>

                      <p className="text-xs 2xl:text-sm font-normal flex place-items-center gap-2 truncate">
                        Order #{item.order_number} was {item.action}
                      </p>
                    </div>
                    <FaEye className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
