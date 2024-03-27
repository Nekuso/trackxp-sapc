import { useEmployees } from "@/hooks/useEmployees";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAlternateEmail } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { CiCalendarDate } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";

import Banner from "@/images/banner.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function User({ params }: { params: any }) {
  const { getEmployee } = await useEmployees();
  const employee: any = await getEmployee(params.id);

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
            <Button className="text-xs font-bold rounded-full flex gap-2 bg-applicationPrimary/90 hover:bg-applicationPrimary primary-glow transition-all duration-300">
              <MdOutlineModeEdit />
              Update
            </Button>
            <Button
              variant="destructive"
              className="text-xs font-bold rounded-full flex gap-2"
            >
              <RiDeleteBinLine />
              Delete
            </Button>
          </div>
          <div className="w-full flex justify-start gap-4">
            <h2 className="flex text-2xl font-bold place-items-center gap-3">
              {employee[0].first_name + " " + employee[0].last_name}
              <span
                className={cn(
                  "text-xs rounded-full py-1 px-2 border font-normal flex place-items-center gap-1",
                  employee[0].status === "Available"
                    ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500"
                    : employee[0].status === "In Progress"
                    ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
                    : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
                )}
              >
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    employee[0].status === "Available"
                      ? " bg-green-500 "
                      : employee[0].status === "In Progress"
                      ? "bg-yellow-300 "
                      : "bg-red-500"
                  )}
                ></div>
                {employee[0].status}
              </span>
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
                  {employee[0].dob}
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
                  {employee[0].created_at}
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

      <div className="w-[35%] h-full flex flex-col gap-7">
        <div className="w-full h-full bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder flex flex-col gap-2 "></div>
        <div className="w-full min-h-[550px] 2xl:min-h-[650px] bg-darkComponentBg rounded-xl shadow-lg border border-lightBorder flex flex-col gap-2 "></div>
      </div>
    </div>
  );
}
