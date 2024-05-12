/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import PartContent from "./part-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useParts } from "@/hooks/useParts";
import { useBrands } from "@/hooks/useBrands";
import PartNotFound from "./not-found";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";
import { useSelector } from "react-redux";

export default function Part({ params }: { params: any }) {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  if (!access.allowed) {
    router.push(access.defaultRoute);
    return null;
  }

  const { getPart, currentPartData } = useParts();
  const { getBrands, allBrandsData } = useBrands();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getPart(params.id, 2000);
      if (result) setError(result);
      getBrands();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("part-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "parts" },
          (payload: any) => {
            getPart(params.id, 0);
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
        <PartNotFound />
      ) : currentPartData.length === 0 ? (
        <Loading />
      ) : (
        <PartContent
          params={params}
          part={currentPartData}
          brands={allBrandsData}
        />
      )}
    </div>
  );
}
