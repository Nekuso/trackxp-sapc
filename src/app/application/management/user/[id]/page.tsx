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
import { BsBuildingDown } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import Banner from "@/images/banner.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default async function User({ params }: { params: any }) {
  const { getEmployee } = await useEmployees();
  const employee: any = await getEmployee(params.id);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <div className="w-full h-full flex max-w-[1840px] max-h-[900px] justify-center place-items-center gap-4">
        <div className="w-full h-full flex flex-col gap-4 rounded-xl">
          <div className="w-full p-5 bg-darkComponentBg flex flex-col gap-5 rounded-xl shadow-lg">
            <div className="w-full h-[230px] bg-black rounded-xl relative">
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
              <Button className="text-xs rounded-full flex gap-2">
                <MdOutlineModeEdit />
                Update User
              </Button>
              <Button
                variant="destructive"
                className="text-xs rounded-full flex gap-2"
              >
                <RiDeleteBinLine />
                Delete User
              </Button>
            </div>
            <div className="w-full flex justify-start gap-4">
              <h2 className="flex text-2xl font-bold place-items-center gap-5">
                {employee[0].first_name}
                {employee[0].last_name}
                <span
                  className={cn(
                    "text-xs rounded-full py-1 px-3 border font-normal flex place-items-center gap-2",
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
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <MdAlternateEmail />
                  Email
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].email}
                </span>
              </div>
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  {employee[0].gender === "Male" ? (
                    <BsGenderMale />
                  ) : (
                    <BsGenderFemale />
                  )}
                  Gender
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].gender}
                </span>
              </div>
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <CiCalendarDate />
                  Date of Birth
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].dob}
                </span>
              </div>
            </div>
            <div className="w-full flex gap-7">
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <IoLocationOutline />
                  Address
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].address}
                </span>
              </div>
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <MdOutlinePhone />
                  Contact Number
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  +63 {employee[0].contact_number}
                </span>
              </div>
              <div className="w-full"></div>
            </div>
          </div>
          <div className="w-full h-full flex gap-5 overflow-hidden">
            <div className="w-[60%] h-full flex flex-col justify-around p-5 gap-3 bg-darkComponentBg rounded-xl shadow-lg">
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <BsBuildingDown />
                  Assigned Branch
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].branches.branch_name}
                </span>
              </div>
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <MdOutlineManageAccounts />
                  Branch Position
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].roles.role}
                </span>
              </div>
              <div className="w-full">
                <span className="text-md font-bold text-slate-100 flex justify-center place-items-center w-fit gap-1">
                  <FaMapLocationDot />
                  Branch Location
                </span>
                <span className="text-sm text-slate-300 flex justify-center place-items-center w-fit gap-2">
                  {employee[0].branches.branch_location}
                </span>
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

        <div className="w-[35%] h-full flex flex-col gap-5">
          <div className="w-full h-full bg-darkComponentBg rounded-xl shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
