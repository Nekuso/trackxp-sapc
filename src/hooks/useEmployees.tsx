"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const useEmployees = async () => {
  const getEmployees = async () => {
    const supabase = await createSupabaseServerClient();
    return await supabase.from("employees").select("*");
  };

  return {
    getEmployees,
  };
};
