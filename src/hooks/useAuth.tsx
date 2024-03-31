import { z } from "zod";
import { employeeSchema } from "@/app/application/management/employees-table/add-employee/add-employee-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export function useAuth() {
  async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
  }) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword(data);
    return JSON.stringify(result);
  }

  return { signInWithEmailAndPassword };
}
