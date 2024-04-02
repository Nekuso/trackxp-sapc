/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import InventoryContent from "./inventory-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { useBranches } from "@/hooks/useBranches";
import { useUOMS } from "@/hooks/useUOMS";
import { HomeIcon } from "lucide-react";
import { PiRulerBold } from "react-icons/pi";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { setUOMSData } from "@/redux/slices/uomsSlice";
import { useDispatch } from "react-redux";

export default function Inventory() {
  const dispatch = useDispatch();

  const { getProducts, productsData } = useProducts();
  const { getBranches, allBranchesData } = useBranches();
  const { getUOMS, allUOMSData } = useUOMS();

  const branchesData = allBranchesData.map((branch: any) => ({
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));
  const uomsData = allUOMSData.map((uom: any) => ({
    value: uom?.unit_name,
    label: uom?.unit_name,
    icon: PiRulerBold,
  }));
  dispatch(setBranchesData(branchesData));
  dispatch(setUOMSData(uomsData));

  useEffect(() => {
    const { error } = getProducts();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }

    getBranches();
    getUOMS();
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
      {productsData.length === 0 ? (
        <Loading />
      ) : (
        <InventoryContent dataProducts={productsData} />
      )}
    </div>
  );
}
