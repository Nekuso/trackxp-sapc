/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useOrderServices } from "@/hooks/useOrderServices";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import OrderNotFound from "./not-found";
import Loading from "./skeleton";
import OrderServiceTrackingContent from "./order-service-tracking-content";
import { cn } from "@/lib/utils";

export default function TrackingService({ params }: { params: any }) {
  const { toast } = useToast();
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
            toast({
              className: cn(
                "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-full py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
              ),
              title: "📣 Notification",
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
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center bg-darkBg p-4 md:p-8">
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
