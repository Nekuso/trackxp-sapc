"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceSkeleton() {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center">
      <div className="w-[800px] 2xl:w-[900px] h-[600px] 2xl:h-[680px] flex justify-center rounded-xl shadow-lg bg-darkComponentBg border border-lightBorder">
        <div className="w-full h-full p-8 flex flex-col gap-4">
          <div className="w-full flex gap-4">
            <Skeleton className="w-[45%] h-full z-0 rounded-xl bg-lightBorder"></Skeleton>
            <div className="w-full flex flex-col gap-4">
              <Skeleton className="w-[60%] h-[28px] bg-lightBorder"></Skeleton>
              <Skeleton className="w-[25%] h-[20px] bg-lightBorder"></Skeleton>
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
            </div>
          </div>

          <div className="w-full h-full flex flex-col gap-2 2xl:gap-4">
            <div className="w-full flex gap-4">
              <div className="w-full flex flex-col gap-2 2xl:gap-4">
                <Skeleton className="bg-lightBorder w-[20%] h-[20px]"></Skeleton>
                <Skeleton className="w-full h-[48px] min-w-0 bg-lightBorder rounded-lg"></Skeleton>
              </div>
            </div>
            <div className="w-full h-full flex gap-7">
              <div className="w-full h-full flex flex-col gap-2 2xl:gap-4">
                <Skeleton className="bg-lightBorder w-[15%] h-[20px]"></Skeleton>
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
