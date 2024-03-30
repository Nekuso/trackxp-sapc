import { z } from "zod";

export const employeeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  image_url: z.string().default("something"),
  address: z.string().min(1, { message: "Address is required" }),
  contact_number: z.coerce
    .number()
    .min(1, { message: "Contact number is required" }),
  gender: z.string().default("Male"),
  dob: z
    .date()
    .min(new Date(1900, 1, 1), { message: "Date of birth is required" }),
  role: z
    .string()
    .min(1, { message: "Role is required" })
    .transform((arg) => new Number(arg)),
  branch: z
    .string()
    .min(1, { message: "Branch is required" })
    .transform((arg) => new Number(arg)),
  status: z.string().default("Available"),
});
