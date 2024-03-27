"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManagementSkeleton() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <Tabs
        defaultValue="system"
        className="w-full h-full flex max-w-[1840px] max-h-[900px] flex-col justify-center place-items-center gap-4"
      >
        <div className="w-full">
          <TabsList className="p-0 h-fit bg-transparent rounded-none gap-4">
            <Skeleton className="w-[92px] h-[30px] rounded-full bg-darkComponentBg border border-lightBorder">
              <TabsTrigger
                value="system"
                className="data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white rounded-none p-0 pb-2"
              ></TabsTrigger>
            </Skeleton>
            <Skeleton className="w-[92px] h-[30px] rounded-full bg-darkComponentBg border border-lightBorder">
              <TabsTrigger
                value="system"
                className="data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white rounded-none p-0 pb-2"
              ></TabsTrigger>
            </Skeleton>
          </TabsList>
        </div>
        <TabsContent value="system" className="w-full h-full ">
          <Skeleton className="w-full h-full flex flex-col justify-between gap-3 bg-darkComponentBg border border-lightBorder rounded-2xl" />
        </TabsContent>
        <TabsContent value="mobile" className="w-full h-full bg-red-300">
          {/* <DataTable columns={columns} data={data} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
