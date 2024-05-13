/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import OrderContent from "./order-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useOrders } from "@/hooks/useOrders";
import OrderNotFound from "./not-found";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Order({ params }: { params: any }) {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER, CASHIER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware(
    [ADMINISTRATOR, MANAGER, CASHIER],
    currentSession
  );
  useEffect(() => {
    if (!access.allowed) {
      router.push(access.defaultRoute);
    }
  }, [access.allowed]);

  const { getOrder, currentOrderData } = useOrders();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getOrder(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("order-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "orders" },
          (payload: any) => {
            getOrder(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return !access.allowed ? (
    <div className="w-full h-full flex justify-center place-items-center">
      <h1 className="text-xl font-semibold text-slate-200 text-center">
        Unauthorized
      </h1>
    </div>
  ) : (
    <div className="w-full flex justify-center place-items-center">
      {error ? (
        <OrderNotFound />
      ) : currentOrderData.length === 0 ? (
        <Loading />
      ) : (
        <OrderContent params={params} order={currentOrderData} />
      )}
    </div>
  );
}
