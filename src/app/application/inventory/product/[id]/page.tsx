/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import ProductContent from "./product-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useUOMS } from "@/hooks/useUOMS";
import ProductNotFound from "./not-found";

export default function Product({ params }: { params: any }) {
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
