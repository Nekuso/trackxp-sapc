/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import ManagementContent from "./management-content";
import { useEmployees } from "@/hooks/useEmployees";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";

export default function Management() {
  const { getEmployees, allEmployeesData } = useEmployees();

  useEffect(() => {
    const { error } = getEmployees();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("employees-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload: any) => {
          getEmployees();
          sonner("Notification", {
            description: `${payload.new.first_name} ${payload.new.last_name} has been updated`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center no-scrollbar">
      {allEmployeesData.length === 0 ? (
        <Loading />
      ) : (
        <ManagementContent dataEmployees={allEmployeesData} />
      )}
    </div>
  );
}
