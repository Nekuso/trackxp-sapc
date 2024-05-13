/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import Loading from "./skeleton";
import TransactionsContent from "./transactions-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast as sonner } from "sonner";
import { toast } from "@/components/ui/use-toast";
import { useOrders } from "@/hooks/useOrders";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useBranches } from "@/hooks/useBranches";
import { HomeIcon } from "lucide-react";
import { setBranchesData } from "@/redux/slices/branchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "@/hooks/useProducts";
import { useParts } from "@/hooks/useParts";
import { useServices } from "@/hooks/useServices";
import { useEmployees } from "@/hooks/useEmployees";
import {
  setPartsData,
  setProductsData,
} from "@/redux/slices/orderCartOptionSlice";
import { setServicesData } from "@/redux/slices/orderServiceCartOptionSlice";
import {
  setEmployeesData,
  setMechanicsData,
  setSuperVisorsData,
} from "@/redux/slices/allEmployeesSlice";
import { useMobileUsers } from "@/hooks/useMobileUsers";
import { setMobileUsersData } from "@/redux/slices/mobileUsersSlice";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Transactions() {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER, CASHIER, STAFF } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware(
    [ADMINISTRATOR, MANAGER, CASHIER, STAFF],
    currentSession
  );

  useEffect(() => {
    if (!access.allowed) {
      router.push(access.defaultRoute);
    }
  }, [access.allowed]);

  const dispatch = useDispatch();

  const { getOrders, ordersData } = useOrders();
  const { getEmployees, allEmployeesData } = useEmployees();
  const { getMobileUsers, allMobileUserData } = useMobileUsers();
  const { getOrderServices, orderServicesData } = useOrderServices();
  const { getBranches, allBranchesData } = useBranches();
  const { getProducts, productsData } = useProducts();
  const { getParts, partsData } = useParts();
  const { getServices, servicesData } = useServices();

  const branchesData = allBranchesData.map((branch: any) => ({
    id: branch?.id,
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));

  const productsCart = useSelector(
    (state: any) => state.orderCart.productsCart
  );
  const partsCart = useSelector((state: any) => state.orderCart.partsCart);

  const servicesCart = useSelector(
    (state: any) => state.orderServiceCart.servicesCart
  );

  dispatch(setEmployeesData(allEmployeesData));
  dispatch(setMobileUsersData(allMobileUserData));
  dispatch(setMechanicsData(allEmployeesData));
  dispatch(setSuperVisorsData(allEmployeesData));

  dispatch(setBranchesData(branchesData));
  dispatch(setProductsData({ productsData, productsCart }));
  dispatch(setPartsData({ partsData, partsCart }));
  dispatch(setServicesData({ servicesData, servicesCart }));

  // fetch all products
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
    getProducts(currentSession);
    getParts(currentSession);
    getServices(currentSession);
    getEmployees(currentSession);
    getMobileUsers();
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
    const subscribedChannel3 = supabase
      .channel("products-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload: any) => {
          getProducts(currentSession);
          getOrders(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel4 = supabase
      .channel("parts-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "parts" },
        (payload: any) => {
          getParts(currentSession);
          getOrders(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel5 = supabase
      .channel("services-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "services" },
        (payload: any) => {
          getServices(currentSession);
        }
      )
      .subscribe();
    const subscribedChannel6 = supabase
      .channel("progress-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "progress_entries" },
        (payload: any) => {
          getOrderServices(currentSession);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscribedChannel1);
      supabase.removeChannel(subscribedChannel2);
      supabase.removeChannel(subscribedChannel3);
      supabase.removeChannel(subscribedChannel4);
      supabase.removeChannel(subscribedChannel5);
      supabase.removeChannel(subscribedChannel6);
    };
  }, []);

  return !access.allowed ? (
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
        <TransactionsContent
          dataOrders={ordersData}
          dataOrderService={orderServicesData}
        />
      )}
    </div>
  );
}
