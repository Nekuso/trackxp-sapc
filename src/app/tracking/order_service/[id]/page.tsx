/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useEffect, useState } from "react";
import { toast as sonner } from "sonner";
import OrderNotFound from "./not-found";
import Loading from "./skeleton";
import OrderServiceTrackingContent from "./order-service-tracking-content";

export default function TrackingService({ params }: { params: any }) {
  const [error, setError] = useState(false);
  const { getOrderServiceTracking, currentOrderServiceDataTracking } =
    useOrderServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getOrderServiceTracking(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`order-service-tracking-follow-up-${params.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `tracking_id=eq.${params.id}`,
          },
          (payload: any) => {
            console.log(payload);
            getOrderServiceTracking(params.id, 0);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "progress_entries",
            filter: `tracking_id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderServiceTracking(params.id, 0);
            sonner("📣 Notfication", {
              description: `Order has been updated!`,
            });
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center place-items-center bg-darkBg p-3">
      {error ? (
        <OrderNotFound />
      ) : currentOrderServiceDataTracking.length === 0 ? (
        <Loading />
      ) : (
        <OrderServiceTrackingContent
          orderServiceDataTracking={currentOrderServiceDataTracking}
        />
      )}
    </div>
  );
}
