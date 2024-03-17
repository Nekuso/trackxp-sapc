"use server";
import { z } from "zod";
import { employeeSchema } from "../employees-table/add-employee/add-employee-form";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword(
  data: z.infer<typeof employeeSchema>
) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}

