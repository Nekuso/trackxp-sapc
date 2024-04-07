import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateServiceButton from "./update-service/update-service-dialog";
import UpdateServiceStatusButton from "./update-service-status/update-service-status-dialog";
import DeleteServiceButton from "./delete-service/delete-service-dialog";

import { FaRegCopy } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast as sonner } from "sonner";

export default function ServiceContent({ service }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center">
      <div className="w-[800px] 2xl:w-[900px] h-[600px] 2xl:h-[680px] flex justify-center rounded-xl shadow-lg bg-darkComponentBg border border-lightBorder">
        <div className="w-full h-full p-8 flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <Avatar className="w-[30%] h-full z-0 rounded-md">
              <AvatarImage
                className="object-cover bg-center bg-cover rounded-xl"
                src={
                  "https://hips.hearstapps.com/hmg-prod/images/pile-of-tires-on-white-background-royalty-free-image-672151801-1561751929.jpg?resize=2048:*"
                }
                alt={service[0].name}
              />
              <AvatarFallback className="bg-darkBg rounded-md">
                No image
              </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col">
                <h2 className="flex text-lg 2xl:text-2xl font-bold place-items-center gap-3">
                  {service[0].name}
                  <UpdateServiceStatusButton serviceData={service[0]} />
                </h2>
                <p className="text-sm 2xl:text-md text-slate-400 font-bold">
                  Type: Service
                </p>
              </div>
              <div className="w-full flex gap-4">
                <div className="w-full flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                    Price
                  </span>
                  <div className="w-full flex justify-between place-items-center min-w-0  bg-lightBorder rounded-lg">
                    <p className="text-md 2xl:text-lg text-white gap-2 max-w-[260px] p-3 truncate">
                      ₱ {service[0].price.toFixed(2)}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            navigator.clipboard.writeText(service[0].price);
                            sonner("✨Success", {
                              description: "Price Copied!",
                            });
                          }}
                        >
                          <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                            <FaRegCopy className="group-hover:text-black" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy Price</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                    Duration
                  </span>
                  <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                    <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[260px] truncate">
                      {service[0].duration} mins
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            navigator.clipboard.writeText(service[0].duration);
                            sonner("✨Success", {
                              description: "Duration Copied!",
                            });
                          }}
                        >
                          <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                            <FaRegCopy className="group-hover:text-black" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy Duration</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-4">
                <div className="w-full flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                    Branch
                  </span>
                  <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                    <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[210px] 2xl:max-w-[260px] truncate">
                      {service[0].inventory.branches.branch_name}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            navigator.clipboard.writeText(
                              service[0].inventory.branches.branch_name
                            );
                            sonner("✨Success", {
                              description: "Branch Name Copied!",
                            });
                          }}
                        >
                          <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                            <FaRegCopy className="group-hover:text-black" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy Branch Name</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                    Created At
                  </span>
                  <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                    <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[260px] truncate">
                      {format(service[0].created_at, "PPP")}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            navigator.clipboard.writeText(
                              format(service[0].created_at, "PPP")
                            );
                            sonner("✨Success", {
                              description: "Created Date Copied!",
                            });
                          }}
                        >
                          <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                            <FaRegCopy className="group-hover:text-black" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy Created Date</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                Branch Location
              </span>
              <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[590px] 2xl:max-w-[800px] truncate">
                  {service[0].inventory.branches.branch_location}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => {
                        navigator.clipboard.writeText(
                          service[0].inventory.branches.branch_location
                        );
                        sonner("✨Success", {
                          description: "Branch Location Copied!",
                        });
                      }}
                    >
                      <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                        <FaRegCopy className="group-hover:text-black" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy Branch Location</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex gap-4">
            <div className="w-full h-full flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                Description
              </span>
              <div className="w-full h-full min-w-0 bg-lightBorder rounded-lg p-3">
                <p className="text-md 2xl:text-lg text-white line-clamp-4">
                  {service[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-end">
            <DeleteServiceButton serviceData={service[0]} />
            <UpdateServiceButton serviceData={service[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
