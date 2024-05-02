"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function InventorySkeleton() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <Tabs
        defaultValue="system"
        className="w-full h-full flex max-w-[1840px] max-h-[900px] flex-col justify-center place-items-center gap-4"
      >
        <div className="w-full">
          <Skeleton className="w-[470px] h-[46px]  bg-lightBorder rounded-lg gap-4"></Skeleton>
        </div>
        <TabsContent value="system" className="w-full h-full ">
          <Skeleton className="w-full min-h-[715px] 2xl:min-h-[792px] flex flex-col justify-between gap-3 bg-darkComponentBg border border-lightBorder rounded-2xl" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
