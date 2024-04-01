/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Loading from "./skeleton";
import UserContent from "./user-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useEmployees } from "@/hooks/useEmployees";
import { useBranches } from "@/hooks/useBranches";
import { useRoles } from "@/hooks/useRoles";

export default function User({ params }: { params: any }) {
  const { getEmployee, currentEmployeeData } = useEmployees();
  const { getBranches, allBranchesData } = useBranches();
  const { getRoles, allRolesData } = useRoles();

  useEffect(() => {
    getEmployee(params.id, 2000);
    getBranches();
    getRoles();
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
    <div className="w-full flex justify-center place-items-center">
      {currentEmployeeData.length === 0 ? (
        <Loading />
      ) : (
        <UserContent params={params} employee={currentEmployeeData} branches={allBranchesData} roles={allRolesData} />
      )}
    </div>
  );
}