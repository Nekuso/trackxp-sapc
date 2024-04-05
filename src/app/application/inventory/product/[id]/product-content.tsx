import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateProductButton from "./update-product/update-product-dialog";
import DeleteProductButton from "./delete-product/delete-product-dialog";
import Barcode from "react-barcode";
import { FaRegCopy } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast as sonner } from "sonner";

export default function ProductContent({ product, uoms }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center">
      <div className="w-[1000px] 2xl:w-[1200px] h-[570px] 2xl:h-[680px] flex justify-center rounded-xl gap-4">
        <div className="w-[750px] 2xl:w-[950px] h-full p-6 bg-darkComponentBg flex flex-col justify-between gap-2 2xl:gap-4 rounded-xl shadow-lg border border-lightBorder">
          <Avatar className="w-full h-[80%] cursor-pointer z-0 rounded-md">
            <AvatarImage
              className="object-cover bg-center bg-cover rounded-xl"
              src={
                "https://hips.hearstapps.com/hmg-prod/images/pile-of-tires-on-white-background-royalty-free-image-672151801-1561751929.jpg?resize=2048:*"
              }
              alt={product[0].name}
            />
            <AvatarFallback className="bg-darkBg rounded-md">
              No image
            </AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col gap-2">
            <Barcode
              value={product[0].barcode ? product[0].barcode : "No Barcode"}
              flat={true}
              displayValue={product[0].barcode ? false : true}
              background="transparent"
              lineColor="white"
              width={3}
              height={50}
              margin={0}
              className="w-full"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => {
                    navigator.clipboard.writeText(product[0].barcode);
                    sonner("✨Success", {
                      description: "Barcode Copied!",
                    });
                  }}
                >
                  <div className="flex justify-between">
                    {product[0].barcode.split("").map((item: any, i: any) => {
                      return (
                        <h2 key={i} className="text-lg 2xl:text-2xl font-bold">
                          {item}
                        </h2>
                      );
                    })}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Barcode </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-full h-full p-8 bg-darkComponentBg flex flex-col gap-5 2xl:gap-7 rounded-xl shadow-lg border border-lightBorder">
          <div className="w-full">
            <h2 className="flex text-lg 2xl:text-2xl font-bold place-items-center gap-3">
              {product[0].name}
              <div
                className={cn(
                  "text-xs rounded-full py-1 px-2 border font-normal flex place-items-center gap-1 cursor-pointer",
                  product[0].status === "Available"
                    ? "text-green-500 bg-green-500 bg-opacity-20 border-green-500"
                    : product[0].status === "Low Stock"
                    ? "text-yellow-300 bg-yellow-300 bg-opacity-20 border-yellow-300"
                    : "text-red-500 bg-red-500 bg-opacity-20 border-red-500"
                )}
              >
                {product[0].status}
              </div>
            </h2>
          </div>
          <div className="w-full h-full flex flex-col gap-2 2xl:gap-4">
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  Price
                </span>
                <div className="w-full flex justify-between place-items-center min-w-0  bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 max-w-[260px] p-3 truncate">
                    ₱ {product[0].price}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(product[0].price);
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
                  Unit Of Measure
                </span>
                <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[260px] truncate">
                    {product[0].uoms.unit_name}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(
                            product[0].uoms.unit_name
                          );
                          sonner("✨Success", {
                            description: "Unit of measure Copied!",
                          });
                        }}
                      >
                        <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                          <FaRegCopy className="group-hover:text-black" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy Unit Name</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  In Stock
                </span>
                <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[260px] truncate">
                    {product[0].stock_quantity}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(
                            product[0].stock_quantity
                          );
                          sonner("✨Success", {
                            description: "Stock Quantity Copied!",
                          });
                        }}
                      >
                        <div className="p-3 bg-darkComponentBg rounded-md mr-2 select-none hover:bg-white group transition-all duration-500 cursor-pointer">
                          <FaRegCopy className="group-hover:text-black" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy Stock Quantity</p>
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
                    {format(product[0].created_at, "PPP")}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(
                            format(product[0].created_at, "PPP")
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
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  Branch
                </span>
                <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[210px] 2xl:max-w-[260px] truncate">
                    {product[0].inventory.branches.branch_name}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(
                            product[0].inventory.branches.branch_name
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
                  Branch Location
                </span>
                <div className="w-full flex justify-between place-items-center min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[190px] 2xl:max-w-[240px] truncate">
                    {product[0].inventory.branches.branch_location}
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() => {
                          navigator.clipboard.writeText(
                            product[0].inventory.branches.branch_location
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
            <div className="w-full h-full flex gap-7">
              <div className="w-full h-full flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-400 flex justify-center place-items-center w-fit gap-1">
                  Description
                </span>
                <div className="w-full h-full min-w-0 bg-lightBorder rounded-lg p-3">
                  <p className="text-md 2xl:text-lg text-white line-clamp-4">
                    {product[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-end">
            <DeleteProductButton productData={product[0]} />
            <UpdateProductButton productData={product[0]} uomsData={uoms} />
          </div>
        </div>
      </div>
    </div>
  );
}
