import { createSupabaseServerClient } from "@/lib/supabase/server";
import { QueryData, createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const useEmployees = () => {
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

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return data as EmployeesWithJoin;
  };

  const getEmployee = async (id: string, duration?: number) => {
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
      dob,
      created_at
    `
      )
      .eq("id", id);
    if (error) return redirect("/application/management");

    await new Promise((resolve) => setTimeout(resolve, duration));
    return data;
  };
  const updateEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      email: props.email,
      password: props.password,
      user_metadata: {
        email: props.email,
        first_name: props.first_name,
        last_name: props.last_name,
        image_url: props.image_url,
        address: props.address,
        contact_number: props.contact_number,
        gender: props.gender,
        status: props.status,
        dob: props.dob,
        role: props.role,
        branch: props.branch,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const updateEmployeeStatus = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabase.auth.admin.updateUserById(props.id, {
      user_metadata: {
        status: props.status,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  const deleteEmployee = async (props: any, duration?: number) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    );
    const result = await supabase.auth.admin.deleteUser(props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };

  return {
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
  };
};
