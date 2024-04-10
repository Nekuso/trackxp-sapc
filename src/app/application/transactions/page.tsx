/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import TransactionsContent from "./transactions-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useOrders } from "@/hooks/useOrders";
import { useBranches } from "@/hooks/useBranches";
import { HomeIcon } from "lucide-react";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { useDispatch } from "react-redux";
import { useProducts } from "@/hooks/useProducts";
import { useParts } from "@/hooks/useParts";
import {
  setPartsData,
  setProductsData,
} from "@/redux/slices/orderCartOptionSlice";

export default function Inventory() {
  const dispatch = useDispatch();

  const { getOrders, ordersData } = useOrders();
  const { getBranches, allBranchesData } = useBranches();
  const { getProducts, productsData } = useProducts();
  const { getParts, partsData } = useParts();

  const branchesData = allBranchesData.map((branch: any) => ({
    id: branch?.id,
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));

  dispatch(setBranchesData(branchesData));
  dispatch(setProductsData(productsData));
  dispatch(setPartsData(partsData));

  // fetch all products
  useEffect(() => {
    const { error } = getOrders();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getBranches();
    getProducts();
    getParts();
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
          getOrders();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
    };
  }, []);

  return (
    <div className="w-full flex justify-center py-3.5 no-scrollbar ">
      {ordersData.length === 0 ? (
        <Loading />
      ) : (
        <TransactionsContent
          dataOrders={ordersData}
          partsData={partsData}
          productsData={productsData}
        />
      )}
    </div>
  );
}
