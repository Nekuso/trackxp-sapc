import { useState } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useBrands: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allBrandsData, setBrandsData] = useState<any>([]);
  const [currentBrandData, setCurrentBrandData] = useState<any>([]);

  const createbrand = async (props: any, duration?: any) => {
    const result = await supabase.from("brands").insert({
      brand_name: props.brand_name,
    });

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    return data;
  };
  const getBrands = async () => {
    const result = await supabase
      .from("brands")
      .select(
        `
      id,
      brand_name
      
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setBrandsData(data);
  };
  const getBrand = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("brands")
      .select(
        `
      id,
      role
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentBrandData(data);
  };
  const updateBrand = async (props: any, duration?: number) => {
    const result = await supabase
      .from("brands")
      .update({ brand_name: props.brand_name })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const deleteBrand = async (props: any, duration?: number) => {
    const result = await supabase.from("brands").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    // states
    allBrandsData,
    currentBrandData,

    // methods
    createbrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand,
  };
};
