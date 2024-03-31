/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Loading from "./skeleton";
import UserContent from "./user-content";
import { useEmployees } from "@/hooks/useEmployees";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export default function User({ params }: { params: any }) {
  const { getEmployee, currentEmployeeData } = useEmployees();

  useEffect(() => {
    getEmployee(params.id, 2000);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("employee-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload: any) => {
          getEmployee(params.id, 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {currentEmployeeData.length === 0 ? (
        <Loading />
      ) : (
        <UserContent params={params} employee={currentEmployeeData} />
      )}
    </div>
  );
}
