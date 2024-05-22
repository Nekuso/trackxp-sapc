import { useState } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useBranches: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allBranchesData, setAllbranchesData] = useState<any>([]);
  const [currentBranchData, setCurrentBranchData] = useState<any>([]);

  const createBranch = async (props: any, duration?: any) => {
    const result = await supabase
      .from("branches")
      .insert({
        branch_name: props.branch_name,
        branch_location: props.branch_location,
        contact_number: props.contact_number,
      })
      .select();

    const inventoryResult = await supabase
      .from("inventory")
      .insert({
        branch_id: result?.data?.[0]?.id,
      })
      .select();

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data;
  };
  const getBranches = async () => {
    const result = await supabase
      .from("branches")
      .select(
        `
      id,
      branch_name,
      branch_location,
      branch_manager,
      contact_number,
      created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllbranchesData(data);
  };
  const getBranch = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("branches")
      .select(
        `
      id,
      branch_name,
      branch_location,
      branch_manager,
      contact_number,
      created_at
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentBranchData(data);
  };
  const updateBranch = async (props: any, duration?: number) => {
    const result = await supabase
      .from("branches")
      .update({
        branch_name: props.branch_name,
        branch_location: props.branch_location,
        contact_number: props.contact_number,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return result;
  };
  const deleteBranch = async (props: any, duration?: number) => {
    const result = await supabase.from("branches").delete().eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  return {
    // states
    allBranchesData,
    currentBranchData,

    // methods
    createBranch,
    getBranches,
    getBranch,
    updateBranch,
    deleteBranch,
  };
};
