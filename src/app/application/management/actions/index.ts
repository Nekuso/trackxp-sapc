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
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        image_url: data.image_url,
        address: data.address,
        contact_number: data.contact_number,
        gender: data.gender,
        dob: data.dob,
        role: data.role,
        branch: data.branch,
        status: data.status,
      },
    },
  });
  return JSON.stringify(result);
}
