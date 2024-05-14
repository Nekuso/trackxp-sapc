import { EmployeeDisplay } from "@/types";
import { QueryData, createClient } from "@supabase/supabase-js";
import { useState } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useEmployees: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allEmployeesData, setAllEmployeesData] = useState<EmployeeDisplay[]>(
    []
  );
  const [currentEmployeeData, setCurrentEmployeeData] = useState<any>([]);

  const createEmployee = async (props: any, duration: number = 1000) => {
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s3",
        },
      }
    );

    const result = await supabaseAuth.auth.signUp({
      email: props.email,
      password: props.password,
      options: {
        data: {
          first_name: props.first_name,
          last_name: props.last_name,
          image_url: props.image_url,
          address: props.address,
          contact_number: props.contact_number,
          gender: props.gender,
          dob: props.dob,
          role: props.role,
          branch: props.branch,
          status: props.status,
          password: props.password,
        },
      },
    });
    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const getEmployees = async (props?: any) => {
    const result =
      props?.roles?.role === "Administrator"
        ? await supabase
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
            .order("created_at", { ascending: false })
        : await supabase
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
            .eq("branch", props?.branches?.id)
            .order("created_at", { ascending: false });

    type EmployeesWithJoin = QueryData<typeof result>;

    const { data, error } = result;
    if (error) {
      return error;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return setAllEmployeesData(data as EmployeesWithJoin);
  };
  const getEmployee = async (id: string, duration?: number) => {
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
        created_at,
        password
      `
      )
      .eq("id", id);

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    return setCurrentEmployeeData(data);
  };
  const updateEmployee = async (props: any, duration?: number) => {
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );
    const result = await supabaseAuth.auth.admin.updateUserById(props.id, {
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
        password: props.password,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const updateEmployeeStatus = async (props: any, duration?: number) => {
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s10",
        },
      }
    );
    const result = await supabaseAuth.auth.admin.updateUserById(props.id, {
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
    // data
    allEmployeesData,
    currentEmployeeData,

    // methods
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    updateEmployeeStatus,
  };
};
