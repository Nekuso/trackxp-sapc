import { DataTable } from "./inventory-table/data-table";
import { columns } from "./inventory-table/columns";
import data from "./inventory-table/data/data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProductsDisplay } from "@/types";
import { HomeIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setBranchesData } from "@/redux/slices/branchesSlice";

export default function InventoryContent({
  dataProducts,
  branches,
  uoms,
}: {
  dataProducts: allProductsDisplay[];
  branches: any;
  uoms: any;
}) {
  const branchesData = branches.map((branch: any) => ({
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));
  const uomsData = uoms.map((uom: any) => ({
    value: uom?.unit_name,
    label: uom?.unit_name,
    icon: HomeIcon,
  }));

  const dispatch = useDispatch();
  dispatch(setBranchesData(branchesData));
  console.log(useSelector((state: any) => state.branches));

  return (
    <Tabs
      defaultValue="products"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full">
        <TabsList className="h-fit bg-lightBorder rounded-lg gap-4">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-applicationPrimary  data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="parts"
            className="data-[state=active]:bg-applicationPrimary data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            Parts
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-applicationPrimary data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            Services
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="products" className="w-full h-full ">
        <DataTable columns={columns} data={dataProducts}
          branchesData={branchesData}
          uomsData={uomsData}
        />
      </TabsContent>
      <TabsContent
        value="mobile"
        className="w-full h-[725px] 2xl:h-[800px] bg-red-300"
      >
        {/* <DataTable columns={columns} data={data} /> */}
      </TabsContent>
    </Tabs>
  );
}
