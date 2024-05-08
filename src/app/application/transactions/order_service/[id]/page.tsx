/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import OrderServiceContent from "./order-service-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useOrderServices } from "@/hooks/useOrderServices";
import OrderNotFound from "./not-found";

export default function OrderService({ params }: { params: any }) {
  const { getOrderService, currentOrderServiceData } = useOrderServices();
  const [error, setError] = useState(false);
  const progressCollection: any = {
    created: {
      progress_name: "Created",
      description: "The service request is created and logged into the system.",
    },
    in_progress: {
      progress_name: "In Progress",
      description: "The services are currently being worked on by mechanics.",
    },
    quality_checks: {
      progress_name: "Quality Checks",
      description:
        "A thorough quality check is performed to ensure the services meets standards.",
    },
    ready_for_pickup: {
      progress_name: "Ready for Pick-up",
      description:
        "The services has been successfully completed and the vehicle is ready to be for Pick-up.",
    },
    completed: {
      progress_name: "Completed",
      description:
        "The services has been successfully completed and the vehicle is returned to the customer.",
    },
  };

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getOrderService(params.id, 500);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`order-service-follow-up-${params.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "order_services",
            filter: `id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderService(params.id, 0);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "progress_entries",
            filter: `order_service_id=eq.${params.id}`,
          },
          (payload: any) => {
            getOrderService(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full flex justify-center place-items-center">
      {error ? (
        <OrderNotFound />
      ) : currentOrderServiceData.length === 0 ? (
        <Loading />
      ) : (
        <OrderServiceContent
          params={params}
          orderService={currentOrderServiceData}
        />
      )}
    </div>
  );
}
