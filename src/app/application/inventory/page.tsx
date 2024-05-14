/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import InventoryContent from "./inventory-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { FaTags } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { useParts } from "@/hooks/useParts";
import { useProducts } from "@/hooks/useProducts";
import { useServices } from "@/hooks/useServices";
import { useRewards } from "@/hooks/useRewards";
import { useBranches } from "@/hooks/useBranches";
import { useUOMS } from "@/hooks/useUOMS";
import { HomeIcon } from "lucide-react";
import { PiRulerBold } from "react-icons/pi";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { setUOMSData } from "@/redux/slices/uomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBrands } from "@/hooks/useBrands";
import { setBrandsData } from "@/redux/slices/brandsSlice";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Inventory() {
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

  const { getProducts, productsData } = useProducts();
  const { getParts, partsData } = useParts();
  const { getServices, servicesData } = useServices();
  const { getRewards, allRewardsData } = useRewards();

  const { getBranches, allBranchesData } = useBranches();
  const { getUOMS, allUOMSData } = useUOMS();
  const { getBrands, allBrandsData } = useBrands();

  const branchesData = allBranchesData.map((branch: any) => ({
    id: branch?.id,
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));
  const uomsData = allUOMSData.map((uom: any) => ({
    id: uom?.id,
    value: uom?.unit_name,
    label: uom?.unit_name,
    icon: PiRulerBold,
  }));
  const brandsData = allBrandsData.map((brand: any) => ({
    id: brand?.id,
    value: brand?.brand_name,
    label: brand?.brand_name,
    icon: FaTags,
  }));

  dispatch(setBranchesData(branchesData));
  dispatch(setUOMSData(uomsData));
  dispatch(setBrandsData(brandsData));

  // fetch all products
  useEffect(() => {
    const { error } = getProducts(currentSession);

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

  // fetch all parts
  useEffect(() => {
    const { error } = getParts(currentSession);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getBrands();
  }, []);

  // fetch all services
  useEffect(() => {
    const { error } = getServices(currentSession);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);
  useEffect(() => {
    const { error } = getRewards();

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
  }, []);

  // listen for changes in the database
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel1 = supabase
      .channel("products-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload: any) => {
          getProducts(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel2 = supabase
      .channel("parts-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "parts" },
        (payload: any) => {
          getParts(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel3 = supabase
      .channel("services-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        (payload: any) => {
          getServices(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel4 = supabase
      .channel("rewards-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rewards" },
        (payload: any) => {
          getRewards();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
      supabase.removeChannel(subscribedChannel4);
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
          {productsData.length === 0 ? (
            <Loading />
          ) : (
            <InventoryContent
              dataProducts={productsData}
              dataParts={partsData}
              dataServices={servicesData}
              dataRewards={allRewardsData}
            />
          )}
        </div>
      )}
    </div>
  );
}
