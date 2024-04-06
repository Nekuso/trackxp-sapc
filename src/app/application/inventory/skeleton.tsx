"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function ManagementSkeleton() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <Tabs
        defaultValue="system"
        className="w-full h-full flex max-w-[1840px] max-h-[900px] flex-col justify-center place-items-center gap-2"
      >
        <div className="w-full">
          <Skeleton className="w-[276px] h-[44px]  bg-lightBorder rounded-lg gap-4"></Skeleton>
        </div>
        <TabsContent value="system" className="w-full h-full ">
          <Skeleton className="w-full h-[800px] flex flex-col justify-between gap-3 bg-darkComponentBg border border-lightBorder rounded-2xl" />
        </TabsContent>
        <TabsContent value="mobile" className="w-full h-full bg-red-300">
          {/* <DataTable columns={columns} data={data} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
