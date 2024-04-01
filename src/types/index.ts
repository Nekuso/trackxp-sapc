export type Employee = {
  id: number;
  email: string;
  name: string;
  img_url: string;
  contact_number: string;
  branch_name: string;
  role: string;
  status: string;
  dob: string;
};

export type EmployeeDisplay = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  address: string;
  contact_number: number;
  gender: string;
  status: string;
  dob: string;
  branches: {
    id: number;
    branch_name: string;
    branch_location: string;
  };
  roles: {
    id: number;
    role: string;
  };
};

export type branches = {
  id: number;
  branch_name: string;
  branch_location: string;
};

export type roles = {
  id: number;
  role: string;
};

// export type requests = {
//   id: number;
//   department_id: number;
//   request_type: string;
//   requested_stock: [];
//   status_entries: [];
//   {id:number, status:string, created_at: string}
//   {id:number, status:string, created_at: string}
//   {id:number, status:string, created_at: string},
//   {id:number, status:string, created_at: string},
//   delivery_date: string;
// };


// pending
// approved
// packing
// Out for delivery / Ready for pick-up
// completed

