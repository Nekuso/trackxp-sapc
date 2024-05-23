/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { toast } from "@/components/ui/use-toast";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./skeleton";
import { useBranches } from "@/hooks/useBranches";
import { useEmployees } from "@/hooks/useEmployees";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useOrders } from "@/hooks/useOrders";
import { setEmployeesData } from "@/redux/slices/allEmployeesSlice";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { HomeIcon } from "lucide-react";
import ReportsContent from "./reports-content";

export default function Reports() {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  if (!access.allowed) {
    router.push(access.defaultRoute);
  }

  const dispatch = useDispatch();
  const allFilteredOrderServices = useSelector(
    (state: any) => state.allFilteredOrderServices.allFilteredOrderServices
  );

  const { getOrders, ordersData } = useOrders();
  const { getEmployees, allEmployeesData } = useEmployees();
  const { getOrderServices, orderServicesData } = useOrderServices();
  const { getBranches, allBranchesData } = useBranches();

  const branchesData = allBranchesData.map((branch: any) => ({
    id: branch?.id,
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));

  dispatch(setEmployeesData(allEmployeesData));
  dispatch(setBranchesData(branchesData));

  useEffect(() => {
    const { error } = getOrders(currentSession);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }

    getBranches();
    getEmployees(currentSession);
    getOrderServices(currentSession);
  }, []);

  // listen for changes in the database
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("orders-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload: any) => {
          getOrders(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("service-orders-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order_services" },
        (payload: any) => {
          setTimeout(() => {
            getOrderServices();
          }, 2500);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {!access.allowed ? (
        <div className="w-full h-full flex justify-center place-items-center">
          <h1 className="text-xl font-semibold text-slate-200 text-center">
            Unauthorized
          </h1>
        </div>
      ) : (
        <div className="w-full flex justify-center py-3.5 no-scrollbar ">
          {ordersData.length === 0 && orderServicesData.length === 0 ? (
            <Loading />
          ) : (
            <ReportsContent
              dataOrders={ordersData}
              dataOrderService={orderServicesData}
            />
          )}
        </div>
      )}
    </div>
  );
}
