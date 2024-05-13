/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import ProductContent from "./product-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useUOMS } from "@/hooks/useUOMS";
import ProductNotFound from "./not-found";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useSelector } from "react-redux";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Product({ params }: { params: any }) {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  if (!access.allowed) {
    router.push(access.defaultRoute);
    return (
      <div className="w-full h-full flex justify-center place-items-center">
        <h1 className="text-xl font-semibold text-slate-200 text-center">
          Unauthorized
        </h1>
      </div>
    );
  }

  const { getProduct, currentProductData } = useProducts();
  const { getUOMS, allUOMSData } = useUOMS();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getProduct(params.id, 2000);
      if (result) setError(result);
      getUOMS();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("product-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "products" },
          (payload: any) => {
            getProduct(params.id, 0);
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
        <ProductNotFound />
      ) : currentProductData.length === 0 ? (
        <Loading />
      ) : (
        <ProductContent
          params={params}
          product={currentProductData}
          uoms={allUOMSData}
        />
      )}
    </div>
  );
}
