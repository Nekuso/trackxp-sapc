/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import InventoryContent from "./inventory-content";
import { useEmployees } from "@/hooks/useEmployees";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useBranches } from "@/hooks/useBranches";
import { useRoles } from "@/hooks/useRoles";

export default function Inventory() {
  // const { getInventory, allInventoryData } = useEmployees();
  const allInventoryData: any = [];

  useEffect(() => {
  //   const { error } = getEmployees();
  //   if (error?.message) {
  //     toast({
  //       variant: "destructive",
  //       title: "⚠️ Error",
  //       description: error.message,
  //     });
  //   }

  //   getBranches();
  //   getRoles();
  }, []);

  useEffect(() => {
    // const supabase = createSupabaseBrowserClient();
    // const subscribedChannel = supabase
    //   .channel("employees-follow-up")
    //   .on(
    //     "postgres_changes",
    //     { event: "*", schema: "public", table: "employees" },
    //     (payload: any) => {
    //       getEmployees();
    //       sonner("🔔 Notification", {
    //         description: `${payload.new.first_name} ${payload.new.last_name} has been updated`,
    //       });
    //     }
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(subscribedChannel);
    // };
  }, []);

  return (
    <div className="w-full flex justify-center py-3.5 no-scrollbar ">
      {allInventoryData.length === 0 ? (
        <Loading />
      ) : (
        <InventoryContent
          dataInvetory={allInventoryData}
        />
      )}
    </div>
  );
}
