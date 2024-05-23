/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import ManagementContent from "./management-content";
import { useEmployees } from "@/hooks/useEmployees";
import { useMobileUsers } from "@/hooks/useMobileUsers";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useBranches } from "@/hooks/useBranches";
import { useRoles } from "@/hooks/useRoles";
import { HomeIcon } from "lucide-react";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRolesData } from "@/redux/slices/rolesSlice";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Management() {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  useEffect(() => {
    if (!access.allowed) {
      router.push(access.defaultRoute);
    }
  }, [access.allowed]);

  const dispatch = useDispatch();
  const { getEmployees, allEmployeesData } = useEmployees();
  const { getMobileUsers, allMobileUserData } = useMobileUsers();
  const { getBranches, allBranchesData } = useBranches();
  const { getRoles, allRolesData } = useRoles();

  const branchesData = allBranchesData.map((branch: any) => ({
    id: branch?.id,
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));
  const rolesData = allRolesData.map((role: any) => ({
    id: role?.id,
    value: role?.role,
    label: role?.role,
    icon: FaRegUser,
  }));
  dispatch(setBranchesData(branchesData));
  dispatch(setRolesData(rolesData));

  useEffect(() => {
    const { error } = getEmployees(currentSession);
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }

    getBranches();
    getMobileUsers();
    getRoles();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("employees-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload: any) => {
          getEmployees();
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("mobile-users-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "moble_users" },
        (payload: any) => {
          getMobileUsers();
        }
      )
      .subscribe();
    const subscribedChannel3 = supabase
      .channel("branches-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "branches" },
        (payload: any) => {
          getBranches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
    };
  }, []);

  return (
    <div className="w-full h-full">
      {!access.allowed ? (
        <div className="w-full h-full flex justify-center place-items-center">
          <h1 className="text-xl font-semibold text-slate-200 text-center">
            Unauthorized
          </h1>
        </div>
      ) : (
        <div className="w-full flex justify-center py-3.5 no-scrollbar ">
          {allEmployeesData.length === 0 ? (
            <Loading />
          ) : (
            <ManagementContent
              dataEmployees={allEmployeesData}
              dataMobileUsers={allMobileUserData}
              dataBranches={allBranchesData}
            />
          )}
        </div>
      )}
    </div>
  );
}
