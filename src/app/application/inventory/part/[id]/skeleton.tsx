"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center">
      <div className="w-[1000px] 2xl:w-[1200px] h-[570px] 2xl:h-[680px] flex justify-center rounded-xl gap-4">
        <div className="w-[750px] 2xl:w-[950px] h-full p-6 bg-darkComponentBg flex flex-col justify-between gap-2 2xl:gap-4 rounded-xl shadow-lg border border-lightBorder">
          <Skeleton className="w-full h-[80%] cursor-pointer z-0 rounded-md bg-lightBorder"></Skeleton>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-[50px] bg-lightBorder" />
            <Skeleton className="w-full h-[28px] bg-lightBorder"></Skeleton>
          </div>
        </div>
        <div className="w-full h-full p-8 bg-darkComponentBg flex flex-col gap-5 2xl:gap-7 rounded-xl shadow-lg border border-lightBorder">
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-[60%] h-[28px] bg-lightBorder"></Skeleton>
            <Skeleton className="w-[25%] h-[20px] bg-lightBorder"></Skeleton>
          </div>
          <div className="w-full h-full flex flex-col gap-2 2xl:gap-4">
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-[48px] min-w-0 bg-lightBorder rounded-lg"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-[48px] min-w-0 bg-lightBorder rounded-lg"></Skeleton>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-[48px] min-w-0 bg-lightBorder rounded-lg"></Skeleton>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-[48px] min-w-0 bg-lightBorder rounded-lg"></Skeleton>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[460px] truncate"></p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[50%] h-[20px]"></Skeleton>
                <div className="w-full min-w-0 bg-lightBorder rounded-lg">
                  <p className="text-md 2xl:text-lg text-white gap-2 p-3 max-w-[260px] 2xl:max-w-[360px] truncate"></p>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex gap-7">
              <div className="w-full h-full flex flex-col gap-2">
                <Skeleton className="bg-lightBorder w-[25%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-full min-w-0 bg-lightBorder rounded-lg p-3"></Skeleton>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-4 justify-end">
            <Skeleton className="w-[98px] h-[40px] bg-lightBorder" />
            <Skeleton className="w-[98px] h-[40px] bg-lightBorder" />
          </div>
        </div>
      </div>
    </div>
  );
}
