"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export const useEmployees = async () => {
  const getEmployees = async () => {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("employees").select(`
      id,
      email,
      first_name,
      last_name,
      image_url,
      branches (
        id,
        branch_name,
        branch_location
      ),
      address,
      contact_number,
      gender,
      roles (id, role),
      status,
      dob
    `);
    type EmployeesWithJoin = QueryData<typeof result>;

    const { data, error } = result;
    if (error) throw error;

    return data as EmployeesWithJoin;
  };

  const getEmployee = async (id: string) => {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("employees")
      .select(
        `
      id,
      email,
      first_name,
      last_name,
      image_url,
      branches (
        id,
        branch_name,
        branch_location
      ),
      address,
      contact_number,
      gender,
      roles (id, role),
      status,
      dob
    `
      )
      .eq("id", id);
    if (error) return error;

    return data;
  };

  return {
    getEmployee,
    getEmployees,
  };
};
