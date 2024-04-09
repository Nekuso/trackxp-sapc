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
export type uoms = {
  id: number;
  role: string;
};

export type allInventoryDisplay = {
  id: number;
  branches: {
    id: number;
    branch_name: string;
    branch_location: string;
  };
  products: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    quantity: number;
    uom: string;
    price: number;
    barcode: string;
    status: string;
    created_at: string;
  }[];
};

export type allProductsDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  uoms: {
    id: number;
    unit_name: string;
  };
  price: number;
  barcode: string;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allPartsDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  brands: {
    id: number;
    brand_name: string;
  };
  price: number;
  barcode: string;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allServicesDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  duration: number;
  status: string;
  inventory: {
    id: number;
    branches: {
      id: number;
      branch_name: string;
      branch_location: string;
    };
  };
  created_at: string;
};

export type allPurchaseOrdersDisplay = {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_contact_number: string;
  customer_email: string;
  inventory_id: string;
  employee_id: string;
  purchase_orders: {}[];
  purchase_parts: {}[];
  total_price: number;
  payment_method: string;
  status: string;
  created_at: string;
};

export type allPurchaseServicesDisplay = {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_contact_number: string;
  customer_email: string;
  inventory_id: string;
  employee_id: string;
  purchase_orders: {}[];
  purchase_parts: {}[];
  purchase_services: {}[];
  progress_collection: {}[];
  total_price: number;
  payment_method: string;
  created_at: string;
};
